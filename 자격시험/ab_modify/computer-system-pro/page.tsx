'use client';

import { useState } from 'react';

export default function ComputerSystemProPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      question: "컴퓨터 시스템 아키텍처의 최신 트렌드와 기술사 관점에서의 설계 원칙",
      prompt: `컴퓨터시스템응용기술사 시험 대비 질문입니다.

질문: 컴퓨터 시스템 아키텍처의 최신 트렌드와 기술사 관점에서의 설계 원칙에 대해 설명해주세요.

다음 순서로 상세히 설명해주세요:
1. 현대 컴퓨터 시스템 아키텍처의 핵심 개념
2. 클라우드 네이티브와 마이크로서비스 아키텍처
3. 성능과 확장성을 고려한 설계 원칙
4. 최신 기술 트렌드 (ARM, RISC-V 등)
5. 기술사 답안 작성 예시`
    },
    {
      question: "분산 시스템의 CAP 이론과 일관성 모델",
      prompt: `컴퓨터시스템응용기술사 시험 대비 질문입니다.

질문: 분산 시스템의 CAP 이론과 다양한 일관성 모델에 대해 설명해주세요.

다음 순서로 상세히 설명해주세요:
1. CAP 이론의 핵심 개념과 한계
2. 일관성 모델 종류 (Strong, Eventual, Causal 등)
3. 합의 알고리즘 (Paxos, Raft)
4. 실무 적용 사례와 트레이드오프
5. 기술사 답안 작성 예시`
    },
    {
      question: "대규모 시스템 성능 최적화 방법론",
      prompt: `컴퓨터시스템응용기술사 시험 대비 질문입니다.

질문: 대규모 시스템 성능 최적화 방법론에 대해 설명해주세요.

다음 순서로 상세히 설명해주세요:
1. 성능 분석 및 병목 구간 식별 방법
2. 캐싱 전략과 메모리 최적화
3. 데이터베이스 및 쿼리 최적화
4. 수평/수직 확장 전략
5. 기술사 답안 작성 예시`
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
            <a href="/" className="text-gray-600 hover:text-emerald-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-emerald-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">컴퓨터시스템응용기술사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">💻</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">컴퓨터시스템응용기술사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
              </div>
              <p className="text-emerald-100 text-lg mb-4">Professional Engineer Computer System Application</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★★</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 800명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 필기 10% / 면접 70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/it/computer-system-pro/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">필기</p>
            <p className="font-bold text-gray-800">단답형 + 서술형</p>
            <p className="text-xs text-gray-400">4시간 (1,2교시)</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/it/computer-system-pro/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-emerald-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">🎤</span>
            <p className="text-gray-500 text-sm mt-2">면접</p>
            <p className="font-bold text-gray-800">구술형 면접</p>
            <p className="text-xs text-gray-400">15~30분</p>
            <p className="text-xs text-emerald-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">필기 67,800원</p>
            <p className="text-xs text-gray-400">면접 87,100원</p>
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

            {/* 자격 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                컴퓨터시스템응용기술사는 컴퓨터 시스템의 설계, 구축, 운영에 관한 최고 수준의 전문 지식을 갖춘
                기술사 자격입니다. 시스템 아키텍처, 운영체제, 분산 시스템, 성능 최적화 등 컴퓨터 시스템 전반에
                대한 심층적인 전문성을 인정받는 최고급 국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 대규모 시스템 아키텍처 설계</li>
                    <li>• IT 인프라 구축 및 최적화</li>
                    <li>• 시스템 성능 분석 및 튜닝</li>
                    <li>• 기술 자문 및 컨설팅</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">취업 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 삼성SDS, LG CNS 등 대기업 SI</li>
                    <li>• 네이버, 카카오 등 IT 기업</li>
                    <li>• 정보통신산업진흥원 등 공공기관</li>
                    <li>• 기술 컨설팅 및 감리 업체</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 필기시험 출제 분야 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 필기시험 출제 분야
              </h2>
              <div className="space-y-3">
                {[
                  { name: '시스템 아키텍처', icon: '🏗️', difficulty: 5, tip: 'CPU, 메모리, 캐시, 병렬처리 핵심', link: '/category/it/computer-system-pro/study/system-architecture' },
                  { name: '운영체제/커널', icon: '⚙️', difficulty: 5, tip: '프로세스, 메모리, 파일시스템 심화', link: '/category/it/computer-system-pro/study/os-kernel' },
                  { name: '분산 시스템', icon: '🌐', difficulty: 4, tip: 'CAP 이론, 합의 알고리즘 중요', link: '/category/it/computer-system-pro/study/distributed-system' },
                  { name: '성능 최적화', icon: '⚡', difficulty: 4, tip: '튜닝, 모니터링, 용량 계획', link: '/category/it/computer-system-pro/study/performance' },
                  { name: '클라우드/가상화', icon: '☁️', difficulty: 4, tip: '컨테이너, 쿠버네티스, 서버리스', link: '/category/it/computer-system-pro/study/cloud' },
                  { name: '보안/신뢰성', icon: '🔐', difficulty: 4, tip: '시스템 보안, 고가용성 설계', link: '/category/it/computer-system-pro/study/security' },
                  { name: '신기술 동향', icon: '🚀', difficulty: 3, tip: 'AI/ML 인프라, 엣지 컴퓨팅', link: '/category/it/computer-system-pro/study/trends' },
                ].map((subject, i) => (
                  <a key={i} href={subject.link} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition cursor-pointer">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                      {subject.icon}
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
                  </a>
                ))}
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 출제 형식:</strong> 1교시 단답형 10문, 2교시 서술형 4문 (100점 만점 60점 이상)
                </p>
              </div>
            </section>

            {/* 면접시험 구성 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎤</span> 면접시험 구성
              </h2>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">구술형 면접 (15~30분)</span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: '경력 사항', ratio: '30%', desc: '담당 프로젝트, 역할, 성과' },
                  { name: '전문 지식', ratio: '30%', desc: '필기시험 범위 심화 질문' },
                  { name: '기술 응용력', ratio: '25%', desc: '실제 문제 해결 역량' },
                  { name: '기술사 품위', ratio: '15%', desc: '의사소통, 윤리의식' },
                ].map((item, i) => (
                  <div key={i} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-emerald-600 font-bold">{item.ratio}</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <strong>✅ 합격 기준:</strong> 100점 만점 60점 이상 (평균 합격률 약 70%)
                </p>
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-bold text-emerald-700 mb-3">📘 비전공자 / 경력 5년 미만</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>컴퓨터 구조 기초 (3개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>운영체제 심화 (3개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>분산시스템/클라우드 (3개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span>기출문제 분석 (3개월)</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-3">총 예상 학습기간: 12개월 이상</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-bold text-teal-700 mb-3">📗 전공자 / 경력 10년 이상</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>기출문제 분석 (2개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>취약 분야 보강 (2개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>서브노트 정리 (1개월)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded">
                      <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                      <span>모의답안 작성 (1개월)</span>
                    </div>
                  </div>
                  <p className="text-xs text-teal-600 mt-3">총 예상 학습기간: 6개월 이상</p>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                기술사 시험 준비에 도움이 되는 질문을 AI에게 물어보세요.
              </p>
              <div className="space-y-3">
                {aiQuestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentPrompt(item.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-white rounded-lg hover:shadow-md transition flex items-center gap-3"
                  >
                    <span className="text-emerald-500">💬</span>
                    <span className="text-gray-700 text-sm">{item.question}</span>
                    <span className="ml-auto text-emerald-500">→</span>
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-3">
                  <p className="font-medium text-emerald-600">제128회 (상반기)</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                    <li>원서접수: 1.21 ~ 1.24</li>
                    <li>필기시험: 2.8</li>
                    <li>필기발표: 3.12</li>
                    <li>면접시험: 4월 중</li>
                  </ul>
                </div>
                <div className="border-l-4 border-teal-500 pl-3">
                  <p className="font-medium text-teal-600">제131회 (하반기)</p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                    <li>원서접수: 6.16 ~ 6.19</li>
                    <li>필기시험: 7.12</li>
                    <li>필기발표: 8.13</li>
                    <li>면접시험: 10월 중</li>
                  </ul>
                </div>
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer"
                className="block mt-4 text-center py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm hover:bg-emerald-100 transition">
                Q-Net에서 일정 확인 →
              </a>
            </div>

            {/* 분야별 중요도 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📊</span> 분야별 출제 비중
              </h3>
              <div className="space-y-3">
                {[
                  { name: '시스템 아키텍처', score: 25, color: 'emerald' },
                  { name: '운영체제/커널', score: 25, color: 'teal' },
                  { name: '분산 시스템', score: 20, color: 'cyan' },
                  { name: '성능 최적화', score: 15, color: 'blue' },
                  { name: '신기술 동향', score: 15, color: 'indigo' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.name}</span>
                      <span className="font-medium text-gray-800">{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`bg-${item.color}-500 h-2 rounded-full`} style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 응시 자격 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 응시 자격
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="font-medium text-emerald-700">기사 + 4년 경력</p>
                  <p className="text-gray-600 text-xs mt-1">정보처리기사 등 관련 기사 취득 후 4년</p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <p className="font-medium text-teal-700">산업기사 + 5년 경력</p>
                  <p className="text-gray-600 text-xs mt-1">관련 산업기사 취득 후 5년</p>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <p className="font-medium text-cyan-700">기능사 + 7년 경력</p>
                  <p className="text-gray-600 text-xs mt-1">관련 기능사 취득 후 7년</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-700">동일 직무 9년 경력</p>
                  <p className="text-gray-600 text-xs mt-1">자격 없이 실무 경력만으로 응시</p>
                </div>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <a href="/category/it/information-management-pro" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <p className="font-medium text-gray-800">정보관리기술사</p>
                  <p className="text-xs text-gray-500">데이터/정보시스템 전문</p>
                </a>
                <a href="/category/it/information-security-pro" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <p className="font-medium text-gray-800">정보보안기술사</p>
                  <p className="text-xs text-gray-500">보안 아키텍처 전문</p>
                </a>
                <a href="/category/it/engineer-information-processing" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <p className="font-medium text-gray-800">정보처리기사</p>
                  <p className="text-xs text-gray-500">기술사 응시 자격 획득</p>
                </a>
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 추천 학습 자료
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">기술사 합격 서브노트</p>
                  <p className="text-gray-500 text-xs">기출문제 분석 및 답안 작성법</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">CSAPP (Computer Systems)</p>
                  <p className="text-gray-500 text-xs">시스템 아키텍처 바이블</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">DDIA (데이터 중심 앱 설계)</p>
                  <p className="text-gray-500 text-xs">분산 시스템 핵심서</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* AI Modal */}
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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
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
        </div>
      </footer>
    </div>
  );
}
