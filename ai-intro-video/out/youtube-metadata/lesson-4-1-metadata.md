# Lesson 4-1: MNIST 손글씨 분류

## 제목
[AI 기초] Lesson 4-1: MNIST 손글씨 분류 | 딥러닝의 Hello World | Level 4

## 설명
Level 4 "PyTorch 실전"의 첫 번째 강의입니다!

딥러닝의 "Hello World"라 불리는 MNIST 손글씨 분류 문제를 PyTorch로 처음부터 끝까지 구현합니다.
7만 장의 손글씨 이미지를 학습하여 98% 정확도를 달성하는 과정을 함께 배워봅니다.

---

📚 이번 강의 내용:
0:00 인트로 - MNIST 소개
0:30 MNIST 데이터 구조 (28x28 픽셀)
0:59 신경망 구조 설계 (784→128→64→10)
1:35 PyTorch 코드 구현 (nn.Module)
2:07 학습 설정 (손실함수, 옵티마이저)
2:38 학습 루프 실행 및 정확도 확인
3:09 요약 및 다음 강의 예고

---

📊 핵심 학습 내용:
✅ MNIST: 7만 장의 손글씨 숫자 이미지 (0-9)
✅ 28x28 픽셀 → 784개 입력 뉴런으로 Flatten
✅ nn.Linear로 완전연결층 정의
✅ ReLU 활성화 함수로 비선형성 추가
✅ CrossEntropyLoss + Adam 옵티마이저
✅ 10 에폭 학습 → 98% 테스트 정확도!

---

🔥 핵심 코드:

```python
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        x = x.view(-1, 784)  # Flatten
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        return self.fc3(x)
```

---

📖 더 자세한 학습 자료:
웹사이트에서 코드 예제와 실습 자료를 확인하세요!

#AI #인공지능 #딥러닝 #PyTorch #MNIST #손글씨인식 #머신러닝 #파이썬 #Python #신경망 #DeepLearning #MachineLearning #이미지분류 #파이토치

## 태그
AI, 인공지능, 딥러닝, PyTorch, 파이토치, MNIST, 손글씨 인식, 머신러닝, 파이썬, Python, 신경망, Deep Learning, Machine Learning, 이미지 분류, CrossEntropyLoss, Adam, nn.Module, DataLoader

## 카테고리
교육

## 언어
한국어

## 영상 길이
약 3분 40초 (6579 프레임 @ 30fps)

## 재생목록
AI 기초 교육 시리즈 - Level 4: PyTorch 실전
