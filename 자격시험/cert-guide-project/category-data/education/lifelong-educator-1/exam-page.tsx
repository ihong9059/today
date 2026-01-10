'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LifelongEducator1ExamPage() {
  const [activeTab, setActiveTab] = useState<'subjects' | 'qualification' | 'process'>('subjects');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
            <Link href="/category/education/lifelong-educator-1" className="text-gray-600 hover:text-indigo-600">평생교육사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">자격정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-2xl font-bold">평생교육사 1급 자격정보</h1>
              <p className="text-indigo-100">Senior Lifelong Educator Certificate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'subjects'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 시험과목
          </button>
          <button
            onClick={() => setActiveTab('qualification')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'qualification'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎯 응시자격
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'process'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📋 시험절차
          </button>
        </div>

        {activeTab === 'subjects' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">필기시험 (객관식 + 주관식)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">과목 수</p>
                  <p className="font-medium text-gray-800">4과목 + 실습</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">평균 60점 이상 (과목당 40점 이상)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">과목당 60분</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험과목 상세</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육론</p>
                      <p className="text-sm text-gray-600">평생교육의 철학, 이론, 정책 및 국제 동향</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">필기</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육방법론</p>
                      <p className="text-sm text-gray-600">교수학습 이론, 방법, 평가 및 질 관리</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">필기</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육경영론</p>
                      <p className="text-sm text-gray-600">기관 경영, 전략적 관리, 재정 및 인사관리</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">필기</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육프로그램개발론</p>
                      <p className="text-sm text-gray-600">프로그램 개발, 평가체계, 성과관리</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">필기</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-medium text-gray-800">평생교육실습</p>
                      <p className="text-sm text-gray-600">실무 프로젝트, 사례연구, 현장 적용</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">실습</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">2급 과목을 심화하여 이론적 배경과 최신 연구 동향을 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">평생교육법 및 관련 정책의 최신 개정 사항을 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">실무경험을 바탕으로 사례 중심의 학습을 진행하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">주관식 문제 대비를 위해 논리적 글쓰기 연습을 하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'qualification' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 응시자격 요건</h2>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <h3 className="font-medium text-indigo-800 mb-2">경력 기준 (1)</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 평생교육사 2급 자격 취득자</li>
                    <li>• 평생교육 관련 실무경력 5년 이상</li>
                    <li>• 평생교육기관, 평생학습관, 대학 평생교육원 등에서의 경력 인정</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2">학력 기준 (2)</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 평생교육사 2급 자격 취득자</li>
                    <li>• 대학원 석사학위 이상 소지자</li>
                    <li>• 평생교육 관련 전공 또는 평생교육 관련 논문 작성자</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실무경력 인정 범위</h2>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800 mb-1">평생교육기관</p>
                  <p className="text-sm text-gray-600">평생학습관, 평생교육원, 사업장 부설 평생교육시설</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800 mb-1">대학 부설 기관</p>
                  <p className="text-sm text-gray-600">대학 평생교육원, 원격대학, 학점은행제 운영기관</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800 mb-1">정부·공공기관</p>
                  <p className="text-sm text-gray-600">국가평생교육진흥원, 지역 평생교육진흥원, 교육청</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800 mb-1">민간 교육기관</p>
                  <p className="text-sm text-gray-600">직업훈련기관, 기업 HRD 부서, 시민단체 교육부서</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 자격 준비 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">2급 취득 후 즉시 실무경력을 쌓기 시작하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">경력증명서를 발급받을 수 있는 기관에서 근무하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">석사과정 진학을 고려하여 빠른 승급을 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">실무 경험을 체계적으로 정리하여 시험에 활용하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 절차</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">응시원서 접수</h3>
                    <p className="text-sm text-gray-600">국가평생교육진흥원 홈페이지에서 온라인 접수</p>
                    <p className="text-xs text-gray-500 mt-1">응시자격 증빙서류 제출 (경력증명서 또는 학위증명서)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">필기시험 응시</h3>
                    <p className="text-sm text-gray-600">4과목 필기시험 (객관식 + 주관식)</p>
                    <p className="text-xs text-gray-500 mt-1">과목당 60분, 평균 60점 이상 합격</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">합격자 발표</h3>
                    <p className="text-sm text-gray-600">시험일로부터 약 1개월 후 합격자 발표</p>
                    <p className="text-xs text-gray-500 mt-1">국가평생교육진흥원 홈페이지에서 확인</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">평생교육실습 이수</h3>
                    <p className="text-sm text-gray-600">실무 프로젝트 및 사례연구 수행</p>
                    <p className="text-xs text-gray-500 mt-1">평생교육기관에서의 고급 실습과정</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">자격증 발급</h3>
                    <p className="text-sm text-gray-600">평생교육사 1급 자격증 신청 및 발급</p>
                    <p className="text-xs text-gray-500 mt-1">국가평생교육진흥원에서 자격증 교부</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정 (예시)</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">원서 접수</span>
                  <span className="text-sm text-gray-600">매년 상반기 (3-4월경)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">필기시험</span>
                  <span className="text-sm text-gray-600">매년 하반기 (10-11월경)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">합격자 발표</span>
                  <span className="text-sm text-gray-600">시험일로부터 약 1개월 후</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">※ 정확한 일정은 국가평생교육진흥원 공고를 확인하세요.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 시험 준비 일정</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">시험 6개월 전: 응시자격 확인 및 학습계획 수립</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">시험 3개월 전: 집중 학습 시작 (과목별 이론 정리)</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">시험 1개월 전: 문제풀이 및 실전연습</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">시험 1주일 전: 핵심내용 최종 점검</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
