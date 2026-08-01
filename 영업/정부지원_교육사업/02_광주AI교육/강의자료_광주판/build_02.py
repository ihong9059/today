# -*- coding: utf-8 -*-
"""2회차 (7/22) — 공장의 눈과 귀 만들기 · 수업용 강의 슬라이드."""
from ppt_common import *

TOTAL = 8
prs = new_deck()
p = 0

# 1) 표지
p += 1
cover(prs, 2, "공장의 눈과\n귀 만들기",
      "온습도 센서로 ‘보고’, 화면(OLED)에 ‘띄우고’, LED 신호등으로 ‘알린다’",
      "제2주차 · 13:00~17:00", "홍광선 대표 · UTTEC 교육팀", TOTAL)

# 2) 복습 + 오늘 목표
p += 1
s = content(prs, p, TOTAL, "OT", "지난주 복습 & 오늘 목표")
card(s, Inches(0.6), Inches(2.4), Inches(5.8), Inches(3.9), color=LIGHT, accent=NAVY)
text(s, Inches(0.95), Inches(2.62), Inches(5.2), Inches(0.5), "🔁 1회차 복습", size=17, color=NAVY, bold=True)
text(s, Inches(0.95), Inches(3.2), Inches(5.2), Inches(3.0),
     [[("• 라즈베리파이 = 손바닥 컴퓨터", {"size": 15})],
      [("• print 로 화면에 글자 출력", {"size": 15})],
      [("• 변수(상자)로 숫자 다루기", {"size": 15})],
      [(" ", {"size": 8})],
      [("Q. print 는 무슨 뜻이었나요?", {"bold": True, "color": ORANGE, "size": 15})]],
     size=15, line_spacing=1.4)
card(s, Inches(6.65), Inches(2.4), Inches(6.05), Inches(3.9), color=LIGHT, accent=ORANGE)
text(s, Inches(7.0), Inches(2.62), Inches(5.4), Inches(0.5), "🎯 오늘 끝나면", size=17, color=ORANGE, bold=True)
text(s, Inches(7.0), Inches(3.2), Inches(5.4), Inches(3.0),
     [[("• 온도·습도를 ", {"size": 15}), ("숫자로 읽고", {"bold": True, "size": 15})],
      [("• 작은 화면(OLED)에 ", {"size": 15}), ("실시간 표시", {"bold": True, "size": 15})],
      [("• LED 신호등으로 ", {"size": 15}), ("상태 색 표시", {"bold": True, "size": 15})],
      [("• 손으로 센서를 만지면 ", {"size": 15}), ("숫자가 변함", {"bold": True, "color": ORANGE, "size": 15})]],
     size=15, line_spacing=1.5)

# 3) 이론 — GPIO·I2C 쉽게
p += 1
s = content(prs, p, TOTAL, "이론", "핀으로 신호를 주고받는다",
            "어려운 말(GPIO·I2C)도 핵심만 — ‘전기로 켜고 끄고, 숫자를 읽는다’")
items = [
    ("🔌 GPIO", "보드의 핀. 전기를 ‘켜고/끄기’ 로 LED·부저를 다룹니다. (디지털 출력)"),
    ("🔘 입력", "버튼을 누르면 ‘눌림’ 신호가 들어옵니다. (디지털 입력)"),
    ("📡 I2C", "센서와 ‘대화하는 통로’. 선 2개로 센서가 보낸 숫자를 읽습니다."),
]
y = Inches(2.6)
for h,b in items:
    card(s, Inches(0.6), y, Inches(12.13), Inches(1.15), color=LIGHT, accent=TEAL)
    text(s, Inches(0.95), y+Inches(0.18), Inches(3.0), Inches(0.8), h, size=18, color=NAVY, bold=True, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(3.9), y+Inches(0.18), Inches(8.5), Inches(0.8), b, size=15, color=INK, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.1)
    y += Inches(1.25)

# 4) 실습① LED 신호등 + 부저 + 스위치
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ① LED 신호등 · 부저 · 스위치",
            "전기를 켜고 끄며 ‘출력’ 을 익힙니다")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("LED 3색을 차례로 켜 봅니다.", {"size": 15.5})],
      [("부저를 한 번 ‘삑’ 울립니다.", {"size": 15.5})],
      [("버튼을 누르면 반응하게 합니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("True = 켜기 / False = 끄기", {"bold": True, "color": NAVY, "size": 15.5})],
      [("핀 번호만 바꾸면 빨강·노랑·파랑", {"size": 14.5})],
      [("을 각각 켤 수 있습니다.", {"size": 14.5})]],
     size=15.5, line_spacing=1.4)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(3.4),
         ['# 핀: RED=17  YELLOW=27  BLUE=22',
          'GPIO.output(17, True)   # 빨강 켜기',
          'GPIO.output(5,  True)   # 부저 삑',
          'time.sleep(0.3)',
          'GPIO.output(5,  False)  # 부저 끄기'],
         title="LED · 부저 제어")

