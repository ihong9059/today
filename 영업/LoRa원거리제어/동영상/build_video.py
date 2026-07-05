# -*- coding: utf-8 -*-
"""
UTTEC 골프장 LoRa 무선 통합 제어 — 쉬운 설명 동영상 (범용본)
6컷 나레이션 영상: Pillow 슬라이드(도식) + edge-tts(ko-KR-InJoonNeural) + ffmpeg 합성
출력: UTTEC_LoRa무선제어_소개영상_v1.mp4 (1920x1080, 30fps)
"""
import os, subprocess, asyncio
from PIL import Image, ImageDraw, ImageFont
import edge_tts

BASE = r"C:\todo\today\영업\LoRa원거리제어\동영상"
WORK = os.path.join(BASE, "_work")
os.makedirs(WORK, exist_ok=True)
FFMPEG  = r"C:\todo\today\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe"
FFPROBE = r"C:\todo\today\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffprobe.exe"
VOICE = "ko-KR-InJoonNeural"
RATE  = "+5%"
W, H = 1920, 1080

# 색상
NAVY=(15,35,64); ORANGE=(234,88,12); WHITE=(255,255,255)
GRAY=(203,213,225); LGRAY=(148,163,184); GREEN=(34,197,94)
CARD=(30,45,74)

FB = r"C:\Windows\Fonts\malgunbd.ttf"   # 맑은 고딕 Bold
FR = r"C:\Windows\Fonts\malgun.ttf"     # 맑은 고딕
def font(path, size): return ImageFont.truetype(path, size)

# ---- 6컷 정의 ----
CUTS = [
    dict(tag="문제 · 조명", title="골프장의 밤",
         big="마지막 팀이 지나간 홀 조명,\n누가 끄러 갑니까?",
         narr="골프장의 밤. 마지막 팀이 홀을 지나가면, 그 홀의 조명은 이제 필요가 없습니다. "
              "하지만 그 불을 끄러, 담당자가 매일 밤 어두운 코스를 직접 걸어갑니다. "
              "켜 둔 조명은 그대로 전기요금이 되고, 야간 이동은 그 자체로 위험합니다.",
         kind="lamp_problem"),
    dict(tag="해결 · 조명", title="자동 순차 소등",
         big="팀 진행에 따라\n미사용 홀이 자동으로 꺼집니다",
         narr="유티이씨의 로라 무선 조명 제어는, 팀의 진행에 맞춰 사용하지 않는 홀의 조명을 자동으로 하나씩 꺼 줍니다. "
              "사람이 끄러 갈 필요가 없습니다. 쓰지 않는 조명은 자동으로 꺼지니, "
              "야간 전기요금이 줄고, 밤에 코스를 도는 수고와 위험도 사라집니다.",
         kind="lamp_solution"),
    dict(tag="문제 · 수조", title="물탱크 수위",
         big="매번 확인하고,\n펌프를 직접 켜셨죠?",
         narr="물 문제도 마찬가지입니다. 높은 곳의 물탱크, 멀리 떨어진 수원과 펌프. "
              "수위가 얼마나 남았는지 매번 확인하고, 펌프를 직접 켜고 끄는 일은 번거롭고 놓치기 쉽습니다.",
         kind="tank_problem"),
    dict(tag="해결 · 수조", title="스스로 급수, 폰으로 확인",
         big="자동으로 급수하고\n스마트폰으로 봅니다",
         narr="이제 시스템이 스스로 판단합니다. 수위가 낮아지면 자동으로 펌프를 돌려 물을 채우고, 다 차면 멈춥니다. "
              "그리고 그 모든 상태를, 사무실에서 스마트폰으로 한눈에 확인합니다. "
              "한림용인 씨씨에서 이미 운영되고 있는 방식입니다.",
         kind="tank_solution"),
    dict(tag="안전", title="가장 큰 변화, 안전",
         big="위험한 곳에\n밤에 가지 않아도 됩니다",
         narr="무엇보다, 안전입니다. 경사지나 외곽처럼 사고가 나기 쉬운 곳의 차단기와 스위치를, "
              "이제 밤에 직접 찾아가지 않고 원격으로 제어합니다. "
              "위험한 곳에 사람이 가지 않아도 되는 것, 그것이 가장 큰 변화입니다.",
         kind="safety"),
    dict(tag="경제성", title="비용으로도 분명합니다",
         big="전기·물·인건비 절감으로\n약 1년이면 투자 회수",
         narr="도입 효과는 비용으로도 분명합니다. 야간 조명은 순차 소등으로 전기요금과 소등 인건비를 줄여, 약 이 년이면 투자비를 회수합니다. "
              "수조 자동 관리는 점검 인건비와 비싼 긴급 상수도 비용을 아껴, 약 일 년 만에 회수됩니다. "
              "두 시스템을 함께 도입하면 약 일 년 만에 회수하고, 그 이후는 매년 순수 절감입니다.",
         kind="economics"),
    dict(tag="UTTEC", title="검증된 무선 제어, 8년",
         big="국내 최초 · 한림그룹 다현장\n무료 현장 진단으로 시작하세요",
         narr="유티이씨는 이천십팔년, 국내 최초로 로라 무선 조명을 상용화한 회사입니다. "
              "한림그룹의 여러 골프장에서 팔 년간 검증해 왔습니다. "
              "귀 골프장의 지형과 규모에 맞는 도입 방안을, 무료 현장 진단으로 시작하세요.",
         kind="cta"),
]

