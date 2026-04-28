# Tuya WiFi 스마트 플러그 사용 가이드

## 1. 제품 개요

Tuya WiFi 스마트 플러그는 기존 콘센트에 꽂아서 사용하는 원격 제어 플러그입니다.
스마트폰 앱(Smart Life)으로 어디서든 전원 ON/OFF, 타이머, 전력 모니터링이 가능합니다.

### 추천 제품 (AliExpress)

| 제품 | 용량 | 가격 | 링크 |
|------|------|------|------|
| Tuya WiFi Smart Plug EU 16A | 16A/3680W | ~$8 | https://www.aliexpress.com/item/4000478798085.html |
| Tuya WiFi Smart Plug EU 20A | 20A/4400W | ~$9 | https://www.aliexpress.com/item/1005003347568206.html |
| GIRIER Tuya WiFi 20A | 20A/4200W | ~$9 | https://www.aliexpress.com/item/1005003428736400.html |
| Tuya 2in1 듀얼 소켓 16A | 16A×2구 | ~$19 | https://www.aliexpress.com/item/1005001564982672.html |

---

## 2. 사전 준비

### 필요한 것
- Tuya WiFi 스마트 플러그
- 스마트폰 (iOS 또는 Android)
- **2.4GHz WiFi** 공유기 (5GHz는 지원하지 않음!)
- Smart Life 앱 (또는 Tuya Smart 앱)

### WiFi 확인사항
```
중요: 반드시 2.4GHz WiFi를 사용해야 합니다!

- 공유기가 2.4GHz와 5GHz를 분리 송출하는 경우: 2.4GHz SSID에 연결
- 듀얼밴드 통합 SSID인 경우: 공유기 설정에서 2.4GHz 전용 SSID를 별도로 만들 것을 권장
```

---

## 3. 앱 설치 및 회원가입

### Step 1: 앱 다운로드
- **Smart Life** 앱을 App Store 또는 Google Play에서 다운로드
  - 앱 이름: "Smart Life - Smart Living"
  - 또는 "Tuya Smart" 앱도 동일하게 사용 가능 (같은 플랫폼)

### Step 2: 회원가입
1. 앱 실행
2. "Register" 또는 "회원가입" 탭
3. 국가/지역 선택: **대한민국**
4. 이메일 또는 전화번호로 가입
5. 인증 코드 확인 후 비밀번호 설정

### Step 3: 가정(Home) 생성
1. 앱 메인 화면에서 "가정 만들기" 또는 "Home 추가"
2. 가정 이름 입력 (예: "우리집")
3. 방 추가 (거실, 침실, 주방 등) — 기기 분류용

---

## 4. 기기 등록 (페어링)

### 방법 1: EZ 모드 (빠른 연결) — 권장

```
1. 스마트 플러그를 콘센트에 꽂는다
2. 전원 버튼을 5초간 길게 누른다
3. LED가 빠르게 깜빡이면 (0.5초 간격) 페어링 모드 진입
4. Smart Life 앱 → 우측 상단 "+" 버튼
5. "전기 공학" → "콘센트(Wi-Fi)" 선택
6. WiFi SSID와 비밀번호 입력
7. "다음" → 기기 검색 시작
8. 연결 완료 후 기기 이름 설정 → "완료"
```

### 방법 2: AP 모드 (EZ 모드 실패 시)

```
1. 전원 버튼을 5초간 길게 누른다
2. LED가 빠르게 깜빡이면, 다시 5초간 길게 누른다
3. LED가 느리게 깜빡이면 (2초 간격) AP 모드 진입
4. 앱에서 "+" → "콘센트(Wi-Fi)" 선택
5. 우측 상단 "AP 모드" 전환
6. WiFi 비밀번호 입력 → "다음"
7. 스마트폰 WiFi 설정에서 "SmartLife-XXXX" 핫스팟에 연결
8. 앱으로 돌아가면 자동으로 설정 진행
9. 연결 완료 후 기기 이름 설정 → "완료"
```

