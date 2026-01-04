# -*- coding: utf-8 -*-
import os

BASE_DIR = r"C:\todo\today\자격시험\legal"
CATEGORY_ID = "legal"
CATEGORY_NAME = "법률"
CATEGORY_COLOR = "violet"
GRADIENT = "from-violet-500 to-purple-600"

CERTIFICATIONS = [
    {
        "id": "judicial-scrivener",
        "name": "법무사",
        "description": "법률사무 전문가",
        "examInfo": {
            "schedule": "1차 8월, 2차 10~11월",
            "passRate": "2.36%",
            "subjects": "헌법, 민법, 상법, 민사집행법, 부동산등기법 등",
            "examType": "1차 객관식, 2차 주관식",
            "eligibility": "제한 없음"
        },
        "subjects": [
            {"id": "civil-law", "name": "민법", "color": "from-violet-500 to-purple-500"}
        ]
    },
    {
        "id": "patent-attorney",
        "name": "변리사",
        "description": "특허·상표 등 지적재산권 전문가",
        "examInfo": {
            "schedule": "1차 2월, 2차 7월",
            "passRate": "약 15~20%",
            "subjects": "산업재산권법, 민법개론, 자연과학개론, 특허법, 상표법 등",
            "examType": "1차 객관식, 2차 주관식 논술",
            "eligibility": "제한 없음"
        },
        "subjects": [
            {"id": "patent-law", "name": "특허법", "color": "from-violet-500 to-purple-500"}
        ]
    },
    {
        "id": "labor-attorney",
        "name": "공인노무사",
        "description": "노동 관련 법률 전문가",
        "examInfo": {
            "schedule": "1차 6월, 2차 8월, 3차 면접",
            "passRate": "약 20%",
            "subjects": "노동법, 민법, 사회보험법, 경영학 등",
            "examType": "1차 객관식, 2차 주관식, 3차 면접",
            "eligibility": "제한 없음"
        },
        "subjects": [
            {"id": "labor-law", "name": "노동법", "color": "from-violet-500 to-purple-500"}
        ]
    },
    {
        "id": "appraiser",
        "name": "감정평가사",
        "description": "부동산 및 동산 가치평가 전문가",
        "examInfo": {
            "schedule": "1차 4월, 2차 7월",
            "passRate": "약 23%",
            "subjects": "감정평가관계법규, 회계학, 경제학, 민법, 부동산학 등",
            "examType": "1차 객관식, 2차 주관식",
            "eligibility": "제한 없음"
        },
        "subjects": [
            {"id": "appraisal-law", "name": "감정평가이론", "color": "from-violet-500 to-purple-500"}
        ]
    }
]

