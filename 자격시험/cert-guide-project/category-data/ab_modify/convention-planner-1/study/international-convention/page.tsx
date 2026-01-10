'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InternationalConventionStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '국제기구', count: 10 },
    { id: 1, name: '유치 전략', count: 10 },
    { id: 2, name: '개최 절차', count: 10 },
    { id: 3, name: '의전·프로토콜', count: 10 },
    { id: 4, name: '사후 관리', count: 10 },
  ];

  const questions = [
    // 국제기구 (10문항)
    { id: 1, topic: 0, question: "UIA(국제협회연합)의 주요 기능은?", options: ["군사 협력", "국제회의 통계 및 정보 제공", "무역 분쟁 해결", "스포츠 경기 개최"], answer: 1 },
    { id: 2, topic: 0, question: "ICCA(국제회의협회)의 역할이 아닌 것은?", options: ["회원사 네트워킹", "국제회의 데이터 제공", "군사 훈련", "교육 프로그램"], answer: 2 },
    { id: 3, topic: 0, question: "다음 중 정부간기구(IGO)의 예시는?", options: ["국제학술학회", "UN", "기업 협회", "시민단체"], answer: 1 },
    { id: 4, topic: 0, question: "UNWTO(세계관광기구)와 MICE 산업의 관계는?", options: ["관련 없음", "관광 정책 및 MICE 진흥", "군사 협력", "환경 보호만"], answer: 1 },
    { id: 5, topic: 0, question: "국제기구 총회의 특징이 아닌 것은?", options: ["정기 개최", "회원국 참여", "소규모 폐쇄형", "의사결정 기능"], answer: 2 },
    { id: 6, topic: 0, question: "국제학술단체의 회의 개최 결정 주체는?", options: ["정부", "이사회/총회", "기업", "개인"], answer: 1 },
    { id: 7, topic: 0, question: "국제기구 본부가 가장 많이 위치한 도시는?", options: ["서울", "브뤼셀", "도쿄", "시드니"], answer: 1 },
    { id: 8, topic: 0, question: "NGO(비정부기구)의 특징은?", options: ["정부 운영", "비영리·민간 주도", "기업 이익 추구", "군사 조직"], answer: 1 },
    { id: 9, topic: 0, question: "국제회의 유치 시 국제기구와의 관계에서 중요한 것은?", options: ["일방적 요구", "파트너십 구축", "기구 무시", "경쟁 관계"], answer: 1 },
    { id: 10, topic: 0, question: "국제기구 회의의 공식 언어 선정 기준은?", options: ["기구 규정에 따름", "개최국 결정", "참가자 투표", "무작위"], answer: 0 },

    // 유치 전략 (10문항)
    { id: 11, topic: 1, question: "국제회의 유치의 첫 단계는?", options: ["현장 운영", "타겟 회의 선정", "사후 평가", "정산"], answer: 1 },
    { id: 12, topic: 1, question: "유치 제안서(Bid Book)의 필수 내용이 아닌 것은?", options: ["개최지 소개", "지원 내용", "경쟁도시 비방", "프로그램 제안"], answer: 2 },
    { id: 13, topic: 1, question: "유치 프레젠테이션의 핵심 요소가 아닌 것은?", options: ["개최지 장점", "지원 내용", "경쟁사 비난", "차별화 포인트"], answer: 2 },
    { id: 14, topic: 1, question: "국제회의 유치 경쟁력 요소가 아닌 것은?", options: ["인프라", "접근성", "폐쇄성", "지원 정책"], answer: 2 },
    { id: 15, topic: 1, question: "유치위원회의 역할은?", options: ["유치 활동 총괄", "행사 취소", "비용 은폐", "참가 거부"], answer: 0 },
    { id: 16, topic: 1, question: "국제회의 유치 시 정부 지원의 형태가 아닌 것은?", options: ["재정 지원", "비자 편의", "참가 방해", "홍보 지원"], answer: 2 },
    { id: 17, topic: 1, question: "Ambassador Program의 목적은?", options: ["스파이 활동", "국내 전문가를 통한 유치 활동", "비용 절감", "행사 취소"], answer: 1 },
    { id: 18, topic: 1, question: "사이트 인스펙션(Site Inspection)의 목적은?", options: ["비용 낭비", "개최지 현장 확인", "행사 연기", "참가 거부"], answer: 1 },
    { id: 19, topic: 1, question: "유치 성공 후 첫 조치는?", options: ["즉시 개최", "조직위원회 구성", "비용 은폐", "행사 취소"], answer: 1 },
    { id: 20, topic: 1, question: "유치 실패 시 대응 방안이 아닌 것은?", options: ["원인 분석", "차기 유치 준비", "포기", "네트워크 유지"], answer: 2 },

    // 개최 절차 (10문항)
    { id: 21, topic: 2, question: "국제회의 개최 준비 기간은 일반적으로?", options: ["1개월", "1-3년", "1주일", "하루"], answer: 1 },
    { id: 22, topic: 2, question: "조직위원회의 역할이 아닌 것은?", options: ["기획 총괄", "예산 관리", "개인 이익 추구", "프로그램 개발"], answer: 2 },
    { id: 23, topic: 2, question: "PCO(Professional Congress Organizer)의 역할은?", options: ["정부 기관", "전문 회의 기획·운영", "참가 거부", "시설 건설"], answer: 1 },
    { id: 24, topic: 2, question: "국제회의 프로그램 구성 시 고려사항이 아닌 것은?", options: ["참가자 니즈", "시간대별 배치", "무작위 구성", "다양성"], answer: 2 },
    { id: 25, topic: 2, question: "초청 연사 섭외의 고려사항이 아닌 것은?", options: ["전문성", "인지도", "외모", "발표 주제 적합성"], answer: 2 },
    { id: 26, topic: 2, question: "국제회의 등록 시스템의 기능이 아닌 것은?", options: ["온라인 등록", "결제 처리", "신원 조회", "참가자 관리"], answer: 2 },
    { id: 27, topic: 2, question: "동시통역 준비사항이 아닌 것은?", options: ["통역사 섭외", "통역 부스 설치", "통역 불필요", "장비 점검"], answer: 2 },
    { id: 28, topic: 2, question: "국제회의 F&B 준비 시 고려사항은?", options: ["문화적 식이 제한", "최저가 음식만", "음식 제공 안 함", "한 종류만"], answer: 0 },
    { id: 29, topic: 2, question: "기술 리허설의 목적은?", options: ["비용 낭비", "장비·시스템 점검", "행사 취소", "참가 거부"], answer: 1 },
    { id: 30, topic: 2, question: "국제회의 개최 직전 최종 점검 사항이 아닌 것은?", options: ["시설 확인", "인력 배치", "휴식", "장비 테스트"], answer: 2 },

    // 의전·프로토콜 (10문항)
    { id: 31, topic: 3, question: "국제회의 의전(Protocol)의 정의는?", options: ["규칙 무시", "공식 행사 예절·절차", "비용 절감", "참가 거부"], answer: 1 },
    { id: 32, topic: 3, question: "VIP 좌석 배치의 원칙은?", options: ["무작위", "서열에 따른 배치", "선착순", "추첨"], answer: 1 },
    { id: 33, topic: 3, question: "국기 게양 순서의 원칙은?", options: ["크기순", "알파벳순/개최국 우선", "무작위", "색상순"], answer: 1 },
    { id: 34, topic: 3, question: "공식 만찬의 좌석 배치 원칙은?", options: ["자유석", "서열·균형 고려", "선착순", "나이순만"], answer: 1 },
    { id: 35, topic: 3, question: "국제회의 개회식 순서로 적절한 것은?", options: ["폐회사→개회사", "국가→개회사→환영사→축사", "바로 본회의", "식사 먼저"], answer: 1 },
    { id: 36, topic: 3, question: "외국 귀빈 영접 시 고려사항이 아닌 것은?", options: ["공항 영접", "의전 차량", "무시", "숙소 안내"], answer: 2 },
    { id: 37, topic: 3, question: "국제회의 복장 규정(Dress Code) 안내의 이유는?", options: ["차별", "행사 성격에 맞는 참가", "비용 절감", "불편 유발"], answer: 1 },
    { id: 38, topic: 3, question: "선물 교환 시 고려사항이 아닌 것은?", options: ["문화적 적절성", "가치 균형", "최고가 선물만", "포장"], answer: 2 },
    { id: 39, topic: 3, question: "통역 시 의전 고려사항은?", options: ["통역 생략", "VIP 발언 시 동시통역 제공", "통역사 무시", "지연 통역만"], answer: 1 },
    { id: 40, topic: 3, question: "폐회식 순서에 포함되지 않는 것은?", options: ["감사 인사", "차기 개최지 발표", "개회 선언", "폐회 선언"], answer: 2 },

    // 사후 관리 (10문항)
    { id: 41, topic: 4, question: "국제회의 사후 관리의 목적이 아닌 것은?", options: ["참가자 관계 유지", "성과 분석", "관계 단절", "후속 행사 준비"], answer: 2 },
    { id: 42, topic: 4, question: "사후 보고서의 필수 내용이 아닌 것은?", options: ["참가자 통계", "예산 결산", "개인 일기", "성과 분석"], answer: 2 },
    { id: 43, topic: 4, question: "참가자 감사 서한 발송의 목적은?", options: ["비용 청구", "관계 유지 및 감사 표현", "불만 전달", "행사 취소"], answer: 1 },
    { id: 44, topic: 4, question: "국제회의 결과물(Proceedings) 발간의 목적은?", options: ["비용 낭비", "학술 성과 공유", "자료 폐기", "비공개"], answer: 1 },
    { id: 45, topic: 4, question: "미디어 클리핑의 목적은?", options: ["기사 삭제", "언론 보도 분석", "기자 비난", "홍보 중단"], answer: 1 },
    { id: 46, topic: 4, question: "참가자 데이터베이스 관리의 목적은?", options: ["데이터 삭제", "후속 마케팅 및 관계 관리", "개인정보 유출", "참가 방해"], answer: 1 },
    { id: 47, topic: 4, question: "스폰서 사후 보고서의 내용이 아닌 것은?", options: ["노출 효과", "ROI 분석", "경쟁사 비난", "감사 표현"], answer: 2 },
    { id: 48, topic: 4, question: "레거시(Legacy) 프로그램의 목적은?", options: ["유산 폐기", "행사 효과의 지속적 확산", "관계 단절", "비용 낭비"], answer: 1 },
    { id: 49, topic: 4, question: "차기 개최지와의 인수인계 사항이 아닌 것은?", options: ["노하우 전수", "자료 공유", "비협조", "네트워크 소개"], answer: 2 },
    { id: 50, topic: 4, question: "국제회의 정산의 마감 시점은?", options: ["행사 전", "행사 중", "행사 종료 후 일정 기간 내", "영원히 미정산"], answer: 2 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-1-international-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-1-international-answers', JSON.stringify(newAnswers));
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🌍 국제회의론</h1>
          <p className="text-gray-500">국제회의 유치·개최 실무 50문항</p>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 국제회의론 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 국제회의론 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 국제회의론 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
