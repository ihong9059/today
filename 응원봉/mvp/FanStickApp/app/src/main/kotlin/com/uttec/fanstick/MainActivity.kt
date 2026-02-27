package com.uttec.fanstick

import android.Manifest
import android.annotation.SuppressLint
import android.bluetooth.*
import android.bluetooth.le.*
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.app.ActivityCompat
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException
import java.util.*
import java.util.concurrent.TimeUnit

private const val TAG = "FanStick"

// BLE UUIDs (ESP32 펌웨어와 동일)
private const val SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
private const val LED_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"
private const val TEXT_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a9"

// Server URLs - 원격 Mac 서버 사용
private const val AI_SERVER_URL = "http://100.79.180.64:8081"
private const val CONTROL_CENTER_WS_URL = "ws://100.79.180.64:8090/ws"

class MainActivity : ComponentActivity(), TextToSpeech.OnInitListener {

    private var bluetoothAdapter: BluetoothAdapter? = null
    private var bluetoothGatt: BluetoothGatt? = null
    private var ledCharacteristic: BluetoothGattCharacteristic? = null
    private var textCharacteristic: BluetoothGattCharacteristic? = null

    private var speechRecognizer: SpeechRecognizer? = null
    private var tts: TextToSpeech? = null

    // HTTP Client
    private val httpClient = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    // WebSocket
    private var controlWebSocket: WebSocket? = null
    private val deviceId = UUID.randomUUID().toString().take(8)

    // UI State
    private val _bleState = mutableStateOf(BleState.DISCONNECTED)
    private val _connectedBleName = mutableStateOf("")
    private val _serverConnected = mutableStateOf(false)
    private val _controlConnected = mutableStateOf(false)
    private val _scannedDevices = mutableStateListOf<BluetoothDevice>()
    private val _currentColor = mutableStateOf(Triple(128, 0, 128)) // 보라색
    private val _statusMessage = mutableStateOf("서버 연결을 시작하세요")
    private val _isRecording = mutableStateOf(false)
    private val _recognizedText = mutableStateOf("")
    private val _showDeviceList = mutableStateOf(false)

    // Concert Info
    private val _concertName = mutableStateOf("")
    private val _currentSong = mutableStateOf("")
    private val _currentSongIndex = mutableStateOf(0)
    private val _totalSongs = mutableStateOf(0)
    private val _songColor = mutableStateOf(Triple(128, 0, 128))

    // AI Response
    private val _aiResponse = mutableStateOf("")
    private val _isAiLoading = mutableStateOf(false)

    // Winner/Message
    private val _isWinner = mutableStateOf(false)
    private val _displayMessage = mutableStateOf("")

    private val handler = Handler(Looper.getMainLooper())
    private val coroutineScope = CoroutineScope(Dispatchers.Main + Job())

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val allGranted = permissions.values.all { it }
        if (allGranted) {
            _statusMessage.value = "권한 허용됨"
        } else {
            _statusMessage.value = "권한이 필요합니다"
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Bluetooth 초기화
        val bluetoothManager = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        bluetoothAdapter = bluetoothManager.adapter

        // TTS 초기화
        tts = TextToSpeech(this, this)

        // 음성인식 초기화
        if (SpeechRecognizer.isRecognitionAvailable(this)) {
            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this)
            setupSpeechRecognizer()
        }

        // 권한 요청
        requestPermissions()

        setContent {
            FanStickApp()
        }

