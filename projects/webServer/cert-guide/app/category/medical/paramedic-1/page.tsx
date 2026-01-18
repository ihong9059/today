'use client';

import { useState } from 'react';
import Link from 'next/link';

const studySubjects = [
  { id: 'emergency-medicine', name: '응급의학총론', icon: '🚑', color: 'red', description: '응급의료체계와 환자평가', questions: 50 },
  { id: 'anatomy-physiology', name: '해부생리학', icon: '🫀', color: 'pink', description: '인체 구조와 기능', questions: 50 },
  { id: 'pharmacology', name: '응급약리학', icon: '💊', color: 'purple', description: '응급약물과 투여법', questions: 50 },
  { id: 'trauma-care', name: '외상처치', icon: '🩹', color: 'orange', description: '외상환자 평가와 처치', questions: 50 },
  { id: 'cardiac-care', name: '심장응급', icon: '❤️', color: 'rose', description: '심혈관 응급처치', questions: 50 },
  { id: 'practical', name: '실기', icon: '🎯', color: 'blue', description: '현장 술기 실습', questions: 25 },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', light: 'bg-red-100' },
  pink: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', light: 'bg-pink-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', light: 'bg-purple-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', light: 'bg-orange-100' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', light: 'bg-rose-100' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', light: 'bg-blue-100' },
};

const aiQuestions = [
  '응급구조사 1급 시험에서 자주 출제되는 주제는?',
  'CPR과 제세동 순서를 설명해주세요',
  '외상환자 현장평가 방법을 알려주세요',
];

