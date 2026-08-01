# -*- coding: utf-8 -*-
"""5회차 (8/12) — AI 체험 및 미니 스마트팩토리 제작 · 수업용 강의 슬라이드."""
from ppt_common import *

TOTAL = 8
prs = new_deck()
p = 0

# 1) 표지
p += 1
cover(prs, 5, "AI 체험 &\n미니 스마트팩토리",
      "AI가 학습하는 원리를 체험하고 — 4주간 배운 모든 것을 하나로 완성",
      "제5주차 · 13:00~17:00 · 수료", "홍광선 대표 · UTTEC 교육팀", TOTAL)

# 2) 복습 + 목표
p += 1
s = content(prs, p, TOTAL, "OT", "지난주 복습 & 오늘 목표")
card(s, Inches(0.6), Inches(2.4), Inches(5.8), Inches(3.9), color=LIGHT, accent=NAVY)
text(s, Inches(0.95), Inches(2.62), Inches(5.2), Inches(0.5), "🔁 1~4회차 복습", size=17, color=NAVY, bold=True)
text(s, Inches(0.95), Inches(3.2), Inches(5.2), Inches(3.0),
     [[("• 1주: Pi·첫 프로그램", {"size": 14.5})],
      [("• 2주: 센서·OLED·신호등", {"size": 14.5})],
      [("• 3주: 기준값·자동 경보·CSV", {"size": 14.5})],
      [("• 4주: 폰 대시보드·무선", {"size": 14.5})],
      [(" ", {"size": 8})],
      [("오늘 이 모두를 하나로 묶습니다.", {"bold": True, "color": ORANGE, "size": 15})]],
     size=14.5, line_spacing=1.45)
card(s, Inches(6.65), Inches(2.4), Inches(6.05), Inches(3.9), color=LIGHT, accent=ORANGE)
text(s, Inches(7.0), Inches(2.62), Inches(5.4), Inches(0.5), "🎯 오늘 끝나면", size=17, color=ORANGE, bold=True)
text(s, Inches(7.0), Inches(3.2), Inches(5.4), Inches(3.0),
     [[("• AI ", {"size": 15}), ("학습 원리", {"bold": True, "size": 15}), (" 체험", {"size": 15})],
      [("• ", {"size": 15}), ("손글씨 숫자 인식", {"bold": True, "size": 15}), (" AI 동작", {"size": 15})],
      [("• ", {"size": 15}), ("미니 스마트팩토리", {"bold": True, "size": 15}), (" 완성", {"size": 15})],
      [("• 내 ", {"size": 15}), ("현업 적용 설계", {"bold": True, "size": 15}), (" 1페이지", {"size": 15})],
      [("• 수료 🎓", {"bold": True, "color": ORANGE, "size": 15})]],
     size=15, line_spacing=1.45)

# 3) 이론 — AI는 어떻게 학습하나
p += 1
s = content(prs, p, TOTAL, "이론", "AI 는 어떻게 ‘학습’ 하나요?",
            "예시를 많이 보여주면 — 스스로 규칙을 찾습니다")
text(s, Inches(0.6), Inches(2.5), Inches(6.4), Inches(4.0),
     [[("사람도 숫자 ‘3’ 을 수천 번 보며", {"size": 16})],
      [("배웁니다. AI도 똑같습니다.", {"size": 16})],
      [(" ", {"size": 8})],
      [("손글씨 ‘3’ 사진을 ", {"size": 16}), ("아주 많이", {"bold": True, "color": ORANGE, "size": 16}),
       (" 보여주면", {"size": 16})],
      [("AI가 ‘이런 모양이 3이구나’ 를", {"size": 16})],
      [("스스로 알아냅니다. (=학습)", {"bold": True, "color": NAVY, "size": 16})],
      [(" ", {"size": 6})],
      [("그 뒤엔 새 손글씨도 맞힙니다. (=추론)", {"size": 15})]],
     size=16, line_spacing=1.4)
