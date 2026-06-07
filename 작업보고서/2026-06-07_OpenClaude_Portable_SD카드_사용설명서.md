# OpenClaude Portable SD 카드 — 사용설명서

> 작성일: 2026-06-07
> 대상 SD 카드: 32 GB exFAT (라벨 `SD32`)
> 대상 호스트: **uttec@192.168.0.24** (Raspberry Pi 3 Model B Plus Rev 1.3)
> 참조 영상: [Run Claude Code From a USB Drive | Free And Portable (No GPU)](https://www.youtube.com/watch?v=9Dh3kKWFFjg)
> 참조 저장소: GitHub `gitlawb/openclaude` (MIT)

---

## 1. 이 SD 카드가 하는 일

### 한 줄 요약

**USB·SD 카드 1장으로 어디서든 실행되는 포터블 AI 코딩 에이전트** — 설치 없음, 호스트 PC에 흔적 0, Claude Code의 오픈소스 대안.

### 핵심 컨셉

| 항목 | 내용 |
|---|---|
| **이름** | OpenClaude Portable (Multi-Platform) |
| **본질** | Claude Code 호환 AI 코딩 에이전트 + Node.js 런타임 + 웹 대시보드를 **단일 폴더**에 패키징 |
| **사용 방식** | 카드를 PC에 꽂고 `start.sh` (Linux/Mac) 또는 `START.bat` (Windows) 실행만 하면 끝 |
| **저장 위치** | 모든 데이터(세션·키·로그)는 카드의 `data/` 폴더 안에만 — 호스트 PC 0 파일 |
| **OS 지원** | Windows · Linux · macOS (같은 카드로 3 OS 전환 가능) |

### 9 AI 공급자 지원

| Provider | 비용 | 비고 |
|---|---|---|
| NVIDIA NIM | **무료 1,000 크레딧/월** | 영상에서 권장 |
| OpenRouter | **무료 모델 다수** | GPT-OSS 등 |
| Google Gemini | 무료 티어 | aistudio.google.com |
| DeepSeek | 유료 | platform.deepseek.com |
| Anthropic Claude | 유료 | console.anthropic.com |
| OpenAI | 유료 | platform.openai.com |
| **Ollama** | 무료 + 완전 오프라인 | 로컬 CPU 추론 |
| LM Studio | 무료 + 로컬 서버 | OpenAI 호환 |
| Custom API | 공급자별 상이 | OpenAI 호환 엔드포인트 |

### 카드 현재 내용 (2026-06-07 11:06 시점)

```
/dev/sda1 (exFAT, 라벨 SD32, 30 GB, 사용 1.2 MB)
└── OpenClaude-Portable-main/         ← 이중 중첩 ⚠️ 평탄화 권장
    └── OpenClaude-Portable-main/
        ├── README.md / LICENSE / .gitignore / .gitattributes
        ├── START.bat                  ← Windows 진입점
        ├── start.sh                   ← Linux/Mac 진입점 (이번 RPi3에서 사용)
        ├── dashboard/
        │   ├── index.html             ← 웹 UI (브라우저용)
        │   └── server.mjs             ← Node.js 대시보드 서버
        └── tools/
            ├── Change_Provider.bat + change_provider.sh
            ├── Open_Dashboard.bat + open_dashboard.sh
            ├── Setup_Local_Models.{bat,sh,ps1}
            ├── install-openclaude-engine.ps1
            └── local-proxy.js          ← Ollama용 프롬프트 트리머 (90% 압축)
```

---

## 2. 이 PC (Raspberry Pi 3 Model B Plus)에서 사용 가능한가?

### 결론

> ⚠️ **부분 사용 가능** — 클라우드 API 모드만 권장. 로컬 모델·고속 사용 불가.

### 하드웨어 사양 (검증 결과)

| 항목 | 값 | 평가 |
|---|---|:-:|
| 모델 | Raspberry Pi 3 Model B Plus Rev 1.3 | — |
| CPU | ARM Cortex-A53 1.4 GHz × 4 core (aarch64) | ⚠️ 느림 |
| RAM | **905 MB total / 738 MB available** | 🔴 매우 부족 |
| 저장소 (루트) | 28 GB / 사용 3 GB / 빈 24 GB | ✅ 충분 |
| SD 카드 (USB) | 30 GB exFAT (빈 30 GB) | ✅ 충분 |
| OS | Debian 13 (Trixie) aarch64 | ✅ 최신 |
| Node.js | **미설치** (start.sh가 자동 다운로드) | ⚠️ 첫 실행 지연 |
| curl / wget / unzip | 모두 설치됨 | ✅ |
| 브라우저 | **없음** (chromium/firefox 둘 다 미설치) | ⚠️ 대시보드 접근 우회 필요 |
| 인터넷 | eth0 192.168.0.24 → 192.168.0.1 | ✅ |
| 전원 상태 | **Undervoltage 반복 감지** | 🔴 위험 |

### 사용 가능 여부 분기

| 모드 | RPi3 사용 가능? | 비고 |
|---|:-:|---|
| **클라우드 API (NVIDIA NIM / OpenRouter / Gemini)** | ⭕ 권장 | 무료, 네트워크 의존 |
| **클라우드 API (Claude / GPT-4 / DeepSeek)** | ⭕ 가능 | 유료 |
| **로컬 Ollama (gemma3:1b 800MB)** | ❌ **불가** | RAM 905MB 중 모델 800MB → OOM 거의 확실 |
| **로컬 Ollama (qwen2.5:1.5b 1GB+)** | ❌ **불가** | RAM 초과 |
| **웹 대시보드 (localhost:3000)** | △ 우회 | RPi3에 브라우저 없음 → SSH 포트포워딩으로 PC 브라우저 사용 |
| **LM Studio 연결** | △ 가능 | LM Studio는 다른 PC에서 호스팅, RPi는 클라이언트만 |

### 발생 가능한 문제 & 사전 대응

| 문제 | 원인 | 대응 |
|---|---|---|
| 🔴 **Undervoltage** 잦은 발생 | 5V 어댑터 출력 부족 | **공식 5.1V 2.5A 어댑터** 사용. USB 케이블 짧고 굵은 것 |
| 🔴 **첫 설치 매우 느림 (10–15분+)** | USB 2.0 + ARM 컴파일 | README 권고: **내장 SD에서 첫 설치 후 USB로 복사** 또는 인내 |
| 🟠 **exFAT 권한** | 마운트 시 root:root, mode 755 | 실행 비트는 유지됨 (확인됨). 단 sudo 없이 쓰기 불가 → 마운트 옵션 조정 필요 |
| 🟠 **로컬 모델 OOM** | RAM 905 MB 부족 | 로컬 모델 **사용 금지**. NVIDIA NIM 무료 권장 |
| 🟡 **대시보드 접근 불가** | 브라우저 미설치 | SSH 포트포워딩 (아래 §4 참조) |
| 🟡 **Node.js arm64 다운로드 실패** | 네트워크 또는 yt-dlp 유사 차단 | 수동 다운로드 후 `engine/node-linux-arm64/`에 배치 |

---

## 2-B. RPi4 (4GB) / RPi5 (8GB)에서 사용 시

### 결론 (한 줄)

> **RPi4 4GB = 로컬 소형 모델까지 실용**. **RPi5 8GB = 중형 모델까지 가능, Pi3 대비 5–10배 빠름**.

### 하드웨어 사양 비교

| 항목 | **RPi3 B+** (본 PC) | **RPi4 4GB** | **RPi5 8GB** |
|---|---|---|---|
| CPU 코어 | Cortex-A53 1.4 GHz × 4 | Cortex-A72 1.5 GHz × 4 | **Cortex-A76 2.4 GHz × 4** |
| 단일코어 성능 (Pi3=1.0 기준) | 1.0 | ~1.8 | **~4.0** |
| RAM | 0.9 GB | 4 GB | **8 GB** |
| USB | 2.0만 | **USB 3.0** × 2 | **USB 3.0** × 2 |
| SD I/O 실측 (USB 카드 reader) | ~30 MB/s | ~100 MB/s | ~120 MB/s |
| NVMe 옵션 | 없음 | 없음 | **PCIe Gen2 x1 (HAT)** |
| 전원 | 5V 2.5A | 5V 3A USB-C | **5V 5A USB-C PD** |
| AI 가속기 옵션 | 없음 | Coral USB | **Hailo AI HAT (13/26 TOPS)** |
| 가격대 (2026) | 단종 | ~$55 | $80 ($75) |

### 사용 가능 매트릭스

| 시나리오 | RPi3 B+ | RPi4 4GB | RPi5 8GB |
|---|:-:|:-:|:-:|
| 클라우드 API (NIM/OpenRouter/Gemini 무료) | ⭕ | ⭕⭕ | ⭕⭕⭕ |
| 클라우드 API (Claude/GPT-4 유료) | ⭕ | ⭕⭕ | ⭕⭕⭕ |
| **로컬 Ollama `gemma3:1b` (800MB)** | ❌ | ⭕ 실용 | ⭕⭕ 쾌적 |
| **로컬 Ollama `qwen2.5:1.5b` (1GB)** | ❌ | ⭕ | ⭕⭕ |
| **로컬 Ollama `phi3:mini` (2.3GB Q4)** | ❌ | △ swap 필요 | ⭕ |
| **로컬 Ollama `llama3.2:3b` (2.5GB Q4)** | ❌ | △ swap 필요 | ⭕ |
| **로컬 Ollama `qwen2.5:7b` (4.5GB Q4)** | ❌ | ❌ | △ 매우 느림 |
| **로컬 Ollama `gemma2:9b` (5.4GB Q4)** | ❌ | ❌ | △ 실용 한계 |
| 첫 설치 속도 | 10–15분 | **3–5분** | **2–3분** |
| 웹 대시보드 (내장 브라우저) | ❌ 없음 | ⭕ Chromium 가능 | ⭕⭕ 부드러움 |
| Limitless Mode (자동실행) | 비추 | ⭕ | ⭕⭕ |
| 일상 개발 PC 대체 | ❌ | △ 가능 | ⭕ 실용 |

### 로컬 모델 성능 예상치 (tokens/sec, CPU 추론, Q4)

| 모델 | RPi3 B+ | **RPi4 4GB** | **RPi5 8GB** |
|---|:-:|:-:|:-:|
| `gemma3:1b` | OOM | ~8 t/s | **~20 t/s** |
| `qwen2.5:1.5b` | OOM | ~6 t/s | **~15 t/s** |
| `phi3:mini` (2.3GB) | OOM | ~3 t/s (swap) | **~8 t/s** |
| `llama3.2:3b` | OOM | ~2 t/s (swap) | **~6 t/s** |
| `qwen2.5:7b` | OOM | OOM | ~2 t/s |
| 첫 토큰 지연 (1b 모델) | — | 5–10s | **2–5s** |

> 위 수치는 OpenClaude의 **Local Speed Proxy** (프롬프트 90% 트리밍, `tools/local-proxy.js`) 적용 기준. 미적용 시 첫 토큰 지연 60–120s로 악화.
> RPi5 + Hailo AI HAT (13 TOPS) 조합은 Ollama가 직접 지원하지 않으므로 본 카드로는 가속 불가. 별도 vLLM/llama.cpp + HailoRT 통합 필요.

### RPi4 4GB 추가 권장

| 항목 | 권장 |
|---|---|
| 모델 선택 | `gemma3:1b` 또는 `qwen2.5:1.5b` (RAM 여유, 코딩 task 적합) |
| swap 설정 | `phi3:mini` 이상 쓸 경우 swap 2GB → 4GB 증설 (`sudo dphys-swapfile` 편집) |
| 전원 | **공식 USB-C 5V 3A 어댑터** 필수 (Undervoltage 시 throttling) |
| 냉각 | 능동 팬 또는 알루미늄 케이스 (장시간 추론 시 thermal throttling 방지) |
| SD 카드 | A2 등급 microSD 권장. 또는 **SSD를 USB 3.0으로 직결** (속도 2–3배) |
| OS | Raspberry Pi OS 64-bit (Bookworm 이상) — 32-bit 사용 금지 |
| 브라우저 대시보드 | Chromium 내장, `http://localhost:3000` 직접 접근 가능 |

### RPi5 8GB 추가 권장

| 항목 | 권장 |
|---|---|
| 모델 선택 | `phi3:mini`·`llama3.2:3b` 권장. `qwen2.5:7b`까지 시험 가능 (느림) |
| 저장소 | **NVMe HAT + M.2 SSD** 강력 권장 — Ollama 모델·세션 IO 4–5배 향상 |
| 전원 | **공식 USB-C 5V 5A PD 어댑터** 필수 (5V 3A로는 USB peripheral 제한됨) |
| 냉각 | **공식 Active Cooler 필수** (CPU 80℃ 도달 시 throttling, 추론 속도 30%+ 감소) |
| AI 가속 | Hailo AI HAT (13/26 TOPS) — 본 카드 컨셉(Ollama)에는 미통합. 자체 추론 stack 구축 시만 의미 |
| 브라우저 대시보드 | Chromium·Firefox 모두 부드럽게 동작 |
| 일상 개발 | VS Code + Claude Code 호환 사용 실용적. PC 대체 일부 가능 |

### 이 PC(RPi3)에서 본 카드를 RPi4·5로 옮길 때

본 카드는 OS 비의존이므로 **RPi3에서 RPi4·5로 옮겨도 그대로 동작**합니다. 단:

1. `engine/node-linux-arm64/` 폴더는 동일 (aarch64 공유) → 재다운로드 불필요
2. `engine/node_modules/` 도 공유 가능 (npm 패키지가 native binding 없는 한)
3. `data/ai_settings.env` 의 API 키·공급자 설정 그대로 유지
4. `data/openclaude/` 세션 히스토리도 그대로 인계
5. **로컬 Ollama 모델 (`data/ollama/`)도 그대로** — RPi5에서 다운로드한 모델을 RPi4에서도 즉시 사용 가능

> 운영 팁: **RPi5에서 첫 설치 + Ollama 모델 다운로드 → 카드를 RPi3·4에 옮겨 클라우드 모드로 활용** 패턴이 시간·전기 측면에서 최적.

### 본 컨셉의 실용 권장 조합 (2026 기준)

| 용도 | 권장 하드웨어 | 본 카드 활용 모드 |
|---|---|---|
| **PC 출장지 임시 코딩** (영상 본질) | 일반 노트북/데스크탑 (Windows/Mac/Linux) | 클라우드 API |
| **저전력 24h 자동화 서버** | RPi5 8GB + NVMe SSD | 로컬 Ollama `phi3:mini` |
| **데모/교육 시연** | RPi4 4GB | 클라우드 API + 대시보드 시연 |
| **현장 진단/측정 보조** | RPi3 B+ | 클라우드 API만 (단순 스크립트 생성) |
| **현장 영업 시연** (UTSOL·Ponet) | RPi5 + 7" 터치 디스플레이 | 대시보드 + NIM 무료 |

---

## 3. 사용 절차 (RPi3 — Linux)

### 3-A. 준비 단계 (✅ 이미 완료된 항목 표시)

- [x] SD 카드 exFAT 포맷 (라벨 SD32)
- [x] OpenClaude-Portable-main 압축 해제하여 카드에 복사
- [x] RPi3 USB에 SD 카드 reader 연결
- [x] RPi3에서 카드를 `/mnt/sdcard`에 마운트 (현재 상태)
- [ ] 이중 중첩 폴더 평탄화 (선택)
- [ ] 마운트 옵션 변경 (uttec 사용자 쓰기 권한)
- [ ] NVIDIA NIM 또는 OpenRouter API 키 발급
- [ ] 전원 어댑터 점검 (Undervoltage 해소)

### 3-B. 1회만: 마운트 옵션 변경 (uttec 사용자가 쓸 수 있도록)

현재 마운트 상태에서는 `uttec`이 카드에 파일을 쓸 수 없습니다 (root 소유). 한 번 unmount 후 사용자 권한으로 재마운트:

```bash
ssh uttec@192.168.0.24
sudo umount /mnt/sdcard
sudo mount -o uid=1000,gid=1000,umask=0022 /dev/sda1 /mnt/sdcard
ls -la /mnt/sdcard/   # 소유자가 uttec:uttec으로 보여야 정상
```

### 3-C. 1회만: 이중 중첩 평탄화 (선택, 권장)

```bash
cd /mnt/sdcard
mv OpenClaude-Portable-main OpenClaude-Portable-main.tmp
mv OpenClaude-Portable-main.tmp/OpenClaude-Portable-main OpenClaude-Portable-main
rmdir OpenClaude-Portable-main.tmp
ls -la OpenClaude-Portable-main/   # README.md, start.sh 등이 바로 보여야 함
```

### 3-D. 첫 실행

```bash
cd /mnt/sdcard/OpenClaude-Portable-main
chmod +x start.sh
./start.sh
```

자동으로 다음이 진행됩니다 (네트워크 필요, 10–15분 소요 예상):

1. Node.js 22.14.0 (linux-arm64 빌드) 다운로드 → `engine/node-linux-arm64/`
2. OpenClaude 엔진 npm 설치 → `engine/node_modules/@gitlawb/openclaude/`
3. AI 공급자 선택 메뉴 출력

### 3-E. 공급자 선택 (NVIDIA NIM 권장)

1. 메뉴에서 `NVIDIA NIM` 선택
2. https://build.nvidia.com 에서 무료 계정 생성 → API 키 발급
3. 키 입력
4. 모델 선택 → **Quantized 모델 권장** (영상 권고, 코딩 작업에 적합)

설정 완료 후 `data/ai_settings.env` 파일에 저장됨 (카드에만 박제, 호스트 PC 0).

### 3-F. 일상 사용 (2회차 이후)

```bash
ssh uttec@192.168.0.24
cd /mnt/sdcard/OpenClaude-Portable-main
./start.sh
```

메인 메뉴 (10초 후 1번 자동 선택):

| # | 옵션 | 설명 |
|:-:|---|---|
| 1 | **Launch AI (Normal Mode)** | 파일 쓰기·셸 실행 전 승인 요청 (권장) |
| 2 | Limitless Mode | 완전 자동 (승인 없음) — RPi3에서는 비추 |
| 3 | **Open Dashboard** | 브라우저 UI (http://localhost:3000) |
| 4 | Change Provider | 공급자·API 키 변경 |
| 5 | Setup Offline | 로컬 Ollama 모델 다운로드 — **RPi3 RAM 부족, 사용 금지** |

종료: `Ctrl + C`

---

## 4. 웹 대시보드 접근 (PC 브라우저 사용)

RPi3에 브라우저가 없으므로 SSH 포트포워딩으로 본 PC의 Chrome에서 접근합니다.

### 4-A. PC 측 (PowerShell, 별도 터미널)

```powershell
ssh -L 3000:localhost:3000 uttec@192.168.0.24
# 비번: uttec
```

위 터미널을 켜둔 상태에서:

### 4-B. PC 브라우저

Chrome 주소창에 `http://localhost:3000` 입력 → OpenClaude 대시보드 표시.

### 4-C. 대시보드 시작 (RPi3 측 별도 SSH)

```bash
cd /mnt/sdcard/OpenClaude-Portable-main
./start.sh   # → 메뉴 3번 선택 (Open Dashboard)
```

또는 `./tools/open_dashboard.sh` 직접 실행.

---

## 5. 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `Node.js not found` | 첫 실행 자동 다운로드 실패 | `engine/node-download.log` 확인. 네트워크 또는 [nodejs.org](https://nodejs.org/en/download) 수동 다운로드 |
| `Installing OpenClaude Engine` 멈춤 | USB 2.0 느림 | **10–15분 인내**. 또는 내장 SD에 먼저 설치 후 USB로 복사 |
| `EADDRINUSE: port 11435` | 이전 세션 프록시 잔존 | `start.sh` 재실행 (자동 kill) |
| `port 3000 already in use` | 대시보드 이미 실행 중 | `http://localhost:3000` 바로 접근 |
| 응답 매우 느림 | Ollama 로컬 모델 사용 | 클라우드 API로 전환 (RPi3는 로컬 비추) |
| API key rejected | 키 만료 또는 오기재 | 옵션 4로 재입력 |
| Permission denied (exFAT) | 마운트 시 root 소유 | §3-B 마운트 옵션으로 재마운트 |
| Undervoltage 경고 | 전원 부족 | 5.1V 2.5A 정품 어댑터 + 짧은 USB-MicroB 케이블 |

---

## 6. 보안·프라이버시

- **Zero Footprint**: `XDG_CONFIG_HOME`·`XDG_DATA_HOME`·`CLAUDE_CONFIG_DIR` 환경변수가 모두 카드의 `data/`로 리다이렉트 → 호스트 PC 흔적 0
- **No Telemetry**: 선택한 AI 공급자 외에는 외부 송신 없음
- **API 키 위치**: `data/ai_settings.env` (카드 내부만)
- **승인 모드**: Normal Mode는 파일 쓰기·셸 실행 전 매번 확인
- ⚠️ **카드 분실 위험**: 키·세션 히스토리 모두 카드 안. 분실 시 즉시 공급자 콘솔에서 키 회수

---

## 7. 권장 사용 시나리오

| 시나리오 | RPi3에서 적합도 | 비고 |
|---|:-:|---|
| 출장지 호텔 PC에서 임시 코딩 | ⭕⭕ | 본 컨셉의 핵심. RPi3 아닌 PC 직결 권장 |
| 회의실 공유 PC에서 호스트 흔적 없이 사용 | ⭕⭕ | 본 컨셉의 핵심 |
| **RPi3에서 단순 자동화 스크립트 생성** | ⭕ | NVIDIA NIM 클라우드 모드 |
| RPi3에서 큰 프로젝트 코딩 | △ | 가능하나 PC가 훨씬 빠름 |
| RPi3에서 로컬 LLM 추론 | ❌ | RAM 부족, **사용 금지** |
| RPi3에서 데모·교육 시연 | ⭕ | "포터블 AI" 컨셉 강의용 적합 |

---

## 8. 다음 액션 체크리스트

이 카드를 실제로 사용하려면 아래 순서로 진행:

- [ ] 1. RPi3 전원 어댑터 교체 (5.1V 2.5A) → Undervoltage 해소
- [ ] 2. `/mnt/sdcard` 재마운트 (uid=1000 옵션, §3-B)
- [ ] 3. 이중 중첩 평탄화 (§3-C, 선택)
- [ ] 4. NVIDIA NIM 계정 + API 키 발급 (build.nvidia.com)
- [ ] 5. RPi3에서 `./start.sh` 실행 (첫 회 10–15분 대기)
- [ ] 6. 공급자 NVIDIA NIM 선택 → 모델 선택
- [ ] 7. 본 PC에서 SSH 포트포워딩 (3000) → 브라우저 대시보드 접근

---

## 9. 참고 자료

- 영상: https://www.youtube.com/watch?v=9Dh3kKWFFjg (5분 set up & demo)
- 본 카드 README: `/mnt/sdcard/OpenClaude-Portable-main/OpenClaude-Portable-main/README.md`
- 본 카드 ZIP 원본: GitHub `gitlawb/openclaude-portable` (확인 필요)
- OpenClaude 엔진: GitHub `gitlawb/openclaude`
- 본 PC 별도 분석 노트: `유투브/Claude_Code_USB_포터블_OpenClaude_상세.md` (IDE 열림)

---

## 10. 검증 로그 (2026-06-07)

- SSH 접속: `uttec@192.168.0.24` (비번: uttec) → 정상
- 하드웨어 식별: Raspberry Pi 3 Model B Plus Rev 1.3, aarch64, RAM 905 MB
- SD 카드 식별: `/dev/sda1` exFAT 30 GB (라벨 SD32), USB reader = Super Top microSD (14cd:1212)
- 카드 마운트: `/mnt/sdcard` (root 소유 — 재마운트 필요)
- ZIP 파일 삭제: `OpenClaude-Portable-main.zip` (77.5 KB) — 사용자 요청으로 제거 완료
- 전원: Undervoltage 반복 감지 → 어댑터 점검 권장

**작성**: mywiki-claude (홍광선 UTTEC, 2026-06-07)
