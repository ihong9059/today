'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HistoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const topics = [
    {
      id: 'ancient',
      name: '선사~삼국시대',
      icon: '🏺',
      questions: [
        { id: 1, q: '구석기 시대의 특징을 설명하시오.', a: '뗀석기, 채집·수렵, 동굴·막집 거주' },
        { id: 2, q: '신석기 시대의 특징을 설명하시오.', a: '간석기, 빗살무늬 토기, 농경·정착 시작' },
        { id: 3, q: '청동기 시대의 특징을 설명하시오.', a: '비파형 동검, 민무늬 토기, 계급 발생' },
        { id: 4, q: '고조선의 건국과 특징을 설명하시오.', a: '단군왕검 건국, 8조법, 위만조선→한4군' },
        { id: 5, q: '삼한의 특징을 설명하시오.', a: '마한·진한·변한, 철기문화, 제천행사' },
        { id: 6, q: '고구려의 발전과정을 설명하시오.', a: '태조왕→고국천왕→소수림왕→광개토대왕→장수왕' },
        { id: 7, q: '백제의 발전과정을 설명하시오.', a: '고이왕→근초고왕→무령왕→성왕(사비천도)' },
        { id: 8, q: '신라의 발전과정을 설명하시오.', a: '내물왕→법흥왕→진흥왕→삼국통일' },
        { id: 9, q: '가야의 역사를 설명하시오.', a: '금관가야(김해)→대가야(고령), 철기 문화' },
        { id: 10, q: '삼국시대 문화의 특징을 설명하시오.', a: '불교 수용, 한자 사용, 율령 반포' }
      ]
    },
    {
      id: 'unified-silla',
      name: '남북국~고려',
      icon: '🏛️',
      questions: [
        { id: 1, q: '통일신라의 통치체제를 설명하시오.', a: '9서당 10정, 9주 5소경, 국학 설치' },
        { id: 2, q: '발해의 건국과 특징을 설명하시오.', a: '대조영 건국, 해동성국, 5경 15부 62주' },
        { id: 3, q: '신라 하대의 동요를 설명하시오.', a: '왕위쟁탈, 호족 성장, 6두품 불만, 후삼국' },
        { id: 4, q: '고려 건국과 후삼국 통일을 설명하시오.', a: '왕건 건국, 호족 통합, 936년 통일' },
        { id: 5, q: '광종의 개혁을 설명하시오.', a: '노비안검법, 과거제, 칭제건원, 왕권 강화' },
        { id: 6, q: '성종의 체제정비를 설명하시오.', a: '최승로 시무28조, 지방관 파견, 국자감' },
        { id: 7, q: '무신정권의 성립을 설명하시오.', a: '무신정변(1170), 최씨무신정권' },
        { id: 8, q: '몽골 항쟁을 설명하시오.', a: '대장경 조판, 삼별초, 강화천도' },
        { id: 9, q: '공민왕의 개혁정치를 설명하시오.', a: '반원자주, 신돈 등용, 신진사대부 성장' },
        { id: 10, q: '고려말 신진사대부를 설명하시오.', a: '성리학 수용, 과전법, 조선 건국 주도' }
      ]
    },
    {
      id: 'joseon-early',
      name: '조선 전기',
      icon: '📜',
      questions: [
        { id: 1, q: '조선 건국과 정도전의 역할을 설명하시오.', a: '이성계 추대, 재상중심 정치론, 조선경국전' },
        { id: 2, q: '태종의 왕권강화책을 설명하시오.', a: '6조직계제, 사병혁파, 호패법' },
        { id: 3, q: '세종의 업적을 설명하시오.', a: '훈민정음, 집현전, 의정부서사제, 4군6진' },
        { id: 4, q: '조선의 통치체제를 설명하시오.', a: '의정부-6조, 3사(사헌부·사간원·홍문관)' },
        { id: 5, q: '과거제도를 설명하시오.', a: '문과·무과·잡과, 3년마다 실시, 양인 응시' },
        { id: 6, q: '사림의 등장과 사화를 설명하시오.', a: '훈구 vs 사림, 무오·갑자·기묘·을사사화' },
        { id: 7, q: '붕당정치의 전개를 설명하시오.', a: '동인·서인 분화, 상호 견제, 공론정치' },
        { id: 8, q: '임진왜란을 설명하시오.', a: '1592년, 이순신 수군, 의병, 명 지원' },
        { id: 9, q: '광해군의 중립외교를 설명하시오.', a: '명·후금 사이 실리 외교, 인조반정으로 폐위' },
        { id: 10, q: '병자호란을 설명하시오.', a: '1636년, 삼전도 굴욕, 북벌론 대두' }
      ]
    },
    {
      id: 'joseon-late',
      name: '조선 후기',
      icon: '📚',
      questions: [
        { id: 1, q: '탕평정치를 설명하시오.', a: '영조·정조, 붕당 간 균형, 왕권 강화' },
        { id: 2, q: '정조의 개혁을 설명하시오.', a: '규장각, 장용영, 수원화성, 통공정책' },
        { id: 3, q: '세도정치를 설명하시오.', a: '순조~철종, 외척 권력 독점, 삼정문란' },
        { id: 4, q: '실학의 발달을 설명하시오.', a: '중농학파(유형원), 중상학파(박지원), 실사구시' },
        { id: 5, q: '서민문화의 발달을 설명하시오.', a: '한글소설, 판소리, 탈춤, 풍속화' },
        { id: 6, q: '천주교 전래를 설명하시오.', a: '이승훈 세례, 신해·병인박해' },
        { id: 7, q: '홍경래의 난을 설명하시오.', a: '1811년, 평안도 차별 반발, 세도정치 비판' },
        { id: 8, q: '임술농민봉기를 설명하시오.', a: '1862년, 삼정문란 저항, 전국 확산' },
        { id: 9, q: '동학의 창시를 설명하시오.', a: '최제우, 인내천, 후천개벽, 보국안민' },
        { id: 10, q: '대원군의 개혁정치를 설명하시오.', a: '경복궁 중건, 서원철폐, 양전사업, 호포제' }
      ]
    },
    {
      id: 'modern',
      name: '근현대사',
      icon: '🇰🇷',
      questions: [
        { id: 1, q: '강화도조약을 설명하시오.', a: '1876년, 불평등조약, 개항(부산·원산·인천)' },
        { id: 2, q: '갑신정변을 설명하시오.', a: '1884년, 급진개화파, 14개조 정강, 3일천하' },
        { id: 3, q: '동학농민운동을 설명하시오.', a: '1894년, 전봉준, 폐정개혁안, 일본군 개입' },
        { id: 4, q: '갑오개혁을 설명하시오.', a: '1894년, 신분제 폐지, 과거제 폐지, 근대화' },
        { id: 5, q: '대한제국을 설명하시오.', a: '1897년, 광무개혁, 양전·지계사업, 황제권 강화' },
        { id: 6, q: '항일의병운동을 설명하시오.', a: '을미·을사·정미의병, 13도창의군' },
        { id: 7, q: '3·1운동을 설명하시오.', a: '1919년, 독립선언, 비폭력, 대한민국임시정부 수립' },
        { id: 8, q: '무장독립운동을 설명하시오.', a: '봉오동·청산리, 한국광복군' },
        { id: 9, q: '8·15 광복과 분단을 설명하시오.', a: '1945년, 미소군정, 38도선 분단, 정부수립' },
        { id: 10, q: '6·25전쟁을 설명하시오.', a: '1950~53년, 유엔군 참전, 휴전협정' }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('civil7-history-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('civil7-history-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getTopicProgress = (topicId: string, questionCount: number) => {
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {
      if (completedQuestions[`${topicId}-${i}`]) completed++;
    }
    return completed;
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  const handleAskAI = (question: string) => {
    const prompt = `7급 공채 한국사 문제입니다:\n\n${question}\n\n상세하게 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/civil-service-7" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 7급 공채로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">🏛️ 한국사</h1>
          <p className="text-gray-600 mb-4">선사~현대사</p>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-slate-500 to-gray-600 h-4 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm font-medium text-gray-600">{totalCompleted} / {totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const progress = getTopicProgress(topic.id, topic.questions.length);
            const isExpanded = expandedTopics[topic.id];
            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-semibold text-gray-800">{topic.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{progress}/{topic.questions.length}</span>
                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-slate-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, q.id)} className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                              <p className="text-sm text-gray-600 bg-gray-100 p-2 rounded">{q.a}</p>
                              <button onClick={() => handleAskAI(q.q)} className="mt-2 text-sm text-slate-600 hover:text-slate-800 flex items-center gap-1">🤖 AI에게 자세히 물어보기</button>
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
                  <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                    <span className="text-2xl">💙</span>
                    <div className="text-left"><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
