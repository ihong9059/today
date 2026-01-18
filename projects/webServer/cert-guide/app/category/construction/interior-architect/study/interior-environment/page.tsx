'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InteriorEnvironmentStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('interior-environment-progress');
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
    localStorage.setItem('interior-environment-progress', JSON.stringify([...newCompleted]));
  };

  const handleAILearn = (question: string) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCurrentPrompt(`실내건축기사 실내환경 문제입니다. 자세히 설명해주세요:\n\n${question}`);
    setShowAIModal(true);
  };

  const topics = [
    {
      id: 1,
      title: '공간데이터 모델',
      questions: [
        'GIS의 정의와 구성요소를 설명하시오.',
        '벡터 데이터 모델의 특징을 설명하시오.',
        '래스터 데이터 모델의 특징을 설명하시오.',
        '벡터와 래스터의 장단점을 비교하시오.',
        '위상관계(Topology)의 개념을 설명하시오.',
        '공간객체의 유형(점, 선, 면)을 설명하시오.',
        'TIN(삼각망) 모델을 설명하시오.',
        'DEM(수치표고모형)을 설명하시오.',
        '공간데이터의 품질 요소를 설명하시오.',
        '메타데이터의 개념과 중요성을 설명하시오.'
      ]
    },
    {
      id: 2,
      title: '공간분석',
      questions: [
        '버퍼분석의 개념과 활용을 설명하시오.',
        '오버레이분석의 종류를 설명하시오.',
        '네트워크분석의 적용 사례를 설명하시오.',
        '최적경로분석 방법을 설명하시오.',
        '가시권분석을 설명하시오.',
        '근린분석(Proximity Analysis)을 설명하시오.',
        '지형분석(경사, 향)을 설명하시오.',
        '수계분석(유역, 하천망)을 설명하시오.',
        '적지분석 방법을 설명하시오.',
        '공간통계분석을 설명하시오.'
      ]
    },
    {
      id: 3,
      title: '데이터베이스',
      questions: [
        '공간데이터베이스의 개념을 설명하시오.',
        '관계형 데이터베이스(RDBMS)를 설명하시오.',
        '공간쿼리(Spatial Query)를 설명하시오.',
        'SQL의 기본 문법을 설명하시오.',
        '공간인덱싱 방법을 설명하시오.',
        'R-tree 인덱스를 설명하시오.',
        '데이터 정규화를 설명하시오.',
        '분산 데이터베이스를 설명하시오.',
        'NoSQL 공간데이터베이스를 설명하시오.',
        '빅데이터와 GIS의 연계를 설명하시오.'
      ]
    },
    {
      id: 4,
      title: '좌표계와 투영법',
      questions: [
        '지리좌표계와 투영좌표계를 비교하시오.',
        '경위도좌표계를 설명하시오.',
        'UTM 좌표계를 설명하시오.',
        'TM(횡메르카토르) 투영법을 설명하시오.',
        '우리나라 평면직각좌표계를 설명하시오.',
        '좌표변환 방법을 설명하시오.',
        '투영 왜곡의 종류를 설명하시오.',
        '정적, 정거, 정각 투영을 비교하시오.',
        'WGS84와 GRS80을 비교하시오.',
        '베셀타원체와 세계측지계를 설명하시오.'
      ]
    },
    {
      id: 5,
      title: 'GIS 응용',
      questions: [
        '토지정보시스템(LIS)을 설명하시오.',
        '도시정보시스템(UIS)을 설명하시오.',
        '환경정보시스템(EIS)을 설명하시오.',
        '시설물관리시스템(FMS)을 설명하시오.',
        'Web GIS의 개념과 기술을 설명하시오.',
        '3차원 GIS를 설명하시오.',
        '공간정보 오픈플랫폼을 설명하시오.',
        '모바일 GIS를 설명하시오.',
        'IoT와 GIS 융합을 설명하시오.',
        '디지털트윈과 GIS를 설명하시오.'
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.size / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/construction/interior-architect/exam" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <span className="mr-2">←</span> 시험 정보로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">실내환경</h1>
          <p className="text-white/90">측량및지형공간정보기사 필기 2과목</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-purple-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.size} / {totalQuestions} 문제 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)} className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">{topic.id}</span>
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
                      <div key={idx} className={`p-3 rounded-lg border ${isCompleted ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => saveProgress(qId)} className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${isCompleted ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}>{isCompleted && '✓'}</button>
                          <div className="flex-1">
                            <p className="text-gray-700">{idx + 1}. {question}</p>
                            <button onClick={() => handleAILearn(question)} className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">AI에게 배우기</button>
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

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
