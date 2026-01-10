'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-machine-practical-completed');
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
      localStorage.setItem('construction-machine-practical-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설기계기사 실기(필답형) 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 실무 적용 사례와 답안 작성 요령도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 유압회로 설계·해석",
      questions: [
        { id: 1, q: "유압실린더의 전진속도를 계산하시오. (유량: 60 L/min, 피스톤 직경: 100mm)", a: "A = π×0.1²/4 = 0.00785 m², Q = 60/60000 = 0.001 m³/s, v = Q/A = 0.001/0.00785 = 0.127 m/s = 7.64 m/min" },
        { id: 2, q: "유압실린더 추력을 계산하시오. (압력: 20 MPa, 피스톤 직경: 80mm)", a: "A = π×0.08²/4 = 0.00503 m², F = P×A = 20×10⁶×0.00503 = 100,600 N ≈ 100.6 kN" },
        { id: 3, q: "유압동력을 계산하시오. (압력: 25 MPa, 유량: 100 L/min)", a: "L = P×Q/60 = 25×100/60 = 41.67 kW (또는 L = P×Q/612 kW)" },
        { id: 4, q: "릴리프 밸브의 역할과 설정압력 기준을 쓰시오.", a: "역할: 시스템 최고압력 제한, 과부하 방지. 설정압력: 정격압력의 110~115%" },
        { id: 5, q: "카운터밸런스 밸브의 용도와 설치 위치를 쓰시오.", a: "용도: 부하의 자유낙하 방지, 배압 유지. 위치: 실린더 출구측(미터아웃)" }
      ]
    },
    {
      title: "2. 기관 정비·고장진단",
      questions: [
        { id: 6, q: "디젤기관에서 흰 연기 발생 원인 4가지를 쓰시오.", a: "① 냉간 시동 시 불완전연소 ② 연료에 수분 혼입 ③ 분사시기 지연 ④ 압축압력 부족 ⑤ 분사노즐 불량" },
        { id: 7, q: "디젤기관에서 검은 연기 발생 원인 4가지를 쓰시오.", a: "① 공기필터 막힘 ② 분사노즐 불량 ③ 과부하 운전 ④ 터보차저 불량 ⑤ 연료분사량 과다" },
        { id: 8, q: "기관 과열의 원인 5가지를 쓰시오.", a: "① 냉각수 부족 ② 팬벨트 느슨함/절단 ③ 서모스탯 고장 ④ 라디에이터 막힘 ⑤ 워터펌프 불량 ⑥ 점화/분사시기 불량" },
        { id: 9, q: "밸브간극 조정 목적과 조정 시기를 쓰시오.", a: "목적: 열팽창 보상, 정확한 밸브 개폐시기 확보. 시기: 냉간 시(규정 온도) 또는 운전 후 정지 상태" },
        { id: 10, q: "디젤기관 압축압력 측정 방법과 정상값을 쓰시오.", a: "방법: 연료차단, 분사노즐 제거, 압축압력계 설치, 크랭킹. 정상값: 25~35 kgf/cm² (표준값 75% 이상)" }
      ]
    },
    {
      title: "3. 유압기기 정비",
      questions: [
        { id: 11, q: "유압펌프의 고장원인과 대책 3가지를 쓰시오.", a: "① 캐비테이션 → 흡입라인 점검, 필터 청소 ② 내부마모 → 오버홀, 부품교환 ③ 오일오염 → 오일교환, 필터교체" },
        { id: 12, q: "유압실린더 드리프트(자연하강) 원인 3가지를 쓰시오.", a: "① 피스톤 씰 마모/손상 ② 체크밸브 불량 ③ 방향제어밸브 내부누유 ④ 호스/배관 연결부 누유" },
        { id: 13, q: "유압유 온도상승 원인 4가지를 쓰시오.", a: "① 오일쿨러 불량 ② 릴리프밸브 설정압력 부적절 ③ 오일량 부족 ④ 내부누유 과다 ⑤ 펌프 효율 저하" },
        { id: 14, q: "유압호스 선정 시 고려사항 4가지를 쓰시오.", a: "① 최대사용압력(파열압력의 1/4) ② 사용유량(유속) ③ 최소굴곡반경 ④ 사용온도 범위 ⑤ 내유성" },
        { id: 15, q: "어큐뮬레이터의 봉입가스 충전압력 기준을 쓰시오.", a: "봉입가스: 질소(N₂), 충전압력: 최저작동압력의 80~90% 또는 최고압력의 25~33%" }
      ]
    },
    {
      title: "4. 건설기계 안전관리",
      questions: [
        { id: 16, q: "건설기계 정기검사 항목 5가지를 쓰시오.", a: "① 동력전달장치 ② 조향장치 ③ 제동장치 ④ 유압장치 ⑤ 등화장치 ⑥ 차체 및 프레임 ⑦ 안전장치" },
        { id: 17, q: "굴삭기 작업 시 안전수칙 5가지를 쓰시오.", a: "① 버킷 하부 출입금지 ② 견고한 지반에서 작업 ③ 선회 반경 내 인원 통제 ④ 적재물 과적 금지 ⑤ 경사지 작업 시 하부 고임" },
        { id: 18, q: "크레인 와이어로프 폐기기준 4가지를 쓰시오.", a: "① 킹크 발생 ② 직경 7% 이상 감소 ③ 한 꼬임 내 소선 10% 이상 단선 ④ 심한 부식/마모 ⑤ 열에 의한 손상" },
        { id: 19, q: "유압기기 취급 시 안전수칙 4가지를 쓰시오.", a: "① 잔압 제거 후 분해 ② 고온 오일 화상 주의 ③ 고압 분사류 접촉 금지 ④ 청결 유지 ⑤ 적정 오일 사용" },
        { id: 20, q: "건설기계 전도방지 대책 4가지를 쓰시오.", a: "① 수평지반에서 작업 ② 아웃트리거 완전 전개 ③ 정격하중 준수 ④ 급선회/급제동 금지 ⑤ 지반 지지력 확인" }
      ]
    },
    {
      title: "5. 계산문제 종합",
      questions: [
        { id: 21, q: "기관 출력 계산: 토크 200 N·m, 회전수 2000 rpm일 때 출력(kW)은?", a: "P = 2πNT/60 = 2π×2000×200/60 = 41,888 W ≈ 41.9 kW" },
        { id: 22, q: "기어펌프 이론 토출량 계산: 기어 잇수 10, 모듈 3, 이폭 30mm일 때 1회전당 토출량은?", a: "Q = 2πm²bZ = 2π×3²×30×10 = 16,965 mm³ ≈ 17 cm³/rev" },
        { id: 23, q: "실린더 후진속도 계산: 유량 50 L/min, 피스톤직경 100mm, 로드직경 50mm", a: "A = π(100²-50²)/4 = 5890 mm², v = (50×10⁶)/(60×5890) = 141 mm/s" },
        { id: 24, q: "브레이크 제동거리 계산: 속도 40 km/h, 마찰계수 0.7", a: "v = 40/3.6 = 11.1 m/s, S = v²/2μg = 11.1²/(2×0.7×9.8) = 8.97 m" },
        { id: 25, q: "축 비틀림응력 계산: 토크 500 N·m, 축직경 50mm", a: "Zp = πd³/16 = π×50³/16 = 24,544 mm³, τ = T/Zp = 500×10³/24,544 = 20.4 MPa" }
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
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">실기(필답형)</h1>
              <p className="text-gray-600">건설기계기사 실기시험 대비</p>
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

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">실기시험 필답형 유의사항</h3>
              <ul className="mt-2 text-sm text-red-700 space-y-1">
                <li>• 계산문제는 풀이과정과 단위를 반드시 표기하세요</li>
                <li>• 서술형은 핵심 키워드를 포함해서 작성하세요</li>
                <li>• 유압회로 기호와 명칭을 정확히 암기하세요</li>
              </ul>
            </div>
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
                          <div className="text-gray-600 text-sm bg-white p-3 rounded border">
                            <span className="font-semibold text-yellow-600">모범답안:</span>
                            <p className="mt-1">{item.a}</p>
                          </div>
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
          <h3 className="font-bold text-yellow-800 mb-3">📚 실기시험 학습 팁</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 유압회로 계산문제는 기본 공식을 완벽히 암기하세요</li>
            <li>• 고장진단은 증상-원인-대책을 체계적으로 정리하세요</li>
            <li>• 안전관리 항목은 나열형 문제로 자주 출제됩니다</li>
            <li>• 계산 시 단위 환산(L/min↔m³/s, MPa↔kgf/cm²)에 주의하세요</li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">📋 실기시험 안내</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-600 font-medium">시험형태</p>
              <p className="text-blue-800">필답형 (주관식)</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">시험시간</p>
              <p className="text-blue-800">2시간 30분</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">합격기준</p>
              <p className="text-blue-800">60점 이상</p>
            </div>
            <div>
              <p className="text-blue-600 font-medium">문항수</p>
              <p className="text-blue-800">약 15~20문항</p>
            </div>
          </div>
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
