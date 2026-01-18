'use client';

import Link from 'next/link';

export default function SocialWorker2StudyIndexPage() {
  const subjects = [
    {
      id: 'social-welfare-intro',
      name: '사회복지개론',
      icon: '📚',
      description: '사회복지의 개념, 역사, 가치와 윤리',
      questionCount: 50,
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'human-behavior',
      name: '인간행동과 사회환경',
      icon: '🧠',
      description: '인간발달, 성격이론, 사회체계이론',
      questionCount: 50,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'social-welfare-practice',
      name: '사회복지실천론',
      icon: '🤝',
      description: '개입과정, 면접기술, 관계형성',
      questionCount: 50,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'community-welfare',
      name: '지역사회복지론',
      icon: '🏘️',
      description: '지역사회 조직화, 자원개발, 네트워크',
      questionCount: 50,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'social-welfare-law',
      name: '사회복지법제와 실천',
      icon: '⚖️',
      description: '사회복지 관련 법률 체계와 적용',
      questionCount: 50,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'field-practice',
      name: '현장실습 가이드',
      icon: '🏢',
      description: '실습 준비, 기관 선정, 실습일지 작성',
      questionCount: 25,
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link>
            <span>/</span>
            <Link href="/category/welfare/social-worker-2" className="hover:text-white">사회복지사 2급</Link>
            <span>/</span>
            <span className="text-white">학습하기</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">💝 사회복지사 2급 학습</h1>
          <p className="text-pink-100">과목별 핵심 개념을 학습하세요</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/welfare/social-worker-2/study/${subject.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-pink-300 transition-all group"
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {subject.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{subject.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{subject.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-pink-600 font-medium">{subject.questionCount}문항</span>
                <span className="text-gray-400 group-hover:text-pink-500 transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
