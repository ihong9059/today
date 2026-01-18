package com.example.opencvlpr

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.*
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import com.example.opencvlpr.databinding.ActivityMainBinding
import org.opencv.android.OpenCVLoader
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService

    private lateinit var plateDetector: PlateDetectorCV
    private lateinit var tesseractOCR: TesseractOCR

    private var imageCapture: ImageCapture? = null
    private var isOpenCVInitialized = false

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            startCamera()
        } else {
            Toast.makeText(this, "카메라 권한이 필요합니다", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()

        // OpenCV 초기화
        initOpenCV()

        // Tesseract 초기화
        tesseractOCR = TesseractOCR(this)

        // 카메라 권한 확인
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            == PackageManager.PERMISSION_GRANTED
        ) {
            startCamera()
        } else {
            requestPermissionLauncher.launch(Manifest.permission.CAMERA)
        }

        // 인식 버튼 클릭
        binding.captureButton.setOnClickListener {
            if (isOpenCVInitialized) {
                captureAndRecognize()
            } else {
                Toast.makeText(this, "OpenCV 초기화 중...", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun initOpenCV() {
        if (OpenCVLoader.initLocal()) {
            isOpenCVInitialized = true
            plateDetector = PlateDetectorCV()
            Log.i(TAG, "OpenCV 초기화 성공")
        } else {
            Log.e(TAG, "OpenCV 초기화 실패")
            Toast.makeText(this, "OpenCV 초기화 실패", Toast.LENGTH_LONG).show()
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            // 프리뷰 설정
            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(binding.previewView.surfaceProvider)
                }

            // 이미지 캡처 설정
            imageCapture = ImageCapture.Builder()
                .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
                .build()

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageCapture
                )
            } catch (e: Exception) {
                Log.e(TAG, "카메라 바인딩 실패", e)
            }

        }, ContextCompat.getMainExecutor(this))
    }

    private fun captureAndRecognize() {
        // PreviewView에서 비트맵 가져오기
        val bitmap = binding.previewView.bitmap ?: run {
            Toast.makeText(this, "이미지 캡처 실패", Toast.LENGTH_SHORT).show()
            return
        }

        updateProcessingStatus("번호판 검출 중...")

        cameraExecutor.execute {
            // 1. OpenCV로 번호판 영역 검출
            val detection = plateDetector.detect(bitmap)

            if (detection == null) {
                runOnUiThread {
                    binding.plateNumberText.text = "번호판을 찾을 수 없습니다"
                    updateProcessingStatus("검출 실패")
                }
                return@execute
            }

            runOnUiThread {
                updateProcessingStatus("번호판 전처리 중...")
            }

            // 2. 번호판 영역 크롭
            val plateBitmap = Bitmap.createBitmap(
                bitmap,
                detection.boundingBox.left.toInt().coerceAtLeast(0),
                detection.boundingBox.top.toInt().coerceAtLeast(0),
                (detection.boundingBox.width()).toInt().coerceAtMost(bitmap.width),
                (detection.boundingBox.height()).toInt().coerceAtMost(bitmap.height)
            )

            // 3. OpenCV로 전처리
            val preprocessed = plateDetector.preprocessPlate(plateBitmap)

            runOnUiThread {
                updateProcessingStatus("OCR 인식 중...")
            }

            // 4. Tesseract OCR로 문자 인식
            val result = tesseractOCR.recognize(preprocessed)

            runOnUiThread {
                binding.plateNumberText.text = result.text.ifEmpty { "인식 실패" }
                updateProcessingStatus("완료 (신뢰도: ${result.confidence}%)")
            }

            Log.i(TAG, "Detected: ${result.text}, Confidence: ${result.confidence}")
        }
    }

    private fun updateProcessingStatus(status: String) {
        binding.processingText.text = "처리 단계: $status"
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        tesseractOCR.close()
    }

    companion object {
        private const val TAG = "OpenCVLPR"
    }
}
