# -*- coding: utf-8 -*-
"""강의 슬라이드용 일러스트/목업 이미지 생성 (deck 팔레트·맑은 고딕).
실물 사진이 없는 자리(개념·실습장면·화면)를 채운다. 결과 → assets/*.png
박스 종횡비에 정확히 맞춰 생성하므로 add_picture(width,height)에 그대로 들어간다."""
import os, math
from PIL import Image, ImageDraw, ImageFont
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
os.makedirs(OUT, exist_ok=True)

# 팔레트
NAVY=(27,58,91); TEAL=(42,157,143); ORANGE=(231,111,81); YELLOW=(244,196,48)
PURPLE=(106,76,147); LIGHT=(244,246,248); INK=(34,43,53); GRAY=(138,151,163)
WHITE=(255,255,255); SOFT=(214,223,232); DARK=(30,41,51)
RED=(214,69,69); BLUE=(60,110,180)

MAL = r"C:\Windows\Fonts\malgun.ttf"
MALB = r"C:\Windows\Fonts\malgunbd.ttf"
def F(sz, bold=False): return ImageFont.truetype(MALB if bold else MAL, sz)

def canvas(ratio, h=900, bg=LIGHT):
    w = int(round(h*ratio))
    img = Image.new("RGB", (w, h), bg)
    return img, ImageDraw.Draw(img), w, h

def rr(d, box, r, fill=None, outline=None, width=3):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def ctext(d, cx, cy, s, font, fill, anchor="mm"):
    d.text((cx, cy), s, font=font, fill=fill, anchor=anchor)

def text(d, x, y, s, font, fill, anchor="la"):
    d.text((x, y), s, font=font, fill=fill, anchor=anchor)

def arrow(d, x1, y1, x2, y2, color, w=8, head=18):
    d.line((x1,y1,x2,y2), fill=color, width=w)
    ang = math.atan2(y2-y1, x2-x1)
    for s in (+1,-1):
        a = ang + s*math.radians(28)
        d.line((x2,y2, x2-head*math.cos(a), y2-head*math.sin(a)), fill=color, width=w)

def waves(d, cx, cy, color, n=3, r0=34, step=26, w=7, start=-60, end=60):
    for i in range(n):
        r = r0 + i*step
        d.arc((cx-r, cy-r, cx+r, cy+r), start, end, fill=color, width=w)

def save(img, name):
    p = os.path.join(OUT, name); img.save(p); print("saved", name, img.size)

# ---------------------------------------------------------------- 1. 개념: 스마트팩토리 흐름
def asset_concept():
    img, d, w, h = canvas(5.0/4.0)
    text(d, 40, 40, "스마트팩토리 — 보고 · 판단 · 알린다", F(34, True), NAVY)
    y = 250
    nodes = [("공장/설비", TEAL), ("센서", ORANGE), ("판단(Pi)", NAVY), ("폰·화면", PURPLE)]
    bw, bh, gap = 200, 150, 60
    x = 50
    cxs = []
    for i,(label, col) in enumerate(nodes):
        rr(d, (x, y, x+bw, y+bh), 22, fill=WHITE, outline=col, width=6)
        ctext(d, x+bw/2, y+bh/2, label, F(30, True), col)
        cxs.append(x+bw)
        if i < len(nodes)-1:
            arrow(d, x+bw+8, y+bh/2, x+bw+gap-8, y+bh/2, GRAY, 7, 16)
        x += bw+gap
    # 하단 설명
    text(d, 50, y+bh+70, "측정한 데이터로 스스로 판단하고,", F(26), INK)
    text(d, 50, y+bh+115, "멀리서도 폰으로 확인합니다.", F(26), INK)
    save(img, "01_concept.png")

# ---------------------------------------------------------------- 4. 체험: 센서 터치 → OLED 변화
def asset_touch_oled():
    img, d, w, h = canvas(5.6/4.0)
    text(d, 40, 40, "손으로 센서를 만지면 숫자가 오른다", F(32, True), NAVY)
    # 센서 칩
    sx, sy = 150, 380
    rr(d, (sx, sy, sx+150, sy+150), 16, fill=DARK)
    for i in range(4):
        d.line((sx-18, sy+25+i*32, sx, sy+25+i*32), fill=GRAY, width=6)
        d.line((sx+150, sy+25+i*32, sx+168, sy+25+i*32), fill=GRAY, width=6)
    ctext(d, sx+75, sy+75, "센서", F(26, True), WHITE)
    # 터치 리플
    waves(d, sx+75, sy-10, ORANGE, n=3, r0=30, step=22, w=6, start=200, end=340)
    ctext(d, sx+75, sy+200, "손 터치", F(24, True), ORANGE)
    # 화살표
    arrow(d, sx+200, sy+75, sx+330, sy+75, GRAY, 8, 20)
    # OLED 화면
    ox, oy = sx+360, sy-40
    rr(d, (ox, oy, ox+360, oy+230), 18, fill=DARK)
    text(d, ox+30, oy+34, "온도", F(28), (150,170,185))
    text(d, ox+30, oy+78, "31.2 C", F(60, True), TEAL)
    text(d, ox+250, oy+90, "↑", F(60, True), ORANGE)
    text(d, ox+30, oy+165, "습도  45 %", F(30), WHITE)
    save(img, "04_touch_oled.png")

