# -*- coding: utf-8 -*-
"""4회차 (8/5) — 스마트폰으로 우리 공장 보기 (무선통신) · 수업용 강의 슬라이드."""
from ppt_common import *

TOTAL = 8
prs = new_deck()
p = 0

# 1) 표지
p += 1
cover(prs, 4, "스마트폰으로\n우리 공장 보기",
      "내 폰에서 실시간으로 — 웹 대시보드와 장거리 무선(LoRa)",
      "제4주차 · 13:00~17:00", "홍광선 대표 · UTTEC 교육팀", TOTAL)

# 2) 복습 + 목표
p += 1
s = content(prs, p, TOTAL, "OT", "지난주 복습 & 오늘 목표")
card(s, Inches(0.6), Inches(2.4), Inches(5.8), Inches(3.9), color=LIGHT, accent=NAVY)
text(s, Inches(0.95), Inches(2.62), Inches(5.2), Inches(0.5), "🔁 3회차 복습", size=17, color=NAVY, bold=True)
text(s, Inches(0.95), Inches(3.2), Inches(5.2), Inches(3.0),
     [[("• 기준값 넘으면 자동 경고", {"size": 15})],
      [("• 정상·주의·위험 자동 판단", {"size": 15})],
      [("• CSV 데이터 저장", {"size": 15})],
      [(" ", {"size": 8})],
      [("Q. 지금은 현장에 가야 봅니다.", {"bold": True, "color": ORANGE, "size": 15})],
      [("   멀리서 폰으로 보려면?", {"bold": True, "color": ORANGE, "size": 15})]],
     size=15, line_spacing=1.4)
card(s, Inches(6.65), Inches(2.4), Inches(6.05), Inches(3.9), color=LIGHT, accent=ORANGE)
text(s, Inches(7.0), Inches(2.62), Inches(5.4), Inches(0.5), "🎯 오늘 끝나면", size=17, color=ORANGE, bold=True)
text(s, Inches(7.0), Inches(3.2), Inches(5.4), Inches(3.0),
     [[("• 폰 브라우저로 ", {"size": 15}), ("실시간 온습도", {"bold": True, "size": 15})],
      [("• 시간별 ", {"size": 15}), ("그래프", {"bold": True, "size": 15}), (" 보기", {"size": 15})],
      [("• ", {"size": 15}), ("장거리 무선(LoRa)", {"bold": True, "size": 15}), ("로 원거리 수신", {"size": 15})],
      [("• 옆 사람 보드와 ", {"size": 15}), ("무선 통신", {"bold": True, "size": 15})]],
     size=15, line_spacing=1.5)

# 3) 이론 — 폰에서 보기 원리
p += 1
s = content(prs, p, TOTAL, "이론", "‘내 폰에서 공장 보기’ 원리",
            "라즈베리파이가 작은 ‘웹사이트(서버)’ 가 됩니다")
steps = [
    ("🖥", "라즈베리파이가 측정값을 보여주는 작은 웹페이지를 띄웁니다."),
    ("📶", "폰과 보드가 같은 Wi-Fi 에 있으면 서로 연결됩니다."),
    ("📱", "폰 브라우저에 보드 주소를 입력 → 실시간 화면이 뜹니다."),
    ("📡", "멀리 떨어진 곳은 LoRa(장거리 무선)로 데이터를 받아옵니다."),
]
y = Inches(2.55)
for ic, b in steps:
    card(s, Inches(0.6), y, Inches(12.13), Inches(0.92), color=LIGHT, accent=TEAL)
    text(s, Inches(0.9), y+Inches(0.12), Inches(0.9), Inches(0.7), ic, size=24, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.9), y+Inches(0.12), Inches(10.4), Inches(0.7), b, size=15.5, color=INK, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.1)
    y += Inches(1.0)

# 4) 실습① 웹 대시보드 → 폰 접속
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ① 웹 대시보드 띄워 폰으로 보기",
            "보드에 작은 웹페이지를 띄우고, 폰으로 접속")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("Flask 라는 도구로 측정값을", {"size": 15.5})],
      [("보여주는 웹페이지를 띄웁니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("폰을 같은 Wi-Fi 에 연결하고", {"size": 15.5})],
      [("주소창에 보드 주소를 입력 →", {"size": 15.5})],
      [("내 폰에 ", {"size": 15.5}), ("실시간 온습도", {"bold": True, "color": ORANGE, "size": 15.5}),
       (" 표시!", {"size": 15.5})]],
     size=15.5, line_spacing=1.4)
image_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(4.0), "assets/06_phone.png")

# 5) 실습② 그래프
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ② 실시간 그래프로 추세 보기",
            "숫자보다 그래프가 한눈에 들어옵니다")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("측정값을 시간 순서로 점을 찍어", {"size": 15.5})],
      [("선 그래프로 그립니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("• 온도가 ", {"size": 15}), ("오르는 추세", {"bold": True, "size": 15}), ("인지", {"size": 15})],
      [("• 언제 ", {"size": 15}), ("이상", {"bold": True, "color": ORANGE, "size": 15}),
       ("이 생겼는지", {"size": 15})],
      [("한눈에 보입니다.", {"size": 15})],
      [(" ", {"size": 6})],
      [("→ 폰에서도 같은 그래프 확인.", {"bold": True, "color": NAVY, "size": 15})]],
     size=15.5, line_spacing=1.4)
