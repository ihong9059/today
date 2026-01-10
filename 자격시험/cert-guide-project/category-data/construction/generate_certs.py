import os

BASE = "C:/todo/today/자격시험/construction"

# 자격증 정보
certs = [
    {
        "id": "civil-engineer",
        "name": "토목기사",
        "english": "Civil Engineer",
        "icon": "🌉",
        "color1": "amber",
        "color2": "orange",
        "subjects": [
            ("applied-mechanics", "응용역학", "역학 기초 및 구조해석"),
            ("surveying", "측량학", "측량 원리 및 실무"),
            ("hydraulics", "수리학", "유체역학 및 수공학"),
            ("soil-mechanics", "토질 및 기초", "토질역학 및 기초공학"),
            ("reinforced-concrete", "철근콘크리트", "RC 구조 설계"),
            ("practical", "실기", "토목 설계 및 시공"),
        ],
        "topics_data": {
            "applied-mechanics": [
                ("stress-analysis", "응력해석", [
                    ("단순보의 반력과 전단력, 휨모멘트를 구하시오.", "V=wL/2, Mmax=wL²/8"),
                    ("트러스 구조의 부재력 계산 방법을 설명하시오.", "절점법, 단면법 적용"),
                ]),
                ("structural-analysis", "구조해석", [
                    ("부정정 구조물의 해석 방법을 설명하시오.", "처짐각법, 모멘트분배법, 매트릭스법"),
                ]),
            ],
            "surveying": [
                ("leveling", "수준측량", [
                    ("직접수준측량과 간접수준측량의 차이점을 설명하시오.", "레벨 사용 vs 삼각측량 이용"),
                    ("레벨 조정법(양차법)을 설명하시오.", "기계오차 소거를 위해 중간에 레벨 설치"),
                ]),
                ("traversing", "다각측량", [
                    ("폐합트래버스의 조정 방법을 설명하시오.", "위거조정법, 콤파스법칙"),
                ]),
            ],
            "hydraulics": [
                ("fluid-mechanics", "유체역학", [
                    ("베르누이 방정식을 설명하고 적용 예를 드시오.", "에너지 보존: P/γ + V²/2g + Z = 일정"),
                    ("관수로와 개수로의 차이점을 설명하시오.", "관수로: 압력, 개수로: 자유수면"),
                ]),
            ],
            "soil-mechanics": [
                ("soil-properties", "토질 특성", [
                    ("흙의 다짐 시험에서 최적함수비와 최대건조밀도를 설명하시오.", "다짐곡선에서 최대값과 그때의 함수비"),
                    ("연약지반 개량공법의 종류를 설명하시오.", "치환공법, 압밀공법, 고결공법"),
                ]),
            ],
            "reinforced-concrete": [
                ("rc-design", "RC 설계", [
                    ("철근콘크리트 보의 설계 순서를 설명하시오.", "하중산정→단면결정→철근량산정→상세설계"),
                    ("강도설계법과 허용응력설계법의 차이를 설명하시오.", "극한강도 vs 사용하중 기준"),
                ]),
            ],
            "practical": [
                ("civil-design", "토목 설계", [
                    ("토목 구조물 설계 시 하중조합을 설명하시오.", "고정하중, 활하중, 충격, 풍하중, 지진"),
                ]),
            ],
        },
    },
    {
        "id": "construction-safety",
        "name": "건설안전기사",
        "english": "Construction Safety Engineer",
        "icon": "🦺",
        "color1": "yellow",
        "color2": "amber",
        "subjects": [
            ("safety-management", "안전관리론", "안전관리 기본"),
            ("construction-safety", "건설안전기술", "건설현장 안전"),
            ("construction-materials", "건설재료학", "건설 재료"),
            ("safety-law", "안전관계법규", "산업안전보건법"),
            ("practical", "실기", "안전관리 실무"),
        ],
        "topics_data": {
            "safety-management": [
                ("safety-basics", "안전관리 기초", [
                    ("하인리히의 재해발생 이론을 설명하시오.", "1:29:300 법칙, 도미노 이론"),
                    ("안전관리 조직의 형태를 설명하시오.", "직계식, 참모식, 직계참모식"),
                ]),
            ],
            "construction-safety": [
                ("site-safety", "현장안전", [
                    ("건설현장 추락재해 방지대책을 설명하시오.", "안전난간, 안전망, 안전대, 개구부 덮개"),
                    ("굴착공사 시 안전대책을 설명하시오.", "흙막이, 토사붕괴방지, 지하매설물 확인"),
                ]),
            ],
            "construction-materials": [
                ("material-properties", "재료특성", [
                    ("콘크리트의 압축강도 시험 방법을 설명하시오.", "공시체 제작, 28일 양생, 압축시험"),
                ]),
            ],
            "safety-law": [
                ("osha-law", "산업안전보건법", [
                    ("안전보건관리체계의 구성을 설명하시오.", "안전보건관리책임자, 관리감독자, 안전보건총괄책임자"),
                ]),
            ],
            "practical": [
                ("safety-practice", "안전실무", [
                    ("위험성평가의 절차와 방법을 설명하시오.", "위험요인파악→위험성결정→감소대책→기록"),
                ]),
            ],
        },
    },
    {
        "id": "surveying-geo",
        "name": "측량및지형공간정보기사",
        "english": "Surveying & Geo-Spatial Engineer",
        "icon": "📐",
        "color1": "teal",
        "color2": "cyan",
        "subjects": [
            ("geodesy", "측지학", "측지측량"),
            ("photogrammetry", "사진측량", "항공사진측량"),
            ("gis", "GIS", "지리정보시스템"),
            ("cadastral", "지적학", "지적측량"),
            ("practical", "실기", "측량 실무"),
        ],
        "topics_data": {
            "geodesy": [
                ("geodetic-survey", "측지측량", [
                    ("지오이드와 타원체의 차이를 설명하시오.", "지오이드: 평균해수면, 타원체: 수학적 모델"),
                    ("GNSS 측량의 원리를 설명하시오.", "위성신호 수신, 삼변측량 원리"),
                ]),
            ],
            "photogrammetry": [
                ("aerial-photo", "항공사진", [
                    ("항공사진의 내부표정 요소를 설명하시오.", "초점거리, 주점위치, 렌즈왜곡"),
                    ("수치표고모델(DEM)의 제작 방법을 설명하시오.", "스테레오 영상 매칭, 보간법"),
                ]),
            ],
            "gis": [
                ("gis-basics", "GIS 기초", [
                    ("벡터 데이터와 래스터 데이터의 차이를 설명하시오.", "벡터: 점,선,면 / 래스터: 격자셀"),
                    ("공간분석의 종류를 설명하시오.", "버퍼분석, 중첩분석, 네트워크분석"),
                ]),
            ],
            "cadastral": [
                ("cadastral-survey", "지적측량", [
                    ("지적측량의 종류를 설명하시오.", "신규등록, 등록전환, 분할, 경계복원"),
                    ("면적측정 방법을 설명하시오.", "좌표법, 플라니미터법, 삼사법"),
                ]),
            ],
            "practical": [
                ("survey-practice", "측량실무", [
                    ("토탈스테이션 측량 순서를 설명하시오.", "기계설치→정준→영점조정→관측"),
                ]),
            ],
        },
    },
    {
        "id": "interior-architect",
        "name": "실내건축기사",
        "english": "Interior Architect Engineer",
        "icon": "🛋️",
        "color1": "purple",
        "color2": "pink",
        "subjects": [
            ("interior-design", "실내디자인론", "실내공간 계획"),
            ("interior-materials", "실내건축재료", "인테리어 재료"),
            ("interior-structure", "실내건축구조", "실내 구조"),
            ("color-lighting", "색채 및 조명", "색채/조명 계획"),
            ("practical", "실기", "실내디자인 실무"),
        ],
        "topics_data": {
            "interior-design": [
                ("space-planning", "공간계획", [
                    ("실내공간 구성요소를 설명하시오.", "바닥, 벽, 천장, 가구, 조명"),
                    ("인간공학적 치수 적용 예를 드시오.", "의자높이 420mm, 작업면 720mm 등"),
                ]),
            ],
            "interior-materials": [
                ("finish-materials", "마감재료", [
                    ("바닥마감재의 종류와 특징을 설명하시오.", "타일, 목재, 비닐, 카펫, 석재"),
                    ("친환경 인증제도를 설명하시오.", "HB마크, 환경마크, GR마크"),
                ]),
            ],
            "interior-structure": [
                ("partition", "칸막이", [
                    ("경량칸막이 시공 방법을 설명하시오.", "스터드+석고보드, 건식공법"),
                ]),
            ],
            "color-lighting": [
                ("color-theory", "색채이론", [
                    ("먼셀 색체계를 설명하시오.", "색상(H), 명도(V), 채도(C)"),
                    ("조명의 연색성 지수(CRI)를 설명하시오.", "기준광 대비 색 재현 정도, Ra 100 기준"),
                ]),
            ],
            "practical": [
                ("design-practice", "디자인실무", [
                    ("실내디자인 프로세스를 설명하시오.", "기획→설계→시공→사후관리"),
                ]),
            ],
        },
    },
]

