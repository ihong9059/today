# -*- coding: utf-8 -*-
"""3회차 (7/29) — 자동으로 위험을 알리는 시스템 · 수업용 강의 슬라이드."""
from ppt_common import *

TOTAL = 8
prs = new_deck()
p = 0

# 1) 표지
p += 1
cover(prs, 3, "자동으로 위험을\n알리는 시스템",
      "‘기준값’ 을 정해 — 넘으면 스스로 경고하고, 데이터를 기록한다",
      "제3주차 · 13:00~17:00", "홍광선 대표 · UTTEC 교육팀", TOTAL)

# 2) 복습 + 목표
p += 1
s = content(prs, p, TOTAL, "OT", "지난주 복습 & 오늘 목표")
card(s, Inches(0.6), Inches(2.4), Inches(5.8), Inches(3.9), color=LIGHT, accent=NAVY)
text(s, Inches(0.95), Inches(2.62), Inches(5.2), Inches(0.5), "🔁 2회차 복습", size=17, color=NAVY, bold=True)
text(s, Inches(0.95), Inches(3.2), Inches(5.2), Inches(3.0),
     [[("• 온습도 센서 → OLED 표시", {"size": 15})],
      [("• LED 신호등·부저 제어", {"size": 15})],
      [("• 손 대면 숫자 변화 확인", {"size": 15})],
      [(" ", {"size": 8})],
      [("Q. 지금은 사람이 보고 있어야", {"bold": True, "color": ORANGE, "size": 15})],
      [("   위험을 압니다. 자동으로 하려면?", {"bold": True, "color": ORANGE, "size": 15})]],
     size=15, line_spacing=1.4)
card(s, Inches(6.65), Inches(2.4), Inches(6.05), Inches(3.9), color=LIGHT, accent=ORANGE)
text(s, Inches(7.0), Inches(2.62), Inches(5.4), Inches(0.5), "🎯 오늘 끝나면", size=17, color=ORANGE, bold=True)
text(s, Inches(7.0), Inches(3.2), Inches(5.4), Inches(3.0),
     [[("• 온도 ", {"size": 15}), ("기준값(임계값)", {"bold": True, "size": 15}), (" 이해", {"size": 15})],
      [("• 기준 넘으면 ", {"size": 15}), ("부저·빨강 자동 경고", {"bold": True, "size": 15})],
      [("• 정상·주의·위험 ", {"size": 15}), ("자동 판단", {"bold": True, "size": 15})],
      [("• 측정값을 ", {"size": 15}), ("CSV 파일로 저장", {"bold": True, "size": 15})]],
     size=15, line_spacing=1.5)

# 3) 이론 — 기준값
p += 1
s = content(prs, p, TOTAL, "이론", "‘기준값(임계값)’ 이란?",
            "어떤 선을 넘으면 ‘이상’ 으로 보는 그 ‘선’ 입니다")
text(s, Inches(0.6), Inches(2.5), Inches(6.4), Inches(4.0),
     [[("예) 우리 작업장 여름 평상시 27~28도", {"size": 16})],
      [("→ 30도 넘으면 ", {"size": 16}), ("‘이상!’", {"bold": True, "color": ORANGE, "size": 16})],
      [(" ", {"size": 8})],
      [("컴퓨터에게 이렇게 시킵니다:", {"bold": True, "color": NAVY, "size": 16})],
      [("‘만약 온도가 30보다 크면 → 경고’", {"size": 16})],
      [(" ", {"size": 6})],
      [("이 ‘만약~면’ 이 자동 판단의 핵심.", {"size": 15})]],
     size=16, line_spacing=1.4)
card(s, Inches(7.3), Inches(2.5), Inches(5.4), Inches(3.6), color=LIGHT, accent=ORANGE)
text(s, Inches(7.6), Inches(2.72), Inches(4.8), Inches(0.5), "🚦 3단계 판단", size=17, color=NAVY, bold=True)
levels = [("28도 미만", "정상", "파랑", NAVY),
          ("28~35도", "주의", "노랑", YELLOW),
          ("35도 이상", "위험 + 경고음", "빨강", ORANGE)]
