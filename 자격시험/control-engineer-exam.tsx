'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function WrittenExamContent() {
  const subjects = [
    {
      id: 'instrumentation',
      name: '계측기학',
      icon: '📊',
      color: 'from-purple-500 to-violet-500',
      questions: 20,
      topics: ['측정원리', '센서', '신호조절', '데이터 수집', '계측시스템'],
      studyLink: '/category/mechanical/control-engineer/study/instrumentation',
    },
    {
      id: 'control',
      name: '자동제어',
      icon: '🎛️',
      color: 'from-blue-500 to-indigo-500',
      questions: 20,
      topics: ['라플라스 변환', '전달함수', 'PID제어', '안정도', '상태공간'],
      studyLink: '/category/mechanical/control-engineer/study/control',
    },
    {
      id: 'electronics',
      name: '전자공학',
      icon: '💡',
      color: 'from-green-500 to-emerald-500',
      questions: 20,
      topics: ['회로이론', '반도체', 'OP앰프', '디지털논리', '신호처리'],
      studyLink: '/category/mechanical/control-engineer/study/electronics',
    },
    {
      id: 'process',
      name: '공업계측',
      icon: '🔬',
      color: 'from-orange-500 to-amber-500',
      questions: 20,
      topics: ['온도계측', '압력계측', '유량계측', '레벨계측', '분석계기'],
      studyLink: '/category/mechanical/control-engineer/study/process',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <h3 className="font-bold text-indigo-800 mb-2">📝 필기시험 안내</h3>
        <ul className="text-sm text-indigo-700 space-y-1">
          <li>• 시험시간: 2시간 (120분)</li>
          <li>• 문항수: 총 80문항 (과목당 20문항)</li>
          <li>• 합격기준: 전과목 평균 60점 이상, 과목당 40점 이상</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className={`bg-gradient-to-r ${subject.color} p-4`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{subject.name}</h3>
                    <p className="text-white/80 text-sm">{subject.questions}문항</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">주요 출제 범위</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {subject.topics.map((topic, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
              <Link
                href={subject.studyLink}
                className={`block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r ${subject.color} hover:opacity-90 transition`}
              >
                학습하기 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticalExamContent() {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-bold text-green-800 mb-2">🔧 실기시험 안내</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 시험시간: 약 4시간</li>
          <li>• 시험형태: 필답형 + 작업형</li>
          <li>• 합격기준: 60점 이상</li>
          <li>• 출제범위: 계측제어시스템 설계 및 운용</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
          <div className="flex items-center gap-3 text-white">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-bold text-lg">실기시험 (필답형 + 작업형)</h3>
              <p className="text-white/80 text-sm">계측제어시스템 설계 및 운용</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">주요 출제 범위</p>
              <div className="flex flex-wrap gap-1">
                {['PLC 프로그래밍', '계측기 교정', '제어회로 설계', '시퀀스 제어', '공정제어 튜닝', '계장도면 해석'].map((topic, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{topic}</span>
                ))}
              </div>
            </div>
            <Link
              href="/category/mechanical/control-engineer/study/practical"
              className="block w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 transition"
            >
              실기 학습하기 →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-gray-800 mb-4">💡 실기시험 합격 전략</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">🖥️</span>
            <div>
              <p className="font-medium text-gray-800">PLC 프로그래밍</p>
              <p className="text-sm text-gray-600">래더 다이어그램 작성 및 시뮬레이션 연습</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">📏</span>
            <div>
              <p className="font-medium text-gray-800">계측기 교정</p>
              <p className="text-sm text-gray-600">센서 교정 절차 및 오차 계산 숙지</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-xl">⚡</span>
            <div>
              <p className="font-medium text-gray-800">제어회로 설계</p>
              <p className="text-sm text-gray-600">시퀀스 다이어그램 및 타이밍 차트 작성</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'practical') setActiveTab('practical');
    else if (tab === 'written') setActiveTab('written');
  }, [searchParams]);

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔧 실기시험
          </button>
        </div>

        {activeTab === 'written' ? <WrittenExamContent /> : <PracticalExamContent />}
      </section>
    </>
  );
}

export default function ControlEngineerExamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-indigo-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical/control-engineer" className="text-gray-600 hover:text-indigo-600">제어계측기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">🎛️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">제어계측기사 시험정보</h1>
              <p className="text-blue-100">Engineer Control Instrumentation Examination</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-6">Loading...</div>}>
        <ExamPageContent />
      </Suspense>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
