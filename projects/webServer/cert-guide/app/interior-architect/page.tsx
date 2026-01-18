'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InteriorArchitectPage() {
  const [studyProgress, setStudyProgress] = useState(0);

  useEffect(() => {
    const subjects = [
      'interior-planning',
      'interior-environment',
      'interior-structure',
      'interior-materials',
      'practical'
    ];
    let total = 0;
    let completed = 0;

    subjects.forEach(subject => {
      const saved = localStorage.getItem(`interior-${subject}-progress`);
      if (saved) {
        const progress = JSON.parse(saved);
        completed += progress.length;
      }
      total += subject === 'practical' ? 25 : 50;
    });

    setStudyProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
  }, []);

  const examInfo = {
    title: '실내건축기사',
    description: '실내건축 설계 및 시공에 관한 전문 기술자격',
    overview: '실내건축기사는 건축물의 실내공간을 기능적, 심미적으로 계획하고 설계하는 전문 자격증입니다.',
    subjects: [
      { name: '실내디자인론', path: '/interior-architect/study/interior-planning', icon: '🎨' },
      { name: '실내환경', path: '/interior-architect/study/interior-environment', icon: '🌡️' },
      { name: '실내건축구조', path: '/interior-architect/study/interior-structure', icon: '🏗️' },
      { name: '건축재료', path: '/interior-architect/study/interior-materials', icon: '🧱' },
      { name: '실기시험', path: '/interior-architect/study/practical', icon: '✍️' }
    ],
    schedule: {
      written: {
        title: '필기시험',
        subjects: ['실내디자인론', '색채학', '인간공학', '실내환경', '실내건축구조', '건축재료'],
        time: '150분 (과목당 30분)',
        questions: '객관식 100문항 (과목당 20문항)',
        passing: '과목당 40점 이상, 전과목 평균 60점 이상'
      },
      practical: {
        title: '실기시험',
        type: '작업형',
        time: '5시간',
        content: '실내건축설계 및 시공도면 작성',
        passing: '60점 이상'
      }
    },
    tips: [
      '실내디자인의 기본 원리와 요소를 확실히 이해하세요',
      '색채학의 기초 이론과 배색 방법을 숙지하세요',
      '인간공학적 치수와 동선 계획을 암기하세요',
      '실내환경(열, 빛, 음)의 기준값을 정리하세요',
      '구조와 재료의 특성을 연계하여 학습하세요',
      '실기는 CAD 도면 작성 연습이 필수입니다'
    ],
    career: [
      '실내건축 설계사무소',
      '건설회사 인테리어 부서',
      '디자인 컨설팅 회사',
      '백화점/호텔 시설관리팀',
      '가구 및 인테리어 업체',
      '프리랜서 인테리어 디자이너'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-12">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <span className="mr-2">←</span> 홈으로 돌아가기
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">🏠 {examInfo.title}</h1>
              <p className="text-lg text-white/90 mb-4">{examInfo.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">국가기술자격</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">한국산업인력공단</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-white/80 text-sm mb-2">나의 학습 진행률</p>
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                    <circle
                      cx="64" cy="64" r="56"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${studyProgress * 3.52} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{studyProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-gray-500 text-sm">필기 과목</p>
            <p className="text-2xl font-bold text-purple-600">5과목</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-gray-500 text-sm">필기 문항</p>
            <p className="text-2xl font-bold text-pink-600">100문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-gray-500 text-sm">실기 유형</p>
            <p className="text-2xl font-bold text-purple-600">작업형</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <p className="text-gray-500 text-sm">합격 기준</p>
            <p className="text-2xl font-bold text-pink-600">60점</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 자격증 개요</h2>
              <p className="text-gray-600 leading-relaxed">{examInfo.overview}</p>
            </section>

            {/* Subjects */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {examInfo.subjects.map((subject, idx) => (
                  <Link
                    key={idx}
                    href={subject.path}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-colors"
                  >
                    <span className="text-3xl">{subject.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800">{subject.name}</p>
                      <p className="text-sm text-gray-500">학습하기 →</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/interior-architect/exam"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-lg hover:from-purple-600 hover:to-pink-500 transition-all shadow-md"
                >
                  📝 시험 상세 정보 보기 →
                </Link>
              </div>
            </section>

            {/* Study Tips */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 학습 전략</h2>
              <div className="space-y-3">
                {examInfo.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📅 시험 정보</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-medium text-purple-600">{examInfo.schedule.written.title}</p>
                  <p className="text-sm text-gray-600">{examInfo.schedule.written.time}</p>
                  <p className="text-sm text-gray-600">{examInfo.schedule.written.questions}</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <p className="font-medium text-pink-600">{examInfo.schedule.practical.title}</p>
                  <p className="text-sm text-gray-600">{examInfo.schedule.practical.type}</p>
                  <p className="text-sm text-gray-600">{examInfo.schedule.practical.time}</p>
                </div>
              </div>
            </div>

            {/* Career */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💼 취업 분야</h3>
              <div className="flex flex-wrap gap-2">
                {examInfo.career.map((job, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                    {job}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-400 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">🤖 AI 학습 도우미</h3>
              <p className="text-sm text-white/90 mb-4">
                어려운 개념이 있으시면 AI에게 질문해보세요!
              </p>
              <a
                href="https://claude.ai/new"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-white text-purple-600 rounded-lg text-center font-medium hover:bg-purple-50 transition-colors"
              >
                AI에게 질문하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
