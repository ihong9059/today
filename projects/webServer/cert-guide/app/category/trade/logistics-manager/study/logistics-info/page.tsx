'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 물류정책기본법 (1-10)
  {
    id: 1,
    question: "물류정책기본법의 목적으로 적절하지 않은 것은?",
    options: ["물류체계 효율화", "물류산업 경쟁력 강화", "특정 기업 지원", "국민경제 발전"],
    answer: 2,
    explanation: "물류정책기본법은 물류체계 효율화와 물류산업 발전을 통한 국민경제 발전이 목적입니다."
  },
  {
    id: 2,
    question: "물류정책기본법에서 정의하는 '물류'의 범위가 아닌 것은?",
    options: ["운송", "보관", "제조", "하역"],
    answer: 2,
    explanation: "물류는 운송, 보관, 하역, 포장 등의 활동을 포함하며, 제조는 포함되지 않습니다."
  },
  {
    id: 3,
    question: "물류정책기본계획의 수립 주기는?",
    options: ["매년", "5년마다", "10년마다", "필요시"],
    answer: 2,
    explanation: "물류정책기본계획은 10년 단위로 수립됩니다."
  },
  {
    id: 4,
    question: "물류정책위원회의 소관 부처는?",
    options: ["기획재정부", "국토교통부", "산업통상자원부", "해양수산부"],
    answer: 1,
    explanation: "물류정책위원회는 국토교통부 장관 소속입니다."
  },
  {
    id: 5,
    question: "물류공동화의 법적 근거가 되는 법률은?",
    options: ["상법", "물류정책기본법", "민법", "형법"],
    answer: 1,
    explanation: "물류정책기본법에서 물류공동화 촉진에 관한 규정을 두고 있습니다."
  },
  {
    id: 6,
    question: "물류표준화의 대상이 아닌 것은?",
    options: ["파렛트", "컨테이너", "직원 유니폼", "물류정보"],
    answer: 2,
    explanation: "물류표준화 대상은 파렛트, 컨테이너, 물류정보 등입니다."
  },
  {
    id: 7,
    question: "우수물류기업 인증제도의 목적은?",
    options: ["과세 강화", "물류서비스 수준 향상", "기업 규제", "수입 제한"],
    answer: 1,
    explanation: "우수물류기업 인증은 물류서비스 수준 향상과 물류산업 발전을 위한 제도입니다."
  },
  {
    id: 8,
    question: "녹색물류 관련 규정이 포함된 법률은?",
    options: ["물류정책기본법", "도로교통법", "건축법", "소방법"],
    answer: 0,
    explanation: "물류정책기본법에 녹색물류 촉진에 관한 규정이 있습니다."
  },
  {
    id: 9,
    question: "물류시설개발종합계획의 수립 주체는?",
    options: ["시·도지사", "국토교통부 장관", "기획재정부 장관", "시장·군수"],
    answer: 1,
    explanation: "물류시설개발종합계획은 국토교통부 장관이 수립합니다."
  },
  {
    id: 10,
    question: "물류정책기본법상 물류사업의 종류가 아닌 것은?",
    options: ["화물운송업", "물류시설운영업", "제조업", "물류서비스업"],
    answer: 2,
    explanation: "물류정책기본법상 물류사업은 화물운송업, 물류시설운영업, 물류서비스업 등입니다."
  },
  // 화물자동차운수사업법 (11-20)
  {
    id: 11,
    question: "화물자동차운수사업의 종류가 아닌 것은?",
    options: ["일반화물자동차운송사업", "개별화물자동차운송사업", "용달화물자동차운송사업", "여객자동차운송사업"],
    answer: 3,
    explanation: "여객운송은 화물자동차운수사업에 포함되지 않습니다."
  },
  {
    id: 12,
    question: "화물자동차운송사업 허가 기관은?",
    options: ["시·도지사", "국토교통부 장관", "경찰청장", "시장·군수"],
    answer: 0,
    explanation: "화물자동차운송사업 허가는 시·도지사가 합니다."
  },
  {
    id: 13,
    question: "화물자동차 운전자격의 취득 요건이 아닌 것은?",
    options: ["운전면허 보유", "교육 이수", "대학 졸업", "적성검사 합격"],
    answer: 2,
    explanation: "화물운송자격은 운전면허, 교육 이수, 적성검사 등이 요건입니다."
  },
  {
    id: 14,
    question: "화물자동차 운송사업 허가의 결격사유가 아닌 것은?",
    options: ["미성년자", "파산자로 복권되지 않은 자", "성인", "금고 이상 실형 후 2년 미경과자"],
    answer: 2,
    explanation: "미성년자, 파산 미복권자, 실형 후 2년 미경과자 등이 결격사유입니다."
  },
  {
    id: 15,
    question: "화물자동차운수사업법상 과적의 기준은?",
    options: ["구조 및 도로 안전에 지장을 주는 적재", "적재 중량이 적은 경우", "적재 용적이 적은 경우", "빈 차량"],
    answer: 0,
    explanation: "과적은 차량 구조나 도로 안전에 지장을 주는 과다 적재입니다."
  },
  {
    id: 16,
    question: "화물자동차 운송주선업의 역할은?",
    options: ["직접 운송", "운송 주선", "차량 제조", "도로 건설"],
    answer: 1,
    explanation: "운송주선업은 화주와 운송인 사이에서 운송을 주선합니다."
  },
  {
    id: 17,
    question: "화물자동차 운송가맹사업의 특징은?",
    options: ["개인 운영만 가능", "가맹점 형태 운영", "무허가 운영", "화물 제조"],
    answer: 1,
    explanation: "운송가맹사업은 가맹본부와 가맹점 형태로 운영하는 사업입니다."
  },
  {
    id: 18,
    question: "화물자동차 안전운임제의 목적은?",
    options: ["운임 인상", "운수종사자 과로 방지 및 안전 확보", "기업 이익 증가", "차량 감축"],
    answer: 1,
    explanation: "안전운임제는 적정 운임 보장으로 과로 방지와 안전을 확보합니다."
  },
  {
    id: 19,
    question: "화물자동차 운전자의 근로시간 기준은?",
    options: ["제한 없음", "1일 11시간 이내", "1일 24시간", "1일 5시간"],
    answer: 1,
    explanation: "화물차 운전자의 1일 운전시간은 원칙적으로 11시간 이내입니다."
  },
  {
    id: 20,
    question: "화물자동차운수사업법 위반 시 제재가 아닌 것은?",
    options: ["허가 취소", "사업 정지", "포상", "과징금"],
    answer: 2,
    explanation: "위반 시 제재는 허가 취소, 사업 정지, 과징금 등입니다."
  },
  // 물류시설 관련 법규 (21-30)
  {
    id: 21,
    question: "물류시설의 개발 및 운영에 관한 법률의 적용 대상이 아닌 것은?",
    options: ["물류터미널", "물류단지", "일반 주택", "창고"],
    answer: 2,
    explanation: "물류시설법은 물류터미널, 물류단지, 창고 등에 적용됩니다."
  },
  {
    id: 22,
    question: "물류단지 지정 기관은?",
    options: ["시장·군수", "국토교통부 장관 또는 시·도지사", "경찰청장", "소방청장"],
    answer: 1,
    explanation: "물류단지는 국토교통부 장관 또는 시·도지사가 지정합니다."
  },
  {
    id: 23,
    question: "물류터미널의 기능이 아닌 것은?",
    options: ["화물 집하", "화물 분류", "화물 제조", "화물 배송"],
    answer: 2,
    explanation: "물류터미널은 화물의 집하, 분류, 배송 기능을 수행합니다."
  },
  {
    id: 24,
    question: "영업용 창고업 등록 기관은?",
    options: ["시장·군수·구청장", "국토교통부 장관", "해양수산부 장관", "경찰청장"],
    answer: 0,
    explanation: "영업용 창고업은 시장·군수·구청장에게 등록합니다."
  },
  {
    id: 25,
    question: "물류창고의 종류가 아닌 것은?",
    options: ["일반창고", "냉동창고", "위험물창고", "주거용 건물"],
    answer: 3,
    explanation: "물류창고는 일반, 냉동, 위험물 창고 등으로 구분됩니다."
  },
  {
    id: 26,
    question: "물류단지 개발사업 시행자가 될 수 있는 자가 아닌 것은?",
    options: ["국가", "지방자치단체", "개인 소비자", "물류법인"],
    answer: 2,
    explanation: "물류단지 개발은 국가, 지자체, 물류법인 등이 시행할 수 있습니다."
  },
  {
    id: 27,
    question: "유통산업발전법상 대규모점포의 기준은?",
    options: ["100㎡ 이상", "1,000㎡ 이상", "3,000㎡ 이상", "10,000㎡ 이상"],
    answer: 2,
    explanation: "대규모점포는 매장면적 3,000㎡ 이상인 점포입니다."
  },
  {
    id: 28,
    question: "물류단지 입주 기업에 대한 지원이 아닌 것은?",
    options: ["세제 감면", "금융 지원", "무료 토지 제공", "행정 지원"],
    answer: 2,
    explanation: "물류단지 입주 기업에는 세제, 금융, 행정 지원 등이 있습니다."
  },
  {
    id: 29,
    question: "물류시설 안전점검의 목적은?",
    options: ["비용 증가", "안전사고 예방", "규제 강화만", "영업 방해"],
    answer: 1,
    explanation: "안전점검은 물류시설의 안전사고를 예방하기 위해 실시합니다."
  },
  {
    id: 30,
    question: "물류시설 환경규제 관련 법률이 아닌 것은?",
    options: ["환경영향평가법", "대기환경보전법", "부동산등기법", "수질환경보전법"],
    answer: 2,
    explanation: "물류시설 환경규제는 환경영향평가법, 대기·수질환경보전법 등이 관련됩니다."
  },
  // 해운·항만 관련 법규 (31-40)
  {
    id: 31,
    question: "해운법의 적용 대상이 아닌 것은?",
    options: ["해상여객운송", "해상화물운송", "육상운송", "선박대여업"],
    answer: 2,
    explanation: "해운법은 해상여객·화물운송, 선박대여업 등에 적용됩니다."
  },
  {
    id: 32,
    question: "내항화물운송사업의 등록 기관은?",
    options: ["국토교통부 장관", "해양수산부 장관", "시·도지사", "시장·군수"],
    answer: 1,
    explanation: "내항화물운송사업은 해양수산부 장관에게 등록합니다."
  },
  {
    id: 33,
    question: "항만법의 주요 내용이 아닌 것은?",
    options: ["항만 개발", "항만 관리", "항공기 운항", "항만시설 사용"],
    answer: 2,
    explanation: "항만법은 항만 개발, 관리, 시설 사용 등에 관한 법률입니다."
  },
  {
    id: 34,
    question: "항만하역사업의 등록 기관은?",
    options: ["국토교통부 장관", "해양수산부 장관", "시·도지사", "경찰청장"],
    answer: 1,
    explanation: "항만하역사업은 해양수산부 장관에게 등록합니다."
  },
  {
    id: 35,
    question: "항만공사법에 의해 설립된 항만공사가 아닌 것은?",
    options: ["부산항만공사", "인천항만공사", "서울항만공사", "울산항만공사"],
    answer: 2,
    explanation: "부산, 인천, 울산 등에 항만공사가 설립되어 있습니다."
  },
  {
    id: 36,
    question: "선박법상 선박 등록의 효력은?",
    options: ["소유권 변동 없음", "소유권 취득 및 변동", "임대권만 발생", "운항 금지"],
    answer: 1,
    explanation: "선박 등록은 소유권 취득과 변동의 효력이 발생합니다."
  },
  {
    id: 37,
    question: "해운조합의 역할이 아닌 것은?",
    options: ["회원사 지원", "해운업 발전", "경쟁 유도", "공동사업"],
    answer: 2,
    explanation: "해운조합은 회원사 지원, 해운업 발전, 공동사업 등의 역할을 합니다."
  },
  {
    id: 38,
    question: "국제물류주선업의 등록 기관은?",
    options: ["국토교통부 장관", "해양수산부 장관", "시·도지사", "외교부 장관"],
    answer: 1,
    explanation: "국제물류주선업은 해양수산부 장관에게 등록합니다."
  },
  {
    id: 39,
    question: "항만시설 사용료의 부과 기관은?",
    options: ["항만공사 또는 관리청", "경찰청", "소방청", "국세청"],
    answer: 0,
    explanation: "항만시설 사용료는 항만공사 또는 관리청이 부과합니다."
  },
  {
    id: 40,
    question: "해운법상 해상운송계약의 당사자가 아닌 것은?",
    options: ["운송인", "송하인", "수하인", "도로교통 단속원"],
    answer: 3,
    explanation: "해상운송계약 당사자는 운송인, 송하인, 수하인입니다."
  },
  // 기타 물류 관련 법규 (41-50)
  {
    id: 41,
    question: "항공화물운송사업의 허가 기관은?",
    options: ["국토교통부 장관", "해양수산부 장관", "시·도지사", "외교부 장관"],
    answer: 0,
    explanation: "항공화물운송사업은 국토교통부 장관의 허가를 받습니다."
  },
  {
    id: 42,
    question: "관세법상 보세구역의 종류가 아닌 것은?",
    options: ["지정보세구역", "특허보세구역", "종합보세구역", "일반상업구역"],
    answer: 3,
    explanation: "보세구역은 지정, 특허, 종합보세구역 등으로 구분됩니다."
  },
  {
    id: 43,
    question: "AEO 인증의 혜택이 아닌 것은?",
    options: ["통관 간소화", "검사 축소", "관세 면제", "우선 통관"],
    answer: 2,
    explanation: "AEO 인증 혜택은 통관 간소화, 검사 축소, 우선 통관 등입니다."
  },
  {
    id: 44,
    question: "자유무역지역의 지정 목적이 아닌 것은?",
    options: ["외국인 투자 유치", "무역 진흥", "국내 기업 규제", "물류 촉진"],
    answer: 2,
    explanation: "자유무역지역은 외국인 투자, 무역·물류 촉진이 목적입니다."
  },
  {
    id: 45,
    question: "철도물류사업의 등록 기관은?",
    options: ["국토교통부 장관", "해양수산부 장관", "시·도지사", "철도청장"],
    answer: 0,
    explanation: "철도물류사업은 국토교통부 장관에게 등록합니다."
  },
  {
    id: 46,
    question: "위험물안전관리법의 적용 대상은?",
    options: ["일반 화물", "위험물의 저장·취급·운반", "일반 주택", "사무실"],
    answer: 1,
    explanation: "위험물안전관리법은 위험물의 저장, 취급, 운반에 적용됩니다."
  },
  {
    id: 47,
    question: "전자상거래법이 물류에 미치는 영향이 아닌 것은?",
    options: ["택배 물동량 증가", "소비자 보호 강화", "오프라인 매장만 규제", "반품 처리 규정"],
    answer: 2,
    explanation: "전자상거래법은 온라인 거래와 관련된 물류에 영향을 미칩니다."
  },
  {
    id: 48,
    question: "도로법상 차량 통행료 부과 대상은?",
    options: ["모든 도로", "유료도로", "인도", "자전거 도로"],
    answer: 1,
    explanation: "차량 통행료는 유료도로에서 부과됩니다."
  },
  {
    id: 49,
    question: "물류정보시스템 구축의 법적 근거는?",
    options: ["물류정책기본법", "상법", "민법", "형법"],
    answer: 0,
    explanation: "물류정책기본법에 물류정보화 촉진에 관한 규정이 있습니다."
  },
  {
    id: 50,
    question: "물류 관련 분쟁 해결 기관은?",
    options: ["경찰서", "물류분쟁조정위원회", "소방서", "세무서"],
    answer: 1,
    explanation: "물류 관련 분쟁은 물류분쟁조정위원회에서 조정할 수 있습니다."
  }
];

