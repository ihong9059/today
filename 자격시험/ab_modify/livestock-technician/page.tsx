'use client';

import Link from 'next/link';

export default function LivestockTechnicianPage() {
  const subjects = [
    { id: 'animal-breeding', name: '가축육종학', icon: '🧬', desc: '유전과 개량 기초', questions: 50 },
    { id: 'reproduction', name: '가축번식생리학', icon: '🐄', desc: '번식과 생리 기초', questions: 50 },
    { id: 'nutrition', name: '가축영양학', icon: '🥗', desc: '영양소와 대사', questions: 50 },
    { id: 'feed-science', name: '사료학', icon: '🌾', desc: '사료의 종류와 이용', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/agriculture" className="text-green-700 hover:text-green-900 flex items-center gap-2">
            ← 농림·수산 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center text-3xl">
              🐄
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">축산산업기사</h1>
              <p className="text-gray-600">축산업 기술인력</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-green-600">필기과목</p>
              <p className="text-xl font-bold text-green-800">4과목</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm text-emerald-600">실기</p>
              <p className="text-xl font-bold text-emerald-800">필답형</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-sm text-teal-600">필기시간</p>
              <p className="text-xl font-bold text-teal-800">100분</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <p className="text-sm text-cyan-600">합격기준</p>
              <p className="text-xl font-bold text-cyan-800">60점</p>
            </div>
          </div>

          <Link
            href="/category/agriculture/livestock-technician/exam"
            className="block w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center rounded-xl font-medium hover:from-green-700 hover:to-emerald-800 transition"
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
                href={`/category/agriculture/livestock-technician/study/${subject.id}`}
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
              <li>• 축산기사보다 기초적인 내용 위주</li>
              <li>• 유전학과 번식생리 기초 이해</li>
              <li>• 영양소와 사료 기본 지식 학습</li>
              <li>• 실무 중심의 내용 파악</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
