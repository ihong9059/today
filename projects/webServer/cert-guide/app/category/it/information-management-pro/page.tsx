"use client";
import { useState } from "react";
export default function InformationManagementProPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const aiQuestions = [
    { text: "정보관리기술사 합격 전략", prompt: "정보관리기술사 시험 합격 전략을 알려주세요." },
    { text: "논문 작성 가이드", prompt: "정보관리기술사 논문 작성법을 설명해주세요." },
    { text: "면접 준비 팁", prompt: "정보관리기술사 면접 준비 방법을 알려주세요." }
  ];

  const openAIModal = (prompt: string) => { setCurrentPrompt(prompt); setShowAIModal(true); };

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
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-orange-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">정보관리기술사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🏛️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">정보관리기술사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-orange-100 text-lg mb-4">Professional Engineer Information Management</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★★</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 3,000명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 15% / 실기 30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/it/information-management-pro/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">단답형 + 서술형</p>
            <p className="text-xs text-gray-400">4시간</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/it/information-management-pro/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">🎤</span>
            <p className="text-gray-500 text-sm mt-2">실기</p>
            <p className="font-bold text-gray-800">구술형 면접</p>
            <p className="text-xs text-gray-400">30분 내외</p>
            <p className="text-xs text-orange-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 67,800원</p>
            <p className="text-xs text-gray-400">실기 87,100원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">한국산업인력공단</p>
            <p className="text-xs text-gray-400">Q-Net</p>
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
                <span className="text-orange-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                정보관리기술사는 정보시스템의 기획, 구축, 운영 전반에 걸친 고급 기술역량을 갖춘 최고 수준의 IT 전문가입니다.
                기업의 정보화 전략 수립, IT 거버넌스 체계 구축, 대규모 프로젝트 관리 등 IT 분야의 핵심 의사결정에 참여합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 정보화전략계획(ISP) 수립</li>
                    <li>• 엔터프라이즈 아키텍처(EA) 구축</li>
                    <li>• IT 거버넌스 체계 설계</li>
                    <li>• 대규모 SI 프로젝트 총괄</li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">활동 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 공공기관 CIO/정보화책임관</li>
                    <li>• 대기업 IT 전략 컨설턴트</li>
                    <li>• 기술심의위원/평가위원</li>
                    <li>• IT 감리/컨설팅 법인 대표</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 필기시험 출제 범위
              </h2>
              <div className="space-y-3">
                {[
                  { name: '정보전략계획(ISP/EA)', difficulty: 5, tip: 'ISP 수립방법론, EA 프레임워크, 정보화계획' },
                  { name: 'IT 거버넌스', difficulty: 4, tip: 'COBIT 2019, ITIL 4, ISO 27001, IT 성과관리' },
                  { name: '프로젝트관리', difficulty: 4, tip: 'PMBOK 7th, 애자일/스크럼, 리스크관리' },
                  { name: '데이터관리', difficulty: 4, tip: '데이터거버넌스, MDM, 데이터품질관리' },
                  { name: '디지털전환(DX)', difficulty: 5, tip: 'AI/ML, 클라우드, 빅데이터, IoT 융합' },
                ].map((subject, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{subject.name}</span>
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
                  <strong>💡 합격 기준:</strong> 100점 만점 60점 이상 (과목별 과락 없음)
                </p>
              </div>
            </section>

            {/* 실기시험 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🎤</span> 실기시험 (구술면접)
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">면접 형식</span>
                  <span className="text-sm text-gray-500">(구술형 - 약 30분)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '프로젝트 경험', ratio: '40%', desc: '대규모 정보화 프로젝트 수행 경험' },
                  { name: '전문지식', ratio: '30%', desc: 'ISP/EA, IT거버넌스, 신기술 동향' },
                  { name: '문제해결', ratio: '20%', desc: '현장 이슈 대응, 의사결정 능력' },
                  { name: '기술사 자질', ratio: '10%', desc: '윤리의식, 리더십, 커뮤니케이션' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-orange-600 font-bold">{item.ratio}</span>
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
                <span className="text-orange-500">🎯</span> 추천 학습 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-orange-200 rounded-xl p-4">
                  <h3 className="font-bold text-orange-600 mb-3">📚 필기 준비 (6개월~1년)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '기출문제 분석', period: '1개월', note: '출제경향' },
                      { step: 2, name: 'ISP/EA 심화', period: '2개월', note: '핵심' },
                      { step: 3, name: 'IT거버넌스', period: '1개월', note: 'COBIT/ITIL' },
                      { step: 4, name: 'PM/데이터관리', period: '1개월', note: 'PMBOK' },
                      { step: 5, name: '모의답안 작성', period: '1개월', note: '실전' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.step}
                        </div>
                        <span className="flex-1 text-sm">{item.name}</span>
                        <span className="text-xs text-gray-400">{item.period}</span>
                        {item.note && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">{item.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-4">
                  <h3 className="font-bold text-green-600 mb-3">🎤 면접 준비 (3개월)</h3>
                  <div className="space-y-2">
                    {[
                      { step: 1, name: '경력정리 및 기술서 작성', period: '2주', note: '포트폴리오' },
                      { step: 2, name: '프로젝트 경험 정리', period: '2주', note: '성과중심' },
                      { step: 3, name: '예상질문 답변 준비', period: '1개월', note: '심화' },
                      { step: 4, name: '모의면접 연습', period: '1개월', note: '스터디' },
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
                  <strong>📖 학습 핵심:</strong> 이론 40% : 기출분석 30% : 답안작성 30% → <strong>서술력이 합격을 좌우!</strong>
                </p>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-orange-100 mb-4">Claude AI에게 정보관리기술사 관련 질문을 해보세요!</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-orange-200 mb-1">ISP 방법론</p>
                  <p className="text-white">&quot;ISP 수립 방법론의 단계별 프로세스와 주요 산출물을 설명해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-orange-200 mb-1">IT 거버넌스</p>
                  <p className="text-white">&quot;COBIT 2019의 핵심 원칙과 거버넌스 목표를 정리해줘&quot;</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm text-orange-200 mb-1">면접 대비</p>
                  <p className="text-white">&quot;정보관리기술사 면접에서 자주 나오는 질문 10개와 모범답안 알려줘&quot;</p>
                </div>
              </div>
              <button onClick={() => openAIModal("정보관리기술사 합격 전략과 효과적인 학습 방법을 알려주세요.")} className="mt-4 w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
                AI에게 질문하기 →
              </button>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📅</span> 2026년 시험일정
              </h3>
              <div className="space-y-4">
                {[
                  { round: '제128회', written: '2.8', practical: '4월 중' },
                  { round: '제131회', written: '5.10', practical: '7월 중' },
                  { round: '제134회', written: '8.9', practical: '10월 중' },
                ].map((item) => (
                  <div key={item.round} className="border-l-4 border-orange-400 pl-3">
                    <p className="font-medium text-gray-800">{item.round}</p>
                    <p className="text-sm text-gray-500">필기: {item.written} / 면접: {item.practical}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block text-center text-sm text-orange-600 hover:underline">
                Q-Net에서 접수하기 →
              </a>
            </div>

            {/* 학습 바로가기 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📚</span> 학습 바로가기
              </h3>
              <div className="space-y-2">
                {[
                  { name: '정보전략계획', desc: 'ISP/EA 50문항', href: '/category/it/information-management-pro/study/information-strategy' },
                  { name: '프로젝트관리', desc: 'PM 50문항', href: '/category/it/information-management-pro/study/project-management' },
                  { name: '면접 대비', desc: '실전 25문항', href: '/category/it/information-management-pro/study/practical' },
                ].map((item) => (
                  <a key={item.name} href={item.href} className="block p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {[
                  { name: '컴퓨터시스템응용기술사', desc: '시스템 분야 기술사' },
                  { name: '정보보안기사', desc: '보안 전문 자격' },
                  { name: 'PMP', desc: 'PMI 국제 PM 자격' },
                  { name: 'CISA', desc: '정보시스템 감사' },
                ].map((item) => (
                  <a key={item.name} href="#" className="block p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📖</span> 추천 학습 자료
              </h3>
              <div className="space-y-3">
                <a href="#" className="block p-3 border rounded-lg hover:border-orange-400 transition">
                  <p className="font-medium text-gray-800">기술사회 스터디</p>
                  <p className="text-xs text-gray-500">체계적 학습 및 모의면접</p>
                </a>
                <a href="#" className="block p-3 border rounded-lg hover:border-orange-400 transition">
                  <p className="font-medium text-gray-800">기출문제 분석집</p>
                  <p className="text-xs text-gray-500">최근 10년 기출 및 모범답안</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Selection Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert("프롬프트가 복사되었습니다!"); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">
            본 페이지의 정보는 참고용이며, 정확한 정보는 Q-Net에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
