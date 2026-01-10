'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'motivation',
    name: '지원동기 및 비전',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '청소년지도사가 되고자 하는 동기는 무엇입니까?', answer: '청소년에 대한 관심과 열정, 교육적 사명감, 구체적 경험 기반 동기', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년지도사가 되고자 하는 동기는 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년에 대한 관심과 애정\n2. 구체적인 계기 (경험, 에피소드)\n3. 교육적 사명감\n4. 청소년지도사로서의 비전\n5. 준비 과정\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 2, question: '청소년지도사로서의 비전과 목표를 말씀해 주세요.', answer: '청소년 성장 지원, 전문성 개발, 사회적 기여, 구체적 실천 계획', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년지도사로서의 비전과 목표를 말씀해 주세요.\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 단기 목표 (1-2년)\n2. 중장기 비전 (5-10년)\n3. 청소년에게 미치고 싶은 영향\n4. 전문성 개발 계획\n5. 사회적 기여 방안\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 3, question: '자신의 강점과 약점을 청소년지도사 관점에서 설명하세요.', answer: '강점: 소통능력, 공감능력 등 / 약점: 극복 노력과 보완 방법 제시', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 자신의 강점과 약점을 청소년지도사 관점에서 설명하세요.\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년지도에 도움이 되는 강점 2-3가지\n2. 구체적 경험 사례\n3. 약점 인식 (솔직하게)\n4. 약점 보완 노력\n5. 성장 가능성 강조\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' }
    ]
  },
  {
    id: 'profession',
    name: '전문성 및 역량',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '청소년기의 특성과 발달과업에 대해 설명하시오.', answer: '신체·인지·정서·사회성 발달, 자아정체감 형성, 자율성 확립', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년기의 특성과 발달과업에 대해 설명하시오.\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년기 연령과 시기 구분\n2. 신체적·인지적 발달\n3. 정서적·사회적 발달\n4. 주요 발달과업 (Havighurst)\n5. 청소년지도에의 적용\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 2, question: '청소년활동 프로그램을 기획해본 경험이 있습니까?', answer: '프로그램명, 기획 과정, 실행 결과, 성과와 개선점', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년활동 프로그램을 기획해본 경험이 있습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 프로그램 개요 (대상, 목적)\n2. 기획 과정 (욕구조사, 목표설정)\n3. 실행 내용\n4. 성과 및 평가\n5. 개선점 및 배운 점\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 3, question: '청소년 관련 법령에 대해 아는 대로 설명하시오.', answer: '청소년기본법, 청소년활동진흥법, 청소년복지지원법, 청소년보호법', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년 관련 법령에 대해 아는 대로 설명하시오.\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년기본법 (목적, 청소년 정의)\n2. 청소년활동진흥법 (수련활동, 시설)\n3. 청소년복지지원법 (특별지원)\n4. 청소년보호법 (유해환경)\n5. 법령의 실무 적용 사례\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' }
    ]
  },
  {
    id: 'situation',
    name: '상황 대처 능력',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '위기청소년을 발견했을 때 어떻게 대응하시겠습니까?', answer: '안전 확보, 경청·공감, 전문기관 연계, 사후관리', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 위기청소년을 발견했을 때 어떻게 대응하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 위기청소년 징후 파악\n2. 즉각적 안전 확보\n3. 경청과 공감적 대화\n4. 전문기관 연계 (1388, 상담센터)\n5. 지속적 관심과 사후관리\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 2, question: '프로그램 운영 중 안전사고가 발생하면 어떻게 하시겠습니까?', answer: '응급조치, 119 신고, 보호자 연락, 사고보고, 재발방지', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 프로그램 운영 중 안전사고가 발생하면 어떻게 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 신속한 응급조치\n2. 119 신고 및 병원 이송\n3. 보호자 즉시 연락\n4. 사고 경위 파악 및 보고\n5. 재발방지 대책 수립\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 3, question: '청소년 간 갈등 상황을 목격했을 때 어떻게 개입하시겠습니까?', answer: '상황 파악, 분리·안정, 개별 면담, 중재, 화해 유도', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년 간 갈등 상황을 목격했을 때 어떻게 개입하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 신속한 개입 및 분리\n2. 안정화 (감정 진정)\n3. 개별 면담 (경청)\n4. 갈등 원인 파악\n5. 중재 및 화해 유도\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' }
    ]
  },
  {
    id: 'communication',
    name: '소통 및 관계',
    color: 'from-orange-500 to-amber-500',
    questions: [
      { id: 1, question: '청소년과 신뢰관계를 형성하는 방법은 무엇입니까?', answer: '경청, 공감, 존중, 일관성, 진정성', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년과 신뢰관계를 형성하는 방법은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 적극적 경청\n2. 공감적 이해\n3. 청소년 존중\n4. 일관된 태도\n5. 진정성 있는 관심\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 2, question: '학부모와 소통이 어려울 때 어떻게 하시겠습니까?', answer: '경청, 이해 공유, 협력 관계, 정기 소통', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 학부모와 소통이 어려울 때 어떻게 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 학부모 입장 경청\n2. 정보 투명하게 공유\n3. 협력 관계 강조\n4. 정기적 소통 채널\n5. 갈등 해결 사례\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 3, question: '동료 지도자들과 협업하는 방법은 무엇입니까?', answer: '역할 분담, 의사소통, 상호 존중, 팀워크', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 동료 지도자들과 협업하는 방법은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 명확한 역할 분담\n2. 원활한 의사소통\n3. 상호 존중과 배려\n4. 팀워크 구축\n5. 협업 경험 사례\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' }
    ]
  },
  {
    id: 'values',
    name: '가치관 및 자질',
    color: 'from-teal-500 to-emerald-500',
    questions: [
      { id: 1, question: '청소년지도사로서 가장 중요한 자질은 무엇이라고 생각합니까?', answer: '청소년 이해, 열정, 소통능력, 전문성, 윤리성', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년지도사로서 가장 중요한 자질은 무엇이라고 생각합니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년에 대한 이해와 애정\n2. 열정과 사명감\n3. 소통 능력\n4. 전문성\n5. 윤리성 및 책임감\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 2, question: '청소년지도 윤리에서 가장 중요한 것은 무엇입니까?', answer: '청소년 최우선, 비밀보장, 전문성, 공정성', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 청소년지도 윤리에서 가장 중요한 것은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 청소년 최우선 원칙\n2. 비밀보장\n3. 전문성 유지\n4. 공정한 대우\n5. 윤리적 딜레마 사례\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' },
      { id: 3, question: '전문성 향상을 위해 어떤 노력을 하시겠습니까?', answer: '보수교육, 연구, 슈퍼비전, 학습공동체', prompt: '청소년지도사 면접 문제입니다.\n\n문제: 전문성 향상을 위해 어떤 노력을 하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 보수교육 및 연수 참여\n2. 관련 서적 및 논문 연구\n3. 슈퍼비전 활용\n4. 학습공동체 참여\n5. 자기성찰\n\n모범답안 예시와 답변 시 유의사항도 알려주세요.' }
    ]
  }
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-practical-progress');
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
    localStorage.setItem('youth-instructor-practical-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-green-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor" className="text-gray-600 hover:text-green-600">청소년지도사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-gray-800">면접 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">청소년지도사 2급 면접시험 예상 질문</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-green-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-200 mb-6">
          <h2 className="text-lg font-bold text-green-800 mb-3">면접 준비 팁</h2>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• 답변은 2-3분 내외로 간결하고 명확하게 구성하세요.</li>
            <li>• 구체적인 경험과 사례를 포함하여 답변하세요.</li>
            <li>• 청소년지도사로서의 열정과 진정성을 보여주세요.</li>
            <li>• AI와 모의 면접 연습을 통해 답변을 다듬으세요.</li>
          </ul>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white hover:bg-green-600'}`}>
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
