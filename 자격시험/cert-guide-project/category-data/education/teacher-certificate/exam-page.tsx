'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TeacherCertificateExamPage() {
  const [activeTab, setActiveTab] = useState<'elementary' | 'secondary' | 'special'>('elementary');

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
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">자격정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👨‍🏫</span>
            <div>
              <h1 className="text-2xl font-bold">교원자격증 자격정보</h1>
              <p className="text-indigo-100">Teacher Certificate Information</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('elementary')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'elementary'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🏫 초등교사
          </button>
          <button
            onClick={() => setActiveTab('secondary')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'secondary'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 중등교사
          </button>
          <button
            onClick={() => setActiveTab('special')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'special'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            ♿ 특수교사
          </button>
        </div>

        {activeTab === 'elementary' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 초등교사 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">자격 취득</p>
                  <p className="font-medium text-gray-800">교육대학 졸업</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">교육 기간</p>
                  <p className="font-medium text-gray-800">4년</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">임용 과목</p>
                  <p className="font-medium text-gray-800">전 과목 통합</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">경쟁률</p>
                  <p className="font-medium text-gray-800">평균 3:1 ~ 5:1</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 임용시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-medium text-gray-800">교육학 (1차)</p>
                      <p className="text-sm text-gray-500">교육철학, 교육심리, 교육과정, 교육평가 등</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">논술형</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div>
                      <p className="font-medium text-gray-800">초등교육과정 (1차)</p>
                      <p className="text-sm text-gray-500">국어, 수학, 사회, 과학, 영어, 체육, 음악, 미술 등</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">선택형+서술형</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎭</span>
                    <div>
                      <p className="font-medium text-gray-800">수업실연 (2차)</p>
                      <p className="text-sm text-gray-500">실제 수업 시연 (15분 내외)</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">실기</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-medium text-gray-800">면접 (2차)</p>
                      <p className="text-sm text-gray-500">교직관, 인성, 상황대처 능력</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">구술</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 초등교사 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">교육대학 재학 중부터 꾸준히 임용시험을 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">전 과목을 골고루 공부해야 하므로 시간 배분이 중요합니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">교육실습과 봉사활동을 통해 실전 경험을 쌓으세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">수업실연은 반복 연습으로 자신감을 키우세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'secondary' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 중등교사 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">자격 취득</p>
                  <p className="font-medium text-gray-800">사범대학 졸업 또는 교직이수</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">교육 기간</p>
                  <p className="font-medium text-gray-800">4년 + 교직과정</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">임용 과목</p>
                  <p className="font-medium text-gray-800">과목별 (국어, 수학, 영어, 과학 등)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">경쟁률</p>
                  <p className="font-medium text-gray-800">과목별 차이 (평균 5:1 ~ 20:1)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 임용시험 과목 (예: 국어과)</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">1차 시험</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 교육학 (논술형, 20점)</li>
                    <li>• 전공 A (기본이론): 국어학, 국문학, 문법 등 (50점)</li>
                    <li>• 전공 B (교육론): 국어교육론, 교수법 등 (30점)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">2차 시험</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 수업실연: 해당 과목 수업 시연 (15분)</li>
                    <li>• 교직적성 심층면접: 교직관, 교육철학</li>
                    <li>• 교수학습 지도안 작성</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 주요 임용과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">국어</p>
                  <p className="text-sm text-gray-600">국어학, 국문학, 국어교육론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">수학</p>
                  <p className="text-sm text-gray-600">대수학, 해석학, 기하학, 수학교육론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">영어</p>
                  <p className="text-sm text-gray-600">영문학, 영어학, 영어교육론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">과학 (물리/화학/생물/지구과학)</p>
                  <p className="text-sm text-gray-600">전공 과목 + 과학교육론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">사회 (일반사회/역사/지리)</p>
                  <p className="text-sm text-gray-600">전공 과목 + 사회교육론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">기타 (음악, 미술, 체육 등)</p>
                  <p className="text-sm text-gray-600">전공 실기 + 교육론</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 중등교사 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">전공 과목의 심화 학습이 필수입니다. 대학원 진학도 고려하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">과목별 경쟁률 차이가 크므로 지원 전략을 잘 세우세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">교육론과 교수법을 별도로 공부하여 이론과 실무를 연결하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">기출문제를 철저히 분석하여 출제 경향을 파악하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">♿ 특수교사 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">자격 취득</p>
                  <p className="font-medium text-gray-800">특수교육과 졸업</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">교육 기간</p>
                  <p className="font-medium text-gray-800">4년</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">임용 과목</p>
                  <p className="font-medium text-gray-800">특수교육 통합</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">경쟁률</p>
                  <p className="font-medium text-gray-800">평균 2:1 ~ 4:1 (낮은 편)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 임용시험 과목</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">1차 시험</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 교육학 (논술형)</li>
                    <li>• 특수교육학 개론</li>
                    <li>• 장애 영역별 교육 (시각, 청각, 지적, 지체, 정서행동 등)</li>
                    <li>• 특수교육 교육과정 및 교수법</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">2차 시험</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 수업실연: 특수교육 대상 학생 교수법 시연</li>
                    <li>• 면접: 특수교육 철학 및 교직관</li>
                    <li>• 개별화교육계획(IEP) 작성</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 특수교사 영역</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">시각장애</p>
                  <p className="text-sm text-gray-600">점자교육, 보행훈련, 저시력 교육</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">청각장애</p>
                  <p className="text-sm text-gray-600">수화교육, 구화교육, 인공와우</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">지적장애</p>
                  <p className="text-sm text-gray-600">기능적 교육과정, 생활중심 교육</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">지체장애</p>
                  <p className="text-sm text-gray-600">보조공학, 물리치료, 작업치료</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">정서·행동장애</p>
                  <p className="text-sm text-gray-600">행동수정, 상담, 심리치료</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">자폐성장애</p>
                  <p className="text-sm text-gray-600">사회성 교육, 의사소통 훈련</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 특수교사 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">다양한 장애 영역에 대한 이해가 필수입니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">특수학교 실습을 통해 실전 경험을 쌓으세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">개별화교육계획(IEP) 작성 능력을 키우세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">특수교육 관련 법규와 정책을 숙지하세요.</p>
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
