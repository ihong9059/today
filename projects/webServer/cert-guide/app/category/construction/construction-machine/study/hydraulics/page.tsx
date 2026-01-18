'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function HydraulicsStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-machine-hydraulics-completed');
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
      localStorage.setItem('construction-machine-hydraulics-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설기계기사 건설기계유압 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 왜 이 답이 정답인지, 관련된 이론과 유압회로 해석도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 유압 기초이론",
      questions: [
        { id: 1, q: "파스칼의 원리를 설명하시오.", a: "밀폐 용기 내 유체에 가한 압력은 유체 모든 부분에 동일하게 전달된다" },
        { id: 2, q: "유압동력(L)의 계산식은?", a: "L = P × Q [W] (P: 압력 Pa, Q: 유량 m³/s) 또는 L = P × Q / 612 [kW]" },
        { id: 3, q: "유량(Q)의 계산식은?", a: "Q = A × v [m³/s] (A: 단면적 m², v: 유속 m/s)" },
        { id: 4, q: "실린더 추력(F)의 계산식은?", a: "F = P × A [N] (P: 압력 Pa, A: 피스톤 면적 m²)" },
        { id: 5, q: "레이놀즈 수(Re)로 판단할 수 있는 것은?", a: "유체 흐름이 층류인지 난류인지 판단 - Re < 2300: 층류, Re > 4000: 난류" },
        { id: 6, q: "유압유의 점도가 높으면 나타나는 현상은?", a: "유동저항 증가, 압력손실 증가, 응답성 저하 - 저온에서 발생" },
        { id: 7, q: "유압유의 점도가 낮으면 나타나는 현상은?", a: "내부 누유 증가, 펌프 효율 저하, 마모 증가 - 고온에서 발생" },
        { id: 8, q: "캐비테이션(Cavitation) 현상이란?", a: "유압유 내 기포 발생 및 붕괴로 진동·소음·침식 발생 - 흡입측에서 주로 발생" },
        { id: 9, q: "유압유의 체적탄성계수가 크면 어떤 의미인가?", a: "압축성이 적어 응답성 우수 - 기포 혼입 시 체적탄성계수 감소" },
        { id: 10, q: "유압시스템에서 압력손실의 원인이 아닌 것은?", a: "유량 감소 - 압력손실: 관로 마찰, 급격한 방향변화, 단면적 변화" }
      ]
    },
    {
      title: "2. 유압펌프",
      questions: [
        { id: 11, q: "유압펌프의 용적효율이란?", a: "이론토출량 대비 실제토출량의 비 - ηv = Q실/Q이론 × 100%" },
        { id: 12, q: "기어펌프의 특징으로 옳지 않은 것은?", a: "가변용량형이 많다 - 기어펌프는 정용량형, 구조 간단, 저렴" },
        { id: 13, q: "외접기어펌프의 작동원리는?", a: "두 기어 맞물림 해제 시 흡입, 맞물림 시 토출 - 치간 용적변화 이용" },
        { id: 14, q: "베인펌프의 특징은?", a: "맥동 적음, 소음 낮음, 중압용에 적합 - 베인 마모 시 효율 저하" },
        { id: 15, q: "피스톤펌프의 특징이 아닌 것은?", a: "구조가 단순하다 - 피스톤펌프: 고압·대용량, 가변용량 가능, 구조 복잡" },
        { id: 16, q: "축방향 피스톤펌프에서 토출량 조절 방법은?", a: "사판(스와시 플레이트) 각도 조절 - 각도 크면 토출량 증가" },
        { id: 17, q: "레이디얼 피스톤펌프의 특징은?", a: "피스톤이 방사상 배치, 편심량 조절로 용량 변경, 초고압용" },
        { id: 18, q: "펌프의 맥동을 줄이는 방법은?", a: "어큐뮬레이터 설치, 피스톤 수 증가, 기어 치수 증가" },
        { id: 19, q: "펌프 소음의 원인이 아닌 것은?", a: "정상 운전온도 유지 - 소음원인: 캐비테이션, 공기흡입, 커플링 불량" },
        { id: 20, q: "가변용량 펌프의 장점이 아닌 것은?", a: "가격이 저렴하다 - 가변펌프: 에너지 효율 높음, 발열 적음, 정밀제어" }
      ]
    },
    {
      title: "3. 유압밸브",
      questions: [
        { id: 21, q: "방향제어밸브의 종류가 아닌 것은?", a: "릴리프 밸브 - 방향제어밸브: 체크밸브, 스풀밸브, 셔틀밸브" },
        { id: 22, q: "4포트 3위치 밸브에서 '센터 클로즈드' 타입의 특징은?", a: "중립 시 모든 포트 차단 - 실린더 위치 고정, 펌프 언로드 불가" },
        { id: 23, q: "4포트 3위치 밸브에서 '탠덤 센터' 타입의 특징은?", a: "중립 시 P→T 연결, A·B 차단 - 실린더 고정, 펌프 언로드" },
        { id: 24, q: "파일럿 체크밸브의 역할은?", a: "외부 신호로 역류 허용 - 실린더 위치 유지 후 해제 시 사용" },
        { id: 25, q: "릴리프 밸브의 역할은?", a: "시스템 최고압력 제한 - 과부하 방지, 안전밸브 기능" },
        { id: 26, q: "감압밸브의 역할은?", a: "2차측 압력을 1차측보다 낮게 유지 - 저압 회로 구성" },
        { id: 27, q: "시퀀스 밸브의 역할은?", a: "설정압력 도달 후 다음 회로 작동 - 동작 순서 제어" },
        { id: 28, q: "카운터밸런스 밸브의 역할은?", a: "배압 유지로 부하의 자유낙하 방지 - 크레인 붐 하강 제어" },
        { id: 29, q: "유량제어밸브의 종류가 아닌 것은?", a: "체크밸브 - 유량제어밸브: 교축밸브, 유량조정밸브, 분류밸브" },
        { id: 30, q: "압력보상형 유량조정밸브의 특징은?", a: "부하 변동에도 일정 유량 유지 - 정밀 속도제어에 사용" }
      ]
    },
    {
      title: "4. 유압실린더·모터",
      questions: [
        { id: 31, q: "복동실린더의 특징은?", a: "양방향 모두 유압력으로 작동 - 전진·후진 모두 힘 제어 가능" },
        { id: 32, q: "단동실린더의 복귀방법은?", a: "스프링력 또는 자중에 의한 복귀 - 한쪽만 유압 작동" },
        { id: 33, q: "실린더의 전진 속도 계산식은?", a: "v = Q/A [m/s] (Q: 유량 m³/s, A: 피스톤 면적 m²)" },
        { id: 34, q: "차동실린더(재생회로)의 특징은?", a: "전진 시 양측 포트 연결로 속도 증가, 힘 감소 - 무부하 급속이송" },
        { id: 35, q: "텔레스코픽 실린더의 용도는?", a: "긴 행정 필요 시 사용 - 덤프트럭 적재함, 크레인 붐" },
        { id: 36, q: "실린더의 쿠션 장치 역할은?", a: "행정 끝 충격 완화 - 피스톤 말단에 쿠션 플런저 설치" },
        { id: 37, q: "기어모터의 특징은?", a: "구조 간단, 저압·소용량, 양방향 회전 가능" },
        { id: 38, q: "베인모터의 특징은?", a: "기동토크 크고 맥동 적음 - 건설기계 선회모터에 사용" },
        { id: 39, q: "유압모터의 용적효율이 낮아지는 원인은?", a: "내부 누유 증가 - 마모, 온도상승, 점도저하" },
        { id: 40, q: "유압모터 토크(T) 계산식은?", a: "T = (P × V) / (2π) [N·m] (P: 압력, V: 용적)" }
      ]
    },
    {
      title: "5. 유압회로·부속기기",
      questions: [
        { id: 41, q: "로드 센싱 시스템의 특징은?", a: "부하 압력에 따라 펌프 토출량 조절 - 에너지 효율 향상" },
        { id: 42, q: "어큐뮬레이터의 역할이 아닌 것은?", a: "유온 냉각 - 어큐뮬레이터: 충격흡수, 에너지 축적, 맥동감쇠" },
        { id: 43, q: "블래더형 어큐뮬레이터의 봉입가스는?", a: "질소(N₂) - 불활성, 비인화성, 경제적" },
        { id: 44, q: "유압필터의 설치 위치에 따른 분류가 아닌 것은?", a: "중간필터 - 흡입필터, 압력(라인)필터, 리턴필터" },
        { id: 45, q: "유압오일쿨러의 역할은?", a: "유압유 온도 냉각 - 적정 온도 40~60°C 유지" },
        { id: 46, q: "유압 탱크의 용량 결정 기준은?", a: "펌프 토출량의 3~5배 - 기포제거, 냉각, 불순물 침전" },
        { id: 47, q: "유압호스의 선정 기준이 아닌 것은?", a: "호스 색상 - 선정기준: 사용압력, 유량, 굴곡반경, 온도" },
        { id: 48, q: "미터인(Meter-in) 회로의 특징은?", a: "실린더 입구측 유량 조절 - 압축성 부하에 적합" },
        { id: 49, q: "미터아웃(Meter-out) 회로의 특징은?", a: "실린더 출구측 유량 조절 - 인장성 부하에 적합, 배압 형성" },
        { id: 50, q: "블리드오프(Bleed-off) 회로의 특징은?", a: "일부 유량을 탱크로 방출 - 펌프 부하 경감, 발열 적음" }
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
            <span className="text-4xl">💧</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">건설기계유압</h1>
              <p className="text-gray-600">건설기계기사 필기 제3과목</p>
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
          <h3 className="font-bold text-yellow-800 mb-3">📚 건설기계유압 학습 팁</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 유압 기본공식(압력, 유량, 동력, 추력)을 완벽히 암기하세요</li>
            <li>• 각 밸브의 기호와 기능을 연결지어 학습하세요</li>
            <li>• 유압회로도 해석 능력이 실기에서 중요합니다</li>
            <li>• 미터인/미터아웃 회로의 차이점과 적용 사례를 이해하세요</li>
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