### 페어링 문제 해결
| 증상 | 해결 방법 |
|------|----------|
| 기기를 찾을 수 없음 | 2.4GHz WiFi인지 확인, 5GHz면 안됨 |
| 연결 실패 반복 | AP 모드로 전환하여 재시도 |
| LED가 깜빡이지 않음 | 전원 버튼 10초 이상 길게 누름 (초기화) |
| WiFi 비밀번호 오류 | 특수문자 확인, 비밀번호 정확히 입력 |

---

## 5. 기본 사용법

### 5-1. 전원 ON/OFF
```
앱 메인 화면에서 해당 기기 아이콘 탭 → ON/OFF 토글
```

### 5-2. 타이머 설정
```
기기 선택 → 하단 "Timer" 메뉴
→ "타이머 추가"
→ 시간 설정 (예: 23:00에 OFF)
→ 반복 요일 선택 (매일, 평일, 주말 등)
→ 저장
```

### 5-3. 카운트다운 (지연 OFF)
```
기기 선택 → "Countdown" 메뉴
→ 시간 설정 (예: 30분 후 OFF)
→ 시작
```
사용 예: 선풍기 30분 후 자동 끄기

### 5-4. 전력 모니터링 (지원 모델만)
```
기기 선택 → 메인 화면에 표시:
- 현재 전력 (W)
- 전류 (A)
- 전압 (V)
- 누적 전력량 (kWh)

하단 "전력 통계" 탭:
- 일별/월별 전력 사용량 그래프
- 최대 100일간 기록 보관
```

### 5-5. 스케줄 (반복 예약)
```
기기 선택 → "Schedule" 메뉴
→ 예약 추가
→ 시간 + 동작(ON/OFF) + 반복 요일 설정

예시:
- 평일 08:00 ON (출근 전 커피머신)
- 평일 09:00 OFF (자동 끄기)
- 매일 23:00 OFF (대기전력 차단)
```

---

## 6. 고급 기능

### 6-1. 음성 제어 (Alexa / Google)

#### Amazon Alexa 연동
```
1. Alexa 앱 → "스킬 및 게임" → "Smart Life" 검색
2. "스킬 활성화" → Smart Life 계정 로그인
3. 기기 검색 → 완료
4. "알렉사, 거실 플러그 꺼줘"
```

#### Google Home 연동
```
1. Google Home 앱 → "+" → "기기 설정" → "Works with Google"
2. "Smart Life" 검색 → 계정 연결
3. 기기 동기화 → 완료
4. "오케이 구글, 침실 플러그 켜줘"
```

### 6-2. 장면(Scene) 설정
```
앱 하단 "스마트" 탭 → "시나리오 추가"

예시 1: "취침 모드"
- 조건: 매일 23:00
- 동작: 거실 플러그 OFF + 침실 플러그 OFF

예시 2: "외출 모드"
- 조건: 탭 실행 (수동)
- 동작: 모든 플러그 OFF
```

### 6-3. 기기 공유
```
기기 선택 → 우측 상단 설정(⚙) → "기기 공유"
→ 가족 구성원의 Smart Life 계정 입력
→ 가족도 같이 제어 가능
```

### 6-4. 그룹 제어
```
앱 → 기기 선택 → 설정(⚙) → "그룹 만들기"
→ 같은 종류의 플러그 여러 개를 하나의 그룹으로
→ 한 번에 ON/OFF
```

---

## 7. Home Assistant 연동 (고급)

Tuya 클라우드를 거치지 않고 **로컬 네트워크에서 직접 제어**할 수 있습니다.

### 방법 1: Tuya 공식 Integration
```
Home Assistant → 설정 → 통합 구성요소 → "Tuya" 추가
→ Tuya IoT Platform 계정 연결
```
참고: https://www.home-assistant.io/integrations/tuya/

