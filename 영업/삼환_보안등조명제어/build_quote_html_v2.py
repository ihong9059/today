# -*- coding: utf-8 -*-
"""견적서 HTML 생성 v2 (2026-07-29).
v1(20260724) 대비 변경:
  - #12 HMI 소프트웨어: MRBAS ELC(GS+BTL 인증 제품) → UTTEC 자체 조명제어 HMI (기능 동등, 인증 표기 제거)
  - 금액·기타 항목 동일. 견적번호 UTQ-20260724-01 표기 추가.
"""

DATA = [
    ("SEC", "1. 조명제어 기기 (Control Devices)"),
    (None, "중앙전송장치 SCU", "32bit MCU, RS485 ELC+Ethernet+MODBUS, WIFI, 130×130, AC220/110V", "EA", 1, 1800000, "E13-011 사양"),
    (None, "0-10V 디밍모듈 (8채널)", "0-10V 디밍 8ch + 16A 래칭릴레이 8ch, 0~254단계", "EA", 1, 1200000, "6회로 사용+2예비"),
    (None, "전원공급장치 (Power Supply Unit)", "AC220V→24VAC, 60Hz, 60VA (Expansion Power 포함)", "EA", 1, 350000, ""),
    ("SEC", "2. 조명제어반 LCP-0 (Panel)"),
    (None, "제어반 외함 (Enclosure)", "STEEL, 400×1600×180, 자립/벽부형, 도장·명판", "EA", 1, 1500000, "E13-012 일람"),
    (None, "속판 및 내부 마운팅 자재", "속판, 덕트, 레일, 명판", "식", 1, 350000, ""),
    (None, "주차단기·회로차단기", "주 MCCB 1 + 회로별 ELB (6회로+예비)", "식", 1, 700000, ""),
    (None, "단자대·배선자재·부속", "터미널블록, 제어배선, 압착단자, 마그네트 등", "식", 1, 550000, ""),
    (None, "제어반 제작·조립·내부결선", "기기 취부, 내부 결선, 검사", "식", 1, 900000, ""),
    ("SEC", "3. 중앙감시반 CCMS (501동 경비실)"),
    (None, "관제용 PC", "Intel i5, RAM 32GB, HDD 1TB, Windows 10", "EA", 1, 1600000, "E13-011 사양"),
    (None, "24″ LED 모니터", "1920×1080, High Color", "EA", 1, 250000, ""),
    (None, "프린터", "경보·리포트 출력용", "EA", 1, 250000, ""),
    (None, "HMI 소프트웨어 (UTTEC)", "UTTEC 조명제어 HMI — 스케쥴·경보·그래픽·경향분석·자기진단 (E13 지정 기능 동등)", "식", 1, 4500000, "UTTEC 자체 개발"),
    (None, "관제 콘솔 데스크", "경비실 설치대 (옵션)", "식", 1, 400000, "옵션"),
    ("SEC", "4. 통신·제어 자재 (결선용 / 배관·포설은 전기공사 별도)"),
    (None, "데이터라인 케이블", "F-CVVS 1.5㎟ × 2C (SCU↔LCP, 22C)", "식", 1, 350000, "약 200m 기준"),
    (None, "0-10V 디밍 통신선", "AWG18 (UL2095, 2C), 16C", "식", 1, 300000, "안정기 구간"),
    (None, "제어반 전원선", "F-CV 2.5㎟ × 3C / HFIX 2.5㎟", "식", 1, 200000, ""),
    (None, "단자·성단·소모 자재", "압착단자, 케이블타이, 마킹 등", "식", 1, 200000, ""),
    ("SEC", "5. 설치·용역 (Installation & Service)"),
    (None, "조명제어 기기 셋팅·프로그래밍", "SCU/디밍모듈/전원 파라미터, 그룹·씬·스케쥴(41등/6회로)", "식", 1, 1500000, ""),
    (None, "기기 신호선 결선", "DIM1~8 / R1~8 / ETLC LINE / 24VAC 결선", "식", 1, 800000, ""),
    (None, "0-10V 통신라인 결선", "디밍모듈↔안정기 결선·성단", "식", 1, 600000, ""),
    (None, "CCMS HMI 그래픽 작성·포인트 설정", "단지 배치도 그래픽, 포인트 매핑, 경보·로깅 설정", "식", 1, 1800000, ""),
    (None, "시스템 통합시험·시운전(T&C)", "회로별 조광·스케쥴 검증, 통합 시운전", "식", 1, 1200000, ""),
    (None, "운영자 교육", "경비실 운영자 사용 교육, 매뉴얼 제공", "식", 1, 300000, ""),
    ("SEC", "6. 기타 (Others)"),
    (None, "준공도서·시험성적서·인증서", "준공도서, 시험성적서, 인증서 사본", "식", 1, 300000, ""),
    (None, "운반비", "기기·제어반 부산 현장 운송", "식", 1, 400000, ""),
    (None, "출장·숙박비", "시공·시운전 출장 (부산)", "식", 1, 600000, ""),
    (None, "예비품 (Spare)", "디밍 예비 2회로분·퓨즈·소모품", "식", 1, 400000, ""),
]