# 5) 실습② 온습도 → OLED → 색
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ② 온습도 읽어 화면에 띄우기",
            "센서가 보낸 숫자를 OLED 화면에 실시간 표시")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("AHT20 센서가 온도·습도를", {"size": 15.5})],
      [("숫자로 보내줍니다.", {"size": 15.5})],
      [("그 숫자를 OLED 화면에 띄우고,", {"size": 15.5})],
      [("WS2812 LED 색으로도 표현합니다.", {"size": 15.5})],
      [(" ", {"size": 8})],
      [("2초마다 자동으로 새 값을 읽어", {"size": 14.5})],
      [("화면이 계속 갱신됩니다.", {"size": 14.5})]],
     size=15.5, line_spacing=1.4)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(3.4),
         ['t = sensor.temperature',
          'h = sensor.relative_humidity',
          'print(f"온도 {t:.1f}C 습도 {h:.1f}%")',
          '# → 같은 값을 OLED 화면에 표시',
          'time.sleep(2)'],
         title="온습도 읽기")

# 6) 체험
p += 1
s = content(prs, p, TOTAL, "체험", "직접 체험 — 손으로 만져보기",
            "내가 만든 ‘공장의 눈’ 이 진짜 반응하는지 확인")
image_box(s, Inches(0.6), Inches(2.4), Inches(5.6), Inches(4.0), "assets/04_touch_oled.png")
text(s, Inches(6.55), Inches(2.7), Inches(6.0), Inches(4.0),
     [[("해보기", {"bold": True, "color": ORANGE, "size": 20})],
      [(" ", {"size": 6})],
      [("① 센서를 손가락으로 살짝 잡습니다.", {"size": 16})],
      [("② OLED 화면의 온도 숫자가", {"size": 16})],
      [("   올라가는지 봅니다.", {"size": 16})],
      [("③ 신호등 색이 바뀌는지 봅니다.", {"size": 16})],
      [(" ", {"size": 8})],
      [("→ 센서·화면·LED 가 하나로", {"bold": True, "color": NAVY, "size": 16})],
      [("   움직이는 첫 ‘통합’ 입니다.", {"bold": True, "color": NAVY, "size": 16})]],
     size=16, line_spacing=1.35)

# 7) 위키 세그먼트 — 장비카드 (Claude 연동)
p += 1
wiki_segment(
    prs, p, TOTAL,
    "오늘의 위키 — 장비/부품 카드 만들기",
    "오늘 쓴 부품을 1개당 1장 카드로 — Claude에게 시켜 빠르게",
    "🔧 오늘의 위키 활동",
    [[("오늘 쓴 부품을 ", {"size": 15}), ("1개 = 1장", {"bold": True, "color": PURPLE, "size": 15}),
      (" 카드로.", {"size": 15})],
     [(" ", {"size": 6})],
     [("• AHT20 (온습도 센서)", {"size": 14.5})],
     [("• OLED (작은 화면)", {"size": 14.5})],
     [("• LED 신호등 / 부저", {"size": 14.5})],
     [(" ", {"size": 6})],
     [("카드엔 ", {"size": 15}), ("핀·연결·쓰는 곳", {"bold": True, "size": 15}), ("을", {"size": 15})],
     [("적습니다. 사진은 보관함에.", {"size": 15})],
     [(" ", {"size": 6})],
     [("현업 연결: 내 설비 부품도", {"size": 14.5}),],
     [("카드로 두면 고장·교체가 빠릅니다.", {"size": 14.5})]],
    ["방금 쓴 AHT20 센서로 장비카드 만들어줘. I2C 핀(SDA=3, SCL=5), 주소 0x38, 쓰는 곳 포함해서.",
     "OLED 화면도 같은 형식으로 장비카드 하나 만들어줘."],
    "왜? 부품 카드가 쌓이면 ‘내 설비 사전’ 이 됩니다 — 현업에서 그대로 재사용.",
)

# 8) 정리 + 다음 예고
p += 1
s = content(prs, p, TOTAL, "정리", "오늘 정리 & 다음 시간 예고")
done = ["온도·습도를 숫자로 읽었다", "OLED 화면에 실시간 표시했다",
        "LED 신호등·부저를 제어했다", "장비카드로 위키에 기록했다 (제안)"]
text(s, Inches(0.6), Inches(2.35), Inches(6.3), Inches(0.5), "✅ 오늘 한 것", size=19, color=TEAL, bold=True)
y = Inches(3.0)
for d in done:
    rect(s, Inches(0.7), y+Inches(0.04), Inches(0.34), Inches(0.34), TEAL, shape=MSO_SHAPE.OVAL)
    text(s, Inches(0.7), y, Inches(0.34), Inches(0.34), "✓", size=14, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.2), y, Inches(5.6), Inches(0.5), d, size=15.5, color=INK)
    y += Inches(0.62)
card(s, Inches(7.2), Inches(2.6), Inches(5.5), Inches(3.4), color=NAVY)
text(s, Inches(7.55), Inches(2.85), Inches(5.0), Inches(0.5), "다음 시간 (3주차)", size=16, color=YELLOW, bold=True)
text(s, Inches(7.55), Inches(3.45), Inches(4.9), Inches(0.7), "자동 경보 시스템", size=24, color=WHITE, bold=True)
text(s, Inches(7.55), Inches(4.4), Inches(5.0), Inches(1.5),
     [[("• ‘기준값’ 넘으면 ", {"size":15,"color":WHITE}), ("자동 경고", {"size":15,"color":YELLOW,"bold":True})],
      [("• 정상·주의·위험 ", {"size":15,"color":WHITE}), ("자동 판단", {"size":15,"color":YELLOW,"bold":True})],
      [("• 측정값을 ", {"size":15,"color":WHITE}), ("파일로 저장", {"size":15,"color":YELLOW,"bold":True})]],
     size=15, line_spacing=1.5)

out = "2회_공장의_눈과_귀.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
