'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LibrarianTeacherExamPage() {
  const [activeTab, setActiveTab] = useState<'subjects' | 'requirement' | 'process'>('subjects');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-blue-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-2xl font-bold">사서교사 시험정보</h1>
              <p className="text-blue-100">Librarian Teacher Examination</p>
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
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 시험과목
          </button>
          <button
            onClick={() => setActiveTab('requirement')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'requirement'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📋 응시자격
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'process'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎯 시험절차
          </button>
        </div>

        {activeTab === 'subjects' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험과목 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">교원임용시험 (1차, 2차)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">과목 수</p>
                  <p className="font-medium text-gray-800">5과목 (전공)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">1차 시험</p>
                  <p className="font-medium text-gray-800">교육학 + 전공 (논술형)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">2차 시험</p>
                  <p className="font-medium text-gray-800">수업실연 + 면접</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 전공과목 상세</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">도서관경영</p>
                      <p className="text-sm text-gray-500">도서관 조직 운영, 인적·물적 자원 관리, 마케팅, 평가</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📑</span>
                    <div>
                      <p className="font-medium text-gray-800">정보조직론</p>
                      <p className="text-sm text-gray-500">분류(KDC, DDC), 목록(MARC, RDA), 메타데이터</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <p className="font-medium text-gray-800">정보서비스론</p>
                      <p className="text-sm text-gray-500">참고봉사, 정보검색, 이용자교육, 디지털정보서비스</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div>
                      <p className="font-medium text-gray-800">독서교육론</p>
                      <p className="text-sm text-gray-500">독서이론, 독서지도 방법, 독서프로그램 개발</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏫</span>
                    <div>
                      <p className="font-medium text-gray-800">학교도서관운영</p>
                      <p className="text-sm text-gray-500">학교도서관 교육과정, 협력수업, 정보활용교육</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">정보조직론은 KDC, DDC 분류표와 KORMARC를 숙지해야 합니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">최근 학교도서관 정책 동향과 독서교육 트렌드를 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">논술형 문제는 체계적인 개요 작성 후 논리적으로 서술하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">수업실연은 독서 또는 정보활용교육 주제로 준비하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'requirement' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 응시자격 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">기본 자격</p>
                  <p className="font-medium text-gray-800">사서교사 2급 정교사 자격증</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">전공 요건</p>
                  <p className="font-medium text-gray-800">문헌정보학 전공</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">교직 요건</p>
                  <p className="font-medium text-gray-800">교직이수 22학점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">실습</p>
                  <p className="font-medium text-gray-800">교육실습 4주</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격 취득 경로</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">경로 1: 학부 교직이수</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 문헌정보학과 입학</li>
                    <li>• 교직과정 선발 (보통 2학년 말)</li>
                    <li>• 교직과목 22학점 + 교과교육 8학점 이수</li>
                    <li>• 교육봉사 60시간 + 교육실습 4주</li>
                    <li>• 졸업 시 사서교사 2급 정교사 자격증 취득</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">경로 2: 교육대학원</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2급 정사서 자격증 소지 (문헌정보학 학사)</li>
                    <li>• 교육대학원 사서교육전공 입학</li>
                    <li>• 석사과정 이수 (42학점 이상)</li>
                    <li>• 교육실습 4주</li>
                    <li>• 졸업 시 사서교사 2급 정교사 자격증 취득</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">경로 3: 교육부 양성과정</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 2급 정사서 자격증 소지</li>
                    <li>• 교육부 지정 사서교사 양성과정 수료</li>
                    <li>• 교직과목 및 교과교육 이수</li>
                    <li>• 교육실습 4주</li>
                    <li>• 사서교사 2급 정교사 자격증 취득</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 교직이수 핵심 과목</h2>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육학개론</p>
                  <p className="text-sm text-gray-600">교육의 기초 이론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육심리학</p>
                  <p className="text-sm text-gray-600">학습심리와 발달이론</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육과정</p>
                  <p className="text-sm text-gray-600">교육과정 설계와 운영</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육평가</p>
                  <p className="text-sm text-gray-600">평가 이론과 방법</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">교육방법 및 교육공학</p>
                  <p className="text-sm text-gray-600">교수학습 방법</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-800">독서교육론</p>
                  <p className="text-sm text-gray-600">독서지도 이론과 실제</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 임용시험 절차</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시행 기관</p>
                  <p className="font-medium text-gray-800">각 시도교육청</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시기</p>
                  <p className="font-medium text-gray-800">매년 11월 (1차), 1월 (2차)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 발표</p>
                  <p className="font-medium text-gray-800">2월 (최종)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">임용</p>
                  <p className="font-medium text-gray-800">3월 1일 발령</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시험 단계</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</span>
                    <h3 className="font-medium text-gray-800">1차 시험 (필기)</h3>
                  </div>
                  <div className="ml-10 space-y-2 text-sm text-gray-600">
                    <p><strong>교육학:</strong> 논술형 1문항 (20점)</p>
                    <p><strong>전공:</strong> 논술형 4문항 (80점)</p>
                    <p className="text-xs text-gray-500">※ 5과목: 도서관경영, 정보조직론, 정보서비스론, 독서교육론, 학교도서관운영</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</span>
                    <h3 className="font-medium text-gray-800">2차 시험 (실기·면접)</h3>
                  </div>
                  <div className="ml-10 space-y-2 text-sm text-gray-600">
                    <p><strong>수업실연:</strong> 독서교육 또는 정보활용교육 (15분)</p>
                    <p><strong>교직적성 심층면접:</strong> 교직관, 상황대처능력 평가 (20분)</p>
                    <p className="text-xs text-gray-500">※ 학습지도안 작성 능력 평가 포함</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</span>
                    <h3 className="font-medium text-gray-800">최종 합격</h3>
                  </div>
                  <div className="ml-10 space-y-2 text-sm text-gray-600">
                    <p>1차 + 2차 성적을 합산하여 선발 인원 내 최종 합격</p>
                    <p className="text-xs text-gray-500">※ 각 시도교육청별 선발 인원 상이 (보통 0~5명)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">선발 인원이 적으므로 여러 시도교육청을 동시 응시할 수 있는지 확인하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">교육학 논술은 교육학 이론을 학교도서관 상황에 적용하여 작성하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">수업실연은 학생 참여형 독서활동 또는 정보검색 실습으로 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">최근 3개년 기출문제를 분석하여 출제 경향을 파악하세요.</p>
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
