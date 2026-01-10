'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KindergartenTeacherExamPage() {
  const [activeTab, setActiveTab] = useState<'exam' | 'certificate' | 'career'>('exam');

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
            <Link href="/category/education/kindergarten-teacher" className="text-gray-600 hover:text-indigo-600">유치원정교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">자격정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🧒</span>
            <div>
              <h1 className="text-2xl font-bold">유치원정교사 자격정보</h1>
              <p className="text-indigo-100">Kindergarten Teacher Certificate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'exam'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 임용시험
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'certificate'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📜 자격증
          </button>
          <button
            onClick={() => setActiveTab('career')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'career'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            💼 진로
          </button>
        </div>

        {activeTab === 'exam' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 임용시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 주관</p>
                  <p className="font-medium text-gray-800">각 시도교육청</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시기</p>
                  <p className="font-medium text-gray-800">매년 1회 (11월 공고, 1~2월 시험)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">응시 자격</p>
                  <p className="font-medium text-gray-800">유치원 2급 정교사 자격증 소지자</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 후</p>
                  <p className="font-medium text-gray-800">공립 유치원 교사 발령</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 1차 시험 (필기)</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">교육학 (논술형)</h3>
                    <span className="text-sm text-gray-500">총 4문항</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유아교육론 - 유아교육 철학, 역사, 사상가</li>
                    <li>• 유아발달 - 발달이론, 영역별 발달</li>
                    <li>• 유아교육과정 - 누리과정, 교육과정 운영</li>
                    <li>• 유아교육방법론 - 놀이, 교수학습 방법</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">교과교육학 (서술형)</h3>
                    <span className="text-sm text-gray-500">총 8문항</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 신체운동·건강 영역</li>
                    <li>• 의사소통 영역</li>
                    <li>• 사회관계 영역</li>
                    <li>• 예술경험 영역</li>
                    <li>• 자연탐구 영역</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 2차 시험 (면접·실기)</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">교직 적성 심층 면접</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 교직관 및 유아교육관</li>
                    <li>• 교육 상황 문제 해결 능력</li>
                    <li>• 의사소통 능력 및 태도</li>
                    <li>• 인성 및 가치관</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">수업 실연 (지역별 상이)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 주어진 주제로 수업 시연</li>
                    <li>• 교구 제작 및 활용</li>
                    <li>• 유아와의 상호작용</li>
                    <li>• 수업 평가 및 반성</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">1차 논술형 시험은 기출문제 분석과 답안 작성 연습이 핵심입니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">누리과정 5개 영역의 내용을 정확히 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">최근 유아교육 이슈와 정책 동향을 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">2차 면접은 모의 면접 연습을 충분히 하고, 교육관을 명확히 정리하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'certificate' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📜 자격증 종류</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">유치원 2급 정교사</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>자격 요건:</strong> 유아교육과 졸업 (전문대 또는 4년제)</p>
                    <p><strong>교직 이수:</strong> 교직 과목 이수 + 교육실습 4주</p>
                    <p><strong>발급 기관:</strong> 교육부 (대학에서 일괄 신청)</p>
                    <p><strong>효력:</strong> 사립 유치원 교사 자격, 임용시험 응시 자격</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">유치원 1급 정교사</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>자격 요건:</strong> 2급 정교사 자격 + 3년 이상 경력</p>
                    <p><strong>연수:</strong> 승급연수 180시간 이수</p>
                    <p><strong>신청:</strong> 시도교육청 또는 대학 연수원</p>
                    <p><strong>효력:</strong> 원감·원장 자격 취득 시 우대</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격증 취득 과정</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">유아교육과 입학</p>
                    <p className="text-sm text-gray-600">전문대(3년) 또는 4년제 대학</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">교직 과목 이수</p>
                    <p className="text-sm text-gray-600">교육학개론, 교육심리, 교육과정 등</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">전공 필수 이수</p>
                    <p className="text-sm text-gray-600">유아교육론, 유아발달, 놀이지도 등</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">교육실습 4주</p>
                    <p className="text-sm text-gray-600">유치원 현장실습 (보통 4학년)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">5</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">졸업 및 자격증 신청</p>
                    <p className="text-sm text-gray-600">대학에서 일괄 신청 또는 개별 신청</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ 주의사항</h2>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>학점은행제 주의:</strong> 학점은행제로는 유치원 정교사 자격을 취득할 수 없습니다.
                    반드시 유아교육과가 개설된 대학(전문대 또는 4년제)을 졸업해야 합니다.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>교육실습:</strong> 반드시 정식 유치원에서 4주간 실습해야 하며, 어린이집 실습은 인정되지 않습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💼 진로 및 취업</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">취업 분야</p>
                  <p className="font-medium text-gray-800">공립·사립 유치원, 어린이집</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">평균 연봉</p>
                  <p className="font-medium text-gray-800">공립 3,000~4,500만원 (호봉제)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">고용 안정성</p>
                  <p className="font-medium text-gray-800">공립 매우 높음 / 사립 중간</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">승진 경로</p>
                  <p className="font-medium text-gray-800">교사 → 원감 → 원장</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏫 주요 취업처</h2>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">공립 유치원</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>장점:</strong> 안정적 고용, 호봉제 급여, 공무원 연금</li>
                    <li>• <strong>단점:</strong> 임용시험 경쟁률 높음 (평균 5~10:1)</li>
                    <li>• <strong>진입:</strong> 교육청 임용시험 합격 필수</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">사립 유치원</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• <strong>장점:</strong> 자격증만으로 지원 가능, 채용 기회 많음</li>
                    <li>• <strong>단점:</strong> 급여·복지 유치원마다 차이</li>
                    <li>• <strong>진입:</strong> 2급 정교사 자격증 필수</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">어린이집 (원장 자격)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유치원 정교사 자격 + 1년 경력 → 어린이집 원장 자격 신청 가능</li>
                    <li>• 어린이집 교사는 보육교사 자격이 별도로 필요</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">기타 진로</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유아교육 연구기관 (육아정책연구소 등)</li>
                    <li>• 유아교육 관련 출판·교구 개발</li>
                    <li>• 대학원 진학 후 유아교육과 교수</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📈 전망 및 특징</h2>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>✅ 긍정 요소:</strong> 저출산에도 불구하고 국공립 유치원 확대 정책으로 공립 임용 TO는 유지되는 편입니다.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>✅ 안정성:</strong> 공립 유치원 교사는 공무원 신분으로 고용 안정성이 매우 높습니다.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>⚠️ 경쟁:</strong> 임용시험 경쟁률이 높아 충분한 준비 기간이 필요합니다.
                  </p>
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
