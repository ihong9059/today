'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'strategic-management',
    name: '전략적 경영',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '평생교육기관의 전략적 기획을 설명하시오.', answer: '비전·미션, SWOT 분석, 전략목표, 실행계획', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 평생교육기관의 전략적 기획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비전과 미션 수립\n2. SWOT 분석\n3. 전략목표 설정\n4. 실행계획 수립\n5. 모니터링과 평가\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '평생교육기관의 마케팅 전략을 설명하시오.', answer: '시장분석, 포지셔닝, 브랜딩, 홍보전략', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 평생교육기관의 마케팅 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육시장 분석\n2. 타깃 설정과 포지셔닝\n3. 브랜드 구축\n4. 통합 마케팅 커뮤니케이션\n5. 디지털 마케팅\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '조직 혁신과 변화관리를 설명하시오.', answer: '변화 필요성, 저항 극복, 혁신 전략, 조직문화', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 조직 혁신과 변화관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변화의 필요성 인식\n2. 저항 관리\n3. 혁신 전략 수립\n4. 조직문화 변화\n5. 변화 정착화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '성과관리 체계를 설명하시오.', answer: 'BSC, KPI, 성과측정, 환류체계', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 성과관리 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BSC(균형성과표) 도입\n2. KPI 설정\n3. 성과측정 방법\n4. 성과평가\n5. 환류 및 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '리더십 이론과 실천을 설명하시오.', answer: '변혁적 리더십, 서번트 리더십, 분산적 리더십, 리더 역량', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 리더십 이론과 실천을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변혁적 리더십\n2. 서번트 리더십\n3. 분산적 리더십\n4. 평생교육 리더 역량\n5. 리더십 개발\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hr-management',
    name: '인적자원 관리',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '인적자원개발(HRD) 체계를 설명하시오.', answer: '채용, 교육훈련, 경력개발, 성과관리', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 인적자원개발(HRD) 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전략적 HRD\n2. 채용과 선발\n3. 교육훈련 체계\n4. 경력개발\n5. 성과관리 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '평생교육사 전문성 개발을 설명하시오.', answer: '역량모델, 전문성 개발, 연수체계, 자격관리', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 평생교육사 전문성 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생교육사 역량모델\n2. 전문성 개발 과정\n3. 연수 및 재교육 체계\n4. 자격 관리\n5. 경력경로 설계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '조직 구조와 직무설계를 설명하시오.', answer: '조직구조, 직무분석, 직무설계, 권한 위임', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 조직 구조와 직무설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직구조 유형\n2. 직무분석\n3. 직무설계 원리\n4. 권한과 책임\n5. 조직 효율화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '동기부여와 보상 체계를 설명하시오.', answer: '동기이론, 보상시스템, 복리후생, 조직몰입', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 동기부여와 보상 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동기부여 이론\n2. 보상 시스템\n3. 복리후생 제도\n4. 비금전적 보상\n5. 조직몰입 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '팀 빌딩과 조직문화를 설명하시오.', answer: '팀 구성, 협업 촉진, 조직문화, 조직몰입', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 팀 빌딩과 조직문화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효과적 팀 구성\n2. 협업 촉진\n3. 조직문화 형성\n4. 학습조직 구축\n5. 조직 활성화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'financial-management',
    name: '재정 및 자원 관리',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '평생교육기관의 재정 관리를 설명하시오.', answer: '예산편성, 재원확보, 집행관리, 회계감사', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 평생교육기관의 재정 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 편성\n2. 재원 확보 전략\n3. 예산 집행 관리\n4. 회계와 감사\n5. 재정 건전성 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '다양한 재원 확보 방안을 설명하시오.', answer: '정부지원, 수강료, 후원·기부, 수익사업', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 다양한 재원 확보 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정부 지원사업\n2. 수강료 책정 전략\n3. 후원 및 기부금 유치\n4. 수익사업 운영\n5. 재원 다변화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '시설 및 자원 관리를 설명하시오.', answer: '시설 확보, 공간 활용, 자원 배분, 유지관리', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 시설 및 자원 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육시설 확보\n2. 공간 효율화\n3. 자원 배분\n4. 시설 유지관리\n5. 안전관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '원가 분석과 비용 관리를 설명하시오.', answer: '원가 구조, 비용 분석, 손익분기점, 효율화', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 원가 분석과 비용 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가 구조 분석\n2. 비용 분석\n3. 손익분기점 계산\n4. 비용 절감 전략\n5. 효율성 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '재무제표 분석을 설명하시오.', answer: '대차대조표, 손익계산서, 재무비율, 재무건전성', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 재무제표 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대차대조표 이해\n2. 손익계산서 분석\n3. 재무비율 활용\n4. 재무건전성 평가\n5. 경영 의사결정\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'quality-management',
    name: '질 관리 및 평가',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '총체적 질 관리(TQM)를 설명하시오.', answer: '품질경영, 지속적 개선, 고객만족, 전원 참여', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 총체적 질 관리(TQM)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TQM의 개념\n2. 품질경영 원칙\n3. 지속적 개선(PDCA)\n4. 고객만족 경영\n5. 전원 참여 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '기관 평가 체계를 설명하시오.', answer: '자체평가, 외부평가, 인증평가, 개선계획', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 기관 평가 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자체평가 실시\n2. 외부평가 준비\n3. 인증평가 대응\n4. 평가결과 분석\n5. 개선계획 수립\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '고객관계관리(CRM)를 설명하시오.', answer: '학습자 관리, 만족도, 충성도, 데이터베이스', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 고객관계관리(CRM)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CRM 개념\n2. 학습자 데이터베이스\n3. 만족도 관리\n4. 충성도 제고\n5. CRM 시스템 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '벤치마킹 전략을 설명하시오.', answer: '우수기관 분석, 비교평가, 모범사례, 적용', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 벤치마킹 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 벤치마킹 대상 선정\n2. 우수기관 분석\n3. 비교평가\n4. 모범사례 도출\n5. 자체 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '위기관리와 리스크 관리를 설명하시오.', answer: '위기 예방, 대응계획, 커뮤니케이션, 회복', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 위기관리와 리스크 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위기 예방 체계\n2. 위기 대응 계획\n3. 위기 커뮤니케이션\n4. 회복 및 정상화\n5. 학습과 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'governance',
    name: '거버넌스 및 네트워크',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '이사회 운영과 거버넌스를 설명하시오.', answer: '이사회 구성, 의사결정, 투명성, 책무성', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 이사회 운영과 거버넌스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사회 구성과 역할\n2. 의사결정 구조\n3. 투명성 확보\n4. 책무성 강화\n5. 효과적 거버넌스\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '네트워크 구축과 파트너십을 설명하시오.', answer: '협력체계, 산학연 연계, 지역사회 연계, MOU', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 네트워크 구축과 파트너십을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 협력 네트워크 구축\n2. 산학연 연계\n3. 지역사회 파트너십\n4. MOU 체결과 이행\n5. 협력 성과 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이해관계자 관리를 설명하시오.', answer: '이해관계자 분석, 소통 전략, 참여 유도, 협력', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 이해관계자 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이해관계자 분석\n2. 소통 전략\n3. 참여 유도\n4. 협력 관계 구축\n5. 갈등 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '사회적 책임과 윤리경영을 설명하시오.', answer: 'CSR, 윤리강령, 투명경영, 사회공헌', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 사회적 책임과 윤리경영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회적 책임(CSR)\n2. 윤리강령 수립\n3. 투명경영 실천\n4. 사회공헌 활동\n5. 지속가능경영\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '정보공개와 소통 체계를 설명하시오.', answer: '정보공개, 홍보, 민원처리, 참여 확대', prompt: '평생교육사 1급 평생교육경영론 문제입니다.\n\n문제: 정보공개와 소통 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보공개 제도\n2. 홍보 및 커뮤니케이션\n3. 민원처리 시스템\n4. 학습자 참여 확대\n5. 쌍방향 소통\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function Management1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-1-management-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('lifelong-educator-1-management-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/lifelong-educator-1" className="text-gray-600 hover:text-indigo-600">평생교육사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육경영론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육경영론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 1급 시험과목 - 기관 경영 및 전략적 관리</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
