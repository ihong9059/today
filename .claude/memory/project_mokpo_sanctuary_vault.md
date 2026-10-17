---
name: project_mokpo_sanctuary_vault
description: "목포성지숙소 vault (26th) — 가톨릭목포성지 숙소·단체 운영, 친동생 홍광이 이관용"
metadata: 
  node_type: memory
  type: project
  originSessionId: a7c42464-2866-46b3-b79f-77c5edc1445c
---

`C:\todo\목포성지숙소` (26th vault, SELF_ID=`mokpo-sanctuary-claude`) 2026-10-17 신설. **가톨릭목포성지(한국레지오마리애기념관) 숙소 69실·최대 250명 단체 신청 접수·운영·관리** 전용 AI-agent vault. 담당자 = **홍광이**(홍광선 대표 친동생, 전산·AI 비전문가). **폴더째 복사 이관** 목적 — 홍광이가 자기 PC에서 독립 운영.

- **8개 관리 도메인**: 01신청예약(신청대장·양식·캘린더·처리절차) · 02객실시설 · 03운영SOP(입퇴실·청소·식사·미사연계·안전) · 04단체관계(CRM) · 05재무정산 · 06인력당번 · 07운영데이터_개선(가동률·수요패턴·개선로그) · 08참고자료.
- **설계**: jangminha/guksa/gim-sales 패턴 계승 — standalone 우선, 입문자 친화 한글 폴더, 온보딩(`_시작안내.md`·`Claude와_작업하는법.md`), AI 비서(work-start/end skill "시작"/"마무리").
- **이식성 개선** 🚨: gim-sales의 절대경로 약점을 고쳐 **모든 경로 상대/자가참조**(check-inbox.py=`__file__` 기준, settings hook=`.claude/hooks/...` 상대). 격리 복사본에서 end-to-end 검증 완료(`.claude` 포함·exit 0). [[feedback_verify_deliverable_end_to_end]] 준수.
- **원칙**: 개인정보(신청자 연락처·명단) 로컬 보관·외부공유 마스킹(.gitignore 보호). 요금·객실 상세·식사 방식은 미확인 → 홍광이 입력 전 공란(환각 금지, [[feedback_no_fabricated_user_data]]).
- **확인된 성지 사실**: 주소 전남 목포시 노송길 35, ☎061-274-1004/061-279-4650, 이메일 mpc1897g@gmail.com. 숙소 69실·250명. 역사박물관=등록문화재 제513호(2017 개관), 산정동성당=광주대교구 최초 본당(1897)·국내 최초 준대성전(2021)·한국 레지오마리애 발상지(1953).
- git init+첫 커밋(6098841, 44파일) 완료. 허브(myWiki) 미연결 standalone — 필요 시 broker에 등록.
