'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MachineDesignStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-machine-chassis-completed');
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
      localStorage.setItem('construction-machine-chassis-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설기계기사 건설기계섀시 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 왜 이 답이 정답인지, 관련된 이론과 실무적용도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 동력전달장치",
      questions: [
        { id: 1, q: "토크컨버터의 3요소가 아닌 것은?", a: "클러치 - 토크컨버터 3요소: 펌프(임펠러), 터빈, 스테이터" },
        { id: 2, q: "토크컨버터에서 토크 증대가 일어나는 조건은?", a: "스테이터가 고정되어 있을 때 - 스톨(Stall) 상태에서 최대 토크비" },
        { id: 3, q: "토크컨버터의 스톨 토크비란?", a: "출력축 정지 시 입력토크 대비 출력토크의 비 - 일반적으로 2~3배" },
        { id: 4, q: "토크컨버터의 커플링 포인트란?", a: "스테이터가 회전하기 시작하여 토크증대가 끝나는 점 - 효율 최대점" },
        { id: 5, q: "유체클러치와 토크컨버터의 차이점은?", a: "토크컨버터는 스테이터가 있어 토크 증대 가능, 유체클러치는 1:1 전달" },
        { id: 6, q: "파워시프트 변속기의 특징이 아닌 것은?", a: "주행 중 변속 불가 - 파워시프트는 동력 차단 없이 변속 가능" },
        { id: 7, q: "유성기어 변속기의 구성요소가 아닌 것은?", a: "헬리컬 기어 - 유성기어: 선기어, 유성기어, 링기어, 캐리어" },
        { id: 8, q: "추진축의 유니버설 조인트 역할은?", a: "각도 변화를 허용하며 동력 전달 - 구동축 위치 변동 흡수" },
        { id: 9, q: "차동장치(디퍼렌셜)의 역할은?", a: "선회 시 좌우 바퀴 회전수 차이 허용 - 직진 시 동일 회전" },
        { id: 10, q: "최종감속장치의 역할은?", a: "토크 증대 및 회전수 감속 - 감속비 = 링기어 잇수/피니언 잇수" }
      ]
    },
    {
      title: "2. 조향장치",
      questions: [
        { id: 11, q: "애커먼 장토 조향방식의 원리는?", a: "선회 시 내측 바퀴가 외측보다 더 큰 각도로 조향 - 한 점 중심 회전" },
        { id: 12, q: "파워 스티어링의 장점이 아닌 것은?", a: "연비 향상 - 파워스티어링은 조작력 감소, 노면충격 감소, 조향 안정성 향상" },
        { id: 13, q: "유압식 파워 스티어링의 구성품이 아닌 것은?", a: "전동모터 - 유압식: 오일펌프, 컨트롤 밸브, 파워 실린더" },
        { id: 14, q: "조향장치의 킹핀 경사각의 역할은?", a: "직진 복원성 부여, 조작력 감소 - 일반적으로 6~8°" },
        { id: 15, q: "캠버(Camber)의 역할은?", a: "수직하중 지지, 킹핀 마모 방지 - 바퀴 상부가 외측으로 기울어진 각도" },
        { id: 16, q: "토우인(Toe-in)의 목적은?", a: "캠버에 의한 바퀴 벌어짐 보상, 직진성 유지 - 앞쪽이 뒤쪽보다 좁음" },
        { id: 17, q: "캐스터(Caster)의 역할은?", a: "직진 복원성 부여 - 킹핀 축이 뒤로 기울어진 각도" },
        { id: 18, q: "굴절식 조향의 특징은?", a: "차체 중앙에서 꺾여 조향 - 로더, 그레이더 등에 사용" },
        { id: 19, q: "스키드 스티어링의 원리는?", a: "좌우 바퀴 속도 차이로 조향 - 스키드로더, 불도저" },
        { id: 20, q: "조향 핸들의 유격이 큰 원인은?", a: "조향기어 마모, 조인트 마모, 조향링키지 헐거움" }
      ]
    },
    {
      title: "3. 제동장치",
      questions: [
        { id: 21, q: "유압식 브레이크의 파스칼 원리란?", a: "밀폐 용기 내 액체에 가한 압력은 모든 방향으로 동일하게 전달" },
        { id: 22, q: "마스터 실린더의 역할은?", a: "브레이크 페달 힘을 유압으로 변환 - 휠실린더로 전달" },
        { id: 23, q: "브레이크 부스터의 역할은?", a: "진공 또는 공압으로 제동력 배력 - 조작력 감소" },
        { id: 24, q: "디스크 브레이크의 장점이 아닌 것은?", a: "자기배력 작용 - 드럼식이 자기배력 있음, 디스크는 방열성 우수" },
        { id: 25, q: "드럼 브레이크의 자기배력 작용이란?", a: "회전방향으로 슈가 밀려 제동력 증가 - 리딩슈에서 발생" },
        { id: 26, q: "베이퍼 록(Vapor Lock) 현상이란?", a: "브레이크액 비등으로 기포 발생, 제동력 저하 - 과열 시 발생" },
        { id: 27, q: "페이드(Fade) 현상이란?", a: "과열로 마찰계수 저하, 제동력 감소 - 장시간 브레이크 사용 시" },
        { id: 28, q: "공기압 브레이크의 특징이 아닌 것은?", a: "소형 차량에 적합 - 공기압식은 대형 건설기계에 사용" },
        { id: 29, q: "스프링 브레이크의 작동 원리는?", a: "공기압 해제 시 스프링력으로 제동 - 주차브레이크, 비상브레이크" },
        { id: 30, q: "제동거리 계산식에서 제동거리에 영향을 주는 요소가 아닌 것은?", a: "엔진 출력 - 제동거리: 속도²/(2×마찰계수×중력가속도)" }
      ]
    },
    {
      title: "4. 주행장치(궤도·타이어)",
      questions: [
        { id: 31, q: "무한궤도의 장점이 아닌 것은?", a: "고속주행 용이 - 궤도식: 접지압 낮음, 견인력 큼, 연약지 주행 가능" },
        { id: 32, q: "트랙의 구성품이 아닌 것은?", a: "타이어 - 트랙: 슈, 링크, 핀, 부싱, 아이들러, 스프로킷" },
        { id: 33, q: "트랙 장력 조정의 목적은?", a: "적정 장력 유지로 이탈 방지 및 마모 최소화 - 과긴장/이완 모두 문제" },
        { id: 34, q: "아이들러의 역할은?", a: "트랙 안내 및 장력조절 - 장력조절 스프링/유압과 연결" },
        { id: 35, q: "스프로킷의 역할은?", a: "구동력을 트랙에 전달 - 기어 형태로 트랙과 맞물림" },
        { id: 36, q: "하부 롤러(트랙 롤러)의 역할은?", a: "차체 무게 지지 및 트랙 안내 - 상부 롤러는 트랙 처짐 방지" },
        { id: 37, q: "타이어의 편평비란?", a: "타이어 높이/폭의 비율 - 편평비 낮을수록 접지면 넓음" },
        { id: 38, q: "레이디얼 타이어의 특징이 아닌 것은?", a: "발열이 큼 - 레이디얼: 발열 적음, 연비 우수, 승차감 양호" },
        { id: 39, q: "타이어 공기압이 낮을 때 나타나는 현상은?", a: "편마모, 발열 증가, 연비 저하, 조향 불안정" },
        { id: 40, q: "솔리드 타이어(중실타이어)의 장점은?", a: "펑크 없음, 내구성 우수 - 지게차 등에 사용, 승차감 나쁨" }
      ]
    },
    {
      title: "5. 섀시 전기장치",
      questions: [
        { id: 41, q: "축전지의 용량 표시 단위는?", a: "Ah(암페어 아워) - 방전전류 × 시간" },
        { id: 42, q: "축전지 방전 시 비중 변화는?", a: "비중 감소 - 완충 1.28, 방전 1.12" },
        { id: 43, q: "축전지 설페이션(황산납화) 현상이란?", a: "장기 방전방치로 극판에 단단한 황산납 결정 생성 - 용량 저하" },
        { id: 44, q: "교류발전기(얼터네이터)의 정류 방법은?", a: "다이오드(정류기)를 사용한 전파정류 - 6개 다이오드 사용" },
        { id: 45, q: "시동전동기의 오버러닝 클러치 역할은?", a: "기관 시동 후 피니언과 플라이휠 분리 - 역전달 방지" },
        { id: 46, q: "예열플러그(글로우 플러그)의 역할은?", a: "연소실 예열로 냉간 시동성 향상 - 디젤기관에 사용" },
        { id: 47, q: "조명장치에서 전조등 광도 조절 방법은?", a: "필라멘트 위치 변경(상향/하향) - 2중 필라멘트 사용" },
        { id: 48, q: "퓨즈의 역할은?", a: "과전류 차단으로 회로 보호 - 정격전류 초과 시 용단" },
        { id: 49, q: "릴레이의 역할은?", a: "소전류로 대전류 회로 개폐 - 전자석 원리 이용" },
        { id: 50, q: "접지(어스)의 목적은?", a: "회로 구성, 감전 방지, 정전기 방전 - 차체를 (-)극으로 사용" }
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
            <span className="text-4xl">⚙️</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">건설기계섀시</h1>
              <p className="text-gray-600">건설기계기사 필기 제2과목</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">📚 건설기계섀시 학습 팁</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 토크컨버터의 작동원리와 특성곡선을 확실히 이해하세요</li>
            <li>• 조향장치의 각종 얼라인먼트 용어와 역할을 암기하세요</li>
            <li>• 유압식과 공기압식 브레이크의 차이점을 비교 학습하세요</li>
            <li>• 무한궤도와 타이어식의 장단점을 정리해 두세요</li>
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
