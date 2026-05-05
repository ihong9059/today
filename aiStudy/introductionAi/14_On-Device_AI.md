# On-Device AI 가이드 (Ollama, MLX, TinyML)

## 1. On-Device AI란?
- 클라우드 API 대신 **내 노트북·폰·임베디드 보드에서 AI 모델을 직접 실행**하는 방식
- 2025~2026년이 변곡점: SLM(소형 언어모델, 1B~14B) + NPU(40~80 TOPS)가 보편화
- 외부 데이터 전송 0 → 프라이버시·비용·속도 3가지 동시 해결
- 본 가이드는 **노트북(Ollama) → 폰(MLX) → 임베디드(TinyML)** 순으로 단계적 실습

> 더 깊은 분석은 `aiOnDevice/README.md` 11섹션 참조 (모델 계층, 하드웨어 계층, 시장 동향)

---

## 2. 왜 지금 (2026 시점)
| 측면 | 2024년까지 | 2026년 5월 현재 |
|------|-----------|---------------|
| 모델 크기 | 70B+ 클라우드 의존 | **1B~14B SLM이 실용 영역 점령** |
| 추론 속도 | 수 초 (왕복) | **20~30 토큰/초** 폰에서 |
| 양자화 | FP16 기본 | **4-bit Q4 표준** (650MB로 1B 적재) |
| NPU | 10~30 TOPS | **80 TOPS** (Snapdragon X2 Elite) |
| 비용 | API 호출당 과금 | **추론 비용 0** (전기료만) |

**핵심**: 3년 전 데이터센터에서만 가능했던 능력이, 2026년 노트북·폰·SBC에서 실시간 작동.

---

## 3. 모델 계층 — 어떤 크기를 어디에서?

| 크기 | 대표 모델 (2026.05) | 가용 디바이스 | 메모리(Q4) | 토큰/초 |
|:----:|------------------|------------|---------|:----:|
| <300M | SmolLM2 135M, Gemma 3 270M | MCU+, 라즈베리파이 | ~150MB | 50+ |
| 1B~3B | **Llama 3.2 1B/3B**, Phi-4 mini 3.8B | 스마트폰, 노트북 | 650MB~2GB | 20~30 |
| 7B~14B | Llama 3.x 7B, Mistral 7B, **Phi-4 14B** | 노트북 (16GB+) | 4~8GB | 8~20 |
| 70B+ | Llama 3.1 70B, Qwen 2.5 72B | 워크스테이션 | 35GB+ | 1~5 |

> 본 가이드 실습은 **Llama 3.2 3B** (Q4, 약 2GB) 기준 — 일반 노트북 16GB RAM에서 실시간 동작

---

## 4. 노트북에서 SLM 실행 (Ollama)

### 4.1 Ollama 설치
**Windows**
1. https://ollama.com/download 접속 → "Download for Windows" 클릭
2. 다운로드된 `OllamaSetup.exe` 실행
3. 설치 완료 후 자동으로 백그라운드 서비스 시작

**설치 확인**
```bash
ollama --version
```
출력 예: `ollama version 0.5.x`

### 4.2 첫 모델 다운로드 + 실행
```bash
ollama run llama3.2:3b
```
- 첫 실행 시 약 2GB 다운로드 (5~10분 소요)
- 다운로드 완료 후 바로 대화 가능
- 종료: `/bye` 입력 또는 Ctrl+C

**실행 예시**
```
>>> 안녕, 너는 어떤 모델이야?
저는 Meta의 Llama 3.2 모델입니다. 30억 파라미터 크기로 노트북에서도
빠르게 동작하도록 설계되었습니다.

>>> /bye
```

### 4.3 다른 모델 시도
```bash
# 더 작은 모델 (1B, 빠름)
ollama run llama3.2:1b

# 더 큰 모델 (7B, 정확도 ↑, 메모리 8GB+ 필요)
ollama run llama3.1:8b

# 한국어 특화 (Qwen)
ollama run qwen2.5:3b

# 코드 특화
ollama run qwen2.5-coder:3b
```

### 4.4 설치된 모델 관리
```bash
# 목록 보기
ollama list

# 삭제
ollama rm llama3.1:8b

# 정보 확인
ollama show llama3.2:3b
```

### 4.5 API로 호출 (Python)
Ollama는 자동으로 `http://localhost:11434`에서 REST API 제공.

