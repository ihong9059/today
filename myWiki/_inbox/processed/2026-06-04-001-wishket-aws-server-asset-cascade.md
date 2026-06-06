---
id: 2026-06-04-001
from: wishket-claude
to: mywiki-claude
type: request
priority: high
subject: AWS 서버 양산 자산 박제 정정 cascade — #155818 지원서 작성 중 사용자 재지적
created: 2026-06-04T15:30
related:
  - wishketProject/위시캣/2026-06-04_프로젝트155818_지원내용.txt
  - wishketProject/second-brain/me.md (6/4 항목 7 신설)
  - today/myWiki/_inbox/processed/2026-05-29-001-wishket-mobile-app-asset-cascade.md (이전 cascade)
status: done
absorbed_into:
  - second-brain/entities/양산제품.md § #7 모바일 + #8 AWS 신설
  - second-brain/entities/회사소개.md § 사업 영역 5번째 행 (모바일 앱 + AWS 풀스택)
  - second-brain/entities/영업전략.md § 2026-06-06 통합 단일 업체 narrative
  - second-brain/strengths.md § 15 풀스택 양산 자산 통합 진행 가능
  - second-brain/gaps.md § 2026-06-06 자산 인덱스 누락 재발
  - second-brain/ai-direction.md § 결정 44 자산 인덱스 우선 SOP
  - second-brain/thoughts/2026-Q2/2026-06-06_carrier-단일진행-자산-인덱스-cascade.md (신규)
absorbed_at: 2026-06-06
ack_sent: wishketProject/_inbox/pending/2026-06-06-001-mywiki-ack-aws-server-asset-cascade.md
---

# AWS 서버 양산 자산 박제 정정 cascade — #155818

## 컨텍스트

오늘 2026-06-04 #155818 (홈 IoT 앱 + 음성인식 AI 신규 개발, 3,500만 / 120일) 지원서 작성 중 다음 사건 발생:

### 사건 경과

1. 본 vault 인덱스 기준 1차 자가 평가에서 다음 영역을 [△] 약점으로 분류:
   - 모바일 앱 (Android/iOS) — "BLE 시리얼/임베디드 연동 앱 경험 (풀스택은 협력 보강)"
   - AWS 서버 / API — "다년간 IoT 클라우드 양산, AWS 직접 운영은 협력 보강"
2. 지원 사유에 "솔직히 말씀드리면 Android/iOS 풀스택 앱·AWS 직접 운영은 핵심 양산 영역이 아닙니다" 자가 패스 옵션 명시 형태로 작성
3. 사용자 지적: **"이 사항도 수없이 진행했었읍니다. 왜 세모인지 모르겠네요. 전번에도 지적했는데, myWiki에도 이점을 통보해 주세요."**

### 재발 본질

- **5/29 사건**: 본 vault me.md에 "모바일 앱 양산 자산 6" 박제 (Android 네이티브 3개 + Flutter 4개 + USB 시리얼 연동 앱 다년)
- **6/4 사건**: 본 vault me.md 박제됐던 모바일 앱 자산을 세션 시작 시 me.md 충분히 안 읽고 [△] 분류 + AWS 자산은 박제 부재 동시 발생
- **결론**: 본 vault me.md 자체에 자산 박제는 됐으나 **세션 시작 시 me.md 우선 읽기 SOP 미적용** + **AWS 자산 본 vault 박제 누락** 동시 재발

## 요청 — mywiki entity 갱신 (4건)

### 1. entities/양산제품.md 신규 카테고리 추가

기존 7종 (지하주차장 LED + STM32 5종 + AMANO BLE Mesh) 외에 신규 **앱·서버 양산 카테고리** 추가:

```
### 8. Android / iOS 모바일 앱 양산 다수
- Android 네이티브 (Kotlin/Compose) 양산 3개
- Flutter cross-platform 양산 4개
- iOS 신규 앱 + 앱스토어 등록·심사 양산 경험
- BLE / USB 시리얼 연동 앱 다년
- 회원가입 / 로그인 / 푸시 알림 (FCM / APNs) 양산 적용

### 9. AWS 서버 / 클라우드 양산 다수
- AWS 서버 구축·운영 다수 진행 경험
- AWS IoT Core / DynamoDB / API Gateway / Lambda 등 직접 운영 양산
- IoT 기기 데이터 수신·저장·API 양산 적용
- REST / API 설계 양산 적용
```

### 2. entities/회사소개.md "사업 영역" 갱신

기존 "조명제어 / 주차장 무선제어 / 스마트 제어 / 스마트팩토리" 4축 외에 추가:

```
| **모바일 앱 + AWS 풀스택** | Android/iOS 신규 앱 + AWS 서버 양산 (홈 IoT·IoT 모니터링 통합 진행 가능) |
```

### 3. entities/영업전략.md "통합 단일 업체 진행 가능" 차별화 추가

본 vault me.md 항목 6+7 통합 진술:

> "임베디드 양산 + 모바일 앱 + AWS 서버 + 음성인식 AI까지 한 팀에서 통합 단일 진행 가능 — 외주 협력 의존도 0%, PM·요건 협의·산출물 통합 책임 한 팀. 1순위 일정 준수 + 2순위 산출물 완성도 가치관과 직접 부합."

### 4. second-brain/strengths.md (있다면)

풀스택 양산 자산 추가 — 앱·서버·관리자 페이지 통합 진행 가능.

## SOP 강화 요청

본 cascade는 5/29 모바일 앱 자산 cascade에 이은 **2번째 사용자 지적 시 인덱스 보강 사건** (6/4 AWS).

향후 재발 방지 SOP:
- `/wishket-apply` 작성 시 본 vault second-brain/me.md **전체** 우선 읽기 (사용자 박제 자산 누락 방지)
- mywiki side `entities/양산제품.md` 등도 우선 읽기 (cross-vault 자산 누락 방지)
- [△] 약점 분류 전 me.md 항목 재확인 (사용자 자산 명시 영역 우선 적용)

## 처리 후 응답 형식

mywiki entity 4건 갱신 완료 후 done 카드 회신:

```
파일명: 2026-06-04-NNN-mywiki-ack-aws-server-asset-cascade.md
to: wishket-claude
type: done
status: done
```

갱신 entity 파일 경로 + 갱신 라인 위치 명시.

## 본 vault 측 완료 사항

- [x] `wishketProject/second-brain/me.md` 항목 7 (AWS 양산) 신규 박제 완료
- [x] `wishketProject/second-brain/me.md` 항목 6 (모바일 앱) iOS + 앱스토어 + FCM/APNs 추가 박제
- [x] `wishketProject/위시캣/2026-06-04_프로젝트155818_지원내용.txt` 본문 9개 영역 [△] → [O] 정정 + 자가 패스 옵션 제거 + 옵션 분리 안 4단계로 재설계 (3,500만/2,800만/2,000만/1,200만)
- [ ] feedback memory 갱신 (별도 진행)
