'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SpreadsheetStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'basic',
      name: '데이터 입력/편집',
      icon: '📝',
      questions: [
        { id: 1, q: '셀 참조 방식(상대/절대/혼합)을 설명하시오.', a: 'A1(상대), $A$1(절대), $A1/A$1(혼합)' },
        { id: 2, q: '셀 병합의 방법과 주의사항을 설명하시오.', a: '홈-셀 병합, 정렬 시 오류 발생 가능' },
        { id: 3, q: '자동 채우기 기능을 설명하시오.', a: '셀 모서리 드래그, 연속 데이터/패턴 자동 입력' },
        { id: 4, q: '데이터 유효성 검사를 설명하시오.', a: '입력값 제한, 목록/숫자/날짜 범위 설정' },
        { id: 5, q: '이름 정의의 활용 방법을 설명하시오.', a: '셀 범위에 이름 지정, 수식에서 참조 용이' },
        { id: 6, q: '메모와 설명의 차이를 설명하시오.', a: '메모: 단순 주석, 설명: 스레드형 대화' },
        { id: 7, q: '찾기 및 바꾸기 기능을 설명하시오.', a: 'Ctrl+F/H, 와일드카드(*, ?) 사용 가능' },
        { id: 8, q: '특수 붙여넣기 옵션을 설명하시오.', a: '값만, 서식만, 수식만, 행/열 바꿈 등' },
        { id: 9, q: '날짜/시간 입력 방법을 설명하시오.', a: 'Ctrl+;(오늘 날짜), Ctrl+Shift+;(현재 시간)' },
        { id: 10, q: '표시 형식의 종류를 설명하시오.', a: '숫자, 통화, 회계, 날짜, 백분율, 텍스트' }
      ]
    },
    {
      id: 'functions',
      name: '수식과 함수',
      icon: '🔢',
      questions: [
        { id: 1, q: 'SUM, AVERAGE, COUNT 함수를 설명하시오.', a: 'SUM: 합계, AVERAGE: 평균, COUNT: 숫자 개수' },
        { id: 2, q: 'MAX, MIN 함수를 설명하시오.', a: 'MAX: 최대값, MIN: 최소값 반환' },
        { id: 3, q: 'IF 함수의 사용법을 설명하시오.', a: 'IF(조건, 참값, 거짓값) - 조건부 결과 반환' },
        { id: 4, q: 'VLOOKUP 함수의 사용법을 설명하시오.', a: 'VLOOKUP(찾을값, 범위, 열번호, 일치유형)' },
        { id: 5, q: 'SUMIF, COUNTIF 함수를 설명하시오.', a: '조건에 맞는 값만 합계/개수 계산' },
        { id: 6, q: 'ROUND, ROUNDUP, ROUNDDOWN을 설명하시오.', a: '반올림, 올림, 내림 (자릿수 지정)' },
        { id: 7, q: 'LEFT, RIGHT, MID 함수를 설명하시오.', a: '문자열 왼쪽/오른쪽/중간에서 추출' },
        { id: 8, q: 'CONCATENATE와 & 연산자를 설명하시오.', a: '문자열 결합, ="A"&"B" 또는 CONCATENATE("A","B")' },
        { id: 9, q: 'DATE, YEAR, MONTH, DAY 함수를 설명하시오.', a: '날짜 생성/추출 함수' },
        { id: 10, q: 'RANK 함수의 사용법을 설명하시오.', a: 'RANK(값, 범위, 순서) - 순위 반환' }
      ]
    },
    {
      id: 'format',
      name: '서식 지정',
      icon: '🎨',
      questions: [
        { id: 1, q: '글꼴 서식 설정 방법을 설명하시오.', a: '글꼴, 크기, 굵게, 기울임, 밑줄, 색상' },
        { id: 2, q: '셀 테두리 설정 방법을 설명하시오.', a: '홈-테두리, 선 스타일, 색상 지정' },
        { id: 3, q: '조건부 서식의 사용법을 설명하시오.', a: '조건에 따라 자동 서식 적용, 데이터 막대, 색조' },
        { id: 4, q: '셀 스타일의 활용법을 설명하시오.', a: '미리 정의된 서식 세트, 일관된 디자인' },
        { id: 5, q: '행 높이/열 너비 조정 방법을 설명하시오.', a: '드래그, 더블클릭(자동 맞춤), 정확한 값 입력' },
        { id: 6, q: '숫자 형식 지정 방법을 설명하시오.', a: '천 단위 구분, 소수점 자릿수, 음수 표시' },
        { id: 7, q: '셀 정렬 방법을 설명하시오.', a: '가로(왼쪽/가운데/오른쪽), 세로(위/가운데/아래)' },
        { id: 8, q: '텍스트 줄 바꿈과 축소를 설명하시오.', a: '셀 내 줄 바꿈, 셀에 맞게 텍스트 축소' },
        { id: 9, q: '사용자 지정 서식 코드를 설명하시오.', a: '#,##0, 0.00%, yyyy-mm-dd 등' },
        { id: 10, q: '테마 색 변경 방법을 설명하시오.', a: '페이지 레이아웃-테마, 색, 글꼴 세트 변경' }
      ]
    },
    {
      id: 'data',
      name: '데이터 관리',
      icon: '📊',
      questions: [
        { id: 1, q: '데이터 정렬 방법을 설명하시오.', a: '오름차순/내림차순, 여러 기준 정렬' },
        { id: 2, q: '자동 필터의 사용법을 설명하시오.', a: '데이터-필터, 조건별 데이터 표시' },
        { id: 3, q: '고급 필터의 사용법을 설명하시오.', a: '복잡한 조건, 다른 위치에 결과 추출' },
        { id: 4, q: '텍스트 나누기 기능을 설명하시오.', a: '구분 기호/고정 너비로 열 분리' },
        { id: 5, q: '중복 데이터 제거 방법을 설명하시오.', a: '데이터-중복된 항목 제거' },
        { id: 6, q: '부분합 기능을 설명하시오.', a: '그룹별 합계/평균/개수 자동 계산' },
        { id: 7, q: '데이터 통합 방법을 설명하시오.', a: '여러 시트/파일 데이터 하나로 합치기' },
        { id: 8, q: '피벗 테이블의 개념을 설명하시오.', a: '데이터 요약/분석 도구, 드래그로 보고서 작성' },
        { id: 9, q: '그룹화 및 윤곽 기능을 설명하시오.', a: '행/열 그룹화, 펼치기/접기로 데이터 관리' },
        { id: 10, q: '외부 데이터 가져오기를 설명하시오.', a: '텍스트, 웹, 데이터베이스에서 가져오기' }
      ]
    },
    {
      id: 'chart',
      name: '차트/인쇄',
      icon: '📈',
      questions: [
        { id: 1, q: '차트 삽입 방법을 설명하시오.', a: '데이터 선택 후 삽입-차트, F11(빠른 차트)' },
        { id: 2, q: '차트 종류와 용도를 설명하시오.', a: '세로막대(비교), 꺾은선(추세), 원형(비율)' },
        { id: 3, q: '차트 요소를 설명하시오.', a: '제목, 범례, 축, 데이터 레이블, 눈금선' },
        { id: 4, q: '차트 스타일 변경 방법을 설명하시오.', a: '차트 도구-디자인, 스타일/색 변경' },
        { id: 5, q: '데이터 계열 추가/제거를 설명하시오.', a: '차트 선택-데이터 선택, 계열 편집' },
        { id: 6, q: '추세선 추가 방법을 설명하시오.', a: '데이터 계열 선택-추세선 추가' },
        { id: 7, q: '인쇄 영역 설정 방법을 설명하시오.', a: '페이지 레이아웃-인쇄 영역 설정' },
        { id: 8, q: '페이지 나누기 미리 보기를 설명하시오.', a: '보기-페이지 나누기 미리 보기' },
        { id: 9, q: '머리글/바닥글 설정 방법을 설명하시오.', a: '페이지 설정-머리글/바닥글 탭' },
        { id: 10, q: '인쇄 제목 설정 방법을 설명하시오.', a: '페이지 레이아웃-인쇄 제목, 반복할 행/열' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-2-spreadsheet-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('computer-skills-2-spreadsheet-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `컴퓨터활용능력 2급 스프레드시트 일반 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명 (엑셀 기능 위주)
3. 실제 사용 예시
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/computer-skills-2" className="text-gray-600 hover:text-green-600">컴활 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">스프레드시트 일반</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📊</span></div>
              <div>
                <h1 className="text-2xl font-bold">스프레드시트 일반</h1>
                <p className="text-green-200">컴퓨터활용능력 2급 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-green-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-3">
                    {topic.questions.map(q => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-green-500'}`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.q}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
                              >
                                🤖 AI에게 질문하기
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/category/office/computer-skills-2/study/computer-general" className="px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition">← 컴퓨터 일반</Link>
          <Link href="/category/office/computer-skills-2/study/spreadsheet-practical" className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition">스프레드시트 실무 →</Link>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div className="text-left"><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div className="text-left"><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
