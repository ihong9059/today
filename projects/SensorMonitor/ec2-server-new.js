const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { Pool } = require("pg");

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
