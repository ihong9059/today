# TwinCAT 3 설치 가이드

## 1. Beckhoff 계정 생성 (필수)

TwinCAT 3 다운로드에는 무료 Beckhoff 계정이 필요합니다.

### 계정 생성
1. https://www.beckhoff.com 접속
2. 우측 상단 "Login" 클릭
3. "Register" 클릭하여 계정 생성
4. 이메일 인증 완료

## 2. TwinCAT 3 다운로드

### 다운로드 페이지
1. https://www.beckhoff.com/en-us/support/download-finder/ 접속
2. 로그인
3. 검색: "TwinCAT 3 XAE"
4. "TwinCAT 3.1 - eXtended Automation Engineering (XAE)" 선택
5. 최신 버전 다운로드 (약 3~5GB)

### 직접 링크 (로그인 필요)
- XAE (Engineering): https://www.beckhoff.com/en-en/support/download-finder/search-result/?c-1=26782567

## 3. 설치

### 설치 전 확인사항
- Windows 11 Pro (지원됨, 단 24H2는 주의)
- 관리자 권한
- 약 10GB 디스크 공간
- 인터넷 연결

### 설치 절차
1. 다운로드한 설치 파일 실행 (관리자 권한)
2. 라이선스 동의
3. 설치 유형 선택:
   - **Complete**: XAE + XAR 모두 설치 (권장)
   - **Custom**: 선택 설치
4. "Install TwinCAT XAE Shell" 체크 (Visual Studio 없는 경우)
5. 설치 완료 후 **재부팅**

### 필수 설치 구성요소
```
[✓] TwinCAT 3 XAE (Engineering)
[✓] TwinCAT 3 XAR (Runtime)
[✓] TwinCAT 3 EtherCAT Master
[✓] TE1111 EtherCAT Simulation (있으면 선택)
```

## 4. 설치 후 설정

### 실시간 이더넷 드라이버 설치
1. TwinCAT XAE 실행
2. 메뉴: TwinCAT → Show Real Time Ethernet Compatible Devices
3. "Realtek USB GbE Family Controller" 선택
4. "Install" 클릭
5. 재부팅

### 라이선스
- 7일 평가판 자동 활성화
- 7일마다 갱신 가능 (무료)
- 개발/테스트 용도로 충분

## 5. EtherCAT Simulation 구성

### 새 프로젝트 생성
1. File → New → Project
2. TwinCAT Projects → TwinCAT XAE Project
3. 프로젝트 이름: "EtherCAT_Simulation"

### EtherCAT Simulation Device 추가
1. I/O → Devices 우클릭
2. Add New Item → EtherCAT Simulation
3. Device 생성 확인

### 가상 Slave 추가
1. EtherCAT Simulation Device 우클릭
2. Add New Item → Search
3. 추가할 장치:
   - EK1100 (EtherCAT Coupler)
   - EL1008 (8ch Digital Input)
   - EL2008 (8ch Digital Output)

### 네트워크 어댑터 연결
1. Device 선택 → Adapter 탭
2. "Realtek USB GbE" 선택
3. OK

### 활성화
1. TwinCAT → Activate Configuration (Ctrl+Shift+F4)
2. Run 모드로 전환
3. 시스템 트레이 TwinCAT 아이콘: 녹색 확인

## 6. 테스트

TwinCAT이 실행 중인 상태에서:

```powershell
# Python 3.14로 실행
"C:\Users\lenovo\AppData\Local\Programs\Python\Python314\python.exe" "C:\todo\today\etherCat\simulation\src\python\scan_slaves.py" 9
```

예상 결과:
```
[2] Slave 검색 중...
    ✓ 3개 Slave 발견!

  Slave 1: EK1100
  Slave 2: EL1008
  Slave 3: EL2008
```

## 7. 문제 해결

| 문제 | 해결 |
|------|------|
| 다운로드 안됨 | Beckhoff 로그인 확인 |
| 설치 실패 | 관리자 권한, 디스크 공간 확인 |
| 어댑터 미표시 | 드라이버 재설치, 재부팅 |
| Slave 미감지 | TwinCAT Run 모드 확인 |

## 8. 참고 링크

- [Beckhoff 다운로드](https://www.beckhoff.com/en-us/support/download-finder/)
- [TwinCAT 설치 가이드](https://infosys.beckhoff.com/content/1033/tc3_installation/179465611.html)
- [TE1111 EtherCAT Simulation](https://www.beckhoff.com/en-en/products/automation/twincat/texxxx-twincat-3-engineering/te1111.html)