STUDY_QUESTIONS = {
    "civil-law": [
        {"id": 1, "question": "민법 제1조에서 규정하는 법원(法源)은?", "answer": "법률에 규정이 없으면 관습법에 의하고, 관습법이 없으면 조리에 의한다.", "keywords": "법원, 관습법, 조리"},
        {"id": 2, "question": "권리능력의 시기와 종기는?", "answer": "권리능력은 출생으로 시작하여 사망으로 종료한다. 태아도 일정한 경우 권리능력이 있다.", "keywords": "권리능력, 출생, 사망, 태아"},
        {"id": 3, "question": "법률행위의 요건 3가지는?", "answer": "성립요건(당사자, 목적, 의사표시), 효력요건(권리능력, 행위능력, 적법성), 대항요건(등기, 점유)", "keywords": "성립요건, 효력요건, 대항요건"},
        {"id": 4, "question": "물권법정주의란?", "answer": "물권은 법률 또는 관습법에 의하는 외에는 임의로 창설하지 못한다는 원칙", "keywords": "물권법정주의, 관습법"},
        {"id": 5, "question": "점유권과 소유권의 차이점은?", "answer": "점유권은 물건을 사실상 지배하는 권리, 소유권은 법률상 전면적 지배권", "keywords": "점유권, 소유권, 지배권"},
        {"id": 6, "question": "저당권의 특징 3가지는?", "answer": "부종성(피담보채권에 종속), 수반성(채권과 함께 이전), 불가분성(전부 변제 시까지 존속)", "keywords": "저당권, 부종성, 수반성, 불가분성"},
        {"id": 7, "question": "채권자대위권이란?", "answer": "채권자가 자기의 채권을 보전하기 위하여 채무자의 권리를 대위하여 행사하는 권리", "keywords": "채권자대위권, 채권보전"}
    ],
    "patent-law": [
        {"id": 1, "question": "특허요건 3가지는?", "answer": "산업상 이용가능성, 신규성, 진보성", "keywords": "특허요건, 신규성, 진보성"},
        {"id": 2, "question": "특허권의 존속기간은?", "answer": "출원일로부터 20년 (의약품 등은 최대 5년 연장 가능)", "keywords": "존속기간, 20년"},
        {"id": 3, "question": "선원주의란?", "answer": "동일한 발명에 대해 먼저 출원한 자에게 특허권을 부여하는 원칙", "keywords": "선원주의, 먼저 출원"},
        {"id": 4, "question": "특허출원 절차는?", "answer": "출원 → 방식심사 → 출원공개(18개월) → 심사청구 → 실체심사 → 등록결정/거절결정", "keywords": "출원절차, 심사청구"},
        {"id": 5, "question": "균등론이란?", "answer": "청구범위 문언과 동일하지 않더라도 실질적으로 동일한 기술은 침해로 보는 이론", "keywords": "균등론, 침해"},
        {"id": 6, "question": "직무발명이란?", "answer": "종업원이 그 직무에 관하여 발명한 것으로 사용자의 업무범위에 속하는 발명", "keywords": "직무발명, 종업원"},
        {"id": 7, "question": "특허심판의 종류는?", "answer": "거절결정불복심판, 무효심판, 정정심판, 권리범위확인심판 등", "keywords": "특허심판, 무효심판"}
    ],
    "labor-law": [
        {"id": 1, "question": "근로기준법상 근로시간의 원칙은?", "answer": "1주 40시간, 1일 8시간을 초과할 수 없다 (휴게시간 제외)", "keywords": "근로시간, 40시간, 8시간"},
        {"id": 2, "question": "해고의 정당한 사유란?", "answer": "근로자의 귀책사유 또는 경영상 이유로 인한 해고로서 사회통념상 상당하다고 인정되는 경우", "keywords": "해고, 정당한 사유"},
        {"id": 3, "question": "부당노동행위의 유형 5가지는?", "answer": "불이익취급, 비열계약, 단체교섭거부, 지배개입, 경비원조", "keywords": "부당노동행위, 지배개입"},
        {"id": 4, "question": "단체협약의 효력은?", "answer": "규범적 효력(근로조건), 채무적 효력(당사자 의무), 일반적 구속력", "keywords": "단체협약, 규범적 효력"},
        {"id": 5, "question": "쟁의행위의 정당성 요건은?", "answer": "주체, 목적, 절차, 수단·방법의 정당성을 모두 갖추어야 함", "keywords": "쟁의행위, 정당성"},
        {"id": 6, "question": "통상임금과 평균임금의 차이는?", "answer": "통상임금은 소정근로의 대가, 평균임금은 3개월간 총임금/총일수", "keywords": "통상임금, 평균임금"},
        {"id": 7, "question": "근로계약의 기간 제한은?", "answer": "기간제 근로자는 2년을 초과하여 사용할 수 없음 (예외 있음)", "keywords": "기간제, 2년"}
    ],
    "appraisal-law": [
        {"id": 1, "question": "감정평가의 3방식은?", "answer": "비교방식(거래사례비교법), 원가방식(원가법), 수익방식(수익환원법)", "keywords": "3방식, 비교방식, 원가방식, 수익방식"},
        {"id": 2, "question": "시장가치란?", "answer": "통상적인 시장에서 충분한 기간 동안 거래된다면 성립될 것으로 기대되는 적정가격", "keywords": "시장가치, 적정가격"},
        {"id": 3, "question": "최유효이용이란?", "answer": "합법적이고 합리적인 이용방법 중 물리적으로 가능하고 경제적으로 가장 높은 수익을 올리는 이용", "keywords": "최유효이용"},
        {"id": 4, "question": "지역분석과 개별분석의 차이는?", "answer": "지역분석은 해당 지역의 표준적 이용, 개별분석은 대상부동산의 최유효이용 파악", "keywords": "지역분석, 개별분석"},
        {"id": 5, "question": "토지보상법상 보상원칙은?", "answer": "현금보상, 사업시행자보상, 개인별보상, 일괄보상, 사전보상 원칙", "keywords": "보상원칙, 현금보상"},
        {"id": 6, "question": "수익환원법의 기본공식은?", "answer": "가격 = 순수익 / 환원이율", "keywords": "수익환원법, 환원이율"},
        {"id": 7, "question": "공시지가란?", "answer": "국토교통부장관이 조사·평가하여 공시한 표준지의 단위면적당 가격", "keywords": "공시지가, 표준지"}
    ]
}

