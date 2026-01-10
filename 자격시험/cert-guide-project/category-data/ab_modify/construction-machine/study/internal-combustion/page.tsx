'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InternalCombustionStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-machine-engine-completed');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => {
      const newCompleted = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('construction-machine-engine-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설기계기사 건설기계기관 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 왜 이 답이 정답인지, 관련된 이론과 실무적용도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 디젤기관의 기초",
      questions: [
        { id: 1, q: "4행정 디젤기관의 작동 순서로 옳은 것은?", a: "흡입 → 압축 → 폭발(팽창) → 배기 - 크랭크축 2회전(720°)에 1사이클 완성" },
        { id: 2, q: "디젤기관의 압축비가 가솔린기관보다 높은 이유는?", a: "자기착화 방식으로 고압축에 의한 고온으로 연료를 착화시키기 때문 (압축비 15~22:1)" },
        { id: 3, q: "디젤기관의 열효율이 가솔린기관보다 높은 이유는?", a: "높은 압축비와 희박연소가 가능하기 때문 - 디젤 30~40%, 가솔린 25~30%" },
        { id: 4, q: "디젤기관에서 압축착화에 필요한 온도는?", a: "약 500~600°C - 압축비 15~22:1로 압축 시 공기온도 상승" },
        { id: 5, q: "연소실 체적과 행정체적의 합을 무엇이라 하는가?", a: "총 배기량(총 행정체적) - 압축비 = 총체적 / 연소실체적" },
        { id: 6, q: "디젤기관의 노킹 원인은?", a: "착화지연 기간이 길어 다량의 연료가 한꺼번에 연소하기 때문 - 세탄가 낮은 연료 사용시 발생" },
        { id: 7, q: "디젤기관의 세탄가(Cetane Number)가 높으면 어떤 특성이 있는가?", a: "착화성이 좋아 착화지연이 짧고 연소가 부드러움 - 디젤 세탄가 45~55" },
        { id: 8, q: "기관의 평균유효압력(BMEP)이란?", a: "실린더 내 작용하는 평균압력으로 기관 성능 비교 지표 - 출력 = BMEP × 행정체적 × N / 2" },
        { id: 9, q: "디젤기관에서 공기과잉률이 높으면 나타나는 현상은?", a: "연소효율 향상, NOx 증가, 출력 감소 - 이론공연비보다 공기량이 많음" },
        { id: 10, q: "디젤기관의 지시마력(IHP)과 제동마력(BHP)의 관계는?", a: "BHP = IHP - 마찰마력(FHP), 기계효율 = BHP/IHP × 100" }
      ]
    },
    {
      title: "2. 연료분사장치",
      questions: [
        { id: 11, q: "디젤기관 연료분사펌프의 종류가 아닌 것은?", a: "기화기식 - 분사펌프는 보쉬형(열형), 분배형, 커먼레일형이 있음" },
        { id: 12, q: "보쉬형 분사펌프의 연료량 조절 방법은?", a: "플런저의 유효행정을 콘트롤 슬리브로 조절 - 경사면(헬릭스)에 의해 조절" },
        { id: 13, q: "분배형 분사펌프의 특징으로 옳은 것은?", a: "소형·경량, 1개의 플런저로 다기통 분사, 건설기계 소형엔진에 사용" },
        { id: 14, q: "커먼레일 분사시스템의 장점이 아닌 것은?", a: "구조가 단순함 - 커먼레일은 고압연료 축적, 정밀제어 가능하나 구조 복잡" },
        { id: 15, q: "분사노즐의 종류 중 건설기계에 주로 사용되는 것은?", a: "다공형(홀형) 노즐 - 직접분사식에 사용, 분무특성 우수" },
        { id: 16, q: "핀틀형 노즐의 특징은?", a: "예연소실식에 사용, 중앙에 핀이 있어 연료분무가 원추형" },
        { id: 17, q: "분사노즐의 개변압력이 낮으면 어떤 현상이 발생하는가?", a: "분무상태 불량, 출력 저하, 배기가스 색 불량 - 정상 150~250 kgf/cm²" },
        { id: 18, q: "분사시기가 너무 빠르면 발생하는 현상은?", a: "디젤 노킹, 최고압력 상승, 기관 소음 증가, 시동 불량" },
        { id: 19, q: "분사시기가 너무 늦으면 발생하는 현상은?", a: "출력 저하, 연료소비 증가, 배기가스 과다, 후연소 증가" },
        { id: 20, q: "가버너의 역할로 옳지 않은 것은?", a: "연료분사압력 조절 - 가버너는 기관 회전수에 따라 연료량 조절" }
      ]
    },
    {
      title: "3. 과급기와 배기시스템",
      questions: [
        { id: 21, q: "터보차저의 구동 방식은?", a: "배기가스 에너지로 터빈을 회전시켜 압축기 구동 - 폐열 회수 효율적" },
        { id: 22, q: "과급기를 사용하는 주목적은?", a: "단위 배기량당 출력 증가 - 흡입공기량 증대로 연료량 증가 가능" },
        { id: 23, q: "터보차저의 서지(Surge) 현상이란?", a: "압축기에서 역류가 발생하여 진동과 소음이 발생하는 현상 - 저부하 고회전시" },
        { id: 24, q: "인터쿨러(Intercooler)의 역할은?", a: "과급 공기를 냉각하여 밀도 증가, 충전효율 향상 - 노킹 방지 효과" },
        { id: 25, q: "웨이스트 게이트(Waste Gate)의 기능은?", a: "과급압력 조절을 위해 배기가스 일부를 바이패스 - 과과급 방지" },
        { id: 26, q: "터보래그(Turbo Lag)란?", a: "가속 시 터보차저 응답 지연 현상 - 배기가스 양이 충분해질 때까지 지연" },
        { id: 27, q: "배기 다기관의 역할로 옳지 않은 것은?", a: "흡기 온도 조절 - 배기 다기관은 배기가스 수집 및 배출 경로" },
        { id: 28, q: "DPF(디젤 미립자 필터)의 기능은?", a: "배기가스 중 PM(입자상 물질) 포집 및 정화 - 환경규제 대응" },
        { id: 29, q: "EGR 시스템의 목적은?", a: "배기가스 재순환으로 연소온도 낮춰 NOx 저감 - 최대 30% 재순환" },
        { id: 30, q: "SCR 시스템에서 사용되는 환원제는?", a: "요소수(Urea) - 암모니아로 분해되어 NOx를 N2와 H2O로 환원" }
      ]
    },
    {
      title: "4. 냉각·윤활장치",
      questions: [
        { id: 31, q: "수냉식 냉각장치의 구성품이 아닌 것은?", a: "오일쿨러 - 수냉식은 라디에이터, 워터펌프, 서모스탯, 냉각팬으로 구성" },
        { id: 32, q: "서모스탯의 역할은?", a: "냉각수 온도에 따라 라디에이터로의 흐름 조절 - 워밍업 촉진, 과열 방지" },
        { id: 33, q: "압력식 라디에이터 캡의 장점은?", a: "냉각수 비등점 상승으로 냉각효율 향상 - 압력 0.9kgf/cm²당 약 3°C 상승" },
        { id: 34, q: "부동액의 주성분은?", a: "에틸렌글리콜 - 어는점 강하, 비등점 상승, 방청 효과" },
        { id: 35, q: "윤활유의 점도지수가 높으면 어떤 의미인가?", a: "온도 변화에 따른 점도 변화가 적음 - 점도지수 높을수록 우수" },
        { id: 36, q: "크랭크케이스 환기장치(PCV)의 목적은?", a: "블로바이 가스 재연소로 대기오염 방지 및 오일 오염 방지" },
        { id: 37, q: "윤활유 압력이 낮아지는 원인이 아닌 것은?", a: "오일 점도가 높음 - 압력저하 원인: 오일부족, 펌프마모, 베어링 마모" },
        { id: 38, q: "전류식 윤활방식의 특징은?", a: "오일이 베어링을 한번 통과 후 버려짐 - 2행정 기관에 사용" },
        { id: 39, q: "오일필터의 바이패스 밸브가 열리는 경우는?", a: "필터 엘리먼트가 막혔을 때 - 오일 공급 중단 방지" },
        { id: 40, q: "기관 오일의 교환 주기에 영향을 주는 요인이 아닌 것은?", a: "연료 종류 - 교환주기: 사용시간, 작업환경, 오일종류에 따라 결정" }
      ]
    },
    {
      title: "5. 기관 정비·고장진단",
      questions: [
        { id: 41, q: "디젤기관에서 흰 연기가 나는 원인은?", a: "불완전연소(냉간시), 수분 혼입, 분사시기 지연 - 미연소 연료 배출" },
        { id: 42, q: "디젤기관에서 검은 연기가 나는 원인은?", a: "공기부족, 노즐막힘, 과부하운전 - 불완전연소에 의한 탄소 배출" },
        { id: 43, q: "기관 과열의 원인이 아닌 것은?", a: "냉각수 과다 - 과열원인: 냉각수부족, 팬벨트 느슨, 서모스탯 고장" },
        { id: 44, q: "기관 출력 저하의 원인이 아닌 것은?", a: "연료필터 신품 - 출력저하: 노즐막힘, 공기필터 막힘, 밸브간극 불량" },
        { id: 45, q: "압축압력 측정 시 정상값은?", a: "25~35 kgf/cm² - 표준값의 75% 이하면 불량" },
        { id: 46, q: "밸브간극이 클 때 나타나는 현상은?", a: "밸브 개폐시기 지연, 소음 발생, 체적효율 저하" },
        { id: 47, q: "밸브간극이 작을 때 나타나는 현상은?", a: "밸브 닫힘 불량, 압축압력 저하, 밸브 손상 우려" },
        { id: 48, q: "실린더 헤드 변형 측정에 사용하는 공구는?", a: "직선자와 필러게이지 - 평면도 측정, 변형량 0.05mm 이하 정상" },
        { id: 49, q: "피스톤링 엔드갭의 역할은?", a: "열팽창에 의한 간섭 방지 - 간극이 작으면 소착, 크면 블로바이 증가" },
        { id: 50, q: "크랭크축 저널의 마모 측정에 사용하는 공구는?", a: "외측 마이크로미터 - 타원도, 테이퍼도 측정" }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/construction/construction-machine" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>건설기계기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔧</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">건설기계기관</h1>
              <p className="text-gray-600">건설기계기사 필기 제1과목</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{completedQuestions.length}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all"
              >
                <span className="font-semibold">{topic.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions.includes(item.id) ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(item.id)}
                          onChange={() => toggleQuestion(item.id)}
                          className="mt-1 w-5 h-5 text-yellow-500 rounded focus:ring-yellow-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{item.id}. {item.q}</p>
                          <p className="text-gray-600 text-sm bg-white p-3 rounded border">💡 {item.a}</p>
                          <button
                            onClick={() => openAIHelper(item.q, item.a)}
                            className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
                          >
                            <span>🤖</span>
                            <span>AI에게 더 자세히 물어보기</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">📚 건설기계기관 학습 팁</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 4행정 디젤기관의 작동 원리와 열역학적 사이클을 이해하세요</li>
            <li>• 연료분사장치의 종류별 특성과 작동원리를 비교 학습하세요</li>
            <li>• 과급기 관련 문제가 자주 출제되니 터보차저 구조를 숙지하세요</li>
            <li>• 고장진단 문제는 증상과 원인을 연결지어 암기하세요</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 학습 도우미</h3>
            <p className="text-gray-600 mb-4">아래 AI 서비스를 선택하여 더 자세한 설명을 받아보세요:</p>

            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <div className="font-bold">Claude</div>
                    <div className="text-sm opacity-90">Anthropic의 AI 어시스턴트</div>
                  </div>
                </div>
              </a>

              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-bold">ChatGPT</div>
                    <div className="text-sm opacity-90">OpenAI의 대화형 AI</div>
                  </div>
                </div>
              </a>

              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="font-bold">Gemini</div>
                    <div className="text-sm opacity-90">Google의 AI 어시스턴트</div>
                  </div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full p-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
