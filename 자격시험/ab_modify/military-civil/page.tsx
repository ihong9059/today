'use client';

import Link from 'next/link';

export default function MilitaryCivilPage() {
  const subjects = [
    { id: 'korean', name: '국어', icon: '📝', desc: '문법, 어휘, 독해, 작문', questions: 50 },
    { id: 'history', name: '국사', icon: '🏛️', desc: '한국사 전 범위', questions: 50 },
    { id: 'admin-law', name: '행정법', icon: '⚖️', desc: '행정법총론, 행정작용, 행정구제', questions: 50 },
    { id: 'admin-science', name: '행정학', icon: '🏢', desc: '행정학 일반이론, 조직, 인사, 재무', questions: 50 },
    { id: 'social', name: '사회', icon: '🌍', desc: '법과 정치, 경제, 사회문화', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-green-700 hover:text-green-900 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">
              🎖️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">군무원</h1>
              <p className="text-gray-600">국방부 군무원 9급 공개경쟁채용</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-green-600">필수과목</p>
              <p className="text-xl font-bold text-green-800">3과목</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm text-emerald-600">선택과목</p>
              <p className="text-xl font-bold text-emerald-800">2과목</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-sm text-teal-600">총 문항</p>
              <p className="text-xl font-bold text-teal-800">100문항</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <p className="text-sm text-cyan-600">시험시간</p>
              <p className="text-xl font-bold text-cyan-800">100분</p>
            </div>
          </div>

          <Link
            href="/category/civil/military-civil/exam"
            className="block w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center rounded-xl font-medium hover:from-green-700 hover:to-emerald-800 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필수과목</h2>
          <div className="space-y-3">
            {subjects.slice(0, 3).map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/military-civil/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-green-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-green-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-green-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 선택과목 (2과목)</h2>
          <div className="space-y-3">
            {subjects.slice(3).map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/military-civil/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-green-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-green-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-green-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 국어, 국사, 행정법은 필수 - 철저히 대비</li>
              <li>• 행정직 기준 행정학, 사회 선택 많음</li>
              <li>• 국가직 9급과 유사하나 별도 시행</li>
              <li>• 군 특성상 국방 관련 시사 파악 유리</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
