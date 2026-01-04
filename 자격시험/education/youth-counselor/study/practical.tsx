'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'basic',
    name: '면접 기본 질문',
    color: 'from-emerald-500 to-green-500',
    questions: [
      { id: 1, question: '청소년상담사가 되려는 동기가 무엇입니까?', answer: '진정성 있는 동기, 청소년에 대한 관심, 구체적 경험', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 청소년상담사가 되려는 동기가 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년상담에 관심을 갖게 된 계기\n2. 구체적인 경험이나 사례\n3. 청소년상담사로서의 목표\n4. 개인적 성장과 연결\n5. 진정성 있고 구체적인 답변 작성법\n\n모범 답변 예시도 만들어주세요.' },
      { id: 2, question: '자신의 강점과 약점은 무엇입니까?', answer: '상담자로서 강점, 보완할 약점, 자기 성찰', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 자신의 강점과 약점은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 상담자로서의 강점 2-3가지\n2. 구체적 사례로 뒷받침\n3. 보완이 필요한 약점\n4. 약점 극복 노력\n5. 자기 성찰 능력 보여주기\n\n모범 답변 예시도 만들어주세요.' },
      { id: 3, question: '상담자로서 가장 중요한 자질은 무엇이라고 생각합니까?', answer: '공감, 진정성, 윤리, 전문성, 자기 이해', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 상담자로서 가장 중요한 자질은 무엇이라고 생각합니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 핵심 자질 선택과 이유\n2. Rogers의 3대 조건 등 이론 근거\n3. 자신의 경험과 연결\n4. 해당 자질을 갖추기 위한 노력\n5. 다른 자질들과의 관계\n\n모범 답변 예시도 만들어주세요.' }
    ]
  },
  {
    id: 'theory',
    name: '상담이론 질문',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '선호하는 상담이론이나 접근법이 있습니까?', answer: '이론 선택, 근거, 청소년 적용, 통합적 접근', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 선호하는 상담이론이나 접근법이 있습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 선호하는 이론과 그 이유\n2. 해당 이론의 핵심 개념\n3. 청소년 상담에 적합한 점\n4. 다른 이론과의 통합 가능성\n5. 자신의 가치관과의 부합성\n\n모범 답변 예시도 만들어주세요.' },
      { id: 2, question: '공감이란 무엇이며, 어떻게 실천하시겠습니까?', answer: '공감의 정의, Rogers 이론, 실천 방법, 경청', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 공감이란 무엇이며, 어떻게 실천하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 공감의 정의 (Rogers)\n2. 공감과 동정의 차이\n3. 공감적 이해의 전달 방법\n4. 경청과 반영 기술\n5. 구체적 실천 사례\n\n모범 답변 예시도 만들어주세요.' },
      { id: 3, question: '상담 윤리에서 가장 중요한 것은 무엇입니까?', answer: '비밀보장, 이중관계 금지, 내담자 복지 우선', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 상담 윤리에서 가장 중요한 것은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 핵심 윤리 원칙 (비밀보장, 이중관계 등)\n2. 비밀보장의 한계 (자해, 학대)\n3. 청소년 상담의 특수성\n4. 윤리적 딜레마 대처법\n5. 전문가로서의 책임\n\n모범 답변 예시도 만들어주세요.' }
    ]
  },
  {
    id: 'case',
    name: '사례 대처 질문',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년이 자해 충동을 호소하면 어떻게 하시겠습니까?', answer: '위험도 평가, 안전 확보, 부모 연계, 전문기관 의뢰', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 청소년이 자해 충동을 호소하면 어떻게 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 즉각적 위험도 평가\n2. 안전 확보 조치\n3. 자살 계약서 등 개입\n4. 부모/보호자 연계\n5. 전문기관 의뢰 기준\n\n모범 답변 예시도 만들어주세요.' },
      { id: 2, question: '내담자가 상담을 거부하거나 저항하면 어떻게 하시겠습니까?', answer: '저항의 의미 이해, 관계 형성, 동기 강화, 인내심', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 내담자가 상담을 거부하거나 저항하면 어떻게 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 저항의 의미와 기능 이해\n2. 비자발적 내담자 특성\n3. 라포 형성 전략\n4. 동기 강화 기법\n5. 인내심과 존중\n\n모범 답변 예시도 만들어주세요.' },
      { id: 3, question: '학교폭력 피해 청소년을 만나면 어떻게 개입하시겠습니까?', answer: '안전 확보, 트라우마 이해, 지지 제공, 학교 연계', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 학교폭력 피해 청소년을 만나면 어떻게 개입하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 안전과 보호 우선\n2. 트라우마 인식 상담\n3. 정서적 지지 제공\n4. 학교 및 관련 기관 협력\n5. 장기 지원 계획\n\n모범 답변 예시도 만들어주세요.' }
    ]
  },
  {
    id: 'professional',
    name: '전문성 질문',
    color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: '상담자의 소진을 어떻게 예방하고 관리하시겠습니까?', answer: '자기 돌봄, 슈퍼비전, 동료 지지, 일과 삶 균형', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 상담자의 소진을 어떻게 예방하고 관리하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 소진의 증상 인식\n2. 자기 돌봄 전략\n3. 슈퍼비전 활용\n4. 동료 지지 체계\n5. 일과 삶의 균형\n\n모범 답변 예시도 만들어주세요.' },
      { id: 2, question: '전문성 향상을 위해 어떤 노력을 하시겠습니까?', answer: '계속 교육, 연수, 학회 참여, 자기 성찰, 슈퍼비전', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 전문성 향상을 위해 어떤 노력을 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 계속 교육과 연수\n2. 학회 및 워크숍 참여\n3. 전문 서적 및 논문 읽기\n4. 슈퍼비전 받기\n5. 자기 성찰과 사례 연구\n\n모범 답변 예시도 만들어주세요.' },
      { id: 3, question: '다른 전문가(교사, 의사 등)와 어떻게 협력하시겠습니까?', answer: '역할 이해, 의사소통, 협력 체계, 전문성 존중', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 다른 전문가(교사, 의사 등)와 어떻게 협력하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 다학제적 협력의 중요성\n2. 각 전문가의 역할 이해\n3. 효과적 의사소통\n4. 사례 관리와 연계\n5. 전문성 상호 존중\n\n모범 답변 예시도 만들어주세요.' }
    ]
  },
  {
    id: 'attitude',
    name: '인성 및 태도 질문',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '자신의 가치관이 내담자와 충돌할 때 어떻게 하시겠습니까?', answer: '가치 중립, 내담자 존중, 자기 인식, 슈퍼비전', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 자신의 가치관이 내담자와 충돌할 때 어떻게 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 가치 중립의 중요성\n2. 자신의 가치관 인식\n3. 내담자 가치 존중\n4. 슈퍼비전 활용\n5. 의뢰 고려 시점\n\n모범 답변 예시도 만들어주세요.' },
      { id: 2, question: '상담에서 실패나 어려움을 경험한 적이 있습니까?', answer: '구체적 사례, 배운 점, 성장, 자기 성찰', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 상담에서 실패나 어려움을 경험한 적이 있습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 구체적 어려움 사례\n2. 당시 느낀 감정\n3. 대처 방법과 과정\n4. 배운 점과 성장\n5. 전문가로서 겸손함\n\n모범 답변 예시도 만들어주세요.' },
      { id: 3, question: '청소년상담사로서 10년 후 자신의 모습은 어떨 것 같습니까?', answer: '비전, 전문 분야, 성장 계획, 현실적 목표', prompt: '청소년상담사 면접 질문입니다.\n\n질문: 청소년상담사로서 10년 후 자신의 모습은 어떨 것 같습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 장기적 비전\n2. 전문 분야 개발 계획\n3. 자격 취득 및 경력 목표\n4. 청소년에게 기여하고 싶은 점\n5. 현실적이면서도 의미 있는 목표\n\n모범 답변 예시도 만들어주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-counselor-practical-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('youth-counselor-practical-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-emerald-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-counselor" className="text-gray-600 hover:text-emerald-600">청소년상담사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💚</span>
            <h1 className="text-2xl font-bold text-gray-800">면접 준비하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년상담사 3급 면접시험 예상 질문</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-emerald-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>답변 포인트:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
