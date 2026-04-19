"""AI FanStick 설명서 → Notion 업로드"""
import requests, json, os, time

TOKEN = os.environ.get('NOTION_TOKEN')
PAGE_ID = '347cb620-8c2b-8117-8573-f68055f4f8ba'
headers = {'Authorization': f'Bearer {TOKEN}', 'Content-Type': 'application/json', 'Notion-Version': '2022-06-28'}
URL = f'https://api.notion.com/v1/blocks/{PAGE_ID}/children'

def h1(t): return {'object':'block','type':'heading_1','heading_1':{'rich_text':[{'type':'text','text':{'content':t}}]}}
def h2(t): return {'object':'block','type':'heading_2','heading_2':{'rich_text':[{'type':'text','text':{'content':t}}]}}
def h3(t): return {'object':'block','type':'heading_3','heading_3':{'rich_text':[{'type':'text','text':{'content':t}}]}}
def p(t): return {'object':'block','type':'paragraph','paragraph':{'rich_text':[{'type':'text','text':{'content':t}}]}}
def code(t): return {'object':'block','type':'code','code':{'rich_text':[{'type':'text','text':{'content':t}}],'language':'plain text'}}
def div(): return {'object':'block','type':'divider','divider':{}}
def tbl(rows):
    w = len(rows[0])
    return {'object':'block','type':'table','table':{'table_width':w,'has_column_header':True,'has_row_header':False,
        'children':[{'type':'table_row','table_row':{'cells':[[{'type':'text','text':{'content':c}}] for c in r]}} for r in rows]}}

def send(blocks, label):
    time.sleep(0.5)
    r = requests.patch(URL, headers=headers, json={'children': blocks})
    print(f'{label}: {"OK" if r.status_code == 200 else r.status_code} - {r.text[:80] if r.status_code != 200 else ""}')

# ========== Flow 설명서 ==========
send([
    h1('AI FanStick 시스템 전체 Flow 설명서'),
    div(),
    h2('1. 시스템 개요'),
    p('K-POP 콘서트용 AI 응원봉 시스템. 스마트폰 앱 + 서버 2개로 구성.\n관객의 음성 질문에 AI가 응답하고, LED 색상을 실시간으로 제어하며, 본부에서 전체 관객의 응원봉을 관제한다.'),
], 'Flow-1')

send([
    code('Tailscale 서버 (100.79.180.64)\n\nAI FanStick Server (8081)     Control Center (8091)\n- AI 질의응답                 - 디바이스 실시간 관리\n- 콘서트 정보                 - LED/멜로디 전체 제어\n- 셋리스트 관리               - 추첨 시스템\n- Gemini/OpenAI               - 관리자 대시보드\n    |  REST + WebSocket            |  WebSocket\n    +-------------+----------------+\n                  | Tailscale VPN\n         스마트폰 앱 (com.uttec.fanstick v1.0.0-MVP)\n         - 음성 입력 (STT) / AI 대화\n         - LED 색상 표시 / BLE 응원봉 연결'),
], 'Flow-2')

send([
    div(),
    h2('2. 서버 구성'),
    h3('2.1 AI FanStick Server (포트 8081)'),
    p('위치: /home/uttec/ai_fanstick_server/\n기술: FastAPI + Uvicorn\n역할: 개별 사용자와의 AI 대화, 콘서트 정보 제공'),
    code('ai_fanstick_server/\n|- main.py              # FastAPI 메인 서버\n|- gemini_service.py    # AI 서비스 (OpenAI + Gemini 이중화)\n|- prompt_generator.py  # 시스템 프롬프트 동적 생성\n|- .env                 # API 키 (GEMINI, OPENAI)\n|- data/concert_data.json  # BTS 셋리스트\n|- venv/'),
], 'Flow-3')

send([
    h3('REST API 엔드포인트'),
    tbl([
        ['메서드', '경로', '기능'],
        ['GET', '/', '서버 상태 확인'],
        ['POST', '/api/ask', 'AI에게 질문 (STT텍스트->AI응답+LED색상)'],
        ['GET', '/api/concert', '콘서트 전체 정보'],
        ['GET', '/api/setlist', '셋리스트 조회'],
        ['GET', '/api/members', '멤버 정보 조회'],
        ['GET', '/api/status', '서버 상태 + 현재 곡'],
        ['POST', '/api/song/next', '다음 곡으로 이동'],
        ['POST', '/api/song/prev', '이전 곡으로 이동'],
        ['POST', '/api/song/set/{idx}', '특정 곡으로 이동'],
        ['POST', '/api/reload', '데이터 다시 로드'],
        ['GET', '/api/prompt', '프롬프트 확인(디버그)'],
    ]),
], 'Flow-4')

