'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function NaturalScienceStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-natural-science-completed');
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
    localStorage.setItem('patent-attorney-natural-science-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '물리학 - 역학/열역학',
      questions: [
        { id: 1, question: '뉴턴의 운동법칙 3가지를 설명하고 각각의 응용 사례를 제시하시오.', answer: '제1법칙(관성), 제2법칙(F=ma), 제3법칙(작용반작용)' },
        { id: 2, question: '운동에너지와 위치에너지의 정의 및 역학적 에너지 보존법칙을 설명하시오.', answer: 'KE=½mv², PE=mgh, 보존력 하에서 총 역학에너지 보존' },
        { id: 3, question: '열역학 제1법칙(에너지 보존)과 제2법칙(엔트로피 증가)을 설명하시오.', answer: '내부에너지 변화=열+일, 고립계 엔트로피 증가' },
        { id: 4, question: '등온과정, 단열과정, 등압과정, 등적과정의 특성을 비교 설명하시오.', answer: '각 과정에서의 열, 일, 내부에너지 변화 관계' },
        { id: 5, question: '진자운동과 단진동의 주기 공식을 유도하고 특성을 설명하시오.', answer: 'T=2π√(l/g), T=2π√(m/k), 등시성' },
        { id: 6, question: '각운동량 보존법칙과 회전운동에서의 응용을 설명하시오.', answer: 'L=Iω, 외부 토크 없으면 보존' },
        { id: 7, question: '만유인력법칙과 케플러의 행성운동 법칙의 관계를 설명하시오.', answer: 'F=GMm/r², 타원궤도, 면적속도일정, 조화법칙' },
        { id: 8, question: '이상기체 상태방정식(PV=nRT)의 의미와 한계를 설명하시오.', answer: '분자크기, 분자간 인력 무시, 실제기체와 차이' },
        { id: 9, question: '카르노 사이클의 원리와 효율을 설명하시오.', answer: '이상적 열기관, η=1-Tc/Th' },
        { id: 10, question: '탄성계수와 훅의 법칙을 설명하시오.', answer: 'F=-kx, 영률, 전단계수, 체적탄성률' },
      ]
    },
    {
      title: '물리학 - 전자기학/파동',
      questions: [
        { id: 11, question: '쿨롱의 법칙과 전기장의 정의를 설명하시오.', answer: 'F=kq₁q₂/r², E=F/q' },
        { id: 12, question: '전기력선과 등전위면의 특성을 설명하시오.', answer: '전기력선 직교, 등전위면 일 없음' },
        { id: 13, question: '옴의 법칙과 저항의 직렬·병렬연결을 설명하시오.', answer: 'V=IR, 직렬: R합=R₁+R₂, 병렬: 1/R합=1/R₁+1/R₂' },
        { id: 14, question: '자기장과 자기력(로렌츠 힘)을 설명하시오.', answer: 'F=qv×B, 자기장 내 전하의 원운동' },
        { id: 15, question: '전자기유도(패러데이 법칙, 렌츠 법칙)를 설명하시오.', answer: 'ε=-dΦ/dt, 유도기전력 방향' },
        { id: 16, question: '파동의 기본 성질(반사, 굴절, 회절, 간섭)을 설명하시오.', answer: '스넬법칙, 호이겐스원리, 보강·상쇄간섭' },
        { id: 17, question: '음파의 특성과 도플러 효과를 설명하시오.', answer: '종파, 진동수 변화, 음원·관측자 이동' },
        { id: 18, question: '전자기파의 스펙트럼과 특성을 설명하시오.', answer: '라디오파~감마선, c=fλ=3×10⁸m/s' },
        { id: 19, question: '빛의 이중성(파동성, 입자성)을 설명하시오.', answer: '간섭·회절(파동), 광전효과(입자)' },
        { id: 20, question: '맥스웰 방정식의 물리적 의미를 설명하시오.', answer: '전자기장 통합, 전자기파 예측' },
      ]
    },
    {
      title: '화학 - 물질구조/화학결합',
      questions: [
        { id: 21, question: '원자 구조(전자, 양성자, 중성자)와 원자번호, 질량수를 설명하시오.', answer: '원자번호=양성자수, 질량수=양성자+중성자' },
        { id: 22, question: '전자배치 규칙(쌓음원리, 훈트규칙, 파울리원리)을 설명하시오.', answer: '에너지 순서, 최대 스핀, 배타원리' },
        { id: 23, question: '주기율표의 주기성(원자반지름, 이온화에너지, 전기음성도)을 설명하시오.', answer: '주기/족에 따른 규칙적 변화' },
        { id: 24, question: '이온결합의 형성 원리와 특성을 설명하시오.', answer: '전자 이동, 정전기적 인력, 결정구조' },
        { id: 25, question: '공유결합의 형성 원리와 분자의 구조를 설명하시오.', answer: '전자 공유, VSEPR, 혼성오비탈' },
        { id: 26, question: '금속결합의 특성과 금속의 성질(전기전도성, 연성, 전성)을 설명하시오.', answer: '자유전자 바다 모델, 금속광택' },
        { id: 27, question: '분자간 힘(반데르발스, 수소결합, 쌍극자)을 비교 설명하시오.', answer: '분산력<쌍극자<수소결합, 끓는점 영향' },
        { id: 28, question: '산화수의 정의와 결정 규칙을 설명하시오.', answer: '전자 이동 정도, 산화환원 판단 기준' },
        { id: 29, question: '루이스 구조와 공명 구조를 설명하시오.', answer: '전자쌍 배치, 여러 구조의 평균' },
        { id: 30, question: '결정성 고체와 비결정성 고체의 차이를 설명하시오.', answer: '규칙적 배열 vs 불규칙, 녹는점 차이' },
      ]
    },
    {
      title: '화학 - 반응/유기화학',
      questions: [
        { id: 31, question: '화학반응속도와 영향 요인(농도, 온도, 촉매)을 설명하시오.', answer: '충돌이론, 활성화에너지, 아레니우스식' },
        { id: 32, question: '화학평형과 르샤틀리에 원리를 설명하시오.', answer: 'K=[생성물]/[반응물], 평형 이동' },
        { id: 33, question: '산과 염기의 정의(아레니우스, 브뢴스테드, 루이스)를 비교 설명하시오.', answer: 'H⁺ 주고받음, 전자쌍 주고받음' },
        { id: 34, question: 'pH와 pOH의 정의 및 완충용액의 원리를 설명하시오.', answer: 'pH=-log[H⁺], 약산+짝염기, 헨더슨 식' },
        { id: 35, question: '산화환원반응의 원리와 전지(갈바니, 전해)를 설명하시오.', answer: '전자이동, 자발적 반응, 비자발적 반응' },
        { id: 36, question: '탄화수소의 분류(알케인, 알켄, 알카인, 방향족)를 설명하시오.', answer: '단일/이중/삼중결합, 벤젠고리' },
        { id: 37, question: '작용기(알코올, 알데히드, 케톤, 카복실산)의 특성을 설명하시오.', answer: '-OH, -CHO, -CO-, -COOH 반응성' },
        { id: 38, question: '이성질체(구조, 기하, 광학)의 종류를 설명하시오.', answer: '같은 분자식, 다른 구조/배열' },
        { id: 39, question: '고분자의 합성방법(첨가중합, 축합중합)을 설명하시오.', answer: '폴리에틸렌(첨가), 나일론(축합)' },
        { id: 40, question: '열역학 함수(엔탈피, 엔트로피, 깁스자유에너지)를 설명하시오.', answer: 'ΔG=ΔH-TΔS, 자발성 판단' },
      ]
    },
    {
      title: '생물학/지구과학',
      questions: [
        { id: 41, question: '세포의 구조(원핵/진핵)와 세포소기관의 기능을 설명하시오.', answer: '핵, 미토콘드리아, 리보솜 등 역할' },
        { id: 42, question: 'DNA 복제와 전사, 번역 과정을 설명하시오.', answer: '반보존적 복제, mRNA, 코돈-아미노산' },
        { id: 43, question: '멘델의 유전법칙(우열, 분리, 독립)을 설명하시오.', answer: '우성/열성, 배우자 분리, 독립적 유전' },
        { id: 44, question: '생명공학 기술(PCR, 유전자재조합)의 원리를 설명하시오.', answer: 'DNA 증폭, 제한효소, 벡터' },
        { id: 45, question: '효소의 특성과 작용 메커니즘을 설명하시오.', answer: '기질특이성, 활성부위, 미카엘리스-멘텐' },
        { id: 46, question: '광합성과 세포호흡의 관계를 설명하시오.', answer: '포도당 합성 vs 분해, ATP 생산' },
        { id: 47, question: '판구조론과 대륙이동설을 설명하시오.', answer: '맨틀대류, 해양저확장, 변환단층' },
        { id: 48, question: '지구 대기의 구조(대류권, 성층권 등)와 특성을 설명하시오.', answer: '온도분포, 오존층, 기상현상' },
        { id: 49, question: '지구온난화와 온실효과의 메커니즘을 설명하시오.', answer: 'CO₂ 등 온실가스, 복사열 흡수' },
        { id: 50, question: '태양계의 구성과 행성의 특성을 설명하시오.', answer: '지구형/목성형 행성, 공전주기' },
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
            <span className="text-cyan-600 font-medium">자연과학개론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🔬</span>
              <div>
                <h1 className="text-2xl font-bold">자연과학개론</h1>
                <p className="text-cyan-100">1차 시험 | 물리·화학·생물·지구과학 택1</p>
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
                              setCurrentPrompt(`변리사 시험 자연과학개론 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 공식과 원리
3. 구체적 예시
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
          <h2 className="text-xl font-bold mb-4">💡 자연과학개론 학습 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">전공 선택</h3>
              <p className="text-sm text-cyan-100">본인 전공 분야 선택 권장</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">기초 개념</h3>
              <p className="text-sm text-cyan-100">기본 원리와 공식 확실히</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">특허 연계</h3>
              <p className="text-sm text-cyan-100">기술 분야별 특허 이해 도움</p>
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
