# Lesson 5-7: 전이 학습 (Transfer Learning) - YouTube 메타데이터

## 제목
[AI 강의] 5-7. 전이 학습 - Pre-trained 모델과 Fine-tuning | PyTorch Transfer Learning

## 설명
전이 학습(Transfer Learning)을 배워봅니다. ImageNet으로 학습된 Pre-trained 모델의 지식을 활용하여 적은 데이터로도 높은 성능을 달성하는 방법을 알아봅니다.

📚 이번 강의 내용:
- 전이 학습의 개념과 필요성
- Feature Extraction vs Fine-tuning 비교
- Pre-trained 모델 불러오기 (ResNet, VGG, EfficientNet)
- Feature Extraction 구현 방법
- Fine-tuning 구현 및 레이어별 학습률
- 꽃 분류 실험 결과 비교
- 실무 활용 팁

🔧 핵심 코드:
- models.resnet18(weights='IMAGENET1K_V1')
- model.fc = nn.Linear(512, num_classes)
- param.requires_grad = False (동결)
- 레이어별 다른 학습률 설정

💡 핵심 포인트:
- 처음부터 학습: 50~60% 정확도
- Feature Extraction: 85%+ 정확도
- Fine-tuning: 90%+ 정확도

🔗 관련 링크:
- PyTorch 공식 문서: https://pytorch.org/vision/stable/models.html
- Hugging Face: https://huggingface.co/models

#AI #딥러닝 #PyTorch #TransferLearning #전이학습 #PretrainedModel #ResNet #FineTuning #머신러닝 #인공지능 #파이토치강의

## 태그
AI, 딥러닝, PyTorch, Transfer Learning, 전이학습, Pre-trained Model, ResNet, VGG, EfficientNet, Fine-tuning, Feature Extraction, ImageNet, 머신러닝, 인공지능, 파이토치, CNN, 이미지분류, 컴퓨터비전

## 카테고리
교육 > 과학 기술

## 재생목록
AI 기초 교육 - Level 5: CNN & 이미지 처리
