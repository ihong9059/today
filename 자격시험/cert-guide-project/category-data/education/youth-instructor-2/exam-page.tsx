'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function YouthInstructorExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-green-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor" className="text-gray-600 hover:text-green-600">청소년지도사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            <div>
              <h1 className="text-2xl font-bold">청소년지도사 2급 시험정보</h1>
              <p className="text-green-100">Youth Instructor Level 2</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'interview'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎯 면접시험
          </button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">객관식 5지선다형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">문항 수</p>
                  <p className="font-medium text-gray-800">과목당 30문항 (총 150문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">150분 (2시간 30분)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">과목당 40점 이상, 평균 60점 이상</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년육성제도론</p>
                      <p className="text-sm text-gray-500">청소년기본법, 청소년활동진흥법, 청소년복지지원법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년지도방법론</p>
                      <p className="text-sm text-gray-500">프로그램 개발, 운영, 평가, 지도방법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년심리및상담</p>
                      <p className="text-sm text-gray-500">발달이론, 상담이론, 집단상담, 위기상담</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎭</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년문화</p>
                      <p className="text-sm text-gray-500">문화이론, 청소년 하위문화, 미디어 문화</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚽</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년활동</p>
                      <p className="text-sm text-gray-500">수련활동, 교류활동, 문화활동, 봉사활동</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">회차</th>
                      <th className="text-left py-3 px-4">원서접수</th>
                      <th className="text-left py-3 px-4">시험일</th>
                      <th className="text-left py-3 px-4">합격발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">1회</td>
                      <td className="py-3 px-4">4월</td>
                      <td className="py-3 px-4">5월</td>
                      <td className="py-3 px-4">6월</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">9월</td>
                      <td className="py-3 px-4">10월</td>
                      <td className="py-3 px-4">11월</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 필기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">청소년 관련 법령을 정확히 숙지하고 최신 개정사항을 확인하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">발달이론과 상담이론의 주요 학자와 핵심개념을 정리하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">프로그램 개발 및 평가 절차를 단계별로 이해하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">기출문제를 반복 학습하여 출제 경향을 파악하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 면접시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">구술면접</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">15~20분 내외</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">60점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">면접위원</p>
                  <p className="font-medium text-gray-800">3~5명</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 면접 평가 영역</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">청소년지도 전문성</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 청소년 관련 법령 및 제도 이해도</li>
                    <li>• 청소년활동 프로그램 기획 및 운영 능력</li>
                    <li>• 청소년 발달 및 심리 이해</li>
                    <li>• 청소년 상담 이론 및 실제</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">실무능력 및 자질</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 청소년지도자로서의 사명감과 열정</li>
                    <li>• 의사소통 능력 및 대인관계</li>
                    <li>• 문제해결 능력 및 창의성</li>
                    <li>• 직업윤리 및 봉사정신</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">현장실무 적용</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 위기청소년 대응 능력</li>
                    <li>• 청소년 수련시설 운영 이해</li>
                    <li>• 청소년활동 안전관리</li>
                    <li>• 청소년 참여 활성화 방안</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 면접 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">청소년지도사로서의 사명감과 비전을 명확히 정리하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">최근 청소년 관련 이슈와 정책 동향을 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">자신의 경험을 바탕으로 구체적인 사례를 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">모의면접을 통해 답변을 간결하고 논리적으로 구성하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-600">청소년 수련활동 안전관리 및 위기대응 방안을 숙지하세요.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">❓ 자주 나오는 면접 질문</h2>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년지도사가 되고자 하는 동기는 무엇입니까?</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년기의 특성과 발달과업에 대해 설명하시오.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 위기청소년 상담 시 어떻게 접근하시겠습니까?</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년활동 프로그램을 기획해본 경험이 있습니까?</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년지도사로서 갖추어야 할 자질은 무엇입니까?</p>
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