card(s, Inches(7.3), Inches(2.5), Inches(5.4), Inches(3.6), color=LIGHT, accent=PURPLE)
text(s, Inches(7.6), Inches(2.72), Inches(4.8), Inches(0.5), "🧠 3단계", size=17, color=PURPLE, bold=True)
for i,(t1,t2) in enumerate([("① 많은 예시", "데이터를 모은다"),
                            ("② 학습", "규칙을 찾는다"),
                            ("③ 추론", "새 것을 맞힌다")]):
    y = Inches(3.4)+i*Inches(0.85)
    rect(s, Inches(7.6), y, Inches(0.5), Inches(0.5), PURPLE, shape=MSO_SHAPE.OVAL)
    text(s, Inches(7.6), y, Inches(0.5), Inches(0.5), str(i+1), size=15, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(8.25), y+Inches(0.02), Inches(4.2), Inches(0.5),
         [[(t1.split(' ',1)[1]+"  ", {"bold":True,"size":15,"color":INK}), (f"— {t2}", {"size":14,"color":GRAY})]], size=15, anchor=MSO_ANCHOR.MIDDLE)

# 4) 실습 — 손글씨 인식 체험
p += 1
s = content(prs, p, TOTAL, "실습", "실습 — 손글씨 숫자 인식 AI 체험",
            "내가 쓴 숫자를 AI가 맞히는지 직접 확인")
image_box(s, Inches(0.6), Inches(2.4), Inches(5.6), Inches(4.0), "assets/09_ai.png")
text(s, Inches(6.55), Inches(2.7), Inches(6.0), Inches(4.0),
     [[("해보기", {"bold": True, "color": ORANGE, "size": 20})],
      [(" ", {"size": 6})],
      [("① 화면(또는 종이)에 숫자를 씁니다.", {"size": 16})],
      [("② AI가 몇 인지 ", {"size": 16}), ("맞힙니다.", {"bold": True, "color": ORANGE, "size": 16})],
      [("③ 일부러 삐뚤게 써서", {"size": 16})],
      [("   언제 틀리는지도 봅니다.", {"size": 16})],
      [(" ", {"size": 8})],
      [("※ AI 모델 기술 근거 = onDevice_AI vault", {"size": 13, "color": GRAY})]],
     size=16, line_spacing=1.35)

# 5) 프로젝트 — 미니 스마트팩토리 통합
p += 1
s = content(prs, p, TOTAL, "실습", "프로젝트 — 미니 스마트팩토리 완성",
            "센서 → 판단 → 경보 → 화면 → 폰, 4주의 모든 것을 하나로")
flow = [
    ("센서", "온습도 수집", TEAL),
    ("판단", "기준값·이상", ORANGE),
    ("경보", "LED·부저", ORANGE),
    ("화면", "OLED 표시", TEAL),
    ("폰", "대시보드·무선", NAVY),
]
cw = Inches(2.05); gap = Inches(0.32); x0 = Inches(0.7); y = Inches(2.7)
for i,(t,d,col) in enumerate(flow):
    x = x0 + i*(cw+gap)
    card(s, x, y, cw, Inches(1.9), accent=col)
    text(s, x, y+Inches(0.28), cw, Inches(0.5), t, size=18, color=col, bold=True, align=PP_ALIGN.CENTER)
    text(s, x+Inches(0.1), y+Inches(0.95), cw-Inches(0.2), Inches(0.8), d, size=13.5, color=INK, align=PP_ALIGN.CENTER, line_spacing=1.05)
    if i < 4:
        text(s, x+cw-Inches(0.06), y+Inches(0.6), Inches(0.4), Inches(0.6), "→", size=22, color=GRAY, align=PP_ALIGN.CENTER)
card(s, Inches(0.7), Inches(4.95), Inches(11.93), Inches(1.5), color=LIGHT, accent=NAVY)
text(s, Inches(1.05), Inches(5.15), Inches(11.3), Inches(1.1),
     [[("조별로 완성 → 시연합니다. ", {"bold": True, "color": NAVY, "size": 16}),
       ("미완성도 부분 시연으로 OK — 오늘은 성취감이 핵심!", {"size": 16, "color": INK})],
      [("(선택·심화) 통계 이상탐지 → AI가 자동 보고서 생성까지.", {"size": 14, "color": GRAY})]],
     size=16, line_spacing=1.3)

