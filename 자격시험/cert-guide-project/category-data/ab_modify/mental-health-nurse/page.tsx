'use client';

import { useState } from 'react';
import Link from 'next/link';

const studySubjects = [
  { id: 'mental-health-theory', name: '정신건강이론', icon: '🧠', color: 'blue', description: '정신건강의 기초 이론', questions: 50 },
  { id: 'psychiatric-nursing', name: '정신간호학', icon: '🏥', color: 'teal', description: '정신과 환자 간호', questions: 50 },
  { id: 'psychopharmacology', name: '정신약리학', icon: '💊', color: 'green', description: '정신과 약물치료', questions: 50 },
  { id: 'therapeutic-communication', name: '치료적 의사소통', icon: '💬', color: 'orange', description: '환자와의 소통기법', questions: 50 },
  { id: 'practical', name: '실기', icon: '🎯', color: 'purple', description: '실제 임상 실습', questions: 25 },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', light: 'bg-blue-100' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', light: 'bg-teal-100' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', light: 'bg-green-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', light: 'bg-orange-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', light: 'bg-purple-100' },
};

const aiQuestions = [
  '정신건강간호사 시험에서 자주 출제되는 주제는?',
  '조현병 환자 간호의 핵심 포인트를 알려주세요',
  '정신과 약물의 부작용과 간호중재를 설명해주세요',
];

