package com.example.sensormonitor

import android.app.*
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.*
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import org.json.JSONArray
import org.json.JSONObject
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.util.concurrent.Executors

class SensorService : Service(), SensorEventListener, LocationListener {

    companion object {
        const val CHANNEL_ID = "SensorMonitorChannel"
        const val NOTIFICATION_ID = 1
        const val ACTION_START = "com.example.sensormonitor.START"
        const val ACTION_STOP = "com.example.sensormonitor.STOP"

        var isRunning = false
            private set
    }

    private lateinit var sensorManager: SensorManager
    private lateinit var locationManager: LocationManager
    private lateinit var connectivityManager: ConnectivityManager

    private val registeredSensors = mutableListOf<Sensor>()
    private val sensorData = mutableMapOf<String, SensorInfo>()
    private var currentGpsLocation: Location? = null
    private var currentNetworkLocation: Location? = null

    private val SERVER_URL = "http://52.78.119.132:5000/api/sensor"
    private val SEND_INTERVAL_MS = 3000L

    private val executor = Executors.newSingleThreadExecutor()
    private val handler = Handler(Looper.getMainLooper())
    private var sendRunnable: Runnable? = null

    private val deviceName: String by lazy {
        "${Build.MANUFACTURER} ${Build.MODEL}"
    }

    data class SensorInfo(
        val name: String,
        val type: String,
        val values: FloatArray
    )

    override fun onCreate() {
        super.onCreate()
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
        connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            ACTION_STOP -> {
                stopSelf()
                return START_NOT_STICKY
            }
            else -> {
                startForegroundService()
                return START_STICKY
            }
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Sensor Monitor Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Background sensor monitoring"
                setShowBadge(false)
            }
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun startForegroundService() {
        val stopIntent = Intent(this, SensorService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 0, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val openIntent = Intent(this, MainActivity::class.java)
        val openPendingIntent = PendingIntent.getActivity(
            this, 0, openIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Sensor Monitor")
            .setContentText("Sending sensor data to server...")
            .setSmallIcon(android.R.drawable.ic_menu_compass)
            .setOngoing(true)
            .setContentIntent(openPendingIntent)
            .addAction(android.R.drawable.ic_media_pause, "Stop", stopPendingIntent)
            .build()

        startForeground(NOTIFICATION_ID, notification)

        isRunning = true
        registerSensors()
        startLocationUpdates()
        startDataTransmission()

        Log.d("SensorService", "Foreground service started")
    }

    private fun registerSensors() {
        val allSensors = sensorManager.getSensorList(Sensor.TYPE_ALL)
        for (sensor in allSensors) {
            sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_NORMAL)
            registeredSensors.add(sensor)
        }
        Log.d("SensorService", "Registered ${registeredSensors.size} sensors")
    }

    private fun startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            Log.w("SensorService", "Location permission not granted")
            return
        }

