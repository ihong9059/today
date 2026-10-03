---
name: project_gim_sales_vault
description: "gim-sales — 김 판매사업 기획 vault (25th), 롯데면세점 입점, 산출물 4종, 사업화 5-단계 프레임, 첫 식품·유통 영업 vault"
metadata: 
  node_type: memory
  type: project
  originSessionId: 96c9b4a2-a93e-4500-813e-bbbdd244027c
---

`C:\todo\gim-sales`(25th, SELF_ID=`gim-sales-claude`) 2026-10-03 신설. **한국 김을 롯데면세점을 주축으로** 해외여행객·선물 시장에 판매 확대하는 신사업을 기획·추진하는 vault. 홍광선 대표 지시(`김판매계획.txt`). 배경 = 외국인의 한국 김 고급 인식 + 수출 호황(2025 역대최대·수산식품 첫 1조원) + 여행 선물 수요 + **현행 면세점 김 포장 노후 = 차별화 기회** + 롯데 지인(지점장) 제안 예정.

**산출물 4종**: ① 진행계획(전체 물류 감안) ② 적정 판매가격 ③ 김 생산·물류 현황 조사 ④ **롯데 지점장 제안서**(최종 수렴점).

**방법론 심장** = 김 사업화 5-단계 프레임: ① 시장(왜) → ② 제품·포장(무엇) → ③ 공급·물류(어떻게) → ④ 가격·수익(얼마에) → ⑤ 제안·실행(성사). (`00_대시보드/김_사업화_프레임.md`)

[[project_pcb_edu_vault]]·guksa 독립 vault 패턴 계승 — standalone 우선(broker 미등록, `_inbox` 채널만), 이식성(폴더째 복사 시 `.claude/` 포함). work-start/end skill("김 시작"/"마무리")로 관리. **첫 식품·유통 영업 기획 vault** (교육형 pcb-edu/guksa와 성격 구분, UTTEC 하드웨어 코어와 무관한 대표 개인 신사업 트랙 — 허브 myWiki는 상태·결정만 인지).

🚨 원칙: 수치·사실(수출액·가격·원가·면세 수수료·물류비)은 공식출처만 각주 필수, 환각 금지 — 제안서는 지점장이 그대로 믿고 윗선에 올림 ([[feedback_no_fabricated_user_data]]). 미확정 의사결정(제품 종류·공급처·투자규모·롯데 접점) 짐작 금지 — 표로 질문(`06_질문_인박스/` D1~D5). 1차 웹조사 수치는 공식통계(관세청/해수부/KATI) 재확인 전제. 외부 발송 제안서는 버전 분리([[feedback_document_version_separate_file]]).
