# Google Colab 사용 가이드

## 목차
1. [Google Colab 소개](#1-google-colab-소개)
2. [시작하기](#2-시작하기)
3. [노트북 인터페이스](#3-노트북-인터페이스)
4. [셀 사용법](#4-셀-사용법)
5. [런타임 관리](#5-런타임-관리)
6. [파일 관리](#6-파일-관리)
7. [라이브러리 설치 및 관리](#7-라이브러리-설치-및-관리)
8. [GPU/TPU 사용](#8-gputpu-사용)
9. [Google Drive 연동](#9-google-drive-연동)
10. [데이터 입출력](#10-데이터-입출력)
11. [유용한 기능](#11-유용한-기능)
12. [단축키 모음](#12-단축키-모음)
13. [요금제 비교](#13-요금제-비교)
14. [제한 사항 및 주의 사항](#14-제한-사항-및-주의-사항)
15. [실전 팁](#15-실전-팁)

---

## 1. Google Colab 소개

### Google Colab이란?
Google Colaboratory(줄여서 Colab)는 Google에서 제공하는 **클라우드 기반 Jupyter Notebook 환경**이다. 브라우저에서 Python 코드를 작성하고 실행할 수 있으며, GPU/TPU를 무료로 사용할 수 있다.

### 주요 특징
- **무료 GPU/TPU 제공**: NVIDIA T4, A100 등 고성능 GPU 사용 가능
- **설치 불필요**: 브라우저만 있으면 바로 사용
- **Google Drive 연동**: 파일 저장/불러오기가 간편
- **공유 및 협업**: Google Docs처럼 실시간 공유 가능
- **사전 설치된 라이브러리**: TensorFlow, PyTorch, scikit-learn 등 주요 ML 라이브러리 기본 제공

### 접속 주소
```
https://colab.research.google.com
```

---

## 2. 시작하기

### 2.1 새 노트북 만들기

1. [colab.research.google.com](https://colab.research.google.com) 접속
2. Google 계정으로 로그인
3. **파일 → 새 노트북** 또는 팝업 창에서 **새 노트북** 클릭

### 2.2 기존 노트북 열기

| 방법 | 설명 |
|------|------|
| Google Drive | Drive에 저장된 .ipynb 파일 더블클릭 |
| GitHub | **파일 → 노트북 열기 → GitHub** 탭에서 URL 입력 |
| 업로드 | **파일 → 노트북 열기 → 업로드** 탭에서 .ipynb 파일 업로드 |
| URL | GitHub의 ipynb URL에서 `github.com`을 `colab.research.google.com/github`로 변경 |

### 2.3 노트북 저장

- **Ctrl + S**: Google Drive에 저장 (기본 위치: `내 드라이브/Colab Notebooks/`)
- **파일 → 사본 저장**: 사본을 Drive에 저장
- **파일 → .ipynb 다운로드**: 로컬에 파일 다운로드
- **파일 → .py 다운로드**: Python 스크립트로 다운로드
- **파일 → GitHub에 사본 저장**: GitHub 저장소에 직접 저장

---

## 3. 노트북 인터페이스

### 3.1 주요 구성 요소

```
┌─────────────────────────────────────────────────┐
│  메뉴바 (파일/수정/보기/삽입/런타임/도구/도움말)    │
├─────────────────────────────────────────────────┤
│  도구 모음 (+ 코드 / + 텍스트 / 셀 이동 등)       │
├──────────┬──────────────────────────────────────┤
│          │                                      │
│  목차     │   셀 영역                             │
│  패널     │   ┌──────────────────────────────┐   │
│          │   │ 코드 셀 또는 텍스트 셀          │   │
│  파일     │   └──────────────────────────────┘   │
│  탐색기   │   ┌──────────────────────────────┐   │
│          │   │ 출력 영역                      │   │
│          │   └──────────────────────────────┘   │
│          │                                      │
└──────────┴──────────────────────────────────────┘
```

### 3.2 왼쪽 사이드 패널

| 아이콘 | 기능 | 설명 |
|:------:|------|------|
| 목차 | 목차(TOC) | 텍스트 셀의 제목(#)을 기반으로 자동 생성 |
| 검색 | 찾기/바꾸기 | 노트북 내 텍스트 검색 |
| 변수 | 변수 탐색기 | 현재 정의된 변수와 값 확인 |
| 파일 | 파일 탐색기 | 런타임의 파일 시스템 탐색 |
| 비밀 | 보안 비밀 | API 키 등 민감 정보 안전하게 저장 |

---

## 4. 셀 사용법

### 4.1 코드 셀

Python 코드를 작성하고 실행하는 셀이다.

```python
# 코드 셀 예시
import numpy as np

data = np.array([1, 2, 3, 4, 5])
print(f"평균: {data.mean()}")
print(f"표준편차: {data.std():.2f}")
```

**실행 방법:**
- `Shift + Enter`: 셀 실행 후 다음 셀로 이동
- `Ctrl + Enter`: 셀 실행 (현재 셀 유지)
- `Alt + Enter`: 셀 실행 후 아래에 새 셀 추가
- 셀 왼쪽의 ▶ 버튼 클릭

### 4.2 텍스트 셀 (Markdown)

Markdown 문법으로 문서를 작성하는 셀이다.

```markdown
# 제목 1
## 제목 2
### 제목 3

**굵은 글씨**, *기울임*, ~~취소선~~

- 순서 없는 목록
1. 순서 있는 목록

> 인용문

| 열1 | 열2 |
|-----|-----|
| A   | B   |

수식: $E = mc^2$

블록 수식:
$$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
```

### 4.3 셀 조작

| 작업 | 방법 |
|------|------|
| 셀 추가 | 상단의 **+ 코드** 또는 **+ 텍스트** 버튼 |
| 셀 삭제 | 셀 우측 상단 휴지통 아이콘 또는 `Ctrl + M, D` |
| 셀 이동 | 셀 우측 상단 ↑↓ 아이콘으로 위/아래 이동 |
| 셀 복사 | `Ctrl + M, C` |
| 셀 붙여넣기 | `Ctrl + M, V` |
| 셀 유형 변경 | `Ctrl + M, M` (텍스트) / `Ctrl + M, Y` (코드) |

### 4.4 매직 명령어 (Magic Commands)

코드 셀에서 사용할 수 있는 특수 명령어:

```python
# 실행 시간 측정
%time result = sum(range(1000000))

# 여러 번 실행하여 평균 시간 측정
%timeit sum(range(1000000))

# 셀 전체 실행 시간 측정
%%time
data = list(range(1000000))
result = sum(data)

# 환경 변수 확인
%env

# 현재 디렉토리 확인
%pwd

# 작업 디렉토리 변경
%cd /content/drive/MyDrive

# 변수 목록 확인
%who
%whos  # 상세 정보

# matplotlib 인라인 출력 (기본 설정됨)
%matplotlib inline

# 실행 히스토리 확인
%history
```

### 4.5 셸 명령어 실행

코드 셀에서 `!` 접두사로 Linux 셸 명령어를 실행할 수 있다.

```python
# 시스템 정보 확인
!cat /etc/os-release

# 패키지 설치
!pip install transformers

# 파일 목록 확인
!ls -la /content/

# 파일 다운로드
!wget https://example.com/data.csv

# Git 클론
!git clone https://github.com/user/repo.git

# GPU 정보 확인
!nvidia-smi

# 디스크 사용량 확인
!df -h
```

---

## 5. 런타임 관리

### 5.1 런타임이란?
Colab에서 코드를 실행하는 **가상 머신(VM) 인스턴스**이다. 코드 실행, 파일 저장, 라이브러리 설치 등 모든 작업이 이 런타임 위에서 이루어진다.

### 5.2 런타임 유형 변경

**런타임 → 런타임 유형 변경** 메뉴에서 설정:

| 항목 | 옵션 | 설명 |
|------|------|------|
| 하드웨어 가속기 | None | CPU만 사용 |
| | T4 GPU | NVIDIA T4 (무료) |
| | A100 GPU | NVIDIA A100 (유료) |
| | L4 GPU | NVIDIA L4 (유료) |
| | TPU | Google TPU (무료/유료) |

### 5.3 런타임 제어

| 메뉴 | 단축키 | 설명 |
|------|--------|------|
| 런타임 → 모두 실행 | `Ctrl + F9` | 모든 셀 순서대로 실행 |
| 런타임 → 이전 셀 실행 | `Ctrl + F8` | 현재 셀 이전의 모든 셀 실행 |
| 런타임 → 실행 중단 | `Ctrl + M, I` | 현재 실행 중인 셀 중단 |
| 런타임 → 런타임 다시 시작 | `Ctrl + M, .` | 런타임 재시작 (변수/설치 초기화) |
| 런타임 → 런타임 연결 해제 및 삭제 | - | 런타임 완전 종료 |

### 5.4 런타임 수명

- **무료**: 최대 약 12시간 연속 사용 가능, 유휴 시 약 90분 후 자동 연결 해제
- **Pro/Pro+**: 최대 24시간, 유휴 시간 더 길게 유지
- 런타임이 종료되면 **설치한 라이브러리, 업로드한 파일 모두 삭제**됨

---

## 6. 파일 관리

### 6.1 런타임 파일 시스템 구조

```
/
├── content/              ← 기본 작업 디렉토리
│   ├── drive/            ← Google Drive 마운트 위치
│   │   └── MyDrive/      ← 내 드라이브
│   └── sample_data/      ← Colab 기본 샘플 데이터
│       ├── anscombe.json
│       ├── california_housing_train.csv
│       ├── california_housing_test.csv
│       ├── mnist_train_small.csv
│       └── mnist_test.csv
└── ...
```

### 6.2 파일 업로드

**방법 1: 사이드 패널 사용**
- 왼쪽 파일 탐색기 → 업로드 아이콘 클릭 → 파일 선택

**방법 2: 코드로 업로드**
```python
from google.colab import files

# 파일 업로드 (대화상자 표시)
uploaded = files.upload()

# 업로드된 파일 확인
for filename, content in uploaded.items():
    print(f'{filename}: {len(content)} bytes')
```

### 6.3 파일 다운로드

```python
from google.colab import files

# 파일 다운로드
files.download('/content/result.csv')

# DataFrame을 CSV로 저장 후 다운로드
import pandas as pd
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
df.to_csv('output.csv', index=False)
files.download('output.csv')
```

### 6.4 웹에서 파일 다운로드

```python
# wget으로 다운로드
!wget -O data.csv https://example.com/data.csv

# gdown으로 Google Drive 파일 다운로드 (공유 링크)
!gdown https://drive.google.com/uc?id=파일ID

# curl로 다운로드
!curl -L -o model.h5 https://example.com/model.h5
```

---

## 7. 라이브러리 설치 및 관리

### 7.1 pip으로 설치

```python
# 기본 설치
!pip install transformers

# 특정 버전 설치
!pip install tensorflow==2.15.0

# 여러 패키지 동시 설치
!pip install pandas numpy matplotlib seaborn

# requirements.txt로 설치
!pip install -r requirements.txt

# 업그레이드
!pip install --upgrade transformers

# 설치된 패키지 확인
!pip list

# 특정 패키지 정보
!pip show tensorflow
```

### 7.2 apt-get으로 시스템 패키지 설치

```python
# 시스템 패키지 설치 (Ubuntu 기반)
!apt-get update
!apt-get install -y graphviz
!apt-get install -y libgl1-mesa-glx  # OpenCV 의존성
```

### 7.3 conda 설치 및 사용

```python
# Miniconda 설치
!wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
!bash Miniconda3-latest-Linux-x86_64.sh -b -f -p /usr/local
!conda install -y package_name
```

### 7.4 사전 설치된 주요 라이브러리

| 분야 | 라이브러리 |
|------|-----------|
| 머신러닝 | TensorFlow, PyTorch, scikit-learn, XGBoost, LightGBM |
| 데이터 분석 | pandas, numpy, scipy |
| 시각화 | matplotlib, seaborn, plotly |
| NLP | NLTK, transformers (설치 필요) |
| 이미지 | OpenCV, Pillow, torchvision |
| 유틸리티 | tqdm, requests, beautifulsoup4 |

### 7.5 설치 유지 팁

런타임이 재시작되면 설치한 라이브러리가 초기화된다. 해결 방법:

```python
# 방법 1: 노트북 상단에 설치 셀 배치
!pip install -q transformers datasets  # -q: 출력 최소화

# 방법 2: Google Drive에 라이브러리 설치
!pip install --target='/content/drive/MyDrive/my_libs' package_name
import sys
sys.path.insert(0, '/content/drive/MyDrive/my_libs')
```

---

## 8. GPU/TPU 사용

### 8.1 GPU 활성화

1. **런타임 → 런타임 유형 변경**
2. **하드웨어 가속기**에서 GPU 선택
3. **저장** 클릭

### 8.2 GPU 확인

```python
# GPU 정보 확인
!nvidia-smi

# TensorFlow에서 GPU 확인
import tensorflow as tf
print("GPU 사용 가능:", tf.config.list_physical_devices('GPU'))
print("TF 버전:", tf.__version__)

# PyTorch에서 GPU 확인
import torch
print("GPU 사용 가능:", torch.cuda.is_available())
print("GPU 이름:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "N/A")
print("GPU 메모리:", torch.cuda.get_device_properties(0).total_mem / 1e9, "GB")
```

### 8.3 GPU 메모리 관리

```python
# TensorFlow GPU 메모리 증가 허용 (필요한 만큼만 사용)
import tensorflow as tf
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)

# PyTorch GPU 메모리 캐시 비우기
import torch
torch.cuda.empty_cache()

# GPU 메모리 사용량 확인 (PyTorch)
print(f"할당됨: {torch.cuda.memory_allocated()/1e9:.2f} GB")
print(f"캐시됨: {torch.cuda.memory_reserved()/1e9:.2f} GB")
```

### 8.4 TPU 사용

```python
# TPU 초기화 (PyTorch)
import torch
import torch_xla.core.xla_model as xm

device = xm.xla_device()
print(f"TPU 디바이스: {device}")

# TensorFlow에서 TPU 사용
import tensorflow as tf
resolver = tf.distribute.cluster_resolver.TPUClusterResolver()
tf.config.experimental_connect_to_cluster(resolver)
tf.tpu.experimental.initialize_tpu_system(resolver)
strategy = tf.distribute.TPUStrategy(resolver)

with strategy.scope():
    model = tf.keras.Sequential([...])
```

### 8.5 GPU 종류별 성능 비교

| GPU | VRAM | 무료/유료 | 용도 |
|-----|------|-----------|------|
| T4 | 16GB | 무료 | 일반 학습, 추론 |
| L4 | 24GB | Pro+ | 중간 규모 학습 |
| A100 | 40/80GB | Pro+ | 대규모 학습, LLM |
| V100 | 16GB | Pro | 고성능 학습 |

---

## 9. Google Drive 연동

### 9.1 Drive 마운트

```python
from google.colab import drive
drive.mount('/content/drive')

# 마운트 후 내 드라이브 경로
# /content/drive/MyDrive/
```

실행하면 Google 계정 인증 팝업이 나타난다. 허용하면 Drive의 모든 파일에 접근 가능하다.

### 9.2 Drive 파일 사용

```python
import pandas as pd

# Drive에서 파일 읽기
df = pd.read_csv('/content/drive/MyDrive/data/dataset.csv')

# Drive에 파일 저장
df.to_csv('/content/drive/MyDrive/data/result.csv', index=False)

# Drive에서 모델 불러오기
import tensorflow as tf
model = tf.keras.models.load_model('/content/drive/MyDrive/models/my_model.h5')

# Drive에 모델 저장
model.save('/content/drive/MyDrive/models/my_model.h5')
```

### 9.3 Drive 강제 마운트 해제 및 재마운트

```python
# 마운트 해제
drive.flush_and_unmount()

# 강제 재마운트
drive.mount('/content/drive', force_remount=True)
```

---

## 10. 데이터 입출력

### 10.1 CSV 파일

```python
import pandas as pd

# 읽기
df = pd.read_csv('data.csv')
df = pd.read_csv('data.csv', encoding='utf-8')     # 인코딩 지정
df = pd.read_csv('data.csv', encoding='cp949')      # 한글 CSV (Windows)

# 쓰기
df.to_csv('output.csv', index=False, encoding='utf-8-sig')  # Excel 한글 호환
```

### 10.2 Excel 파일

```python
# 읽기
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 쓰기
df.to_excel('output.xlsx', index=False, sheet_name='결과')

# 여러 시트 쓰기
with pd.ExcelWriter('output.xlsx') as writer:
    df1.to_excel(writer, sheet_name='데이터', index=False)
    df2.to_excel(writer, sheet_name='분석결과', index=False)
```

### 10.3 JSON 파일

```python
import json

# 읽기
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# DataFrame으로 읽기
df = pd.read_json('data.json')

# 쓰기
df.to_json('output.json', orient='records', force_ascii=False)
```

### 10.4 이미지 표시

```python
# matplotlib으로 이미지 표시
import matplotlib.pyplot as plt
from PIL import Image

img = Image.open('image.png')
plt.figure(figsize=(10, 8))
plt.imshow(img)
plt.axis('off')
plt.show()

# OpenCV로 이미지 읽기 (BGR → RGB 변환 필요)
import cv2
img = cv2.imread('image.png')
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img_rgb)
plt.show()

# IPython으로 이미지 표시
from IPython.display import Image, display
display(Image('image.png'))
```

### 10.5 Kaggle 데이터셋 다운로드

```python
# Kaggle API 설정
!pip install -q kaggle
!mkdir -p ~/.kaggle

# kaggle.json 업로드 (Kaggle 계정 → API → Create New Token)
from google.colab import files
files.upload()  # kaggle.json 업로드

!mv kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json

# 데이터셋 다운로드
!kaggle datasets download -d dataset-owner/dataset-name
!unzip dataset-name.zip -d /content/data/
```

---

## 11. 유용한 기능

### 11.1 폼(Forms) - 인터랙티브 위젯

```python
#@title 모델 설정 { run: "auto" }
learning_rate = 0.001  #@param {type:"number"}
epochs = 10            #@param {type:"slider", min:1, max:100, step:1}
optimizer = "Adam"     #@param ["Adam", "SGD", "RMSprop"]
use_gpu = True         #@param {type:"boolean"}
model_name = "ResNet"  #@param {type:"string"}

print(f"학습률: {learning_rate}, 에포크: {epochs}")
print(f"옵티마이저: {optimizer}, GPU: {use_gpu}")
```

셀 상단에 `#@title`을 쓰면 접을 수 있는 제목이 표시되고, `#@param`으로 입력 위젯이 생성된다.

### 11.2 보안 비밀 (Secrets)

API 키를 코드에 직접 쓰지 않고 안전하게 관리하는 기능이다.

1. 왼쪽 사이드바 → 🔑 (비밀) 아이콘 클릭
2. **새 보안 비밀 추가**에서 이름과 값 입력
3. **노트북 액세스** 토글 활성화

```python
from google.colab import userdata

# 비밀 값 가져오기
api_key = userdata.get('OPENAI_API_KEY')
```

### 11.3 시스템 리소스 모니터링

```python
# RAM 사용량 확인
!free -h

# 디스크 사용량 확인
!df -h /content

# CPU 정보
!cat /proc/cpuinfo | head -20

# 전체 시스템 정보
import psutil

print(f"CPU 코어 수: {psutil.cpu_count()}")
print(f"RAM 총량: {psutil.virtual_memory().total / 1e9:.1f} GB")
print(f"RAM 사용률: {psutil.virtual_memory().percent}%")
print(f"디스크 사용률: {psutil.disk_usage('/').percent}%")
```

### 11.4 진행률 표시 (tqdm)

```python
from tqdm.notebook import tqdm
import time

# 기본 진행률 바
for i in tqdm(range(100), desc="학습 중"):
    time.sleep(0.01)

# pandas에 적용
from tqdm.notebook import tqdm
tqdm.pandas()
df['result'] = df['column'].progress_apply(lambda x: x * 2)
```

### 11.5 HTML/JavaScript 실행

```python
from IPython.display import HTML, Javascript

# HTML 표시
HTML('<h1 style="color:blue">안녕하세요!</h1>')

# 알림 표시
Javascript('alert("작업 완료!")')

# 학습 완료 시 소리 알림
from google.colab import output
output.eval_js('new Audio("https://upload.wikimedia.org/wikipedia/commons/0/05/Beep-09.ogg").play()')
```

### 11.6 Colab에서 웹 앱 실행

```python
# ngrok으로 외부 접근 가능한 URL 생성
!pip install pyngrok
from pyngrok import ngrok

# Flask 앱 외부 공개
public_url = ngrok.connect(5000)
print(f"공개 URL: {public_url}")

# Gradio 인터페이스 (share=True로 자동 공개)
import gradio as gr

def greet(name):
    return f"안녕하세요, {name}님!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch(share=True)
```

### 11.7 GitHub 연동

```python
# 저장소 클론
!git clone https://github.com/user/repo.git
%cd repo

# Private 저장소 클론 (토큰 사용)
!git clone https://{token}@github.com/user/private-repo.git

# 변경사항 커밋 및 푸시
!git config user.email "you@example.com"
!git config user.name "Your Name"
!git add .
!git commit -m "Colab에서 학습 결과 업데이트"
!git push
```

---

## 12. 단축키 모음

### 12.1 셀 실행

| 단축키 | 기능 |
|--------|------|
| `Shift + Enter` | 셀 실행 후 다음 셀로 이동 |
| `Ctrl + Enter` | 셀 실행 (현재 셀 유지) |
| `Alt + Enter` | 셀 실행 후 아래에 새 셀 추가 |
| `Ctrl + F9` | 모든 셀 실행 |
| `Ctrl + F8` | 이전 셀 모두 실행 |

### 12.2 셀 편집

| 단축키 | 기능 |
|--------|------|
| `Ctrl + M, A` | 위에 셀 추가 |
| `Ctrl + M, B` | 아래에 셀 추가 |
| `Ctrl + M, D` | 셀 삭제 |
| `Ctrl + M, M` | 텍스트 셀로 변환 |
| `Ctrl + M, Y` | 코드 셀로 변환 |
| `Ctrl + M, Z` | 셀 삭제 취소 |
| `Ctrl + M, C` | 셀 복사 |
| `Ctrl + M, V` | 셀 붙여넣기 |
| `Ctrl + M, X` | 셀 잘라내기 |

### 12.3 일반

| 단축키 | 기능 |
|--------|------|
| `Ctrl + S` | 노트북 저장 |
| `Ctrl + /` | 선택 영역 주석 토글 |
| `Ctrl + Shift + Space` | 파라미터 힌트 |
| `Ctrl + Space` | 자동 완성 |
| `Ctrl + M, H` | 단축키 도움말 |
| `Ctrl + M, I` | 실행 중단 |
| `Ctrl + M, .` | 런타임 재시작 |
| `Ctrl + M, L` | 줄 번호 토글 |

---

## 13. 요금제 비교

| 항목 | 무료 | Colab Pro ($11.99/월) | Colab Pro+ ($49.99/월) |
|------|------|----------------------|------------------------|
| GPU | T4 | T4, V100, A100 | T4, V100, A100 (우선 배정) |
| GPU 사용 시간 | 제한적 | 더 많은 시간 | 훨씬 더 많은 시간 |
| RAM | ~12.7GB | ~25GB (고용량 선택) | ~52GB (고용량 선택) |
| 최대 실행 시간 | ~12시간 | ~24시간 | ~24시간 |
| 유휴 시간 | ~90분 | 더 길게 | 더 길게 |
| 백그라운드 실행 | ❌ | ❌ | ✅ |
| 터미널 | ❌ | ❌ | ✅ |

> **참고**: 가격과 사양은 변경될 수 있으므로 [공식 페이지](https://colab.research.google.com/signup)에서 최신 정보를 확인한다.

---

## 14. 제한 사항 및 주의 사항

### 14.1 런타임 제한
- **연속 실행 시간**: 무료 최대 약 12시간, Pro/Pro+ 최대 약 24시간
- **유휴 시 자동 종료**: 무료 약 90분, Pro는 더 길게 유지
- **일일 GPU 할당량**: 과도한 사용 시 일시적으로 GPU 사용 제한
- **런타임 종료 시 모든 데이터 삭제**: 중요 데이터는 Drive에 저장

### 14.2 리소스 제한
- **디스크**: 약 100GB (임시 저장소)
- **RAM**: 무료 약 12.7GB
- **업로드 속도**: 대용량 파일은 Drive 경유가 빠름

### 14.3 금지 사항 (이용약관)
- 암호화폐 채굴
- 원격 데스크톱/서버로 사용
- 네트워크 공격 도구 실행
- 장시간 유휴 상태로 리소스 점유

### 14.4 데이터 보안 주의
- 민감한 데이터를 Colab에 업로드할 때 주의
- API 키, 비밀번호는 **보안 비밀(Secrets)** 기능 사용
- 공유 노트북에 인증 정보가 포함되지 않도록 확인

---

## 15. 실전 팁

### 15.1 런타임 종료 방지

```python
# JavaScript로 주기적 클릭 시뮬레이션 (권장하지 않으나 참고용)
# 브라우저 콘솔에서 실행
# function ClickConnect(){
#   console.log("연결 유지");
#   document.querySelector("colab-connect-button").click()
# }
# setInterval(ClickConnect, 60000)
```

### 15.2 학습 완료 알림 받기

```python
# 이메일 알림
import smtplib
from email.mime.text import MIMEText

def send_notification(subject, body):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = 'your@gmail.com'
    msg['To'] = 'your@gmail.com'

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login('your@gmail.com', 'app-password')
        server.send_message(msg)

# 학습 코드 실행 후
send_notification("학습 완료", f"정확도: {accuracy:.4f}")
```

### 15.3 체크포인트 저장 (학습 중단 대비)

```python
import os

checkpoint_dir = '/content/drive/MyDrive/checkpoints'
os.makedirs(checkpoint_dir, exist_ok=True)

# TensorFlow 콜백
checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
    filepath=os.path.join(checkpoint_dir, 'model_{epoch:02d}_{val_loss:.4f}.h5'),
    save_best_only=True,
    monitor='val_loss'
)

model.fit(X_train, y_train,
          validation_data=(X_val, y_val),
          epochs=100,
          callbacks=[checkpoint_callback])

# PyTorch 체크포인트
torch.save({
    'epoch': epoch,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': loss,
}, os.path.join(checkpoint_dir, f'checkpoint_epoch_{epoch}.pt'))
```

### 15.4 대용량 데이터 처리

```python
# 청크 단위로 CSV 읽기
chunks = pd.read_csv('large_data.csv', chunksize=10000)
for chunk in chunks:
    process(chunk)

# Parquet 형식 사용 (CSV보다 빠르고 작음)
df.to_parquet('data.parquet')
df = pd.read_parquet('data.parquet')

# 데이터 타입 최적화로 메모리 절약
df['int_col'] = df['int_col'].astype('int32')      # int64 → int32
df['float_col'] = df['float_col'].astype('float32')  # float64 → float32
df['cat_col'] = df['cat_col'].astype('category')     # object → category
```

### 15.5 자주 쓰는 노트북 템플릿

노트북 상단에 아래 코드를 배치하면 매번 환경 설정을 빠르게 할 수 있다:

```python
# ===== 환경 설정 셀 =====
# 라이브러리 설치
!pip install -q transformers datasets wandb

# Google Drive 마운트
from google.colab import drive
drive.mount('/content/drive')

# GPU 확인
import torch
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"디바이스: {device}")
if device == 'cuda':
    print(f"GPU: {torch.cuda.get_device_name(0)}")

# 시드 고정 (재현성)
import random
import numpy as np

SEED = 42
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(SEED)

# 경고 숨기기
import warnings
warnings.filterwarnings('ignore')

print("환경 설정 완료!")
```

---

## 부록: 자주 묻는 질문 (FAQ)

**Q: Colab에서 만든 파일은 어디에 저장되나요?**
A: 기본적으로 `/content/` 디렉토리에 저장되며, 런타임 종료 시 삭제됩니다. 영구 저장하려면 Google Drive에 저장하세요.

**Q: GPU 할당량을 초과하면 어떻게 되나요?**
A: 일정 시간 GPU를 사용할 수 없게 되며, CPU만 사용 가능합니다. 보통 몇 시간~하루 후 초기화됩니다.

**Q: Colab에서 로컬 파일에 접근할 수 있나요?**
A: 직접 접근은 불가능합니다. 파일을 업로드하거나 Google Drive를 통해 접근해야 합니다.

**Q: 다른 사람과 동시에 같은 노트북을 편집할 수 있나요?**
A: 네, Google Docs처럼 실시간 공동 편집이 가능합니다. 단, 런타임은 각자 별도입니다.

**Q: Colab Pro가 꼭 필요한가요?**
A: 가벼운 실험이나 학습에는 무료로 충분합니다. 대규모 모델 학습이나 긴 실행 시간이 필요하면 Pro를 권장합니다.
