/**
 * AI FanStick MVP - 메인 액티비티
 * Jetpack Compose UI
 */

package com.uttec.fanstick.ui

import android.Manifest
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.uttec.fanstick.ble.BleConnectionState

class MainActivity : ComponentActivity() {

    private var speechRecognizer: SpeechRecognizer? = null
    private var viewModel: MainViewModel? = null

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val allGranted = permissions.values.all { it }
        if (!allGranted) {
            // 권한 거부 처리
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 권한 요청
        permissionLauncher.launch(
            arrayOf(
                Manifest.permission.BLUETOOTH_SCAN,
                Manifest.permission.BLUETOOTH_CONNECT,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.ACCESS_FINE_LOCATION
            )
        )

        // 음성 인식 초기화
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this)

        setContent {
            FanStickTheme {
                val vm: MainViewModel = viewModel()
                viewModel = vm

                setupSpeechRecognizer(vm)

                MainScreen(
                    viewModel = vm,
                    onMicClick = { startListening() }
                )
            }
        }
    }

    private fun setupSpeechRecognizer(vm: MainViewModel) {
        speechRecognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) {
                vm.setRecording(true)
            }

            override fun onResults(results: Bundle?) {
                val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                matches?.firstOrNull()?.let { text ->
                    vm.onSpeechResult(text)
                }
            }

            override fun onError(error: Int) {
                vm.setRecording(false)
            }

            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() {}
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
    }

    private fun startListening() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ko-KR")
            putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1)
        }
        speechRecognizer?.startListening(intent)
    }

    override fun onDestroy() {
        super.onDestroy()
        speechRecognizer?.destroy()
    }
}

@Composable
fun FanStickTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Color(0xFF9C27B0),
            secondary = Color(0xFF7B1FA2),
            background = Color(0xFF121212),
            surface = Color(0xFF1E1E1E)
        ),
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    viewModel: MainViewModel,
    onMicClick: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    var serverUrl by remember { mutableStateOf("http://192.168.0.1:8080") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("AI FanStick") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1E1E1E)
                ),
                actions = {
                    // BLE 상태 표시
                    IconButton(onClick = {
                        if (uiState.bleState == BleConnectionState.DISCONNECTED) {
                            viewModel.startBleScan()
                        } else {
                            viewModel.disconnectBle()
                        }
                    }) {
                        Icon(
                            imageVector = Icons.Default.Bluetooth,
                            contentDescription = "BLE",
                            tint = when (uiState.bleState) {
                                BleConnectionState.CONNECTED -> Color.Green
                                BleConnectionState.CONNECTING, BleConnectionState.SCANNING -> Color.Yellow
                                else -> Color.Gray
                            }
                        )
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // 서버 연결
            OutlinedTextField(
                value = serverUrl,
                onValueChange = { serverUrl = it },
                label = { Text("서버 주소") },
                modifier = Modifier.fillMaxWidth(),
                singleLine = true,
                trailingIcon = {
                    IconButton(onClick = { viewModel.setServerUrl(serverUrl) }) {
                        Icon(Icons.Default.Send, contentDescription = "연결")
                    }
                }
            )

            Spacer(modifier = Modifier.height(8.dp))

            // 상태 표시
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                StatusChip("서버", uiState.serverConnected)
                StatusChip("BLE", uiState.bleState == BleConnectionState.CONNECTED)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 현재 곡 정보
            uiState.currentSong?.let { song ->
                SongCard(song = song, ledColor = uiState.ledColor)
            }

            Spacer(modifier = Modifier.height(16.dp))

            // 곡 이동 버튼
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                IconButton(
                    onClick = { viewModel.prevSong() },
                    modifier = Modifier.size(48.dp)
                ) {
                    Icon(Icons.Default.SkipPrevious, "이전 곡", Modifier.size(32.dp))
                }
                IconButton(
                    onClick = { viewModel.nextSong() },
                    modifier = Modifier.size(48.dp)
                ) {
                    Icon(Icons.Default.SkipNext, "다음 곡", Modifier.size(32.dp))
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // AI 응답
            if (uiState.aiResponse.isNotEmpty()) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
                ) {
                    Text(
                        text = uiState.aiResponse,
                        modifier = Modifier.padding(16.dp),
                        fontSize = 16.sp
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            // 인식된 텍스트
            if (uiState.recognizedText.isNotEmpty()) {
                Text(
                    text = "\"${uiState.recognizedText}\"",
                    color = Color.Gray,
                    modifier = Modifier.padding(8.dp)
                )
            }

            // 마이크 버튼
            FloatingActionButton(
                onClick = onMicClick,
                modifier = Modifier.size(72.dp),
                containerColor = if (uiState.isRecording) Color.Red else MaterialTheme.colorScheme.primary
            ) {
                Icon(
                    imageVector = Icons.Default.Mic,
                    contentDescription = "음성 입력",
                    modifier = Modifier.size(36.dp)
                )
            }

            // 로딩 표시
            if (uiState.isLoading) {
                Spacer(modifier = Modifier.height(8.dp))
                CircularProgressIndicator(modifier = Modifier.size(24.dp))
            }
        }
    }

    // 에러 스낵바
    uiState.errorMessage?.let { error ->
        LaunchedEffect(error) {
            // 에러 표시 후 자동 제거
            kotlinx.coroutines.delay(3000)
            viewModel.clearError()
        }
    }
}

@Composable
fun StatusChip(label: String, connected: Boolean) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        color = if (connected) Color(0xFF4CAF50) else Color(0xFF757575)
    ) {
        Text(
            text = "$label: ${if (connected) "연결됨" else "끊김"}",
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
            fontSize = 12.sp
        )
    }
}

@Composable
fun SongCard(song: com.uttec.fanstick.api.SongInfo, ledColor: List<Int>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // LED 색상 표시
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(
                        Color(
                            red = ledColor[0],
                            green = ledColor[1],
                            blue = ledColor[2]
                        )
                    )
            )

            Spacer(modifier = Modifier.width(16.dp))

            Column {
                Text(
                    text = "현재 곡",
                    fontSize = 12.sp,
                    color = Color.Gray
                )
                Text(
                    text = song.title,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "${song.color_name} • ${song.fan_chant}",
                    fontSize = 14.sp,
                    color = Color.Gray
                )
            }
        }
    }
}
