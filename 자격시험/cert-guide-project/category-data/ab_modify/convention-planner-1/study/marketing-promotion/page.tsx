'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MarketingPromotionStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '마케팅 전략', count: 10 },
    { id: 1, name: '홍보·PR', count: 10 },
    { id: 2, name: '참가자 유치', count: 10 },
    { id: 3, name: '스폰서십', count: 10 },
    { id: 4, name: '디지털 마케팅', count: 10 },
  ];

  const questions = [
    // 마케팅 전략 (10문항)
    { id: 1, topic: 0, question: "컨벤션 마케팅 믹스(7P)에 해당하지 않는 것은?", options: ["Product(상품)", "Price(가격)", "Profit(이익)", "People(인력)"], answer: 2 },
    { id: 2, topic: 0, question: "컨벤션 마케팅의 STP 전략 중 'T'가 의미하는 것은?", options: ["Timing", "Targeting", "Training", "Testing"], answer: 1 },
    { id: 3, topic: 0, question: "컨벤션 시장 세분화 기준이 아닌 것은?", options: ["지리적 기준", "인구통계적 기준", "행동적 기준", "혈액형 기준"], answer: 3 },
    { id: 4, topic: 0, question: "컨벤션 포지셔닝 전략의 목적은?", options: ["비용 절감", "경쟁 우위 확보", "인원 감축", "시설 확대"], answer: 1 },
    { id: 5, topic: 0, question: "컨벤션 브랜딩의 요소가 아닌 것은?", options: ["로고", "슬로건", "경쟁사 비방", "아이덴티티"], answer: 2 },
    { id: 6, topic: 0, question: "컨벤션 마케팅 환경 분석 도구는?", options: ["SWOT 분석", "DNA 분석", "혈액 분석", "토양 분석"], answer: 0 },
    { id: 7, topic: 0, question: "컨벤션의 가격 전략 유형이 아닌 것은?", options: ["조기 등록 할인", "그룹 할인", "무조건 무료", "등급별 차등 가격"], answer: 2 },
    { id: 8, topic: 0, question: "컨벤션 마케팅 계획 수립 순서로 옳은 것은?", options: ["실행→분석→계획", "분석→계획→실행→평가", "평가→실행→분석", "계획→평가→분석"], answer: 1 },
    { id: 9, topic: 0, question: "컨벤션 경쟁 분석에서 파악해야 할 사항이 아닌 것은?", options: ["경쟁 행사 현황", "차별화 포인트", "경쟁사 직원 개인정보", "시장 점유율"], answer: 2 },
    { id: 10, topic: 0, question: "컨벤션 마케팅에서 USP가 의미하는 것은?", options: ["Universal Service Point", "Unique Selling Proposition", "User Service Program", "United Sales Plan"], answer: 1 },

    // 홍보·PR (10문항)
    { id: 11, topic: 1, question: "컨벤션 PR의 목적으로 옳지 않은 것은?", options: ["인지도 제고", "이미지 구축", "허위 정보 유포", "신뢰 확보"], answer: 2 },
    { id: 12, topic: 1, question: "컨벤션 보도자료(Press Release) 작성 원칙이 아닌 것은?", options: ["역피라미드 구조", "5W1H 원칙", "과장 표현 사용", "간결한 문장"], answer: 2 },
    { id: 13, topic: 1, question: "컨벤션 미디어 관계 관리 방법이 아닌 것은?", options: ["기자단 구성", "프레스 투어", "기자 매수", "정기 브리핑"], answer: 2 },
    { id: 14, topic: 1, question: "컨벤션 홍보 채널로 적합하지 않은 것은?", options: ["업계 전문지", "SNS", "불법 스팸", "공식 웹사이트"], answer: 2 },
    { id: 15, topic: 1, question: "컨벤션 브로슈어의 필수 내용이 아닌 것은?", options: ["행사 개요", "프로그램", "참가비", "경쟁사 비교"], answer: 3 },
    { id: 16, topic: 1, question: "컨벤션 홍보 영상의 효과가 아닌 것은?", options: ["시각적 전달", "정보 공유", "비용 증가만", "흥미 유발"], answer: 2 },
    { id: 17, topic: 1, question: "컨벤션 위기 커뮤니케이션 원칙은?", options: ["은폐", "신속·투명·진정성", "회피", "비난 전가"], answer: 1 },
    { id: 18, topic: 1, question: "컨벤션 사전 홍보 활동이 아닌 것은?", options: ["티저 캠페인", "카운트다운", "행사 후 보고서", "초청장 발송"], answer: 2 },
    { id: 19, topic: 1, question: "컨벤션 홍보 효과 측정 지표가 아닌 것은?", options: ["미디어 노출량", "웹사이트 트래픽", "SNS 반응", "직원 출근율"], answer: 3 },
    { id: 20, topic: 1, question: "컨벤션 PR과 광고의 차이점은?", options: ["PR은 유료, 광고는 무료", "PR은 간접적, 광고는 직접적", "차이 없음", "PR만 효과 있음"], answer: 1 },

    // 참가자 유치 (10문항)
    { id: 21, topic: 2, question: "컨벤션 참가자 유치 전략이 아닌 것은?", options: ["타겟 마케팅", "네트워킹 기회 제공", "강제 참가 명령", "콘텐츠 가치 강조"], answer: 2 },
    { id: 22, topic: 2, question: "컨벤션 등록 시스템의 기능이 아닌 것은?", options: ["온라인 등록", "결제 처리", "신원 조회", "참가자 관리"], answer: 2 },
    { id: 23, topic: 2, question: "조기 등록(Early Bird Registration)의 목적은?", options: ["비용 증가", "조기 참가자 확보", "행사 연기", "등록 복잡화"], answer: 1 },
    { id: 24, topic: 2, question: "컨벤션 참가자 세분화 기준이 아닌 것은?", options: ["참가 목적", "직위", "혈액형", "소속 기관"], answer: 2 },
    { id: 25, topic: 2, question: "B2B 컨벤션 참가자 유치 채널로 적합한 것은?", options: ["TV 광고", "업계 협회 네트워크", "어린이 잡지", "음악 방송"], answer: 1 },
    { id: 26, topic: 2, question: "참가자 유치를 위한 인센티브가 아닌 것은?", options: ["조기 등록 할인", "그룹 할인", "참가비 인상", "무료 워크숍"], answer: 2 },
    { id: 27, topic: 2, question: "참가자 데이터베이스 관리의 목적은?", options: ["데이터 삭제", "타겟 마케팅", "개인정보 유출", "시스템 오류"], answer: 1 },
    { id: 28, topic: 2, question: "국제 참가자 유치 시 고려사항이 아닌 것은?", options: ["비자 지원", "언어 서비스", "출입국 방해", "시차 고려"], answer: 2 },
    { id: 29, topic: 2, question: "참가자 만족도 조사의 목적은?", options: ["불만 무시", "개선점 파악", "참가비 인상", "행사 취소"], answer: 1 },
    { id: 30, topic: 2, question: "컨벤션 참가 결정 요인이 아닌 것은?", options: ["콘텐츠 품질", "네트워킹 기회", "개최지 날씨만", "비용 대비 가치"], answer: 2 },

    // 스폰서십 (10문항)
    { id: 31, topic: 3, question: "컨벤션 스폰서십의 정의로 옳은 것은?", options: ["무상 기부", "상호 이익을 위한 파트너십", "일방적 지원", "강제 후원"], answer: 1 },
    { id: 32, topic: 3, question: "스폰서십 패키지 구성 요소가 아닌 것은?", options: ["브랜드 노출", "네트워킹 기회", "경쟁사 홍보", "독점 혜택"], answer: 2 },
    { id: 33, topic: 3, question: "타이틀 스폰서(Title Sponsor)의 특징은?", options: ["소액 후원", "최고 등급 독점 후원", "익명 후원", "물품 후원만"], answer: 1 },
    { id: 34, topic: 3, question: "스폰서 유치 제안서의 필수 내용이 아닌 것은?", options: ["행사 개요", "후원 혜택", "기대 효과", "경쟁사 명단"], answer: 3 },
    { id: 35, topic: 3, question: "스폰서십 ROI 측정 방법이 아닌 것은?", options: ["미디어 노출 가치", "브랜드 인지도", "직감적 판단", "리드 생성 수"], answer: 2 },
    { id: 36, topic: 3, question: "현물 스폰서십(In-kind Sponsorship)의 예시는?", options: ["현금 지원", "제품·서비스 제공", "주식 투자", "부동산 기부"], answer: 1 },
    { id: 37, topic: 3, question: "스폰서 관계 관리의 핵심은?", options: ["일회성 관계", "지속적 커뮤니케이션", "후원 후 연락 두절", "강압적 요청"], answer: 1 },
    { id: 38, topic: 3, question: "스폰서 활성화(Activation)란?", options: ["스폰서 계약 해지", "후원 효과 극대화 활동", "스폰서 비공개", "후원금 반환"], answer: 1 },
    { id: 39, topic: 3, question: "스폰서 제안 시 강조해야 할 점이 아닌 것은?", options: ["타겟 오디언스", "브랜드 적합성", "경쟁사보다 저렴", "노출 기회"], answer: 2 },
    { id: 40, topic: 3, question: "스폰서십 등급 체계의 일반적 구성은?", options: ["등급 없음", "타이틀-골드-실버-브론즈", "무조건 동일", "랜덤 배정"], answer: 1 },

    // 디지털 마케팅 (10문항)
    { id: 41, topic: 4, question: "컨벤션 디지털 마케팅 채널이 아닌 것은?", options: ["이메일", "SNS", "전단지", "웹사이트"], answer: 2 },
    { id: 42, topic: 4, question: "컨벤션 SNS 마케팅의 장점이 아닌 것은?", options: ["실시간 소통", "비용 효율", "통제 어려움", "바이럴 효과"], answer: 2 },
    { id: 43, topic: 4, question: "컨벤션 이메일 마케팅의 핵심 지표는?", options: ["오픈율, 클릭률", "종이 사용량", "우편 배송 시간", "인쇄 품질"], answer: 0 },
    { id: 44, topic: 4, question: "컨벤션 웹사이트의 필수 기능이 아닌 것은?", options: ["행사 정보", "온라인 등록", "개인 블로그", "프로그램 안내"], answer: 2 },
    { id: 45, topic: 4, question: "SEO(검색엔진 최적화)의 목적은?", options: ["검색 순위 하락", "검색 노출 증가", "웹사이트 폐쇄", "비용 증가"], answer: 1 },
    { id: 46, topic: 4, question: "컨벤션 앱의 기능이 아닌 것은?", options: ["프로그램 안내", "네트워킹", "게임 다운로드", "실시간 알림"], answer: 2 },
    { id: 47, topic: 4, question: "콘텐츠 마케팅의 예시가 아닌 것은?", options: ["블로그 포스팅", "인포그래픽", "스팸 메일", "동영상 콘텐츠"], answer: 2 },
    { id: 48, topic: 4, question: "디지털 광고의 종류가 아닌 것은?", options: ["배너 광고", "검색 광고", "벽보 광고", "SNS 광고"], answer: 2 },
    { id: 49, topic: 4, question: "마케팅 자동화 도구의 기능이 아닌 것은?", options: ["이메일 자동 발송", "리드 관리", "수동 작업만", "성과 분석"], answer: 2 },
    { id: 50, topic: 4, question: "온라인 참가자 인게이지먼트 방법이 아닌 것은?", options: ["라이브 Q&A", "실시간 투표", "참가 방해", "채팅 기능"], answer: 2 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-1-marketing-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-1-marketing-answers', JSON.stringify(newAnswers));
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 마케팅·홍보</h1>
          <p className="text-gray-500">컨벤션 마케팅 전략 50문항</p>
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

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 text-sm mb-4 p-3 bg-gray-50 rounded-xl">{currentQuestion}</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
