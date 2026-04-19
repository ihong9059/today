import requests, json

TOKEN = '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'
PAGE_ID = '343cb620-8c2b-8032-829c-e4655bf9e974'

headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
}

def text(content, bold=False, italic=False):
    return {'type': 'text', 'text': {'content': content}, 'annotations': {'bold': bold, 'italic': italic, 'strikethrough': False, 'underline': False, 'code': False, 'color': 'default'}}

def h1(t): return {'object': 'block', 'type': 'heading_1', 'heading_1': {'rich_text': [text(t)]}}
def h3(t): return {'object': 'block', 'type': 'heading_3', 'heading_3': {'rich_text': [text(t)]}}
def p(t, **kw): return {'object': 'block', 'type': 'paragraph', 'paragraph': {'rich_text': [text(t, **kw)]}}
def bullet(t, **kw): return {'object': 'block', 'type': 'bulleted_list_item', 'bulleted_list_item': {'rich_text': [text(t, **kw)]}}
def num(t): return {'object': 'block', 'type': 'numbered_list_item', 'numbered_list_item': {'rich_text': [text(t)]}}
def divider(): return {'object': 'block', 'type': 'divider', 'divider': {}}

page_data = {
    'parent': {'page_id': PAGE_ID},
    'properties': {
        'title': {'title': [{'text': {'content': '세컨드 브레인 요약 (2026-04-19)'}}]}
    },
    'children': [
        h1('나는 누구인가'),
        p('임베디드 시스템 + 교육 테크 전문가. AI 시대에 하드웨어와 소프트웨어를 연결하는 교육 시스템을 만드는 사람.'),
        bullet('엔지니어: 회로 > 펌웨어 > 서버 > 앱 > 웹 수직 통합 (38년 경력)'),
        bullet('교육자: AI/코딩 교육 콘텐츠 + 사전빌드 시스템 + Python Vibe'),
        bullet('사업가: 위시캣 프리랜서 (스마트팜 수주 진행중, 월500만) + 교육 사업'),

        divider(),
        h1('양산 제품 5개 (운영 중)'),
        num('STM32F756 컴프레서 밸브 컨트롤러'),
        num('STM32F407 세탁기 컨트롤러'),
        num('RPi CM4 EtherCAT 컨트롤러'),
        num('RPi 3 V-Cut 컨트롤러'),
        num('nRF52832 BLE 온도 컨트롤러'),

        divider(),
        h1('현재 진행 프로젝트'),
        bullet('사전빌드 교육: WROOM 155개 + Mini 117개 = 272개 완료, C6-LCD 예정', bold=True),
        bullet('Python Vibe: 100개 예시, 4탭, AI 코드생성+실행+설명', bold=True),
        bullet('위시캣 #153090: nRF52 스마트팜 펌웨어 (주3회 방문, 월500만)'),
        bullet('AI 교육 웹: Level 0~9, 레슨 비디오 30편+, DO 배포'),
        bullet('REVITA: RAK4631 Zephyr RTOS, LoRa+RS485, KC인증'),
        bullet('Xerix MFC: EtherCAT 제안서 발송 (4,970만), 회신 대기'),
        bullet('UTTEC 홈페이지: Next.js 14, DO 포트 7777'),

        divider(),
        h1('핵심 강점'),
        num('수직 통합: 회로 > 펌웨어 > 서버 > 앱 > 웹 > 인프라 전체 스택'),
        num('폭발적 실행: 하루에 272개 펌웨어, 100개 예시 앱 구축'),
        num('양산 실적: 5개 제품 현재 판매 중'),
        num('AI 도구 극대화: Claude Code Skill 시스템 구축'),
        num('교육 설계 + 기술 구현 결합'),

        divider(),
        h1('AI 방향 판단'),
        h3('AI 대체 위험 높음'),
        bullet('단순 웹/앱 개발, 코딩 문법 교육, 문서 작성'),
        h3('AI 대체 불가 (유니크 가치)'),
        bullet('하드웨어 디버깅, 교육 현장 운영, 시스템 통합, 양산 품질관리, KC 인증'),
        h3('전략 방향'),
        p('[현재] 임베디드 교육 + AI 도구 활용'),
        p('[중기] AI+HW 통합 교육 플랫폼 사업화'),
        p('[장기] AI가 하드웨어를 제어하는 교육 분야 전문가'),

        divider(),
        h1('긴급 과제'),
        bullet('동시 빌드 문제 해결 (10명+ 동시 사용 시 서버 충돌)', bold=True),
        bullet('aiS3 (C6-LCD) 사전빌드 구축'),
        bullet('Claude Design 학습'),

        divider(),
        h1('서버 인프라'),
        bullet('DigitalOcean: 주 서버 (교육웹, 홈페이지, 학습앱)'),
        bullet('로컬: 8092~8096 (사전빌드 5개 서비스), 8094 (Python Vibe)'),
        bullet('Tailscale: 10대 장비 VPN (RPi5, RPi4, Jetson, ODROID, 태블릿...)'),
        bullet('DuckDNS: uttec-edu, uttec-sensor, uttec-ask, uttec-ai'),

        divider(),
        p('생성: 2026-04-19 | 소스: Obsidian 세컨드 브레인 위키 (30개 노드, 120+ 연결)', italic=True),
    ]
}

r = requests.post('https://api.notion.com/v1/pages', headers=headers, json=page_data)
if r.status_code == 200:
    print(f'성공! URL: {r.json().get("url", "")}')
else:
    print(f'실패: {r.status_code} {r.text[:200]}')
