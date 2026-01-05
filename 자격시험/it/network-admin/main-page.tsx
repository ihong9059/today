'use client';

import Link from 'next/link';

export default function NetworkAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">네트워크관리사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🌐</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">네트워크관리사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가공인민간자격</span>
              </div>
              <p className="text-blue-100 text-lg mb-4">Network Administrator</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: 1급 ★★★★☆ / 2급 ★★★☆☆</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 5만명+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 1급 30% / 2급 45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/category/it/network-admin/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-blue-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">4과목 80문항</p>
            <p className="text-xs text-gray-400">1시간 40분</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">상세보기 →</p>
          </Link>
          <Link href="/category/it/network-admin/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-blue-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">작업형</p>
            <p className="text-xs text-gray-400">1시간 30분</p>
            <p className="text-xs text-blue-500 mt-2 font-medium">상세보기 →</p>
          </Link>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 25,000원</p>
            <p className="text-xs text-gray-400">실기 30,000원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">한국정보통신자격협회</p>
            <p className="text-xs text-gray-400">ICQA</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                네트워크관리사는 네트워크 장비의 설치·운용·관리와 네트워크 보안·트래픽 관리 등
                네트워크 시스템 전반에 대한 전문 지식과 기술을 갖춘 IT 전문가를 인증하는
                국가공인 민간자격증입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 네트워크 설계 및 구축</li>
                    <li>• 라우터, 스위치 등 장비 관리</li>
                    <li>• 네트워크 보안 관리</li>
                    <li>• 서버 및 트래픽 관리</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 네트워크/시스템 엔지니어</li>
                    <li>• IT 서비스 기업</li>
                    <li>• 공공기관 전산실</li>
                    <li>• 금융기관 IT부서</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'TCP/IP', difficulty: 4, tip: 'IP주소, 서브넷, 라우팅 핵심' },
                  { name: '네트워크 일반', difficulty: 3, tip: 'OSI 7계층, 프로토콜 이해 필수' },
                  { name: 'NOS (네트워크 운영체제)', difficulty: 3, tip: 'Windows Server, Linux 기초' },
                  { name: '네트워크 운용기기', difficulty: 3, tip: '라우터, 스위치, 방화벽 설정' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{subject.name}</span>
                        <span className="text-xs text-gray-400">(20문항)</span>
                      </div>
                      <p className="text-sm text-gray-500">{subject.tip}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 합격 기준:</strong> 과목당 40점 이상 + 전체 평균 60점 이상
                </p>
              </div>
            </section>

            {/* 실기시험 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">✍️</span> 실기시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">네트워크 구축 및 운용</span>
                  <span className="text-sm text-gray-500">(작업형)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: 'Windows Server', ratio: '약 40%', desc: 'AD, DNS, DHCP 설정' },
                  { name: 'Linux Server', ratio: '약 30%', desc: '기본 명령어, 서비스 설정' },
                  { name: '네트워크 장비', ratio: '약 20%', desc: '라우터, 스위치 설정' },
                  { name: '케이블 제작', ratio: '약 10%', desc: 'UTP 케이블 크림핑' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-blue-600 font-bold">{item.ratio}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상
                </p>
              </div>
            </section>

            {/* 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-blue-200 rounded-xl p-4">
                  <h3 className="font-bold text-blue-600 mb-3">👨‍🎓 비전공자 (3개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '네트워크 기초 이론', period: '3주', note: '필수!' },
                      { step: 2, name: 'TCP/IP', period: '4주', note: '핵심' },
                      { step: 3, name: 'NOS (서버)', period: '3주', note: '' },
                      { step: 4, name: '네트워크 장비', period: '2주', note: '' },
                      { step: 5, name: '실기 실습', period: '3주', note: '반복!' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-600 mb-3">👨‍💼 전공자 (1.5개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: 'TCP/IP + 네트워크 일반', period: '2주', note: '복습' },
                      { step: 2, name: 'NOS + 장비', period: '2주', note: '심화' },
                      { step: 3, name: '기출문제 풀이', period: '1주', note: '마무리' },
                      { step: 4, name: '실기 실습', period: '1주', note: '집중' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700 text-center">
                  <strong>📖 공부 비율:</strong> 이론 40% : 실습 60% → <strong>실기 실습 환경 구축 필수!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-purple-100 mb-4">Claude AI에게 네트워크관리사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">개념 질문</p>
                  <p className="text-white">&quot;OSI 7계층과 TCP/IP 4계층의 차이점을 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">문제 풀이</p>
                  <p className="text-white">&quot;서브넷 마스크 계산 문제 3개 만들어줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-purple-200 mb-1">실기 도움</p>
                  <p className="text-white">&quot;Windows Server에서 DHCP 설정하는 방법 알려줘&quot;</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                AI에게 질문하기 →
              </button>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '1회', written: '3월 중', practical: '4월 중' },
                  { round: '2회', written: '6월 중', practical: '7월 중' },
                  { round: '3회', written: '9월 중', practical: '10월 중' },
                  { round: '4회', written: '11월 중', practical: '12월 중' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-blue-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">필기: {item.written} / 실기: {item.practical}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.icqa.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-blue-600 hover:underline">
                ICQA에서 접수하기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'TCP/IP', target: 70, color: 'bg-blue-500' },
                  { name: '네트워크 일반', target: 75, color: 'bg-indigo-500' },
                  { name: 'NOS', target: 65, color: 'bg-purple-500' },
                  { name: '네트워크 운용기기', target: 70, color: 'bg-cyan-500' },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-bold text-gray-800">{item.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{width: `${item.target}%`}}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">평균</p>
                <p className="text-2xl font-bold text-blue-600">70점</p>
                <p className="text-xs text-gray-500">= 여유롭게 합격!</p>
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '네트워크관리사 1급', desc: '상위 자격증' },
                  { name: '정보처리기사', desc: 'IT 대표 자격증' },
                  { name: '정보보안기사', desc: '보안 분야 확장' },
                  { name: 'CCNA/CCNP', desc: 'Cisco 국제 자격증' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📖</span> 추천 교재/인강
              </h3>
              <div className="space-y-3">
                <a href="https://www.yes24.com" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-blue-400 transition">
                  <p className="font-medium text-gray-800">이기적 네트워크관리사</p>
                  <p className="text-xs text-gray-500">베스트셀러 기본서</p>
                </a>
                <a href="https://www.inflearn.com" target="_blank" rel="noopener noreferrer"
                  className="block p-3 border rounded-lg hover:border-blue-400 transition">
                  <p className="font-medium text-gray-800">인프런 네트워크 강의</p>
                  <p className="text-xs text-gray-500">온라인 학습</p>
                </a>
              </div>
            </div>

            {/* 급수별 비교 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">📊</span> 1급 vs 2급 비교
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-700">2급 (입문)</p>
                  <p className="text-xs text-gray-600 mt-1">네트워크 기초 지식 검증</p>
                  <p className="text-xs text-gray-500">취업 준비생, 학생 추천</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <p className="font-medium text-indigo-700">1급 (전문)</p>
                  <p className="text-xs text-gray-600 mt-1">실무 수준 네트워크 관리 능력</p>
                  <p className="text-xs text-gray-500">경력자, 실무 전문가 추천</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 ICQA에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
