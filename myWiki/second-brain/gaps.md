---
title: 부족한 부분
type: identity
created: 2026-04-19
updated: 2026-04-19
tags: [부족, 개선, 학습]
links: [me, skills, ai-direction, strengths, goals]
---

# 부족한 부분 (채워야 할 것)

## ESP-DSP intrinsics 함정 패턴 (2026-05-21 신설, Round 17/17.5 흡수)

### #18 — `dsps_dp_s8_aes3` API 4 args 고정
5번째 인자 `0` 추가 시 `too many arguments to function` build fail. ESP-DSP MLP 패치 (`mlp_skeleton_dsp.c`)의 호출 형식이 ground truth: `(src1, src2, &result, N)`. 4 args 외 사용 금지.

### #19 — PSRAM 안에서 ESP-DSP intrinsics 효과 무효
TF 484 PSRAM에서 가속 0.94× (6% 느림). memory bandwidth bottleneck이 compute 가속을 상쇄. MLP 1024 PSRAM은 예외적으로 2.66× (large contiguous access pattern 덕분). → 차세대 SLM은 SRAM 또는 작은 PSRAM 모델 sweet spot.

### #20 — CNN conv strided access는 dsps_dp_s8 직접 적용 불가
W[oc,ic,ky,kx] × in[ic,y+ky,x+kx]는 stride 9 (W) + spatial offset (in). contiguous N elements dot product API와 호환 안 됨. im2col + matmul 변환 필요 (mandate 범위 외). esp-nn 또는 TFLM esp-nn delegate가 대안.

### #21 — LX6/RISC-V에서 ESP-DSP 적용은 손해
esp32wroom (LX6) MLP 128: plain C 2,458us → ESP-DSP ansi fallback 3,793us = **1.54× 느림**. 함수 호출 overhead + boundary check가 단순 for 루프보다 비쌈. ESP-DSP는 esp32s3 LX7 (`aes3` AI Vector Instruction) 전용 가치. **C3 양산 보드에서 ESP-DSP 적용 = 손해 → 칩 교체 (C3→S3) 동반 필수**.

## 기술적 갭

### 딥러닝/ML 심화
- MNIST(99.32%), 볼트 검사(MobileNetV3) 수준 — 모델 설계/학습 직접 경험 제한적
- 현재 대응: Google Colab + 교육용 노트북 13개로 실습 중
- 필요 시점: 온디바이스 AI 사업 확장 시

### 프론트엔드 디자인
- 기능은 구현하지만, 시각적 디자인 품질이 부족
- **Claude Design (2026-04-17 출시)로 해결 가능**: 텍스트→디자인, 프로토타입, 슬라이드 생성
- Figma MCP 학습은 불필요 — Claude Design이 더 간단하고 통합적
- 다음 단계: Claude Design 실제 사용해보기

### 비즈니스/마케팅
- 기술 구현에 비해 사업화/수익화 경험 부족
- 위시캣 외 영업 채널 다양화 필요
- 위시캣 시장에서 임베디드 매칭률이 매우 낮음 (5% 미만)

### MCP / AI 에이전트
- Claude Code Skill은 활용하지만, MCP 서버 직접 개발 경험 없음
- AI 에이전트 프레임워크 학습 필요

## 구조적 갭

### 동시성/확장성
- 동시 빌드 문제 미해결 (교육 현장 10명+ 동시 사용)
- 단일 서버 구조의 한계
- 큐 시스템/워커 풀 도입 필요

### 지속적 이월 패턴
작업보고서 분석에서 발견된 패턴:
- **관리/행정 업무가 기술 개발에 밀려 지속 후순위**
- Pi B3 Docker (19일+ 이월 후 소멸)
- 회사소개서, 홈페이지 콘텐츠 (이월 반복 후 소멸)
- Notion MCP 연동 (이월 반복)
- Google Play 배포 (이월 반복)
- **대응**: 관리 업무를 배치로 처리하는 주간 루틴 도입 검토

### 계획 vs 실행 불일치
- 할일 0% 달성 + 신규 작업 100% 달성하는 날이 반복
- 계획된 작업보다 즉흥적 기술 작업에 끌리는 성향
- **대응**: 필수 관리 업무는 아침에 먼저 처리

### 문서화/체계화
- 빠른 실행의 이면: 문서화가 뒤따라가지 못함
- 이 Second Brain 위키가 그 갭을 채우는 시도

## 위시캣 시장 갭

