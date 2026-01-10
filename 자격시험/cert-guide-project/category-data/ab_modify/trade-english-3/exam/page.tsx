'use client';

import Link from 'next/link';

export default function TradeEnglish3ExamPage() {
  const examSections = [
    {
      title: '영문해석',
      questions: 20,
      time: '약 17분',
      icon: '📖',
      color: 'teal',
      topics: ['기초 무역 서신 해석', '간단한 영문 독해', '기본 용어 문맥 이해', '짧은 비즈니스 문장'],
    },
    {
      title: '영작문',
      questions: 20,
      time: '약 17분',
      icon: '✍️',
      color: 'cyan',
      topics: ['기초 서신 표현', '간단한 문장 작성', '인사말/마무리 표현', '기본 요청 표현'],
    },
    {
      title: '무역실무',
      questions: 20,
      time: '약 16분',
      icon: '📄',
      color: 'emerald',
      topics: ['기초 무역 용어', 'Incoterms 기본', '기본 무역 서류', '무역 절차 개요'],
    },
  ];

  const schedules = [
    { round: '제1회', apply: '1월 초', exam: '2월 중순', result: '3월 초' },
    { round: '제2회', apply: '4월 초', exam: '5월 중순', result: '6월 초' },
    { round: '제3회', apply: '7월 초', exam: '8월 중순', result: '9월 초' },
    { round: '제4회', apply: '10월 초', exam: '11월 중순', result: '12월 초' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-teal-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/trade-english-3" className="text-gray-600 hover:text-teal-600">무역영어 3급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">시험 정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 무역영어 3급 시험 정보</h1>
          <p className="text-gray-600">시험 구성, 일정, 합격 기준 안내</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-teal-600">60문항</p>
            <p className="text-gray-500 text-sm">총 문항 수</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-cyan-600">50분</p>
            <p className="text-gray-500 text-sm">시험 시간</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-emerald-600">60점</p>
            <p className="text-gray-500 text-sm">합격 기준</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600">객관식</p>
            <p className="text-gray-500 text-sm">출제 형태</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">📋 과목별 상세</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {examSections.map((section, index) => (
              <div key={index} className={`bg-${section.color}-50 rounded-xl p-5`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{section.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.questions}문항 · {section.time}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {section.topics.map((topic, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정 (연 4회)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left font-bold text-gray-700">회차</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-700">원서접수</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-700">시험일</th>
                  <th className="py-3 px-4 text-center font-bold text-gray-700">합격발표</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {schedules.map((schedule, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">{schedule.round}</td>
                    <td className="py-3 px-4 text-center">{schedule.apply}</td>
                    <td className="py-3 px-4 text-center">{schedule.exam}</td>
                    <td className="py-3 px-4 text-center">{schedule.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">* 정확한 일정은 대한상공회의소 홈페이지에서 확인하세요.</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">✅ 합격 기준</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-5">
              <h3 className="font-bold text-green-700 mb-3">합격 조건</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  총점 100점 만점 중 60점 이상
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  과목별 과락 없음 (40% 미만 없어야 함)
                </li>
              </ul>
            </div>
            <div className="bg-teal-50 rounded-xl p-5">
              <h3 className="font-bold text-teal-700 mb-3">배점 안내</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">•</span>
                  영문해석: 약 33점 (20문항)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">•</span>
                  영작문: 약 33점 (20문항)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-teal-500">•</span>
                  무역실무: 약 34점 (20문항)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💡 시험 준비 팁</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-bold text-gray-800">기초 용어 암기</h3>
                <p className="text-sm text-gray-600">FOB, CIF, L/C 등 기본 용어를 확실히 암기하세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-cyan-50 rounded-xl">
              <span className="text-2xl">✍️</span>
              <div>
                <h3 className="font-bold text-gray-800">기본 표현 익히기</h3>
                <p className="text-sm text-gray-600">비즈니스 서신의 기본 인사말과 마무리 표현을 학습하세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl">
              <span className="text-2xl">📖</span>
              <div>
                <h3 className="font-bold text-gray-800">짧은 문장부터</h3>
                <p className="text-sm text-gray-600">간단한 영문 해석부터 시작해 점차 난이도를 높이세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-bold text-gray-800">기출문제 풀이</h3>
                <p className="text-sm text-gray-600">기출문제를 통해 출제 패턴을 파악하세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏢 시험 접수 안내</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 mb-2">접수 방법</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 대한상공회의소 자격평가사업단 홈페이지</li>
                <li>• license.korcham.net</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-2">응시료</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 무역영어 3급: 20,000원</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/category/trade/trade-english-3" className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">← 무역영어 3급 메인</Link>
          <Link href="/category/trade/trade-english-3/study/basic-terms" className="flex-1 py-4 bg-teal-500 text-white rounded-xl font-medium text-center hover:bg-teal-600 transition">학습 시작하기 →</Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
