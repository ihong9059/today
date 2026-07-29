# UTTEC 견적서 표준 시스템

전 vault 공통 견적서 렌더 엔진. **디자인·회사정보·번호·대장을 단일화**한다.

## 구성

| 파일 | 역할 |
|---|---|
| `company.json` | 회사정보 **단일 소스** (상호·사업자번호·주소·대표·연락처). 값 변경은 여기서만. |
| `render.py` | 렌더 엔진 — 공유 CSS + 헤더/당사자/총액 스켈레톤. 발번·PDF변환·대장등록 자동. |
| `example_spec.json` | spec 예시 (단순 견적용). |
| `견적대장.md` | → `myWiki/second-brain/entities/견적대장.md` (중앙 대장). |

## 번호 규칙

`UTQ-YYYYMMDD-NN` — 발행일 + 그날 순번. `render.py` 가 대장을 스캔해 자동 발번.
미리보기: `python render.py --peek`

## 사용법

### (A) 단순 견적 — JSON spec
```bash
python render.py my_spec.json
```
→ `{번호}_{title}.html` + `.pdf` 생성 + 대장 자동 등록.

### (B) 복잡한 견적 (BOM 계산 등) — 별도 .py
```python
from render import render_quote
pages = [ "<h2>...1페이지...</h2>...", "<h2>...2페이지...</h2>..." ]  # 계산 로직으로 조립
render_quote({ "vault":"livecow", "title_main":"LiveCow", ..., "pages": pages },
             out_dir=r"C:\todo\livecow\견적")
```

## spec 스키마

| 키 | 필수 | 설명 |
|---|:-:|---|
| `title_main` | ✔ | 헤더 큰제목 옆 상호/프로젝트명 (예: `LiveCow`) |
| `pages` | ✔ | 페이지별 HTML 문자열 배열. **각 원소 = 한 페이지**. 헤더·당사자·총액배너는 엔진이 1페이지 상단에 자동 삽입. |
| `client` | ✔ | 수신(공급받는 자) 표 — `{"상호":..,"담당":..,"제품":..}` |
| `grand_total` | ✔ | 총액배너 숫자 문자열 (예: `"8,104,800"`). `₩`·`원`은 엔진이 붙임. |
| `amount_num` | 권장 | 대장 기록용 숫자(VAT별도 공급가액). |
| `quote_no` | | 미지정 시 자동 발번. |
| `date` | | 미지정 시 오늘. |
| `vault` `project` `status` | | 대장 기록용. status 기본 `발송`. |
| `kicker` | | 헤더 상단 소문자 라벨 (예: `QUOTATION · 위시캣 #156763`). |
| `subtitle` | | 헤더 부제. |
| `valid` | | 유효기간 (기본 `견적일로부터 30일`). |
| `currency` | | 기본 `KRW (VAT 별도)`. |
| `total_label` | | 총액배너 라벨 (기본 `견적 합계 (부가세 별도)`). |
| `confidential` | | 1페이지 하단 붉은 기밀문구. 없으면 생략. |
| `stamp` | | 우하단 스탬프 (예: `DRAFT`). 없으면 생략. |
| `foot` | | 마지막 페이지 하단 각주. |
| `filename` | | 출력 파일명(확장자 제외). 기본 `{번호}_{title_main}`. |
| `out_dir` | | 출력 폴더 (프로젝트 vault 견적 폴더). |

## 본문(pages) 작성용 CSS 클래스

- 섹션제목: `<h2><span class="num">1</span>제목</h2>`
- 표: 기본 `<table>`. 셀 `td.c`(중앙) `td.num`(우측숫자) / 행 `tr.sub`(소계) `tr.hi`(합계강조)
- 박스: `<div class="box key|ok|warn">` (제목 `<div class="bt">…</div>`)
- 순위칩: `<span class="rank">1순위</span>` · 인라인코드: `<code>…</code>`

## 원칙

- 견적서 **파일은 프로젝트 vault**에, **대장은 myWiki**에 (분산+중앙).
- 회사정보 하드코딩 금지 → `company.json` 참조.
- 신규 견적은 반드시 본 엔진 사용 (디자인 일관성).
