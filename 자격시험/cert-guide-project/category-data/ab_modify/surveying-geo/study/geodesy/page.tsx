'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GeodesyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('surveying-geodesy-progress');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (questionId: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem('surveying-geodesy-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    setCurrentPrompt(`측량및지형공간정보기사 측지학 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '지구 형상과 좌표계',
      questions: [
        '지오이드의 정의와 특성을 설명하시오.',
        '지구타원체의 정의와 요소를 설명하시오.',
        '준거타원체와 지심타원체를 비교하시오.',
        'GRS80과 WGS84를 비교하시오.',
        '베셀타원체와 세계측지계 관계를 설명하시오.',
        '측지좌표(경위도)와 직각좌표를 설명하시오.',
        '지심좌표계와 국지좌표계를 비교하시오.',
        '고도의 종류(정표고, 역학고, 타원체고)를 설명하시오.',
        '지오이드고 결정 방법을 설명하시오.',
        '수직선 편차를 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '지도투영법',
      questions: [
        '지도투영의 목적과 분류를 설명하시오.',
        '정각투영, 정적투영, 정거투영을 비교하시오.',
        '원통도법의 종류와 특성을 설명하시오.',
        '원추도법의 종류와 특성을 설명하시오.',
        '방위도법의 종류와 특성을 설명하시오.',
        'TM투영(횡메르카토르)을 설명하시오.',
        'UTM좌표계의 특성을 설명하시오.',
        '우리나라 국가좌표계를 설명하시오.',
        '축척계수와 중앙자오선을 설명하시오.',
        '좌표변환 공식을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: 'GNSS 원리',
      questions: [
        'GPS의 구성(우주부문, 제어부문, 사용자부문)을 설명하시오.',
        'GPS 신호(L1, L2, L5)의 특성을 설명하시오.',
        'C/A코드와 P코드를 비교하시오.',
        '의사거리 측정 원리를 설명하시오.',
        '반송파 위상 측정 원리를 설명하시오.',
        'GLONASS의 특성을 설명하시오.',
        'Galileo 시스템을 설명하시오.',
        'BeiDou 시스템을 설명하시오.',
        'GNSS 상호운용성을 설명하시오.',
        '다중주파수 활용의 장점을 설명하시오.'
      ]
    },
    {
      id: 4,
      title: 'GNSS 오차와 보정',
      questions: [
        '위성궤도 오차를 설명하시오.',
        '위성시계 오차를 설명하시오.',
        '전리층 오차와 보정법을 설명하시오.',
        '대류권 오차와 보정법을 설명하시오.',
        '다중경로 오차를 설명하시오.',
        '수신기 오차를 설명하시오.',
        'SA(선택적 가용성)를 설명하시오.',
        'DOP(정밀도 저하율)의 종류를 설명하시오.',
        '사이클슬립과 정수해 결정을 설명하시오.',
        '상대측위의 원리를 설명하시오.'
      ]
    },
    {
      id: 5,
      title: 'GNSS 측량',
      questions: [
        '정지측량(Static)을 설명하시오.',
        '신속정지측량(Rapid Static)을 설명하시오.',
        '이동측량(Kinematic)을 설명하시오.',
        'RTK 측량의 원리를 설명하시오.',
        '네트워크 RTK(VRS, FKP)를 설명하시오.',
        'PPP(정밀단독측위)를 설명하시오.',
        'DGPS의 원리를 설명하시오.',
        '기선해석 방법을 설명하시오.',
        '망조정 방법을 설명하시오.',
        'GNSS 측량성과 검증을 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/surveying-geo/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">측지학 및 위성측위</h1>
          <p className="text-white/90">측량및지형공간정보기사 필기 4과목</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.size} / {totalQuestions} 문제 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)} className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">{topic.id}</span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{topic.questions.filter((_, i) => completedQuestions.has(`${topic.id}-${i}`)).length}/{topic.questions.length}</span>
                  <span className={`transform transition-transform ${expandedTopic === topic.id ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedTopic === topic.id && (
                <div className="border-t p-4 space-y-3">
                  {topic.questions.map((question, idx) => {
                    const qId = `${topic.id}-${idx}`;
                    const isCompleted = completedQuestions.has(qId);
                    return (
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => saveProgress(qId)} className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button onClick={() => handleAILearn(question)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">AI에게 배우기</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <p className="text-sm text-gray-600 mb-4">학습할 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-orange-100 hover:bg-orange-200 rounded-lg text-center font-medium text-orange-700 transition-colors">Claude (Anthropic)</a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-green-100 hover:bg-green-200 rounded-lg text-center font-medium text-green-700 transition-colors">ChatGPT (OpenAI)</a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full p-3 bg-blue-100 hover:bg-blue-200 rounded-lg text-center font-medium text-blue-700 transition-colors">Gemini (Google)</a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="mt-4 w-full p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
