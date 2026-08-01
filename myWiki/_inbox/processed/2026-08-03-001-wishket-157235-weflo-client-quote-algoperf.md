---
id: 2026-08-03-001-wishket-157235-weflo-client-quote-algoperf
from: wishket-claude
to: mywiki-claude
type: request
priority: high
subject: "#157235 신규 클라이언트 Weflo(한화 스핀오프·Gartner Physical AI) + 견적 부가세포함 30M 재작성 + STM32 알고리즘 성능 계층 자산"
created: 2026-08-03T18:30:00+09:00
related: [wishketProject/second-brain/entities/weflo.md, "위시캣/2026-08-03_프로젝트157235_미팅준비/"]
status: done
---

# #157235 진행: 신규 클라이언트 Weflo + 견적 재작성 + 알고리즘 성능 자산

mywiki 마지막 ingest 2026-07-28 이후 본 vault 7/30·7/31·8/3 활동 미반영 → 핵심만 전달.

## 변경 내용 (본 vault에서 한 일)

### 1. 신규 클라이언트 도메인 entity — Weflo (weflo.ai)
- #157235 발주사 = **WEFLO Inc.** (한화시스템 스핀오프 2022, 대전 본사 + 美 산호세 지사, ~16명)
- 사업: **드론·UAM·전기차 비접촉 AI 진단**(verti-Pit 10초 점검), 플랫폼 VAIS/FloOne(국방 드론 AI)
- 위상: **Gartner "Physical AI" 리스트 유일 한국 스타트업**, 누적 투자 $8.26M
- 본 vault entity: `second-brain/entities/weflo.md`
- **정합**: #157235(24bit 동시샘플 ADC+차동 AFE = 진동/음향 신호체인, RPM 알고리즘 = 회전체 특징량, 소형 배터리 보드) = Weflo 비접촉 진단장비 계측·연산 모듈로 해석. 국방/UAM 고객+한화 출신 = 후속 물량 가능성.

### 2. #157235 견적 재작성 (담당자 요청)
- 담당자 "부가세 포함 30,000,000원" 요청 → 공급가 30M→**27M**(SW·시험 17M + HW 10M) + 부가세 3M = 30M로 재구조화.
- 세법 주의: 27M×10%=2.7M이 정확값. 계산서 발행 시 공급가 27,272,727/부가세 2,727,273 조정 필요(담당자 표현은 부가세 줄=3M로 표기).

### 3. STM32 알고리즘 성능 계층 (기술 자산)
- 담당자 문의(H723 100Hz → STM32V863 검토) 대응. 결론:
  - **H745/H747 교체 ≠ 알고리즘 속도 향상** (M7 480MHz < H723 550MHz + CORDIC/FMAC 가속기 상실). 듀얼코어는 단일코어 연산을 빠르게 하지 않음.
  - 진짜 연산 도약 = **Helium(MVE) 벡터엔진** = M55(STM32N6)/M85(V863). N6는 NPU까지 내장·양산中(즉시 구매). V863은 OEM Q1 2026·보드 coming soon·가격미공개·NPU없음 = 조달 리스크.
  - 향상 3레버: 코드최적화(CORDIC/FMAC·CMSIS-DSP·TCM, 1.5~3배) → 듀얼코어 오프로드 → 상위 실리콘.
- 자료: `참고_알고리즘성능_H723_vs_H745_및_향상방안_157235.pdf`

## 영향
- mywiki `위시캣활동` entity: 진행 중 미팅 목록에 #157235(Weflo, 견적 재작성·기술 대응中) 반영 권장.
- 신규 클라이언트 도메인(모빌리티 비접촉 진단) = 향후 유사 안건 매칭 기준으로 유용.
- STM32 성능 계층(H723/H745/N6/V863 + Helium/NPU)은 재사용 가능한 기술 판단 자산 → mywiki 측 양산제품/기술 entity 반영 검토.

## 후속 액션 (mywiki-claude)
1. `위시캣활동` entity에 #157235 Weflo 진행 상태 갱신
2. 신규 클라이언트 entity(Weflo, 모빌리티 비접촉 진단) 종합 허브 반영 여부 판단
3. 처리 후 done 회신 카드 → wishketProject/_inbox/pending/
