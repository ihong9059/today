package com.example.sensormonitor

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.os.Bundle
import android.os.Looper
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat
import com.example.sensormonitor.ui.theme.SensorMonitorTheme
import com.google.android.gms.location.*

const val APP_VERSION = "1.0.0"

class MainActivity : ComponentActivity(), SensorEventListener {

    private lateinit var sensorManager: SensorManager
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var locationCallback: LocationCallback? = null

    // 센서 값 상태
    private val accelerometer = mutableStateOf(floatArrayOf(0f, 0f, 0f))
    private val gyroscope = mutableStateOf(floatArrayOf(0f, 0f, 0f))
    private val magnetometer = mutableStateOf(floatArrayOf(0f, 0f, 0f))
    private val proximity = mutableStateOf(0f)
    private val light = mutableStateOf(0f)
    private val stepCount = mutableStateOf(0f)
    private val pressure = mutableStateOf(0f)
    private val rotationVector = mutableStateOf(floatArrayOf(0f, 0f, 0f, 0f))
    private val linearAcceleration = mutableStateOf(floatArrayOf(0f, 0f, 0f))
    private val gravity = mutableStateOf(floatArrayOf(0f, 0f, 0f))

    // GPS
    private val gpsLocation = mutableStateOf<Location?>(null)
    private val gpsEnabled = mutableStateOf(false)

    // 센서 존재 여부
    private val sensorAvailability = mutableMapOf<Int, Boolean>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        // 센서 존재 여부 확인
        checkSensorAvailability()

        enableEdgeToEdge()
        setContent {
            SensorMonitorTheme {
                SensorMonitorApp(
                    accelerometer = accelerometer.value,
                    gyroscope = gyroscope.value,
                    magnetometer = magnetometer.value,
                    proximity = proximity.value,
                    light = light.value,
                    stepCount = stepCount.value,
                    pressure = pressure.value,
                    rotationVector = rotationVector.value,
                    linearAcceleration = linearAcceleration.value,
                    gravity = gravity.value,
                    gpsLocation = gpsLocation.value,
                    gpsEnabled = gpsEnabled.value,
                    sensorAvailability = sensorAvailability,
                    onGpsToggle = { toggleGps() }
                )
            }
        }

