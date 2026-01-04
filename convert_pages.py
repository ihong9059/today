import os

BASE = "/home/ec2-user/cert-guide/app/category/medical"

def create_page(cert_id, cert_name, subject_id, subject_name, color1, color2, topics_data):
    topics_lines = []
    for t in topics_data:
        questions_lines = []
        for q in t["questions"]:
            prompt_escaped = q["prompt"].replace("\\", "\\\\").replace("`", "\\`").replace("$", "\\$")
            questions_lines.append(f'''      {{
        id: {q["id"]},
        question: '{q["question"]}',
        answer: '{q["answer"]}',
        prompt: `{prompt_escaped}`
      }}''')
        topics_lines.append(f'''  {{
    id: '{t["id"]}',
    name: '{t["name"]}',
    color: 'from-{color1}-500 to-{color2}-500',
    questions: [
{",".join(questions_lines)}
    ]
  }}''')

    topics_str = ",\n".join(topics_lines)
    first_topic_id = topics_data[0]["id"]

    return f""""use client";

import Link from "next/link";
import {{ useState, useEffect }} from "react";

const topics = [
{topics_str}
];

export default function StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{ "{first_topic_id}": true }});

  useEffect(() => {{
    const saved = localStorage.getItem("{subject_id}-progress");
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = topicId + "-" + questionId;
    const newCompleted = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem("{subject_id}-progress", JSON.stringify(newCompleted));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics(prev => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/{cert_id}" className="text-gray-600 hover:text-pink-600">{cert_name}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">{subject_name}</span>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className={{"bg-gradient-to-r from-{color1}-500 to-{color2}-500 rounded-2xl p-6 text-white mb-8"}}>
          <h1 className="text-3xl font-bold mb-2">{subject_name}</h1>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{{{ width: progressPercent + "%" }}}} />
          </div>
          <p className="text-sm mt-2">{{completedCount}}/{{totalQuestions}} 완료 ({{progressPercent}}%)</p>
        </div>

        <div className="space-y-4">
          {{topics.map((topic) => (
            <div key={{topic.id}} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={{() => toggleTopic(topic.id)}} className={{"w-full p-4 flex items-center justify-between bg-gradient-to-r " + topic.color + " text-white"}}>
                <span className="font-bold text-lg">{{topic.name}}</span>
                <span className="text-2xl">{{expandedTopics[topic.id] ? "−" : "+"}}</span>
              </button>
              {{expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {{topic.questions.map((q) => {{
                    const isCompleted = completedQuestions[topic.id + "-" + q.id];
                    return (
                      <div key={{q.id}} className={{"p-4 rounded-lg border-2 " + (isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")}}>
                        <div className="flex items-start gap-3">
                          <button onClick={{() => toggleComplete(topic.id, q.id)}} className={{"mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition " + (isCompleted ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500")}}>
                            {{isCompleted && "✓"}}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{{q.id}}. {{q.question}}</p>
                            <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {{q.answer}}</p>
                            <div className="flex gap-2 flex-wrap">
                              <a href={{"https://claude.ai/new?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">Claude</a>
                              <a href={{"https://chat.openai.com/?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">ChatGPT</a>
                              <a href={{"https://gemini.google.com/app?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }})}}
                </div>
              )}}
            </div>
          ))}}
        </div>
      </div>
    </div>
  );
}}
"""

