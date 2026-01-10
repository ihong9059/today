'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Paramedic2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const studySubjects = [
    { id: 'cpr-aed', name: '심폐소생술/AED', icon: '❤️', color: 'red', desc: '기본소생술, 자동제세동기, 기도관리' },
    { id: 'first-aid', name: '응급처치', icon: '🩹', color: 'orange', desc: '출혈, 골절, 화상, 중독 처치' },
    { id: 'patient-assessment', name: '환자평가', icon: '🔍', color: 'blue', desc: '1차/2차 평가, 활력징후, 병력청취' },
    { id: 'transport', name: '환자이송', icon: '🚑', color: 'green', desc: '이송장비, 고정법, 이송기술' },
    { id: 'practical', name: '실기', icon: '🎯', color: 'purple', desc: '실기시험 핵심 술기' },
  ];

  const handleAIClick = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = `응급구조사 2급 ${selectedSubject} 과목에 대해 학습하고 싶습니다. 핵심 개념과 자주 출제되는 내용을 설명해주세요.`;
    switch (ai) {
      case 'claude':
        return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
      case 'chatgpt':
        return `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`;
      case 'gemini':
        return `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`;
      default:
        return '#';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-teal-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">응급구조사 2급</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-teal-200 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>›</span>
            <Link href="/category/medical" className="hover:text-white">의료·보건</Link>
            <span>›</span>
            <span className="text-white">응급구조사 2급</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">🚑</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">응급구조사 2급</h1>
              <p className="text-xl text-teal-100">기본응급처치와 환자이송 전문가</p>
            </div>
          </div>
          <p className="text-lg text-teal-100 max-w-3xl">
            응급구조사 2급은 응급환자에 대한 기본응급처치, 환자이송 및 심폐소생술을 수행하는
            응급의료 전문인력입니다. 소방서, 병원, 산업체 등에서 활동합니다.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">시험 유형</div>
            <div className="font-bold text-gray-800">필기 + 실기</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-sm text-gray-500">필기 과목</div>
            <div className="font-bold text-gray-800">4과목 80문항</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-500">시험 시간</div>
            <div className="font-bold text-gray-800">80분</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-sm text-gray-500">합격 기준</div>
            <div className="font-bold text-gray-800">60점 이상</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 자격 개요 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-800">응급구조사 2급</strong>은 한국보건의료인국가시험원에서
                  시행하는 국가자격시험으로, 응급환자에 대한 기본응급처치와 이송업무를 수행할 수 있는
                  자격을 부여합니다.
                </p>
                <div className="bg-teal-50 rounded-xl p-4">
                  <h4 className="font-bold text-teal-800 mb-2">📌 주요 업무</h4>
                  <ul className="text-sm space-y-1 text-teal-700">
                    <li>• 기본 심폐소생술 및 자동제세동기(AED) 사용</li>
                    <li>• 기본응급처치(지혈, 붕대, 부목 적용 등)</li>
                    <li>• 환자 평가 및 활력징후 측정</li>
                    <li>• 환자 이송 및 운반</li>
                    <li>• 응급의료장비 관리</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 응시 자격 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">🎓</span> 응시 자격
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-800 mb-3">응시 자격 요건</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>보건복지부장관이 인정하는 응급구조사 양성기관에서 <strong>양성과정을 마친 자</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>소방학교, 군 의무학교, 대한적십자사 등에서 <strong>관련 교육을 이수한 자</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500 mt-1">✓</span>
                      <span>응급구조 관련 <strong>1,000시간 이상의 실무경력</strong>이 있는 자</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>💡 참고:</strong> 응급구조사 1급과 달리 2급은 전문대학 졸업이 필수가 아니며,
                    지정된 양성기관에서 단기 교육과정을 이수하면 응시할 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            {/* 필기시험 과목 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">📝</span> 필기시험 과목
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="text-left p-4 font-semibold text-gray-700 rounded-tl-lg">과목명</th>
                      <th className="text-center p-4 font-semibold text-gray-700">문항수</th>
                      <th className="text-left p-4 font-semibold text-gray-700 rounded-tr-lg">주요 내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">응급의학개론</td>
                      <td className="p-4 text-center text-gray-600">20문항</td>
                      <td className="p-4 text-gray-600">응급의료체계, 의료관련법규, 재해응급의료</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">기본응급처치학</td>
                      <td className="p-4 text-center text-gray-600">20문항</td>
                      <td className="p-4 text-gray-600">출혈, 쇼크, 골절, 화상, 중독 처치</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">심폐소생술 및 AED</td>
                      <td className="p-4 text-center text-gray-600">20문항</td>
                      <td className="p-4 text-gray-600">기본소생술, 자동제세동기, 기도폐쇄</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">환자평가 및 이송</td>
                      <td className="p-4 text-center text-gray-600">20문항</td>
                      <td className="p-4 text-gray-600">환자평가, 이송장비, 이송기술</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>총 80문항</strong> / 객관식 5지선다형 / 시험시간 80분 / 과목당 40점 이상, 전과목 평균 60점 이상 합격
                </p>
              </div>
            </section>

            {/* 실기시험 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 실기시험 구성
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
                  <h4 className="font-bold text-red-800 mb-3">❤️ 심폐소생술</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 성인/소아/영아 기본소생술</li>
                    <li>• AED 사용법</li>
                    <li>• 기도폐쇄 처치</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                  <h4 className="font-bold text-orange-800 mb-3">🩹 응급처치술</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 지혈법 및 붕대법</li>
                    <li>• 부목 적용</li>
                    <li>• 상처 처치</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-3">🔍 환자평가</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 1차/2차 환자평가</li>
                    <li>• 활력징후 측정</li>
                    <li>• 병력 청취(SAMPLE)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <h4 className="font-bold text-green-800 mb-3">🚑 환자이송</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 척추고정 및 이송</li>
                    <li>• 들것 사용법</li>
                    <li>• 긴급 이송 기술</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>💡 실기시험 팁:</strong> 정해진 프로토콜 순서를 정확히 따르고,
                  환자 안전과 감염 예방 조치를 먼저 확인하는 습관을 들이세요.
                </p>
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">심폐소생술/AED</h4>
                    <p className="text-gray-600 text-sm">가장 중요한 핵심 술기입니다. 이론과 실기를 병행하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">환자평가</h4>
                    <p className="text-gray-600 text-sm">1차/2차 평가 절차와 SAMPLE/OPQRST를 숙지하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">응급처치</h4>
                    <p className="text-gray-600 text-sm">상황별 응급처치 방법과 우선순위를 학습하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">환자이송</h4>
                    <p className="text-gray-600 text-sm">이송장비 사용법과 척추고정 기술을 연습하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-gray-800">실기 통합 연습</h4>
                    <p className="text-gray-600 text-sm">전체 술기를 연결하여 시뮬레이션 연습을 반복하세요.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 과목별 학습 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-teal-500">📚</span> 과목별 학습하기
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {studySubjects.map((subject) => (
                  <div key={subject.id} className="group">
                    <div className={`bg-gradient-to-br from-${subject.color}-50 to-${subject.color}-100 rounded-xl p-5 border border-${subject.color}-200 hover:shadow-lg transition-all`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-800">{subject.name}</h3>
                          <p className="text-xs text-gray-500">{subject.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/category/medical/paramedic-2/study/${subject.id}`}
                          className={`flex-1 text-center py-2 bg-${subject.color}-500 text-white rounded-lg text-sm font-medium hover:bg-${subject.color}-600 transition-colors`}
                        >
                          학습하기
                        </Link>
                        <button
                          onClick={() => handleAIClick(subject.name)}
                          className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                        >
                          AI 도움
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">시행 기관</span>
                  <span className="font-medium text-gray-800">한국보건의료인국가시험원</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">시험 횟수</span>
                  <span className="font-medium text-gray-800">연 1회</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">시험 시기</span>
                  <span className="font-medium text-gray-800">매년 2~3월</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">접수 방법</span>
                  <span className="font-medium text-gray-800">인터넷 접수</span>
                </div>
              </div>
              <a href="https://www.kuksiwon.or.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block w-full py-2 bg-teal-500 text-white text-center rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                국시원 바로가기 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-md p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> 합격 전략
              </h3>
              <ul className="space-y-2 text-sm text-teal-100">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>심폐소생술 프로토콜 완벽 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>기출문제 최소 5회독 반복</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>실기 동영상 보며 동작 연습</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>마네킹 실습 필수!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>응급의료법 관련 문항 꼼꼼히</span>
                </li>
              </ul>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 관련 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/medical/paramedic-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors">
                  <div className="font-medium text-gray-800">응급구조사 1급</div>
                  <div className="text-xs text-gray-500">전문 응급의료 자격</div>
                </Link>
                <Link href="/category/medical/nursing-assistant" className="block p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors">
                  <div className="font-medium text-gray-800">간호조무사</div>
                  <div className="text-xs text-gray-500">간호 보조 업무</div>
                </Link>
                <Link href="/category/safety/lifesaving" className="block p-3 bg-gray-50 rounded-lg hover:bg-teal-50 transition-colors">
                  <div className="font-medium text-gray-800">인명구조사</div>
                  <div className="text-xs text-gray-500">수상 인명구조</div>
                </Link>
              </div>
            </div>

            {/* 취업 분야 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>💼</span> 취업 분야
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">소방서</span>
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">병원</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">구급대</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">산업체</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">이벤트 현장</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">스포츠팀</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">AI 학습 도우미</h3>
            <p className="text-gray-600 mb-6">{selectedSubject} 과목을 AI와 함께 학습하세요.</p>
            <div className="space-y-3">
              <a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <span className="text-2xl">🟠</span>
                <div>
                  <div className="font-medium text-gray-800">Claude</div>
                  <div className="text-sm text-gray-500">Anthropic의 AI 어시스턴트</div>
                </div>
              </a>
              <a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <span className="text-2xl">🟢</span>
                <div>
                  <div className="font-medium text-gray-800">ChatGPT</div>
                  <div className="text-sm text-gray-500">OpenAI의 AI 어시스턴트</div>
                </div>
              </a>
              <a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <span className="text-2xl">🔵</span>
                <div>
                  <div className="font-medium text-gray-800">Gemini</div>
                  <div className="text-sm text-gray-500">Google의 AI 어시스턴트</div>
                </div>
              </a>
            </div>
            <button onClick={() => setShowAIModal(false)}
              className="mt-6 w-full py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
