'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('architect-engineer-practical-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('architect-engineer-practical-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '건축설계 도면작성',
      questions: [
        { id: 1, question: '평면도 작성 시 표기해야 할 필수 요소를 나열하시오.', answer: '벽체, 개구부, 치수, 실명, 문창호, 계단, 가구배치', prompt: '건축기사 실기 문제입니다.\n\n문제: 평면도 작성 시 필수 표기요소를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 구조체 표현 방법\n2. 치수 기입 방법\n3. 문창호 기호\n4. 실명 및 면적 표기' },
        { id: 2, question: '단면도 작성 시 표현해야 할 요소를 설명하시오.', answer: '층고, 천장고, 기초, 지붕, 단열재, 방수층', prompt: '건축기사 실기 문제입니다.\n\n문제: 단면도 작성 시 표현 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수직 치수 표기\n2. 구조체 표현\n3. 단열·방수 표현\n4. GL(지반선) 표기' },
        { id: 3, question: '입면도 작성 시 표현해야 할 요소를 설명하시오.', answer: '창호, 마감재, 지붕형태, GL선, 층별높이', prompt: '건축기사 실기 문제입니다.\n\n문제: 입면도 작성 시 표현 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 형태 표현\n2. 창호 표현\n3. 마감재 표현\n4. 높이 표기' },
        { id: 4, question: '건축도면의 축척과 적용 기준을 설명하시오.', answer: '배치도 1/500, 평면도 1/100~1/200, 상세도 1/20~1/50', prompt: '건축기사 실기 문제입니다.\n\n문제: 건축도면의 축척 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배치도 축척\n2. 평면도·입면도 축척\n3. 상세도 축척\n4. 축척 선정 기준' },
        { id: 5, question: '창호도에 표기해야 할 내용을 설명하시오.', answer: '창호 기호, 재질, 규격, 설치위치, 유리종류', prompt: '건축기사 실기 문제입니다.\n\n문제: 창호도 표기 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 창호 기호 체계\n2. 규격 표기 방법\n3. 재질 및 유리 표기\n4. 창호일람표 작성' },
      ],
    },
    {
      title: '건축적산',
      questions: [
        { id: 6, question: '콘크리트 물량 산출방법을 설명하시오.', answer: '부재별 체적 산출, 할증 적용(3~5%)', prompt: '건축기사 실기 문제입니다.\n\n문제: 콘크리트 물량 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부재별 체적 계산\n2. 공제 항목\n3. 할증률 적용\n4. 물량 집계' },
        { id: 7, question: '거푸집 면적 산출방법을 설명하시오.', answer: '콘크리트 노출면적, 부재별 산출', prompt: '건축기사 실기 문제입니다.\n\n문제: 거푸집 면적 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기둥 거푸집 면적\n2. 보 거푸집 면적\n3. 슬래브 거푸집 면적\n4. 벽체 거푸집 면적' },
        { id: 8, question: '철근량 산출방법을 설명하시오.', answer: '설계도서 기준, 정착·이음 길이 포함', prompt: '건축기사 실기 문제입니다.\n\n문제: 철근량 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 철근 길이 산출\n2. 정착·이음 길이 추가\n3. 개수 산정\n4. 중량 환산' },
        { id: 9, question: '조적 물량 산출방법을 설명하시오.', answer: '벽체면적×매수/㎡, 개구부 공제', prompt: '건축기사 실기 문제입니다.\n\n문제: 조적 물량 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 벽체 면적 산출\n2. 개구부 공제\n3. 1㎡당 소요량\n4. 모르타르량 산출' },
        { id: 10, question: '마감재 면적 산출방법을 설명하시오.', answer: '바닥·벽·천장 면적별 산출', prompt: '건축기사 실기 문제입니다.\n\n문제: 마감재 면적 산출방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바닥 마감 면적\n2. 벽 마감 면적\n3. 천장 마감 면적\n4. 걸레받이·코너비드' },
      ],
    },
    {
      title: '구조계산',
      questions: [
        { id: 11, question: '보의 단면 설계 절차를 설명하시오.', answer: '하중산정→모멘트계산→단면결정→철근량산정', prompt: '건축기사 실기 문제입니다.\n\n문제: 보의 단면 설계 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계하중 산정\n2. 휨모멘트 계산\n3. 유효깊이 결정\n4. 인장철근량 산정' },
        { id: 12, question: '슬래브 철근량 계산 방법을 설명하시오.', answer: '모멘트에 따른 철근량, 배력근 배치', prompt: '건축기사 실기 문제입니다.\n\n문제: 슬래브 철근량 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슬래브 모멘트 계산\n2. 주철근량 산정\n3. 배력근 배치\n4. 철근 간격 결정' },
        { id: 13, question: '기둥의 축하중 계산 방법을 설명하시오.', answer: '고정하중+활하중의 합산, 하중조합', prompt: '건축기사 실기 문제입니다.\n\n문제: 기둥의 축하중 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부담면적 산정\n2. 고정하중 계산\n3. 활하중 계산\n4. 설계축력 산정' },
        { id: 14, question: '기초의 지지력 검토 방법을 설명하시오.', answer: '접지압=축력/기초면적 ≤ 허용지지력', prompt: '건축기사 실기 문제입니다.\n\n문제: 기초의 지지력 검토 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초에 작용하는 하중\n2. 접지압 계산\n3. 허용지지력 비교\n4. 편심하중 시 검토' },
        { id: 15, question: '철근의 정착길이 계산 방법을 설명하시오.', answer: 'ld = db × fy / (4 × τu)', prompt: '건축기사 실기 문제입니다.\n\n문제: 철근의 정착길이 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정착길이 공식\n2. 영향 요인\n3. 최소 정착길이\n4. 갈고리 정착' },
      ],
    },
    {
      title: '설비계획',
      questions: [
        { id: 16, question: '급수관 관경 결정 방법을 설명하시오.', answer: '기구급수부하단위→동시사용률→관경표', prompt: '건축기사 실기 문제입니다.\n\n문제: 급수관 관경 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기구급수부하단위 합산\n2. 동시사용률 적용\n3. 유량 산정\n4. 관경표에서 결정' },
        { id: 17, question: '냉난방 부하 계산의 기본식을 설명하시오.', answer: 'Q = U × A × ΔT (열관류율×면적×온도차)', prompt: '건축기사 실기 문제입니다.\n\n문제: 냉난방 부하 계산의 기본식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열관류에 의한 부하\n2. 환기에 의한 부하\n3. 내부발열 부하\n4. 총 부하 산정' },
        { id: 18, question: '환기량 산정 방법을 설명하시오.', answer: '환기횟수법: Q = V × n (실체적×환기횟수)', prompt: '건축기사 실기 문제입니다.\n\n문제: 환기량 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기횟수법\n2. 1인당 필요 환기량법\n3. CO2 기준법\n4. 용도별 환기횟수' },
        { id: 19, question: '조명 설계의 기본 계산을 설명하시오.', answer: 'N = E × A / (F × U × M) (조도×면적/광속×이용률×보수율)', prompt: '건축기사 실기 문제입니다.\n\n문제: 조명 설계의 기본 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요 조도 결정\n2. 광원 선정\n3. 등기구 개수 산정\n4. 배치 계획' },
        { id: 20, question: '소방설비 설계의 기본사항을 설명하시오.', answer: '방호구역, 수원용량, 배관경', prompt: '건축기사 실기 문제입니다.\n\n문제: 소방설비 설계의 기본사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상 판단\n2. 수원 용량 산정\n3. 헤드 배치\n4. 배관 계획' },
      ],
    },
    {
      title: '도면 해석 및 응용',
      questions: [
        { id: 21, question: '건축도면의 선 종류와 용도를 설명하시오.', answer: '실선(외곽), 파선(은선), 일점쇄선(중심)', prompt: '건축기사 실기 문제입니다.\n\n문제: 건축도면의 선 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실선의 용도\n2. 파선의 용도\n3. 일점쇄선의 용도\n4. 선의 굵기 구분' },
        { id: 22, question: '건축도면의 기호와 약어를 설명하시오.', answer: 'GL, FL, CH, W, D, FD, SD', prompt: '건축기사 실기 문제입니다.\n\n문제: 건축도면의 기호와 약어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레벨 관련 기호\n2. 창호 관련 기호\n3. 재료 관련 기호\n4. 설비 관련 기호' },
        { id: 23, question: '계단의 설계기준을 설명하시오.', answer: '단높이 180mm 이하, 단너비 260mm 이상', prompt: '건축기사 실기 문제입니다.\n\n문제: 계단의 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단높이·단너비 기준\n2. 계단참 설치 기준\n3. 난간 설치 기준\n4. 계단 폭 기준' },
        { id: 24, question: '경사로의 설계기준을 설명하시오.', answer: '경사도 1/12 이하, 폭 1.2m 이상', prompt: '건축기사 실기 문제입니다.\n\n문제: 경사로의 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경사도 기준\n2. 유효폭 기준\n3. 활동방지 바닥재\n4. 손잡이 설치' },
        { id: 25, question: '주차장 설계기준을 설명하시오.', answer: '일반 2.3×5.0m, 장애인 3.3×5.0m', prompt: '건축기사 실기 문제입니다.\n\n문제: 주차장 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주차구획 크기\n2. 차로 폭\n3. 경사로 기준\n4. 장애인주차구역' },
      ],
    },
  ];

  const progress = Math.round((completedQuestions.size / 25) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/category/construction/architect-engineer" className="flex items-center gap-2 text-orange-600">
            <span>←</span><span className="font-medium">건축기사</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{completedQuestions.size}/25 완료</div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-red-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-red-500">✍️</span> 실기(작업형)
          </h1>
          <p className="text-gray-500 mt-1">건축기사 실기시험 대비 (25문항)</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => {
                  const newOpen = new Set(openTopics);
                  if (newOpen.has(topicIdx)) newOpen.delete(topicIdx);
                  else newOpen.add(topicIdx);
                  setOpenTopics(newOpen);
                }}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-red-500 to-orange-500 text-white"
              >
                <span className="font-bold">{topic.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-100">
                    {topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}
                  </span>
                  <span>{openTopics.has(topicIdx) ? '▼' : '▶'}</span>
                </div>
              </button>
              {openTopics.has(topicIdx) && (
                <div className="divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                            completedQuestions.has(q.id)
                              ? 'bg-red-500 border-red-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-500 mt-1">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200 transition"
                        >
                          🤖 AI
                        </button>
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

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
