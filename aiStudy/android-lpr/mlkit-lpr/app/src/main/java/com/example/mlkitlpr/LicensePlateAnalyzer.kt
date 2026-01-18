package com.example.mlkitlpr

import android.graphics.Rect
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.korean.KoreanTextRecognizerOptions

/**
 * ML Kit을 사용한 번호판 분석기
 */
class LicensePlateAnalyzer(
    private val onPlateDetected: (String) -> Unit
) : ImageAnalysis.Analyzer {

    private val recognizer = TextRecognition.getClient(
        KoreanTextRecognizerOptions.Builder().build()
    )

    // 한국 번호판 패턴
    private val platePatterns = listOf(
        // 신형: 123가 4567
        Regex("""(\d{2,3})\s*([가-힣])\s*(\d{4})"""),
        // 구형: 서울 12 가 3456
        Regex("""([가-힣]{2})\s*(\d{2})\s*([가-힣])\s*(\d{4})"""),
        // 영업용: 서울 12 바 3456
        Regex("""([가-힣]{2})\s*(\d{2})\s*([바사아자])\s*(\d{4})"""),
    )

    @ExperimentalGetImage
    override fun analyze(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image ?: run {
            imageProxy.close()
            return
        }

        val image = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees
        )

        recognizer.process(image)
            .addOnSuccessListener { visionText ->
                val fullText = visionText.text
                findLicensePlate(fullText)?.let { plate ->
                    onPlateDetected(plate)
                }
            }
            .addOnCompleteListener {
                imageProxy.close()
            }
    }

    /**
     * 텍스트에서 번호판 패턴 찾기
     */
    private fun findLicensePlate(text: String): String? {
        // 공백 정규화
        val normalizedText = text.replace("\n", " ")
            .replace(Regex("""\s+"""), " ")
            .trim()

        for (pattern in platePatterns) {
            val match = pattern.find(normalizedText)
            if (match != null) {
                return formatPlateNumber(match.value)
            }
        }
        return null
    }

    /**
     * 번호판 형식 정리
     */
    private fun formatPlateNumber(raw: String): String {
        return raw.replace(Regex("""\s+"""), " ").trim().uppercase()
    }
}