rows_html = []
no = 0
subtotal = 0
for row in DATA:
    if row[0] == "SEC":
        rows_html.append(f'<tr class="sec"><td colspan="8">{row[1]}</td></tr>')
        continue
    no += 1
    _, name, spec, unit, qty, price, remark = row
    amt = qty * price
    subtotal += amt
    rows_html.append(
        f'<tr><td class="c">{no}</td><td class="nm">{name}</td><td>{spec}</td>'
        f'<td class="c">{unit}</td><td class="c">{qty}</td>'
        f'<td class="r">{price:,}</td><td class="r">{amt:,}</td>'
        f'<td class="rm">{remark}</td></tr>'
    )

gm = round(subtotal * 0.05)
profit = round((subtotal + gm) * 0.10)
supply = subtotal + gm + profit
vat = round(supply * 0.10)
total = supply + vat

def trow(label, val, cls=""):
    return (f'<tr class="tot {cls}"><td colspan="6" class="tl">{label}</td>'
            f'<td class="r">{val:,}</td><td></td></tr>')

totals_html = "\n".join([
    trow("직접비 소계 (①)", subtotal, "light"),
    trow("일반관리비 (② = ① × 5%)", gm),
    trow("이윤 (③ = (①+②) × 10%)", profit),
    trow("공급가액 (④ = ①+②+③)", supply, "light"),
    trow("부가가치세 (⑤ = ④ × 10%)", vat),
    trow("총 합계 금액 (VAT 포함)", total, "grand"),
])

def kor_won(n):
    return f"金 {n:,}원整 (부가세 포함)"

