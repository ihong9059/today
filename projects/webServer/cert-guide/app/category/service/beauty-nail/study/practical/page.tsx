'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

  const topics = [
    { id: 0, name: '네일 팁', count: 10 },
    { id: 1, name: '젤 네일', count: 10 },
    { id: 2, name: '네일 아트 실기', count: 10 },
    { id: 3, name: '매니큐어 실기', count: 10 },
    { id: 4, name: '페디큐어 실기', count: 10 },
  ];

  const questions = [
    // 네일 팁 (1-10)
    { id: 1, topic: 0, question: "네일 팁 선택 시 고려사항은?", options: ["색상만", "네일 폭과 C커브", "길이만", "가격"], answer: 1 },
    { id: 2, topic: 0, question: "팁 부착 시 글루 도포 위치는?", options: ["팁 전체", "팁 웰(접합부)", "네일 전체", "큐티클"], answer: 1 },
    { id: 3, topic: 0, question: "팁 부착 각도는?", options: ["90도", "45도", "수평", "10도"], answer: 1 },
    { id: 4, topic: 0, question: "팁 블렌딩의 목적은?", options: ["광택", "팁과 자연 네일 경계 제거", "착색", "보습"], answer: 1 },
    { id: 5, topic: 0, question: "팁 블렌딩에 사용하는 도구는?", options: ["폴리시 브러시", "파일/버퍼", "큐티클 푸셔", "니퍼"], answer: 1 },
    { id: 6, topic: 0, question: "팁 커팅 시 사용하는 도구는?", options: ["일반 가위", "팁 커터", "네일 클리퍼", "큐티클 니퍼"], answer: 1 },
    { id: 7, topic: 0, question: "프리엣지 네일 팁의 특징은?", options: ["전체 덮음", "팁 끝 부분만 부착", "반만 덮음", "큐티클까지"], answer: 1 },
    { id: 8, topic: 0, question: "팁 부착 후 기포가 생기면?", options: ["무시", "제거 후 재부착", "더 누르기", "폴리시로 덮기"], answer: 1 },
    { id: 9, topic: 0, question: "네일 폼의 용도는?", options: ["팁 대신 연장 형태 잡기", "팁 부착", "폴리시 도포", "큐티클 정리"], answer: 0 },
    { id: 10, topic: 0, question: "팁 사이즈가 작으면?", options: ["적합", "들뜸 발생", "더 예쁨", "오래 유지"], answer: 1 },

    // 젤 네일 (11-20)
    { id: 11, topic: 1, question: "젤 네일 경화에 필요한 것은?", options: ["열", "UV/LED 램프", "공기", "물"], answer: 1 },
    { id: 12, topic: 1, question: "베이스 젤의 역할은?", options: ["광택", "접착력 향상", "착색", "제거"], answer: 1 },
    { id: 13, topic: 1, question: "젤 도포 시 두께는?", options: ["두껍게", "얇고 균일하게", "중앙만 두껍게", "끝만 두껍게"], answer: 1 },
    { id: 14, topic: 1, question: "미경화 젤(억제층) 제거에 사용하는 것은?", options: ["물", "클렌저", "아세톤", "오일"], answer: 1 },
    { id: 15, topic: 1, question: "소크오프 젤의 제거 방법은?", options: ["파일링만", "아세톤 불림", "물에 담그기", "당기기"], answer: 1 },
    { id: 16, topic: 1, question: "하드 젤과 소프트 젤의 차이는?", options: ["같음", "하드 젤은 아세톤으로 제거 불가", "소프트가 더 강함", "색상 차이"], answer: 1 },
    { id: 17, topic: 1, question: "젤 도포 시 피부에 묻으면?", options: ["경화", "닦아내고 다시 도포", "무시", "더 바르기"], answer: 1 },
    { id: 18, topic: 1, question: "젤 네일 리프팅 원인이 아닌 것은?", options: ["유수분 제거 미흡", "프라이머 미사용", "적정 경화", "큐티클 위 도포"], answer: 2 },
    { id: 19, topic: 1, question: "빌더 젤의 용도는?", options: ["착색", "두께감과 길이 연장", "광택만", "제거"], answer: 1 },
    { id: 20, topic: 1, question: "젤 네일 시술 순서로 올바른 것은?", options: ["탑→컬러→베이스", "베이스→컬러→탑", "컬러→베이스→탑", "탑→베이스→컬러"], answer: 1 },

    // 네일 아트 실기 (21-30)
    { id: 21, topic: 2, question: "프렌치 네일 스마일 라인 그리기의 핵심은?", options: ["빠르게", "균일한 곡선", "직선", "울퉁불퉁"], answer: 1 },
    { id: 22, topic: 2, question: "그라데이션 기법의 도구는?", options: ["니퍼", "스폰지", "푸셔", "클리퍼"], answer: 1 },
    { id: 23, topic: 2, question: "스톤 부착 위치 결정 시 고려사항은?", options: ["무작위", "디자인 균형", "가격", "크기만"], answer: 1 },
    { id: 24, topic: 2, question: "핸드페인팅 시 붓 관리법은?", options: ["사용 후 방치", "클렌저로 세척 후 보관", "물에 담그기", "버리기"], answer: 1 },
    { id: 25, topic: 2, question: "마블링 실기의 핵심 포인트는?", options: ["빠른 건조", "젖은 상태에서 혼합", "완전 건조 후", "두껍게"], answer: 1 },
    { id: 26, topic: 2, question: "글리터 적용 시 주의점은?", options: ["피부에 묻어도 무관", "탑 코트로 밀봉", "베이스 위에 바로", "경화 안 함"], answer: 1 },
    { id: 27, topic: 2, question: "3D 아트 재료의 경화 특성은?", options: ["UV 필수", "공기 중 경화", "물에서 경화", "열 필요"], answer: 1 },
    { id: 28, topic: 2, question: "스탬핑 아트 실패 원인이 아닌 것은?", options: ["폴리시 양 부족", "빠른 작업", "적절한 압력", "늦은 작업"], answer: 2 },
    { id: 29, topic: 2, question: "포일 아트 부착 타이밍은?", options: ["완전 건조 후", "끈적한 상태", "젖은 상태", "경화 전"], answer: 1 },
    { id: 30, topic: 2, question: "네일 아트 시간 관리의 핵심은?", options: ["무제한", "과제별 시간 배분", "빠르게만", "천천히만"], answer: 1 },

    // 매니큐어 실기 (31-40)
    { id: 31, topic: 3, question: "매니큐어 실기 시험 준비물이 아닌 것은?", options: ["파일", "폴리시", "헤어드라이기", "큐티클 도구"], answer: 2 },
    { id: 32, topic: 3, question: "파일링 방향의 원칙은?", options: ["앞뒤로", "한 방향", "원형", "무관"], answer: 1 },
    { id: 33, topic: 3, question: "큐티클 정리 시 주의점은?", options: ["깊이 제거", "살아있는 조직 손상 금지", "전부 제거", "빠르게"], answer: 1 },
    { id: 34, topic: 3, question: "폴리시 도포 시 브러시 각도는?", options: ["90도", "45도", "수평", "10도"], answer: 1 },
    { id: 35, topic: 3, question: "폴리시 건조 확인 방법은?", options: ["손으로 만지기", "가볍게 터치 테스트", "물에 담그기", "불기"], answer: 1 },
    { id: 36, topic: 3, question: "컬러 폴리시 얼룩 방지법은?", options: ["두껍게", "얇게 여러 번", "한 번에 두껍게", "방향 무관"], answer: 1 },
    { id: 37, topic: 3, question: "클린업 시 사용하는 것은?", options: ["스폰지", "클린업 브러시와 리무버", "물", "테이프"], answer: 1 },
    { id: 38, topic: 3, question: "핸드 마사지 기본 동작이 아닌 것은?", options: ["쓸어넘기기", "주무르기", "두드리기", "꼬집기"], answer: 3 },
    { id: 39, topic: 3, question: "매니큐어 실기 평가 항목이 아닌 것은?", options: ["위생", "시술 순서", "개인 취향", "완성도"], answer: 2 },
    { id: 40, topic: 3, question: "실기 시험 시간 관리의 핵심은?", options: ["서두르기", "단계별 시간 배분", "천천히만", "무계획"], answer: 1 },

    // 페디큐어 실기 (41-50)
    { id: 41, topic: 4, question: "페디큐어 실기의 첫 단계는?", options: ["폴리시", "발 담그기와 소독", "각질 제거", "파일링"], answer: 1 },
    { id: 42, topic: 4, question: "발톱 커팅 모양의 원칙은?", options: ["둥글게", "일자로(스퀘어)", "뾰족하게", "비대칭"], answer: 1 },
    { id: 43, topic: 4, question: "내향성 발톱 예방 커팅법은?", options: ["옆을 깊이", "일자로 자르기", "둥글게", "비스듬히"], answer: 1 },
    { id: 44, topic: 4, question: "각질 제거 도구가 아닌 것은?", options: ["풋 파일", "풋 스크럽", "큐티클 니퍼", "각질 제거기"], answer: 2 },
    { id: 45, topic: 4, question: "페디큐어 시술 중 위생 관리 항목은?", options: ["속도", "도구 소독", "대화", "음악"], answer: 1 },
    { id: 46, topic: 4, question: "토우 세퍼레이터 사용 시기는?", options: ["각질 제거 시", "폴리시 도포 시", "파일링 시", "마사지 시"], answer: 1 },
    { id: 47, topic: 4, question: "발 마사지 방향은?", options: ["발끝에서 심장 방향", "심장에서 발끝", "무관", "좌우로만"], answer: 0 },
    { id: 48, topic: 4, question: "페디큐어 완성 후 확인 사항이 아닌 것은?", options: ["폴리시 상태", "청결도", "고객 혈압", "만족도"], answer: 2 },
    { id: 49, topic: 4, question: "실기 시험 감점 사항이 아닌 것은?", options: ["위생 불량", "시간 초과", "정확한 시술", "미완성"], answer: 2 },
    { id: 50, topic: 4, question: "페디큐어 실기 총 시간 배분의 핵심은?", options: ["한 단계에 집중", "각 단계 균형 있게", "빠르게만", "느리게만"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null ? questions.filter(q => q.topic === selectedTopic) : questions;

  useEffect(() => { const saved = localStorage.getItem('beauty-nail-practical-progress'); if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(new Set(data.answered)); setScore(data.score); } }, []);
  useEffect(() => { localStorage.setItem('beauty-nail-practical-progress', JSON.stringify({ answered: Array.from(answeredQuestions), score: score })); }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => { if (showResult) return; setSelectedAnswer(index); setShowResult(true); const newAnswered = new Set(answeredQuestions); newAnswered.add(filteredQuestions[currentQuestion].id); setAnsweredQuestions(newAnswered); if (index === filteredQuestions[currentQuestion].answer) setScore(score + 1); };
  const nextQuestion = () => { if (currentQuestion < filteredQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions(new Set()); localStorage.removeItem('beauty-nail-practical-progress'); };
  const handleAIHelp = (question: string, options: string[], answer: number) => { const prompt = `미용사(네일) 실기 문제입니다:\n\n문제: ${question}\n\n보기:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${answer + 1}번 (${options[answer]})\n\n이 문제에 대해 왜 이 답이 정답인지 자세히 설명해주세요.`; setCurrentPrompt(prompt); setShowAIModal(true); };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white shadow-sm border-b border-rose-100"><div className="max-w-4xl mx-auto px-4 py-4"><div className="flex items-center gap-3"><Link href="/category/service/beauty-nail" className="text-rose-600 hover:text-rose-800">← 뒤로</Link><div className="flex-1"><h1 className="text-xl font-bold text-gray-800">실기</h1><p className="text-sm text-gray-500">미용사(네일) 실기과목</p></div></div></div></header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700">전체 진행률</span><span className="text-sm text-rose-600 font-bold">{answeredQuestions.size}/{questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between text-sm"><span className="text-green-600">정답: {score}개</span><span className="text-red-500">오답: {answeredQuestions.size - score}개</span></div></div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6"><h3 className="text-sm font-medium text-gray-700 mb-3">📚 주제별 학습</h3><div className="flex flex-wrap gap-2"><button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>전체 ({questions.length})</button>{topics.map(topic => (<button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{topic.name} ({topic.count})</button>))}</div></div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6"><div className="flex justify-between items-center mb-4"><span className="text-sm text-rose-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span><span className="px-2 py-1 bg-rose-100 text-rose-700 rounded text-xs">{topics.find(t => t.id === currentQ.topic)?.name}</span></div><h2 className="text-lg font-bold text-gray-800 mb-6">{currentQ.question}</h2><div className="space-y-3">{currentQ.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500 text-green-800' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500 text-red-800' : 'bg-gray-50 border-2 border-gray-200 text-gray-500' : 'bg-gray-50 border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50'}`}><span className="font-medium">{index + 1}.</span> {option}{showResult && index === currentQ.answer && <span className="ml-2">✓</span>}</button>))}</div>{showResult && (<div className="mt-4 p-4 bg-rose-50 rounded-xl"><p className="text-rose-800 font-medium mb-2">{selectedAnswer === currentQ.answer ? '🎉 정답입니다!' : '❌ 틀렸습니다.'}</p><p className="text-sm text-rose-600">정답: {currentQ.answer + 1}번 - {currentQ.options[currentQ.answer]}</p><button onClick={() => handleAIHelp(currentQ.question, currentQ.options, currentQ.answer)} className="mt-3 flex items-center gap-2 text-sm text-rose-700 hover:text-rose-900">🤖 AI에게 해설 요청하기</button></div>)}</div>

        <div className="flex gap-3"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50">← 이전</button><button onClick={resetProgress} className="px-4 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200">초기화</button><button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="flex-1 py-3 bg-rose-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-rose-600">다음 →</button></div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">해설을 받을 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div></div></div></div>)}
    </div>
  );
}
