'use client';

import Link from 'next/link';

export default function MainPage() {
  const certification = {
    id: 'civil-service-5',
    name: '5급 공채(행정고시)',
    desc: '사무관급 고위공무원 선발',
    icon: '🏛️',
    org: '인사혁신처'
  };

  const subjects = [
    {
      id: 'psat',
      name: 'PSAT(공직적격성평가)',
      topics: [
            {
              id: 'verbal',
              name: '언어논리',
              href: '/category/civil/civil-service-5/study/verbal'
            },
            {
              id: 'data',
              name: '자료해석',
              href: '/category/civil/civil-service-5/study/data'
            },
            {
              id: 'situation',
              name: '상황판단',
              href: '/category/civil/civil-service-5/study/situation'
            },
      ]
    },
    {
      id: 'essay',
      name: '논술',
      topics: [
            {
              id: 'policy-essay',
              name: '정책논술',
              href: '/category/civil/civil-service-5/study/policy-essay'
            },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-slate-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/civil" className="text-gray-600 hover:text-slate-600">공무원</Link>
            <span className="text-gray-300">›</span>
            <span className="text-slate-600 font-medium">{certification.name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-slate-500 to-gray-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">{certification.icon}</span>
          <h1 className="text-3xl font-bold mb-2">{certification.name}</h1>
          <p className="text-slate-100 mb-2">{certification.desc}</p>
          <p className="text-slate-200 text-sm">시행기관: {certification.org}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link
            href={`/category/civil/${certification.id}/exam`}
            className="flex-1 bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition border-2 border-slate-200"
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
                    className="p-4 bg-gray-50 rounded-lg hover:bg-slate-50 transition flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700">{topic.name}</span>
                    <span className="text-slate-500">→</span>
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
