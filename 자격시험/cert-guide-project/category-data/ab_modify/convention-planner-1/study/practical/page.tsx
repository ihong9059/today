'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConventionPracticalStudyPage() {
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const topics = [
    { id: 0, name: '기획서 개요', count: 10 },
    { id: 1, name: '프로그램 기획', count: 10 },
    { id: 2, name: '예산 수립', count: 10 },
    { id: 3, name: '마케팅 계획', count: 10 },
    { id: 4, name: '운영 계획', count: 10 },
  ];

  const questions = [
    // 기획서 개요 (10문항)
    { id: 1, topic: 0, question: "[실기] 국제학술대회 기획서 작성 시 행사 개요에 포함되어야 할 필수 항목 5가지를 서술하시오.", options: ["행사명, 일시, 장소, 주최·주관, 참가 규모", "행사명만", "일시만", "장소만"], answer: 0 },
    { id: 2, topic: 0, question: "[실기] 기획서에서 '행사 목적'과 '기대효과'의 차이점을 설명하시오.", options: ["차이 없음", "목적은 의도, 기대효과는 달성하려는 성과", "둘 다 같은 의미", "목적만 중요"], answer: 1 },
    { id: 3, topic: 0, question: "[실기] 국제회의 기획서의 목차 구성을 논리적 순서로 나열하시오.", options: ["예산→개요→프로그램", "개요→목적→프로그램→예산→운영→마케팅→평가", "운영→개요→예산", "마케팅→개요→운영"], answer: 1 },
    { id: 4, topic: 0, question: "[실기] 행사 테마 설정의 원칙 3가지를 서술하시오.", options: ["명확성, 차별성, 일관성", "복잡성만", "모호함", "관련 없음"], answer: 0 },
    { id: 5, topic: 0, question: "[실기] 개최지 선정 시 고려해야 할 요소 5가지를 서술하시오.", options: ["접근성, 시설, 숙박, 비용, 지원 정책", "비용만", "시설만", "접근성만"], answer: 0 },
    { id: 6, topic: 0, question: "[실기] 국제회의 참가 대상 분석의 항목을 나열하시오.", options: ["직업, 지역, 관심사, 참가 목적, 규모", "나이만", "성별만", "학력만"], answer: 0 },
    { id: 7, topic: 0, question: "[실기] 기획서에서 SWOT 분석을 활용하는 방법을 설명하시오.", options: ["분석 불필요", "강점·약점·기회·위협 분석으로 전략 도출", "강점만 분석", "약점만 분석"], answer: 1 },
    { id: 8, topic: 0, question: "[실기] 행사 로고와 슬로건의 기획 시 고려사항을 서술하시오.", options: ["복잡하게", "주제 반영, 기억 용이성, 시각적 매력, 일관성", "텍스트만", "이미지만"], answer: 1 },
    { id: 9, topic: 0, question: "[실기] 국제회의 개최 일정 수립 시 고려해야 할 요소를 나열하시오.", options: ["참가자 편의, 경쟁 행사, 현지 행사, 시즌, 장소 가용성", "날짜만", "요일만", "시간만"], answer: 0 },
    { id: 10, topic: 0, question: "[실기] 기획서 작성 시 실현 가능성을 높이는 방법을 서술하시오.", options: ["과장하기", "구체적 데이터, 사례 제시, 현실적 예산, 명확한 실행 계획", "추상적 작성", "비현실적 목표"], answer: 1 },

    // 프로그램 기획 (10문항)
    { id: 11, topic: 1, question: "[실기] 3일간 국제학술대회의 프로그램 구성 예시를 작성하시오.", options: ["1일만 계획", "Day1: 개회식·기조연설, Day2: 분과세션·워크숍, Day3: 종합토론·폐회식", "매일 같은 내용", "프로그램 없음"], answer: 1 },
    { id: 12, topic: 1, question: "[실기] 기조연설(Keynote) 세션 기획 시 고려사항을 서술하시오.", options: ["연사 전문성, 주제 적합성, 시간 배분, 기술 지원, 청중 참여", "시간만", "장소만", "연사만"], answer: 0 },
    { id: 13, topic: 1, question: "[실기] 분과 세션(Parallel Session) 운영의 장단점을 분석하시오.", options: ["장점만 있음", "장점: 다양성·선택권, 단점: 분산·운영 복잡성", "단점만 있음", "장단점 없음"], answer: 1 },
    { id: 14, topic: 1, question: "[실기] 네트워킹 프로그램의 유형과 운영 방법을 서술하시오.", options: ["불필요", "웰컴 리셉션, 갈라 디너, 커피 브레이크, 테마 파티 등", "식사만", "회의만"], answer: 1 },
    { id: 15, topic: 1, question: "[실기] 기술 세션과 포스터 세션의 차이점을 설명하시오.", options: ["같음", "기술: 구두 발표, 포스터: 게시·설명, 상호작용 방식 차이", "차이 없음", "포스터만 사용"], answer: 1 },
    { id: 16, topic: 1, question: "[실기] 사회적 프로그램(Social Program) 기획 시 고려사항을 나열하시오.", options: ["무시", "문화 체험, 관광, 참가자 선호, 비용, 안전", "비용만", "시간만"], answer: 1 },
    { id: 17, topic: 1, question: "[실기] 워크숍 세션 기획의 핵심 요소를 서술하시오.", options: ["강의만", "실습 중심, 소규모, 전문가 진행, 참여 유도, 결과물 도출", "대규모만", "이론만"], answer: 1 },
    { id: 18, topic: 1, question: "[실기] 개회식 프로그램 구성을 순서대로 작성하시오.", options: ["폐회식부터", "국민의례→개회사→환영사→축사→기조연설→안내사항", "바로 본회의", "식사부터"], answer: 1 },
    { id: 19, topic: 1, question: "[실기] 폐회식 프로그램에 포함되어야 할 내용을 나열하시오.", options: ["개회사", "감사 인사, 시상, 차기 개최지 발표, 폐회 선언, 기념 촬영", "바로 종료", "내용 없음"], answer: 1 },
    { id: 20, topic: 1, question: "[실기] 하이브리드 회의 프로그램 기획 시 고려사항을 서술하시오.", options: ["대면만", "온·오프라인 동시 참여, 기술 지원, 시차 고려, 참여 유도 방안", "온라인만", "고려 불필요"], answer: 1 },

    // 예산 수립 (10문항)
    { id: 21, topic: 2, question: "[실기] 국제회의 예산의 수입 항목을 5가지 이상 나열하시오.", options: ["지출만", "참가비, 스폰서십, 전시 부스, 정부 지원금, 광고 수입", "참가비만", "스폰서만"], answer: 1 },
    { id: 22, topic: 2, question: "[실기] 국제회의 예산의 지출 항목을 분류하여 서술하시오.", options: ["수입만", "장소, 인건비, F&B, 홍보, 기술, 인쇄, 교통, 기념품, 예비비", "장소만", "인건비만"], answer: 1 },
    { id: 23, topic: 2, question: "[실기] 손익분기점(BEP) 계산 방법을 예시와 함께 설명하시오.", options: ["계산 불필요", "고정비용/(참가비-변동비용)=최소 참가자 수", "대충 추정", "무시"], answer: 1 },
    { id: 24, topic: 2, question: "[실기] 참가비 책정 시 고려해야 할 요소를 나열하시오.", options: ["무작위", "원가, 경쟁 행사, 참가자 부담 능력, 부가 가치, 조기 등록", "최고가만", "최저가만"], answer: 1 },
    { id: 25, topic: 2, question: "[실기] 스폰서십 등급별 혜택 패키지를 설계하시오.", options: ["등급 없음", "타이틀/골드/실버/브론즈 등급별 노출, 네트워킹, 독점 혜택 차등화", "모두 동일", "혜택 없음"], answer: 1 },
    { id: 26, topic: 2, question: "[실기] 예산 절감 방안 5가지를 제시하시오.", options: ["절감 불가", "조기 계약, 스폰서 물품, 공동 구매, 디지털화, 효율적 인력 운용", "비용 증가만", "무제한 지출"], answer: 1 },
    { id: 27, topic: 2, question: "[실기] 예비비 책정의 기준과 활용 방안을 설명하시오.", options: ["예비비 불필요", "총예산 5-10%, 예상치 못한 비용 대비, 승인 절차 필요", "50% 책정", "0% 책정"], answer: 1 },
    { id: 28, topic: 2, question: "[실기] 예산 모니터링 방법과 주기를 설명하시오.", options: ["모니터링 불필요", "주간/월간 예산 대비 실적 분석, 이상 징후 파악, 조정", "연 1회만", "사후만"], answer: 1 },
    { id: 29, topic: 2, question: "[실기] F&B 예산 수립 시 고려사항을 나열하시오.", options: ["무시", "참가자 수, 식단 다양성, 알레르기, 예산, 행사 성격", "최저가만", "한 종류만"], answer: 1 },
    { id: 30, topic: 2, question: "[실기] 예산 결산 보고서의 필수 항목을 서술하시오.", options: ["내용 없음", "수입 내역, 지출 내역, 예산 대비 실적, 잔액, 분석·시사점", "수입만", "지출만"], answer: 1 },

    // 마케팅 계획 (10문항)
    { id: 31, topic: 3, question: "[실기] 국제회의 마케팅 계획서의 구성 요소를 나열하시오.", options: ["없음", "목표, 타겟, 전략, 채널, 일정, 예산, KPI", "목표만", "예산만"], answer: 1 },
    { id: 32, topic: 3, question: "[실기] 참가자 유치를 위한 마케팅 전략을 수립하시오.", options: ["전략 없음", "타겟 세분화, 채널 다양화, 콘텐츠 개발, 조기 등록 인센티브", "대충", "무작위"], answer: 1 },
    { id: 33, topic: 3, question: "[실기] 디지털 마케팅 채널별 활용 방안을 제시하시오.", options: ["디지털 불필요", "웹사이트, 이메일, SNS, 온라인 광고, 콘텐츠 마케팅", "전단지만", "TV만"], answer: 1 },
    { id: 34, topic: 3, question: "[실기] 홍보 콘텐츠 제작 계획을 수립하시오.", options: ["콘텐츠 불필요", "홍보 영상, 브로슈어, 인포그래픽, 블로그, 사진", "텍스트만", "영상만"], answer: 1 },
    { id: 35, topic: 3, question: "[실기] 언론 홍보(PR) 계획을 작성하시오.", options: ["PR 불필요", "보도자료 배포, 기자 브리핑, 인터뷰 섭외, 미디어 파트너십", "광고만", "무시"], answer: 1 },
    { id: 36, topic: 3, question: "[실기] 스폰서 유치 마케팅 전략을 제시하시오.", options: ["스폰서 불필요", "타겟 기업 선정, 제안서 작성, 맞춤 혜택, 관계 구축", "무작위 접촉", "요청만"], answer: 1 },
    { id: 37, topic: 3, question: "[실기] 국제 참가자 유치 전략을 수립하시오.", options: ["국내만", "다국어 홍보, 비자 지원, 국제 네트워크 활용, 현지 파트너", "번역 없음", "지원 없음"], answer: 1 },
    { id: 38, topic: 3, question: "[실기] 조기 등록(Early Bird) 캠페인 계획을 작성하시오.", options: ["조기 등록 없음", "할인율 설정, 기간 설정, 홍보 일정, 리마인더 발송", "할인 없음", "기간 없음"], answer: 1 },
    { id: 39, topic: 3, question: "[실기] 마케팅 성과 측정 지표(KPI)를 설정하시오.", options: ["측정 불필요", "등록자 수, 웹사이트 트래픽, 이메일 오픈율, SNS 반응, 전환율", "감으로 판단", "측정 안 함"], answer: 1 },
    { id: 40, topic: 3, question: "[실기] 마케팅 예산 배분 계획을 수립하시오.", options: ["배분 없음", "채널별/시기별 배분, 우선순위 설정, 효과 분석 기반 조정", "전부 한 곳에", "무작위"], answer: 1 },

    // 운영 계획 (10문항)
    { id: 41, topic: 4, question: "[실기] 현장 운영 조직도를 작성하시오.", options: ["조직 없음", "총괄→등록팀/프로그램팀/기술팀/F&B팀/의전팀/안전팀", "1인 운영", "무계획"], answer: 1 },
    { id: 42, topic: 4, question: "[실기] 등록 데스크 운영 매뉴얼의 주요 내용을 서술하시오.", options: ["매뉴얼 없음", "등록 절차, 명찰 발급, 자료 배포, 문의 응대, 문제 해결", "대충 운영", "무작위"], answer: 1 },
    { id: 43, topic: 4, question: "[실기] 기술 지원 계획을 수립하시오.", options: ["기술 불필요", "음향·영상·조명·네트워크 점검, 기술 인력 배치, 백업 시스템", "대충 준비", "사전 점검 없음"], answer: 1 },
    { id: 44, topic: 4, question: "[실기] VIP 의전 계획서를 작성하시오.", options: ["의전 불필요", "영접 계획, 동선, 좌석 배치, 수행원, 선물, 보안", "무시", "대충"], answer: 1 },
    { id: 45, topic: 4, question: "[실기] 위기관리 계획서의 구성 요소를 나열하시오.", options: ["위기관리 불필요", "위험 평가, 대응 시나리오, 비상 연락망, 대피 계획, 커뮤니케이션", "무시", "사후 대응만"], answer: 1 },
    { id: 46, topic: 4, question: "[실기] F&B 운영 계획을 수립하시오.", options: ["F&B 없음", "메뉴 구성, 동선, 식이 제한 대응, 케이터링 업체 관리, 위생", "대충 준비", "한 종류만"], answer: 1 },
    { id: 47, topic: 4, question: "[실기] 참가자 동선 계획을 작성하시오.", options: ["동선 없음", "등록→세션장→휴식 공간→네트워킹→출구 동선 설계, 사인 배치", "무작위", "안내 없음"], answer: 1 },
    { id: 48, topic: 4, question: "[실기] 스태프 브리핑 계획을 수립하시오.", options: ["브리핑 없음", "행사 전·중 브리핑, 역할 확인, 비상 상황 대응, 일정 공유", "개인 판단", "사후 브리핑만"], answer: 1 },
    { id: 49, topic: 4, question: "[실기] 사후 평가 계획서를 작성하시오.", options: ["평가 없음", "설문 조사, 데이터 분석, 디브리핑, 보고서 작성, 개선점 도출", "감으로 평가", "평가 생략"], answer: 1 },
    { id: 50, topic: 4, question: "[실기] 지속가능한 행사(Green Event) 운영 방안을 제시하시오.", options: ["환경 무시", "친환경 물품, 디지털화, 재활용, 탄소 상쇄, 지역 자원 활용", "일회용만", "환경 고려 없음"], answer: 1 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('convention-planner-1-practical-answers');
    if (saved) setUserAnswers(JSON.parse(saved));
  }, []);

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const newAnswers = { ...userAnswers, [questionId]: answerIndex };
    setUserAnswers(newAnswers);
    localStorage.setItem('convention-planner-1-practical-answers', JSON.stringify(newAnswers));
  };

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;
  const correctCount = questions.filter(q => userAnswers[q.id] === q.answer).length;

  const openAIModal = (question: string) => { setCurrentQuestion(question); setShowAIModal(true); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-1" className="text-indigo-600 hover:text-indigo-800 font-medium">← 컨벤션기획사1급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📋 실기시험 대비</h1>
          <p className="text-gray-500">기획서 작성 연습 50문항</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full">
            <span className="text-indigo-700 font-medium">진행률: {correctCount}/50</span>
            <div className="w-32 h-2 bg-indigo-200 rounded-full"><div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${(correctCount / 50) * 100}%` }}></div></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setSelectedTopic(null)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === null ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}>전체 ({questions.length})</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`px-4 py-2 rounded-full font-medium transition ${selectedTopic === topic.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{topics[q.topic].name}</span>
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
                <button onClick={() => setShowAnswer(showAnswer === q.id ? null : q.id)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  {showAnswer === q.id ? '해설 닫기' : '해설 보기'}
                </button>
                <button onClick={() => openAIModal(q.question)} className="text-purple-600 hover:text-purple-800 text-sm font-medium ml-4">AI에게 질문</button>
              </div>
              {showAnswer === q.id && (
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                  <p className="text-indigo-800"><strong>정답:</strong> {q.answer + 1}번</p>
                  <p className="text-indigo-600 text-sm mt-1">실기시험에서는 구체적이고 체계적인 서술이 중요합니다.</p>
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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 실기시험 관점에서 상세히 답변해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-xl transition"><div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div><span className="font-medium text-gray-700">Claude에게 질문</span></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 실기시험 관점에서 상세히 답변해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">ChatGPT에게 질문</span></a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentQuestion + ' 컨벤션기획사1급 실기시험 관점에서 상세히 답변해주세요.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition"><div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div><span className="font-medium text-gray-700">Gemini에게 질문</span></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
