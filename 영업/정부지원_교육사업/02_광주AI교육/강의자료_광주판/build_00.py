# -*- coding: utf-8 -*-
"""0회차 (사전 세팅, 7/15 도입부) — 나만의 현업 위키 만들기 (Obsidian + Claude).
교육 맨 앞에 배치. vault/wiki의 목표·구조·Claude 사용법·현업 재사용을 다룬다.
기반 reference: C:/todo/조혜영/sub-vault-template (Tier 2 sub-vault) → 비전공자판."""
from ppt_common import *

TOTAL = 9
prs = new_deck()
p = 0

def prompt_card(slide, x, y, w, h, ask, accent=PURPLE):
    card(slide, x, y, w, h, color=LIGHT, accent=accent)
    text(slide, x+Inches(0.28), y+Inches(0.16), w-Inches(0.5), Inches(0.4),
         "🗣  나 → Claude", size=12, color=accent, bold=True)
    text(slide, x+Inches(0.28), y+Inches(0.6), w-Inches(0.5), h-Inches(0.75),
         ask, size=14.5, color=INK, line_spacing=1.15)

# 1) 표지 ------------------------------------------------------------------
p += 1
s = cover(prs, 0, "나만의 현업 위키\n만들기",
          "Obsidian + Claude(AI) 로 — 5주의 배움을 ‘평생 자산’ 으로 남기기",
          "개강일 · 1회차 시작 전 사전 세팅 (약 30분)",
          "홍광선 대표 · UTTEC 교육팀", TOTAL)
# 0회차 라벨을 '사전 세팅'으로 보강
text(s, Inches(2.95), Inches(2.62), Inches(4.0), Inches(0.7),
     "사전 세팅", size=18, color=RGBColor(0xD9,0xE4,0xEC), anchor=MSO_ANCHOR.MIDDLE)

# 2) 왜 위키부터? (의미) ---------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "위키", "왜 ‘위키’ 부터 만드나요?",
            "배운 것이 흩어지면 사라집니다 — 쌓아두면 ‘내 현업 가이드’ 가 됩니다")
text(s, Inches(0.6), Inches(2.35), Inches(6.2), Inches(4.0),
     [[("교육이 끝나면 보통…", {"bold": True, "color": ORANGE, "size": 18})],
      [("• 무엇을 어떻게 했는지 ", {"size": 16}), ("기억이 흐려지고", {"bold": True, "size": 16})],
      [("• 코드·설정값이 ", {"size": 16}), ("어디 갔는지 모르고", {"bold": True, "size": 16})],
      [("• 현업에 ", {"size": 16}), ("다시 만들기 어렵습니다", {"bold": True, "size": 16})],
      [(" ", {"size": 10})],
      [("그래서 — 첫날 ‘내 위키(작업 기록 공간)’ 를", {"size": 16})],
      [("먼저 만들고, 5주간 ", {"size": 16}), ("그 안에 쌓습니다.", {"bold": True, "color": PURPLE, "size": 16})]],
     size=16, line_spacing=1.34)
# 두 자산 카드
card(s, Inches(7.15), Inches(2.35), Inches(5.55), Inches(1.85), color=LIGHT, accent=ORANGE)
text(s, Inches(7.5), Inches(2.6), Inches(5.0), Inches(0.5), "🔧  키트 (하드웨어)", size=17, color=NAVY, bold=True)
text(s, Inches(7.5), Inches(3.12), Inches(4.9), Inches(0.9),
     "교육 후 남는 물리 자산. 손에 잡히는 장비.", size=14.5, color=INK, line_spacing=1.15)
card(s, Inches(7.15), Inches(4.35), Inches(5.55), Inches(2.0), color=LIGHT, accent=PURPLE)
text(s, Inches(7.5), Inches(4.6), Inches(5.0), Inches(0.5), "📚  위키 (방법론) + Claude", size=17, color=NAVY, bold=True)
text(s, Inches(7.5), Inches(5.12), Inches(4.95), Inches(1.1),
     [[("평생 쓰는 방법론 자산. 기록·재현·재사용 능력.", {"size": 14.5})],
      [("→ 다음 프로젝트·현업의 가이드.", {"bold": True, "color": PURPLE, "size": 14.5})]],
     size=14.5, line_spacing=1.2)