# 6) 위키 — 현업 적용 1페이지 (Claude 생성) + take-home
p += 1
wiki_segment(
    prs, p, TOTAL,
    "오늘의 위키 — 현업 적용 1페이지 (마무리)",
    "5주간 쌓은 위키를 Claude로 ‘내 현업 가이드’ 한 장으로 완성합니다",
    "🎯 오늘의 위키 활동 (완결)",
    [[("‘내 회사 공정/설비를 노트로", {"size": 15})],
     [("어떻게 관리할까’ 를 ", {"size": 15}), ("1페이지", {"bold": True, "color": PURPLE, "size": 15})],
     [("자기 설계로 작성합니다.", {"size": 15})],
     [(" ", {"size": 6})],
     [("5주 노트가 있으니 — Claude에게", {"size": 15})],
     [("시키면 ", {"size": 15}), ("초안을 만들어", {"bold": True, "color": PURPLE, "size": 15}), (" 줍니다.", {"size": 15})],
     [(" ", {"size": 6})],
     [("🎁 ", {"size": 15}), ("take-home", {"bold": True, "color": ORANGE, "size": 15}),
      (": 내 위키 폴더 +", {"size": 15})],
     [("Claude 활용법을 통째로 가져갑니다.", {"size": 15})]],
    ["내 작업일지·장비카드·결정메모를 모두 읽고, 내 현업에 적용할 1페이지 가이드 초안을 만들어줘.",
     "그 가이드를 발표용으로 핵심 5줄로 요약해줘."],
    "5주의 배움이 ‘평생 쓰는 내 현업 가이드’ 로 완성됩니다 — 이것이 위키의 목표.",
)

# 7) 평가 / 수료 기준
p += 1
s = content(prs, p, TOTAL, "정리", "평가 & 수료 안내")
text(s, Inches(0.6), Inches(2.35), Inches(6.0), Inches(0.5), "📋 평가 (참여·완성도 중심)", size=18, color=NAVY, bold=True)
evals = [("센서 수집·표시", "20"), ("LED·부저 자동 제어", "20"),
         ("이상·기준값 판단", "20"), ("폰 대시보드", "20"), ("시연·현장 적용 아이디어", "20")]
y = Inches(3.05)
for name, pt in evals:
    card(s, Inches(0.6), y, Inches(6.0), Inches(0.6), color=LIGHT)
    text(s, Inches(0.9), y+Inches(0.1), Inches(4.5), Inches(0.45), name, size=14.5, color=INK, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(5.3), y+Inches(0.1), Inches(1.0), Inches(0.45), pt+"점", size=14.5, color=ORANGE, bold=True, align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)
    y += Inches(0.68)
card(s, Inches(7.0), Inches(2.6), Inches(5.7), Inches(3.5), color=NAVY)
text(s, Inches(7.35), Inches(2.85), Inches(5.0), Inches(0.5), "🎓 수료", size=18, color=YELLOW, bold=True)
text(s, Inches(7.35), Inches(3.5), Inches(5.0), Inches(2.4),
     [[("• 수료 기준: 5회 중 ", {"size": 15, "color": WHITE}), ("4회 이상 출석", {"size": 15, "color": YELLOW, "bold": True})],
      [(" ", {"size": 6})],
      [("• 발표: 미니팩토리 + 내 위키 시연", {"size": 15, "color": WHITE})],
      [(" ", {"size": 6})],
      [("• 사후 3개월 지원", {"size": 15, "color": WHITE})],
      [("  (현업 노트·Claude 활용 Q&A 포함)", {"size": 14, "color": RGBColor(0xD9,0xE4,0xEC)})]],
     size=15, line_spacing=1.3)

# 8) 발표 + 수료 마무리
p += 1
s = blank(prs)
rect(s, 0, 0, EMU_W, EMU_H, NAVY)
rect(s, 0, Inches(6.6), EMU_W, Inches(0.9), ORANGE)
text(s, Inches(0), Inches(2.4), EMU_W, Inches(1.2),
     "수고하셨습니다 🎉", size=48, color=WHITE, bold=True, align=PP_ALIGN.CENTER)
text(s, Inches(0), Inches(3.7), EMU_W, Inches(1.4),
     [[("이제 여러분께는 두 가지 자산이 있습니다.", {"size": 18, "color": RGBColor(0xD9,0xE4,0xEC)})],
      [(" ", {"size": 8})],
      [("🔧 미니 스마트팩토리 키트    +    📚 나만의 현업 위키 (+Claude)", {"size": 19, "color": WHITE, "bold": True})]],
     size=18, align=PP_ALIGN.CENTER, line_spacing=1.3)
text(s, Inches(0), Inches(6.74), EMU_W, Inches(0.5),
     "UTTEC · 광주 AI·IoT 스마트팩토리 실습 과정", size=12,
     color=WHITE, align=PP_ALIGN.CENTER)

out = "5회_AI_미니스마트팩토리.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