### 방법 2: LocalTuya (클라우드 없이 로컬 제어)
```
1. HACS 설치 (Home Assistant Community Store)
2. HACS → 통합 → "LocalTuya" 검색 → 설치
3. Tuya IoT Platform에서 Device ID, Local Key 확인
4. Home Assistant → 설정 → LocalTuya → 기기 추가
5. 로컬 네트워크에서 직접 제어 (인터넷 없이도 동작)
```
참고: https://github.com/make-all/tuya-local

### LocalTuya 장점
- 인터넷 끊겨도 로컬에서 제어 가능
- 응답 속도 빠름 (클라우드 경유 안함)
- 프라이버시 보호 (데이터가 외부로 안 나감)

---

## 8. 대기전력 차단 활용 예시

### 일반 가정
| 기기 | 대기전력 | 플러그 설정 |
|------|---------|------------|
| TV + 셋톱박스 | 15~30W | 취침 시 OFF 스케줄 |
| 컴퓨터 + 모니터 | 5~15W | 외출 시 OFF |
| 전자레인지 | 3~5W | 상시 OFF, 사용 시만 ON |
| 충전기 (미사용 시) | 0.5~1W | 충전 완료 후 카운트다운 OFF |

### 예상 절감 효과
```
대기전력 30W × 24시간 × 365일 = 262.8 kWh/년
전기요금 약 200원/kWh 기준 = 약 52,560원/년 절감
```

---

## 9. 주의사항

1. **최대 용량 초과 금지**: 16A 모델은 3,680W, 20A 모델은 4,400W까지
   - 에어컨, 전기히터 등 고용량 기기는 용량 확인 필수
2. **방수 미지원**: 욕실, 실외 사용 금지
3. **2.4GHz WiFi 필수**: 5GHz WiFi에서는 연결 불가
4. **공유기 재시작 시**: 자동 재연결되나 1~2분 소요
5. **펌웨어 업데이트**: 앱에서 알림 시 업데이트 권장

---

## 10. 참고 자료

### 공식 문서
- [Tuya 16A WiFi 스마트 플러그 매뉴얼](https://manuals.plus/tuya/16a-wifi-smart-plug-manual)
- [Tuya 스마트 WiFi 플러그 사용 가이드](https://manuals.plus/tuya/smart-wifi-plug-manual-3)
- [Smart Life 앱 사용 설명서](https://manuals.plus/apps/smart-life-app-with-smart-plug-manual)
- [Tuya 공식 FAQ](https://smartapp.tuya.com/tuyasmart/help)
- [Tuya 기기 등록 가이드](https://support.tuya.com/en/help/_detail/K9hut3a940hfl)

### 설정 가이드
- [Tuya Smart Life 기기 설정 방법](https://www.trunetto.com/troubleshooting/smart-hubs/tuya/how-to-set-up-tuya-smart-life-devices)
- [Tuya 스마트 플러그 셋업 완전 가이드](https://smarthomeace.com/how-to-set-up-tuya-smart-plug/)
- [코드도사 - Tuya 스마트 플러그 리뷰](https://codedosa.com/14508)

### Home Assistant 연동
- [Home Assistant Tuya 공식 통합](https://www.home-assistant.io/integrations/tuya/)
- [LocalTuya GitHub](https://github.com/make-all/tuya-local)
- [LocalTuya 설정 가이드](https://smarthomecircle.com/how-to-setup-local-tuya-in-home-assistant)

### 개발자 자료
- [Tuya IoT Platform - Smart Life 앱 매뉴얼](https://developer.tuya.com/en/docs/iot/user-manual-for-tuya-smart-v3177?id=K9obrofrfk4sk)
- [Tuya Smart Plug SDK Demo](https://developer.tuya.com/en/docs/iot-device-dev/Wi-Fi-SDK-Demo-Plug?id=Kanqdahz5xj4b)
