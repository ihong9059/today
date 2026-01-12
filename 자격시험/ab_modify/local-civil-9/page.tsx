'use client';

import Link from 'next/link';

export default function LocalCivil9Page() {
  const requiredSubjects = [
    { id: 'korean', name: '국어', icon: '📝', desc: '문법, 어휘, 독해, 작문', questions: 50 },
    { id: 'english', name: '영어', icon: '🌐', desc: '어휘, 문법, 독해', questions: 50 },
    { id: 'history', name: '한국사', icon: '🏛️', desc: '선사~현대사', questions: 50 },
  ];

  const selectSubjects = [
    { id: 'local-admin', name: '지방자치론', icon: '🏘️', desc: '지방자치제도, 주민참여, 지방재정', questions: 50 },
    { id: 'social-welfare', name: '사회복지학개론', icon: '🤝', desc: '사회복지 정책, 실천, 제도', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl">
              🏘️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">지방직 9급</h1>
              <p className="text-gray-600">지방공무원 9급 공개경쟁임용시험</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-sm text-emerald-600">필수과목</p>
              <p className="text-xl font-bold text-emerald-800">3과목</p>
            </div>
            <div className="bg-teal-50 rounded-xl p-4 text-center">
              <p className="text-sm text-teal-600">선택과목</p>
              <p className="text-xl font-bold text-teal-800">2과목</p>
            </div>
            <div className="bg-cyan-50 rounded-xl p-4 text-center">
              <p className="text-sm text-cyan-600">총 문항</p>
              <p className="text-xl font-bold text-cyan-800">100문항</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-sm text-green-600">시험시간</p>
              <p className="text-xl font-bold text-green-800">100분</p>
            </div>
          </div>

          <Link
            href="/category/civil/local-civil-9/exam"
            className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필수과목</h2>
          <div className="space-y-3">
            {requiredSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/local-civil-9/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-emerald-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-emerald-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 선택과목 (2과목 선택)</h2>
          <div className="space-y-3">
            {selectSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/local-civil-9/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-emerald-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-emerald-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-emerald-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
            <h3 className="font-medium text-emerald-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• 국가직과 동일하게 국어·영어·한국사 필수</li>
              <li>• 지방자치 관련 과목이 주요 선택과목</li>
              <li>• 각 지자체별 선발 인원과 경쟁률 확인</li>
              <li>• 지역 특성을 고려한 면접 준비 필요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
