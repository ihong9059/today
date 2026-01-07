'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TaxAccountantPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "소득세법 종합소득세",
      prompt: `세무사 시험 준비를 위한 종합소득세를 설명해주세요.

다음 내용을 포함해주세요:
1. 종합소득의 범위와 계산구조
2. 소득공제와 세액공제의 차이
3. 종합소득 과세표준과 세율
4. 신고납부 절차
5. 주요 출제 포인트와 계산문제 유형`
    },
    {
      title: "법인세법 손금불산입",
      prompt: `세무사 시험을 위한 법인세 손금불산입 항목을 설명해주세요.

다음 내용을 포함해주세요:
1. 손금불산입의 개념과 취지
2. 주요 손금불산입 항목 (접대비, 기부금, 감가상각비 등)
3. 손금불산입과 익금산입의 관계
4. 세무조정 방법
5. 기출문제 유형과 풀이 전략`
    },
    {
      title: "부가가치세 매입세액공제",
      prompt: `세무사 시험 대비 부가가치세 매입세액공제를 설명해주세요.

다음 내용을 포함해주세요:
1. 매입세액공제의 요건
2. 공제받지 못하는 매입세액
3. 공통매입세액의 안분계산
4. 의제매입세액공제
5. 실무 적용 사례와 계산문제`
    }
  ];

  const firstExamSubjects = [
    { name: '재정학', questions: 40, slug: 'fiscal-policy', desc: '조세론, 공공지출, 재정정책' },
    { name: '세법학개론', questions: 40, slug: 'tax-law-intro', desc: '국세기본법, 소득세, 법인세, 부가가치세' },
    { name: '회계학개론', questions: 40, slug: 'accounting-intro', desc: '재무회계, 원가관리회계 기초' },
    { name: '선택(상법/민법/행정소송법)', questions: 40, slug: 'commercial-law', desc: '상법 선택 시: 회사법, 상행위법' },
  ];

  const secondExamSubjects = [
    { name: '세법학1부', time: '120분', desc: '국세기본법, 소득세법, 법인세법, 상속증여세법' },
    { name: '세법학2부', time: '120분', desc: '부가가치세법, 개별소비세법, 지방세법, 조세특례제한법' },
    { name: '회계학1부', time: '90분', desc: '재무회계 (K-IFRS 기준)' },
    { name: '회계학2부', time: '90분', desc: '원가관리회계' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">세무사</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-6">
                <div className="text-6xl">📋</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">세무사</h1>
                  <p className="text-emerald-100 text-lg mb-4">Certified Tax Accountant (CTA)</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded-full">난이도: ★★★★★</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">연간 응시자: 약 2만명</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full">합격률: 1차 25% / 2차 10%</span>
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
                  <strong className="text-gray-900">세무사</strong>는 납세자의 위임에 의하여 조세에 관한 신고·신청·청구 등의
                  대리, 세무조정계산서 작성, 조세에 관한 상담 또는 자문 업무를 수행하는 국가전문자격입니다.
                </p>
                <div>
                  <strong className="text-gray-900">주요 업무:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>세무대리: 세금 신고·신청·청구의 대리</li>
                    <li>세무조정: 기업의 세무조정계산서 작성</li>
                    <li>세무상담: 조세 관련 상담 및 자문</li>
                    <li>조세불복: 이의신청·심사청구·심판청구 대리</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-gray-900">취업 분야:</strong>
                  <span className="ml-2">세무법인, 회계법인, 기업 세무팀, 개인 세무사무소 개업</span>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📚 1차 시험 과목</h2>
              <p className="text-gray-600 mb-4">객관식 5지선다 | 과목당 40문항 | 총 160문항 | 240분</p>
              <div className="grid gap-4">
                {firstExamSubjects.map((subject, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:border-emerald-300 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{index + 1}. {subject.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{subject.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-600 font-medium">{subject.questions}문항</span>
                        <Link
                          href={`/category/accounting/tax-accountant/study/${subject.slug}`}
                          className="block mt-2 text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          학습하기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-800">
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
                  <div key={index} className="border rounded-lg p-4 hover:border-teal-300 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900">{subject.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{subject.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-teal-600 font-medium">{subject.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-teal-800">
                  <strong>합격 기준:</strong> 매 과목 40점 이상, 전 과목 평균 60점 이상
                </p>
              </div>
              <Link
                href="/category/accounting/tax-accountant/study/tax-law-advanced"
                className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-medium"
              >
                2차 시험 심화학습 →
              </Link>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📖 추천 공부 순서</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-emerald-600 mb-2">비전공자 (12~18개월)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>회계학개론</strong> - 재무회계·원가회계 기초 확립</li>
                    <li><strong>세법학개론</strong> - 국세기본법부터 체계적 학습</li>
                    <li><strong>재정학</strong> - 조세론 중심 이론 정리</li>
                    <li><strong>상법</strong> - 회사법 위주 조문 암기</li>
                    <li><strong>2차 대비</strong> - 세법학·회계학 심화 및 답안 작성 연습</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-bold text-teal-600 mb-2">전공자 (8~12개월)</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li><strong>세법학개론</strong> - 1차 핵심과목 집중</li>
                    <li><strong>재정학</strong> - 조세론 이론 심화</li>
                    <li><strong>회계학개론</strong> - 기출문제 중심 복습</li>
                    <li><strong>2차 대비</strong> - 세법학·회계학 논술 답안 작성 훈련</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-gray-600 mb-4">세무사 시험 핵심 주제를 AI와 함께 학습하세요.</p>
              <div className="grid gap-3">
                {aiQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-emerald-50 rounded-lg transition border hover:border-emerald-300"
                  >
                    <span className="font-medium text-gray-900">{q.title}</span>
                    <span className="text-emerald-600 ml-2">→ AI에게 질문하기</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">📅 2026년 시험 일정</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">1차 원서접수</span>
                  <span className="font-medium">2월 중</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1차 시험</span>
                  <span className="font-medium text-emerald-600">4월 중</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1차 합격발표</span>
                  <span className="font-medium">5월 중</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2차 시험</span>
                  <span className="font-medium text-teal-600">8월 중</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최종 합격발표</span>
                  <span className="font-medium">11월 중</span>
                </div>
              </div>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">🎯 1차 과목별 목표점수</h3>
              <div className="space-y-3">
                {[
                  { name: '재정학', target: 70 },
                  { name: '세법학개론', target: 75 },
                  { name: '회계학개론', target: 70 },
                  { name: '상법', target: 65 },
                ].map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="font-medium">{subject.target}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                        style={{ width: `${subject.target}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-2">
                <Link href="/category/accounting/cpa" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <span className="font-medium text-gray-900">공인회계사(CPA)</span>
                  <p className="text-xs text-gray-500 mt-1">회계감사 전문가</p>
                </Link>
                <Link href="/category/accounting/computerized-tax-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <span className="font-medium text-gray-900">전산세무 1급</span>
                  <p className="text-xs text-gray-500 mt-1">세무실무 국가공인자격</p>
                </Link>
                <Link href="/category/finance/financial-planner" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition">
                  <span className="font-medium text-gray-900">재경관리사</span>
                  <p className="text-xs text-gray-500 mt-1">재무·회계·세무 통합자격</p>
                </Link>
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">📚 추천 교재</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">세법학개론</p>
                  <p className="text-gray-500">정정운 저 | 세경사</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">객관식 재정학</p>
                  <p className="text-gray-500">이영 저 | 에듀윌</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">세무사 회계학</p>
                  <p className="text-gray-500">김영덕 저 | 다올</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/category/accounting/tax-accountant/exam"
              className="block w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-center rounded-xl font-bold hover:from-emerald-700 hover:to-teal-600 transition shadow-lg"
            >
              시험 상세정보 보기 →
            </Link>

            <Link
              href="/category/accounting/tax-accountant/study/fiscal-policy"
              className="block w-full py-4 bg-white text-emerald-600 text-center rounded-xl font-bold border-2 border-emerald-600 hover:bg-emerald-50 transition"
            >
              학습 시작하기
            </Link>
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                      className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
