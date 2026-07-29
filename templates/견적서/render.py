# -*- coding: utf-8 -*-
"""UTTEC 견적서 표준 렌더 엔진 (단일 소스).

- 스타일(CSS)·헤더밴드·당사자박스·총액배너를 전 견적서가 공유 → 시각적 일관성.
- 회사정보는 company.json 한 곳에서만 참조.
- 번호는 UTQ-YYYYMMDD-NN 로 대장(견적대장.md)을 스캔해 자동 발번.
- HTML → Chrome headless --print-to-pdf 로 PDF 변환.
- 렌더 후 대장에 1행 자동 등록.

사용:
  (1) CLI:  python render.py spec.json
  (2) 임포트:  from render import render_quote ; render_quote(spec_dict)

spec 스키마는 README.md 참조. 복잡한 견적(BOM 계산 등)은 별도 .py 에서
pages 리스트를 만들어 render_quote(spec) 로 넘기는 것을 권장.
"""
import io, os, re, json, sys, subprocess, datetime

HERE   = os.path.dirname(os.path.abspath(__file__))
LEDGER = r"C:\todo\today\myWiki\second-brain\entities\견적대장.md"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ── 공유 스타일 (LiveCow 검증본) ──────────────────────────────
STYLE = """
:root{--ink:#1a2230;--sub:#4a5568;--line:#d8dee9;--soft:#eef2f7;--accent:__ACCENT__;--accent2:__ACCENT2__;--warn:#b45309;--danger:#b3261e;--ok:#166534;}
*{box-sizing:border-box;}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
body{font-family:"Malgun Gothic","맑은 고딕","Segoe UI",sans-serif;color:var(--ink);margin:0;font-size:10.3pt;line-height:1.55;}
@page{size:A4;margin:14mm 13mm 15mm 13mm;}
h1,h2,h3{line-height:1.3;}
.page{page-break-after:always;} .page:last-child{page-break-after:auto;}
h2{font-size:14pt;color:var(--accent);margin:22px 0 9px;padding-bottom:6px;border-bottom:2.5px solid var(--accent);display:flex;align-items:center;gap:9px;break-after:avoid;break-inside:avoid;}
h3{break-after:avoid;}
h2 .num{background:var(--accent);color:#fff;font-size:10.5pt;width:25px;height:25px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;}
h2:first-of-type{margin-top:6px;}
table{width:100%;border-collapse:collapse;margin:9px 0;font-size:9.4pt;break-inside:avoid;}
tr{break-inside:avoid;}
th,td{border:1px solid var(--line);padding:6px 9px;text-align:left;vertical-align:top;}
th{background:var(--soft);color:var(--ink);font-weight:700;}
td.c,th.c{text-align:center;} td.num{text-align:right;font-variant-numeric:tabular-nums;}
.muted{color:var(--sub);} .small{font-size:8.6pt;}
tr.sub td{background:#f4f8f8;} tr.hi td{background:#e8f4f4;}
tr.hi td b,tr.sub td b{color:var(--accent);}
.rank{display:inline-block;background:var(--accent);color:#fff;font-size:8pt;font-weight:700;padding:2px 8px;border-radius:20px;}
.head{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid var(--accent);padding-bottom:12px;margin-bottom:4px;}
.head .t .kick{letter-spacing:2px;color:var(--accent2);font-weight:700;font-size:8.5pt;}
.head .t h1{font-size:23pt;font-weight:800;margin:5px 0 2px;}
.head .t h1 span{color:var(--accent);}
.head .t .sub{color:var(--sub);font-size:10pt;}
.head .meta{text-align:right;font-size:8.8pt;color:var(--sub);line-height:1.7;}
.head .meta b{color:var(--ink);}
.parties{display:flex;gap:12px;margin:14px 0 4px;}
.parties .p{flex:1;border:1px solid var(--line);border-radius:9px;overflow:hidden;}
.parties .p .ph{background:#fafbfc;padding:6px 12px;font-weight:700;font-size:9pt;color:var(--accent);border-bottom:1px solid var(--soft);}
.parties .p table{margin:0;font-size:9pt;}
.parties .p td{border:none;border-bottom:1px solid var(--soft);padding:6px 12px;}
.parties .p td:first-child{width:74px;color:var(--sub);background:#fcfdfe;font-weight:600;}
.parties .p tr:last-child td{border-bottom:none;}
.total{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(90deg,var(--accent),var(--accent2));color:#fff;border-radius:11px;padding:16px 22px;margin:14px 0 4px;}
.total .lbl{font-size:11pt;font-weight:700;opacity:.95;}
.total .amt{font-size:22pt;font-weight:800;}
.total .amt small{font-size:11pt;font-weight:600;opacity:.9;}
.box{border-radius:9px;padding:11px 15px;margin:11px 0;border:1px solid var(--line);font-size:9.2pt;break-inside:avoid;}
.box .bt{font-weight:800;font-size:10pt;margin-bottom:5px;display:flex;gap:7px;align-items:center;}
.box.key{background:#f0f8f8;border-color:#bfe0e0;} .box.key .bt{color:var(--accent);}
.box.warn{background:#fffaf0;border-color:#f0d9a8;} .box.warn .bt{color:var(--warn);}
.box.ok{background:#f1f8f2;border-color:#c3e2c8;} .box.ok .bt{color:var(--ok);}
.box ul{margin:4px 0 0;padding-left:18px;} .box li{margin:2px 0;}
code{background:#eef2f7;border-radius:4px;padding:0 4px;font-size:8.6pt;color:#334;}
.foot{margin-top:18px;padding-top:10px;border-top:1px solid var(--line);font-size:8.4pt;color:var(--sub);display:flex;justify-content:space-between;}
.conf{margin-top:12px;background:#fff5f5;border:1px solid #f3c6c2;color:var(--danger);border-radius:8px;padding:9px 13px;font-size:8.6pt;font-weight:600;}
.stamp{display:inline-block;border:2px solid var(--accent);color:var(--accent);border-radius:8px;padding:3px 10px;font-weight:800;font-size:9pt;transform:rotate(-3deg);}
"""

