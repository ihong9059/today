package com.example.tflitelpr

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
import com.example.tflitelpr.databinding.ActivityMainBinding
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraExecutor: ExecutorService

    private lateinit var plateDetector: PlateDetector
    private lateinit var plateRecognizer: PlateRecognizer

    private var imageCapture: ImageCapture? = null

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

        // TFLite 모델 초기화
        plateDetector = PlateDetector(this)
        plateRecognizer = PlateRecognizer(this)

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
            captureAndRecognize()
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

        cameraExecutor.execute {
            // 1. 번호판 영역 검출
            val detection = plateDetector.detect(bitmap)

            if (detection == null) {
                runOnUiThread {
                    binding.plateNumberText.text = "번호판을 찾을 수 없습니다"
                    binding.confidenceText.text = "신뢰도: -"
                }
                return@execute
            }

            // 2. 번호판 영역 크롭
            val plateBitmap = Bitmap.createBitmap(
                bitmap,
                detection.boundingBox.left.toInt().coerceAtLeast(0),
                detection.boundingBox.top.toInt().coerceAtLeast(0),
                (detection.boundingBox.width()).toInt().coerceAtMost(bitmap.width),
                (detection.boundingBox.height()).toInt().coerceAtMost(bitmap.height)
            )

            // 3. 문자 인식
            val result = plateRecognizer.recognize(plateBitmap)

            runOnUiThread {
                binding.plateNumberText.text = result.text.ifEmpty { "인식 실패" }
                binding.confidenceText.text = "신뢰도: ${(result.confidence * 100).toInt()}%"
            }

            Log.i(TAG, "Detected: ${result.text}, Confidence: ${result.confidence}")
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        plateDetector.close()
        plateRecognizer.close()
    }

    companion object {
        private const val TAG = "TFLiteLPR"
    }
}