```python
import requests

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "llama3.2:3b",
        "prompt": "ESP32에서 BLE Mesh를 시작하는 5단계를 알려줘",
        "stream": False,
    },
)
print(response.json()["response"])
```

→ **이 시점에서 클라우드 API 호출 0번. 인터넷 끊어도 동작.**

---

## 5. VS Code에서 로컬 모델로 코딩 (Continue 확장)

### 5.1 Continue 확장 설치
1. VS Code 좌측 확장 탭 (Ctrl+Shift+X)
2. "Continue" 검색 → 설치
3. 좌측 사이드바에 Continue 아이콘 추가됨

### 5.2 Ollama 연결 설정
1. Continue 사이드바 → 우측 상단 톱니바퀴 → "Open config.json"
2. `models` 섹션을 다음과 같이 수정:
```json
{
  "models": [
    {
      "title": "Llama 3.2 3B (로컬)",
      "provider": "ollama",
      "model": "llama3.2:3b",
      "apiBase": "http://localhost:11434"
    },
    {
      "title": "Qwen Coder 3B (로컬)",
      "provider": "ollama",
      "model": "qwen2.5-coder:3b",
      "apiBase": "http://localhost:11434"
    }
  ]
}
```

### 5.3 사용
- 코드 블록 선택 → Ctrl+L → "이 함수를 설명해줘"
- 인라인 자동완성: 입력 중 Tab으로 수락
- **모든 컨텍스트가 로컬에 머묾** — 회사 코드를 외부 LLM에 보내지 않음

> **UTTEC 적용**: 외벽청소로봇 펌웨어 코드, 양산 비즈 로직 같은 IP 보호 영역에서 매우 중요

---

## 6. Apple Silicon에서 MLX (선택)

### 6.1 MLX란?
- Apple이 만든 Apple Silicon(M1~M5) 전용 머신러닝 프레임워크
- Unified Memory 최적화 → CPU/GPU/Neural Engine 메모리 공유
- LLM 추론이 매우 빠름 (Llama 3.2 3B → M2 Air에서 30+ 토큰/초)

### 6.2 설치 (Mac 전용)
```bash
pip install mlx mlx-lm
```

### 6.3 모델 다운로드 + 실행
```bash
# Hugging Face에서 4-bit 양자화 모델 다운로드 후 실행
mlx_lm.generate \
  --model mlx-community/Llama-3.2-3B-Instruct-4bit \
  --prompt "한국어로 자기소개를 해줘"
```

### 6.4 Python에서 사용
```python
from mlx_lm import load, generate

model, tokenizer = load("mlx-community/Llama-3.2-3B-Instruct-4bit")
response = generate(
    model, tokenizer,
    prompt="ESP32-S3에서 TinyML 추론을 시작하려면?",
    max_tokens=200,
)
print(response)
```

> **참고**: Windows/Linux 사용자는 4번(Ollama)으로 충분. MLX는 Mac M-시리즈 전용 최적화.

---

## 7. 임베디드에서 TinyML (ESP32-S3)

### 7.1 TinyML이란?
- 마이크로컨트롤러(MCU)에서 AI 모델을 돌리는 분야
- 모델 크기 < 300KB, 메모리 < 256KB, 추론 시간 < 100ms
- 사례: 음성 wake word ("Hey Alexa"), 진동 이상 감지, 동작 분류, 환경 모니터링

### 7.2 ESP32-S3 선택 이유
- 벡터 명령 (SIMD) 내장 → NN 가속
- Wi-Fi + BLE 직접 통신
- ~5,000원/개 (양산 기준)
- TFLite Micro 공식 지원

### 7.3 개발 환경
```bash
# Arduino IDE 또는 PlatformIO 설치 필요 (별도 가이드 참조)

# PlatformIO 예시 platformio.ini
[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
lib_deps =
  https://github.com/tensorflow/tflite-micro-arduino-examples
```

### 7.4 첫 예제: Hello World (sine wave 예측)
TFLite Micro 공식 예제 (~10KB 모델):
```bash
git clone https://github.com/tensorflow/tflite-micro-arduino-examples
```
- `examples/hello_world/` 폴더의 `.ino` 파일을 Arduino IDE에서 열기
- ESP32-S3 보드 선택 → 업로드
- 시리얼 모니터에서 sine wave 예측값 확인

