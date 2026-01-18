'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'excel-basic',
      name: '엑셀 기본 작업',
      icon: '📊',
      questions: [
        { id: 1, q: '셀 참조 방식(상대/절대/혼합)의 활용', a: 'A1(상대), $A$1(절대), $A1/A$1(혼합), F4로 전환' },
        { id: 2, q: '조건부 서식 설정하기', a: '홈-조건부 서식, 규칙 관리, 데이터 막대/색조/아이콘' },
        { id: 3, q: '사용자 지정 서식 코드 작성', a: '#,##0, 0.00%, yyyy-mm-dd, [조건]서식 등' },
        { id: 4, q: '이름 정의 및 활용', a: '수식-이름 관리자, 셀/범위에 이름 부여, 수식에서 참조' },
        { id: 5, q: '데이터 유효성 검사 설정', a: '데이터-데이터 유효성 검사, 목록/숫자/날짜 제한' },
        { id: 6, q: '하이퍼링크 삽입', a: 'Ctrl+K, 웹페이지/시트/파일 링크, HYPERLINK 함수' },
        { id: 7, q: '시트 보호 및 통합 문서 보호', a: '검토-시트 보호/통합 문서 보호, 비밀번호 설정' },
        { id: 8, q: '메모 및 설명 삽입', a: '검토-메모, Shift+F2, 스레드 형식 설명' }
      ]
    },
    {
      id: 'excel-function',
      name: '엑셀 함수',
      icon: '🔢',
      questions: [
        { id: 1, q: 'VLOOKUP/HLOOKUP 함수 활용', a: 'VLOOKUP(찾을값,범위,열번호,0), 정확히/유사 일치' },
        { id: 2, q: 'INDEX/MATCH 함수 조합', a: 'INDEX(범위,MATCH(값,범위,0)), 양방향 검색' },
        { id: 3, q: 'SUMIF/COUNTIF/AVERAGEIF 함수', a: '조건에 맞는 데이터 합계/개수/평균' },
        { id: 4, q: 'SUMIFS/COUNTIFS 다중 조건 함수', a: '여러 조건 충족 시 계산, 조건 쌍으로 입력' },
        { id: 5, q: 'IF 함수 중첩', a: '=IF(조건1,결과1,IF(조건2,결과2,결과3))' },
        { id: 6, q: 'AND/OR/NOT 논리 함수', a: 'IF와 조합, =IF(AND(조건1,조건2),참,거짓)' },
        { id: 7, q: 'LEFT/MID/RIGHT 문자 함수', a: '문자열 추출, LEFT(텍스트,개수)' },
        { id: 8, q: 'DATE/YEAR/MONTH/DAY 날짜 함수', a: '날짜 생성/추출, DATEDIF 기간 계산' },
        { id: 9, q: 'ROUND/ROUNDUP/ROUNDDOWN 함수', a: '반올림/올림/내림, 자릿수 지정' },
        { id: 10, q: 'RANK/LARGE/SMALL 함수', a: '순위 구하기, 몇 번째로 큰/작은 값' }
      ]
    },
    {
      id: 'excel-analysis',
      name: '엑셀 데이터 분석',
      icon: '📈',
      questions: [
        { id: 1, q: '데이터 정렬 (다중 기준)', a: '데이터-정렬, 기준 추가, 사용자 지정 목록' },
        { id: 2, q: '자동 필터 활용', a: '데이터-필터, 조건별 필터링, 상위 10' },
        { id: 3, q: '고급 필터 설정', a: '조건 범위 설정, 다른 위치에 복사, 고유 레코드' },
        { id: 4, q: '부분합 기능', a: '데이터-부분합, 그룹화 기준, 합계/평균/개수' },
        { id: 5, q: '피벗 테이블 작성', a: '삽입-피벗 테이블, 행/열/값/필터 배치' },
        { id: 6, q: '피벗 테이블 필드 설정', a: '값 필드 설정, 요약 함수 변경, 표시 형식' },
        { id: 7, q: '차트 삽입 및 편집', a: '삽입-차트, 종류 선택, 요소/스타일/레이아웃' },
        { id: 8, q: '추세선 및 데이터 레이블', a: '차트 요소 추가, 추세선 옵션, 레이블 위치' }
      ]
    },
    {
      id: 'excel-macro',
      name: '엑셀 매크로/VBA',
      icon: '⚙️',
      questions: [
        { id: 1, q: '매크로 기록 및 실행', a: '개발 도구-매크로 기록, 작업 수행, Alt+F8 실행' },
        { id: 2, q: '매크로 보안 설정', a: '파일-옵션-보안 센터, 매크로 설정 수준' },
        { id: 3, q: 'VBA 편집기 사용', a: 'Alt+F11, 모듈 삽입, 코드 작성/수정' },
        { id: 4, q: 'VBA 기본 문법', a: 'Sub/End Sub, Dim 변수, If/For/Do 문' },
        { id: 5, q: 'Range/Cells 객체 활용', a: 'Range("A1").Value, Cells(1,1), ActiveCell' },
        { id: 6, q: '사용자 정의 함수 작성', a: 'Function 함수명(인수), 결과 반환' }
      ]
    },
    {
      id: 'access-table',
      name: '액세스 테이블/쿼리',
      icon: '🗄️',
      questions: [
        { id: 1, q: '테이블 설계 및 작성', a: '필드명, 데이터 형식, 기본 키 설정' },
        { id: 2, q: '필드 속성 설정', a: '필드 크기, 형식, 입력 마스크, 유효성 검사' },
        { id: 3, q: '관계 설정', a: '데이터베이스 도구-관계, 1:다 관계, 참조 무결성' },
        { id: 4, q: '선택 쿼리 작성', a: '만들기-쿼리 디자인, 필드 선택, 조건 설정' },
        { id: 5, q: '매개변수 쿼리', a: '조건에 [프롬프트 메시지], 실행 시 입력' },
        { id: 6, q: '요약/그룹 쿼리', a: '합계 행 추가, 그룹화, 집계 함수' },
        { id: 7, q: '실행 쿼리 (테이블 만들기/추가/업데이트/삭제)', a: '쿼리 형식 변경, 주의해서 실행' },
        { id: 8, q: 'SQL 뷰 작성', a: 'SELECT-FROM-WHERE, JOIN, GROUP BY, ORDER BY' }
      ]
    },
    {
      id: 'access-form',
      name: '액세스 폼/보고서',
      icon: '📋',
      questions: [
        { id: 1, q: '폼 마법사로 폼 작성', a: '만들기-폼 마법사, 필드/레이아웃/스타일 선택' },
        { id: 2, q: '폼 디자인 보기 수정', a: '컨트롤 배치, 속성 시트, 조건부 서식' },
        { id: 3, q: '컨트롤 종류 및 속성', a: '텍스트 상자, 콤보 상자, 명령 단추, 레이블' },
        { id: 4, q: '하위 폼 작성', a: '1:다 관계 데이터 표시, 기본/하위 폼 연결' },
        { id: 5, q: '보고서 마법사로 보고서 작성', a: '그룹화/정렬/요약 옵션, 레이아웃' },
        { id: 6, q: '보고서 디자인 수정', a: '머리글/바닥글, 그룹 머리글, 계산 컨트롤' },
        { id: 7, q: '보고서 요약 및 집계', a: '그룹별 합계/평균, 보고서 바닥글 총계' },
        { id: 8, q: '매크로/이벤트 연결', a: '명령 단추-이벤트, 매크로 작성, 실행' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('oa-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('oa-practical-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `사무자동화산업기사 실기 문제입니다.

작업: ${question}
방법: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 작업 개요
2. 단계별 상세 절차
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-orange-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">사무자동화 실무</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">⚡</span></div>
              <div>
                <h1 className="text-2xl font-bold">사무자동화 실무</h1>
                <p className="text-orange-200">사무자동화산업기사 실기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-orange-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 실기 팁 카드 */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white mb-8">
          <h3 className="text-lg font-bold mb-3">💡 실기 시험 팁</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">⏱️ 시간 배분</p>
              <p className="opacity-90">2시간 30분, 엑셀/액세스 균등 배분</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">💾 수시 저장</p>
              <p className="opacity-90">Ctrl+S 습관화, 파일명 정확히</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">📋 문제 정독</p>
              <p className="opacity-90">조건 누락 주의, 셀 주소 확인</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <p className="font-bold">🔍 결과 검증</p>
              <p className="opacity-90">수식 결과, 서식 확인 필수</p>
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
                  className="w-full p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/office-automation/study/info-comm" className="px-6 py-3 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition">← 정보통신개론</Link>
          <Link href="/category/office/office-automation" className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">메인으로 →</Link>
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
