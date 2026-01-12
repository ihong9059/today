package com.example.tflitelpr

import android.content.Context
import android.graphics.Bitmap
import android.graphics.RectF
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.nio.ByteBuffer
import java.nio.ByteOrder

/**
 * TensorFlow Lite를 사용한 번호판 검출기
 *
 * 사용 방법:
 * 1. 번호판 검출 모델(.tflite)을 assets 폴더에 추가
 * 2. 모델명을 MODEL_FILE에 설정
 *
 * 모델 학습:
 * - YOLO, SSD, EfficientDet 등의 객체 검출 모델 사용
 * - 한국 번호판 데이터셋으로 학습
 * - TFLite로 변환
 */
class PlateDetector(context: Context) {

    private var interpreter: Interpreter? = null
    private val inputSize = 320  // 모델 입력 크기

    companion object {
        private const val MODEL_FILE = "plate_detector.tflite"
        private const val CONFIDENCE_THRESHOLD = 0.5f
    }

    init {
        try {
            val model = FileUtil.loadMappedFile(context, MODEL_FILE)
            val options = Interpreter.Options().apply {
                setNumThreads(4)
            }
            interpreter = Interpreter(model, options)
        } catch (e: Exception) {
            // 모델 파일이 없으면 더미 모드로 동작
            interpreter = null
        }
    }

    /**
     * 이미지에서 번호판 영역 검출
     * @return 검출된 번호판 영역 (RectF) 또는 null
     */
    fun detect(bitmap: Bitmap): DetectionResult? {
        if (interpreter == null) {
            // 모델이 없으면 전체 이미지 중앙 영역 반환 (테스트용)
            return DetectionResult(
                boundingBox = RectF(
                    bitmap.width * 0.1f,
                    bitmap.height * 0.4f,
                    bitmap.width * 0.9f,
                    bitmap.height * 0.6f
                ),
                confidence = 0.0f
            )
        }

        // 이미지 전처리
        val inputBuffer = preprocessImage(bitmap)

        // 출력 버퍼 준비 (모델에 따라 조정 필요)
        val outputBuffer = TensorBuffer.createFixedSize(
            intArrayOf(1, 10, 6), // [batch, max_detections, (x1,y1,x2,y2,score,class)]
            org.tensorflow.lite.DataType.FLOAT32
        )

        // 추론 실행
        interpreter?.run(inputBuffer, outputBuffer.buffer.rewind())

        // 결과 파싱
        return parseOutput(outputBuffer, bitmap.width, bitmap.height)
    }

    private fun preprocessImage(bitmap: Bitmap): ByteBuffer {
        val resized = Bitmap.createScaledBitmap(bitmap, inputSize, inputSize, true)
        val buffer = ByteBuffer.allocateDirect(inputSize * inputSize * 3 * 4)
        buffer.order(ByteOrder.nativeOrder())

        val pixels = IntArray(inputSize * inputSize)
        resized.getPixels(pixels, 0, inputSize, 0, 0, inputSize, inputSize)

        for (pixel in pixels) {
            buffer.putFloat(((pixel shr 16) and 0xFF) / 255.0f)  // R
            buffer.putFloat(((pixel shr 8) and 0xFF) / 255.0f)   // G
            buffer.putFloat((pixel and 0xFF) / 255.0f)           // B
        }

        return buffer
    }

    private fun parseOutput(output: TensorBuffer, imgWidth: Int, imgHeight: Int): DetectionResult? {
        val data = output.floatArray

        var bestBox: RectF? = null
        var bestScore = CONFIDENCE_THRESHOLD

        // 각 검출 결과 확인
        for (i in 0 until 10) {
            val offset = i * 6
            val score = data[offset + 4]

            if (score > bestScore) {
                bestScore = score
                bestBox = RectF(
                    data[offset] * imgWidth,
                    data[offset + 1] * imgHeight,
                    data[offset + 2] * imgWidth,
                    data[offset + 3] * imgHeight
                )
            }
        }

        return bestBox?.let {
            DetectionResult(it, bestScore)
        }
    }

    fun close() {
        interpreter?.close()
    }

    data class DetectionResult(
        val boundingBox: RectF,
        val confidence: Float
    )
}