send([
    h3('WebSocket: /ws/{device_id}'),
    p('메시지 타입:\n- ask: AI 질문 처리 -> answer 응답\n- status: 서버 상태 조회\n- next_song / prev_song: 곡 이동 -> song_changed\n- ping -> pong'),
    h3('AI 서비스 구조'),
    code('사용자 질문\n  -> AI_PROVIDER 설정 확인 (기본: openai)\n  -> OpenAI (gpt-4o-mini) 시도\n  -> 실패시 Gemini (gemini-2.0-flash)\n  -> 둘다 실패시 규칙 기반 폴백 (키워드 매칭)'),
    p('응답: { success, response, led_color: [R,G,B], current_song }\nLED 색상: AI 응답 끝 [LED:R,G,B] 태그 파싱'),
], 'Flow-5')

send([
    div(),
    h3('2.2 Control Center - 본부 관제 (포트 8091)'),
    p('위치: /home/uttec/control_center/\n기술: FastAPI + WebSocket\n역할: 전체 관객 응원봉 실시간 관리, 추첨, 일괄 제어'),
], 'Flow-6')

send([
    tbl([
        ['메서드', '경로', '기능'],
        ['GET', '/ 또는 /admin', '관리자 대시보드'],
        ['GET', '/api/devices', '연결된 디바이스 목록'],
        ['POST', '/api/lottery', '추첨 실행'],
        ['POST', '/api/broadcast/led', '전체 LED 색상 변경'],
        ['POST', '/api/broadcast/melody', '전체 멜로디 재생'],
        ['POST', '/api/broadcast/message', '전체 메시지 전송'],
        ['POST', '/api/device/{id}/command', '개별 디바이스 명령'],
        ['GET/DEL', '/api/winners', '당첨자 조회/초기화'],
    ]),
], 'Flow-7')

send([
    tbl([
        ['type', '내용', '예시'],
        ['led_command', 'LED 색상 변경', '{r:255,g:0,b:0,pattern:"rainbow"}'],
        ['melody_command', '멜로디 재생', '{melody:"winner"}'],
        ['display_message', '화면 메시지', '{message:"환영합니다!"}'],
        ['winner', '당첨 알림', '특수 LED + 멜로디'],
        ['lottery_result', '추첨 결과', '당첨자 이름 목록'],
    ]),
], 'Flow-8')

send([
    div(),
    h2('3. 스마트폰 앱 (com.uttec.fanstick)'),
    p('버전: 1.0.0-MVP (2026-04-17 설치)\n플랫폼: Android (Kotlin)\n\n주요 기능:\n1. 음성 입력 (STT) -> 텍스트 변환 -> 서버 /api/ask로 전송\n2. AI 대화 -> 콘서트 정보, 응원법, 멤버 정보\n3. LED 제어 -> led_color로 화면/BLE 응원봉 색상 변경\n4. 본부 연결 -> 서버 8091 WebSocket 관제 명령 수신\n5. BLE 연결 -> 실제 응원봉 하드웨어 블루투스 연결'),
    code('사용자 음성 입력\n  -> STT 텍스트 변환\n  -> POST /api/ask (8081) <- AI 응답 + LED 색상\n  -> 화면에 응답 표시 + LED 색상 변경\n  -> BLE 연결시 실제 응원봉에 RGB 전송'),
], 'Flow-9')

send([
    div(),
    h2('4. 전체 시나리오 Flow'),
    h3('4.1 콘서트 시작 전'),
    p('1. 서버 가동 확인 (8081, 8091)\n2. 관리자: http://100.79.180.64:8091/admin 접속\n3. 관객들: FanStick 앱 실행\n4. 앱: 서버 8091 WebSocket 연결 (디바이스 등록)\n5. 관리자 대시보드에서 접속 인원 확인'),
], 'Flow-10')

send([
    h3('4.2 콘서트 진행 중'),
    p('[곡 시작]\n관리자: POST /api/song/set/{index} -> 현재 곡 설정\n관리자: POST /api/broadcast/led -> 전체 LED 색상 변경\n\n[관객 상호작용]\n관객 음성: "다음 곡이 뭐야?"\n-> 앱 STT -> POST /api/ask\n-> AI: "다음 곡은 봄날이야! 분홍색 준비!"\n-> 앱 화면 표시 + LED 색상 변경\n\n[추첨 이벤트]\n관리자: POST /api/lottery (count=3)\n-> 당첨자에게: winner + 레인보우 LED + 멜로디\n-> 전체에게: lottery_result (당첨자 발표)'),
    h3('4.3 콘서트 종료'),
    p('관리자: broadcast/message "감사합니다! 보라해!"\n관리자: broadcast/led 전체 보라색 (138,43,226) + wave'),
], 'Flow-11')

