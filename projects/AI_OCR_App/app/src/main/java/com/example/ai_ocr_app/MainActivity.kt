package com.example.ai_ocr_app

import android.Manifest
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.os.Bundle
import android.speech.tts.TextToSpeech
import android.util.Log
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.camera.core.AspectRatio
import androidx.camera.core.CameraSelector
import androidx.camera.core.ImageCapture
import androidx.camera.core.ImageCaptureException
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.camera.view.PreviewView
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.ContextCompat
import com.example.ai_ocr_app.ui.theme.AI_OCR_AppTheme
import com.google.accompanist.permissions.ExperimentalPermissionsApi
import com.google.accompanist.permissions.isGranted
import com.google.accompanist.permissions.rememberPermissionState
import com.google.accompanist.permissions.shouldShowRationale
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.Text
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.korean.KoreanTextRecognizerOptions
import kotlinx.coroutines.*
import java.util.Locale
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.coroutines.resume
import kotlin.coroutines.suspendCoroutine

// 앱 버전
const val APP_VERSION = "1.1.1"

// 연속 캡처 설정
const val CAPTURE_COUNT = 3          // 캡처 횟수
const val CAPTURE_DELAY_MS = 100L    // 캡처 간격 (ms)

class MainActivity : ComponentActivity(), TextToSpeech.OnInitListener {

    private lateinit var tts: TextToSpeech
    private var isTtsReady = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        tts = TextToSpeech(this, this)
        enableEdgeToEdge()
        setContent {
            AI_OCR_AppTheme {
                OCRApp(onSpeak = { text -> speakText(text) })
            }
        }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            val result = tts.setLanguage(Locale.KOREAN)
            isTtsReady = result != TextToSpeech.LANG_MISSING_DATA && result != TextToSpeech.LANG_NOT_SUPPORTED
        }
    }

    private fun speakText(text: String) {
        if (isTtsReady && text.isNotBlank()) {
            tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
        }
    }

    override fun onDestroy() {
        tts.stop()
        tts.shutdown()
        super.onDestroy()
    }
}

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun OCRApp(onSpeak: (String) -> Unit) {
    val cameraPermissionState = rememberPermissionState(Manifest.permission.CAMERA)
    Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
        if (cameraPermissionState.status.isGranted) {
            CameraScreen(onSpeak = onSpeak)
        } else {
            PermissionScreen(
                shouldShowRationale = cameraPermissionState.status.shouldShowRationale,
                onRequestPermission = { cameraPermissionState.launchPermissionRequest() }
            )
        }
    }
}

@Composable
fun PermissionScreen(shouldShowRationale: Boolean, onRequestPermission: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(text = "카메라 권한 필요", fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = if (shouldShowRationale) "텍스트 인식을 위해 카메라 권한이 필요합니다.\n설정에서 권한을 허용해주세요."
                   else "텍스트 인식을 위해 카메라 권한이 필요합니다.",
            textAlign = TextAlign.Center, fontSize = 16.sp
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(onClick = onRequestPermission, modifier = Modifier.fillMaxWidth().height(56.dp)) {
            Text("권한 허용", fontSize = 18.sp)
        }
    }
}

// 번호판에 사용되는 한글 목록
val LICENSE_PLATE_CHARS = setOf(
    '가', '나', '다', '라', '마', '거', '너', '더', '러', '머', '버', '서', '어', '저',
    '고', '노', '도', '로', '모', '보', '소', '오', '조', '구', '누', '두', '루', '무', '부', '수', '우', '주',
    '아', '바', '사', '자', '배', '호', '하', '허', '헌', '헐', '헴', '헵', '헷', '헹'
)

// 자주 오인식되는 문자 교정 맵
val CORRECTION_MAP = mapOf(
    '-' to "",
    '_' to "",
    '|' to "",
    '/' to "",
    '\\' to "",
    'O' to "0",
    'o' to "0",
    'I' to "1",
    'l' to "1",
    'Z' to "2",
    'S' to "5",
    'B' to "8"
)

// 비슷한 한글 그룹 (OCR에서 자주 혼동)
val SIMILAR_HANGUL_GROUPS = listOf(
    setOf('누', '두', '루', '무', '부', '수', '우', '주', '구'),
    setOf('너', '더', '러', '머', '버', '서', '어', '저', '거'),
    setOf('나', '다', '라', '마', '바', '사', '아', '자', '가'),
    setOf('노', '도', '로', '모', '보', '소', '오', '조', '고'),
    setOf('허', '호', '하', '헌', '헐')
)

