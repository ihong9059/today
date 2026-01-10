'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function YouthInstructor1ExamPage() {
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
            <Link href="/category/education/youth-instructor-1" className="text-gray-600 hover:text-green-600">청소년지도사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            <div>
              <h1 className="text-2xl font-bold">청소년지도사 1급 시험정보</h1>
              <p className="text-green-100">Youth Instructor Level 1</p>
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
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년연구방법론</p>
                      <p className="text-sm text-gray-500">연구설계, 자료수집, 분석방법, 통계기법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✊</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년인권과참여</p>
                      <p className="text-sm text-gray-500">인권 이론, 참여권, 시민교육, 참여활동</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년정책론</p>
                      <p className="text-sm text-gray-500">정책이론, 정책과정, 정책평가, 비교정책</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년기관운영</p>
                      <p className="text-sm text-gray-500">조직관리, 인사관리, 재무관리, 마케팅</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">30문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍🏫</span>
                    <div>
                      <p className="font-medium text-gray-800">청소년지도자론</p>
                      <p className="text-sm text-gray-500">지도자 역할, 리더십 이론, 전문성, 윤리</p>
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
                  <p className="text-gray-600">연구방법론은 통계 기법과 연구 설계를 중점적으로 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">청소년정책론은 최신 정책 동향과 해외 사례를 파악하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">인권과 참여 영역은 UN 아동권리협약 등 국제규범을 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">기관운영은 실무 경험을 바탕으로 이론과 연계하여 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-600">지도자론은 리더십 이론과 전문성 개발 전략을 정리하세요.</p>
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
                  <p className="font-medium text-gray-800">20~25분 내외</p>
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
                  <h3 className="font-medium text-gray-800 mb-2">청소년정책 수립 및 평가 능력</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 청소년정책 분석 및 평가 역량</li>
                    <li>• 정책 대안 개발 및 제안 능력</li>
                    <li>• 청소년정책 트렌드 이해</li>
                    <li>• 비교정책 분석 능력</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">연구 및 조사 전문성</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 연구설계 및 방법론 이해</li>
                    <li>• 자료분석 및 해석 능력</li>
                    <li>• 실태조사 기획 및 수행 역량</li>
                    <li>• 연구윤리 준수</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">기관운영 및 관리 역량</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 조직 및 인사관리 전문성</li>
                    <li>• 예산 및 재무관리 능력</li>
                    <li>• 시설운영 효율화 전략</li>
                    <li>• 품질관리 및 평가 시스템</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">리더십 및 전문성</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 청소년지도자로서 리더십</li>
                    <li>• 전문성 개발 및 역량 강화</li>
                    <li>• 네트워크 구축 및 협력</li>
                    <li>• 직업윤리 및 사명감</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 면접 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">청소년정책의 최신 동향과 이슈를 체계적으로 정리하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">본인의 실무 경험을 이론과 연계하여 구체적으로 설명하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">기관운영 및 관리에 대한 실제 사례와 개선방안을 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">청소년 참여 활성화와 권리 보장에 대한 비전을 명확히 하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-600">전문가로서의 리더십과 역량 개발 계획을 구체적으로 제시하세요.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">❓ 자주 나오는 면접 질문</h2>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년정책의 현재 문제점과 개선 방안을 제시하시오.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년 참여 활성화를 위한 구체적 전략을 설명하시오.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년기관의 효과적인 운영 방안을 논하시오.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년지도사 전문성 강화를 위한 방안은 무엇입니까?</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년 연구에서 윤리적 고려사항을 설명하시오.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">• 청소년 인권 보장을 위한 정책적 접근을 논하시오.</p>
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
