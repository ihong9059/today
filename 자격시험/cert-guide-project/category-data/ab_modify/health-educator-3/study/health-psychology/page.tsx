'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

export default function HealthPsychologyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '건강심리학의 개념',
      questions: [
        { id: 1, question: '건강심리학의 정의는?', answer: '건강심리학은 심리학적 원리를 건강 증진, 질병 예방, 치료에 적용하는 학문이다.', prompt: '보건교육사 3급 시험 준비: 건강심리학의 정의를 설명해주세요.' },
        { id: 2, question: '건강심리학의 주요 연구 분야는?', answer: '스트레스와 건강, 건강행동, 환자심리, 만성질환 관리 등이 있다.', prompt: '보건교육사 3급 시험 준비: 건강심리학의 주요 연구 분야를 설명해주세요.' },
        { id: 3, question: '심신 상관(Mind-Body Connection)이란?', answer: '마음과 몸이 서로 영향을 주고받는 관계로, 심리적 요인이 신체 건강에 영향을 미친다.', prompt: '보건교육사 3급 시험 준비: 심신 상관을 설명해주세요.' },
        { id: 4, question: '생물심리사회모형이란?', answer: '건강과 질병을 생물학적, 심리학적, 사회적 요인의 상호작용으로 이해하는 모형이다.', prompt: '보건교육사 3급 시험 준비: 생물심리사회모형을 설명해주세요.' },
        { id: 5, question: '건강심리학과 행동의학의 관계는?', answer: '건강심리학은 행동의학의 심리학적 측면을 다루며 서로 밀접하게 연관된다.', prompt: '보건교육사 3급 시험 준비: 건강심리학과 행동의학의 관계를 설명해주세요.' },
        { id: 6, question: '심리적 요인이 건강에 미치는 영향은?', answer: '스트레스, 우울, 불안 등 심리적 요인이 면역기능, 심혈관계 등에 영향을 미친다.', prompt: '보건교육사 3급 시험 준비: 심리적 요인이 건강에 미치는 영향을 설명해주세요.' },
        { id: 7, question: '건강 심리학자의 역할은?', answer: '건강행동 연구, 환자 상담, 건강증진 프로그램 개발, 의료팀 협력 등을 수행한다.', prompt: '보건교육사 3급 시험 준비: 건강 심리학자의 역할을 설명해주세요.' },
        { id: 8, question: '질병행동(Illness Behavior)이란?', answer: '증상을 인지하고 해석하며 의료서비스를 이용하는 행동 양상이다.', prompt: '보건교육사 3급 시험 준비: 질병행동을 설명해주세요.' },
        { id: 9, question: '환자역할(Sick Role)이란?', answer: '질병 상태에서 사회적으로 기대되는 권리(면제)와 의무(회복 노력)이다.', prompt: '보건교육사 3급 시험 준비: 환자역할을 설명해주세요.' },
        { id: 10, question: '건강심리학의 발전 배경은?', answer: '만성질환 증가, 의료비 상승, 생활습관의 중요성 인식으로 발전했다.', prompt: '보건교육사 3급 시험 준비: 건강심리학의 발전 배경을 설명해주세요.' },
      ],
    },
    {
      title: '스트레스와 건강',
      questions: [
        { id: 11, question: '스트레스의 정의는?', answer: '환경적 요구가 개인의 대처능력을 초과할 때 경험하는 심리적·신체적 긴장 상태이다.', prompt: '보건교육사 3급 시험 준비: 스트레스의 정의를 설명해주세요.' },
        { id: 12, question: '스트레스원(Stressor)의 유형은?', answer: '일상적 번거로움, 주요 생활사건, 만성 스트레스, 외상 등이 있다.', prompt: '보건교육사 3급 시험 준비: 스트레스원의 유형을 설명해주세요.' },
        { id: 13, question: '일반적응증후군(GAS)의 3단계는?', answer: '경고반응(Alarm), 저항(Resistance), 소진(Exhaustion) 단계로 구성된다.', prompt: '보건교육사 3급 시험 준비: 일반적응증후군의 3단계를 설명해주세요.' },
        { id: 14, question: '스트레스의 신체적 영향은?', answer: '면역기능 저하, 심혈관계 문제, 소화기 장애, 근골격계 통증 등이 있다.', prompt: '보건교육사 3급 시험 준비: 스트레스의 신체적 영향을 설명해주세요.' },
        { id: 15, question: '스트레스의 심리적 영향은?', answer: '불안, 우울, 분노, 집중력 저하, 수면 장애 등이 있다.', prompt: '보건교육사 3급 시험 준비: 스트레스의 심리적 영향을 설명해주세요.' },
        { id: 16, question: '스트레스 대처(Coping)의 유형은?', answer: '문제중심 대처(원인 해결)와 정서중심 대처(감정 조절)로 구분된다.', prompt: '보건교육사 3급 시험 준비: 스트레스 대처의 유형을 설명해주세요.' },
        { id: 17, question: '스트레스 관리 기법은?', answer: '이완훈련, 명상, 운동, 시간관리, 사회적 지지 활용 등이 있다.', prompt: '보건교육사 3급 시험 준비: 스트레스 관리 기법을 설명해주세요.' },
        { id: 18, question: '사회적 지지의 유형은?', answer: '정서적 지지, 정보적 지지, 도구적 지지, 평가적 지지가 있다.', prompt: '보건교육사 3급 시험 준비: 사회적 지지의 유형을 설명해주세요.' },
        { id: 19, question: '완충효과 가설이란?', answer: '사회적 지지가 스트레스의 부정적 영향을 완화시킨다는 가설이다.', prompt: '보건교육사 3급 시험 준비: 완충효과 가설을 설명해주세요.' },
        { id: 20, question: '스트레스와 면역기능의 관계는?', answer: '만성 스트레스는 코르티솔 분비를 증가시켜 면역기능을 저하시킨다.', prompt: '보건교육사 3급 시험 준비: 스트레스와 면역기능의 관계를 설명해주세요.' },
      ],
    },
    {
      title: '건강행동과 행동변화',
      questions: [
        { id: 21, question: '건강행동의 정의는?', answer: '건강을 유지하거나 증진시키기 위해 개인이 취하는 행동이다.', prompt: '보건교육사 3급 시험 준비: 건강행동의 정의를 설명해주세요.' },
        { id: 22, question: '건강신념모형(HBM)의 구성요소는?', answer: '인지된 민감성, 심각성, 이익, 장애, 자기효능감, 행동계기로 구성된다.', prompt: '보건교육사 3급 시험 준비: 건강신념모형의 구성요소를 설명해주세요.' },
        { id: 23, question: '계획행동이론(TPB)의 핵심 개념은?', answer: '태도, 주관적 규범, 지각된 행동통제력이 의도를 형성하고 행동에 영향을 준다.', prompt: '보건교육사 3급 시험 준비: 계획행동이론의 핵심 개념을 설명해주세요.' },
        { id: 24, question: '범이론적 모형(TTM)의 변화 단계는?', answer: '계획전→계획→준비→행동→유지 단계로 행동변화가 진행된다.', prompt: '보건교육사 3급 시험 준비: 범이론적 모형의 변화 단계를 설명해주세요.' },
        { id: 25, question: '자기효능감 증진 방법은?', answer: '성취경험, 대리경험(모델링), 언어적 설득, 생리적 상태 개선이 있다.', prompt: '보건교육사 3급 시험 준비: 자기효능감 증진 방법을 설명해주세요.' },
        { id: 26, question: '동기면담(MI)의 원리는?', answer: '공감 표현, 모순 발견, 저항 수용, 자기효능감 지지가 핵심 원리이다.', prompt: '보건교육사 3급 시험 준비: 동기면담의 원리를 설명해주세요.' },
        { id: 27, question: '행동 변화의 장애요인은?', answer: '지식 부족, 동기 부족, 환경적 제약, 부정적 태도, 낮은 자기효능감 등이 있다.', prompt: '보건교육사 3급 시험 준비: 행동 변화의 장애요인을 설명해주세요.' },
        { id: 28, question: '건강행동 유지 전략은?', answer: '목표 설정, 자기모니터링, 보상, 사회적 지지, 재발방지 계획이 있다.', prompt: '보건교육사 3급 시험 준비: 건강행동 유지 전략을 설명해주세요.' },
        { id: 29, question: '재발방지모형이란?', answer: '행동 변화 후 재발을 예방하기 위해 고위험 상황을 인식하고 대처 전략을 수립한다.', prompt: '보건교육사 3급 시험 준비: 재발방지모형을 설명해주세요.' },
        { id: 30, question: '넛지(Nudge) 이론이란?', answer: '선택 설계를 통해 사람들이 더 나은 건강행동을 쉽게 선택하도록 유도한다.', prompt: '보건교육사 3급 시험 준비: 넛지 이론을 설명해주세요.' },
      ],
    },
    {
      title: '정신건강과 심리장애',
      questions: [
        { id: 31, question: '정신건강의 정의는?', answer: '정서적 안정, 현실 인식, 효과적 대처, 사회적 적응 능력을 갖춘 상태이다.', prompt: '보건교육사 3급 시험 준비: 정신건강의 정의를 설명해주세요.' },
        { id: 32, question: '우울증의 주요 증상은?', answer: '지속적 우울감, 흥미 상실, 수면/식욕 변화, 피로, 무가치감, 집중력 저하가 있다.', prompt: '보건교육사 3급 시험 준비: 우울증의 주요 증상을 설명해주세요.' },
        { id: 33, question: '불안장애의 종류는?', answer: '범불안장애, 공황장애, 사회불안장애, 특정공포증 등이 있다.', prompt: '보건교육사 3급 시험 준비: 불안장애의 종류를 설명해주세요.' },
        { id: 34, question: '외상 후 스트레스 장애(PTSD)란?', answer: '외상적 사건 후 지속되는 재경험, 회피, 과각성, 부정적 인지/정서 증상이다.', prompt: '보건교육사 3급 시험 준비: 외상 후 스트레스 장애를 설명해주세요.' },
        { id: 35, question: '알코올 사용장애의 특징은?', answer: '조절 실패, 갈망, 내성, 금단, 사회적 문제에도 음주 지속이 특징이다.', prompt: '보건교육사 3급 시험 준비: 알코올 사용장애의 특징을 설명해주세요.' },
        { id: 36, question: '자살 위험요인은?', answer: '정신질환, 이전 시도 경력, 사회적 고립, 만성질환, 급성 스트레스 등이 있다.', prompt: '보건교육사 3급 시험 준비: 자살 위험요인을 설명해주세요.' },
        { id: 37, question: '정신건강 서비스의 종류는?', answer: '정신건강복지센터, 자살예방센터, 중독관리통합지원센터 등이 있다.', prompt: '보건교육사 3급 시험 준비: 정신건강 서비스의 종류를 설명해주세요.' },
        { id: 38, question: '심리적 웰빙의 구성요소는?', answer: '자기수용, 긍정적 관계, 자율성, 환경 통제, 삶의 목적, 개인적 성장이 있다.', prompt: '보건교육사 3급 시험 준비: 심리적 웰빙의 구성요소를 설명해주세요.' },
        { id: 39, question: '회복탄력성(Resilience)이란?', answer: '역경이나 스트레스에도 적응하고 회복하는 심리적 능력이다.', prompt: '보건교육사 3급 시험 준비: 회복탄력성을 설명해주세요.' },
        { id: 40, question: '정신건강 증진 전략은?', answer: '스트레스 관리, 사회적 연결, 의미 있는 활동, 전문가 상담이 있다.', prompt: '보건교육사 3급 시험 준비: 정신건강 증진 전략을 설명해주세요.' },
      ],
    },
    {
      title: '건강 커뮤니케이션과 상담',
      questions: [
        { id: 41, question: '건강 커뮤니케이션의 정의는?', answer: '건강 관련 정보를 효과적으로 전달하여 건강행동에 영향을 주는 의사소통이다.', prompt: '보건교육사 3급 시험 준비: 건강 커뮤니케이션의 정의를 설명해주세요.' },
        { id: 42, question: '효과적인 건강 메시지의 특성은?', answer: '명확성, 관련성, 신뢰성, 적시성, 행동 촉구가 있어야 한다.', prompt: '보건교육사 3급 시험 준비: 효과적인 건강 메시지의 특성을 설명해주세요.' },
        { id: 43, question: '건강정보 리터러시란?', answer: '건강정보를 찾고, 이해하고, 평가하고, 활용하는 능력이다.', prompt: '보건교육사 3급 시험 준비: 건강정보 리터러시를 설명해주세요.' },
        { id: 44, question: '공감적 경청의 기법은?', answer: '주의 집중, 반영, 명료화, 요약, 비언어적 신호 활용이 있다.', prompt: '보건교육사 3급 시험 준비: 공감적 경청의 기법을 설명해주세요.' },
        { id: 45, question: '라포(Rapport) 형성이란?', answer: '신뢰와 친밀감을 바탕으로 한 상호 이해와 협력 관계를 구축하는 것이다.', prompt: '보건교육사 3급 시험 준비: 라포 형성을 설명해주세요.' },
        { id: 46, question: '개방형 질문과 폐쇄형 질문의 차이는?', answer: '개방형은 자유로운 답변, 폐쇄형은 예/아니오 등 제한된 답변을 유도한다.', prompt: '보건교육사 3급 시험 준비: 개방형 질문과 폐쇄형 질문의 차이를 설명해주세요.' },
        { id: 47, question: '건강 상담의 기본 원칙은?', answer: '공감, 존중, 비밀보장, 자기결정권 존중, 개별화가 중요하다.', prompt: '보건교육사 3급 시험 준비: 건강 상담의 기본 원칙을 설명해주세요.' },
        { id: 48, question: '동기강화상담의 OARS 기법은?', answer: 'Open questions, Affirmations, Reflections, Summaries의 약자이다.', prompt: '보건교육사 3급 시험 준비: 동기강화상담의 OARS 기법을 설명해주세요.' },
        { id: 49, question: '비언어적 커뮤니케이션의 종류는?', answer: '표정, 눈맞춤, 제스처, 자세, 목소리 톤, 공간 활용 등이 있다.', prompt: '보건교육사 3급 시험 준비: 비언어적 커뮤니케이션의 종류를 설명해주세요.' },
        { id: 50, question: '문화적 민감성이란?', answer: '다양한 문화적 배경을 이해하고 존중하며 적절하게 대응하는 능력이다.', prompt: '보건교육사 3급 시험 준비: 문화적 민감성을 설명해주세요.' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-3-health-psychology-progress');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-3-health-psychology-progress', JSON.stringify([...newCompleted]));
  };

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-indigo-600">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-indigo-600">의료·보건</Link>
            <span>›</span>
            <Link href="/category/medical/health-educator-3" className="hover:text-indigo-600">보건교육사 3급</Link>
            <span>›</span>
            <span className="text-indigo-600 font-medium">건강심리학</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">🧠 건강심리학 학습 가이드</h1>
          <p className="text-sm text-gray-500 mt-1">보건교육사 3급 필기 3과목</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">학습 진도</span>
            <span className="text-sm text-gray-500">{completedCount} / {totalQuestions} 완료</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="text-right mt-1 text-sm text-indigo-600 font-medium">{progressPercentage}%</div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.has(q.id)).length;
            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{expandedTopics.has(topicIndex) ? '📂' : '📁'}</span>
                    <span className="font-medium text-gray-800">{topic.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className="text-gray-400">{expandedTopics.has(topicIndex) ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedTopics.has(topicIndex) && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.has(q.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(q.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.has(q.id) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300 hover:border-indigo-500'}`}
                          >
                            {completedQuestions.has(q.id) && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                            <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                            <div className="flex gap-2">
                              <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition">Claude</a>
                              <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">ChatGPT</a>
                              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">Gemini</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
