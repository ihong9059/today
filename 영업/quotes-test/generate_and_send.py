#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Stage 0 견적서 PDF 생성 + n8n 서버를 통한 이메일 발송 (테스트)

흐름:
  1. 영업/Stage0_Core_Services_견적서.md 읽기
  2. 회사별 맞춤 정보 치환
  3. markdown → HTML (CSS 인라인)
  4. Chrome headless로 PDF 렌더링
  5. SFTP로 home-odroidc2:~/n8n/quotes/ 업로드
  6. SSH로 ~/n8n/send_quote_attachment.py 실행 (서버에서 SMTP 발송)

테스트용 — 모든 메일 ihong9059@gmail.com 발송
"""

import os, sys, json, subprocess, tempfile
from pathlib import Path
import paramiko
import markdown as md_lib

# ── 경로 ────────────────────────────────────────────
ROOT = Path(__file__).resolve().parent.parent.parent
TEMPLATE = ROOT / "영업" / "Stage0_Core_Services_견적서.md"
OUT_DIR = Path(__file__).resolve().parent
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ── 서버 ────────────────────────────────────────────
HOST = "100.89.56.69"
USER = "uttec"
PWD = "uttec"
REMOTE_DIR = "/home/uttec/n8n/quotes"

# ── 회사별 맞춤 정보 ─────────────────────────────────
COMPANIES = {
    "한국기계": {
        "filename": "Stage0_Core_Services_견적서_한국기계.pdf",
        "subject": "[UTTEC] Stage 0 Core Services Starter Pack 견적서 — 한국기계 귀중",
        "intro": (
            "한국기계의 28년 분쇄 노하우를 데이터로 누적·공유하기 위한 "
            "1주 인프라 셋업 견적입니다. POT MILL · 핀밀 등 다목적 분쇄 라인의 "
            "운전 데이터·점검 이력·고객 응대를 단일 wiki + git + 알림 채널로 "
            "통합하여, 노하우 자산화 + 전수 가능 형태로 만드는 것이 목적입니다."
        ),
        "client_specific": {
            "수신": "한국기계 귀중",
            "담당자": "(담당자명 / 직급)",
            "맞춤 산출물": [
                "분쇄 라인 운전 데이터 → Obsidian Vault 누적 (제품군별 노하우)",
                "고객 점검 이력 자동 누적 (Slack → n8n → Wiki 자동 ingest)",
                "협력사 견적·납기 추적 워크플로우 (n8n → Notion + 이메일)",
            ],
        },
    },
    "태명과학": {
        "filename": "Stage0_Core_Services_견적서_태명과학.pdf",
        "subject": "[UTTEC] Stage 0 Core Services Starter Pack 견적서 — 태명과학 귀중",
        "intro": (
            "현재 진행 중인 스마트팩토리 견적과 별개로, 사내 데이터·문서·협업 "
            "인프라를 1주에 정비하는 Stage 0 견적입니다. 본격 AI 모델 도입 "
            "전에 'AI가 학습할 데이터의 통로'를 먼저 마련하는 사전 단계로, "
            "Stage 1~3 본격 도입 시 그대로 활용됩니다."
        ),
        "client_specific": {
            "수신": "태명과학 귀중",
            "담당자": "(담당자명 / 직급)",
            "맞춤 산출물": [
                "공정 데이터 표준 디렉토리 + git 자동 백업 (대용량 데이터 LFS 옵션)",
                "사내 wiki — 공정 SOP · 안전 절차 · 협력사 매뉴얼 통합",
                "Stage 1~3 도입 사전 데이터 점검 (AI 학습 가능 형태 준비도)",
            ],
        },
    },
}

# ── HTML 템플릿 ──────────────────────────────────────
HTML_HEAD = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  @page {{
    size: A4;
    margin: 18mm 16mm;
  }}
  body {{
    font-family: 'Malgun Gothic', 'Noto Sans KR', sans-serif;
    font-size: 10.5pt;
    line-height: 1.6;
    color: #1a1a1a;
  }}
  h1 {{ font-size: 18pt; color: #0f3c5f; border-bottom: 3px solid #0f3c5f;
        padding-bottom: 6px; margin-top: 8px; }}
  h2 {{ font-size: 13pt; color: #0f3c5f; margin-top: 18px;
        border-left: 4px solid #0f3c5f; padding-left: 8px; }}
  h3 {{ font-size: 11.5pt; color: #333; margin-top: 12px; }}
  blockquote {{
    background: #f4f9ff;
    border-left: 4px solid #4a90c8;
    padding: 8px 14px;
    margin: 12px 0;
    color: #1a3850;
  }}
  table {{
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
    font-size: 9.5pt;
  }}
  th {{
    background: #0f3c5f;
    color: white;
    padding: 6px 8px;
    text-align: left;
    border: 1px solid #0f3c5f;
  }}
  td {{
    padding: 5px 8px;
    border: 1px solid #c0d4e2;
  }}
  tr:nth-child(even) td {{ background: #f7fafc; }}
  ul, ol {{ margin: 6px 0; padding-left: 22px; }}
  li {{ margin: 3px 0; }}
  hr {{ border: none; border-top: 1px solid #d0d0d0; margin: 16px 0; }}
  .client-banner {{
    background: linear-gradient(90deg, #0f3c5f 0%, #1a5482 100%);
    color: white;
    padding: 14px 18px;
    border-radius: 6px;
    margin: 16px 0 20px 0;
  }}
  .client-banner h3 {{ color: white; margin: 0 0 6px 0; }}
  .client-banner p {{ margin: 0; line-height: 1.55; }}
  .footer {{
    margin-top: 28px;
    padding-top: 12px;
    border-top: 2px solid #0f3c5f;
    font-size: 9pt;
    color: #555;
  }}
  strong {{ color: #0f3c5f; }}
</style>
</head>
<body>
"""

