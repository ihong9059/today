/**
 * AI FanStick MVP - 메인 ViewModel
 * UI 상태 관리 및 비즈니스 로직
 */

package com.uttec.fanstick.ui

import android.app.Application
import android.bluetooth.BluetoothDevice
import android.speech.tts.TextToSpeech
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.uttec.fanstick.api.AskResponse
import com.uttec.fanstick.api.ConcertInfo
import com.uttec.fanstick.api.FanStickRepository
import com.uttec.fanstick.api.SongInfo
import com.uttec.fanstick.ble.BleCallback
import com.uttec.fanstick.ble.BleConnectionState
import com.uttec.fanstick.ble.BleManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.Locale

private const val TAG = "MainViewModel"

// UI 상태
data class UiState(
    val isLoading: Boolean = false,
    val bleState: BleConnectionState = BleConnectionState.DISCONNECTED,
    val serverConnected: Boolean = false,
    val currentSong: SongInfo? = null,
    val nextSong: SongInfo? = null,
    val aiResponse: String = "",
    val ledColor: List<Int> = listOf(128, 0, 128),
    val errorMessage: String? = null,
    val isRecording: Boolean = false,
    val recognizedText: String = ""
)

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val repository = FanStickRepository()
    private val bleManager = BleManager(application)
    private var tts: TextToSpeech? = null

    private val _uiState = MutableStateFlow(UiState())
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    init {
        setupBle()
        setupTts()
    }

    private fun setupBle() {
        bleManager.setCallback(object : BleCallback {
            override fun onConnectionStateChanged(state: BleConnectionState) {
                _uiState.value = _uiState.value.copy(bleState = state)

                if (state == BleConnectionState.CONNECTED) {
                    // 연결 시 현재 곡 색상으로 LED 설정
                    _uiState.value.currentSong?.let { song ->
                        bleManager.setLedColor(
                            song.color_rgb[0],
                            song.color_rgb[1],
                            song.color_rgb[2]
                        )
                    }
                }
            }

            override fun onDeviceFound(device: BluetoothDevice) {
                bleManager.connect(device)
            }

            override fun onDataReceived(data: String) {
                Log.d(TAG, "BLE data received: $data")
            }

            override fun onError(message: String) {
                _uiState.value = _uiState.value.copy(errorMessage = message)
            }
        })
    }

    private fun setupTts() {
        tts = TextToSpeech(getApplication()) { status ->
            if (status == TextToSpeech.SUCCESS) {
                tts?.language = Locale.KOREAN
                Log.d(TAG, "TTS initialized")
            }
        }
    }

    // ===== 서버 연결 =====

    fun setServerUrl(url: String) {
        com.uttec.fanstick.api.ApiClient.setServerUrl(url)
        checkServerConnection()
    }

    fun checkServerConnection() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)

            repository.getStatus().fold(
                onSuccess = { status ->
                    _uiState.value = _uiState.value.copy(
                        serverConnected = true,
                        isLoading = false
                    )
                    loadConcertInfo()
                },
                onFailure = { e ->
                    _uiState.value = _uiState.value.copy(
                        serverConnected = false,
                        isLoading = false,
                        errorMessage = "서버 연결 실패: ${e.message}"
                    )
                }
            )
        }
    }

    fun loadConcertInfo() {
        viewModelScope.launch {
            repository.getConcert().fold(
                onSuccess = { concert ->
                    _uiState.value = _uiState.value.copy(
                        currentSong = concert.current_song,
                        nextSong = concert.next_song,
                        ledColor = concert.current_song.color_rgb
                    )

                    // BLE 연결 시 LED 색상 업데이트
                    if (_uiState.value.bleState == BleConnectionState.CONNECTED) {
                        bleManager.setLedColor(
                            concert.current_song.color_rgb[0],
                            concert.current_song.color_rgb[1],
                            concert.current_song.color_rgb[2]
                        )
                        bleManager.showSongInfo(
                            concert.current_song.title,
                            concert.current_song.color_name
                        )
                    }
                },
                onFailure = { e ->
                    _uiState.value = _uiState.value.copy(
                        errorMessage = "콘서트 정보 로드 실패: ${e.message}"
                    )
                }
            )
        }
    }

    // ===== BLE 연결 =====

    fun startBleScan() {
        bleManager.startScan()
    }

    fun disconnectBle() {
        bleManager.disconnect()
    }

    // ===== AI 질문 =====

    fun askAi(question: String) {
        if (question.isBlank()) return

        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                isLoading = true,
                recognizedText = question
            )

            repository.ask(question).fold(
                onSuccess = { response ->
                    handleAiResponse(response)
                },
                onFailure = { e ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        errorMessage = "AI 응답 실패: ${e.message}"
                    )
                }
            )
        }
    }

    private fun handleAiResponse(response: AskResponse) {
        _uiState.value = _uiState.value.copy(
            isLoading = false,
            aiResponse = response.response,
            ledColor = response.led_color,
            currentSong = response.current_song
        )

        // TTS 출력
        tts?.speak(response.response, TextToSpeech.QUEUE_FLUSH, null, "ai_response")

        // BLE LED 업데이트
        if (_uiState.value.bleState == BleConnectionState.CONNECTED) {
            bleManager.setLedColor(
                response.led_color[0],
                response.led_color[1],
                response.led_color[2]
            )
            bleManager.playBuzzer("ack")
        }
    }

    // ===== 곡 이동 =====

    fun nextSong() {
        viewModelScope.launch {
            repository.nextSong().fold(
                onSuccess = { response ->
                    _uiState.value = _uiState.value.copy(
                        currentSong = response.current_song,
                        nextSong = response.next_song,
                        ledColor = response.current_song.color_rgb
                    )
                    updateBleForSong(response.current_song)
                },
                onFailure = { }
            )
        }
    }

    fun prevSong() {
        viewModelScope.launch {
            repository.prevSong().fold(
                onSuccess = { response ->
                    _uiState.value = _uiState.value.copy(
                        currentSong = response.current_song,
                        nextSong = response.next_song,
                        ledColor = response.current_song.color_rgb
                    )
                    updateBleForSong(response.current_song)
                },
                onFailure = { }
            )
        }
    }

    private fun updateBleForSong(song: SongInfo) {
        if (_uiState.value.bleState == BleConnectionState.CONNECTED) {
            bleManager.setLedColor(
                song.color_rgb[0],
                song.color_rgb[1],
                song.color_rgb[2]
            )
            bleManager.showSongInfo(song.title, song.color_name)
            bleManager.playBuzzer("ack")
        }
    }

    // ===== 수동 LED 제어 =====

    fun setLedColor(r: Int, g: Int, b: Int) {
        _uiState.value = _uiState.value.copy(ledColor = listOf(r, g, b))
        if (_uiState.value.bleState == BleConnectionState.CONNECTED) {
            bleManager.setLedColor(r, g, b)
        }
    }

    fun setPattern(pattern: String) {
        if (_uiState.value.bleState == BleConnectionState.CONNECTED) {
            bleManager.setPattern(pattern)
        }
    }

    // ===== 음성 인식 결과 처리 =====

    fun onSpeechResult(text: String) {
        _uiState.value = _uiState.value.copy(
            recognizedText = text,
            isRecording = false
        )
        askAi(text)
    }

    fun setRecording(isRecording: Boolean) {
        _uiState.value = _uiState.value.copy(isRecording = isRecording)
    }

    fun clearError() {
        _uiState.value = _uiState.value.copy(errorMessage = null)
    }

    override fun onCleared() {
        super.onCleared()
        bleManager.disconnect()
        tts?.shutdown()
    }
}
