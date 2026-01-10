'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LaborLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-labor-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-labor-law-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '근로기준법 총칙',
      desc: '근로자·사용자 정의, 근로조건 기준',
      questions: [
        { id: 1, q: '근로기준법상 "근로자"의 정의와 판단기준은?', a: '직업의 종류와 관계없이 임금을 목적으로 사업이나 사업장에 근로를 제공하는 자' },
        { id: 2, q: '사용종속관계의 판단기준을 설명하시오.', a: '업무 내용의 지시, 출퇴근 시간 관리, 취업규칙 적용, 보수의 성격 등 종합 고려' },
        { id: 3, q: '근로기준법의 기본원칙 5가지는?', a: '균등대우, 강제근로금지, 폭행금지, 중간착취배제, 공민권 행사 보장' },
        { id: 4, q: '근로기준법 적용범위와 예외는?', a: '상시 5인 이상 사업장 전면 적용, 4인 이하는 일부 조항만 적용' },
        { id: 5, q: '근로조건 대등결정의 원칙이란?', a: '근로조건은 근로자와 사용자가 동등한 지위에서 자유의사에 따라 결정' },
        { id: 6, q: '근로기준법상 균등대우 원칙의 내용은?', a: '성별, 국적, 신앙, 사회적 신분을 이유로 차별적 처우 금지' },
        { id: 7, q: '특수형태근로종사자의 법적 지위는?', a: '개인사업자이나 경제적 종속성으로 산재보험법 등 일부 보호 적용' },
        { id: 8, q: '플랫폼 노동자의 근로자성 판단기준은?', a: '실질적인 지휘·감독 여부, 보수의 근로대가성, 전속성 등 종합 판단' }
      ]
    },
    {
      title: '근로계약',
      desc: '근로계약 체결·변경·종료, 해고 제한',
      questions: [
        { id: 9, q: '근로계약의 성립요건과 효력발생시기는?', a: '합의에 의해 성립, 계약 체결 시 또는 약정한 시점에 효력 발생' },
        { id: 10, q: '근로계약서 필수 기재사항은?', a: '임금, 소정근로시간, 휴일, 연차유급휴가, 근무장소, 업무내용 등' },
        { id: 11, q: '취업규칙의 법적 성질과 효력은?', a: '정형계약설이 통설, 근로계약에 우선하나 단체협약에 열후' },
        { id: 12, q: '취업규칙 불이익변경의 요건과 효과는?', a: '근로자 집단의 동의 필요, 동의 없으면 기존 근로자에게 무효' },
        { id: 13, q: '해고의 정당한 사유란?', a: '사회통념상 고용관계를 지속할 수 없을 정도의 귀책사유나 경영상 필요' },
        { id: 14, q: '해고예고제도의 내용과 예외는?', a: '30일 전 예고 또는 30일분 통상임금 지급, 일용근로자 등 예외' },
        { id: 15, q: '경영상 해고의 4대 요건은?', a: '긴박한 경영상 필요, 해고회피노력, 합리적 기준, 협의의무' },
        { id: 16, q: '부당해고 구제절차와 효과는?', a: '노동위원회 구제신청 → 심판 → 원직복직, 임금상당액 지급 명령' },
        { id: 17, q: '해고의 서면통지 요건과 효과는?', a: '해고사유와 시기 서면 통지 필수, 위반 시 해고 무효' },
        { id: 18, q: '기간제 근로자의 사용제한과 예외는?', a: '2년 초과 사용 시 무기계약 간주, 예외적 사유 존재' }
      ]
    },
    {
      title: '임금',
      desc: '임금의 정의, 지급원칙, 최저임금',
      questions: [
        { id: 19, q: '근로기준법상 임금의 정의는?', a: '사용자가 근로의 대가로 근로자에게 지급하는 일체의 금품' },
        { id: 20, q: '임금 지급 4대 원칙은?', a: '통화불, 직접불, 전액불, 정기불' },
        { id: 21, q: '통상임금의 정의와 산정 기준은?', a: '정기적·일률적·고정적으로 지급되는 임금, 시간급 환산' },
        { id: 22, q: '평균임금의 정의와 용도는?', a: '산정사유 발생일 전 3개월간 총임금/총일수, 퇴직금·휴업수당 등에 사용' },
        { id: 23, q: '최저임금제도의 내용과 효과는?', a: '시간급 기준 최저한도, 위반 시 차액 청구권 발생' },
        { id: 24, q: '휴업수당 지급 요건과 금액은?', a: '사용자 귀책사유로 휴업 시 평균임금의 70% 이상' },
        { id: 25, q: '퇴직금 지급 요건과 산정방법은?', a: '1년 이상 근속 시, 30일분 평균임금 × 근속연수' },
        { id: 26, q: '임금채권 보장제도의 내용은?', a: '도산 시 최종 3개월분 임금, 3년분 퇴직금 국가 대지급' },
        { id: 27, q: '포괄임금제의 유효성 판단기준은?', a: '감시단속적 근로 등에 한해 인정, 명확한 합의와 불이익 없을 것' },
        { id: 28, q: '성과급의 통상임금 포함 여부 판단은?', a: '정기성·일률성·고정성 충족 여부에 따라 개별 판단' }
      ]
    },
    {
      title: '근로시간·휴일·휴가',
      desc: '법정근로시간, 연장근로, 연차휴가',
      questions: [
        { id: 29, q: '법정근로시간의 내용은?', a: '1일 8시간, 1주 40시간 (휴게시간 제외)' },
        { id: 30, q: '연장근로의 한도와 가산임금률은?', a: '1주 12시간 한도, 통상임금의 50% 가산' },
        { id: 31, q: '야간근로의 정의와 가산임금은?', a: '22시~06시 근로, 통상임금의 50% 가산' },
        { id: 32, q: '휴일근로의 가산임금률은?', a: '8시간 이내 50%, 8시간 초과 100% 가산' },
        { id: 33, q: '유연근무제의 종류와 요건은?', a: '탄력적·선택적·재량 근로시간제, 각각 도입요건 상이' },
        { id: 34, q: '연차유급휴가의 발생요건은?', a: '1년간 80% 이상 출근 시 15일, 매 2년마다 1일 가산' },
        { id: 35, q: '연차휴가 미사용수당 청구권은?', a: '사용 촉진 조치 시 소멸, 미촉진 시 수당 청구권 발생' },
        { id: 36, q: '휴게시간의 부여 기준은?', a: '4시간 근로 시 30분, 8시간 근로 시 1시간 이상' },
        { id: 37, q: '주휴일 제도의 내용은?', a: '1주 소정근로일 개근 시 1일의 유급휴일 부여' },
        { id: 38, q: '52시간제 시행 내용과 예외는?', a: '1주 40시간+연장 12시간, 특별연장근로 예외적 허용' }
      ]
    },
    {
      title: '노동조합법',
      desc: '노조 설립·운영, 조합원 자격',
      questions: [
        { id: 39, q: '노동조합의 설립요건과 절차는?', a: '2인 이상 근로자, 설립신고 후 신고증 교부' },
        { id: 40, q: '노동조합의 자주성 요건이란?', a: '사용자로부터 독립하여 조직·운영되어야 함' },
        { id: 41, q: '복수노조 제도의 내용은?', a: '동일 사업장 내 복수노조 설립 가능, 교섭창구 단일화' },
        { id: 42, q: '교섭대표노조 결정 절차는?', a: '자율결정 → 과반수노조 → 공동교섭대표단' },
        { id: 43, q: '공정대표의무의 내용과 위반 효과는?', a: '합리적 이유 없는 차별 금지, 위반 시 부당노동행위' },
        { id: 44, q: '단체교섭의 대상과 한계는?', a: '임금·근로조건 등 의무적 교섭사항, 경영권은 임의적' },
        { id: 45, q: '성실교섭의무의 내용은?', a: '정당한 이유 없이 거부·해태 금지, 형식적 교섭도 위반' },
        { id: 46, q: '단체협약의 법적 효력은?', a: '규범적 효력(직접 적용), 채무적 효력(이행의무)' },
        { id: 47, q: '단체협약의 유효기간과 자동연장은?', a: '최장 2년, 별도 합의 없으면 3개월 자동연장' },
        { id: 48, q: '일반적 구속력(확장적용)의 요건은?', a: '동종 근로자 과반수 적용 시 전체에 확장' }
      ]
    },
    {
      title: '쟁의행위와 부당노동행위',
      desc: '쟁의행위 정당성, 부당노동행위 유형',
      questions: [
        { id: 49, q: '쟁의행위의 정당성 요건 4가지는?', a: '주체, 목적, 시기·절차, 수단·방법의 정당성' },
        { id: 50, q: '파업의 법적 효과는?', a: '정당하면 형·민사 면책, 부당하면 손해배상·해고 가능' },
        { id: 51, q: '직장폐쇄의 요건과 효과는?', a: '노조의 쟁의행위 대항, 임금지급의무 소멸' },
        { id: 52, q: '필수유지업무의 정의와 대상은?', a: '업무정지 시 공중생활 위해 업무, 의료·운송 등' },
        { id: 53, q: '대체근로 금지의 내용과 예외는?', a: '쟁의기간 중 대체근로 금지, 필수유지업무 예외' },
        { id: 54, q: '부당노동행위의 5가지 유형은?', a: '불이익취급, 황견계약, 단체교섭거부, 지배개입, 경비원조' },
        { id: 55, q: '부당노동행위 구제절차는?', a: '노동위원회 신청 → 심판 → 재심 → 행정소송' },
        { id: 56, q: '부당노동행위 구제명령의 내용은?', a: '원상회복, 불이익 시정, 단체교섭 응락 등' },
        { id: 57, q: '지배개입의 판단기준은?', a: '노조 조직·운영에 대한 실질적 영향력 행사' },
        { id: 58, q: '부당노동행위 의사의 추정과 입증은?', a: '객관적 정황으로 추정 가능, 사용자가 정당성 입증' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/category/legal/labor-attorney" className="text-gray-500 hover:text-gray-700">공인노무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">노동법</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">⚖️ 노동법 핵심문제</h1>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm text-gray-600">{completedQuestions.length}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {topics.map((topic, tidx) => (
          <div key={tidx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <button
              onClick={() => toggleTopic(tidx)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                  {tidx + 1}
                </span>
                <div className="text-left">
                  <h2 className="font-bold">{topic.title}</h2>
                  <p className="text-sm text-gray-500">{topic.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                </span>
                <span className={`transform transition ${openTopics.includes(tidx) ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </button>

            {openTopics.includes(tidx) && (
              <div className="border-t divide-y">
                {topic.questions.map((q) => (
                  <div key={q.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          completedQuestions.includes(q.id) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                        }`}
                      >
                        {completedQuestions.includes(q.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{q.id}. {q.q}</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{q.a}</p>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`공인노무사 시험 노동법 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 핵심 법리와 관련 조문
2. 대법원 판례와 해석
3. 실무적 적용 사례
4. 시험 출제 포인트
5. 관련 논점 연결`);
                            setShowAIModal(true);
                          }}
                          className="mt-2 px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
                        >
                          🤖 AI 해설
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

      {/* AI Modal */}
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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
