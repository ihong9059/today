'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function KoreanCultureStudyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '전통문화·예절', count: 10 },
    { id: 1, name: '전통음식', count: 10 },
    { id: 2, name: '전통예술', count: 10 },
    { id: 3, name: '세시풍속·명절', count: 10 },
    { id: 4, name: '현대문화·한류', count: 10 },
  ];

  const questions = [
    // 전통문화·예절 (10문항)
    { id: 1, topic: 0, question: "한복에서 여성이 입는 윗옷은?", options: ["바지", "저고리", "두루마기", "마고자"], answer: 1 },
    { id: 2, topic: 0, question: "한국 전통 인사법 '절'의 종류가 아닌 것은?", options: ["큰절", "평절", "반절", "서양절"], answer: 3 },
    { id: 3, topic: 0, question: "돌잔치에서 아이가 잡는 물건 중 '부'를 상징하는 것은?", options: ["실", "붓", "돈", "책"], answer: 2 },
    { id: 4, topic: 0, question: "전통 혼례에서 신랑이 신부 집에 보내는 예물 상자는?", options: ["함", "폐백", "이바지", "봉채"], answer: 0 },
    { id: 5, topic: 0, question: "한국의 전통 가옥 구조에서 '마루'의 역할은?", options: ["취사", "난방", "통풍·접객", "수납"], answer: 2 },
    { id: 6, topic: 0, question: "온돌의 원리는?", options: ["냉방", "바닥 난방", "습도 조절", "방음"], answer: 1 },
    { id: 7, topic: 0, question: "한국 전통 장례에서 '상주'가 입는 옷은?", options: ["한복", "굴건제복", "두루마기", "도포"], answer: 1 },
    { id: 8, topic: 0, question: "제사 음식을 차리는 원칙 '홍동백서'의 의미는?", options: ["붉은색 동쪽, 흰색 서쪽", "동쪽 많이, 서쪽 적게", "홍시 동쪽", "백김치 서쪽"], answer: 0 },
    { id: 9, topic: 0, question: "한국에서 웃어른께 술을 따를 때의 예절은?", options: ["한 손으로", "두 손으로", "왼손만", "컵에 가득"], answer: 1 },
    { id: 10, topic: 0, question: "전통 혼례 후 신부가 시부모께 드리는 의식은?", options: ["함잔치", "폐백", "이바지", "회갑"], answer: 1 },

    // 전통음식 (10문항)
    { id: 11, topic: 1, question: "김치의 주재료가 아닌 것은?", options: ["배추", "고춧가루", "된장", "젓갈"], answer: 2 },
    { id: 12, topic: 1, question: "비빔밥의 특징은?", options: ["국물 요리", "여러 나물과 밥을 비벼 먹음", "면 요리", "튀김 요리"], answer: 1 },
    { id: 13, topic: 1, question: "전주비빔밥에 꼭 들어가는 재료는?", options: ["소고기 국물", "육회", "계란 프라이", "두부"], answer: 1 },
    { id: 14, topic: 1, question: "삼계탕을 먹는 시기와 관련된 날은?", options: ["설날", "추석", "복날", "동지"], answer: 2 },
    { id: 15, topic: 1, question: "떡국을 먹는 명절은?", options: ["설날", "추석", "단오", "한식"], answer: 0 },
    { id: 16, topic: 1, question: "송편을 먹는 명절은?", options: ["설날", "추석", "정월대보름", "동지"], answer: 1 },
    { id: 17, topic: 1, question: "동지에 먹는 음식은?", options: ["송편", "팥죽", "떡국", "오곡밥"], answer: 1 },
    { id: 18, topic: 1, question: "한국의 대표 발효식품이 아닌 것은?", options: ["김치", "된장", "고추장", "우동"], answer: 3 },
    { id: 19, topic: 1, question: "불고기의 조리법은?", options: ["튀김", "양념 재운 고기를 구움", "삶음", "찜"], answer: 1 },
    { id: 20, topic: 1, question: "막걸리의 원료는?", options: ["보리", "쌀", "포도", "사과"], answer: 1 },

    // 전통예술 (10문항)
    { id: 21, topic: 2, question: "판소리의 구성 요소가 아닌 것은?", options: ["소리", "아니리", "발림", "장단"], answer: 3 },
    { id: 22, topic: 2, question: "판소리 5바탕에 속하지 않는 것은?", options: ["춘향가", "심청가", "흥부가", "아리랑"], answer: 3 },
    { id: 23, topic: 2, question: "탈춤에서 양반을 풍자하는 인물은?", options: ["말뚝이", "각시", "영감", "노장"], answer: 0 },
    { id: 24, topic: 2, question: "사물놀이에 사용되는 악기가 아닌 것은?", options: ["꽹과리", "장구", "북", "가야금"], answer: 3 },
    { id: 25, topic: 2, question: "가야금의 줄 수는?", options: ["6줄", "12줄", "25줄", "50줄"], answer: 1 },
    { id: 26, topic: 2, question: "한국 전통 회화에서 사군자가 아닌 것은?", options: ["매화", "난초", "국화", "장미"], answer: 3 },
    { id: 27, topic: 2, question: "서예에서 가장 기본이 되는 서체는?", options: ["초서", "행서", "해서", "전서"], answer: 2 },
    { id: 28, topic: 2, question: "한국의 전통 춤이 아닌 것은?", options: ["승무", "살풀이춤", "탱고", "강강술래"], answer: 2 },
    { id: 29, topic: 2, question: "아리랑의 특징은?", options: ["궁중음악", "한국의 대표 민요", "판소리", "불교음악"], answer: 1 },
    { id: 30, topic: 2, question: "유네스코 인류무형문화유산으로 등재된 것이 아닌 것은?", options: ["판소리", "강강술래", "김치 담그기", "K-pop"], answer: 3 },

    // 세시풍속·명절 (10문항)
    { id: 31, topic: 3, question: "설날에 하는 전통 놀이가 아닌 것은?", options: ["윷놀이", "연날리기", "강강술래", "널뛰기"], answer: 2 },
    { id: 32, topic: 3, question: "추석의 다른 이름은?", options: ["한가위", "단오", "한식", "동지"], answer: 0 },
    { id: 33, topic: 3, question: "단오에 하는 풍습이 아닌 것은?", options: ["창포물에 머리 감기", "그네뛰기", "씨름", "복조리 걸기"], answer: 3 },
    { id: 34, topic: 3, question: "정월대보름에 먹는 음식은?", options: ["송편", "오곡밥", "떡국", "팥죽"], answer: 1 },
    { id: 35, topic: 3, question: "한식에 하는 풍습은?", options: ["성묘", "그네뛰기", "송편 빚기", "복조리 걸기"], answer: 0 },
    { id: 36, topic: 3, question: "음력 4월 8일은 무슨 날인가?", options: ["설날", "석가탄신일", "추석", "단오"], answer: 1 },
    { id: 37, topic: 3, question: "백중날에 주로 하는 일은?", options: ["조상 제사", "농사일 휴식", "연날리기", "수영"], answer: 1 },
    { id: 38, topic: 3, question: "칠석에 관련된 설화는?", options: ["단군신화", "견우직녀", "주몽신화", "연오랑세오녀"], answer: 1 },
    { id: 39, topic: 3, question: "동지에 팥죽을 먹는 이유는?", options: ["맛있어서", "액운 방지", "영양 보충", "전통 없음"], answer: 1 },
    { id: 40, topic: 3, question: "세배를 하는 명절은?", options: ["추석", "설날", "단오", "한식"], answer: 1 },

    // 현대문화·한류 (10문항)
    { id: 41, topic: 4, question: "K-pop의 세계적 인기를 이끈 그룹이 아닌 것은?", options: ["BTS", "블랙핑크", "비틀즈", "엑소"], answer: 2 },
    { id: 42, topic: 4, question: "한류(Korean Wave)가 시작된 지역은?", options: ["미국", "유럽", "아시아", "아프리카"], answer: 2 },
    { id: 43, topic: 4, question: "한국 드라마의 특징이 아닌 것은?", options: ["가족 이야기", "로맨스", "역사극", "3시간 에피소드"], answer: 3 },
    { id: 44, topic: 4, question: "한국 영화 최초 칸 황금종려상 수상작은?", options: ["올드보이", "기생충", "헤어질 결심", "밀양"], answer: 1 },
    { id: 45, topic: 4, question: "K-beauty의 특징은?", options: ["화려한 색상", "스킨케어 중심", "향수 위주", "바디케어만"], answer: 1 },
    { id: 46, topic: 4, question: "한국의 e스포츠 강국으로서 유명한 게임이 아닌 것은?", options: ["리그오브레전드", "스타크래프트", "피파", "체스"], answer: 3 },
    { id: 47, topic: 4, question: "한글날은 언제인가?", options: ["3월 1일", "8월 15일", "10월 9일", "10월 3일"], answer: 2 },
    { id: 48, topic: 4, question: "개천절은 무엇을 기념하는 날인가?", options: ["광복", "단군의 건국", "한글 창제", "3·1 운동"], answer: 1 },
    { id: 49, topic: 4, question: "한국의 IT 강국으로서 유명한 기업이 아닌 것은?", options: ["삼성", "LG", "현대", "도요타"], answer: 3 },
    { id: 50, topic: 4, question: "한국 음식의 세계화를 위한 노력으로 알려진 것은?", options: ["한식 세계화", "K-food", "둘 다", "없음"], answer: 2 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('tour-guide-korean-culture-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tour-guide-korean-culture-progress', JSON.stringify({
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
    localStorage.removeItem('tour-guide-korean-culture-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAISearchUrl = (ai: string, question: string) => {
    const query = encodeURIComponent(`관광통역안내사 한국문화: ${question}`);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🎭 한국문화</h1>
          <p className="text-gray-500">전통문화, 음식, 예술, 명절, 현대문화</p>
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

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
