'use client';

import Link from 'next/link';

export default function WebDesignTechnicianPage() {
  const subjects = [
    { id: 'design-general', name: '디자인일반', icon: '🎨', desc: '디자인 기초이론', questions: 50 },
    { id: 'internet-general', name: '인터넷일반', icon: '🌐', desc: '웹 기술과 표준', questions: 50 },
    { id: 'web-graphic-design', name: '웹그래픽디자인', icon: '💻', desc: '웹 디자인 실무', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it" className="text-purple-700 hover:text-purple-900 flex items-center gap-2">
            ← IT 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center text-3xl">
              🌐
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">웹디자인기능사</h1>
              <p className="text-gray-600">웹 디자인 전문가</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-purple-600">필기과목</p>
              <p className="text-xl font-bold text-purple-800">3과목</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <p className="text-sm text-indigo-600">실기</p>
              <p className="text-xl font-bold text-indigo-800">작업형</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-600">필기시간</p>
              <p className="text-xl font-bold text-blue-800">60분</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-4 text-center">
              <p className="text-sm text-violet-600">합격기준</p>
              <p className="text-xl font-bold text-violet-800">60점</p>
            </div>
          </div>

          <Link
            href="/category/it/web-design-technician/exam"
            className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center rounded-xl font-medium hover:from-purple-700 hover:to-indigo-800 transition"
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
                href={`/category/it/web-design-technician/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-purple-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-purple-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• 디자인 원리와 색채이론 이해</li>
              <li>• HTML/CSS 기초 문법 학습</li>
              <li>• 웹 표준과 접근성 파악</li>
              <li>• 실기 코딩 연습 필수</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
