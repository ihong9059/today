---
name: reference_livecow_cost_kit
description: "livecow-cost-kit = 홍광삼(관리팀장) 인계용 원가산출 독립형 vault. livecow 차기모델 PCB ASS'Y 판가 산출"
metadata:
  node_type: memory
  type: reference
---

**livecow-cost-kit** (`C:\todo\livecow-cost-kit`) — 홍광선 대표가 **홍광삼 관리팀장**에게 인도하는 **전달용 독립형 vault**. 2026-08-14 신설. jangminha-kit과 동일한 standalone 형태(자체 git repo, 로컬 `work-start`/`work-end` skill, broker/외부 memory 의존 없음 — 어느 PC/USB에서든 단독 동작).

**목적**: livecow(위시캣 #156763) **차기 모델**(신규 PCB + firmware 개선)의 **제조 원가 = PCB ASS'Y 판가** 산출·관리. 방법론(EasyEDA·LCSC·JLCPCB)은 재사용 가능, livecow가 첫 적용 사례.

**구성**:
- `01_원가산출/방법론/` 6단계: 원가구조(판가=원가×(1+마진), 6요소) → EasyEDA BOM export → LCSC 부품단가 → JLCPCB PCB제조비 → SMT조립비 → 판가/마진/수율.
- 원가표 템플릿(수량 시나리오) + `livecow_차기모델/` 첫 적용.
- `02_기술배경/`: 4층 스택업·능동IC MOQ리스크·1보드화(RAK3172→STM32WLE5) RF정합 원가.
- `자료/`(이관, livecow 원본은 immutable 복사): Cow-Ver70 EasyEDA(4층 Gerber/BOM/PnP) + 통합 IC BOM + 데이터시트 + TAURUS V60 BOM.
- **EasyEDA 완전초보용 따라하기 설명서**: 설치 → BOM 부품가격 확인 → 전체 ASS'Y 가격 확인 (홍광삼 첫 사용).

**주고받기**: `_홍광선께_보낼것/`(확인요청)·`_홍광선께_받은것/`(회신) 폴더 오프라인 교환. broker 아님.

**🚨 NDA**: livecow 설계자산 = BNOW/CBNU IP → 내부 취급만, 공개 repo(GitHub) push 금지 (`.gitignore`·CLAUDE.md·work-end에 명시).

**⚠️ 인물 혼동 주의**: **홍광선**=UTTEC 대표(본인, [[user_name_hong_kwangsun]]) / **홍광삼**=UTTEC 관리팀장(별개 인물, Claude 어느정도 사용). 이메일/이름 prefix로 추정 금지.

단일출처 = myWiki `entities/vault-registry.md` § "전달용 독립형 kit". livecow 실행 vault 본체는 `C:\todo\livecow`(delivery, 별도).
