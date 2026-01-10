'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConventionBasicsStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: 'MICE 개념', count: 10 },
    { id: 1, name: '컨벤션 유형', count: 10 },
    { id: 2, name: '산업 구조', count: 10 },
    { id: 3, name: '국내외 현황', count: 10 },
    { id: 4, name: '관련 기관', count: 10 },
  ];

  const questions = [
    // MICE 개념 (10문항)
    { id: 1, topic: 0, question: "MICE의 'M'이 의미하는 것은?", options: ["Marketing", "Meeting", "Management", "Media"], answer: 1 },
    { id: 2, topic: 0, question: "MICE의 'I'가 의미하는 것은?", options: ["Industry", "Incentive", "Information", "Investment"], answer: 1 },
    { id: 3, topic: 0, question: "MICE의 'C'가 의미하는 것은?", options: ["Culture", "Convention", "Commerce", "Communication"], answer: 1 },
    { id: 4, topic: 0, question: "MICE의 'E'가 의미하는 것은?", options: ["Education", "Exhibition/Event", "Entertainment", "Economy"], answer: 1 },
    { id: 5, topic: 0, question: "MICE 산업의 특성이 아닌 것은?", options: ["고부가가치", "지역경제 파급효과", "낮은 고용 창출", "관련 산업 연계"], answer: 2 },
    { id: 6, topic: 0, question: "컨벤션의 정의로 가장 적절한 것은?", options: ["소규모 모임", "특정 목적의 대규모 회의", "개인 여행", "온라인 채팅"], answer: 1 },
    { id: 7, topic: 0, question: "인센티브 투어(Incentive Tour)의 주요 목적은?", options: ["학술 연구", "성과 보상 및 동기 부여", "제품 전시", "취미 활동"], answer: 1 },
    { id: 8, topic: 0, question: "MICE 산업이 관광 산업에 미치는 긍정적 영향은?", options: ["비수기 관광 수요 창출", "체류 기간 단축", "소비 감소", "관광객 수 감소"], answer: 0 },
    { id: 9, topic: 0, question: "MICE 참가자의 특성으로 옳은 것은?", options: ["낮은 소비력", "짧은 체류 기간", "높은 평균 소비액", "저렴한 숙박 선호"], answer: 2 },
    { id: 10, topic: 0, question: "MICE 산업의 경제적 효과가 아닌 것은?", options: ["고용 창출", "세수 증가", "물가 안정", "지역 경제 활성화"], answer: 2 },

    // 컨벤션 유형 (10문항)
    { id: 11, topic: 1, question: "정부 간 회의(IGO Meeting)의 예시는?", options: ["기업 세미나", "UN 총회", "학술대회", "동창회"], answer: 1 },
    { id: 12, topic: 1, question: "협회 회의(Association Meeting)의 특징은?", options: ["비정기 개최", "정기적 개최", "기업 주관", "소규모 인원"], answer: 1 },
    { id: 13, topic: 1, question: "기업 회의(Corporate Meeting)의 특징은?", options: ["공개 진행", "의사결정 신속", "외부인 참여 필수", "무료 참가"], answer: 1 },
    { id: 14, topic: 1, question: "세미나(Seminar)의 특징으로 옳은 것은?", options: ["대규모 참가", "교육 및 강의 중심", "전시 위주", "레크리에이션 활동"], answer: 1 },
    { id: 15, topic: 1, question: "워크숍(Workshop)의 주요 목적은?", options: ["의전 행사", "실습 및 기술 습득", "제품 홍보", "정책 발표"], answer: 1 },
    { id: 16, topic: 1, question: "포럼(Forum)의 특징은?", options: ["청중 참여 토론", "일방적 강의", "비공개 진행", "소규모 모임"], answer: 0 },
    { id: 17, topic: 1, question: "심포지엄(Symposium)의 특징은?", options: ["일반인 대상", "전문가 발표 및 토론", "스포츠 행사", "음악 공연"], answer: 1 },
    { id: 18, topic: 1, question: "전시회(Exhibition)의 목적이 아닌 것은?", options: ["제품 홍보", "비즈니스 상담", "스포츠 경기", "정보 교류"], answer: 2 },
    { id: 19, topic: 1, question: "B2B 전시회의 주요 참가 대상은?", options: ["일반 소비자", "기업 관계자", "학생", "어린이"], answer: 1 },
    { id: 20, topic: 1, question: "컨그레스(Congress)의 특징은?", options: ["소규모 회의", "대규모 국제회의", "기업 내부 회의", "비정기 개최"], answer: 1 },

    // 산업 구조 (10문항)
    { id: 21, topic: 2, question: "PCO의 정식 명칭은?", options: ["Personal Convention Organizer", "Professional Congress Organizer", "Public Convention Office", "Private Congress Office"], answer: 1 },
    { id: 22, topic: 2, question: "PCO의 주요 업무가 아닌 것은?", options: ["행사 기획", "참가자 관리", "항공기 운항", "예산 관리"], answer: 2 },
    { id: 23, topic: 2, question: "컨벤션뷰로(CVB)의 역할은?", options: ["회의 직접 개최", "개최지 마케팅 및 유치 지원", "숙박 시설 운영", "항공편 예약"], answer: 1 },
    { id: 24, topic: 2, question: "컨벤션센터의 주요 기능은?", options: ["숙박 제공", "회의 및 전시 공간 제공", "항공 운송", "관광 안내"], answer: 1 },
    { id: 25, topic: 2, question: "DMC(Destination Management Company)의 역할은?", options: ["현지 서비스 제공", "항공 운송", "보험 판매", "금융 서비스"], answer: 0 },
    { id: 26, topic: 2, question: "MICE 산업의 공급자가 아닌 것은?", options: ["컨벤션센터", "호텔", "일반 소비자", "케이터링 업체"], answer: 2 },
    { id: 27, topic: 2, question: "전시 서비스 업체의 역할은?", options: ["부스 설치 및 장치", "항공편 운항", "보험 판매", "의료 서비스"], answer: 0 },
    { id: 28, topic: 2, question: "MICE 산업 관련 인력이 아닌 것은?", options: ["기획자", "등록 담당자", "파일럿", "통역사"], answer: 2 },
    { id: 29, topic: 2, question: "컨벤션 호텔의 특징은?", options: ["숙박만 제공", "회의 시설 보유", "전시만 가능", "식음료 불가"], answer: 1 },
    { id: 30, topic: 2, question: "PEO(Professional Exhibition Organizer)의 역할은?", options: ["전시회 기획 및 운영", "숙박 서비스", "항공 운송", "보험 판매"], answer: 0 },

    // 국내외 현황 (10문항)
    { id: 31, topic: 3, question: "한국의 대표 컨벤션 도시가 아닌 것은?", options: ["서울", "부산", "제주", "춘천"], answer: 3 },
    { id: 32, topic: 3, question: "COEX의 위치는?", options: ["부산", "서울 삼성동", "제주", "대전"], answer: 1 },
    { id: 33, topic: 3, question: "BEXCO의 위치는?", options: ["서울", "부산", "인천", "광주"], answer: 1 },
    { id: 34, topic: 3, question: "세계 주요 컨벤션 도시가 아닌 것은?", options: ["싱가포르", "파리", "비엔나", "평양"], answer: 3 },
    { id: 35, topic: 3, question: "아시아 지역 MICE 산업 성장의 배경은?", options: ["경제 성장", "인구 감소", "관광 규제", "폐쇄 정책"], answer: 0 },
    { id: 36, topic: 3, question: "한국 MICE 산업의 강점이 아닌 것은?", options: ["IT 인프라", "안전한 치안", "비싼 물가", "교통 편의성"], answer: 2 },
    { id: 37, topic: 3, question: "국제회의 개최 건수 세계 1위 도시는?", options: ["뉴욕", "싱가포르", "도쿄", "서울"], answer: 1 },
    { id: 38, topic: 3, question: "MICE 산업의 최근 트렌드가 아닌 것은?", options: ["하이브리드 회의", "친환경 행사", "AI 기술 활용", "대면 회의만 고수"], answer: 3 },
    { id: 39, topic: 3, question: "COVID-19 이후 MICE 산업 변화는?", options: ["대면만 증가", "온라인·하이브리드 확대", "산업 완전 중단", "변화 없음"], answer: 1 },
    { id: 40, topic: 3, question: "한국 MICE 산업의 주무부처는?", options: ["기획재정부", "문화체육관광부", "국토교통부", "외교부"], answer: 1 },

    // 관련 기관 (10문항)
    { id: 41, topic: 4, question: "UIA의 정식 명칭은?", options: ["United International Association", "Union of International Associations", "Universal Industry Alliance", "United Industry Association"], answer: 1 },
    { id: 42, topic: 4, question: "ICCA의 역할은?", options: ["항공 운송", "국제회의 통계 및 정보 제공", "금융 서비스", "의료 지원"], answer: 1 },
    { id: 43, topic: 4, question: "한국관광공사의 MICE 관련 업무는?", options: ["출입국 심사", "국제회의 유치 지원", "비자 발급", "항공권 발권"], answer: 1 },
    { id: 44, topic: 4, question: "지역 컨벤션뷰로의 역할은?", options: ["국세 징수", "지역 국제회의 유치", "군사 업무", "의료 서비스"], answer: 1 },
    { id: 45, topic: 4, question: "UNWTO의 역할은?", options: ["군사 협력", "세계 관광 정책", "금융 규제", "환경 보호만"], answer: 1 },
    { id: 46, topic: 4, question: "MPI(Meeting Professionals International)의 역할은?", options: ["회의 전문가 네트워크", "항공 운송", "금융 서비스", "의료 지원"], answer: 0 },
    { id: 47, topic: 4, question: "한국 PCO 협회의 역할은?", options: ["PCO 업계 발전 및 네트워크", "정부 세금 징수", "군사 훈련", "의료 서비스"], answer: 0 },
    { id: 48, topic: 4, question: "한국전시산업진흥회의 역할은?", options: ["전시 산업 발전 지원", "항공 운송", "금융 규제", "의료 지원"], answer: 0 },
    { id: 49, topic: 4, question: "지방자치단체의 MICE 지원 역할은?", options: ["지역 행사 유치 및 지원", "군사 훈련", "국제 조약 체결", "금융 규제"], answer: 0 },
    { id: 50, topic: 4, question: "MICE 산업 관련 자격증 주관 기관은?", options: ["한국산업인력공단", "국방부", "외교부", "법원"], answer: 0 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-2-basics-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-2-basics-answers', JSON.stringify(newAnswers));
  };

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.answer).length;

  const openAIModal = (question: string) => { setCurrentQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-2" className="text-teal-600 hover:text-teal-800 font-medium">← 컨벤션기획사2급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 컨벤션 기초</h1>
          <p className="text-gray-500">MICE 산업 기초 이론 50문항</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full">
            <span className="text-teal-700 font-medium">진행률: {correctCount}/50</span>
            <div className="w-32 h-2 bg-teal-200 rounded-full"><div className="h-full bg-teal-600 rounded-full transition-all" style={{ width: `${(correctCount / 50) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === null ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50'}`}>전체 ({questions.length})</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === topic.id ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 hover:bg-teal-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">{topics[q.topic].name}</span>
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
                <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                  {showAnswer === q.id ? '해설 닫기' : '해설 보기'}
                </button>
                <button onClick={() => openAIModal(q.question)} className="text-cyan-600 hover:text-cyan-800 text-sm font-medium ml-4">AI에게 질문</button>
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-teal-50 rounded-xl">
                  <p className="text-teal-800"><strong>정답:</strong> {q.answer + 1}번 - {q.options[q.answer]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 text-sm mb-4 p-3 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 시험 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
