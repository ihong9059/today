'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function SpreadsheetPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-1-spreadsheet-practical-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('computer-skills-1-spreadsheet-practical-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '함수 작성 (필수)',
      questions: [
        { id: 1, question: 'VLOOKUP으로 사원번호에 해당하는 사원명을 찾으시오.', answer: '=VLOOKUP(A2,$G$2:$I$10,2,FALSE), 범위 절대참조 필수' },
        { id: 2, question: 'INDEX와 MATCH를 조합하여 제품코드로 가격을 찾으시오.', answer: '=INDEX(가격범위,MATCH(제품코드,코드범위,0))' },
        { id: 3, question: 'SUMIF로 부서가 "영업부"인 매출 합계를 구하시오.', answer: '=SUMIF(부서범위,"영업부",매출범위)' },
        { id: 4, question: 'COUNTIF로 점수가 80점 이상인 인원수를 구하시오.', answer: '=COUNTIF(점수범위,">=80")' },
        { id: 5, question: 'SUMIFS로 부서가 "영업부"이고 직급이 "과장"인 급여 합계를 구하시오.', answer: '=SUMIFS(급여범위,부서범위,"영업부",직급범위,"과장")' },
        { id: 6, question: 'IF 함수로 점수가 60점 이상이면 "합격", 아니면 "불합격"을 표시하시오.', answer: '=IF(점수>=60,"합격","불합격")' },
        { id: 7, question: '중첩 IF로 점수에 따라 A/B/C/D/F 학점을 구하시오.', answer: '=IF(점수>=90,"A",IF(점수>=80,"B",IF(점수>=70,"C",IF(점수>=60,"D","F"))))' },
        { id: 8, question: 'IFERROR로 오류 발생 시 빈 문자열을 표시하시오.', answer: '=IFERROR(계산식,"") 또는 =IFERROR(VLOOKUP(...),"")' },
        { id: 9, question: 'ROUND로 소수점 둘째자리에서 반올림하시오.', answer: '=ROUND(값,1), 소수 첫째자리까지 표시' },
        { id: 10, question: 'RANK로 매출액 순위를 내림차순으로 구하시오.', answer: '=RANK(A2,$A$2:$A$10,0), 0은 내림차순' },
      ]
    },
    {
      title: '텍스트/날짜 함수',
      questions: [
        { id: 11, question: 'LEFT로 주민번호에서 생년월일 6자리를 추출하시오.', answer: '=LEFT(주민번호,6)' },
        { id: 12, question: 'MID로 주민번호에서 성별 코드(7번째 자리)를 추출하시오.', answer: '=MID(주민번호,8,1), 하이픈 포함 시' },
        { id: 13, question: 'RIGHT로 전화번호에서 뒤 4자리를 추출하시오.', answer: '=RIGHT(전화번호,4)' },
        { id: 14, question: 'CONCATENATE로 성과 이름을 합치시오.', answer: '=CONCATENATE(성," ",이름) 또는 =성&" "&이름' },
        { id: 15, question: 'YEAR, MONTH, DAY로 날짜에서 연/월/일을 각각 추출하시오.', answer: '=YEAR(날짜), =MONTH(날짜), =DAY(날짜)' },
        { id: 16, question: 'DATEDIF로 입사일부터 오늘까지 근속년수를 계산하시오.', answer: '=DATEDIF(입사일,TODAY(),"Y")' },
        { id: 17, question: 'TEXT로 날짜를 "2026년 1월 9일" 형식으로 변환하시오.', answer: '=TEXT(날짜,"yyyy년 m월 d일")' },
        { id: 18, question: 'WEEKDAY로 요일을 구하고 IF로 "평일/주말"을 표시하시오.', answer: '=IF(OR(WEEKDAY(날짜)=1,WEEKDAY(날짜)=7),"주말","평일")' },
        { id: 19, question: 'TRIM으로 이름 앞뒤 공백을 제거하시오.', answer: '=TRIM(이름)' },
        { id: 20, question: 'SUBSTITUTE로 전화번호의 "-"를 제거하시오.', answer: '=SUBSTITUTE(전화번호,"-","")' },
      ]
    },
    {
      title: '피벗 테이블',
      questions: [
        { id: 21, question: '피벗 테이블 생성 방법을 설명하시오.', answer: '삽입→피벗 테이블→데이터 범위 선택→위치 지정' },
        { id: 22, question: '피벗 테이블에서 부서별 매출 합계를 구하시오.', answer: '행: 부서, 값: 매출(합계)' },
        { id: 23, question: '피벗 테이블에서 부서별/제품별 교차 분석을 수행하시오.', answer: '행: 부서, 열: 제품, 값: 매출(합계)' },
        { id: 24, question: '피벗 테이블 필터로 특정 연도 데이터만 표시하시오.', answer: '필터 영역에 연도 필드 추가, 원하는 연도 선택' },
        { id: 25, question: '피벗 테이블 값 필드 설정을 합계에서 평균으로 변경하시오.', answer: '값 필드 클릭→값 필드 설정→평균 선택' },
      ]
    },
    {
      title: '차트 작성',
      questions: [
        { id: 26, question: '세로 막대형 차트를 작성하시오.', answer: '데이터 선택→삽입→차트→세로 막대형' },
        { id: 27, question: '차트 제목을 "월별 매출 현황"으로 변경하시오.', answer: '차트 제목 클릭→텍스트 입력 또는 셀 참조 =A1' },
        { id: 28, question: '차트에 데이터 레이블을 추가하시오.', answer: '차트 선택→+버튼→데이터 레이블 체크' },
        { id: 29, question: '원형 차트를 작성하고 비율(%)을 표시하시오.', answer: '원형 차트 삽입→데이터 레이블→백분율 표시' },
        { id: 30, question: '차트 종류를 꺾은선형으로 변경하시오.', answer: '차트 선택→디자인→차트 종류 변경→꺾은선형' },
      ]
    },
    {
      title: '기타 기능',
      questions: [
        { id: 31, question: '조건부 서식으로 80점 이상을 녹색으로 표시하시오.', answer: '홈→조건부 서식→셀 강조 규칙→보다 큼→80→녹색' },
        { id: 32, question: '데이터 유효성으로 목록(드롭다운)을 만드시오.', answer: '데이터→데이터 유효성→목록→원본에 범위 또는 값 입력' },
        { id: 33, question: '자동 필터로 "영업부" 데이터만 표시하시오.', answer: '데이터→필터→부서 드롭다운→영업부 선택' },
        { id: 34, question: '고급 필터로 복잡한 조건 필터링을 수행하시오.', answer: '데이터→고급→조건 범위 지정→복사 위치 지정' },
        { id: 35, question: '매크로를 기록하고 실행하시오.', answer: '보기→매크로→매크로 기록→작업 수행→기록 중지→실행' },
        { id: 36, question: '이름 정의로 범위에 이름을 지정하시오.', answer: '범위 선택→이름 상자에 이름 입력 또는 수식→이름 관리자' },
        { id: 37, question: '틀 고정으로 머리글 행을 고정하시오.', answer: '고정할 행 아래 셀 선택→보기→틀 고정' },
        { id: 38, question: '인쇄 영역을 설정하시오.', answer: '범위 선택→페이지 레이아웃→인쇄 영역→인쇄 영역 설정' },
        { id: 39, question: '목표값 찾기로 원하는 결과를 위한 입력값을 계산하시오.', answer: '데이터→가상 분석→목표값 찾기→수식 셀/목표값/변경 셀 지정' },
        { id: 40, question: '텍스트 나누기로 데이터를 분리하시오.', answer: '데이터→텍스트 나누기→구분 기호 선택(탭/쉼표/공백)' },
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
            <span className="text-emerald-600 font-medium">엑셀 실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-600 to-green-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl"><span className="text-3xl">📊</span></div>
            <div><h1 className="text-2xl font-bold">스프레드시트 실기 (Excel)</h1><p className="text-emerald-100">실기 | 40문항 학습</p></div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2"><span>학습 진행률</span><span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span></div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} /></div>
          </div>
          <div className="bg-red-500/30 rounded-lg p-3 border border-red-300">
            <p className="text-sm font-medium">⚠️ 실기 합격 기준: 70점 이상 (필기 60점보다 높음!)</p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => setOpenTopics(prev => prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex])}
                className={`w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition ${topicIndex === 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 text-white rounded-lg flex items-center justify-center font-bold text-sm ${topicIndex === 0 ? 'bg-red-500' : 'bg-emerald-500'}`}>{topicIndex + 1}</div>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
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
                          <p className="text-sm text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg font-mono">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(`컴퓨터활용능력 1급 실기시험 엑셀 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 상세히 설명해주세요:\n1. 함수/기능 설명\n2. 단계별 조작 방법\n3. 주의사항\n4. 실수하기 쉬운 포인트\n5. 연습문제 2개`); setShowAIModal(true); }}
                          className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/computer-skills-1/study/database" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 데이터베이스 일반</a>
          <a href="/category/office/computer-skills-1/study/database-practical" className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition">다음: 액세스 실기 →</a>
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