        // 권한 요청
        requestPermissions()
    }

    private fun checkSensorAvailability() {
        val sensorTypes = listOf(
            Sensor.TYPE_ACCELEROMETER,
            Sensor.TYPE_GYROSCOPE,
            Sensor.TYPE_MAGNETIC_FIELD,
            Sensor.TYPE_PROXIMITY,
            Sensor.TYPE_LIGHT,
            Sensor.TYPE_STEP_COUNTER,
            Sensor.TYPE_PRESSURE,
            Sensor.TYPE_ROTATION_VECTOR,
            Sensor.TYPE_LINEAR_ACCELERATION,
            Sensor.TYPE_GRAVITY
        )
        sensorTypes.forEach { type ->
            sensorAvailability[type] = sensorManager.getDefaultSensor(type) != null
        }
    }

    private fun requestPermissions() {
        val permissions = arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACTIVITY_RECOGNITION
        )
        ActivityCompat.requestPermissions(this, permissions, 1001)
    }

    override fun onResume() {
        super.onResume()
        registerSensors()
    }

    override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this)
        stopGps()
    }

    private fun registerSensors() {
        val sensorTypes = listOf(
            Sensor.TYPE_ACCELEROMETER,
            Sensor.TYPE_GYROSCOPE,
            Sensor.TYPE_MAGNETIC_FIELD,
            Sensor.TYPE_PROXIMITY,
            Sensor.TYPE_LIGHT,
            Sensor.TYPE_STEP_COUNTER,
            Sensor.TYPE_PRESSURE,
            Sensor.TYPE_ROTATION_VECTOR,
            Sensor.TYPE_LINEAR_ACCELERATION,
            Sensor.TYPE_GRAVITY
        )

        sensorTypes.forEach { type ->
            sensorManager.getDefaultSensor(type)?.let { sensor ->
                sensorManager.registerListener(
                    this,
                    sensor,
                    SensorManager.SENSOR_DELAY_UI
                )
            }
        }
    }

    private fun toggleGps() {
        if (gpsEnabled.value) {
            stopGps()
        } else {
            startGps()
        }
    }

    private fun startGps() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            requestPermissions()
            return
        }

        val locationRequest = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 1000)
            .setMinUpdateIntervalMillis(500)
            .build()

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                result.lastLocation?.let {
                    gpsLocation.value = it
                }
            }
        }

        fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback!!,
            Looper.getMainLooper()
        )
        gpsEnabled.value = true
    }

    private fun stopGps() {
        locationCallback?.let {
            fusedLocationClient.removeLocationUpdates(it)
        }
        gpsEnabled.value = false
    }

    override fun onSensorChanged(event: SensorEvent) {
        when (event.sensor.type) {
            Sensor.TYPE_ACCELEROMETER -> accelerometer.value = event.values.copyOf()
            Sensor.TYPE_GYROSCOPE -> gyroscope.value = event.values.copyOf()
            Sensor.TYPE_MAGNETIC_FIELD -> magnetometer.value = event.values.copyOf()
            Sensor.TYPE_PROXIMITY -> proximity.value = event.values[0]
            Sensor.TYPE_LIGHT -> light.value = event.values[0]
            Sensor.TYPE_STEP_COUNTER -> stepCount.value = event.values[0]
            Sensor.TYPE_PRESSURE -> pressure.value = event.values[0]
            Sensor.TYPE_ROTATION_VECTOR -> rotationVector.value = event.values.copyOf().take(4).toFloatArray()
            Sensor.TYPE_LINEAR_ACCELERATION -> linearAcceleration.value = event.values.copyOf()
            Sensor.TYPE_GRAVITY -> gravity.value = event.values.copyOf()
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}

@Composable
fun SensorMonitorApp(
    accelerometer: FloatArray,
    gyroscope: FloatArray,
    magnetometer: FloatArray,
    proximity: Float,
    light: Float,
    stepCount: Float,
    pressure: Float,
    rotationVector: FloatArray,
    linearAcceleration: FloatArray,
    gravity: FloatArray,
    gpsLocation: Location?,
    gpsEnabled: Boolean,
    sensorAvailability: Map<Int, Boolean>,
    onGpsToggle: () -> Unit
) {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            // 헤더
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Sensor Monitor",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "v$APP_VERSION",
                    fontSize = 12.sp,
                    color = Color.Gray
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 센서 목록 (스크롤)
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                // GPS 카드
                GpsCard(
                    location = gpsLocation,
                    enabled = gpsEnabled,
                    onToggle = onGpsToggle
                )

                // 가속도계
                SensorCard(
                    title = "가속도계 (Accelerometer)",
                    available = sensorAvailability[Sensor.TYPE_ACCELEROMETER] == true,
                    values = listOf(
                        "X" to "%.3f m/s²".format(accelerometer.getOrElse(0) { 0f }),
                        "Y" to "%.3f m/s²".format(accelerometer.getOrElse(1) { 0f }),
                        "Z" to "%.3f m/s²".format(accelerometer.getOrElse(2) { 0f })
                    )
                )

                // 자이로스코프
                SensorCard(
                    title = "자이로스코프 (Gyroscope)",
                    available = sensorAvailability[Sensor.TYPE_GYROSCOPE] == true,
                    values = listOf(
                        "X" to "%.4f rad/s".format(gyroscope.getOrElse(0) { 0f }),
                        "Y" to "%.4f rad/s".format(gyroscope.getOrElse(1) { 0f }),
                        "Z" to "%.4f rad/s".format(gyroscope.getOrElse(2) { 0f })
                    )
                )

                // 지자기 센서
                SensorCard(
                    title = "지자기 센서 (Magnetometer)",
                    available = sensorAvailability[Sensor.TYPE_MAGNETIC_FIELD] == true,
                    values = listOf(
                        "X" to "%.2f μT".format(magnetometer.getOrElse(0) { 0f }),
                        "Y" to "%.2f μT".format(magnetometer.getOrElse(1) { 0f }),
                        "Z" to "%.2f μT".format(magnetometer.getOrElse(2) { 0f })
                    )
                )

                // 중력 센서
                SensorCard(
                    title = "중력 센서 (Gravity)",
                    available = sensorAvailability[Sensor.TYPE_GRAVITY] == true,
                    values = listOf(
                        "X" to "%.3f m/s²".format(gravity.getOrElse(0) { 0f }),
                        "Y" to "%.3f m/s²".format(gravity.getOrElse(1) { 0f }),
                        "Z" to "%.3f m/s²".format(gravity.getOrElse(2) { 0f })
                    )
                )

                // 선형 가속도
                SensorCard(
                    title = "선형 가속도 (Linear Accel)",
                    available = sensorAvailability[Sensor.TYPE_LINEAR_ACCELERATION] == true,
                    values = listOf(
                        "X" to "%.3f m/s²".format(linearAcceleration.getOrElse(0) { 0f }),
                        "Y" to "%.3f m/s²".format(linearAcceleration.getOrElse(1) { 0f }),
                        "Z" to "%.3f m/s²".format(linearAcceleration.getOrElse(2) { 0f })
                    )
                )

                // 회전 벡터
                SensorCard(
                    title = "회전 벡터 (Rotation Vector)",
                    available = sensorAvailability[Sensor.TYPE_ROTATION_VECTOR] == true,
                    values = listOf(
                        "X" to "%.4f".format(rotationVector.getOrElse(0) { 0f }),
                        "Y" to "%.4f".format(rotationVector.getOrElse(1) { 0f }),
                        "Z" to "%.4f".format(rotationVector.getOrElse(2) { 0f }),
                        "W" to "%.4f".format(rotationVector.getOrElse(3) { 0f })
                    )
                )

                // 근접 센서
                SensorCard(
                    title = "근접 센서 (Proximity)",
                    available = sensorAvailability[Sensor.TYPE_PROXIMITY] == true,
                    values = listOf(
                        "거리" to "%.1f cm".format(proximity)
                    )
                )

                // 조도 센서
                SensorCard(
                    title = "조도 센서 (Light)",
                    available = sensorAvailability[Sensor.TYPE_LIGHT] == true,
                    values = listOf(
                        "밝기" to "%.1f lux".format(light)
                    )
                )

                // 기압 센서
                SensorCard(
                    title = "기압 센서 (Pressure)",
                    available = sensorAvailability[Sensor.TYPE_PRESSURE] == true,
                    values = listOf(
                        "기압" to "%.2f hPa".format(pressure)
                    )
                )

                // 걸음 수
                SensorCard(
                    title = "걸음 수 (Step Counter)",
                    available = sensorAvailability[Sensor.TYPE_STEP_COUNTER] == true,
                    values = listOf(
                        "걸음" to "%.0f steps".format(stepCount)
                    )
                )

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

@Composable
fun SensorCard(
    title: String,
    available: Boolean,
    values: List<Pair<String, String>>
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (available) MaterialTheme.colorScheme.surface
                            else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
        )
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = title,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (available) MaterialTheme.colorScheme.onSurface else Color.Gray
                )
                Text(
                    text = if (available) "활성" else "없음",
                    fontSize = 10.sp,
                    color = if (available) Color(0xFF4CAF50) else Color.Gray,
                    modifier = Modifier
                        .background(
                            if (available) Color(0xFF4CAF50).copy(alpha = 0.1f)
                            else Color.Gray.copy(alpha = 0.1f),
                            RoundedCornerShape(4.dp)
                        )
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                )
            }

            if (available) {
                Spacer(modifier = Modifier.height(8.dp))
                values.forEach { (label, value) ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = label, fontSize = 12.sp, color = Color.Gray)
                        Text(text = value, fontSize = 12.sp, fontWeight = FontWeight.Medium)
                    }
                }
            }
        }
    }
}

