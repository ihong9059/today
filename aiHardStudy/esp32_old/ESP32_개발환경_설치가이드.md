# ESP32 개발환경 설치 가이드

## Windows PC에서 Arduino IDE 설치 및 보드 연결

**대상**: 초등학생 및 초보자
**소요시간**: 약 30분
**준비물**: ESP32-DevKitC 보드, USB 케이블, Windows PC

---

## 목차

1. [준비물 확인](#1-준비물-확인)
2. [USB 드라이버 설치](#2-usb-드라이버-설치)
3. [Arduino IDE 설치](#3-arduino-ide-설치)
4. [ESP32 보드 추가](#4-esp32-보드-추가)
5. [보드 연결 및 설정](#5-보드-연결-및-설정)
6. [첫 프로그램 테스트](#6-첫-프로그램-테스트)
7. [문제 해결](#7-문제-해결)

---

## 1. 준비물 확인

### 1.1 필요한 것들

| 항목 | 설명 | 확인 |
|------|------|------|
| ESP32-DevKitC 보드 | 38핀 개발 보드 | ☐ |
| USB 케이블 | Micro-USB 타입 (데이터 전송용) | ☐ |
| Windows PC | Windows 10 또는 11 | ☐ |
| 인터넷 연결 | 소프트웨어 다운로드용 | ☐ |

### 1.2 USB 케이블 주의사항

> **중요**: 충전 전용 케이블은 사용할 수 없습니다!

| 케이블 종류 | 데이터 전송 | 사용 가능 |
|-------------|-------------|-----------|
| 데이터 케이블 | O | **사용 가능** |
| 충전 전용 케이블 | X | 사용 불가 |

**확인 방법**: 케이블을 연결했을 때 PC에서 "띵동" 소리가 나면 데이터 케이블입니다.

```
📹 동영상 참고: USB 케이블 구분하는 방법 촬영 필요
   - 데이터 케이블과 충전 케이블 비교
   - 연결 시 소리 확인
```

---

## 2. USB 드라이버 설치

ESP32 보드가 PC와 통신하려면 USB 드라이버가 필요합니다.

### 2.1 CP210x 드라이버 설치

**다운로드 사이트**:
- **공식 사이트**: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers
- **직접 링크**: "CP210x Universal Windows Driver" 선택

```
📹 동영상 참고 화면:
   1. 위 사이트 접속 화면
   2. "Downloads" 탭 클릭
   3. "CP210x Universal Windows Driver" 다운로드 버튼
   4. 다운로드된 zip 파일 위치
```

**설치 순서**:

| 단계 | 동작 | 화면 설명 |
|------|------|----------|
| 1 | 다운로드한 zip 파일 압축 풀기 | 마우스 우클릭 → "압축 풀기" |
| 2 | 폴더 열기 | CP210xVCPInstaller_x64.exe 파일 찾기 |
| 3 | 설치 파일 실행 | 더블클릭 |
| 4 | "예" 클릭 | 사용자 계정 컨트롤 창 |
| 5 | "다음" 클릭 | 설치 마법사 |
| 6 | 설치 완료 | "마침" 클릭 |

```
📹 동영상 참고 화면:
   - 각 단계별 스크린샷 또는 화면 녹화
   - 특히 "사용자 계정 컨트롤" 창에서 "예" 클릭 강조
```

### 2.2 드라이버 설치 확인

**확인 방법**:

| 단계 | 동작 |
|------|------|
| 1 | 키보드에서 `Windows 키 + X` 누르기 |
| 2 | "장치 관리자" 클릭 |
| 3 | "포트(COM & LPT)" 항목 펼치기 |
| 4 | "Silicon Labs CP210x USB to UART Bridge" 확인 |

```
📹 동영상 참고 화면:
   - 장치 관리자 열기
   - "포트(COM & LPT)" 펼치기
   - COM 포트 번호 확인 (예: COM3, COM4)

   📷 스크린샷 필요:
   - 장치 관리자에서 COM 포트가 보이는 화면
   - COM 포트가 없을 때의 화면 (비교용)
```

---

## 3. Arduino IDE 설치

### 3.1 다운로드

**공식 다운로드 페이지**:
- **URL**: https://www.arduino.cc/en/software

```
📹 동영상 참고 화면:
   1. 위 URL 접속
   2. "SOFTWARE" 메뉴
   3. "Windows" 옵션 선택
   4. "Windows 10 and newer, 64 bit" 클릭
   5. "JUST DOWNLOAD" 클릭 (기부 없이 다운로드)
```

**다운로드 옵션**:

| 옵션 | 설명 | 권장 |
|------|------|------|
| Windows Win 10 and newer, 64 bit | 설치 파일 (.exe) | **권장** |
| Windows ZIP file | 압축 파일 | - |
| Windows MSI installer | MSI 설치 파일 | - |

### 3.2 설치 과정

| 단계 | 화면 | 동작 |
|------|------|------|
| 1 | 다운로드 폴더 | `arduino-ide_2.x.x_Windows_64bit.exe` 더블클릭 |
| 2 | 사용자 계정 컨트롤 | "예" 클릭 |
| 3 | 라이선스 동의 | "I Agree" 클릭 |
| 4 | 설치 옵션 | 기본값 유지, "Next" 클릭 |
| 5 | 설치 위치 | 기본값 유지, "Install" 클릭 |
| 6 | 설치 진행 | 약 2-3분 대기 |
| 7 | 완료 | "Finish" 클릭 |

```
📹 동영상 참고 화면:
   - 각 단계별 화면 녹화
   - 설치 진행률 표시 화면
   - 완료 후 바탕화면 아이콘 확인

   📷 스크린샷 필요:
   - 라이선스 동의 화면
   - 설치 옵션 화면
   - 설치 완료 화면
```

### 3.3 첫 실행

| 단계 | 동작 | 설명 |
|------|------|------|
| 1 | Arduino IDE 아이콘 더블클릭 | 바탕화면 또는 시작 메뉴 |
| 2 | 방화벽 허용 | "액세스 허용" 클릭 |
| 3 | 초기 로딩 대기 | 첫 실행 시 1-2분 소요 |

```
📹 동영상 참고 화면:
   - Arduino IDE 첫 실행 화면
   - 방화벽 허용 창
   - IDE 메인 화면 구성 설명
```

---

## 4. ESP32 보드 추가

Arduino IDE에 ESP32 보드를 추가해야 합니다.

### 4.1 보드 매니저 URL 추가

| 단계 | 메뉴 경로 | 동작 |
|------|----------|------|
| 1 | File → Preferences | 설정 창 열기 |
| 2 | "Additional boards manager URLs" 찾기 | 아래쪽에 위치 |
| 3 | URL 입력 | 아래 주소 복사하여 붙여넣기 |
| 4 | "OK" 클릭 | 설정 저장 |

**추가할 URL**:
```
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

```
📹 동영상 참고 화면:
   1. File 메뉴 클릭
   2. Preferences 클릭
   3. "Additional boards manager URLs" 필드 위치
   4. URL 붙여넣기
   5. OK 클릭

   📷 스크린샷 필요:
   - Preferences 창 전체
   - URL 입력 필드 확대
   - URL이 입력된 모습
```

### 4.2 ESP32 보드 패키지 설치

| 단계 | 메뉴 경로 | 동작 |
|------|----------|------|
| 1 | Tools → Board → Boards Manager | 보드 매니저 열기 |
| 2 | 검색창에 "esp32" 입력 | 검색 |
| 3 | "esp32 by Espressif Systems" 찾기 | 목록에서 확인 |
| 4 | "INSTALL" 클릭 | 설치 시작 |
| 5 | 설치 완료 대기 | 약 3-5분 소요 |

```
📹 동영상 참고 화면:
   1. Tools 메뉴 → Board → Boards Manager
   2. 검색창에 "esp32" 입력
   3. 검색 결과에서 "esp32 by Espressif Systems"
   4. INSTALL 버튼 클릭
   5. 설치 진행 화면 (다운로드 용량 표시)
   6. 설치 완료 ("INSTALLED" 표시)

   📷 스크린샷 필요:
   - Boards Manager 검색 화면
   - esp32 패키지 상세 정보
   - 설치 완료 화면
```

**참고 사이트**:
- ESP32 Arduino Core 공식 문서: https://docs.espressif.com/projects/arduino-esp32/

---

## 5. 보드 연결 및 설정

### 5.1 보드 연결

| 단계 | 동작 | 확인 사항 |
|------|------|----------|
| 1 | USB 케이블을 PC에 연결 | USB 포트 확인 |
| 2 | 케이블의 다른 쪽을 ESP32에 연결 | Micro-USB 포트 |
| 3 | 보드의 빨간 LED 확인 | 전원 LED 점등 |
| 4 | PC에서 "띵동" 소리 확인 | 장치 인식 |

```
📹 동영상 참고:
   - USB 케이블 연결 과정 촬영
   - 보드의 전원 LED 점등 확인
   - PC 화면의 장치 인식 알림

   📷 사진 필요:
   - ESP32 보드의 Micro-USB 포트 위치
   - 전원 LED 위치 표시
   - 케이블이 연결된 전체 모습
```

### 5.2 보드 선택

| 단계 | 메뉴 경로 | 선택 값 |
|------|----------|---------|
| 1 | Tools → Board → esp32 | ESP32 보드 목록 펼치기 |
| 2 | "ESP32 Dev Module" 선택 | 클릭 |

```
📹 동영상 참고 화면:
   1. Tools 메뉴 클릭
   2. Board 하위 메뉴
   3. esp32 카테고리 펼치기
   4. "ESP32 Dev Module" 선택

   📷 스크린샷 필요:
   - 보드 선택 메뉴 펼친 화면
   - ESP32 Dev Module 선택된 화면
```

### 5.3 포트 선택

| 단계 | 메뉴 경로 | 동작 |
|------|----------|------|
| 1 | Tools → Port | 포트 목록 확인 |
| 2 | "COM숫자 (ESP32...)" 선택 | 예: COM3, COM4 등 |

```
📹 동영상 참고 화면:
   1. Tools 메뉴 → Port
   2. 사용 가능한 COM 포트 목록
   3. ESP32가 연결된 포트 선택

   📷 스크린샷 필요:
   - 포트 선택 메뉴
   - COM 포트가 여러 개일 때 구분하는 방법
```

**포트가 안 보일 때**:
- 드라이버가 설치되지 않음 → 2단계로 돌아가기
- USB 케이블 문제 → 다른 케이블로 교체
- USB 포트 문제 → 다른 USB 포트에 연결

### 5.4 보드 설정 확인

Tools 메뉴에서 다음 설정을 확인합니다:

| 설정 항목 | 권장 값 |
|----------|---------|
| Board | "ESP32 Dev Module" |
| Upload Speed | "921600" |
| CPU Frequency | "240MHz (WiFi/BT)" |
| Flash Frequency | "80MHz" |
| Flash Mode | "QIO" |
| Flash Size | "4MB (32Mb)" |
| Partition Scheme | "Default 4MB with spiffs" |
| Port | 연결된 COM 포트 |

```
📹 동영상 참고 화면:
   - Tools 메뉴의 각 설정 항목 확인
   - 기본값 그대로 사용해도 됨을 설명

   📷 스크린샷 필요:
   - Tools 메뉴 전체 설정 화면
```

---

## 6. 첫 프로그램 테스트

### 6.1 Blink 예제 열기

| 단계 | 메뉴 경로 | 동작 |
|------|----------|------|
| 1 | File → Examples → 01.Basics | 예제 폴더 열기 |
| 2 | "Blink" 선택 | 새 창에서 열림 |

```
📹 동영상 참고 화면:
   1. File 메뉴 → Examples
   2. 01.Basics 폴더
   3. Blink 선택
   4. 새 창에서 Blink 코드 확인
```

### 6.2 LED 핀 번호 수정

Blink 예제의 LED 핀을 **25번**(빨간 LED)으로 변경합니다.

**수정 전**:
```cpp
#define LED_BUILTIN 2
```

**수정 후**:
```cpp
#define LED_BUILTIN 25
```

```
📹 동영상 참고 화면:
   - 코드에서 숫자 2를 25로 변경
   - 왜 25번인지 설명 (회로도 참조)
```

### 6.3 업로드

| 단계 | 버튼/메뉴 | 설명 |
|------|----------|------|
| 1 | → 버튼 (Upload) 클릭 | 툴바의 오른쪽 화살표 |
| 2 | 컴파일 진행 | 하단에 진행 상황 표시 |
| 3 | 업로드 진행 | "Connecting..." 메시지 |
| 4 | 완료 | "Done uploading" 메시지 |

```
📹 동영상 참고 화면:
   1. Upload 버튼 위치 (→ 화살표)
   2. 컴파일 진행 화면
   3. "Connecting..." 메시지
   4. 업로드 진행률 (0%...100%)
   5. "Done uploading" 완료 메시지
   6. 보드의 빨간 LED 깜빡임 확인!

   📷 스크린샷/사진 필요:
   - Upload 버튼 위치 표시
   - 업로드 성공 메시지
   - LED가 깜빡이는 보드 사진
```

### 6.4 결과 확인

**성공 시**:
- 빨간 LED가 1초 간격으로 깜빡임
- 축하합니다! 개발 환경 설정 완료!

**실패 시**:
- 7단계 "문제 해결"로 이동

---

## 7. 문제 해결

### 7.1 자주 발생하는 문제

#### 문제 1: 포트가 보이지 않음

| 원인 | 해결 방법 |
|------|----------|
| 드라이버 미설치 | 2단계 드라이버 설치 진행 |
| 충전 전용 케이블 | 데이터 케이블로 교체 |
| USB 포트 불량 | 다른 USB 포트에 연결 |
| 보드 불량 | 다른 보드로 테스트 |

```
📹 동영상 참고:
   - 포트가 안 보일 때 체크리스트
   - 장치 관리자에서 확인하는 방법
```

#### 문제 2: 업로드 중 "Connecting..." 에서 멈춤

| 원인 | 해결 방법 |
|------|----------|
| 보드가 업로드 모드가 아님 | **BOOT 버튼**을 누른 상태에서 업로드 |
| 잘못된 보드 선택 | "ESP32 Dev Module" 확인 |
| 잘못된 포트 선택 | 올바른 COM 포트 선택 |

**BOOT 버튼 사용법**:
1. 업로드 버튼 클릭
2. "Connecting..." 메시지가 나오면
3. 보드의 **BOOT** 버튼을 꾹 누르기
4. 업로드가 시작되면 버튼에서 손 떼기

```
📹 동영상 참고:
   - BOOT 버튼 위치 표시
   - BOOT 버튼 누르는 타이밍 시연

   📷 사진 필요:
   - ESP32 보드의 BOOT 버튼 위치
   - EN(리셋) 버튼과 구분
```

#### 문제 3: 컴파일 오류

| 오류 메시지 | 해결 방법 |
|------------|----------|
| "Board not found" | 4단계 ESP32 보드 패키지 설치 |
| "No such file or directory" | 라이브러리 설치 필요 |
| 문법 오류 | 코드의 오타 확인 |

```
📹 동영상 참고:
   - 오류 메시지 읽는 방법
   - 오류 메시지 검색하는 방법 (구글/AI 활용)
```

#### 문제 4: 업로드 후 LED가 안 깜빡임

| 원인 | 해결 방법 |
|------|----------|
| 잘못된 핀 번호 | 코드에서 LED_BUILTIN을 25로 확인 |
| LED 불량 | 다른 LED 핀(26, 27)으로 테스트 |
| 보드 리셋 필요 | EN 버튼 누르기 |

---

## 8. 참고 자료

### 공식 사이트

| 사이트 | URL | 내용 |
|--------|-----|------|
| Arduino 공식 | https://www.arduino.cc | IDE 다운로드, 문서 |
| ESP32 Arduino | https://docs.espressif.com/projects/arduino-esp32/ | ESP32 공식 문서 |
| Espressif GitHub | https://github.com/espressif/arduino-esp32 | 소스 코드, 예제 |

### 드라이버 다운로드

| 드라이버 | URL |
|----------|-----|
| CP210x | https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers |

### 추천 학습 자료

| 자료 | URL | 설명 |
|------|-----|------|
| Random Nerd Tutorials | https://randomnerdtutorials.com/esp32-arduino-ide-2/ | ESP32 튜토리얼 |
| Last Minute Engineers | https://lastminuteengineers.com/esp32-arduino-ide-tutorial/ | 상세 설치 가이드 |

---

## 9. 동영상 제작 체크리스트

### 필요한 촬영 목록

| 번호 | 장면 | 종류 | 완료 |
|------|------|------|------|
| 1 | USB 케이블 종류 비교 | 실물 촬영 | ☐ |
| 2 | ESP32 보드 외관 | 실물 촬영 | ☐ |
| 3 | USB 칩 확인 (CP2102) | 실물 촬영 (확대) | ☐ |
| 4 | USB 연결 과정 | 실물 촬영 | ☐ |
| 5 | 전원 LED 점등 | 실물 촬영 | ☐ |
| 6 | BOOT/EN 버튼 위치 | 실물 촬영 | ☐ |
| 7 | LED 깜빡임 성공 | 실물 촬영 | ☐ |

### 필요한 화면 녹화 목록

| 번호 | 장면 | 완료 |
|------|------|------|
| 1 | CP210x 드라이버 다운로드 및 설치 | ☐ |
| 2 | Arduino IDE 다운로드 페이지 | ☐ |
| 3 | Arduino IDE 설치 과정 | ☐ |
| 4 | Preferences에서 URL 추가 | ☐ |
| 5 | Boards Manager에서 ESP32 설치 | ☐ |
| 6 | 보드 및 포트 선택 | ☐ |
| 7 | Blink 예제 열기 및 수정 | ☐ |
| 8 | 업로드 과정 | ☐ |
| 9 | 장치 관리자 COM 포트 확인 | ☐ |

### 필요한 스크린샷 목록

| 번호 | 내용 | 파일명 제안 | 완료 |
|------|------|-------------|------|
| 1 | 장치 관리자 - COM 포트 | device_manager_com.png | ☐ |
| 2 | Arduino IDE 메인 화면 | arduino_ide_main.png | ☐ |
| 3 | Preferences 창 | arduino_preferences.png | ☐ |
| 4 | Boards Manager - ESP32 | boards_manager_esp32.png | ☐ |
| 5 | 보드 선택 메뉴 | board_selection.png | ☐ |
| 6 | 포트 선택 메뉴 | port_selection.png | ☐ |
| 7 | 업로드 성공 메시지 | upload_success.png | ☐ |
| 8 | 업로드 오류 메시지 | upload_error.png | ☐ |

---

## 10. 다음 단계

설치가 완료되면 다음을 진행하세요:

1. **초급 1차시**: LED 켜고 끄기
2. **회로 연결 확인**: ESP32_DevKitC_회로연결_분석서.md 참조
3. **교육 진행**: ESP32_프로그래밍_교육계획서.md 참조

---

*작성일: 2026-02-19*
*ESP32-DevKitC 38핀 보드 기준*
*Arduino IDE 2.x 버전 기준*
