'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function DatabasePracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-1-database-practical-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('computer-skills-1-database-practical-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '테이블 설계',
      questions: [
        { id: 1, question: '새 테이블을 만들고 필드를 추가하시오.', answer: '만들기→테이블 디자인→필드 이름/데이터 형식 입력' },
        { id: 2, question: '기본 키(Primary Key)를 설정하시오.', answer: '필드 선택→디자인→기본 키 클릭 또는 우클릭→기본 키' },
        { id: 3, question: '필드 크기를 10으로 설정하시오.', answer: '필드 선택→하단 속성→필드 크기→10 입력' },
        { id: 4, question: '입력 마스크를 "000-0000-0000"으로 설정하시오.', answer: '필드 속성→입력 마스크→000-0000-0000 입력' },
        { id: 5, question: '기본값을 "서울"로 설정하시오.', answer: '필드 속성→기본값→"서울" 입력 (따옴표 포함)' },
        { id: 6, question: '필수 입력(Not Null)으로 설정하시오.', answer: '필드 속성→필수→예 선택' },
        { id: 7, question: '유효성 검사 규칙 >=0 AND <=100을 설정하시오.', answer: '필드 속성→유효성 검사 규칙→>=0 And <=100' },
        { id: 8, question: '조회 속성을 콤보 상자로 설정하시오.', answer: '조회 탭→컨트롤 표시→콤보 상자→행 원본에 값 목록' },
      ]
    },
    {
      title: '관계 설정',
      questions: [
        { id: 9, question: '두 테이블 간 관계를 설정하시오.', answer: '데이터베이스 도구→관계→테이블 추가→필드 드래그' },
        { id: 10, question: '참조 무결성을 적용하시오.', answer: '관계 편집→참조 무결성 적용 체크' },
        { id: 11, question: '관련 필드 모두 업데이트 옵션을 설정하시오.', answer: '관계 편집→관련 필드 모두 업데이트 체크' },
        { id: 12, question: '관련 레코드 모두 삭제 옵션을 설정하시오.', answer: '관계 편집→관련 레코드 모두 삭제 체크' },
        { id: 13, question: '1:N 관계와 조인 유형을 설정하시오.', answer: '관계선 더블클릭→조인 속성→조인 유형 선택 (내부/외부)' },
      ]
    },
    {
      title: '선택 쿼리 (핵심!)',
      questions: [
        { id: 14, question: '특정 조건을 만족하는 레코드를 검색하시오.', answer: '만들기→쿼리 디자인→테이블 추가→조건에 값 입력' },
        { id: 15, question: '조건에 와일드카드(*)를 사용하시오.', answer: '조건에 Like "김*" 입력 (김으로 시작하는 모든 값)' },
        { id: 16, question: '두 조건을 AND로 연결하시오.', answer: '같은 행의 다른 열에 각 조건 입력' },
        { id: 17, question: '두 조건을 OR로 연결하시오.', answer: '다른 행에 각 조건 입력' },
        { id: 18, question: 'BETWEEN으로 범위 조건을 설정하시오.', answer: 'Between #2026-01-01# And #2026-12-31#' },
        { id: 19, question: '계산 필드를 추가하시오.', answer: '빈 열에 합계: [단가]*[수량] 형식으로 입력' },
        { id: 20, question: 'IIf 함수로 조건부 결과를 표시하시오.', answer: '결과: IIf([점수]>=60,"합격","불합격")' },
        { id: 21, question: '정렬(오름차순/내림차순)을 설정하시오.', answer: '정렬 행에서 오름차순/내림차순 선택' },
        { id: 22, question: '상위 N개 레코드만 표시하시오.', answer: '디자인→반환에 숫자 또는 퍼센트 입력' },
      ]
    },
    {
      title: '매개변수/실행 쿼리',
      questions: [
        { id: 23, question: '매개변수 쿼리를 만드시오.', answer: '조건에 [검색할 이름을 입력하세요] 형식으로 입력' },
        { id: 24, question: '두 개의 매개변수를 사용하시오.', answer: '각 조건에 [시작일], [종료일] 입력, Between [시작일] And [종료일]' },
        { id: 25, question: '요약 쿼리(GROUP BY)를 만드시오.', answer: '디자인→요약 클릭→그룹화/합계/개수 등 선택' },
        { id: 26, question: '크로스탭 쿼리를 만드시오.', answer: '만들기→쿼리 마법사→크로스탭 쿼리 마법사' },
        { id: 27, question: '테이블 만들기 쿼리를 실행하시오.', answer: '디자인→테이블 만들기→테이블 이름 입력→실행' },
        { id: 28, question: '추가 쿼리를 만드시오.', answer: '디자인→추가→대상 테이블 선택→실행' },
        { id: 29, question: '업데이트 쿼리를 만드시오.', answer: '디자인→업데이트→업데이트 행에 새 값 입력→실행' },
        { id: 30, question: '삭제 쿼리를 만드시오.', answer: '디자인→삭제→조건 입력→실행' },
      ]
    },
    {
      title: '폼과 보고서',
      questions: [
        { id: 31, question: '폼 마법사로 폼을 만드시오.', answer: '만들기→폼 마법사→테이블/쿼리 선택→필드 선택' },
        { id: 32, question: '폼에 텍스트 상자 컨트롤을 추가하시오.', answer: '디자인→컨트롤→텍스트 상자→폼에 배치' },
        { id: 33, question: '폼에 계산 컨트롤을 추가하시오.', answer: '텍스트 상자 추가→컨트롤 원본에 =[단가]*[수량] 입력' },
        { id: 34, question: '폼에 명령 버튼을 추가하시오.', answer: '디자인→버튼→마법사로 동작 설정 (인쇄, 닫기 등)' },
        { id: 35, question: '콤보 상자를 추가하고 값 목록을 연결하시오.', answer: '콤보 상자 마법사→값 목록 또는 테이블/쿼리 선택' },
        { id: 36, question: '보고서 마법사로 보고서를 만드시오.', answer: '만들기→보고서 마법사→필드/그룹화/정렬 설정' },
        { id: 37, question: '보고서에 그룹화를 설정하시오.', answer: '보고서 마법사에서 그룹화 수준 추가 또는 디자인→그룹화 및 정렬' },
        { id: 38, question: '그룹 바닥글에 합계를 표시하시오.', answer: '그룹 바닥글에 텍스트 상자 추가→=Sum([금액])' },
        { id: 39, question: '보고서 바닥글에 총계를 표시하시오.', answer: '보고서 바닥글에 =Sum([금액]) 또는 =Count(*)' },
        { id: 40, question: '페이지 번호를 삽입하시오.', answer: '디자인→페이지 번호 또는 =[Page] & "/" & [Pages]' },
      ]
    },
  ];

  const allQuestions = topics.flatMap(t => t.questions);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a><span className="text-gray-300">›</span>
            <a href="/category/office/computer-skills-1" className="text-gray-600 hover:text-blue-600">컴활 1급</a><span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">액세스 실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-3xl">🗄️</span></div>
            <div><h1 className="text-2xl font-bold">데이터베이스 실기 (Access)</h1><p className="text-cyan-100">실기 | 40문항 학습</p></div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2"><span>학습 진행률</span><span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span></div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} /></div>
          </div>
          <div className="bg-red-500/30 rounded-lg p-3 border border-red-300">
            <p className="text-sm font-medium">⚠️ 쿼리가 가장 중요! 선택/매개변수 쿼리 완벽 마스터 필수!</p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => setOpenTopics(prev => prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex])}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition ${topicIndex === 2 || topicIndex === 3 ? 'bg-red-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 text-white rounded-lg flex items-center justify-center font-bold text-sm ${topicIndex === 2 || topicIndex === 3 ? 'bg-red-500' : 'bg-cyan-500'}`}>{topicIndex + 1}</div>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                  {(topicIndex === 2 || topicIndex === 3) && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">핵심</span>}
                </div>
                <span className={`transform transition ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border-2 transition ${progress[q.id] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => saveProgress(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${progress[q.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{progress[q.id] && '✓'}</button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-cyan-600 bg-cyan-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(`컴퓨터활용능력 1급 실기시험 Access 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 상세히 설명해주세요:\n1. 기능 설명\n2. 단계별 조작 방법 (메뉴 경로 포함)\n3. 주의사항\n4. 실수하기 쉬운 포인트\n5. 연습문제 2개`); setShowAIModal(true); }}
                          className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 실기 TIP */}
        <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-4">💡 액세스 실기 핵심 TIP</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm text-amber-900">
              <p>📝 <strong>쿼리가 가장 중요</strong> - 전체 배점의 40% 이상</p>
              <p>🔗 <strong>관계 설정 시 참조 무결성</strong> - 체크 여부 확인</p>
              <p>📋 <strong>매개변수 쿼리</strong> - [대괄호] 정확히 입력</p>
            </div>
            <div className="space-y-2 text-sm text-amber-900">
              <p>💾 <strong>저장 습관화</strong> - 작업 후 바로 Ctrl+S</p>
              <p>⚠️ <strong>실행 쿼리 주의</strong> - 실행 전 백업 확인</p>
              <p>📊 <strong>보고서 그룹화</strong> - 합계 위치 확인</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/computer-skills-1/study/spreadsheet-practical" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 엑셀 실기</a>
          <a href="/category/office/computer-skills-1" className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition">메인으로 돌아가기</a>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
