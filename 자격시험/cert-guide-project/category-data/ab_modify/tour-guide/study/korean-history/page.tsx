'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function KoreanHistoryStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '선사~삼국시대', count: 10 },
    { id: 1, name: '통일신라·발해', count: 10 },
    { id: 2, name: '고려시대', count: 10 },
    { id: 3, name: '조선시대', count: 10 },
    { id: 4, name: '근현대사', count: 10 },
  ];

  const questions = [
    // 선사~삼국시대 (10문항)
    { id: 1, topic: 0, question: "한반도 최초의 국가로 알려진 나라는?", options: ["부여", "고조선", "삼한", "가야"], answer: 1 },
    { id: 2, topic: 0, question: "고조선의 건국 신화에 등장하는 인물은?", options: ["주몽", "단군왕검", "박혁거세", "온조"], answer: 1 },
    { id: 3, topic: 0, question: "삼국 중 가장 먼저 건국된 나라는?", options: ["고구려", "백제", "신라", "가야"], answer: 0 },
    { id: 4, topic: 0, question: "백제를 건국한 인물은?", options: ["주몽", "온조", "박혁거세", "김수로"], answer: 1 },
    { id: 5, topic: 0, question: "신라의 화랑도가 지켜야 할 5가지 덕목을 세운 인물은?", options: ["진흥왕", "원광법사", "김유신", "의자왕"], answer: 1 },
    { id: 6, topic: 0, question: "고구려 광개토대왕비가 위치한 곳은?", options: ["평양", "집안(중국)", "서울", "부여"], answer: 1 },
    { id: 7, topic: 0, question: "백제의 문화가 전해진 일본의 대표적 사찰은?", options: ["호류지", "금각사", "은각사", "도다이지"], answer: 0 },
    { id: 8, topic: 0, question: "가야 연맹의 중심 국가는?", options: ["대가야", "금관가야", "아라가야", "소가야"], answer: 1 },
    { id: 9, topic: 0, question: "삼국시대 불교를 공인한 고구려 왕은?", options: ["광개토대왕", "소수림왕", "장수왕", "을지문덕"], answer: 1 },
    { id: 10, topic: 0, question: "백제 무령왕릉이 발견된 위치는?", options: ["부여", "공주", "익산", "서울"], answer: 1 },

    // 통일신라·발해 (10문항)
    { id: 11, topic: 1, question: "신라가 삼국을 통일한 해는?", options: ["660년", "668년", "676년", "698년"], answer: 2 },
    { id: 12, topic: 1, question: "통일신라의 수도는?", options: ["평양", "개성", "경주", "서울"], answer: 2 },
    { id: 13, topic: 1, question: "불국사와 석굴암을 건립한 왕은?", options: ["무열왕", "경덕왕", "진흥왕", "선덕왕"], answer: 1 },
    { id: 14, topic: 1, question: "발해를 건국한 인물은?", options: ["대조영", "김유신", "장보고", "최치원"], answer: 0 },
    { id: 15, topic: 1, question: "발해가 '해동성국'이라 불린 이유는?", options: ["영토가 작아서", "문화와 영토가 번성해서", "바다가 많아서", "왕이 강해서"], answer: 1 },
    { id: 16, topic: 1, question: "통일신라 시대 해상무역을 주도한 인물은?", options: ["김유신", "장보고", "최치원", "원효"], answer: 1 },
    { id: 17, topic: 1, question: "에밀레종(성덕대왕신종)의 특징은?", options: ["작은 크기", "동양 최대의 종", "돌로 제작", "목재로 제작"], answer: 1 },
    { id: 18, topic: 1, question: "신라 골품제도에서 가장 높은 계층은?", options: ["4두품", "5두품", "6두품", "성골"], answer: 3 },
    { id: 19, topic: 1, question: "원효대사가 주창한 사상은?", options: ["선종", "일심사상", "화엄사상", "천태사상"], answer: 1 },
    { id: 20, topic: 1, question: "발해 멸망 후 유민이 세운 나라는?", options: ["후백제", "후고구려", "고려", "정안국"], answer: 3 },

    // 고려시대 (10문항)
    { id: 21, topic: 2, question: "고려를 건국한 인물은?", options: ["왕건", "견훤", "궁예", "최충헌"], answer: 0 },
    { id: 22, topic: 2, question: "고려의 수도는?", options: ["서울", "개성", "경주", "평양"], answer: 1 },
    { id: 23, topic: 2, question: "고려시대 세계 최초의 금속활자 인쇄물은?", options: ["팔만대장경", "직지심체요절", "삼국사기", "삼국유사"], answer: 1 },
    { id: 24, topic: 2, question: "팔만대장경이 보관된 곳은?", options: ["불국사", "해인사", "통도사", "송광사"], answer: 1 },
    { id: 25, topic: 2, question: "고려청자의 특징적인 기법은?", options: ["청화백자", "상감기법", "분청사기", "백자"], answer: 1 },
    { id: 26, topic: 2, question: "몽골의 침입에 대항한 고려의 특수부대는?", options: ["화랑도", "삼별초", "별무반", "도방"], answer: 1 },
    { id: 27, topic: 2, question: "고려 무신정권 시대를 연 사건은?", options: ["묘청의 난", "무신정변", "위화도회군", "삼별초 항쟁"], answer: 1 },
    { id: 28, topic: 2, question: "삼국사기를 편찬한 인물은?", options: ["일연", "김부식", "이규보", "정도전"], answer: 1 },
    { id: 29, topic: 2, question: "삼국유사를 저술한 승려는?", options: ["원효", "의상", "일연", "지눌"], answer: 2 },
    { id: 30, topic: 2, question: "고려 말 위화도 회군을 단행한 인물은?", options: ["최영", "이성계", "정몽주", "정도전"], answer: 1 },

    // 조선시대 (10문항)
    { id: 31, topic: 3, question: "조선을 건국한 인물은?", options: ["이방원", "이성계", "정도전", "세종"], answer: 1 },
    { id: 32, topic: 3, question: "한글을 창제한 왕은?", options: ["태조", "세종", "영조", "정조"], answer: 1 },
    { id: 33, topic: 3, question: "경복궁이 건립된 시기는?", options: ["고려시대", "조선 초기", "조선 후기", "대한제국"], answer: 1 },
    { id: 34, topic: 3, question: "임진왜란 때 활약한 수군 장수는?", options: ["권율", "이순신", "김시민", "곽재우"], answer: 1 },
    { id: 35, topic: 3, question: "거북선을 만든 시기는?", options: ["고려시대", "조선 초기", "임진왜란 시기", "병자호란 시기"], answer: 2 },
    { id: 36, topic: 3, question: "조선시대 과거제도의 최종 시험은?", options: ["향시", "회시", "전시", "대과"], answer: 2 },
    { id: 37, topic: 3, question: "영조가 실시한 탕평책의 목적은?", options: ["세금 개혁", "붕당 타파", "군사 강화", "대외 정책"], answer: 1 },
    { id: 38, topic: 3, question: "수원 화성을 건설한 왕은?", options: ["세종", "영조", "정조", "고종"], answer: 2 },
    { id: 39, topic: 3, question: "조선 후기 실학을 집대성한 학자는?", options: ["이황", "이이", "정약용", "김정희"], answer: 2 },
    { id: 40, topic: 3, question: "흥선대원군이 실시한 정책이 아닌 것은?", options: ["서원 철폐", "경복궁 중건", "호포제", "개항 정책"], answer: 3 },

    // 근현대사 (10문항)
    { id: 41, topic: 4, question: "강화도 조약이 체결된 해는?", options: ["1866년", "1876년", "1894년", "1905년"], answer: 1 },
    { id: 42, topic: 4, question: "동학농민운동이 일어난 해는?", options: ["1884년", "1894년", "1897년", "1905년"], answer: 1 },
    { id: 43, topic: 4, question: "대한제국을 선포한 해는?", options: ["1894년", "1897년", "1905년", "1910년"], answer: 1 },
    { id: 44, topic: 4, question: "을사늑약이 체결된 해는?", options: ["1904년", "1905년", "1907년", "1910년"], answer: 1 },
    { id: 45, topic: 4, question: "3·1 운동이 일어난 해는?", options: ["1910년", "1919년", "1945년", "1948년"], answer: 1 },
    { id: 46, topic: 4, question: "대한민국 임시정부가 수립된 곳은?", options: ["서울", "상하이", "중경", "연해주"], answer: 1 },
    { id: 47, topic: 4, question: "광복절은 언제인가?", options: ["3월 1일", "8월 15일", "10월 3일", "10월 9일"], answer: 1 },
    { id: 48, topic: 4, question: "대한민국 정부가 수립된 해는?", options: ["1945년", "1948년", "1950년", "1953년"], answer: 1 },
    { id: 49, topic: 4, question: "6·25 전쟁이 발발한 해는?", options: ["1948년", "1950년", "1953년", "1960년"], answer: 1 },
    { id: 50, topic: 4, question: "서울 올림픽이 개최된 해는?", options: ["1986년", "1988년", "2002년", "2018년"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('tour-guide-korean-history-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tour-guide-korean-history-progress', JSON.stringify({
      score,
      answered: Array.from(answeredQuestions)
    }));
  }, [score, answeredQuestions]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const current = filteredQuestions[currentQuestion];
    if (!answeredQuestions.has(current.id)) {
      if (index === current.answer) {
        setScore(prev => prev + 1);
      }
      setAnsweredQuestions(prev => new Set([...prev, current.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setScore(0);
    setAnsweredQuestions(new Set());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    localStorage.removeItem('tour-guide-korean-history-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`관광통역안내사 한국사: ${question}`);
    switch (ai) {
      case 'claude': return `https://claude.ai/new?q=${query}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${query}`;
      case 'gemini': return `https://gemini.google.com/?q=${query}`;
      default: return '#';
    }
  };

  const current = filteredQuestions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/category/service/tour-guide/exam" className="text-emerald-600 hover:text-emerald-800 font-medium">← 시험 안내</Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">진도율: {Math.round(progress)}%</span>
              <button onClick={resetProgress} className="text-xs text-teal-500 hover:text-teal-700">초기화</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">📜 한국사</h1>
          <p className="text-gray-500">선사시대부터 근현대까지</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">총 {questions.length}문항</span>
            <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">맞은 문제: {score}개</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === null ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>전체</button>
          {topics.map(topic => (
            <button key={topic.id} onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>{topic.name} ({topic.count})</button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-emerald-600 font-medium">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs">{topics.find(t => t.id === current.topic)?.name}</span>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full p-4 rounded-xl text-left transition ${showResult ? index === current.answer ? 'bg-green-100 border-2 border-green-500' : selectedAnswer === index ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-50' : 'bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 border-2 border-transparent'}`}>
                <span className="font-medium">{index + 1}. {option}</span>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <p className="text-emerald-800 font-medium mb-2">{selectedAnswer === current.answer ? '✅ 정답입니다!' : `❌ 오답입니다. 정답: ${current.answer + 1}번`}</p>
              <button onClick={() => openAIModal(current.question)} className="text-sm text-emerald-600 hover:text-emerald-800 underline">AI에게 자세한 설명 듣기 →</button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-white rounded-xl font-medium text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition">← 이전</button>
          <button onClick={nextQuestion} disabled={currentQuestion === filteredQuestions.length - 1} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition">다음 →</button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-4">
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">{answeredQuestions.size} / {questions.length} 문제 완료</p>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestionForAI}</p>
            <div className="space-y-2">
              <a href={getAISearchUrl('claude', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-orange-100 text-orange-700 rounded-xl text-center font-medium hover:bg-orange-200 transition">Claude에게 질문하기</a>
              <a href={getAISearchUrl('chatgpt', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-green-100 text-green-700 rounded-xl text-center font-medium hover:bg-green-200 transition">ChatGPT에게 질문하기</a>
              <a href={getAISearchUrl('gemini', currentQuestionForAI)} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-blue-100 text-blue-700 rounded-xl text-center font-medium hover:bg-blue-200 transition">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 p-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
