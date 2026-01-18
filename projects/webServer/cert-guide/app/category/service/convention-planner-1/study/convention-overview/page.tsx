'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ConventionOverviewStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: 'MICE 산업 개념', count: 10 },
    { id: 1, name: '컨벤션 유형', count: 10 },
    { id: 2, name: '산업 현황', count: 10 },
    { id: 3, name: '컨벤션 시설', count: 10 },
    { id: 4, name: '정책·제도', count: 10 },
  ];

  const questions = [
    // MICE 산업 개념 (10문항)
    { id: 1, topic: 0, question: "MICE 산업의 구성요소가 아닌 것은?", options: ["Meeting(회의)", "Incentive(포상관광)", "Convention(컨벤션)", "Marketing(마케팅)"], answer: 3 },
    { id: 2, topic: 0, question: "컨벤션 산업의 특성으로 옳지 않은 것은?", options: ["고부가가치 산업", "지역경제 파급효과", "계절적 영향 없음", "관련 산업 연계 효과"], answer: 2 },
    { id: 3, topic: 0, question: "MICE 산업에서 'E'가 의미하는 것은?", options: ["Education", "Exhibition/Event", "Entertainment", "Economy"], answer: 1 },
    { id: 4, topic: 0, question: "컨벤션 산업이 관광 산업에 미치는 영향으로 옳은 것은?", options: ["비수기 관광 수요 감소", "체류 기간 단축", "평균 소비액 증가", "관광객 수 감소"], answer: 2 },
    { id: 5, topic: 0, question: "MICE 산업의 경제적 효과 중 직접효과에 해당하는 것은?", options: ["숙박업 매출", "교통업 고용 창출", "도시 이미지 개선", "지역 투자 유치"], answer: 0 },
    { id: 6, topic: 0, question: "컨벤션 산업의 사회·문화적 효과가 아닌 것은?", options: ["국제 교류 증진", "지역 홍보 효과", "물가 상승", "문화 다양성 증진"], answer: 2 },
    { id: 7, topic: 0, question: "다음 중 인센티브 투어의 특징은?", options: ["학술 발표 중심", "기업 성과 보상 목적", "전시 참관 목적", "정부 간 협상"], answer: 1 },
    { id: 8, topic: 0, question: "컨벤션의 정의로 가장 적절한 것은?", options: ["소규모 세미나", "특정 주제 대규모 회의", "제품 전시회", "스포츠 이벤트"], answer: 1 },
    { id: 9, topic: 0, question: "MICE 산업의 성장 배경이 아닌 것은?", options: ["글로벌화 진전", "정보통신 발달", "교통수단 발달", "인구 감소"], answer: 3 },
    { id: 10, topic: 0, question: "컨벤션 참가자의 평균 소비액이 일반 관광객보다 높은 이유는?", options: ["체류 기간이 짧아서", "비즈니스 목적이 포함되어", "단체 할인을 받아서", "자유시간이 많아서"], answer: 1 },

    // 컨벤션 유형 (10문항)
    { id: 11, topic: 1, question: "다음 중 정부 간 회의(IGO)에 해당하는 것은?", options: ["학술대회", "UN 총회", "기업 컨퍼런스", "무역 박람회"], answer: 1 },
    { id: 12, topic: 1, question: "학회·협회 회의(Association Meeting)의 특징은?", options: ["영리 목적", "정기적 개최", "비공개 진행", "소규모 인원"], answer: 1 },
    { id: 13, topic: 1, question: "기업 회의(Corporate Meeting)의 특징이 아닌 것은?", options: ["의사결정 신속", "참가자 통제 용이", "개최지 변경 빈번", "비용 기업 부담"], answer: 2 },
    { id: 14, topic: 1, question: "국제회의 분류 중 참가국 수에 따른 분류는?", options: ["양자회의-다자회의", "공개회의-비공개회의", "정기회의-비정기회의", "학술회의-비즈니스회의"], answer: 0 },
    { id: 15, topic: 1, question: "전시회(Exhibition)의 유형 중 B2B 전시회의 특징은?", options: ["일반인 대상", "기업 간 거래 목적", "입장료 무료", "오락 중심"], answer: 1 },
    { id: 16, topic: 1, question: "컨그레스(Congress)의 특징으로 옳은 것은?", options: ["소규모 회의", "비정기 개최", "대규모 국제회의", "기업 내부 회의"], answer: 2 },
    { id: 17, topic: 1, question: "심포지엄(Symposium)의 특징은?", options: ["특정 주제 전문가 발표·토론", "일반인 참여 중심", "제품 전시 목적", "레크리에이션 활동"], answer: 0 },
    { id: 18, topic: 1, question: "포럼(Forum)과 패널 토론의 차이점은?", options: ["참가자 수", "청중 참여 여부", "개최 장소", "회의 시간"], answer: 1 },
    { id: 19, topic: 1, question: "워크숍(Workshop)의 주요 목적은?", options: ["의전 행사", "실무 기술 습득", "제품 홍보", "정책 발표"], answer: 1 },
    { id: 20, topic: 1, question: "세미나(Seminar)의 특징으로 옳은 것은?", options: ["대규모 참가자", "강의식 교육", "전시 병행", "스포츠 활동"], answer: 1 },

    // 산업 현황 (10문항)
    { id: 21, topic: 2, question: "UIA(국제협회연합) 기준 국제회의의 요건이 아닌 것은?", options: ["참가자 300명 이상", "참가국 5개국 이상", "외국인 참가자 40% 이상", "개최 기간 1일 이상"], answer: 0 },
    { id: 22, topic: 2, question: "ICCA(국제회의협회)의 국제회의 인정 기준은?", options: ["50명 이상 정기 순회 개최", "100명 이상 단발성 개최", "500명 이상 국내 개최", "1000명 이상 국제 개최"], answer: 0 },
    { id: 23, topic: 2, question: "세계 주요 국제회의 개최도시가 아닌 것은?", options: ["싱가포르", "파리", "비엔나", "카이로"], answer: 3 },
    { id: 24, topic: 2, question: "한국의 대표 컨벤션 도시가 아닌 것은?", options: ["서울", "부산", "제주", "춘천"], answer: 3 },
    { id: 25, topic: 2, question: "국제회의 유치 경쟁이 심화되는 이유가 아닌 것은?", options: ["경제적 파급효과", "도시 이미지 제고", "인구 증가 목적", "관광 산업 활성화"], answer: 2 },
    { id: 26, topic: 2, question: "MICE 산업의 글로벌 트렌드가 아닌 것은?", options: ["하이브리드 회의 증가", "지속가능한 행사", "AI 기술 활용", "대면 회의만 선호"], answer: 3 },
    { id: 27, topic: 2, question: "아시아 지역 MICE 산업 성장의 배경은?", options: ["경제 성장", "인구 감소", "환경 규제", "비자 강화"], answer: 0 },
    { id: 28, topic: 2, question: "한국 MICE 산업의 강점이 아닌 것은?", options: ["IT 인프라", "안전한 치안", "저렴한 물가", "교통 편의성"], answer: 2 },
    { id: 29, topic: 2, question: "COVID-19 이후 MICE 산업 변화는?", options: ["대면 회의만 증가", "온라인·하이브리드 확대", "국제회의 완전 중단", "전시회 폐지"], answer: 1 },
    { id: 30, topic: 2, question: "MICE 산업의 ESG 트렌드와 관련 없는 것은?", options: ["친환경 행사", "사회적 가치 추구", "지배구조 투명성", "비용 절감 우선"], answer: 3 },

    // 컨벤션 시설 (10문항)
    { id: 31, topic: 3, question: "전문 컨벤션센터의 특징이 아닌 것은?", options: ["대규모 수용 가능", "다목적 공간", "객실 보유 필수", "최신 장비 구비"], answer: 2 },
    { id: 32, topic: 3, question: "호텔 컨벤션 시설의 장점은?", options: ["저렴한 대관료", "숙박·행사 연계", "대규모 전시 가능", "주차 공간 넓음"], answer: 1 },
    { id: 33, topic: 3, question: "컨벤션 시설 선정 시 고려사항이 아닌 것은?", options: ["접근성", "수용 인원", "주변 경관", "직원 출신 학교"], answer: 3 },
    { id: 34, topic: 3, question: "전시장의 면적 단위로 주로 사용되는 것은?", options: ["평", "제곱미터", "부스", "평방피트"], answer: 2 },
    { id: 35, topic: 3, question: "컨벤션 시설의 기술 인프라로 중요한 것은?", options: ["음향·영상 시스템", "조경 시설", "주방 시설", "숙박 시설"], answer: 0 },
    { id: 36, topic: 3, question: "유니크 베뉴(Unique Venue)의 예시가 아닌 것은?", options: ["박물관", "궁궐", "일반 회의실", "유적지"], answer: 2 },
    { id: 37, topic: 3, question: "컨벤션 시설의 부대시설이 아닌 것은?", options: ["비즈니스센터", "식음료 시설", "주차장", "아파트"], answer: 3 },
    { id: 38, topic: 3, question: "하이브리드 행사를 위한 시설 요건은?", options: ["대형 주차장", "고속 인터넷·스트리밍 장비", "수영장", "헬스장"], answer: 1 },
    { id: 39, topic: 3, question: "친환경 컨벤션 시설의 요건이 아닌 것은?", options: ["에너지 효율", "재활용 시스템", "친환경 인증", "화석연료 사용 증가"], answer: 3 },
    { id: 40, topic: 3, question: "컨벤션센터의 수익 구조에 해당하지 않는 것은?", options: ["대관료", "부대사업 수익", "정부 보조금", "참가자 월급"], answer: 3 },

    // 정책·제도 (10문항)
    { id: 41, topic: 4, question: "한국의 MICE 산업 주무부처는?", options: ["기획재정부", "문화체육관광부", "산업통상자원부", "외교부"], answer: 1 },
    { id: 42, topic: 4, question: "국제회의산업 육성에 관한 법률의 목적은?", options: ["회의 제한", "산업 육성 및 지원", "세금 부과", "입국 제한"], answer: 1 },
    { id: 43, topic: 4, question: "컨벤션뷰로(CVB)의 주요 역할이 아닌 것은?", options: ["국제회의 유치 지원", "개최지 마케팅", "세금 징수", "참가자 서비스"], answer: 2 },
    { id: 44, topic: 4, question: "국제회의 유치 지원 제도가 아닌 것은?", options: ["재정 지원", "홍보 지원", "형사 처벌", "행정 지원"], answer: 2 },
    { id: 45, topic: 4, question: "국제회의 전담조직의 기능이 아닌 것은?", options: ["유치 활동", "정보 제공", "인력 양성", "범죄 수사"], answer: 3 },
    { id: 46, topic: 4, question: "한국관광공사의 MICE 관련 업무는?", options: ["출입국 심사", "국제회의 유치 마케팅", "항공권 발권", "비자 발급"], answer: 1 },
    { id: 47, topic: 4, question: "지역 컨벤션뷰로의 역할은?", options: ["지역 국제회의 유치", "국세 징수", "군사 업무", "의료 서비스"], answer: 0 },
    { id: 48, topic: 4, question: "MICE 산업 인력 양성 정책이 아닌 것은?", options: ["전문 교육과정", "자격증 제도", "인턴십 프로그램", "의무 징집"], answer: 3 },
    { id: 49, topic: 4, question: "국제회의 복합지구 지정의 목적은?", options: ["주거 개발", "MICE 인프라 집중 육성", "군사 시설 설치", "농업 진흥"], answer: 1 },
    { id: 50, topic: 4, question: "MICE 산업 진흥을 위한 정부 지원이 아닌 것은?", options: ["행사 개최비 지원", "시설 건립 지원", "인력 양성 지원", "산업 축소 정책"], answer: 3 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-1-overview-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-1-overview-answers', JSON.stringify(newAnswers));
  };

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.answer).length;

  const openAIModal = (question: string) => { setCurrentQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-1" className="text-purple-600 hover:text-purple-800 font-medium">← 컨벤션기획사1급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🌐 컨벤션 개론</h1>
          <p className="text-gray-500">MICE 산업 기초 이론 50문항</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
            <span className="text-purple-700 font-medium">진행률: {correctCount}/50</span>
            <div className="w-32 h-2 bg-purple-200 rounded-full"><div className="h-full bg-purple-600 rounded-full transition-all" style={{ width: `${(correctCount / 50) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === null ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>전체 ({questions.length})</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === topic.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{topics[q.topic].name}</span>
                <span className="text-gray-400 text-sm">#{q.id}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">{q.question}</h3>
              <div className="grid gap-2">
                {q.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(q.id, index)} className={`p-3 rounded-xl text-left transition ${userAnswers[q.id] === index ? index === q.answer ? 'bg-green-100 border-2 border-green-500 text-green-700' : 'bg-red-100 border-2 border-red-500 text-red-700' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}>
                    <span className="font-medium mr-2">{index + 1}.</span>{option}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                  {showAnswer === q.id ? '해설 닫기' : '해설 보기'}
                </button>
                <button onClick={() => openAIModal(q.question)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium ml-4">AI에게 질문</button>
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-purple-800"><strong>정답:</strong> {q.answer + 1}번 - {q.options[q.answer]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 text-sm mb-4 p-3 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