pages = [
    ("mental-health-nurse", "정신건강간호사", "psychiatric-nursing", "정신간호학", "emerald", "teal", [
        {"id": "schizophrenia", "name": "조현병", "questions": [
            {"id": 1, "question": "조현병의 양성 증상과 음성 증상을 설명하시오.", "answer": "양성: 환각, 망상 / 음성: 무감동, 무의욕", "prompt": "정신건강간호사 시험 준비입니다. 조현병의 양성 증상(환각, 망상, 사고장애)과 음성 증상(무감동, 무의욕, 사회적 위축)을 비교 설명해주세요."},
            {"id": 2, "question": "조현병 환자의 간호중재를 설명하시오.", "answer": "치료적 관계, 약물관리, 재활", "prompt": "정신건강간호사 시험 준비입니다. 조현병 환자의 간호중재(치료적 관계 형성, 약물관리, 증상관리, 재활)를 설명해주세요."},
        ]},
        {"id": "mood-disorders", "name": "기분장애", "questions": [
            {"id": 1, "question": "주요우울장애의 진단기준을 설명하시오.", "answer": "2주 이상 우울 또는 흥미상실 + 5개 이상 증상", "prompt": "정신건강간호사 시험 준비입니다. DSM-5 주요우울장애 진단기준을 설명해주세요."},
            {"id": 2, "question": "양극성장애 조증 삽화의 특징을 설명하시오.", "answer": "과대성, 수면욕구 감소, 다변, 사고비약", "prompt": "정신건강간호사 시험 준비입니다. 양극성장애 조증 삽화의 특징과 간호를 설명해주세요."},
        ]},
    ]),
    ("mental-health-nurse", "정신건강간호사", "psychopharmacology", "정신약리학", "emerald", "teal", [
        {"id": "antipsychotics", "name": "항정신병약물", "questions": [
            {"id": 1, "question": "전형적/비전형적 항정신병약물을 비교하시오.", "answer": "전형: 도파민 차단, EPS 많음 / 비전형: 세로토닌-도파민 차단", "prompt": "정신건강간호사 시험 준비입니다. 전형적, 비전형적 항정신병약물의 작용기전, 부작용, 대표약물을 비교해주세요."},
            {"id": 2, "question": "추체외로 증상(EPS)의 종류와 간호를 설명하시오.", "answer": "급성 근긴장이상, 파킨슨증후군, 좌불안석, 지연성 운동장애", "prompt": "정신건강간호사 시험 준비입니다. 항정신병약물의 추체외로 증상 종류와 간호중재를 설명해주세요."},
        ]},
        {"id": "antidepressants", "name": "항우울제", "questions": [
            {"id": 1, "question": "SSRI의 작용기전과 부작용을 설명하시오.", "answer": "세로토닌 재흡수 억제, 성기능장애/불면/오심", "prompt": "정신건강간호사 시험 준비입니다. SSRI의 작용기전, 대표약물, 부작용을 설명해주세요."},
        ]},
    ]),
    ("mental-health-nurse", "정신건강간호사", "therapeutic-communication", "치료적의사소통", "emerald", "teal", [
        {"id": "techniques", "name": "치료적 의사소통 기법", "questions": [
            {"id": 1, "question": "치료적 의사소통 기법의 종류를 설명하시오.", "answer": "경청, 반영, 명료화, 요약, 개방형 질문", "prompt": "정신건강간호사 시험 준비입니다. 치료적 의사소통 기법을 예시와 함께 설명해주세요."},
            {"id": 2, "question": "비치료적 의사소통의 예를 설명하시오.", "answer": "충고, 안심시키기, 주제 바꾸기, 판단하기", "prompt": "정신건강간호사 시험 준비입니다. 비치료적 의사소통의 문제점과 대안을 설명해주세요."},
        ]},
    ]),
    ("mental-health-nurse", "정신건강간호사", "practical", "실기", "emerald", "teal", [
        {"id": "mse", "name": "정신상태검사", "questions": [
            {"id": 1, "question": "정신상태검사(MSE)의 구성요소를 설명하시오.", "answer": "외모, 행동, 기분/정동, 사고, 지각, 인지, 병식", "prompt": "정신건강간호사 시험 준비입니다. 정신상태검사의 구성요소와 평가방법을 설명해주세요."},
        ]},
        {"id": "crisis", "name": "위기중재", "questions": [
            {"id": 1, "question": "자살위험 환자 간호를 설명하시오.", "answer": "안전확보, 1:1 관찰, 위험물 제거", "prompt": "정신건강간호사 시험 준비입니다. 자살위험 환자의 사정과 간호중재를 설명해주세요."},
        ]},
    ]),
    ("health-educator-2", "보건교육사 2급", "health-education-intro", "보건교육학개론", "pink", "rose", [
        {"id": "basic", "name": "보건교육 기본개념", "questions": [
            {"id": 1, "question": "보건교육의 정의와 목적을 설명하시오.", "answer": "건강증진을 위한 계획된 학습경험", "prompt": "보건교육사 2급 시험 준비입니다. 보건교육의 정의, 목적, 목표를 설명해주세요."},
            {"id": 2, "question": "보건교육의 원리를 설명하시오.", "answer": "관심유발, 참여유도, 반복, 실천가능성", "prompt": "보건교육사 2급 시험 준비입니다. 보건교육의 원리를 설명해주세요."},
        ]},
    ]),
    ("health-educator-2", "보건교육사 2급", "health-communication", "보건의사소통", "pink", "rose", [
        {"id": "comm", "name": "건강 커뮤니케이션", "questions": [
            {"id": 1, "question": "건강 커뮤니케이션의 유형을 설명하시오.", "answer": "대인, 집단, 대중매체 커뮤니케이션", "prompt": "보건교육사 2급 시험 준비입니다. 건강 커뮤니케이션의 유형과 특징을 설명해주세요."},
        ]},
    ]),
    ("health-educator-2", "보건교육사 2급", "health-behavior", "건강행동이론", "pink", "rose", [
        {"id": "theories", "name": "건강행동 이론", "questions": [
            {"id": 1, "question": "건강신념모형(HBM)을 설명하시오.", "answer": "지각된 민감성, 심각성, 이익, 장애, 자기효능감", "prompt": "보건교육사 2급 시험 준비입니다. 건강신념모형의 구성요소를 설명해주세요."},
            {"id": 2, "question": "범이론적 모형(TTM)을 설명하시오.", "answer": "계획전, 계획, 준비, 행동, 유지 단계", "prompt": "보건교육사 2급 시험 준비입니다. 범이론적 모형의 변화단계를 설명해주세요."},
        ]},
    ]),
    ("health-educator-2", "보건교육사 2급", "community-health", "지역사회보건", "pink", "rose", [
        {"id": "assess", "name": "지역사회 사정", "questions": [
            {"id": 1, "question": "지역사회 건강사정 방법을 설명하시오.", "answer": "지역사회 진단, 요구조사, 자원파악", "prompt": "보건교육사 2급 시험 준비입니다. 지역사회 건강사정의 방법과 절차를 설명해주세요."},
        ]},
    ]),
    ("health-educator-2", "보건교육사 2급", "practical", "실기", "pink", "rose", [
        {"id": "program", "name": "프로그램 개발", "questions": [
            {"id": 1, "question": "보건교육 프로그램 개발 과정을 설명하시오.", "answer": "요구사정, 목표설정, 계획, 실행, 평가", "prompt": "보건교육사 2급 시험 준비입니다. 보건교육 프로그램 개발 과정을 설명해주세요."},
        ]},
    ]),
    ("health-educator-3", "보건교육사 3급", "health-education-basics", "보건교육기초", "pink", "rose", [
        {"id": "basics", "name": "보건교육 기초", "questions": [
            {"id": 1, "question": "보건교육의 개념과 필요성을 설명하시오.", "answer": "건강한 생활을 위한 교육적 접근", "prompt": "보건교육사 3급 시험 준비입니다. 보건교육의 개념, 필요성, 역할을 설명해주세요."},
        ]},
    ]),
    ("health-educator-3", "보건교육사 3급", "public-health", "공중보건학", "pink", "rose", [
        {"id": "ph", "name": "공중보건 기초", "questions": [
            {"id": 1, "question": "공중보건의 정의와 영역을 설명하시오.", "answer": "조직적인 지역사회 노력을 통한 질병예방과 건강증진", "prompt": "보건교육사 3급 시험 준비입니다. 공중보건의 정의, 목적, 영역을 설명해주세요."},
        ]},
    ]),
    ("health-educator-3", "보건교육사 3급", "health-psychology", "건강심리학", "pink", "rose", [
        {"id": "hp", "name": "건강심리학 기초", "questions": [
            {"id": 1, "question": "건강심리학의 개념과 적용을 설명하시오.", "answer": "심리학적 원리를 건강증진에 적용", "prompt": "보건교육사 3급 시험 준비입니다. 건강심리학의 개념과 적용을 설명해주세요."},
        ]},
    ]),
    ("health-educator-3", "보건교육사 3급", "practical", "실기", "pink", "rose", [
        {"id": "methods", "name": "교육방법", "questions": [
            {"id": 1, "question": "보건교육 방법의 종류를 설명하시오.", "answer": "강의, 토의, 시범, 역할극 등", "prompt": "보건교육사 3급 시험 준비입니다. 보건교육 방법의 특징과 적용을 설명해주세요."},
        ]},
    ]),
    ("paramedic-2", "응급구조사 2급", "first-aid", "응급처치학", "red", "pink", [
        {"id": "basic", "name": "기본 응급처치", "questions": [
            {"id": 1, "question": "응급처치의 기본원칙을 설명하시오.", "answer": "현장안전, 환자평가, 응급처치, 이송", "prompt": "응급구조사 2급 시험 준비입니다. 응급처치의 기본원칙을 설명해주세요."},
            {"id": 2, "question": "출혈 환자 응급처치를 설명하시오.", "answer": "직접압박, 거상, 지혈대", "prompt": "응급구조사 2급 시험 준비입니다. 출혈 환자의 응급처치 방법을 설명해주세요."},
        ]},
    ]),
    ("paramedic-2", "응급구조사 2급", "cpr-aed", "심폐소생술/AED", "red", "pink", [
        {"id": "bls", "name": "기본소생술", "questions": [
            {"id": 1, "question": "성인 기본소생술(BLS) 순서를 설명하시오.", "answer": "반응확인-119신고-순환확인-가슴압박-기도개방-인공호흡", "prompt": "응급구조사 2급 시험 준비입니다. 성인 기본소생술의 순서와 방법을 설명해주세요."},
            {"id": 2, "question": "AED 사용법을 설명하시오.", "answer": "전원-패드부착-분석-제세동", "prompt": "응급구조사 2급 시험 준비입니다. 자동제세동기 사용 순서를 설명해주세요."},
        ]},
    ]),
    ("paramedic-2", "응급구조사 2급", "patient-assessment", "환자평가", "red", "pink", [
        {"id": "assess", "name": "환자평가", "questions": [
            {"id": 1, "question": "1차 평가(ABCDE)를 설명하시오.", "answer": "기도, 호흡, 순환, 의식장애, 노출", "prompt": "응급구조사 2급 시험 준비입니다. 1차 평가를 설명해주세요."},
        ]},
    ]),
    ("paramedic-2", "응급구조사 2급", "transport", "이송", "red", "pink", [
        {"id": "transport", "name": "환자이송", "questions": [
            {"id": 1, "question": "환자 이송 방법을 설명하시오.", "answer": "들것, 휠체어, 도보이송, 응급이송", "prompt": "응급구조사 2급 시험 준비입니다. 환자 이송 방법을 설명해주세요."},
        ]},
    ]),
    ("paramedic-2", "응급구조사 2급", "practical", "실기", "red", "pink", [
        {"id": "skills", "name": "응급처치 술기", "questions": [
            {"id": 1, "question": "부목 적용법을 설명하시오.", "answer": "손상 부위 고정, 상하 관절 포함", "prompt": "응급구조사 2급 시험 준비입니다. 부목 적용의 원칙과 방법을 설명해주세요."},
        ]},
    ]),
]

for cert_id, cert_name, subject_id, subject_name, color1, color2, topics_data in pages:
    file_path = f"{BASE}/{cert_id}/study/{subject_id}/page.tsx"
    content = create_page(cert_id, cert_name, subject_id, subject_name, color1, color2, topics_data)

    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as f:
        f.write(content)
    print(f"Created: {file_path}")

print("Done!")
