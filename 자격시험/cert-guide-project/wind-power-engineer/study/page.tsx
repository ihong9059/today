'use client';

import Link from 'next/link';

export default function WindPowerStudyIndexPage() {
  const subjects = [
    {
      id: 'wind-turbine',
      name: '풍력발전시스템 이론',
      icon: '🌬️',
      description: '풍력 에너지 원리, 공기역학, 바람 자원 분석',
      questionCount: 50,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      id: 'power-systems',
      name: '전력계통 및 전기설비',
      icon: '⚡',
      description: '발전기, 전력변환장치, 계통연계, 보호시스템',
      questionCount: 50,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'design',
      name: '풍력발전설비 설계',
      icon: '📐',
      description: '터빈 선정, 타워/기초 설계, 전기설계, 단지배치',
      questionCount: 50,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'construction',
      name: '풍력발전설비 시공',
      icon: '🔧',
      description: '터빈 설치, 전기 시공, 시운전, 품질관리',
      questionCount: 50,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'standards',
      name: '전기설비기술기준 및 법규',
      icon: '📋',
      description: 'KEC, 신재생에너지법, 전기사업법, 안전관리법',
      questionCount: 50,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'practical',
      name: '실기시험',
      icon: '✍️',
      description: '설계도서, 측정시험, 발전량계산, 유지보수',
      questionCount: 25,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link>
            <span>/</span>
            <span className="text-white">학습하기</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🌪️ 풍력발전설비기사 학습</h1>
          <p className="text-cyan-100">과목별 핵심 문제를 풀어보세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/mechanical/wind-power-engineer/study/${subject.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-cyan-300 transition-all group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {subject.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{subject.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-cyan-600 font-medium">{subject.questionCount}문항</span>
                <span className="text-gray-400 group-hover:text-cyan-500 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
