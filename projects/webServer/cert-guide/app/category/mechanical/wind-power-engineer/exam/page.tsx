'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WindPowerEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const writtenSubjects = [
    {
      id: 1,
      name: '풍력발전시스템 이론',
      questions: 20,
      time: 30,
      description: '풍력 에너지 변환 원리, 공기역학, 바람 자원 분석',
      topics: [
        '베츠 한계와 풍력 에너지 변환',
        '블레이드 공기역학',
        '바람 장미와 풍황 분석',
        '바이블분포와 레일리분포',
        '풍력 밀도와 설비 이용률',
        '풍력터빈 제어 이론',
        '후류 효과와 배치 최적화'
      ],
      difficulty: '중상',
      icon: '🌬️',
      studyLink: '/category/mechanical/wind-power-engineer/study/wind-turbine'
    },
    {
      id: 2,
      name: '전력계통 및 전기설비',
      questions: 20,
      time: 30,
      description: '발전기, 전력변환장치, 계통연계, 보호시스템',
      topics: [
        '유도 발전기와 동기 발전기',
        'DFIG와 PMSG 시스템',
        '전력변환장치(컨버터/인버터)',
        '계통연계 기술기준',
        '전력품질과 고조파',
        '보호계전시스템',
        'LVRT/HVRT 기능'
      ],
      difficulty: '상',
      icon: '⚡',
      studyLink: '/category/mechanical/wind-power-engineer/study/power-systems'
    },
    {
      id: 3,
      name: '풍력발전설비 설계',
      questions: 20,
      time: 30,
      description: '터빈 선정, 타워/기초 설계, 전기설계, 단지 배치',
      topics: [
        '풍력터빈 클래스(IEC)',
        '타워 구조설계',
        '기초(중력식/파일/모노파일)',
        '전기설계(케이블/배전)',
        '단지 레이아웃 설계',
        '발전량 예측',
        '해상풍력 특수 설계'
      ],
      difficulty: '중상',
      icon: '📐',
      studyLink: '/category/mechanical/wind-power-engineer/study/design'
    },
    {
      id: 4,
      name: '풍력발전설비 시공',
      questions: 20,
      time: 30,
      description: '터빈 설치, 전기 시공, 시운전, 품질관리',
      topics: [
        '타워 및 나셀 설치',
        '로터 및 블레이드 설치',
        '전기배선 및 케이블 포설',
        '접지 및 피뢰시스템',
        '시운전 및 성능시험',
        '안전관리',
        '해상풍력 설치공법'
      ],
      difficulty: '중',
      icon: '🔧',
      studyLink: '/category/mechanical/wind-power-engineer/study/construction'
    },
    {
      id: 5,
      name: '전기설비기술기준 및 법규',
      questions: 20,
      time: 30,
      description: 'KEC, 신재생에너지법, 전기사업법, 안전관리법',
      topics: [
        '한국전기설비규정(KEC)',
        '신재생에너지법',
        '전기사업법',
        '전기안전관리법',
        '환경영향평가',
        '발전사업 인허가',
        'REC/RPS 제도'
      ],
      difficulty: '중',
      icon: '📋',
      studyLink: '/category/mechanical/wind-power-engineer/study/standards'
    }
  ];

  const practicalInfo = {
    title: '풍력발전설비 실무',
    type: '필답형 + 작업형',
    time: '약 4시간',
    passingScore: 60,
    sections: [
      {
        name: '설계도서 작성',
        weight: 30,
        description: '단선결선도, 배치도, 시방서 작성',
        tasks: ['단선결선도 작성', '배치도 및 케이블 루트', '기술시방서 작성', '물량산출서']
      },
      {
        name: '측정·시험',
        weight: 25,
        description: '풍속/풍향 측정, 전력품질 측정, 진동 분석',
        tasks: ['풍속·풍향 데이터 분석', '전력품질 측정', '진동·소음 측정', '절연저항 측정']
      },
      {
        name: '발전량 계산',
        weight: 20,
        description: '에너지 생산량 예측, 손실 계산',
        tasks: ['연간발전량 계산', '용량계수 산정', '손실 요인 분석', '경제성 분석']
      },
      {
        name: '고장진단·유지보수',
        weight: 15,
        description: '고장 원인 분석, 정비 절차',
        tasks: ['SCADA 데이터 분석', '고장 원인 진단', '예방정비 계획', '부품 교체 절차']
      },
      {
        name: '안전관리',
        weight: 10,
        description: '작업 안전, 비상 대응',
        tasks: ['고소작업 안전', '전기안전 관리', '비상정지 절차', '안전교육 계획']
      }
    ]
  };

  const examStrategies = [
    {
      title: '과목별 연계 학습',
      description: '시스템 이론 → 전력계통 → 설계 순서로 연계하여 학습',
      icon: '🔗'
    },
    {
      title: '계산 문제 집중',
      description: '발전량 계산, 용량 산정 문제는 공식 암기 필수',
      icon: '🔢'
    },
    {
      title: '최신 기술 동향',
      description: '해상풍력, 대형 터빈 등 최신 트렌드 파악',
      icon: '📈'
    },
    {
      title: '법규 암기',
      description: '신재생에너지법, KEC 관련 조항 정확히 암기',
      icon: '📝'
    }
  ];

  const timeManagement = {
    total: 150,
    perQuestion: 1.5,
    strategy: [
      { phase: '문제 파악', time: 10, description: '전체 문제 훑어보기' },
      { phase: '쉬운 문제', time: 60, description: '확실한 문제 먼저 해결' },
      { phase: '계산 문제', time: 50, description: '공식 적용 문제 풀이' },
      { phase: '어려운 문제', time: 20, description: '남은 문제 도전' },
      { phase: '검토', time: 10, description: '마킹 확인 및 검토' }
    ]
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link>
            <span>/</span>
            <span className="text-white">시험 정보</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🌪️ 풍력발전설비기사 시험 정보</h1>
          <p className="text-cyan-100">필기시험 5과목 100문항 / 실기시험 필답형+작업형</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'written'
                ? 'bg-cyan-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'practical'
                ? 'bg-cyan-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            ✍️ 실기시험
          </button>
        </div>

        {/* Written Exam Tab */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-sm text-gray-500">총 과목</div>
                <div className="text-2xl font-bold text-gray-900">5과목</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl mb-2">❓</div>
                <div className="text-sm text-gray-500">총 문항</div>
                <div className="text-2xl font-bold text-gray-900">100문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-sm text-gray-500">시험시간</div>
                <div className="text-2xl font-bold text-gray-900">2시간 30분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-sm text-gray-500">합격기준</div>
                <div className="text-2xl font-bold text-gray-900">평균 60점</div>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 과목별 상세 정보</h2>
              <div className="space-y-4">
                {writtenSubjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{subject.questions}문항 / {subject.time}분</div>
                        <div className={`text-sm font-medium ${
                          subject.difficulty === '상' ? 'text-red-500' :
                          subject.difficulty === '중상' ? 'text-orange-500' : 'text-green-500'
                        }`}>
                          난이도: {subject.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subject.topics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={subject.studyLink}
                        className="flex-1 text-center bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
                      >
                        {subject.name} 학습하기 →
                      </Link>
                      <button
                        onClick={() => openAIModal(`풍력발전설비기사 ${subject.name} 과목의 핵심 내용과 자주 출제되는 문제 유형을 알려주세요.`)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        🤖 AI 질문
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Strategies */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 합격 전략</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{strategy.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{strategy.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Management */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⏰ 시간 배분 전략</h2>
              <div className="mb-4 p-4 bg-cyan-50 rounded-xl">
                <div className="text-center">
                  <span className="text-3xl font-bold text-cyan-600">{timeManagement.total}분</span>
                  <span className="text-gray-600 ml-2">/ 문항당 평균 {timeManagement.perQuestion}분</span>
                </div>
              </div>
              <div className="space-y-3">
                {timeManagement.strategy.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-right">
                      <span className="font-bold text-cyan-600">{item.time}분</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg p-3">
                      <div className="font-medium text-gray-900">{item.phase}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Tab */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">✍️</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{practicalInfo.title}</h2>
                  <p className="text-gray-600">{practicalInfo.type} | {practicalInfo.time} | 합격기준: {practicalInfo.passingScore}점 이상</p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 실기시험 구성</h2>
              <div className="space-y-4">
                {practicalInfo.sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{section.name}</h3>
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                        배점: {section.weight}%
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{section.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {section.tasks.map((task, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Study Link */}
            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">📚 실기시험 대비 학습</h2>
              <p className="text-cyan-100 mb-6">실기시험 핵심 문제와 풀이를 학습하세요.</p>
              <Link
                href="/category/mechanical/wind-power-engineer/study/practical"
                className="inline-block bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors"
              >
                실기 문제 풀이 시작하기 →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700"
              >
                Claude에서 질문하기
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700"
              >
                ChatGPT에서 질문하기
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700"
              >
                Gemini에서 질문하기
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