def load_company():
    with io.open(os.path.join(HERE, "company.json"), encoding="utf-8") as f:
        return json.load(f)

def today_str():
    return datetime.date.today().isoformat()

def allocate_number(date=None):
    """대장을 스캔해 해당 날짜의 다음 순번으로 UTQ-YYYYMMDD-NN 발번."""
    date = date or today_str()
    ymd = date.replace("-", "")
    prefix = f"UTQ-{ymd}-"
    used = []
    if os.path.exists(LEDGER):
        with io.open(LEDGER, encoding="utf-8") as f:
            for m in re.finditer(re.escape(prefix) + r"(\d{2})", f.read()):
                used.append(int(m.group(1)))
    nn = (max(used) + 1) if used else 1
    return f"{prefix}{nn:02d}"

def register_ledger(no, date, vault, client, project, amount, status, filename):
    """대장 표에 1행 등록 (<!-- ROWS:END --> 앞에 삽입)."""
    if not os.path.exists(LEDGER):
        print("[경고] 견적대장.md 없음 — 등록 생략:", LEDGER); return
    amt = f"{amount:,}" if isinstance(amount, (int, float)) else str(amount)
    row = f"| {no} | {date} | {vault} | {client} | {project} | ₩{amt} | {status} | `{filename}` |"
    with io.open(LEDGER, encoding="utf-8") as f:
        txt = f.read()
    if no in txt:
        print("[스킵] 이미 대장에 등록된 번호:", no); return
    marker = "<!-- ROWS:END -->"
    if marker in txt:
        txt = txt.replace(marker, row + "\n" + marker)
    else:
        txt = txt.rstrip() + "\n" + row + "\n"
    with io.open(LEDGER, "w", encoding="utf-8") as f:
        f.write(txt)
    print("[대장] 등록:", no)

