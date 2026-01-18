'use client';

import Link from 'next/link';

export default function Secretary3Page() {
  const subjects = [
    { id: 'secretary-basic', name: '비서기초', icon: '📋', desc: '비서 개념, 역할, 자질, 윤리', questions: 50 },
    { id: 'office-manner', name: '사무매너', icon: '🎀', desc: '인사, 전화, 방문객 응대, 예절', questions: 50 },
    { id: 'practical', name: '실기', icon: '✍️', desc: '상황별 대처, 실무 처리', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/office" className="text-violet-600 hover:text-violet-800 flex items-center gap-2">
            ← 사무·경영 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">
              💼
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">비서 3급</h1>
              <p className="text-gray-600">비서 입문 자격증</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <p className="text-sm text-violet-600">필기</p>
              <p className="text-xl font-bold text-violet-800">40문항</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-600">시험 시간</p>
              <p className="text-xl font-bold text-purple-800">40분</p>
            </div>
            <div className="bg-fuchsia-50 rounded-xl p-4 text-center">
              <p className="text-sm text-fuchsia-600">합격 기준</p>
              <p className="text-xl font-bold text-fuchsia-800">60점</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 text-center">
              <p className="text-sm text-pink-600">난이도</p>
              <p className="text-xl font-bold text-pink-800">입문</p>
            </div>
          </div>

          <Link
            href="/category/office/secretary-3/exam"
            className="block w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-center rounded-xl font-medium hover:from-violet-600 hover:to-purple-600 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
          <div className="space-y-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/office/secretary-3/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-violet-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-violet-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-violet-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-violet-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-violet-50 rounded-xl">
            <h3 className="font-medium text-violet-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• 비서 3급은 비서 자격증의 입문 단계입니다</li>
              <li>• 기본적인 비서 개념과 사무매너를 학습하세요</li>
              <li>• 전화/방문객 응대가 핵심 주제입니다</li>
              <li>• 기출문제 유형이 반복되므로 집중 학습하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
