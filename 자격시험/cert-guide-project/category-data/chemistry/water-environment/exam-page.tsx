'use client';
import Link from 'next/link';

export default function WaterEnvironmentExamPage() {
  const subjects = [
    { name: '수질오염개론', questions: 20, time: 30, topics: ['수질오염의 정의', '오염물질 특성', '수생태계', '자정작용'] },
    { name: '상하수도계획', questions: 20, time: 30, topics: ['상수도계획', '정수처리', '하수도계획', '관로설계'] },
    { name: '수질오염방지기술', questions: 20, time: 30, topics: ['물리적 처리', '화학적 처리', '생물학적 처리', '슬러지 처리'] },
    { name: '수질오염공정시험기준', questions: 20, time: 30, topics: ['시료채취', '일반항목', '유기물 분석', '중금속 분석'] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-sky-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-sky-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/water-environment" className="text-gray-600 hover:text-sky-600">수질환경기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-sky-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">📝 수질환경기사 시험정보</h1>
          <p className="text-white/80 mt-2">시험 구성 및 출제 기준 안내</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-bold text-gray-800">필기시험</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">80문항</p>
            <p className="text-sm text-gray-500">4과목 × 20문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-bold text-gray-800">시험시간</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">120분</p>
            <p className="text-sm text-gray-500">과목당 30분</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-bold text-gray-800">합격기준</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">60점</p>
            <p className="text-sm text-gray-500">과목당 40점 이상</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 출제 기준</h2>
        <div className="space-y-4 mb-8">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">{index + 1}. {subject.name}</h3>
                <span className="text-sm text-gray-500">{subject.questions}문항 / {subject.time}분</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subject.topics.map((topic, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{topic}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">시험 방식</h3>
              <p className="text-gray-600">필답형 (2시간 30분)</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">출제 범위</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• 수질오염 물질 분석 및 측정</li>
                <li>• 폐수처리시설 설계 계산</li>
                <li>• 상하수도 시설 계획</li>
                <li>• 수질관련 법규 적용</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💡 합격 전략</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-blue-700 mb-2">📖 수질오염개론</h3>
              <p className="text-gray-600">수질오염 지표(BOD, COD, SS 등)와 자정작용, 수생태계 이해가 핵심입니다.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-teal-700 mb-2">🚰 상하수도계획</h3>
              <p className="text-gray-600">정수처리 및 하수처리 공정, 관로 설계 계산이 중요합니다.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-700 mb-2">🏭 수질오염방지기술</h3>
              <p className="text-gray-600">물리·화학·생물학적 처리방법과 슬러지 처리가 핵심입니다.</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-purple-700 mb-2">🔬 공정시험기준</h3>
              <p className="text-gray-600">시료채취 방법과 각 항목별 분석법을 정확히 숙지해야 합니다.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/category/chemistry/water-environment" className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition">
            ← 수질환경기사 홈
          </Link>
          <Link href="/category/chemistry/water-environment/study/water-pollution-overview" className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium text-center hover:opacity-90 transition">
            학습 시작하기 →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
