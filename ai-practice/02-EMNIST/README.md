# 02-EMNIST: 영문자 + 숫자 인식

EMNIST (Extended MNIST) 데이터셋을 사용한 영문자 및 숫자 인식 프로젝트입니다.

---

## EMNIST란?

MNIST의 확장 버전으로, 손글씨 숫자뿐만 아니라 **영문 알파벳**도 포함합니다.

### 데이터셋 종류

| Split | 클래스 수 | 설명 |
|-------|----------|------|
| **ByClass** | 62 | 0-9, A-Z, a-z (대소문자 구분) |
| **ByMerge** | 47 | 혼동되는 대소문자 병합 (C/c, O/o 등) |
| **Balanced** | 47 | 클래스별 균형 맞춤 |
| **Letters** | 26 | A-Z만 (대문자만) |
| **Digits** | 10 | 0-9만 (= MNIST) |

### 우리가 사용할 것: **ByMerge (47 클래스)**

```
숫자: 0-9 (10개)
대문자: A-Z (26개)
소문자: b, d, e, f, g, h, n, q, r, t (11개)
* 대소문자가 비슷한 것은 대문자로 병합
```

---

## 프로젝트 구조

```
02-EMNIST/
├── README.md               # 이 파일
├── experiments/
│   └── exp00_baseline/     # 기본 실험
│       ├── train.py        # 학습 스크립트
│       ├── test.py         # 테스트 스크립트
│       └── font_test.py    # PC 폰트 테스트
├── notebooks/
│   └── EMNIST_Colab.ipynb  # Colab 노트북
├── models/                 # 저장된 모델
├── results/                # 결과 이미지/JSON
├── docs/                   # 설명 문서
└── my_chars/               # 테스트용 손글씨 이미지
```

---

## MNIST vs EMNIST 비교

| 항목 | MNIST | EMNIST (ByMerge) |
|------|-------|------------------|
| 클래스 수 | 10 | 47 |
| 학습 데이터 | 60,000장 | 697,932장 |
| 테스트 데이터 | 10,000장 | 116,323장 |
| 이미지 크기 | 28x28 | 28x28 |
| 인식 대상 | 숫자만 | 숫자 + 영문자 |

---

## 모델 구조 변경점

### MNIST (10 클래스)
```python
self.fc2 = nn.Linear(128, 10)  # 출력: 10개
```

### EMNIST (47 클래스)
```python
self.fc2 = nn.Linear(128, 47)  # 출력: 47개
```

나머지 구조는 동일합니다!

---

## 클래스 매핑

EMNIST는 숫자로 라벨이 되어 있어서 매핑이 필요합니다:

```python
# ByMerge 매핑 (47 클래스)
EMNIST_LABELS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  # 0-9
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',  # 10-19
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',  # 20-29
    'U', 'V', 'W', 'X', 'Y', 'Z',                      # 30-35
    'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't'  # 36-46
]
```

---

## 실행 방법

### 1. Colab에서 학습

```
notebooks/EMNIST_Colab.ipynb 열기
→ 런타임 > 런타임 유형 변경 > GPU
→ 전체 실행 (Ctrl+F9)
```

### 2. 로컬에서 학습

```bash
cd experiments/exp00_baseline
python train.py
```

### 3. 폰트 테스트

```bash
python font_test.py
```

### 4. 손글씨 테스트

```bash
# my_chars/ 폴더에 이미지 넣고
python test.py
```

---

## 예상 성능

| 모델 | MNIST 정확도 | EMNIST 정확도 |
|------|:-----------:|:------------:|
| CNN Baseline | ~99.5% | ~87-90% |
| 개선된 CNN | ~99.7% | ~90-92% |

EMNIST가 더 어려운 이유:
- 클래스 수가 4.7배 많음 (10 → 47)
- 비슷한 문자 혼동 (O/0, I/1, S/5 등)
- 손글씨 변형이 더 다양함

---

## 혼동되기 쉬운 문자들

```
숫자-문자 혼동:
  0 ↔ O (영)
  1 ↔ I (아이), l (엘)
  5 ↔ S
  8 ↔ B

대소문자 혼동:
  C ↔ c
  K ↔ k
  O ↔ o
  P ↔ p
  S ↔ s
  U ↔ u
  V ↔ v
  W ↔ w
  X ↔ x
  Z ↔ z

→ ByMerge에서는 이들을 같은 클래스로 처리!
```

---

## 다음 단계

1. **exp00_baseline**: 기본 CNN 모델
2. **exp01_deeper**: 더 깊은 CNN
3. **exp02_augmentation**: 데이터 증강
4. **exp03_attention**: 어텐션 메커니즘

---

## 참고 자료

- [EMNIST 논문](https://arxiv.org/abs/1702.05373)
- [PyTorch EMNIST 문서](https://pytorch.org/vision/stable/generated/torchvision.datasets.EMNIST.html)
- [EMNIST 벤치마크](https://paperswithcode.com/dataset/emnist)
