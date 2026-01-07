'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustomsBrokerPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "관세법 수입통관절차",
      prompt: `관세사 시험 준비를 위한 수입통관절차를 설명해주세요.

다음 내용을 포함해주세요:
1. 수입통관의 개념과 절차
2. 수입신고의 시기와 요건
3. 통관심사와 물품검사
4. 관세납부와 수입신고수리
5. 주요 출제 포인트`
    },
    {
      title: "관세평가 과세가격 결정",
      prompt: `관세사 시험을 위한 과세가격 결정방법을 설명해주세요.

다음 내용을 포함해주세요:
1. 제1방법(거래가격)의 요건
2. 과세가격 가산·공제 요소
3. 제2~6방법의 순차적 적용
4. 특수관계자 거래 시 조정
5. 계산문제 풀이 전략`
    },
    {
      title: "HS코드 품목분류",
      prompt: `관세사 시험 대비 HS코드 품목분류를 설명해주세요.

다음 내용을 포함해주세요:
1. HS 협약과 관세율표 구조
2. 통칙 1~6의 적용 순서
3. 주요 부·류 분류 기준
4. 품목분류 사전심사제도
5. 실무 적용 사례`
    }
  ];

  const firstExamSubjects = [
    { name: '관세법개론', questions: 40, slug: 'customs-law', desc: '관세법, 수출입통관, FTA 특례법' },
    { name: '무역영어', questions: 40, slug: 'trade-english', desc: 'Incoterms, L/C, 무역계약' },
    { name: '내국소비세법', questions: 40, slug: 'consumption-tax', desc: '부가가치세, 개별소비세, 주세' },
    { name: '회계학', questions: 40, slug: 'accounting', desc: '재무회계, 원가회계 기초' },
  ];

  const secondExamSubjects = [
    { name: '관세법', time: '120분', desc: '관세법 전반, 통관절차, 관세환급' },
    { name: '관세율표 및 상품학', time: '120분', desc: 'HS코드, 품목분류, 상품지식' },
    { name: '관세평가', time: '90분', desc: '과세가격 결정, 특수관계 거래' },
    { name: '무역실무', time: '90분', desc: '무역계약, 대금결제, 운송보험' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sky-600 font-medium">관세사</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-sky-600 to-blue-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📦</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">관세사</h1>
                  <p className="text-sky-100 text-lg mb-4">Licensed Customs Broker</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★☆</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 응시자: 약 1.5만명</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 1차 20% / 2차 15%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Info Cards */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">1차 시험</div>
                <div className="font-bold text-gray-900">객관식 160문항</div>
                <div className="text-xs text-gray-400">240분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl mb-2">✍️</div>
                <div className="text-sm text-gray-500">2차 시험</div>
                <div className="font-bold text-gray-900">논술형 4과목</div>
                <div className="text-xs text-gray-400">총 420분</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold text-gray-900">1차 30,000원</div>
                <div className="text-xs text-gray-400">2차 32,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행기관</div>
                <div className="font-bold text-gray-900">한국산업인력공단</div>
                <div className="text-xs text-gray-400">국가전문자격</div>
              </div>
            </section>

            {/* Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📌 자격 개요</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-900">관세사</strong>는 수출입 통관업무의 대리, 관세에 관한 상담·자문,
                  이의신청·심사청구·심판청구의 대리 등 관세 관련 전문업무를 수행하는 국가전문자격입니다.
                </p>
                <div>
                  <strong className="text-gray-900">주요 업무:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>수출입 통관의 대리</li>
                    <li>관세의 과세가격 결정 및 품목분류</li>
                    <li>관세 환급 및 감면 신청 대리</li>
                    <li>관세 불복(이의신청·심판청구) 대리</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-900">취업 분야:</strong>
                  <span className="ml-2">관세법인, 무역회사, 포워딩업체, 개인 관세사무소 개업</span>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 1차 시험 과목</h2>
              <p className="text-gray-600 mb-4">객관식 5지선다 | 과목당 40문항 | 총 160문항 | 240분</p>
              <div className="grid gap-4">
                {firstExamSubjects.map((subject, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:border-sky-300 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{index + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{subject.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sky-600 font-medium">{subject.questions}문항</span>
                        <Link href={`/category/accounting/customs-broker/study/${subject.slug}`} className="block mt-2 text-sm text-sky-600 hover:text-sky-700">
                          학습하기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                <p className="text-sm text-sky-800">
                  <strong>합격 기준:</strong> 영어 과목 제외 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
            </section>

            {/* 2차 시험 과목 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">✍️ 2차 시험 과목</h2>
              <p className="text-gray-600 mb-4">논술형 | 4과목 | 총 420분</p>
              <div className="grid gap-4">
                {secondExamSubjects.map((subject, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{subject.desc}</p>
                      </div>
                      <span className="text-blue-600 font-medium">{subject.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
              <Link href="/category/accounting/customs-broker/study/customs-advanced" className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium">
                2차 시험 심화학습 →
              </Link>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sky-600 mb-2">비전공자 (12~18개월)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>관세법개론</strong> - 관세법 체계와 기본개념 확립</li>
                    <li><strong>회계학</strong> - 재무회계 기초 완성</li>
                    <li><strong>내국소비세법</strong> - 부가가치세 중심 학습</li>
                    <li><strong>무역영어</strong> - Incoterms, L/C 집중</li>
                    <li><strong>2차 대비</strong> - 관세평가·품목분류 심화</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-bold text-blue-600 mb-2">전공자 (8~12개월)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>관세법개론</strong> - 1차 핵심과목 집중</li>
                    <li><strong>내국소비세법</strong> - 세법 유사과목 연계</li>
                    <li><strong>무역영어</strong> - 실무 용어 숙지</li>
                    <li><strong>2차 대비</strong> - 논술 답안 작성 훈련</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-gray-600 mb-4">관세사 시험 핵심 주제를 AI와 함께 학습하세요.</p>
              <div className="grid gap-3">
                {aiQuestions.map((q, index) => (
                  <button key={index} onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-sky-50 rounded-lg transition border hover:border-sky-300">
                    <span className="font-medium text-gray-900">{q.title}</span>
                    <span className="text-sky-600 ml-2">→ AI에게 질문하기</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">📅 2026년 시험 일정</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">1차 원서접수</span><span className="font-medium">2월 중</span></div>
                <div className="flex justify-between"><span className="text-gray-600">1차 시험</span><span className="font-medium text-sky-600">4월 중</span></div>
                <div className="flex justify-between"><span className="text-gray-600">1차 합격발표</span><span className="font-medium">5월 중</span></div>
                <div className="flex justify-between"><span className="text-gray-600">2차 시험</span><span className="font-medium text-blue-600">7월 중</span></div>
                <div className="flex justify-between"><span className="text-gray-600">최종 합격발표</span><span className="font-medium">10월 중</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">🎯 1차 과목별 목표점수</h3>
              <div className="space-y-3">
                {[{ name: '관세법개론', target: 75 }, { name: '무역영어', target: 65 }, { name: '내국소비세법', target: 70 }, { name: '회계학', target: 65 }].map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{subject.name}</span><span className="font-medium">{subject.target}점</span></div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full" style={{ width: `${subject.target}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/accounting/tax-accountant" className="block p-3 bg-gray-50 rounded-lg hover:bg-sky-50 transition">
                  <span className="font-medium text-gray-900">세무사</span>
                  <p className="text-xs text-gray-500 mt-1">세무 전문가</p>
                </Link>
                <Link href="/category/it/logistics-manager" className="block p-3 bg-gray-50 rounded-lg hover:bg-sky-50 transition">
                  <span className="font-medium text-gray-900">물류관리사</span>
                  <p className="text-xs text-gray-500 mt-1">물류 전문자격</p>
                </Link>
                <Link href="/category/finance/trade-specialist" className="block p-3 bg-gray-50 rounded-lg hover:bg-sky-50 transition">
                  <span className="font-medium text-gray-900">무역영어</span>
                  <p className="text-xs text-gray-500 mt-1">무역 실무 자격</p>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">📚 추천 교재</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg"><p className="font-medium text-gray-900">관세법개론</p><p className="text-gray-500">이균 저 | 세경사</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><p className="font-medium text-gray-900">관세평가론</p><p className="text-gray-500">신호영 저 | 무역경영사</p></div>
                <div className="p-3 bg-gray-50 rounded-lg"><p className="font-medium text-gray-900">HS 품목분류</p><p className="text-gray-500">관세청 편 | 관세청</p></div>
              </div>
            </div>

            <Link href="/category/accounting/customs-broker/exam" className="block w-full py-4 bg-gradient-to-r from-sky-600 to-blue-500 text-white text-center rounded-xl font-bold hover:from-sky-700 hover:to-blue-600 transition shadow-lg">
              시험 상세정보 보기 →
            </Link>
            <Link href="/category/accounting/customs-broker/study/customs-law" className="block w-full py-4 bg-white text-sky-600 text-center rounded-xl font-bold border-2 border-sky-600 hover:bg-sky-50 transition">
              학습 시작하기
            </Link>
          </div>
        </div>
      </main>

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
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