# 3) 위키 + Claude 란? -----------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "위키", "위키 + Claude, 무엇인가요?",
            "어려운 도구 아닙니다 — 무료 메모장 + AI 비서 조합입니다")
card(s, Inches(0.6), Inches(2.4), Inches(5.9), Inches(3.9), color=LIGHT, accent=PLUM)
text(s, Inches(0.95), Inches(2.65), Inches(5.2), Inches(0.5), "📝  Obsidian = 내 노트(위키)", size=19, color=PURPLE, bold=True)
text(s, Inches(0.95), Inches(3.3), Inches(5.2), Inches(2.7),
     [[("• 무료 메모 앱 (설치 5분)", {"size": 15.5})],
      [("• 그냥 글로 적는 노트들의 묶음", {"size": 15.5})],
      [("• 폴더로 정리, 노트끼리 연결도 가능", {"size": 15.5})],
      [("• 내 컴퓨터에 그대로 저장 (내 것!)", {"size": 15.5})]],
     size=15.5, line_spacing=1.5)
card(s, Inches(6.8), Inches(2.4), Inches(5.9), Inches(3.9), color=LIGHT, accent=PURPLE)
text(s, Inches(7.15), Inches(2.65), Inches(5.2), Inches(0.5), "🤖  Claude = AI 비서", size=19, color=PURPLE, bold=True)
text(s, Inches(7.15), Inches(3.3), Inches(5.2), Inches(2.7),
     [[("• 내 노트를 ", {"size": 15.5}), ("읽고·정리·검색", {"bold": True, "size": 15.5})],
      [("• 부탁하면 노트를 ", {"size": 15.5}), ("대신 작성", {"bold": True, "size": 15.5})],
      [("• 쌓인 노트로 ", {"size": 15.5}), ("가이드·요약 생성", {"bold": True, "size": 15.5})],
      [("• 평소 말투로 시키면 됨", {"size": 15.5})]],
     size=15.5, line_spacing=1.5)
text(s, Inches(0.6), Inches(6.5), Inches(12), Inches(0.4),
     "→ Obsidian 에 쌓고, Claude 로 똑똑하게 쓴다. 이 두 가지가 이 위키의 핵심입니다.",
     size=15, color=NAVY, bold=True, align=PP_ALIGN.CENTER)

# 4) 우리 위키의 목표 3가지 ------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "위키", "우리 위키의 목표 3가지")
goals = [
    ("1", "교육 목적 달성", "매 회차 만든 것을 직접 적으며 더 깊이 이해합니다. 기록은 최고의 복습."),
    ("2", "Claude 위키 사용법", "AI에게 시켜 노트를 정리·검색·생성하는 법을 몸에 익힙니다."),
    ("3", "현업 재사용 가이드", "5주 뒤, 이 위키가 다음 프로젝트·현업에 바로 쓸 안내서가 됩니다."),
]
cw = Inches(3.95); gap = Inches(0.28); x0 = Inches(0.6); ys = Inches(2.6)
accs = [TEAL, PURPLE, ORANGE]
for i,(n,h,b) in enumerate(goals):
    step_card(s, x0 + i*(cw+gap), ys, cw, Inches(2.5), n, h, b, accent=accs[i])
card(s, Inches(0.6), Inches(5.4), Inches(12.13), Inches(1.15), color=NAVY)
text(s, Inches(0.95), Inches(5.62), Inches(11.4), Inches(0.8),
     [[("한 줄 요약:  ", {"bold": True, "color": YELLOW, "size": 17}),
       ("‘배우고 → 기록하고 → AI로 다시 쓴다’ 를 5주간 몸에 익히는 것.", {"color": WHITE, "size": 17})]],
     size=17)

# 5) 위키 구조 -------------------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "위키", "내 위키 구조 — 폴더 4개 + 안내문 1개",
            "표준 위키 템플릿(sub-vault-template)을 비전공자용으로 단순화")
