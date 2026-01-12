'use client';

import Link from 'next/link';

export default function CivilService5Page() {
  const psatSubjects = [
    { id: 'verbal', name: '언어논리', icon: '📖', desc: '논증분석, 비판적 독해, 추론', questions: 50 },
    { id: 'data', name: '자료해석', icon: '📊', desc: '통계분석, 수치추론, 자료비교', questions: 50 },
    { id: 'situation', name: '상황판단', icon: '🎯', desc: '법규적용, 상황추론, 의사결정', questions: 50 },
  ];

  const majorSubjects = [
    { id: 'constitutional', name: '헌법', icon: '⚖️', desc: '헌법총론, 기본권, 통치구조', questions: 50 },
    { id: 'admin-law', name: '행정법', icon: '📜', desc: '행정법총론, 행정구제, 행정조직', questions: 50 },
    { id: 'admin-science', name: '행정학', icon: '🏛️', desc: '행정이론, 조직론, 정책학', questions: 50 },
    { id: 'economics', name: '경제학', icon: '💹', desc: '미시경제, 거시경제, 재정학', questions: 50 },
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
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-2xl flex items-center justify-center text-3xl">
              🏆
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">5급 공채 (행정고시)</h1>
              <p className="text-gray-600">국가공무원 5급 공개경쟁채용시험</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4 text-center">
              <p className="text-sm text-slate-600">1차 PSAT</p>
              <p className="text-xl font-bold text-slate-800">120문항</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">2차 논술</p>
              <p className="text-xl font-bold text-gray-800">4과목</p>
            </div>
            <div className="bg-zinc-50 rounded-xl p-4 text-center">
              <p className="text-sm text-zinc-600">3차 면접</p>
              <p className="text-xl font-bold text-zinc-800">개별/집단</p>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 text-center">
              <p className="text-sm text-stone-600">난이도</p>
              <p className="text-xl font-bold text-stone-800">최상</p>
            </div>
          </div>

          <Link
            href="/category/civil/civil-service-5/exam"
            className="block w-full py-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white text-center rounded-xl font-medium hover:from-slate-700 hover:to-gray-800 transition"
          >
            📝 시험 상세 정보 보기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 1차 PSAT (공직적격성평가)</h2>
          <div className="space-y-3">
            {psatSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/civil-service-5/study/${subject.id}`}
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 2차 전공과목 (논술형)</h2>
          <div className="space-y-3">
            {majorSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/category/civil/civil-service-5/study/${subject.id}`}
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
              <li>• 1차 PSAT는 시간 관리가 핵심 (문항당 약 2분)</li>
              <li>• 2차 논술은 핵심 이론과 판례 숙지 필수</li>
              <li>• 최소 1~2년의 장기 준비가 필요한 시험</li>
              <li>• 기출문제 분석과 논술 연습이 합격의 열쇠</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