@Composable
fun GpsCard(
    location: Location?,
    enabled: Boolean,
    onToggle: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.3f)
        )
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "GPS 위치",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
                Button(
                    onClick = onToggle,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (enabled) Color(0xFFF44336) else Color(0xFF4CAF50)
                    ),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 4.dp)
                ) {
                    Text(
                        text = if (enabled) "중지" else "시작",
                        fontSize = 12.sp
                    )
                }
            }

            Spacer(modifier = Modifier.height(8.dp))

            if (enabled && location != null) {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "위도", fontSize = 12.sp, color = Color.Gray)
                    Text(text = "%.6f°".format(location.latitude), fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "경도", fontSize = 12.sp, color = Color.Gray)
                    Text(text = "%.6f°".format(location.longitude), fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "고도", fontSize = 12.sp, color = Color.Gray)
                    Text(text = "%.1f m".format(location.altitude), fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "속도", fontSize = 12.sp, color = Color.Gray)
                    Text(text = "%.1f m/s".format(location.speed), fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = "정확도", fontSize = 12.sp, color = Color.Gray)
                    Text(text = "%.1f m".format(location.accuracy), fontSize = 12.sp, fontWeight = FontWeight.Medium)
                }
            } else if (enabled) {
                Text(text = "GPS 신호 대기 중...", fontSize = 12.sp, color = Color.Gray)
            } else {
                Text(text = "시작 버튼을 눌러 GPS를 활성화하세요", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}
