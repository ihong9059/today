# Google Colab 사용 가이드

## 1. Google Colab이란?
- Google이 제공하는 무료 온라인 Python 실행 환경
- 브라우저에서 바로 Python 코드 실행 (설치 불필요!)
- 무료 GPU/TPU 제공 (AI 모델 학습에 필수)
- Jupyter Notebook 기반 (.ipynb 파일)
- Google Drive와 자동 연동

## 2. 시작하기
### 2.1 접속
1. https://colab.research.google.com 접속
2. Google 계정으로 로그인 (Gmail 계정)
3. "새 노트" 클릭 → 바로 시작!

### 2.2 화면 구성
- 코드 셀: Python 코드 입력 및 실행 (Shift+Enter)
- 텍스트 셀: 설명 메모 (마크다운 지원)
- 메뉴바: 파일, 수정, 런타임 등
- 좌측 패널: 파일 탐색기, 변수, 비밀 키 등

## 3. 기본 사용법
### 3.1 코드 실행
```python
# 셀에 코드 입력 후 Shift+Enter
print("Hello, AI!")
```

### 3.2 패키지 설치
```python
!pip install 패키지명
# 예시
!pip install transformers torch
```

### 3.3 GPU 사용 설정
1. 메뉴: 런타임 > 런타임 유형 변경
2. 하드웨어 가속기: GPU 선택
3. 저장

확인:
```python
import torch
print(torch.cuda.is_available())  # True면 GPU 사용 가능
print(torch.cuda.get_device_name(0))  # GPU 이름
```

### 3.4 Google Drive 연결
```python
from google.colab import drive
drive.mount('/content/drive')
```
- 팝업에서 Google 계정 권한 허용
- /content/drive/MyDrive/ 경로로 접근 가능

## 4. Colab 등급 비교
| 구분 | 무료 | Colab Pro | Colab Pro+ |
|:----:|:----:|:---------:|:----------:|
| 월 비용 | 무료 | $11.99/월 | $49.99/월 |
| GPU | T4 (제한적) | T4, V100, A100 | A100 우선 배정 |
| RAM | 12.7GB | 25GB+ | 51GB+ |
| 실행 시간 | ~12시간 | ~24시간 | ~24시간 |
| 백그라운드 | 불가 | 불가 | 가능 |
| 추천 | 학습/실습 | 중급 AI 개발 | 대규모 모델 학습 |

## 5. 유용한 기능
### 5.1 파일 업로드/다운로드
```python
# 파일 업로드
from google.colab import files
uploaded = files.upload()

# 파일 다운로드
files.download('결과파일.csv')
```

### 5.2 시스템 명령어
```python
!ls          # 파일 목록
!pwd         # 현재 경로
!wget URL    # 파일 다운로드
!git clone URL  # GitHub 저장소 복제
```

### 5.3 환경 변수 (비밀 키 관리)
1. 좌측 패널 > 비밀 > 새 비밀 추가
2. 이름과 값 입력
```python
from google.colab import userdata
api_key = userdata.get('API_KEY')
```

### 5.4 노트북 공유
1. 우측 상단 "공유" 클릭
2. 링크 생성 또는 이메일로 공유
3. "편집 가능" / "보기 전용" 선택

## 6. AI 실습 예제

### 6.1 이미지 분류 (간단 예제)
```python
import torch
from torchvision import models, transforms
from PIL import Image

# 사전 학습된 모델 로드
model = models.resnet50(pretrained=True)
model.eval()

# 이미지 전처리 및 추론
# ...
```

### 6.2 텍스트 생성 (Hugging Face)
```python
from transformers import pipeline

generator = pipeline('text-generation', model='gpt2')
result = generator("AI is transforming", max_length=50)
print(result[0]['generated_text'])
```

## 7. 단축키
| 단축키 | 기능 |
|--------|------|
| Shift+Enter | 셀 실행 후 다음 셀 이동 |
| Ctrl+Enter | 셀 실행 (이동 안 함) |
| Ctrl+M B | 아래에 새 셀 추가 |
| Ctrl+M D | 현재 셀 삭제 |
| Ctrl+M M | 텍스트 셀로 변환 |
| Ctrl+M Y | 코드 셀로 변환 |
| Ctrl+/ | 주석 토글 |

## 8. 주의사항
- 무료 사용량 초과 시 GPU 접근 제한 (몇 시간~하루 대기)
- 노트북을 닫으면 런타임 초기화 (설치한 패키지, 데이터 사라짐)
- 중요 파일은 반드시 Google Drive에 저장
- 12시간 이상 연속 실행 불가 (무료 기준)

## 9. 자주 묻는 질문
- Q: 무료로 충분한가요? → 학습/실습 수준이면 충분. 대규모 모델 학습은 Pro 추천
- Q: 데이터가 사라졌어요 → 런타임 초기화됨. Drive에 저장하거나 다시 업로드 필요
- Q: GPU가 할당 안 돼요 → 사용량 초과. 시간 지나면 다시 가능
- Q: .py 파일을 실행할 수 있나요? → !python 파일명.py 로 실행 가능

## 10. 다음 단계
- [07_NotebookLM_동영상_슬라이드.md](07_NotebookLM_동영상_슬라이드.md) - NotebookLM으로 동영상/슬라이드 만들기
