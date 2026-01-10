'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'philosophy',
    name: '교직관 및 교육철학',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '교사가 되고자 하는 동기는 무엇입니까?', answer: '교육에 대한 열정, 학생 성장, 소명의식', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 교사가 되고자 하는 동기는 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 교직을 선택한 계기\n2. 교사로서의 비전\n3. 학생 성장을 돕고 싶은 이유\n4. 교육에 대한 열정과 사명감\n5. 구체적인 경험 사례\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 2, question: '좋은 교사의 자질은 무엇이라고 생각합니까?', answer: '전문성, 열정, 소통능력, 공감능력', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 좋은 교사의 자질은 무엇이라고 생각합니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 교과 전문성과 교수능력\n2. 학생에 대한 사랑과 열정\n3. 소통과 공감 능력\n4. 끊임없는 자기계발\n5. 본인이 갖춘 강점 연결\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 3, question: '교사로서 교육관은 무엇입니까?', answer: '학생중심, 전인교육, 성장지원', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 교사로서 본인의 교육관은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 학생중심 교육철학\n2. 전인적 성장 지원\n3. 배움의 즐거움 추구\n4. 교육적 신념\n5. 교육관이 형성된 배경\n\n2분 내외의 답변 스크립트를 작성해주세요.' }
    ]
  },
  {
    id: 'situation',
    name: '상황대처 능력',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '학생 간 갈등 상황에 어떻게 대처하시겠습니까?', answer: '경청, 중재, 관계회복, 예방', prompt: '교원임용시험 2차 면접 문제입니다.\n\n상황: 반 학생들 사이에 다툼이 발생했습니다. 어떻게 대처하시겠습니까?\n\n다음 순서로 답변을 준비해주세요:\n1. 양측 학생의 이야기 경청\n2. 객관적 상황 파악\n3. 감정 공감 및 중재\n4. 관계회복 프로그램 운영\n5. 재발 방지 대책\n\n구체적인 대처 방안을 제시해주세요.' },
      { id: 2, question: '수업 중 학습부진 학생을 어떻게 지도하시겠습니까?', answer: '원인 파악, 개별지도, 격려', prompt: '교원임용시험 2차 면접 문제입니다.\n\n상황: 특정 학생이 수업 내용을 따라오지 못하고 있습니다. 어떻게 지도하시겠습니까?\n\n다음 순서로 답변을 준비해주세요:\n1. 학습부진 원인 파악 (인지적, 정서적)\n2. 개별화 교육 계획 수립\n3. 방과 후 보충지도\n4. 학습 동기 부여 및 격려\n5. 학부모, 상담교사 협력\n\n구체적인 지도 방안을 제시해주세요.' },
      { id: 3, question: '학부모가 성적에 대해 항의할 때 어떻게 대응하시겠습니까?', answer: '경청, 평가기준 설명, 협력', prompt: '교원임용시험 2차 면접 문제입니다.\n\n상황: 학부모가 자녀의 성적에 대해 강하게 항의하고 있습니다. 어떻게 대응하시겠습니까?\n\n다음 순서로 답변을 준비해주세요:\n1. 학부모의 의견 경청\n2. 평가기준과 과정 설명\n3. 객관적 근거 제시\n4. 학생 성장 방안 제안\n5. 협력적 관계 유지\n\n전문적이고 신중한 대응 방안을 제시해주세요.' }
    ]
  },
  {
    id: 'student',
    name: '학생 이해 및 생활지도',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '문제행동을 보이는 학생을 어떻게 지도하시겠습니까?', answer: '원인 파악, 상담, 긍정적 행동지원', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 반복적으로 문제행동을 보이는 학생을 어떻게 지도하시겠습니까?\n\n다음 순서로 답변을 준비해주세요:\n1. 문제행동의 원인 파악\n2. 개별 상담 및 공감\n3. 긍정적 행동지원 계획\n4. 작은 변화 격려\n5. 상담교사, 학부모 협력\n\n구체적인 생활지도 전략을 제시해주세요.' },
      { id: 2, question: '학교폭력 피해 학생을 어떻게 도울 수 있습니까?', answer: '보호, 상담, 회복지원, 신속대응', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 학교폭력 피해를 호소하는 학생을 발견했습니다. 어떻게 도울 수 있습니까?\n\n다음 순서로 답변을 준비해주세요:\n1. 즉각적인 안전 확보\n2. 피해 학생 상담 및 공감\n3. 학교폭력 대책위원회 보고\n4. 심리적 회복 지원\n5. 재발 방지 및 예방교육\n\n신속하고 체계적인 대응 방안을 제시해주세요.' },
      { id: 3, question: '학생의 개인차를 존중하는 방법은 무엇입니까?', answer: '개별화, 다양성 인정, 강점발견', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 학생의 개인차를 존중하는 교육 방법은 무엇이라고 생각합니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 학생 개개인의 특성 이해\n2. 수준별·개별화 수업\n3. 다양성 존중 (다중지능, 학습양식)\n4. 강점 발견 및 격려\n5. 차별 없는 교실 문화 조성\n\n2분 내외의 답변 스크립트를 작성해주세요.' }
    ]
  },
  {
    id: 'professional',
    name: '전문성 및 자기계발',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '교사로서 전문성을 어떻게 신장하시겠습니까?', answer: '연수, 연구, 성찰, 협력', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 교사로서 전문성을 어떻게 신장하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 지속적인 연수 참여\n2. 수업 연구 및 반성적 성찰\n3. 전문적 학습공동체 참여\n4. 교과 전공 심화학습\n5. 교육 트렌드 학습\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 2, question: '동료 교사와 어떻게 협력하시겠습니까?', answer: '소통, 협업, 수업공개, 나눔', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 동료 교사와 어떻게 협력하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 적극적인 소통과 배려\n2. 수업 공개 및 협의\n3. 교수학습 자료 공유\n4. 학년·교과 협의회 참여\n5. 학교 발전을 위한 협력\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 3, question: '본인의 강점과 약점은 무엇입니까?', answer: '강점 활용, 약점 보완 노력', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 교사로서 본인의 강점과 약점은 무엇이며, 약점을 어떻게 보완하시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 교사로서의 강점 (구체적 사례)\n2. 강점을 교육에 활용하는 방법\n3. 솔직한 약점 인정\n4. 약점 보완을 위한 노력\n5. 성장하는 교사 되기\n\n2분 내외의 답변 스크립트를 작성해주세요.' }
    ]
  },
  {
    id: 'current',
    name: '교육 현안 및 정책',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '2022 개정 교육과정의 주요 내용은 무엇입니까?', answer: '역량중심, 깊이있는 학습, 고교학점제', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 2022 개정 교육과정의 주요 내용과 의미는 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 역량중심 교육과정\n2. 깊이있는 학습과 학습량 적정화\n3. 디지털·AI 소양 교육\n4. 고교학점제 전면 도입\n5. 교사로서 준비할 점\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 2, question: '디지털 교육의 장단점은 무엇입니까?', answer: '개별화, 접근성 vs 격차, 관계', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 디지털 교육의 장단점과 교사의 역할은 무엇입니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 디지털 교육의 장점 (개별화, 시공간 초월)\n2. 디지털 교육의 단점 (격차, 관계 약화)\n3. 에듀테크 활용 방안\n4. 교사의 역할 재정립\n5. 균형잡힌 교육 실천\n\n2분 내외의 답변 스크립트를 작성해주세요.' },
      { id: 3, question: '학생 인권과 교권의 균형을 어떻게 이루시겠습니까?', answer: '상호 존중, 대화, 규칙 준수', prompt: '교원임용시험 2차 면접 문제입니다.\n\n질문: 학생 인권과 교권의 균형을 어떻게 이루시겠습니까?\n\n다음 내용을 포함하여 답변을 준비해주세요:\n1. 학생 인권과 교권의 중요성\n2. 상호 존중의 교실 문화\n3. 명확한 규칙과 합의\n4. 대화를 통한 문제 해결\n5. 교육적 권위 확립\n\n2분 내외의 답변 스크립트를 작성해주세요.' }
    ]
  }
];

export default function InterviewStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-interview-progress');
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
    localStorage.setItem('teacher-certificate-interview-progress', JSON.stringify(arr));
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💬</span>
            <h1 className="text-2xl font-bold text-gray-800">면접 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">교원임용시험 2차 - 교직관, 인성, 상황대처 능력 평가</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>핵심 키워드:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '완료'}
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