export default function LogisticsInfoPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState<{[key: number]: boolean}>({});
  const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('logistics-manager-info-answers');
    if (saved) setSelectedAnswers(JSON.parse(saved));
    const savedResults = localStorage.getItem('logistics-manager-info-results');
    if (savedResults) setShowResults(JSON.parse(savedResults));
  }, []);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(newAnswers);
    localStorage.setItem('logistics-manager-info-answers', JSON.stringify(newAnswers));
    const newResults = { ...showResults, [questionId]: true };
    setShowResults(newResults);
    localStorage.setItem('logistics-manager-info-results', JSON.stringify(newResults));
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const openAIModal = (question: Question) => {
    const prompt = `물류관리사 물류관련법규 문제입니다:\n\n문제: ${question.question}\n\n보기:\n${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})\n해설: ${question.explanation}\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진도를 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      setExpandedQuestions({});
      localStorage.removeItem('logistics-manager-info-answers');
      localStorage.removeItem('logistics-manager-info-results');
    }
  };

  const getCorrectCount = () => {
    return Object.entries(selectedAnswers).filter(([qId, answer]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      return question && question.answer === answer;
    }).length;
  };

  const topics = [
    { name: "물류정책기본법", range: [1, 10] },
    { name: "화물자동차운수사업법", range: [11, 20] },
    { name: "물류시설 관련 법규", range: [21, 30] },
    { name: "해운·항만 관련 법규", range: [31, 40] },
    { name: "기타 물류 관련 법규", range: [41, 50] }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/category/trade/logistics-manager" className="text-indigo-200 hover:text-white transition">← 물류관리사</Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">⚖️ 물류관련법규</h1>
          <p className="text-indigo-100">물류관리사 5과목 핵심 문제</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">학습 진도</h2>
            <button onClick={resetProgress} className="text-sm text-red-500 hover:text-red-700 transition">초기화</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }} />
            </div>
            <span className="text-lg font-semibold text-gray-700">{Object.keys(selectedAnswers).length}/{questions.length}</span>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            정답률: {Object.keys(selectedAnswers).length > 0 ? Math.round((getCorrectCount() / Object.keys(selectedAnswers).length) * 100) : 0}% ({getCorrectCount()}/{Object.keys(selectedAnswers).length})
          </div>
        </div>

        {topics.map((topic, topicIndex) => (
          <div key={topicIndex} className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm">{topicIndex + 1}</span>
              {topic.name}
            </h3>
            <div className="space-y-3">
              {questions.filter(q => q.id >= topic.range[0] && q.id <= topic.range[1]).map((question) => (
                <div key={question.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button onClick={() => toggleQuestion(question.id)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${showResults[question.id] ? selectedAnswers[question.id] === question.answer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{question.id}</span>
                      <span className="font-medium text-gray-800">{question.question}</span>
                    </div>
                    <span className={`transform transition-transform ${expandedQuestions[question.id] ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedQuestions[question.id] && (
                    <div className="px-6 pb-4 border-t">
                      <div className="mt-4 space-y-2">
                        {question.options.map((option, idx) => (
                          <button key={idx} onClick={() => handleAnswerSelect(question.id, idx)} className={`w-full p-3 rounded-lg text-left transition flex items-center gap-3 ${showResults[question.id] ? idx === question.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswers[question.id] === idx ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : selectedAnswers[question.id] === idx ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-gray-50 hover:bg-gray-100'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${showResults[question.id] ? idx === question.answer ? 'bg-green-500 text-white' : selectedAnswers[question.id] === idx ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600' : selectedAnswers[question.id] === idx ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>{idx + 1}</span>
                            {option}
                          </button>
                        ))}
                      </div>
                      {showResults[question.id] && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800"><strong>해설:</strong> {question.explanation}</p>
                          <button onClick={() => openAIModal(question)} className="mt-3 text-sm bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition">🤖 AI에게 질문하기</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 text-center">
          <Link href="/category/trade/logistics-manager" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-700 hover:to-blue-700 transition shadow-lg">← 물류관리사 메인으로</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">✕</button>
              </div>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
                  <div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-500">Anthropic의 AI</div></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition border border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-500">OpenAI의 AI</div></div>
                </a>
                <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">G</div>
                  <div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-500">Google의 AI</div></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
