'use client';
import { useState } from 'react';

export default function PracticalStudyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '직업상담 사례분석',
      questions: [
        { id: 1, question: '구직자의 직업결정 어려움 사례를 분석하고 상담전략을 수립하시오.', answer: '문제파악 → 원인분석 → 상담목표 → 상담전략 → 개입방법', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 구직자의 직업결정 어려움 사례를 분석하고 상담전략을 수립하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 내담자 문제 파악\n2. 원인 분석\n3. 상담 목표 설정\n4. 구체적 상담 전략\n5. 예상 개입 방법' },
        { id: 2, question: '청년 실업자의 취업 의욕 저하 사례를 분석하시오.', answer: '심리적 특성 파악, 자기효능감 향상, 단계적 목표 설정', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 청년 실업자의 취업 의욕 저하 사례를 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 내담자 현재 상태\n2. 의욕 저하 원인\n3. 심리적 지지 방안\n4. 자기효능감 향상 전략\n5. 단계별 실행 계획' },
        { id: 3, question: '경력단절여성의 재취업 상담 사례를 분석하시오.', answer: '경력공백 대처, 자신감 회복, 적합 직종 탐색', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 경력단절여성의 재취업 상담 사례를 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 경력단절 배경 분석\n2. 현재 역량 평가\n3. 재취업 장벽 파악\n4. 적합 직종 탐색\n5. 취업 지원 계획' },
        { id: 4, question: '전직 희망자의 경력전환 상담 사례를 분석하시오.', answer: '전직 동기 확인, 전환 가능성 평가, 준비 계획 수립', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 전직 희망자의 경력전환 상담 사례를 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 전직 희망 동기\n2. 현재 역량 분석\n3. 희망 분야 적합성\n4. 갭(Gap) 분석\n5. 준비 계획' },
        { id: 5, question: '고령 구직자의 재취업 상담 사례를 분석하시오.', answer: '경력 활용, 연령 장벽 대처, 현실적 목표 설정', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 고령 구직자의 재취업 상담 사례를 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 고령 구직자 특성\n2. 강점과 약점 분석\n3. 현실적 취업 목표\n4. 연령 친화적 직종\n5. 취업 전략' },
        { id: 6, question: '구직 실패 반복자의 상담 사례를 분석하시오.', answer: '실패 원인 분석, 구직전략 수정, 심리적 지지', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 구직 실패 반복자의 상담 사례를 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 반복 실패 패턴 분석\n2. 구체적 실패 원인\n3. 구직전략 수정 방안\n4. 심리적 지지 방법\n5. 성공 경험 만들기' },
      ]
    },
    {
      title: '심리검사 해석',
      questions: [
        { id: 7, question: 'Holland 검사 결과(RIA)를 해석하고 직업을 추천하시오.', answer: 'R(현실형)+I(탐구형)+A(예술형): 기술+연구+창의성', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: Holland 검사 결과 RIA 유형을 해석하고 직업을 추천하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. R(현실형) 특성\n2. I(탐구형) 특성\n3. A(예술형) 특성\n4. RIA 조합의 의미\n5. 추천 직업 5개' },
        { id: 8, question: 'Holland 검사 결과(SEC)를 해석하고 직업을 추천하시오.', answer: 'S(사회형)+E(진취형)+C(관습형): 대인+리더십+체계', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: Holland 검사 결과 SEC 유형을 해석하고 직업을 추천하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. S(사회형) 특성\n2. E(진취형) 특성\n3. C(관습형) 특성\n4. SEC 조합의 의미\n5. 추천 직업 5개' },
        { id: 9, question: 'MBTI 검사 결과(ENFJ)를 해석하고 직업을 추천하시오.', answer: 'ENFJ: 외향, 직관, 감정, 판단 - 교육자, 상담사 적합', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: MBTI 검사 결과 ENFJ 유형을 해석하고 직업을 추천하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. E(외향) 특성\n2. N(직관) 특성\n3. F(감정) 특성\n4. J(판단) 특성\n5. ENFJ 적합 직업' },
        { id: 10, question: 'MBTI 검사 결과(ISTP)를 해석하고 직업을 추천하시오.', answer: 'ISTP: 내향, 감각, 사고, 인식 - 기술자, 분석가 적합', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: MBTI 검사 결과 ISTP 유형을 해석하고 직업을 추천하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. I(내향) 특성\n2. S(감각) 특성\n3. T(사고) 특성\n4. P(인식) 특성\n5. ISTP 적합 직업' },
        { id: 11, question: '직업적성검사 결과를 해석하고 적합 직업군을 제시하시오.', answer: '높은 적성 영역 → 관련 직업군 매칭', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 직업적성검사 결과를 해석하고 적합 직업군을 제시하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 적성 프로파일 분석\n2. 강점 적성 영역\n3. 약점 적성 영역\n4. 적합 직업군\n5. 보완 방안' },
        { id: 12, question: '직업가치관검사 결과를 해석하고 직업선택에 적용하시오.', answer: '우선순위 가치 → 가치 충족 직업 탐색', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 직업가치관검사 결과를 해석하고 직업선택에 적용하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 상위 가치 분석\n2. 가치 우선순위\n3. 가치와 직업 매칭\n4. 가치 충돌 해결\n5. 직업선택 조언' },
      ]
    },
    {
      title: '직업정보 분석',
      questions: [
        { id: 13, question: 'KSCO 직업분류를 활용하여 특정 직업을 분류하시오.', answer: '대분류 → 중분류 → 소분류 → 세분류 체계 적용', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: KSCO 직업분류를 활용하여 특정 직업을 분류하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 직업명 확인\n2. 대분류 결정\n3. 중분류 결정\n4. 소분류 결정\n5. 세분류 코드' },
        { id: 14, question: '워크넷을 활용한 구인정보 분석 방법을 설명하시오.', answer: '검색조건 설정, 채용정보 비교, 기업정보 확인', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 워크넷을 활용한 구인정보 분석 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 검색 조건 설정\n2. 구인정보 필터링\n3. 주요 분석 항목\n4. 기업정보 확인\n5. 정보 활용 방법' },
        { id: 15, question: '특정 직업의 전망을 분석하시오.', answer: '고용동향, 임금수준, 성장 가능성, 필요 역량', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 특정 직업의 전망을 분석하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 현재 고용 현황\n2. 임금 수준\n3. 향후 성장 전망\n4. 필요 역량\n5. 취업 경로' },
        { id: 16, question: '신직업 정보를 조사하고 상담에 활용하시오.', answer: '신직업 정의, 업무 내용, 필요 역량, 진입 경로', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 신직업 정보를 조사하고 상담에 활용하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 신직업 명칭과 정의\n2. 주요 업무 내용\n3. 필요 역량과 자격\n4. 진입 경로\n5. 상담 활용 방안' },
        { id: 17, question: 'NCS 정보를 활용한 직업 탐색 방법을 설명하시오.', answer: '직무능력 확인, 훈련과정 연계, 자격증 연결', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: NCS 정보를 활용한 직업 탐색 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. NCS 분류체계\n2. 직무능력 확인\n3. 훈련과정 연계\n4. 자격증 정보\n5. 상담 활용법' },
      ]
    },
    {
      title: '취업지원 실무',
      questions: [
        { id: 18, question: '이력서 작성 지도 방법을 설명하시오.', answer: '기본정보, 경력기술, 자기PR, 오류 점검', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 이력서 작성 지도 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 이력서 기본 구성\n2. 경력 기술 방법\n3. 자기PR 포인트\n4. 흔한 오류 수정\n5. 첨삭 지도 요령' },
        { id: 19, question: '자기소개서 작성 지도 방법을 설명하시오.', answer: '지원동기, 성장과정, 역량 어필, 입사 후 포부', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 자기소개서 작성 지도 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 자기소개서 구성\n2. 지원동기 작성법\n3. 경험 스토리텔링\n4. 역량 어필 방법\n5. 첨삭 지도 포인트' },
        { id: 20, question: '면접 코칭 방법을 설명하시오.', answer: '예상질문, 답변 구조화, 비언어적 표현, 모의면접', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 면접 코칭 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 면접 유형별 준비\n2. 예상 질문 정리\n3. 답변 구조화(STAR)\n4. 비언어적 표현\n5. 모의면접 진행' },
        { id: 21, question: '구직활동 계획 수립 지원 방법을 설명하시오.', answer: '목표설정, 활동계획, 일정관리, 점검', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 구직활동 계획 수립 지원 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 구직 목표 설정\n2. 주간 활동 계획\n3. 일정 관리 도구\n4. 진행 상황 점검\n5. 계획 수정 방법' },
        { id: 22, question: '취업 후 적응 지원 상담 방법을 설명하시오.', answer: '초기 적응, 업무 수행, 대인관계, 경력개발', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 취업 후 적응 지원 상담 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 초기 적응 어려움\n2. 업무 수행 지원\n3. 직장 내 관계\n4. 조기 이직 예방\n5. 경력개발 조언' },
      ]
    },
    {
      title: '종합 실무 문제',
      questions: [
        { id: 23, question: '집단상담 프로그램 기획안을 작성하시오.', answer: '대상, 목표, 회기구성, 활동내용, 평가', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 취업준비 집단상담 프로그램 기획안을 작성하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 프로그램 개요(대상, 기간)\n2. 목표 설정\n3. 회기별 주제\n4. 주요 활동 내용\n5. 효과 평가 방법' },
        { id: 24, question: '상담 기록 작성 방법(SOAP)을 설명하시오.', answer: 'S(주관적), O(객관적), A(평가), P(계획)', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: SOAP 형식의 상담 기록 작성 방법을 설명하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. S(Subjective): 내담자 진술\n2. O(Objective): 객관적 관찰\n3. A(Assessment): 상담사 평가\n4. P(Plan): 향후 계획\n5. 기록 작성 유의사항' },
        { id: 25, question: '내담자 의뢰(Referral) 보고서를 작성하시오.', answer: '의뢰사유, 내담자정보, 상담경과, 의뢰기관', prompt: '직업상담사 2급 실기 문제입니다.\n\n문제: 내담자 의뢰 보고서를 작성하시오.\n\n다음 형식으로 답안을 작성해주세요:\n1. 의뢰 사유\n2. 내담자 기본 정보\n3. 상담 경과 요약\n4. 의뢰 기관 정보\n5. 의뢰 시 유의사항' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education/career-counselor-2" className="text-gray-600 hover:text-teal-600">직업상담사 2급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">✍️</span>
            <div>
              <h1 className="text-2xl font-bold">직업상담 실무 (실기)</h1>
              <p className="text-emerald-100">총 {totalQuestions}문항 | 사례분석과 실무능력</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>💡 실기시험 안내:</strong> 필답형으로 출제되며, 사례분석·심리검사 해석·취업지원 실무 문제가 출제됩니다.
          </p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">{topicIdx + 1}</div>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topicIdx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-emerald-600">A. {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
