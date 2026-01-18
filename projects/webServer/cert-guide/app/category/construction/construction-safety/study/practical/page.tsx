'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-safety-practical-completed');
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
      localStorage.setItem('construction-safety-practical-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설안전기사 실기(필답형) 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 실무 적용 사례와 답안 작성 요령도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 가설공사 안전관리",
      questions: [
        { id: 1, q: "비계의 종류 4가지를 쓰시오.", a: "강관비계, 강관틀비계(시스템비계), 말비계, 달비계, 달대비계, 이동식비계, 통나무비계 등" },
        { id: 2, q: "강관비계 작업발판의 설치 기준을 3가지 쓰시오.", a: "① 발판 폭 40cm 이상 ② 틈새 3cm 이하 ③ 발판재료 뒤집힘, 떨어짐 방지조치 ④ 작업발판 2단 이상 설치 금지" },
        { id: 3, q: "달비계의 안전계수를 쓰시오.", a: "10 이상 (와이어로프 및 달기체인의 절단하중을 최대 하중으로 나눈 값)" },
        { id: 4, q: "시스템 비계의 구성 요소 4가지를 쓰시오.", a: "수직재, 수평재, 가새재(대각재), 벽연결용 철물, 받침철물, 작업발판 등" },
        { id: 5, q: "가설통로 설치 시 경사도 기준을 쓰시오.", a: "경사 30° 이하, 경사 15° 초과 시 미끄럼 방지 조치, 높이 8m 초과 시 7m 이내마다 계참 설치" }
      ]
    },
    {
      title: "2. 굴착 및 흙막이 공사",
      questions: [
        { id: 6, q: "굴착면 기울기 기준(보통흙, 습지)을 쓰시오.", a: "보통흙: 1:1~1:1.5, 습지: 1:1.5 이상 (수평:수직), 지반 종류에 따라 상이" },
        { id: 7, q: "흙막이 지보공의 점검 항목 4가지를 쓰시오.", a: "① 부재 손상·변형·부식 상태 ② 버팀대 긴압 정도 ③ 침하량 측정 ④ 용수 상태 ⑤ 배면토 이완 상태" },
        { id: 8, q: "계측관리 항목 4가지를 쓰시오.", a: "지중경사계, 지표침하계, 지하수위계, 하중계, 변형률계, 균열계 등" },
        { id: 9, q: "흙막이 가시설 붕괴 원인 4가지를 쓰시오.", a: "① 설계·시공 부실 ② 과굴착 ③ 지반조사 미흡 ④ 지하수 처리 불량 ⑤ 상재하중 증가" },
        { id: 10, q: "파이핑(Piping) 현상을 설명하시오.", a: "침투수에 의해 지반 입자가 유실되면서 지반 내 수로가 형성되어 흙막이 배면 지반이 함몰되는 현상" }
      ]
    },
    {
      title: "3. 철골·콘크리트 공사",
      questions: [
        { id: 11, q: "철골공사 추락 방지조치 4가지를 쓰시오.", a: "① 안전대 부착설비 ② 안전방망 ③ 추락방호망 ④ 낙하물 방지망 ⑤ 승강시설 ⑥ 안전난간" },
        { id: 12, q: "고장력볼트 조임 검사방법 3가지를 쓰시오.", a: "① 토크관리법 ② 너트회전법 ③ 조합볼트법 - 1차 조임 후 마킹하여 각도 확인" },
        { id: 13, q: "철골 세우기 작업 중지 기상조건을 쓰시오.", a: "풍속 10m/s 이상, 강우량 1mm/hr 이상, 강설량 1cm/hr 이상 시 작업 중지" },
        { id: 14, q: "거푸집 동바리 해체 시기(콘크리트 강도 기준)를 쓰시오.", a: "측면: 압축강도 5MPa, 바닥: 설계강도의 2/3 또는 14MPa 이상, 보: 설계강도 100%" },
        { id: 15, q: "콘크리트 타설 시 안전조치 4가지를 쓰시오.", a: "① 작업발판 설치 ② 콘크리트 펌프카 전도방지 ③ 투입구 개구부 방호 ④ 호스 흔들림 방지 고정" }
      ]
    },
    {
      title: "4. 건설기계·양중 안전",
      questions: [
        { id: 16, q: "타워크레인 설치·해체 작업 계획서 내용 4가지를 쓰시오.", a: "① 작업 절차 및 방법 ② 안전조치계획 ③ 작업인원 배치계획 ④ 장비·공구 현황 ⑤ 비상연락체계" },
        { id: 17, q: "이동식크레인 작업 전 점검항목 5가지를 쓰시오.", a: "① 아웃트리거 설치상태 ② 과부하방지장치 ③ 권과방지장치 ④ 훅해지장치 ⑤ 와이어로프 상태" },
        { id: 18, q: "양중작업 신호방법(수신호)을 3가지 쓰시오.", a: "① 권상(손을 위로) ② 권하(손을 아래로) ③ 정지(손을 수평으로) ④ 비상정지(양팔 좌우로)" },
        { id: 19, q: "와이어로프 폐기기준 4가지를 쓰시오.", a: "① 킹크 발생 ② 직경 7% 이상 감소 ③ 소선 10% 이상 단선 ④ 심한 부식·마모 ⑤ 열 손상" },
        { id: 20, q: "고소작업대 안전작업 수칙 4가지를 쓰시오.", a: "① 정격하중 초과 금지 ② 안전대 착용 ③ 이동 시 바스켓 하강 ④ 평탄한 지면 설치 ⑤ 아웃트리거 설치" }
      ]
    },
    {
      title: "5. 위험성평가·재해조사",
      questions: [
        { id: 21, q: "위험성평가 절차를 순서대로 쓰시오.", a: "① 사전준비 → ② 유해위험요인 파악 → ③ 위험성 추정 → ④ 위험성 결정 → ⑤ 위험성 감소대책 수립·실행" },
        { id: 22, q: "위험성평가에서 위험성(R)의 산출식을 쓰시오.", a: "R = S × F (위험성 = 중대성(강도) × 빈도(가능성)), 또는 R = 부상의 심각성 × 발생 가능성" },
        { id: 23, q: "재해조사 시 4M 분석법의 4가지 요소를 쓰시오.", a: "① Man(인적요인) ② Machine(기계·설비) ③ Media(작업환경) ④ Management(관리적요인)" },
        { id: 24, q: "재해발생 시 보고체계(중대재해)를 쓰시오.", a: "발생 즉시 관할 지방고용노동관서에 전화·팩스·전자문서로 보고, 1개월 내 산재조사표 제출" },
        { id: 25, q: "도수율(빈도율)과 강도율 계산식을 쓰시오.", a: "도수율 = (재해건수/연근로시간수)×10^6, 강도율 = (근로손실일수/연근로시간수)×10^3" }
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
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">실기(필답형)</h1>
              <p className="text-gray-600">건설안전기사 실기시험 대비</p>
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

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold text-red-800">실기시험 필답형 유의사항</h3>
              <ul className="mt-2 text-sm text-red-700 space-y-1">
                <li>• 정확한 용어와 숫자를 암기해야 합니다</li>
                <li>• 문제가 요구하는 개수만큼 정확히 답변하세요</li>
                <li>• 계산문제는 풀이과정과 단위를 명시하세요</li>
              </ul>
            </div>
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
                          <div className="text-gray-600 text-sm bg-white p-3 rounded border">
                            <span className="font-semibold text-amber-600">모범답안:</span>
                            <p className="mt-1">{item.a}</p>
                          </div>
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
          <h3 className="font-bold text-amber-800 mb-3">📚 실기시험 학습 팁</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 필기시험 내용을 바탕으로 핵심 키워드를 암기하세요</li>
            <li>• 수치 기준(높이, 각도, 하중 등)은 반드시 정확히 암기하세요</li>
            <li>• 나열형 문제는 요구 개수보다 1~2개 더 암기해 두세요</li>
            <li>• 실제 현장 사진이나 도면을 보며 이해도를 높이세요</li>
            <li>• 최근 기출문제 경향을 파악하여 자주 출제되는 유형을 집중 학습하세요</li>
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
