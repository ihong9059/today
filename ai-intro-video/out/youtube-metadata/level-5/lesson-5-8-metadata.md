# Lesson 5-8: 데이터 증강 (Data Augmentation) - YouTube 메타데이터

## 제목
[AI 강의] 5-8. 데이터 증강 - Flip, Crop, ColorJitter, CutMix | PyTorch Data Augmentation

## 설명
데이터 증강(Data Augmentation) 기법을 배워봅니다. 원본 이미지를 다양하게 변환하여 학습 데이터를 늘리고 과적합을 방지하는 방법을 알아봅니다.

📚 이번 강의 내용:
- 데이터 증강의 필요성과 효과
- 기하학적 변환: Flip, Rotation, Crop, Affine
- 색상 변환: ColorJitter, Grayscale, GaussianBlur
- 실전 변환 파이프라인 구성 (Compose)
- 고급 기법: Cutout, Mixup, CutMix
- AutoAugment와 RandAugment
- albumentations 라이브러리

🔧 핵심 코드:
- transforms.RandomHorizontalFlip(p=0.5)
- transforms.RandomCrop(32, padding=4)
- transforms.ColorJitter(brightness=0.2, contrast=0.2)
- transforms.RandomErasing() (Cutout)
- Compose()로 파이프라인 구성

💡 실전 팁:
- 테스트 데이터에는 증강 적용 X
- 데이터셋에 맞는 변환 선택
- 너무 강한 증강은 오히려 해로움
- Train과 Test transform 분리

🔗 추천 라이브러리:
- torchvision.transforms: 기본 제공
- albumentations: 더 다양하고 빠른 증강

#AI #딥러닝 #PyTorch #DataAugmentation #데이터증강 #CutMix #Mixup #ColorJitter #머신러닝 #인공지능 #파이토치강의

## 태그
AI, 딥러닝, PyTorch, Data Augmentation, 데이터증강, Flip, Rotation, Crop, ColorJitter, Cutout, Mixup, CutMix, RandAugment, transforms, albumentations, 머신러닝, 인공지능, 파이토치, CNN, 이미지처리

## 카테고리
교육 > 과학 기술

## 재생목록
AI 기초 교육 - Level 5: CNN & 이미지 처리