        try {
            if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                locationManager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    1000L,
                    1f,
                    this
                )
                currentGpsLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)
            }

            if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                locationManager.requestLocationUpdates(
                    LocationManager.NETWORK_PROVIDER,
                    1000L,
                    1f,
                    object : LocationListener {
                        override fun onLocationChanged(location: Location) {
                            currentNetworkLocation = location
                        }
                        override fun onProviderEnabled(provider: String) {}
                        override fun onProviderDisabled(provider: String) {}
                    }
                )
                currentNetworkLocation = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)
            }
        } catch (e: Exception) {
            Log.e("SensorService", "Error starting location updates", e)
        }
    }

    override fun onLocationChanged(location: Location) {
        if (location.provider == LocationManager.GPS_PROVIDER) {
            currentGpsLocation = location
        }
    }

    override fun onProviderEnabled(provider: String) {}
    override fun onProviderDisabled(provider: String) {}

    override fun onSensorChanged(event: SensorEvent) {
        sensorData[event.sensor.name] = SensorInfo(
            name = event.sensor.name,
            type = getSensorTypeName(event.sensor.type),
            values = event.values.clone()
        )
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    private fun getSensorTypeName(type: Int): String {
        return when (type) {
            Sensor.TYPE_ACCELEROMETER -> "Accelerometer"
            Sensor.TYPE_MAGNETIC_FIELD -> "Magnetic Field"
            Sensor.TYPE_ORIENTATION -> "Orientation"
            Sensor.TYPE_GYROSCOPE -> "Gyroscope"
            Sensor.TYPE_LIGHT -> "Light"
            Sensor.TYPE_PRESSURE -> "Pressure"
            Sensor.TYPE_PROXIMITY -> "Proximity"
            Sensor.TYPE_GRAVITY -> "Gravity"
            Sensor.TYPE_LINEAR_ACCELERATION -> "Linear Acceleration"
            Sensor.TYPE_ROTATION_VECTOR -> "Rotation Vector"
            else -> "Type: $type"
        }
    }

    private fun startDataTransmission() {
        sendRunnable = object : Runnable {
            override fun run() {
                sendDataToServer()
                handler.postDelayed(this, SEND_INTERVAL_MS)
            }
        }
        handler.postDelayed(sendRunnable!!, SEND_INTERVAL_MS)
    }

    private fun getNetworkInfo(): JSONObject {
        val networkInfo = JSONObject()
        val network = connectivityManager.activeNetwork
        val capabilities = connectivityManager.getNetworkCapabilities(network)

        if (capabilities != null) {
            networkInfo.put("wifi", capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI))
            networkInfo.put("mobile", capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR))
            networkInfo.put("type", when {
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> "WiFi"
                capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> "Mobile"
                else -> "Unknown"
            })
        } else {
            networkInfo.put("wifi", false)
            networkInfo.put("mobile", false)
            networkInfo.put("type", "Disconnected")
        }

        return networkInfo
    }

    private fun sendDataToServer() {
        executor.execute {
            try {
                val json = JSONObject()
                json.put("timestamp", System.currentTimeMillis())
                json.put("device", deviceName)
                json.put("saveToDb", false)
                json.put("background", true)

                json.put("network", getNetworkInfo())

                val gps = currentGpsLocation ?: currentNetworkLocation
                if (gps != null) {
                    val gpsJson = JSONObject()
                    gpsJson.put("latitude", gps.latitude)
                    gpsJson.put("longitude", gps.longitude)
                    gpsJson.put("altitude", gps.altitude)
                    gpsJson.put("accuracy", gps.accuracy)
                    gpsJson.put("speed", gps.speed)
                    gpsJson.put("provider", gps.provider ?: "unknown")
                    json.put("gps", gpsJson)
                }

                val sensorsJson = JSONObject()
                for ((name, info) in sensorData) {
                    val sensorJson = JSONObject()
                    sensorJson.put("type", info.type)
                    val valuesArray = JSONArray()
                    for (v in info.values) {
                        valuesArray.put(v.toDouble())
                    }
                    sensorJson.put("values", valuesArray)
                    sensorsJson.put(name, sensorJson)
                }
                json.put("sensors", sensorsJson)

                val url = URL(SERVER_URL)
                val connection = url.openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.setRequestProperty("Content-Type", "application/json")
                connection.doOutput = true
                connection.connectTimeout = 10000
                connection.readTimeout = 10000

                val writer = OutputStreamWriter(connection.outputStream)
                writer.write(json.toString())
                writer.flush()
                writer.close()

                val responseCode = connection.responseCode
                connection.disconnect()

                if (responseCode == 200) {
                    Log.d("SensorService", "Data sent successfully")
                    updateNotification("Last sent: ${java.text.SimpleDateFormat("HH:mm:ss").format(java.util.Date())}")
                } else {
                    Log.e("SensorService", "Server error: $responseCode")
                }
            } catch (e: Exception) {
                Log.e("SensorService", "Send failed: ${e.message}")
            }
        }
    }

    private fun updateNotification(status: String) {
        val stopIntent = Intent(this, SensorService::class.java).apply {
            action = ACTION_STOP
        }
        val stopPendingIntent = PendingIntent.getService(
            this, 0, stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Sensor Monitor - Running")
            .setContentText(status)
            .setSmallIcon(android.R.drawable.ic_menu_compass)
            .setOngoing(true)
            .addAction(android.R.drawable.ic_media_pause, "Stop", stopPendingIntent)
            .build()

        val manager = getSystemService(NotificationManager::class.java)
        manager.notify(NOTIFICATION_ID, notification)
    }

    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
        sendRunnable?.let { handler.removeCallbacks(it) }
        sensorManager.unregisterListener(this)
        locationManager.removeUpdates(this)
        executor.shutdown()
        Log.d("SensorService", "Service destroyed")
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