html = f"""<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><title>광안 보안등 유선 0-10V 디밍 조명제어 견적서 v2 — UTTEC</title>
<style>
@page {{ size:A4; margin:13mm 12mm; }}
*{{margin:0;padding:0;box-sizing:border-box;}}
body{{font-family:"Malgun Gothic","맑은 고딕",sans-serif;color:#1f2937;font-size:9pt;-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
:root{{--navy:#12315e;--blue:#1E40AF;--light:#eff4fb;--sec:#dce6f5;--line:#c4cede;--gray:#6b7280;}}
.head{{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid var(--blue);padding-bottom:8px;margin-bottom:6px;}}
.logo{{font-size:22pt;font-weight:900;color:var(--blue);letter-spacing:1px;}}
.logo small{{display:block;font-size:8pt;color:var(--gray);font-weight:600;margin-top:-3px;}}
h1{{font-size:22pt;color:var(--navy);font-weight:900;letter-spacing:12px;}}
.sub{{text-align:right;font-size:8.3pt;color:var(--gray);}}
.info{{width:100%;border-collapse:collapse;margin:8px 0;font-size:8.6pt;}}
.info td{{border:1px solid var(--line);padding:4px 7px;}}
.info .k{{background:var(--light);font-weight:700;color:var(--navy);text-align:center;width:66px;white-space:nowrap;}}
.grand-line{{background:#fde68a;border:1px solid #d8b400;padding:7px 12px;margin:6px 0 10px;font-size:12pt;font-weight:900;color:var(--navy);text-align:right;border-radius:5px;}}
table.q{{width:100%;border-collapse:collapse;font-size:8.5pt;}}
table.q th{{background:var(--navy);color:#fff;border:1px solid var(--navy);padding:5px 4px;font-weight:700;text-align:center;}}
table.q td{{border:1px solid var(--line);padding:4px 6px;vertical-align:middle;}}
table.q td.c{{text-align:center;}} table.q td.r{{text-align:right;}}
table.q td.nm{{font-weight:700;color:var(--navy);}}
table.q td.rm{{font-size:7.6pt;color:var(--gray);}}
tr.sec td{{background:var(--sec);font-weight:800;color:var(--navy);font-size:9pt;}}
tr.tot td{{font-weight:800;color:var(--navy);font-size:9.3pt;}}
tr.tot td.tl{{text-align:right;}}
tr.tot.light td{{background:var(--light);}}
tr.tot.grand td{{background:#fde68a;font-size:10.5pt;}}
.notes{{margin-top:10px;font-size:8pt;color:#374151;line-height:1.55;}}
.notes b{{color:var(--navy);}}
.stamp{{margin-top:14px;display:flex;justify-content:flex-end;gap:20px;font-size:9pt;}}
.stamp .box{{border:1px solid var(--line);border-radius:6px;padding:10px 16px;text-align:center;color:var(--navy);}}
.colw td:nth-child(1){{width:26px;}} .colw td:nth-child(2){{width:150px;}}
.colw td:nth-child(4){{width:30px;}} .colw td:nth-child(5){{width:30px;}}
.colw td:nth-child(6){{width:74px;}} .colw td:nth-child(7){{width:82px;}} .colw td:nth-child(8){{width:96px;}}
</style></head><body>
<div class="head">
  <div><div class="logo">UTTEC<small>www.uttec.co.kr</small></div></div>
  <h1>견 적 서</h1>
  <div class="sub">Quotation · UTQ-20260724-01<br>2026. 07. 29.<br>v2.0 (HMI = UTTEC 자체 HMI)</div>
</div>
<table class="info">
  <tr><td class="k">공사명</td><td colspan="3">광안 지역주택조합 공동주택 신축공사 — 옥외 보안등 조명제어 시스템</td><td class="k">제출처</td><td><b>(주)창진</b> · 조원호 귀중<br><span style="font-size:7.7pt;color:#555">부산 사상구 삼덕로89번길 19 (덕포동, 2층)<br>TEL 051-517-7117 · FAX 051-513-5060 · H.P 010-4145-8253<br>duke0422@naver.com</span></td></tr>
  <tr><td class="k">현장</td><td colspan="3">부산 수영구 광안동 971</td><td class="k">제어대상</td><td>보안등 41등 / 6회로 (LCP-0)</td></tr>
  <tr><td class="k">공급자</td><td colspan="3">UTTEC (유티이씨) · 대표이사 홍광선</td><td class="k">중앙감시</td><td>501동 경비실 1개소</td></tr>
  <tr><td class="k">주소</td><td colspan="3">경기도 용인시 기흥구 흥덕중앙로 120 흥덕유타워 2404호</td><td class="k">연락처</td><td>010-2401-9059</td></tr>
</table>
<div class="grand-line">합계금액 &nbsp; {kor_won(total)}</div>
<table class="q colw">
<thead><tr><th>No</th><th>품 명</th><th>규 격</th><th>단위</th><th>수량</th><th>단가(원)</th><th>금액(원)</th><th>비 고</th></tr></thead>
<tbody>
{chr(10).join(rows_html)}
{totals_html}
</tbody></table>
<div class="notes">
<b>※ 견적 조건</b><br>
1. 본 견적은 「E13-011~013 보안등 조명제어 상세도」 기준 <b>UTTEC(조명제어공사)</b> 범위 산출입니다.<br>
2. 제외 범위: 신호선 배관·전선 포설·전원공사(<b>전기공사</b>), 등기구 및 0-10V 조광 안정기(<b>등기구 업체</b>).<br>
3. 제어반 외함 SIZE(400×1600×180)는 현장 여건에 따라 변경될 수 있으며, 이 경우 금액이 조정됩니다.<br>
4. 등기구 조광 방식(0-10V / DALI) 확정 및 현장 실사 후 최종 금액이 확정됩니다.<br>
5. 상기 단가는 제안 기준가이며, 세부 사양·수량 확정 및 발주 조건에 따라 협의 조정 가능합니다.<br>
6. <b>HMI 소프트웨어는 UTTEC 자체 조명제어 HMI</b>로, E13 지정 기능(스케쥴·경보·그래픽·경향분석·자기진단)을 <b>동등 제공</b>합니다. (도면 표기 GS·BTL 인증 제품 대비 기능 동등 / 특정 인증서 요구 시 별도 협의)<br>
7. 유효기간: 견적일로부터 <b>30일</b>. 하자보증 1년(협의 연장). ※ 사업자등록번호 등은 계약 시 제공.
</div>
<div class="stamp">
  <div class="box">공급자<br><b>UTTEC (유티이씨)</b><br>대표이사 홍광선 (인)</div>
</div>
</body></html>"""

out = "삼환_광안보안등_유선디밍제어_견적서_UTTEC_v2_20260729.html"
with open(out, "w", encoding="utf-8") as f:
    f.write(html)
print("saved", out)
print(f"직접비소계={subtotal:,} / 일반관리비={gm:,} / 이윤={profit:,} / 공급가액={supply:,} / VAT={vat:,} / 총합계={total:,}")
