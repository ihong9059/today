'use client';

import Link from 'next/link';

export default function PoliceOfficerPage() {
  const subjects = [
    { id: 'police-intro', name: '경찰학개론', icon: '👮', desc: '경찰행정, 범죄예방, 수사', questions: 50 },
    { id: 'criminal-law', name: '형사법', icon: '⚖️', desc: '형법총론·각론, 형사소송법', questions: 50 },
    { id: 'constitutional', name: '헌법', icon: '📜', desc: '헌법총론, 기본권, 통치구조', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl">
              👮
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">경찰공무원 (순경)</h1>
              <p className="text-gray-600">경찰청 순경 공개경쟁채용</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-600">필기과목</p>
              <p className="text-xl font-bold text-blue-800">3과목</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <p className="text-sm text-indigo-600">총 문항</p>
              <p className="text-xl font-bold text-indigo-800">120문항</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <p className="text-sm text-violet-600">시험시간</p>
              <p className="text-xl font-bold text-violet-800">120분</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600">검정대체</p>
              <p className="text-xl font-bold text-slate-800">영어·한국사</p>
            </div>
          </div>

          <Link
            href="/category/civil/police-officer/exam"
            className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
          <div className="space-y-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/police-officer/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-blue-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-blue-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 검정시험 대체 과목</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌐</span>
                <h3 className="font-semibold text-amber-800">영어</h3>
              </div>
              <p className="text-sm text-amber-700">토익 700점, 텝스 340점, 지텔프 Level 2 65점 이상 등</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏛️</span>
                <h3 className="font-semibold text-rose-800">한국사</h3>
              </div>
              <p className="text-sm text-rose-700">한국사능력검정시험 3급 이상</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 경찰학개론: 경찰 조직·활동, 범죄예방, 수사론 핵심</li>
              <li>• 형사법: 형법총론·각론 + 형사소송법 통합 출제</li>
              <li>• 헌법: 기본권, 통치구조 중심 학습</li>
              <li>• 체력검사, 적성검사, 면접까지 대비 필요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
