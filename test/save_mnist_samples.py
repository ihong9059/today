"""
MNIST 테스트셋에서 0~9 각 숫자 1개씩 추출하여 저장
"""

import torch
from torchvision import datasets, transforms
from PIL import Image
import os
import numpy as np

def main():
    # my_handwriting 폴더 생성
    save_dir = "C:/todo/today/test/my_handwriting"
    os.makedirs(save_dir, exist_ok=True)

    # 기존 파일 정리 (digit_로 시작하는 파일 삭제)
    for f in os.listdir(save_dir):
        if f.startswith("digit_") or f.startswith("mnist_"):
            os.remove(os.path.join(save_dir, f))
            print(f"삭제: {f}")

    # MNIST 테스트셋 로드 (정규화 없이 원본 이미지)
    transform = transforms.ToTensor()
    test_dataset = datasets.MNIST(root='./data', train=False, download=True, transform=transform)

    print("\nMNIST 테스트셋에서 샘플 추출 중...")
    print(f"테스트셋 크기: {len(test_dataset)}개\n")

    # 각 숫자별로 1개씩 찾기
    found = {}

    for idx, (image, label) in enumerate(test_dataset):
        if label not in found:
            found[label] = (idx, image)

            # 텐서를 PIL 이미지로 변환
            img_array = (image.squeeze().numpy() * 255).astype(np.uint8)
            img = Image.fromarray(img_array, mode='L')

            # 저장
            path = f"{save_dir}/mnist_{label}.png"
            img.save(path)
            print(f"저장: mnist_{label}.png (테스트셋 인덱스: {idx})")

            # 0~9 모두 찾으면 종료
            if len(found) == 10:
                break

    print(f"\n완료! {len(found)}개의 MNIST 테스트 이미지가 저장되었습니다.")
    print(f"위치: {save_dir}")

    # 각 이미지 ASCII 미리보기
    print("\n" + "=" * 50)
    print("저장된 이미지 미리보기:")
    print("=" * 50)

    for digit in range(10):
        path = f"{save_dir}/mnist_{digit}.png"
        img = Image.open(path)
        img_array = np.array(img)

        chars = " .:-=+*#%@"
        print(f"\n숫자 {digit}:")
        print("  +" + "-" * 28 + "+")
        for row in img_array:
            line = "  |"
            for pixel in row:
                idx = int(pixel / 255 * (len(chars) - 1))
                line += chars[idx]
            line += "|"
            print(line)
        print("  +" + "-" * 28 + "+")


if __name__ == "__main__":
    main()