def create_page_tsx(cert_id):
    return f"export {{ default }} from './main-page';\n"

def create_exam_page_tsx(cert_id):
    return f"export {{ default }} from '../exam-page';\n"

def create_main_page(cert):
    subjects_jsx = ""
    for sid, sname, sdesc in cert["subjects"]:
        subjects_jsx += f"""
            <Link
              key="{sid}"
              href={{`/category/construction/{cert['id']}/study/{sid}`}}
              className="block bg-gradient-to-r from-{cert['color1']}-500 to-{cert['color2']}-500 rounded-xl p-4 text-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cert['icon']}</span>
                <div>
                  <h3 className="font-bold">{sname}</h3>
                  <p className="text-sm opacity-80">{sdesc}</p>
                </div>
              </div>
              <div className="mt-2 text-right text-sm opacity-80">학습하기 →</div>
            </Link>"""

    return f'''import Link from 'next/link';

export default function {cert['id'].replace('-', '').title()}Page() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{cert['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-{cert['color1']}-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{cert['color1']}-600 font-medium">{cert['name']}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{cert['color1']}-600 to-{cert['color2']}-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">{cert['icon']}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{cert['name']}</h1>
              <p className="text-{cert['color1']}-100 text-lg mb-4">{cert['english']}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2"><span>📊</span><span>국가기술자격</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-{cert['color1']}-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {cert['name']}는 해당 분야의 전문지식과 기술을 갖춘 국가기술자격입니다.
              </p>
            </section>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-{cert['color1']}-500">📚</span> 과목별 학습
            </h2>
            {subjects_jsx}
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

def create_exam_page(cert):
    return f'''import Link from 'next/link';

