# Lesson 4-2: 이미지 분류 CNN

## 제목
[AI 기초] Lesson 4-2: 이미지 분류 CNN | 합성곱 신경망으로 CIFAR-10 분류하기 | Level 4

## 설명
Level 4 "PyTorch 실전"의 두 번째 강의입니다!

지난 시간에 배운 MNIST 분류를 넘어서, 이번에는 CNN(합성곱 신경망)으로 실제 컬러 이미지를 분류합니다.
CIFAR-10 데이터셋으로 비행기, 자동차, 고양이 등 10가지 물체를 인식하는 모델을 만들어봅니다.

---

📚 이번 강의 내용:
0:00 인트로 - CNN 소개 및 CIFAR-10
0:33 왜 CNN이 필요한가? (MLP의 한계)
1:12 합성곱 연산 (Convolution) 시각화
1:46 풀링 층 (MaxPool2d) 이해
2:16 PyTorch CNN 구현 코드
2:51 학습 실행 및 정확도 확인
3:21 요약 및 다음 강의 예고

---

📊 핵심 학습 내용:
✅ CNN이 이미지에 필요한 이유 (가중치 공유, 공간 정보 보존)
✅ Conv2d: 합성곱 층으로 특징 추출
✅ MaxPool2d: 크기 축소 및 위치 불변성
✅ CIFAR-10: 32×32×3 컬러 이미지, 10개 클래스
✅ CNN 구조: Conv → ReLU → Pool 반복 → FC → 분류

---

🔥 핵심 코드:

```python
class CIFAR10CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(32 * 8 * 8, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # 32→16
        x = self.pool(F.relu(self.conv2(x)))  # 16→8
        x = x.view(-1, 32 * 8 * 8)  # Flatten
        x = F.relu(self.fc1(x))
        return self.fc2(x)
```

---

📖 더 자세한 학습 자료:
웹사이트에서 코드 예제와 실습 자료를 확인하세요!

#AI #인공지능 #딥러닝 #PyTorch #CNN #합성곱신경망 #CIFAR10 #이미지분류 #머신러닝 #파이썬 #Python #신경망 #DeepLearning #MachineLearning #Conv2d #MaxPool2d

## 태그
AI, 인공지능, 딥러닝, PyTorch, 파이토치, CNN, 합성곱 신경망, CIFAR-10, 이미지 분류, 머신러닝, 파이썬, Python, Conv2d, MaxPool2d, 합성곱, 풀링, Deep Learning, Machine Learning

## 카테고리
교육

## 언어
한국어

## 영상 길이
약 3분 55초 (7043 프레임 @ 30fps)

## 재생목록
AI 기초 교육 시리즈 - Level 4: PyTorch 실전
