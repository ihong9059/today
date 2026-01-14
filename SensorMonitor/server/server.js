const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");
const https = require("https");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

// Load demo configuration
const demoCompanies = JSON.parse(fs.readFileSync(path.join(__dirname, "demo/companies.json"), "utf8"));
const demoEquipment = JSON.parse(fs.readFileSync(path.join(__dirname, "demo/equipment.json"), "utf8"));

// Weather cache (5 minutes)
let weatherCache = {};
const WEATHER_CACHE_DURATION = 5 * 60 * 1000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// PostgreSQL connection
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "sensordb",
  user: "sensoruser",
  password: "sensor2026"
});

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("PostgreSQL connected successfully");
    release();
  }
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Store latest sensor data per device
const devicesData = {};
let connectionHistory = [];
const MAX_HISTORY = 100;
let totalDbRecords = 0;
let lastSavedTime = null;

// Store latest orientation data for demo pages
let latestOrientation = { alpha: 0, beta: 0, gamma: 0, timestamp: 0 };
let calibratedOrientation = { roll: 0, pitch: 0, timestamp: 0 };  // 메인 페이지에서 보정된 기울기
let calibrationResetTimestamp = 0;  // 원위치 리셋 타임스탬프

// Get DB stats on startup
async function updateDbStats() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM sensor_data");
    totalDbRecords = parseInt(result.rows[0].count);
  } catch (err) {
    console.error("DB stats error:", err.message);
  }
}
updateDbStats();

