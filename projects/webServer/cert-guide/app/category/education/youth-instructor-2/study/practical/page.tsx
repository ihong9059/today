'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['topic1']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('youth-instructor-2-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('youth-instructor-2-practical-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]);
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(t => t !== topicId) : [...prev, topicId]);
  };

  const topics = [
    {
      id: 'topic1',
      title: '자기소개 및 지원동기',
      icon: '👤',
      questions: [
        { id: 1, question: '간단하게 자기소개를 해주세요.', answer: '이름, 학력/경력, 청소년활동 경험, 지원 분야 순으로 간결하게', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 간단하게 자기소개를 해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 효과적인 자기소개 구성 방법\n2. 포함해야 할 핵심 요소\n3. 모범 답변 예시 (1분 기준)\n4. 주의사항\n5. 연습용 추가 질문 3개' },
        { id: 2, question: '청소년지도사가 되려는 동기는 무엇입니까?', answer: '청소년과의 경험, 성장 지원 열정, 사회 기여 의지', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년지도사가 되려는 동기는 무엇입니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 진정성 있는 동기 표현 방법\n2. 구체적 경험과 연결\n3. 모범 답변 예시\n4. 피해야 할 답변\n5. 연습용 추가 질문 3개' },
        { id: 3, question: '청소년지도사로서 본인의 강점은 무엇입니까?', answer: '청소년 소통 능력, 프로그램 기획력, 공감 능력 등 구체적 사례와 함께', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년지도사로서 본인의 강점은 무엇입니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 강점 선정 기준\n2. STAR 기법 활용\n3. 모범 답변 예시\n4. 강점과 직무 연결\n5. 연습용 추가 질문 3개' },
        { id: 4, question: '본인의 단점은 무엇이며, 어떻게 극복하고 있습니까?', answer: '실제 단점 인정 + 개선 노력과 성과 제시', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 본인의 단점은 무엇이며, 어떻게 극복하고 있습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 단점 선택 전략\n2. 극복 노력 강조\n3. 모범 답변 예시\n4. 피해야 할 단점 유형\n5. 연습용 추가 질문 3개' },
        { id: 5, question: '청소년활동 관련 경험이 있다면 말씀해주세요.', answer: '봉사활동, 멘토링, 캠프 참여 등 구체적 역할과 성과', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년활동 관련 경험이 있다면 말씀해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 경험 정리 방법\n2. 역할과 성과 강조\n3. 모범 답변 예시\n4. 경험이 없는 경우 대처\n5. 연습용 추가 질문 3개' },
      ]
    },
    {
      id: 'topic2',
      title: '청소년 정책 이해',
      icon: '📋',
      questions: [
        { id: 6, question: '청소년기본법에서 정의하는 청소년의 연령 범위는?', answer: '9세 이상 24세 이하, 다른 법률과의 비교 설명', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년기본법에서 정의하는 청소년의 연령 범위는?\n\n다음 순서로 답변을 구성해주세요:\n1. 정확한 연령 범위\n2. 다른 법률과 비교\n3. 연령 설정 의미\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 7, question: '현재 청소년 정책의 주무부처와 주요 정책을 설명해주세요.', answer: '여성가족부, 청소년정책기본계획, 주요 사업 설명', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 현재 청소년 정책의 주무부처와 주요 정책을 설명해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 주무부처 및 조직\n2. 제7차 청소년정책기본계획\n3. 주요 정책 사업\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 8, question: '청소년활동진흥법에서 규정하는 청소년활동 3대 영역은?', answer: '수련활동, 교류활동, 문화활동과 각각의 정의', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년활동진흥법에서 규정하는 청소년활동 3대 영역은?\n\n다음 순서로 답변을 구성해주세요:\n1. 3대 영역 정의\n2. 각 영역의 예시\n3. 영역 간 연계\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 9, question: '청소년수련시설의 종류와 각각의 특성을 설명해주세요.', answer: '수련관, 수련원, 문화의집, 특화시설, 야영장의 구분', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년수련시설의 종류와 각각의 특성을 설명해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 5종 시설 정의\n2. 각 시설 특성 비교\n3. 시설별 프로그램\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 10, question: '청소년수련활동 인증제에 대해 설명해주세요.', answer: '목적, 인증 기준, 절차, 효과 설명', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년수련활동 인증제에 대해 설명해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 제도의 목적\n2. 인증 기준과 절차\n3. 인증 효과\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
      ]
    },
    {
      id: 'topic3',
      title: '청소년 이해',
      icon: '👦',
      questions: [
        { id: 11, question: '청소년기의 발달적 특성에 대해 설명해주세요.', answer: '신체, 인지, 정서, 사회성 발달 특성', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년기의 발달적 특성에 대해 설명해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 발달 영역별 특성\n2. 발달이론 연결\n3. 지도 시 고려사항\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 12, question: '에릭슨의 청소년기 발달과업은 무엇입니까?', answer: '정체성 대 정체성 혼란, 정체성 형성의 의미', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 에릭슨의 청소년기 발달과업은 무엇입니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 발달과업 명칭\n2. 개념 설명\n3. 지도 시사점\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 13, question: '요즘 청소년들의 특성과 문화에 대해 어떻게 생각하십니까?', answer: '디지털 네이티브, 개성 존중, 공정성 추구 등 객관적 이해', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 요즘 청소년들의 특성과 문화에 대해 어떻게 생각하십니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 청소년문화 특성\n2. 긍정적/객관적 시각\n3. 세대 이해 자세\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 14, question: '청소년 문제행동의 원인과 대처 방안은?', answer: '개인, 가정, 사회적 요인 분석과 예방적 접근', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년 문제행동의 원인과 대처 방안은?\n\n다음 순서로 답변을 구성해주세요:\n1. 문제행동 유형\n2. 원인 분석\n3. 예방 및 개입\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 15, question: '청소년 인터넷/게임 과의존에 대한 생각과 지도 방안은?', answer: '현상 이해, 원인 분석, 균형 잡힌 접근', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년 인터넷/게임 과의존에 대한 생각과 지도 방안은?\n\n다음 순서로 답변을 구성해주세요:\n1. 현황과 특성\n2. 원인 이해\n3. 지도 방안\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
      ]
    },
    {
      id: 'topic4',
      title: '지도 역량',
      icon: '🎯',
      questions: [
        { id: 16, question: '청소년지도사의 역할과 자질은 무엇이라고 생각합니까?', answer: '기획자, 상담자, 촉진자 역할과 필요 역량', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년지도사의 역할과 자질은 무엇이라고 생각합니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 주요 역할\n2. 필요 자질\n3. 본인 역량 연결\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 17, question: '청소년 프로그램을 기획할 때 가장 중요하게 생각하는 것은?', answer: '요구분석, 참여자 중심, 체험활동 강조', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년 프로그램을 기획할 때 가장 중요하게 생각하는 것은?\n\n다음 순서로 답변을 구성해주세요:\n1. 기획 시 고려요소\n2. 우선순위 설명\n3. 경험 사례 연결\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 18, question: '프로그램 진행 중 청소년들이 참여하지 않을 때 어떻게 하겠습니까?', answer: '원인 파악, 동기부여, 활동 수정, 개별 접근', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 프로그램 진행 중 청소년들이 참여하지 않을 때 어떻게 하겠습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 원인 분석\n2. 대처 전략\n3. 구체적 방법\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 19, question: '청소년과 갈등 상황이 발생하면 어떻게 대처하겠습니까?', answer: '경청, 공감, 문제해결 지향적 접근', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년과 갈등 상황이 발생하면 어떻게 대처하겠습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 갈등 대처 원칙\n2. 단계별 접근\n3. 사례 적용\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 20, question: '안전사고 예방을 위해 어떤 노력을 하겠습니까?', answer: '사전 점검, 위험요소 제거, 안전교육, 비상대응 계획', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 안전사고 예방을 위해 어떤 노력을 하겠습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 안전관리 원칙\n2. 예방 활동\n3. 사고 발생 시 대응\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
      ]
    },
    {
      id: 'topic5',
      title: '상황대처 및 비전',
      icon: '🌟',
      questions: [
        { id: 21, question: '위기청소년을 발견했을 때 어떻게 대처하겠습니까?', answer: '안전 확보, 경청, 전문기관 연계, 비밀보장', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 위기청소년을 발견했을 때 어떻게 대처하겠습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 위기 대응 원칙\n2. 단계별 대처\n3. 연계 기관\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 22, question: '학교폭력 피해 청소년을 상담할 때 유의할 점은?', answer: '비밀보장, 공감, 피해자 중심, 신고의무', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 학교폭력 피해 청소년을 상담할 때 유의할 점은?\n\n다음 순서로 답변을 구성해주세요:\n1. 상담 원칙\n2. 접근 방법\n3. 연계 지원\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 23, question: '청소년지도사가 된 후 5년 후 어떤 모습이 되고 싶습니까?', answer: '전문성 성장, 프로그램 개발, 후배 양성 등 구체적 비전', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년지도사가 된 후 5년 후 어떤 모습이 되고 싶습니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 비전 제시 방법\n2. 단계별 목표\n3. 실현 방안\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 24, question: '청소년지도 현장에서 가장 어려운 점은 무엇이라 생각합니까?', answer: '현장의 어려움 인식, 극복 의지, 대안 제시', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 청소년지도 현장에서 가장 어려운 점은 무엇이라 생각합니까?\n\n다음 순서로 답변을 구성해주세요:\n1. 현장 어려움 분석\n2. 극복 방안\n3. 긍정적 자세\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
        { id: 25, question: '마지막으로 하고 싶은 말씀이 있으시면 해주세요.', answer: '열정, 준비성, 다짐을 진정성 있게 전달', prompt: '청소년지도사 2급 면접 문제입니다.\n\n질문: 마지막으로 하고 싶은 말씀이 있으시면 해주세요.\n\n다음 순서로 답변을 구성해주세요:\n1. 마무리 발언 구성\n2. 핵심 메시지\n3. 진정성 표현\n4. 모범 답변 예시\n5. 연습용 추가 질문 3개' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const progress = (completedQuestions.length / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor-2" className="text-gray-500 hover:text-gray-700">청소년지도사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">면접</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl"><span className="text-4xl">🎯</span></div>
            <div>
              <h1 className="text-2xl font-bold">면접 대비</h1>
              <p className="text-red-100">예상 질문과 모범 답안으로 완벽 준비</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">학습 진행률</span>
            <span className="text-sm text-red-600 font-bold">{completedQuestions.length} / {allQuestions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-6">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-2">💡 면접 팁</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• 질문의 의도를 파악하고 논리적으로 답변하세요.</li>
            <li>• 모르는 내용은 솔직하게 인정하고, 알고 있는 부분을 설명하세요.</li>
            <li>• 청소년에 대한 긍정적이고 존중하는 태도를 보여주세요.</li>
            <li>• 구체적인 경험과 사례를 들어 답변의 신뢰성을 높이세요.</li>
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.filter(q => completedQuestions.includes(q.id)).length} / {topic.questions.length} 완료</p>
                  </div>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleQuestion(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${completedQuestions.includes(q.id) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 hover:border-red-500'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{q.id}. {q.question}</p>
                          <p className="text-sm text-red-600 mt-1">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI에게 답변 예시 받기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8"><div className="max-w-4xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
