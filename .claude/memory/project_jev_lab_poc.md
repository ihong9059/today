---
name: project_jev_lab_poc
description: "Jev(TypeSafe System One) 실습·적용검토 PoC vault. Tier 1 standalone, vault-registry 미등록"
metadata: 
  node_type: memory
  type: project
  originSessionId: bf5e65ce-ee37-48c5-8b7e-5b4c2bae23a0
---

`C:\todo\jev-lab` — Jev 모델 PoC vault (2026-11-07 신설, 영상 mhgCbF6_IKo 계기).

**Jev** = TypeSafe AI의 첫 **System One** 판단 전용 모델(2026-09-15 출시). 문장 생성·대화 X, **구조화 판단만** 반환(Noul 참확률 / Choice 분류 / Score 점수 + confidence). 70~500ms·$0.042/1M 입력(출력무료)·최소충전 $5. 반복 분류·평가에 특화 → 답변작성·복잡처리는 Claude(역할분담). Claude Code 공식 skill `claude plugin marketplace add typesafe-ai/skills`로 연동.

**Tier = 1 (standalone PoC)**: broker 미등록·SELF_ID 없음·multi-agent 미합류. guksa/pcb-edu/gim-sales standalone 패턴 계승. **vault-registry에 아직 미등재**(번호 미부여) — PoC라 의도적. 승격경로: 유효성 확인→Tier 2(entity 신설+등록) / 특정 vault 운영의존→Tier 3+broker.

**4단계**: Phase0 환경(가입·$5충전·skill설치·연결테스트) → Phase1 세 타입 체득 → Phase2 UTTEC 실업무 1건 dogfooding(정확도·비용 측정) → Phase3 적용/종료 판정. 첫 dogfood 후보 = **위시캣 1차 스크리닝**(반복 분류 업무, 대표 확정 대기). 진행 단일출처 = `jev-lab/README.md`.

관련: [[project_active_track_status]] · Tier 정책=myWiki second-brain/CLAUDE.md
