# UTTEC AI - Personal AI Assistant (Dual Mode)

## 소개

홍광선님을 위한 개인 AI 비서입니다.

| 모드 | 엔진 | 인터넷 | 속도 |
|------|------|:------:|------|
| 🌐 Online | Google Gemini API | 필요 | 빠름 (1~3초) |
| 📴 Offline | TinyLlama (llama.cpp) | 불필요 | 느림 (10~30초) |

## 기능

- 🗣️ 일반 대화 및 질문
- 📋 업무 도우미 (일정, 메모, 작업 관리)
- 💻 코딩 도우미 (프로그래밍 질문, 코드 작성)

---

## 설치 방법

### Lenovo Tab M9 (Termux) - 전체 설치

#### 방법 1: 자동 설치 (권장)

```bash
# 1. 설치 스크립트 다운로드 후 실행
bash install_tablet_full.sh

# 2. uttec_ai_dual.py 파일 복사
# PC에서 USB 또는 SSH로 ~/uttec_ai/ 에 복사

# 3. 실행
cd ~/uttec_ai
python uttec_ai_dual.py
```

#### 방법 2: 수동 설치

```bash
# 1. 기본 패키지
pkg update && pkg upgrade
pkg install python git cmake make clang wget
pip install requests

# 2. llama.cpp 설치 (10~15분)
cd ~
git clone https://github.com/ggerganov/llama.cpp.git
cd llama.cpp
make -j4

# 3. TinyLlama 모델 다운로드 (~670MB)
mkdir -p ~/models
cd ~/models
wget https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf

# 4. UTTEC AI 설치
mkdir -p ~/uttec_ai
# uttec_ai_dual.py 파일 복사

# 5. 실행
cd ~/uttec_ai
python uttec_ai_dual.py
```

### Windows PC

```bash
pip install requests
python uttec_ai_dual.py
```

---

## 사용법

### 명령어

| 명령어 | 설명 |
|--------|------|
| `/online` | 온라인 모드 (Gemini API) |
| `/offline` | 오프라인 모드 (TinyLlama) |
| `/status` | 현재 상태 확인 |
| `/clear` | 화면 지우기 |
| `/new` | 새 대화 시작 |
| `/exit` | 종료 |

### 화면 예시

```
    ██╗   ██╗████████╗████████╗███████╗ ██████╗
    ██║   ██║╚══██╔══╝╚══██╔══╝██╔════╝██╔════╝
    ██║   ██║   ██║      ██║   █████╗  ██║
    ██║   ██║   ██║      ██║   ██╔══╝  ██║
    ╚██████╔╝   ██║      ██║   ███████╗╚██████╗
     ╚═════╝    ╚═╝      ╚═╝   ╚══════╝ ╚═════╝

         ✨ AI ASSISTANT v2.0 ✨
         Mode: 🌐 ONLINE (Gemini)

┌─[14:30] 🌐 👤 나
└─▶ 안녕하세요!

┌─[14:30] 🤖 UTTEC AI
│ 안녕하세요, 홍광선님! 무엇을 도와드릴까요?
└──────────────────────────────────────────────────
```

---

## 파일 구조

```
uttec_ai/
├── uttec_ai_dual.py       # 메인 프로그램 (듀얼 모드)
├── uttec_ai.py            # 온라인 전용 버전
├── install_tablet_full.sh # 전체 설치 스크립트
├── install_tablet.sh      # 간단 설치 스크립트
└── README.md              # 이 파일
```

---

## 모드 비교

| 항목 | 🌐 Online (Gemini) | 📴 Offline (TinyLlama) |
|------|-------------------|----------------------|
| 인터넷 | 필요 | 불필요 |
| 응답 속도 | 1~3초 | 10~30초 |
| 한글 품질 | 우수 | 보통 |
| 코딩 능력 | 우수 | 제한적 |
| 무료 한도 | 일 1,500회 | 무제한 |
| 배터리 | 적음 | 많이 사용 |

---

## API 정보

### Gemini API (Online)
- **Provider**: Google
- **Model**: gemini-1.5-flash
- **무료 한도**: 분당 60회, 일 1,500회
- **콘솔**: https://aistudio.google.com/

### TinyLlama (Offline)
- **Model**: TinyLlama 1.1B Chat
- **크기**: ~670MB (Q4_K_M 양자화)
- **엔진**: llama.cpp

---

## 문제 해결

### 오프라인 모드가 작동하지 않음
```bash
# llama.cpp 확인
ls ~/llama.cpp/main

# 모델 확인
ls ~/models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf

# 재설치
cd ~/llama.cpp && make clean && make -j4
```

### 온라인 모드 연결 오류
- Wi-Fi 연결 확인
- API 키 확인 (aistudio.google.com)
- `/offline` 으로 오프라인 모드 사용

---

## 태블릿으로 파일 복사 방법

### 방법 1: SSH/SCP (권장)
```bash
# PC에서 실행 (Termux SSH 서버 필요)
scp -P 8022 uttec_ai_dual.py u0_a286@100.112.196.53:~/uttec_ai/
```

### 방법 2: USB 파일 전송
1. USB로 태블릿 연결
2. 내부 저장소 > Download 폴더에 복사
3. Termux에서:
   ```bash
   cp /storage/emulated/0/Download/uttec_ai_dual.py ~/uttec_ai/
   ```

### 방법 3: Termux 직접 다운로드
```bash
# GitHub에 업로드 후
cd ~/uttec_ai
wget https://raw.githubusercontent.com/ihong9059/today/main/uttec_ai/uttec_ai_dual.py
```

---

*Created: 2026-02-09*
*Version: 2.0 (Dual Mode)*