def _rows(d):
    return "\n".join(f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in d.items())

def build_html(spec, company, no, date):
    supplier = {
        "상호": company["상호"], "사업자": company["사업자등록번호"],
        "연락처": company["연락처"], "담당": f'{company["대표자"]}  (인)',
    }
    conf = f'<div class="conf">{spec["confidential"]}</div>' if spec.get("confidential") else ""
    stamp = f'<span class="stamp">{spec["stamp"]}</span>' if spec.get("stamp") else ""
    total_label = spec.get("total_label", "견적 합계 <small>(부가세 별도)</small>")
    pages = spec["pages"]
    page1_top = f"""
  <div class="head">
    <div class="t">
      <div class="kick">{spec.get("kicker","QUOTATION")}</div>
      <h1>견 적 서 <span>|</span> {spec["title_main"]}</h1>
      <div class="sub">{spec.get("subtitle","")}</div>
    </div>
    <div class="meta">
      견적일자 &nbsp;<b>{date}</b><br>
      견적번호 &nbsp;<b>{no}</b><br>
      유효기간 &nbsp;<b>{spec.get("valid","견적일로부터 30일")}</b><br>
      통화 &nbsp;<b>{spec.get("currency","KRW (VAT 별도)")}</b>
    </div>
  </div>
  <div class="parties">
    <div class="p"><div class="ph">공급받는 자 (수신)</div><table>{_rows(spec["client"])}</table></div>
    <div class="p"><div class="ph">공급자 (작성)</div><table>{_rows(supplier)}</table></div>
  </div>
  <div class="total"><div class="lbl">{total_label}</div><div class="amt">₩ {spec["grand_total"]} <small>원</small></div></div>
"""
    # 마지막 페이지 하단에 foot
    foot = f'<div class="foot"><div>{spec.get("foot","")}</div><div>{stamp}</div></div>'
    body = ""
    for i, pg in enumerate(pages):
        inner = (page1_top + pg + (conf if i == 0 else "")) if i == 0 else pg
        if i == len(pages) - 1:
            inner += foot
        body += f'<div class="page">{inner}</div>\n'
    style = (STYLE.replace("__ACCENT__", company.get("브랜드색", "#0d6b6e"))
                  .replace("__ACCENT2__", company.get("브랜드색2", "#0e7490")))
    return (f'<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8">'
            f'<title>견적서 {no}</title><style>{style}</style></head><body>\n{body}</body></html>')

def to_pdf(html_path, pdf_path):
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    f"--print-to-pdf={pdf_path}", "file:///" + html_path.replace("\\", "/")],
                   check=True, timeout=120)

def render_quote(spec, out_dir=None, register=True):
    company = load_company()
    date = spec.get("date") or today_str()
    no   = spec.get("quote_no") or allocate_number(date)
    out_dir = out_dir or spec.get("out_dir") or os.getcwd()
    base = spec.get("filename") or f'{no}_{spec.get("title_main","견적서")}'
    html_path = os.path.join(out_dir, base + ".html")
    pdf_path  = os.path.join(out_dir, base + ".pdf")
    html = build_html(spec, company, no, date)
    with io.open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    to_pdf(html_path, pdf_path)
    print("HTML:", html_path)
    print("PDF :", pdf_path)
    print("번호:", no)
    if register:
        register_ledger(no, date, spec.get("vault", "-"),
                        spec.get("client", {}).get("상호", "-"),
                        spec.get("project", spec.get("subtitle", "-")),
                        spec.get("amount_num", spec.get("grand_total", "-")),
                        spec.get("status", "발송"), base + ".pdf")
    return {"no": no, "html": html_path, "pdf": pdf_path}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("사용: python render.py <spec.json>  또는  python render.py --peek  (다음 번호 미리보기)")
        sys.exit(1)
    if sys.argv[1] == "--peek":
        print("다음 발번:", allocate_number()); sys.exit(0)
    with io.open(sys.argv[1], encoding="utf-8") as f:
        spec = json.load(f)
    render_quote(spec)
