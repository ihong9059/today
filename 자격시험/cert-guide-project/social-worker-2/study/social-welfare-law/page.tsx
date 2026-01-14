'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SocialWelfareLawStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '법의 기초', icon: '⚖️' },
    { id: 1, name: '사회보장법', icon: '🏛️' },
    { id: 2, name: '공공부조법', icon: '💰' },
    { id: 3, name: '사회복지서비스법', icon: '🤝' },
    { id: 4, name: '대상별 복지법', icon: '👨‍👩‍👧‍👦' },
    { id: 5, name: '사회보험법', icon: '🛡️' },
    { id: 6, name: '권리구제', icon: '📋' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '사회복지법의 개념과 특성은?', answer: '사회복지와 관련된 법률의 총체로, 생존권 보장, 국가책임, 사회연대의 원리를 기반으로 한다.', explanation: '사회권의 법적 표현' },
      { id: 2, question: '사회복지 법체계의 구조는?', answer: '헌법 → 사회보장기본법 → 개별 사회복지법률(사회보험, 공공부조, 사회서비스)로 구성된다.', explanation: '상위법 우선 원칙' },
      { id: 3, question: '헌법상 사회복지 관련 조항은?', answer: '인간의 존엄과 가치(10조), 사회권(31-36조), 사회적 시장경제(119조) 등이 있다.', explanation: '사회복지의 헌법적 근거' },
      { id: 4, question: '생존권(사회권)의 의미는?', answer: '국민이 국가에 대해 인간다운 생활의 보장을 요구할 수 있는 권리이다.', explanation: '헌법 34조의 핵심' },
      { id: 5, question: '사회복지법의 법원(法源)은?', answer: '헌법, 법률, 명령(시행령, 시행규칙), 조례, 판례 등이 있다.', explanation: '성문법과 불문법' },
      { id: 6, question: '법률 해석의 방법은?', answer: '문리해석, 논리해석(확장, 축소, 유추), 역사적 해석, 목적론적 해석이 있다.', explanation: '법적용의 기초' },
      { id: 7, question: '사회복지 조례의 역할은?', answer: '지방자치단체가 지역 특성에 맞는 복지정책을 법적으로 규정한다.', explanation: '지방분권과 복지' }
    ],
    1: [
      { id: 8, question: '사회보장기본법의 목적과 내용은?', answer: '사회보장에 관한 국민의 권리와 국가의 책임을 정하고, 사회보험·공공부조·사회서비스를 정의한다.', explanation: '사회보장의 기본법' },
      { id: 9, question: '사회보장의 3대 영역은?', answer: '사회보험(보험료 기반), 공공부조(조세 기반), 사회서비스(돌봄·상담 등)이다.', explanation: '재원과 기능에 따른 분류' },
      { id: 10, question: '사회보장급여법의 주요 내용은?', answer: '사회보장급여의 신청, 조사, 결정, 지급에 관한 절차와 수급권 보호를 규정한다.', explanation: '통합급여 관리' },
      { id: 11, question: '사회보장정보시스템(행복e음)이란?', answer: '사회보장급여를 통합 관리하는 전산시스템으로 소득·재산 조사, 중복수급 방지를 담당한다.', explanation: '복지정보 통합 플랫폼' },
      { id: 12, question: '사회보장위원회의 구성과 기능은?', answer: '국무총리 소속으로 사회보장 주요 정책을 심의·조정하며 관계부처 장관 등이 참여한다.', explanation: '최고 심의기구' },
      { id: 13, question: '지역사회보장계획의 의미는?', answer: '시군구가 4년마다 수립하는 지역단위 복지계획으로 욕구조사, 목표, 사업계획을 포함한다.', explanation: '지역복지 기본계획' },
      { id: 14, question: '사회서비스원의 역할은?', answer: '공공성 강화를 위해 직접 돌봄서비스를 제공하고 종사자 처우개선을 추진하는 공공기관이다.', explanation: '시도 단위 설립' }
    ],
    2: [
      { id: 15, question: '국민기초생활보장법의 목적은?', answer: '생활이 어려운 사람에게 필요한 급여를 실시하여 최저생활을 보장하고 자립을 지원한다.', explanation: '최후의 사회안전망' },
      { id: 16, question: '기초생활보장 급여의 종류는?', answer: '생계급여, 의료급여, 주거급여, 교육급여, 해산급여, 장제급여, 자활급여가 있다.', explanation: '맞춤형 급여체계' },
      { id: 17, question: '수급권자 선정 기준은?', answer: '기준 중위소득의 일정 비율 이하(급여별 상이)이고 부양의무자 기준을 충족해야 한다.', explanation: '소득인정액과 부양의무자' },
      { id: 18, question: '소득인정액 산정 방식은?', answer: '소득평가액 + 재산의 소득환산액으로 계산한다.', explanation: '소득과 재산 통합 평가' },
      { id: 19, question: '자활사업의 종류와 내용은?', answer: '자활근로, 자활기업, 취업성공패키지, 자산형성지원 등을 통해 근로능력자의 자립을 지원한다.', explanation: '근로연계 복지' },
      { id: 20, question: '긴급복지지원법의 내용은?', answer: '위기상황(실직, 질병 등)에 처한 사람에게 신속하게 생계·의료·주거 등을 지원한다.', explanation: '선지원 후처리 원칙' },
      { id: 21, question: '의료급여법의 수급권자 구분은?', answer: '1종(근로무능력), 2종(근로능력)으로 구분되며 본인부담금이 다르다.', explanation: '의료 안전망' }
    ],
    3: [
      { id: 22, question: '사회복지사업법의 목적과 내용은?', answer: '사회복지사업의 내용·절차 및 사회복지시설·법인의 설치·운영에 관해 규정한다.', explanation: '사회복지사업의 기본법' },
      { id: 23, question: '사회복지법인의 설립과 운영은?', answer: '시도지사 허가를 받아 설립하며, 이사회 구성, 재산 관리, 감독 규정을 준수해야 한다.', explanation: '비영리법인' },
      { id: 24, question: '사회복지시설의 종류는?', answer: '이용시설(복지관 등)과 생활시설(양로원, 장애인거주시설 등)로 구분된다.', explanation: '시설유형별 규정' },
      { id: 25, question: '사회복지사 자격제도는?', answer: '1급(국가시험), 2급(학점이수)으로 구분되며, 결격사유와 취소요건이 규정된다.', explanation: '전문인력 관리' },
      { id: 26, question: '사회복지시설 평가제도란?', answer: '3년마다 시설 운영 전반을 평가하여 서비스 질 향상을 유도한다.', explanation: '평가결과 공개' },
      { id: 27, question: '사회복지 전달체계란?', answer: '복지서비스가 수요자에게 전달되는 조직적 경로로, 읍면동 맞춤형 복지팀 등이 있다.', explanation: '접근성과 효율성' },
      { id: 28, question: '사회서비스이용권(바우처)법의 내용은?', answer: '이용자가 서비스 제공기관을 선택하여 바우처로 결제하는 방식을 규정한다.', explanation: '이용자 선택권 강화' }
    ],
    4: [
      { id: 29, question: '아동복지법의 주요 내용은?', answer: '아동의 권리보호, 학대예방, 보호체계, 아동복지시설 등을 규정한다.', explanation: '18세 미만 아동 대상' },
      { id: 30, question: '아동학대처벌법의 특징은?', answer: '아동학대를 범죄로 규정하고, 신고의무, 피해아동 보호조치, 가해자 처벌을 강화한다.', explanation: '형사처벌과 보호조치' },
      { id: 31, question: '노인복지법의 주요 서비스는?', answer: '노인주거·의료·여가복지시설, 재가서비스, 일자리사업, 노인학대 예방이 있다.', explanation: '65세 이상 노인 대상' },
      { id: 32, question: '장애인복지법의 장애 범주는?', answer: '신체적 장애(지체, 뇌병변, 시각, 청각 등)와 정신적 장애(지적, 자폐, 정신)를 포함한다.', explanation: '15개 장애유형' },
      { id: 33, question: '장애인권익옹호기관의 역할은?', answer: '장애인 학대와 차별을 조사하고 피해장애인을 보호·지원한다.', explanation: '학대예방과 권익옹호' },
      { id: 34, question: '한부모가족지원법의 내용은?', answer: '한부모가족에게 복지급여, 복지시설, 자립지원을 제공한다.', explanation: '아동양육 한부모 대상' },
      { id: 35, question: '다문화가족지원법의 내용은?', answer: '결혼이민자와 그 가족에게 언어교육, 상담, 취업지원 등을 제공한다.', explanation: '사회통합 지원' }
    ],
    5: [
      { id: 36, question: '국민연금법의 주요 내용은?', answer: '노령, 장애, 사망에 대비한 연금급여를 규정하며, 18세 이상 60세 미만 가입자 대상이다.', explanation: '1988년 시행' },
      { id: 37, question: '국민건강보험법의 특징은?', answer: '전국민을 대상으로 질병·부상에 대해 보험급여를 제공하는 사회보험이다.', explanation: '직장·지역가입자' },
      { id: 38, question: '고용보험법의 주요 사업은?', answer: '실업급여, 고용안정사업, 직업능력개발사업을 실시한다.', explanation: '실업 대비 보험' },
      { id: 39, question: '산업재해보상보험법의 내용은?', answer: '업무상 재해에 대해 요양, 휴업, 장해, 유족급여 등을 제공한다.', explanation: '무과실책임주의' },
      { id: 40, question: '노인장기요양보험법의 대상은?', answer: '65세 이상 또는 노인성 질병이 있는 사람으로 일상생활 수행이 어려운 경우이다.', explanation: '등급 판정 필요' },
      { id: 41, question: '장기요양등급의 구분은?', answer: '1등급(최중증)부터 5등급까지 있으며 등급에 따라 급여 범위가 다르다.', explanation: '등급판정위원회 심의' },
      { id: 42, question: '사회보험 4대보험 적용사업장이란?', answer: '국민연금, 건강보험, 고용보험, 산재보험을 모두 가입해야 하는 사업장이다.', explanation: '근로자 보호' }
    ],
    6: [
      { id: 43, question: '사회복지 급여 신청권이란?', answer: '국민이 사회보장급여를 신청할 권리로, 거부 시 이유를 통지받을 권리가 있다.', explanation: '절차적 권리' },
      { id: 44, question: '이의신청 제도란?', answer: '급여 결정에 불복할 때 처분청에 재심사를 청구하는 제도이다.', explanation: '행정심판 전 단계' },
      { id: 45, question: '사회보장급여 심사청구란?', answer: '사회보장급여 관련 처분에 대해 사회보장심사위원회에 불복을 청구하는 것이다.', explanation: '행정심판의 일종' },
      { id: 46, question: '행정심판과 행정소송의 차이는?', answer: '행정심판은 행정기관에, 행정소송은 법원에 불복하는 절차이다.', explanation: '재판청구권 보장' },
      { id: 47, question: '국민권익위원회의 역할은?', answer: '행정기관의 위법·부당한 처분에 대한 고충민원을 처리하고 시정을 권고한다.', explanation: '옴부즈만 기능' },
      { id: 48, question: '국가인권위원회의 기능은?', answer: '인권침해와 차별행위를 조사하고 시정권고를 하는 독립 국가기관이다.', explanation: '인권보호기구' },
      { id: 49, question: '법률구조제도란?', answer: '경제적 어려움으로 법률서비스를 받기 어려운 사람에게 무료 법률지원을 제공한다.', explanation: '대한법률구조공단' },
      { id: 50, question: '사회복지사의 법적 의무는?', answer: '비밀보장, 신고의무(학대 등), 기록보존, 윤리강령 준수 등의 법적 의무가 있다.', explanation: '법적 책임과 윤리' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`사회복지사 2급 사회복지법제와 실천 관련 질문입니다:\n\n${question}\n\n이 법률 개념에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-orange-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link><span>/</span>
            <Link href="/category/welfare/social-worker-2/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">사회복지법제와 실천</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">⚖️ 사회복지법제와 실천</h1>
          <p className="text-orange-100">사회복지 관련 법률 체계와 실제 적용</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-orange-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-orange-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-orange-50 rounded-lg"><p className="font-medium text-orange-900">✅ 정답</p><p className="text-orange-800 mt-1">{q.answer}</p></div>
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
