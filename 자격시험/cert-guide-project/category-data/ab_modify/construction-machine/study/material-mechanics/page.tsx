'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MaterialMechanicsStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-machine-materials-completed');
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
      localStorage.setItem('construction-machine-materials-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설기계기사 재료역학 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 공식 유도과정과 계산 예시도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 응력과 변형률",
      questions: [
        { id: 1, q: "인장응력(σ)의 계산식은?", a: "σ = P/A [Pa 또는 N/m²] (P: 하중, A: 단면적)" },
        { id: 2, q: "전단응력(τ)의 계산식은?", a: "τ = P/A [Pa] - 단면에 평행하게 작용하는 응력" },
        { id: 3, q: "변형률(ε)의 정의는?", a: "ε = ΔL/L (무차원) - 원래 길이 대비 변형량의 비" },
        { id: 4, q: "훅의 법칙(Hooke's Law)이란?", a: "σ = E × ε - 비례한도 내에서 응력은 변형률에 비례 (E: 탄성계수)" },
        { id: 5, q: "탄성계수(E)의 단위는?", a: "Pa (N/m²) 또는 GPa - 강의 E ≈ 200~210 GPa" },
        { id: 6, q: "푸아송비(ν)의 정의는?", a: "ν = -εy/εx = 횡변형률/종변형률 - 강재 약 0.3" },
        { id: 7, q: "전단탄성계수(G)와 탄성계수(E)의 관계는?", a: "G = E/2(1+ν) - 푸아송비로 연결" },
        { id: 8, q: "체적변형률의 계산식은?", a: "Δv/v = εx + εy + εz - 3방향 변형률의 합" },
        { id: 9, q: "열응력(σt)의 계산식은?", a: "σt = E × α × ΔT (α: 선팽창계수, ΔT: 온도변화)" },
        { id: 10, q: "안전계수(S)의 정의는?", a: "S = 기준강도/허용응력 - 항복강도 또는 극한강도 기준" }
      ]
    },
    {
      title: "2. 보의 응력",
      questions: [
        { id: 11, q: "굽힘응력(σb)의 계산식은?", a: "σb = My/I = M/Z (M: 굽힘모멘트, I: 단면2차모멘트, Z: 단면계수)" },
        { id: 12, q: "중립축(Neutral Axis)이란?", a: "굽힘 시 응력이 0인 축 - 인장과 압축의 경계선" },
        { id: 13, q: "단면2차모멘트(I)의 의미는?", a: "굽힘에 대한 단면의 저항 크기 - 클수록 변형 적음" },
        { id: 14, q: "직사각형 단면의 I 계산식은?", a: "I = bh³/12 (b: 폭, h: 높이) - 중립축 기준" },
        { id: 15, q: "원형 단면의 I 계산식은?", a: "I = πd⁴/64 (d: 직경)" },
        { id: 16, q: "단면계수(Z)의 계산식은?", a: "Z = I/y (y: 중립축에서 최외곽까지 거리)" },
        { id: 17, q: "전단응력 분포에서 최대값 위치는?", a: "중립축 위치 - 직사각형 단면 τmax = 3V/2A" },
        { id: 18, q: "보의 처짐(δ)에 영향을 주는 요소가 아닌 것은?", a: "전단력 - 처짐: 하중, 스팬, 탄성계수, 단면2차모멘트에 영향" },
        { id: 19, q: "양단 단순지지 보의 중앙집중하중 시 최대처짐은?", a: "δmax = PL³/48EI - 중앙 위치에서 발생" },
        { id: 20, q: "캔틸레버 보 자유단 집중하중 시 최대처짐은?", a: "δmax = PL³/3EI - 자유단에서 발생" }
      ]
    },
    {
      title: "3. 비틀림",
      questions: [
        { id: 21, q: "비틀림응력(τ)의 계산식은?", a: "τ = Tr/Ip = T/Zp (T: 토크, r: 반지름, Ip: 극관성모멘트)" },
        { id: 22, q: "원형축의 극관성모멘트(Ip) 계산식은?", a: "Ip = πd⁴/32 (중실축), Ip = π(D⁴-d⁴)/32 (중공축)" },
        { id: 23, q: "비틀림각(θ)의 계산식은?", a: "θ = TL/GIp (L: 축 길이, G: 전단탄성계수)" },
        { id: 24, q: "전달동력(P)과 토크(T)의 관계는?", a: "P = 2πNT/60 [W] (N: rpm)" },
        { id: 25, q: "축의 직경 결정 시 고려사항이 아닌 것은?", a: "축의 색상 - 고려사항: 강도, 강성, 피로, 진동" },
        { id: 26, q: "중공축이 중실축보다 유리한 이유는?", a: "동일 강도에서 경량화 가능 - 중심부는 응력 작음" },
        { id: 27, q: "키(Key)의 역할은?", a: "축과 보스 사이 토크 전달 - 전단과 압축응력 작용" },
        { id: 28, q: "스플라인의 장점은?", a: "큰 토크 전달, 축방향 이동 가능 - 다수의 키 역할" },
        { id: 29, q: "커플링의 종류가 아닌 것은?", a: "베어링 - 커플링: 플랜지형, 올덤, 유니버설, 플렉시블" },
        { id: 30, q: "축의 위험속도란?", a: "축의 고유진동수와 회전수가 일치하는 속도 - 공진 발생" }
      ]
    },
    {
      title: "4. 기둥과 좌굴",
      questions: [
        { id: 31, q: "오일러 좌굴공식은?", a: "Pcr = π²EI/(Le)² - Le: 유효길이, 장주에 적용" },
        { id: 32, q: "세장비(λ)의 정의는?", a: "λ = Le/k (Le: 유효길이, k: 회전반경) - k = √(I/A)" },
        { id: 33, q: "세장비가 클수록 기둥의 특성은?", a: "좌굴에 취약 - 장주, 오일러 공식 적용" },
        { id: 34, q: "양단 고정 기둥의 유효길이 계수는?", a: "0.5 - 유효길이 Le = 0.5L" },
        { id: 35, q: "양단 핀 기둥의 유효길이 계수는?", a: "1.0 - 유효길이 Le = L" },
        { id: 36, q: "일단 고정-타단 자유 기둥의 유효길이 계수는?", a: "2.0 - 유효길이 Le = 2L (캔틸레버)" },
        { id: 37, q: "일단 고정-타단 핀 기둥의 유효길이 계수는?", a: "0.7 - 유효길이 Le = 0.7L" },
        { id: 38, q: "단주와 장주를 구분하는 기준은?", a: "세장비 - 한계 세장비 이상이면 장주(좌굴 지배)" },
        { id: 39, q: "랭킨 공식이 적용되는 범위는?", a: "중간주 - 단주와 장주의 중간 영역" },
        { id: 40, q: "편심하중을 받는 기둥에서 추가로 발생하는 것은?", a: "굽힘응력 - σ = P/A ± Pe·y/I" }
      ]
    },
    {
      title: "5. 피로와 재료특성",
      questions: [
        { id: 41, q: "S-N 곡선이란?", a: "응력진폭 vs 파단수명 관계 곡선 - 피로한도 결정" },
        { id: 42, q: "피로한도(Endurance Limit)란?", a: "무한 반복하중에도 파괴되지 않는 최대 응력" },
        { id: 43, q: "응력집중계수(Kt)란?", a: "노치, 구멍 등에서 명목응력 대비 최대응력의 비" },
        { id: 44, q: "피로강도에 영향을 주는 요소가 아닌 것은?", a: "색상 - 영향요소: 표면상태, 치수, 응력집중, 환경" },
        { id: 45, q: "충격인성(Impact Toughness)을 측정하는 시험은?", a: "샤르피 충격시험 - 노치시편에 충격하중" },
        { id: 46, q: "경도시험의 종류가 아닌 것은?", a: "인장시험 - 경도시험: 브리넬, 로크웰, 비커스" },
        { id: 47, q: "항복점이 명확하지 않은 재료의 항복강도 결정 방법은?", a: "0.2% 오프셋법 - 영구변형률 0.2%에서의 응력" },
        { id: 48, q: "연성재료와 취성재료의 구분 기준은?", a: "연신율 5% 기준 - 5% 이상 연성, 미만 취성" },
        { id: 49, q: "크리프(Creep) 현상이란?", a: "일정 응력 하에서 시간에 따라 변형 증가 - 고온에서 중요" },
        { id: 50, q: "응력-변형률 선도에서 네킹이 시작되는 점은?", a: "극한강도점 - 단면적 급격히 감소 시작" }
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
            <span className="text-4xl">🔩</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">재료역학</h1>
              <p className="text-gray-600">건설기계기사 필기 제4과목</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">📚 재료역학 학습 팁</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 기본 공식(응력, 변형률, 훅의 법칙)을 완벽히 암기하세요</li>
            <li>• 보의 처짐 공식은 지지조건별로 정리해서 암기하세요</li>
            <li>• 좌굴에서 유효길이 계수는 지지조건에 따라 달라집니다</li>
            <li>• 계산문제가 많으므로 단위 환산에 주의하세요</li>
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
