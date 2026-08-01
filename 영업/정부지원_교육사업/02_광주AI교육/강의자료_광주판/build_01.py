# -*- coding: utf-8 -*-
"""1회차 (7/15) — 라즈베리파이와 친해지기 · 수업용 강의 슬라이드."""
from ppt_common import *

TOTAL = 12
prs = new_deck()
p = 0

# 1) 표지 ------------------------------------------------------------------
p += 1
cover(prs, 1, "라즈베리파이와\n친해지기",
      "전원 켜기부터 나의 첫 프로그램까지 — 손바닥 컴퓨터와 인사하기",
      "제1주차 · 13:00~17:00", "홍광선 대표 · UTTEC 교육팀", TOTAL)

# 2) 오늘의 목표 -----------------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "OT", "오늘의 목표",
            "오늘 수업이 끝나면 — 직접 이걸 하게 됩니다")
ys = Inches(2.35)
goals = [
    ("1", "라즈베리파이 켜기", "전원을 연결하고 화면이 나오게 한 뒤, 인터넷(Wi-Fi)에 연결합니다."),
    ("2", "첫 프로그램 실행", "컴퓨터에게 명령을 내려  Hello Factory!  를 화면에 띄웁니다."),
    ("3", "나만의 계산기", "숫자를 다루는 아주 작은 계산기 프로그램을 직접 만들어 봅니다."),
]
cw = Inches(3.95); gap = Inches(0.28); x0 = Inches(0.6)
for i,(n,h,b) in enumerate(goals):
    step_card(s, x0 + i*(cw+gap), ys, cw, Inches(2.25), n, h, b, accent=ORANGE)
card(s, Inches(0.6), Inches(4.95), Inches(12.13), Inches(1.55), color=LIGHT, accent=NAVY)
text(s, Inches(0.95), Inches(5.18), Inches(11.4), Inches(1.2),
     [[("💡 부담 갖지 마세요. ", {"bold": True, "color": NAVY, "size": 17}),
       ("오늘은 ‘컴퓨터와 친해지는 날’ 입니다.", {"color": INK, "size": 17})],
      [("타이핑이 느려도 괜찮습니다 — 보조 강사가 자리마다 돌며 함께 합니다.", {"color": INK, "size": 15})]],
     size=16, line_spacing=1.2)

# 3) 5주 로드맵 ------------------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "OT", "5주 학습 여정",
            "오늘은 그 첫걸음 — 5주 뒤엔 ‘미니 스마트팩토리’를 완성합니다")
