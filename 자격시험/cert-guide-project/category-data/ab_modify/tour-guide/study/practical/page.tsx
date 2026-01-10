'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TourGuidePracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestionForAI, setCurrentQuestionForAI] = useState<string>('');

  const topics = [
    { id: 0, name: '관광지 안내', count: 10 },
    { id: 1, name: '한국문화 소개', count: 10 },
    { id: 2, name: '상황대처', count: 10 },
    { id: 3, name: '자기소개·지원동기', count: 10 },
    { id: 4, name: '시사·관광정책', count: 10 },
  ];

  const questions = [
    // 관광지 안내 (10문항)
    { id: 1, topic: 0, question: "경복궁을 외국인 관광객에게 소개할 때 가장 강조해야 할 점은?", options: ["조선 왕조의 법궁으로서의 역사적 의미", "입장료와 운영시간", "주변 맛집 정보", "지하철 노선 안내"], answer: 0 },
    { id: 2, topic: 0, question: "창덕궁 후원(비원)의 특징을 설명할 때 적절한 내용은?", options: ["서양식 정원의 대표 사례", "자연 지형을 그대로 살린 한국 전통 정원", "일본 정원의 영향을 받은 양식", "중국 황실 정원의 모방"], answer: 1 },
    { id: 3, topic: 0, question: "북촌한옥마을 안내 시 관광객에게 전달할 핵심 메시지는?", options: ["저렴한 숙박 시설 안내", "전통과 현대가 공존하는 살아있는 마을", "한옥 건축의 기술적 우수성만 설명", "음식점 위치만 안내"], answer: 1 },
    { id: 4, topic: 0, question: "제주도 성산일출봉을 소개할 때 포함해야 할 정보는?", options: ["해녀 문화만 설명", "유네스코 세계자연유산 등재 사실과 화산 지형 특징", "호텔 가격 정보", "항공편 시간표"], answer: 1 },
    { id: 5, topic: 0, question: "DMZ(비무장지대) 투어에서 관광객에게 설명해야 할 주요 내용은?", options: ["쇼핑 정보", "한반도 분단의 역사와 평화의 의미", "맛집 추천", "연예인 관련 정보"], answer: 1 },
    { id: 6, topic: 0, question: "수원화성을 안내할 때 강조해야 할 역사적 가치는?", options: ["조선 후기 성곽 건축의 과학적 우수성", "일제강점기 건축물", "고려시대 유적", "삼국시대 산성"], answer: 0 },
    { id: 7, topic: 0, question: "경주 불국사와 석굴암 안내 시 적절한 설명은?", options: ["고려시대의 대표적 사찰", "신라 불교 예술의 정수를 보여주는 유네스코 유산", "조선시대 건축", "백제 문화의 영향"], answer: 1 },
    { id: 8, topic: 0, question: "인사동 거리를 안내할 때 관광객에게 추천할 체험은?", options: ["패스트푸드점 방문", "전통 공예품 구경, 차 문화 체험, 갤러리 방문", "현대식 쇼핑몰만 안내", "야경 감상만 추천"], answer: 1 },
    { id: 9, topic: 0, question: "한강 유람선 투어에서 설명할 내용으로 적절한 것은?", options: ["한강의 역사적 의미와 서울의 발전상", "수질 오염 문제만 강조", "다른 나라 강과의 비교만", "배 운항 기술 설명만"], answer: 0 },
    { id: 10, topic: 0, question: "남산타워(N서울타워) 안내 시 포함할 정보는?", options: ["건설 비용만 설명", "서울 전경, 사랑의 자물쇠, 야경 등 다양한 볼거리", "다른 타워와 높이 비교만", "엘리베이터 속도만 강조"], answer: 1 },

    // 한국문화 소개 (10문항)
    { id: 11, topic: 1, question: "한복을 외국인에게 설명할 때 가장 적절한 내용은?", options: ["값비싼 의상이라는 점만 강조", "선의 아름다움과 자연스러운 곡선미, 계절별 소재의 차이", "불편한 옷이라고 솔직히 말하기", "현대에는 입지 않는다고 설명"], answer: 1 },
    { id: 12, topic: 1, question: "김치를 소개할 때 강조해야 할 점은?", options: ["냄새가 강하다는 점", "발효식품으로서의 건강 효능과 유네스코 무형유산 등재", "만드는 데 시간이 오래 걸린다는 점", "외국인이 먹기 어렵다는 점"], answer: 1 },
    { id: 13, topic: 1, question: "한국의 절(사찰)을 방문할 때 관광객에게 안내할 예절은?", options: ["큰 소리로 대화해도 된다", "모자를 쓰고 다녀도 된다", "조용히 하고 사진 촬영 시 허가 확인, 신발 벗기", "음식물 반입이 자유롭다"], answer: 2 },
    { id: 14, topic: 1, question: "한국의 온돌 문화를 설명할 때 적절한 내용은?", options: ["에어컨과 같은 원리", "바닥 난방 시스템으로 친환경적이고 건강에 좋음", "서양에서 전래된 기술", "현대에는 사용하지 않음"], answer: 1 },
    { id: 15, topic: 1, question: "한국의 술 문화에서 외국인에게 알려줄 예절은?", options: ["혼자 마시는 것이 기본", "어른에게 술을 따를 때 두 손으로, 고개를 돌려 마시기", "술잔을 비우지 않아도 됨", "술을 강요하는 것이 예의"], answer: 1 },
    { id: 16, topic: 1, question: "한글의 우수성을 외국인에게 설명할 때 포함할 내용은?", options: ["한자에서 유래했다", "세종대왕이 창제한 과학적 문자 체계, 배우기 쉬움", "영어 알파벳과 동일하다", "읽기 어려운 문자"], answer: 1 },
    { id: 17, topic: 1, question: "비빔밥을 소개할 때 강조할 특징은?", options: ["패스트푸드라는 점", "오방색의 조화, 영양 균형, 나눔의 문화", "비싼 음식이라는 점", "외국인 입맛에 맞지 않음"], answer: 1 },
    { id: 18, topic: 1, question: "한국의 사우나(찜질방) 문화를 안내할 때 적절한 설명은?", options: ["위생이 좋지 않다고 경고", "한국인의 목욕 문화와 가족·친구와의 소통 공간", "외국인은 이용할 수 없다", "비용이 매우 비싸다"], answer: 1 },
    { id: 19, topic: 1, question: "K-pop을 주제로 한류를 설명할 때 포함할 내용은?", options: ["일시적 유행이라고 설명", "글로벌 팬덤, 음악·퍼포먼스의 완성도, 문화 콘텐츠 산업", "한국에서만 인기있다고 함", "외국 음악의 복제라고 설명"], answer: 1 },
    { id: 20, topic: 1, question: "한국의 명절(설날, 추석)을 설명할 때 적절한 내용은?", options: ["서양 크리스마스와 같다고 설명", "조상에 대한 예를 갖추고 가족이 모이는 전통 명절", "현대에는 의미가 없다고 함", "외국인은 참여할 수 없다고 함"], answer: 1 },

    // 상황대처 (10문항)
    { id: 21, topic: 2, question: "관광객이 여권을 분실했다고 할 때 가이드의 첫 번째 대응은?", options: ["무시하고 일정 진행", "침착하게 위로하고, 가까운 경찰서 신고 및 대사관 연락 안내", "다른 관광객에게 책임 전가", "그냥 귀국하라고 함"], answer: 1 },
    { id: 22, topic: 2, question: "갑자기 비가 와서 야외 일정을 진행할 수 없을 때 적절한 대응은?", options: ["일정 취소 후 해산", "대안 일정(실내 관광지, 박물관 등)을 제시하고 동의 구하기", "비를 맞으며 강행", "관광객에게 화를 냄"], answer: 1 },
    { id: 23, topic: 2, question: "관광객 중 한 명이 음식 알레르기가 있다고 할 때 대응은?", options: ["무시하고 같은 음식 제공", "알레르기 정보를 식당에 전달하고 대체 메뉴 확인", "그 사람만 식사에서 제외", "본인이 알아서 하라고 함"], answer: 1 },
    { id: 24, topic: 2, question: "관광객이 예정된 식당 음식에 불만을 표시할 때 적절한 대응은?", options: ["불만을 무시", "공감을 표현하고 다른 메뉴 추천 또는 식당 변경 가능성 확인", "그 관광객을 비난", "다른 관광객들에게 동조를 구함"], answer: 1 },
    { id: 25, topic: 2, question: "버스가 고장나 일정이 지연될 때 가이드의 대응은?", options: ["관광객과 함께 당황", "상황을 설명하고 대체 교통수단 확보, 대기 중 간단한 설명 제공", "아무 말 없이 기다림", "관광객에게 택시를 타라고 함"], answer: 1 },
    { id: 26, topic: 2, question: "관광객이 쇼핑에서 바가지를 썼다고 불만을 제기할 때는?", options: ["상인 편을 듦", "공감하고 환불 가능 여부 확인, 향후 주의사항 안내", "그 관광객의 실수라고 비난", "모른 척 함"], answer: 1 },
    { id: 27, topic: 2, question: "관광객 중 노인이 걷기 힘들어할 때 적절한 대응은?", options: ["일정대로 빠르게 진행", "휴식 시간 제공하고 휠체어 대여 또는 차량 이동 고려", "뒤처지면 두고 감", "다른 관광객에게 부축을 강요"], answer: 1 },
    { id: 28, topic: 2, question: "관광 중 관광객이 갑자기 아플 때 가이드의 조치는?", options: ["무시하고 일정 진행", "응급 상황 파악, 필요시 병원 이송 및 통역 지원", "다른 관광객에게 돌봐달라고 함", "여행사에 연락만 하고 기다림"], answer: 1 },
    { id: 29, topic: 2, question: "관광객들 사이에 갈등이 발생했을 때 가이드의 역할은?", options: ["한쪽 편 들기", "중립적 입장에서 중재하고 분위기 전환", "갈등을 방치", "양측 모두 비난"], answer: 1 },
    { id: 30, topic: 2, question: "예약한 숙소에 문제가 생겼을 때 적절한 대응은?", options: ["관광객에게 알아서 하라고 함", "즉시 대체 숙소를 확보하고 불편에 대해 사과", "숙소 탓만 함", "일정을 취소"], answer: 1 },

    // 자기소개·지원동기 (10문항)
    { id: 31, topic: 3, question: "면접에서 자기소개 시 가장 중요한 포인트는?", options: ["개인 사생활 상세히 설명", "관광통역안내사로서의 강점과 관련 경험 어필", "학창시절 이야기만 함", "가족 소개에 집중"], answer: 1 },
    { id: 32, topic: 3, question: "지원동기를 말할 때 피해야 할 답변은?", options: ["한국 문화를 세계에 알리고 싶다", "외국인과 소통하는 것이 즐겁다", "돈을 많이 벌고 싶어서", "여행과 사람을 좋아한다"], answer: 2 },
    { id: 33, topic: 3, question: "본인의 강점을 어필할 때 효과적인 방법은?", options: ["추상적으로 '열심히 하겠다'고만 함", "구체적 경험과 사례를 들어 설명", "다른 지원자를 비하", "자격증 나열만 함"], answer: 1 },
    { id: 34, topic: 3, question: "관광통역안내사가 갖춰야 할 자질로 어필할 내용은?", options: ["외국어 능력, 서비스 마인드, 한국 문화 이해, 위기대처 능력", "체력만 강조", "외모만 언급", "학벌 자랑"], answer: 0 },
    { id: 35, topic: 3, question: "면접에서 '왜 이 언어를 선택했나'라는 질문에 적절한 답변은?", options: ["쉬워서", "해당 국가에 대한 관심과 교류 경험, 언어 학습 과정 설명", "다른 언어를 못해서", "아무 이유 없음"], answer: 1 },
    { id: 36, topic: 3, question: "면접에서 단점을 물었을 때 적절한 답변 방식은?", options: ["단점이 없다고 함", "단점을 인정하고 극복 노력을 함께 설명", "치명적 단점만 나열", "다른 사람 탓을 함"], answer: 1 },
    { id: 37, topic: 3, question: "향후 계획을 물었을 때 좋은 답변은?", options: ["모르겠다", "관광업계에서 전문성을 키우고 한국 관광 발전에 기여하겠다", "다른 직업을 찾겠다", "그냥 해보겠다"], answer: 1 },
    { id: 38, topic: 3, question: "관광통역안내사로서 어려울 것 같은 점을 물었을 때?", options: ["어려운 점이 없다고 함", "예상되는 어려움과 대처 방안을 함께 제시", "모든 것이 어려울 것 같다고 함", "포기하겠다고 함"], answer: 1 },
    { id: 39, topic: 3, question: "외국어 실력 향상을 위해 어떤 노력을 했는지 물었을 때?", options: ["특별히 없다", "어학연수, 자격증, 원어민 교류, 콘텐츠 학습 등 구체적 사례", "타고났다고 함", "필요 없다고 생각한다고 함"], answer: 1 },
    { id: 40, topic: 3, question: "마지막으로 하고 싶은 말이 있냐고 물었을 때?", options: ["없다고 함", "열의와 포부를 간결하게 어필하고 감사 인사", "불합격해도 상관없다고 함", "다른 회사도 지원했다고 함"], answer: 1 },

    // 시사·관광정책 (10문항)
    { id: 41, topic: 4, question: "한국 관광의 최근 트렌드로 적절한 것은?", options: ["단체 패키지 관광만 인기", "개별 자유여행(FIT), 체험 관광, 한류 관광 증가", "국내 관광객만 증가", "관광객 감소 추세"], answer: 1 },
    { id: 42, topic: 4, question: "한국관광공사의 역할로 옳은 것은?", options: ["항공사 운영", "한국 관광 홍보, 외국인 관광객 유치, 관광 인프라 개선", "여권 발급", "출입국 관리"], answer: 1 },
    { id: 43, topic: 4, question: "K-관광 활성화를 위한 정책으로 적절한 것은?", options: ["외국인 입국 제한", "비자 간소화, 관광 콘텐츠 개발, 다국어 서비스 확대", "관광지 폐쇄", "관광세 인상만"], answer: 1 },
    { id: 44, topic: 4, question: "지속가능한 관광(Sustainable Tourism)의 의미는?", options: ["관광객 무제한 유치", "환경 보전, 지역사회 이익, 문화 보존을 고려한 관광", "저가 관광만 제공", "대형 리조트 개발만"], answer: 1 },
    { id: 45, topic: 4, question: "의료관광이 한국에서 성장하는 이유는?", options: ["의료비가 비싸서", "우수한 의료 기술, 합리적 비용, K-뷰티와 연계", "의료시설 부족", "언어 장벽이 없어서"], answer: 1 },
    { id: 46, topic: 4, question: "한류(Korean Wave)가 관광에 미치는 영향은?", options: ["영향 없음", "한국에 대한 관심 증가, 관광 동기 부여, 문화체험 수요 증가", "관광객 감소", "부정적 이미지만 형성"], answer: 1 },
    { id: 47, topic: 4, question: "스마트 관광의 예시로 적절한 것은?", options: ["종이 지도만 사용", "AR 관광, AI 가이드, 모바일 티켓, 다국어 앱 서비스", "현금 결제만 가능", "전화 예약만 가능"], answer: 1 },
    { id: 48, topic: 4, question: "코로나19 이후 관광 트렌드 변화로 옳은 것은?", options: ["대규모 단체 관광 증가", "안전·위생 중시, 소규모 여행, 자연 관광 선호 증가", "변화 없음", "해외여행만 증가"], answer: 1 },
    { id: 49, topic: 4, question: "외국인 관광객 유치를 위한 인프라 개선 사례는?", options: ["외국어 안내 축소", "다국어 표지판, 무슬림 친화 시설, 면세점 확대", "현금만 사용 가능하게 함", "교통 불편 방치"], answer: 1 },
    { id: 50, topic: 4, question: "MICE 산업이 관광에서 중요한 이유는?", options: ["소규모 관광만 해당", "고부가가치, 비수기 수요 창출, 지역경제 활성화", "관광과 무관", "환경에만 좋음"], answer: 1 },
  ];

  const filteredQuestions = selectedTopic !== null
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('tour-guide-practical-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tour-guide-practical-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const current = filteredQuestions[currentQuestion];
    if (index === current.answer && !answeredQuestions.includes(current.id)) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, current.id]);
    } else if (!answeredQuestions.includes(current.id)) {
      setAnsweredQuestions([...answeredQuestions, current.id]);
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
    localStorage.removeItem('tour-guide-practical-progress');
  };

  const openAIModal = (question: string) => {
    setCurrentQuestionForAI(question);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = encodeURIComponent(`관광통역안내사 면접 문제입니다. 이 문제에 대해 자세히 설명해주세요:\n\n${currentQuestionForAI}`);
    switch(ai) {
      case 'claude': return `https://claude.ai/new?q=${prompt}`;
      case 'chatgpt': return `https://chat.openai.com/?q=${prompt}`;
      case 'gemini': return `https://gemini.google.com/?q=${prompt}`;
      default: return '#';
    }
  };

  const current = filteredQuestions[currentQuestion];
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/tour-guide" className="text-teal-600 hover:text-teal-800 font-medium">
            ← 관광통역안내사
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎤 면접 문제 풀기</h1>
          <p className="text-gray-500">관광통역안내사 면접 대비 50문항</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">전체 진행률</span>
            <span className="text-sm font-bold text-teal-600">{answeredQuestions.length}/50 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-3 rounded-full transition-all" style={{width: `${progressPercentage}%`}}></div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">정답률: </span>
            <span className="text-sm font-bold text-emerald-600">
              {answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%
            </span>
          </div>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-500 mb-3">토픽별 필터</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedTopic(null); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === null ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              전체 (50)
            </button>
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => { setSelectedTopic(topic.id); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition ${selectedTopic === topic.id ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {topic.name} ({topic.count})
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        {current && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                {topics.find(t => t.id === current.topic)?.name}
              </span>
              <span className="text-gray-400 text-sm">
                {currentQuestion + 1} / {filteredQuestions.length}
              </span>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-6">{current.question}</h2>

            <div className="space-y-3">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition ${
                    showResult
                      ? index === current.answer
                        ? 'bg-green-100 border-2 border-green-500'
                        : index === selectedAnswer
                        ? 'bg-red-100 border-2 border-red-500'
                        : 'bg-gray-50'
                      : 'bg-gray-50 hover:bg-teal-50 hover:border-teal-300 border-2 border-transparent'
                  }`}
                >
                  <span className="font-medium">{index + 1}. {option}</span>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === current.answer ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className={`font-bold ${selectedAnswer === current.answer ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedAnswer === current.answer ? '✅ 정답입니다!' : '❌ 틀렸습니다!'}
                </p>
                <p className="text-gray-600 mt-2">정답: {current.answer + 1}. {current.options[current.answer]}</p>
                <button
                  onClick={() => openAIModal(current.question)}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-indigo-600 transition"
                >
                  🤖 AI에게 자세한 설명 듣기
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium disabled:opacity-50 hover:bg-gray-300 transition"
          >
            ← 이전
          </button>
          <button
            onClick={nextQuestion}
            disabled={currentQuestion === filteredQuestions.length - 1}
            className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-teal-700 transition"
          >
            다음 →
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={resetProgress}
          className="w-full mt-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition"
        >
          🔄 진행 상황 초기화
        </button>

        {/* Study Links */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📚 다른 과목 학습하기</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/category/service/tour-guide/study/korean-history" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">한국사</Link>
            <Link href="/category/service/tour-guide/study/korean-culture" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">한국문화</Link>
            <Link href="/category/service/tour-guide/study/tourism-resources" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">관광자원해설</Link>
            <Link href="/category/service/tour-guide/study/tour-english" className="py-3 px-4 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">관광영어</Link>
          </div>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하여 자세한 설명을 들어보세요</p>
            <div className="space-y-3">
              <a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-center font-medium hover:from-orange-500 hover:to-orange-600 transition">
                Claude
              </a>
              <a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center font-medium hover:from-green-600 hover:to-green-700 transition">
                ChatGPT
              </a>
              <a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-center font-medium hover:from-blue-600 hover:to-blue-700 transition">
                Gemini
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
