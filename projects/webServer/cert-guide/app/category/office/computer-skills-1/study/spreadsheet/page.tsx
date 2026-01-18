'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function SpreadsheetStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [progress, setProgress] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-1-spreadsheet-progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    setProgress(newProgress);
    localStorage.setItem('computer-skills-1-spreadsheet-progress', JSON.stringify(newProgress));
  };

  const topics = [
    {
      title: '기본 함수',
      questions: [
        { id: 1, question: 'SUM, AVERAGE, COUNT 함수의 사용법을 설명하시오.', answer: 'SUM(범위): 합계, AVERAGE(범위): 평균, COUNT(범위): 숫자 개수' },
        { id: 2, question: 'MAX, MIN 함수의 사용법과 예시를 설명하시오.', answer: 'MAX(범위): 최대값, MIN(범위): 최소값, =MAX(A1:A10)' },
        { id: 3, question: 'RANK 함수의 사용법을 설명하시오.', answer: '=RANK(값, 범위, [순서]), 순서 0/생략:내림차순, 1:오름차순' },
        { id: 4, question: 'ROUND, ROUNDUP, ROUNDDOWN 함수를 비교하시오.', answer: 'ROUND: 반올림, ROUNDUP: 올림, ROUNDDOWN: 버림, =ROUND(값, 자릿수)' },
        { id: 5, question: 'INT와 TRUNC 함수의 차이를 설명하시오.', answer: 'INT: 정수 부분만(음수는 더 작은 정수), TRUNC: 단순 자름' },
        { id: 6, question: 'MOD 함수의 사용법과 활용 예시를 설명하시오.', answer: '=MOD(수, 제수): 나머지, 홀짝 구분 =MOD(A1,2)=0이면 짝수' },
        { id: 7, question: 'ABS 함수의 용도를 설명하시오.', answer: '=ABS(값): 절대값 반환, =ABS(-5)=5' },
        { id: 8, question: 'PRODUCT 함수의 사용법을 설명하시오.', answer: '=PRODUCT(범위): 모든 값의 곱, =PRODUCT(A1:A3)=A1*A2*A3' },
        { id: 9, question: 'LARGE, SMALL 함수의 사용법을 설명하시오.', answer: '=LARGE(범위, k): k번째 큰 값, =SMALL(범위, k): k번째 작은 값' },
        { id: 10, question: 'COUNTA와 COUNTBLANK 함수를 설명하시오.', answer: 'COUNTA: 비어있지 않은 셀 개수, COUNTBLANK: 빈 셀 개수' },
      ]
    },
    {
      title: '찾기/참조 함수',
      questions: [
        { id: 11, question: 'VLOOKUP 함수의 문법과 사용법을 설명하시오.', answer: '=VLOOKUP(찾을값, 범위, 열번호, [유형]), 유형 FALSE:정확히 일치' },
        { id: 12, question: 'VLOOKUP에서 TRUE와 FALSE의 차이를 설명하시오.', answer: 'FALSE: 정확히 일치(권장), TRUE/생략: 근사값(범위 오름차순 정렬 필요)' },
        { id: 13, question: 'HLOOKUP 함수의 사용법을 설명하시오.', answer: '=HLOOKUP(찾을값, 범위, 행번호, [유형]), 가로 방향 검색' },
        { id: 14, question: 'INDEX 함수의 사용법을 설명하시오.', answer: '=INDEX(범위, 행번호, [열번호]), 지정 위치의 값 반환' },
        { id: 15, question: 'MATCH 함수의 사용법을 설명하시오.', answer: '=MATCH(찾을값, 범위, [유형]), 값의 위치(행/열 번호) 반환' },
        { id: 16, question: 'INDEX+MATCH 조합이 VLOOKUP보다 좋은 이유를 설명하시오.', answer: '왼쪽 방향 검색 가능, 열 삽입/삭제에 영향 없음, 더 유연함' },
        { id: 17, question: 'CHOOSE 함수의 사용법을 설명하시오.', answer: '=CHOOSE(인덱스, 값1, 값2...), 인덱스 번호에 해당하는 값 반환' },
        { id: 18, question: 'OFFSET 함수의 사용법을 설명하시오.', answer: '=OFFSET(기준셀, 행이동, 열이동, [높이], [너비]), 동적 범위 생성' },
        { id: 19, question: 'INDIRECT 함수의 사용법을 설명하시오.', answer: '=INDIRECT("A1"), 문자열을 셀 참조로 변환' },
        { id: 20, question: 'ROW, COLUMN 함수의 사용법을 설명하시오.', answer: '=ROW(): 현재 행번호, =COLUMN(): 현재 열번호' },
      ]
    },
    {
      title: '논리/조건 함수',
      questions: [
        { id: 21, question: 'IF 함수의 중첩 사용법을 설명하시오.', answer: '=IF(조건1, 값1, IF(조건2, 값2, 값3)), 최대 64개 중첩 가능' },
        { id: 22, question: 'AND, OR 함수의 차이를 설명하시오.', answer: 'AND: 모든 조건 참이면 TRUE, OR: 하나라도 참이면 TRUE' },
        { id: 23, question: 'SUMIF 함수의 사용법을 설명하시오.', answer: '=SUMIF(조건범위, 조건, [합계범위]), 조건 만족 셀만 합계' },
        { id: 24, question: 'COUNTIF 함수의 사용법을 설명하시오.', answer: '=COUNTIF(범위, 조건), 조건 만족 셀 개수' },
        { id: 25, question: 'SUMIFS와 SUMIF의 차이를 설명하시오.', answer: 'SUMIFS: 여러 조건 AND로 연결, =SUMIFS(합계범위, 조건범위1, 조건1, ...)' },
        { id: 26, question: 'AVERAGEIF 함수의 사용법을 설명하시오.', answer: '=AVERAGEIF(조건범위, 조건, [평균범위]), 조건 만족 셀만 평균' },
        { id: 27, question: 'IFERROR 함수의 용도를 설명하시오.', answer: '=IFERROR(값, 에러시반환값), #N/A, #DIV/0! 등 오류 처리' },
        { id: 28, question: 'IFS 함수의 사용법을 설명하시오.', answer: '=IFS(조건1, 값1, 조건2, 값2...), 중첩 IF 대체' },
        { id: 29, question: 'SWITCH 함수의 사용법을 설명하시오.', answer: '=SWITCH(표현식, 값1, 결과1, 값2, 결과2..., [기본값])' },
        { id: 30, question: 'NOT 함수의 사용법을 설명하시오.', answer: '=NOT(논리값), TRUE→FALSE, FALSE→TRUE 반전' },
      ]
    },
    {
      title: '텍스트/날짜 함수',
      questions: [
        { id: 31, question: 'LEFT, RIGHT, MID 함수의 사용법을 설명하시오.', answer: 'LEFT(텍스트, 문자수): 왼쪽부터, RIGHT: 오른쪽부터, MID(텍스트, 시작, 개수)' },
        { id: 32, question: 'CONCATENATE와 CONCAT 함수의 차이를 설명하시오.', answer: 'CONCAT: 범위 사용 가능(Excel 2016+), CONCATENATE: 개별 지정' },
        { id: 33, question: 'TRIM 함수의 용도를 설명하시오.', answer: '=TRIM(텍스트), 앞뒤 공백 및 중복 공백 제거' },
        { id: 34, question: 'SUBSTITUTE와 REPLACE 함수의 차이를 설명하시오.', answer: 'SUBSTITUTE: 특정 문자열 대체, REPLACE: 위치 기준 대체' },
        { id: 35, question: 'LEN 함수의 사용법을 설명하시오.', answer: '=LEN(텍스트), 문자열 길이(글자 수) 반환' },
        { id: 36, question: 'TEXT 함수의 사용법을 설명하시오.', answer: '=TEXT(값, "형식"), 숫자를 원하는 형식의 텍스트로' },
        { id: 37, question: 'TODAY와 NOW 함수의 차이를 설명하시오.', answer: 'TODAY(): 오늘 날짜만, NOW(): 현재 날짜+시간' },
        { id: 38, question: 'YEAR, MONTH, DAY 함수의 사용법을 설명하시오.', answer: '날짜에서 연/월/일 추출, =YEAR(A1), =MONTH(A1), =DAY(A1)' },
        { id: 39, question: 'DATEDIF 함수의 사용법을 설명하시오.', answer: '=DATEDIF(시작일, 종료일, 단위), 단위: "Y"년, "M"월, "D"일' },
        { id: 40, question: 'WEEKDAY 함수의 사용법을 설명하시오.', answer: '=WEEKDAY(날짜, [유형]), 요일 숫자 반환 (1=일요일~7=토요일)' },
      ]
    },
    {
      title: '데이터 관리/차트',
      questions: [
        { id: 41, question: '데이터 정렬의 종류와 방법을 설명하시오.', answer: '오름차순/내림차순, 다중 기준 정렬, 데이터→정렬' },
        { id: 42, question: '자동 필터와 고급 필터의 차이를 설명하시오.', answer: '자동필터: 드롭다운 선택, 고급필터: 조건 범위로 복잡한 조건' },
        { id: 43, question: '피벗 테이블의 구성 요소를 설명하시오.', answer: '행, 열, 값, 필터 영역으로 구성, 데이터 요약/분석' },
        { id: 44, question: '데이터 유효성 검사의 종류를 설명하시오.', answer: '정수, 소수, 목록, 날짜, 시간, 텍스트 길이, 사용자 지정' },
        { id: 45, question: '조건부 서식의 활용법을 설명하시오.', answer: '셀 강조 규칙, 상위/하위 규칙, 데이터 막대, 색조, 아이콘 집합' },
        { id: 46, question: '차트의 종류와 각 용도를 설명하시오.', answer: '세로막대: 비교, 꺾은선: 추세, 원형: 비율, 분산형: 상관관계' },
        { id: 47, question: '목표값 찾기 기능의 사용법을 설명하시오.', answer: '데이터→가상분석→목표값찾기, 원하는 결과를 위한 입력값 계산' },
        { id: 48, question: '시나리오 관리자의 용도를 설명하시오.', answer: '여러 가정 상황별 결과 비교, What-if 분석' },
        { id: 49, question: '매크로 기록 방법을 설명하시오.', answer: '보기→매크로→매크로 기록, 작업 자동화' },
        { id: 50, question: '이름 정의(Name)의 활용법을 설명하시오.', answer: '범위에 이름 지정, 수식에서 사용하여 가독성 향상, =SUM(매출)' },
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
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/office/computer-skills-1" className="text-gray-600 hover:text-blue-600">컴활 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">스프레드시트 일반</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">스프레드시트 일반</h1>
              <p className="text-teal-100">2과목 | 50문항 학습</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedCount}/{allQuestions.length} ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev =>
                  prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex]
                )}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">{topicIndex + 1}</div>
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
                        <button onClick={() => saveProgress(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${progress[q.id] ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                          {progress[q.id] && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-teal-600 bg-teal-50 px-3 py-2 rounded-lg">💡 {q.answer}</p>
                        </div>
                        <button onClick={() => { setCurrentPrompt(`컴퓨터활용능력 1급 필기시험 "스프레드시트 일반" 과목 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 상세히 설명해주세요:\n1. 함수 문법과 매개변수\n2. 실제 사용 예시\n3. 시험 출제 포인트\n4. 관련 함수 연결\n5. 연습문제 3개 (정답 포함)`); setShowAIModal(true); }}
                          className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <a href="/category/office/computer-skills-1/study/computer-general" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 컴퓨터 일반</a>
          <a href="/category/office/computer-skills-1/study/database" className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition">다음: 데이터베이스 일반 →</a>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div>
      </footer>
    </div>
  );
}