export default function {cert['id'].replace('-', '').title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{cert['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-{cert['color1']}-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/{cert['id']}" className="text-gray-600 hover:text-{cert['color1']}-600">{cert['name']}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{cert['color1']}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{cert['color1']}-600 to-{cert['color2']}-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">{cert['name']} 시험정보</h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">시험 과목</h2>
          <ul className="space-y-2">
            {"".join([f'<li className="text-gray-600">• {s[1]}</li>' for s in cert['subjects']])}
          </ul>
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

def create_study_page(cert, subject_id, subject_name, topics):
    topics_data = []
    for tid, tname, questions in topics:
        q_data = []
        for i, (q, a) in enumerate(questions, 1):
            prompt = f"{cert['name']} {subject_name} 문제입니다.\\n\\n문제: {q}\\n\\n다음 순서로 설명해주세요:\\n1. 핵심 개념 정리\\n2. 상세 설명\\n3. 적용 예시\\n4. 관련 공식\\n5. 연습문제 3개"
            q_data.append(f'''      {{
        id: {i},
        question: '{q}',
        answer: '{a}',
        prompt: `{prompt}`
      }}''')
        topics_data.append(f'''  {{
    id: '{tid}',
    name: '{tname}',
    color: 'from-{cert["color1"]}-500 to-{cert["color2"]}-500',
    questions: [
{",".join(q_data)}
    ]
  }}''')

    return f''''use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
{",".join(topics_data)}
];

export default function {subject_id.replace('-', '').title()}StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{subject_id}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = topicId + "-" + questionId;
    const newCompleted = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem('{subject_id}-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-{cert['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-600 hover:text-{cert['color1']}-600">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/{cert['id']}" className="text-gray-600 hover:text-{cert['color1']}-600">{cert['name']}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{cert['color1']}-600 font-medium">{subject_name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{cert['color1']}-500 to-{cert['color2']}-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">{cert['icon']}</span></div>
              <div>
                <h1 className="text-2xl font-bold">{subject_name} 학습</h1>
                <p className="text-{cert['color1']}-100">{cert['name']}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{{progress}}%</p>
              <p className="text-{cert['color1']}-100 text-sm">{{completedCount}}/{{totalQuestions}} 완료</p>
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

# Generate files for each cert
for cert in certs:
    cert_path = f"{BASE}/{cert['id']}"

    # Create directories
    os.makedirs(cert_path, exist_ok=True)
    os.makedirs(f"{cert_path}/exam", exist_ok=True)

    # page.tsx
    with open(f"{cert_path}/page.tsx", "w", encoding="utf-8") as f:
        f.write(create_page_tsx(cert['id']))
    print(f"Created: {cert_path}/page.tsx")

    # main-page.tsx
    with open(f"{cert_path}/main-page.tsx", "w", encoding="utf-8") as f:
        f.write(create_main_page(cert))
    print(f"Created: {cert_path}/main-page.tsx")

    # exam/page.tsx
    with open(f"{cert_path}/exam/page.tsx", "w", encoding="utf-8") as f:
        f.write(create_exam_page_tsx(cert['id']))
    print(f"Created: {cert_path}/exam/page.tsx")

    # exam-page.tsx
    with open(f"{cert_path}/exam-page.tsx", "w", encoding="utf-8") as f:
        f.write(create_exam_page(cert))
    print(f"Created: {cert_path}/exam-page.tsx")

    # Study pages
    for subject_id, subject_name, _ in cert["subjects"]:
        study_path = f"{cert_path}/study/{subject_id}"
        os.makedirs(study_path, exist_ok=True)

        topics = cert["topics_data"].get(subject_id, [("default", "기본", [("기본 문제를 풀어보세요.", "기본 답변")])])

        with open(f"{study_path}/page.tsx", "w", encoding="utf-8") as f:
            f.write(create_study_page(cert, subject_id, subject_name, topics))
        print(f"Created: {study_path}/page.tsx")

print("\\nAll files generated successfully!")
