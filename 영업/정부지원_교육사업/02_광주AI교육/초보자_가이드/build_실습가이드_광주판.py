# -*- coding: utf-8 -*-
"""
회차별 실습 가이드 빌더 (0~5회차, 초보자용) → 회차별 개별 HTML 6개 생성.
출처: 프로그램/미래창의아카데미/3차_2026-07/01~05 강의안 + _공통/커리큘럼_모듈/vault운영_모듈
      + student_vault_template/프롬프트 + .10 wiki 심화실습·port_map.
핀맵: LED 17/22주차 · 부저 5 · 스피커 13 · 스위치 4 · I2C(SDA2/SCL3) · WS2812 DIN 12 · LoRa TX14/RX15 · M0/M1/AUX 21/20/7
"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
_EMO = re.compile("[🀀-🫿☀-➿⬀-⯿️]")
def _strip(t): return _EMO.sub("", t)

CSS = r"""
  :root{--bg:#F4F6F8;--ink:#1C2530;--muted:#5C6875;--line:#E1E7ED;--blue:#2563C9;--blue-deep:#1B4894;
    --teal:#0E9488;--green:#16955C;--amber:#C8811A;--red:#C64236;--violet:#6D4AC2;--shadow:0 2px 12px rgba(30,50,80,.07)}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:"Malgun Gothic","맑은 고딕","Apple SD Gothic Neo",sans-serif;color:var(--ink);background:var(--bg);line-height:1.75;font-size:15.5px}
  .wrap{max-width:900px;margin:0 auto;padding:0 22px}
  code,.mono{font-family:"Consolas","D2Coding","Courier New",monospace}
  header{color:#fff;padding:46px 0 40px}
  header .tagline{font-size:13px;letter-spacing:1px;opacity:.9;margin-bottom:12px;text-transform:uppercase}
  header h1{font-size:29px;font-weight:800;line-height:1.32;letter-spacing:-.5px;margin-bottom:14px}
  header p{font-size:16px;opacity:.95;max-width:680px}
  .hmeta{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
  .hmeta span{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:8px;padding:6px 13px;font-size:13px}
  .hmeta b{color:#fff}
  .goal{background:#fff;border:1px solid var(--line);border-left:5px solid var(--teal);border-radius:12px;padding:18px 22px;margin:26px 0;box-shadow:var(--shadow)}
  .goal h3{font-size:15px;color:var(--teal);margin-bottom:8px}
  .goal b{color:var(--ink)}
  section{padding:30px 0;border-bottom:1px solid var(--line)}
  .badge{display:inline-flex;align-items:center;gap:9px;margin-bottom:10px}
  .badge .n{min-width:34px;height:34px;padding:0 10px;border-radius:18px;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px}
  .badge .k{font-size:12px;letter-spacing:1.3px;color:var(--muted);text-transform:uppercase;font-weight:700}
  h2{font-size:22px;font-weight:800;letter-spacing:-.3px;margin-bottom:12px}
  h3{font-size:16.5px;font-weight:800;margin:20px 0 9px}
  h4{font-size:15px;font-weight:800;margin:16px 0 7px;color:var(--blue-deep)}
  p{margin-bottom:11px}
  .lead{color:var(--muted);font-size:15px;margin-bottom:16px}
  ul.plain{list-style:none;margin:8px 0}
  ul.plain li{position:relative;padding-left:22px;margin-bottom:7px}
  ul.plain li::before{content:"»";position:absolute;left:3px;color:var(--teal);font-weight:800}
  ol.steps{margin:10px 0 10px 2px;list-style:none;counter-reset:st}
  ol.steps>li{position:relative;padding-left:36px;margin-bottom:14px;counter-increment:st}
  ol.steps>li::before{content:counter(st);position:absolute;left:0;top:-1px;width:25px;height:25px;background:var(--teal);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px}
  .pipe{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0}
  .pipe .s{flex:1;min-width:135px;background:#F0F5FC;border:1px solid #D3E1F5;border-radius:11px;padding:12px 13px}
  .pipe .s .n{display:inline-flex;width:23px;height:23px;border-radius:50%;background:var(--blue);color:#fff;align-items:center;justify-content:center;font-weight:800;font-size:12px;margin-bottom:6px}
  .pipe .s b{display:block;font-size:13.5px;line-height:1.4;margin-bottom:2px}
  .pipe .s small{color:var(--muted);font-size:12px}
  table{width:100%;border-collapse:collapse;background:#fff;border-radius:11px;overflow:hidden;box-shadow:var(--shadow);font-size:13.5px;margin:12px 0}
  th,td{padding:9px 12px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
  th{background:#EDF2F7;font-weight:700;font-size:12.5px}
  tr:last-child td{border-bottom:none}
  td code,.pin{background:#EEF2F6;padding:2px 7px;border-radius:5px;font-size:12.5px;color:var(--blue-deep);font-family:"Consolas",monospace}
  .cmd{background:#12161C;border-radius:11px;margin:12px 0;overflow:hidden;box-shadow:var(--shadow)}
  .cmd .bar{display:flex;align-items:center;gap:7px;padding:8px 13px;background:#0B0E13;border-bottom:1px solid #232A33}
  .cmd .bar .d{width:10px;height:10px;border-radius:50%}
  .cmd .bar .d.r{background:#F0625A}.cmd .bar .d.y{background:#F5BE4E}.cmd .bar .d.g{background:#5BC46A}
  .cmd .bar .t{margin-left:8px;font-size:11.5px;color:#7C8896}
  .cmd pre{padding:14px 15px;color:#E6EDF3;font-size:13px;line-height:1.62;overflow-x:auto;white-space:pre-wrap;word-break:break-word}
  .cmd pre .k{color:#C99BFF}.cmd pre .s{color:#9FE7B8}.cmd pre .c{color:#7C8896}.cmd pre .n{color:#7EC5FF}.cmd pre .f{color:#F5BE4E}
  .prompt{background:#F5F1FC;border:1px solid #DBCcF2;border-left:4px solid var(--violet);border-radius:10px;padding:12px 16px;margin:10px 0}
  .prompt .say{display:block;margin:5px 0;font-size:14.5px}
  .prompt .say b{color:var(--violet)}
  .prompt .why{color:var(--muted);font-size:13px;margin-left:22px}
  .note{border-radius:11px;padding:14px 17px;margin:14px 0;font-size:14.5px;border:1px solid}
  .note b{font-weight:800}
  .note.tip{background:#EAF6F3;border-color:#B7E0D8}.note.tip b{color:var(--teal)}
  .note.warn{background:#FDF4E6;border-color:#F0D9A8}.note.warn b{color:var(--amber)}
  .note.key{background:#EAF1FC;border-color:#C1D6F5}.note.key b{color:var(--blue-deep)}
  .note.mean{background:#FBF0F8;border-color:#E9C7DF}.note.mean b{color:#A63A82}
  kbd{background:#fff;border:1px solid #C7D0DA;border-bottom-width:2px;border-radius:6px;padding:2px 7px;font-size:12.5px;font-weight:700}
  footer{background:#12161C;color:#8A97A6;padding:26px 0;font-size:13px}
  footer b{color:#D6DEE7}
  @media print{body{background:#fff}section,.goal,.cmd,table,.pipe{break-inside:avoid}}
"""

def page(fname, grad, tagline, h1, sub, spans, body, foot):
    html = f"""<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{tagline} — {h1}</title>
<style>{CSS}
  header{{background:{grad}}}
</style></head><body>
<header><div class="wrap">
  <div class="tagline">{tagline}</div>
  <h1>{h1}</h1>
  <p>{sub}</p>
  <div class="hmeta">{spans}</div>
</div></header>
<div class="wrap">
{body}
</div>
<footer><div class="wrap">{foot}</div></footer>
</body></html>"""
    out = os.path.join(HERE, fname)
    with open(out, "w", encoding="utf-8") as f:
        f.write(_strip(html))
    print("WROTE", fname, len(html), "chars")

COMMON_FOOT = ('<b>UTTEC 교육</b> · 광주 AI·IoT 스마트팩토리 실습 「百見不如一習 · 직접 익히는 교육」 회차별 실습 가이드 (초보자용) '
    '&nbsp;|&nbsp; 접속·실행은 「노트북 VSCode 접속 설명서」, 원리는 「Claude가 회로를 읽고 실행하는 원리」 참고<br>'
    '<span style="opacity:.7">핀 번호·문법은 외우지 마세요. 하고 싶은 것을 한국어로 말하면 됩니다 — 나머지는 Claude가 돕습니다.</span>')

# ============================================================ 0회차
G0 = "linear-gradient(150deg,#3A2C6B,#6D4AC2 60%,#0E7C74 130%)"
body0 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표</h3>
  <b>프로그램을 짜기 전에</b>, 이 과정의 가장 중요한 습관 하나를 먼저 익힙니다 — <b>"내가 한 일을 기록하고, AI(Claude)에게 말로 시켜 노트를 채우는 법"</b>. 오늘은 하드웨어(키트)를 쓰지 않습니다. 대신 <b>평생 쓸 나만의 작업 기록장(현업 노트)</b>을 엽니다.</div>

  <section>
    <div class="badge"><span class="n">왜?</span><span class="k">이 시간이 왜 맨 앞에 있나</span></div>
    <h2>왜 "기록"부터 배우나요?</h2>
    <p class="lead">이 교육은 두 가지 <b>평생 자산</b>을 드립니다. 하나는 손에 쥐는 <b>실습 키트(하드웨어)</b>, 다른 하나는 눈에 안 보이는 <b>일하는 방법(기록 습관)</b>입니다. 오늘은 두 번째 자산의 첫 페이지를 엽니다.</p>
    <div class="pipe">
      <div class="s"><span class="n">1</span><b>재현</b><small>오늘 만든 걸 나중에 내 회사 설비에 <b>그대로 다시</b></small></div>
      <div class="s"><span class="n">2</span><b>인계</b><small>동료에게 <b>넘겨줄 때</b> 말 안 해도 노트만 보면 됨</small></div>
      <div class="s"><span class="n">3</span><b>개선</b><small>지난 기록을 보고 <b>다음엔 더 낫게</b></small></div>
    </div>
    <div class="note mean"><b>이 실습이 의미하는 것.</b> 회사에서 "그거 어떻게 했더라?"가 사라집니다. 기록이 남으면 <b>나도 편하고, 회사도 강해집니다.</b> 이게 UTTEC 교육이 추구하는 <b>"현업에 남는 교육"</b>의 핵심입니다.</div>
  </section>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">쉬운 말로</span></div>
    <h2>"현업 노트"가 뭐예요?</h2>
    <p>어려운 말로는 위키·볼트라고 하지만, 그냥 <b>"내 작업 기록장"</b>입니다. 폴더 몇 개로 이루어진, 컴퓨터 속 나만의 노트입니다.</p>
    <table>
      <tr><th>폴더</th><th>무엇을 담나</th><th>쉬운 비유</th></tr>
      <tr><td><code>작업일지</code></td><td>날짜별로 "오늘 한 일"</td><td>일기장</td></tr>
      <tr><td><code>배운것</code></td><td>새로 알게 된 개념 정리</td><td>공부 노트</td></tr>
      <tr><td><code>코드·설정값</code></td><td>명령어·코드·설정 모음</td><td>비법 수첩</td></tr>
      <tr><td><code>보관함</code></td><td>사진·데이터·완성 파일</td><td>서랍</td></tr>
    </table>
    <p>그리고 이 노트에는 <b>비서(Claude)</b>가 한 명 붙어 있습니다. 내가 <b>한국어로 부탁하면</b> 대신 노트를 써 주고, 정리해 주고, 개념을 쉽게 설명해 줍니다.</p>
  </section>

  <section>
    <div class="badge"><span class="n">실습</span><span class="k">따라 하기</span></div>
    <h2>실습: 내 노트를 열고, AI에게 처음 시켜보기</h2>
    <div class="note key"><b>준비.</b> 노트북에서 라즈베리파이에 접속한 뒤(→「노트북 VSCode 접속 설명서」), 아래 한 줄이면 내 노트와 비서가 함께 열립니다.</div>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">터미널에 입력</span></div>
    <pre><span class="c"># wiki 폴더로 이동하고, 그 폴더를 도와줄 AI(Claude)를 켠다</span>
cd ~/wiki && claude</pre></div>

    <h3>① 이 노트가 뭔지 물어보기</h3>
    <div class="prompt">
      <span class="say">🗣 <b>"이 위키가 무엇이고 폴더가 각각 뭘 담는지 쉽게 알려줘."</b></span>
      <span class="say">🗣 <b>"여기서 내가 뭘 어떻게 하면 되는지 처음이라 하나도 몰라. 쉽게 알려줘."</b></span>
      <span class="why">💡 Claude가 안내서를 읽고 폴더 구조를 설명해 줍니다. 처음 감을 잡는 단계.</span>
    </div>

    <h3>② 수업 시작 인사 (앞으로 매 수업 첫 명령)</h3>
    <div class="prompt">
      <span class="say">🗣 <b>/work-start</b></span>
      <span class="say">🗣 <b>"오늘이 며칠이고 몇 회차인지, 오늘 뭘 하는지 알려줘."</b></span>
      <span class="why">💡 앞으로 매 수업을 이 명령으로 시작합니다. 오늘 할 일을 짚어 줍니다.</span>
    </div>

    <h3>③ ⭐ 첫 기록 — 말로 부탁하면 AI가 대신 써 준다 (가장 중요)</h3>
    <div class="prompt">
      <span class="say">🗣 <b>"오늘 한 일 작업일지에 정리해줘. 오늘 내 현업위키를 처음 만들었고 Claude 쓰는 법을 배웠어."</b></span>
      <span class="why">💡 이 과정의 핵심 경험 — <b>손으로 안 써도, 말하면 노트가 채워집니다.</b></span>
    </div>
    <p>그러면 Claude가 <code>작업일지/</code> 안에 이런 노트를 대신 만들어 줍니다:</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">작업일지/0회차 2026-07-15.md (Claude가 자동 생성)</span></div>
    <pre><span class="f"># 0회차 — 나만의 현업위키 만들기</span>
<span class="c">날짜: 2026-07-15</span>

<span class="s">## 오늘 한 일</span>
- 내 현업위키(작업 기록장)를 처음 열었다.
- Claude에게 한국어로 부탁하는 법을 배웠다.

<span class="s">## 배운 것</span>
- 기록하는 이유 = 재현 · 인계 · 개선</pre></div>

    <h3>④ 왜 기록하는지 노트로 남기기</h3>
    <div class="prompt">
      <span class="say">🗣 <b>"왜 현업 위키를 쓰는지 쉽게 설명하고 「배운것」에 정리해줘."</b></span>
      <span class="why">💡 기록의 이유(재현·인계·개선)를 내 노트의 첫 개념 노트로 남깁니다.</span>
    </div>

    <h3>⑤ 마무리 (앞으로 매 수업 끝)</h3>
    <div class="prompt">
      <span class="say">🗣 <b>/work-end</b></span>
      <span class="why">💡 오늘 기록을 마무리·백업합니다.</span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">더</span><span class="k">막히면 이렇게</span></div>
    <h2>막히면 이렇게 말하세요</h2>
    <ul class="plain">
      <li>🗣 "앞으로 내가 너한테 <b>어떻게 부탁하면 되는지</b> 쉬운 예시를 몇 개 알려줘."</li>
      <li>🗣 "회차별로 <b>뭘 물어보면 되는지</b>는 어디서 봐?" → <b>「프롬프트」 폴더</b>를 열면 회차별 예시가 있습니다.</li>
      <li>🗣 "방금 그 <b>명령이 뭘 하는 건지</b> 설명해줘."</li>
    </ul>
    <div class="note tip"><b>기억할 한 가지.</b> 프롬프트(주문)는 정답이 아니라 <b>예시</b>입니다. <b>내 말투로 편하게</b> 바꿔 말해도 다 알아듣습니다.</div>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">추구</span><span class="k">본 교육이 추구하는 것</span></div>
    <h2>오늘의 한 줄, 그리고 5주 뒤</h2>
    <p>오늘 익힌 것: <b>기록하는 습관 + AI에게 말로 시키는 법.</b> 키트(하드웨어)는 다음 시간부터입니다.</p>
    <div class="note mean"><b>이 노트가 향하는 곳.</b> 5주 동안 이 노트에 배운 것을 쌓으면, 마지막 날 Claude가 그 노트를 전부 읽고 <b>"내 회사에 바로 쓸 1페이지 가이드"</b>로 만들어 줍니다. 이 위키는 <b>수료 후에도, 현업에서도 계속 쓰는 평생 자산</b>입니다. — 다음 시간엔 진짜 라즈베리파이를 켭니다! 🍓</div>
  </section>
"""
page("0회차_나만의_현업위키_만들기.html", G0,
     "0회차 · 나만의 현업위키 만들기 (도입)",
     "0회차 — 나만의 현업위키 만들기",
     "코드도 회로도 몰라도 괜찮습니다. 오늘은 이 과정에서 가장 오래 남을 습관 — <b>기록하는 법과 AI에게 말로 시키는 법</b> — 을 익힙니다.",
     '<span>대상 · <b>완전 초보자</b></span><span>준비물 · <b>노트북만</b></span><span>키워드 · <b>현업노트 · Claude</b></span>',
     body0, COMMON_FOOT)

# ============================================================ 1회차
G1 = "linear-gradient(150deg,#123A6B,#1B4894 60%,#0E7C74 130%)"
body1 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표</h3>
  <b>라즈베리파이를 켜서 내 노트북으로 원격 접속</b>하고, <b>파이썬으로 첫 프로그램</b>을 실행합니다. 오늘의 마지막엔 "내가 만든 첫 프로그램"을 시연합니다.</div>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">회로 몰라도 OK</span></div>
    <h2>라즈베리파이가 뭐예요?</h2>
    <p class="lead">라즈베리파이는 <b>손바닥만 한 작은 컴퓨터</b>입니다. 우리가 쓰는 노트북과 하는 일은 같은데, 크기가 작고 <b>옆구리에 40개의 금색 다리(핀)</b>가 있어서 <b>전등·센서·부저 같은 부품을 직접 연결</b>할 수 있다는 점이 다릅니다.</p>
    <table>
      <tr><th></th><th>일반 컴퓨터</th><th>라즈베리파이</th></tr>
      <tr><td>크기</td><td>큼</td><td>손바닥</td></tr>
      <tr><td>부품 직접 연결</td><td>어려움</td><td><b>쉬움 (40핀)</b></td></tr>
      <tr><td>공장 현장에 두기</td><td>부담</td><td><b>딱 좋음 (싸고 작음)</b></td></tr>
    </table>
    <div class="note key"><b>UTTEC 키트 = 라즈베리파이 + UTTEC Shield.</b> Shield(실드)는 라즈베리파이 위에 딱 끼우는 판인데, 여기에 <b>온습도 센서·화면(OLED)·LED 3색·부저·스피커·버튼·네오픽셀</b>이 이미 붙어 있습니다. 그래서 <b>배선을 직접 안 해도</b> 바로 실습할 수 있습니다. (2회차부터 사용)</div>
  </section>

  <section>
    <div class="badge"><span class="n">실습①</span><span class="k">켜고 연결하기</span></div>
    <h2>실습 ①: 켜고 · Wi-Fi 확인 · 원격 접속</h2>
    <ol class="steps">
      <li><b>전원(USB-C)만 꽂기</b> → 빨간 불이 들어오면 켜진 것입니다. (모니터·키보드 필요 없음!)</li>
      <li><b>내 노트북을 Wi-Fi <code>uttec200</code> 에 연결</b> (비번도 <code>uttec200</code>).</li>
      <li><b>노트북에서 원격 접속</b> — 자세한 방법은 「노트북 VSCode 접속 설명서」 참고.</li>
    </ol>
    <p>접속되면 아래 명령으로 <b>지금 라즈베리파이가 네트워크에 잘 붙었는지</b> 확인할 수 있습니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">터미널에 입력 (내 파이의 주소 확인)</span></div>
    <pre>hostname -I     <span class="c"># 내 라즈베리파이의 IP 주소가 나옵니다 (예: 192.168.200.17)</span></pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"라즈베리파이 처음 켤 때 순서를 알려줘."</b></span>
      <span class="say">🗣 <b>"화면이 안 나오는데 뭘 확인해야 해?"</b></span>
      <span class="why">💡 안 되면 "뭘 확인해?"라고 물으면 Claude가 하나씩 짚어 줍니다.</span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습②</span><span class="k">첫 프로그램</span></div>
    <h2>실습 ②: 화면에 글자 띄우기 — 첫 파이썬</h2>
    <p>컴퓨터에게 "이 글자를 보여줘"라고 시키는 명령이 <code>print</code> 입니다. 딱 한 줄로 첫 프로그램이 됩니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — hello.py</span></div>
    <pre><span class="k">print</span>(<span class="s">"Hello Factory!"</span>)   <span class="c"># 화면에 Hello Factory! 라고 출력</span></pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"화면에 Hello Factory! 라고 출력하는 파이썬 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"이 코드가 한 줄씩 무슨 뜻인지 쉽게 설명해줘."</b></span>
      <span class="why">💡 '따라치기'가 아니라 <b>각 줄의 뜻을 이해</b>하는 게 목표입니다.</span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습③</span><span class="k">변수와 계산기</span></div>
    <h2>실습 ③: 변수 이해하고 · 간단한 계산기 만들기</h2>
    <p><b>변수</b>는 값을 담아두는 <b>이름표 붙은 상자</b>입니다. 예: <code>name</code> 이라는 상자에 "홍길동"을 넣어 둡니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 변수</span></div>
    <pre>name = <span class="s">"홍길동"</span>       <span class="c"># name 상자에 글자를 담기</span>
age  = <span class="n">30</span>            <span class="c"># age 상자에 숫자를 담기</span>
<span class="k">print</span>(name, age)     <span class="c"># 홍길동 30</span></pre></div>
    <h4>간단한 계산기 (숫자 입력받아 더하기)</h4>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — calculator.py</span></div>
    <pre>a = <span class="k">int</span>(<span class="k">input</span>(<span class="s">"첫 번째 숫자: "</span>))   <span class="c"># 키보드로 숫자 입력 (int=숫자로 바꾸기)</span>
b = <span class="k">int</span>(<span class="k">input</span>(<span class="s">"두 번째 숫자: "</span>))
<span class="k">print</span>(<span class="s">"합계 ="</span>, a + b)              <span class="c"># 두 수를 더해 출력</span></pre></div>
    <div class="note tip"><b>왜 <code>int()</code> 가 필요할까?</b> 키보드로 친 값은 컴퓨터가 처음엔 <b>글자</b>로 받습니다. "3"+"5"는 "35"가 되어버려요. <code>int()</code> 로 <b>숫자로 바꿔줘야</b> 3+5=8 이 됩니다. (숫자와 글자의 차이!)</div>
    <div class="prompt">
      <span class="say">🗣 <b>"변수가 뭔지 쉬운 비유로 설명해줘."</b></span>
      <span class="say">🗣 <b>"두 숫자를 더하는 아주 간단한 계산기를 초보용으로 만들어줘."</b></span>
      <span class="say">🗣 <b>"이 계산기 코드를 「코드·설정값」에 저장해줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">현업노트</span><span class="k">오늘의 기록</span></div>
    <h2>현업노트: 노트 시작</h2>
    <div class="prompt">
      <span class="say">🗣 <b>"오늘 한 일 작업일지에 정리해줘. 라즈베리파이 켜고 Hello Factory 출력하고 계산기 만들었어."</b></span>
      <span class="why">💡 오늘의 성과를 첫 「작업 일지」로 남깁니다. 한 줄이면 충분합니다.</span>
    </div>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">의미</span><span class="k">이 시간의 의미 · 다음 예고</span></div>
    <h2>오늘의 의미</h2>
    <div class="note mean"><b>이 실습이 의미하는 것.</b> 오늘 여러분은 <b>작은 컴퓨터를 직접 켜고, 명령으로 움직였습니다.</b> 앞으로 이 컴퓨터에 센서·불·소리를 붙여 <b>"스스로 판단하는 미니 공장"</b>을 만듭니다. 오늘은 그 1일차 — <b>공장을 깨운 날</b>입니다.</div>
    <p><b>다음 시간(2회차) 예고:</b> 이 공장에 <b>눈과 귀(센서)</b> 를 달아, 스스로 온도를 느끼고 화면과 색으로 보여주게 만듭니다.</p>
  </section>
"""
page("1회차_라즈베리파이_친해지기.html", G1,
     "1회차 · 라즈베리파이와 친해지기",
     "1회차 — 라즈베리파이와 친해지기",
     "작은 컴퓨터를 처음 켜고, 내 노트북으로 원격 접속해, <b>파이썬 첫 프로그램</b>을 실행합니다.",
     '<span>회차 · <b>1주차</b></span><span>준비물 · <b>키트 · 노트북</b></span><span>결과물 · <b>Hello Factory! · 계산기</b></span>',
     body1, COMMON_FOOT)

# ============================================================ 2회차
G2 = "linear-gradient(150deg,#0E5A52,#0E9488 55%,#2563C9 130%)"
body2 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표</h3>
  공장에 <b>눈과 귀</b>를 답니다 — <b>온습도 센서로 값을 읽어 → OLED 화면에 표시 → LED 신호등·네오픽셀 색으로 표현</b>. 오늘부터 <b>진짜 하드웨어(보드)</b>를 씁니다.</div>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">회로 몰라도 OK</span></div>
    <h2>GPIO와 I2C — 부품은 어떻게 연결되나</h2>
    <p><b>GPIO</b> = 라즈베리파이 옆구리의 <b>금색 다리(핀)</b>. 이 다리에 전기를 흘리면(<b>출력</b>) LED가 켜지고, 다리로 들어오는 전기를 읽으면(<b>입력</b>) 버튼이 눌렸는지 압니다.</p>
    <p><b>I2C</b> = <b>단 두 개의 선</b>(SDA·SCL)으로 여러 부품과 대화하는 방법. 온습도 센서와 화면(OLED)이 이 방식을 씁니다.</p>
    <div class="note key"><b>회로는 이미 정해져 있습니다.</b> UTTEC Shield는 표준 설계라, <b>어떤 부품이 몇 번 핀</b>인지 고정돼 있습니다. 그래서 여러분은 핀 번호를 외울 필요가 없고, Claude가 이미 알고 있습니다. (자세한 원리 → 「Claude가 회로를 읽고 실행하는 원리」)</div>
    <h4>오늘 쓰는 부품과 핀 (참고용 — 외우지 마세요)</h4>
    <table>
      <tr><th>부품</th><th>핀 (GPIO)</th><th>하는 일</th></tr>
      <tr><td>🌡️ 온습도 센서 AHT20</td><td><span class="pin">I2C (2·3)</span></td><td>온도·습도 측정 (눈·귀)</td></tr>
      <tr><td>🖥️ OLED 화면</td><td><span class="pin">I2C (2·3)</span></td><td>숫자·글자 표시</td></tr>
      <tr><td>🔴🟡🔵 LED 3색</td><td><span class="pin">17 / 27 / 22</span></td><td>신호등</td></tr>
      <tr><td>🌈 네오픽셀 WS2812 ×4</td><td><span class="pin">12</span></td><td>색으로 표현</td></tr>
      <tr><td>🔔 부저 / 🔘 버튼</td><td><span class="pin">5 / 4</span></td><td>소리 / 입력</td></tr>
    </table>
  </section>

  <section>
    <div class="badge"><span class="n">먼저</span><span class="k">보드 점검</span></div>
    <h2>실습 시작 전: 보드가 잘 되나 점검</h2>
    <p>새 부품을 여러 개 쓰니, 먼저 <b>검사 스킬</b>로 보드 전체를 자동 점검합니다. 합격/불합격이 표로 나옵니다.</p>
    <div class="prompt">
      <span class="say">🗣 <b>/hardwareTest</b> <span class="why">— 보드 전체 한 번에 점검</span></span>
      <span class="say">🗣 <b>/led · /buzzer · /button · /aht20 · /oled · /ws2812</b> <span class="why">— 특정 부품만 콕 집어 점검</span></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습①</span><span class="k">LED · 버튼</span></div>
    <h2>실습 ①: LED 신호등 · 버튼 입력</h2>
    <p><b>gpiozero</b> 라는 쉬운 도구로 LED를 켭니다. (우리 키트 LED는 <code>active_high=False</code> 로 동작합니다 — Claude가 알아서 넣어줍니다.)</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 신호등 순서대로 켜기</span></div>
    <pre><span class="k">from</span> gpiozero <span class="k">import</span> LED
<span class="k">from</span> time <span class="k">import</span> sleep

red    = LED(<span class="n">17</span>, active_high=<span class="k">False</span>)   <span class="c"># 빨강</span>
yellow = LED(<span class="n">27</span>, active_high=<span class="k">False</span>)   <span class="c"># 노랑</span>
blue   = LED(<span class="n">22</span>, active_high=<span class="k">False</span>)   <span class="c"># 파랑</span>

<span class="k">for</span> led <span class="k">in</span> (red, yellow, blue):
    led.on();  sleep(<span class="n">0.5</span>)               <span class="c"># 0.5초 켜고</span>
    led.off()                            <span class="c"># 끄고 다음 색으로</span></pre></div>
    <h4>버튼을 누르면 LED 켜기</h4>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 버튼 입력</span></div>
    <pre><span class="k">from</span> gpiozero <span class="k">import</span> Button, LED
btn = Button(<span class="n">4</span>)
red = LED(<span class="n">17</span>, active_high=<span class="k">False</span>)
btn.when_pressed  = red.on          <span class="c"># 누르면 켜짐</span>
btn.when_released = red.off         <span class="c"># 떼면 꺼짐</span></pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"빨강·노랑·파랑 LED를 순서대로 켜는 파이썬 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"버튼을 누르면 LED가 켜지는 코드를 알려줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습②</span><span class="k">핵심</span></div>
    <h2>실습 ②: 온습도 → 화면(OLED) + 색(네오픽셀)</h2>
    <p>오늘의 핵심 결과물입니다. 센서가 읽은 <b>숫자</b>를 <b>화면과 색</b>으로 보여줍니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 온습도 읽어 OLED에 표시</span></div>
    <pre><span class="k">import</span> board, busio, adafruit_ahtx0
<span class="k">from</span> luma.core.interface.serial <span class="k">import</span> i2c
<span class="k">from</span> luma.oled.device <span class="k">import</span> sh1106
<span class="k">from</span> luma.core.render <span class="k">import</span> canvas
<span class="k">from</span> time <span class="k">import</span> sleep

sensor = adafruit_ahtx0.AHTx0(busio.I2C(board.SCL, board.SDA))   <span class="c"># 온습도 센서</span>
oled   = sh1106(i2c(port=<span class="n">1</span>, address=<span class="n">0x3C</span>))                  <span class="c"># OLED 화면</span>

<span class="k">while</span> <span class="k">True</span>:
    t = sensor.temperature            <span class="c"># 온도 읽기</span>
    h = sensor.relative_humidity      <span class="c"># 습도 읽기</span>
    <span class="k">with</span> canvas(oled) <span class="k">as</span> draw:
        draw.text((<span class="n">0</span>, <span class="n">0</span>),  <span class="f">f</span><span class="s">"온도 {t:.1f} C"</span>, fill=<span class="s">"white"</span>)
        draw.text((<span class="n">0</span>, <span class="n">20</span>), <span class="f">f</span><span class="s">"습도 {h:.1f} %"</span>, fill=<span class="s">"white"</span>)
    sleep(<span class="n">2</span>)                          <span class="c"># 2초마다 갱신</span></pre></div>
    <h4>온도에 따라 네오픽셀 색 바꾸기 (시원=파랑 / 더움=빨강)</h4>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — WS2812 색 연동 (키트 헬퍼 uttec_neopixel 사용)</span></div>
    <pre><span class="k">import</span> uttec_neopixel <span class="k">as</span> npx
color = (<span class="n">0</span>,<span class="n">0</span>,<span class="n">255</span>) <span class="k">if</span> t &lt; <span class="n">28</span> <span class="k">else</span> (<span class="n">255</span>,<span class="n">0</span>,<span class="n">0</span>)   <span class="c"># 28도 기준 파랑/빨강</span>
<span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(<span class="n">4</span>):
    npx.set_pixel(i, *color)                            <span class="c"># 4개 픽셀 모두</span></pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"온습도 센서 값을 읽어 OLED 화면에 보여주는 파이썬 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"온도에 따라 네오픽셀 색을 바꾸는 코드도 추가해줘. 시원하면 파랑, 더우면 빨강."</b></span>
      <span class="say">🗣 <b>"이 코드가 한 줄씩 무슨 뜻인지 쉽게 설명해줘."</b></span>
    </div>
    <div class="note tip"><b>🖐 손으로 체험.</b> 센서를 손으로 감싸면 <b>화면 숫자가 올라가고 색이 빨강으로</b> 바뀝니다. "센서가 진짜 느끼는구나!"를 눈으로 확인하세요.</div>
  </section>

  <section>
    <div class="badge"><span class="n">심화</span><span class="k">여유 있는 조 도전</span></div>
    <h2>심화 실습 — 오늘 부품만으로 8가지 도전</h2>
    <p class="lead">기본 실습을 끝낸 분을 위한 추가 과제입니다. 전부 <b>오늘 쓴 부품(센서·OLED·LED·부저·스피커·버튼·네오픽셀)</b> 만 씁니다. ★ 난이도 순.</p>
    <table>
      <tr><th>#</th><th>도전 과제</th><th>난이도</th><th>쓰는 부품</th></tr>
      <tr><td>①</td><td>OLED에 온·습도를 <b>막대그래프</b>로 표시</td><td>★☆☆</td><td>센서·OLED</td></tr>
      <tr><td>②</td><td><b>WS2812 온도계</b> — 더울수록 켜지는 픽셀 개수 ↑</td><td>★☆☆</td><td>센서·네오픽셀</td></tr>
      <tr><td>③</td><td>버튼 누를 때마다 <b>화면 모드 전환</b>(온도→습도→둘다)</td><td>★★☆</td><td>버튼·OLED</td></tr>
      <tr><td>④</td><td>온도 구간별 <b>부저 경고 패턴</b> 다르게 (삐/삐삐/연속)</td><td>★★☆</td><td>센서·부저</td></tr>
      <tr><td>⑤</td><td>버튼으로 <b>LED 색 순환</b> (빨→노→파→꺼짐)</td><td>★☆☆</td><td>버튼·LED</td></tr>
      <tr><td>⑥</td><td>온도에 따라 <b>다른 멜로디</b> 재생</td><td>★★☆</td><td>센서·스피커</td></tr>
      <tr><td>⑦</td><td>버튼으로 <b>여러 곡 골라</b> 재생</td><td>★★☆</td><td>버튼·스피커</td></tr>
      <tr><td>⑧</td><td><b>나만의 멜로디 작곡 + LED 싱크</b> 라이트쇼</td><td>★★★</td><td>스피커·LED·네오픽셀</td></tr>
    </table>
    <h4>예: ② WS2812 온도계 (더울수록 픽셀 ↑)</h4>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 심화② 발췌</span></div>
    <pre><span class="k">import</span> uttec_neopixel <span class="k">as</span> npx
levels = [(<span class="n">25</span>,<span class="n">0</span>),(<span class="n">28</span>,<span class="n">1</span>),(<span class="n">31</span>,<span class="n">2</span>),(<span class="n">34</span>,<span class="n">3</span>),(<span class="n">999</span>,<span class="n">4</span>)]     <span class="c"># 온도 구간 → 켤 개수</span>
colors = [(<span class="n">0</span>,<span class="n">0</span>,<span class="n">255</span>),(<span class="n">0</span>,<span class="n">255</span>,<span class="n">0</span>),(<span class="n">255</span>,<span class="n">255</span>,<span class="n">0</span>),(<span class="n">255</span>,<span class="n">0</span>,<span class="n">0</span>)]
n = <span class="k">next</span>(k <span class="k">for</span> th,k <span class="k">in</span> levels <span class="k">if</span> t &lt; th)
npx.off()
<span class="k">for</span> i <span class="k">in</span> <span class="k">range</span>(n):
    npx.set_pixel(i, *colors[<span class="k">min</span>(i,<span class="n">3</span>)])</pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"WS2812 4개를 온도계처럼, 더울수록 켜지는 개수가 늘게 만들어줘."</b></span>
      <span class="say">🗣 <b>"버튼 누를 때마다 OLED 화면을 온도→습도→둘다로 바꿔줘."</b></span>
      <span class="why">💡 심화 과제는 힌트만 있습니다. 위처럼 말로 부탁하면 Claude가 코드를 만들어 줍니다.</span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">현업노트</span><span class="k">오늘의 기록</span></div>
    <h2>현업노트: 장비/부품 카드</h2>
    <div class="prompt">
      <span class="say">🗣 <b>"오늘 쓴 부품을 「장비카드」로 정리해줘. AHT20 센서랑 OLED 화면, 핀이랑 짧은 코드도 같이."</b></span>
      <span class="why">💡 부품 1개 = 카드 1장. 내 회사 설비도 이렇게 카드로 정리하면 <b>고장·교체 때 빠릅니다.</b></span>
    </div>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">의미</span><span class="k">이 시간의 의미 · 다음 예고</span></div>
    <h2>오늘의 의미</h2>
    <div class="note mean"><b>이 실습이 의미하는 것.</b> 오늘 공장은 <b>눈과 귀</b>를 얻었습니다 — 온도·습도를 <b>숫자로 측정</b>하고 화면·색으로 보여줍니다. 공장 자동화의 첫걸음은 언제나 <b>"현장을 데이터로 만드는 것"</b> 입니다. 측정할 수 있어야 관리할 수 있습니다.</div>
    <p><b>다음 시간(3회차) 예고:</b> 이제 공장이 <b>스스로 판단</b>하게 만듭니다. "온도가 위험하면 자동으로 빨간불·경보!"</p>
  </section>
"""
page("2회차_공장의_눈과_귀.html", G2,
     "2회차 · 공장의 눈과 귀 만들기",
     "2회차 — 공장의 눈과 귀 만들기",
     "온습도 센서로 값을 읽어 <b>화면(OLED)에 표시</b>하고, <b>LED 신호등·네오픽셀 색</b>으로 표현합니다. 오늘부터 진짜 보드를 씁니다.",
     '<span>회차 · <b>2주차</b></span><span>부품 · <b>센서·OLED·LED·네오픽셀·부저·버튼</b></span>',
     body2, COMMON_FOOT)

# ============================================================ 3회차
G3 = "linear-gradient(150deg,#6B2C2C,#C64236 55%,#C8811A 130%)"
body3 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표</h3>
  공장이 <b>스스로 판단</b>하게 만듭니다 — <b>기준값(임계값)으로 정상/주의/위험을 자동 구분 → LED·부저 경보 → 측정값을 파일(CSV)로 저장</b>.</div>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">쉬운 말로</span></div>
    <h2>"기준값(임계값)"이 뭐예요?</h2>
    <p><b>기준값</b> = 정상과 위험을 가르는 <b>선</b>입니다. 예: "온도 35도를 넘으면 위험". 사람이 계속 지켜보지 않아도, 컴퓨터가 이 선을 기준으로 <b>스스로 판단</b>합니다.</p>
    <div class="pipe">
      <div class="s"><span class="n" style="background:#2563C9">정상</span><b>28도 미만</b><small>🔵 파란불</small></div>
      <div class="s"><span class="n" style="background:#C8811A">주의</span><b>28~35도</b><small>🟡 노란불</small></div>
      <div class="s"><span class="n" style="background:#C64236">위험</span><b>35도 이상</b><small>🔴 빨간불 + 🔔 경보</small></div>
    </div>
    <div class="note key"><b>조건문 <code>if</code>.</b> "만약 온도가 35 이상이면 → 빨간불" 처럼, 컴퓨터가 <b>상황에 따라 다르게 행동</b>하게 하는 명령이 <code>if</code> 입니다. 오늘의 핵심 문법입니다.</div>
  </section>

  <section>
    <div class="badge"><span class="n">실습①</span><span class="k">자동 판단</span></div>
    <h2>실습 ①: 정상/주의/위험 자동 판단 + 경보</h2>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 기준값 판단 + 부저 경보</span></div>
    <pre><span class="k">from</span> gpiozero <span class="k">import</span> LED, Buzzer
<span class="k">import</span> board, busio, adafruit_ahtx0
<span class="k">from</span> time <span class="k">import</span> sleep

red    = LED(<span class="n">17</span>, active_high=<span class="k">False</span>)
yellow = LED(<span class="n">27</span>, active_high=<span class="k">False</span>)
blue   = LED(<span class="n">22</span>, active_high=<span class="k">False</span>)
buzzer = Buzzer(<span class="n">5</span>)
sensor = adafruit_ahtx0.AHTx0(busio.I2C(board.SCL, board.SDA))

<span class="k">while</span> <span class="k">True</span>:
    t = sensor.temperature
    blue.value   = (t &lt; <span class="n">28</span>)              <span class="c"># 정상</span>
    yellow.value = (<span class="n">28</span> &lt;= t &lt; <span class="n">35</span>)        <span class="c"># 주의</span>
    red.value    = (t &gt;= <span class="n">35</span>)             <span class="c"># 위험</span>
    <span class="k">if</span> t &gt;= <span class="n">35</span>:
        buzzer.on()                     <span class="c"># 위험 → 경보음</span>
    <span class="k">else</span>:
        buzzer.off()
    sleep(<span class="n">1</span>)</pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"온도가 정상/주의/위험이면 각각 파란/노란/빨간 LED를 켜고, 위험이면 부저도 울리는 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"이 코드에서 판단하는 부분을 한 줄씩 쉽게 설명해줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습②</span><span class="k">데이터 저장</span></div>
    <h2>실습 ②: 측정값을 파일(CSV)로 저장</h2>
    <p><b>CSV</b> = 엑셀로 열 수 있는 <b>표 형태의 텍스트 파일</b>입니다. 측정값을 계속 쌓아두면 나중에 그래프·분석에 씁니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — CSV 저장</span></div>
    <pre><span class="k">import</span> csv, datetime
now = datetime.datetime.now().isoformat()      <span class="c"># 지금 시각</span>
<span class="k">with</span> <span class="k">open</span>(<span class="s">"factory_log.csv"</span>, <span class="s">"a"</span>, newline=<span class="s">""</span>) <span class="k">as</span> f:
    csv.writer(f).writerow([now, t, h])        <span class="c"># [시각, 온도, 습도] 한 줄 추가</span></pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"측정한 온습도를 CSV 파일로 저장하는 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"저장한 CSV를 엑셀로 여는 법을 알려줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습③</span><span class="k">통합</span></div>
    <h2>실습 ③: 통합 경보 시스템 (LED + 부저 + OLED)</h2>
    <p>오늘 만든 조각을 하나로 합칩니다 — 판단 결과를 <b>불·소리·화면 글자</b>로 함께 보여줍니다.</p>
    <div class="prompt">
      <span class="say">🗣 <b>"온도로 정상/주의/위험을 판단해 LED + 부저 + OLED에 상태 글자까지 함께 보여주는 코드를 알려줘."</b></span>
      <span class="say">🗣 <b>"이 통합 코드를 「코드·설정값」에 저장해줘."</b></span>
    </div>
    <div class="note tip"><b>🖐 손난로 체험.</b> 손난로로 센서를 데우면, 온도가 올라가며 <b>파랑→노랑→빨강</b>으로 바뀌고 <b>부저가 자동으로</b> 울립니다. 아무도 안 건드렸는데 공장이 스스로 판단합니다!</div>
  </section>

  <section>
    <div class="badge"><span class="n">현업노트</span><span class="k">오늘의 기록</span></div>
    <h2>현업노트: 결정 메모 + 보관함</h2>
    <div class="prompt">
      <span class="say">🗣 <b>"기준값을 왜 그렇게 정했는지 「배운것」에 결정 메모로 남겨줘. 우리 작업장 평상시가 27~28도라서라고."</b></span>
      <span class="say">🗣 <b>"만든 CSV 파일을 「보관함」에 정리해줘."</b></span>
      <span class="why">💡 "왜 그렇게 정했나"를 남기면 나중에 바꿀 때·인수인계·감사에 강합니다.</span>
    </div>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">의미</span><span class="k">이 시간의 의미 · 다음 예고</span></div>
    <h2>오늘의 의미</h2>
    <div class="note mean"><b>이 실습이 의미하는 것.</b> 공장이 이제 <b>스스로 판단하고 경고</b>합니다. 이것이 <b>"자동화"</b>의 본질입니다 — 사람이 24시간 지켜보지 않아도 되고, <b>기록(CSV)</b>이 남아 나중에 분석·개선할 수 있습니다.</div>
    <p><b>다음 시간(4회차) 예고:</b> 이제 공장을 <b>멀리서</b> 봅니다. 내 스마트폰으로 실시간 그래프를 보고, 무선(LoRa)으로 멀리 떨어진 데이터도 받아옵니다.</p>
  </section>
"""
page("3회차_자동경보시스템.html", G3,
     "3회차 · 자동으로 위험을 알리는 시스템",
     "3회차 — 자동 경보 시스템",
     "<b>기준값</b>으로 정상/주의/위험을 자동 판단하고, <b>LED·부저로 경보</b>하며, 측정값을 <b>파일(CSV)로 저장</b>합니다.",
     '<span>회차 · <b>3주차</b></span><span>키워드 · <b>기준값 · if · 경보 · CSV</b></span>',
     body3, COMMON_FOOT)

# ============================================================ 4회차
G4 = "linear-gradient(150deg,#123A6B,#2563C9 55%,#6D4AC2 130%)"
body4 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표</h3>
  공장을 <b>멀리서</b> 봅니다 — <b>웹 대시보드를 내 스마트폰으로 열기 → 실시간 그래프 → 장거리 무선(LoRa)</b>으로 떨어진 데이터 받기.</div>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">쉬운 말로</span></div>
    <h2>"폰에서 공장 보기"가 어떻게 가능해요?</h2>
    <p>라즈베리파이가 <b>작은 웹사이트(서버)</b>를 하나 띄웁니다. 그러면 <b>같은 Wi-Fi에 있는 내 폰</b>이 그 주소로 접속해, 공장 상태를 볼 수 있습니다. 인터넷 없이 교육장 Wi-Fi 안에서만 동작합니다.</p>
    <div class="pipe">
      <div class="s"><span class="n">1</span><b>파이 = 작은 웹사이트</b><small>온습도를 보여주는 페이지를 띄움</small></div>
      <div class="s"><span class="n">2</span><b>주소(IP)</b><small>파이의 주소 예: 192.168.200.17:5000</small></div>
      <div class="s"><span class="n">3</span><b>폰으로 접속</b><small>같은 Wi-Fi 폰 브라우저로 열기</small></div>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습①</span><span class="k">핵심</span></div>
    <h2>실습 ①: 웹 대시보드 띄우고 폰으로 접속</h2>
    <p><b>Flask</b> 라는 도구로 아주 작은 웹사이트를 만듭니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — dashboard.py</span></div>
    <pre><span class="k">from</span> flask <span class="k">import</span> Flask
<span class="k">import</span> board, busio, adafruit_ahtx0
sensor = adafruit_ahtx0.AHTx0(busio.I2C(board.SCL, board.SDA))
app = Flask(__name__)

<span class="k">@app.route</span>(<span class="s">"/"</span>)
<span class="k">def</span> home():
    t = sensor.temperature
    h = sensor.relative_humidity
    <span class="k">return</span> <span class="f">f</span><span class="s">"&lt;h1&gt;온도 {t:.1f}C / 습도 {h:.1f}%&lt;/h1&gt;"</span>

app.run(host=<span class="s">"0.0.0.0"</span>, port=<span class="n">5000</span>)   <span class="c"># 0.0.0.0 = 폰에서도 접속 허용</span></pre></div>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">터미널 — 내 파이 주소 확인 후 폰에서 접속</span></div>
    <pre>hostname -I          <span class="c"># 예: 192.168.200.17  →  폰 브라우저에 192.168.200.17:5000 입력</span></pre></div>
    <div class="note warn"><b>폰에서 안 열릴 때.</b> ① 폰과 파이가 <b>같은 Wi-Fi(uttec200)</b> 인지 ② 코드에 <code>host="0.0.0.0"</code> 이 있는지 ③ 주소 뒤 <code>:5000</code> 을 붙였는지 확인. 막히면 그대로 Claude에게 물어보세요.</div>
    <div class="prompt">
      <span class="say">🗣 <b>"온습도를 보여주는 웹 대시보드를 Flask로 띄우는 코드를 초보용으로 알려줘."</b></span>
      <span class="say">🗣 <b>"내 파이의 주소(IP) 확인법과, 폰에서 접속하는 법을 알려줘."</b></span>
      <span class="say">🗣 <b>"폰에서 접속이 안 돼. 뭘 확인해야 해?"</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습②</span><span class="k">그래프</span></div>
    <h2>실습 ②: 실시간 온도 그래프</h2>
    <p>숫자뿐 아니라 <b>그래프</b>로 추세를 봅니다. 몇 초마다 자동으로 갱신되게 만듭니다. (Chart.js 라는 그래프 도구를 씁니다 — Claude가 붙여 줍니다.)</p>
    <div class="prompt">
      <span class="say">🗣 <b>"대시보드에 실시간 온도 그래프를 추가하는 법을 쉽게 알려줘."</b></span>
      <span class="say">🗣 <b>"그래프가 몇 초마다 자동 갱신되게 하려면 어떻게 해?"</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">실습③</span><span class="k">장거리 무선</span></div>
    <h2>실습 ③: 장거리 무선 — LoRa</h2>
    <p><b>LoRa</b>는 <b>멀리(수백 m~km)까지 조금씩</b> 데이터를 보내는 무선입니다. Wi-Fi가 안 닿는 넓은 공장·야외에 쓰기 좋습니다.</p>
    <table>
      <tr><th></th><th>Wi-Fi</th><th>LoRa</th></tr>
      <tr><td>거리</td><td>수십 m</td><td><b>수백 m ~ km</b></td></tr>
      <tr><td>속도</td><td>빠름</td><td>느림(조금씩)</td></tr>
      <tr><td>쓰임</td><td>대시보드·영상</td><td><b>멀리 있는 센서값</b></td></tr>
    </table>
    <div class="prompt">
      <span class="say">🗣 <b>/lora</b> <span class="why">— LoRa 모듈이 통신되는지 먼저 확인</span></span>
      <span class="say">🗣 <b>"LoRa가 Wi-Fi와 뭐가 다른지 쉽게 설명하고 「배운것」에 정리해줘."</b></span>
      <span class="say">🗣 <b>"옆 사람 보드가 보낸 데이터를 내 파이에서 받아 화면·대시보드에 보여주는 법을 알려줘."</b></span>
    </div>
    <div class="note key"><b>참고.</b> LoRa 모듈(E22)은 설정이 예민해서 <b>강사가 미리 검증한 모듈</b>을 씁니다. 무선 기술 상세는 담당 자료(lora)를 따릅니다. 우리 키트에서 LoRa 제어 핀은 <span class="pin">TX 14 · RX 15 · M0 21 · M1 20 · AUX 7</span> 로 이미 정해져 있습니다.</div>
  </section>

  <section>
    <div class="badge"><span class="n">현업노트</span><span class="k">오늘의 기록</span></div>
    <h2>현업노트: 공유·열람</h2>
    <div class="prompt">
      <span class="say">🗣 <b>"내 위키를 폰이나 PC에서 열어 보는 방법을 알려줘."</b></span>
      <span class="why">💡 무선으로 원격을 보듯, 내 노트도 어디서나 열람. 노트는 혼자 쓰는 게 아니라 <b>팀 인수인계 자산</b>입니다.</span>
    </div>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">의미</span><span class="k">이 시간의 의미 · 다음 예고</span></div>
    <h2>오늘의 의미</h2>
    <div class="note mean"><b>이 실습이 의미하는 것.</b> 이제 공장을 <b>현장에 없어도</b> 볼 수 있습니다. 원격 모니터링은 스마트팩토리의 핵심 — <b>여러 곳의 상태를 한 화면에 모아</b> 보고, 멀리 떨어진 설비도 무선으로 연결합니다.</p></div>
    <p><b>다음 시간(5회차, 마지막) 예고:</b> <b>AI</b>를 맛보고, 4주간 만든 조각을 모두 합쳐 <b>미니 스마트팩토리를 완성</b>합니다. 그리고 내 노트를 <b>내 회사용 가이드</b>로 마무리합니다.</p>
  </section>
"""
page("4회차_스마트폰_원격모니터링.html", G4,
     "4회차 · 스마트폰으로 우리 공장 보기",
     "4회차 — 스마트폰 원격 모니터링",
     "<b>웹 대시보드를 내 폰으로</b> 열고, <b>실시간 그래프</b>를 보며, <b>장거리 무선(LoRa)</b>으로 떨어진 데이터를 받습니다.",
     '<span>회차 · <b>4주차</b></span><span>키워드 · <b>웹·서버·IP·그래프·LoRa</b></span>',
     body4, COMMON_FOOT)

# ============================================================ 5회차
G5 = "linear-gradient(150deg,#2C2C6B,#4B3FB0 50%,#0E9488 130%)"
body5 = r"""
  <div class="goal"><h3>🎯 이번 시간의 목표 (마지막 날)</h3>
  <b>AI를 맛보고</b>, 4주간 만든 조각을 모두 합쳐 <b>미니 스마트팩토리를 완성</b>합니다. 그리고 5주간 쌓은 노트를 <b>내 회사용 1페이지 가이드</b>로 마무리합니다.</div>

  <section>
    <div class="badge"><span class="n">개념</span><span class="k">쉬운 말로</span></div>
    <h2>AI(인공지능)는 어떻게 "배우나요"?</h2>
    <p>사람이 규칙을 일일이 알려주는 대신, AI는 <b>수많은 예시를 보고 스스로 규칙을 찾아냅니다.</b> 예: 손으로 쓴 숫자 '3'을 수천 개 보여주면, AI가 "이런 모양이면 3이구나"를 <b>스스로 익힙니다.</b></p>
    <div class="note key"><b>공장에서의 AI.</b> "평소와 다른 이상 신호를 자동으로 알아채기"(이상 감지)에 씁니다. 오늘은 <b>손글씨 숫자 인식</b>으로 원리를 체험합니다.</div>
  </section>

  <section>
    <div class="badge"><span class="n">실습①</span><span class="k">AI 체험</span></div>
    <h2>실습 ①: 손글씨 숫자 인식 AI 체험</h2>
    <p>직접 숫자를 써서 AI가 맞히는지 체험합니다. (데모는 강사 준비본을 사용)</p>
    <div class="prompt">
      <span class="say">🗣 <b>"손글씨 숫자 인식 AI가 어떤 원리로 숫자를 알아맞히는지 쉽게 설명해줘."</b></span>
      <span class="say">🗣 <b>"손글씨 숫자 인식 AI를 직접 체험해보고 싶어. 어떻게 시작하는지 알려줘."</b></span>
      <span class="say">🗣 <b>"AI가 언제 틀리는지(흐린 글씨 등) 알려줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">프로젝트</span><span class="k">통합 · 오늘의 핵심</span></div>
    <h2>실습 ②: 미니 스마트팩토리 통합</h2>
    <p class="lead">4주간 만든 조각(센서·판단·경보·대시보드)을 <b>하나의 미니 공장</b>으로 연결합니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">미니 스마트팩토리 구성도</span></div>
    <pre>[온습도 센서] ─→ 값 수집
[버튼] ─→ 시작/정지
        │
        ▼
[라즈베리파이] ─→ 기준값 · 이상 판단 (+ 선택: AI 이상감지)
        ├─→ [LED 신호등 R/Y/B] + [네오픽셀 ×4]
        ├─→ [부저/스피커] 경고음
        ├─→ [OLED] 실시간 수치
        └─→ [웹 대시보드] 폰 그래프 (+ LoRa 원격)</pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>/hardwareTest</b> <span class="why">— 통합 전에 모든 부품 정상인지 한 번에 점검</span></span>
      <span class="say">🗣 <b>"지금까지 만든 센서→판단→경보→대시보드를 하나로 합치는 순서를 알려줘."</b></span>
      <span class="say">🗣 <b>"합치다 막히면 어디부터 하나씩 확인하면 되는지 알려줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">심화</span><span class="k">여유 있으면</span></div>
    <h2>(심화) AI 이상 감지 — 평소와 다른 튐 잡기</h2>
    <p>평균에서 크게 벗어난 값을 "이상"으로 자동 판단하는 간단한 방법(Z-score)입니다. 여유가 있으면 도전, 없으면 건너뛰어도 됩니다.</p>
    <div class="cmd"><div class="bar"><span class="d r"></span><span class="d y"></span><span class="d g"></span><span class="t">파이썬 — 간단 이상 감지 (개념)</span></div>
    <pre>recent = [<span class="n">27.1</span>, <span class="n">27.3</span>, <span class="n">27.0</span>, <span class="n">27.2</span>, <span class="n">31.8</span>]     <span class="c"># 최근 측정값</span>
avg = <span class="k">sum</span>(recent)/<span class="k">len</span>(recent)
<span class="k">if</span> <span class="k">abs</span>(recent[-<span class="n">1</span>] - avg) &gt; <span class="n">3</span>:                <span class="c"># 평균보다 3도 이상 튀면</span>
    <span class="k">print</span>(<span class="s">"⚠️ 이상 감지! 확인 필요"</span>)</pre></div>
    <div class="prompt">
      <span class="say">🗣 <b>"평소와 다른 이상(온도 튐)을 자동으로 알아채는 간단한 방법을 쉽게 알려줘."</b></span>
    </div>
  </section>

  <section>
    <div class="badge" style="--blue:#A63A82"><span class="n" style="background:#A63A82">★핵심</span><span class="k">평생 자산 완성 · take-home</span></div>
    <h2>실습 ③: 현업 적용 1페이지 — 내 노트를 내 회사 가이드로</h2>
    <p class="lead">5주간 쌓은 내 노트를 Claude가 <b>전부 읽고</b>, 내 회사에 바로 쓸 <b>1페이지 안내서</b>로 만들어 줍니다. 이 과정의 <b>최종 결과물</b>입니다.</p>
    <div class="prompt">
      <span class="say">🗣 <b>"지금까지 쓴 내 작업일지·배운것을 전부 읽고, 내 현업에 적용할 1페이지 가이드를 만들어줘."</b></span>
      <span class="say">🗣 <b>"내 회사 설비/공정 하나를 골라 이 위키 방식으로 관리하는 설계를 같이 짜줘."</b></span>
      <span class="why">💡 하드웨어 키트가 "물리 자산"이라면, 이 노트는 "방법론 자산" — <b>둘 다 집에 가져갑니다.</b></span>
    </div>
  </section>

  <section>
    <div class="badge"><span class="n">발표</span><span class="k">수료</span></div>
    <h2>발표 · 수료</h2>
    <div class="prompt">
      <span class="say">🗣 <b>"미니팩토리 + 내 노트를 발표용으로 한눈에 요약해줘."</b></span>
      <span class="say">🗣 <b>"5주 동안 한 일을 한눈에 보이는 요약으로 정리해줘."</b></span>
      <span class="say">🗣 <b>/work-end</b> <span class="why">— 마지막 기록·백업</span></span>
    </div>
    <table>
      <tr><th>평가 항목</th><th>배점</th></tr>
      <tr><td>센서 수집·표시</td><td>20</td></tr>
      <tr><td>LED/부저 자동 제어</td><td>20</td></tr>
      <tr><td>이상/기준값 판단</td><td>20</td></tr>
      <tr><td>대시보드(폰)</td><td>20</td></tr>
      <tr><td>시연·현장 적용 아이디어</td><td>20</td></tr>
    </table>
    <p style="font-size:13.5px;color:var(--muted)">※ 수료기준 = 5회 중 4회 이상 출석. 평가는 참여·완성도 중심(초급).</p>
  </section>

  <section style="border-bottom:none">
    <div class="badge" style="--blue:#0E7C74"><span class="n" style="background:#0E7C74">추구</span><span class="k">본 교육이 추구한 것</span></div>
    <h2>5주의 마무리 — 우리가 추구한 것</h2>
    <div class="note mean"><b>본 교육이 추구하는 것.</b> 단발 강의가 아니라, 여러분이 <b>현업에 그대로 가져갈 두 가지 자산</b>을 남기는 것입니다 — ① 직접 만든 <b>실습 키트(하드웨어)</b>, ② AI와 함께 일하는 <b>기록·관리 습관(방법론)</b>. 오늘 완성한 미니 공장과 내 노트가 그 증거입니다.</div>
    <p>이 위키는 수료 후에도 <b>새 프로젝트마다 복사해 계속 쓰는 평생 자산</b>입니다. 3개월 사후 지원(노트 운영 Q&amp;A 포함)도 활용하세요. — <b>수고하셨습니다! 🎉</b></p>
  </section>
"""
page("5회차_AI_미니스마트팩토리.html", G5,
     "5회차 · AI 체험 및 미니 스마트팩토리 (수료)",
     "5회차 — AI 체험 및 미니 스마트팩토리",
     "<b>AI를 맛보고</b>, 4주간의 조각을 합쳐 <b>미니 스마트팩토리를 완성</b>하며, 내 노트를 <b>내 회사용 가이드</b>로 마무리합니다.",
     '<span>회차 · <b>5주차</b></span><span>키워드 · <b>AI · 통합 · 현업적용 · 수료</b></span>',
     body5, COMMON_FOOT)

print("=== 완료: 6개 HTML 생성 ===")