### 시장 미스매치
- 위시캣 시장은 웹/앱/디자인이 대다수
- 임베디드/IoT는 소수 → 328건 검토해도 매칭 0~2건/주
- **대응**: 다른 채널 탐색 (직접 영업, 산업 전시회, 기술 블로그)

### 수주 결과 추적 부재
- 16건+ 지원 중 1건 수주 확인 (#153090 nRF52 스마트팜, 진행 중)
- 나머지 15건의 결과(수주/탈락) 미추적
- **대응**: 지원 결과를 체계적으로 추적하여 성공 패턴 분석

## 현장 배포 함정 패턴 (2026-05-12 신설 — revitaWiki ingest #8 흡수)

> "1인이 직접 시공·운용까지 하는 사업 모델"에서 **현장 배포 첫 24시간에 만나는 함정**들. 강의·교재 자산으로도 활용 가치 ★★★.
> 출처: `revitaProject/application/revitaWiki/improvement/gotcha-*.md`

### USB 동글 식별 충돌 (CP2104 S/N 동일)

같은 모델 USB-UART 동글들이 공장 출고 시 **동일 시리얼 번호**를 가짐. `/dev/ttyUSB0` 같은 단순 매핑은 부팅마다 달라짐.
- **회피책**: USB 허브 물리 포트로 구분 → `udev rule`에 `ID_PATH` 사용 / 라벨 부착 / 최후의 수단으로 EEPROM 재프로그래밍
- **대응 정책**: 양산·현장 시리얼 매핑 시 처음부터 ID_PATH 기반 udev rule 작성
- **관련 프로젝트**: revita Solar Monitor (5/12 진단), 골프수조·AISG 등 다수 동글 운용 시 동일

### RPi USB Undervoltage (현장 배포 핵심 함정)

라즈베리파이 USB 허브 전원 부족 시 **새 장치 인식 실패 + 기존 file descriptor `(deleted)` 상태**로 빠짐. 외관상 정상이지만 통신 실패.
- **회피책**: **powered USB hub 필수** + 공식 어댑터 사용 + `vcgencmd get_throttled` 정기 모니터링
- **대응 정책**: 농촌·외부 배포 시 전원 마진 사전 측정
- **관련 프로젝트**: revita Solar (5/12 발생), [[한림용인cc-고가수조]] (시공 직전 — 사전 회피 필요)

### 외부 CDN 의존 (Chart.js CDN 오프라인)

라즈베리파이 현장 환경의 인터넷 불안정 → 외부 CDN(jsdelivr 등) 접속 실패 → Web UI 차트 로딩 안 됨.
- **회피책**: 정적 자원 **로컬 호스팅 정책** (`static/chart.min.js` 직접 포함)
- **부수 함정**: Flask deque maxlen / 템플릿 캐시도 비슷한 함정
- **대응 정책**: 현장 배포 Web UI 모든 프로젝트에 일반화 — AISG·골프수조·smartFactory 등
- **관련 프로젝트**: revita Solar (5/11 정책 확정)

→ **이 3건은 강의 콘텐츠 자산**: 호오컨설팅·인프런·강사양성 교재의 "1인 시공 함정 패턴" 사례. [[한림용인cc-고가수조]] 시공 시 사전 회피 체크리스트로 활용.

## 자동화/스크립팅 함정 패턴 (2026-05-15 신설 — onDevice_AI ingest #1 흡수)

> Claude Code multi-agent + n8n 자동화 본격 도입(5/15 megasession)에서 발견된 셸·자동화 영역 함정. 강의 자산으로도 활용 가능.

### bash heredoc 변수 expansion 손실 (n8n expression 사고)

`<<EOF` (no quote) 사용 시 shell이 heredoc 내부 `$json.var` 같은 변수를 자기 변수로 해석하여 **expansion 후 빈 문자열 또는 임의 값으로 치환됨**. n8n expression 같은 외부 DSL을 heredoc으로 전달할 때 expression이 통째로 손실됨.
- **회피책**: **단일 quote heredoc 표준** — `<<'EOF'` (앞에 따옴표). 또는 `\$` 백슬래시 escape.
- **대응 정책**: shell heredoc으로 외부 DSL/JSON/SQL 전달 시 무조건 `<<'EOF'`. 가독성 차이 미미, 사고 차이는 큼.
- **관련 사례**: 5/15 n8n Test_Ubuntu_n8n 워크플로우 import 시 expression 손실. import 성공 후 trigger 결과 값이 빈 문자열로 들어와서 발견 (사후 진단).

### Mac↔Windows·Linux Python 버전 차이 (n8n npm 회피 → Docker)

Ubuntu에 `npm install -g n8n` 시 latest는 Node 22 강제 (NodeSource Node 20 호환 한계) → npm은 자동으로 호환 마지막 버전인 2.8.4로 fallback. 즉 **silent downgrade**.
- **회피책**: n8n는 **Docker 패턴 표준** (revita odroidc2와 일관). Node 격리 + 워크플로우 마이그레이션 호환.
- **대응 정책**: 서버에 nodejs 도구 설치 시 Docker로 격리하는 패턴을 1순위. npm 글로벌 install은 2순위.
- **관련 사례**: 5/15 Ubuntu Mac→리눅스 컨버전 후 n8n 셋업. npm 2.8.4로 1회 가동 후 Docker 2.20.7-exp.0로 마이그레이션 (~30분 소요).

### Gmail App Password 채팅 노출

Claude 세션 중 SMTP 셋업하면서 App Password를 평문으로 노출. Anthropic 로그·Notion sync 등 잠재 경로에 영구 박제 가능.
- **회피책**: 민감 토큰은 **별도 채널** (PC 직접 키 등록 + Claude는 "이미 등록함" 정도만 통보).
- **대응 정책**: App Password / API key / DB password 등은 처음부터 환경변수 파일에 두고 Claude에게는 파일 경로만. 한 번 노출되면 즉시 폐기 + 재발급.
- **관련 사례**: 5/15 megasession Gmail App Password `rdachuzebgzoappa` 노출 → 폐기 권장 박제 (작업보고서 5/15 § 중요 정보).

→ **이 3건은 자동화 강의 자산** + 1인 운영 함정 시리즈에 추가 가능. multi-core/AI 자동화 코스 사례로 직접 활용.

### E22 LoRa Config 모드 baud 9600 함정 (2026-05-19 박제)

E22-400T/900T LoRa 모듈 펌웨어 작성 시 Config 모드(M0=0, M1=1)의 UART baud를 **REG0 SPED 값과 무관하게 9600 고정**으로 처리해야 함. 다른 baud로 시도하면 응답 0 byte → "모듈 lock" 잘못된 결론 → 시간 손실 반복.
- **같은 함정 3회 반복**: 5/9 (반나절) / 5/19 1차 (수 시간) / 5/19 2차 (mode mapping 추가 잘못)
- **회피책**: ① Config 모드 진입 즉시 `uart_configure(baud=9600)` ② Mapping B 확정 (Config=M0=0 M1=1 / Sleep=M0=1 M1=1 UART OFF) ③ AUX HIGH 폴링 ④ 응답 prefix 항상 C1
- **대응 정책 — 3중 박제**:
  1. `~/.claude/projects/C--todo-today/memory/feedback_e22_900t_config_baud.md` (MEMORY.md 인덱스, 모든 세션 자동 로드)
  2. `oldProject/test/bleModule/lora_e22/GOTCHA.md` (폴더 재작업 시 즉시 시야, gitignored 로컬)
  3. `oldProject/test/bleModule/lora_e22/AT_COMMANDS.md` (5/10 박제)
- **관련 사례**: 한림용인CC 1,000만 시공 D-day 검증 (5/19) — 같은 함정 ~수 시간 손실 → 5/20 시공에 영향 없도록 박제 강화.

→ **AI·임베디드 강의 자산** + 1인 운영 함정 시리즈 핵심 사례 (Mapping 부정확성 + UART runtime 전환 + 디버그 채널 분리 복합 함정).

## 임베디드 측정·빌드 함정 패턴 (2026-05-20 신설 — onDevice ingest 6장 + esp32c6 흡수)

> 보드한계모델 측정 W1~W3에서 발견된 빌드·측정·셋업 함정 11+건. 강사양성 Day 5 / 호오컨설팅 / 위시캣 임베디드 견적 자산 가치.
> 출처: `onDevice_AI/_inbox/카드 6장` + `프로젝트_보드한계모델/03_보드별_실행/*/`

### Windows ESP-IDF 빌드 함정 (esp32s3·esp32c6, 5/19~20 발견)

- **한글 경로 ccache 실패** — `Cannot convert character sequence: Illegal byte sequence`. 우회: xcopy로 영어 사본(`C:\esp32_project`)으로 빌드. 한글 경로는 PowerShell·gcc·ccache 모두 깨짐.
- **CMakeLists `if/endif` 한 줄 parse error** — CMake 3.16+ 멀티라인 강제. `if(COND) cmd() endif()` 같은 한 줄 표기 금지.
- **`#pragma omp parallel` xtensa-gcc unknown-pragmas error** — esp32-gcc는 OpenMP 미지원. `-Wno-error=unknown-pragmas`로 우회.
- **`%u` vs `uint32_t` (xtensa long unsigned 차이)** — esp32-gcc에서 `uint32_t`는 long. `%u`가 format error. `-Wno-error=format=` 또는 `%lu` 사용.
- **3 skeleton multiple definition** — main/CMakeLists.txt에서 MLP·CNN·TF 모두 SRCS에 넣으면 main() 중복. ARCH별 한 skeleton만 분기 등록.
- **PowerShell 5.1 한글 경로 `Illegal characters in path`** — sweep script가 한글 경로 만나면 깨짐. 영어 경로 강제.
- **PowerShell ASCII script + UTF-8 BOM 없음 → 한글 주석 parser 오류** — sweep script는 ASCII only.

### ESP32-S3 USB-Serial-JTAG monitor 함정

- **RTS reset 시퀀스 명시 필요** — `monitor.py`에서 RTS True 100ms → False 정확히 안 하면 펌웨어 진입 불가.
- **monitor stdout `  | <line>` prefix → `^CSV` 매칭 실패** — sweep regex가 prefix 때문에 매칭 못 함. plain CSV column 0 출력 추가.

### Raspberry Pi 셋업 함정 (5/19 rpi3·rpi4·rpizero 발견)

- **USB ethernet 동글 사용 시 Pi MAC OUI(`b8:27:eb`) 미노출 (rpizero)** — LAN 식별이 Pi OUI 기반이면 Realtek `00:e0:4c` 동글 사용 시 false negative. OUI 화이트리스트 확장 필요.
- **Pi Zero W에 git 없음 (Raspbian Lite)** — 일반 setup script가 git pull 가정 시 실패. tar/sshpass로 23KB minimal package 우회.
- **ARMv8.2-A SIMD 옵션은 rpi5만, rpi4 빌드 실패** — `-march=armv8.2-a+dotprod`는 A72(rpi4)에서 illegal instruction. asimddp는 A76(rpi5) / A75(tablet) / A77(smartphone)에만.
- **모니터 직접 작업 ↔ ssh 자동 인증은 별개** — 사용자가 보드 앞에서 직접 작업했다고 Windows PC ↔ Pi ssh가 자동 인증되지 않음. publickey 1회 등록 필요.

### PowerShell·Bash 측정 함정

- **PowerShell `<` 리다이렉트 함정 (큰따옴표 안에서도 검사)** — `ssh host "echo OK_$(wc -l < ~/.ssh/authorized_keys)"`가 PowerShell 5.1에서 reserved operator 파싱 에러. ssh remote에서 `<` 절대 금지. `wc -l file` 또는 `cat | wc -l` 사용.

### Smartphone 측정 함정

- **smartphone CPU 토폴로지 측정 시점 함정** — idle 시 `/proc/cpuinfo`에 big core(A77 0xd0d) parked, 모든 코어가 A55(0xd05)로만 표시. 부하 인가 + thermal headroom 확보 후 측정 권장.

### 측정 코드 함정

- **`metrics_t.param_count` uint32 한계** — > 4.29B에서 wrap-around. 향후 uint64 변환. 임시 대응: params 표시 부정확 → size²로 재계산.
- **10s threshold sweep 시 100 forward 시간 매우 김** — 8~17분/size. `EXTRA_DEF="-DMEASURE_RUNS=10 -DWARMUP_RUNS=2"` 환경변수로 단축.
- **MLP 10s hidden 70000+ RAM 19.6 GB > 16 GB** — uttecMac swap 사용으로 RAM_safe 표시되지만 정확한 wall 못 잡음. swap 비활성화 후 재측정 필요.
- **Transformer skeleton의 argmax attention 단순화** — 실제 softmax 보다 RAM·scratch 작음 → 측정 envelope는 lower bound. 실제 모델은 약간 더 큼. 측정 단순화는 명시 의무.

### vault 운영 함정 (방법론)

- **vault 옛 mandate 잔존 문제** — 14개 파일에 "7 보드 / Phase 2 보드 도착 후" 같은 옛 가정이 남음 → 진입자가 옛 가정으로 회귀. 단일 출처(`0_마스터플랜.md`) + 옛 파일 ⚠️ 헤더 + archive/ 보존.
- **계획서 다중 파일 충돌 위험** — `0_검증계획.md` + `0_실험계획서.md` + `00_검토순서.md` + `00_진행순서.md` 4 파일 동시 존재 → 정답 모호. 단일 마스터플랜 원칙 + archive.

→ 본 17건은 **강사양성 Day 5 사례 자산**. "측정 결과 단일 원인 단정 위험" + "ablation 변수 통제 환경 셋업" + "1인 시공 빌드 함정 패턴" 강의 교재로 직접 활용 가능.

## revita ingest #9 함정 5종 (2026-05-20 흡수 — rtuRemocon + tower_DK)

> 5/15 rtuRemocon end-to-end 검증에서 발견된 임베디드 함정. 강의·교재 자산화 가치 ★ (현장 시행착오 → 일반화 가능 패턴).
> 출처: `revitaProject/application/revitaWiki/log.md` ingest #9, `entities/entity-rtu-remocon.md`

### (A) PCB PA2/PA3 RS485 역배선

PCB 회로도 기준 STM32 PA2(HW USART2_TX) → MAX3485 RO, PA3(HW USART2_RX) → MAX3485 DI **반대 배선** → **하드웨어 USART 사용 불가**, 소프트웨어 UART(TIM4 1MHz bit-bang) 필수.

- 강의 가치: "PCB 시그널 매핑 vs MCU 표준 핀맵 검증 필수"

### (B) 소프트웨어 UART 수신 중 printf 금지

115200 bps debug printf가 9600 bps 수신 byte 간격(104µs)을 초과 → 다음 byte start bit 누락. **프레임 완료 후에만** 디버그 출력.

- 강의 가치: "Soft UART 디버깅 — 출력 시점이 동작에 영향"

### (C) J-Link `--dev-id` 비호환 (V9.24a 등)

`west flash --dev-id <SN>` → 일부 J-Link 버전에서 **연결 실패**. `--tool-opt="-SelectEmuBySN <SN>"`로 직접 지정.

- 강의 가치: "임베디드 빌드/플래시 체인 — 옵션 호환성 함정"

### (D) `ninja: no work to do` 캐시 함정

소스 수정 후에도 빌드 시스템이 변경 감지 못 함 → 오래된 바이너리 플래시. **pristine 빌드** (`west build -p always`) 필수.

- 강의 가치: "Zephyr/CMake 빌드 캐시 — 의심되면 pristine"

### (E) Blue Pill USB 5V ↔ MAX8881 12V 3.3V 역전류

USB 연결 시 MAX8881 출력이 VCC3V3 레일을 sink → **USB 먹통**. **12V 전용 운용** + Schottky BAT54 다이오드 추가 권장.

- 강의 가치: "전원 토폴로지 — 다중 입력 시 역전류 차단 다이오드"

### (F) `stty -hupcl` 필수 (현장 배포 함정)

```bash
stty -F /dev/ttyUSBx 115200 raw -echo -hupcl clocal
```

`-hupcl` 없으면 `cat` 종료 시 DTR 드롭 → 다음 회 시리얼 수신 실패. **현장 배포 함정** 시리즈 확장 (8건 누적).

## WebFetch 본문 함정 (2026-05-17 흡수 — wishket #155381 + #155235)

위시캣 공고 페이지를 WebFetch로 가져와 LLM에 입력 시 사이트 공통 배너·UI 텍스트가 프로젝트 본문에 섞여 LLM이 잘못 해석:

- 5/15 #155235: "기간제(상주)..." 배너를 프로젝트 메타로 오해석 (memory 박제 완료)
- 5/17 #155381: 본문 일부 누락 + LS XGT PLC 우대 항목을 필수 사양으로 오인

**대응**:
- 근무형태는 카테고리 아이콘 라벨만 신뢰
- WebFetch 결과는 항상 사용자 1회 검수 후 매칭에 반영
- 본문 길이 < 1000자 시 누락 의심

→ 위시캣 자동 매칭 SOP (n8n-claude 자동검색 + wishket-claude 정밀 작성) 안에 검수 단계 명시.

## 업데이트 방법
새로운 갭을 발견하거나, 기존 갭을 채웠을 때 이 페이지를 업데이트한다.
채운 갭은 삭제하지 않고 ~~취소선~~으로 표시하여 성장 기록을 남긴다.

## 관련 페이지
- [[me]]: 핵심 정체성
- [[skills]]: 기술적 갭과 현재 수준 비교
- [[ai-direction]]: 갭이 AI 방향에 미치는 영향
- [[strengths]]: 강점과 약점의 대비
- [[goals]]: 갭을 채워야 달성되는 목표