rows = [
    ("📓 작업일지.md", "날짜별 한 일 한 줄 — 단일 기록 출처", "log", TEAL),
    ("🔧 장비카드/", "부품·설비 1개 = 1장 (핀·연결·메모)", "entities", ORANGE),
    ("💡 결정메모/", "‘왜 그렇게 정했나’ 판단 기록", "thoughts", PURPLE),
    ("🗂 보관함/", "사진·데이터·완성 파일 (불변 보관)", "archive", NAVY),
    ("🤖 CLAUDE.md", "Claude에게 ‘내 위키 이렇게 도와줘’ 알려주는 안내문", "AI 가이드", PLUM),
]
y = Inches(2.5)
for name, desc, eng, col in rows:
    card(s, Inches(0.6), y, Inches(12.13), Inches(0.78), color=LIGHT, accent=col)
    text(s, Inches(0.95), y+Inches(0.16), Inches(3.3), Inches(0.5), name, size=16, color=NAVY, bold=True)
    text(s, Inches(4.35), y+Inches(0.19), Inches(6.4), Inches(0.5), desc, size=14, color=INK)
    rect(s, Inches(10.95), y+Inches(0.18), Inches(1.5), Inches(0.42), col, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    text(s, Inches(10.95), y+Inches(0.18), Inches(1.5), Inches(0.42), eng, size=12, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    y += Inches(0.88)

# 6) 설치·세팅 따라하기 ----------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "미션", "따라 하기 — 위키 세팅 (약 15분)")
steps = [
    ("1", "Obsidian 설치", "obsidian.md 에서 무료 다운로드 → 설치. (강사가 함께 진행)"),
    ("2", "내 위키 폴더 받기", "USB/공유로 받은 ‘내_현업위키’ 폴더를 내 컴퓨터에 복사."),
    ("3", "폴더로 열기", "Obsidian 실행 → ‘보관함으로 열기’ → 그 폴더 선택."),
    ("4", "첫 기록", "작업일지.md 에 오늘 날짜 + ‘위키 세팅 완료’ 한 줄 적기."),
]
cw = Inches(5.95); ch = Inches(1.8); gx=Inches(0.6); gy=Inches(2.5); gap=Inches(0.23)
for i,(n,h,b) in enumerate(steps):
    x = gx + (i%2)*(cw+gap); y = gy + (i//2)*(ch+gap)
    step_card(s, x, y, cw, ch, n, h, b, accent=ORANGE)
text(s, Inches(0.6), Inches(6.4), Inches(12), Inches(0.4),
     "※ 폴더와 안내문(CLAUDE.md)은 미리 채워 드립니다 — 여러분은 ‘열고 적기’만!",
     size=13.5, color=GRAY)

# 7) Claude로 위키 쓰기 (핵심) --------------------------------------------
p += 1
s = content(prs, p, TOTAL, "AI활용", "Claude 로 위키 쓰기 — 이렇게 시키세요",
            "전문 명령어 필요 없음 — 평소 말투로 부탁하면 Claude가 노트를 처리합니다")
text(s, Inches(0.6), Inches(2.4), Inches(3.7), Inches(4.0),
     [[("핵심", {"bold": True, "color": PURPLE, "size": 20})],
      [(" ", {"size": 6})],
      [("내가 한 일을 말하면", {"size": 15.5})],
      [("Claude가 알맞은 노트로", {"size": 15.5})],
      [("정리해 줍니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("→ 손이 느려도", {"size": 15})],
      [("   기록이 밀리지 않습니다.", {"bold": True, "color": NAVY, "size": 15})]],
     size=15.5, line_spacing=1.32)
pc_w = Inches(4.15); pc_h = Inches(1.18); px = Inches(4.5); gap = Inches(0.2)
prompts = [
    "오늘 한 일 정리해서 작업일지에 한 줄 추가해줘. 온습도 센서를 화면에 띄웠어.",
    "방금 쓴 AHT20 센서로 장비카드 한 장 만들어줘. 핀·주소 포함해서.",
    "경보 기준값을 30도로 정한 이유를 결정메모로 남겨줘.",
    "지금까지 노트로 내 현업 적용 1페이지 가이드를 만들어줘.",
]
for i, q in enumerate(prompts):
    r, c = divmod(i, 2)
    x = px + c*(pc_w+gap); y = Inches(2.4) + r*(pc_h+gap)
    prompt_card(s, x, y, pc_w, pc_h, q)
text(s, Inches(4.5), Inches(5.2), Inches(8.2), Inches(0.5),
     "↑ 마지막 한 줄이 ‘현업 가이드’ — 5주 노트가 다음 일터의 안내서가 됩니다.",
     size=13.5, color=PURPLE, bold=True)

# 8) 5주 누적 → 현업 가이드 ------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "위키", "5주 뒤 — 내 위키가 ‘현업 가이드’ 가 됩니다",
            "매 회차 위키가 채워지고, 마지막에 Claude가 한 장으로 모아줍니다")
flow = [
    ("1주", "위키 시작\n+ 첫 기록", TEAL),
    ("2주", "장비카드\n쌓기", TEAL),
    ("3주", "결정메모\n+ 데이터", TEAL),
    ("4주", "공유·열람\n폰/PC", TEAL),
    ("5주", "현업 적용\n1페이지", PURPLE),
]
cw = Inches(2.05); gap = Inches(0.32); x0 = Inches(0.7); y = Inches(2.7)
for i,(wk,nm,col) in enumerate(flow):
    x = x0 + i*(cw+gap)
    card(s, x, y, cw, Inches(2.0), accent=col)
    text(s, x, y+Inches(0.22), cw, Inches(0.5), wk, size=17, color=col, bold=True, align=PP_ALIGN.CENTER)
    text(s, x+Inches(0.1), y+Inches(0.8), cw-Inches(0.2), Inches(1.0), nm, size=15, color=NAVY, bold=True, align=PP_ALIGN.CENTER, line_spacing=1.05)
    if i < 4:
        text(s, x+cw-Inches(0.06), y+Inches(0.65), Inches(0.4), Inches(0.6), "+", size=22, color=GRAY, align=PP_ALIGN.CENTER)
card(s, Inches(0.7), Inches(5.05), Inches(11.93), Inches(1.45), color=PURPLE)
text(s, Inches(1.05), Inches(5.28), Inches(11.3), Inches(1.0),
     [[("🎁  take-home: ", {"bold": True, "color": YELLOW, "size": 17}),
       ("‘내_현업위키’ 폴더 + Claude 활용법을 통째로 가져갑니다.", {"color": WHITE, "size": 17})],
      [("키트(하드웨어) + 위키(방법론), 두 자산을 함께 — UTTEC 교육의 차별점.", {"color": RGBColor(0xE7,0xDE,0xF2), "size": 14.5})]],
     size=16, line_spacing=1.3)

# 9) 0회차 미션 + 1회차 예고 -----------------------------------------------
p += 1
s = content(prs, p, TOTAL, "미션", "0회차 미션 & 다음(1회차) 예고")
text(s, Inches(0.6), Inches(2.35), Inches(6.3), Inches(0.5),
     "✅ 오늘(0회차) 끝내야 할 것", size=19, color=PURPLE, bold=True)
miss = [
    "Obsidian 설치 완료",
    "‘내_현업위키’ 폴더 열기 성공",
    "작업일지에 첫 한 줄 기록",
    "Claude에게 한 번 시켜보기 (정리 부탁)",
]
y = Inches(3.0)
for d in miss:
    rect(s, Inches(0.7), y+Inches(0.04), Inches(0.34), Inches(0.34), PURPLE, shape=MSO_SHAPE.OVAL)
    text(s, Inches(0.7), y, Inches(0.34), Inches(0.34), "✓", size=14, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.2), y, Inches(5.6), Inches(0.5), d, size=15.5, color=INK)
    y += Inches(0.62)
card(s, Inches(7.2), Inches(2.6), Inches(5.5), Inches(3.4), color=NAVY)
text(s, Inches(7.55), Inches(2.85), Inches(5.0), Inches(0.5),
     "이어서 — 1회차", size=16, color=YELLOW, bold=True)
text(s, Inches(7.55), Inches(3.45), Inches(4.9), Inches(0.7),
     "라즈베리파이와 친해지기", size=23, color=WHITE, bold=True, line_spacing=1.05)
text(s, Inches(7.55), Inches(4.4), Inches(5.0), Inches(1.5),
     [[("• 손바닥 컴퓨터 켜기 + 인터넷 연결", {"size":14.5,"color":WHITE})],
      [("• 첫 프로그램 ", {"size":14.5,"color":WHITE}), ("Hello Factory!", {"size":14.5,"color":YELLOW,"bold":True})],
      [("• 그리고 — 오늘 만든 위키에 ", {"size":14.5,"color":WHITE})],
      [("  ‘1회차 기록’ 을 바로 남깁니다", {"size":14.5,"color":YELLOW,"bold":True})]],
     size=14.5, line_spacing=1.45)

out = "0회_나만의_현업위키_만들기.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
