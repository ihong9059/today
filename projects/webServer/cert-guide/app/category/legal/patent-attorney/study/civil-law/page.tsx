'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function CivilLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-civil-law-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('patent-attorney-civil-law-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '민법 총칙 - 권리주체',
      questions: [
        { id: 1, question: '권리능력과 행위능력의 차이점을 설명하시오.', answer: '권리능력: 권리의무 주체될 자격, 행위능력: 단독으로 유효한 법률행위 가능' },
        { id: 2, question: '제한능력자(미성년자, 피성년후견인, 피한정후견인)의 법률행위와 취소권에 대해 설명하시오.', answer: '법정대리인 동의 없는 행위 취소 가능, 취소권자 범위' },
        { id: 3, question: '법인의 설립과 권리능력의 범위에 대해 설명하시오.', answer: '정관 목적 범위 내 권리능력, 설립등기로 성립' },
        { id: 4, question: '법인의 불법행위능력과 이사의 책임에 대해 설명하시오.', answer: '이사의 직무상 불법행위, 법인과 이사 연대책임' },
        { id: 5, question: '비법인사단과 재단의 법적 지위를 설명하시오.', answer: '당사자능력 인정, 등기능력 제한, 총유' },
        { id: 6, question: '미성년자의 법률행위와 법정대리인의 동의에 대해 설명하시오.', answer: '동의 없는 행위 취소 가능, 처분 허락받은 재산은 예외' },
        { id: 7, question: '피성년후견인의 법률행위 능력과 보호제도를 설명하시오.', answer: '일용품 구입 등 일상행위 가능, 나머지 취소 가능' },
        { id: 8, question: '실종선고의 요건과 효과를 설명하시오.', answer: '5년(특별실종 1년) 생사불명, 사망간주' },
        { id: 9, question: '부재자 재산관리와 실종선고의 차이를 설명하시오.', answer: '부재자: 재산관리, 실종선고: 사망간주' },
        { id: 10, question: '법인격부인론의 의의와 적용요건을 설명하시오.', answer: '법인격 남용 시 배후 지배자에 책임, 판례 요건' },
      ]
    },
    {
      title: '민법 총칙 - 법률행위',
      questions: [
        { id: 11, question: '법률행위의 성립요건과 효력요건을 구별하여 설명하시오.', answer: '성립: 당사자·목적·의사표시, 효력: 능력·적법·가능·확정' },
        { id: 12, question: '의사표시의 요소(효과의사, 표시의사, 표시행위)와 흠결의 효과를 설명하시오.', answer: '효과의사 흠결 시 무효/취소 문제' },
        { id: 13, question: '비진의표시와 허위표시의 차이점 및 효과를 설명하시오.', answer: '비진의: 상대방 악의시 무효, 허위표시: 당사자간 무효' },
        { id: 14, question: '착오에 의한 의사표시의 취소요건과 상대방 보호를 설명하시오.', answer: '법률행위 내용의 중요부분 착오, 중과실 시 취소불가' },
        { id: 15, question: '사기·강박에 의한 의사표시의 취소와 제3자 보호를 설명하시오.', answer: '취소 가능, 선의 제3자에게 대항 불가' },
        { id: 16, question: '대리의 본질(현명주의)과 대리권의 범위를 설명하시오.', answer: '본인 현명, 권한 범위 내 대리행위 효력' },
        { id: 17, question: '무권대리의 효과와 상대방의 보호(철회권, 최고권)를 설명하시오.', answer: '무효이나 추인 가능, 상대방 철회·최고권' },
        { id: 18, question: '표현대리의 유형(권한유월, 대리권소멸 후, 수여표시)과 요건을 설명하시오.', answer: '정당한 이유 있는 제3자 보호, 본인 책임' },
        { id: 19, question: '조건과 기한의 차이점 및 효력발생시기를 설명하시오.', answer: '조건: 불확실한 사실, 기한: 확실한 사실' },
        { id: 20, question: '소멸시효와 제척기간의 차이점을 설명하시오.', answer: '시효: 중단·정지 있음, 제척기간: 없음' },
      ]
    },
    {
      title: '물권법',
      questions: [
        { id: 21, question: '물권의 종류와 물권법정주의의 의의를 설명하시오.', answer: '법률로 정한 물권만 인정, 내용도 법정' },
        { id: 22, question: '물권변동의 성립요건주의와 대항요건주의를 비교 설명하시오.', answer: '우리나라: 등기·인도 효력요건, 일본: 대항요건' },
        { id: 23, question: '부동산 물권변동과 등기의 효력을 설명하시오.', answer: '등기해야 물권변동 효력, 공신력 불인정' },
        { id: 24, question: '동산 물권변동과 인도의 종류(현실인도, 간이인도, 점유개정, 목적물반환청구권 양도)를 설명하시오.', answer: '4가지 인도방법, 점유개정은 선의취득 인정 안됨' },
        { id: 25, question: '점유의 종류(자주점유, 타주점유, 선의점유, 악의점유)와 효과를 설명하시오.', answer: '점유 태양에 따른 권리추정·취득시효 차이' },
        { id: 26, question: '점유권과 본권의 관계 및 점유보호청구권을 설명하시오.', answer: '점유침해시 반환·방해배제·예방청구' },
        { id: 27, question: '소유권의 취득시효(부동산: 등기부취득시효, 점유취득시효)를 설명하시오.', answer: '20년 자주점유 또는 등기+10년 점유' },
        { id: 28, question: '공동소유(공유, 합유, 총유)의 차이점을 설명하시오.', answer: '공유: 지분처분자유, 합유: 공동목적, 총유: 비법인사단' },
        { id: 29, question: '지상권과 임차권의 차이점을 설명하시오.', answer: '지상권: 물권, 임차권: 채권, 효력범위 차이' },
        { id: 30, question: '저당권의 효력(부종성, 수반성, 불가분성)과 물상대위를 설명하시오.', answer: '피담보채권 종속, 목적물 가치변형물에 효력' },
      ]
    },
    {
      title: '채권법 - 채권총론',
      questions: [
        { id: 31, question: '채권의 목적(특정물채권, 종류채권, 금전채권)별 특성을 설명하시오.', answer: '특정물: 선관주의, 종류물: 특정 시까지 위험부담' },
        { id: 32, question: '이행지체의 요건과 효과(손해배상, 해제)를 설명하시오.', answer: '이행기 도과, 이행가능, 귀책사유' },
        { id: 33, question: '이행불능의 의의와 효과(전보배상, 대상청구권)를 설명하시오.', answer: '확정적 불능, 전보배상 또는 대상청구' },
        { id: 34, question: '채권자지체(수령지체)의 요건과 효과를 설명하시오.', answer: '채권자 수령거절/불능, 채무자 책임경감' },
        { id: 35, question: '채권양도의 요건과 대항요건(확정일자 있는 통지·승낙)을 설명하시오.', answer: '양도 자유, 채무자 통지/승낙으로 대항' },
        { id: 36, question: '채무인수(면책적·병존적)의 요건과 효과를 설명하시오.', answer: '면책적: 구채무자 면책, 병존적: 연대책임' },
        { id: 37, question: '변제의 충당순서와 지정변제충당을 설명하시오.', answer: '비용→이자→원본, 채무자 지정 우선' },
        { id: 38, question: '상계의 요건과 상계금지사유를 설명하시오.', answer: '동종 채권, 변제기 도래, 불법행위채권 제한' },
        { id: 39, question: '보증채무의 부종성·보충성과 연대보증의 특성을 설명하시오.', answer: '연대보증: 최고검색항변권 없음' },
        { id: 40, question: '연대채무와 불가분채무의 차이를 설명하시오.', answer: '연대: 급부 가분, 불가분: 급부 불가분' },
      ]
    },
    {
      title: '채권법 - 채권각론',
      questions: [
        { id: 41, question: '계약의 성립(청약과 승낙)과 효력발생시기를 설명하시오.', answer: '승낙 도달 시 성립, 격지자간 특칙' },
        { id: 42, question: '동시이행항변권의 요건과 효과를 설명하시오.', answer: '쌍무계약, 이행거절 가능, 이행지체 불성립' },
        { id: 43, question: '계약해제의 요건과 효과(원상회복, 손해배상)를 설명하시오.', answer: '채무불이행+최고, 원상회복의무 발생' },
        { id: 44, question: '매매계약의 담보책임(하자담보, 권리하자)을 설명하시오.', answer: '매도인의 무과실책임, 손배·해제·대금감액' },
        { id: 45, question: '임대차계약의 효력과 임차인의 권리(부속물매수청구권)를 설명하시오.', answer: '사용수익권, 부속물 매수청구, 갱신청구' },
        { id: 46, question: '불법행위의 성립요건(고의·과실, 위법성, 인과관계, 손해)을 설명하시오.', answer: '4요건 충족 시 손해배상책임' },
        { id: 47, question: '사용자책임의 요건과 구상권을 설명하시오.', answer: '사용관계+사무집행관련, 피용자에 구상' },
        { id: 48, question: '공작물책임의 요건과 책임주체를 설명하시오.', answer: '점유자 1차, 소유자 2차(무과실)' },
        { id: 49, question: '부당이득의 성립요건과 반환범위를 설명하시오.', answer: '법률상 원인 없이 타인 손해로 이익, 선의자 현존이익' },
        { id: 50, question: '사무관리의 성립요건과 효과를 설명하시오.', answer: '타인 사무 관리, 비용상환청구권' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal/patent-attorney" className="text-gray-600 hover:text-blue-600">변리사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">민법개론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📚</span>
              <div>
                <h1 className="text-2xl font-bold">민법개론</h1>
                <p className="text-cyan-100">1차 시험 | 민법 총칙·물권법·채권법</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-cyan-100 text-sm">학습 진도</p>
              <p className="text-3xl font-bold">{progressPercent}%</p>
              <p className="text-cyan-200 text-sm">{completedQuestions.length}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-cyan-50 to-teal-50 hover:from-cyan-100 hover:to-teal-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <div className="text-left">
                    <h2 className="font-bold text-gray-800">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-cyan-600 font-medium">
                      {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                    </span>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-6 space-y-4">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border-2 transition ${
                        completedQuestions.includes(q.id)
                          ? 'bg-cyan-50 border-cyan-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(q.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-cyan-500 border-cyan-500 text-white'
                              : 'border-gray-300 hover:border-cyan-500'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-cyan-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded">
                            💡 {q.answer}
                          </p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`변리사 시험 민법개론 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문과 판례
3. 구체적 사례 적용
4. 시험 출제 포인트
5. 연습문제 3개`);
                              if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition"
                          >
                            🤖 AI에게 질문하기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <section className="mt-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">💡 민법개론 학습 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">판례 중심</h3>
              <p className="text-sm text-cyan-100">대법원 판례 사안 중심 학습</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">물권·채권 비중</h3>
              <p className="text-sm text-cyan-100">물권법과 채권법 집중 출제</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">변리사 특화</h3>
              <p className="text-sm text-cyan-100">지재권 관련 민법 쟁점 주의</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
