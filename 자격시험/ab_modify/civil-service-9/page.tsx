'use client';

import Link from 'next/link';

export default function CivilService9Page() {
  const requiredSubjects = [
    { id: 'korean', name: '국어', icon: '📝', desc: '문법, 어휘, 독해, 작문', questions: 50 },
    { id: 'english', name: '영어', icon: '🌐', desc: '어휘, 문법, 독해', questions: 50 },
    { id: 'history', name: '한국사', icon: '🏛️', desc: '선사~현대사', questions: 50 },
  ];

  const selectSubjects = [
    { id: 'admin-intro', name: '행정학개론', icon: '🏢', desc: '행정이론, 조직론, 정책학 기초', questions: 50 },
    { id: 'social', name: '사회', icon: '👥', desc: '정치, 경제, 법, 사회문화', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl flex items-center justify-center text-3xl">
              📋
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">9급 공채</h1>
              <p className="text-gray-600">국가공무원 9급 공개경쟁채용시험</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600">필수과목</p>
              <p className="text-xl font-bold text-slate-800">3과목</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">선택과목</p>
              <p className="text-xl font-bold text-gray-800">2과목</p>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 text-center">
              <p className="text-sm text-zinc-600">총 문항</p>
              <p className="text-xl font-bold text-zinc-800">100문항</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="text-sm text-stone-600">시험시간</p>
              <p className="text-xl font-bold text-stone-800">100분</p>
            </div>
          </div>

          <Link
            href="/category/civil/civil-service-9/exam"
            className="block w-full py-3 bg-gradient-to-r from-slate-500 to-gray-600 text-white text-center rounded-xl font-medium hover:from-slate-600 hover:to-gray-700 transition"
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
                href={`/category/civil/civil-service-9/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-slate-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-slate-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-slate-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-slate-500">→</span>
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
                href={`/category/civil/civil-service-9/study/${subject.id}`}
                className="block p-4 bg-gray-50 hover:bg-slate-50 rounded-xl transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-slate-700">{subject.name}</h3>
                      <p className="text-sm text-gray-500">{subject.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-slate-600">{subject.questions}문제</span>
                    <span className="ml-2 text-gray-400 group-hover:text-slate-500">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <h3 className="font-medium text-slate-800 mb-2">💡 학습 가이드</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• 국어·영어·한국사는 필수, 선택 2과목과 합산</li>
              <li>• 과목당 20문항, 과락 40점 이상 필요</li>
              <li>• 기출문제 반복 학습이 핵심 전략</li>
              <li>• 선택과목은 자신에게 유리한 과목 선택</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
