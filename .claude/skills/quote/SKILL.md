---
name: quote
description: UTTEC 견적서 작성·관리. 표준 템플릿으로 견적서 렌더 + UTQ 번호 자동 발번 + 중앙 견적대장 등록/상태갱신. "견적서 만들어줘", "견적 발행", "견적대장 보여줘", "견적 상태 수주로", "/quote" 요청 시 사용.
---

# 견적서 Skill (UTTEC 표준)

견적서를 **일관된 디자인·번호·중앙 대장**으로 발행/관리한다.

## 아키텍처 (분산 파일 + 중앙 표준 + 중앙 대장)

- **표준 엔진**: `C:\todo\today\templates\견적서\` (`render.py`·`company.json`·`README.md`)
- **파일 저장**: 각 프로젝트 vault의 견적 폴더 (예: `C:\todo\livecow\견적\`, `C:\todo\plc\...\견적서\제출용\`)
- **중앙 대장**: `C:\todo\today\myWiki\second-brain\entities\견적대장.md`
- **번호**: `UTQ-YYYYMMDD-NN` (render.py 가 대장 스캔해 자동 발번)

## A. 새 견적서 발행

1. **README 정독**: `templates\견적서\README.md` (spec 스키마·CSS 클래스).
2. **다음 번호 미리보기**: `python "C:\todo\today\templates\견적서\render.py" --peek`
3. **회사정보 확인**: `company.json` 이 최신인지 (하드코딩 금지).
4. **spec 작성**:
   - 단순 견적 → `{name}_spec.json` 작성 후 `python render.py {name}_spec.json`
   - 복잡한 견적(BOM 계산·환율 등) → 프로젝트 vault에 `build_*.py` 작성, `from render import render_quote` 로 pages 조립 후 호출. (LiveCow `build_quote_pdf.py` 가 참고 예시)
5. `out_dir` 는 **프로젝트 vault의 견적 폴더**로 지정 (today repo 아님).
6. 렌더 완료 → HTML·PDF 생성 + **대장 자동 등록**(status=발송) 확인.
7. PDF를 `chrome.exe` 로 열어 육안 검수 (`feedback_browser_chrome`).

## B. 견적 상태 갱신 (수주/거절/만료)

발주처 회신·유효기간 경과 시 대장 상태를 갱신한다. (수동 Edit)

1. `견적대장.md` 열기 → 해당 번호 행의 `상태` 컬럼 변경: `발송` → `수주`/`거절`/`만료`/`보류`.
2. `수주` 시 → 해당 vault log·entity에도 cascade (`feedback_mywiki_sync`), 필요 시 오늘 할일 추가.
3. 발행일 + 유효기간 경과분은 일괄 `만료` 처리 권장 (work-start 시 점검).

## C. 견적대장 조회

"견적대장 보여줘" → `견적대장.md` 표를 읽어 상태별로 요약 (발송 대기/수주/총 파이프라인 금액).

## 원칙 (반드시 준수)

- 🚫 **회사정보 하드코딩 금지** — `company.json` 참조. (전화 010-2401-9059 = `reference_user_phone`, 임의 데이터 금지 = `feedback_no_fabricated_user_data`)
- 🚫 **별도 견적 vault 만들지 않음** — 파일은 프로젝트 vault, 인덱스만 대장. (`feedback_vault_scope_isolation`)
- ✔ 금액은 **제출용 canonical 기준**으로 대장 기록 (구버전 세션 요약 금지).
- ✔ 신규 견적은 반드시 표준 엔진 사용 (디자인 일관성). 기존 md2pdf(`_build_md2pdf.py`)는 견적 외 일반 문서용.
- ✔ 대장은 myWiki 자산 → 갱신 후 `git`은 today repo work-end 에서 커밋.

## 트리거

"견적서 만들어줘" · "견적 발행" · "견적서 렌더" · "견적대장" · "견적 상태 갱신" · "수주 처리" · "/quote"