send([
    div(),
    h2('5. 데이터 구조 (BTS 서울 콘서트)'),
    p('아티스트: BTS (방탄소년단) / 팬덤: ARMY\n공연장: 서울 잠실 주경기장 / 날짜: 2026-06-15 18:00'),
    tbl([
        ['순서', '곡명', '응원 색상', '팬챈트'],
        ['1', 'Dynamite', '골드 (255,215,0)', 'BTS! BTS!'],
        ['2', '좋아좋아', '파란색 (0,100,255)', '좋아! 좋아!'],
        ['3', '봄날', '분홍색 (255,182,193)', '보고 싶다~'],
        ['4', 'Butter', '노란색 (255,255,0)', 'Get it, let it roll!'],
        ['5', 'Boy With Luv', '핑크 (255,105,180)', 'Oh my my my!'],
        ['6', '피 땀 눈물', '빨간색 (220,20,60)', '내 피 땀 눈물~'],
        ['7', '달려라 방탄', '초록색 (0,255,100)', '탄탄탄 방탄!'],
        ['8', '소우주', '보라색 (138,43,226)', '넌 별처럼 빛나~'],
    ]),
], 'Flow-12')

send([
    div(),
    h2('6. 서버 접속 정보'),
    tbl([
        ['항목', '값'],
        ['서버 IP', '100.79.180.64 (Tailscale)'],
        ['SSH', 'ssh uttec@100.79.180.64 (pw: uttec)'],
        ['AI 서버', 'http://100.79.180.64:8081'],
        ['API 문서', 'http://100.79.180.64:8081/docs'],
        ['관제 서버', 'http://100.79.180.64:8091'],
        ['관제 대시보드', 'http://100.79.180.64:8091/admin'],
        ['AI Provider', 'OpenAI(gpt-4o-mini), 폴백:Gemini(2.0-flash)'],
    ]),
], 'Flow-13')

send([
    div(),
    h2('7. 서버 관리'),
    code('# 프로세스 확인\nssh uttec@100.79.180.64\nps aux | grep -E "8081|8091|fanstick|control_center"\n\n# 서버 로그\ncat ai_fanstick_server/server.log\ncat control_center/server.log\n\n# AI 서버 재시작\ncd ai_fanstick_server && source venv/bin/activate\nnohup python main.py > server.log 2>&1 &\n\n# 관제 서버 재시작\ncd control_center && source venv/bin/activate\nnohup python server.py > server.log 2>&1 &'),
], 'Flow-14')

# ========== 비교 설명서 ==========
send([
    div(), div(),
    h1('MVP vs newMvp 비교 설명서'),
    div(),
    h2('1. 한눈에 보기'),
    tbl([
        ['항목', 'mvp (분리형)', 'newMvp (통합형)'],
        ['구조', '서버 + 앱 분리', '앱 하나로 통합'],
        ['서버', 'Python FastAPI (8081, 8091)', '불필요'],
        ['앱', 'Kotlin (서버 API 호출)', 'Kotlin (AI API 직접 호출)'],
        ['AI 호출', '앱->서버->AI API', '앱->AI API (직접)'],
        ['상태', '현재 운영 중', '코드 작성 완료, 미적용'],
        ['작성일', '2026-02-25', '2026-02-27'],
    ]),
], 'Comp-1')

send([
    div(),
    h2('2. 아키텍처 비교'),
    h3('mvp (분리형) - 현재 운영 중'),
    code('스마트폰 앱 (Kotlin)\n  --HTTP/WS--> Python Server (FastAPI 8081) --API--> AI API (OpenAI/Gemini)\n  --WebSocket--> Control Center (8091)\n  --BLE--> 응원봉 (ESP32)\n\n서버 위치: Tailscale 100.79.180.64'),
    h3('newMvp (통합형) - 제안/미적용'),
    code('스마트폰 앱 All-in-One (Kotlin)\n  - UI (Jetpack Compose) / STT/TTS / BLE 통신\n  - PromptGenerator.kt (내장)\n  - AIService.kt (직접 호출)\n  - concert_data.json (내장)\n  --API--> AI API (OpenAI/Gemini)\n\n서버 불필요, 앱만으로 동작'),
], 'Comp-2')

