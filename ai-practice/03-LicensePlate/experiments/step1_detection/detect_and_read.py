"""
번호판 검출 + OCR 통합 스크립트

YOLO로 번호판 검출 → EasyOCR로 문자 인식

사용법:
    python detect_and_read.py --image car.jpg
    python detect_and_read.py --folder test_images
    python detect_and_read.py --camera
"""

import os
import argparse
from pathlib import Path

# 패키지 확인
try:
    from ultralytics import YOLO
except ImportError:
    print("ultralytics 패키지를 설치하세요:")
    print("  pip install ultralytics")
    exit(1)

try:
    import easyocr
except ImportError:
    print("easyocr 패키지를 설치하세요:")
    print("  pip install easyocr")
    exit(1)

import cv2
import numpy as np

# 경로 설정
MODEL_PATH = Path("models/plate_detector.pt")
OUTPUT_DIR = Path("results")

# 전역 변수 (OCR 리더는 한 번만 로드)
ocr_reader = None

def init_ocr():
    """OCR 리더 초기화 (최초 1회)"""
    global ocr_reader
    if ocr_reader is None:
        print("OCR 모델 로딩 중... (최초 실행 시 모델 다운로드, 1-2분 소요)")
        ocr_reader = easyocr.Reader(['ko', 'en'], gpu=True)
        print("OCR 모델 로드 완료!")
    return ocr_reader

