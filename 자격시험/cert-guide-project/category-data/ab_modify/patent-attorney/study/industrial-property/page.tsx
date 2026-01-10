'use client';

import { useState, useEffect } from 'react';

export default function IndustrialPropertyStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-industrial-property-completed');
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
    localStorage.setItem('patent-attorney-industrial-property-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '특허법 - 특허요건',
      questions: [
        { id: 1, question: '특허요건인 신규성의 판단기준과 신규성 상실 예외 규정을 설명하시오.', answer: '출원 전 공지되지 않은 발명, 12개월 내 자기공지 예외' },
        { id: 2, question: '진보성의 의의와 판단방법(주지관용기술, 상업적 성공 등 2차적 고려요소)을 설명하시오.', answer: '통상의 기술자가 용이하게 발명할 수 없는 것, TSM 테스트' },
        { id: 3, question: '산업상 이용가능성의 개념과 의료방법 발명의 특허성에 대해 설명하시오.', answer: '산업에 이용할 수 있는 발명, 인간 치료방법은 원칙적 불인정' },
        { id: 4, question: '특허법상 발명의 정의와 발명의 카테고리(물건, 방법, 제조방법)를 설명하시오.', answer: '자연법칙을 이용한 기술적 사상의 창작으로 고도한 것' },
        { id: 5, question: '확대된 선원주의(특허법 제29조 제3항)의 취지와 요건을 설명하시오.', answer: '선출원 명세서에 기재된 발명과 동일하면 특허 불가' },
        { id: 6, question: '불특허사유(특허법 제32조)의 유형과 구체적 사례를 설명하시오.', answer: '공공질서, 선량한 풍속 위반 발명' },
        { id: 7, question: '명세서 기재요건(실시가능요건, 뒷받침요건)과 위반 시 효과를 설명하시오.', answer: '통상의 기술자가 실시할 수 있도록 명확·상세히 기재' },
        { id: 8, question: '청구범위 기재요건과 다항제 청구범위의 작성방법을 설명하시오.', answer: '발명의 구성에 필수적인 사항, 독립항/종속항 구분' },
        { id: 9, question: '발명의 단일성 요건과 이를 위반한 경우의 처리방법을 설명하시오.', answer: '하나의 총괄적 발명 개념, 분할출원으로 해결' },
        { id: 10, question: '선원주의와 선발명주의의 차이 및 우리나라 특허법의 태도를 설명하시오.', answer: '먼저 출원한 자에게 권리 부여, 우리나라는 선원주의' },
      ]
    },
    {
      title: '특허법 - 출원·심사절차',
      questions: [
        { id: 11, question: '특허출원의 절차와 출원서류(명세서, 청구범위, 도면, 요약서)를 설명하시오.', answer: '출원서+명세서+청구범위+필요시 도면, 요약서' },
        { id: 12, question: '우선권제도(국내우선권, 파리조약 우선권)의 의의와 요건을 설명하시오.', answer: '선출원일 기준 신규성·진보성 판단, 12개월 내 주장' },
        { id: 13, question: '분할출원과 변경출원의 요건 및 효과를 비교 설명하시오.', answer: '분할: 2이상 발명 분리, 변경: 실용신안↔특허 전환' },
        { id: 14, question: '특허출원의 보정제도와 보정의 범위(신규사항 추가 금지)를 설명하시오.', answer: '최초 명세서 범위 내 보정, 신규사항 추가 불가' },
        { id: 15, question: '조약에 의한 우선권 주장의 요건과 효과를 설명하시오.', answer: '파리조약 12개월 내, 선출원일 기준 심사' },
        { id: 16, question: '심사청구제도와 심사전치제도를 설명하시오.', answer: '출원일로부터 3년 내 심사청구, 거절결정 후 재심사' },
        { id: 17, question: '특허출원의 공개제도와 조기공개신청에 대해 설명하시오.', answer: '출원 후 18개월 경과 시 공개, 조기공개 신청 가능' },
        { id: 18, question: '거절이유통지와 의견서·보정서 제출에 대해 설명하시오.', answer: '거절이유 통지 시 의견서로 반박, 보정서로 수정' },
        { id: 19, question: '특허결정과 특허료 납부, 특허등록의 효력발생시기를 설명하시오.', answer: '특허결정 후 3개월 내 등록료 납부, 설정등록일 발생' },
        { id: 20, question: 'PCT 국제출원제도의 절차와 국내단계 진입에 대해 설명하시오.', answer: '국제출원→국제조사→국내단계(31개월 내)' },
      ]
    },
    {
      title: '특허법 - 특허권의 효력',
      questions: [
        { id: 21, question: '특허권의 효력범위와 적극적·소극적 효력을 설명하시오.', answer: '업으로서 실시할 권리 독점, 타인의 실시 배제' },
        { id: 22, question: '특허발명의 실시 개념(생산, 사용, 양도, 대여, 수입, 청약)을 설명하시오.', answer: '물건: 생산·사용·양도 등, 방법: 사용' },
        { id: 23, question: '특허권의 효력이 미치지 않는 범위(시험연구, 소진 등)를 설명하시오.', answer: '연구·시험, 국내소진, 권리범위 밖' },
        { id: 24, question: '전용실시권과 통상실시권의 차이를 설명하시오.', answer: '전용: 독점적 배타권, 통상: 비독점적 실시권' },
        { id: 25, question: '법정실시권(선사용권, 중용권)의 의의와 요건을 설명하시오.', answer: '선사용권: 선의 실시자 보호, 중용권: 무효심결 확정 후' },
        { id: 26, question: '강제실시권(재정)의 의의와 재정사유를 설명하시오.', answer: '불실시, 공공이익, 불공정행위 시 정부 재정' },
        { id: 27, question: '특허권의 존속기간과 존속기간 연장제도를 설명하시오.', answer: '출원일로부터 20년, 의약품 등 5년 한도 연장' },
        { id: 28, question: '특허권의 이전과 실시권의 이전에 대해 설명하시오.', answer: '특허권 이전등록 효력요건, 전용실시권도 등록 필요' },
        { id: 29, question: '특허권의 공유와 공유자의 권리행사에 대해 설명하시오.', answer: '각 공유자 전부 실시 가능, 양도·실시권 설정은 동의 필요' },
        { id: 30, question: '특허권의 소멸사유(존속기간 만료, 포기, 무효 등)를 설명하시오.', answer: '기간만료, 등록료 불납, 포기, 무효심결 확정' },
      ]
    },
    {
      title: '상표법',
      questions: [
        { id: 31, question: '상표의 정의와 상표의 기능(출처표시, 품질보증, 광고선전)을 설명하시오.', answer: '자타상품 식별표지, 출처표시·품질보증·광고 기능' },
        { id: 32, question: '상표등록요건 중 식별력의 의의와 식별력 없는 상표의 유형을 설명하시오.', answer: '자타상품 구별 능력, 보통명칭·기술적 표장 등 불가' },
        { id: 33, question: '상표등록의 소극적 요건(등록거절이유)을 설명하시오.', answer: '공익적 거절이유(국기, 공서양속), 사익적 거절이유(선출원)' },
        { id: 34, question: '상표의 유사판단 기준(외관, 호칭, 관념)을 설명하시오.', answer: '외관·호칭·관념 중 하나라도 유사하면 유사상표' },
        { id: 35, question: '지정상품의 유사판단과 상품류 구분에 대해 설명하시오.', answer: '니스분류 45류, 생산·판매·수요자 기준 유사 판단' },
        { id: 36, question: '상표권의 효력과 권리범위(동일범위, 유사범위)를 설명하시오.', answer: '동일범위: 적극적 효력, 유사범위: 금지권' },
        { id: 37, question: '상표권 침해의 유형과 침해에 대한 구제수단을 설명하시오.', answer: '직접침해, 간접침해, 금지청구·손해배상·신용회복' },
        { id: 38, question: '상표권의 효력이 미치지 않는 범위(상표적 사용, 선사용권)를 설명하시오.', answer: '자기 성명, 기술적 사용, 선사용권자' },
        { id: 39, question: '상표권의 이전과 사용권(전용·통상사용권)에 대해 설명하시오.', answer: '상표권 자유이전, 사용권 설정 가능' },
        { id: 40, question: '마드리드 의정서에 의한 국제상표등록출원 절차를 설명하시오.', answer: '본국관청→WIPO→지정국, 기초출원 의존성' },
      ]
    },
    {
      title: '디자인보호법',
      questions: [
        { id: 41, question: '디자인의 정의와 성립요건(물품성, 형태성, 시각성, 심미성)을 설명하시오.', answer: '물품의 형상·모양·색채의 결합, 시각적 심미감' },
        { id: 42, question: '디자인등록요건(공업상 이용가능성, 신규성, 창작비용이성)을 설명하시오.', answer: '공업적 대량생산 가능, 공지되지 않은 창작적 디자인' },
        { id: 43, question: '부분디자인제도와 관련디자인제도를 설명하시오.', answer: '부분: 물품 일부, 관련: 유사디자인 일괄보호' },
        { id: 44, question: '디자인의 유사판단 기준과 요부 관찰방법을 설명하시오.', answer: '전체 관찰, 요부 비교, 일반 수요자 기준' },
        { id: 45, question: '디자인권의 효력과 권리범위에 대해 설명하시오.', answer: '등록디자인 및 유사디자인 실시 독점, 20년 존속' },
        { id: 46, question: '비밀디자인제도의 의의와 요건을 설명하시오.', answer: '설정등록일로부터 3년 내 공개 유예 가능' },
        { id: 47, question: '화상디자인의 보호범위와 등록요건을 설명하시오.', answer: 'GUI 디자인, 물품 화면에 표시되는 도형 등' },
        { id: 48, question: '글자체 디자인의 보호와 등록요건을 설명하시오.', answer: '기록·표시에 사용되는 한 벌의 글자꼴' },
        { id: 49, question: '디자인 무심사등록제도와 심사등록제도를 비교 설명하시오.', answer: '무심사: 신속등록 후 이의신청, 심사: 실체심사 후 등록' },
        { id: 50, question: '헤이그 협정에 의한 국제디자인등록출원에 대해 설명하시오.', answer: '하나의 출원으로 복수국 보호, WIPO 국제등록' },
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
            <span className="text-cyan-600 font-medium">산업재산권법</span>
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
                <h1 className="text-2xl font-bold">산업재산권법</h1>
                <p className="text-cyan-100">1차 시험 | 특허법·상표법·디자인보호법</p>
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
                              setCurrentPrompt(`변리사 시험 산업재산권법 문제입니다.

문제: ${q.question}

다음 순서로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 관련 조문과 판례
3. 구체적 사례 적용
4. 시험 출제 포인트
5. 연습문제 3개`);
                              setShowAIModal(true);
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
          <h2 className="text-xl font-bold mb-4">💡 산업재산권법 학습 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">특허법 중점</h3>
              <p className="text-sm text-cyan-100">전체 60% 이상 출제, 조문 암기 필수</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">판례 학습</h3>
              <p className="text-sm text-cyan-100">대법원 판례 중심으로 쟁점 정리</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">비교 학습</h3>
              <p className="text-sm text-cyan-100">특허/상표/디자인 유사제도 비교</p>
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
