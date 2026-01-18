package com.example.opencvlpr

import android.content.Context
import android.graphics.Bitmap
import com.googlecode.tesseract.android.TessBaseAPI
import java.io.File
import java.io.FileOutputStream

/**
 * Tesseract OCR 엔진 래퍼
 *
 * 사용 방법:
 * 1. assets/tessdata/ 폴더에 kor.traineddata 파일 추가
 *    - 다운로드: https://github.com/tesseract-ocr/tessdata
 * 2. 한국 번호판용 커스텀 학습 데이터 사용 시 정확도 향상
 */
class TesseractOCR(private val context: Context) {

    private var tessBaseAPI: TessBaseAPI? = null
    private val dataPath: String

    // 번호판에 사용되는 문자만 허용
    private val allowedChars = "0123456789" +
            "가나다라마바사아자차카타파하" +
            "거너더러머버서어저처커터퍼허" +
            "고노도로모보소오조초코토포호" +
            "구누두루무부수우주추쿠투푸후" +
            "서부대인광울경강충전제"

    init {
        dataPath = context.filesDir.absolutePath + "/"
        copyTrainedData()
        initTesseract()
    }

    /**
     * assets에서 tessdata 복사
     */
    private fun copyTrainedData() {
        val tessDir = File(dataPath, "tessdata")
        if (!tessDir.exists()) {
            tessDir.mkdirs()
        }

        val trainedDataFile = File(tessDir, "kor.traineddata")
        if (!trainedDataFile.exists()) {
            try {
                context.assets.open("tessdata/kor.traineddata").use { input ->
                    FileOutputStream(trainedDataFile).use { output ->
                        input.copyTo(output)
                    }
                }
            } catch (e: Exception) {
                // traineddata 파일이 없는 경우 영어만 사용
                try {
                    context.assets.open("tessdata/eng.traineddata").use { input ->
                        val engFile = File(tessDir, "eng.traineddata")
                        FileOutputStream(engFile).use { output ->
                            input.copyTo(output)
                        }
                    }
                } catch (e2: Exception) {
                    e2.printStackTrace()
                }
            }
        }
    }

    /**
     * Tesseract 초기화
     */
    private fun initTesseract() {
        tessBaseAPI = TessBaseAPI()

        // 한국어 + 영어 모드로 초기화 시도
        val initialized = tessBaseAPI?.init(dataPath, "kor+eng")
            ?: tessBaseAPI?.init(dataPath, "eng")
            ?: false

        if (initialized == true) {
            // 번호판 인식에 최적화된 설정
            tessBaseAPI?.apply {
                // 단일 줄 모드
                pageSegMode = TessBaseAPI.PageSegMode.PSM_SINGLE_LINE
                // 허용 문자 제한
                setVariable(TessBaseAPI.VAR_CHAR_WHITELIST, allowedChars)
            }
        }
    }

    /**
     * 이미지에서 텍스트 인식
     */
    fun recognize(bitmap: Bitmap): RecognitionResult {
        if (tessBaseAPI == null) {
            return RecognitionResult(
                text = "OCR 초기화 실패",
                confidence = 0
            )
        }

        tessBaseAPI?.setImage(bitmap)
        val text = tessBaseAPI?.utF8Text ?: ""
        val confidence = tessBaseAPI?.meanConfidence() ?: 0

        // 번호판 형식 정리
        val cleanedText = cleanPlateText(text)

        return RecognitionResult(
            text = cleanedText,
            confidence = confidence
        )
    }

    /**
     * 인식된 텍스트 정리
     */
    private fun cleanPlateText(text: String): String {
        return text
            .replace("\n", " ")
            .replace(Regex("""\s+"""), " ")
            .replace(Regex("""[^0-9가-힣\s]"""), "")
            .trim()
            .uppercase()
    }

    fun close() {
        tessBaseAPI?.recycle()
        tessBaseAPI = null
    }

    data class RecognitionResult(
        val text: String,
        val confidence: Int  // 0-100
    )
}
