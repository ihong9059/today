# EtherCAT Master 설치 계획서

## 1. 개요

### 1.1 목적
본 문서는 Windows 11 PC에 SOEM(Simple Open EtherCAT Master)을 설치하고 EtherCAT Slave 장치와 통신 테스트를 수행하기 위한 계획을 수립한다.

### 1.2 대상 시스템 사양

| 항목 | 사양 |
|------|------|
| **OS** | Microsoft Windows 11 Pro (Build 26100) |
| **CPU** | Intel Core i5-1235U (12세대, 10코어) |
| **RAM** | 16,060 MB |
| **이더넷 어댑터** | Intel I219-V (100/1000 Mbps) |
| **IP 주소** | 192.168.0.20 |
| **호스트명** | DESKTOP-MD6RE2A |

### 1.3 EtherCAT Master 소프트웨어 선택

**SOEM (Simple Open EtherCAT Master)** 선택

선택 이유:
1. Windows 11 공식 지원
2. 오픈소스 (GPLv2 라이선스)
3. 경량 라이브러리로 임베디드 환경에서도 사용 가능
4. Intel I219-V 이더넷 어댑터 호환
5. 활발한 커뮤니티 지원 (GitHub OpenEtherCATsociety)

---

## 2. 시스템 요구사항

### 2.1 하드웨어 요구사항

| 항목 | 최소 사양 | 현재 시스템 | 적합성 |
|------|-----------|-------------|--------|
| CPU | 1 GHz 이상 | i5-1235U (1.3~4.4GHz) | **적합** |
| RAM | 512 MB | 16 GB | **적합** |
| 이더넷 | 100 Mbps NIC | Intel I219-V (1Gbps) | **적합** |
| 저장공간 | 100 MB | 충분 | **적합** |

### 2.2 소프트웨어 요구사항

| 소프트웨어 | 버전 | 용도 | 필수여부 |
|------------|------|------|----------|
| Windows 11 | 22H2 이상 | 운영체제 | 필수 |
| Visual Studio 2022 | 17.x | C/C++ 컴파일러 | 필수 |
| CMake | 3.20 이상 | 빌드 시스템 | 필수 |
| Npcap | 1.87 이상 | 패킷 캡처 드라이버 | 필수 |
| Git | 2.x | 소스코드 관리 | 권장 |

### 2.3 네트워크 요구사항

- 전용 이더넷 포트 (EtherCAT 전용)
- 100BASE-TX Full Duplex 지원
- RAW 소켓 접근 가능

---

## 3. 설치 단계 개요

### 3.1 Phase 1: 환경 준비 (1~2일)
1. Visual Studio 2022 설치 (C++ 개발 도구)
2. CMake 설치
3. Git 설치
4. Npcap 설치 (WinPcap 호환 모드)

### 3.2 Phase 2: SOEM 빌드 (1일)
1. SOEM 소스코드 다운로드
2. CMake 구성
3. Visual Studio로 빌드
4. 테스트 프로그램 실행

### 3.3 Phase 3: Slave 연결 테스트 (1~2일)
1. EtherCAT Slave 모듈 연결
2. slaveinfo 실행으로 Slave 감지 확인
3. simple_test 실행
4. PDO 통신 테스트

---

## 4. 상세 설치 계획

### 4.1 Npcap 설치

```
다운로드: https://npcap.com/
버전: 1.87 이상

설치 옵션 (중요):
[✓] Install Npcap in WinPcap API-compatible Mode  ← 반드시 체크!
[✓] Support raw 802.11 traffic for wireless adapters
```

**주의사항**: WinPcap 호환 모드를 반드시 활성화해야 SOEM이 정상 동작함

### 4.2 Visual Studio 2022 설치

```
필요 구성요소:
- Desktop development with C++
- Windows 10/11 SDK
- CMake tools for Visual Studio
```

### 4.3 SOEM 빌드 절차

```bash
# 1. 소스코드 다운로드
git clone https://github.com/OpenEtherCATsociety/SOEM.git
cd SOEM

# 2. 빌드 디렉토리 생성
mkdir build
cd build

# 3. CMake 구성
cmake .. -G "Visual Studio 17 2022" -A x64

# 4. 빌드
cmake --build . --config Release

# 5. 설치 (선택)
cmake --install . --prefix C:/SOEM
```

### 4.4 환경 변수 설정

```
PATH에 추가:
C:\SOEM\bin
```

---

## 5. 테스트 계획

### 5.1 기본 동작 테스트

| 테스트 항목 | 명령어 | 예상 결과 |
|-------------|--------|-----------|
| NIC 인식 | `slaveinfo` | 네트워크 인터페이스 목록 출력 |
| Slave 감지 | `slaveinfo eth0` | 연결된 Slave 정보 출력 |
| 기본 통신 | `simple_test eth0` | PDO 교환 성공 메시지 |

### 5.2 성능 테스트

| 측정 항목 | 목표값 | 측정 방법 |
|-----------|--------|-----------|
| 통신 주기 | 1ms 이하 | SOEM 타이머 |
| 지터(Jitter) | 100μs 이하 | 오실로스코프 |
| 패킷 손실률 | 0% | WKC 카운터 확인 |

---

## 6. 리스크 및 대응방안

### 6.1 예상 리스크

| 리스크 | 가능성 | 영향도 | 대응방안 |
|--------|--------|--------|----------|
| NIC 호환성 문제 | 낮음 | 높음 | Realtek USB 이더넷 어댑터 대체 사용 |
| Windows 11 22H2 WKC 이슈 | 중간 | 중간 | nicdrv.c 소스코드 패치 적용 |
| 방화벽 차단 | 중간 | 낮음 | EtherCAT 포트 예외 추가 |
| 실시간성 부족 | 중간 | 중간 | 프로세스 우선순위 조정 |

### 6.2 Windows 11 WKC 이슈 해결

Windows 11 22H2에서 알려진 이슈로, WKC(Working Counter)가 항상 0으로 반환되는 문제 발생 가능.

해결 방법:
```c
// nicdrv.c의 ecx_inframe() 함수 수정
// LA(Locally-Administered) 비트 체크 추가
if (rxbuf[6] & 0x02) {  // LA bit check
    // 전송 프레임 무시
    continue;
}
```

---

## 7. 일정 계획

| 단계 | 작업 내용 | 소요기간 |
|------|-----------|----------|
| 1 | 개발 환경 구축 | 1일 |
| 2 | SOEM 빌드 및 설치 | 0.5일 |
| 3 | Slave 하드웨어 준비 | 배송 대기 (3~14일) |
| 4 | 연결 및 기본 테스트 | 1일 |
| 5 | PDO 통신 테스트 | 1일 |
| 6 | 성능 측정 및 최적화 | 2일 |

---

## 8. 예상 비용

| 항목 | 수량 | 예상 단가 | 합계 |
|------|------|-----------|------|
| EtherCAT Slave 모듈 (LAN9252 기반) | 1 | $99~$145 | $99~$145 |
| 이더넷 케이블 (CAT6) | 2 | $5 | $10 |
| USB 이더넷 어댑터 (백업용) | 1 | $15 | $15 |
| **총계** | | | **$124~$170** |

---

## 9. 참고 자료

- [SOEM GitHub Repository](https://github.com/OpenEtherCATsociety/SOEM)
- [Npcap 공식 사이트](https://npcap.com/)
- [EtherCAT Technology Group](https://www.ethercat.org/)
- [SOEM Windows 설치 가이드](https://deepwiki.com/OpenEtherCATsociety/SOEM/3-building-and-installation)

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**대상 시스템**: DESKTOP-MD6RE2A (Windows 11 Pro)
