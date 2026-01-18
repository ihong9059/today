package com.example.opencvlpr

import android.graphics.Bitmap
import android.graphics.RectF
import org.opencv.android.Utils
import org.opencv.core.*
import org.opencv.imgproc.Imgproc

/**
 * OpenCV를 사용한 번호판 영역 검출기
 *
 * 검출 방법:
 * 1. 그레이스케일 변환
 * 2. 가우시안 블러로 노이즈 제거
 * 3. 에지 검출 (Canny)
 * 4. 윤곽선 검출
 * 5. 번호판 비율에 맞는 사각형 필터링
 */
class PlateDetectorCV {

    companion object {
        // 한국 번호판 비율 (가로:세로 ≈ 2:1 ~ 4.5:1)
        private const val MIN_ASPECT_RATIO = 2.0
        private const val MAX_ASPECT_RATIO = 5.0

        // 번호판 최소/최대 면적 비율 (전체 이미지 대비)
        private const val MIN_AREA_RATIO = 0.01
        private const val MAX_AREA_RATIO = 0.3
    }

    /**
     * 이미지에서 번호판 영역 검출
     */
    fun detect(bitmap: Bitmap): DetectionResult? {
        // Bitmap -> Mat 변환
        val src = Mat()
        Utils.bitmapToMat(bitmap, src)

        val imgArea = src.rows() * src.cols()

        // 1. 그레이스케일 변환
        val gray = Mat()
        Imgproc.cvtColor(src, gray, Imgproc.COLOR_BGR2GRAY)

        // 2. 가우시안 블러
        val blurred = Mat()
        Imgproc.GaussianBlur(gray, blurred, Size(5.0, 5.0), 0.0)

        // 3. 엣지 검출
        val edges = Mat()
        Imgproc.Canny(blurred, edges, 50.0, 150.0)

        // 4. 모폴로지 연산 (엣지 연결)
        val kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, Size(3.0, 3.0))
        val dilated = Mat()
        Imgproc.dilate(edges, dilated, kernel)

        // 5. 윤곽선 검출
        val contours = mutableListOf<MatOfPoint>()
        val hierarchy = Mat()
        Imgproc.findContours(dilated, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE)

        var bestRect: Rect? = null
        var bestScore = 0.0

        // 6. 번호판 후보 필터링
        for (contour in contours) {
            val rect = Imgproc.boundingRect(contour)
            val area = rect.area()
            val aspectRatio = rect.width.toDouble() / rect.height

            // 면적 필터링
            val areaRatio = area / imgArea
            if (areaRatio < MIN_AREA_RATIO || areaRatio > MAX_AREA_RATIO) continue

            // 비율 필터링
            if (aspectRatio < MIN_ASPECT_RATIO || aspectRatio > MAX_ASPECT_RATIO) continue

            // 점수 계산 (면적이 크고 비율이 적절할수록 높은 점수)
            val score = areaRatio * (1.0 - kotlin.math.abs(aspectRatio - 3.5) / 2.0)
            if (score > bestScore) {
                bestScore = score
                bestRect = rect
            }
        }

        // 리소스 정리
        src.release()
        gray.release()
        blurred.release()
        edges.release()
        dilated.release()
        hierarchy.release()
        contours.forEach { it.release() }

        return bestRect?.let {
            DetectionResult(
                boundingBox = RectF(
                    it.x.toFloat(),
                    it.y.toFloat(),
                    (it.x + it.width).toFloat(),
                    (it.y + it.height).toFloat()
                ),
                confidence = bestScore.toFloat()
            )
        }
    }

    /**
     * 번호판 영역 전처리 (OCR 정확도 향상)
     */
    fun preprocessPlate(bitmap: Bitmap): Bitmap {
        val src = Mat()
        Utils.bitmapToMat(bitmap, src)

        // 그레이스케일
        val gray = Mat()
        Imgproc.cvtColor(src, gray, Imgproc.COLOR_BGR2GRAY)

        // 히스토그램 평활화 (대비 향상)
        val equalized = Mat()
        Imgproc.equalizeHist(gray, equalized)

        // 적응형 이진화
        val binary = Mat()
        Imgproc.adaptiveThreshold(
            equalized,
            binary,
            255.0,
            Imgproc.ADAPTIVE_THRESH_GAUSSIAN_C,
            Imgproc.THRESH_BINARY,
            11,
            2.0
        )

        // 노이즈 제거
        val denoised = Mat()
        Imgproc.medianBlur(binary, denoised, 3)

        // Mat -> Bitmap 변환
        val result = Bitmap.createBitmap(bitmap.width, bitmap.height, Bitmap.Config.ARGB_8888)
        Utils.matToBitmap(denoised, result)

        // 리소스 정리
        src.release()
        gray.release()
        equalized.release()
        binary.release()
        denoised.release()

        return result
    }

    data class DetectionResult(
        val boundingBox: RectF,
        val confidence: Float
    )
}
