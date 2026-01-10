'use client';

import Link from 'next/link';

export default function MainPage() {
  const certification = {
    id: 'gtq',
    name: 'GTQ(그래픽기술자격)',
    desc: '포토샵 자격증',
    icon: '🖼️',
    org: '한국생산성본부'
  };

  const subjects = [
    {
      id: 'photoshop-gtq',
      name: '포토샵 활용',
      topics: [
            {
              id: 'ps-tools',
              name: '도구 활용',
              href: '/category/design/gtq/study/ps-tools'
            },
            {
              id: 'ps-editing',
              name: '이미지 편집',
              href: '/category/design/gtq/study/ps-editing'
            },
            {
              id: 'ps-composite',
              name: '이미지 합성',
              href: '/category/design/gtq/study/ps-composite'
            },
      ]
    },
    {
      id: 'gtq-exam',
      name: '시험 유형',
      topics: [
            {
              id: 'gtq-practical',
              name: '실기 유형',
              href: '/category/design/gtq/study/gtq-practical'
            },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design" className="text-gray-600 hover:text-pink-600">디자인·문화</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">{certification.name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">{certification.icon}</span>
          <h1 className="text-3xl font-bold mb-2">{certification.name}</h1>
          <p className="text-pink-100 mb-2">{certification.desc}</p>
          <p className="text-pink-200 text-sm">시행기관: {certification.org}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link
            href={`/category/design/${certification.id}/exam`}
            className="flex-1 bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition border-2 border-pink-200"
          >
            <span className="text-2xl">📋</span>
            <p className="font-medium text-gray-800 mt-1">시험정보</p>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">{subject.name}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {subject.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={topic.href}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-pink-50 transition flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700">{topic.name}</span>
                    <span className="text-pink-500">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
