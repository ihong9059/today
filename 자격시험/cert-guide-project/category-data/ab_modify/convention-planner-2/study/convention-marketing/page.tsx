'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConventionMarketingStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '마케팅 기초', count: 10 },
    { id: 1, name: '홍보 전략', count: 10 },
    { id: 2, name: '참가자 유치', count: 10 },
    { id: 3, name: '고객 관리', count: 10 },
    { id: 4, name: '디지털 마케팅', count: 10 },
  ];

  const questions = [
    // 마케팅 기초 (10문항)
    { id: 1, topic: 0, question: "마케팅 믹스 4P에 해당하지 않는 것은?", options: ["Product", "Price", "People", "Place"], answer: 2 },
    { id: 2, topic: 0, question: "STP 전략의 'S'가 의미하는 것은?", options: ["Sales", "Segmentation", "Service", "Strategy"], answer: 1 },
    { id: 3, topic: 0, question: "STP 전략의 'T'가 의미하는 것은?", options: ["Timing", "Targeting", "Training", "Testing"], answer: 1 },
    { id: 4, topic: 0, question: "STP 전략의 'P'가 의미하는 것은?", options: ["Product", "Positioning", "Price", "Promotion"], answer: 1 },
    { id: 5, topic: 0, question: "SWOT 분석의 'S'가 의미하는 것은?", options: ["Sales", "Strength", "Service", "Strategy"], answer: 1 },
    { id: 6, topic: 0, question: "SWOT 분석에서 외부 환경 요인은?", options: ["강점, 약점", "기회, 위협", "강점, 기회", "약점, 위협"], answer: 1 },
    { id: 7, topic: 0, question: "시장 세분화의 기준이 아닌 것은?", options: ["지리적 기준", "인구통계적 기준", "혈액형 기준", "행동적 기준"], answer: 2 },
    { id: 8, topic: 0, question: "브랜딩의 목적이 아닌 것은?", options: ["인지도 향상", "차별화", "경쟁사 비방", "신뢰 구축"], answer: 2 },
    { id: 9, topic: 0, question: "USP(Unique Selling Proposition)의 의미는?", options: ["보편적 판매", "독특한 판매 제안", "할인 판매", "대량 판매"], answer: 1 },
    { id: 10, topic: 0, question: "마케팅 계획 수립의 첫 단계는?", options: ["실행", "상황 분석", "평가", "예산 편성"], answer: 1 },

    // 홍보 전략 (10문항)
    { id: 11, topic: 1, question: "PR(Public Relations)의 목적은?", options: ["직접 판매", "이미지 및 관계 구축", "가격 할인", "재고 처리"], answer: 1 },
    { id: 12, topic: 1, question: "보도자료 작성 원칙이 아닌 것은?", options: ["5W1H 원칙", "역피라미드 구조", "과장 표현", "간결한 문장"], answer: 2 },
    { id: 13, topic: 1, question: "미디어 관계의 목적은?", options: ["기자 매수", "언론을 통한 홍보", "기사 삭제", "정보 은폐"], answer: 1 },
    { id: 14, topic: 1, question: "홍보 채널로 적합하지 않은 것은?", options: ["언론 매체", "SNS", "불법 스팸", "공식 웹사이트"], answer: 2 },
    { id: 15, topic: 1, question: "브로슈어의 필수 내용이 아닌 것은?", options: ["행사 개요", "프로그램", "경쟁사 비교", "등록 안내"], answer: 2 },
    { id: 16, topic: 1, question: "홍보 영상의 효과가 아닌 것은?", options: ["시각적 전달", "흥미 유발", "비용만 증가", "정보 공유"], answer: 2 },
    { id: 17, topic: 1, question: "위기 커뮤니케이션의 원칙은?", options: ["은폐", "신속·투명·진정성", "회피", "비난"], answer: 1 },
    { id: 18, topic: 1, question: "광고와 PR의 차이점은?", options: ["동일함", "광고는 유료, PR은 무료 노출", "PR이 더 비쌈", "광고만 효과 있음"], answer: 1 },
    { id: 19, topic: 1, question: "홍보 효과 측정 지표가 아닌 것은?", options: ["미디어 노출량", "웹 트래픽", "직원 출근율", "SNS 반응"], answer: 2 },
    { id: 20, topic: 1, question: "티저 캠페인의 목적은?", options: ["정보 전부 공개", "호기심 유발", "행사 취소 안내", "할인 판매"], answer: 1 },

    // 참가자 유치 (10문항)
    { id: 21, topic: 2, question: "참가자 유치 전략이 아닌 것은?", options: ["타겟 마케팅", "콘텐츠 가치 강조", "강제 참가", "네트워킹 기회 제공"], answer: 2 },
    { id: 22, topic: 2, question: "조기 등록(Early Bird)의 목적은?", options: ["비용 증가", "조기 참가자 확보", "등록 복잡화", "행사 연기"], answer: 1 },
    { id: 23, topic: 2, question: "참가 인센티브의 예시가 아닌 것은?", options: ["조기 등록 할인", "그룹 할인", "참가비 인상", "무료 워크숍"], answer: 2 },
    { id: 24, topic: 2, question: "등록 시스템의 기능이 아닌 것은?", options: ["온라인 등록", "결제 처리", "신원 조회", "참가자 관리"], answer: 2 },
    { id: 25, topic: 2, question: "참가 결정 요인이 아닌 것은?", options: ["콘텐츠 품질", "네트워킹 기회", "날씨만", "비용 대비 가치"], answer: 2 },
    { id: 26, topic: 2, question: "B2B 행사 참가자 유치 채널은?", options: ["어린이 잡지", "업계 협회 네트워크", "음악 방송", "애니메이션"], answer: 1 },
    { id: 27, topic: 2, question: "국제 참가자 유치 시 고려사항이 아닌 것은?", options: ["비자 지원", "언어 서비스", "출입국 방해", "시차 고려"], answer: 2 },
    { id: 28, topic: 2, question: "참가자 데이터베이스 관리의 목적은?", options: ["데이터 삭제", "타겟 마케팅", "개인정보 유출", "시스템 오류"], answer: 1 },
    { id: 29, topic: 2, question: "리마인더 메일의 목적은?", options: ["스팸 발송", "등록 상기 및 참가 유도", "행사 취소", "불만 제기"], answer: 1 },
    { id: 30, topic: 2, question: "노쇼(No-show) 방지 방안이 아닌 것은?", options: ["사전 확인", "리마인더 발송", "무시", "취소 정책 안내"], answer: 2 },

    // 고객 관리 (10문항)
    { id: 31, topic: 3, question: "CRM의 정식 명칭은?", options: ["Customer Relationship Marketing", "Customer Relationship Management", "Convention Resource Management", "Creative Resource Management"], answer: 1 },
    { id: 32, topic: 3, question: "CRM의 목적이 아닌 것은?", options: ["고객 유지", "고객 만족", "고객 이탈 유도", "재참가 유도"], answer: 2 },
    { id: 33, topic: 3, question: "고객 만족도 조사 방법이 아닌 것은?", options: ["설문조사", "인터뷰", "몰래 관찰", "피드백 수집"], answer: 2 },
    { id: 34, topic: 3, question: "고객 불만 처리의 첫 단계는?", options: ["무시", "경청", "책임 전가", "변명"], answer: 1 },
    { id: 35, topic: 3, question: "고객 세분화의 목적은?", options: ["모든 고객 동일 대우", "맞춤형 서비스 제공", "고객 감소", "비용 증가"], answer: 1 },
    { id: 36, topic: 3, question: "로열티 프로그램의 목적은?", options: ["신규 고객만 유치", "고객 충성도 향상", "고객 이탈", "가격 인상"], answer: 1 },
    { id: 37, topic: 3, question: "고객 피드백 활용 방안이 아닌 것은?", options: ["서비스 개선", "프로그램 개발", "피드백 무시", "마케팅 전략 수립"], answer: 2 },
    { id: 38, topic: 3, question: "VIP 고객 관리의 핵심은?", options: ["일반 고객과 동일 대우", "차별화된 서비스", "무시", "추가 비용 부과만"], answer: 1 },
    { id: 39, topic: 3, question: "고객 정보 관리 시 주의사항은?", options: ["무단 공유", "개인정보 보호", "정보 유출", "암호화 미적용"], answer: 1 },
    { id: 40, topic: 3, question: "재참가 유도 방안이 아닌 것은?", options: ["감사 메일", "할인 제공", "참가 방해", "사후 콘텐츠 제공"], answer: 2 },

    // 디지털 마케팅 (10문항)
    { id: 41, topic: 4, question: "디지털 마케팅 채널이 아닌 것은?", options: ["이메일", "SNS", "전단지", "웹사이트"], answer: 2 },
    { id: 42, topic: 4, question: "SNS 마케팅의 장점이 아닌 것은?", options: ["실시간 소통", "비용 효율", "통제 어려움", "바이럴 효과"], answer: 2 },
    { id: 43, topic: 4, question: "이메일 마케팅의 핵심 지표는?", options: ["종이 사용량", "오픈율, 클릭률", "우편 배송 시간", "인쇄 품질"], answer: 1 },
    { id: 44, topic: 4, question: "SEO의 정식 명칭은?", options: ["Sales Enhancement Optimization", "Search Engine Optimization", "Social Event Organization", "Service Excellence Operation"], answer: 1 },
    { id: 45, topic: 4, question: "SEO의 목적은?", options: ["검색 순위 하락", "검색 노출 증가", "웹사이트 폐쇄", "비용 증가"], answer: 1 },
    { id: 46, topic: 4, question: "콘텐츠 마케팅의 예시가 아닌 것은?", options: ["블로그 포스팅", "인포그래픽", "스팸 메일", "동영상 콘텐츠"], answer: 2 },
    { id: 47, topic: 4, question: "소셜미디어 플랫폼이 아닌 것은?", options: ["페이스북", "인스타그램", "전화번호부", "유튜브"], answer: 2 },
    { id: 48, topic: 4, question: "디지털 광고의 종류가 아닌 것은?", options: ["배너 광고", "검색 광고", "벽보 광고", "SNS 광고"], answer: 2 },
    { id: 49, topic: 4, question: "웹사이트 분석 도구의 예시는?", options: ["Google Analytics", "Microsoft Word", "Adobe Photoshop", "Notepad"], answer: 0 },
    { id: 50, topic: 4, question: "온라인 참여 유도 방법이 아닌 것은?", options: ["라이브 Q&A", "실시간 투표", "참여 방해", "채팅 기능"], answer: 2 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-2-marketing-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-2-marketing-answers', JSON.stringify(newAnswers));
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📢 컨벤션 마케팅</h1>
          <p className="text-gray-500">마케팅 기초와 홍보 전략 50문항</p>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사2급 마케팅 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
