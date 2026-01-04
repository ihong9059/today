import os

# IT·정보통신 카테고리 설정
CATEGORY_ID = "it"
CATEGORY_NAME = "IT·정보통신"
CATEGORY_COLOR1 = "blue"
CATEGORY_COLOR2 = "indigo"
CATEGORY_EMOJI = "💻"

CERTS = [
    {
        "id": "information-processor",
        "name": "정보처리기사",
        "emoji": "🖥️",
        "desc": "소프트웨어 개발 및 관리",
        "subjects": [
            {"id": "software-design", "name": "소프트웨어 설계", "topics": [
                {"id": "requirement-analysis", "name": "요구사항 분석", "questions": [
                    {"q": "요구사항 분석 기법을 설명하시오.", "a": "인터뷰, 설문, 프로토타이핑, 유스케이스"},
                    {"q": "기능적 요구사항과 비기능적 요구사항을 구분하시오.", "a": "기능: 시스템이 해야 할 일, 비기능: 성능/보안/품질"},
                ]},
                {"id": "uml", "name": "UML", "questions": [
                    {"q": "UML 다이어그램의 종류를 설명하시오.", "a": "클래스, 시퀀스, 유스케이스, 상태, 활동 다이어그램"},
                    {"q": "클래스 다이어그램의 관계를 설명하시오.", "a": "연관, 집합, 합성, 의존, 상속, 구현"},
                ]},
            ]},
            {"id": "software-development", "name": "소프트웨어 개발", "topics": [
                {"id": "data-structure", "name": "자료구조", "questions": [
                    {"q": "스택과 큐의 차이를 설명하시오.", "a": "스택: LIFO, 큐: FIFO"},
                    {"q": "이진트리의 순회 방법을 설명하시오.", "a": "전위, 중위, 후위, 레벨 순회"},
                ]},
                {"id": "algorithm", "name": "알고리즘", "questions": [
                    {"q": "정렬 알고리즘의 시간복잡도를 비교하시오.", "a": "버블O(n²), 퀵O(nlogn), 병합O(nlogn)"},
                    {"q": "탐색 알고리즘을 설명하시오.", "a": "순차탐색O(n), 이진탐색O(logn)"},
                ]},
            ]},
            {"id": "database", "name": "데이터베이스", "topics": [
                {"id": "db-design", "name": "DB 설계", "questions": [
                    {"q": "정규화의 단계를 설명하시오.", "a": "1NF→2NF→3NF→BCNF→4NF→5NF"},
                    {"q": "ER 다이어그램의 구성요소를 설명하시오.", "a": "개체, 속성, 관계"},
                ]},
                {"id": "sql", "name": "SQL", "questions": [
                    {"q": "DDL, DML, DCL을 구분하시오.", "a": "DDL:정의, DML:조작, DCL:제어"},
                    {"q": "JOIN의 종류를 설명하시오.", "a": "INNER, LEFT, RIGHT, FULL, CROSS JOIN"},
                ]},
            ]},
            {"id": "programming", "name": "프로그래밍 언어", "topics": [
                {"id": "oop", "name": "객체지향", "questions": [
                    {"q": "객체지향의 4대 특성을 설명하시오.", "a": "캡슐화, 상속, 다형성, 추상화"},
                    {"q": "SOLID 원칙을 설명하시오.", "a": "단일책임, 개방폐쇄, 리스코프, 인터페이스분리, 의존역전"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "coding", "name": "코딩", "questions": [
                    {"q": "C언어 포인터 개념을 설명하시오.", "a": "메모리 주소를 저장하는 변수"},
                    {"q": "Java 예외처리 방법을 설명하시오.", "a": "try-catch-finally, throws"},
                ]},
            ]},
        ]
    },
    {
        "id": "information-security",
        "name": "정보보안기사",
        "emoji": "🔐",
        "desc": "정보시스템 보안",
        "subjects": [
            {"id": "system-security", "name": "시스템 보안", "topics": [
                {"id": "os-security", "name": "운영체제 보안", "questions": [
                    {"q": "접근통제 모델을 설명하시오.", "a": "DAC, MAC, RBAC"},
                    {"q": "버퍼 오버플로우 대응책을 설명하시오.", "a": "스택가드, ASLR, DEP"},
                ]},
            ]},
            {"id": "network-security", "name": "네트워크 보안", "topics": [
                {"id": "attack-defense", "name": "공격과 방어", "questions": [
                    {"q": "DDoS 공격 유형을 설명하시오.", "a": "SYN Flood, UDP Flood, HTTP Flood"},
                    {"q": "방화벽의 종류를 설명하시오.", "a": "패킷필터링, 상태검사, 애플리케이션"},
                ]},
            ]},
            {"id": "application-security", "name": "어플리케이션 보안", "topics": [
                {"id": "web-security", "name": "웹 보안", "questions": [
                    {"q": "OWASP Top 10을 설명하시오.", "a": "인젝션, 인증, XSS, CSRF 등"},
                    {"q": "SQL Injection 대응책을 설명하시오.", "a": "PreparedStatement, 입력값 검증"},
                ]},
            ]},
            {"id": "cryptography", "name": "암호학", "topics": [
                {"id": "encryption", "name": "암호화", "questions": [
                    {"q": "대칭키와 비대칭키 암호화를 비교하시오.", "a": "대칭키: 같은키, 비대칭키: 공개키/개인키"},
                    {"q": "해시함수의 특성을 설명하시오.", "a": "일방향성, 충돌저항성, 역상저항성"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "security-practice", "name": "보안 실무", "questions": [
                    {"q": "취약점 진단 절차를 설명하시오.", "a": "정보수집→취약점분석→침투테스트→보고서"},
                ]},
            ]},
        ]
    },
    {
        "id": "network-admin",
        "name": "네트워크관리사",
        "emoji": "🌐",
        "desc": "네트워크 구축 및 관리",
        "subjects": [
            {"id": "network-theory", "name": "네트워크 이론", "topics": [
                {"id": "osi-layer", "name": "OSI 7계층", "questions": [
                    {"q": "OSI 7계층을 설명하시오.", "a": "물리-데이터링크-네트워크-전송-세션-표현-응용"},
                    {"q": "TCP/IP 4계층을 설명하시오.", "a": "네트워크액세스-인터넷-전송-응용"},
                ]},
            ]},
            {"id": "network-equipment", "name": "네트워크 장비", "topics": [
                {"id": "device", "name": "장비 구성", "questions": [
                    {"q": "라우터와 스위치의 차이를 설명하시오.", "a": "라우터: L3 IP기반, 스위치: L2 MAC기반"},
                    {"q": "VLAN의 개념을 설명하시오.", "a": "논리적 네트워크 분할, 브로드캐스트 도메인 분리"},
                ]},
            ]},
            {"id": "protocol", "name": "프로토콜", "topics": [
                {"id": "tcp-ip", "name": "TCP/IP", "questions": [
                    {"q": "TCP와 UDP의 차이를 설명하시오.", "a": "TCP: 연결지향/신뢰성, UDP: 비연결/빠른속도"},
                    {"q": "IP 주소 클래스를 설명하시오.", "a": "A(0-127), B(128-191), C(192-223)"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "config", "name": "장비 설정", "questions": [
                    {"q": "라우터 기본 설정 명령어를 나열하시오.", "a": "enable, configure terminal, hostname, interface"},
                ]},
            ]},
        ]
    },
    {
        "id": "computer-organization",
        "name": "전자계산기조직응용기사",
        "emoji": "⚙️",
        "desc": "컴퓨터시스템 응용",
        "subjects": [
            {"id": "computer-architecture", "name": "전자계산기 구조", "topics": [
                {"id": "cpu", "name": "CPU 구조", "questions": [
                    {"q": "CPU의 구성요소를 설명하시오.", "a": "ALU, 제어장치, 레지스터"},
                    {"q": "파이프라이닝을 설명하시오.", "a": "명령어 중첩 실행으로 성능 향상"},
                ]},
                {"id": "memory", "name": "메모리", "questions": [
                    {"q": "캐시 메모리의 사상 방식을 설명하시오.", "a": "직접, 연관, 집합연관 사상"},
                    {"q": "가상 메모리를 설명하시오.", "a": "보조기억장치를 주기억장치처럼 사용"},
                ]},
            ]},
            {"id": "operating-system", "name": "운영체제", "topics": [
                {"id": "process", "name": "프로세스 관리", "questions": [
                    {"q": "프로세스 스케줄링 알고리즘을 설명하시오.", "a": "FCFS, SJF, RR, 우선순위"},
                    {"q": "교착상태 조건을 설명하시오.", "a": "상호배제, 점유대기, 비선점, 순환대기"},
                ]},
            ]},
            {"id": "data-communication", "name": "데이터통신", "topics": [
                {"id": "transmission", "name": "전송 기술", "questions": [
                    {"q": "데이터 전송 방식을 설명하시오.", "a": "단방향, 반이중, 전이중"},
                    {"q": "다중화 기법을 설명하시오.", "a": "FDM, TDM, CDM, WDM"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "system-practice", "name": "시스템 실무", "questions": [
                    {"q": "시스템 성능 분석 지표를 설명하시오.", "a": "처리량, 응답시간, 가용성, 신뢰성"},
                ]},
            ]},
        ]
    },
    {
        "id": "computer-system-pro",
        "name": "컴퓨터시스템응용기술사",
        "emoji": "🏆",
        "desc": "최고급 전문가",
        "subjects": [
            {"id": "system-design", "name": "시스템 설계", "topics": [
                {"id": "architecture", "name": "아키텍처", "questions": [
                    {"q": "엔터프라이즈 아키텍처를 설명하시오.", "a": "비즈니스, 데이터, 기술, 어플리케이션 아키텍처"},
                    {"q": "마이크로서비스 아키텍처를 설명하시오.", "a": "독립적 서비스 단위로 분리, API 통신"},
                ]},
            ]},
            {"id": "emerging-tech", "name": "신기술", "topics": [
                {"id": "cloud-ai", "name": "클라우드/AI", "questions": [
                    {"q": "클라우드 서비스 모델을 설명하시오.", "a": "IaaS, PaaS, SaaS"},
                    {"q": "AI/ML 기술 동향을 설명하시오.", "a": "딥러닝, 자연어처리, 컴퓨터비전"},
                ]},
            ]},
            {"id": "practical", "name": "면접", "topics": [
                {"id": "interview", "name": "면접 대비", "questions": [
                    {"q": "기술사로서의 역할을 설명하시오.", "a": "기술자문, 감리, 설계, 품질관리"},
                ]},
            ]},
        ]
    },
    {
        "id": "information-management-pro",
        "name": "정보관리기술사",
        "emoji": "📊",
        "desc": "최고급 전문가",
        "subjects": [
            {"id": "information-strategy", "name": "정보전략계획", "topics": [
                {"id": "isp", "name": "ISP/EA", "questions": [
                    {"q": "정보전략계획(ISP)을 설명하시오.", "a": "현행분석→목표설계→실행계획"},
                    {"q": "EA 프레임워크를 설명하시오.", "a": "Zachman, TOGAF, FEAF"},
                ]},
            ]},
            {"id": "project-management", "name": "프로젝트관리", "topics": [
                {"id": "pm-process", "name": "PM 프로세스", "questions": [
                    {"q": "PMBOK 지식영역을 설명하시오.", "a": "범위, 일정, 원가, 품질, 자원, 통신, 리스크, 조달, 이해관계자"},
                    {"q": "애자일 방법론을 설명하시오.", "a": "스크럼, 칸반, XP, 린"},
                ]},
            ]},
            {"id": "practical", "name": "면접", "topics": [
                {"id": "interview", "name": "면접 대비", "questions": [
                    {"q": "IT 거버넌스를 설명하시오.", "a": "IT 자원과 정보의 효율적 활용을 위한 의사결정 체계"},
                ]},
            ]},
        ]
    },
]

def create_dir(path):
    os.makedirs(path, exist_ok=True)

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {path}")

# 카테고리 페이지
def gen_category_page():
    certs_list = ",\n    ".join([
        f'''{{ id: '{c["id"]}', name: '{c["name"]}', emoji: '{c["emoji"]}', desc: '{c["desc"]}', hasPage: true }}'''
        for c in CERTS
    ])

    return f'''\'use client\';

import Link from 'next/link';

const certifications = [
    {certs_list}
];

export default function ITCategoryPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{CATEGORY_NAME}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">{CATEGORY_EMOJI}</span>
          <h1 className="text-4xl font-bold mb-4">{CATEGORY_NAME}</h1>
          <p className="text-xl text-{CATEGORY_COLOR1}-100">정보처리, 보안, 네트워크 분야 자격증</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{certifications.map((cert) => (
            <Link
              key={{cert.id}}
              href={{cert.hasPage ? `/category/{CATEGORY_ID}/${{cert.id}}` : '#'}}
              className={{`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition ${{!cert.hasPage && 'opacity-50 cursor-not-allowed'}}`}}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{{cert.emoji}}</span>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{{cert.name}}</h2>
                  <p className="text-sm text-gray-500">{{cert.desc}}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-{CATEGORY_COLOR1}-600 text-sm font-medium">{{cert.hasPage ? '학습하기 →' : '준비중'}}</span>
              </div>
            </Link>
          ))}}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

# 자격증 메인 페이지
def gen_main_page(cert):
    subjects_list = ",\n    ".join([
        f'''{{ id: '{s["id"]}', name: '{s["name"]}', emoji: '📖', desc: '{s["name"]} 학습' }}'''
        for s in cert["subjects"]
    ])

    return f'''\'use client\';

import Link from 'next/link';

const subjects = [
    {subjects_list}
];

export default function {cert["id"].replace("-", "").title()}MainPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{cert["name"]}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">{cert["emoji"]}</span>
          <h1 className="text-4xl font-bold mb-4">{cert["name"]}</h1>
          <p className="text-xl text-{CATEGORY_COLOR1}-100">{cert["desc"]}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/category/{CATEGORY_ID}/{cert["id"]}/exam" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📋</span>
              <div>
                <h2 className="font-bold text-lg text-gray-800">시험 정보</h2>
                <p className="text-sm text-gray-500">시험 일정, 응시자격, 합격기준</p>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 과목별 학습</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{subjects.map((subject) => (
            <Link
              key={{subject.id}}
              href={{`/category/{CATEGORY_ID}/{cert["id"]}/study/${{subject.id}}`}}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{{subject.emoji}}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{{subject.name}}</h3>
                  <p className="text-sm text-gray-500">{{subject.desc}}</p>
                </div>
              </div>
            </Link>
          ))}}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

# 시험 정보 페이지
def gen_exam_page(cert):
    return f'''\'use client\';

import Link from 'next/link';

export default function {cert["id"].replace("-", "").title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">시험 정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{cert["name"]} 시험 정보</h1>
          <p className="text-{CATEGORY_COLOR1}-100">{cert["desc"]}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정</h2>
            <p className="text-gray-600">한국산업인력공단 Q-Net에서 확인</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
            <p className="text-gray-600">관련 학과 졸업 또는 경력 요건</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✅ 합격 기준</h2>
            <p className="text-gray-600">필기: 과목당 40점, 평균 60점 이상<br/>실기: 60점 이상</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💰 응시 비용</h2>
            <p className="text-gray-600">필기: 19,400원 / 실기: 22,600원</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

# Study 페이지
def gen_study_page(cert, subject):
    topics_list = []
    for topic in subject["topics"]:
        questions_list = []
        for i, q in enumerate(topic["questions"], 1):
            prompt = f'{cert["name"]} {subject["name"]} 문제입니다.\\n\\n문제: {q["q"]}\\n\\n다음 순서로 설명해주세요:\\n1. 핵심 개념 정리\\n2. 상세 설명\\n3. 적용 예시\\n4. 관련 공식\\n5. 연습문제 3개'
            questions_list.append(f'''{{
        id: {i},
        question: '{q["q"]}',
        answer: '{q["a"]}',
        prompt: `{prompt}`
      }}''')

        topics_list.append(f'''{{
    id: '{topic["id"]}',
    name: '{topic["name"]}',
    color: 'from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500',
    questions: [
      {",".join(questions_list)}
    ]
  }}''')

    func_name = subject["id"].replace("-", "").title() + "StudyPage"
    storage_key = subject["id"] + "-progress"

    return f'''\'use client\';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
  {",".join(topics_list)}
];

export default function {func_name}() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{storage_key}');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = topicId + "-" + questionId;
    const newCompleted = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem('{storage_key}', JSON.stringify(newCompleted));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics((prev) => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{subject["name"]}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">{cert["emoji"]}</span></div>
              <div>
                <h1 className="text-2xl font-bold">{subject["name"]} 학습</h1>
                <p className="text-{CATEGORY_COLOR1}-100">{cert["name"]}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{{progress}}%</p>
              <p className="text-{CATEGORY_COLOR1}-100 text-sm">{{completedCount}}/{{totalQuestions}} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{{{ width: progress + "%" }}}} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {{topics.map((topic) => {{
            const topicCompleted = topic.questions.filter((q) => completedQuestions[topic.id + "-" + q.id]).length;
            return (
              <div key={{topic.id}} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={{() => toggleTopic(topic.id)}} className={{"w-full p-4 bg-gradient-to-r " + topic.color + " text-white flex items-center justify-between"}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{{topic.name}}</h2>
                      <p className="text-sm opacity-80">{{topicCompleted}}/{{topic.questions.length}} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{{expandedTopics[topic.id] ? "−" : "+"}}</span>
                </button>
                {{expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {{topic.questions.map((q) => {{
                      const isCompleted = completedQuestions[topic.id + "-" + q.id];
                      return (
                        <div key={{q.id}} className={{"p-4 rounded-lg border-2 transition " + (isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")}}>
                          <div className="flex items-start gap-3">
                            <button onClick={{() => toggleComplete(topic.id, q.id)}} className={{"mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition " + (isCompleted ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500")}}>
                              {{isCompleted && "✓"}}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{{q.id}}. {{q.question}}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {{q.answer}}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={{"https://claude.ai/new?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={{"https://chat.openai.com/?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={{"https://gemini.google.com/app?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }})}}
                  </div>
                )}}
              </div>
            );
          }})}}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

# 메인 실행
base_path = os.path.dirname(os.path.abspath(__file__))

# 카테고리 폴더
create_dir(base_path)
write_file(os.path.join(base_path, "page.tsx"), "export { default } from './category-page';")
write_file(os.path.join(base_path, "category-page.tsx"), gen_category_page())

# 각 자격증
for cert in CERTS:
    cert_path = os.path.join(base_path, cert["id"])
    create_dir(cert_path)

    # page.tsx, main-page.tsx
    write_file(os.path.join(cert_path, "page.tsx"), "export { default } from './main-page';")
    write_file(os.path.join(cert_path, "main-page.tsx"), gen_main_page(cert))

    # exam 폴더
    exam_path = os.path.join(cert_path, "exam")
    create_dir(exam_path)
    write_file(os.path.join(exam_path, "page.tsx"), "export { default } from '../exam-page';")
    write_file(os.path.join(cert_path, "exam-page.tsx"), gen_exam_page(cert))

    # study 폴더
    for subject in cert["subjects"]:
        study_path = os.path.join(cert_path, "study", subject["id"])
        create_dir(study_path)
        write_file(os.path.join(study_path, "page.tsx"), gen_study_page(cert, subject))

print("\\n✅ IT·정보통신 카테고리 생성 완료!")