road = [
    ("1주", "라즈베리파이와\n친해지기", "오늘!", ORANGE),
    ("2주", "공장의\n눈과 귀", "센서·화면", TEAL),
    ("3주", "자동 경보\n시스템", "위험 알림", TEAL),
    ("4주", "스마트폰\n원격 보기", "무선·웹", TEAL),
    ("5주", "AI · 미니\n스마트팩토리", "통합 완성", NAVY),
]
cw = Inches(2.28); gap = Inches(0.17); x0 = Inches(0.7); y = Inches(2.85)
for i,(wk,nm,tag,col) in enumerate(road):
    x = x0 + i*(cw+gap)
    card(s, x, y, cw, Inches(2.5), accent=col)
    text(s, x, y+Inches(0.25), cw, Inches(0.5), wk, size=18, color=col, bold=True, align=PP_ALIGN.CENTER)
    text(s, x+Inches(0.15), y+Inches(0.85), cw-Inches(0.3), Inches(1.0), nm, size=16, color=NAVY, bold=True, align=PP_ALIGN.CENTER, line_spacing=1.05)
    rect(s, x+Inches(0.4), y+Inches(1.95), cw-Inches(0.8), Inches(0.4), LIGHT, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    text(s, x+Inches(0.4), y+Inches(1.95), cw-Inches(0.8), Inches(0.4), tag, size=12.5, color=INK, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    if i < 4:
        text(s, x+cw-Inches(0.02), y+Inches(1.0), Inches(0.25), Inches(0.5), "›", size=24, color=GRAY, align=PP_ALIGN.CENTER)

# 4) 공장 자동화란? --------------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "OT", "‘공장 자동화’ 가 뭔가요?",
            "사람이 일일이 보지 않아도, 기계가 스스로 ‘보고·판단하고·알려주는’ 것")
text(s, Inches(0.6), Inches(2.45), Inches(6.7), Inches(4.0),
     [[("이런 적 있으셨나요?", {"bold": True, "color": ORANGE, "size": 19})],
      [("• 창고·작업장이 너무 더운지 추운지 ", {"size": 16}), ("계속 가서 확인", {"bold": True, "size": 16})],
      [("• 기계가 과열됐는데 ", {"size": 16}), ("뒤늦게 알아챔", {"bold": True, "size": 16})],
      [("• 어제 몇 도였는지 ", {"size": 16}), ("기록이 없음", {"bold": True, "size": 16})],
      [(" ", {"size": 8})],
      [("그래서 우리는 5주 동안 →", {"bold": True, "color": NAVY, "size": 17})],
      [("센서로 ", {"size": 16}), ("보고", {"bold": True, "color": TEAL, "size": 16}),
       (", 기준으로 ", {"size": 16}), ("판단하고", {"bold": True, "color": TEAL, "size": 16}),
       (", 알람·화면·폰으로 ", {"size": 16}), ("알려주는", {"bold": True, "color": TEAL, "size": 16}),
       (" 작은 시스템을 직접 만듭니다.", {"size": 16})]],
     size=16, line_spacing=1.35)
image_box(s, Inches(7.7), Inches(2.4), Inches(5.0), Inches(4.0), "assets/01_concept.png")

# 5) 라즈베리파이 = 손바닥 컴퓨터 -----------------------------------------
p += 1
s = content(prs, p, TOTAL, "이론", "라즈베리파이 = 손바닥 컴퓨터",
            "값싸고 작은 진짜 컴퓨터 — 센서·LED·화면을 직접 연결할 수 있습니다")
photo_fit(s, Inches(0.6), Inches(2.4), Inches(5.2), Inches(4.0), "assets/rpi3.jpg")
feats = [
    ("🖥  진짜 컴퓨터", "화면·키보드·인터넷 모두 됩니다. 다만 손바닥 크기."),
    ("🔌  센서를 직접 연결", "온도·LED·버튼을 핀에 꽂아 ‘현실 세계’와 연결합니다."),
    ("💸  저렴·튼튼", "공장·현장에 여러 대 두고 쓰기 좋습니다."),
]
y = Inches(2.4)
for h,b in feats:
    card(s, Inches(6.2), y, Inches(6.5), Inches(1.2), color=LIGHT, accent=TEAL)
    text(s, Inches(6.55), y+Inches(0.16), Inches(6.0), Inches(0.5), h, size=17, color=NAVY, bold=True)
    text(s, Inches(6.55), y+Inches(0.64), Inches(6.0), Inches(0.5), b, size=14, color=INK)
    y += Inches(1.37)

# 6) 우리 kit 둘러보기 -----------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "이론", "우리 실습 키트 둘러보기",
            "UTTEC 가 직접 만든 교육용 키트 — 5주 내내 이 키트로 배웁니다")
photo_fit(s, Inches(0.6), Inches(2.4), Inches(5.6), Inches(4.0), "assets/kit.jpg")
parts = [
    "온습도 센서 (공장의 ‘온도계’)",
    "작은 화면 OLED (수치 표시)",
    "3색 LED 신호등 (정상·주의·위험)",
    "부저·스피커 (경고음)",
    "버튼 스위치 / 무선 통신 모듈",
]
card(s, Inches(6.55), Inches(2.4), Inches(6.18), Inches(4.0), color=LIGHT)
text(s, Inches(6.95), Inches(2.65), Inches(5.5), Inches(0.5),
     "주요 구성품", size=18, color=ORANGE, bold=True)
y = Inches(3.35)
for i,pt in enumerate(parts):
    rect(s, Inches(6.95), y+Inches(0.05), Inches(0.32), Inches(0.32), TEAL, shape=MSO_SHAPE.OVAL)
    text(s, Inches(6.95), y+Inches(0.03), Inches(0.32), Inches(0.32), str(i+1), size=13, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(7.45), y, Inches(5.0), Inches(0.5), pt, size=15.5, color=INK)
    y += Inches(0.56)
text(s, Inches(6.95), Inches(6.05), Inches(5.6), Inches(0.4),
     "※ 키트는 교육이 끝나도 여러분의 자산으로 남습니다.", size=12.5, color=GRAY)

# 7) 실습 1 — 전원·화면·Wi-Fi ---------------------------------------------
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ① 전원 켜고 인터넷 연결",
            "따라 하기 — 한 단계씩 천천히")
