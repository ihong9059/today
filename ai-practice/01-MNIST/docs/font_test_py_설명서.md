# font_test.py 상세 설명서

PC에 설치된 폰트로 숫자를 생성하고, 학습된 MNIST 모델로 인식하는 스크립트입니다.
"실제 환경에서 모델이 얼마나 잘 동작하는가?"를 테스트합니다.

---

## 왜 폰트 테스트를 하나요?

```
MNIST 테스트 정확도: 99%
    ↓
"실제로도 잘 될까?"
    ↓
PC 폰트로 테스트해보자!
```

### MNIST vs 실제 환경

| 항목 | MNIST | 실제 환경 |
|------|-------|----------|
| 스타일 | 손글씨 | 다양한 폰트 |
| 크기 | 고정 (28x28) | 다양함 |
| 배경 | 검정 | 흰색/다양 |
| 위치 | 중앙 정렬 | 불규칙 |

---

## 전체 흐름

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 1. 모델     │ ──▶ │ 2. 폰트     │ ──▶ │ 3. 이미지   │
│    로드     │     │    선택     │     │    생성     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
       ┌───────────────────────────────────────┘
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ 4. 전처리   │ ──▶ │ 5. 예측     │ ──▶ │ 6. 결과     │
│  (28x28로)  │     │             │     │    시각화   │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 1. 모델 로드

```python
# CNN 모델 구조 정의 (train.py와 동일해야 함!)
class CNN(nn.Module):
    ...

# 저장된 가중치 로드
model = CNN()
checkpoint = torch.load('baseline_cnn.pt', map_location=device)
model.load_state_dict(checkpoint['model_state_dict'])
model.eval()  # 평가 모드
```

### 주의사항

```
모델 구조가 학습 시와 정확히 같아야 합니다!

train.py의 CNN:
  conv1: 1 → 32
  conv2: 32 → 64
  fc1: 3136 → 128
  fc2: 128 → 10

font_test.py의 CNN: (동일해야 함)
  conv1: 1 → 32
  conv2: 32 → 64
  fc1: 3136 → 128
  fc2: 128 → 10
```

---

## 2. 폰트로 숫자 이미지 생성

```python
def create_digit_image(digit, font_path, size=28):
    # 100x100 캔버스 (큰 해상도로 시작)
    canvas_size = 100
    img = Image.new('L', (canvas_size, canvas_size), color=255)  # 흰 배경

    # 폰트 로드
    font = ImageFont.truetype(font_path, 70)  # 70pt 크기

    # 숫자를 캔버스 중앙에 그리기
    draw = ImageDraw.Draw(img)
    draw.text((x, y), str(digit), fill=0, font=font)  # 검은 글씨

    # 28x28로 리사이즈
    img = img.resize((28, 28), Image.Resampling.LANCZOS)

    return img
```

### 과정 시각화

```
1. 빈 캔버스 (100x100, 흰색)    2. 숫자 그리기 (검은색)
┌────────────────────┐          ┌────────────────────┐
│                    │          │                    │
│                    │          │       ███          │
│                    │   →      │      █             │
│                    │          │       ██           │
│                    │          │         █          │
│                    │          │       ███          │
└────────────────────┘          └────────────────────┘

3. 28x28로 축소
┌────────┐
│   ██   │
│  █     │
│   █    │
│    █   │
│  ███   │
└────────┘
```

---

## 3. 전처리 (핵심!)

학습 때와 **똑같은 전처리**를 해야 합니다.

```python
def preprocess_image(img):
    img_array = np.array(img, dtype=np.float32)

    # [1] 색상 반전
    img_array = 255 - img_array

    # [2] 0~1 정규화
    img_array = img_array / 255.0

    # [3] MNIST 정규화
    img_array = (img_array - 0.1307) / 0.3081

    # [4] 텐서 변환
    tensor = torch.tensor(img_array).unsqueeze(0).unsqueeze(0)

    return tensor
```

### [1] 색상 반전 - 왜 필요한가?