# ---------------------------------------------------------------- 5. 체험: 손난로 → 자동 경보
def asset_alarm():
    img, d, w, h = canvas(5.6/4.0)
    text(d, 40, 40, "기준 초과 → 빨강 + 경보음 자동 작동", F(32, True), NAVY)
    # 손난로
    hx, hy = 120, 400
    rr(d, (hx, hy, hx+150, hy+110), 40, fill=ORANGE)
    ctext(d, hx+75, hy+55, "손난로", F(26, True), WHITE)
    waves(d, hx+75, hy-10, ORANGE, n=2, r0=26, step=20, w=5, start=200, end=340)
    # 센서
    sx = hx+230
    rr(d, (sx, hy, sx+120, hy+110), 14, fill=DARK)
    ctext(d, sx+60, hy+55, "센서", F(24, True), WHITE)
    arrow(d, hx+160, hy+55, sx-8, hy+55, GRAY, 7, 16)
    # 경보 패널
    px = sx+200
    arrow(d, sx+130, hy+55, px-8, hy+55, GRAY, 7, 16)
    d.ellipse((px, hy-10, px+90, hy+80), fill=RED)
    ctext(d, px+45, hy+35, "!", F(56, True), WHITE)
    waves(d, px+150, hy+35, RED, n=3, r0=28, step=20, w=6, start=-55, end=55)
    text(d, px-10, hy+110, "위험!  삐— 삐—", F(30, True), RED)
    save(img, "05_alarm.png")

# ---------------------------------------------------------------- 6. 화면: 폰 대시보드 (목업)
def asset_phone():
    img, d, w, h = canvas(5.83/4.0, bg=LIGHT)
    # 폰 외곽
    pw, ph = 430, 800
    px, py = (w-pw)//2, 50
    rr(d, (px, py, px+pw, py+ph), 50, fill=NAVY)
    sx, sy, sw, sh = px+18, py+60, pw-36, ph-110
    rr(d, (sx, sy, sx+sw, sy+sh), 30, fill=WHITE)
    # 노치
    rr(d, (px+pw/2-50, py+24, px+pw/2+50, py+44), 10, fill=DARK)
    # 헤더
    rr(d, (sx, sy, sx+sw, sy+90), 30, fill=TEAL)
    d.rectangle((sx, sy+50, sx+sw, sy+90), fill=TEAL)
    ctext(d, sx+sw/2, sy+45, "우리 공장 모니터", F(30, True), WHITE)
    # 게이지 카드 2개
    cy = sy+120
    for label, val, col in [("온도", "31°C", ORANGE), ("습도", "45%", BLUE)]:
        cardw = (sw-60)//2
        cx = sx+20 if label=="온도" else sx+40+cardw
        rr(d, (cx, cy, cx+cardw, cy+170), 20, fill=LIGHT, outline=SOFT, width=2)
        ctext(d, cx+cardw/2, cy+45, label, F(26), GRAY)
        ctext(d, cx+cardw/2, cy+110, val, F(50, True), col)
    # 상태 pill
    py2 = cy+200
    rr(d, (sx+90, py2, sx+sw-90, py2+60), 30, fill=(225,245,235), outline=TEAL, width=3)
    ctext(d, sx+sw/2, py2+30, "● 정상 가동 중", F(28, True), TEAL)
    # 미니 그래프
    gy = py2+100
    rr(d, (sx+20, gy, sx+sw-20, gy+200), 18, fill=LIGHT, outline=SOFT, width=2)
    pts = [(sx+50, gy+150),(sx+120, gy+120),(sx+190, gy+135),(sx+260, gy+80),(sx+330, gy+95)]
    d.line(pts, fill=TEAL, width=6, joint="curve")
    for p in pts: d.ellipse((p[0]-7,p[1]-7,p[0]+7,p[1]+7), fill=TEAL)
    save(img, "06_phone.png")

