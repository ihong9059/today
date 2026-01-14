package com.example.sensormonitor

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.util.Base64
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SwitchCompat
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import org.json.JSONArray
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import java.nio.ByteBuffer
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity(), SensorEventListener, LocationListener {

    private lateinit var sensorManager: SensorManager
    private lateinit var locationManager: LocationManager
    private lateinit var connectivityManager: ConnectivityManager
    private lateinit var sensorContainer: LinearLayout
    private lateinit var sensorCountText: TextView
    private lateinit var deviceModelText: TextView
    private lateinit var headerServerStatusText: TextView

    private val sensorViews = mutableMapOf<String, TextView>()
    private val registeredSensors = mutableListOf<Sensor>()

    private val sensorData = mutableMapOf<String, SensorInfo>()
    private var currentGpsLocation: Location? = null
    private var currentNetworkLocation: Location? = null

    private lateinit var gpsValueText: TextView
    private lateinit var networkValueText: TextView
    private lateinit var serverStatusText: TextView
    private lateinit var dbSaveSwitch: SwitchCompat
    private lateinit var dbStatusText: TextView
    private var dbSaveEnabled = false

    private val LOCATION_PERMISSION_REQUEST = 1001
    private val CAMERA_PERMISSION_REQUEST = 1002

    private val SERVER_URL = "http://52.78.119.132:5000/api/sensor"
    private val SEND_INTERVAL_MS = 3000L

    private val executor = Executors.newSingleThreadExecutor()
    private val handler = Handler(Looper.getMainLooper())
    private var isSending = false

    // Camera
    private lateinit var cameraExecutor: ExecutorService
    private var imageCapture: ImageCapture? = null
    private var previewView: PreviewView? = null
    private var currentImageBase64: String? = null
    private var cameraEnabled = false
n    // Device name for server
    private val deviceName: String by lazy {
        "${Build.MANUFACTURER} ${Build.MODEL}"
    }

    data class SensorInfo(
        val name: String,
        val type: String,
        val values: FloatArray
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        locationManager = getSystemService(Context.LOCATION_SERVICE) as LocationManager
        connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        sensorContainer = findViewById(R.id.sensorContainer)
        sensorCountText = findViewById(R.id.sensorCountText)

        // Header TextViews
        deviceModelText = findViewById(R.id.deviceModelText)
        headerServerStatusText = findViewById(R.id.serverStatusText)

        // Set device model name
        deviceModelText.text = "Device: $deviceName"
        headerServerStatusText.text = "Server: Connecting..."

        cameraExecutor = Executors.newSingleThreadExecutor()

        setupDbSwitch()
        setupCameraSection()
        setupServerStatusSection()
        setupGpsSection()
        setupSensorList()
        requestPermissions()
        startDataTransmission()
    }

    private fun setupDbSwitch() {
        dbSaveSwitch = findViewById(R.id.dbSaveSwitch)
        dbStatusText = findViewById(R.id.dbStatusText)

        dbSaveSwitch.setOnCheckedChangeListener { _, isChecked ->
            dbSaveEnabled = isChecked
            if (isChecked) {
                dbStatusText.text = "ON - Recording"
                dbStatusText.setTextColor(ContextCompat.getColor(this, android.R.color.holo_green_light))
            } else {
                dbStatusText.text = "OFF"
                dbStatusText.setTextColor(ContextCompat.getColor(this, android.R.color.holo_red_light))
            }
        }
    }

    private fun setupCameraSection() {
        // Camera Header
        val cameraHeader = TextView(this).apply {
            text = "Camera Stream"
            textSize = 18f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setBackgroundColor(ContextCompat.getColor(context, android.R.color.holo_purple))
            setPadding(24, 16, 24, 16)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }
        sensorContainer.addView(cameraHeader)

        // Camera Preview Card
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 16, 24, 16)
            setBackgroundResource(R.drawable.card_background)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }

        val nameText = TextView(this).apply {
            text = "Rear Camera Preview"
            textSize = 16f
            setTextColor(ContextCompat.getColor(context, android.R.color.black))
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        card.addView(nameText)

        val descText = TextView(this).apply {
            text = "Images captured every 3 seconds"
            textSize = 12f
            setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray))
        }
        card.addView(descText)

        // Preview View
        previewView = PreviewView(this).apply {
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                400
            )
            params.setMargins(0, 16, 0, 0)
            layoutParams = params
        }
        card.addView(previewView)

        sensorContainer.addView(card)
    }

    private fun setupServerStatusSection() {
        val serverHeader = TextView(this).apply {
            text = "Server Connection"
            textSize = 18f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setBackgroundColor(ContextCompat.getColor(context, android.R.color.holo_green_dark))
            setPadding(24, 16, 24, 16)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }
        sensorContainer.addView(serverHeader)

        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 16, 24, 16)
            setBackgroundResource(R.drawable.card_background)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }

        val nameText = TextView(this).apply {
            text = "EC2 Monitor Server"
            textSize = 16f
            setTextColor(ContextCompat.getColor(context, android.R.color.black))
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        card.addView(nameText)

        val urlText = TextView(this).apply {
            text = "URL: $SERVER_URL"
            textSize = 12f
            setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray))
        }
        card.addView(urlText)

        serverStatusText = TextView(this).apply {
            text = "Status: Initializing..."
            textSize = 14f
            setTextColor(ContextCompat.getColor(context, R.color.sensor_value))
            setPadding(0, 8, 0, 0)
        }
        card.addView(serverStatusText)

        sensorContainer.addView(card)
    }

    private fun setupGpsSection() {
        val gpsHeader = TextView(this).apply {
            text = "GPS / Location Services"
            textSize = 18f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setBackgroundColor(ContextCompat.getColor(context, R.color.sensor_value))
            setPadding(24, 16, 24, 16)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }
        sensorContainer.addView(gpsHeader)

        val gpsCard = createLocationCard("GPS (Satellite)", "High accuracy, requires clear sky view")
        sensorContainer.addView(gpsCard.first)
        gpsValueText = gpsCard.second

        val networkCard = createLocationCard("Network Location", "WiFi/Cell tower based, works indoors")
        sensorContainer.addView(networkCard.first)
        networkValueText = networkCard.second

        val sensorHeader = TextView(this).apply {
            text = "Hardware Sensors"
            textSize = 18f
            setTextColor(ContextCompat.getColor(context, android.R.color.white))
            setBackgroundColor(ContextCompat.getColor(context, R.color.sensor_value))
            setPadding(24, 16, 24, 16)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 16, 0, 16)
            layoutParams = params
        }
        sensorContainer.addView(sensorHeader)
    }

    private fun createLocationCard(name: String, description: String): Pair<LinearLayout, TextView> {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 16, 24, 16)
            setBackgroundResource(R.drawable.card_background)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }

        val nameText = TextView(this).apply {
            text = name
            textSize = 16f
            setTextColor(ContextCompat.getColor(context, android.R.color.black))
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        card.addView(nameText)

        val descText = TextView(this).apply {
            text = description
            textSize = 12f
            setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray))
        }
        card.addView(descText)

        val valueText = TextView(this).apply {
            text = "Waiting for location..."
            textSize = 14f
            setTextColor(ContextCompat.getColor(context, R.color.sensor_value))
            setPadding(0, 8, 0, 0)
        }
        card.addView(valueText)

        return Pair(card, valueText)
    }

    private fun requestPermissions() {
        val permissions = mutableListOf<String>()

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.ACCESS_FINE_LOCATION)
            permissions.add(Manifest.permission.ACCESS_COARSE_LOCATION)
        }

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.CAMERA)
        }

        if (permissions.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, permissions.toTypedArray(), LOCATION_PERMISSION_REQUEST)
        } else {
            startLocationUpdates()
            startCamera()
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        permissions.forEachIndexed { index, permission ->
            if (grantResults[index] == PackageManager.PERMISSION_GRANTED) {
                when (permission) {
                    Manifest.permission.ACCESS_FINE_LOCATION -> startLocationUpdates()
                    Manifest.permission.CAMERA -> startCamera()
                }
            }
        }

        if (grantResults.isEmpty() || grantResults.all { it != PackageManager.PERMISSION_GRANTED }) {
            gpsValueText.text = "Permission denied"
            networkValueText.text = "Permission denied"
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(previewView?.surfaceProvider)
                }

            imageCapture = ImageCapture.Builder()
                .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                .setTargetRotation(windowManager.defaultDisplay.rotation)
                .build()

            val imageAnalyzer = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also {
                    it.setAnalyzer(cameraExecutor, ImageAnalyzer { base64 ->
                        currentImageBase64 = base64
                    })
                }

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    CameraSelector.DEFAULT_BACK_CAMERA,
                    preview,
                    imageCapture,
                    imageAnalyzer
                )
                cameraEnabled = true
                Log.d("Camera", "Camera started successfully")
            } catch (e: Exception) {
                Log.e("Camera", "Camera binding failed", e)
            }
        }, ContextCompat.getMainExecutor(this))
    }

    private class ImageAnalyzer(private val onImageCaptured: (String) -> Unit) : ImageAnalysis.Analyzer {
        private var lastAnalyzedTimestamp = 0L

        override fun analyze(image: ImageProxy) {
            val currentTimestamp = System.currentTimeMillis()
            // Capture every 3 seconds
            if (currentTimestamp - lastAnalyzedTimestamp >= 3000) {
                val bitmap = yuv420ToBitmap(image)
                if (bitmap != null) {
                    // Resize and compress (640x480 for better quality)
                    val scaledBitmap = Bitmap.createScaledBitmap(bitmap, 640, 480, true)
                    val outputStream = ByteArrayOutputStream()
                    scaledBitmap.compress(Bitmap.CompressFormat.JPEG, 70, outputStream)
                    val base64 = Base64.encodeToString(outputStream.toByteArray(), Base64.NO_WRAP)
                    onImageCaptured(base64)
                    scaledBitmap.recycle()
                    bitmap.recycle()
                }
                lastAnalyzedTimestamp = currentTimestamp
            }
            image.close()
        }

        private fun yuv420ToBitmap(image: ImageProxy): Bitmap? {
            return try {
                val yPlane = image.planes[0]
                val uPlane = image.planes[1]
                val vPlane = image.planes[2]

                val yBuffer = yPlane.buffer
                val uBuffer = uPlane.buffer
                val vBuffer = vPlane.buffer

                val ySize = yBuffer.remaining()
                val uSize = uBuffer.remaining()
                val vSize = vBuffer.remaining()

                val width = image.width
                val height = image.height

                // NV21 format: YYYYYYYY VUVU
                val nv21 = ByteArray(width * height * 3 / 2)

                // Copy Y plane
                yBuffer.get(nv21, 0, ySize)

                // Interleave V and U planes for NV21
                val uvPixelStride = vPlane.pixelStride
                val uvRowStride = vPlane.rowStride

                var uvIndex = width * height
                for (row in 0 until height / 2) {
                    for (col in 0 until width / 2) {
                        val vIndex = row * uvRowStride + col * uvPixelStride
                        val uIndex = row * uvRowStride + col * uvPixelStride

                        vBuffer.position(vIndex)
                        uBuffer.position(uIndex)

                        nv21[uvIndex++] = vBuffer.get()
                        nv21[uvIndex++] = uBuffer.get()
                    }
                }

                val yuvImage = android.graphics.YuvImage(
                    nv21,
                    android.graphics.ImageFormat.NV21,
                    width,
                    height,
                    null
                )

                val out = ByteArrayOutputStream()
                yuvImage.compressToJpeg(android.graphics.Rect(0, 0, width, height), 80, out)
                val imageBytes = out.toByteArray()
                val bmp = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)

                // Apply rotation
                val matrix = Matrix()
                matrix.postRotate(image.imageInfo.rotationDegrees.toFloat())
                Bitmap.createBitmap(bmp, 0, 0, bmp.width, bmp.height, matrix, true)
            } catch (e: Exception) {
                Log.e("ImageAnalyzer", "YUV conversion failed: ${e.message}", e)
                null
            }
        }
    }

    private fun startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            return
        }

        if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            locationManager.requestLocationUpdates(
                LocationManager.GPS_PROVIDER,
                1000L,
                1f,
                this
            )
            locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER)?.let {
                updateGpsDisplay(it)
                currentGpsLocation = it
            }
        } else {
            gpsValueText.text = "GPS disabled"
        }

        if (locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
            locationManager.requestLocationUpdates(
                LocationManager.NETWORK_PROVIDER,
                1000L,
                1f,
                object : LocationListener {
                    override fun onLocationChanged(location: Location) {
                        updateNetworkDisplay(location)
                        currentNetworkLocation = location
                    }
                    override fun onProviderEnabled(provider: String) {}
                    override fun onProviderDisabled(provider: String) {
                        networkValueText.text = "Network location disabled"
                    }
                }
            )
            locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER)?.let {
                updateNetworkDisplay(it)
                currentNetworkLocation = it
            }
        } else {
            networkValueText.text = "Network location disabled"
        }
    }

    private fun updateGpsDisplay(location: Location) {
        val text = String.format(
            "Lat: %.6f  Lon: %.6f\nAlt: %.1fm  Acc: %.1fm  Spd: %.1fm/s",
            location.latitude,
            location.longitude,
            location.altitude,
            location.accuracy,
            location.speed
        )
        gpsValueText.text = text
    }

    private fun updateNetworkDisplay(location: Location) {
        val text = String.format(
            "Lat: %.6f  Lon: %.6f\nAcc: %.1fm",
            location.latitude,
            location.longitude,
            location.accuracy
        )
        networkValueText.text = text
    }

    override fun onLocationChanged(location: Location) {
        if (location.provider == LocationManager.GPS_PROVIDER) {
            updateGpsDisplay(location)
            currentGpsLocation = location
        }
    }

    override fun onProviderEnabled(provider: String) {}

    override fun onProviderDisabled(provider: String) {
        if (provider == LocationManager.GPS_PROVIDER) {
            gpsValueText.text = "GPS disabled"
        }
    }

    private fun setupSensorList() {
        val allSensors = sensorManager.getSensorList(Sensor.TYPE_ALL)
        sensorCountText.text = "Total: ${allSensors.size} Sensors + GPS + Camera"

        for (sensor in allSensors) {
            val sensorCard = createSensorCard(sensor)
            sensorContainer.addView(sensorCard)
            registeredSensors.add(sensor)
        }
    }

    private fun createSensorCard(sensor: Sensor): LinearLayout {
        val card = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 16, 24, 16)
            setBackgroundResource(R.drawable.card_background)
            val params = LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            )
            params.setMargins(0, 0, 0, 16)
            layoutParams = params
        }

        val nameText = TextView(this).apply {
            text = sensor.name
            textSize = 16f
            setTextColor(ContextCompat.getColor(context, android.R.color.black))
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        card.addView(nameText)

        val infoText = TextView(this).apply {
            text = "Type: ${getSensorTypeName(sensor.type)} | Vendor: ${sensor.vendor}"
            textSize = 12f
            setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray))
        }
        card.addView(infoText)

        val specText = TextView(this).apply {
            text = "Range: ${sensor.maximumRange} | Resolution: ${sensor.resolution} | Power: ${sensor.power}mA"
            textSize = 11f
            setTextColor(ContextCompat.getColor(context, android.R.color.darker_gray))
        }
        card.addView(specText)

        val valueText = TextView(this).apply {
            text = "Value: Waiting..."
            textSize = 14f
            setTextColor(ContextCompat.getColor(context, R.color.sensor_value))
            setPadding(0, 8, 0, 0)
        }
        card.addView(valueText)

        sensorViews[sensor.name] = valueText

        return card
    }

    private fun getSensorTypeName(type: Int): String {
        return when (type) {
            Sensor.TYPE_ACCELEROMETER -> "Accelerometer"
            Sensor.TYPE_MAGNETIC_FIELD -> "Magnetic Field"
            Sensor.TYPE_ORIENTATION -> "Orientation"
            Sensor.TYPE_GYROSCOPE -> "Gyroscope"
            Sensor.TYPE_LIGHT -> "Light"
            Sensor.TYPE_PRESSURE -> "Pressure"
            Sensor.TYPE_TEMPERATURE -> "Temperature"
            Sensor.TYPE_PROXIMITY -> "Proximity"
            Sensor.TYPE_GRAVITY -> "Gravity"
            Sensor.TYPE_LINEAR_ACCELERATION -> "Linear Acceleration"
            Sensor.TYPE_ROTATION_VECTOR -> "Rotation Vector"
            Sensor.TYPE_RELATIVE_HUMIDITY -> "Humidity"
            Sensor.TYPE_AMBIENT_TEMPERATURE -> "Ambient Temperature"
            Sensor.TYPE_MAGNETIC_FIELD_UNCALIBRATED -> "Magnetic Field (Uncal)"
            Sensor.TYPE_GAME_ROTATION_VECTOR -> "Game Rotation Vector"
            Sensor.TYPE_GYROSCOPE_UNCALIBRATED -> "Gyroscope (Uncal)"
            Sensor.TYPE_SIGNIFICANT_MOTION -> "Significant Motion"
            Sensor.TYPE_STEP_DETECTOR -> "Step Detector"
            Sensor.TYPE_STEP_COUNTER -> "Step Counter"
            Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR -> "Geomagnetic Rotation"
            Sensor.TYPE_HEART_RATE -> "Heart Rate"
            Sensor.TYPE_POSE_6DOF -> "Pose 6DOF"
            Sensor.TYPE_STATIONARY_DETECT -> "Stationary Detect"
            Sensor.TYPE_MOTION_DETECT -> "Motion Detect"
            Sensor.TYPE_HEART_BEAT -> "Heart Beat"
            Sensor.TYPE_LOW_LATENCY_OFFBODY_DETECT -> "Off-body Detect"
            Sensor.TYPE_ACCELEROMETER_UNCALIBRATED -> "Accelerometer (Uncal)"
            else -> "Type: $type"
        }
    }

    override fun onResume() {
        super.onResume()
        for (sensor in registeredSensors) {
            sensorManager.registerListener(this, sensor, SensorManager.SENSOR_DELAY_UI)
        }
        isSending = true
    }

    override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this)
        isSending = false
    }

    override fun onDestroy() {
        super.onDestroy()
        locationManager.removeUpdates(this)
        isSending = false
        executor.shutdown()
        cameraExecutor.shutdown()
    }

    override fun onSensorChanged(event: SensorEvent) {
        val valueText = sensorViews[event.sensor.name] ?: return

        val valueStr = when (event.values.size) {
            1 -> String.format("Value: %.2f", event.values[0])
            2 -> String.format("X: %.2f  Y: %.2f", event.values[0], event.values[1])
            3 -> String.format("X: %.2f  Y: %.2f  Z: %.2f", event.values[0], event.values[1], event.values[2])
            4 -> String.format("X: %.2f  Y: %.2f  Z: %.2f  W: %.2f", event.values[0], event.values[1], event.values[2], event.values[3])
            else -> "Values: ${event.values.take(6).joinToString(", ") { String.format("%.2f", it) }}"
        }

        valueText.text = valueStr

        sensorData[event.sensor.name] = SensorInfo(
            name = event.sensor.name,
            type = getSensorTypeName(event.sensor.type),
            values = event.values.clone()
        )
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    private fun startDataTransmission() {
        handler.postDelayed(object : Runnable {
            override fun run() {
                if (isSending) {
                    sendDataToServer()
                }
                handler.postDelayed(this, SEND_INTERVAL_MS)
            }
        }, SEND_INTERVAL_MS)
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
                json.put("saveToDb", dbSaveEnabled)

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

                // Add camera image
                currentImageBase64?.let {
                    json.put("camera", it)
                }

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

                handler.post {
                    val networkType = getNetworkInfo().optString("type", "Unknown")
                    val hasImage = if (currentImageBase64 != null) " + Image" else ""
                    val dbStatus = if (dbSaveEnabled) " [DB: ON]" else ""
                    if (responseCode == 200) {
                        serverStatusText.text = "Status: Connected ($networkType$hasImage)$dbStatus\nLast sent: ${java.text.SimpleDateFormat("HH:mm:ss").format(java.util.Date())}"
                        serverStatusText.setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.holo_green_dark))
                        headerServerStatusText.text = "Server: Connected"
                        headerServerStatusText.setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.holo_green_light))
                    } else {
                        serverStatusText.text = "Status: Error $responseCode ($networkType)"
                        serverStatusText.setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.holo_red_dark))
                    }
                }
            } catch (e: Exception) {
                handler.post {
                    val networkType = getNetworkInfo().optString("type", "Unknown")
                    serverStatusText.text = "Status: Failed ($networkType)\n${e.message}"
                    serverStatusText.setTextColor(ContextCompat.getColor(this@MainActivity, android.R.color.holo_red_dark))
                }
            }
        }
    }
}