export default function MentalHealthNursePage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const handleAIQuestion = (question: string) => {
    setSelectedQuestion(question);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-emerald-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">정신건강간호사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🧠</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">정신건강간호사</h1>
              <p className="text-emerald-100 text-lg">Mental Health Nurse Specialist</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도: ★★★★☆</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">간호사 면허 필수</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가전문자격</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-emerald-600">4과목</div>
                <div className="text-xs text-gray-400">객관식</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-emerald-600">실무평가</div>
                <div className="text-xs text-gray-400">면접포함</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold text-emerald-600">100,000원</div>
                <div className="text-xs text-gray-400">필기+실기</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🏛️</div>
                <div className="text-xs text-gray-500">주관기관</div>
                <div className="font-bold text-emerald-600">복지부</div>
                <div className="text-xs text-gray-400">보건복지부</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">정신건강간호사란?</h3>
                  <p>정신건강간호사는 정신건강 분야의 전문 간호인력으로, 정신질환자의 간호와 재활, 정신건강 증진 업무를 수행합니다. 정신건강복지법에 따른 국가전문자격으로, 정신건강복지센터, 정신의료기관 등에서 핵심 역할을 담당합니다.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>정신질환자 간호 및 상담</li>
                    <li>정신건강 증진 프로그램 운영</li>
                    <li>위기 개입 및 사례관리</li>
                    <li>가족교육 및 지역사회 연계</li>
                    <li>정신재활 서비스 제공</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">취업 분야</h3>
                  <p>정신건강복지센터, 정신의료기관, 정신재활시설, 중독관리통합지원센터, 자살예방센터, 학교·기업 상담실</p>
                </div>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">✅</span> 응시자격
              </h2>
              <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <h3 className="font-bold text-emerald-700 mb-2">응시 자격 요건 (택1)</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span><strong>1급</strong>: 간호사 면허 + 정신건강 분야 석사 이상 + 실습 1년</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span><strong>1급</strong>: 2급 취득 후 정신건강 분야 5년 이상 경력</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span><strong>2급</strong>: 간호사 면허 + 정신건강 분야 학사 + 실습 1년</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span><strong>2급</strong>: 간호사 면허 + 정신건강 분야 3년 이상 경력</span>
                  </li>
                </ul>
                <p className="text-sm text-emerald-700 mt-3 bg-white p-2 rounded">
                  💡 간호사 면허가 기본 요건이며, 학력 또는 경력 조건을 충족해야 합니다.
                </p>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {studySubjects.slice(0, 4).map((subject, index) => {
                  const colors = colorClasses[subject.color];
                  return (
                    <div key={subject.id} className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <h3 className={`font-bold ${colors.text}`}>{index + 1}과목: {subject.name}</h3>
                            <p className="text-sm text-gray-500">{subject.description}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{subject.questions}문항</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subject.id === 'mental-health-theory' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">정신건강 개념</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">발달이론</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">정신역동</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">스트레스이론</span>
                          </>
                        )}
                        {subject.id === 'psychiatric-nursing' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">조현병</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">기분장애</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">불안장애</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">인격장애</span>
                          </>
                        )}
                        {subject.id === 'psychopharmacology' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">항정신병약물</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">항우울제</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">항불안제</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">기분안정제</span>
                          </>
                        )}
                        {subject.id === 'therapeutic-communication' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">경청기법</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">공감반응</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">치료적관계</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">면담기술</span>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 실기시험 구성 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 실기시험 구성
              </h2>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-purple-700">실무 능력 평가</h3>
                    <p className="text-sm text-gray-600">정신건강간호 실무 능력 종합 평가</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">평가 항목</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 정신상태검사(MSE)</li>
                      <li>• 사례관리 계획 수립</li>
                      <li>• 위기개입 능력</li>
                      <li>• 치료적 의사소통</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">시험 형식</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 시험시간: 약 60분</li>
                      <li>• 형식: 실무시험 + 면접</li>
                      <li>• 합격기준: 60점 이상</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                  <h3 className="font-bold text-emerald-700 mb-3">추천 학습 순서</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">1. 정신건강이론</span>
                    <span className="text-emerald-300">→</span>
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">2. 정신간호학</span>
                    <span className="text-emerald-300">→</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">3. 정신약리학</span>
                    <span className="text-emerald-300">→</span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">4. 치료적 의사소통</span>
                    <span className="text-emerald-300">→</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5. 실기</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <strong>💡 학습 팁:</strong> 정신건강이론으로 기초를 다진 후, 정신간호학에서 질환별 간호를 학습하세요. 약리학과 의사소통은 임상과 연결하여 공부하면 효과적입니다.
                </div>
              </div>
            </div>

            {/* 과목별 학습하기 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-emerald-500">🎯</span> 과목별 학습하기
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {studySubjects.map((subject) => {
                  const colors = colorClasses[subject.color];
                  return (
                    <Link
                      key={subject.id}
                      href={`/category/medical/mental-health-nurse/study/${subject.id}`}
                      className={`block p-4 ${colors.bg} rounded-lg hover:shadow-md transition border-2 ${colors.border} hover:border-opacity-100`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{subject.icon}</span>
                        <h3 className={`font-bold ${colors.text}`}>{subject.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{subject.description}</p>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${colors.text}`}>학습하기 →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-emerald-100 mb-4">정신건강간호사 시험 준비에 AI를 활용해보세요!</p>
              <div className="space-y-2">
                {aiQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleAIQuestion(question)}
                    className="w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-3 transition text-sm"
                  >
                    💬 {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium">8월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">필기시험</span>
                  <span className="font-medium">9월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">실기시험</span>
                  <span className="font-medium">10월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">합격발표</span>
                  <span className="font-medium">11월 예정</span>
                </div>
              </div>
              <a
                href="https://www.mohw.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-emerald-50 text-emerald-600 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition"
              >
                보건복지부 바로가기 →
              </a>
            </div>

            {/* 과목별 목표 점수 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표 점수
              </h3>
              <div className="space-y-3">
                {studySubjects.slice(0, 4).map((subject) => {
                  const colors = colorClasses[subject.color];
                  return (
                    <div key={subject.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{subject.name}</span>
                        <span className={`font-medium ${colors.text}`}>70점</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${colors.light} rounded-full`} style={{ width: '70%' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-3">※ 합격기준: 전체 평균 60점 이상</p>
            </div>

            {/* 자격의 장점 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>⭐</span> 자격의 장점
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">국가전문자격</p>
                    <p className="text-gray-500">보건복지부 인정 자격</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">높은 수요</p>
                    <p className="text-gray-500">정신건강 분야 확대</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">전문성 인정</p>
                    <p className="text-gray-500">정신건강복지센터 필수인력</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/medical/mental-health-counselor" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">정신건강임상심리사</div>
                  <div className="text-xs text-gray-500">심리평가 전문</div>
                </Link>
                <Link href="/category/medical/mental-health-social-worker" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">정신건강사회복지사</div>
                  <div className="text-xs text-gray-500">사회복지 연계</div>
                </Link>
                <Link href="/category/welfare/counselor-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">상담심리사</div>
                  <div className="text-xs text-gray-500">상담 전문</div>
                </Link>
              </div>
            </div>

            {/* 시험 정보 상세보기 버튼 */}
            <Link
              href="/category/medical/mental-health-nurse/exam"
              className="block bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              📋 시험 정보 상세보기
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{selectedQuestion}</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
              >
                <span className="text-2xl">🟠</span>
                <span className="text-sm font-medium text-gray-700">Claude</span>
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition"
              >
                <span className="text-2xl">🟢</span>
                <span className="text-sm font-medium text-gray-700">ChatGPT</span>
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
              >
                <span className="text-2xl">🔵</span>
                <span className="text-sm font-medium text-gray-700">Gemini</span>
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
