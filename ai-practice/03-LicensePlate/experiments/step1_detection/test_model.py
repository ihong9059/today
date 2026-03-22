"""
번호판 검출 모델 테스트 스크립트

사용법:
    python test_model.py                    # test_images/ 폴더 전체 테스트
    python test_model.py --image car.jpg    # 단일 이미지 테스트
    python test_model.py --camera           # 웹캠 실시간 테스트
"""

import os
import argparse
from pathlib import Path

# Ultralytics 설치 확인
try:
    from ultralytics import YOLO
except ImportError:
    print("ultralytics 패키지를 설치하세요:")
    print("  pip install ultralytics")
    exit(1)

# 경로 설정
MODEL_PATH = Path("models/plate_detector.pt")
TEST_DIR = Path("test_images")
OUTPUT_DIR = Path("results")

def test_single_image(model, image_path, show=True, save=True):
    """단일 이미지 테스트"""
    print(f"\n테스트: {image_path}")

    results = model(str(image_path))

    # 결과 출력
    for r in results:
        boxes = r.boxes
        print(f"  검출된 번호판: {len(boxes)}개")

        for i, box in enumerate(boxes):
            conf = box.conf[0].item()
            xyxy = box.xyxy[0].tolist()
            print(f"    [{i+1}] 신뢰도: {conf:.2%}, 위치: {xyxy}")

    # 결과 이미지 표시
    if show:
        import cv2
        result_img = results[0].plot()
        cv2.imshow("Detection Result", result_img)
        print("  (아무 키나 누르면 다음으로 진행)")
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    # 결과 이미지 저장
    if save:
        OUTPUT_DIR.mkdir(exist_ok=True)
        output_path = OUTPUT_DIR / f"result_{image_path.name}"
        result_img = results[0].plot()
        import cv2
        cv2.imwrite(str(output_path), result_img)
        print(f"  저장됨: {output_path}")

    return results

def test_folder(model, folder_path, show=False):
    """폴더 내 모든 이미지 테스트"""
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp'}
    images = [f for f in folder_path.iterdir()
              if f.suffix.lower() in image_extensions]

    if not images:
        print(f"'{folder_path}' 폴더에 이미지가 없습니다.")
        return

    print(f"\n총 {len(images)}개 이미지 테스트")
    print("=" * 50)

    total_plates = 0
    for img_path in images:
        results = test_single_image(model, img_path, show=show, save=True)
        total_plates += len(results[0].boxes)

    print("=" * 50)
    print(f"완료! 총 {total_plates}개 번호판 검출")
    print(f"결과 저장: {OUTPUT_DIR.absolute()}")

def test_camera(model):
    """웹캠 실시간 테스트"""
    import cv2

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("웹캠을 열 수 없습니다.")
        return

    print("웹캠 테스트 시작 (종료: 'q' 키)")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 검출
        results = model(frame, verbose=False)

        # 결과 표시
        result_frame = results[0].plot()

        # 검출 개수 표시
        num_plates = len(results[0].boxes)
        cv2.putText(result_frame, f"Plates: {num_plates}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("License Plate Detection (Press 'q' to quit)", result_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    print("웹캠 테스트 종료")

def main():
    parser = argparse.ArgumentParser(description="번호판 검출 테스트")
    parser.add_argument("--image", type=str, help="단일 이미지 경로")
    parser.add_argument("--folder", type=str, help="이미지 폴더 경로")
    parser.add_argument("--camera", action="store_true", help="웹캠 테스트")
    parser.add_argument("--model", type=str, default=str(MODEL_PATH),
                        help="모델 경로")
    parser.add_argument("--show", action="store_true", help="결과 이미지 표시")
    args = parser.parse_args()

    # 모델 로드
    model_path = Path(args.model)
    if not model_path.exists():
        print(f"모델 파일을 찾을 수 없습니다: {model_path}")
        print("\n다음 위치에 모델을 배치하세요:")
        print(f"  {MODEL_PATH.absolute()}")
        print("\n또는 --model 옵션으로 경로 지정:")
        print(f"  python test_model.py --model C:\\path\\to\\best.pt")
        return

    print(f"모델 로드: {model_path}")
    model = YOLO(str(model_path))
    print("모델 로드 완료!")

    # 테스트 실행
    if args.camera:
        test_camera(model)
    elif args.image:
        test_single_image(model, Path(args.image))
    elif args.folder:
        test_folder(model, Path(args.folder), show=args.show)
    else:
        # 기본: test_images 폴더 테스트
        if TEST_DIR.exists() and any(TEST_DIR.iterdir()):
            test_folder(model, TEST_DIR, show=args.show)
        else:
            print(f"\n'{TEST_DIR}' 폴더가 없거나 비어있습니다.")
            print("\n사용법:")
            print("  python test_model.py --image car.jpg      # 단일 이미지")
            print("  python test_model.py --folder my_images   # 폴더 전체")
            print("  python test_model.py --camera             # 웹캠")
            print("\n또는 test_images 폴더를 만들고 이미지를 넣으세요:")
            print(f"  mkdir {TEST_DIR}")
            print(f"  # {TEST_DIR}에 자동차 이미지 복사")
            print(f"  python test_model.py")

if __name__ == "__main__":
    main()