        // 자동으로 서버와 Control Center에 연결
        handler.postDelayed({
            connectToServer()
            connectControlCenter()
        }, 1000)
    }

    private fun requestPermissions() {
        val permissions = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.INTERNET
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            permissions.add(Manifest.permission.BLUETOOTH_SCAN)
            permissions.add(Manifest.permission.BLUETOOTH_CONNECT)
        }
        permissionLauncher.launch(permissions.toTypedArray())
    }

    @Composable
    fun FanStickApp() {
        val bleState by _bleState
        val serverConnected by _serverConnected
        val controlConnected by _controlConnected
        val scannedDevices = _scannedDevices
        val currentColor by _currentColor
        val statusMessage by _statusMessage
        val isRecording by _isRecording
        val recognizedText by _recognizedText
        val showDeviceList by _showDeviceList
        val concertName by _concertName
        val currentSong by _currentSong
        val currentSongIndex by _currentSongIndex
        val totalSongs by _totalSongs
        val aiResponse by _aiResponse
        val isAiLoading by _isAiLoading
        val isWinner by _isWinner
        val displayMessage by _displayMessage

        MaterialTheme(
            colorScheme = darkColorScheme(
                primary = Color(0xFF9C27B0),
                background = Color(0xFF121212),
                surface = Color(0xFF1E1E1E)
            )
        ) {
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState())
                        .padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    // 상단 바 - 연결 상태
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(
                            "AI FanStick",
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )

                        Row {
                            // 서버 연결
                            IconButton(onClick = {
                                if (!serverConnected) connectToServer()
                            }) {
                                Icon(
                                    Icons.Default.Cloud,
                                    contentDescription = "Server",
                                    tint = if (serverConnected) Color.Green else Color.Gray
                                )
                            }

                            // Control Center 연결
                            IconButton(onClick = {
                                if (!controlConnected) connectControlCenter()
                                else disconnectControlCenter()
                            }) {
                                Icon(
                                    Icons.Default.Wifi,
                                    contentDescription = "Control",
                                    tint = if (controlConnected) Color.Green else Color.Gray
                                )
                            }

                            // BLE 상태 아이콘
                            IconButton(onClick = {
                                when (bleState) {
                                    BleState.DISCONNECTED -> {
                                        _showDeviceList.value = true
                                        startBleScan()
                                    }
                                    BleState.CONNECTED -> disconnectBle()
                                    else -> {}
                                }
                            }) {
                                Icon(
                                    Icons.Default.Bluetooth,
                                    contentDescription = "BLE",
                                    tint = when (bleState) {
                                        BleState.CONNECTED -> Color.Green
                                        BleState.SCANNING, BleState.CONNECTING -> Color.Yellow
                                        else -> Color.Gray
                                    }
                                )
                            }
                        }
                    }

                    // 연결 상태 표시
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        StatusChip("서버", serverConnected)
                        StatusChip("본부", controlConnected)
                        StatusChip("BLE", bleState == BleState.CONNECTED)
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // 상태 메시지
                    Text(
                        statusMessage,
                        color = Color.Gray,
                        fontSize = 14.sp
                    )

                    // 당첨 표시
                    if (isWinner) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Card(
                            colors = CardDefaults.cardColors(containerColor = Color(0xFFFFD700)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                "🎉 당첨! 축하합니다! 🎉",
                                modifier = Modifier.padding(16.dp),
                                color = Color.Black,
                                fontWeight = FontWeight.Bold,
                                fontSize = 18.sp,
                                textAlign = TextAlign.Center
                            )
                        }
                    }

                    // 본부 메시지
                    if (displayMessage.isNotEmpty()) {
                        Spacer(modifier = Modifier.height(8.dp))
                        Card(
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF2196F3)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                displayMessage,
                                modifier = Modifier.padding(12.dp),
                                color = Color.White,
                                textAlign = TextAlign.Center
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // 콘서트 정보
                    if (concertName.isNotEmpty()) {
                        Card(
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D)),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(
                                modifier = Modifier.padding(16.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {
                                Text(concertName, color = Color.White, fontWeight = FontWeight.Bold)
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(
                                    "🎵 $currentSong",
                                    color = Color(0xFF9C27B0),
                                    fontSize = 18.sp
                                )
                                Text(
                                    "${currentSongIndex + 1} / $totalSongs",
                                    color = Color.Gray,
                                    fontSize = 14.sp
                                )

                                Spacer(modifier = Modifier.height(8.dp))
                                Row {
                                    Button(
                                        onClick = { prevSong() },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF424242))
                                    ) {
                                        Text("◀ 이전")
                                    }
                                    Spacer(modifier = Modifier.width(16.dp))
                                    Button(
                                        onClick = { nextSong() },
                                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF424242))
                                    ) {
                                        Text("다음 ▶")
                                    }
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                    }

                    // LED 색상 표시
                    Box(
                        modifier = Modifier
                            .size(100.dp)
                            .clip(CircleShape)
                            .background(
                                Color(
                                    red = currentColor.first,
                                    green = currentColor.second,
                                    blue = currentColor.third
                                )
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            "LED",
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // 색상 프리셋 버튼
                    Text("색상 선택", color = Color.White, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        ColorButton("빨강", Color.Red) { sendColor(255, 0, 0) }
                        ColorButton("초록", Color.Green) { sendColor(0, 255, 0) }
                        ColorButton("파랑", Color.Blue) { sendColor(0, 0, 255) }
                        ColorButton("보라", Color(0xFF9C27B0)) { sendColor(128, 0, 128) }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // 패턴 버튼
                    Text("패턴 선택", color = Color.White, fontSize = 16.sp)
                    Spacer(modifier = Modifier.height(8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        PatternButton("무지개") { sendPattern("rainbow") }
                        PatternButton("펄스") { sendPattern("pulse") }
                        PatternButton("깜빡임") { sendPattern("blink") }
                        PatternButton("단색") { sendPattern("solid") }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // AI 응답
                    if (aiResponse.isNotEmpty() || isAiLoading) {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text("🤖 AI 응답", color = Color(0xFF9C27B0), fontWeight = FontWeight.Bold)
                                Spacer(modifier = Modifier.height(8.dp))
                                if (isAiLoading) {
                                    Text("⏳ 생각 중...", color = Color.Gray)
                                } else {
                                    Text(aiResponse, color = Color.White)
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                    }

                    // 인식된 텍스트
                    if (recognizedText.isNotEmpty()) {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
                        ) {
                            Text(
                                "\"$recognizedText\"",
                                modifier = Modifier.padding(16.dp),
                                color = Color.White
                            )
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                    }

                    // 마이크 버튼
                    FloatingActionButton(
                        onClick = { startListening() },
                        modifier = Modifier.size(72.dp),
                        containerColor = if (isRecording) Color.Red else MaterialTheme.colorScheme.primary
                    ) {
                        Icon(
                            Icons.Default.Mic,
                            contentDescription = "음성 입력",
                            modifier = Modifier.size(36.dp),
                            tint = Color.White
                        )
                    }

                    Spacer(modifier = Modifier.height(16.dp))
                }

                // 디바이스 목록 다이얼로그
                if (showDeviceList) {
                    AlertDialog(
                        onDismissRequest = {
                            _showDeviceList.value = false
                            stopBleScan()
                        },
                        title = { Text("BLE 장치 선택") },
                        text = {
                            if (scannedDevices.isEmpty()) {
                                Column(
                                    horizontalAlignment = Alignment.CenterHorizontally,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Text("⏳", fontSize = 32.sp)
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Text("스캔 중...")
                                }
                            } else {
                                LazyColumn {
                                    items(scannedDevices) { device ->
                                        DeviceItem(device) {
                                            _showDeviceList.value = false
                                            stopBleScan()
                                            connectToDevice(device)
                                        }
                                    }
                                }
                            }
                        },
                        confirmButton = {
                            TextButton(onClick = {
                                _showDeviceList.value = false
                                stopBleScan()
                            }) {
                                Text("닫기")
                            }
                        }
                    )
                }
            }
        }
    }

    @Composable
    fun StatusChip(label: String, connected: Boolean) {
        Surface(
            color = if (connected) Color(0xFF4CAF50) else Color(0xFF757575),
            shape = RoundedCornerShape(16.dp)
        ) {
            Text(
                label,
                modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                color = Color.White,
                fontSize = 12.sp
            )
        }
    }

    @Composable
    fun ColorButton(label: String, color: Color, onClick: () -> Unit) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Button(
                onClick = onClick,
                modifier = Modifier.size(56.dp),
                colors = ButtonDefaults.buttonColors(containerColor = color),
                shape = CircleShape,
                contentPadding = PaddingValues(0.dp)
            ) {}
            Text(label, color = Color.Gray, fontSize = 12.sp)
        }
    }

    @Composable
    fun PatternButton(label: String, onClick: () -> Unit) {
        OutlinedButton(
            onClick = onClick,
            modifier = Modifier.padding(4.dp)
        ) {
            Text(label, fontSize = 12.sp)
        }
    }

    @SuppressLint("MissingPermission")
    @Composable
    fun DeviceItem(device: BluetoothDevice, onClick: () -> Unit) {
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(4.dp)
                .clickable { onClick() },
            colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
        ) {
            Row(
                modifier = Modifier.padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Default.Bluetooth, contentDescription = null, tint = Color.Blue)
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text(
                        device.name ?: "Unknown Device",
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        device.address,
                        fontSize = 12.sp,
                        color = Color.Gray
                    )
                }
            }
        }
    }

    // ===== 서버 연결 =====

    private fun connectToServer() {
        _statusMessage.value = "서버 연결 중..."

        coroutineScope.launch(Dispatchers.IO) {
            try {
                val request = Request.Builder()
                    .url("$AI_SERVER_URL/api/status")
                    .build()

                httpClient.newCall(request).execute().use { response ->
                    if (response.isSuccessful) {
                        withContext(Dispatchers.Main) {
                            _serverConnected.value = true
                            _statusMessage.value = "서버 연결됨"
                            loadConcertInfo()
                        }
                    } else {
                        withContext(Dispatchers.Main) {
                            _statusMessage.value = "서버 연결 실패: ${response.code}"
                        }
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _statusMessage.value = "서버 연결 오류: ${e.message}"
                    Log.e(TAG, "Server connection error", e)
                }
            }
        }
    }

    private fun loadConcertInfo() {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val request = Request.Builder()
                    .url("$AI_SERVER_URL/api/concert")
                    .build()

                httpClient.newCall(request).execute().use { response ->
                    if (response.isSuccessful) {
                        val json = JSONObject(response.body?.string() ?: "{}")
                        withContext(Dispatchers.Main) {
                            _concertName.value = json.optString("concert_name", "")

                            val currentSongObj = json.optJSONObject("current_song")
                            if (currentSongObj != null) {
                                _currentSong.value = currentSongObj.optString("title", "")
                                _currentSongIndex.value = currentSongObj.optInt("index", 0)

                                val colorArray = currentSongObj.optJSONArray("color")
                                if (colorArray != null && colorArray.length() >= 3) {
                                    val r = colorArray.getInt(0)
                                    val g = colorArray.getInt(1)
                                    val b = colorArray.getInt(2)
                                    _songColor.value = Triple(r, g, b)
                                    _currentColor.value = Triple(r, g, b)
                                    sendColor(r, g, b)
                                }
                            }

                            _totalSongs.value = json.optInt("total_songs", 0)
                        }
                    }
                }
            } catch (e: Exception) {
                Log.e(TAG, "Load concert info error", e)
            }
        }
    }

    private fun nextSong() {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val request = Request.Builder()
                    .url("$AI_SERVER_URL/api/song/next")
                    .post("".toRequestBody(null))
                    .build()

                httpClient.newCall(request).execute()
                loadConcertInfo()
            } catch (e: Exception) {
                Log.e(TAG, "Next song error", e)
            }
        }
    }

    private fun prevSong() {
        coroutineScope.launch(Dispatchers.IO) {
            try {
                val request = Request.Builder()
                    .url("$AI_SERVER_URL/api/song/prev")
                    .post("".toRequestBody(null))
                    .build()

                httpClient.newCall(request).execute()
                loadConcertInfo()
            } catch (e: Exception) {
                Log.e(TAG, "Prev song error", e)
            }
        }
    }

    private fun askAI(question: String) {
        _isAiLoading.value = true
        _aiResponse.value = ""

        coroutineScope.launch(Dispatchers.IO) {
            try {
                // BLE 이름을 질문에 포함시켜 AI가 활용하도록 함
                val bleInfo = if (_connectedBleName.value.isNotEmpty()) {
                    " (현재 연결된 응원봉: ${_connectedBleName.value})"
                } else ""
                val enhancedQuestion = question + bleInfo

                val jsonBody = JSONObject().apply {
                    put("question", enhancedQuestion)
                    put("ble_name", _connectedBleName.value)
                }.toString()

                val request = Request.Builder()
                    .url("$AI_SERVER_URL/api/ask")
                    .post(jsonBody.toRequestBody("application/json".toMediaType()))
                    .build()

                httpClient.newCall(request).execute().use { response ->
                    val responseBody = response.body?.string() ?: "{}"
                    Log.d(TAG, "AI response: $responseBody")

                    withContext(Dispatchers.Main) {
                        _isAiLoading.value = false

                        try {
                            val json = JSONObject(responseBody)

                            // 서버 응답 형식: response 또는 answer
                            _aiResponse.value = json.optString("response",
                                json.optString("answer", "응답을 받지 못했습니다."))

                            // LED 색상 처리 (서버: led_color 배열)
                            val ledColor = json.optJSONArray("led_color")
                            if (ledColor != null && ledColor.length() >= 3) {
                                sendColor(
                                    ledColor.getInt(0),
                                    ledColor.getInt(1),
                                    ledColor.getInt(2)
                                )
                            }

                            // TTS로 응답 읽기
                            speak(_aiResponse.value)
                        } catch (jsonError: Exception) {
                            Log.e(TAG, "JSON parsing error: $responseBody", jsonError)
                            _aiResponse.value = "응답 처리 오류"
                            speak("응답을 처리하는 중 오류가 발생했어요")
                        }
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    _isAiLoading.value = false
                    _aiResponse.value = "AI 오류: ${e.message}"
                    Log.e(TAG, "AI ask error", e)
                    e.printStackTrace()
                }
            }
        }
    }

    // ===== Control Center WebSocket =====

    private fun connectControlCenter() {
        _statusMessage.value = "본부 연결 중..."

        val request = Request.Builder()
            .url("$CONTROL_CENTER_WS_URL/$deviceId")
            .build()

        controlWebSocket = httpClient.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                // 연결 직후 디바이스 정보 전송 (서버에서 이 데이터를 수신해야 등록됨)
                val deviceInfo = JSONObject().apply {
                    put("type", "fanstick")
                    put("name", "FanStick App")
                    put("ble_connected", _bleState.value == BleState.CONNECTED)
                    put("ble_name", "")  // BLE 연결 시 업데이트
                }.toString()
                webSocket.send(deviceInfo)
                Log.d(TAG, "Sent device info to Control Center: $deviceInfo")

                handler.post {
                    _controlConnected.value = true
                    _statusMessage.value = "본부 연결됨 (ID: $deviceId)"
                }
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                handler.post {
                    handleControlMessage(text)
                }
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                handler.post {
                    _controlConnected.value = false
                    _statusMessage.value = "본부 연결 실패: ${t.message}"
                    Log.e(TAG, "WebSocket failure", t)
                }
            }

            override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
                handler.post {
                    _controlConnected.value = false
                    _statusMessage.value = "본부 연결 종료"
                }
            }
        })
    }

    private fun disconnectControlCenter() {
        controlWebSocket?.close(1000, "User disconnect")
        controlWebSocket = null
        _controlConnected.value = false
    }

    private fun sendReactionToControlCenter(reactionType: String, action: String) {
        if (_controlConnected.value && controlWebSocket != null) {
            val reactionJson = JSONObject().apply {
                put("type", "reaction")
                put("reaction", reactionType)
                put("action", action)
            }.toString()
            controlWebSocket?.send(reactionJson)
            Log.d(TAG, "Sent reaction to Control Center: $reactionJson")
        }
    }

    private fun handleControlMessage(text: String) {
        try {
            val json = JSONObject(text)
            val type = json.optString("type")

            when (type) {
                "connected" -> {
                    _statusMessage.value = "본부: ${json.optString("message")}"
                }
                "winner" -> {
                    _isWinner.value = true
                    _displayMessage.value = json.optString("message", "축하합니다!")
                    speak("당첨되었습니다! 축하합니다!")
                    // 특별 LED 효과
                    sendPattern("rainbow")
                }
                "lottery_result" -> {
                    val won = json.optBoolean("won", false)
                    _isWinner.value = won
                    if (won) {
                        _displayMessage.value = "🎉 당첨! 🎉"
                        speak("당첨되었습니다!")
                        sendPattern("rainbow")
                    }
                }
                "led_command" -> {
                    // 서버에서 led 객체로 전송: {"type": "led_command", "led": {"r":..., "g":..., "b":..., "pattern":...}}
                    val ledObj = json.optJSONObject("led")
                    if (ledObj != null) {
                        val r = ledObj.optInt("r", 0)
                        val g = ledObj.optInt("g", 0)
                        val b = ledObj.optInt("b", 0)
                        sendColor(r, g, b)
                        _statusMessage.value = "LED 명령: RGB($r,$g,$b)"

                        val pattern = ledObj.optString("pattern", "")
                        if (pattern.isNotEmpty()) {
                            sendPattern(pattern)
                        }
                    }
                    // color 배열 형식도 지원 (호환성)
                    val colorArray = json.optJSONArray("color")
                    if (colorArray != null && colorArray.length() >= 3) {
                        sendColor(
                            colorArray.getInt(0),
                            colorArray.getInt(1),
                            colorArray.getInt(2)
                        )
                    }
                }
                "melody_command" -> {
                    val melody = json.optString("melody")
                    sendBleCommand("B:$melody")
                    _statusMessage.value = "멜로디: $melody"
                }
                "display_message" -> {
                    val msg = json.optString("message", "")
                    _displayMessage.value = msg
                    speak(msg)
                    // OLED에도 표시 (BLE 연결 시)
                    sendText(msg)
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Handle control message error", e)
        }
    }

    // ===== BLE 기능 =====

    @SuppressLint("MissingPermission")
    private fun startBleScan() {
        if (!hasPermissions()) {
            _statusMessage.value = "권한이 필요합니다"
            return
        }

        _scannedDevices.clear()
        _bleState.value = BleState.SCANNING
        _statusMessage.value = "BLE 장치 스캔 중..."

        val scanner = bluetoothAdapter?.bluetoothLeScanner
        val scanCallback = object : ScanCallback() {
            override fun onScanResult(callbackType: Int, result: ScanResult) {
                val device = result.device
                if (device.name != null && !_scannedDevices.any { it.address == device.address }) {
                    _scannedDevices.add(device)
                    Log.d(TAG, "Found device: ${device.name} - ${device.address}")
                }
            }

            override fun onScanFailed(errorCode: Int) {
                _statusMessage.value = "스캔 실패: $errorCode"
                _bleState.value = BleState.DISCONNECTED
            }
        }

        scanner?.startScan(scanCallback)

        // 10초 후 스캔 중지
        handler.postDelayed({
            scanner?.stopScan(scanCallback)
            if (_bleState.value == BleState.SCANNING) {
                _bleState.value = BleState.DISCONNECTED
                _statusMessage.value = "스캔 완료. ${_scannedDevices.size}개 장치 발견"
            }
        }, 10000)
    }

    @SuppressLint("MissingPermission")
    private fun stopBleScan() {
        bluetoothAdapter?.bluetoothLeScanner?.stopScan(object : ScanCallback() {})
    }

    @SuppressLint("MissingPermission")
    private fun connectToDevice(device: BluetoothDevice) {
        _bleState.value = BleState.CONNECTING
        _statusMessage.value = "${device.name}에 연결 중..."

        bluetoothGatt = device.connectGatt(this, false, gattCallback)
    }

    private val gattCallback = object : BluetoothGattCallback() {
        @SuppressLint("MissingPermission")
        override fun onConnectionStateChange(gatt: BluetoothGatt, status: Int, newState: Int) {
            when (newState) {
                BluetoothProfile.STATE_CONNECTED -> {
                    Log.d(TAG, "Connected to GATT server")
                    handler.post {
                        _bleState.value = BleState.CONNECTED
                        _connectedBleName.value = gatt.device.name ?: "Unknown"
                        _statusMessage.value = "${_connectedBleName.value} 연결됨!"
                    }
                    gatt.discoverServices()
                }
                BluetoothProfile.STATE_DISCONNECTED -> {
                    Log.d(TAG, "Disconnected from GATT server")
                    handler.post {
                        _bleState.value = BleState.DISCONNECTED
                        _statusMessage.value = "연결 해제됨"
                    }
                }
            }
        }

        @SuppressLint("MissingPermission")
        override fun onServicesDiscovered(gatt: BluetoothGatt, status: Int) {
            if (status == BluetoothGatt.GATT_SUCCESS) {
                val service = gatt.getService(UUID.fromString(SERVICE_UUID))
                if (service != null) {
                    ledCharacteristic = service.getCharacteristic(UUID.fromString(LED_CHAR_UUID))
                    textCharacteristic = service.getCharacteristic(UUID.fromString(TEXT_CHAR_UUID))

                    handler.post {
                        _statusMessage.value = "AI FanStick 연결 완료!"
                        Toast.makeText(this@MainActivity, "연결 성공!", Toast.LENGTH_SHORT).show()
                    }

                    // Notify 활성화 (textCharacteristic = NOTIFY_CHAR_UUID)
                    textCharacteristic?.let {
                        gatt.setCharacteristicNotification(it, true)
                        val descriptor = it.getDescriptor(UUID.fromString("00002902-0000-1000-8000-00805f9b34fb"))
                        descriptor?.value = BluetoothGattDescriptor.ENABLE_NOTIFICATION_VALUE
                        gatt.writeDescriptor(descriptor)
                        Log.d(TAG, "Notify 활성화 완료")
                    }
                } else {
                    handler.post {
                        _statusMessage.value = "FanStick 서비스를 찾을 수 없음"
                    }
                }
            }
        }

        override fun onCharacteristicChanged(
            gatt: BluetoothGatt,
            characteristic: BluetoothGattCharacteristic,
            value: ByteArray
        ) {
            val response = String(value)
            Log.d(TAG, "Received from BLE: $response")
            handler.post {
                // 버튼 이벤트를 Control Center로 전달
                if (response.startsWith("BTN:")) {
                    val action = response.substringAfter("BTN:")
                    sendReactionToControlCenter("button", action)
                    _statusMessage.value = "버튼 눌림: $action"
                    Toast.makeText(this@MainActivity, "버튼 눌림!", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this@MainActivity, "응답: $response", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    @SuppressLint("MissingPermission")
    private fun disconnectBle() {
        bluetoothGatt?.disconnect()
        bluetoothGatt?.close()
        bluetoothGatt = null
        ledCharacteristic = null
        textCharacteristic = null
        _bleState.value = BleState.DISCONNECTED
        _statusMessage.value = "연결 해제됨"
    }

    @SuppressLint("MissingPermission")
    private fun sendColor(r: Int, g: Int, b: Int) {
        val command = "C:$r,$g,$b"
        sendBleCommand(command)
        _currentColor.value = Triple(r, g, b)
    }

    private fun sendPattern(pattern: String) {
        val command = "P:$pattern"
        sendBleCommand(command)
    }

    private fun sendText(text: String) {
        val command = "T:$text"
        sendBleCommand(command)
    }

    @SuppressLint("MissingPermission")
    private fun sendBleCommand(command: String) {
        if (_bleState.value != BleState.CONNECTED) {
            Log.d(TAG, "BLE not connected, skip command: $command")
            return
        }

        ledCharacteristic?.let { char ->
            char.value = command.toByteArray()
            bluetoothGatt?.writeCharacteristic(char)
            Log.d(TAG, "Sent: $command")
        }
    }

    // ===== 음성 인식 =====

    private fun setupSpeechRecognizer() {
        speechRecognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) {
                _isRecording.value = true
                _statusMessage.value = "말씀하세요..."
            }

            override fun onResults(results: Bundle?) {
                _isRecording.value = false
                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                matches?.firstOrNull()?.let { text ->
                    _recognizedText.value = text
                    processVoiceCommand(text)
                }
            }

            override fun onError(error: Int) {
                _isRecording.value = false
                _statusMessage.value = "음성 인식 오류: $error"
            }

            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() { _statusMessage.value = "처리 중..." }
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
    }

    private fun startListening() {
        if (!hasPermissions()) {
            Toast.makeText(this, "마이크 권한이 필요합니다", Toast.LENGTH_SHORT).show()
            return
        }

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ko-KR")
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        }
        speechRecognizer?.startListening(intent)
    }

    private fun processVoiceCommand(text: String) {
        val lowerText = text.lowercase()

        // 로컬 색상/패턴 명령 처리
        when {
            lowerText.contains("빨간") || lowerText.contains("빨강") -> {
                sendColor(255, 0, 0)
                speak("빨간색으로 바꿨어요")
                return
            }
            lowerText.contains("파란") || lowerText.contains("파랑") -> {
                sendColor(0, 0, 255)
                speak("파란색으로 바꿨어요")
                return
            }
            lowerText.contains("초록") -> {
                sendColor(0, 255, 0)
                speak("초록색으로 바꿨어요")
                return
            }
            lowerText.contains("보라") -> {
                sendColor(128, 0, 128)
                speak("보라색으로 바꿨어요")
                return
            }
            lowerText.contains("노란") || lowerText.contains("노랑") -> {
                sendColor(255, 255, 0)
                speak("노란색으로 바꿨어요")
                return
            }
            lowerText.contains("무지개") -> {
                sendPattern("rainbow")
                speak("무지개 패턴을 시작해요")
                return
            }
            lowerText.contains("깜빡") -> {
                sendPattern("blink")
                speak("깜빡임 패턴을 시작해요")
                return
            }
            lowerText.contains("꺼") -> {
                sendColor(0, 0, 0)
                speak("LED를 껐어요")
                return
            }
        }

        // AI 서버에 질문
        if (_serverConnected.value) {
            askAI(text)
        } else {
            sendText(text.take(20))
            speak("서버 연결이 필요합니다")
        }

        _statusMessage.value = "명령 처리 완료"
    }

    // ===== TTS =====

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            tts?.language = Locale.KOREAN
        }
    }

    private fun speak(text: String) {
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
    }

    // ===== 권한 =====

    private fun hasPermissions(): Boolean {
        val permissions = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.RECORD_AUDIO
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            permissions.add(Manifest.permission.BLUETOOTH_SCAN)
            permissions.add(Manifest.permission.BLUETOOTH_CONNECT)
        }
        return permissions.all {
            ActivityCompat.checkSelfPermission(this, it) == PackageManager.PERMISSION_GRANTED
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        disconnectBle()
        disconnectControlCenter()
        speechRecognizer?.destroy()
        tts?.shutdown()
        coroutineScope.cancel()
    }
}

enum class BleState {
    DISCONNECTED,
    SCANNING,
    CONNECTING,
    CONNECTED
}
