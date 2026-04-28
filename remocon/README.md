# RF 리모컨 신호 캡처 & 리플레이 가이드

무선 리모컨(433MHz/315MHz 등) 신호를 캡처하고 분석하여 동일한 신호를 재생성하는 방법을 정리합니다.

---

## 1. 전체 워크플로우

```
[리모컨 버튼 누름] → [SDR로 신호 캡처] → [신호 분석] → [디코딩] → [신호 재생성/전송]
```

---

## 2. 필요 장비

### 수신 (캡처용)
| 장비 | 가격대 | 주파수 범위 | 비고 |
|------|--------|-------------|------|
| **RTL-SDR v3** | ~$30 | 24MHz ~ 1.7GHz | 수신 전용, 입문용 |
| **RTL-SDR Blog V4** | ~$35 | 24MHz ~ 1.7GHz | 최신 버전, 성능 향상 |

### 송수신 (캡처 + 리플레이)
| 장비 | 가격대 | 주파수 범위 | 비고 |
|------|--------|-------------|------|
| **HackRF One** | ~$300 | 1MHz ~ 6GHz | 반이중 송수신 |
| **YARD Stick One** | ~$100 | 300~928MHz | 리모컨 주파수 특화 |
| **Flipper Zero** | ~$170 | Sub-1GHz + 기타 | 올인원 도구, 가장 간편 |
| **CC1101 모듈 + Arduino** | ~$10 | 300~928MHz | DIY 저가 옵션 |

---

## 3. 소프트웨어 도구

### 신호 캡처 & 시각화
- **SDR# (SDR Sharp)** — Windows용, RTL-SDR과 함께 사용
- **GQRX** — Linux/Mac용 SDR 수신 소프트웨어
- **CubicSDR** — 크로스 플랫폼

### 신호 분석 & 디코딩
- **Universal Radio Hacker (URH)** — RF 프로토콜 리버스 엔지니어링 핵심 도구
  - 캡처 → 분석 → 디코딩 → 전송까지 올인원
  - GUI 기반으로 직관적
- **Inspectrum** — 신호 시각화 특화
- **rtl_433** — 433MHz 디바이스 자동 디코딩 (200+ 프로토콜 지원)

### 신호 생성 & 전송
- **GNU Radio** — 블록 다이어그램 기반 신호 처리
- **rpitx** — 라즈베리파이 GPIO로 직접 RF 전송 (별도 하드웨어 불필요!)
- **rfcat** — YARD Stick One 제어용 Python 라이브러리

---

## 4. 단계별 실습 가이드

### Step 1: 리모컨 주파수 확인

대부분의 무선 리모컨은 아래 ISM 대역을 사용합니다:
- **315 MHz** — 북미, 일본
- **433.92 MHz** — 유럽, 아시아 (한국 포함)
- **868 MHz** — 유럽
- **915 MHz** — 북미

리모컨 뒷면의 FCC ID나 라벨을 확인하거나, SDR로 광대역 스캔하여 찾습니다.

### Step 2: URH로 신호 캡처

```bash
# URH 설치
pip install urh

# 실행
urh
```

1. URH 실행 → File → Record Signal
2. Device: RTL-SDR 선택
3. Frequency: 433920000 (433.92MHz)
4. Sample Rate: 2000000 (2 MSps)
5. 리모컨 버튼을 누르면서 Record

### Step 3: 신호 분석

URH의 Interpretation 탭에서:

1. **변조 방식 확인** — 대부분 ASK/OOK
2. **비트 패턴 확인** — 0과 1의 패턴이 보임
3. **프로토콜 확인** — PT2262, EV1527, HCS301(롤링코드) 등

```
일반적인 고정 코드 리모컨 신호 예시:
┌──┐  ┌──┐  ┌─┐   ┌─┐
│  │  │  │  │ │   │ │
┘  └──┘  └──┘ └───┘ └───
 1  0   1  0   1  1   1  1
```

### Step 4: 디코딩

```
예시: EV1527 프로토콜
- 프리앰블: 1비트 High + 31비트 Low
- 데이터: 20비트 주소 + 4비트 데이터
- 총 24비트 반복 전송
```

### Step 5: 신호 재생성

#### 방법 A: URH로 직접 리플레이 (HackRF 필요)
```
URH → Generator 탭 → 캡처한 신호 로드 → Send
```

#### 방법 B: rtl_433로 디코딩 후 재생성
```bash
# 캡처 & 자동 디코딩
rtl_433 -f 433920000 -S all

# 결과 예시:
# Protocol: EV1527
# ID: 0x1A2B3C
# Button: 1
```

#### 방법 C: Arduino + CC1101 모듈 (저가 옵션)
```cpp
// rc-switch 라이브러리 사용
#include <RCSwitch.h>

RCSwitch mySwitch = RCSwitch();

void setup() {
  // 송신핀 설정 (CC1101 GDO0 핀)
  mySwitch.enableTransmit(10);
  mySwitch.setProtocol(1);      // EV1527
  mySwitch.setPulseLength(350); // 펄스 길이 (us)
}

void loop() {
  // 분석에서 얻은 코드 전송
  mySwitch.send(0x1A2B3C, 24); // 24비트 코드
  delay(3000);
}
```

#### 방법 D: Flipper Zero (가장 간편)
```
Sub-GHz → Read → 리모컨 버튼 누름 → Save → Send
```

---

## 5. 롤링 코드 (Rolling Code) 주의사항

최신 차량 키, 차고문 리모컨 등은 **롤링 코드(HCS301 등)**를 사용합니다.

- 매번 다른 코드를 생성하므로 단순 리플레이가 불가능
- 분석은 가능하지만 재생성은 매우 어려움
- RollJam 같은 고급 기법이 있으나 불법적 사용 금지

**고정 코드를 사용하는 일반적인 대상:**
- 저가 무선 도어벨
- 무선 파워 스위치/콘센트
- 저가 차고문 리모컨
- RC 장난감
- 무선 센서 (온도/습도)

---

## 6. 추천 입문 세트

### 최소 비용 (캡처만)
- RTL-SDR v3 ($30) + URH (무료) = **약 $30**

### 캡처 + 리플레이
- RTL-SDR v3 ($30) + Arduino Nano ($5) + CC1101 ($3) = **약 $38**

### 올인원
- Flipper Zero ($170) = **약 $170** (가장 간편, 학습에도 좋음)

### 본격 연구용
- HackRF One ($300) + URH + GNU Radio = **약 $300**

---

## 7. 법적 참고사항

- RF 신호 **수신/캡처는 합법** (대부분 국가)
- 자신의 기기에 대한 분석/리플레이는 교육 목적으로 허용
- 타인의 기기(차량, 잠금장치 등)에 대한 무단 접근은 **불법**
- 송신 시 해당 국가의 전파법 준수 필요 (한국: 전파법 제19조)

---

## 참고 자료

- [Universal Radio Hacker GitHub](https://github.com/jopohl/urh)
- [rtl_433 GitHub](https://github.com/merbanan/rtl_433)
- [RTL-SDR Blog](https://www.rtl-sdr.com/)
- [Flipper Zero Docs](https://docs.flipper.net/)
- [rc-switch Arduino Library](https://github.com/sui77/rc-switch)
