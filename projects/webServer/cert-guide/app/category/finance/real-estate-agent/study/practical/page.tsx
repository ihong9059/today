'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 토픽 1: 중개계약 실무 (1-5)
  {
    id: 1,
    question: "전속중개계약 체결 시 중개대상물 확인·설명서에 반드시 기재해야 할 권리관계 사항은?",
    answer: "등기부상 권리관계, 실제 권리관계, 공법상 제한사항, 임대차 현황",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 전속중개계약 체결 시 중개대상물 확인·설명서에 반드시 기재해야 할 권리관계 사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 2,
    question: "일반중개계약과 전속중개계약의 실무상 차이점과 각각의 유효기간은?",
    answer: "일반: 3개월, 전속: 3개월, 전속은 거래정보사업자 등록 의무",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 일반중개계약과 전속중개계약의 실무상 차이점과 각각의 유효기간은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 3,
    question: "중개대상물의 하자 발견 시 확인·설명서 작성 방법과 책임 범위는?",
    answer: "하자 내용 명확히 기재, 거래당사자 서명 필수, 미고지 시 손해배상",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 중개대상물의 하자 발견 시 확인·설명서 작성 방법과 책임 범위는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 4,
    question: "공동중개 시 확인·설명서 작성 및 중개보수 배분 방법은?",
    answer: "각 중개사가 확인·서명, 보수는 의뢰인별로 각자 수령",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 공동중개 시 확인·설명서 작성 및 중개보수 배분 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 5,
    question: "중개계약 해지 시 이미 지출한 비용의 청구 가능 여부와 범위는?",
    answer: "약정이 있는 경우 실비 청구 가능, 한도는 중개보수 50%",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 중개계약 해지 시 이미 지출한 비용의 청구 가능 여부와 범위는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  // 토픽 2: 권리분석 실무 (6-10)
  {
    id: 6,
    question: "등기부등본 갑구에서 가등기와 가처분의 실무상 차이점과 위험도 분석은?",
    answer: "가등기: 본등기 시 순위보전, 가처분: 처분금지, 둘 다 고위험",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 등기부등본 갑구에서 가등기와 가처분의 실무상 차이점과 위험도 분석은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 7,
    question: "선순위 전세권과 후순위 근저당권이 설정된 부동산의 권리분석 방법은?",
    answer: "전세권 우선변제, 근저당 배당순위 확인, 전세금 반환 가능성 분석",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 선순위 전세권과 후순위 근저당권이 설정된 부동산의 권리분석 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 8,
    question: "대항력과 확정일자가 있는 임차인의 보증금 회수 순서와 실무 확인사항은?",
    answer: "확정일자 기준 우선변제권, 배당요구 필수, 임차인현황 조사",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 대항력과 확정일자가 있는 임차인의 보증금 회수 순서와 실무 확인사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 9,
    question: "미등기 건물의 중개 시 권리관계 확인 방법과 주의사항은?",
    answer: "건축물대장, 사용승인서, 매도인 소유 확인, 보존등기 조건부 계약",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 미등기 건물의 중개 시 권리관계 확인 방법과 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 10,
    question: "집합건물의 전유부분과 대지사용권 일체성 원칙 위반 시 문제점은?",
    answer: "분리처분 금지 위반, 대지권 미등기 시 거래 불가, 규약 확인 필수",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 집합건물의 전유부분과 대지사용권 일체성 원칙 위반 시 문제점은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  // 토픽 3: 세금계산 실무 (11-15)
  {
    id: 11,
    question: "주택 취득세 계산 시 취득가액 5억원, 85㎡ 이하, 1주택자의 세액은?",
    answer: "취득가액 5억 × 1.1%(주택 1~3%) = 550만원 (6억 이하 1%+지방세)",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 주택 취득세 계산 시 취득가액 5억원, 85㎡ 이하, 1주택자의 세액은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 12,
    question: "양도소득세 비과세 요건 중 1세대 1주택 2년 보유기간 계산 방법은?",
    answer: "취득일~양도일 2년, 조정대상지역은 2년 거주 추가, 일시적 2주택 예외",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 양도소득세 비과세 요건 중 1세대 1주택 2년 보유기간 계산 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 13,
    question: "다주택자 중과세 적용 시 양도소득세율과 장기보유특별공제 배제 기준은?",
    answer: "2주택 +20%, 3주택 +30% 중과, 장특공제 배제, 조정대상지역 한정",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 다주택자 중과세 적용 시 양도소득세율과 장기보유특별공제 배제 기준은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 14,
    question: "상가 매매 시 부가가치세 포함 여부와 계약서 작성 시 주의사항은?",
    answer: "건물분에 부가세 10% 과세, 토지는 면세, 포함/별도 명확히 기재",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 상가 매매 시 부가가치세 포함 여부와 계약서 작성 시 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 15,
    question: "증여세와 취득세가 동시에 발생하는 부동산 증여 시 총 세금 계산은?",
    answer: "증여세(10~50%) + 취득세(3.5%), 배우자 6억/직계 5천만원 공제",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 증여세와 취득세가 동시에 발생하는 부동산 증여 시 총 세금 계산은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  // 토픽 4: 계약서 작성 실무 (16-20)
  {
    id: 16,
    question: "매매계약서 특약사항에 포함해야 할 필수 기재사항 5가지는?",
    answer: "계약금/중도금/잔금 일정, 융자승계, 인도조건, 하자담보, 위약금",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 매매계약서 특약사항에 포함해야 할 필수 기재사항 5가지는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 17,
    question: "임대차계약서에서 보증금 반환 및 원상복구 조항 작성 방법은?",
    answer: "반환시기, 공제항목, 원상복구 범위, 분쟁해결 방법 명시",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 임대차계약서에서 보증금 반환 및 원상복구 조항 작성 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 18,
    question: "분양권 전매계약 시 계약서 작성과 신고 절차는?",
    answer: "권리의무승계계약서, 분양사 동의, 부동산거래신고(30일 내)",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 분양권 전매계약 시 계약서 작성과 신고 절차는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 19,
    question: "상가임대차계약 시 권리금 계약 별도 작성과 법적 보호범위는?",
    answer: "권리금계약 별도 작성, 임대인 방해금지의무, 환산보증금 기준",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 상가임대차계약 시 권리금 계약 별도 작성과 법적 보호범위는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 20,
    question: "계약 해제 시 위약금 약정과 손해배상 청구의 관계는?",
    answer: "위약금 = 손해배상 예정, 별도 손해배상 불가(예정인 경우)",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 계약 해제 시 위약금 약정과 손해배상 청구의 관계는?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  // 토픽 5: 종합문제 (21-25)
  {
    id: 21,
    question: "경매 물건 중개 시 권리분석, 명도 문제, 하자담보 책임의 종합 검토사항은?",
    answer: "말소기준권리 분석, 점유자 현황, 인수권리 확인, 명도소송 가능성",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 경매 물건 중개 시 권리분석, 명도 문제, 하자담보 책임의 종합 검토사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 22,
    question: "재개발구역 내 부동산 중개 시 조합원 지위 양도와 이주비 정산 방법은?",
    answer: "조합원입주권 양도, 관리처분인가 전후 구분, 이주비/분담금 정산",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 재개발구역 내 부동산 중개 시 조합원 지위 양도와 이주비 정산 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 23,
    question: "외국인 부동산 취득 시 허가·신고 절차와 계약서 작성 주의사항은?",
    answer: "토지취득 신고(60일), 군사시설 등 허가 필요, 자금출처 확인",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 외국인 부동산 취득 시 허가·신고 절차와 계약서 작성 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 24,
    question: "공유지분 매매 시 우선매수권과 분할청구권 관련 계약 조건은?",
    answer: "공유자 우선매수청구권, 분할협의/청구, 지분 과반수 동의 사항",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 공유지분 매매 시 우선매수권과 분할청구권 관련 계약 조건은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  },
  {
    id: 25,
    question: "가압류된 부동산 매매 시 말소조건 계약과 잔금 지급 방법은?",
    answer: "말소조건부 계약, 잔금에서 채무변제, 말소등기 확인 후 잔금",
    prompt: "공인중개사 실전 문제입니다.\n\n문제: 가압류된 부동산 매매 시 말소조건 계약과 잔금 지급 방법은?\n\n다음 순서로 설명해주세요:\n1. 사례 분석\n2. 적용 법령\n3. 해결 방법\n4. 주의사항\n5. 실무 팁"
  }
];

const topics = [
  { name: '중개계약 실무', icon: '📋', range: [1, 5], desc: '중개계약서 작성, 확인설명서' },
  { name: '권리분석 실무', icon: '🔍', range: [6, 10], desc: '등기부 분석, 권리관계 파악' },
  { name: '세금계산 실무', icon: '💰', range: [11, 15], desc: '취득세, 양도소득세 계산' },
  { name: '계약서 작성 실무', icon: '📝', range: [16, 20], desc: '매매계약서, 임대차계약서' },
  { name: '종합문제', icon: '🎯', range: [21, 25], desc: '복합 사례, 실전 모의' }
];

export default function RealEstateAgentPracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);

  useEffect(() => {
    const saved = localStorage.getItem('realtor-practical-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('realtor-practical-progress', JSON.stringify(updated));
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (range: [number, number]) => {
    const topicQuestions = questions.filter(q => q.id >= range[0] && q.id <= range[1]);
    const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-500 hover:text-gray-700">공인중개사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">실전연습</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">공인중개사 실전연습</h1>
          <p className="text-gray-600">실무 사례 중심의 25문항으로 실전 감각을 익히세요</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="text-teal-500">📊</span> 학습 진도
            </h2>
            <span className="text-2xl font-bold text-teal-600">{totalProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>완료: {completedQuestions.length}문항</span>
            <span>전체: {questions.length}문항</span>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, idx) => {
            const progress = getTopicProgress(topic.range as [number, number]);
            const isExpanded = expandedTopic === idx;
            const topicQuestions = questions.filter(q => q.id >= topic.range[0] && q.id <= topic.range[1]);

            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                {/* Topic Header */}
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">{topic.name}</h3>
                      <p className="text-sm text-gray-500">{topic.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-teal-600">
                        {progress.completed}/{progress.total}
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-teal-500 h-2 rounded-full transition-all"
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>

                {/* Questions */}
                {isExpanded && (
                  <div className="border-t divide-y">
                    {topicQuestions.map((q) => (
                      <div key={q.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start gap-4">
                          <button
                            onClick={() => toggleComplete(q.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition ${
                              completedQuestions.includes(q.id)
                                ? 'bg-teal-500 border-teal-500 text-white'
                                : 'border-gray-300 hover:border-teal-400'
                            }`}
                          >
                            {completedQuestions.includes(q.id) && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className={`font-medium mb-2 ${
                              completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'
                            }`}>
                              {q.id}. {q.question}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                              <span className="font-medium text-teal-600">답변:</span> {q.answer}
                            </p>
                            <button
                              onClick={() => openAIModal(q.prompt)}
                              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm rounded-lg hover:from-teal-600 hover:to-cyan-600 transition shadow-sm"
                            >
                              🤖 AI에게 자세히 묻기
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Study Tips */}
        <div className="mt-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            💡 실전연습 학습 팁
          </h3>
          <ul className="space-y-2 text-teal-50">
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>실제 계약서와 등기부등본을 직접 분석해보세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>세금 계산은 직접 손으로 계산하며 연습하세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>AI에게 다양한 사례 변형을 요청해 응용력을 키우세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span>
              <span>최신 법령 개정사항을 반드시 확인하세요</span>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/finance/real-estate-agent"
            className="px-6 py-3 bg-white border rounded-xl hover:bg-gray-50 transition font-medium"
          >
            ← 공인중개사 메인
          </Link>
          <Link
            href="/category/finance/real-estate-agent/exam"
            className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-medium"
          >
            시험 상세 →
          </Link>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 공인중개사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
