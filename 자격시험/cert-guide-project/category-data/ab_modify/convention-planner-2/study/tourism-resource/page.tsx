'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TourismResourcePage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const topics = [
    { id: 0, name: '관광 자원 개념', count: 10 },
    { id: 1, name: '문화 관광 자원', count: 10 },
    { id: 2, name: '자연 관광 자원', count: 10 },
    { id: 3, name: '관광 개발', count: 10 },
    { id: 4, name: '관광 정책', count: 10 },
  ];

  const questions = [
    // 관광 자원 개념 (10문항)
    { id: 1, topic: 0, question: "관광자원의 정의로 가장 적절한 것은?", options: ["관광 욕구를 충족시킬 수 있는 유·무형의 자원", "관광객에게 제공되는 숙박 시설", "여행사가 판매하는 상품", "교통수단과 이동 경로"], answer: 0 },
    { id: 2, topic: 0, question: "관광자원의 분류 중 유형자원에 해당하지 않는 것은?", options: ["자연자원", "문화자원", "축제·이벤트", "시설자원"], answer: 2 },
    { id: 3, topic: 0, question: "관광자원의 특성 중 '비이동성'이 의미하는 것은?", options: ["관광객이 자원이 있는 곳으로 이동해야 함", "자원이 계속 변화함", "자원의 가치가 고정됨", "자원이 무한함"], answer: 0 },
    { id: 4, topic: 0, question: "관광자원의 가치 평가 기준이 아닌 것은?", options: ["희소성", "매력성", "접근성", "생산성"], answer: 3 },
    { id: 5, topic: 0, question: "관광자원의 개발 원칙 중 '지속가능성'이 강조하는 것은?", options: ["미래 세대를 위한 자원 보전", "대규모 시설 확충", "관광객 수 극대화", "단기 수익 창출"], answer: 0 },
    { id: 6, topic: 0, question: "무형 관광자원에 해당하는 것은?", options: ["국립공원", "전통 공연", "박물관", "리조트"], answer: 1 },
    { id: 7, topic: 0, question: "관광자원의 수명주기 단계 순서가 올바른 것은?", options: ["도입→성장→성숙→쇠퇴", "성장→도입→성숙→쇠퇴", "도입→성숙→성장→쇠퇴", "성숙→도입→성장→쇠퇴"], answer: 0 },
    { id: 8, topic: 0, question: "관광자원 해설의 목적이 아닌 것은?", options: ["이해 증진", "보전 의식 고취", "체류시간 연장", "입장료 인상"], answer: 3 },
    { id: 9, topic: 0, question: "1차적 관광자원에 해당하는 것은?", options: ["호텔", "자연경관", "테마파크", "컨벤션센터"], answer: 1 },
    { id: 10, topic: 0, question: "관광자원 매력도에 영향을 미치는 요소가 아닌 것은?", options: ["독특성", "계절성", "정치적 상황", "자원의 나이"], answer: 3 },

    // 문화 관광 자원 (10문항)
    { id: 11, topic: 1, question: "유네스코 세계문화유산에 등재된 한국의 문화재가 아닌 것은?", options: ["수원화성", "불국사", "해인사 장경판전", "경복궁"], answer: 3 },
    { id: 12, topic: 1, question: "문화관광의 특성으로 옳지 않은 것은?", options: ["교육적 가치", "지역문화 체험", "저비용 대중관광", "심층적 경험 추구"], answer: 2 },
    { id: 13, topic: 1, question: "한국의 무형문화재에 해당하는 것은?", options: ["석굴암", "판소리", "경주 첨성대", "창덕궁"], answer: 1 },
    { id: 14, topic: 1, question: "문화관광 상품 개발 시 고려해야 할 사항이 아닌 것은?", options: ["지역 정체성 반영", "스토리텔링 적용", "대량 복제 생산", "체험 요소 강화"], answer: 2 },
    { id: 15, topic: 1, question: "한류 관광의 주요 콘텐츠가 아닌 것은?", options: ["K-POP", "한식", "K-드라마", "서양 클래식"], answer: 3 },
    { id: 16, topic: 1, question: "지역 축제의 관광 효과가 아닌 것은?", options: ["지역 경제 활성화", "지역 이미지 제고", "인구 감소 억제", "문화 전승"], answer: 2 },
    { id: 17, topic: 1, question: "민속촌의 주요 기능이 아닌 것은?", options: ["전통문화 보존", "관광 교육", "첨단 산업 육성", "체험 관광 제공"], answer: 2 },
    { id: 18, topic: 1, question: "역사문화 관광지 해설의 원칙이 아닌 것은?", options: ["정확성", "흥미 유발", "과장된 표현", "이해 용이성"], answer: 2 },
    { id: 19, topic: 1, question: "박물관 관광의 교육적 기능으로 옳은 것은?", options: ["수익 극대화", "역사 인식 제고", "관광객 수 증가", "시설 확장"], answer: 1 },
    { id: 20, topic: 1, question: "전통시장이 관광자원으로 주목받는 이유는?", options: ["현대적 시설", "생활문화 체험", "저렴한 물가", "주차 편의성"], answer: 1 },

    // 자연 관광 자원 (10문항)
    { id: 21, topic: 2, question: "한국의 국립공원 중 해상·해안형이 아닌 것은?", options: ["한려해상", "다도해해상", "태안해안", "설악산"], answer: 3 },
    { id: 22, topic: 2, question: "생태관광의 핵심 원칙이 아닌 것은?", options: ["환경 보전", "지역사회 참여", "대규모 개발", "교육적 가치"], answer: 2 },
    { id: 23, topic: 2, question: "람사르 습지에 등록된 한국의 습지가 아닌 것은?", options: ["우포늪", "순천만", "낙동강 하구", "한강 잠실"], answer: 3 },
    { id: 24, topic: 2, question: "자연관광 자원의 계절성을 극복하기 위한 방안이 아닌 것은?", options: ["사계절 프로그램 개발", "실내 체험시설 확충", "성수기 집중 운영", "다양한 테마 개발"], answer: 2 },
    { id: 25, topic: 2, question: "지오파크(Geopark)의 목적이 아닌 것은?", options: ["지질유산 보전", "지속가능한 개발", "교육과 관광", "광물 채굴 촉진"], answer: 3 },
    { id: 26, topic: 2, question: "해양관광 자원에 해당하지 않는 것은?", options: ["해수욕장", "갯벌 체험", "스키 리조트", "해양 스포츠"], answer: 2 },
    { id: 27, topic: 2, question: "산림관광의 효과가 아닌 것은?", options: ["피톤치드 효과", "심리적 안정", "도시 개발 촉진", "건강 증진"], answer: 2 },
    { id: 28, topic: 2, question: "자연환경 보전과 관광 개발의 균형을 위한 개념은?", options: ["대량 관광", "지속가능한 관광", "럭셔리 관광", "패키지 관광"], answer: 1 },
    { id: 29, topic: 2, question: "캠핑 관광의 증가 요인이 아닌 것은?", options: ["자연 친화 트렌드", "캠핑 장비 발전", "코로나19 영향", "호텔 숙박 가격 하락"], answer: 3 },
    { id: 30, topic: 2, question: "동굴 관광자원 개발 시 고려사항이 아닌 것은?", options: ["환기 시설", "조명 설계", "대규모 확장 공사", "안전시설"], answer: 2 },

    // 관광 개발 (10문항)
    { id: 31, topic: 3, question: "관광개발 계획의 수립 순서가 올바른 것은?", options: ["기초조사→계획수립→실행→평가", "계획수립→기초조사→실행→평가", "실행→계획수립→기초조사→평가", "평가→계획수립→기초조사→실행"], answer: 0 },
    { id: 32, topic: 3, question: "관광특구 지정의 효과가 아닌 것은?", options: ["외국인 관광객 유치", "세제 혜택", "관광 인프라 투자", "개발 규제 강화"], answer: 3 },
    { id: 33, topic: 3, question: "관광개발의 부정적 영향이 아닌 것은?", options: ["환경 파괴", "물가 상승", "지역 경제 활성화", "교통 혼잡"], answer: 2 },
    { id: 34, topic: 3, question: "관광지 수용력(Carrying Capacity)이 의미하는 것은?", options: ["관광지가 수용할 수 있는 최적의 관광객 수", "관광지의 면적", "관광지의 수익", "관광지의 시설 수"], answer: 0 },
    { id: 35, topic: 3, question: "지역주민 참여형 관광개발의 장점이 아닌 것은?", options: ["갈등 감소", "수익 공유", "개발 속도 지연", "지역 정체성 보존"], answer: 2 },
    { id: 36, topic: 3, question: "관광단지 개발 시 고려해야 할 입지 조건이 아닌 것은?", options: ["접근성", "자연환경", "개발 비용", "인구 밀집도"], answer: 3 },
    { id: 37, topic: 3, question: "관광개발 사업의 타당성 분석 항목이 아닌 것은?", options: ["경제성 분석", "기술적 타당성", "환경영향 평가", "종교적 적합성"], answer: 3 },
    { id: 38, topic: 3, question: "스마트 관광(Smart Tourism)의 특징이 아닌 것은?", options: ["ICT 기술 활용", "개인화 서비스", "데이터 기반 운영", "오프라인 중심"], answer: 3 },
    { id: 39, topic: 3, question: "관광 인프라에 해당하지 않는 것은?", options: ["도로", "항만", "관광객 개인 차량", "공항"], answer: 2 },
    { id: 40, topic: 3, question: "관광개발과 환경보전의 조화를 위한 제도는?", options: ["환경영향평가", "세금 감면", "규제 완화", "민영화"], answer: 0 },

    // 관광 정책 (10문항)
    { id: 41, topic: 4, question: "한국의 관광 진흥을 담당하는 공공기관은?", options: ["한국관광공사", "한국무역협회", "한국산업은행", "한국전력공사"], answer: 0 },
    { id: 42, topic: 4, question: "관광진흥법의 목적이 아닌 것은?", options: ["관광 진흥", "국민복지 증진", "국제친선 도모", "제조업 육성"], answer: 3 },
    { id: 43, topic: 4, question: "정부의 관광정책 수단에 해당하지 않는 것은?", options: ["세제 지원", "규제 완화", "홍보 마케팅", "개인 여행 통제"], answer: 3 },
    { id: 44, topic: 4, question: "인바운드 관광이 의미하는 것은?", options: ["외국인의 국내 관광", "국민의 국내 관광", "국민의 해외 관광", "국경간 무역"], answer: 0 },
    { id: 45, topic: 4, question: "관광수지가 흑자라는 것은?", options: ["인바운드 수입 > 아웃바운드 지출", "인바운드 수입 < 아웃바운드 지출", "관광객 수 증가", "관광지 개발 증가"], answer: 0 },
    { id: 46, topic: 4, question: "관광 관련 국제기구가 아닌 것은?", options: ["UNWTO", "WTTC", "PATA", "IMF"], answer: 3 },
    { id: 47, topic: 4, question: "한국 관광 브랜드 슬로건으로 사용된 것은?", options: ["Imagine Your Korea", "Made in Korea", "Korea First", "Visit Asia"], answer: 0 },
    { id: 48, topic: 4, question: "관광산업의 경제적 효과가 아닌 것은?", options: ["고용 창출", "외화 획득", "세수 증대", "물가 안정"], answer: 3 },
    { id: 49, topic: 4, question: "지역관광 활성화 정책에 해당하지 않는 것은?", options: ["관광특구 지정", "지역축제 지원", "수도권 집중 개발", "관광 인프라 확충"], answer: 2 },
    { id: 50, topic: 4, question: "관광정책의 목표가 아닌 것은?", options: ["관광산업 육성", "국민 관광복지", "지역균형발전", "특정 업체 독점 지원"], answer: 3 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention2-tourism-resource-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCorrectCount(data.correct || 0);
      setWrongCount(data.wrong || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('convention2-tourism-resource-progress', JSON.stringify({
      correct: correctCount,
      wrong: wrongCount
    }));
  }, [correctCount, wrongCount]);

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const handleAnswer = (questionId: number, selectedOption: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      if (selectedOption === question.answer) {
        setCorrectCount(prev => prev + 1);
      } else {
        setWrongCount(prev => prev + 1);
      }
      setShowAnswer(questionId);
    }
  };

  const openAIModal = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setWrongCount(0);
    setShowAnswer(null);
    localStorage.removeItem('convention2-tourism-resource-progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-2" className="text-teal-600 hover:text-teal-800 font-medium">
            ← 컨벤션기획사2급
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏛️ 관광자원론</h1>
          <p className="text-gray-500">관광 자원의 이해와 개발</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-gray-400 hover:text-red-500">초기화</button>
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{correctCount}</p>
              <p className="text-sm text-gray-500">정답</p>
            </div>
            <div className="flex-1 bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{wrongCount}</p>
              <p className="text-sm text-gray-500">오답</p>
            </div>
            <div className="flex-1 bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">{correctCount + wrongCount}/{questions.length}</p>
              <p className="text-sm text-gray-500">진행률</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all"
              style={{ width: `${((correctCount + wrongCount) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">토픽 선택</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                selectedTopic === null ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  selectedTopic === topic.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, index) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                    {topics.find(t => t.id === q.topic)?.name}
                  </span>
                  <span className="text-gray-400 text-sm">#{q.id}</span>
                </div>
                <button
                  onClick={() => openAIModal(q.question)}
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  🤖 AI에게 질문
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => handleAnswer(q.id, optIndex)}
                    disabled={showAnswer === q.id}
                    className={`p-3 rounded-xl text-left transition ${
                      showAnswer === q.id
                        ? optIndex === q.answer
                          ? 'bg-green-100 text-green-800 border-2 border-green-500'
                          : 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50 hover:bg-teal-50 text-gray-700'
                    }`}
                  >
                    <span className="font-medium mr-2">{optIndex + 1}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-800 font-medium">
                    ✅ 정답: {q.answer + 1}. {q.options[q.answer]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-purple-600 text-white rounded-xl text-center font-medium hover:bg-purple-700 transition"
              >
                Claude에게 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-600 text-white rounded-xl text-center font-medium hover:bg-green-700 transition"
              >
                ChatGPT에게 질문하기
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(currentQuestion + " 에 대해 자세히 설명해주세요.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium hover:bg-blue-700 transition"
              >
                Gemini에게 질문하기
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full py-3 px-4 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
