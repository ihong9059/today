'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function YouthCounselorExamPage() {
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-emerald-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-counselor" className="text-gray-600 hover:text-emerald-600">청소년상담사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-500 to-green-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">💚</span>
            <div>
              <h1 className="text-2xl font-bold">청소년상담사 3급 시험정보</h1>
              <p className="text-emerald-100">Youth Counselor Level 3</p>
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
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'interview'
                ? 'bg-emerald-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎤 면접시험
          </button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">객관식 4지선다형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">문항 수</p>
                  <p className="font-medium text-gray-800">과목당 25문항 (총 125문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">2시간 30분</p>
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
                    <span className="text-2xl">🧠</span>
                    <div>
                      <p className="font-medium text-gray-800">발달심리</p>
                      <p className="text-sm text-gray-500">청소년기 신체·인지·정서·사회성 발달</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-medium text-gray-800">집단상담의 기초</p>
                      <p className="text-sm text-gray-500">집단역동, 집단과정, 집단상담 기법</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-medium text-gray-800">심리측정 및 평가</p>
                      <p className="text-sm text-gray-500">심리검사 이론, 지능검사, 성격검사, 투사검사</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💭</span>
                    <div>
                      <p className="font-medium text-gray-800">상담이론</p>
                      <p className="text-sm text-gray-500">정신분석, 인간중심, 인지행동, 게슈탈트 등</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-medium text-gray-800">학습이론</p>
                      <p className="text-sm text-gray-500">행동주의, 인지주의, 사회학습이론, 동기이론</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">25문항</span>
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
                      <td className="py-3 px-4">3월</td>
                      <td className="py-3 px-4">4월</td>
                      <td className="py-3 px-4">5월</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">7월</td>
                      <td className="py-3 px-4">8월</td>
                      <td className="py-3 px-4">9월</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎓 응시자격 (3급 기준)</h2>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-emerald-600">✓</span>
                  <p className="text-gray-700">대학 졸업(예정)자 또는 이와 동등한 학력 소지자</p>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-emerald-600">✓</span>
                  <p className="text-gray-700">전문대학 졸업 후 청소년 관련 분야 1년 이상 실무경력자</p>
                </div>
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-emerald-600">✓</span>
                  <p className="text-gray-700">고졸 후 청소년 관련 분야 3년 이상 실무경력자</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 면접시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">집단면접 + 개별면접</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">약 30분</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">60점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">응시자격</p>
                  <p className="font-medium text-gray-800">필기시험 합격자</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 면접시험 평가항목</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">상담 전문성 (40점)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 상담이론 및 기법에 대한 이해도</li>
                    <li>• 청소년 발달특성 및 심리 이해</li>
                    <li>• 상담 윤리 및 전문성</li>
                    <li>• 상담 사례에 대한 이해와 대처능력</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">의사소통능력 (30점)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 경청 및 공감 능력</li>
                    <li>• 명확하고 논리적인 의사표현</li>
                    <li>• 비언어적 의사소통 (표정, 자세, 목소리)</li>
                    <li>• 질문에 대한 이해 및 적절한 응답</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">인성 및 자질 (30점)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 청소년상담사로서의 열정과 사명감</li>
                    <li>• 진정성, 수용성, 존중감</li>
                    <li>• 자기 성찰 능력</li>
                    <li>• 문제해결 및 판단 능력</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 면접시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">주요 상담이론의 핵심 개념과 기법을 명확하게 설명할 수 있도록 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">청소년 상담 사례를 분석하고 적절한 개입 방법을 제시할 수 있어야 합니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">상담사로서의 윤리강령과 자세에 대해 깊이 이해하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">자신의 상담 경험이나 관심분야에 대해 구체적으로 이야기할 수 있도록 준비하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                  <p className="text-gray-600">경청하는 자세, 따뜻한 미소, 적절한 아이컨택 등 비언어적 소통에도 신경 쓰세요.</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-emerald-800 mb-4">📌 주요 예상 질문</h2>
              <div className="space-y-2 text-sm">
                <p className="text-emerald-700">• 청소년상담사가 되려는 동기는 무엇입니까?</p>
                <p className="text-emerald-700">• 자신의 상담 스타일이나 선호하는 상담이론은 무엇입니까?</p>
                <p className="text-emerald-700">• 청소년 내담자가 상담을 거부할 때 어떻게 대처하시겠습니까?</p>
                <p className="text-emerald-700">• 상담사로서 가장 중요한 자질은 무엇이라고 생각합니까?</p>
                <p className="text-emerald-700">• 자해나 자살 위기 청소년을 만났을 때 어떻게 대처하시겠습니까?</p>
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
