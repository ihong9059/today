# STEP 5 — 다수 기기 APK 배포 방법

**작업일**: 2026-04-13

---

## 개요

교육 현장에서 학생 30명의 스마트폰/태블릿에 UTTEC Cloud 앱을 설치하는 3가지 방법입니다.

| 방법 | 소요 시간 (30대) | 인터넷 필요 | 준비물 | 권장 상황 |
|:-----|:---------------:|:----------:|:------|:---------|
| A. QR코드 다운로드 | ~5분 (학생 자가 설치) | ✅ | 웹 서버 또는 공유 링크 | **가장 권장** — 교실 Wi-Fi 있을 때 |
| B. 근거리 파일 전송 | ~10분 | ❌ | 없음 | 인터넷 없는 교실 |
| C. USB + adb 일괄 설치 | ~15분 | ❌ | USB 케이블 + PC | 출하 전 사전 준비 |

---

## 방법 A — QR코드 다운로드 (가장 권장)

학생이 QR코드를 스캔하면 APK를 다운로드하여 직접 설치합니다.

### A-1. APK를 다운로드 가능한 곳에 업로드

**옵션 1 — 클라우드 서버에 직접 호스팅 (추천)**

```bash
# DO 서버에 APK 업로드
scp app-release.apk root@178.128.90.37:/var/www/uttec/

# 또는 기존 Web UI 서버의 정적 파일 폴더에 복사
scp app-release.apk root@178.128.90.37:/root/vibe-firmware/web/
```

다운로드 URL:
```
https://uttec-ai.duckdns.org/firmware/app-release.apk
```

**옵션 2 — Google Drive 공유 링크**

```
1. Google Drive에 app-release.apk 업로드
2. 우클릭 → 공유 → "링크가 있는 모든 사용자" 설정
3. 공유 링크 복사
```

**옵션 3 — GitHub Releases**

```
1. GitHub 저장소 → Releases → New Release
2. app-release.apk를 Assets에 첨부
3. 다운로드 URL 복사
```

### A-2. QR코드 생성

다운로드 URL을 QR코드로 변환합니다.

**온라인 도구:**
- https://qr.io
- https://www.qrcode-monkey.com

**Python으로 생성:**
```bash
pip install qrcode[pil]
python -c "
import qrcode
img = qrcode.make('https://uttec-ai.duckdns.org/firmware/app-release.apk')
img.save('uttec_apk_qr.png')
"
```

### A-3. 학생 설치 절차 (안내 카드에 인쇄)

```
┌─────────────────────────────────────────────┐
│          UTTEC 앱 설치 안내                  │
│                                             │
│  1. 아래 QR코드를 카메라로 스캔             │
│                                             │
│         ┌───────────┐                       │
│         │  QR CODE  │                       │
│         │           │                       │
│         └───────────┘                       │
│                                             │
│  2. 다운로드 완료 후 파일 터치              │
│                                             │
│  3. "출처를 알 수 없는 앱" → 허용           │
│                                             │
│  4. 설치 완료 → 앱 열기                     │
│                                             │
│  5. 권한 요청 시 모두 "허용"                │
│     (위치, Bluetooth)                       │
│                                             │
│  ※ 안 될 때: 설정 → 보안 → 출처를          │
│    알 수 없는 앱 → Chrome 허용              │
└─────────────────────────────────────────────┘
```

---

## 방법 B — 근거리 파일 전송 (인터넷 없을 때)

교사 폰/태블릿에서 학생 기기로 APK를 직접 전송합니다.

### B-1. Nearby Share / Quick Share (Android 기본)

```
[교사 기기]                          [학생 기기]
1. 파일 관리자에서                    1. Quick Share 수신 대기
   app-release.apk 선택                 (알림 패널 내려서 활성화)
2. 공유 → Quick Share
3. 근처 기기 목록에서
   학생 기기 선택
4. 전송 (30초~1분)                   2. 수신 → 설치
```

- Android 13+ 기본 내장 (별도 앱 불필요)
- Wi-Fi Direct 사용 → 인터넷 불필요
- 한 번에 1대씩 전송, 여러 대 동시 선택 가능 (기기에 따라 다름)