# ---------------------------------------------------------------- 7. 화면: 실시간 온도 그래프 (matplotlib)
def asset_graph():
    fp = fm.FontProperties(fname=MAL)
    ratio = 5.83/4.0
    fig = plt.figure(figsize=(ratio*4, 4), dpi=240)
    ax = fig.add_subplot(111)
    xs = list(range(13))
    ys = [27.5,27.8,28.2,28.0,29.1,30.4,31.2,30.8,32.5,34.1,35.6,34.8,33.9]
    ax.plot(xs, ys, color="#2A9D8F", linewidth=3, marker="o", markersize=5,
            markerfacecolor="#2A9D8F")
    ax.axhline(35, color="#E76F51", linestyle="--", linewidth=2)
    ax.text(0.2, 35.3, "위험 기준 35°C", color="#E76F51", fontproperties=fp, fontsize=11)
    ax.fill_between(xs, ys, 27, color="#2A9D8F", alpha=0.08)
    ax.set_title("실시간 온도 (최근 측정)", fontproperties=fp, fontsize=15, color="#1B3A5B", weight="bold")
    ax.set_xlabel("시간 (분)", fontproperties=fp, fontsize=11, color="#222B35")
    ax.set_ylabel("온도 (°C)", fontproperties=fp, fontsize=11, color="#222B35")
    ax.set_ylim(27, 37)
    ax.grid(True, color="#E1E7EE", linewidth=1)
    for sp in ("top","right"): ax.spines[sp].set_visible(False)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "07_graph.png"), facecolor="white")
    plt.close(fig); print("saved 07_graph.png")

# ---------------------------------------------------------------- 8. 실습: LoRa 장거리 무선
def asset_lora():
    img, d, w, h = canvas(5.83/4.0)
    text(d, 40, 40, "장거리 무선 (LoRa) — 멀리서도 수신", F(32, True), NAVY)
    by = 360
    # 왼쪽 보드
    rr(d, (60, by, 230, by+150), 16, fill=WHITE, outline=TEAL, width=6)
    ctext(d, 145, by+60, "보드 A", F(26, True), NAVY)
    ctext(d, 145, by+105, "(센서)", F(22), GRAY)
    # 오른쪽 보드
    rr(d, (w-230, by, w-60, by+150), 16, fill=WHITE, outline=PURPLE, width=6)
    ctext(d, w-145, by+60, "보드 B", F(26, True), NAVY)
    ctext(d, w-145, by+105, "(수신·폰)", F(22), GRAY)
    # 전파
    cx = w//2
    waves(d, 250, by+75, ORANGE, n=3, r0=40, step=30, w=7, start=-50, end=50)
    waves(d, w-250, by+75, ORANGE, n=3, r0=40, step=30, w=7, start=130, end=230)
    # 거리 표시
    d.line((240, by+200, w-240, by+200), fill=GRAY, width=4)
    for xx in (240, w-240):
        d.line((xx, by+185, xx, by+215), fill=GRAY, width=4)
    ctext(d, cx, by+200, " 수백 m ~ 수 km ", F(26, True), ORANGE)
    save(img, "08_lora.png")

# ---------------------------------------------------------------- 9. 화면: 손글씨 숫자 인식
def asset_ai():
    img, d, w, h = canvas(5.6/4.0)
    text(d, 40, 40, "손글씨 숫자 인식 AI", F(32, True), NAVY)
    # 입력 캔버스
    ix, iy, isz = 70, 240, 300
    rr(d, (ix, iy, ix+isz, iy+isz), 18, fill=WHITE, outline=SOFT, width=3)
    text(d, ix+10, iy-46, "내가 쓴 숫자", F(24), GRAY)
    # 손글씨 '3' (두꺼운 곡선)
    cx, cy = ix+isz/2, iy+isz/2
    d.arc((cx-70, cy-90, cx+80, cy+10), -120, 110, fill=INK, width=22)
    d.arc((cx-70, cy-10, cx+80, cy+95), -110, 120, fill=INK, width=22)
    # 화살표
    arrow(d, ix+isz+20, cy, ix+isz+120, cy, GRAY, 8, 20)
    # 결과 패널
    rx = ix+isz+150
    rr(d, (rx, iy+20, rx+330, iy+260), 18, fill=PURPLE)
    ctext(d, rx+165, iy+80, "AI 인식 결과", F(28), (220,210,235))
    ctext(d, rx+165, iy+150, "3", F(110, True), WHITE)
    ctext(d, rx+165, iy+225, "정확도 98%", F(26, True), YELLOW)
    save(img, "09_ai.png")

if __name__ == "__main__":
    asset_concept(); asset_touch_oled(); asset_alarm(); asset_phone()
    asset_graph(); asset_lora(); asset_ai()
    print("done.")
