'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BasicLetter3Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<any>(null);

  const topics = [
    { id: 0, name: '서신 구조', count: 10 },
    { id: 1, name: '인사말', count: 10 },
    { id: 2, name: '본문 표현', count: 10 },
    { id: 3, name: '마무리', count: 10 },
    { id: 4, name: '기타 표현', count: 10 },
  ];

  const questions = [
    // 서신 구조 (10문항)
    { id: 1, topic: 0, question: '비즈니스 서신의 첫 부분에 오는 것은?', options: ['본문', '인사말', '서명', '날짜와 주소'], answer: 3, explanation: '비즈니스 서신은 날짜와 발신인/수신인 주소로 시작합니다.' },
    { id: 2, topic: 0, question: 'Subject line은 무엇인가?', options: ['서명란', '제목란', '날짜란', '주소란'], answer: 1, explanation: 'Subject line은 서신의 주제를 나타내는 "제목란"입니다.' },
    { id: 3, topic: 0, question: 'Salutation의 의미는?', options: ['서명', '인사말', '본문', '추신'], answer: 1, explanation: 'Salutation은 서신의 시작 부분에 오는 "인사말"입니다.' },
    { id: 4, topic: 0, question: 'Closing의 의미는?', options: ['본문', '결어/마무리', '인사말', '제목'], answer: 1, explanation: 'Closing은 서신 끝의 "결어" 또는 "마무리"입니다.' },
    { id: 5, topic: 0, question: 'Enclosure의 의미는?', options: ['서명', '동봉물', '첨부', '추신'], answer: 1, explanation: 'Enclosure는 서신에 함께 동봉한 "동봉물"을 표시합니다.' },
    { id: 6, topic: 0, question: 'CC는 무엇을 의미하는가?', options: ['사본 참조', '본문', '서명', '첨부'], answer: 0, explanation: 'CC(Carbon Copy)는 "사본 참조"로, 다른 사람에게도 사본을 보냄을 의미합니다.' },
    { id: 7, topic: 0, question: 'P.S.의 의미는?', options: ['서명', '추신', '참조', '첨부'], answer: 1, explanation: 'P.S.(Post Script)는 서명 후에 추가하는 "추신"입니다.' },
    { id: 8, topic: 0, question: 'Body of letter의 의미는?', options: ['편지봉투', '본문', '인사말', '서명'], answer: 1, explanation: 'Body of letter는 서신의 "본문"입니다.' },
    { id: 9, topic: 0, question: 'Signature의 의미는?', options: ['인사말', '본문', '서명', '제목'], answer: 2, explanation: 'Signature는 서신 끝에 하는 "서명"입니다.' },
    { id: 10, topic: 0, question: 'Reference number의 용도는?', options: ['가격 표시', '서신 추적', '날짜 표시', '수량 표시'], answer: 1, explanation: 'Reference number는 서신을 추적하고 관리하기 위한 참조번호입니다.' },

    // 인사말 (10문항)
    { id: 11, topic: 1, question: '"Dear Sir"는 어떤 경우에 사용하는가?', options: ['친한 사이', '남성 수신인을 모를 때', '여성에게', '친구에게'], answer: 1, explanation: '"Dear Sir"는 남성 수신인의 이름을 모를 때 사용합니다.' },
    { id: 12, topic: 1, question: '"Dear Madam"은 어떤 경우에 사용하는가?', options: ['남성에게', '여성 수신인을 모를 때', '친구에게', '상사에게'], answer: 1, explanation: '"Dear Madam"은 여성 수신인의 이름을 모를 때 사용합니다.' },
    { id: 13, topic: 1, question: '"Dear Mr. Smith"에서 Mr.의 의미는?', options: ['여성 호칭', '남성 호칭', '직급', '회사명'], answer: 1, explanation: 'Mr.은 남성에 대한 호칭입니다.' },
    { id: 14, topic: 1, question: '"Dear Ms. Lee"에서 Ms.의 의미는?', options: ['남성 호칭', '미혼 여성', '기혼 여성', '여성 일반 호칭'], answer: 3, explanation: 'Ms.는 결혼 여부와 관계없이 여성에게 사용하는 일반 호칭입니다.' },
    { id: 15, topic: 1, question: '"Dear Sirs"는 어떤 경우에 사용하는가?', options: ['개인에게', '회사/단체에게', '여성에게', '친구에게'], answer: 1, explanation: '"Dear Sirs"는 회사나 단체에 보내는 서신에 사용합니다.' },
    { id: 16, topic: 1, question: '"To Whom It May Concern"은 언제 사용하는가?', options: ['친한 사이', '수신인 불명확 시', '사장에게', '친구에게'], answer: 1, explanation: '수신인이 불명확할 때 "담당자에게"라는 의미로 사용합니다.' },
    { id: 17, topic: 1, question: '"Dear Customer"는 누구에게 사용하는가?', options: ['직원에게', '고객에게', '상사에게', '친구에게'], answer: 1, explanation: '"Dear Customer"는 고객에게 보내는 서신에 사용합니다.' },
    { id: 18, topic: 1, question: '"Gentlemen"은 어떤 경우에 사용하는가?', options: ['여성에게', '남성 개인에게', '회사/단체에게', '친구에게'], answer: 2, explanation: '"Gentlemen"은 회사나 단체에 보내는 서신에 사용합니다 (미국식).' },
    { id: 19, topic: 1, question: '"Dear Mrs. Kim"에서 Mrs.의 의미는?', options: ['미혼 여성', '기혼 여성', '남성', '직급'], answer: 1, explanation: 'Mrs.는 기혼 여성에 대한 호칭입니다.' },
    { id: 20, topic: 1, question: '"Dear Miss Park"에서 Miss의 의미는?', options: ['기혼 여성', '미혼 여성', '남성', '직급'], answer: 1, explanation: 'Miss는 미혼 여성에 대한 호칭입니다.' },

    // 본문 표현 (10문항)
    { id: 21, topic: 2, question: '"We are writing to"의 의미는?', options: ['쓰고 있습니다', '~하려고 편지드립니다', '글을 씁니다', '작성합니다'], answer: 1, explanation: '"We are writing to ~"는 서신의 목적을 밝히는 시작 표현입니다.' },
    { id: 22, topic: 2, question: '"We would like to"의 의미는?', options: ['좋아합니다', '~하고 싶습니다', '원합니다', '해야 합니다'], answer: 1, explanation: '"We would like to ~"는 정중하게 희망을 표현합니다.' },
    { id: 23, topic: 2, question: '"Please be informed that"의 의미는?', options: ['알려주세요', '~임을 알려드립니다', '정보가 있습니다', '알고 있습니다'], answer: 1, explanation: '"Please be informed that ~"은 정보를 전달하는 표현입니다.' },
    { id: 24, topic: 2, question: '"As you requested"의 의미는?', options: ['요청합니다', '요청하신 대로', '요청이 있었습니다', '요청해 주세요'], answer: 1, explanation: '"As you requested"는 "요청하신 대로"라는 의미입니다.' },
    { id: 25, topic: 2, question: '"We are pleased to"의 의미는?', options: ['기쁩니다', '~하게 되어 기쁩니다', '만족합니다', '즐겁습니다'], answer: 1, explanation: '"We are pleased to ~"는 긍정적인 내용을 전할 때 사용합니다.' },
    { id: 26, topic: 2, question: '"We regret to inform you"의 의미는?', options: ['알려드려 기쁩니다', '유감스럽게도 알려드립니다', '후회합니다', '알려주세요'], answer: 1, explanation: '좋지 않은 소식을 전할 때 "유감스럽게도 알려드립니다"라고 시작합니다.' },
    { id: 27, topic: 2, question: '"In reference to"의 의미는?', options: ['참조하세요', '~에 관하여', '언급합니다', '참고로'], answer: 1, explanation: '"In reference to ~"는 "~에 관하여"라는 의미입니다.' },
    { id: 28, topic: 2, question: '"Please find enclosed"의 의미는?', options: ['찾아주세요', '동봉물을 확인해 주세요', '봉투를 열어주세요', '첨부합니다'], answer: 1, explanation: '"Please find enclosed"는 동봉물 확인을 안내하는 표현입니다.' },
    { id: 29, topic: 2, question: '"We would appreciate"의 의미는?', options: ['감사했습니다', '~해 주시면 감사하겠습니다', '감사드립니다', '고맙습니다'], answer: 1, explanation: '"We would appreciate ~"는 정중한 요청 표현입니다.' },
    { id: 30, topic: 2, question: '"Could you please"의 의미는?', options: ['하세요', '~해 주시겠습니까', '할 수 있나요', '하겠습니다'], answer: 1, explanation: '"Could you please ~?"는 정중하게 요청하는 표현입니다.' },

    // 마무리 (10문항)
    { id: 31, topic: 3, question: '"Yours sincerely"는 언제 사용하는가?', options: ['이름을 모를 때', '이름을 알 때', '친구에게', '내부 메모에'], answer: 1, explanation: '"Yours sincerely"는 수신인 이름을 아는 경우(Dear Mr./Ms. ~) 사용합니다.' },
    { id: 32, topic: 3, question: '"Yours faithfully"는 언제 사용하는가?', options: ['이름을 알 때', '이름을 모를 때', '친구에게', '상사에게만'], answer: 1, explanation: '"Yours faithfully"는 수신인 이름을 모르는 경우(Dear Sir/Madam) 사용합니다.' },
    { id: 33, topic: 3, question: '"Best regards"의 성격은?', options: ['매우 격식', '반격식', '비격식', '구어체'], answer: 1, explanation: '"Best regards"는 반격식적인 마무리 표현으로 널리 사용됩니다.' },
    { id: 34, topic: 3, question: '"Kind regards"의 의미는?', options: ['친절한 관계', '안부를 전합니다', '좋은 관계', '인사합니다'], answer: 1, explanation: '"Kind regards"는 "안부를 전합니다"라는 친근한 마무리입니다.' },
    { id: 35, topic: 3, question: '"We look forward to hearing from you"의 의미는?', options: ['듣기를 원합니다', '회신 기다리겠습니다', '앞을 봅니다', '연락하겠습니다'], answer: 1, explanation: '"회신을 기다리겠습니다"라는 마무리 표현입니다.' },
    { id: 36, topic: 3, question: '"Thank you for your attention"의 의미는?', options: ['주목하세요', '관심에 감사드립니다', '집중해 주세요', '주의하세요'], answer: 1, explanation: '"관심에 감사드립니다"라는 마무리 감사 표현입니다.' },
    { id: 37, topic: 3, question: '"Please do not hesitate to contact us"의 의미는?', options: ['연락하지 마세요', '주저 말고 연락 주세요', '기다려 주세요', '연락하겠습니다'], answer: 1, explanation: '"주저 말고 연락 주세요"라는 문의 유도 표현입니다.' },
    { id: 38, topic: 3, question: '"We await your reply"의 의미는?', options: ['답변했습니다', '답변을 기다립니다', '기다리지 않습니다', '답변하겠습니다'], answer: 1, explanation: '"답변을 기다립니다"라는 회신 요청 표현입니다.' },
    { id: 39, topic: 3, question: '"Yours truly"의 성격은?', options: ['매우 격식', '반격식', '비격식', '친구 사이'], answer: 1, explanation: '"Yours truly"는 반격식적인 마무리 표현입니다.' },
    { id: 40, topic: 3, question: '"Respectfully yours"는 어떤 경우에 적합한가?', options: ['친구에게', '격식 있는 상황', '일상 서신', '내부 메모'], answer: 1, explanation: '"Respectfully yours"는 격식 있는 상황에 적합한 매우 정중한 표현입니다.' },

    // 기타 표현 (10문항)
    { id: 41, topic: 4, question: '"ASAP"의 풀 네임은?', options: ['As Soon As Possible', 'All Services Are Provided', 'As Simple As Possible', 'After Several Attempts Please'], answer: 0, explanation: 'ASAP는 "As Soon As Possible(가능한 빨리)"의 약어입니다.' },
    { id: 42, topic: 4, question: '"FYI"의 의미는?', options: ['좋은 정보', '참고로', '확인해 주세요', '파일 첨부'], answer: 1, explanation: 'FYI는 "For Your Information(참고로)"의 약어입니다.' },
    { id: 43, topic: 4, question: '"RE:"는 무엇을 의미하는가?', options: ['다시', '~에 관하여', '회신', '읽어주세요'], answer: 1, explanation: '"RE:"는 "Regarding(~에 관하여)"를 의미하며 제목에 사용됩니다.' },
    { id: 44, topic: 4, question: '"N/A"의 의미는?', options: ['이름 없음', '해당 없음', '없음', '사용 불가'], answer: 1, explanation: 'N/A는 "Not Applicable(해당 없음)"의 약어입니다.' },
    { id: 45, topic: 4, question: '"TBD"의 의미는?', options: ['확정됨', '미정', '취소됨', '완료됨'], answer: 1, explanation: 'TBD는 "To Be Determined(미정)"의 약어입니다.' },
    { id: 46, topic: 4, question: '"ETC."의 의미는?', options: ['기타', '등등', '참조', '예시'], answer: 1, explanation: 'ETC.는 "et cetera(등등)"의 약어입니다.' },
    { id: 47, topic: 4, question: '"i.e."의 의미는?', options: ['예를 들어', '즉', '그리고', '또한'], answer: 1, explanation: 'i.e.는 "id est(즉, 다시 말해)"의 약어입니다.' },
    { id: 48, topic: 4, question: '"e.g."의 의미는?', options: ['즉', '예를 들어', '그리고', '또한'], answer: 1, explanation: 'e.g.는 "exempli gratia(예를 들어)"의 약어입니다.' },
    { id: 49, topic: 4, question: '"NB" 또는 "N.B."의 의미는?', options: ['주의/참고', '이름', '번호', '없음'], answer: 0, explanation: 'NB는 "Nota Bene(주의/참고)"의 약어입니다.' },
    { id: 50, topic: 4, question: '"Attn:"의 의미는?', options: ['첨부', '수신', '참조', '주의'], answer: 1, explanation: '"Attn:"은 "Attention(~앞)"의 약어로 수신인을 지정합니다.' },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('trade-english-3-letter-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trade-english-3-letter-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const currentQ = filteredQuestions[currentQuestion];
    if (!answeredQuestions.includes(currentQ.id)) {
      setAnsweredQuestions([...answeredQuestions, currentQ.id]);
      if (index === currentQ.answer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    localStorage.removeItem('trade-english-3-letter-progress');
  };

  const openAIModal = (question: any) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIPrompt = (q: any) => {
    return `무역영어 3급 기초 비즈니스 서신 문제입니다:\n\n문제: ${q.question}\n\n보기:\n${q.options.map((opt: string, i: number) => `${i + 1}. ${opt}`).join('\n')}\n\n정답: ${q.options[q.answer]}\n\n이 서신 표현에 대해 자세히 설명해주세요. 실제 비즈니스 서신에서 어떻게 사용되는지 예문도 알려주세요.`;
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-teal-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/trade-english-3" className="text-gray-600 hover:text-teal-600">무역영어 3급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">기초 서신</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📧 기초 서신</h1>
          <p className="text-gray-600">기본 비즈니스 서신 학습</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">전체 진행률</span>
            <span className="text-sm font-bold text-teal-600">{answeredQuestions.length} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              전체 ({questions.length})
            </button>
            {topics.map(topic => (
              <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {currentQ && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4">
              <div className="flex items-center justify-between">
                <span className="text-teal-100">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{topics[currentQ.topic].name}</span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === currentQ.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent'}`}>
                    <span className="font-medium">{index + 1}. {option}</span>
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="mt-6 p-4 bg-teal-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-teal-800">💡 해설</p>
                    <button onClick={() => openAIModal(currentQ)} className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition">AI에게 질문하기</button>
                  </div>
                  <p className="text-teal-700">{currentQ.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition">← 이전</button>
          <button onClick={resetProgress} className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition">초기화</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-teal-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-600 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">📊 학습 현황</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-teal-50 rounded-xl">
              <p className="text-2xl font-bold text-teal-600">{answeredQuestions.length}</p>
              <p className="text-sm text-gray-600">푼 문제</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{score}</p>
              <p className="text-sm text-gray-600">맞은 문제</p>
            </div>
            <div className="text-center p-4 bg-cyan-50 rounded-xl">
              <p className="text-2xl font-bold text-cyan-600">{answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</p>
              <p className="text-sm text-gray-600">정답률</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{questions.length - answeredQuestions.length}</p>
              <p className="text-sm text-gray-600">남은 문제</p>
            </div>
          </div>
        </div>
      </main>

      {showAIModal && currentQuestionForAI && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4">아래 AI 서비스를 선택하면 문제에 대한 상세 설명을 받을 수 있습니다.</p>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl text-left transition">
                <span className="font-bold text-orange-700">Claude</span>
                <span className="text-orange-600 text-sm ml-2">Anthropic의 AI 어시스턴트</span>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl text-left transition">
                <span className="font-bold text-green-700">ChatGPT</span>
                <span className="text-green-600 text-sm ml-2">OpenAI의 AI 어시스턴트</span>
              </a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(getAIPrompt(currentQuestionForAI))}`} target="_blank" rel="noopener noreferrer" className="block w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition">
                <span className="font-bold text-blue-700">Gemini</span>
                <span className="text-blue-600 text-sm ml-2">Google의 AI 어시스턴트</span>
              </a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full p-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition">닫기</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
