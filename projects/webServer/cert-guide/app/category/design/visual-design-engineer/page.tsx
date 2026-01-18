'use client';

import Link from 'next/link';

export default function VisualDesignEngineerPage() {
  const subjects = [
    { id: 'visual-design-theory', name: '시각디자인론', icon: '👁️', desc: '시각디자인 이론과 원리', questions: 50 },
    { id: 'color-science', name: '색채학', icon: '🌈', desc: '색채이론과 배색', questions: 50 },
    { id: 'typography', name: '타이포그래피', icon: '✏️', desc: '문자디자인과 편집', questions: 50 },
    { id: 'advertising', name: '광고학', icon: '📢', desc: '광고기획과 전략', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/design" className="text-pink-700 hover:text-pink-900 flex items-center gap-2">
            ← 디자인 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-3xl">
              🎨
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">시각디자인기사</h1>
              <p className="text-gray-600">시각매체 디자인 전문가</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-pink-50 rounded-xl p-4 text-center">
              <p className="text-sm text-pink-600">필기과목</p>
              <p className="text-xl font-bold text-pink-800">4과목</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-4 text-center">
              <p className="text-sm text-rose-600">실기</p>
              <p className="text-xl font-bold text-rose-800">작업형</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-sm text-red-600">필기시간</p>
              <p className="text-xl font-bold text-red-800">150분</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-sm text-orange-600">합격기준</p>
              <p className="text-xl font-bold text-orange-800">60점</p>
            </div>
          </div>

          <Link
            href="/category/design/visual-design-engineer/exam"
            className="block w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-center rounded-xl font-medium hover:from-pink-600 hover:to-rose-700 transition"
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
                href={`/category/design/visual-design-engineer/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-pink-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-pink-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-pink-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-pink-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-pink-50 rounded-xl">
            <h3 className="font-medium text-pink-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• 시각디자인 이론과 역사 이해</li>
              <li>• 색채학 원리와 배색 방법 파악</li>
              <li>• 타이포그래피와 레이아웃 학습</li>
              <li>• 광고 기획과 마케팅 전략 숙지</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
