'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TeacherCertificatePage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const studySubjects = [
    { id: 'education-theory', name: '교육학', icon: '📚', color: 'blue', desc: '교육심리, 교육과정, 교육평가' },
    { id: 'major-subject', name: '전공과목', icon: '📖', color: 'green', desc: '전공 교과내용학, 교과교육학' },
    { id: 'teaching-essay', name: '교직논술', icon: '✍️', color: 'purple', desc: '교육정책, 학생지도, 교직관' },
    { id: 'class-demonstration', name: '수업실연', icon: '🎓', color: 'orange', desc: '교수학습지도안, 수업시연' },
    { id: 'interview', name: '면접', icon: '💬', color: 'teal', desc: '심층면접, 집단토론' },
  ];

  const handleAIClick = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setShowAIModal(true);
  };

  const getAIUrl = (ai: string) => {
    const prompt = `교원임용시험 ${selectedSubject} 과목에 대해 학습하고 싶습니다. 핵심 개념과 자주 출제되는 내용을 설명해주세요.`;
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">교원자격증</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-indigo-200 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>›</span>
            <Link href="/category/education" className="hover:text-white">교육</Link>
            <span>›</span>
            <span className="text-white">교원자격증</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">🎓</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">교원자격증 (임용시험)</h1>
              <p className="text-xl text-indigo-100">National Teacher Certification Examination</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">난이도: ★★★★★</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">연간 응시자: 약 5만명</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">합격률: 약 3~10%</span>
          </div>
          <p className="text-lg text-indigo-100 max-w-3xl">
            교원자격증은 초·중·고등학교 정교사로 임용되기 위해 필요한 국가자격입니다.
            교육학, 전공, 논술, 수업실연, 면접 등 다양한 영역을 평가합니다.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-sm text-gray-500">1차 시험</div>
            <div className="font-bold text-gray-800">교육학+전공</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🎤</div>
            <div className="text-sm text-gray-500">2차 시험</div>
            <div className="font-bold text-gray-800">논술+실연+면접</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-sm text-gray-500">시험 시기</div>
            <div className="font-bold text-gray-800">매년 11월~1월</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">🏛️</div>
            <div className="text-sm text-gray-500">주관</div>
            <div className="font-bold text-gray-800">시·도교육청</div>
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
                <span className="text-indigo-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-800">교원임용경쟁시험</strong>은 국·공립 초·중·고등학교 및
                  특수학교의 정규 교사로 임용되기 위한 시험입니다. 사범대학 졸업자 또는 교직과정 이수자 등
                  2급 정교사 자격증 소지자가 응시할 수 있습니다.
                </p>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h4 className="font-bold text-indigo-800 mb-2">📌 시험 구분</h4>
                  <ul className="text-sm space-y-1 text-indigo-700">
                    <li>• 초등교사 임용시험 (한국교육과정평가원 출제)</li>
                    <li>• 중등교사 임용시험 (각 교과별 출제)</li>
                    <li>• 특수교사 임용시험 (특수교육 전공)</li>
                    <li>• 유치원교사 임용시험</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 응시 자격 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">🎓</span> 응시 자격
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5">
                  <h4 className="font-bold text-gray-800 mb-3">기본 응시 요건</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">✓</span>
                      <span><strong>2급 정교사 자격증</strong> 소지자 또는 취득 예정자</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">✓</span>
                      <span>사범대학 졸업(예정)자</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">✓</span>
                      <span>교직과정 이수자 (비사범대)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500 mt-1">✓</span>
                      <span>교육대학원 졸업(예정)자</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>💡 참고:</strong> 결격사유(금고 이상 형의 선고 등)가 있는 경우 응시가 제한될 수 있습니다.
                    각 시·도교육청 공고를 반드시 확인하세요.
                  </p>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">📝</span> 1차 시험 과목
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="text-left p-4 font-semibold text-gray-700 rounded-tl-lg">영역</th>
                      <th className="text-center p-4 font-semibold text-gray-700">문항/시간</th>
                      <th className="text-left p-4 font-semibold text-gray-700 rounded-tr-lg">주요 내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">교육학</td>
                      <td className="p-4 text-center text-gray-600">논술 1문항/60분</td>
                      <td className="p-4 text-gray-600">교육심리, 교육과정, 교육평가, 교육행정</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">전공 A</td>
                      <td className="p-4 text-center text-gray-600">기입형+서술형/90분</td>
                      <td className="p-4 text-gray-600">전공 교과내용학 (교과별 상이)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-800">전공 B</td>
                      <td className="p-4 text-center text-gray-600">기입형+서술형/90분</td>
                      <td className="p-4 text-gray-600">전공 교과교육학 + 교과내용학</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>배점:</strong> 교육학 20점 + 전공 80점 = 총 100점 / 과목별 40% 이상, 평균 60점 이상 합격
                </p>
              </div>
            </section>

            {/* 2차 시험 구성 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">🎯</span> 2차 시험 구성
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100">
                  <h4 className="font-bold text-purple-800 mb-3">✍️ 교직논술</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• 교육정책 및 이슈</li>
                    <li>• 학생지도 방안</li>
                    <li>• 교직관 및 소신</li>
                    <li>• 논리적 글쓰기</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                  <h4 className="font-bold text-orange-800 mb-3">🎓 수업실연</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 교수학습지도안 작성</li>
                    <li>• 15~20분 수업 시연</li>
                    <li>• 판서 및 발문</li>
                    <li>• 학생 참여 유도</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-5 border border-teal-100">
                  <h4 className="font-bold text-teal-800 mb-3">💬 심층면접</h4>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• 교직 적성 및 인성</li>
                    <li>• 교육관 및 가치관</li>
                    <li>• 상황 대처 능력</li>
                    <li>• 집단토론 (일부 지역)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-800">
                  <strong>💡 2차 시험 팁:</strong> 2차 시험은 시·도교육청마다 배점과 형식이 다릅니다.
                  지원하는 지역의 기출 유형을 반드시 확인하세요.
                </p>
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-gray-800">전공과목 기본이론</h4>
                    <p className="text-gray-600 text-sm">전공 교과내용학을 완벽히 정리하세요. 기본서 3회독이 목표입니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-gray-800">교육학 암기</h4>
                    <p className="text-gray-600 text-sm">교육심리, 교육과정, 교육평가 핵심 이론을 체계적으로 정리하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-gray-800">기출문제 분석</h4>
                    <p className="text-gray-600 text-sm">최근 5개년 기출을 분석하고 출제 경향을 파악하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-gray-800">모의고사 및 답안 작성</h4>
                    <p className="text-gray-600 text-sm">실전처럼 시간을 재고 답안을 작성하는 연습을 반복하세요.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <h4 className="font-bold text-gray-800">2차 시험 대비</h4>
                    <p className="text-gray-600 text-sm">논술 첨삭, 수업실연 연습, 면접 스터디를 병행하세요.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 과목별 학습 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-indigo-500">📚</span> 영역별 학습하기
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
                          href={`/category/education/teacher-certificate/study/${subject.id}`}
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
                <span>📅</span> 2026학년도 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium text-gray-800">2025.10월</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">1차 시험</span>
                  <span className="font-medium text-gray-800">2025.11월</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">1차 합격발표</span>
                  <span className="font-medium text-gray-800">2025.12월</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">2차 시험</span>
                  <span className="font-medium text-gray-800">2026.1월</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">최종 합격발표</span>
                  <span className="font-medium text-gray-800">2026.2월</span>
                </div>
              </div>
              <a href="https://www.kice.re.kr" target="_blank" rel="noopener noreferrer"
                className="mt-4 block w-full py-2 bg-indigo-500 text-white text-center rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
                한국교육과정평가원 →
              </a>
            </div>

            {/* 합격 전략 */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-md p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> 합격 전략
              </h3>
              <ul className="space-y-2 text-sm text-indigo-100">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>전공 기본서 3회독 필수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>교육학 키워드 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>기출 10개년 분석</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>스터디 그룹 참여</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>2차 대비 꾸준히</span>
                </li>
              </ul>
            </div>

            {/* 관련 자격증 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 관련 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/education/kindergarten-teacher" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="font-medium text-gray-800">유치원교사</div>
                  <div className="text-xs text-gray-500">유아교육 전문 자격</div>
                </Link>
                <Link href="/category/education/librarian-teacher" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="font-medium text-gray-800">사서교사</div>
                  <div className="text-xs text-gray-500">학교도서관 전문 자격</div>
                </Link>
                <Link href="/category/welfare/childcare-teacher-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                  <div className="font-medium text-gray-800">보육교사 1급</div>
                  <div className="text-xs text-gray-500">어린이집 보육 자격</div>
                </Link>
              </div>
            </div>

            {/* 주요 교과 */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📖</span> 중등 임용 주요 교과
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">국어</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">영어</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">수학</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">사회</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">과학</span>
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">체육</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">음악</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">미술</span>
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
            <p className="text-gray-600 mb-6">{selectedSubject} 영역을 AI와 함께 학습하세요.</p>
            <div className="space-y-3">
              <a href={getAIUrl('claude')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <span className="text-2xl">🧡</span>
                <div>
                  <div className="font-medium text-gray-800">Claude</div>
                  <div className="text-sm text-gray-500">Anthropic의 AI 어시스턴트</div>
                </div>
              </a>
              <a href={getAIUrl('chatgpt')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <span className="text-2xl">💚</span>
                <div>
                  <div className="font-medium text-gray-800">ChatGPT</div>
                  <div className="text-sm text-gray-500">OpenAI의 AI 어시스턴트</div>
                </div>
              </a>
              <a href={getAIUrl('gemini')} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <span className="text-2xl">💙</span>
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