steps = [
    ("1", "전원 연결", "USB-C 전원을 꽂으면 보드의 빨간 불이 켜집니다."),
    ("2", "화면 확인", "모니터에 바탕화면이 나타날 때까지 기다립니다."),
    ("3", "Wi-Fi 연결", "오른쪽 위 Wi-Fi 아이콘 → 우리 교육장 네트워크 선택."),
    ("4", "(선택) 원격 접속", "노트북에서 VNC로 라즈베리파이 화면 띄우기."),
]
cw = Inches(5.95); ch = Inches(1.85); gx=Inches(0.6); gy=Inches(2.35); gap=Inches(0.23)
for i,(n,h,b) in enumerate(steps):
    x = gx + (i%2)*(cw+gap); y = gy + (i//2)*(ch+gap)
    step_card(s, x, y, cw, ch, n, h, b, accent=ORANGE)

# 8) 실습 2 — Thonny / Hello Factory! -------------------------------------
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ② 첫 프로그램 — Hello Factory!",
            "컴퓨터에게 내리는 첫 명령")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("‘Thonny’ 라는 프로그램을 엽니다.", {"size": 16})],
      [("여기에 명령을 한 줄 적고 ", {"size": 16}), ("실행(▶) ", {"bold": True, "color": ORANGE, "size": 16}),
       ("하면", {"size": 16})],
      [("컴퓨터가 글자를 화면에 보여줍니다.", {"size": 16})],
      [(" ", {"size": 10})],
      [("print  =  ‘화면에 보여줘’ 라는 뜻", {"bold": True, "color": NAVY, "size": 16})],
      [("따옴표 \" \" 안의 글자를 바꾸면", {"size": 15})],
      [("내가 원하는 문장이 나옵니다. 직접 바꿔보세요!", {"size": 15})]],
     size=16, line_spacing=1.4)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(2.3),
         ['print("Hello Factory!")', '', 'print("내 이름은 홍길동")'],
         title="Thonny 편집창")
card(s, Inches(6.9), Inches(4.95), Inches(5.83), Inches(1.5), color=LIGHT, accent=TEAL)
text(s, Inches(7.2), Inches(5.15), Inches(5.3), Inches(1.2),
     [[("▶ 실행 결과", {"bold": True, "color": TEAL, "size": 15})],
      [("Hello Factory!", {"font":"Consolas","size": 16, "color": INK})],
      [("내 이름은 홍길동", {"font":"Consolas","size": 16, "color": INK})]],
     size=15, line_spacing=1.2)

# 9) 실습 3 — 변수·계산기 --------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "실습", "실습 ③ 나만의 계산기 만들기",
            "숫자를 담는 ‘상자(변수)’ 로 간단한 계산을")
text(s, Inches(0.6), Inches(2.4), Inches(6.0), Inches(4.0),
     [[("변수 = 값을 담아두는 상자", {"bold": True, "color": NAVY, "size": 17})],
      [("a 라는 상자에 10, b 에 3 을 담고", {"size": 15.5})],
      [("두 상자를 더하면 13 이 나옵니다.", {"size": 15.5})],
      [(" ", {"size": 10})],
      [("나중에 ‘온도’ 도 이렇게 상자에 담아", {"size": 15.5})],
      [("‘30 보다 크면 위험!’ 같은 판단에 씁니다.", {"size": 15.5})],
      [("→ 3주차에서 바로 이걸 합니다.", {"bold": True, "color": ORANGE, "size": 15.5})]],
     size=15.5, line_spacing=1.4)
code_box(s, Inches(6.9), Inches(2.4), Inches(5.83), Inches(3.1),
         ['a = 10', 'b = 3', 'print("합:", a + b)', 'print("곱:", a * b)'],
         title="간단한 계산기")
card(s, Inches(6.9), Inches(5.7), Inches(5.83), Inches(0.85), color=LIGHT, accent=TEAL)
text(s, Inches(7.2), Inches(5.82), Inches(5.3), Inches(0.6),
     [[("▶ 결과:  ", {"bold": True, "color": TEAL, "size": 15}),
       ("합: 13    곱: 30", {"font":"Consolas","size": 15, "color": INK})]], size=15)

