'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function OfficeManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'office-mgmt',
      name: '사무관리론',
      icon: '📋',
      questions: [
        { id: 1, q: '사무관리의 정의와 목적을 설명하시오.', a: '사무 활동의 계획/조직/지휘/통제, 효율성 향상 목적' },
        { id: 2, q: '사무관리의 원칙을 설명하시오.', a: '목적성, 계획성, 능률성, 합리성, 표준화 원칙' },
        { id: 3, q: '사무의 3요소를 설명하시오.', a: '인적 요소(사람), 물적 요소(설비), 방법적 요소(절차)' },
        { id: 4, q: '사무합리화의 방법을 설명하시오.', a: '표준화, 단순화, 전문화, 기계화, 자동화' },
        { id: 5, q: '사무 공간 배치의 원칙을 설명하시오.', a: '업무 흐름, 공간 활용, 커뮤니케이션, 보안 고려' },
        { id: 6, q: '사무 시간 관리 방법을 설명하시오.', a: '우선순위 설정, 시간 계획표, 업무 위임, 집중 시간대' },
        { id: 7, q: '사무 비용 관리 방법을 설명하시오.', a: '예산 편성, 비용 분석, 절감 활동, 효과 측정' },
        { id: 8, q: 'OJT(직장 내 교육)를 설명하시오.', a: '업무 현장에서 상사가 부하에게 실시하는 교육' },
        { id: 9, q: 'Off-JT의 개념을 설명하시오.', a: '직장 외 교육, 연수원/세미나 등 집합 교육' },
        { id: 10, q: '사무 개선의 절차를 설명하시오.', a: '현상분석-문제발견-개선안작성-실시-평가' }
      ]
    },
    {
      id: 'management-theory',
      name: '경영이론',
      icon: '📊',
      questions: [
        { id: 1, q: '경영의 정의와 기능을 설명하시오.', a: '조직 목표 달성을 위한 활동, 계획/조직/지휘/통제' },
        { id: 2, q: '테일러의 과학적 관리법을 설명하시오.', a: '시간연구, 동작연구, 과업관리, 차별성과급제' },
        { id: 3, q: '페이욜의 일반관리론을 설명하시오.', a: '경영의 14원칙, 관리 기능 5요소 제시' },
        { id: 4, q: '매슬로우의 욕구단계설을 설명하시오.', a: '생리-안전-사회-존경-자아실현 5단계 욕구' },
        { id: 5, q: '맥그리거의 X-Y 이론을 설명하시오.', a: 'X이론: 인간 회피적, Y이론: 인간 적극적' },
        { id: 6, q: '허츠버그의 동기-위생이론을 설명하시오.', a: '동기요인(만족), 위생요인(불만족 해소)' },
        { id: 7, q: 'SWOT 분석을 설명하시오.', a: '강점, 약점, 기회, 위협 분석 통한 전략 수립' },
        { id: 8, q: '벤치마킹의 개념을 설명하시오.', a: '우수 기업 사례 분석하여 자사에 적용' },
        { id: 9, q: 'TQM(전사적 품질경영)을 설명하시오.', a: '전 구성원 참여한 지속적 품질 개선 활동' },
        { id: 10, q: 'BPR(업무 프로세스 재설계)을 설명하시오.', a: '비용/품질/서비스/속도 향상 위한 근본적 재설계' }
      ]
    },
    {
      id: 'organization',
      name: '조직관리',
      icon: '🏛️',
      questions: [
        { id: 1, q: '조직의 정의와 구성요소를 설명하시오.', a: '공동 목표 달성 위한 집단, 목표/구조/구성원' },
        { id: 2, q: '조직 구조의 유형을 설명하시오.', a: '기능별, 사업부, 매트릭스, 팀제, 네트워크 조직' },
        { id: 3, q: '라인조직과 스태프조직을 비교하시오.', a: '라인: 직접 명령, 스태프: 자문/지원 역할' },
        { id: 4, q: '집권화와 분권화를 비교하시오.', a: '집권: 의사결정 집중, 분권: 권한 위임' },
        { id: 5, q: '조직문화의 개념과 기능을 설명하시오.', a: '공유된 가치관/행동양식, 조직 일체감 형성' },
        { id: 6, q: '리더십의 유형을 설명하시오.', a: '권위형, 민주형, 자유방임형, 상황적 리더십' },
        { id: 7, q: '동기부여 방법을 설명하시오.', a: '금전적 보상, 승진, 인정, 도전적 과업, 자율성' },
        { id: 8, q: '갈등관리 전략을 설명하시오.', a: '회피, 조장, 타협, 협력, 경쟁' },
        { id: 9, q: '의사소통의 유형을 설명하시오.', a: '공식/비공식, 상향/하향/수평, 언어/비언어' },
        { id: 10, q: '팀워크 향상 방법을 설명하시오.', a: '목표 공유, 역할 명확화, 신뢰 구축, 피드백' }
      ]
    },
    {
      id: 'decision',
      name: '의사결정',
      icon: '🎯',
      questions: [
        { id: 1, q: '의사결정의 유형을 설명하시오.', a: '정형적/비정형적, 개인적/집단적, 전략/전술/운영' },
        { id: 2, q: '의사결정 과정을 설명하시오.', a: '문제인식-대안탐색-평가-선택-실행-평가' },
        { id: 3, q: '브레인스토밍을 설명하시오.', a: '자유로운 아이디어 제시, 비판 금지, 양 중시' },
        { id: 4, q: '델파이 기법을 설명하시오.', a: '전문가 의견 수렴, 익명성, 반복적 피드백' },
        { id: 5, q: '명목집단기법(NGT)을 설명하시오.', a: '개별 아이디어 작성 후 토론/투표로 결정' },
        { id: 6, q: '의사결정나무를 설명하시오.', a: '대안별 결과를 나무 형태로 시각화, 기대값 계산' },
        { id: 7, q: '시나리오 기법을 설명하시오.', a: '미래 상황 예측, 다양한 시나리오별 대응책 수립' },
        { id: 8, q: 'PERT/CPM을 설명하시오.', a: '프로젝트 일정 관리, 주경로 파악, 최적 일정' },
        { id: 9, q: '손익분기점 분석을 설명하시오.', a: '매출=비용 되는 지점, 수익성 판단 기준' },
        { id: 10, q: 'ABC 분석을 설명하시오.', a: '중요도에 따라 A/B/C 등급 분류, 자원 집중' }
      ]
    },
    {
      id: 'document',
      name: '문서관리',
      icon: '📄',
      questions: [
        { id: 1, q: '문서의 정의와 종류를 설명하시오.', a: '업무상 작성된 기록, 공문/사문/전자문서 등' },
        { id: 2, q: '문서 작성의 원칙을 설명하시오.', a: '정확성, 간결성, 명확성, 신속성, 체계성' },
        { id: 3, q: '공문서의 구성요소를 설명하시오.', a: '두문(발신처), 본문(제목/내용), 결문(발신일/직인)' },
        { id: 4, q: '문서의 결재 과정을 설명하시오.', a: '기안-검토-결재-시행-접수-배부' },
        { id: 5, q: '전자문서의 특징을 설명하시오.', a: '신속성, 동시전달, 검색 용이, 보관 효율' },
        { id: 6, q: '문서 보존 기간 설정 기준을 설명하시오.', a: '법적 요건, 업무 중요도, 참조 빈도 고려' },
        { id: 7, q: '문서 보안 관리 방법을 설명하시오.', a: '등급 분류, 접근 제한, 암호화, 폐기 절차' },
        { id: 8, q: '문서관리시스템(DMS)을 설명하시오.', a: '문서의 생성/저장/검색/공유/폐기 전 과정 관리' },
        { id: 9, q: '기록물관리법의 주요 내용을 설명하시오.', a: '공공기록물 관리 의무, 보존/폐기 기준' },
        { id: 10, q: '전자서명의 효력을 설명하시오.', a: '서명인 확인, 위/변조 방지, 법적 효력 인정' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('office-management-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {};
    topics.forEach(t => { allExpanded[t.id] = true; });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('office-management-progress', JSON.stringify(updated));
  };

  const handleAIClick = (question: string, answer: string) => {
    const prompt = `사무자동화산업기사 사무경영관리개론 과목 문제입니다.

문제: ${question}
정답: ${answer}

다음 형식으로 상세히 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명
3. 실무 적용 사례
4. 시험 출제 포인트
5. 연습문제 3개 (정답 포함)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/office/office-automation" className="text-gray-600 hover:text-purple-600">사무자동화산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">사무경영관리개론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-violet-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📋</span></div>
              <div>
                <h1 className="text-2xl font-bold">사무경영관리개론</h1>
                <p className="text-purple-200">사무자동화산업기사 필기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-purple-200 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white flex items-center justify-between"
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
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
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
          <Link href="/category/office/office-automation/study/oa-system" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">← 사무자동화시스템</Link>
          <Link href="/category/office/office-automation/study/programming" className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">프로그래밍 일반 →</Link>
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
