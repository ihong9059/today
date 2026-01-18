'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OperationManagementStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '기획 프로세스', count: 10 },
    { id: 1, name: '예산 관리', count: 10 },
    { id: 2, name: '현장 운영', count: 10 },
    { id: 3, name: '위기 관리', count: 10 },
    { id: 4, name: '평가·분석', count: 10 },
  ];

  const questions = [
    // 기획 프로세스 (10문항)
    { id: 1, topic: 0, question: "컨벤션 기획 프로세스의 첫 단계는?", options: ["현장 운영", "사후 평가", "목적 및 목표 설정", "참가자 등록"], answer: 2 },
    { id: 2, topic: 0, question: "컨벤션 기획서의 필수 항목이 아닌 것은?", options: ["행사 개요", "프로그램", "개인 일기", "예산"], answer: 2 },
    { id: 3, topic: 0, question: "컨벤션 타임라인 작성의 목적은?", options: ["비용 증가", "일정 관리", "참가자 감소", "행사 취소"], answer: 1 },
    { id: 4, topic: 0, question: "컨벤션 장소 선정 시 고려사항이 아닌 것은?", options: ["접근성", "수용 인원", "관리자 취향", "시설 조건"], answer: 2 },
    { id: 5, topic: 0, question: "RFP(Request for Proposal)의 목적은?", options: ["제안 요청", "참가 거절", "행사 취소", "비용 은폐"], answer: 0 },
    { id: 6, topic: 0, question: "컨벤션 프로그램 구성 원칙이 아닌 것은?", options: ["참가자 니즈 반영", "시간 배분 고려", "무작위 배치", "다양성 확보"], answer: 2 },
    { id: 7, topic: 0, question: "기조연설(Keynote Speech)의 특징은?", options: ["마무리 연설", "개막 시 핵심 주제 발표", "비공개 진행", "참가자 토론"], answer: 1 },
    { id: 8, topic: 0, question: "컨벤션 실행 계획서에 포함되지 않는 것은?", options: ["인력 배치", "장비 계획", "개인 휴가 일정", "동선 계획"], answer: 2 },
    { id: 9, topic: 0, question: "사전 답사(Site Inspection)의 목적은?", options: ["비용 낭비", "현장 확인 및 점검", "행사 연기", "참가 거부"], answer: 1 },
    { id: 10, topic: 0, question: "컨벤션 체크리스트의 용도는?", options: ["비용 증가", "업무 누락 방지", "인원 감축", "홍보 중단"], answer: 1 },

    // 예산 관리 (10문항)
    { id: 11, topic: 1, question: "컨벤션 예산의 수입 항목이 아닌 것은?", options: ["참가비", "스폰서십", "대관료", "전시 부스 판매"], answer: 2 },
    { id: 12, topic: 1, question: "컨벤션 예산의 지출 항목이 아닌 것은?", options: ["장소 대관료", "케이터링", "참가비 수입", "인건비"], answer: 2 },
    { id: 13, topic: 1, question: "예산 편성 시 예비비의 적정 비율은?", options: ["0%", "5-10%", "50% 이상", "100%"], answer: 1 },
    { id: 14, topic: 1, question: "손익분기점(BEP) 분석의 목적은?", options: ["손실 극대화", "수익 발생 최소 참가자 수 산정", "비용 은폐", "행사 취소"], answer: 1 },
    { id: 15, topic: 1, question: "컨벤션 예산 통제의 원칙이 아닌 것은?", options: ["정기 모니터링", "예산 대비 실적 분석", "무제한 지출", "변경 승인 절차"], answer: 2 },
    { id: 16, topic: 1, question: "고정비용의 예시가 아닌 것은?", options: ["장소 대관료", "기획 용역비", "식음료 비용", "인쇄물 제작비"], answer: 2 },
    { id: 17, topic: 1, question: "변동비용의 특징은?", options: ["참가자 수와 무관", "참가자 수에 따라 변동", "항상 일정", "예측 불가"], answer: 1 },
    { id: 18, topic: 1, question: "예산 절감 방안이 아닌 것은?", options: ["조기 계약 할인", "스폰서 물품 활용", "불필요한 지출 증가", "공동 구매"], answer: 2 },
    { id: 19, topic: 1, question: "컨벤션 정산의 시점은?", options: ["행사 전", "행사 중", "행사 종료 후", "기획 단계"], answer: 2 },
    { id: 20, topic: 1, question: "예산 보고서의 필수 내용이 아닌 것은?", options: ["수입 내역", "지출 내역", "개인 비용", "잔액"], answer: 2 },

    // 현장 운영 (10문항)
    { id: 21, topic: 2, question: "컨벤션 등록 데스크의 업무가 아닌 것은?", options: ["참가자 확인", "명찰 배포", "요리 서빙", "자료 배포"], answer: 2 },
    { id: 22, topic: 2, question: "현장 운영 조직의 구성 요소가 아닌 것은?", options: ["총괄 디렉터", "등록팀", "경쟁사 직원", "기술팀"], answer: 2 },
    { id: 23, topic: 2, question: "컨벤션 동선 계획의 목적은?", options: ["혼잡 유발", "원활한 참가자 이동", "비용 증가", "행사 지연"], answer: 1 },
    { id: 24, topic: 2, question: "세션 운영 시 고려사항이 아닌 것은?", options: ["시간 관리", "발표자 지원", "청중 방해", "기술 지원"], answer: 2 },
    { id: 25, topic: 2, question: "컨벤션 케이터링 관리 항목이 아닌 것은?", options: ["메뉴 구성", "알레르기 대응", "개인 식비 지급", "식음료 배치"], answer: 2 },
    { id: 26, topic: 2, question: "VIP 의전의 요소가 아닌 것은?", options: ["의전 순서", "좌석 배치", "무시", "수행원 배치"], answer: 2 },
    { id: 27, topic: 2, question: "현장 브리핑의 목적은?", options: ["정보 은폐", "스태프 업무 공유", "비용 낭비", "행사 취소"], answer: 1 },
    { id: 28, topic: 2, question: "기술 지원 업무가 아닌 것은?", options: ["음향 관리", "조명 관리", "요리 준비", "영상 송출"], answer: 2 },
    { id: 29, topic: 2, question: "현장 안전 관리 사항이 아닌 것은?", options: ["비상구 확인", "안전 요원 배치", "위험 무시", "응급 장비 준비"], answer: 2 },
    { id: 30, topic: 2, question: "네트워킹 세션 운영의 핵심은?", options: ["참가자 격리", "교류 기회 제공", "대화 금지", "조기 종료"], answer: 1 },

    // 위기 관리 (10문항)
    { id: 31, topic: 3, question: "컨벤션 위기의 유형이 아닌 것은?", options: ["자연재해", "기술 장애", "성공적 개최", "테러 위협"], answer: 2 },
    { id: 32, topic: 3, question: "위기관리 계획 수립의 첫 단계는?", options: ["위험 평가", "사후 처리", "책임 회피", "은폐"], answer: 0 },
    { id: 33, topic: 3, question: "비상 대응 팀의 역할이 아닌 것은?", options: ["상황 모니터링", "의사결정", "위기 무시", "커뮤니케이션"], answer: 2 },
    { id: 34, topic: 3, question: "참가자 대피 계획 수립 시 고려사항이 아닌 것은?", options: ["대피 경로", "집결 장소", "대피 방해", "비상 연락망"], answer: 2 },
    { id: 35, topic: 3, question: "기술 장애 대응 방안이 아닌 것은?", options: ["백업 시스템", "기술 인력 대기", "장애 무시", "사전 테스트"], answer: 2 },
    { id: 36, topic: 3, question: "기상 악화 시 대응 방안이 아닌 것은?", options: ["일정 조정", "대체 장소 확보", "무시하고 진행", "참가자 안내"], answer: 2 },
    { id: 37, topic: 3, question: "의료 응급상황 대응 절차가 아닌 것은?", options: ["응급 의료진 배치", "AED 비치", "응급상황 무시", "구급차 연계"], answer: 2 },
    { id: 38, topic: 3, question: "위기 커뮤니케이션의 원칙이 아닌 것은?", options: ["신속한 정보 제공", "정확한 사실 전달", "거짓 정보 유포", "일관된 메시지"], answer: 2 },
    { id: 39, topic: 3, question: "보안 위협 대응 방안이 아닌 것은?", options: ["보안 요원 배치", "출입 통제", "보안 무시", "CCTV 운영"], answer: 2 },
    { id: 40, topic: 3, question: "위기 발생 후 조치가 아닌 것은?", options: ["원인 분석", "재발 방지", "책임 회피", "보고서 작성"], answer: 2 },

    // 평가·분석 (10문항)
    { id: 41, topic: 4, question: "컨벤션 평가의 목적이 아닌 것은?", options: ["성과 측정", "개선점 파악", "성과 은폐", "교훈 도출"], answer: 2 },
    { id: 42, topic: 4, question: "컨벤션 KPI(핵심성과지표)의 예시가 아닌 것은?", options: ["참가자 수", "만족도", "직원 개인 성적", "수익"], answer: 2 },
    { id: 43, topic: 4, question: "참가자 만족도 조사 방법이 아닌 것은?", options: ["설문조사", "인터뷰", "몰래 관찰", "피드백 수집"], answer: 2 },
    { id: 44, topic: 4, question: "ROI 계산 공식으로 옳은 것은?", options: ["수익/비용×100", "(수익-비용)/비용×100", "비용/수익×100", "수익+비용"], answer: 1 },
    { id: 45, topic: 4, question: "컨벤션 결과 보고서의 내용이 아닌 것은?", options: ["행사 개요", "성과 분석", "개인 일정", "개선 권고"], answer: 2 },
    { id: 46, topic: 4, question: "정성적 평가 방법의 예시는?", options: ["참가자 수 집계", "심층 인터뷰", "수익 계산", "비용 분석"], answer: 1 },
    { id: 47, topic: 4, question: "정량적 평가 지표의 예시는?", options: ["참가자 감상", "등록자 수", "분위기", "인상"], answer: 1 },
    { id: 48, topic: 4, question: "벤치마킹의 목적은?", options: ["경쟁사 비방", "우수 사례 학습", "모방 거부", "고립"], answer: 1 },
    { id: 49, topic: 4, question: "사후 분석 회의(Debrief)의 목적은?", options: ["책임 추궁", "교훈 공유 및 개선점 도출", "성과 은폐", "비난"], answer: 1 },
    { id: 50, topic: 4, question: "평가 결과 활용 방안이 아닌 것은?", options: ["차기 행사 개선", "보고서 작성", "결과 폐기", "사례 공유"], answer: 2 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-1-operation-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-1-operation-answers', JSON.stringify(newAnswers));
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ 운영관리</h1>
          <p className="text-gray-500">컨벤션 기획·운영 실무 50문항</p>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 운영관리 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 운영관리 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 운영관리 관점에서 자세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