# 10) 위키 세그먼트 — 1회차 기록 (0회차에서 만든 위키에) -------------------
p += 1
wiki_segment(
    prs, p, TOTAL,
    "오늘의 위키 — 1회차 기록 남기기",
    "0회차에 만든 ‘내 현업 위키’ 에 오늘 한 일을 기록합니다 (Claude로 간편하게)",
    "📓 오늘의 위키 활동",
    [[("0회차에 세팅한 ", {"size": 15}), ("내 현업 위키", {"bold": True, "color": PURPLE, "size": 15}),
      ("를 엽니다.", {"size": 15})],
     [(" ", {"size": 6})],
     [("작업일지에 오늘 한 일을 기록 —", {"size": 15})],
     [("• Pi 부팅·인터넷 연결", {"size": 14.5})],
     [("• Hello Factory! 첫 프로그램", {"size": 14.5})],
     [("• 나만의 계산기", {"size": 14.5})],
     [(" ", {"size": 6})],
     [("손으로 적어도 되고,", {"size": 15}),],
     [("Claude에게 ", {"size": 15}), ("대신 정리", {"bold": True, "color": PURPLE, "size": 15}),
      ("시켜도 됩니다.", {"size": 15})]],
    ["오늘 한 일 정리해서 작업일지에 한 줄씩 추가해줘. Pi 켜고 Hello Factory 출력하고 계산기 만들었어.",
     "방금 적은 1회차 기록을 보기 좋게 표로 정리해줘."],
    "왜? 오늘 기록이 5주 뒤 ‘내 현업 가이드’ 의 첫 페이지가 됩니다.",
)

# 11) 오늘 정리 + 다음 예고 -------------------------------------------------
p += 1
s = content(prs, p, TOTAL, "정리", "오늘 정리 & 다음 시간 예고")
done = [
    "라즈베리파이를 켜고 인터넷에 연결했다",
    "Hello Factory! 첫 프로그램을 실행했다",
    "변수로 나만의 계산기를 만들었다",
    "작업 일지에 오늘 한 일을 기록했다 (제안)",
]
text(s, Inches(0.6), Inches(2.35), Inches(6.3), Inches(0.5),
     "✅ 오늘 우리가 한 것", size=19, color=TEAL, bold=True)
y = Inches(3.0)
for d in done:
    rect(s, Inches(0.7), y+Inches(0.04), Inches(0.34), Inches(0.34), TEAL, shape=MSO_SHAPE.OVAL)
    text(s, Inches(0.7), y, Inches(0.34), Inches(0.34), "✓", size=14, color=WHITE, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    text(s, Inches(1.2), y, Inches(5.6), Inches(0.5), d, size=15.5, color=INK)
    y += Inches(0.62)
card(s, Inches(7.2), Inches(2.6), Inches(5.5), Inches(3.4), color=NAVY)
text(s, Inches(7.55), Inches(2.85), Inches(5.0), Inches(0.5),
     "다음 시간 (2주차) 예고", size=16, color=YELLOW, bold=True)
text(s, Inches(7.55), Inches(3.45), Inches(4.9), Inches(0.7),
     "‘공장의 눈과 귀’ 만들기", size=24, color=WHITE, bold=True, line_spacing=1.05)
text(s, Inches(7.55), Inches(4.45), Inches(5.0), Inches(1.5),
     [[("• 온습도 센서로 온도를 ", {"size":15,"color":WHITE}), ("측정", {"size":15,"color":YELLOW,"bold":True})],
      [("• 작은 화면(OLED)에 ", {"size":15,"color":WHITE}), ("실시간 표시", {"size":15,"color":YELLOW,"bold":True})],
      [("• LED 신호등으로 ", {"size":15,"color":WHITE}), ("상태 색 표시", {"size":15,"color":YELLOW,"bold":True})]],
     size=15, line_spacing=1.5)

# 12) Q&A ------------------------------------------------------------------
p += 1
s = blank(prs)
rect(s, 0, 0, EMU_W, EMU_H, NAVY)
rect(s, 0, Inches(6.6), EMU_W, Inches(0.9), TEAL)
text(s, Inches(0), Inches(2.7), EMU_W, Inches(1.2),
     "Q & A", size=60, color=WHITE, bold=True, align=PP_ALIGN.CENTER)
text(s, Inches(0), Inches(4.1), EMU_W, Inches(0.7),
     "오늘 막힌 부분, 무엇이든 편하게 질문하세요.", size=18,
     color=RGBColor(0xD9,0xE4,0xEC), align=PP_ALIGN.CENTER)
text(s, Inches(0), Inches(6.78), EMU_W, Inches(0.5),
     "UTTEC · 광주 AI·IoT 스마트팩토리 실습 과정", size=12,
     color=WHITE, align=PP_ALIGN.CENTER)

out = "1회_라즈베리파이_친해지기.pptx"
prs.save(out)
print("saved:", out, "| slides:", len(prs.slides._sldIdLst))
