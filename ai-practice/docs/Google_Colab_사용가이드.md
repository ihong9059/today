# Google Colab 사용 가이드

Google Colaboratory(Colab)는 브라우저에서 Python 코드를 실행할 수 있는 무료 클라우드 기반 Jupyter 노트북 환경입니다. GPU/TPU를 무료로 사용할 수 있어 딥러닝 학습에 매우 유용합니다.

---

## 목차

1. [Colab 시작하기](#1-colab-시작하기)
2. [기본 인터페이스](#2-기본-인터페이스)
3. [런타임 및 GPU 설정](#3-런타임-및-gpu-설정)
4. [Google Drive 연동](#4-google-drive-연동)
5. [파일 업로드/다운로드](#5-파일-업로드다운로드)
6. [패키지 설치](#6-패키지-설치)
7. [유용한 매직 명령어](#7-유용한-매직-명령어)
8. [딥러닝 학습 팁](#8-딥러닝-학습-팁)
9. [Colab 제한 사항](#9-colab-제한-사항)
10. [문제 해결](#10-문제-해결)
11. [Colab Pro/Pro+ 비교](#11-colab-propro-비교)

---

## 1. Colab 시작하기

### 1.1 접속 방법

1. [Google Colab](https://colab.research.google.com/) 접속
2. Google 계정으로 로그인
3. 새 노트북 생성 또는 기존 노트북 열기

### 1.2 새 노트북 생성

```
파일 → 새 노트 만들기
```

또는 Google Drive에서:
```
새로 만들기 → 더보기 → Google Colaboratory
```

### 1.3 GitHub에서 노트북 열기

```
파일 → 노트 열기 → GitHub 탭 → 저장소 URL 입력
```

예시:
```
https://github.com/username/repo/blob/main/notebook.ipynb
```

### 1.4 로컬 파일 열기

```
파일 → 노트 업로드 → .ipynb 파일 선택
```

---

## 2. 기본 인터페이스

### 2.1 셀 종류

| 셀 종류 | 설명 | 단축키 |
|---------|------|--------|
| 코드 셀 | Python 코드 실행 | `Ctrl + M, Y` |
| 텍스트 셀 | Markdown 문서 작성 | `Ctrl + M, M` |

### 2.2 필수 단축키

| 동작 | 단축키 |
|------|--------|
| 셀 실행 | `Shift + Enter` 또는 `Ctrl + Enter` |
| 셀 실행 후 아래에 새 셀 | `Alt + Enter` |
| 위에 새 셀 추가 | `Ctrl + M, A` |
| 아래에 새 셀 추가 | `Ctrl + M, B` |
| 셀 삭제 | `Ctrl + M, D` |
| 실행 중단 | `Ctrl + M, I` |
| 모든 셀 실행 | `Ctrl + F9` |
| 명령어 팔레트 | `Ctrl + Shift + P` |
| 자동완성 | `Ctrl + Space` 또는 `Tab` |
| 함수 도움말 | `Shift + Tab` |

### 2.3 셀 이동 및 편집

| 동작 | 단축키 |
|------|--------|
| 셀 위로 이동 | `Ctrl + M, K` |
| 셀 아래로 이동 | `Ctrl + M, J` |
| 셀 복사 | `Ctrl + M, C` |
| 셀 잘라내기 | `Ctrl + M, X` |
| 셀 붙여넣기 | `Ctrl + M, V` |
| 실행 취소 | `Ctrl + Z` |
| 다시 실행 | `Ctrl + Shift + Z` |

---

## 3. 런타임 및 GPU 설정

### 3.1 GPU 활성화 (필수!)

딥러닝 학습 전 **반드시** GPU를 활성화해야 합니다.

```
런타임 → 런타임 유형 변경 → 하드웨어 가속기: GPU 선택 → 저장
```

### 3.2 GPU 유형

| GPU | 성능 | 가용성 |
|-----|------|--------|
| T4 | 기본 (무료) | 높음 |
| A100 | 고성능 | Pro+ 전용 |
| V100 | 고성능 | Pro 전용 |
| L4 | 중간 | Pro 전용 |

### 3.3 GPU 확인

```python
# GPU 정보 확인
!nvidia-smi
```

```python
# PyTorch GPU 확인
import torch
print(f"CUDA 사용 가능: {torch.cuda.is_available()}")
print(f"GPU 이름: {torch.cuda.get_device_name(0)}")
print(f"GPU 메모리: {torch.cuda.get_device_properties(0).total_memory / 1024**3:.1f} GB")
```

### 3.4 TPU 사용 (선택)

```
런타임 → 런타임 유형 변경 → 하드웨어 가속기: TPU 선택
```

```python
# TPU 확인
import torch_xla
import torch_xla.core.xla_model as xm
device = xm.xla_device()
print(device)
```

### 3.5 런타임 관리

| 메뉴 | 설명 |
|------|------|
| 런타임 → 모두 실행 | 모든 셀 순차 실행 |
| 런타임 → 런타임 다시 시작 | 메모리 초기화 (파일 유지) |
| 런타임 → 세션 관리 | 활성 세션 확인/종료 |
| 런타임 → 런타임 연결 해제 및 삭제 | 완전 초기화 |

---

## 4. Google Drive 연동

### 4.1 Drive 마운트 (권장 방법)

```python
from google.colab import drive
drive.mount('/content/drive')
```

실행 후:
1. 팝업에서 Google 계정 선택
2. 권한 허용 클릭
3. `/content/drive/MyDrive/`로 접근 가능

### 4.2 Drive 경로 구조

```
/content/                      # Colab 기본 작업 디렉토리
/content/drive/                # Google Drive 루트
/content/drive/MyDrive/        # 내 드라이브
/content/drive/MyDrive/ai-practice/  # 프로젝트 폴더 (예시)
```

### 4.3 경로 변수 설정 (권장)

```python
import os

# Google Drive 기본 경로
DRIVE_PATH = '/content/drive/MyDrive'

# 프로젝트 경로
PROJECT_PATH = f'{DRIVE_PATH}/ai-practice/01-MNIST'
DATA_PATH = f'{PROJECT_PATH}/data'
MODEL_PATH = f'{PROJECT_PATH}/models'
RESULT_PATH = f'{PROJECT_PATH}/results'

# 폴더 생성 (없으면)
for path in [DATA_PATH, MODEL_PATH, RESULT_PATH]:
    os.makedirs(path, exist_ok=True)

print(f"프로젝트 경로: {PROJECT_PATH}")
```

### 4.4 Drive 마운트 해제

```python
drive.flush_and_unmount()
```

---

## 5. 파일 업로드/다운로드

### 5.1 파일 업로드 (소량)

```python
from google.colab import files

# 파일 선택 다이얼로그
uploaded = files.upload()

# 업로드된 파일 확인
for filename in uploaded.keys():
    print(f"업로드됨: {filename}, 크기: {len(uploaded[filename])} bytes")
```

### 5.2 파일 다운로드

```python
from google.colab import files

# 단일 파일 다운로드
files.download('model.pt')

# 여러 파일 다운로드 (zip으로 압축)
!zip -r results.zip results/
files.download('results.zip')
```

### 5.3 URL에서 직접 다운로드

```python
# wget 사용
!wget https://example.com/data.zip

# curl 사용
!curl -O https://example.com/data.zip

# gdown (Google Drive 공유 링크)
!pip install gdown
!gdown https://drive.google.com/uc?id=FILE_ID
```

### 5.4 Kaggle 데이터셋 다운로드

```python
# 1. Kaggle API 키 업로드
from google.colab import files
files.upload()  # kaggle.json 선택

# 2. 설정
!mkdir -p ~/.kaggle
!mv kaggle.json ~/.kaggle/
!chmod 600 ~/.kaggle/kaggle.json

# 3. 데이터셋 다운로드
!kaggle datasets download -d username/dataset-name

# 4. 압축 해제
!unzip dataset-name.zip -d ./data
```

---

## 6. 패키지 설치

### 6.1 pip 설치

```python
# 단일 패키지
!pip install package_name

# 버전 지정
!pip install package_name==1.2.3

# 여러 패키지
!pip install package1 package2 package3

# requirements.txt 사용
!pip install -r requirements.txt

# 조용히 설치 (-q: quiet)
!pip install -q package_name
```

### 6.2 사전 설치된 주요 패키지

| 패키지 | 버전 확인 |
|--------|-----------|
| PyTorch | `torch.__version__` |
| TensorFlow | `tf.__version__` |
| NumPy | `np.__version__` |
| Pandas | `pd.__version__` |
| Matplotlib | `matplotlib.__version__` |
| OpenCV | `cv2.__version__` |
| scikit-learn | `sklearn.__version__` |

### 6.3 자주 사용하는 추가 패키지

```python
# 딥러닝
!pip install -q ultralytics      # YOLOv8
!pip install -q transformers     # Hugging Face
!pip install -q timm             # PyTorch Image Models
!pip install -q albumentations   # 이미지 증강

# OCR
!pip install -q easyocr
!pip install -q paddleocr paddlepaddle

# 시각화
!pip install -q seaborn plotly

# 유틸리티
!pip install -q tqdm             # 진행률 표시
!pip install -q wandb            # 실험 추적
```

### 6.4 apt-get 설치 (시스템 패키지)

```python
# 시스템 패키지 업데이트
!apt-get update

# 패키지 설치
!apt-get install -y package_name

# 예: 한글 폰트 설치
!apt-get install -y fonts-nanum
```

---

## 7. 유용한 매직 명령어

### 7.1 시스템 명령어

```python
# 현재 디렉토리
!pwd

# 파일 목록
!ls -la

# 디렉토리 이동 (% 사용)
%cd /content/drive/MyDrive

# 디렉토리 생성
!mkdir -p new_folder

# 파일 복사
!cp source.txt dest.txt

# 파일 이동
!mv source.txt new_folder/

# 파일 삭제
!rm file.txt
!rm -rf folder/

# 디스크 사용량
!df -h

# 메모리 사용량
!free -h
```

### 7.2 IPython 매직 명령어

```python
# 실행 시간 측정
%time result = slow_function()

# 여러 번 실행하여 평균 측정
%timeit fast_function()

# 셀 전체 실행 시간
%%time
# 여러 줄 코드

# 변수 목록
%who
%whos  # 상세 정보

# 히스토리
%history

# 환경 변수 설정
%env MY_VAR=value

# matplotlib 인라인 표시
%matplotlib inline

# 자동 재로드 (모듈 수정 시)
%load_ext autoreload
%autoreload 2
```

### 7.3 셀 매직 (%%로 시작)

```python
%%bash
# 배시 스크립트 실행
echo "Hello"
pwd

%%html
<h1>HTML 렌더링</h1>

%%javascript
alert("JavaScript 실행");

%%writefile filename.py
# 파일로 저장
def hello():
    print("Hello!")
```

---

## 8. 딥러닝 학습 팁

### 8.1 GPU 메모리 관리

```python
import torch
import gc

# 메모리 정리
def clear_gpu_memory():
    gc.collect()
    torch.cuda.empty_cache()

# 메모리 사용량 확인
def print_gpu_memory():
    allocated = torch.cuda.memory_allocated() / 1024**3
    cached = torch.cuda.memory_reserved() / 1024**3
    print(f"할당: {allocated:.2f} GB, 캐시: {cached:.2f} GB")

# 사용 예시
clear_gpu_memory()
print_gpu_memory()
```

### 8.2 학습 중 연결 끊김 방지

```python
# 방법 1: 브라우저 콘솔에서 실행 (F12 → Console)
# function ClickConnect(){
#     console.log("연결 유지 중...");
#     document.querySelector("colab-connect-button").click()
# }
# setInterval(ClickConnect, 60000)

# 방법 2: 자동 저장 설정
import time
from google.colab import drive

# 주기적으로 Drive에 저장
def auto_save(model, path, interval=300):
    """interval: 초 단위 (기본 5분)"""
    torch.save(model.state_dict(), path)
    print(f"모델 저장됨: {path}")
```

### 8.3 체크포인트 저장

```python
import torch
import os

def save_checkpoint(model, optimizer, epoch, loss, path):
    """학습 체크포인트 저장"""
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
    }
    torch.save(checkpoint, path)
    print(f"체크포인트 저장: epoch {epoch}, loss {loss:.4f}")

def load_checkpoint(model, optimizer, path):
    """체크포인트 불러오기"""
    checkpoint = torch.load(path)
    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    epoch = checkpoint['epoch']
    loss = checkpoint['loss']
    print(f"체크포인트 로드: epoch {epoch}, loss {loss:.4f}")
    return epoch, loss

# 사용 예시
CHECKPOINT_PATH = '/content/drive/MyDrive/ai-practice/models/checkpoint.pt'

# 저장
save_checkpoint(model, optimizer, epoch, loss, CHECKPOINT_PATH)

# 불러오기
start_epoch, _ = load_checkpoint(model, optimizer, CHECKPOINT_PATH)
```

### 8.4 학습 진행률 표시

```python
from tqdm.notebook import tqdm

# tqdm 사용
for epoch in tqdm(range(num_epochs), desc="Epochs"):
    for batch in tqdm(train_loader, desc=f"Epoch {epoch+1}", leave=False):
        # 학습 코드
        pass
```

### 8.5 결과 시각화

```python
import matplotlib.pyplot as plt

# 한글 폰트 설정 (Colab)
!apt-get install -y fonts-nanum
import matplotlib.font_manager as fm
font_path = '/usr/share/fonts/truetype/nanum/NanumGothic.ttf'
font_prop = fm.FontProperties(fname=font_path)
plt.rcParams['font.family'] = font_prop.get_name()
plt.rcParams['axes.unicode_minus'] = False

# 학습 곡선 그리기
def plot_training_history(train_losses, val_losses, train_accs, val_accs):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    # 손실
    ax1.plot(train_losses, label='Train')
    ax1.plot(val_losses, label='Validation')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Loss')
    ax1.set_title('학습 손실')
    ax1.legend()
    ax1.grid(True)

    # 정확도
    ax2.plot(train_accs, label='Train')
    ax2.plot(val_accs, label='Validation')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Accuracy (%)')
    ax2.set_title('학습 정확도')
    ax2.legend()
    ax2.grid(True)

    plt.tight_layout()
    plt.savefig('/content/drive/MyDrive/results/training_curve.png', dpi=150)
    plt.show()
```

### 8.6 실험 추적 (Weights & Biases)

```python
# 설치 및 로그인
!pip install -q wandb
import wandb
wandb.login()

# 프로젝트 초기화
wandb.init(project="my-project", name="experiment-1")

# 하이퍼파라미터 기록
wandb.config = {
    "learning_rate": 0.001,
    "epochs": 10,
    "batch_size": 32
}

# 학습 중 메트릭 기록
for epoch in range(epochs):
    # ... 학습 코드 ...
    wandb.log({
        "epoch": epoch,
        "train_loss": train_loss,
        "val_loss": val_loss,
        "val_accuracy": val_acc
    })

# 모델 저장
wandb.save("model.pt")

# 종료
wandb.finish()
```

---

## 9. Colab 제한 사항

### 9.1 무료 버전 제한

| 항목 | 제한 |
|------|------|
| 세션 시간 | 최대 12시간 (활동 없으면 90분) |
| GPU 사용 | 일일 할당량 있음 (약 4-8시간) |
| RAM | ~12GB |
| 디스크 | ~100GB (임시) |
| GPU 종류 | T4 (랜덤 배정) |

### 9.2 세션 종료 시 데이터 손실

```
⚠️ 주의: 세션 종료 시 /content/ 내 모든 파일이 삭제됩니다!
```

**데이터 보존 방법:**
1. Google Drive에 저장 (권장)
2. 로컬로 다운로드
3. GitHub에 커밋

### 9.3 GPU 할당량 초과 시

```
GPU 사용 불가 메시지가 나타나면:
1. 런타임 → 런타임 유형 변경 → CPU로 변경
2. 몇 시간 후 다시 GPU 시도
3. 다른 Google 계정 사용
4. Colab Pro 가입 고려
```

---

## 10. 문제 해결

### 10.1 "세션이 비활성 상태로 인해 종료됨"

**원인:** 장시간 활동 없음

**해결:**
```python
# 방법 1: 브라우저 콘솔에서 (F12 → Console)
function ClickConnect(){
    document.querySelector("colab-connect-button").click()
}
setInterval(ClickConnect, 60000)

# 방법 2: 중간중간 셀 실행
```

### 10.2 "GPU 메모리 부족" (CUDA Out of Memory)

**해결:**
```python
# 1. 배치 크기 줄이기
batch_size = 16  # 32 → 16

# 2. 메모리 정리
import gc
gc.collect()
torch.cuda.empty_cache()

# 3. 런타임 다시 시작
# 런타임 → 런타임 다시 시작

# 4. 그래디언트 누적 사용
accumulation_steps = 4
for i, batch in enumerate(dataloader):
    loss = model(batch) / accumulation_steps
    loss.backward()
    if (i + 1) % accumulation_steps == 0:
        optimizer.step()
        optimizer.zero_grad()
```

### 10.3 "모듈을 찾을 수 없음" (ModuleNotFoundError)

**해결:**
```python
# 1. 패키지 설치
!pip install package_name

# 2. 런타임 다시 시작 필요한 경우
# 런타임 → 런타임 다시 시작

# 3. 경로 문제인 경우
import sys
sys.path.append('/content/drive/MyDrive/my_project')
```

### 10.4 "Drive 마운트 실패"

**해결:**
```python
# 1. 기존 마운트 해제 후 재시도
from google.colab import drive
drive.flush_and_unmount()
drive.mount('/content/drive', force_remount=True)

# 2. 브라우저 캐시 삭제 후 재시도
# 3. 시크릿 모드에서 시도
```

### 10.5 한글 깨짐

```python
# 폰트 설치
!apt-get install -y fonts-nanum
!fc-cache -fv

# matplotlib 설정
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 캐시 삭제
import matplotlib
matplotlib.font_manager._rebuild()

# 폰트 설정
plt.rcParams['font.family'] = 'NanumGothic'
plt.rcParams['axes.unicode_minus'] = False

# 런타임 다시 시작 후 위 코드 재실행
```

---

## 11. Colab Pro/Pro+ 비교

| 기능 | 무료 | Pro ($12/월) | Pro+ ($58/월) |
|------|------|--------------|---------------|
| 세션 시간 | ~12시간 | ~24시간 | ~24시간 |
| 유휴 타임아웃 | 90분 | 90분 이상 | 더 길게 |
| GPU 종류 | T4 | T4, V100, A100 | A100 우선 |
| GPU 메모리 | ~16GB | ~40GB | ~80GB |
| RAM | ~12GB | ~25GB | ~52GB |
| 백그라운드 실행 | X | X | O |
| 터미널 | X | X | O |

### Pro 가입 추천 상황

- 대용량 모델 학습 (YOLO, Transformer 등)
- 장시간 학습이 필요한 경우
- GPU 할당량 초과가 빈번한 경우
- 안정적인 학습 환경이 필요한 경우

---

## 12. 실습 예제: MNIST 학습

```python
# 1. GPU 확인
import torch
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"사용 장치: {device}")

# 2. Google Drive 마운트
from google.colab import drive
drive.mount('/content/drive')

# 3. 경로 설정
import os
PROJECT_PATH = '/content/drive/MyDrive/ai-practice/01-MNIST'
MODEL_PATH = f'{PROJECT_PATH}/models'
os.makedirs(MODEL_PATH, exist_ok=True)

# 4. 데이터 로드
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.1307,), (0.3081,))
])

train_dataset = datasets.MNIST('./data', train=True, download=True, transform=transform)
test_dataset = datasets.MNIST('./data', train=False, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=1000)

# 5. 모델 정의
import torch.nn as nn
import torch.nn.functional as F

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.25)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = self.dropout(F.relu(self.fc1(x)))
        return self.fc2(x)

model = CNN().to(device)

# 6. 학습
from tqdm.notebook import tqdm

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

for epoch in range(5):
    model.train()
    total_loss = 0

    for images, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}"):
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(f"Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}")

# 7. 평가
model.eval()
correct = 0
total = 0

with torch.no_grad():
    for images, labels in test_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

print(f"테스트 정확도: {100 * correct / total:.2f}%")

# 8. 모델 저장 (Google Drive)
torch.save(model.state_dict(), f'{MODEL_PATH}/mnist_cnn.pt')
print(f"모델 저장됨: {MODEL_PATH}/mnist_cnn.pt")
```

---

## 참고 자료

- [Google Colab 공식 문서](https://colab.research.google.com/notebooks/intro.ipynb)
- [Google Colab FAQ](https://research.google.com/colaboratory/faq.html)
- [PyTorch Colab 튜토리얼](https://pytorch.org/tutorials/beginner/colab)
- [Colab Pro 가입](https://colab.research.google.com/signup)

---

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-03-22 | 초기 작성 |
