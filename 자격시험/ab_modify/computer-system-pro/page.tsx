'use client';

import { useState } from 'react';

export default function ComputerSystemProPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'strategy'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-emerald-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">컴퓨터시스템응용기술사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-5xl">💻</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">컴퓨터시스템응용기술사</h1>
              <p className="text-emerald-100 mt-1">Professional Engineer Computer System Application</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/20 px-4 py-2 rounded-full">기술사 등급</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">시스템 아키텍처 전문</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">연 2회 시행</span>
          </div>
        </div>
      </section>

      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'overview' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>📋 시험 개요</button>
            <button onClick={() => setActiveTab('subjects')} className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'subjects' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>📚 출제 분야</button>
            <button onClick={() => setActiveTab('strategy')} className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'strategy' ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>🎯 합격 전략</button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <OverviewContent />}
        {activeTab === 'subjects' && <SubjectsContent />}
        {activeTab === 'strategy' && <StrategyContent />}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}

function OverviewContent() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격 개요</h2>
        <p className="text-gray-600 leading-relaxed">컴퓨터시스템응용기술사는 컴퓨터 시스템의 설계, 구축, 운영에 관한 고급 전문 지식을 갖춘 기술사 자격입니다. 시스템 아키텍처, 운영체제, 분산 시스템, 성능 최적화 등 컴퓨터 시스템 전반에 대한 심층적인 전문성을 인정받는 최고급 국가기술자격입니다.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">📝 필기시험</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시험 유형</span><span className="font-medium">단답형 + 서술형</span></div>
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시험 시간</span><span className="font-medium">4시간 (1,2교시 각 100분)</span></div>
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">합격 기준</span><span className="font-medium">100점 만점 60점 이상</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600">문제 구성</span><span className="font-medium">단답형 10문, 서술형 4문</span></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🎤 면접시험</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시험 유형</span><span className="font-medium">구술형 면접</span></div>
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">시험 시간</span><span className="font-medium">15~30분</span></div>
            <div className="flex justify-between py-2 border-b"><span className="text-gray-600">합격 기준</span><span className="font-medium">100점 만점 60점 이상</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600">평가 항목</span><span className="font-medium">기술, 경험, 품위</span></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">📅 시험 일정 (2026년)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-emerald-600 mb-2">제128회 (상반기)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 필기원서접수: 1.21 ~ 1.24</li>
              <li>• 필기시험: 2.8</li>
              <li>• 면접시험: 4월 중</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-teal-600 mb-2">제131회 (하반기)</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 필기원서접수: 6월 중</li>
              <li>• 필기시험: 7월 중</li>
              <li>• 면접시험: 10월 중</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href="/category/it/computer-system-pro/exam" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-bold">📝 시험 상세 보기 →</a>
      </div>
    </div>
  );
}

function SubjectsContent() {
  const subjects = [
    { name: '시스템 아키텍처', icon: '🏗️', topics: ['CPU 아키텍처', '메모리 시스템', '캐시 설계', 'I/O 시스템', '병렬 처리'], color: 'emerald', link: '/category/it/computer-system-pro/study/system-architecture' },
    { name: '운영체제/커널', icon: '⚙️', topics: ['프로세스 관리', '메모리 관리', '파일 시스템', '커널 구조', '시스템 콜'], color: 'teal', link: '/category/it/computer-system-pro/study/os-kernel' },
    { name: '분산 시스템', icon: '🌐', topics: ['분산 아키텍처', '합의 알고리즘', '분산 스토리지', '마이크로서비스', '컨테이너'], color: 'cyan', link: '/category/it/computer-system-pro/study/distributed-system' },
    { name: '성능 최적화', icon: '⚡', topics: ['성능 분석', '튜닝 기법', '벤치마킹', '모니터링', '용량 계획'], color: 'blue', link: '/category/it/computer-system-pro/study/performance' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 출제 분야</h2>
        <p className="text-gray-600">컴퓨터시스템응용기술사는 컴퓨터 시스템의 하드웨어와 소프트웨어 전반에 걸친 심층적인 지식을 평가합니다.</p>
      </div>
      {subjects.map((subject, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className={`bg-${subject.color}-500 text-white px-6 py-4 flex items-center gap-3`}>
            <span className="text-2xl">{subject.icon}</span>
            <span className="font-bold text-lg">{subject.name}</span>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {subject.topics.map((topic, tIdx) => (
                <span key={tIdx} className={`px-3 py-1 bg-${subject.color}-100 text-${subject.color}-700 rounded-full text-sm`}>{topic}</span>
              ))}
            </div>
            <a href={subject.link} className={`inline-flex items-center gap-2 px-4 py-2 bg-${subject.color}-100 text-${subject.color}-700 rounded-lg hover:bg-${subject.color}-200 transition`}>📖 학습하기 →</a>
          </div>
        </div>
      ))}
    </div>
  );
}

function StrategyContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-emerald-600 mb-3">📝 필기시험 전략</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• <strong>단답형:</strong> 정의→특징→장단점 구조로 간결하게</li>
              <li>• <strong>서술형:</strong> 서론-본론-결론, 도표 활용</li>
              <li>• 최신 기술 트렌드 반드시 숙지</li>
              <li>• 실무 경험과 연계한 답안 작성</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-teal-600 mb-3">🎤 면접시험 전략</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 필기 답안 복기 및 보완 준비</li>
              <li>• 프로젝트 경험 구체적 설명</li>
              <li>• 기술사로서의 비전 제시</li>
              <li>• 모르는 질문은 솔직히 인정</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">📖 추천 학습 순서</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg text-center"><div className="text-2xl mb-2">1️⃣</div><div className="font-medium text-sm">시스템 아키텍처 기초</div></div>
          <div className="bg-white p-4 rounded-lg text-center"><div className="text-2xl mb-2">2️⃣</div><div className="font-medium text-sm">운영체제/커널 심화</div></div>
          <div className="bg-white p-4 rounded-lg text-center"><div className="text-2xl mb-2">3️⃣</div><div className="font-medium text-sm">분산 시스템</div></div>
          <div className="bg-white p-4 rounded-lg text-center"><div className="text-2xl mb-2">4️⃣</div><div className="font-medium text-sm">성능 최적화</div></div>
        </div>
      </div>
      <div className="text-center">
        <a href="/category/it/computer-system-pro/study/practical" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-bold">🎯 실전 문제 풀기 →</a>
      </div>
    </div>
  );
}