def detect_and_read(image, detector, reader, show=False, save_path=None):
    """
    이미지에서 번호판 검출 및 OCR

    Args:
        image: OpenCV 이미지 (BGR)
        detector: YOLO 모델
        reader: EasyOCR 리더
        show: 결과 이미지 표시 여부
        save_path: 결과 저장 경로 (None이면 저장 안 함)

    Returns:
        list: [(번호판 텍스트, 신뢰도, 바운딩박스), ...]
    """
    results = []

    # Step 1: 번호판 검출
    detections = detector(image, verbose=False)

    result_image = image.copy()

    for box in detections[0].boxes:
        # 바운딩 박스 좌표
        x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
        det_conf = box.conf[0].item()

        # 번호판 영역 크롭 (여유 공간 추가)
        margin = 5
        y1_crop = max(0, y1 - margin)
        y2_crop = min(image.shape[0], y2 + margin)
        x1_crop = max(0, x1 - margin)
        x2_crop = min(image.shape[1], x2 + margin)

        plate_img = image[y1_crop:y2_crop, x1_crop:x2_crop]

        # Step 2+3: OCR로 문자 인식
        ocr_results = reader.readtext(plate_img)

        # 텍스트 합치기
        if ocr_results:
            plate_text = ' '.join([text for _, text, _ in ocr_results])
            ocr_conf = np.mean([conf for _, _, conf in ocr_results])
        else:
            plate_text = "(인식 실패)"
            ocr_conf = 0.0

        results.append({
            'text': plate_text,
            'detection_conf': det_conf,
            'ocr_conf': ocr_conf,
            'bbox': (x1, y1, x2, y2)
        })

        # 결과 이미지에 표시
        # 바운딩 박스
        cv2.rectangle(result_image, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # 텍스트 배경
        text_size = cv2.getTextSize(plate_text, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)[0]
        cv2.rectangle(result_image, (x1, y1 - 30), (x1 + text_size[0] + 10, y1), (0, 255, 0), -1)

        # 텍스트 (한글은 깨질 수 있음 - PIL 사용 권장)
        cv2.putText(result_image, plate_text, (x1 + 5, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)

    # 결과 표시
    if show:
        cv2.imshow("License Plate Detection + OCR", result_image)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # 결과 저장
    if save_path:
        cv2.imwrite(str(save_path), result_image)

    return results, result_image

def process_image(image_path, detector, reader, show=True, save=True):
    """단일 이미지 처리"""
    print(f"\n처리 중: {image_path}")

    image = cv2.imread(str(image_path))
    if image is None:
        print(f"  이미지를 읽을 수 없습니다: {image_path}")
        return None

    # 저장 경로
    save_path = None
    if save:
        OUTPUT_DIR.mkdir(exist_ok=True)
        save_path = OUTPUT_DIR / f"ocr_{Path(image_path).name}"

    # 검출 및 OCR
    results, _ = detect_and_read(image, detector, reader, show=show, save_path=save_path)

    # 결과 출력
    if results:
        for i, r in enumerate(results):
            print(f"  [{i+1}] 번호판: {r['text']}")
            print(f"      검출 신뢰도: {r['detection_conf']:.2%}")
            print(f"      OCR 신뢰도: {r['ocr_conf']:.2%}")
        if save_path:
            print(f"  저장됨: {save_path}")
    else:
        print("  번호판을 찾지 못했습니다.")

    return results

def process_folder(folder_path, detector, reader, show=False):
    """폴더 내 모든 이미지 처리"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp'}
    images = [f for f in Path(folder_path).iterdir()
              if f.suffix.lower() in image_extensions]

    if not images:
        print(f"'{folder_path}' 폴더에 이미지가 없습니다.")
        return

    print(f"\n총 {len(images)}개 이미지 처리")
    print("=" * 60)

    all_results = []
    for img_path in images[:10]:  # 처음 10개만 처리 (전체는 시간 오래 걸림)
        results = process_image(img_path, detector, reader, show=show, save=True)
        if results:
            all_results.extend(results)

    print("=" * 60)
    print(f"완료! {len(all_results)}개 번호판 인식")
    print(f"결과 저장: {OUTPUT_DIR.absolute()}")

def process_camera(detector, reader):
    """웹캠 실시간 처리"""
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("웹캠을 열 수 없습니다.")
        return

    print("웹캠 시작 (종료: 'q' 키, 캡처: 's' 키)")

    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1

        # 5프레임마다 OCR 실행 (성능 최적화)
        if frame_count % 5 == 0:
            results, result_frame = detect_and_read(frame, detector, reader, show=False)

            # 결과 텍스트 표시
            y_offset = 30
            for r in results:
                text = f"{r['text']} ({r['ocr_conf']:.0%})"
                cv2.putText(result_frame, text, (10, y_offset),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
                y_offset += 30
        else:
            result_frame = frame

        cv2.imshow("License Plate OCR (Press 'q' to quit, 's' to save)", result_frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            OUTPUT_DIR.mkdir(exist_ok=True)
            save_path = OUTPUT_DIR / f"capture_{frame_count}.jpg"
            cv2.imwrite(str(save_path), result_frame)
            print(f"캡처 저장: {save_path}")

    cap.release()
    cv2.destroyAllWindows()
    print("웹캠 종료")

def main():
    parser = argparse.ArgumentParser(description="번호판 검출 + OCR")
    parser.add_argument("--image", type=str, help="단일 이미지 경로")
    parser.add_argument("--folder", type=str, help="이미지 폴더 경로")
    parser.add_argument("--camera", action="store_true", help="웹캠 실시간")
    parser.add_argument("--model", type=str, default=str(MODEL_PATH), help="YOLO 모델 경로")
    parser.add_argument("--no-show", action="store_true", help="결과 이미지 표시 안 함")
    args = parser.parse_args()

    # 모델 로드
    model_path = Path(args.model)
    if not model_path.exists():
        print(f"모델 파일을 찾을 수 없습니다: {model_path}")
        return

    print(f"YOLO 모델 로드: {model_path}")
    detector = YOLO(str(model_path))

    # OCR 리더 초기화
    reader = init_ocr()

    # 실행
    if args.camera:
        process_camera(detector, reader)
    elif args.image:
        process_image(args.image, detector, reader, show=not args.no_show)
    elif args.folder:
        process_folder(args.folder, detector, reader, show=not args.no_show)
    else:
        # 기본: test_images 폴더
        test_dir = Path("test_images")
        if test_dir.exists() and any(test_dir.iterdir()):
            process_folder(test_dir, detector, reader, show=False)
        else:
            print("\n사용법:")
            print("  python detect_and_read.py --image car.jpg")
            print("  python detect_and_read.py --folder test_images")
            print("  python detect_and_read.py --camera")

if __name__ == "__main__":
    main()