fun postProcessLicensePlate(text: String): String {
    var result = text.replace(Regex("[\\s\\-_|/\\\\]"), "")
    for ((wrong, correct) in CORRECTION_MAP) {
        result = result.replace(wrong.toString(), correct)
    }
    val pattern = Regex("(\\d{2,3})([가-힣])(\\d{4})")
    val match = pattern.find(result)
    if (match != null) {
        val (prefix, hangul, suffix) = match.destructured
        val correctedHangul = if (hangul[0] in LICENSE_PLATE_CHARS) hangul else {
            // 비슷한 글자 그룹에서 번호판 글자 찾기
            val group = SIMILAR_HANGUL_GROUPS.find { hangul[0] in it }
            group?.firstOrNull { it in LICENSE_PLATE_CHARS }?.toString() ?: hangul
        }
        return "$prefix$correctedHangul$suffix"
    }
    return result
}

fun isValidLicensePlate(text: String): Boolean {
    val cleaned = text.replace(Regex("[\\s\\-_]"), "")
    return Regex("^\\d{2,3}[가-힣]\\d{4}$").matches(cleaned)
}

fun formatLicensePlate(text: String): String {
    val cleaned = text.replace(Regex("[\\s\\-_]"), "")
    val match = Regex("(\\d{2,3})([가-힣])(\\d{4})").find(cleaned)
    return if (match != null) {
        val (prefix, hangul, suffix) = match.destructured
        "$prefix $hangul $suffix"
    } else text
}

// 번호판 결과 정규화 (비교용)
fun normalizePlateResult(text: String): String {
    return text.replace(Regex("[\\s\\-_]"), "").lowercase()
}

// 다중 인식 결과에서 최적 결과 선택 (투표 방식)
fun selectBestResult(results: List<String>): Pair<String, Int> {
    if (results.isEmpty()) return Pair("", 0)

    // 번호판 패턴 추출
    val platePattern = Regex("\\d{2,3}[가-힣]\\d{4}")
    val plateResults = results.mapNotNull { text ->
        val cleaned = text.replace(Regex("[\\s\\-_|/\\\\]"), "")
        platePattern.find(cleaned)?.value
    }

    if (plateResults.isEmpty()) {
        // 번호판이 없으면 가장 긴 결과 반환
        val best = results.maxByOrNull { it.length } ?: ""
        return Pair(best, 1)
    }

    // 숫자 부분 기준으로 그룹화 (한글만 다를 수 있음)
    val numberPattern = Regex("(\\d{2,3})([가-힣])(\\d{4})")
    val grouped = plateResults.groupBy { plate ->
        val match = numberPattern.find(plate)
        if (match != null) {
            "${match.groupValues[1]}_${match.groupValues[3]}" // 앞숫자_뒷숫자
        } else plate
    }

    // 가장 많이 나온 숫자 조합 선택
    val bestGroup = grouped.maxByOrNull { it.value.size }?.value ?: plateResults

    // 해당 그룹에서 한글 투표
    val hangulVotes = mutableMapOf<Char, Int>()
    bestGroup.forEach { plate ->
        val match = numberPattern.find(plate)
        if (match != null) {
            val hangul = match.groupValues[2][0]
            hangulVotes[hangul] = hangulVotes.getOrDefault(hangul, 0) + 1
        }
    }

    // 가장 많이 나온 한글 선택
    val bestHangul = hangulVotes.maxByOrNull { it.value }?.key
    val voteCount = hangulVotes[bestHangul] ?: 1

    // 최종 결과 조합
    val samplePlate = bestGroup.first()
    val match = numberPattern.find(samplePlate)
    return if (match != null && bestHangul != null) {
        Pair("${match.groupValues[1]}$bestHangul${match.groupValues[3]}", voteCount)
    } else {
        Pair(samplePlate, voteCount)
    }
}

// 인식된 모든 한글 후보 추출
fun extractHangulCandidates(results: List<String>): Set<Char> {
    val candidates = mutableSetOf<Char>()
    val pattern = Regex("\\d{2,3}([가-힣])\\d{4}")
    results.forEach { text ->
        val cleaned = text.replace(Regex("[\\s\\-_]"), "")
        pattern.find(cleaned)?.groupValues?.get(1)?.firstOrNull()?.let {
            candidates.add(it)
        }
    }
    return candidates
}