y = Inches(3.4)
for rng, st, col_name, col in levels:
    rect(s, Inches(7.6), y, Inches(0.5), Inches(0.5), col, shape=MSO_SHAPE.OVAL)
    text(s, Inches(8.25), y+Inches(0.02), Inches(4.2), Inches(0.5),
         [[(f"{rng}  ", {"bold": True, "size": 15, "color": INK}), (f"→ {st}", {"size": 15, "color": INK})]], size=15, anchor=MSO_ANCHOR.MIDDLE)
    y += Inches(0.78)

# 4) 실습① 자동 경고 로직
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ① 스스로 판단해 경고하기",
            "‘만약 ~면’ 으로 LED·부저를 자동 제어")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("온도 t 를 읽어 세 갈래로", {"size": 15.5})],
      [("자동 판단합니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("• 28 미만 → 파랑(정상)", {"size": 15})],
      [("• 28~35 → 노랑(주의)", {"size": 15})],
      [("• 35 이상 → 빨강 + 부저(위험)", {"bold": True, "color": ORANGE, "size": 15})],
      [(" ", {"size": 6})],
      [("기준 숫자만 바꾸면 우리 현장에", {"size": 14.5})],
      [("맞게 조정됩니다.", {"size": 14.5})]],
     size=15.5, line_spacing=1.35)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(3.4),
         ['GPIO.output(BLUE,   t < 28)',
          'GPIO.output(YELLOW, 28 <= t < 35)',
          'GPIO.output(RED,    t >= 35)',
          'GPIO.output(BUZZER, t >= 35)  # 경고음'],
         title="자동 판단")

# 5) 실습② CSV 저장
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ② 측정값을 파일로 남기기",
            "기록이 있어야 나중에 분석·증빙이 됩니다")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("측정한 온도·습도를 시간과 함께", {"size": 15.5})],
      [("CSV 파일에 한 줄씩 저장합니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("CSV 파일은 ", {"size": 15}), ("엑셀에서 바로 열림", {"bold": True, "color": NAVY, "size": 15})],
      [(" ", {"size": 6})],
      [("→ 그래프도 그릴 수 있고,", {"size": 14.5})],
      [("   이상 발생 시점도 찾을 수 있습니다.", {"size": 14.5})]],
     size=15.5, line_spacing=1.4)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(2.4),
         ['row = [now, t, h]',
          'csv.writer(f).writerow(row)',
          '# factory_log.csv 에 누적'],
         title="CSV 저장")
card(s, Inches(6.9), Inches(5.0), Inches(5.83), Inches(1.5), color=LIGHT, accent=TEAL)
text(s, Inches(7.2), Inches(5.18), Inches(5.3), Inches(1.2),
     [[("factory_log.csv", {"font":"Consolas","bold":True,"size":14,"color":INK})],
      [("2026-07-29T15:10, 31.2, 45", {"font":"Consolas","size":13,"color":INK})],
      [("2026-07-29T15:12, 35.6, 44", {"font":"Consolas","size":13,"color":ORANGE})]],
     size=13, line_spacing=1.3)

# 6) 통합 + 체험
p += 1
s = content(prs, p, TOTAL, "체험", "통합 체험 — 손난로로 경보 울리기",
            "센서 → 판단 → LED·부저·화면 이 하나로 자동 동작")
image_box(s, Inches(0.6), Inches(2.4), Inches(5.6), Inches(4.0), "assets/05_alarm.png")
text(s, Inches(6.55), Inches(2.7), Inches(6.0), Inches(4.0),
     [[("해보기", {"bold": True, "color": ORANGE, "size": 20})],
      [(" ", {"size": 6})],
      [("① 센서에 손난로/손바닥을 댑니다.", {"size": 16})],
      [("② 온도가 기준(35도)을 넘으면", {"size": 16})],
      [("③ 빨간 LED + 부저가 ", {"size": 16}), ("자동", {"bold": True, "color": ORANGE, "size": 16}),
       (" 작동!", {"size": 16})],
      [(" ", {"size": 8})],
      [("→ 사람이 안 봐도 스스로 알리는", {"bold": True, "color": NAVY, "size": 16})],
      [("   ‘자동 경보’ 의 완성입니다.", {"bold": True, "color": NAVY, "size": 16})]],
     size=16, line_spacing=1.35)