def wrap(draw, text, fnt, maxw):
    out=[]
    for para in text.split("\n"):
        line=""
        for ch in para:
            t=line+ch
            if draw.textlength(t, font=fnt) <= maxw: line=t
            else: out.append(line); line=ch
        out.append(line)
    return out

def draw_multiline(draw, xy, lines, fnt, fill, gap=18, center=False, maxw=None):
    x,y=xy
    for ln in lines:
        w=draw.textlength(ln, font=fnt)
        xx = x+(maxw-w)/2 if (center and maxw) else x
        draw.text((xx,y), ln, font=fnt, fill=fill)
        asc,desc = fnt.getmetrics(); y += asc+desc+gap
    return y

def base_canvas():
    img=Image.new("RGB",(W,H),NAVY); d=ImageDraw.Draw(img)
    d.rectangle([0,0,W,14], fill=ORANGE)          # 상단 액센트
    d.rectangle([0,H-14,W,H], fill=ORANGE)        # 하단 액센트
    return img,d

def slide(cut, path):
    img,d = base_canvas()
    f_tag=font(FB,34); f_title=font(FB,72); f_big=font(FB,60); f_foot=font(FR,30)
    # 태그
    d.rounded_rectangle([120,110,120+d.textlength(cut["tag"],font=f_tag)+70,180], radius=12, fill=ORANGE)
    d.text((155,120), cut["tag"], font=f_tag, fill=WHITE)
    # 타이틀
    d.text((120,230), cut["title"], font=f_title, fill=WHITE)
    d.rectangle([120,340,120+560,348], fill=ORANGE)
    # 큰 문구
    big_lines = wrap(d, cut["big"], f_big, W-240)
    draw_multiline(d,(120,430), big_lines, f_big, GRAY, gap=20)
    # 도식(오른쪽/하단)
    diagram(d, cut["kind"])
    # 푸터
    d.text((120,H-90), "UTTEC  ·  LoRa 무선 통합 제어", font=f_foot, fill=LGRAY)
    img.save(path)