### 7.5 다음 단계 — 음성 키워드 인식
- `examples/micro_speech/` — "yes"/"no" 인식 (300KB 모델)
- 마이크(I2S) 연결 → 실시간 음성 분류
- 학습은 PC에서 (Edge Impulse 또는 TensorFlow), 추론만 ESP32에서

> **UTTEC 적용 후보**: AI FanStick 다음 버전 wake word, 외벽청소로봇 음성 명령

---

## 8. 응용 사례 (UTTEC 관점)

### 8.1 노트북 SLM — 영업/개발 즉시 활용
- 견적서 자동 초안 작성 (Ollama + 회사 템플릿)
- 외벽청소로봇 펌웨어 코드 리뷰 (Continue + Qwen Coder)
- **차별화 카피**: "외부 LLM에 회사 코드를 보내지 않습니다"

### 8.2 스마트팩토리 Edge AI
- Jetson Orin Nano + Ollama로 라인 사이드 SLM 추론
- Hailo-8(26 TOPS @ 2.5W)로 24/7 비전 검사
- **차별화 카피**: "공장 데이터는 공장 내부에 머무릅니다"

### 8.3 AI FanStick (응원봉)
- 현재: ESP32-C3 룰 기반
- 다음 버전: ESP32-S3 + TinyML wake word + Llama 3.2 1B BLE 게이트웨이
- **차별화 카피**: "외부 인터넷 0%, 응원봉 자체 AI"

### 8.4 영업 결정타 카피
> **"클라우드 AI는 매달 비용을 청구합니다. UTTEC는 한 번 구축으로 평생 무료입니다."**
>
> Phi-4 14B 노트북 1대로 매일 1만 쿼리를 돌리면 전기료 30,000원/월.
> 같은 일을 GPT-5 API로 하면 월 5,000만원. 1년 5억 vs 36만 = **1,400배 절감**.

---

## 9. 다음 단계 (학습 로드맵)

### 1주차 — Ollama 마스터
- [ ] Llama 3.2 3B 설치 + 대화
- [ ] Qwen Coder로 VS Code 통합 (Continue)
- [ ] Python으로 REST API 호출
- [ ] 본인 업무 용도 1건 자동화 (예: 견적서 초안)

### 2주차 — 비교 + 선택
- [ ] Llama 3.2 1B / 3B / Phi-4 mini 3.8B 비교
- [ ] 한국어는 Qwen vs Llama 평가
- [ ] 사용 목적별 모델 매트릭스 정리

### 3주차 — 임베디드 시도
- [ ] ESP32-S3 보드 1개 입수 (~10,000원)
- [ ] PlatformIO + TFLite Micro 환경 구축
- [ ] hello_world 예제 업로드 + 실행

### 4주차 — 본인 사업 연결
- [ ] UTTEC 양산 제품 중 SLM 통합 후보 1건 선정
- [ ] On-Device AI 영업 자료 1페이지 작성
- [ ] 시범 고객(태명과학/한국기계) 1곳 시연

---

## 10. 참고 자료
- [Ollama 공식](https://ollama.com/)
- [Ollama 모델 라이브러리](https://ollama.com/library)
- [Continue VS Code 확장](https://www.continue.dev/)
- [Apple MLX GitHub](https://github.com/ml-explore/mlx)
- [llama.cpp GitHub](https://github.com/ggerganov/llama.cpp) (C++ 단일 바이너리)
- [TFLite Micro GitHub](https://github.com/tensorflow/tflite-micro)
- [Edge Impulse](https://www.edgeimpulse.com/) (TinyML 노코드 학습)
- 본 저장소: [`aiOnDevice/README.md`](../../aiOnDevice/README.md) — 11섹션 종합 분석
- 본 저장소: [`aiOnDevice/humanoid.md`](../../aiOnDevice/humanoid.md) — 휴머노이드 양산 동향
- 본 저장소: [`aiOnDevice/sdv.md`](../../aiOnDevice/sdv.md) — 차량 SDV
- 본 저장소: [`aiOnDevice/federated-learning.md`](../../aiOnDevice/federated-learning.md) — Federated Learning

---

> **변경 이력**: 2026-05-05 — Track F (On-Device AI) 신설, 13가이드 → 14가이드 확장
