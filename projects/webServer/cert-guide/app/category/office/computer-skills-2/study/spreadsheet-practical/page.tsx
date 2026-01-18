'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function SpreadsheetPracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'basic-work',
      name: '기본 작업',
      icon: '📝',
      questions: [
        { id: 1, q: '조건부 서식으로 특정 값 강조하기', a: '홈-조건부 서식-셀 강조 규칙, 조건 설정' },
        { id: 2, q: '데이터 유효성 검사로 목록 만들기', a: '데이터-데이터 유효성 검사-목록, 원본에 값 입력' },
        { id: 3, q: '셀 스타일 적용하기', a: '홈-셀 스타일, 미리 정의된 서식 선택' },
        { id: 4, q: '표시 형식 사용자 지정하기', a: '셀 서식-표시 형식-사용자 지정, 코드 입력' },
        { id: 5, q: '메모 삽입 및 편집하기', a: '검토-메모-새 메모, Shift+F2' },
        { id: 6, q: '하이퍼링크 삽입하기', a: 'Ctrl+K, 링크 대상(웹/파일/시트) 지정' },
        { id: 7, q: '틀 고정으로 머리글 유지하기', a: '보기-틀 고정, 선택한 셀 기준으로 고정' },
        { id: 8, q: '시트 보호 설정하기', a: '검토-시트 보호, 비밀번호/허용할 작업 설정' }
      ]
    },
    {
      id: 'calc-work',
      name: '계산 작업',
      icon: '🔢',
      questions: [
        { id: 1, q: 'IF 함수로 조건별 결과 표시하기', a: '=IF(조건,참값,거짓값), 중첩 IF 가능' },
        { id: 2, q: 'VLOOKUP으로 데이터 찾기', a: '=VLOOKUP(찾을값,범위,열번호,0), 정확히 일치' },
        { id: 3, q: 'SUMIF로 조건부 합계 구하기', a: '=SUMIF(범위,조건,합계범위)' },
        { id: 4, q: 'COUNTIF로 조건에 맞는 셀 개수 세기', a: '=COUNTIF(범위,조건)' },
        { id: 5, q: 'RANK 함수로 순위 구하기', a: '=RANK(값,범위,0), 0=내림차순, 1=오름차순' },
        { id: 6, q: 'ROUND 함수로 반올림하기', a: '=ROUND(숫자,자릿수), ROUNDUP/DOWN' },
        { id: 7, q: 'LEFT, MID, RIGHT로 문자열 추출하기', a: '=LEFT(텍스트,개수), =MID(텍스트,시작,개수)' },
        { id: 8, q: 'CONCATENATE로 문자열 결합하기', a: '=CONCATENATE(값1,값2,...) 또는 &연산자' },
        { id: 9, q: 'DATE, YEAR, MONTH, DAY 함수 활용하기', a: '=DATE(년,월,일), =YEAR(날짜) 등' },
        { id: 10, q: 'AND, OR 함수로 복합 조건 만들기', a: '=AND(조건1,조건2), =OR(조건1,조건2)' }
      ]
    },
    {
      id: 'analysis-work',
      name: '분석 작업',
      icon: '📊',
      questions: [
        { id: 1, q: '데이터 정렬하기 (다중 기준)', a: '데이터-정렬, 기준 추가로 다중 정렬' },
        { id: 2, q: '자동 필터로 데이터 추출하기', a: '데이터-필터, 드롭다운에서 조건 선택' },
        { id: 3, q: '고급 필터로 복잡한 조건 적용하기', a: '데이터-고급, 조건 범위/복사 위치 지정' },
        { id: 4, q: '부분합으로 그룹별 합계 구하기', a: '데이터-부분합, 그룹화 기준/함수 선택' },
        { id: 5, q: '피벗 테이블 만들기', a: '삽입-피벗 테이블, 행/열/값 필드 배치' },
        { id: 6, q: '피벗 테이블 필드 설정 변경하기', a: '값 필드 설정-합계/개수/평균 등 변경' },
        { id: 7, q: '그룹화로 데이터 접기/펼치기', a: '데이터-그룹, 행/열 그룹화' },
        { id: 8, q: '텍스트 나누기로 열 분리하기', a: '데이터-텍스트 나누기, 구분 기호 선택' }
      ]
    },
    {
      id: 'etc-work',
      name: '기타 작업',
      icon: '💡',
      questions: [
        { id: 1, q: '차트 삽입 및 편집하기', a: '삽입-차트, 차트 종류/스타일/데이터 편집' },
        { id: 2, q: '차트 제목과 범례 설정하기', a: '차트 요소 추가-제목/범례, 위치 조정' },
        { id: 3, q: '데이터 레이블 표시하기', a: '차트 요소 추가-데이터 레이블' },
        { id: 4, q: '추세선 추가하기', a: '데이터 계열 선택-추세선 추가' },
        { id: 5, q: '인쇄 영역 설정하기', a: '페이지 레이아웃-인쇄 영역-인쇄 영역 설정' },
        { id: 6, q: '머리글/바닥글 설정하기', a: '삽입-머리글/바닥글 또는 페이지 설정' },
        { id: 7, q: '매크로 기록하기', a: '개발 도구-매크로 기록, 작업 수행 후 중지' },
        { id: 8, q: '매크로 실행하기', a: 'Alt+F8 또는 개발 도구-매크로, 실행' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-skills-2-spreadsheet-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('computer-skills-2-spreadsheet-practical-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `컴퓨터활용능력 2급 스프레드시트 실무 실기 문제입니다.

작업: ${question}
방법: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 작업 개요
2. 단계별 상세 절차 (스크린샷 없이 텍스트로)
3. 주의사항 및 팁
4. 자주 나오는 변형 문제
5. 연습 과제 2개`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/computer-skills-2" className="text-gray-600 hover:text-teal-600">컴활 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">스프레드시트 실무</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">💻</span></div>
              <div>
                <h1 className="text-2xl font-bold">스프레드시트 실무</h1>
                <p className="text-teal-200">컴퓨터활용능력 2급 실기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-teal-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 실기 팁 카드 */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white mb-8">
          <h3 className="text-lg font-bold mb-3">💡 실기 시험 팁</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">⏱️ 시간 배분</p>
              <p className="opacity-90">40분 내 완료, 작업별 시간 체크</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">💾 수시 저장</p>
              <p className="opacity-90">Ctrl+S로 작업 중 자주 저장</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">📋 문제 꼼꼼히</p>
              <p className="opacity-90">조건 누락 주의, 셀 주소 확인</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">⌨️ 단축키 활용</p>
              <p className="opacity-90">Ctrl+C/V, Ctrl+Z, F4(반복)</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {topics.map(topic => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[`${topic.id}-${q.id}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTopics(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full p-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-between"
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
                              <p className="text-sm text-gray-600 mb-3"><strong>방법:</strong> {q.a}</p>
                              <button
                                onClick={() => handleAIClick(q.q, q.a)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/computer-skills-2/study/spreadsheet" className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">← 스프레드시트 일반</Link>
          <Link href="/category/office/computer-skills-2" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">메인으로 →</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
