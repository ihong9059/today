'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ConstructionMaterialsStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-safety-materials-completed');
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
      localStorage.setItem('construction-safety-materials-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설안전기사 건설재료학 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 왜 이 답이 정답인지, 관련된 이론과 실무적용 사례도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 시멘트와 콘크리트",
      questions: [
        { id: 1, q: "포틀랜드 시멘트의 주요 화학성분이 아닌 것은?", a: "MgO(산화마그네슘) - 시멘트 주성분은 CaO, SiO2, Al2O3, Fe2O3이며 MgO는 유해성분" },
        { id: 2, q: "시멘트의 분말도가 높을수록 나타나는 현상은?", a: "초기 강도 증가, 수화열 증가, 수축 증가 - 분말도가 높으면 수화반응이 빠름" },
        { id: 3, q: "콘크리트의 워커빌리티에 영향을 주는 요인이 아닌 것은?", a: "양생온도 - 워커빌리티는 반죽질기, 골재, 시멘트량, 혼화제에 영향받음" },
        { id: 4, q: "콘크리트의 슬럼프 시험에서 슬럼프 값이 의미하는 것은?", a: "반죽질기(컨시스턴시) - 슬럼프는 콘크리트의 유동성과 연도를 나타냄" },
        { id: 5, q: "물-시멘트비(W/C)가 콘크리트 강도에 미치는 영향은?", a: "W/C가 낮을수록 강도 증가 - 물이 적으면 시멘트 페이스트 밀도가 높아져 강도 상승" },
        { id: 6, q: "콘크리트의 건조수축을 줄이는 방법이 아닌 것은?", a: "단위수량 증가 - 수축 감소를 위해서는 단위수량 감소, 굵은골재 사용 등이 필요" },
        { id: 7, q: "AE 콘크리트의 특징으로 옳지 않은 것은?", a: "압축강도 증가 - AE제는 동결융해 저항성, 워커빌리티 향상, 강도는 약간 감소" },
        { id: 8, q: "콘크리트의 크리프에 대한 설명으로 옳은 것은?", a: "지속하중 하에서 시간 경과에 따른 변형 증가 - 장기간 하중 작용시 변형이 계속 증가" },
        { id: 9, q: "레디믹스트 콘크리트의 운반시간 기준은?", a: "비비기 시작부터 90분 이내 - KS 기준으로 90분 초과시 품질 저하" },
        { id: 10, q: "콘크리트 배합설계 시 굵은골재 최대치수 결정 기준이 아닌 것은?", a: "시멘트 종류 - 최대치수는 부재 최소치수, 철근 간격, 피복두께에 의해 결정" }
      ]
    },
    {
      title: "2. 골재와 혼화재료",
      questions: [
        { id: 11, q: "골재의 입도가 양호하다는 것의 의미는?", a: "각 입도가 적절히 분포되어 공극률이 최소화됨 - 입도가 양호하면 시멘트량 절감" },
        { id: 12, q: "골재의 조립률(FM)이 큰 골재의 특성은?", a: "굵은 입자가 많음 - FM이 크면 골재가 굵고 작으면 잔골재 비율이 높음" },
        { id: 13, q: "잔골재의 유기불순물 시험에서 표준색보다 진하면?", a: "사용 불가 또는 모르타르 강도 시험 필요 - 유기불순물은 시멘트 경화 방해" },
        { id: 14, q: "골재의 단위용적중량이 작은 경우 의미하는 것은?", a: "공극이 많음, 입형이 불량 - 단위용적중량은 골재의 충전도를 나타냄" },
        { id: 15, q: "플라이애시를 혼화재로 사용할 때의 장점이 아닌 것은?", a: "초기 강도 증가 - 플라이애시는 장기강도 증가, 수화열 감소, 워커빌리티 향상" },
        { id: 16, q: "고로슬래그 미분말의 특성으로 옳지 않은 것은?", a: "알칼리-골재반응 촉진 - 고로슬래그는 알칼리-골재반응 억제 효과가 있음" },
        { id: 17, q: "실리카퓸을 사용한 콘크리트의 특성은?", a: "고강도, 내구성 향상 - 실리카퓸은 초미분으로 충전효과와 포졸란 반응" },
        { id: 18, q: "감수제의 사용 목적이 아닌 것은?", a: "공기량 증가 - 감수제는 단위수량 감소, 강도 증가, 워커빌리티 향상 목적" },
        { id: 19, q: "급결제를 사용하는 경우가 아닌 것은?", a: "매스콘크리트 시공 - 급결제는 긴급보수, 뿜어붙이기, 누수보수 등에 사용" },
        { id: 20, q: "골재의 흡수율이 시공에 미치는 영향은?", a: "배합수량 조정 필요 - 흡수율이 높으면 유효수량 감소로 배합수 보정 필요" }
      ]
    },
    {
      title: "3. 강재와 금속재료",
      questions: [
        { id: 21, q: "구조용 강재의 탄소함량이 증가하면 나타나는 성질은?", a: "인장강도 증가, 연신율 감소 - 탄소량 증가시 경도와 강도는 증가하나 연성은 감소" },
        { id: 22, q: "철근의 항복점 이후 변형이 계속되는 현상을 무엇이라 하는가?", a: "항복 현상(Yielding) - 항복점 도달 후 응력 증가 없이 변형만 증가하는 구간" },
        { id: 23, q: "철근 이음의 종류가 아닌 것은?", a: "볼트 이음 - 철근 이음은 겹침이음, 가스압접, 기계적 이음 등이 있음" },
        { id: 24, q: "강재의 용접부 결함이 아닌 것은?", a: "편석 - 용접결함은 기공, 슬래그 혼입, 언더컷, 오버랩, 균열 등" },
        { id: 25, q: "스테인리스강의 내식성이 우수한 이유는?", a: "크롬(Cr) 함유로 부동태 피막 형성 - Cr 10.5% 이상 함유시 내식성 발현" },
        { id: 26, q: "강재의 피로파괴에 대한 설명으로 옳은 것은?", a: "반복하중에 의해 항복강도 이하에서도 파괴 발생 - 피로한도 이하로 설계 필요" },
        { id: 27, q: "알루미늄의 특성으로 옳지 않은 것은?", a: "철보다 탄성계수가 큼 - 알루미늄 탄성계수는 약 70GPa로 철(200GPa)의 1/3" },
        { id: 28, q: "아연도금(galvanizing)의 방식 원리는?", a: "희생양극법 - 아연이 철보다 먼저 부식되어 철을 보호" },
        { id: 29, q: "고장력 볼트의 체결 원리는?", a: "마찰접합 - 볼트 축력에 의한 마찰력으로 응력 전달" },
        { id: 30, q: "강재의 인장시험에서 구할 수 없는 것은?", a: "피로한도 - 인장시험으로는 항복점, 인장강도, 연신율, 단면수축률 측정" }
      ]
    },
    {
      title: "4. 목재와 석재",
      questions: [
        { id: 31, q: "목재의 섬유포화점에 대한 설명으로 옳은 것은?", a: "세포벽만 수분으로 포화된 상태(함수율 약 30%) - 이 점 이하에서 수축팽창 발생" },
        { id: 32, q: "목재의 허용응력 결정시 고려사항이 아닌 것은?", a: "수종의 가격 - 허용응력은 강도, 결점, 함수율, 하중 지속시간 고려" },
        { id: 33, q: "합판의 특성으로 옳지 않은 것은?", a: "방향에 따른 강도 차이가 큼 - 합판은 교차 적층으로 이방성 감소" },
        { id: 34, q: "집성재의 장점이 아닌 것은?", a: "제작 비용 저렴 - 집성재는 대단면 제작 가능, 품질 균일, 변형 적음" },
        { id: 35, q: "목재의 건조 목적이 아닌 것은?", a: "무게 증가 - 건조는 수축 방지, 강도 증가, 부후 방지, 도장성 향상 목적" },
        { id: 36, q: "화강암의 특성으로 옳지 않은 것은?", a: "내화성이 우수함 - 화강암은 고온에서 석영의 팽창으로 균열 발생" },
        { id: 37, q: "대리석의 주성분은?", a: "�ite calcium carbonate(CaCO3) - 석회암의 변성암으로 탄산칼슘이 주성분" },
        { id: 38, q: "석재의 비중이 큰 경우 일반적으로 나타나는 성질은?", a: "압축강도가 높고 흡수율이 낮음 - 비중이 크면 조직이 치밀" },
        { id: 39, q: "인조석의 종류가 아닌 것은?", a: "점판암 - 인조석은 테라조, 인조대리석 등이 있고 점판암은 천연석" },
        { id: 40, q: "석재의 표면가공 중 가장 거친 것은?", a: "혹두기(쪼아내기) - 표면가공 순서: 혹두기 → 도드락 → 잔다듬 → 물갈기" }
      ]
    },
    {
      title: "5. 기타 건설재료",
      questions: [
        { id: 41, q: "아스팔트의 침입도가 큰 경우의 특성은?", a: "연질로 고온에서 유동성 큼 - 침입도가 크면 연하고 작으면 단단함" },
        { id: 42, q: "방수재료 중 시트계 방수가 아닌 것은?", a: "도막방수 - 시트계는 아스팔트 시트, 합성고무 시트, PVC 시트 등" },
        { id: 43, q: "유리의 특성으로 옳지 않은 것은?", a: "인장강도가 압축강도보다 큼 - 유리는 압축강도가 인장강도의 10배 이상" },
        { id: 44, q: "단열재의 성능 평가 항목이 아닌 것은?", a: "압축강도 - 단열재는 열전도율, 흡수성, 내화성, 사용온도 등으로 평가" },
        { id: 45, q: "플라스틱의 특성으로 옳지 않은 것은?", a: "내열성이 우수함 - 일반 플라스틱은 내열성이 낮아 고온에서 변형" },
        { id: 46, q: "실리콘 실란트의 특성이 아닌 것은?", a: "도장 가능 - 실리콘은 내후성, 탄성이 우수하나 도장이 잘 안됨" },
        { id: 47, q: "석고보드의 특성으로 옳지 않은 것은?", a: "내수성이 우수함 - 일반 석고보드는 물에 약해 욕실 등에 부적합" },
        { id: 48, q: "방화재료의 종류가 아닌 것은?", a: "아스팔트 - 방화재료는 콘크리트, 석재, 금속판, 석고보드 등" },
        { id: 49, q: "친환경 건설재료의 평가 기준이 아닌 것은?", a: "시공성 - 친환경 재료는 유해물질 방출, 재활용성, 자원소비량 등 평가" },
        { id: 50, q: "기능성 건설재료 중 광촉매 재료의 기능이 아닌 것은?", a: "단열 성능 향상 - 광촉매는 자정작용, 항균, 오염물질 분해 기능" }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/construction/construction-safety" className="text-amber-600 hover:text-amber-800 flex items-center gap-2">
            <span>←</span>
            <span>건설안전기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🧱</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">건설재료학</h1>
              <p className="text-gray-600">건설안전기사 필기 제3과목</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-300"
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
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
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
                          className="mt-1 w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{item.id}. {item.q}</p>
                          <p className="text-gray-600 text-sm bg-white p-3 rounded border">💡 {item.a}</p>
                          <button
                            onClick={() => openAIHelper(item.q, item.a)}
                            className="mt-2 text-sm text-amber-600 hover:text-amber-800 flex items-center gap-1"
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

        <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">📚 건설재료학 학습 팁</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 콘크리트 배합설계와 품질관리 문제가 자주 출제됩니다</li>
            <li>• 시멘트의 화학성분과 수화반응 원리를 이해하세요</li>
            <li>• 혼화재와 혼화제의 종류와 특성을 구분하여 암기하세요</li>
            <li>• 강재의 기계적 성질과 용접 결함에 대해 학습하세요</li>
            <li>• 각 재료의 장단점과 적용분야를 연결지어 학습하세요</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
                className="block w-full p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all"
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