// Receive sensor data from smartphone
app.post("/api/sensor", async (req, res) => {
  const data = req.body;
  data.receivedAt = new Date().toISOString();

  // Extract device identifier
  const deviceId = data.device || "Unknown";

  let imagePath = null;

  // Save to database if saveToDb is true
  if (data.saveToDb) {
    try {
      // Save image to disk
      if (data.camera) {
        const imageBuffer = Buffer.from(data.camera, "base64");
        const safeDeviceId = deviceId.replace(/\s/g, "_");
        const imageName = "img_" + safeDeviceId + "_" + data.timestamp + ".jpg";
        imagePath = "images/" + imageName;
        fs.writeFileSync(path.join(__dirname, imagePath), imageBuffer);
      }

      // Insert into database
      const query = `
        INSERT INTO sensor_data (timestamp, device, gps, sensors, network, image_path)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const values = [
        data.timestamp,
        deviceId,
        JSON.stringify(data.gps || {}),
        JSON.stringify(data.sensors || {}),
        JSON.stringify(data.network || {}),
        imagePath
      ];

      const result = await pool.query(query, values);
      totalDbRecords++;
      lastSavedTime = new Date().toISOString();

      data.dbSaved = true;
      data.dbRecordId = result.rows[0].id;
    } catch (err) {
      console.error("DB save error:", err.message);
      data.dbSaved = false;
      data.dbError = err.message;
    }
  }

  // Update DB status
  data.dbStatus = {
    enabled: data.saveToDb || false,
    totalRecords: totalDbRecords,
    lastSaved: lastSavedTime
  };

  // Store per device
  devicesData[deviceId] = { ...data, lastUpdate: Date.now() };

  // Extract orientation data from sensors
  if (data.sensors) {
    const sensors = data.sensors;
    // Look for orientation-related sensors
    for (const sensorName in sensors) {
      const lowerName = sensorName.toLowerCase();
      if (lowerName.includes('orientation') || lowerName.includes('rotation') || lowerName.includes('game rotation')) {
        const values = sensors[sensorName].values;
        if (values && values.length >= 3) {
          latestOrientation = {
            alpha: values[0] * 57.2958 || 0,  // Convert to degrees if radians
            beta: values[1] * 57.2958 || 0,
            gamma: values[2] * 57.2958 || 0,
            timestamp: Date.now(),
            device: deviceId
          };
          break;
        }
      }
    }
  }

  // Add to history
  connectionHistory.unshift({
    time: new Date().toISOString(),
    device: deviceId,
    type: data.network?.type || "unknown",
    dbSaved: data.dbSaved || false
  });
  if (connectionHistory.length > MAX_HISTORY) {
    connectionHistory = connectionHistory.slice(0, MAX_HISTORY);
  }

  // Broadcast to all WebSocket clients
  const broadcastData = {
    type: "deviceUpdate",
    deviceId: deviceId,
    data: devicesData[deviceId],
    orientation: latestOrientation,
    devices: Object.keys(devicesData).map(function(id) {
      return {
        id: id,
        lastUpdate: devicesData[id].lastUpdate,
        connected: Date.now() - devicesData[id].lastUpdate < 10000
      };
    })
  };

  wss.clients.forEach(function(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(broadcastData));
    }
  });

  res.json({ status: "ok", received: data.timestamp, dbSaved: data.dbSaved });
});

// Get all devices
app.get("/api/devices", function(req, res) {
  const devices = Object.keys(devicesData).map(function(id) {
    return {
      id: id,
      lastUpdate: devicesData[id].lastUpdate,
      connected: Date.now() - devicesData[id].lastUpdate < 10000,
      dbEnabled: devicesData[id].dbStatus?.enabled || false
    };
  });
  res.json(devices);
});

// Get latest data for specific device
app.get("/api/sensor/:deviceId", function(req, res) {
  const deviceId = decodeURIComponent(req.params.deviceId);
  if (devicesData[deviceId]) {
    res.json(devicesData[deviceId]);
  } else {
    res.status(404).json({ error: "Device not found" });
  }
});

// Get latest data (backwards compatible - returns first device)
app.get("/api/sensor", function(req, res) {
  const deviceIds = Object.keys(devicesData);
  if (deviceIds.length > 0) {
    res.json({
      ...devicesData[deviceIds[0]],
      allDevices: deviceIds.map(function(id) {
        return {
          id: id,
          lastUpdate: devicesData[id].lastUpdate,
          connected: Date.now() - devicesData[id].lastUpdate < 10000
        };
      })
    });
  } else {
    res.json({
      timestamp: null,
      device: "No device connected",
      allDevices: []
    });
  }
});

// Get DB stats
app.get("/api/db/stats", async function(req, res) {
  try {
    const countResult = await pool.query("SELECT COUNT(*) FROM sensor_data");
    const latestResult = await pool.query("SELECT created_at FROM sensor_data ORDER BY id DESC LIMIT 1");
    const deviceStats = await pool.query("SELECT device, COUNT(*) as count FROM sensor_data GROUP BY device ORDER BY count DESC");

    res.json({
      totalRecords: parseInt(countResult.rows[0].count),
      lastSaved: latestResult.rows[0]?.created_at || null,
      byDevice: deviceStats.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recent data from DB
app.get("/api/db/recent", async function(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const device = req.query.device;

    let query = "SELECT id, timestamp, device, gps, sensors, network, image_path, created_at FROM sensor_data";
    let values = [];

    if (device) {
      query += " WHERE device = $1 ORDER BY id DESC LIMIT $2";
      values = [device, limit];
    } else {
      query += " ORDER BY id DESC LIMIT $1";
      values = [limit];
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get connection history
app.get("/api/history", function(req, res) {
  res.json(connectionHistory);
});

// Get latest orientation data from smartphone
app.get("/api/orientation", function(req, res) {
  res.json(latestOrientation);
});

// Weather API (using wttr.in - no API key required)
app.get("/api/weather", function(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon parameters required" });
  }

  const cacheKey = lat.substring(0, 4) + "," + lon.substring(0, 5);
  const cached = weatherCache[cacheKey];

  if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_DURATION) {
    return res.json(cached.data);
  }

  const url = "https://wttr.in/" + lat + "," + lon + "?format=j1";

  https.get(url, function(response) {
    let data = "";
    response.on("data", function(chunk) { data += chunk; });
    response.on("end", function() {
      try {
        const json = JSON.parse(data);
        const current = json.current_condition[0];
        const area = json.nearest_area[0];

        const weatherData = {
          temperature: parseInt(current.temp_C),
          feelsLike: parseInt(current.FeelsLikeC),
          humidity: parseInt(current.humidity),
          description: current.weatherDesc[0].value,
          windSpeed: parseInt(current.windspeedKmph),
          windDirection: current.winddir16Point,
          visibility: parseInt(current.visibility),
          uvIndex: parseInt(current.uvIndex),
          pressure: parseInt(current.pressure),
          location: area.areaName[0].value,
          country: area.country[0].value,
          observationTime: current.localObsDateTime
        };

        weatherCache[cacheKey] = { data: weatherData, timestamp: Date.now() };
        res.json(weatherData);
      } catch (err) {
        res.status(500).json({ error: "Weather parsing error: " + err.message });
      }
    });
  }).on("error", function(err) {
    res.status(500).json({ error: "Weather fetch error: " + err.message });
  });
});

// Health check
app.get("/api/health", function(req, res) {
  const connectedCount = Object.keys(devicesData).filter(function(id) {
    return Date.now() - devicesData[id].lastUpdate < 10000;
  }).length;

  res.json({
    status: "ok",
    uptime: process.uptime(),
    dbRecords: totalDbRecords,
    connectedDevices: connectedCount,
    totalDevices: Object.keys(devicesData).length
  });
});

// ============================================
// Demo API Endpoints
// ============================================

// Get all demo companies
app.get("/api/demo/companies", function(req, res) {
  res.json(demoCompanies);
});

// Get equipment types configuration
app.get("/api/demo/equipment", function(req, res) {
  res.json(demoEquipment);
});

// Get specific company config
app.get("/api/demo/company/:companyId", function(req, res) {
  const company = demoCompanies.companies.find(function(c) {
    return c.id === req.params.companyId;
  });

  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ error: "Company not found" });
  }
});

// Generate simulated sensor data for demo
app.get("/api/demo/:companyId/sensors", function(req, res) {
  const companyId = req.params.companyId;
  const scenario = req.query.scenario || "normal";

  const company = demoCompanies.companies.find(function(c) {
    return c.id === companyId;
  });

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  const result = {
    timestamp: Date.now(),
    company: company.name,
    scenario: scenario,
    equipment: {}
  };

  company.equipment.forEach(function(eq) {
    const eqType = demoEquipment.equipment_types[eq.type];
    if (!eqType) return;

    const eqData = {
      name: eq.name,
      type: eq.type,
      location: eq.location,
      status: "normal",
      sensors: {}
    };

    eqType.sensors.forEach(function(sensor) {
      const normalRange = sensor.normal;
      const min = normalRange[0];
      const max = normalRange[1];
      const baseValue = min + (max - min) * 0.5;
      const variance = (max - min) * 0.1;

      let value = baseValue + (Math.random() - 0.5) * variance * 2;

      // Apply scenario effects
      if (scenario === "degrading" && sensor.id === "vibration") {
        value += variance * 2;
      } else if (scenario === "anomaly" && Math.random() < 0.2) {
        value += variance * 5;
      } else if (scenario === "maintenance") {
        value = baseValue + variance * 1.5;
      }

      // Determine status
      let status = "normal";
      const critRange = sensor.critical;
      const warnRange = sensor.warning;

      if (value >= critRange[0] && value <= critRange[1]) {
        status = "critical";
        eqData.status = "critical";
      } else if (value >= warnRange[0] && value <= warnRange[1]) {
        status = "warning";
        if (eqData.status !== "critical") eqData.status = "warning";
      }

      eqData.sensors[sensor.id] = {
        name: sensor.name,
        value: parseFloat(value.toFixed(2)),
        unit: sensor.unit,
        status: status
      };
    });

    result.equipment[eq.id] = eqData;
  });

  res.json(result);
});

// WebSocket connection
wss.on("connection", function(ws) {
  console.log("Dashboard connected");

  // Send all devices data
  ws.send(JSON.stringify({
    type: "init",
    devices: Object.keys(devicesData).map(function(id) {
      return {
        id: id,
        lastUpdate: devicesData[id].lastUpdate,
        connected: Date.now() - devicesData[id].lastUpdate < 10000
      };
    }),
    devicesData: devicesData
  }));

  // Handle incoming messages from clients
  ws.on("message", function(message) {
    try {
      const data = JSON.parse(message);

      // Handle calibration reset from main dashboard
      if (data.type === "calibrateReset") {
        calibrationResetTimestamp = Date.now();
        calibratedOrientation = { roll: 0, pitch: 0, timestamp: calibrationResetTimestamp };
        console.log("Calibration reset received, broadcasting to all clients");

        // Broadcast calibration reset to all connected clients
        wss.clients.forEach(function(client) {
          if (client.readyState === 1) {
            client.send(JSON.stringify({
              type: "calibrateReset",
              timestamp: calibrationResetTimestamp
            }));
          }
        });
      }

      // Handle calibrated orientation update from main dashboard
      if (data.type === "calibratedOrientation") {
        calibratedOrientation = {
          roll: data.roll || 0,
          pitch: data.pitch || 0,
          timestamp: Date.now()
        };

        // Broadcast to all clients except sender
        wss.clients.forEach(function(client) {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify({
              type: "calibratedOrientation",
              roll: calibratedOrientation.roll,
              pitch: calibratedOrientation.pitch,
              timestamp: calibratedOrientation.timestamp
            }));
          }
        });
      }
    } catch (err) {
      console.error("WebSocket message parse error:", err.message);
    }
  });

  ws.on("close", function() {
    console.log("Dashboard disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, function() {
  console.log("Sensor Monitor Server running on port " + PORT);
  console.log("Dashboard: http://localhost:" + PORT);
  console.log("API: http://localhost:" + PORT + "/api/sensor");
});
