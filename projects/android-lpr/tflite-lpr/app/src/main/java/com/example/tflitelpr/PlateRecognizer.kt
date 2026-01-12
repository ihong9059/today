package com.example.tflitelpr

import android.content.Context
import android.graphics.Bitmap
import org.tensorflow.lite.Interpreter
import org.tensorflow.lite.support.common.FileUtil
import java.nio.ByteBuffer
import java.nio.ByteOrder

/**
 * TensorFlow Lite를 사용한 번호판 문자 인식기 (OCR)
 *
 * 사용 방법:
 * 1. 번호판 OCR 모델(.tflite)을 assets 폴더에 추가
 * 2. 모델명을 MODEL_FILE에 설정
 *
 * 모델 학습:
 * - CRNN (CNN + RNN) 구조 권장
 * - 한국 번호판 문자 데이터셋으로 학습
 * - CTC Loss 사용
 */
class PlateRecognizer(context: Context) {

    private var interpreter: Interpreter? = null
    private val inputWidth = 200
    private val inputHeight = 64

    // 한국 번호판에서 사용되는 문자들
    private val charset = listOf(
        // 숫자
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        // 지역 (구형)
        '서', '부', '대', '인', '광', '울', '경', '강', '충', '전', '제',
        // 용도 문자
        '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
        '거', '너', '더', '러', '머', '버', '서', '어', '저', '처', '커', '터', '퍼', '허',
        '고', '노', '도', '로', '모', '보', '소', '오', '조', '초', '코', '토', '포', '호',
        '구', '누', '두', '루', '무', '부', '수', '우', '주', '추', '쿠', '투', '푸', '후',
        // 공백/구분자
        ' '
    )

    companion object {
        private const val MODEL_FILE = "plate_recognizer.tflite"
    }

    init {
        try {
            val model = FileUtil.loadMappedFile(context, MODEL_FILE)
            val options = Interpreter.Options().apply {
                setNumThreads(4)
            }
            interpreter = Interpreter(model, options)
        } catch (e: Exception) {
            interpreter = null
        }
    }

    /**
     * 번호판 이미지에서 텍스트 인식
     * @param plateBitmap 번호판 영역만 크롭된 이미지
     * @return 인식된 번호판 텍스트와 신뢰도
     */
    fun recognize(plateBitmap: Bitmap): RecognitionResult {
        if (interpreter == null) {
            // 모델이 없으면 더미 결과 반환 (테스트용)
            return RecognitionResult(
                text = "모델 필요",
                confidence = 0.0f
            )
        }

        // 이미지 전처리
        val inputBuffer = preprocessImage(plateBitmap)

        // 출력 버퍼 (CTC 디코딩용)
        val outputBuffer = ByteBuffer.allocateDirect(50 * charset.size * 4)
        outputBuffer.order(ByteOrder.nativeOrder())

        // 추론
        interpreter?.run(inputBuffer, outputBuffer)

        // CTC 디코딩
        return decodeOutput(outputBuffer)
    }

    private fun preprocessImage(bitmap: Bitmap): ByteBuffer {
        val resized = Bitmap.createScaledBitmap(bitmap, inputWidth, inputHeight, true)
        val buffer = ByteBuffer.allocateDirect(inputWidth * inputHeight * 4)
        buffer.order(ByteOrder.nativeOrder())

        val pixels = IntArray(inputWidth * inputHeight)
        resized.getPixels(pixels, 0, inputWidth, 0, 0, inputWidth, inputHeight)

        // 그레이스케일 + 정규화
        for (pixel in pixels) {
            val r = (pixel shr 16) and 0xFF
            val g = (pixel shr 8) and 0xFF
            val b = pixel and 0xFF
            val gray = (0.299f * r + 0.587f * g + 0.114f * b) / 255.0f
            buffer.putFloat(gray)
        }

        return buffer
    }

    private fun decodeOutput(output: ByteBuffer): RecognitionResult {
        output.rewind()
        val result = StringBuilder()
        var totalConfidence = 0f
        var charCount = 0
        var prevIndex = -1

        // CTC Greedy 디코딩
        for (t in 0 until 50) {
            var maxIndex = 0
            var maxProb = Float.MIN_VALUE

            for (c in charset.indices) {
                val prob = output.getFloat()
                if (prob > maxProb) {
                    maxProb = prob
                    maxIndex = c
                }
            }

            // 중복 제거 및 blank 무시
            if (maxIndex != prevIndex && maxIndex < charset.size - 1) {
                result.append(charset[maxIndex])
                totalConfidence += maxProb
                charCount++
            }
            prevIndex = maxIndex
        }

        val avgConfidence = if (charCount > 0) totalConfidence / charCount else 0f

        return RecognitionResult(
            text = result.toString().trim(),
            confidence = avgConfidence
        )
    }

    fun close() {
        interpreter?.close()
    }

    data class RecognitionResult(
        val text: String,
        val confidence: Float
    )
}
