'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'structure',
    name: '논술문 구조',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '교직논술의 기본 구조를 설명하시오.', answer: '서론(문제제기), 본론(논증), 결론(정리)', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 교직논술의 기본 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서론: 문제의식 제기, 핵심 개념 정의\n2. 본론: 체계적 논증 (이론→사례→분석)\n3. 결론: 논의 종합, 교육적 시사점\n4. 논리적 연결과 일관성\n5. 교직논술 작성 시 유의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '논술문의 서론 작성법을 설명하시오.', answer: '문제제기, 핵심개념, 논의방향', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 논술문의 서론 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과적인 문제 제기 방법\n2. 핵심 개념 명확히 하기\n3. 논의의 방향과 범위 설정\n4. 서론의 적정 분량\n5. 좋은 서론 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '본론의 논증 전개 방법을 설명하시오.', answer: '이론적 근거, 사례 제시, 비판적 분석', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 본론의 논증 전개 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론적 근거 제시 (학자, 이론)\n2. 구체적 사례 활용 (교육현장)\n3. 비판적 분석과 해석\n4. 단락 간 논리적 연결\n5. 효과적인 본론 구성법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'topics',
    name: '교직논술 주제',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '학생중심 교육의 의미와 실천 방안을 논하시오.', answer: '학습자 주도성, 개별화, 참여', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 학생중심 교육의 의미와 실천 방안을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 학생중심 교육의 개념 (듀이, 구성주의)\n2. 교사중심 교육과의 차이\n3. 학습자 주도성과 자기결정성\n4. 학생중심 수업 사례 (프로젝트학습, 토의토론)\n5. 교사의 역할 재정립\n\n이 주제에 대한 800자 논술문을 작성하는 연습을 해주세요.' },
      { id: 2, question: '교육평가의 공정성 확보 방안을 논하시오.', answer: '타당도, 신뢰도, 객관성, 과정평가', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 교육평가의 공정성 확보 방안을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 교육평가의 공정성 개념\n2. 타당도와 신뢰도 확보\n3. 평가 기준의 명확화 (루브릭)\n4. 과정중심평가와 성장평가\n5. 평가 결과 피드백과 활용\n\n이 주제에 대한 800자 논술문을 작성하는 연습을 해주세요.' },
      { id: 3, question: '교사의 전문성 신장 방안을 논하시오.', answer: '반성적 실천, 연수, 학습공동체', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 교사의 전문성 신장 방안을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 교사 전문성의 개념과 영역\n2. 반성적 실천가로서의 교사 (Schön)\n3. 교사 연수와 자기개발\n4. 전문적 학습공동체(PLC)\n5. 교직생애주기별 전문성 개발\n\n이 주제에 대한 800자 논술문을 작성하는 연습을 해주세요.' }
    ]
  },
  {
    id: 'expression',
    name: '논술 표현',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '교육 전문 용어의 정확한 사용법을 설명하시오.', answer: '개념 정의, 정확성, 맥락적 사용', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 교육 전문 용어의 정확한 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 교육학 용어 (구성주의, 메타인지 등)\n2. 교육과정 용어 (백워드 설계, 역량 등)\n3. 평가 용어 (타당도, 신뢰도, 루브릭 등)\n4. 학자 이름과 이론의 정확한 연결\n5. 용어 오용 사례와 주의점\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '논리적 문장 쓰기를 설명하시오.', answer: '명확성, 간결성, 일관성', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 논리적 문장 쓰기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명확한 문장 구조 (주어-술어)\n2. 간결한 표현 (불필요한 수식 제거)\n3. 접속어를 활용한 논리 연결\n4. 단락의 주제문과 뒷받침 문장\n5. 자주 틀리는 맞춤법과 띄어쓰기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '인용과 출처 표기 방법을 설명하시오.', answer: '직접인용, 간접인용, 학자 명시', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 인용과 출처 표기 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접 인용 방법 (예: "..." (듀이, 1916))\n2. 간접 인용 방법 (듀이에 따르면...)\n3. 학자 이름과 연도 표기\n4. 이론 소개 시 출처 명시\n5. 과도한 인용 피하기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'practice',
    name: '논술 실전',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '시간 관리 전략을 설명하시오.', answer: '개요 작성, 본문 작성, 검토', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 논술 시험의 시간 관리 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제 분석 (10분)\n2. 개요 작성 (10분)\n3. 본문 작성 (60분)\n4. 검토 및 수정 (10분)\n5. 분량 조절 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '개요 작성법을 설명하시오.', answer: '핵심주장, 논거, 사례', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 효과적인 개요 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 주장 명확히 하기\n2. 주요 논거 3~4가지 선정\n3. 각 논거별 사례 준비\n4. 서론-본론-결론 구조화\n5. 개요 수정과 보완\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '답안 검토 방법을 설명하시오.', answer: '내용, 논리, 표현, 맞춤법', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 답안 검토 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내용 검토 (논지 일관성)\n2. 논리 검토 (논증 타당성)\n3. 표현 검토 (문장 명확성)\n4. 형식 검토 (맞춤법, 띄어쓰기)\n5. 효율적인 검토 체크리스트\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'examples',
    name: '논술 예시 주제',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '디지털 시대의 교육 변화를 논하시오.', answer: 'AI 교육, 디지털 리터러시, 에듀테크', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 디지털 시대의 교육 변화와 교사의 역할을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 디지털 대전환과 교육 패러다임 변화\n2. AI 교육과 에듀테크 활용\n3. 디지털 리터러시 교육의 필요성\n4. 교사의 새로운 역할 (퍼실리테이터, 코치)\n5. 디지털 격차 해소와 교육 평등\n\n이 주제에 대한 1000자 논술문을 작성하는 연습을 해주세요.' },
      { id: 2, question: '학교폭력 예방과 대응 방안을 논하시오.', answer: '예방교육, 관계회복, 학교문화', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 학교폭력 예방과 대응 방안을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 학교폭력의 실태와 심각성\n2. 예방교육 (인성교육, 공감능력)\n3. 조기 발견과 신속한 대응\n4. 관계회복 프로그램 (회복적 정의)\n5. 안전하고 존중하는 학교문화 조성\n\n이 주제에 대한 1000자 논술문을 작성하는 연습을 해주세요.' },
      { id: 3, question: '학생 자치활동의 교육적 의미를 논하시오.', answer: '민주시민교육, 주도성, 참여', prompt: '교원임용시험 교직논술 문제입니다.\n\n문제: 학생 자치활동의 교육적 의미와 활성화 방안을 논하시오.\n\n다음 순서로 논술해주세요:\n1. 학생 자치의 개념과 중요성\n2. 민주시민교육으로서의 자치활동\n3. 학생 주도성과 자기결정권\n4. 학생회, 동아리 활동 활성화\n5. 교사의 지원과 학생 자율성의 균형\n\n이 주제에 대한 1000자 논술문을 작성하는 연습을 해주세요.' }
    ]
  }
];

export default function TeachingEssayStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-teaching-essay-progress');
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
    localStorage.setItem('teacher-certificate-teaching-essay-progress', JSON.stringify(arr));
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
            <span className="text-indigo-600 font-medium">교직논술</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✍️</span>
            <h1 className="text-2xl font-bold text-gray-800">교직논술 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">교원임용시험 1차 - 교육 주제에 대한 논리적 글쓰기</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
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