# 7) 위키 — 결정메모 + 보관함
p += 1
wiki_segment(
    prs, p, TOTAL,
    "오늘의 위키 — 결정메모 + 보관함",
    "‘왜 그렇게 정했나’ 를 남기고, 데이터를 보관합니다",
    "💡 오늘의 위키 활동",
    [[("① ", {"bold": True, "color": PURPLE, "size": 15}), ("결정메모", {"bold": True, "color": PURPLE, "size": 15})],
     [("  ‘기준값을 왜 30도로?’ 같은", {"size": 14.5})],
     [("  판단 근거를 1장 적습니다.", {"size": 14.5})],
     [(" ", {"size": 6})],
     [("② ", {"bold": True, "color": PURPLE, "size": 15}), ("보관함", {"bold": True, "color": PURPLE, "size": 15})],
     [("  오늘 만든 CSV 데이터 파일을", {"size": 14.5})],
     [("  보관함에 넣습니다.", {"size": 14.5})],
     [(" ", {"size": 6})],
     [("현업 연결: 설정값·판단 근거를", {"size": 14.5})],
     [("남기면 인수인계·감사에 강합니다.", {"size": 14.5})]],
    ["기준값을 30도로 정한 이유를 결정메모로 남겨줘. 평상시 27~28도라 30도 넘으면 이상으로 봤어.",
     "오늘 만든 factory_log.csv 를 보관함에 정리하고 작업일지에 한 줄 기록해줘."],
    "왜? ‘왜’ 가 적힌 노트는 6개월 뒤의 나와 동료를 구합니다.",
)

# 8) 정리 + 예고
p += 1
s = content(prs, p, TOTAL, "정리", "오늘 정리 & 다음 시간 예고")
done = ["기준값 개념을 이해했다", "넘으면 자동 경고하게 만들었다",
        "정상·주의·위험을 자동 판단했다", "CSV 저장 + 결정메모 기록 (제안)"]
text(s, Inches(0.6), Inches(2.35), Inches(6.3), Inches(0.5), "✅ 오늘 한 것", size=19, color=TEAL, bold=True)
y = Inches(3.0)
for d in done:
    rect(s, Inches(0.7), y+Inches(0.04), Inches(0.34), Inches(0.34), TEAL, shape=MSO_SHAPE.OVAL)
    text(s, Inches(0.7), y, Inches(0.34), Inches(0.34), "✓", size=14, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.2), y, Inches(5.6), Inches(0.5), d, size=15.5, color=INK)
    y += Inches(0.62)
card(s, Inches(7.2), Inches(2.6), Inches(5.5), Inches(3.4), color=NAVY)
text(s, Inches(7.55), Inches(2.85), Inches(5.0), Inches(0.5), "다음 시간 (4주차)", size=16, color=YELLOW, bold=True)
text(s, Inches(7.55), Inches(3.45), Inches(4.9), Inches(0.9), "스마트폰으로\n우리 공장 보기", size=23, color=WHITE, bold=True, line_spacing=1.05)
text(s, Inches(7.55), Inches(4.75), Inches(5.0), Inches(1.3),
     [[("• 폰 브라우저로 ", {"size":15,"color":WHITE}), ("실시간 확인", {"size":15,"color":YELLOW,"bold":True})],
      [("• 그래프로 ", {"size":15,"color":WHITE}), ("추세 보기", {"size":15,"color":YELLOW,"bold":True})],
      [("• ", {"size":15,"color":WHITE}), ("장거리 무선", {"size":15,"color":YELLOW,"bold":True}), ("(LoRa)", {"size":15,"color":WHITE})]],
     size=15, line_spacing=1.5)

out = "3회_자동_경보_시스템.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