send([
    div(),
    h2('3. 파일 구조 비교'),
    h3('mvp/'),
    code('mvp/\n|- FanStickApp/             # Android 앱 (Kotlin)\n|  |- app/src/main/kotlin/com/uttec/fanstick/\n|     |- MainActivity.kt   # 서버 API를 HTTP로 호출\n|- backup_server/\n|  |- server/               # AI 서버 (-> 서버 8081)\n|  |  |- main.py            # FastAPI 엔드포인트 (~265줄)\n|  |  |- gemini_service.py  # AI API 호출+폴백 (~283줄)\n|  |  |- prompt_generator.py # 프롬프트 생성 (~215줄)\n|  |  |- data/concert_data.json\n|  |- control_center/       # 관제 서버 (-> 서버 8091)\n|     |- server.py / admin.html\n|- server/.env              # API 키\n|- deploy.sh                # 배포 스크립트'),
    h3('newMvp/'),
    code('newMvp/\n|- PromptGenerator.kt        # prompt_generator.py -> Kotlin\n|- AIService.kt              # gemini_service.py -> Kotlin\n|- assets/concert_data.json  # 앱 내장 데이터\n|- 통합앱_아키텍처_분석.md\n|- 온디바이스_AI_검토서.md/pdf\n|- README.md'),
], 'Comp-3')

send([
    div(),
    h2('4. 코드 변환 대응표'),
    tbl([
        ['Python (mvp 서버)', 'Kotlin (newMvp 앱)', '변환 내용'],
        ['gemini_service.py', 'AIService.kt', 'OkHttp로 Gemini/OpenAI 직접 호출'],
        ['prompt_generator.py', 'PromptGenerator.kt', '셋리스트/멤버 포맷팅, 프롬프트 생성'],
        ['concert_data.json (서버)', 'assets/concert_data.json (앱)', '동일 데이터, 로딩만 다름'],
        ['main.py FastAPI', '제거', 'HTTP 서버 불필요'],
    ]),
], 'Comp-4')

send([
    h3('핵심 코드 변경'),
    p('mvp - 서버 경유:'),
    code('// 서버 API를 HTTP로 호출\nhttpClient.newCall(\n    Request.Builder().url("$SERVER_URL/api/ask").post(body).build()\n).execute()'),
    p('newMvp - 직접 호출:'),
    code('// AI API를 앱에서 직접 호출\nval aiService = AIService(concertData, promptGenerator, geminiApiKey)\nval response = aiService.ask("다음 곡이 뭐야?")\n// response.response -> "다음 곡은 봄날이야!"\n// response.ledColor -> [255, 182, 193]'),
], 'Comp-5')

send([
    div(),
    h2('5. 장단점 비교'),
    h3('mvp (분리형) 장점'),
    p('- API 키가 서버에만 있어 보안 안전\n- 콘서트 데이터를 서버에서 중앙 관리 (실시간 변경 가능)\n- Control Center로 전체 관객 일괄 제어 가능\n- 서버 로그로 디버깅 용이\n- AI 사용량 서버에서 모니터링/제한 가능'),
    h3('mvp (분리형) 단점'),
    p('- 서버 구축/운영 필요 (Tailscale 서버 상시 가동)\n- 앱->서버->AI API 이중 네트워크 홉 (응답 ~3초)\n- 서버 장애 시 앱 전체 불능'),
], 'Comp-6')

send([
    h3('newMvp (통합형) 장점'),
    p('- 서버 불필요: APK 하나로 모든 기능\n- 앱->AI API 직접 호출 (응답 ~2초, 1초 단축)\n- 콘서트 데이터 로컬 조회 (오프라인 부분 지원)\n- 배포/데모 시 앱 설치만으로 완료\n- 서버 호스팅 비용 절감'),
    h3('newMvp (통합형) 단점'),
    p('- API 키가 앱에 포함: 디컴파일 시 노출 위험\n- 콘서트 데이터 변경 시 앱 업데이트 필요\n- 전체 관객 중앙 제어 불가 (Control Center 없음)\n- 각 사용자 개별 API 호출: 비용 추적 어려움'),
], 'Comp-7')

send([
    div(),
    h2('6. 현재 상태 및 결론'),
    tbl([
        ['구분', '상태'],
        ['mvp', '서버 운영 중 (8081+8091), 앱 설치됨 (v1.0.0-MVP)'],
        ['newMvp', 'Kotlin 코드 작성 완료, 앱 미통합'],
    ]),
    h3('권장 전략'),
    tbl([
        ['단계', '권장', '이유'],
        ['데모/시연', 'newMvp (통합형)', '서버 없이 앱만으로 즉시 시연'],
        ['MVP 운영', 'mvp (분리형)', 'Control Center 관제 기능 필요'],
        ['상용화', '하이브리드', '앱+백엔드프록시(API키보호)+Control Center'],
    ]),
    p('마이그레이션 소요: 약 2~3일\n- Phase 1: 코드 통합 (1~2일)\n- Phase 2: 테스트 (0.5일)\n- Phase 3: BLE 연동 검증 (0.5일)'),
    div(),
    p('작성일: 2026-04-20'),
], 'Comp-8')

print('\n=== 완료 ===')
