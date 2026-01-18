import Link from 'next/link';

export default function BigDataAnalystStudyPage() {
  const subjects = [
    {
      id: 'planning',
      name: '빅데이터 분석 기획',
      icon: '📋',
      description: '분석 과제 정의, 데이터 확보 계획, 거버넌스',
      questions: 50,
      difficulty: 2,
      color: 'cyan'
    },
    {
      id: 'exploration',
      name: '빅데이터 탐색',
      icon: '🔍',
      description: '데이터 전처리, EDA, 통계분석, 시각화',
      questions: 50,
      difficulty: 3,
      color: 'blue'
    },
    {
      id: 'modeling',
      name: '빅데이터 모델링',
      icon: '🤖',
      description: '머신러닝 알고리즘, 분류/회귀/군집화',
      questions: 50,
      difficulty: 4,
      color: 'indigo'
    },
    {
      id: 'interpretation',
      name: '빅데이터 결과 해석',
      icon: '📊',
      description: '모델 평가, 시각화, 분석 보고서',
      questions: 50,
      difficulty: 3,
      color: 'purple'
    },
    {
      id: 'practical',
      name: '실기 코딩 연습',
      icon: '💻',
      description: 'Python 코드, pandas, sklearn 실습',
      questions: 25,
      difficulty: 4,
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/big-data-analyst" className="text-gray-600 hover:text-blue-600">빅데이터분석기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">학습하기</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-2xl font-bold">빅데이터분석기사 학습하기</h1>
              <p className="text-cyan-100">과목별 핵심 문제 풀이 + AI 학습 도우미</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 과목 카드 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/it/big-data-analyst/study/${subject.id}`}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group"
            >
              <div className={`bg-gradient-to-r from-${subject.color}-500 to-${subject.color}-600 p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{subject.icon}</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={s <= subject.difficulty ? 'text-yellow-300' : 'text-white/30'}>★</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-lg font-bold mt-2">{subject.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{subject.questions}문항</span>
                  <span className="text-cyan-600 font-medium group-hover:translate-x-1 transition">
                    학습하기 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 학습 가이드 */}
        <section className="mt-12 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📖 학습 가이드</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">추천 학습 순서</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-gray-700">빅데이터 분석 기획 (암기 위주)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-gray-700">빅데이터 탐색 (pandas + 통계)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-gray-700">빅데이터 결과 해석 (평가지표)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-gray-700">빅데이터 모델링 (가장 어려움)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <span className="text-gray-700">실기 코딩 연습 (필기 후)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">AI 학습 도우미 활용법</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-500">🤖</span>
                  <span>각 문제의 AI 버튼을 클릭하면 상세 해설을 받을 수 있습니다.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-500">💡</span>
                  <span>이해가 안 되는 개념은 &ldquo;쉽게 설명해줘&rdquo;라고 추가 질문하세요.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-500">📝</span>
                  <span>코드 문제는 &ldquo;실행 결과 단계별로 보여줘&rdquo;라고 요청하세요.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-500">🔄</span>
                  <span>&ldquo;비슷한 문제 3개 더 만들어줘&rdquo;로 추가 연습하세요.</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