def create_page_tsx(export_from):
    return f"export {{ default }} from './{export_from}';\n"

def create_category_page():
    certs_array = ",\n    ".join([
        f'''{{
      id: '{c["id"]}',
      name: '{c["name"]}',
      description: '{c["description"]}',
      href: '/category/{CATEGORY_ID}/{c["id"]}'
    }}''' for c in CERTIFICATIONS
    ])

    return f'''\'use client\';

import Link from 'next/link';

const certifications = [
    {certs_array}
];

export default function LegalCategoryPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">{CATEGORY_NAME}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r {GRADIENT} rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">⚖️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{CATEGORY_NAME} 분야 자격증</h1>
          <p className="text-gray-600">법률 분야 전문 자격증 시험 정보 및 학습 가이드</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {{certifications.map((cert) => (
            <Link key={{cert.id}} href={{cert.href}}>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r {GRADIENT} rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl text-white">⚖️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{{cert.name}}</h3>
                    <p className="text-sm text-gray-500">{{cert.description}}</p>
                  </div>
                  <div className="text-{CATEGORY_COLOR}-500">→</div>
                </div>
              </div>
            </Link>
          ))}}
        </div>
      </div>
    </div>
  );
}}
'''

def create_cert_page_tsx():
    return "export { default } from './main-page';\n"

def create_cert_main_page(cert):
    subjects_array = ",\n      ".join([
        f"{{ id: '{s['id']}', name: '{s['name']}' }}" for s in cert["subjects"]
    ])

    return f'''\'use client\';

import Link from 'next/link';

const subjects = [
      {subjects_array}
];

export default function {cert["id"].replace("-", "").title()}MainPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">{cert["name"]}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r {GRADIENT} rounded-xl mb-4">
            <span className="text-3xl">⚖️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{cert["name"]}</h1>
          <p className="text-gray-600">{cert["description"]}</p>
        </div>

        <div className="grid gap-4 mb-8">
          <Link href="/category/{CATEGORY_ID}/{cert["id"]}/exam">
            <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition border-l-4 border-{CATEGORY_COLOR}-500">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-bold text-gray-800">시험 정보</h3>
                  <p className="text-sm text-gray-500">일정, 과목, 합격률 등</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
        <div className="grid gap-3">
          {{subjects.map((subject) => (
            <Link key={{subject.id}} href={{`/category/{CATEGORY_ID}/{cert["id"]}/study/${{subject.id}}`}}>
              <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition flex items-center justify-between">
                <span className="font-medium text-gray-700">{{subject.name}}</span>
                <span className="text-{CATEGORY_COLOR}-500">→</span>
              </div>
            </Link>
          ))}}
        </div>
      </div>
    </div>
  );
}}
'''

def create_exam_page_tsx():
    return "export { default } from '../exam-page';\n"

def create_exam_page(cert):
    return f'''\'use client\';

import Link from 'next/link';

export default function {cert["id"].replace("-", "").title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 {cert["name"]} 시험 정보</h1>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📅 시험 일정</h3>
            <p className="text-gray-600">{cert["examInfo"]["schedule"]}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📝 시험 과목</h3>
            <p className="text-gray-600">{cert["examInfo"]["subjects"]}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📊 합격률</h3>
            <p className="text-gray-600">{cert["examInfo"]["passRate"]}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">📄 시험 형식</h3>
            <p className="text-gray-600">{cert["examInfo"]["examType"]}</p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow">
            <h3 className="font-bold text-gray-800 mb-2">🎯 응시 자격</h3>
            <p className="text-gray-600">{cert["examInfo"]["eligibility"]}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="inline-flex items-center gap-2 text-{CATEGORY_COLOR}-600 hover:text-{CATEGORY_COLOR}-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}}
'''

