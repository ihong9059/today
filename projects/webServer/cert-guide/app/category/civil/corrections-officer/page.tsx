'use client';

import Link from 'next/link';

export default function CorrectionsOfficerPage() {
  const subjects = [
    { id: 'korean', name: '국어', icon: '📝', desc: '문법, 어휘, 독해, 작문', questions: 50 },
    { id: 'english', name: '영어', icon: '🌐', desc: '어휘, 문법, 독해', questions: 50 },
    { id: 'history', name: '한국사', icon: '🏛️', desc: '선사~현대사', questions: 50 },
    { id: 'correction-intro', name: '교정학개론', icon: '🔒', desc: '교정이론, 수용관리, 교정처우', questions: 50 },
    { id: 'criminal-procedure', name: '형사소송법', icon: '⚖️', desc: '수사, 공판, 증거, 상소', questions: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil" className="text-slate-600 hover:text-slate-800 flex items-center gap-2">
            ← 공무원 카테고리로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-zinc-700 rounded-2xl flex items-center justify-center text-3xl">
              🔐
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">교정직 공무원 (교도관)</h1>
              <p className="text-gray-600">법무부 교정직 9급 공개경쟁채용</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600">필수과목</p>
              <p className="text-xl font-bold text-slate-800">3과목</p>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 text-center">
              <p className="text-sm text-zinc-600">전문과목</p>
              <p className="text-xl font-bold text-zinc-800">2과목</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">총 문항</p>
              <p className="text-xl font-bold text-gray-800">100문항</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="text-sm text-stone-600">시험시간</p>
              <p className="text-xl font-bold text-stone-800">100분</p>
            </div>
          </div>

          <Link
            href="/category/civil/corrections-officer/exam"
            className="block w-full py-3 bg-gradient-to-r from-slate-600 to-zinc-700 text-white text-center rounded-xl font-medium hover:from-slate-700 hover:to-zinc-800 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 공통과목</h2>
          <div className="space-y-3">
            {subjects.slice(0, 3).map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/corrections-officer/study/${subject.id}`}
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 전문과목</h2>
          <div className="space-y-3">
            {subjects.slice(3).map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/corrections-officer/study/${subject.id}`}
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
              <li>• 교정학개론: 교정이론, 수용자 처우, 교정시설 운영</li>
              <li>• 형사소송법: 수사절차, 공판절차, 증거법 중점 학습</li>
              <li>• 공통과목(국·영·한)은 9급 수준 대비</li>
              <li>• 체력검정, 면접시험까지 종합 대비 필요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