@Composable
fun CameraScreen(onSpeak: (String) -> Unit) {
    val context = LocalContext.current
    val lifecycleOwner = LocalLifecycleOwner.current
    val scope = rememberCoroutineScope()

    var recognizedText by remember { mutableStateOf("") }
    var rawResults by remember { mutableStateOf<List<String>>(emptyList()) }
    var confidence by remember { mutableStateOf(0f) }
    var isProcessing by remember { mutableStateOf(false) }
    var processingStatus by remember { mutableStateOf("") }
    var isLicensePlate by remember { mutableStateOf(false) }
    var capturedBitmap by remember { mutableStateOf<Bitmap?>(null) }
    var voteCount by remember { mutableStateOf(0) }
    var hangulCandidates by remember { mutableStateOf<Set<Char>>(emptySet()) }

    val cameraExecutor: ExecutorService = remember { Executors.newSingleThreadExecutor() }
    var imageCapture: ImageCapture? by remember { mutableStateOf(null) }
    val textRecognizer = remember { TextRecognition.getClient(KoreanTextRecognizerOptions.Builder().build()) }

    DisposableEffect(Unit) { onDispose { cameraExecutor.shutdown() } }

    // 단일 캡처 및 인식 함수
    suspend fun captureAndRecognize(capture: ImageCapture, executor: java.util.concurrent.Executor): Pair<String, Bitmap?> {
        return suspendCoroutine { continuation ->
            capture.takePicture(
                executor,
                object : ImageCapture.OnImageCapturedCallback() {
                    @androidx.annotation.OptIn(androidx.camera.core.ExperimentalGetImage::class)
                    override fun onCaptureSuccess(imageProxy: ImageProxy) {
                        val mediaImage = imageProxy.image
                        if (mediaImage != null) {
                            // Bitmap 생성
                            var bitmap: Bitmap? = null
                            try {
                                val buffer = imageProxy.planes[0].buffer
                                val bytes = ByteArray(buffer.remaining())
                                buffer.get(bytes)
                                bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
                                if (bitmap != null) {
                                    val rotation = imageProxy.imageInfo.rotationDegrees
                                    if (rotation != 0) {
                                        val matrix = Matrix()
                                        matrix.postRotate(rotation.toFloat())
                                        bitmap = Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
                                    }
                                }
                            } catch (e: Exception) {
                                Log.e("Bitmap", "Failed", e)
                            }

                            val image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)
                            textRecognizer.process(image)
                                .addOnSuccessListener { visionText ->
                                    continuation.resume(Pair(visionText.text, bitmap))
                                }
                                .addOnFailureListener {
                                    continuation.resume(Pair("", bitmap))
                                }
                                .addOnCompleteListener {
                                    imageProxy.close()
                                }
                        } else {
                            imageProxy.close()
                            continuation.resume(Pair("", null))
                        }
                    }

                    override fun onError(exception: ImageCaptureException) {
                        continuation.resume(Pair("", null))
                    }
                }
            )
        }
    }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        // 제목 + 버전
        Row(
            modifier = Modifier.fillMaxWidth().padding(bottom = 8.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = "AI 문자 인식", fontSize = 24.sp, fontWeight = FontWeight.Bold)
            Text(text = "v$APP_VERSION", fontSize = 12.sp, color = Color.Gray)
        }

        // 카메라 프리뷰
        Box(modifier = Modifier.fillMaxWidth().weight(1f).background(Color.Black, RoundedCornerShape(12.dp))) {
            AndroidView(
                factory = { ctx ->
                    PreviewView(ctx).apply {
                        scaleType = PreviewView.ScaleType.FIT_CENTER
                        val cameraProviderFuture = ProcessCameraProvider.getInstance(ctx)
                        cameraProviderFuture.addListener({
                            val cameraProvider = cameraProviderFuture.get()

                            val preview = Preview.Builder()
                                .setTargetAspectRatio(AspectRatio.RATIO_4_3)
                                .build()
                                .also { it.setSurfaceProvider(surfaceProvider) }

                            imageCapture = ImageCapture.Builder()
                                .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                                .setTargetAspectRatio(AspectRatio.RATIO_4_3)
                                .build()

                            try {
                                cameraProvider.unbindAll()
                                cameraProvider.bindToLifecycle(lifecycleOwner, CameraSelector.DEFAULT_BACK_CAMERA, preview, imageCapture)
                            } catch (e: Exception) { Log.e("CameraX", "Camera binding failed", e) }
                        }, ContextCompat.getMainExecutor(ctx))
                    }
                },
                modifier = Modifier.fillMaxSize()
            )
            if (isProcessing) {
                Box(modifier = Modifier.fillMaxSize().background(Color.Black.copy(alpha = 0.7f)), contentAlignment = Alignment.Center) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        CircularProgressIndicator(color = Color.White)
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(text = processingStatus, color = Color.White, fontSize = 14.sp)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // 캡처 버튼
        Button(
            onClick = {
                if (!isProcessing && imageCapture != null) {
                    isProcessing = true
                    scope.launch {
                        val results = mutableListOf<String>()
                        var lastBitmap: Bitmap? = null
                        val executor = ContextCompat.getMainExecutor(context)

                        // 연속 캡처 및 인식
                        for (i in 1..CAPTURE_COUNT) {
                            processingStatus = "캡처 중... ($i/$CAPTURE_COUNT)"
                            val (text, bitmap) = captureAndRecognize(imageCapture!!, executor)
                            if (text.isNotBlank()) {
                                results.add(text)
                            }
                            if (bitmap != null) {
                                lastBitmap = bitmap
                            }
                            if (i < CAPTURE_COUNT) {
                                delay(CAPTURE_DELAY_MS)
                            }
                        }

                        processingStatus = "분석 중..."
                        capturedBitmap = lastBitmap
                        rawResults = results

                        if (results.isNotEmpty()) {
                            // 다중 결과에서 최적 선택
                            val (bestResult, votes) = selectBestResult(results)
                            voteCount = votes
                            hangulCandidates = extractHangulCandidates(results)

                            val pattern = Regex("\\d{2,3}[가-힣]\\d{4}")
                            val hasPlatePattern = pattern.containsMatchIn(bestResult)

                            if (hasPlatePattern) {
                                isLicensePlate = true
                                val processed = postProcessLicensePlate(bestResult)
                                recognizedText = if (isValidLicensePlate(processed)) {
                                    formatLicensePlate(processed)
                                } else processed
                            } else {
                                isLicensePlate = false
                                recognizedText = results.maxByOrNull { it.length } ?: ""
                            }

                            // 신뢰도 계산 (투표 비율 기반)
                            confidence = votes.toFloat() / CAPTURE_COUNT
                        } else {
                            recognizedText = "인식 실패"
                            confidence = 0f
                        }

                        isProcessing = false
                        processingStatus = ""
                    }
                }
            },
            modifier = Modifier.fillMaxWidth().height(60.dp),
            enabled = !isProcessing
        ) {
            Text(
                text = if (isProcessing) processingStatus.ifBlank { "처리 중..." } else "캡처 및 인식 (${CAPTURE_COUNT}회)",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        // 결과 영역
        Card(modifier = Modifier.fillMaxWidth().weight(0.85f), shape = RoundedCornerShape(12.dp)) {
            Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
                // 상단: 캡처 이미지 + 결과
                Row(modifier = Modifier.fillMaxWidth().weight(1f)) {
                    // 캡처된 이미지 썸네일
                    Box(
                        modifier = Modifier
                            .width(100.dp)
                            .fillMaxHeight()
                            .clip(RoundedCornerShape(8.dp))
                            .background(Color.DarkGray)
                            .border(1.dp, Color.Gray, RoundedCornerShape(8.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        if (capturedBitmap != null) {
                            Image(
                                bitmap = capturedBitmap!!.asImageBitmap(),
                                contentDescription = "캡처된 이미지",
                                modifier = Modifier.fillMaxSize(),
                                contentScale = ContentScale.Fit
                            )
                        } else {
                            Text("캡처\n대기", fontSize = 10.sp, color = Color.Gray, textAlign = TextAlign.Center)
                        }
                    }

                    Spacer(modifier = Modifier.width(12.dp))

                    // 인식 결과
                    Column(modifier = Modifier.weight(1f)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = if (isLicensePlate) "번호판" else "결과",
                                fontSize = 14.sp,
                                fontWeight = FontWeight.Bold
                            )
                            if (recognizedText.isNotBlank() && recognizedText != "인식 실패") {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(
                                        text = "$voteCount/$CAPTURE_COUNT",
                                        fontSize = 11.sp,
                                        color = Color.Gray
                                    )
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text(
                                        text = "${(confidence * 100).toInt()}%",
                                        fontSize = 12.sp,
                                        color = when {
                                            confidence >= 0.8f -> Color(0xFF4CAF50)
                                            confidence >= 0.5f -> Color(0xFFFF9800)
                                            else -> Color(0xFFF44336)
                                        },
                                        fontWeight = FontWeight.Bold
                                    )
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .weight(1f)
                                .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(8.dp))
                                .padding(8.dp)
                                .verticalScroll(rememberScrollState())
                        ) {
                            Column {
                                Text(
                                    text = recognizedText.ifBlank { "캡처 버튼을 누르세요" },
                                    fontSize = if (isLicensePlate) 24.sp else 14.sp,
                                    fontWeight = if (isLicensePlate) FontWeight.Bold else FontWeight.Normal,
                                    color = if (recognizedText.isBlank()) Color.Gray else MaterialTheme.colorScheme.onSurface
                                )

                                // 한글 후보 표시 (번호판이고 여러 후보가 있을 때)
                                if (isLicensePlate && hangulCandidates.size > 1) {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Text(text = "인식된 후보:", fontSize = 10.sp, color = Color.Gray)
                                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                                        hangulCandidates.forEach { char ->
                                            Text(
                                                text = char.toString(),
                                                fontSize = 14.sp,
                                                color = MaterialTheme.colorScheme.primary,
                                                modifier = Modifier
                                                    .background(
                                                        MaterialTheme.colorScheme.primaryContainer,
                                                        RoundedCornerShape(4.dp)
                                                    )
                                                    .padding(horizontal = 8.dp, vertical = 2.dp)
                                            )
                                        }
                                    }
                                }

                                // Raw 결과 (디버그용)
                                if (rawResults.isNotEmpty()) {
                                    Spacer(modifier = Modifier.height(8.dp))
                                    Text(
                                        text = "원본 (${rawResults.size}회): ${rawResults.map { it.replace(Regex("[\\s\\n]"), " ").take(20) }}",
                                        fontSize = 9.sp,
                                        color = Color.Gray
                                    )
                                }
                            }
                        }
                    }
                }

                Spacer(modifier = Modifier.height(8.dp))

                // 버튼들
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedButton(
                        onClick = {
                            if (recognizedText.isNotBlank() && recognizedText != "인식 실패") {
                                val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                                val textToCopy = if (isLicensePlate) recognizedText.replace(" ", "") else recognizedText
                                clipboard.setPrimaryClip(ClipData.newPlainText("OCR", textToCopy))
                                Toast.makeText(context, "복사됨", Toast.LENGTH_SHORT).show()
                            }
                        },
                        modifier = Modifier.weight(1f),
                        enabled = recognizedText.isNotBlank() && recognizedText != "인식 실패"
                    ) { Text("복사", fontSize = 14.sp) }
                    OutlinedButton(
                        onClick = { if (recognizedText.isNotBlank()) onSpeak(recognizedText) },
                        modifier = Modifier.weight(1f),
                        enabled = recognizedText.isNotBlank() && recognizedText != "인식 실패"
                    ) { Text("읽기", fontSize = 14.sp) }
                    OutlinedButton(
                        onClick = {
                            recognizedText = ""
                            rawResults = emptyList()
                            confidence = 0f
                            isLicensePlate = false
                            capturedBitmap = null
                            voteCount = 0
                            hangulCandidates = emptySet()
                        },
                        modifier = Modifier.weight(1f),
                        enabled = recognizedText.isNotBlank() || capturedBitmap != null
                    ) { Text("초기화", fontSize = 14.sp) }
                }
            }
        }
    }
}

fun calculateConfidence(visionText: Text): Float {
    if (visionText.textBlocks.isEmpty()) return 0f
    var total = 0f; var count = 0
    for (block in visionText.textBlocks) {
        for (line in block.lines) {
            for (element in line.elements) {
                element.confidence?.let { total += it; count++ }
            }
        }
    }
    return if (count > 0) total / count else 0.7f
}