```
MNIST 원본:          폰트 이미지:
검은 배경 + 흰 숫자   흰 배경 + 검은 숫자
┌────────┐           ┌────────┐
│████████│           │        │
│██  ██ │           │  ██   │
│██ █ ██│     ≠     │ █ █   │
│██  ██ │           │  ██   │
│████████│           │        │
└────────┘           └────────┘

반전 후:
흰 배경 → 검은 배경
검은 숫자 → 흰 숫자
→ MNIST와 동일해짐!
```

### [2] 0~1 정규화

```
픽셀값 0~255 → 0~1

255 - img = 반전된 이미지
(255 - img) / 255 = 0~1 범위
```

### [3] MNIST 정규화

```
학습할 때 사용한 값:
  평균: 0.1307
  표준편차: 0.3081

(값 - 0.1307) / 0.3081

→ 학습 데이터와 동일한 분포로 변환
→ 이것을 안 하면 성능 저하!
```

### [4] 텐서 변환

```
(28, 28) NumPy 배열
    ↓ unsqueeze(0)
(1, 28, 28) - 채널 추가
    ↓ unsqueeze(0)
(1, 1, 28, 28) - 배치 추가

모델 입력 형태: (배치, 채널, 높이, 너비)
```

---

## 4. 예측

```python
def predict_digit(model, device, tensor):
    model.eval()

    with torch.no_grad():
        output = model(tensor)           # 모델 통과
        probs = F.softmax(output, dim=1) # 확률로 변환
        pred = output.argmax(dim=1)      # 가장 높은 점수
        confidence = probs[0, pred]      # 해당 확률

    return pred, confidence, probs
```

### 출력 해석

```
모델 출력 (raw scores):
[1.2, -0.5, 0.3, 8.7, 0.1, -1.2, 0.0, 2.1, -0.3, 0.5]
  0     1    2    3    4     5    6    7     8    9

softmax 적용 (확률로 변환):
[0.02, 0.01, 0.01, 0.89, 0.01, 0.00, 0.01, 0.04, 0.01, 0.01]
                    ↑
                  89% 확률로 숫자 3 예측

argmax: 가장 높은 값의 인덱스 → 3
confidence: 해당 확률 → 0.89 (89%)
```

### Softmax 함수

```
입력:  [1, 2, 3]
       ↓ e^x
       [2.7, 7.4, 20.1]
       ↓ 합으로 나누기 (30.2)
출력:  [0.09, 0.24, 0.67]

특징:
- 모든 값이 0~1 사이
- 합이 1 (100%)
- 큰 값일수록 더 큰 확률
```

---

## 5. 폰트별 테스트

```python
# 테스트할 폰트 목록
TEST_FONTS = [
    ('Arial', 'C:/Windows/Fonts/arial.ttf'),
    ('Times New Roman', 'C:/Windows/Fonts/times.ttf'),
    ('Courier New', 'C:/Windows/Fonts/cour.ttf'),
    ...
]

for font_name, font_path in TEST_FONTS:
    for digit in range(10):  # 0~9
        # 이미지 생성
        img = create_digit_image(digit, font_path)

        # 전처리
        tensor = preprocess_image(img)

        # 예측
        pred, conf = predict_digit(model, device, tensor)

        # 결과 기록
        is_correct = (pred == digit)
```

### 결과 예시

```
폰트별 정확도:
  Arial                ██████████ 100% (10/10)
  Times New Roman      ████████░░  80% (8/10)
  Courier New          ██████░░░░  60% (6/10)
  Comic Sans MS        ████░░░░░░  40% (4/10)

평균 정확도: 70%
```

---

## 6. 결과 시각화

```python
# 여러 폰트 결과를 격자로 표시
fig, axes = plt.subplots(num_fonts, 10)

for row, font in enumerate(fonts):
    for col, digit in enumerate(10):
        ax = axes[row, col]
        ax.imshow(image, cmap='gray')
        ax.set_title(f'Pred: {pred}')
```

### 출력 예시

```
         0    1    2    3    4    5    6    7    8    9
Arial   [0]  [1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]
         ✓    ✓    ✓    ✓    ✓    ✓    ✓    ✓    ✓    ✓

Times   [0]  [1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]
         ✓    ✓    ✗    ✓    ✓    ✓    ✓    ✗    ✓    ✓

Courier [0]  [1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]
         ✓    ✓    ✗    ✓    ✗    ✗    ✓    ✗    ✓    ✓
```

