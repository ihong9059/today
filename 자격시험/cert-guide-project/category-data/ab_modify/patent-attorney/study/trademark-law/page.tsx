'use client';

import { useState, useEffect } from 'react';

export default function TrademarkLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-trademark-law-completed');
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
    localStorage.setItem('patent-attorney-trademark-law-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '상표의 개념과 등록요건',
      questions: [
        { id: 1, question: '상표의 정의와 상표의 기능(출처표시, 품질보증, 광고선전)을 설명하시오.', answer: '자타상품 식별표지, 출처·품질·광고 기능' },
        { id: 2, question: '상표의 유형(문자, 도형, 기호, 입체, 색채, 소리, 냄새 등)을 설명하시오.', answer: '전통적 상표, 비전통적 상표(동작, 홀로그램 등)' },
        { id: 3, question: '상표법상 식별력의 의의와 식별력 판단기준을 논하시오.', answer: '자타상품 구별 능력, 일반소비자 기준' },
        { id: 4, question: '식별력 없는 상표의 유형(제33조 제1항 각호)을 구체적으로 설명하시오.', answer: '보통명칭, 관용상표, 기술적 표장, 간단표장 등' },
        { id: 5, question: '사용에 의한 식별력 취득(제33조 제2항)의 요건과 판단기준을 설명하시오.', answer: '상표 사용, 수요자 인식, 자타상품 식별' },
        { id: 6, question: '상표등록의 소극적 요건(공익적 거절이유)을 설명하시오.', answer: '국기, 공서양속 위반, 품질오인, 원산지 허위' },
        { id: 7, question: '선출원주의와 상표의 선등록 요건을 설명하시오.', answer: '동일/유사상표 선출원, 선등록 상표 확인' },
        { id: 8, question: '저명상표 보호규정(제34조 제1항 제9호, 제11호)의 요건을 설명하시오.', answer: '국내 또는 외국 주지·저명 상표 보호' },
        { id: 9, question: '선사용상표 보호규정과 부정목적 출원의 판단기준을 설명하시오.', answer: '부정경쟁 목적, 모방 의도 판단' },
        { id: 10, question: '상표등록출원의 절차와 심사제도를 설명하시오.', answer: '출원서+상표견본, 심사청구 불필요' },
      ]
    },
    {
      title: '상표의 유사판단',
      questions: [
        { id: 11, question: '상표 유사판단의 기준(외관, 호칭, 관념)과 전체관찰·요부관찰을 설명하시오.', answer: '3요소 중 하나 유사시 유사, 요부 중점 비교' },
        { id: 12, question: '결합상표의 유사판단과 분리관찰의 허용기준을 논하시오.', answer: '결합으로 일체성 있으면 분리 불가' },
        { id: 13, question: '상품 유사판단 기준과 유사군 코드제도를 설명하시오.', answer: '생산·판매·수요자 기준, 니스분류' },
        { id: 14, question: '동음이의어 상표와 외국어 상표의 유사판단을 설명하시오.', answer: '발음 동일하나 의미 다른 경우 판단' },
        { id: 15, question: '색채상표, 입체상표의 유사판단 특수성을 설명하시오.', answer: '색채 조합, 입체적 형상의 유사성' },
        { id: 16, question: '상표의 동일 범위와 유사 범위의 구별기준을 설명하시오.', answer: '동일: 적극적 효력, 유사: 금지권' },
        { id: 17, question: '지정상품의 확대해석과 상표권 효력범위를 논하시오.', answer: '지정상품 한정, 유사상품 확장 문제' },
        { id: 18, question: '상표 유사판단에서 거래실정의 고려방법을 설명하시오.', answer: '실제 거래계 혼동가능성 중심' },
        { id: 19, question: '연상혼동과 광의의 혼동이론을 설명하시오.', answer: '동일출처 혼동, 관련기업 혼동' },
        { id: 20, question: '상표 유사판단에 관한 주요 대법원 판례를 설명하시오.', answer: '수요자 표준, 요부관찰 기준' },
      ]
    },
    {
      title: '상표권의 효력',
      questions: [
        { id: 21, question: '상표권의 효력범위(적극적 효력, 소극적 효력)를 설명하시오.', answer: '등록상표 독점사용, 유사범위 금지' },
        { id: 22, question: '상표권의 효력이 미치지 않는 범위(제90조)를 설명하시오.', answer: '자기 성명, 기술적 표시, 선사용권' },
        { id: 23, question: '상표의 기술적 사용과 상표적 사용의 구별기준을 논하시오.', answer: '출처표시 기능 수행 여부' },
        { id: 24, question: '선사용권(제57조의3)의 성립요건과 효과를 설명하시오.', answer: '부정경쟁 아닌 선사용, 계속사용권' },
        { id: 25, question: '상표권의 이전과 분할이전의 제한을 설명하시오.', answer: '자유이전, 유사상품 분할이전 제한' },
        { id: 26, question: '전용사용권과 통상사용권의 설정 및 효력을 설명하시오.', answer: '전용: 독점적 배타권, 통상: 비독점' },
        { id: 27, question: '상표권의 존속기간과 갱신등록제도를 설명하시오.', answer: '10년, 갱신으로 반영구적 존속' },
        { id: 28, question: '상표권의 소멸사유와 불사용취소심판을 설명하시오.', answer: '3년 불사용시 취소심판 청구 가능' },
        { id: 29, question: '상표권의 공유와 공유자의 권리행사를 설명하시오.', answer: '각 공유자 전부 사용, 양도는 동의 필요' },
        { id: 30, question: '상표권의 포기와 그 효과를 설명하시오.', answer: '장래적 소멸, 이해관계인 동의' },
      ]
    },
    {
      title: '상표침해와 구제',
      questions: [
        { id: 31, question: '상표침해의 유형(직접침해, 간접침해)을 설명하시오.', answer: '동일/유사상표 사용, 예비적 침해행위' },
        { id: 32, question: '상표 침해의 판단기준(혼동가능성)을 논하시오.', answer: '일반 수요자 기준 출처혼동 여부' },
        { id: 33, question: '희석화(Dilution) 이론의 의의와 적용요건을 설명하시오.', answer: '저명상표의 식별력/명성 훼손' },
        { id: 34, question: '침해금지청구권의 요건과 효과를 설명하시오.', answer: '침해+침해 우려, 침해중지+예방' },
        { id: 35, question: '손해배상청구권의 요건과 손해액 추정규정을 설명하시오.', answer: '고의/과실, 침해자이익, 사용료상당액' },
        { id: 36, question: '신용회복조치청구권의 요건과 효과를 설명하시오.', answer: '업무상 신용 훼손, 정정광고 등' },
        { id: 37, question: '권리남용 항변과 무효사유의 항변을 설명하시오.', answer: '무효사유 명백시 권리행사 제한' },
        { id: 38, question: '상표침해죄의 구성요건과 양벌규정을 설명하시오.', answer: '고의 침해, 법인+행위자 처벌' },
        { id: 39, question: '가처분과 상표침해소송의 관계를 설명하시오.', answer: '긴급성, 보전의 필요성' },
        { id: 40, question: '상표침해에 관한 주요 대법원 판례를 설명하시오.', answer: '혼동가능성 판단 기준' },
      ]
    },
    {
      title: '국제출원/부정경쟁방지법',
      questions: [
        { id: 41, question: '마드리드 의정서에 의한 국제상표등록출원 절차를 설명하시오.', answer: '본국관청→WIPO→지정국, 기초출원 의존성' },
        { id: 42, question: '국제상표등록의 효과와 사후지정제도를 설명하시오.', answer: '지정국 국내등록 효과, 보호범위 확장' },
        { id: 43, question: '본국등록 의존성(Central Attack)과 그 효과를 설명하시오.', answer: '5년내 기초출원 소멸시 국제등록 취소' },
        { id: 44, question: '부정경쟁방지법상 부정경쟁행위의 유형을 설명하시오.', answer: '혼동야기, 저명표지 희석, 원산지허위' },
        { id: 45, question: '주지상표 보호(부경법 제2조 제1호 가목)의 요건을 설명하시오.', answer: '국내 주지성, 혼동가능성' },
        { id: 46, question: '저명상표 희석행위(부경법 제2조 제1호 다목)의 요건을 설명하시오.', answer: '국내 저명, 식별력/명성 손상' },
        { id: 47, question: '상표법과 부정경쟁방지법의 관계를 논하시오.', answer: '등록주의 vs 사실주의, 보완관계' },
        { id: 48, question: '영업비밀 보호(부경법)의 요건을 설명하시오.', answer: '비공지성, 경제적 유용성, 비밀관리' },
        { id: 49, question: '데이터 보호에 관한 부정경쟁방지법 규정을 설명하시오.', answer: '데이터 부정취득·사용 금지' },
        { id: 50, question: '부정경쟁행위에 관한 주요 판례를 설명하시오.', answer: '주지성 판단, 혼동가능성 기준' },
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
            <span className="text-teal-600 font-medium">상표법 (2차)</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">™️</span>
              <div>
                <h1 className="text-2xl font-bold">상표법 (2차 논술)</h1>
                <p className="text-teal-100">2차 시험 | 100점 | 120분</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-teal-100 text-sm">학습 진도</p>
              <p className="text-3xl font-bold">{progressPercent}%</p>
              <p className="text-teal-200 text-sm">{completedQuestions.length}/{totalQuestions} 완료</p>
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 transition"
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
                    <span className="text-teal-600 font-medium">
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
                          ? 'bg-teal-50 border-teal-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(q.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300 hover:border-teal-500'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-teal-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded">
                            💡 {q.answer}
                          </p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`변리사 2차 시험 상표법 논술 문제입니다.

문제: ${q.question}

다음 형식으로 논술 답안을 작성해주세요:
1. 쟁점 정리
2. 관련 조문
3. 학설 및 판례
4. 사안의 적용
5. 결론`);
                              setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
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
        <section className="mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">💡 상표법 논술 작성 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">유사판단 숙달</h3>
              <p className="text-sm text-teal-100">외관·호칭·관념 3요소 분석</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">부경법 연계</h3>
              <p className="text-sm text-teal-100">상표법+부정경쟁방지법 비교</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">사례 분석</h3>
              <p className="text-sm text-teal-100">실제 상표 분쟁 사례 학습</p>
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