export default function Paramedic1Page() {
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
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-red-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">응급구조사 1급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🚑</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">응급구조사 1급</h1>
              <p className="text-red-100 text-lg">Paramedic Level 1</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도: ★★★★☆</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">전문대 이상</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가면허</span>
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
                <div className="font-bold text-red-600">5과목</div>
                <div className="text-xs text-gray-400">객관식 200문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-red-600">술기평가</div>
                <div className="text-xs text-gray-400">CPR, 기도관리 등</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold text-red-600">150,000원</div>
                <div className="text-xs text-gray-400">필기+실기</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🏛️</div>
                <div className="text-xs text-gray-500">주관기관</div>
                <div className="font-bold text-red-600">국시원</div>
                <div className="text-xs text-gray-400">한국보건의료인국가시험원</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">응급구조사 1급이란?</h3>
                  <p>응급구조사 1급은 응급환자의 생명을 보호하고 응급처치를 수행하는 전문 의료인력입니다. 119구급대, 병원 응급실, 소방서 등에서 전문적인 응급의료 서비스를 제공합니다.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>응급환자 현장 평가 및 처치</li>
                    <li>심폐소생술(CPR) 및 제세동</li>
                    <li>기도확보 및 산소투여</li>
                    <li>정맥로 확보 및 약물투여</li>
                    <li>외상환자 고정 및 이송</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">취업 분야</h3>
                  <p>119구급대(소방청), 병원 응급실, 응급의료정보센터, 산업체 의무실, 항공/해상 구조대, 이벤트 의료팀</p>
                </div>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">✅</span> 응시자격
              </h2>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h3 className="font-bold text-red-700 mb-2">응시 자격 요건</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span><strong>학력</strong>: 대학(전문대학 포함)에서 응급구조학을 전공하고 졸업한 자</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span><strong>실습</strong>: 소정의 병원 및 구급차 동승 실습 이수</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✓</span>
                    <span><strong>외국면허</strong>: 외국의 응급구조사 면허 소지자</span>
                  </li>
                </ul>
                <p className="text-sm text-red-700 mt-3 bg-white p-2 rounded">
                  💡 응급구조학과 3년제 이상 졸업이 기본 요건입니다.
                </p>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {studySubjects.slice(0, 5).map((subject, index) => {
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
                        <span className="text-sm text-gray-400">40문항</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {subject.id === 'emergency-medicine' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">응급의료체계</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">환자평가</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">기도관리</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">쇼크</span>
                          </>
                        )}
                        {subject.id === 'anatomy-physiology' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">순환계</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">호흡계</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">신경계</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">근골격계</span>
                          </>
                        )}
                        {subject.id === 'pharmacology' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">심혈관약물</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">진통제</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">수액요법</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">약물계산</span>
                          </>
                        )}
                        {subject.id === 'trauma-care' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">두부외상</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">흉부외상</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">복부외상</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">골절</span>
                          </>
                        )}
                        {subject.id === 'cardiac-care' && (
                          <>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">심전도</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">부정맥</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">급성관상동맥증후군</span>
                            <span className="text-xs bg-white px-2 py-1 rounded border text-gray-600">ACLS</span>
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
                <span className="text-red-500">🎯</span> 실기시험 구성
              </h2>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <h3 className="font-bold text-blue-700">술기 능력 평가</h3>
                    <p className="text-sm text-gray-600">응급처치 핵심 술기 실습 평가</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">필수 술기</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 심폐소생술(BLS/ACLS)</li>
                      <li>• 기도관리(기관내삽관)</li>
                      <li>• 정맥로 확보</li>
                      <li>• 제세동</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">시험 형식</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 시험시간: 약 30분</li>
                      <li>• 형식: 술기 시연</li>
                      <li>• 합격기준: 60점 이상</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-bold text-red-700 mb-3">추천 학습 순서</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">1. 해부생리학</span>
                    <span className="text-red-300">→</span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">2. 응급의학총론</span>
                    <span className="text-red-300">→</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">3. 응급약리학</span>
                    <span className="text-red-300">→</span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">4. 외상처치</span>
                    <span className="text-red-300">→</span>
                    <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">5. 심장응급</span>
                    <span className="text-red-300">→</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">6. 실기</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <strong>💡 학습 팁:</strong> 해부생리학으로 기초를 다진 후, 응급의학총론으로 전반적인 개념을 익히세요. 이후 약리학과 각론(외상, 심장)을 학습하고 실기 연습으로 마무리합니다.
                </div>
              </div>
            </div>

            {/* 과목별 학습하기 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-red-500">🎯</span> 과목별 학습하기
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {studySubjects.map((subject) => {
                  const colors = colorClasses[subject.color];
                  return (
                    <Link
                      key={subject.id}
                      href={`/category/medical/paramedic-1/study/${subject.id}`}
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
            <div className="bg-gradient-to-r from-red-500 to-rose-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-red-100 mb-4">응급구조사 1급 시험 준비에 AI를 활용해보세요!</p>
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
                  <span className="font-medium">12월~1월</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">필기시험</span>
                  <span className="font-medium">2월</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">실기시험</span>
                  <span className="font-medium">3~4월</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">합격발표</span>
                  <span className="font-medium">4월</span>
                </div>
              </div>
              <a
                href="https://www.kuksiwon.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
              >
                국시원 바로가기 →
              </a>
            </div>

            {/* 과목별 목표 점수 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표 점수
              </h3>
              <div className="space-y-3">
                {studySubjects.slice(0, 5).map((subject) => {
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
              <p className="text-xs text-gray-500 mt-3">※ 합격기준: 전체 평균 60점 이상, 과목별 40점 이상</p>
            </div>

            {/* 자격의 장점 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>⭐</span> 자격의 장점
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">국가면허</p>
                    <p className="text-gray-500">보건복지부 인정 면허</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">안정적 취업</p>
                    <p className="text-gray-500">소방청 119구급대 공채</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✓</span>
                  <div>
                    <p className="font-medium text-gray-800">사회적 가치</p>
                    <p className="text-gray-500">생명을 구하는 보람</p>
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
                <Link href="/category/medical/paramedic-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">응급구조사 2급</div>
                  <div className="text-xs text-gray-500">기본 응급처치</div>
                </Link>
                <Link href="/category/medical/nurse" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">간호사</div>
                  <div className="text-xs text-gray-500">의료 분야 연계</div>
                </Link>
                <Link href="/category/safety/firefighter" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">소방공무원</div>
                  <div className="text-xs text-gray-500">119구급대 진출</div>
                </Link>
              </div>
            </div>

            {/* 시험 정보 상세보기 버튼 */}
            <Link
              href="/category/medical/paramedic-1/exam"
              className="block bg-gradient-to-r from-red-500 to-rose-500 text-white text-center py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
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