### B-2. Bluetooth 전송

```
1. 교사 기기 → 파일 관리자 → app-release.apk → 공유 → Bluetooth
2. 학생 기기에서 Bluetooth 페어링 수락
3. 파일 수신 → 설치
```

- 속도가 느림 (21MB 기준 약 3~5분/대)
- 30대면 비효율적 — 소규모(5대 이하)에 적합

### B-3. USB OTG + USB 메모리

```
1. PC에서 USB 메모리에 app-release.apk 복사
2. USB OTG 어댑터로 학생 기기에 연결
3. 파일 관리자 → USB → app-release.apk → 설치
4. USB 메모리를 다음 학생에게 전달

※ USB 메모리 2~3개 동시 순환하면 30대 약 15분
```

---

## 방법 C — USB + adb 일괄 설치 (출하 전 사전 준비)

PC에서 USB 케이블로 연결하여 adb로 설치합니다.

### C-1. 사전 준비

학생 기기에서 **USB 디버깅** 활성화 필요:

```
설정 → 태블릿 정보(휴대전화 정보) → 빌드 번호 7회 터치
→ "개발자가 되었습니다"

설정 → 개발자 옵션 → USB 디버깅 ON
```

### C-2. 1대씩 설치

```bash
# 기기 연결 확인
adb devices

# APK 설치
adb install app-release.apk

# 결과: "Success"
```

### C-3. 대량 설치 스크립트 (USB 허브 사용)

USB 허브에 여러 기기를 동시 연결하여 일괄 설치:

```bash
#!/bin/bash
# install_all.sh — 연결된 모든 Android 기기에 APK 설치

APK="app-release.apk"
ADB="C:/Users/lenovo/AppData/Local/Android/sdk/platform-tools/adb.exe"

echo "=== 연결된 기기 목록 ==="
$ADB devices -l

echo ""
echo "=== APK 일괄 설치 시작 ==="

for DEVICE in $($ADB devices | grep -w "device" | awk '{print $1}'); do
    echo -n "[$DEVICE] 설치 중... "
    RESULT=$($ADB -s $DEVICE install $APK 2>&1)
    if echo "$RESULT" | grep -q "Success"; then
        echo "✅ 성공"
    else
        echo "❌ 실패: $RESULT"
    fi
done

echo ""
echo "=== 완료 ==="
```

### C-4. 대량 설치 후 USB 디버깅 해제

보안을 위해 설치 완료 후 USB 디버깅을 끄는 것을 권장합니다:

```bash
# 원격으로 USB 디버깅 비활성화 (선택)
adb shell settings put global adb_enabled 0
```

---

## 방법별 비교 요약

| | QR 다운로드 | 근거리 전송 | USB adb |
|:--|:----------|:----------|:--------|
| **속도 (30대)** | 5분 | 20~30분 | 15분 |
| **학생 조작** | 스캔+설치 | 수신+설치 | 없음 |
| **인터넷** | 필요 | 불필요 | 불필요 |
| **PC 필요** | ❌ | ❌ | ✅ |
| **USB 케이블** | ❌ | ❌ | ✅ (기기당) |
| **USB 디버깅** | ❌ | ❌ | ✅ (사전 설정) |
| **교사 난이도** | 쉬움 | 쉬움 | 중간 |
| **학생 난이도** | 쉬움 | 쉬움 | 없음 |
| **최적 상황** | 일반 교실 | 인터넷 없는 곳 | 출하 사전 준비 |

---

## 공통: 설치 후 학생 안내 사항

앱 최초 실행 시 아래 권한을 **반드시 허용**해야 합니다:

| 권한 팝업 | 선택 | 이유 |
|:---------|:----:|:-----|
| "근처 기기 찾기 및 연결" | **허용** | BLE 기기 스캔 |
| "이 기기의 위치에 액세스" | **허용** | Android BLE 정책상 필수 |
| "Bluetooth 사용" | **허용** | BLE 연결 및 OTA |

> **Tip**: 교사가 스크린 미러링(scrcpy 등)으로 권한 허용 과정을 시연하면 학생들이 빠르게 따라합니다.
