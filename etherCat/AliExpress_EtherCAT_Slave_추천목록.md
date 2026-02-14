# AliExpress EtherCAT Slave 모듈 추천 목록

## SOEM Master 테스트용 Slave 선정 가이드

---

## 1. 추천 모듈 목록

### 1.1 입문자용 (권장) - LAN9252 개발보드

| 항목 | 내용 |
|------|------|
| **제품명** | LAN9252 EtherCAT Slave Development Board + STM32F407ZGT6 |
| **가격** | $99.99 ~ $144.30 USD |
| **칩셋** | Microchip LAN9252 + STM32F407 |
| **인터페이스** | SPI/FSMC |
| **I/O** | 16 Digital I/O (8 Input + 8 Output) |
| **특징** | LED 디스플레이, 버튼 포함, 예제 코드 제공 |
| **배송** | 무료 배송, 2~3주 소요 |

**AliExpress 링크**:
- [LAN9252 Development Board - $133.20 (40% 할인)](https://www.aliexpress.com/item/1005002517778432.html)
- [LAN9252 EtherCAT Module - $99.99](https://www.aliexpress.com/item/1005002222277960.html)
- [LAN9252 STM32F407 Board - $144.30](https://www.aliexpress.com/item/4001225387451.html)

**장점**:
- SOEM과 호환성 검증됨
- 샘플 코드 및 문서 풍부
- STM32 개발 환경 활용 가능

**단점**:
- 초기 설정 필요
- ESI 파일 직접 생성 필요할 수 있음

---

### 1.2 고급 사용자용 - AX58100 개발보드

| 항목 | 내용 |
|------|------|
| **제품명** | STM32 + AX58100 EtherCAT Slave Development Board |
| **가격** | $115 ~ $221.85 USD |
| **칩셋** | ASIX AX58100 + STM32 |
| **인터페이스** | SPI (고속) |
| **특징** | CiA402 소스코드 포함, 모션 제어 지원 |
| **배송** | 무료 배송 |

**AliExpress 링크**:
- [AX58100 Protocol Chip - $115](https://www.aliexpress.com/item/1005001393948469.html)
- [STM32 + AX58100 with CIA402 - $221.85](https://www.aliexpress.com/item/1005002667110402.html)

**장점**:
- 최신 ESC 칩셋 (Beckhoff ET1100 파생)
- 내장 이더넷 PHY
- Step/Dir, PWM, 엔코더 인터페이스 지원
- CiA402 서보 드라이브 프로토콜 지원

**단점**:
- 가격이 높음
- 외부 MCU 필수

---

### 1.3 산업용 I/O 모듈 - 즉시 사용 가능

| 항목 | 내용 |
|------|------|
| **제품명** | DIEWU EtherCAT Slave IO Module 16DIO |
| **가격** | $50 ~ $80 USD (예상) |
| **I/O 구성** | 16 Digital Input + 16 Digital Output |
| **출력 타입** | NPN/PNP 선택 가능 |
| **출력 전류** | 500mA/채널 |
| **특징** | 산업용, 광절연, 2x RJ45 포트 |

**구매처**: AliExpress에서 "DIEWU EtherCAT" 검색
- [EtherCAT IO Module 16IN 16OUT](https://www.aliexpress.com/i/33015053772.html)

**장점**:
- 별도 개발 없이 바로 사용 가능
- 산업용 등급 (광절연)
- LinuxCNC 커뮤니티에서 검증됨
- ESI 파일 제공

**단점**:
- 커스터마이징 제한적
- 펌웨어 수정 불가

---

### 1.4 저가형 - 기본 테스트용

| 항목 | 내용 |
|------|------|
| **제품명** | LAN9252 Basic Module (MCU 미포함) |
| **가격** | $30 ~ $50 USD |
| **구성** | LAN9252 + 이더넷 PHY + 커넥터 |
| **용도** | Digital I/O 모드 전용 |

**특징**:
- MCU 없이 독립 동작 가능 (Digital I/O 모드)
- 16개 GPIO 직접 제어
- 가장 저렴한 테스트 옵션

---

## 2. 추천 선정

### 2.1 첫 테스트용 최우선 추천

```
📦 제품: LAN9252/3 EtherCAT Module Development Board
💰 가격: $99.99 USD
🔗 링크: https://www.aliexpress.com/item/1005002222277960.html

선정 이유:
1. 가성비 최고 (개발보드 + 예제 코드 포함)
2. SOEM 호환성 검증됨
3. 충분한 I/O (Digital I/O 테스트 가능)
4. 국내 커뮤니티 사용 사례 존재
```

### 2.2 바로 동작하는 산업용 모듈

```
📦 제품: SMART IO EtherCAT Module 16IN/16OUT
💰 가격: $56.80 ~ $80 USD
🔗 검색: "EtherCAT SMART IO 16IN 16OUT" on AliExpress

선정 이유:
1. 별도 펌웨어 개발 불필요
2. ESI 파일 제공
3. 광절연으로 안전한 테스트
4. 실제 산업 적용 사례 풍부
```

---

## 3. 구매 시 체크리스트

### 3.1 필수 확인 사항

- [ ] **EtherCAT 인증 여부**: ETG(EtherCAT Technology Group) 인증 제품인지 확인
- [ ] **ESI 파일 제공**: XML 파일 제공 여부 (없으면 직접 생성 필요)
- [ ] **전원 사양**: DC 24V 또는 DC 5V 확인
- [ ] **I/O 타입**: NPN/PNP, 전류 용량 확인
- [ ] **샘플 코드**: STM32용 예제 코드 포함 여부

### 3.2 함께 구매 권장 품목

| 품목 | 수량 | 예상가격 | 비고 |
|------|------|----------|------|
| CAT6 이더넷 케이블 (1m) | 2 | $3 | Slave 연결용 |
| DC 24V 전원 어댑터 | 1 | $10 | 산업용 모듈 전원 |
| DC 5V 전원 어댑터 | 1 | $5 | 개발보드 전원 |
| USB-JTAG 디버거 (ST-Link) | 1 | $5 | 펌웨어 개발용 |
| 오실로스코프 프로브 | 2 | $10 | 신호 확인용 |

---

## 4. 배송 및 주의사항

### 4.1 예상 배송 기간

| 배송 방식 | 소요 기간 | 추가 비용 |
|-----------|-----------|-----------|
| AliExpress Standard | 15~30일 | 무료 |
| AliExpress Premium | 10~15일 | $5~10 |
| DHL/FedEx | 5~7일 | $20~30 |

### 4.2 통관 주의사항

- $150 USD 이하: 면세
- $150 USD 초과: 관부가세 발생 (약 10%)
- 개인사용 목적임을 명시

### 4.3 반품/교환

- AliExpress Buyer Protection 기간 내 이슈 제기
- 불량품 수령 시 사진/동영상 증거 확보
- 분쟁 시 Dispute Open으로 환불 요청

---

## 5. 가격 비교 요약

| 제품 유형 | 가격대 | 난이도 | 추천도 |
|-----------|--------|--------|--------|
| LAN9252 개발보드 | $99~$145 | 중급 | ⭐⭐⭐⭐⭐ |
| AX58100 개발보드 | $115~$222 | 고급 | ⭐⭐⭐⭐ |
| 산업용 I/O 모듈 | $50~$80 | 초급 | ⭐⭐⭐⭐ |
| LAN9252 기본 모듈 | $30~$50 | 고급 | ⭐⭐⭐ |

---

## 6. 참고 링크

- [LAN9252 Datasheet](https://www.microchip.com/en-us/product/lan9252)
- [AX58100 Product Page](https://www.asix.com.tw/en/product/IndustrialEthernet/EtherCAT/AX58100)
- [LinuxCNC EtherCAT Forum](https://forum.linuxcnc.org/ethercat)
- [DieBieSlave - LAN9252 오픈소스 프로젝트](https://github.com/DieBieEngineering/DieBieSlave)

---

**문서 버전**: 1.0
**작성일**: 2026-02-14
**가격 정보 기준일**: 2026-02-14 (가격 변동 가능)
