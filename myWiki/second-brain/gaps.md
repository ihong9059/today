---
title: 부족한 부분
type: identity
created: 2026-04-19
updated: 2026-07-16 (_inbox 3장 흡수 — 설계변경↔영업자산 표기 drift: 노드수 14→11 6파일 잔존, grep 전수정합 회피책 / 이전 7/9: lora 카드 흡수 — 공용 시스템 보드: 조명 fail-safe 반대 논리(재실 중 OFF 금지→PIR 결합 미결) + AC220V 안전 요구, 결정 60 / 이전 6/19: lora 카드 2장 흡수 — E22 generic SX126x 디코드 불가(벤더 락인) + nRF52832 2.4G ~30dB 투과 불리(근거리 한정) + BLE+NVS+LoRa 통합 빌드 적합 / 이전 6/17: _inbox megasession 함정 7건(LoRa 4+onDevice 3) / 이전 6/13 2차: n8nUttec 정체 카드 4장 흡수 — webhook publish 거절 ★★★★ + staticData Active 한정 + ugrep alias + Schedule Trigger silent success 등 6건 / 1차: _inbox 8장 megasession — Defender CFA NCS silent killer + Android onboarding 2건 + IoT 펌웨어 보안 실패 사례 3종 세트(서명키 평문 커밋·AEAD 부재·키 미프로비저닝, revita ingest #16) / 이전 6/10: LS XGT 시리즈 prefix gotcha 신설 — #155220 v1 XBF-PN08B(XGB 전용) ↔ XGF-PN4B(XGK용) 혼동 결정적 오류. 모듈명 1글자 차이 = 베이스 호환 불가. 사외 경험자 검토 의무 SOP. wishket-claude 4 카드 megasession 흡수 / 이전 6/6: 자산 인덱스 누락 재발 2회 누적 5/29+6/4 박제, 결정 44)
tags: [부족, 개선, 학습, 자산인덱스완전성, Nordic, Zephyr, CMSIS-NN, Claude-CLI, --resume, esp-nn, ninja, PowerShell-BOM, 위시캣패턴변화, STM32, STM32H745, dual-core, LTDC, USB-FS, vectorizer-정책, NDK, clang, net_mgmt-API-change, 외주필터, ID비단조, 채번패턴, baseline-추정값-artifact, INFO-emit-cache, vendor-광고-cross-check, master-single-source, 영업카피-stale, STM-16-fmc-sdram-Kconfig, SFDP-실측-vs-dts-upstream, bash-backslash-windows, python-환경-분리, pip-경로-확인, R50-1-chip-saturate, STM-7-v2, I2C-주소충돌, flatten-순서, WHO_AM_I-분기, PEP668, scp-wildcard, 데이터사이언티스트, GEE학습, 자산인덱스누락재발, cross-vault-cascade-지연, 풀스택자산]
links: [me, skills, ai-direction, strengths, goals, 위시캣활동, onDevice-ai, stm32h745-disco, build-gotcha-inventory, ai-fanstick, 2026-05-27_위시캣-외주필터-사전확인-SOP, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix, 2026-05-28_본vault-영업카피-신뢰성-강화, 2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증, 2026-06-03_R50-touch-mnist-path-D-산업응용, 2026-06-04_sensor-AI-매트릭스-단일출처-mandate]
---

# 부족한 부분 (채워야 할 것)

## 2026-07-16 — 설계변경 ↔ 영업 자산 표기 drift (노드수 14→11 6파일 잔존) ⭐⭐

**함정**: 2026-07-03 pond 설계변경(2보드→1보드, addr 21·61·81 폐지)으로 실배포 노드가 14→11로 바뀌었으나, 영업 자산 6파일(제안서·근거팩 2종·타깃발굴·동영상·아웃리치)에 **구값 "14노드"가 그대로 잔존**. 7/14 lora 회신·7/15 제안서 v3 정정에도 나머지 자산은 7/16 흡수 시점까지 미정합.

**원인**: 기술 vault(lora)의 스펙 변경이 today/영업 자산으로 자동 전파되지 않음. entity 1곳만 고치면 "고쳤다"는 착시 — 실제 대외 노출 카피는 여러 파일에 분산.

**회피책**:
1. **정량 스펙(노드수·수치)은 "설계값 확정 회신" 이벤트 시 grep 전수 정합** — 단일 파일 수정 금지, `grep -rn "{구값}" 영업/` 0건까지.
2. 스펙 변경 시 **구값 → "구설계값" 명시 + 정정일 병기**(추적성). 채널충돌 같은 관측치는 특정 숫자 대신 일반화("다노드 현장")로 부정확 방지.
3. 실측 미확정 항목(솔라 자립일수 등)은 **"검증 완료 후 확정" 표기**로 과대주장 차단.

→ 근거: [[한림용인cc-고가수조]] § 노드수 11 + [[ai-direction]] § 결정 61 판단 로그.

## 2026-07-09 — lora 흡수: 조명 제어논리 ≠ 수조 (fail-safe 반대) + AC220V 안전 ⭐⭐

lora-claude 카드(공용 시스템 보드 = 수조+조명 단일 HW) 흡수. 공용 보드는 HW를 공유하나 **제어논리는 공유 불가** — 미결 설계 부채.

| 함정 | 회피 |
|---|---|
| **⭐ 조명 fail-safe 안전논리 = 수조와 정반대** | 수조 = 무수신 시 **OFF**(월류 방지)가 안전 / 조명 = 재실 중 **OFF 금지**(인적사고 예방)가 안전. → 수조 제어논리를 조명에 **그대로 못 씀**. **PIR 재실감지 입력과 결합** 필요 (설계 미착수·미결). 공용 보드 "HW 공유 = 로직 공유" 착각 금지 |
| **조명 = AC 220V 부하** | 릴레이 opto 절연·정격·연면거리 등 안전 요구가 수조 pump보다 강함. pump용 릴레이 설계를 조명에 그대로 전용 금지 |

→ 단일 출처 = [[lora]] vault (`하드웨어/공용_시스템보드/공용_시스템보드_reference.md`). [[ai-direction]] § 결정 60. 현 시점 = reference block diagram 단계(부품선정·회로·양산 미착수).

---

## 2026-06-19 — _inbox 흡수 LoRa gotcha 2건 (E22 디코드 불가 + 2.4G 투과 한계) ⭐⭐

lora-claude 카드 2장(06-18 통합펌웨어+BLE프로비저닝 / 06-19 2.4G하이브리드+E22스니핑한계) 흡수.

| 함정 | 회피 |
|---|---|
| **⭐ Ebyte E22 = generic SX126x로 디코드 불가** | 같은 SX1262 칩(CubeCell)으로도 **E22 on-air 프레임 복조 못 함** (E22가 LoRa PHY 위에 독자 프레이밍). SF/BW·sync·헤더/CRC 전수 스윕 + E22 2개로도 0건 실증. → "**같은 칩 = 호환**"이 거짓. E22망 스니핑·게이트웨이·멀티벤더 상호운용은 **E22 모듈로만** 보장 = 벤더 락인. 제3자 SX126x 보드로 E22망 진입 불가 (← 검토/10 "E22↔E32 불가"의 확장) |
| **⭐ nRF52832 2.4G는 900M LoRa比 폐쇄공간 투과 ~30dB 불리** | Coded PHY 미지원 + TX +4dBm 한계. 2.4G 로컬링크는 **근거리·약장애물 한정**. 장거리·강투과 설계에 2.4G 적용 금지 (sub-GHz LoRa가 정답). 2.4G 하이브리드 채택 전 **현장 2.4G RSSI 실측 필수** (측정 SOP·판정표 lora vault 보유) |

→ 단일 출처 = [[lora]] vault (`검토/17_2.4G로컬링크_ESB_하이브리드/`, `하드웨어/HTCC-AB01/sniffer/E22_디코드_시도_결론_2026-06-19.md`). [[ai-direction]] § 결정 54·55.
**부수 역량(함정 아님)**: nRF52832에 **BLE+NVS+LoRa 통합 빌드 적합** 실증(FLASH 27.6%·RAM 66.1%) — 단일 binary 통합 펌웨어 + BLE 프로비저닝 RAM/FLASH 여유 확인 = 양산 펌웨어 SKU 1개화 근거.

---

## 2026-06-17 — _inbox 흡수 megasession 함정 7건 (LoRa 4 + onDevice 3) ⭐⭐⭐

lora-claude 카드 2장(06-14 4종 모듈 / 06-16 수조 제어망) + ondevice-claude 카드 1장(06-14-002 IMU/이상탐지) 흡수.

### LoRa gotcha 4건 (lora vault 기술 근거)

| 함정 | 회피 |
|---|---|
| **⭐ Ebyte E22 ↔ E32 교차통신 불가** | 주파수 그리드 칩별 상이 (E22 x.125 / E32 x.000 → 125kHz 어긋남) + air rate 매핑 차. 한림 양산(E22)은 단일 칩 패밀리 폐쇄망으로만 확장. 혼용 필요 시 SPI 모듈(E22-M/E19)+Zephyr 전환 |
| **E32 config write = EasyDMA 연속 프레임 필수** | poll_out 바이트 틈 → 모듈 무응답. 향후 E32/E19 작업 필수 적용 |
| **⭐ SW-UART 115200 + LoRa HW UART 동시 → main 스택 오버플로우** | hang, fault dump 없음. `CONFIG_MAIN_STACK_SIZE` 증설 필수. 오진(SPIM↔UARTE 충돌) 주의 — 실제는 스택 |
| **⭐ nRF52832 배터리 4.2V 측정 + VCC 직결 금지** | 측정=내부 0.6V 절대기준 + 1/2 분압 + ×2 (VDD/4 ratiometric·VDD 직접읽기는 천장이라 불가). 전원=nRF52832 동작 1.7~3.6V·절대최대 3.9V → 4.2V VCC 직결 금지(nRF52840 VDDH 5.5V와 다름), 레귤레이터 경유. flash=nrfjprog 직결(JLink.exe 미설치 시 `west flash --runner jlink` 실패) |

→ APPROTECT nRF52832 REV2 chiperase 후 `--recover` (재확인). 단일 출처 = lora vault. [[lora]] · 메모리 `feedback_e22_900t_config_baud` 연결.

### onDevice gotcha 3건 (edge AI 검증 함정)

| 함정 | 회피 |
|---|---|
| **⭐ 중력-방향 지름길(shortcut) 버그** | 가속도 제스처를 동작별 다른 방향으로 들고 수집 시 모델이 움직임 아닌 **중력 방향**을 라벨 단서로 학습 → **held-out 100%여도 on-device fail**. 교정=회전 증강(random 3D rotation) 또는 per-window DC 제거. "검증 자체를 검증하라"의 강력한 사례 (강사양성·교육 콘텐츠 자산) |
| 회전 증강 ↔ INT8 양자화 손실 tradeoff | 증강이 activation 범위 확대 → INT8 -10.8pp. per-channel 양자화로 완화 |
| 저가 IMU 모듈 die 변동 | 같은 "MPU-9265" 마킹도 die(WHO_AM_I 0x70/0x74) 배치별 상이. accel 동등하나 데이터=추론 HW 일치 권장 |

→ 중력-방향 버그 = "데이터 누수/shortcut learning" 교육 자산. [[onDevice-ai]] § 2026-06-17 · [[ai-direction]] § 결정 53.

---

## 2026-06-13 (3차) — XGF-PN4B(EtherCAT 마스터)는 SCADA와 통신 불가 (LS XGT 2번째 실무 함정) ⭐⭐

uttec-plc-claude 첫 운영 세션 카드(`2026-06-13-001`) 흡수. XGT prefix 함정([[gaps]] 2026-06-10)에 이은 **2번째 LS XGT 실무 함정**. 사용자 질문("왜 자체 SCADA가 XGF-PN4B와 통신한다고?")에서 정정 박제.

### gotcha XGF-PN4B-SCADA ⭐⭐ — PLC 마스터 모듈을 SCADA가 직접 통신할 수 있다는 오해

| 함정 | 회피 |
|---|---|
| 자체 SCADA(Plan C, pymodbus+FastAPI)가 **XGF-PN4B(EtherCAT 마스터)와 직접 통신**한다는 구조 설명 오류 | SCADA ↔ **XGK-CPUSN 내장 Ethernet (Modbus TCP)** 전용. XGF-PN4B는 서보 4슬레이브 전용 **폐쇄망** (외부 진입 자리 없음). IPC는 마스터가 아니라 Modbus TCP **클라이언트** |

**3 이유**: ① EtherCAT은 일반 TCP/IP와 비호환 (전용 ASIC 필요) ② 마스터-슬레이브 폐쇄 토폴로지 ③ 결정론 보호 (Windows IPC가 끼면 100μs 사이클 깨짐). Plan C 채택해도 이 구조 불변.

→ 견적·구조 설명 시 흔한 함정. uttec-plc `docs/system-overview/index.html` §11 통신 채널 명확화 그림이 가장 명확한 박제 (인용 가능). [[위시캣활동]] § #155220 · [[uttec-plc]] 연결.

---

## 2026-06-13 (2차) — n8nUttec 정체 카드 흡수 함정 6건 (Tailscale webhook 한계 + 자동화 환경) ⭐⭐⭐

n8n-claude 카드 4장 (5/18~6/7 pending_outbound 정체분, broker pull 라우팅 누락 해소 후 일괄 흡수). § "자동화/스크립팅 함정 패턴"의 연장.

### gotcha n8n-webhook-거절 ⭐⭐⭐⭐ — Tailscale-only 환경에서 외부 시스템 webhook publish 거절

- Telegram 등 외부 API의 setWebhook은 **HTTPS + public 도달 가능 URL 요구** → Tailscale 사설 IP + HTTP에서 등록 거절. n8n Trigger 노드가 publish 단계에서 실패
- 회피: **Polling 직접 구현 표준** (Schedule + getUpdates/HTTP Request + staticData + isFirstRun 가드) / cloudflared tunnel·public 인스턴스 분리는 Phase 4
- 1인 기업·소규모 팀 공통 함정 = UTTEC 컨설팅 deliverable 가치. 상세: [[tailscale네트워크]] § 한계 / [[telegram]]

### gotcha n8n-staticData — `$getWorkflowStaticData`는 Active 모드에서만 영구 누적 ⭐⭐⭐

- Test 모드는 임시 메모리 → polling 반복 디버깅 시 매번 처음부터 폴링 (offset 손실)
- 회피: Workflow **Activate 필수** + isFirstRun 가드 패턴

### gotcha n8n-schedule-silent — Schedule Trigger는 연결 끊겨도 status=success

- 다운스트림 연결이 깨져도 trigger 자체는 success 기록 → 무소식 = 정상으로 오인. 모니터링은 결과 부수효과(메일 수신 등) 기준으로

### gotcha ubuntu-ugrep-alias — Ubuntu `grep`이 ugrep alias인 환경 (일반 Linux 자동화 함정)

- 스크립트가 GNU grep 옵션 가정 시 silent 오동작. 회피: `/usr/bin/grep` 절대 경로 + 패턴 `^[+]` escape 류 주의

### gotcha bash-session-cwd — bash 세션 cwd persistence 가정 금지

- 자동화에서 이전 명령의 cd 상태 의존 금지 — 절대 경로 표준 (Claude Bash 도구도 동일 패턴)

### gotcha 카카오-도메인-HTTPS — 카카오 앱 대표 도메인은 HTTPS 검증 요구

- 카카오 developers 앱 등록 시 대표 도메인 HTTPS 필수 → Tailscale-only 환경 동일 계열 한계 (webhook 거절과 같은 뿌리)

## 2026-06-13 — _inbox 8장 megasession 함정 박제 (Defender CFA + Termux/Android + IoT 펌웨어 보안 실패 사례) ⭐⭐⭐

tabm9-claude 카드 3장 + revita-claude ingest #16 카드 흡수.

### gotcha Defender-CFA ⭐⭐⭐ — Windows Defender Controlled Folder Access = NCS 빌드 silent killer

| 함정 | 회피 |
|---|---|
| `west build` archive linking 단계(`ar qc`)에서 `libisr_tables.a: No such file or directory` 일관 실패. input `.obj` 정상·매 시도 같은 위치 실패(race 아님)·ar 단독 호출 정상. sandbox/mingw/subst/짧은 path 등 모든 우회 무효. **진짜 원인 = Defender 랜섬웨어 방지 CFA**: 보호 폴더 안에서 미서명 프로세스(`arm-zephyr-eabi-ar.exe`)가 새 파일 생성 시 silent block — 콘솔엔 "No such file" 만, Defender 보호 이력에만 기록 | Windows 보안 → 랜섬웨어 방지 관리 → **보호 폴더 제외** 또는 toolchain exe "허용된 앱" 추가. 적용 권장: `C:\todo\today\` `C:\todo\weldRobot\` `C:\todo\tabM9\` `C:\todo\onDevice_AI\` `C:\b\` `C:\ncs\`. **진단 패턴**: "왜 이 PC에서만?" 시그널 → host 환경 (Defender/AV/권한) 의심 우선 |

→ tabm9-claude 카드 06-09-001 (PCA10040 e2e flash 중 발견). 기존 NCS 함정 (cmd AutoRun 충돌, 메모리 박제)과 **직교하는 별개 함정** — Windows host NCS 빌드 prerequisite 2종 세트.

### gotcha Android onboarding 2건 — Termux F-Droid + 백그라운드 제한 (신규 디바이스 공통)

| 함정 | 회피 |
|---|---|
| Termux 시리즈 Play Store 2020+ deprecated — Play 설치본은 구버전 | 신규 디바이스 onboarding 시 **F-Droid 우선** (Termux + Termux:API 동일 signing key 페어 필수) |
| Android 12+ 백그라운드 액티비티 시작 제한 — ssh 통한 `am start` 차단 | adb shell / 사용자 직접 조작 / 무선 디버깅 우회 |

→ tabm9-claude 카드 06-10-001 ([[galaxy-a51-5g]] onboarding 중 발견).

### gotcha committed-signing-key ★보안 ⭐⭐⭐ — IoT 펌웨어 보안 실패 사례 3종 세트 (강의·컨설팅 자산 + revita 양산 리스크)

revita ingest #16 (LoRa 암호화 ON + BLE OTA 정착) 과정에서 발견된 **실제 보안 게이트 2건**:

| 결함 | 본질 |
|---|---|
| **서명키 평문 커밋** | MCUboot 이미지 서명 개인키(`keys/revita-ec-p256.pem`)가 repo에 평문 커밋 — sysbuild.conf 주석엔 "절대 커밋 금지"인데 모순. **위조 펌웨어 OTA 통과 위험** |
| **AEAD 부재** | 암호화 ON(AES-128-ECB keystream XOR)됐으나 **MIC 없음(위조 검출 불가) + replay counter 없음(packet_id 256 wrap → keystream 재사용) + 공장 root_key = all-zero(미프로비저닝)** |

- **교재 자산 가치**: "IoT 펌웨어 보안 실패 사례" = 서명키 관리 + AEAD + 키 프로비저닝 3종 세트 — 강의·컨설팅·인증 트랙 자산
- **실리스크**: revita 양산 출하 전 해소 필요 (작업보고서 todo 등재 2026-06-13). 해소 시 [[strengths]] §12 인증 매니지먼트 보강 → [[2026-06-13_revita-보안게이트-인증입찰-매칭]]

---

## 2026-06-10 — LS XGT 시리즈 prefix 혼동 (PLC 견적 결정적 오류) ⭐⭐⭐

wishket-claude 4 카드 megasession 흡수. #155220 동아정밀 견적 v1에서 발견된 결정적 오류 박제.

### gotcha XGT-prefix ⭐⭐⭐ — XBF-PN08B(XGB 전용) ↔ XGF-PN4B(XGK용) 혼동

| 함정 | 회피 |
|---|---|
| v1 견적: XGK-CPUSN CPU + **XBF-PN08B** 8축 EtherCAT. 그러나 **XBF prefix = XGB 시리즈 전용** → XGK 베이스 물리 호환 불가. 게다가 XGK-CPUSN으로 L7CA002U 서보 컨트롤 시 **EtherCAT 마스터 자체가 부재**. 모듈명 1글자 차이(XBF vs XGF)지만 시리즈 완전 다름 → v1 그대로 송부했으면 "PLC 누가 구성했나" 영업 신뢰도 직격 | **LS XGT 시리즈 prefix 매핑 SOP**: XGK/XGI/XGR = **XGF/XGL** prefix 모듈 / XGB = **XBF** prefix 모듈. EtherCAT 마스터 = **XGF-PN4B**(XGK용, 472,010원). 견적 작성 시 (a) CPU 베이스 시리즈 확인 (b) 모듈 prefix 일치 검증 (c) 서보 제어 방식(EtherCAT/펄스/RS-485)별 필수 마스터 모듈 존재 확인 (d) **사외 경험자 검토 1회 의무**(결정 39 확장) |

→ 자세히 [[ai-direction]] § 결정 39 확장 (영업 신뢰성 3 원칙) + [[strengths]] § 17 LS XGT prefix SOP + [[위시캣활동]] § 2026-06-06~06-10 흡수.

---

## 2026-06-06 — 자산 인덱스 누락 재발 (5/29 모바일 앱 + 6/4 AWS 2회 누적) ⭐⭐⭐

wishket-claude #2026-06-04-001 cascade 흡수. **2번째 사용자 지적 시 인덱스 보강 사건** 박제.

### gotcha 인덱스-1 ⭐⭐⭐ — `/wishket-apply` 작성 시 자산 인덱스 누락 재발

| 함정 | 회피 |
|---|---|
| 5/29 #155818 사용자 지적 직후 wishketProject me.md에 "모바일 앱 양산 자산 6" 박제. 6/4 #155818 지원서 작성 시 본 vault me.md 박제분을 충분히 안 읽고 모바일 앱 [△] 약점 분류 + AWS 양산 자산은 본 vault me.md 박제 부재 동시 발생. mywiki 양산제품.md에도 #7~8 카테고리 미반영 (cross-vault cascade 누락) | **자산 인덱스 우선 SOP** (결정 44): `/wishket-apply` 시 (a) wishketProject me.md 전체 우선 읽기 (b) mywiki entities/양산제품.md 전체 우선 읽기 (c) [△] 약점 분류 전 자산 인덱스 재확인 (d) 누락 발견 시 즉시 cascade 카드 발송. 본 vault myWiki 측 #7~8 카테고리 박제 완료 (2026-06-06) |

### gotcha 인덱스-2 — cross-vault cascade 지연 = 2번째 지적 트리거

| 함정 | 회피 |
|---|---|
| 5/29 모바일 앱 cascade 카드 → mywiki 흡수까지 5일 지연 동안 6/4 AWS 누락 재발. cascade 카드는 pending → processed 시간에 비례하여 재발 위험 ↑ | **카드 우선 흡수 정책** 메모리 박제 (`feedback_inbox_lifecycle.md` pending ≥ 1 → 다음 작업 슬롯 디폴트 = 흡수). 본 vault 풀스택 자산 추가 박제 = 5/29 cascade carry 결합 흡수 (2장 동시 megasession) |

→ 자세히 [[ai-direction]] § 결정 44 + [[strengths]] § 15 풀스택 양산 자산 + [[2026-06-06_carrier-단일진행-자산-인덱스-cascade]] (신규 thought).

---

## 2026-06-04 — _inbox 6장 megasession 9 함정 박제 (R50 Step 1~3 + sensor 라이브러리 carry) ⭐⭐⭐⭐

ondevice-claude 카드 005+006+007 + revita 003+004 megasession 흡수. STM32H7 CMSIS-NN 비결정 + Zephyr LCD overlay + I2C bus 충돌 + PyTorch C 포트 + Debian 13 셋업 + 데이터 사이언티스트 자산 부족.

### gotcha R50-1 ⭐⭐⭐⭐ — `arm_nn_vec_mat_mult_t_s8` STM32H7 + Zephyr 4.3.99 비결정 saturate

| 함정 | 회피 |
|---|---|
| 같은 input/model/weight으로 빌드 간 결과 다름 (a-2 → a-3 → g-3 점진적 saturate). 100 sample 시 모든 다른 label sample pred=0 (모든 L7 logit +127 saturate). memset(scratch) + scratch 2KB→8KB 확장 모두 효과 없음 (NOT cause). R46 carry (pca10056 Cortex-M4F 정상) → STM32H7 1:1 적용 불가 | **plain C 32-line FC 우회** (M7 + L1 cache + dual-issue가 plain C도 자동 vectorize → CMSIS-NN과 동등 latency, R50 8.13ms ≈ 8.28ms 검증). CMSIS-NN port = chip × library × toolchain 매트릭스 검증 필수 (결정 43) |

→ M7 chip 권장 표준 = plain C FC 우회 path. M4F (pca10040/56)는 CMSIS-NN 우선 (R18/R46 3.14× 검증).

### gotcha STM-7 v2 — PK7 = LCD_DE / PD7 = LCD_DISP (R36 옛 박제 정정)

| 함정 | 회피 |
|---|---|
| 옛 박제 "PK7 = LCD_DISP_EN" 잘못. UM2488 Table 17 ground truth: PK7 = LCD_DE / PD7 = LCD_DISP. R36 sample 동작 이유 = BSP_LCD_Init이 PD7 자동 high 설정, PK7 manual set은 우연 | UM2488 Rev 10 표준 carry (`hardware/stm32h745disco/refs/UM2488_STM32H745I-DISCO.pdf` 박제) |

### gotcha R50 LCD overlay — Zephyr 4.3.99 stm32h745i_disco LCD 활성화 4 항목

Zephyr 4.3.99 stock 미지원, 본 vault carry source:
- PLL3 9.6MHz pixel clock (HSE/5×96/50)
- 28-pin LTDC pinctrl (UM2488 Table 17 정확)
- disp-on PD7 + bl-ctrl PK0
- `ext-sdram = &sdram2` 또는 `CONFIG_STM32_LTDC_FB_NUM=1`

### gotcha R50 Stack overflow — touch callback에서 inference 직접 호출

| 함정 | 회피 |
|---|---|
| Touch input callback의 작은 stack에서 `mnist_cnn_forward` 직접 호출 시 MPU FAULT | **flag deferral pattern** (callback에서 flag set만, main thread polling 실행) + `CONFIG_MAIN_STACK_SIZE=16384` 추가 보호 |

### gotcha sensor I2C bus 충돌 — AHT21 (0x38) ↔ FT5336 (0x38) onboard touch

| 함정 | 회피 |
|---|---|
| AHT21 (0x38) = FT5336 (0x38) onboard touch와 동일 주소 → 동시 사용 시 충돌. ENS160-AHT21 module R50 동시 사용 시 별도 I2C bus 필수 | `_STM32H745_EXPANSION/README.md` § 1.3 박제 (I2C bus 공유 함정) |

### gotcha numpy flatten 순서 — PyTorch channel-first 필수 ⭐⭐⭐

| 함정 | 회피 |
|---|---|
| PyTorch `x.flatten(1)`은 (B, C, T) → (B, C × T) 순서 (channel-major). numpy time-first reshape하면 fc1.weight (16, 112)와 input order mismatch → **accuracy 25% random** (random baseline) | C/embedded port에서도 동일 patten carry 필수 (Conv output buffer를 channel-major 순서로 flatten). R48 Path C Phase 5 진입 시 carry. 일반화: **모든 PyTorch → numpy / C 포트에서 flatten 순서 검증 필수** |

### gotcha WHO_AM_I 5종 분기 — MPU-9265 0x74 die 변형 신규

| 코드 | 모듈 | 비고 |
|---|---|---|
| 0x71 | MPU-9250 정품 (9축) | — |
| 0x73 | MPU-9255 (9축 변형) | — |
| **0x74** | **MPU-9265 die 변형 (6축, 자력계 없는 SKU)** ⭐ | 6/3 사용자 모듈 박제 |
| 0x70 | MPU-6500 only re-mark | 6축 fake |
| 0xEA | ICM-20948 (9축, 다른 register map) | — |

→ 양산 입고 QC 시 WHO_AM_I 분기 표 확장 필수. sensor 검증 표준 patten.

### gotcha PEP 668 Debian 13 — venv `--system-site-packages` 표준

| 함정 | 회피 |
|---|---|
| `pip3 install torch` 직접 실행 시 PEP 668 `externally-managed-environment` 에러 (Debian 13 기본) | `python3 -m venv --system-site-packages` 패턴 carry (system numpy/smbus2 재사용 + PyTorch만 venv 격리 = 150MB) |

→ factory-rpi4 셋업 표준. uttec-search venv (`uv venv 우회`) memory 박제와 유사 패턴.

### gotcha scp wildcard — `{a,b}` 미동작 (`*` 사용)

| 함정 | 회피 |
|---|---|
| Windows ssh client에서 brace expansion `{a,b,c}` 미동작 (remote shell 미적용) | `scp 'uttec@host:/path/*.npz' local/` 또는 individual scp 사용 |

### gap — 데이터 사이언티스트 + GEE 학습 + 현장 PoC (노지관리 신사업 진입 자산 부족 3건)

revita-claude 카드 003 §4.5 carry. 본 사업 진입 시 자산 부족 영역:

| 부족 | 해소 trigger |
|---|---|
| 데이터 사이언티스트 협력 (NDVI 처방 모델) | 협력 발견 시 즉시 PoC 진입 |
| Google Earth Engine 학습 (4~8주) | Python 양산 자산 단축 (uttec-search 측 GEE 통합 candidate) |
| 현장 PoC (실제 농가 1개 사이트) | 농진청 시범사업 트리거 시 즉시 진입 |

자세히 [[onDevice-ai]] § R50 Step 1~3 + [[ai-direction]] § 결정 41~43 + [[revita]] § 노지관리 신사업 + [[2026-06-04_sensor-AI-매트릭스-단일출처-mandate]] (신규 thought).

---

## 2026-06-03 — bash Windows path escape + PyTorch 환경 박제 함정 (R50 Step 0 carry) ⭐

ondevice-claude 카드 #2026-06-03-001 흡수. R50 Step 0 setup 단계 발견 환경 함정 2건. 본 vault Windows + Python + bash 셋업 영구 자산.

### gotcha — bash backslash Windows path escape ⭐

| 함정 | 회피 |
|---|---|
| Bash에서 `mkdir C:\r50_proj` 직접 호출 시 `\r` `\s` 등 escape 깨져 부산물 (`Cr50_proj` invisible-char dir) 생성. ls/test 안 잡혀 정리 어려움 | bash에서 Windows path 인자 시 **single quote** 또는 POSIX `/c/...` path 사용. 부산물 정리는 PowerShell `Remove-Item -LiteralPath` 사용 |

→ 본 vault R50 setup, NCS 빌드, Zephyr 빌드 등 cross-shell 환경에서 빈번. **cross-shell path quoting 표준화 carry** (thought 후보).

### gotcha — PyTorch 환경 박제 (Python 3.13 sandboxed vs 3.14 Programs) ⭐

| 함정 | 회피 |
|---|---|
| Microsoft Store sandboxed Python 3.13 vs Programs 3.14 — pip install 시 어느 python에 들어가는지 확인 필수. PATH `pip` first vs `python -m pip` 다름 | `C:\Users\...\Python314\` 명시 호출 + `where pip` 사전 확인. 또는 venv 활성화 후 `python -m pip`. `where python` + `where pip` 동시 검증 |

→ R50 Step 1 INT8 quantization 학습 시 다시 발현 가능성. uttec-search venv (`uv venv 우회`) memory 박제와 유사 패턴. Python 환경 다중성 함정 인벤토리 추가.

### 박제 가치

- 본 vault Windows + Python + bash 셋업 영구 자산 (다음 신규 보드/모델 setup 즉시 재활용)
- ESP32 #14 family (Windows cmd `cd .` cwd reset) cross-shell 함정 누적 → **cross-shell 환경 함정 인벤토리 단일 패턴 가치** (강사양성·위시캣 견적 자산)

자세히 [[2026-06-03_R50-touch-mnist-path-D-산업응용]] + [[onDevice-ai]] § R50 + [[build-gotcha-inventory]].

---

## 2026-06-01 — CMSIS-NN API filter_dims layout mismatch + CMSIS-DSP sub-option 명시 + esp32 carry 3 함정 (R44/R45/R46) ⭐⭐⭐

ondevice-claude 카드 3장 일괄 흡수 (5/30 R41 Path B SW carry + R42 신설 + 6/1 R44 INT8 PASS + R44/R45/R46 verdict).

### gotcha R46-nrf1 — CMSIS-NN `arm_fully_connected_s8` filter_dims layout mismatch ⭐⭐ (영구 자산)

| 함정 | 회피 |
|---|---|
| CMSIS-NN `arm_fully_connected_s8` API expected filter_dims = `[in_dim, 1, 1, out_dim]`, memory layout = `[in_dim × out_dim]` (in_dim major) ↔ 본 vault carry weights = `[out_dim × in_dim]` row-major → API가 weights 잘못 해석 → accuracy random (~1/N_classes) + latency 정상 (조용한 실패) | **진단 단서**: "accuracy random + latency 정상" → first-check filter layout. 우회: `arm_nn_vec_mat_mult_t_s8` ([out × in] row-major 직접 호환, 동등 가속). 향후 모든 CMSIS-NN port (R47+) default = `vec_mat_mult_t_s8` |

### gotcha R45 — CMSIS-DSP sub-option Kconfig 명시 필수 ⭐

| 함정 | 회피 |
|---|---|
| `CONFIG_CMSIS_DSP=y` 만으로 부족, `CONFIG_CMSIS_DSP_STATISTICS=y` 명시 필수 → 1차 build "undefined reference to `arm_dot_prod_q7`" (Nordic § #16 carry 패턴 일관) | sub-option 카테고리별 Kconfig 명시 체크리스트 박제 |

### gotcha R45 본질 — CMSIS-DSP dot product 단독 가속 미미 (negative finding) ⭐⭐

plain C가 gcc 12.2 `-Os`에 이미 SMLAD vectorize 잘 됨 추정. **API 단위 가속 본질 ≠ library 차이 본질** (CMSIS-DSP / CMSIS-NN 모두 SMLAD 활용). 진짜 본질: **fused operation (matmul + bias + requant) vs separate** (dot then requant). R46 CMSIS-NN full FC 3.14× vs R45 dot only 1.077× 비교가 입증.

→ 향후 가속 API 선택 시 "fused vs separate" 본질 평가 의무. dot/matmul 단독은 vectorizer 이미 잘 함.

### esp32s3 신규 함정 3건 (R44 carry — Windows 환경 cmake/ninja 영역) ⭐

| # | 증상 | 우회 |
|:-:|---|---|
| #17 | bootloader build.ninja race — 첫 patch_ninja → main만 patch, 첫 build에서 bootloader/build.ninja 생성됨 → ar fail | 첫 build fail 후 patch_ninja 재실행 |
| #18 | CMakeTestCCompiler 우회 (함정 #14 새 발현) | 사용자 CMakeLists.txt `set(CMAKE_C_COMPILER_WORKS TRUE)` + `_CXX_` 명시 |
| #19 | Initialize-Idf.ps1 PythonCommand fail — idf-env config null 반환 | `export.ps1` 직접 호출 |

→ ESP32 함정 #14 family (Windows cmd `cd .` cwd reset)가 cmake/ninja 환경 다양한 영역에서 발현 — #17/#18 모두 같은 root cause 다른 표현. **"Windows cmd path semantics" 패턴 박제 가치** (thought 후보).

## 2026-06-02 — Tower 양산 출하 전 RA 6 → 15 확장 (revita ingest #14-A/B) ⭐⭐⭐ UPDATED

revita-claude 카드 #2026-06-02-001 흡수. ingest #14-A/B (link_v2 자체 시험 10/10 PASS + 원본 버그 4건 발견 + Button/LED carry 2건 + v2 마이그레이션 1건 + 메타 2건) carry 위험 **9건 신규** 추가. 6/1 ingest #13-A 6건 + 6/2 9건 = **15건 양산 출하 게이트**.

### 기존 6건 (2026-06-01 ingest #13-A, carry)

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 1 | LTE 미완 4 TODO (LWT/KMQTTPUB/mTLS/E2E) — RM76 실기 검증 대기 | 양산 일정 risk |
| 2 | ADC 배터리 실측 stub (`power_module.c #if 0`) — AIN7 분압 ×5.545 박제됨 | 양산 전 반드시 해소 |
| 3 | USB CDC RX handler 미등록 | Core3506 통신 운영 즉시 fix 필요 |
| 4 | Button LONG 미정의 (≥3000ms) — 공장 초기화·BLE 페어링 후보 | 미합의 carry |
| 5 | BLE module 전체 stub (15줄 LOG only) — OTA·등록·상태 조회 | 양산 페어링 경로 부재 |
| 6 | `TOWER_DM_BOOT_TEST` mode 1 양산 빌드 혼입 risk — auto UPDATE seed 양산 섞이면 sync_lost 가시성 상실 | 빌드 정책 강화 필요 |

### 신규 9건 (2026-06-02 ingest #14-A/B) ⭐⭐⭐

**원본 link_v2 버그 4건 (link_v2_test/ 사본에서 fix 검증, 원본 미반영 carry)**:

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 7 | `sensor_module.c:271` NVS push chunk `MIN(9U, remain)` → `device_manager_nvs_write_cfg` 가 `n_apply > 8U` 거절 → sensor CFG NVS 쓰기 **항상 실패** → CONFIG_END=NVM_FAILED. fix: `MIN(8U, remain)` ★ | sensor CFG NVS 영구 실패, 양산 boot trap |
| 8 | `device_manager.c:783,830` `nvs_write` 반환값 오판 — Zephyr `nvs_write` 미변경 시 `ret=0` (정상). 코드는 `ret == buf_size`만 성공. fix: `ret >= 0` ★ | NVS write idempotent 케이스 false fail |
| 9 | `sensor_module.c:248 + dm_build_factory_blob` — NVS 비어있을 때 sensor CFG `memset(0)` → hmask=0/mmask=0 → CRON 정상 스케줄 불가, 10분 fallback. fix: `sensor_cfg_valid` 에 all-zero 무효 체크 추가 ★ | 신규 device boot 시 CRON 부정확 (10분 fallback) |
| 10 | `rs485.c:290` wait_rx drain 응답 유실 — TX 완료 직후 응답 첫 1~2B 가 빠르게 FIFO 도착, wait_rx의 drain 루프가 폐기. fix: wait_rx drain 제거 ★ | RS485 Modbus 응답 첫 byte loss → CRC fail |

**Button/LED carry 2건**:

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 11 | GPIOTE handler 수 부족 (`CONFIG_NRFX_GPIOTE_NUM_OF_EVT_HANDLERS=1`) — LoRa DIO1 단독 점유 → 버튼 P0.05 GPIO 인터럽트 등록 실패 → 무반응. fix: `=4` | 버튼 무반응, 사용자 인터페이스 fail |
| 12 | Button LED 12V 부스트 미활성 — `btn_handle_short()` 가 LED GPIO set 만, 12V (P0.17) 미요청. LED 회로 12V 필요 → 미점등. fix: `power_12v_request(POWER_12V_REQ_BUTTON)` 추가 | LED 미점등, 시각 피드백 0 |

**v2 마이그레이션 carry 1건**:

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 13 | link_v2 v2 와이어 (dest+src 4B) **다른 앱 미반영 점검** — link_v2_test_tower 는 PATCH 11건 (#14-A 정착) 으로 정합, **kc_cert_link_v2 등 다른 앱 호출부 점검 필요**. 컴파일 에러 (`src_node_id` 인자 미반영) 패턴 동일 가능 | 인증 트랙 빌드 break, 양산 fork 위험 |

**메타 carry 2건**:

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 14 | 디버그 로그 잔존 (`tower_lora.c` LOG_WRN / `rs485.c` / `sensor_module.c`) — 통신 안정 후 제거 | 양산 시 LOG 노이즈 / FLASH 낭비 |
| 15 | `k_msleep(500)` 12V 안정화 누락 — 1차 추정 원인 (실제 원인 아니지만 마진 확보 검토) | 초기화 안정성 margin 부족 가능 |

→ **15건 양산 출하 게이트** = revita 양산 라인 onboard 자산. 강의·교재 자산화 가치 매우 높음 (펌웨어 디버깅 실전 사례 15건). [[revita]] § 6/2 ingest #14-A/B + [[strengths]] §11 펌웨어 원본 품질 게이트.

## 2026-06-02 (야간) — 양산 RA 15 → 24 확장 (revita ingest #15 + 배터리 인증) ⭐⭐⭐ NEW

revita-claude 카드 #2026-06-02-003 흡수. ingest #15 TC-21 후속 (4건) + 배터리 인증 5 범주 분리 (5건) = **9건 신규** 추가. RA 15 → 24.

### #15 신규 4건 (TC-21 후속 + Tower SBC 조사)

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 16 | CONFIG 순서 silent reject — `sensor_module.c:1287` CONFIG_CREATE 는 SESSION_OFF 일 때만 허용, SESSION_ON 에서 silent reject (코드 alert 없음) | 운영 매뉴얼 의존 함정, 양산 IQC 절차 매뉴얼화 가치 |
| 17 | 센서 qty 양 트랙 통일 누락 — link_v2 측 qty=3 정착, kc_cert_link_v2-test 도 동일 갱신 필요 | 인증 트랙 fork → 양산 회귀 risk |
| 18 | 센서 레지스터 맵 미확정 (reg0/reg2 의미, reg1 물리량 미확정 — 실측 0x0108=264만 박제) | 신규 sensor 모델 도입 시 의미 부재 carry |
| 19 | Tower SBC 대체 결정 (Core3506 Linux $17 vs ESP32-P4+C6 RTOS $14) — 채택 미결정 | Core3506 Linux 앱 코드량 확인 후 결정 carry |

### 배터리 인증 5 범주 신규 5건 (현 KC 트랙 직교) ★★★

배터리 직접 시험 = KC 62133 (셀 안전) + 충전기 KC (솔라/외부) + UN38.3 (운송) — **현 `entity-kc-cert` family (EMC/RF/기능시험 중심)와 직교**. 양산 출하 전 별도 해소.

| # | 위험 | 양산 영향 |
|:-:|---|---|
| 20 | 셀/팩 모델 확정 + KC 62133 인증서 확보 — 양산 BOM 확정 시 우선 의사결정 항목 | 인증 비용/기간 (KTL/KTC, 비용 수백~수천만원, 8~12주) 좌우 |
| 21 | UN38.3 시험성적서 확보 — 양산 출하 전 항공/해상 운송 필수 | 미확보 시 양산 출하 자체 차단 |
| 22 | PCM 보호회로 검증 — 셀 인증서 범위 일치 확인 (셀 인증품 사용 시 보호회로 동일성 검증) | 자체 PCM 설계 시 별도 시험 필요 |
| 23 | 솔라 충전회로 → 충전기 KC 적용 여부 결정 — 솔라 회로 확정 시 (MPPT/PWM 구조에 따라 분기) | 완제품 내장 솔라 시 충전기 KC 적용 가능 |
| 24 | 외부 어댑터 (있으면) KC 인증 어댑터 사용 확인 | 미인증 어댑터 사용 시 양산 출하 게이트 fail |

### 분기점 (핵심 의사결정)

- **셀/팩 외부 인증품 구매** → 완제품 측 시험 면제 (인증서 보관만)
- **자체 셀 조립 + PCM 직접 설계** → 자체 인증 필요 (KTL/KTC, 비용 수백~수천만원, 8~12주)

→ **양산 캐파 산정 진입 시 셀 모델 확정이 우선 의사결정 항목**. 다른 부품 (BLE/LoRa/MCU)보다 인증 cost·duration impact 가장 큼.

→ **24건 양산 출하 게이트** (#15 4건 + 배터리 5건 추가). [[revita]] § 6/2 ingest #15 + [[strengths]] §12 인증 매니지먼트 역량 + [[2026-06-02_certification-tracks-matrix]] (신규) + [[ai-direction]] §결정 29~31.

### 운영 절차 silent failure 패턴 (#15 #16 일반화)

CONFIG 순서 silent reject = 운영 매뉴얼 의존 + 코드 alert 없음. **양산 IQC 자동화 인프라 (kc_cert_link_v2-test)의 다음 단계 = 운영 절차 자동 검증 도구** 단서. 다른 영역도 동일 패턴 가능 (NVS slot 순서, 12V boost 의존성 등).

→ thought [[2026-06-02_certification-tracks-matrix]] § 자동화 가지치기 단서 + 강의·교재 자산화.

## 2026-06-01 — search 외부 mode 메모리·세션 turn-off 옵션 미구현 ⭐ (Phase 5/6 candidate)

search-claude 카드 #2026-06-01-002 (E·F·H·I·J) 흡수. 정체성 D (dogfooding-via-self) 결단 → `.claude/memory/*.md` + `.claude/sessions/session_*.md` 인덱싱 본인용 OK. **단 외부 deploy 시 turn-off 옵션 필수** — 위시캣 마스킹·세션 carry-over 누설 위험.

| 함정 | 회피 |
|---|---|
| search vault 본인용 dogfooding mode (memory + session 인덱싱 ON)를 외부 deploy 시 그대로 노출 → 회사명·세션 carry 룰·내부 결단 누설 | 환경변수 `SEARCH_EXTERNAL_MODE=1` 시 memory_root + session_root collect 스킵. Phase 5 또는 6 신설 필수 |

→ memory `project_search_external_mode_gap.md` 박제 완료. [[search]] § Phase 4.3 megasession.

## 2026-05-29 — vanilla Zephyr STM32 DMIC 정식 지원 0 + vendor reference manual 누락 spec (R41) ⭐⭐⭐

R41 Path A 본격 진입 시 발현. vanilla Zephyr 4.3.99 STM32 DMIC 정식 지원 0건 확인 (`samples/drivers/audio/dmic/boards = STM32 0 보드` + `dmic_stm32 driver 0건`). 본 vault custom Zephyr patch chain (binding 1 + driver 8 + overlay v3 + main.c) carry로 11.5/12 단계 PASS 검증.

| 함정 | 회피 |
|---|---|
| Zephyr upstream에 vendor driver 정식 지원이 있을 것이라는 가정 → 실제 zero coverage (특정 driver/board) 발견 시 본 vault custom patch chain 필요 | upstream sample/driver coverage **사전 grep 검증** (`west grep` / `find . -name "*.c"`) + 0 발견 시 custom patch chain 1~2주 작업 시간 박제 |
| vendor reference manual (ST RM0399 등)에 명시 spec이 있을 것이라는 가정 → 실제 누락 spec 발견 시 R&D 가치 (Zephyr upstream PR 기여) | vendor doc 검증 시 실측 register dump cross-check 의무화. 누락 spec 발견 시 Zephyr upstream PR 후보 + 외부 영업 자산화 |

→ entity [[build-gotcha-inventory]] § STM-17~21 (R41-2 binding / R41-3 SRAM4 nocache / R41-4 i2s_stm32_sai BDMA / ACR1.DMAEN write protection / BDMA SRAM4 D3 buffer) + [[stm32h745-disco]] § R41 absorb + thought [[2026-05-29_R41-Path-A-본격-진입-stm32h745-SAI4-BDMA]].

## 2026-05-29 — RAK4631 I2C 핀 충돌 (link 계열 전체 적용) ⭐

revita ingest #12 정착 시 발견. RAK4631 기본 DTS의 I2C0(P0.13/14)·I2C1(P0.24/25) 활성이 Valve X(P0.13/14), Buzzer(P0.24), Valve Y(P0.25)와 핀 충돌 → silent build OK + runtime valve/buzzer 동작 0.

| 함정 | 회피 |
|---|---|
| RAK4631 default DTS의 I2C 핀 점유가 valve/buzzer/sensor와 silent 충돌 → build/boot OK + runtime device 0건 | overlay에 `&i2c0 { status = "disabled"; }; &i2c1 { status = "disabled"; };` 추가 + RAK4631 default DTS 핀 점유 표 박제 (강의·교재 자산화 가치) |

→ entity [[revita]] § 5/29 정착 + thought [[2026-05-27_revita-IQC-자동화-인프라]] § 5/29 갱신.

## 2026-05-28 — Zephyr stm32 fmc_sdram driver Kconfig 활성 누락 (STM-16) ⭐

R38 Phase A 진입 시 발현. dts node `status="okay"`만으로 SDRAM access 시 Imprecise BUS FAULT → ZEPHYR FATAL ERROR 26. build·boot 정상이라 사전 검출 불가.

| 함정 | 회피 |
|---|---|
| Zephyr stm32 family SDRAM 사용 시 dts node만 활성하고 `prj.conf` Kconfig 누락 → 첫 access 시 panic, no recovery | `prj.conf`에 `CONFIG_MEMC=y + CONFIG_MEMC_STM32_SDRAM=y` 추가 (FLASH +1.5KB). dts + Kconfig **양쪽** 활성 체크리스트 박제 |

→ entity [[build-gotcha-inventory]] § STM-16 + 다른 STM32 + SDRAM 보드 (H7Sx / H7Bx / F4xx) 동일 패턴.

## 2026-05-28 — dts upstream 정의 vs SFDP 실측 격차 (Macronix QSPI 64→128MB) ⭐⭐

Zephyr upstream `boards/st/stm32h745i_disco/...dts` line 47-50 `DT_SIZE_M(64)` + ST UM2381 (MX25LM51245G 512Mbit) 박제 → **SFDP 실측 128 MiByte** (MX66LM1G45G 1Gbit 추정). 본 vault도 5/27 Wave 14 흡수 시점에 dts 기반 "64MB" 박제했다가 R38 정정.

| 함정 | 회피 |
|---|---|
| 보드 메모리 capacity 박제 시 vendor user manual + Zephyr dts upstream만 신뢰 → 실제 보드 revision 차이 / SFDP 실측 격차 잔존 | 측정 가능한 자원 (Flash / RAM / Clock / PHY) 박제 시 **실측 검증 우선** (Zephyr boot log / SFDP / measurement) + dts·UM 사용 시 † footnote ("dts upstream 기반, SFDP 미실측") |

→ thought [[2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]] + entity [[stm32h745-disco]] § R38 absorb + [[ai-fanstick]] § 시나리오 E 박제 정정.

## 2026-05-28 — baseline 추정값 cross-check 부재 함정 (R36/R37 artifact 정정 사이클) ⭐⭐⭐

5/27 R36 (Wave 14) + R37 (Wave 15) 박제 두 건 모두 **잘못된 pca10056 baseline 추정값 (~1,798μs)에서 비롯된 artifact**. 실측 CSV 단일 출처 (`results/pca10056/MLP/128_20260520-093645.csv` = 7,367μs) 재확인 후 정정:
- R37 M4 단독 "clock-norm 0.27× 미달 / 7번째 negative finding" → **0.99× ≈ 1.00× 정상** (positive 정정, negative 등재 취소)
- R36 M7 baseline "clock-norm 0.43× 미달 / DTCM 미배치 본질 분리 R37 후속" → **1.76× 빠름** (Cortex-M7 IPC gain 1.78× 카탈로그 매칭)

| 함정 | 회피 |
|---|---|
| baseline 박제 시 정확한 단일 출처 (실측 CSV) 대신 **추정값** 사용 → derivative 박제 모두 artifact (가설 검증·결단 trigger·negative finding 모두 영향) | baseline 박제 시 **단일 출처 (실측 CSV 파일 경로)** 명시 + 다른 박제와 비율 검증 시 같은 단일 출처 참조 |
| **비정상치** 발견 시 (Cortex-M4F 240MHz가 64MHz와 effective 동급은 카탈로그상 불가능) 그냥 박제 | 카탈로그 IPC 일관성 + 실측 baseline 재확인 + 펌웨어 진단 INFO emit (sys_clock + HAL_RCC + __OPTIMIZE_SIZE__) 추가 |

**일반화 원칙**: 박제 정확성 확보 = **단일 출처 (실측 CSV) 기반 박제 + 카탈로그 IPC 일관성 검증 + 사용자 challenge trigger 응답 SOP**. 다른 보드 measurement (Nordic / ESP32 / Linux PC / 다른 STM32 family) baseline 박제 시 동일 패턴.

→ thought [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]] + entity [[stm32h745-disco]] § 5/28 정정 cascade + [[build-gotcha-inventory]] § 자가 진단 정정 사이클 3번째 사례.

## 2026-05-28 — STM-15 INFO emit 위치 cache 영향 (측정 진단 코드 위치 효과) ⭐⭐

R36 paired-check 발견. printk + HAL_RCC peripheral access **위치**가 측정 결과 24% 영향:

| ID | 함정 | 회피 |
|:-:|---|---|
| **STM-15** ⭐⭐ | INFO emit (printk + HAL_RCC peripheral access) `model_run_bench` **전** 배치 시 I-cache layout 변동 + RCC register access first-trial cache cold → latency_avg 24%↑ (557→692μs) + p99 2.6×↑ (7400→19500μs). 5회 range 0 = 결정론적 build/cache 효과 (측정 잡음 아님) | INFO emit은 `model_run_bench` **후** 배치 (CSV 출력 후 DONE 전). 측정 직전 cache state 유지 |

**carrier 자산 (모든 보드 carry-over 가치)**: 본 vault 모든 보드 measurement 일관성 표준. Nordic / ESP32 / Linux PC / 다른 STM32 family 측정 시 동일 패턴 적용 (printk emit 위치 검증 SOP 필수). → entity [[build-gotcha-inventory]] § STM-15.

## 2026-05-28 — vendor 광고 cross-check 누락 위험 (영업 카피 49건 정정) ⭐⭐⭐

04_종합_비교_해설 23 § 전체 검토 시 영업 카피 stale 박제 다수 발견 (LiteRT rebrand 미반영 / Jetson Super 가격 인하 미반영 / stm32h745 메모리 spec 오류 / Exynos 980 process node 오류 / 한국마사회 = 농업 무관 등). 본 vault 박제 다수 출처 = vendor 광고 / wiki / 추정 → **5/28 검토 시 cross-check 필수**.

| 함정 | 회피 |
|---|---|
| 영업 카피 박제 시 vendor 공식 datasheet **단일 출처 확인 없이** 박제 → vendor 광고 stale + wiki / 추정 출처 잔존 위험 | 영업 카피 박제 시 **5단계 cross-check 의무화** (vendor 공식 datasheet + 5/28 web search + master 박제 + 본 vault 측정 자산 + 외부 추정 시 † footnote) |
| **본 vault 미측정 외부 추정** (TinyML 6 case 모델 크기 등) 박제 시 출처 명시 없음 → 영업 시 신뢰성 손상 | 외부 추정 박제 시 **† footnote 필수**: "본 vault 미측정, 외부 X 표준 자료 추정. 실제 model architect별 ±2×~5× 범위" |

→ thought [[2026-05-28_본vault-영업카피-신뢰성-강화]] + entity [[ai-fanstick]] § 영업 카피 직결 정정 + [[uttec-stage-package]] § vendor 광고 cross-check 5단계 정책.

## 2026-05-27 — 외부 시스템 ID 단조 증가 가정 함정 (위시캣 #155421 누락) ⭐⭐

`/wishket-check` 5/24 catch-up이 `#155593 ~ #155613` 검색 → **#155421 (1.5억 외주, 5/26 활성)을 시작 ID 미만으로 검색 범위 외** = 영업 손실 (잠재 Tier 2~3 외주 1건).

| 함정 | 회피 |
|---|---|
| ID 1씩 sequential 검색이 **단조 증가 가정**에 의존 — 위시캣은 외주 풀 별도 채번 / 비공개→공개 전환 시 옛 ID 재노출 가능 | 카테고리/필터 페이지 우선 검색 (외주(도급) 필터 = `?employee_type=projc_term`), ID sequential은 보조 |
| **비공개 redirect 함정** (PRIME/PRO/BOOST 한정 매칭) — 본문 fetch는 redirect되지만 목록 페이지는 비로그인 노출 | 등급별 매칭 인지 시 사용자 위시캣 등급 확인 트리거 + 목록 페이지로 우회 |

**일반화 원칙**: 외부 시스템의 ID 단조 증가 가정은 검증 없이 신뢰 금지. catch-up 패턴 작성 시 카테고리/필터 페이지 우선 + ID sequential 보조. GitHub PR (organization-wide), Notion DB (UUID), Asana/Trello 카드 ID 등 다른 도메인에도 적용 가능.

→ thought [[2026-05-27_위시캣-외주필터-사전확인-SOP]] + memory `feedback_wishket_outsourcing_filter.md` + entity [[위시캣활동]] § 검색 방식 진화.

## 2026-05-26 — STM32 14번째 보드 11 함정 single-day cluster ⭐⭐⭐ (Wave 12/13 흡수)

본 vault 첫 STM32H7 진입 시점에 단일 day 11 함정 cluster 박제 — 보드 첫 작업의 typical 함정 밀도. 12번째 함정은 Wave 13에서 minor 1건만 발현 (carry-over 효과 입증).

| # | 함정 | 카테고리 |
|---|---|---|
| STM-1 | 한글 경로 cmake 0xC0000409 | OS/path |
| STM-2 | 함정 #14 cd . cwd 보존 (Espressif carry-over) | toolchain |
| STM-3 | **dual-core boot** (M4 wwdg 잔존 console 점유) | dual-core ⭐NEW class |
| STM-4 | STM32CubeProgrammer halt 거부 | flasher |
| STM-5 | **보드명 자가진단** (사용자 "H746" → 실제 H745) | governance/self-diagnosis ⭐ |
| STM-6 | ST 사전 빌드 .hex segmented binary | vendor sample |
| STM-7 | LTDC backlight + display enable 누락 | LCD/peripheral ⭐NEW |
| STM-8 | 480×272 RGB565 framebuffer DTCM overflow | memory tier ⭐NEW |
| STM-9 | LD8 (PD3) active HIGH polarity (LD6/7과 반대) | board variant |
| STM-10 | PowerShell function scope New-Object cast | PowerShell (recurring) |
| STM-11 | USB silk-screen 확인 (H745 = CN13 USB FS NOT HS ULPI) | board variant ⭐ |
| **STM-12** ⭐ | **Zephyr 4.3 `net_mgmt_event_handler_t` uint32_t → uint64_t signature change (silent breakage 가능)** | **vendor API change** |

**일반화 함정 카테고리 (5/26 신규 박제)**:
- **dual-core boot**: M0/M4 partner 누락 시 wwdg 잔존 console 점유 (STM-3) — Hybrid SoC 시 패턴 재발생 우려
- **보드명 자가진단**: 사용자가 잘못된 이름을 알려도 3중 교차 검증 SOP (STM-5) — flasher + DAPLink + Zephyr board 정의
- **LCD/peripheral 활성 명시**: vendor sample이 backlight·display enable·polarity 누락 (STM-7/9)
- **memory tier overflow**: DTCM 128KB 같은 fast-access tier가 framebuffer 부족 (STM-8) — AXI SRAM 0x24000000 직접 + SCB_CleanDCache
- **vendor API silent breakage**: `net_mgmt_event_handler_t` uint32_t → uint64_t 같은 signature change가 warning만 (STM-12) — carry-over 시 silent breakage 위험

→ entity [[build-gotcha-inventory]] § STM32 12건 상세. thought [[2026-05-25_STM32H745-Zephyr-통합-cross-vendor]] + [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]].

## 2026-05-24 Wave 11 — NDK clang vectorizer 정책 함정 ⭐⭐⭐

| # | 함정 | 회피 |
|---|---|---|
| E1 ⭐ | NDK clang 18 `-O3 -march=armv8.2-a+dotprod` flag 인식하나 INT8 src를 `smlal` (INT16 promote) path 선택 → `sdot` 자동 미선택 (rpi5 gcc 14.2 같은 flag로 6.7× 가속과 정반대 0.97×) | 대안 없음 — mobile CPU/NPU 추가 SDK 도입 가치 없음 확정 (3 path 모두 negative) |

**일반화 원칙 (toolchain vectorizer 정책 = AI 가속 본질의 4번째 변수)**: same SIMD HW (asimddp) 보유라도 컴파일러 vectorizer 정책 차이로 6.9× gap 발생. AI 가속 본질 = HW + library + **toolchain 정책**. 다른 vectorize-dependent 작업에 일반화: LLM kernel (llama.cpp matmul), Scientific compute (BLAS, FFTW), Mobile/embedded 응용 (NDK clang 정책).

→ thought [[2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질]].

## 2026-05-23 야간 — Round 9 → v2.5 cascade evolution 시계열 박제 ⭐⭐

**원칙 박제**: "raw ISA baseline ≠ AI 가속 효과" 일반화 패턴.

| Round | 일자 | 핵심 결론 | 일반화 |
|:-:|:-:|---|---|
| 9 | 5/19 | LX7 plain C는 ARM 대비 9~38× 느림 | raw baseline (가속 ISA 미활용) |
| 17 | 5/20 | esp32s3 + ESP-DSP MLP +13.4× ⭐⭐⭐ | **LX7 = AI Vector ISA 우위 입증 (반전)** |
| 17.5 | 5/20 | TF SRAM +10.8× / CNN strided 적용 불가 | application class 한계 |
| 18 | 5/22 | pca10056 CMSIS-NN MLP +3.23× | LX7 단위 클럭 효율 5.64× M4F 우위 |
| 18후 | 5/22 | pca10040 64KB 12/12 RAM wall | RAM tier 적합도 = 4번째 조건 |
| 19 | 5/22 | Eden NPU NNAPI ‒79~421× | "Mobile NPU 항상 빠르다" 통념 반증 |
| **21** | **5/23** | **esp-nn CNN +2.93~2.95×** | **library selection by workload = 5번째 조건** |

**진짜 원칙 (5조건 곱)**: AI 가속 = ISA-specific instruction 폭 × workload class 매칭 × 메모리 계층 × RAM tier 적합도 × **library selection by workload**.

## 2026-05-23 야간 — esp-nn 빌드 함정 3건 (Round 21 신규)

| ID | 함정 | 회피 |
|:-:|---|---|
| R21-1 | ninja PRE_LINK/POST_BUILD `cd .` Claude Code harness cwd reset (Nordic R14 와 cross-vendor 동일 패턴) | wrapper script 안에서 cd 명시 |
| R21-2 | sections.ld-*.bat 상대 경로 fail | 절대 경로 변환 또는 `idf.py` 가 자동 처리하는 위치 |
| R21-3 ⭐ | **PowerShell 5.1 UTF-8 BOM 없으면 한글/em-dash CP949 fallback → parser 균형 깨짐** (cross-vendor 공통) | Out-File `-Encoding utf8` 명시 (이미 메모리 박제 reference_terminal_default_dir.md 와 일관) |

**누적 cross-vendor 빌드 함정**: Espressif 8 + Nordic 11 = **19건**. 강사양성 Day 5 모듈 자산.

## 2026-05-23 야간 — 위시캣 신규 등록 패턴 변화 (재택 외주 시장 축소 signal)

- 5/23 일상 검토: 신규 등록 45건 중 **공개 19건 = 84% 상주 + 비공개 25건 = 56% 비공개**
- 본 vault 영업 영역 (재택 펌웨어/IoT) 과 불일치 심화
- **함의**: 재택 외주 발굴 어려워지는 신호 → **AI 3대 사업 자체 영업 강화 필요한 시점**
- 다음 단계: thoughts/2026-Q2/위시캣-신규등록-패턴-변화-2026-05.md 신설 검토



## 본 vault 자산 인덱스 완전성 함정 (2026-05-21 신설)

본 vault + myWiki 자산 인덱스가 **자가 검증으로는 완전성 보장 안 됨** — 사용자 검증 cascade 없이 자산 누락 검출 실패. 5/20 + 5/21 사용자 직접 지적 cascade 2건 연속 발생 → 시스템 결함 입증.

### 누락 cascade 2건

| 날짜 | 누락 자산 | 발견 경로 | 영향 |
|---|---|---|---|
| 2026-05-20 | 정부 R&D 1억 PLC 4축 GMC 직접 수행 (2016~2017, 99.1% 집행률, 특허 10-2017-0138381) | 사용자 PDF 제공 | [[정부R&D실증사업]] entity 신설 (Tier 3 정부 R&D 입찰 표준 패턴 1순위 자산) |
| 2026-05-21 | nRF52832 USB 시리얼 (USB CDC ACM) + 연동 모바일 앱 수년간 양산 | 사용자 직접 지적 ("수년간 nRF52832를 통하여 USB 시리얼 통신을 구현해 왔고…") | myWiki 3 파일 갱신 (skills 행 신설 / strengths § 7 8종 / experience 박제) + #155539 솔직 약점 → 직접 양산 자산 격상 |

### 함정 본질

1. wishket-claude / mywiki-claude는 본 vault 인덱스만 보고 자산 평가 → 인덱스에 없으면 "없는 자산"으로 단정
2. 사용자(38년 임베디드 경력)의 머릿속 자산 → 본 vault 인덱스 = 비대칭 (사용자가 박제 안 하면 vault 모름)
3. 위시캣 지원서 작성처럼 자산 매칭이 직접 매출에 영향 주는 시점에만 결락이 노출됨
4. 매칭 못한 자산을 "솔직 약점"으로 잘못 기재 → 사용자 정정 cascade로 정정

### 회피책

- **룰 3 — 솔직 약점 명시 전 사용자 자산 확인** (`wishketProject memory/feedback_check_user_assets_before_weakness.md`): myWiki에서 모집 자격 자산을 매칭 못해도 "직접 양산 없음" 단정 금지. 사용자에게 1차 확인 후 박제 또는 약점 명시 결정
- **work-end 정기 자산 점검 SOP 신설 권장**: 영업 영역별 자산 자동 인벤토리 (USB 시리얼 / 산업 통신 / 영상 / AI / 모바일 / 풀스택 등)
- **wishket-apply 스킬 단계 추가 검토**: 모집 자격 매칭 시 약점 명시 전 사용자 confirm 단계 삽입

### 강의·교재 자산 가치

본 함정 패턴은 **1인 운영 second-brain 시스템 한계 사례**로 강사양성·obsidian 시리즈 강의 직접 자산. "자산 인덱스는 매번 자가 검증으로 보강해야 한다" 메시지의 모범 사례.

→ 관련 thought: [[2026-05-21_자산-인덱스-완전성-함정]]

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

## Mobile NPU NNAPI 부적합 함정 (2026-05-22 흡수 — ondevice Round 19 결정타) ⭐⭐⭐

### (A) Mobile NPU 광고 vs 실측 격차 (Galaxy A51 5G Eden NPU)

- **증상**: Samsung 2.1 TOPS 광고. NNAPI 표준 호출로 plain INT8 MLP 128~16384 (5셀) 측정 시 CPU Cortex-A77 + asimddp 대비 **79~421× 느림**. cross-over point 없음 (큰 셀일수록 더 손해).
- **원인**:
  1. NPU는 표준 ML model (MobileNet conv-dominant, batch>1, fixed graph fusion) 전용
  2. plain INT8 small dense layer는 NPU dispatch path overhead 큼 (per-forward execution_create / setIn/Out / Event_wait / memory copy)
  3. CPU asimddp `sdot` (NDK clang `-O2` auto-vectorize) = 1 cycle 4-way INT8 MAC × 4 lanes = 16 MACs/cycle
  4. `setReusable(true)` + `BurstCompute` 등 overhead 격리해도 효과 미미
- **회피책**:
  1. **application class 사전 확인** — small/medium dense + batch=1 + plain INT8 = NPU 부적합. MobileNet · large conv-dominant = NPU 적합
  2. **벤치마크 우선** — vendor 광고 신뢰 X, 자체 측정 필수
  3. Stage 4 패키지 영업 시 mobile NPU 제안 X — MCU 가속 (ESP-DSP / CMSIS-NN) 매트릭스로 전개

### (B) NNAPI auto-pick은 NPU 이미 선택 중 (잘못된 의심 차단)

`ANeuralNetworksCompilation_create` (auto) vs `ANeuralNetworksCompilation_createForDevices(eden)` (강제) 동일 latency (0.3% 차이). auto-pick fail 가설 반증. **200× 손해는 NPU dispatch 자체 비효율, dispatch failure 아님.**

### (C) PowerShell 5.1 함정 3건 (Round 19 신규)

- `-DBOARD_ID_STR="x"` 따옴표 벗김 → `'-DBOARD_ID_STR=\"x\"'` (single-quote + backslash escape)
- 한글 경로 `New-Item -Path` / `.NET CreateDirectory` 거부 → 영어 경로 사본 패턴 (`C:\ondevice_android\`)
- native stderr `2>&1` → NativeCommandError wrap → `$ErrorActionPreference='Continue'` + `cmd /c "... 2>&1"` 우회

→ 영업 적용: 위시캣 클라이언트 "AI 가속 NPU 칩" 요청 시 application class 사전 확인. 강사양성 Day 5 비교 사례에 본 데이터 추가. REVITA 모바일 응용 검토 시 본 패턴 적용.

## Round 18 Nordic 빌드·monitor 함정 패턴 (2026-05-22 흡수 — ondevice Round 18 CMSIS-NN 측정 시 발견) ⭐⭐

> pca10056 (nRF52840 Cortex-M4F) Round 18 CMSIS-NN MLP 3.23× 측정 ✅ 결과 도달까지 8차 시도 누적, ~3.5시간 빌드 함정 우회 비용 발생. Nordic 보드 측정 ecosystem 자산.
> 출처: `onDevice_AI/프로젝트_보드한계모델_v2.5/Round18_CMSIS-NN/03_결론.md` + `_inbox/processed/2026-05-22-002-round18-cmsis-nn-mcu-acceleration-axis2.md`

### (R18-A) Zephyr `CONFIG_STDOUT_CONSOLE=y` 누락 → printf newlib stdout 손실

`prj.conf` 에 `CONFIG_STDOUT_CONSOLE=y` 미설정 시 newlib `printf` 가 stdout 으로 emit 안 됨. 빌드는 성공, 펌웨어 동작, 그러나 monitor 측에 0 byte. console 침묵을 "보드 hang" 으로 잘못 진단 위험.

- **회피책**: Nordic + Zephyr 빌드 시 `prj.conf` 표준 항목 — `CONFIG_STDOUT_CONSOLE=y` + `CONFIG_PRINTK=y` + `CONFIG_CONSOLE=y` 3종 묶음 기본 포함.

### (R18-B) Zephyr newlib stdout fully buffered → `fflush(stdout)` 필요

Zephyr newlib stdout 은 line buffered 아닌 fully buffered. `printf("CSV,...\n")` 만으로는 flush 안 됨 → monitor 가 첫 줄 결과 못 받음.

- **회피책**: 각 측정 결과 emit 직후 `fflush(stdout);` 명시. 또는 `setvbuf(stdout, NULL, _IOLBF, 0);` 으로 line buffered 강제 (boot 시 1회).

### (R18-C) ⭐⭐ Zephyr 4.3.99 newlib console redirect 결함 의심 — `printk` 우회

Zephyr 4.3.99 (nRF Connect SDK 통합 버전) 에서 `printf` + `fflush` + `CONFIG_STDOUT_CONSOLE=y` 3종 모두 설정해도 console 출력 무효. **`printk` 로 직접 emit 해야 정상 동작**. newlib console redirect 경로의 board-specific 결함 추정.

- **증상**: `printf("CSV,%s\n", buf); fflush(stdout);` → 0 byte. `printk("CSV,%s\n", buf);` → 정상.
- **회피책**: Nordic pca10056 + Zephyr 4.3.99 측정 코드는 measurement emit 부분만 `printk` 사용. application 다른 부분은 `printf` 유지 가능.
- **추후 검증**: Zephyr 4.4+ 또는 nRF Connect SDK 다음 메이저 릴리스에서 재현 여부 확인 필요.

### (R18-D) `esp32_monitor.py` `CSV,esp32` prefix → Nordic 매칭 실패

기존 sweep monitor (`esp32_monitor.py`) 가 ESP32 board ID 가정으로 `^CSV,esp32` regex 사용 → Nordic 출력 `CSV,pca10056,...` 미매칭 → 결과 파싱 0건.

- **회피책**: monitor regex 를 `^CSV,` 만으로 완화 (board ID 별도 column 으로 parse). board prefix 가정 제거.
- **일반화**: 측정 자동화 파이프 cross-board 호환은 board-agnostic prefix 가 표준.

### (R18-E) ⭐⭐ monitor race — 보드 emit ms 단위 → connect 전 종료

pca10056 (Cortex-M4F + CMSIS-NN) MLP 128 측정 = **2,285μs** = 2.3ms. 보드 boot → 측정 emit → 종료가 ms 단위로 끝남. monitor 가 USB CDC ACM 연결 완료하기 전에 보드가 이미 emit 완료 후 idle. driver buffer 잔존 없음 → 결과 0 byte.

- **증상**: pyserial open() 직후 readline() timeout. 보드 reset 다시 안 누르면 결과 못 받음.
- **회피책**: monitor 시작 후 **1.5초 backoff** + background `nrfjprog --reset` trigger. monitor 가 connect 완료한 후에 보드 reset → 측정 emit 안전하게 capture.
- **일반화**: 빠른 보드 (μs~ms 측정) 일수록 race window 작음. monitor first / reset second 시퀀스 표준화 필요.

→ **5건 모두 강사양성 Day 5 사례 자산** + 1인 시공 함정 시리즈 확장. "측정 자동화 시 monitor↔보드 race / console redirect 결함 / 빌드 옵션 누락" 패턴을 임베디드 견적·강의 모듈로 활용 가능.

→ **Round 17 ESP-DSP 함정 (#18~#21) + Round 18 Nordic 함정 (R18-A~E) = MCU AI 가속 빌드 함정 10건 누적** (각각 별도 vendor toolchain → cross-vendor 함정 인벤토리 완성).

### Round 18 후속 — Nordic 보드별 setup 함정 (2026-05-22 야간 흡수, pca10040 12/12 RAM wall 측정 시 발견) ⭐

pca10056 본편 sweep 때 없던 2건. pca10040 보드별 unique 함정. Nordic 함정 11건 누적 cross-vendor 인벤토리 완성.

#### (R18-F) ⭐ pca10040 APPROTECT (readback protection) 활성 → flash 시 `nrfjprog error -90`

`nrfjprog --program ... -f NRF52 --snr <SN>` → **`Access protection is enabled, must be recovered`**. pca10056 는 unprotected, pca10040 은 protected = 보드별 vendor 출고 default 설정 차이.

- **회피책**: sweep 시작 전 1회 `nrfjprog --recover -f NRF52 --snr <SN>` (~30초, AP protect 해제 + UICR/flash erase)
- **일반화**: Nordic 신규 보드 추가 시 첫 flash 시도에서 `error -90` 발생하면 본 함정 의심. recover 후 다시 시도.

#### (R18-G) ⭐ `--recover` 후 USB re-enumeration → VCOM 번호 변경

recover 직후 보드 USB 재enumerate → VCOM0/VCOM1 COM 번호 변경 (예: COM33/COM34 → COM35/COM36). 동일 보드, SN 그대로, **COM port 만 바뀜** = USB host driver 의 device descriptor 재할당 추정.

- **증상**: recover 성공 후 기존 sweep script 가 옛 COM port (`COM33`) 로 연결 시도 → device not found
- **회피책**: recover 직후 `nrfjprog --com` 재실행 → 새 COM port 재detect → `$env:NRF_COM` (콘솔 primary VCOM0 번호) 갱신 후 sweep 시작
- **일반화**: AP recover 후에는 반드시 COM 재assignment 확인. 미래 Nordic 보드 추가 시 본 SOP 자동 적용.

→ **누적 11건 (Round 17 ESP-DSP 4 + Round 18 본편 5 + Round 18 후속 R18-F·G 2) = MCU AI 가속 cross-vendor 함정 인벤토리 완성** (Espressif + Nordic 2종 vendor toolchain). 미래 신규 Nordic 보드 (nRF52833 / nRF5340 등) 추가 시 본 함정 11건 SOP 자동 적용.

→ **강의 자산**: 강사양성 Day 5 비교 사례 모듈에 본 11건 cross-vendor 인벤토리 추가 가능 — "임베디드 견적 시 1인 셋업 함정 ~3.5시간/보드" 정량 (Round 18 본편 8차 시도 누적 사례).

## Claude CLI `--resume` + 긴 `--system-prompt` fork 함정 (2026-05-22 흡수 — search Phase 2 T2/T3 spike) ⭐⭐

### (A) 증상

`claude --print --resume <session_id> --system-prompt "<긴 prompt>"` 동시 전달 시 CLI 가 **fork** 처럼 동작 → 새 session_id 발급 → history 끊김. resume 의도 무효.

- 짧은 prompt + resume: `sid 동일`, history 유지 ✅
- **긴 prompt + resume**: `sid 다름`, history 끊김 ❌

`--system-prompt` 가 짧으면 정상 동작 (search T2 spike ~70자 OK). search 의 SYSTEM_PROMPT (1334자, strict 룰) 같이 길면 발생. 임계값은 명확하지 않으나 ~수백 자 부근에서 trigger 추정.

### (B) 해결 패턴 (검증 완료)

| 호출 시점 | 처리 |
|:-:|---|
| **첫 호출** (`claude_session_id=None`) | `--system-prompt <긴 prompt>` 전달 → Claude session 에 prompt 박제 + 새 session_id 발급 → 응답 + session_id 저장 |
| **후속 호출** (`--resume <session_id>`) | `--system-prompt` **생략** — Claude session 안에 박제된 prompt 자동 적용 |

**부가 이점**: 후속 호출 `input_tokens` 거의 0 (cache 100% 활용) → 매우 저렴. 사용자 Max 구독자에게도 측정 가능.

**검증 코드**: `C:/todo/search/.tmp/spike_t3_no_sysprompt_resume.py` (재실행 가능).

### (C) 재사용 가능 vault (multi-turn Claude backend 모두)

| Vault | 적용 시나리오 |
|---|---|
| uttecHome backend | UTTEC 챗봇 (사용자 노출 트랙, 회사 소개·제품 질문 multi-turn) |
| lemonLabs 도구 | 4 트랙 (Bridge / Mentor / Daily / Strategy) 챗봇 |
| REVITA web | 제품 사용 가이드 챗봇 |
| n8nUttec | n8n workflow trigger 후 Claude 와 대화형 점검 |
| wishketProject | 자동매칭 결과 + 사용자 추가 질의 대화 |
| 강사양성 LMS | 학생-튜터 대화 (Day 5~7 모듈) |

→ **multi-turn Claude backend 표준 패턴 박제**. search Phase 2 가 첫 검증 사례. 본 함정 회피 없이 backend 구현 시 사용자 답변에 history 끊김 → "대화가 안 됨" 버그 발생 위험.

### (D) 관련 thought

[[2026-05-22_claude-max-cli-subprocess-pattern]] § 후속 (WebSocket + --resume 세션 모델) — multi-turn backend 일반화 패턴.

## search vault 셋업 함정 (2026-05-21 흡수 — search-claude 합류) ⭐

### (A) Junction 루프 (search/raw/myWiki ↔ myWiki/raw/search)

- **증상**: search vault `.gitignore` 에 `raw/` 미등록 시 `git add -A` 가 양방향 junction 을 따라가 "Filename too long" 무한 재귀.
- **원인**: search 측이 `raw/myWiki` junction 으로 today/myWiki 를 마운트, today/myWiki 도 `raw/search` 역방향 junction 으로 search 를 마운트 → 양쪽 모두 git tracked 상태면 cycle.
- **회피책**: vault 분리 시 `.gitignore` 에 `raw/` 무조건 추가. junction 은 로컬 마운트 전용, commit 대상 아님.

### (B) Anthropic SDK API key 인증 vs Claude Max OAuth

- **증상**: backend 가 `anthropic` SDK 로 API 호출 시 별도 sk-ant-... key 필요. 사용자가 이미 Claude Max 구독 중이면 추가 비용 부담 + 키 관리 부담.
- **회피책**: `claude --print --output-format json --system-prompt "..." --strict-mcp-config --setting-sources project` subprocess 패턴으로 Max OAuth 그대로 활용. 다른 vault backend 도 동일 패턴 재사용 가능. (`--bare` 는 ANTHROPIC_API_KEY 강제라 제외, `--strict-mcp-config` 없으면 사용자 MCP 서버 의도치 않게 로드되어 Calendar fabricate 등 사고)

### (C) Claude CLI 가 사용자 MCP / global CLAUDE.md / memory 자동 로드 (fabricate 사고)

- **증상**: search backend 가 `claude --print` 만 호출 → 위키에 답 없는 질의 ("오늘 할일") 에 Google Calendar 인증 안내 fabricate.
- **원인**: 사용자 `~/.claude.json` 에 등록된 MCP (Calendar 등) 가 자동 로드 → 모델이 그 tool 목록을 보고 "도움이 되려" 안내 생성.
- **회피책**: `--strict-mcp-config` (no `--mcp-config`) + `--setting-sources project` + system prompt 에 "외부 도구·인증 언급 금지" 명시 + fabricate 차단 응답 형식 강제.

### (D) LoRa 야외 노드 하드웨어 선정 함정 (2026-06-15, lora-claude cascade 002 흡수)

- **"Heltec heltec_* 보드 = CubeCell" 아님**: Arduino esp32 패키지의 Heltec 보드(WiFi LoRa 32 등)는 **ESP32 기반**. CubeCell(HTCC-AB01)은 **별도 PSoC(ASR650x) 패키지** — 보드 패키지·코어 혼동 시 컴파일·핀맵 전부 어긋남.
- **회사 명성·양산 신뢰성: RAK(RAKwireless) > Heltec**. Heltec은 메이커·프로토타입 강세, RAK는 상용·게이트웨이·Helium 인지도. **양산·인증(KC 등) 중시 시 RAK 계열(RAK3172=STM32+SX1262) 검토 가치**.
- **공통 안전 함정**: SX1262 보드는 **안테나 미연결 TX = 칩 손상 위험**. 굽기 전 IPEX 안테나 체결 필수. (→ [[2026-06-15_솔라전원-LoRa노드-전원체인-Nordic-LongRange]] §4 아키텍처 2분기)

## 2026-07-05 흡수 — revita ingest #18~#23 교재 함정 + 양산 게이트 결함 2건 (revita-claude 카드 5장) ⭐⭐⭐

강의·컨설팅·포트폴리오 사례연구 자산 가치 최상급. 임베디드/분산 시스템 공통 함정으로 재사용.

### ★ 양산 출하 게이트 결함 2건 (revita 타워, #18) — 출하 차단 사유

1. **`ACTIVATED_NORMAL` 정식 활성화 경로 부재** — relay 게이트가 이 상태를 요구하나 펌웨어에 전환 명령이 없음 → **제품 출하 시 relay 0건**. 시험은 NVS 직접 주입(`nvs_dm_inject.py`)으로 우회한 것 = **"시험은 통과인데 제품은 동작 안 하는"** 전형 함정. 우회 시험 시 정식 경로 미구현을 반드시 결함으로 분리 등록.
2. **레거시 peer 자동 이관 불가** — 구 NVS 스킴이 link_id 상위바이트 미저장 → 구→신 OTA 시 peer 유실, 운영자 재등록 필수 = **OTA 마이그레이션 호환성 실패**.

### 교재 함정 (강의·컨설팅 1급 자산)

- **"LED 켜짐 ≠ USB 통신됨"** (#19) — J-Link 전원 LED 점등에도 호스트 USB 열거 0건 → 데이터선/허브 단계 단절. 분리진단 사례.
- **"HW RC 디바운스 필수 (SW 디바운스 폐지)"** (#19) — 버튼 10초 홀드 게이트가 채터링 취약 → HW RC(1~10kΩ+100nF) 미적용 시 SHORT/LONG 오판. "펌웨어로 못 덮는 HW 결함".
- **"OTA 됐는데 전원 끄면 롤백"** (#20) — MCUboot test 슬롯은 confirm 전까지 임시. `boot_write_img_confirmed` 1줄 누락 = 전원 OFF/ON 시 구버전 복귀. "프레임워크 기본 동작을 모르면 생기는 함정".
- **"MCU가 mTLS 한다"는 오해** (#20) — 실제로는 RM76 모뎀이 TLS+user/pass 처리, MCU는 클라이언트 cert 없음. 보안 경계 오해.
- **"bit-bang RS485의 속도 한계"** (#20) — 소프트웨어 UART는 38400+에서 바이트 누락 → 9600/19200 권장. "코드상 지원 ≠ 현장 사용 가능".
- **★ "공유 자원을 무시한 추상화는 물리적으로 성립하지 않는다"** (#22) — coproc-MQTT(SBC가 `t/{id}/d`에 `src=0xC000` publish로 MCU 지휘)는 **RM76 LTE 모뎀이 1개**라는 사실과 충돌. SBC가 모뎀 점유 시 MCU는 자기 MQTT로 상·하행 불가 → "같은 토픽+src 구분" 추상화가 HW 공유 제약 앞에 붕괴. 해법 = 자원 handoff + 로컬(USB) relay. **"추상화 설계 전 하위 물리 자원의 배타성을 먼저 확인하라"** — 아키텍처 교재 1급.
- **★ "종료(shutdown)는 원자적 사건이 아니라 순서 있는 프로토콜이다"** (#23) — relay OFF와 전원 OFF를 한 이벤트로 묶으면 전송 큐(LTE TX ring) 잔여 상행 PDU가 flush 전에 링크가 끊겨 **조용히 유실**. 해법 = ① `relay_stop`: drain을 *검증*(ring empty+usb idle), 미완이면 전원 유지한 채 재시도(soft) → ② `relay_stopped` ACK 후 상위가 자기 계층 정리 → ③ `shutdown` 실제 전원 차단. **"graceful teardown = 뒤집힌 부팅 시퀀스, 각 계층이 아래 계층에게 '비웠다' 확인을 받아야 한다."**

### 검증 성숙도 신호

- **5단계 판정 범례**(#23): PASS/FAIL/BLOCKED 3단계 → **PASS/CODE_DONE/E2E_PENDING/APP_PENDING/BLOCKED 5단계**. "코드는 됐으나 실기 미검증"과 "레포 외 의존"을 명시 구분 → **"구현 완료 ≠ 검증 완료"** 규율, 진척 과대보고 방지. 포트폴리오/제안서 과대표현 회피 역량 신호.

→ [[revita]] § 2026-06~07 + [[strengths]] §22 + [[ai-direction]] § 결정 57 + [[2026-07-05_적정복잡도-라이프사이클-3부작]].

## 2026-07-05 흡수 — lora BLE↔LoRa 브리지 + 2.4G ESB dual-radio gotcha (lora-claude 카드 2장) ⭐⭐

### BLE↔LoRa 브리지 (06-19)

- **BLE와 E22 LoRa 루프 동시 상시 동작 필요** — `bt_disable` 금지. 프로비저닝식 순차 동작과 다름(BLE 켠 채 E22 중계).
- **RPi BLE 기본 RF-kill 차단** — `rfkill unblock` + `hciconfig up` 필요. bleak central 동작 전제.
- **브리지에 RTT(J-Link) 디버거 붙였다 떼면 nRF halt** — 실운영 브리지에는 디버거 상시연결 금지.
- **Chrome은 link-local(169.254) 접속 불가** — 직결망은 일반 사설IP 필수. (직결 monitor web 구성 시 IP 대역 주의)

### 2.4G ESB 로컬링크 (06-20)

- **ESB와 BLE컨트롤러(SDC/MPSL)는 한 이미지 공존 불가** — MPSL이 부팅 자동 init하며 라디오 점유 충돌. → **2-이미지 패턴**: BLE판(provisioning, CONFIG_BT) + ESB판(CONFIG_BT 미설정=MPSL 없음, 운영), NVS 보존 reflash로 전환. (cf. 통합펌웨어 06-18 BLE 프로비저닝과 정합)
- **nRF52832 250kbps 모드는 ESB auto-ACK 비대칭 실패** — forward만, 역방향 ack 미수신 → **양방향 독립송신(noack) + 역할 시분할(PTX↔PRX)**로 우회.

→ [[lora]] § 2026-06-19~20 + [[ai-direction]] § 결정 58 + [[2026-07-05_BLE게이트웨이-LoRa경량연결]].

## 업데이트 방법
새로운 갭을 발견하거나, 기존 갭을 채웠을 때 이 페이지를 업데이트한다.
채운 갭은 삭제하지 않고 ~~취소선~~으로 표시하여 성장 기록을 남긴다.

## 관련 페이지
- [[me]]: 핵심 정체성
- [[skills]]: 기술적 갭과 현재 수준 비교
- [[ai-direction]]: 갭이 AI 방향에 미치는 영향
- [[strengths]]: 강점과 약점의 대비
- [[goals]]: 갭을 채워야 달성되는 목표