HTML_TAIL = """
</body>
</html>
"""

CLIENT_BANNER = """
<div class="client-banner">
  <h3>📋 {company} 귀중 — 맞춤 안내</h3>
  <p>{intro}</p>
</div>
"""

CUSTOM_SECTION = """
<h2>3-1. {company} 맞춤 산출물 (추가 강조)</h2>
<ul>
{items}
</ul>
"""


def customize_md(template_md: str, company: str, info: dict) -> str:
    """수신/담당자 정보를 치환 + 맞춤 섹션 삽입"""
    md = template_md
    md = md.replace("| 수신 | (고객사명) |", f"| 수신 | {info['client_specific']['수신']} |")
    md = md.replace("| 담당자 | (담당자명 / 직급) |", f"| 담당자 | {info['client_specific']['담당자']} |")
    return md


def md_to_html(md_text: str, company: str, info: dict) -> str:
    body = md_lib.markdown(md_text, extensions=["tables", "fenced_code"])
    banner = CLIENT_BANNER.format(company=company, intro=info["intro"])
    items_html = "\n".join(f"  <li>{x}</li>" for x in info["client_specific"]["맞춤 산출물"])
    custom = CUSTOM_SECTION.format(company=company, items=items_html)

    # 첫 H1 다음에 배너 삽입, 섹션 3 끝에 맞춤 산출물 삽입
    body = body.replace("<h1>", banner + "\n<h1>", 1)
    # "## 4. 견적 내역" 직전에 맞춤 산출물 추가
    body = body.replace("<h2>4. 견적 내역</h2>", custom + "\n<h2>4. 견적 내역</h2>")

    title = f"Stage 0 견적서 — {company}"
    return HTML_HEAD.format(title=title) + body + HTML_TAIL


def render_pdf(html_path: Path, pdf_path: Path) -> bool:
    """Chrome headless로 HTML → PDF"""
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--print-to-pdf={pdf_path}",
        "--no-pdf-header-footer",
        "--virtual-time-budget=10000",
        f"file:///{html_path.as_posix()}",
    ]
    r = subprocess.run(cmd, capture_output=True, timeout=60)
    return pdf_path.exists() and pdf_path.stat().st_size > 1000


def upload_pdf(local_pdf: Path, remote_filename: str) -> bool:
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(HOST, username=USER, password=PWD, timeout=10, look_for_keys=False, allow_agent=False)
    c.exec_command(f"mkdir -p {REMOTE_DIR}")[1].read()  # 폴더 생성
    sftp = c.open_sftp()
    remote_path = f"{REMOTE_DIR}/{remote_filename}"
    sftp.put(str(local_pdf), remote_path)
    sftp.chmod(remote_path, 0o644)
    sftp.close()
    c.close()
    print(f"  업로드 완료: {remote_path}")
    return True


def trigger_email(remote_filename: str, subject: str, company: str) -> tuple[bool, str]:
    """서버의 send_quote_attachment.py 실행"""
    c = paramiko.SSHClient()
    c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(HOST, username=USER, password=PWD, timeout=10, look_for_keys=False, allow_agent=False)
    cmd = (
        f"cd ~/n8n && set -a && . .secrets && set +a && "
        f"python3 send_quote_attachment.py "
        f"--pdf '{REMOTE_DIR}/{remote_filename}' "
        f"--subject '{subject}' "
        f"--company '{company}'"
    )
    _, out, err = c.exec_command(cmd, timeout=60)
    out_text = out.read().decode("utf-8", errors="replace")
    err_text = err.read().decode("utf-8", errors="replace")
    rc = out.channel.recv_exit_status()
    c.close()
    return rc == 0, out_text + ("\n[stderr] " + err_text if err_text else "")


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    template_md = TEMPLATE.read_text(encoding="utf-8")

    for company, info in COMPANIES.items():
        if only and company != only:
            continue
        print(f"\n=== {company} ===")
        # 1. 맞춤 MD
        md_custom = customize_md(template_md, company, info)
        # 2. HTML 생성
        html = md_to_html(md_custom, company, info)
        html_path = OUT_DIR / f"{company}.html"
        html_path.write_text(html, encoding="utf-8")
        print(f"  HTML 작성: {html_path.name}")
        # 3. PDF 렌더
        pdf_path = OUT_DIR / info["filename"]
        ok = render_pdf(html_path, pdf_path)
        if not ok:
            print(f"  ❌ PDF 생성 실패")
            continue
        size_kb = pdf_path.stat().st_size / 1024
        print(f"  PDF 생성: {pdf_path.name} ({size_kb:.1f} KB)")
        # 4. 업로드
        upload_pdf(pdf_path, info["filename"])
        # 5. 이메일 트리거
        ok, log = trigger_email(info["filename"], info["subject"], company)
        if ok:
            print(f"  ✅ 발송 성공")
        else:
            print(f"  ❌ 발송 실패")
        print(f"  로그: {log[:300]}")


if __name__ == "__main__":
    main()