def create_study_page(cert, subject):
    questions = STUDY_QUESTIONS.get(subject["id"], [])
    questions_array = ",\n        ".join([
        f'''{{
          id: {q["id"]},
          question: '{q["question"]}',
          answer: '{q["answer"]}',
          prompt: `{cert["name"]} {subject["name"]} 시험 관련 질문입니다.

질문: {q["question"]}

위 질문에 대해 다음을 포함하여 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문 및 판례
3. 실제 시험 출제 포인트
4. 암기 팁

관련 키워드: {q["keywords"]}`
        }}''' for q in questions
    ])

    subject_name_escaped = subject["name"].replace("'", "\\'")

    return f'''\'use client\';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
  {{
    id: '{subject["id"]}',
    name: '{subject_name_escaped}',
    color: '{subject["color"]}',
    questions: [
        {questions_array}
    ],
  }},
];

export default function StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{cert["id"]}-{subject["id"]}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleQuestion = (questionId: string) => {{
    const updated = {{ ...completedQuestions, [questionId]: !completedQuestions[questionId] }};
    setCompletedQuestions(updated);
    localStorage.setItem('{cert["id"]}-{subject["id"]}-progress', JSON.stringify(updated));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics(prev => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">{subject_name_escaped}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📚 {subject_name_escaped}</h1>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r {GRADIENT} h-2 rounded-full transition-all" style={{{{ width: `${{progressPercent}}%` }}}} />
            </div>
            <span className="text-sm text-gray-600">{{completedCount}}/{{totalQuestions}}</span>
          </div>
        </div>

        <div className="space-y-4">
          {{topics.map((topic) => (
            <div key={{topic.id}} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={{() => toggleTopic(topic.id)}} className="w-full px-5 py-4 flex items-center justify-between bg-gradient-to-r {GRADIENT}">
                <h2 className="text-lg font-bold text-white">{{topic.name}}</h2>
                <span className="text-white text-xl">{{expandedTopics[topic.id] ? '−' : '+'}}</span>
              </button>

              {{expandedTopics[topic.id] && (
                <div className="p-4 space-y-3">
                  {{topic.questions.map((q) => (
                    <div key={{q.id}} className={{`p-4 rounded-lg border-2 transition-all ${{completedQuestions[`${{topic.id}}-${{q.id}}`] ? 'border-green-300 bg-green-50' : 'border-gray-100 bg-gray-50'}}`}}>
                      <div className="flex items-start gap-3">
                        <button onClick={{() => toggleQuestion(`${{topic.id}}-${{q.id}}`)}} className={{`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${{completedQuestions[`${{topic.id}}-${{q.id}}`] ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}}`}}>
                          {{completedQuestions[`${{topic.id}}-${{q.id}}`] && '✓'}}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{{q.question}}</p>
                          <p className="text-gray-600 text-sm mb-3 p-3 bg-white rounded border">{{q.answer}}</p>
                          <div className="flex gap-2 flex-wrap">
                            <a href={{`https://claude.ai/new?q=${{encodeURIComponent(q.prompt)}}`}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                            <a href={{`https://chat.openai.com/?q=${{encodeURIComponent(q.prompt)}}`}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                            <a href={{`https://gemini.google.com/app?q=${{encodeURIComponent(q.prompt)}}`}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}}
                </div>
              )}}
            </div>
          ))}}
        </div>

        <div className="mt-8">
          <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="inline-flex items-center gap-2 text-{CATEGORY_COLOR}-600 hover:text-{CATEGORY_COLOR}-700">
            ← 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}}
'''

def main():
    # Create base directory
    os.makedirs(BASE_DIR, exist_ok=True)

    # Create category page.tsx
    with open(os.path.join(BASE_DIR, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(create_page_tsx("category-page"))

    # Create category-page.tsx
    with open(os.path.join(BASE_DIR, "category-page.tsx"), "w", encoding="utf-8") as f:
        f.write(create_category_page())

    # Create each certification
    for cert in CERTIFICATIONS:
        cert_dir = os.path.join(BASE_DIR, cert["id"])
        os.makedirs(cert_dir, exist_ok=True)

        # page.tsx
        with open(os.path.join(cert_dir, "page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_cert_page_tsx())

        # main-page.tsx
        with open(os.path.join(cert_dir, "main-page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_cert_main_page(cert))

        # exam-page.tsx
        with open(os.path.join(cert_dir, "exam-page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_exam_page(cert))

        # exam/page.tsx
        exam_dir = os.path.join(cert_dir, "exam")
        os.makedirs(exam_dir, exist_ok=True)
        with open(os.path.join(exam_dir, "page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_exam_page_tsx())

        # study pages
        for subject in cert["subjects"]:
            study_dir = os.path.join(cert_dir, "study", subject["id"])
            os.makedirs(study_dir, exist_ok=True)
            with open(os.path.join(study_dir, "page.tsx"), "w", encoding="utf-8") as f:
                f.write(create_study_page(cert, subject))

    print("법률 분야 파일 생성 완료!")
    print(f"생성 위치: {BASE_DIR}")

if __name__ == "__main__":
    main()