def diagram(d, kind):
    fs=font(FB,30); fsm=font(FR,26)
    y=760
    if kind=="lamp_problem":
        for i,st in enumerate(["1홀","2홀","3홀","...","18홀"]):
            x=120+i*150; on = i%2==0
            d.ellipse([x,y,x+90,y+90], fill=(250,204,21) if on else CARD, outline=LGRAY, width=3)
            d.text((x+18,y+120), st, font=fsm, fill=GRAY)
        d.text((120,y+170), "필요 없는 홀도 계속 켜져 있음 → 전기요금·수동 소등", font=fsm, fill=ORANGE)
    elif kind=="lamp_solution":
        labels=[("지나간 홀","OFF",CARD,LGRAY),("진행 중","ON",GREEN,WHITE),("대기","ON",NAVY,WHITE)]
        for i,(nm,st,fill,tc) in enumerate(labels):
            x=120+i*430
            d.rounded_rectangle([x,y,x+380,y+120], radius=14, fill=fill, outline=ORANGE, width=3)
            d.text((x+30,y+22), nm, font=fs, fill=WHITE)
            d.text((x+30,y+66), st, font=fs, fill=(GREEN if st=="ON" else LGRAY))
    elif kind=="tank_problem":
        boxes=["수원(원거리)","펌프","→ 고지대 물탱크"]
        for i,b in enumerate(boxes):
            x=120+i*470
            d.rounded_rectangle([x,y,x+430,y+110], radius=14, fill=CARD, outline=LGRAY, width=3)
            d.text((x+30,y+35), b, font=fs, fill=GRAY)
        d.text((120,y+150), "수위 수동 확인 + 펌프 수동 조작 → 번거롭고 놓치기 쉬움", font=fsm, fill=ORANGE)
    elif kind=="tank_solution":
        flow=["수위 낮음 감지","펌프 자동 ON","가득 차면 OFF","폰 대시보드"]
        for i,b in enumerate(flow):
            x=120+i*430
            fill=GREEN if i<3 else NAVY
            d.rounded_rectangle([x,y,x+380,y+110], radius=14, fill=CARD, outline=(GREEN if i<3 else ORANGE), width=3)
            d.text((x+28,y+38), b, font=fsm, fill=WHITE)
    elif kind=="safety":
        items=["경사지 차단기","외곽 스위치","수변 펌프"]
        for i,b in enumerate(items):
            x=120+i*470
            d.rounded_rectangle([x,y,x+430,y+110], radius=14, fill=CARD, outline=GREEN, width=3)
            d.text((x+30,y+20), b, font=fsm, fill=GRAY)
            d.text((x+30,y+62), "→ 원격 제어", font=fsm, fill=GREEN)
    elif kind=="economics":
        items=[("야간 조명","회수 약 2년"),("수조 관리","회수 약 11개월"),("함께 도입","회수 약 1.1년")]
        for i,(a,b) in enumerate(items):
            x=120+i*580
            d.rounded_rectangle([x,y,x+540,y+130], radius=14, fill=CARD, outline=GREEN, width=3)
            d.text((x+30,y+22), a, font=fs, fill=WHITE)
            d.text((x+30,y+70), b, font=fs, fill=GREEN)
        d.text((120,y+160), "전기요금 · 상수도 · 인건비 절감 (현장 규모에 따라 조정)", font=fsm, fill=GRAY)
    elif kind=="cta":
        yrs=[("2018","국내 최초 LoRa 조명"),("2019~20","하나금융·필로스·광릉"),("2026","한림용인 수조 14노드")]
        for i,(a,b) in enumerate(yrs):
            x=120+i*580
            d.rounded_rectangle([x,y,x+540,y+120], radius=14, fill=CARD, outline=ORANGE, width=3)
            d.text((x+30,y+20), a, font=fs, fill=ORANGE)
            d.text((x+30,y+64), b, font=fsm, fill=GRAY)

async def tts(text, path):
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(path)

def dur(path):
    r=subprocess.run([FFPROBE,"-v","error","-show_entries","format=duration",
        "-of","default=noprint_wrappers=1:nokey=1", path], capture_output=True, text=True)
    return float(r.stdout.strip())

def make_segment(png, mp3, out, tail=0.8):
    d = dur(mp3)+tail
    subprocess.run([FFMPEG,"-y","-loop","1","-i",png,"-i",mp3,
        "-c:v","libx264","-tune","stillimage","-pix_fmt","yuv420p","-r","30",
        "-c:a","aac","-b:a","192k","-af",f"apad=pad_dur={tail}","-t",f"{d:.2f}",
        "-vf","scale=1920:1080", out], check=True, capture_output=True)

def main():
    segs=[]
    for i,cut in enumerate(CUTS,1):
        png=os.path.join(WORK,f"slide_{i}.png")
        mp3=os.path.join(WORK,f"audio_{i}.mp3")
        seg=os.path.join(WORK,f"seg_{i}.mp4")
        print(f"[{i}] slide"); slide(cut,png)
        print(f"[{i}] tts");   asyncio.run(tts(cut["narr"],mp3))
        print(f"[{i}] seg ({dur(mp3):.1f}s)"); make_segment(png,mp3,seg)
        segs.append(seg)
    lst=os.path.join(WORK,"list.txt")
    with open(lst,"w",encoding="utf-8") as f:
        for s in segs: f.write(f"file '{s}'\n")
    out=os.path.join(BASE,"UTTEC_LoRa무선제어_소개영상_v1.mp4")
    print("concat →", out)
    subprocess.run([FFMPEG,"-y","-f","concat","-safe","0","-i",lst,
        "-c","copy", out], check=True, capture_output=True)
    print("DONE:", out, f"total {sum(dur(s) for s in segs):.1f}s")

if __name__=="__main__":
    main()
