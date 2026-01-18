'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FieldPracticeStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '실습 준비', icon: '📋' },
    { id: 1, name: '기관 선정', icon: '🏢' },
    { id: 2, name: '실습 과정', icon: '📅' },
    { id: 3, name: '실습일지 작성', icon: '📝' },
    { id: 4, name: '평가와 종결', icon: '✅' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '사회복지현장실습의 목적은 무엇인가?', answer: '이론을 현장에 적용하고 실천역량을 개발하며, 사회복지사로서의 정체성과 윤리의식을 함양하는 것이다.', explanation: '학교-현장 연계 학습' },
      { id: 2, question: '사회복지현장실습의 법적 요건은?', answer: '120시간 이상(2004년 이후), 사회복지사업법 시행규칙에 따른 실습기관에서 수행해야 한다.', explanation: '2020년부터 160시간으로 변경' },
      { id: 3, question: '실습 전 준비사항은 무엇인가?', answer: '실습기관 탐색, 실습 목표 설정, 기관 사전방문, 건강검진, 봉사활동 경험, 관련 이론 복습이 필요하다.', explanation: '사전 준비가 실습 성과에 영향' },
      { id: 4, question: '실습생의 권리와 의무는?', answer: '적절한 교육과 슈퍼비전을 받을 권리가 있으며, 기관 규정 준수, 비밀보장, 성실한 참여 의무가 있다.', explanation: '권리와 책임의 균형' },
      { id: 5, question: '실습 세미나의 목적은?', answer: '실습 경험을 공유하고 성찰하며, 동료와 교수로부터 피드백을 받는 학습의 장이다.', explanation: '학교 연계 교육' }
    ],
    1: [
      { id: 6, question: '실습기관 선정 시 고려사항은?', answer: '기관의 전문성, 슈퍼바이저 자격, 실습 프로그램, 접근성, 개인 진로 관심분야를 고려한다.', explanation: '진로와 연계하여 선정' },
      { id: 7, question: '실습기관의 유형은?', answer: '이용시설(복지관, 센터), 생활시설(양로원, 아동시설), 행정기관(주민센터, 복지부서) 등이 있다.', explanation: '다양한 현장 경험' },
      { id: 8, question: '실습 슈퍼바이저의 자격요건은?', answer: '사회복지사 1급 또는 2급 소지자로서 3년 이상 실무경력이 있어야 한다.', explanation: '법정 자격요건' },
      { id: 9, question: '기관 사전방문 시 확인사항은?', answer: '실습 프로그램 내용, 근무시간, 복장규정, 슈퍼비전 방식, 실습 중 과업 등을 확인한다.', explanation: '현실적 기대 형성' },
      { id: 10, question: '실습 협약서의 내용은?', answer: '실습 기간, 시간, 실습내용, 평가방법, 양 기관의 책임과 역할을 명시한다.', explanation: '학교-기관 간 협약' }
    ],
    2: [
      { id: 11, question: '실습 오리엔테이션의 내용은?', answer: '기관 소개, 조직구조, 서비스 내용, 클라이언트 특성, 실습생 역할과 규정을 안내받는다.', explanation: '실습 첫날 진행' },
      { id: 12, question: '실습의 주요 활동 영역은?', answer: '직접 서비스(상담, 프로그램 진행), 간접 서비스(기록, 자원연계), 행정업무 참여 등이 있다.', explanation: '다양한 업무 경험' },
      { id: 13, question: '슈퍼비전의 유형과 방법은?', answer: '개별 슈퍼비전, 집단 슈퍼비전, 현장지도가 있으며 정기적으로 실시된다.', explanation: '교육·지지·행정 기능' },
      { id: 14, question: '실습 중 윤리적 딜레마 상황은?', answer: '비밀보장 vs 신고의무, 자기결정 vs 보호, 이중관계 상황 등이 발생할 수 있다.', explanation: '슈퍼바이저와 상의 필요' },
      { id: 15, question: '실습 중 어려움 대처방법은?', answer: '슈퍼바이저와 상담, 실습 세미나 활용, 자기성찰, 동료지지 활용이 필요하다.', explanation: '적극적 소통이 중요' },
      { id: 16, question: '효과적인 시간관리 방법은?', answer: '우선순위 설정, 일정표 활용, 과업 분류, 충분한 준비시간 확보가 필요하다.', explanation: '실습 효율성 향상' },
      { id: 17, question: '클라이언트와의 관계형성 시 주의점은?', answer: '전문적 거리 유지, 개인정보 보호, 실습생 신분 고지, 적절한 경계 설정이 중요하다.', explanation: '실습생 역할 인식' }
    ],
    3: [
      { id: 18, question: '실습일지 작성의 목적은?', answer: '실습 경험을 기록하고 성찰하며, 슈퍼비전의 자료로 활용하고 학습을 체계화한다.', explanation: '성찰적 학습 도구' },
      { id: 19, question: '실습일지의 구성요소는?', answer: '일시, 실습내용, 관찰·참여 활동, 느낀점과 배운점, 슈퍼바이저 코멘트가 포함된다.', explanation: '객관적·주관적 기록 병행' },
      { id: 20, question: '효과적인 실습일지 작성법은?', answer: '구체적 사실 기록, 자신의 생각과 감정 구분, 이론과 연결, 개선점 도출이 필요하다.', explanation: '당일 작성 권장' },
      { id: 21, question: '주간실습보고서의 내용은?', answer: '주간 활동 요약, 주요 학습내용, 성취 목표 점검, 다음 주 계획을 포함한다.', explanation: '주간 단위 성찰' },
      { id: 22, question: '실습기록 시 유의사항은?', answer: '클라이언트 비밀보장, 객관적 사실 기록, 판단과 사실 구분, 전문 용어 사용에 유의한다.', explanation: '윤리적·전문적 기록' }
    ],
    4: [
      { id: 23, question: '실습평가의 영역은?', answer: '지식, 기술, 가치·태도, 자기인식 등의 영역에서 평가하며 목표 달성 정도를 확인한다.', explanation: '다면적 평가' },
      { id: 24, question: '자기평가의 방법은?', answer: '실습 목표 점검, 강점과 약점 분석, 성장 영역 확인, 향후 학습 계획 수립이 포함된다.', explanation: '자기성찰의 기회' },
      { id: 25, question: '종결과정의 과업은?', answer: '클라이언트와 작별, 담당 업무 인수인계, 감사 표현, 실습 평가회 참석이 필요하다.', explanation: '책임 있는 종결' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`사회복지사 2급 현장실습 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-red-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">현장실습 가이드</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🏢 현장실습 가이드</h1>
          <p className="text-red-100">실습 준비, 기관 선정, 실습일지 작성, 평가</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-red-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-red-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-red-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg"><p className="font-medium text-red-900">✅ 정답</p><p className="text-red-800 mt-1">{q.answer}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