image_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(4.0), "assets/07_graph.png")

# 6) 실습③ 장거리 무선 LoRa
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ③ 장거리 무선 (LoRa) · 보드간 통신",
            "Wi-Fi 가 닿지 않는 먼 곳의 데이터까지")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("LoRa = 저전력 ", {"size": 15.5}), ("장거리 무선", {"bold": True, "color": ORANGE, "size": 15.5})],
      [("(수백 m~수 km). 공장·농장·창고에", {"size": 15})],
      [("멀리 떨어진 센서값을 받아옵니다.", {"size": 15})],
      [(" ", {"size": 8})],
      [("오늘은 옆 사람 보드와 무선으로", {"size": 15})],
      [("데이터를 주고받아 봅니다.", {"size": 15})],
      [(" ", {"size": 6})],
      [("※ 무선 모듈은 검증·설정된 것을", {"size": 13.5, "color": GRAY})],
      [("   배포합니다 (기술 근거: lora vault).", {"size": 13.5, "color": GRAY})]],
     size=15.5, line_spacing=1.35)
image_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(4.0), "assets/08_lora.png")

# 7) 위키 — 공유·열람 (Claude 검색/요약)
p += 1
wiki_segment(
    prs, p, TOTAL,
    "오늘의 위키 — 공유·열람 & AI로 찾기",
    "무선=원격 열람과 평행 — 내 위키도 폰/PC에서 보고, Claude로 검색합니다",
    "📲 오늘의 위키 활동",
    [[("① 내 위키를 ", {"size": 15}), ("폰/PC", {"bold": True, "color": PURPLE, "size": 15}),
      ("에서 열어봅니다.", {"size": 15})],
     [("  (동료에게 보여주는 관점)", {"size": 14})],
     [(" ", {"size": 6})],
     [("② 노트가 쌓이면 찾기가 일 —", {"size": 15})],
     [("  Claude에게 ", {"size": 15}), ("검색·요약", {"bold": True, "color": PURPLE, "size": 15}),
      ("을 시킵니다.", {"size": 15})],
     [(" ", {"size": 6})],
     [("현업 연결: 노트는 혼자 쓰는 게", {"size": 14.5})],
     [("아니라 ", {"size": 14.5}), ("팀 인수인계 자산", {"bold": True, "size": 14.5}), ("입니다.", {"size": 14.5})]],
    ["이 위키에서 OLED 와 무선(LoRa) 관련 내용만 찾아서 요약해줘.",
     "1~4회차 작업일지를 모아 ‘지금까지 만든 것’ 한 장으로 정리해줘."],
    "왜? 잘 찾고·잘 넘기는 노트라야 현업에서 진짜 자산이 됩니다.",
)

# 8) 정리 + 예고
p += 1
s = content(prs, p, TOTAL, "정리", "오늘 정리 & 다음 시간 예고")
done = ["폰으로 실시간 대시보드를 봤다", "시간별 그래프로 추세를 봤다",
        "장거리 무선(LoRa)을 체험했다", "위키 공유·AI 검색을 익혔다 (제안)"]
text(s, Inches(0.6), Inches(2.35), Inches(6.3), Inches(0.5), "✅ 오늘 한 것", size=19, color=TEAL, bold=True)
y = Inches(3.0)
for d in done:
    rect(s, Inches(0.7), y+Inches(0.04), Inches(0.34), Inches(0.34), TEAL, shape=MSO_SHAPE.OVAL)
    text(s, Inches(0.7), y, Inches(0.34), Inches(0.34), "✓", size=14, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.2), y, Inches(5.6), Inches(0.5), d, size=15.5, color=INK)
    y += Inches(0.62)
card(s, Inches(7.2), Inches(2.6), Inches(5.5), Inches(3.4), color=NAVY)
text(s, Inches(7.55), Inches(2.85), Inches(5.0), Inches(0.5), "다음 시간 (5주차 · 마지막)", size=16, color=YELLOW, bold=True)
text(s, Inches(7.55), Inches(3.45), Inches(4.9), Inches(0.9), "AI 체험 + 미니\n스마트팩토리 완성", size=22, color=WHITE, bold=True, line_spacing=1.05)
text(s, Inches(7.55), Inches(4.75), Inches(5.0), Inches(1.3),
     [[("• AI ", {"size":15,"color":WHITE}), ("손글씨 인식", {"size":15,"color":YELLOW,"bold":True}), (" 체험", {"size":15,"color":WHITE})],
      [("• 4주간 배운 것 ", {"size":15,"color":WHITE}), ("통합 완성", {"size":15,"color":YELLOW,"bold":True})],
      [("• 내 ", {"size":15,"color":WHITE}), ("현업 적용 설계", {"size":15,"color":YELLOW,"bold":True})]],
     size=15, line_spacing=1.5)

out = "4회_스마트폰_원격모니터링.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
