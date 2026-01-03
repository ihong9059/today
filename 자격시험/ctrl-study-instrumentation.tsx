'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InstrumentationStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('ctrl-instrumentation-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const updated = new Set(completedQuestions);
    if (updated.has(questionId)) updated.delete(questionId);
    else updated.add(questionId);
    setCompletedQuestions(updated);
    localStorage.setItem('ctrl-instrumentation-progress', JSON.stringify([...updated]));
  };

  const toggleTopic = (index: number) => {
    const updated = new Set(expandedTopics);
    if (updated.has(index)) updated.delete(index);
    else updated.add(index);
    setExpandedTopics(updated);
  };

  const topics = [
    {
      title: '측정의 기초',
      icon: '📏',
      questions: [
        { id: 'i1', q: '측정의 정의와 측정 시스템의 구성요소(센서, 변환기, 신호조절기, 출력장치)를 설명해주세요.', keyword: '측정시스템 구성요소' },
        { id: 'i2', q: '정확도(Accuracy)와 정밀도(Precision)의 차이를 설명해주세요.', keyword: '정확도 정밀도 차이' },
        { id: 'i3', q: '측정 오차의 종류(계통오차, 우연오차)와 오차 전파법칙을 설명해주세요.', keyword: '측정오차 종류 전파법칙' },
        { id: 'i4', q: '분해능(Resolution), 감도(Sensitivity), 히스테리시스(Hysteresis)를 설명해주세요.', keyword: '분해능 감도 히스테리시스' },
      ],
    },
    {
      title: '센서의 원리',
      icon: '🔌',
      questions: [
        { id: 'i5', q: '저항형 센서(스트레인게이지, 서미스터, RTD)의 원리와 특성을 설명해주세요.', keyword: '저항형센서 스트레인게이지 RTD' },
        { id: 'i6', q: '열전대(Thermocouple)의 종류(K, J, T, E, R, S)와 특성을 비교해주세요.', keyword: '열전대 종류 K J T 특성' },
        { id: 'i7', q: '정전용량형 센서와 유도형 센서의 원리와 적용을 설명해주세요.', keyword: '정전용량센서 유도형센서' },
        { id: 'i8', q: '압전형 센서(Piezoelectric)의 원리와 특성을 설명해주세요.', keyword: '압전형센서 피에조' },
        { id: 'i9', q: '광학 센서(포토다이오드, 포토트랜지스터, 엔코더)의 원리를 설명해주세요.', keyword: '광학센서 포토다이오드 엔코더' },
      ],
    },
    {
      title: '신호 조절',
      icon: '📊',
      questions: [
        { id: 'i10', q: '휘트스톤 브리지(Wheatstone Bridge) 회로의 원리와 불평형 조건을 설명해주세요.', keyword: '휘트스톤 브리지 원리' },
        { id: 'i11', q: '증폭기(Amplifier)의 종류와 OP앰프를 이용한 신호증폭을 설명해주세요.', keyword: '증폭기 OP앰프 신호증폭' },
        { id: 'i12', q: '필터(저역통과, 고역통과, 대역통과, 대역저지)의 원리와 적용을 설명해주세요.', keyword: '필터 저역통과 고역통과' },
        { id: 'i13', q: '노이즈 제거 기법(차폐, 접지, 트위스트 페어)을 설명해주세요.', keyword: '노이즈제거 차폐 접지' },
      ],
    },
    {
      title: '아날로그-디지털 변환',
      icon: '🔢',
      questions: [
        { id: 'i14', q: 'A/D 변환기의 원리와 종류(플래시, SAR, 델타시그마)를 설명해주세요.', keyword: 'AD변환기 플래시 SAR' },
        { id: 'i15', q: 'D/A 변환기의 원리와 종류(가중저항형, R-2R래더형)를 설명해주세요.', keyword: 'DA변환기 R-2R래더' },
        { id: 'i16', q: '샘플링 이론과 앨리어싱(Aliasing) 현상을 설명해주세요.', keyword: '샘플링이론 앨리어싱 나이퀴스트' },
        { id: 'i17', q: '양자화 오차와 분해능(비트수)의 관계를 설명해주세요.', keyword: '양자화오차 분해능 비트' },
      ],
    },
    {
      title: '데이터 수집 시스템',
      icon: '💻',
      questions: [
        { id: 'i18', q: '데이터 수집 시스템(DAQ)의 구성과 동작원리를 설명해주세요.', keyword: '데이터수집 DAQ 구성' },
        { id: 'i19', q: '멀티플렉서(MUX)의 역할과 채널 스캔 방식을 설명해주세요.', keyword: '멀티플렉서 MUX 채널스캔' },
        { id: 'i20', q: '샘플 앤 홀드(S/H) 회로의 필요성과 원리를 설명해주세요.', keyword: '샘플홀드 S/H 회로' },
        { id: 'i21', q: '디지털 통신 프로토콜(RS-232, RS-485, Modbus)의 특성을 비교해주세요.', keyword: 'RS-232 RS-485 Modbus' },
      ],
    },
    {
      title: '계측 시스템 설계',
      icon: '⚙️',
      questions: [
        { id: 'i22', q: '측정 범위(Range)와 스팬(Span)의 정의와 계산법을 설명해주세요.', keyword: '측정범위 Range Span' },
        { id: 'i23', q: '교정(Calibration)의 의미와 교정 절차를 설명해주세요.', keyword: '교정 Calibration 절차' },
        { id: 'i24', q: '측정 불확도(Uncertainty)의 정의와 계산방법을 설명해주세요.', keyword: '측정불확도 Uncertainty' },
        { id: 'i25', q: '4-20mA 전류루프 신호의 특성과 장점을 설명해주세요.', keyword: '4-20mA 전류루프' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.size / totalQuestions) * 100);

  const openAI = (aiType: string, question: string, keyword: string) => {
    const prompts: Record<string, string> = {
      claude: `제어계측기사 계측기학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      chatgpt: `제어계측기사 계측기학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
      gemini: `제어계측기사 계측기학 시험 준비 중입니다.\n\n질문: ${question}\n\n핵심 키워드: ${keyword}\n\n시험에 자주 출제되는 내용 위주로 상세히 설명해주세요.`,
    };
    const urls: Record<string, string> = {
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompts.claude)}`,
      chatgpt: `https://chat.openai.com/?q=${encodeURIComponent(prompts.chatgpt)}`,
      gemini: `https://gemini.google.com/?q=${encodeURIComponent(prompts.gemini)}`,
    };
    window.open(urls[aiType], '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-purple-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">계측기학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-500 to-violet-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <span className="text-4xl">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">계측기학</h1>
                <p className="text-purple-100">Instrumentation</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">학습 진행률</p>
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-purple-100 text-sm">{completedQuestions.size}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <h3 className="font-bold text-gray-800">{topic.title}</h3>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`text-gray-400 transition-transform ${expandedTopics.has(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.has(topicIndex) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 ${completedQuestions.has(q.id) ? 'bg-green-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => saveProgress(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                            completedQuestions.has(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 mb-3">{q.q}</p>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => openAI('claude', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm rounded-lg hover:opacity-90">Claude</button>
                            <button onClick={() => openAI('chatgpt', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-lg hover:opacity-90">ChatGPT</button>
                            <button onClick={() => openAI('gemini', q.q, q.keyword)} className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:opacity-90">Gemini</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