---

## 왜 폰트마다 결과가 다른가?

### 1. 스타일 차이

```
MNIST 손글씨:        Arial:          Courier:
 둥글고 불규칙       깔끔하고 정교     고정폭, 각진
    ┌───┐            ┌───┐            ┌───┐
    │ ╭╮│            │ ─ │            │ ▄ │
    │ ╰╯│            │ ▐ │            │ █ │
    │   │            │ ▐ │            │ █ │
    └───┘            └───┘            └───┘
```

### 2. 획 굵기 차이

```
손글씨: 불규칙한 굵기
폰트:   일정한 굵기

모델은 손글씨의 불규칙한 패턴을 학습함
→ 너무 깔끔한 폰트는 인식률 저하
```

### 3. 숫자별 차이

```
잘 인식됨:     인식 어려움:
  1, 7         3, 5, 8

이유:
- 1, 7: 단순한 형태, 혼동 적음
- 3, 5, 8: 비슷한 곡선, 혼동 많음

3 vs 8: 위아래 곡선이 비슷
5 vs 6: 아래 곡선이 비슷
```

---

## 전처리의 중요성

### 전처리를 안 하면?

```python
# 잘못된 전처리 (반전 안 함)
img_array = np.array(img) / 255.0
# → 흰 배경 + 검은 숫자 그대로

결과: 정확도 10% 미만 (거의 랜덤)
```

### 정규화를 안 하면?

```python
# 잘못된 전처리 (MNIST 정규화 안 함)
img_array = img_array / 255.0
# → 0~1 범위이지만, 분포가 다름

결과: 정확도 50~70% (성능 저하)
```

### 올바른 전처리

```python
# 올바른 전처리
img_array = 255 - img_array           # 반전
img_array = img_array / 255.0         # 0~1
img_array = (img_array - 0.1307) / 0.3081  # MNIST 정규화

결과: 정확도 90~100%
```

---

## 실행 방법

### 1. 모델 준비

```bash
# Colab에서 학습한 모델 다운로드
# 또는 로컬에서 train.py 실행
python train.py
```

### 2. 폰트 테스트 실행

```bash
cd experiments/exp00_baseline
python font_test.py
```

### 3. 결과 확인

```
results/
├── font_test_results.png   # 시각화 이미지
└── font_test_results.json  # 상세 결과
```

---

## 결과 해석

### 높은 정확도 (90%+)

```
모델이 실제 환경에서도 잘 동작함
→ 배포 가능
```

### 중간 정확도 (70~90%)

```
일부 폰트/숫자에서 오류
→ 추가 학습 또는 전처리 개선 필요
```

### 낮은 정확도 (70% 미만)

```
실제 환경 적용 어려움
→ 데이터 증강, 더 큰 모델, 전처리 검토 필요
```

---

## 개선 방법

### 1. 데이터 증강

```python
# 학습 시 다양한 변형 추가
transform = transforms.Compose([
    transforms.RandomRotation(10),     # 회전
    transforms.RandomAffine(0, translate=(0.1, 0.1)),  # 이동
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])
```

### 2. 폰트 데이터 추가

```python
# 폰트로 생성한 이미지를 학습 데이터에 추가
# → 폰트 스타일도 학습
```

### 3. 전처리 개선

```python
# 더 정교한 중앙 정렬
# 노이즈 제거
# 이진화 (threshold)
```

---

## 요약

```
폰트 테스트 = 실제 환경 시뮬레이션

과정:
1. 학습된 모델 로드
2. PC 폰트로 숫자 이미지 생성
3. MNIST와 동일하게 전처리 (핵심!)
   - 색상 반전 (흰→검)
   - 0~1 정규화
   - MNIST 평균/표준편차 정규화
4. 모델로 예측
5. 결과 분석

핵심 포인트:
- 전처리가 학습 때와 동일해야 함
- 폰트마다 결과가 다를 수 있음
- 실제 배포 전 필수 테스트
```
