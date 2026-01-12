'use client';

import Link from 'next/link';

export default function FirefighterPage() {
  const subjects = [
    { id: 'fire-intro', name: '소방학개론', icon: '🔥', desc: '연소, 화재, 소화, 소방시설', questions: 50 },
    { id: 'fire-law', name: '소방관계법규', icon: '📋', desc: '소방기본법, 소방시설법, 위험물법', questions: 50 },
    { id: 'admin-law', name: '행정법총론', icon: '⚖️', desc: '행정법 일반이론, 행정작용, 행정구제', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">
              🚒
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">소방공무원</h1>
              <p className="text-gray-600">소방청 소방공무원 공개경쟁채용</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-sm text-red-600">필기과목</p>
              <p className="text-xl font-bold text-red-800">3과목</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-sm text-orange-600">총 문항</p>
              <p className="text-xl font-bold text-orange-800">75문항</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-sm text-amber-600">시험시간</p>
              <p className="text-xl font-bold text-amber-800">75분</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <p className="text-sm text-yellow-600">검정대체</p>
              <p className="text-xl font-bold text-yellow-800">영어·한국사</p>
            </div>
          </div>

          <Link
            href="/category/civil/firefighter/exam"
            className="block w-full py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white text-center rounded-xl font-medium hover:from-red-600 hover:to-orange-700 transition"
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
                href={`/category/civil/firefighter/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-red-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-red-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-red-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-red-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 검정시험 대체 과목</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌐</span>
                <h3 className="font-semibold text-blue-800">영어</h3>
              </div>
              <p className="text-sm text-blue-700">토익 625점, 텝스 280점, 지텔프 Level 2 50점 이상 등</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏛️</span>
                <h3 className="font-semibold text-rose-800">한국사</h3>
              </div>
              <p className="text-sm text-rose-700">한국사능력검정시험 3급 이상</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-xl">
            <h3 className="font-medium text-red-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• 소방학개론: 연소·화재 이론, 소방시설 구조 핵심</li>
              <li>• 소방관계법규: 소방기본법, 소방시설법 조문 암기</li>
              <li>• 행정법총론: 행정행위, 행정구제 중심 학습</li>
              <li>• 체력시험, 신체검사, 면접까지 대비 필요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
