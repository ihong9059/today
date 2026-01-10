'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GasTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/gas-technician" className="text-gray-600 hover:text-red-600">가스산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">{activeTab === 'written' ? '필기시험' : '실기시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🔥</span>
            <div>
              <h1 className="text-2xl font-bold">가스산업기사 시험정보</h1>
              <p className="text-red-100">Industrial Engineer Gas</p>
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
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-2.5 rounded-lg font-medium transition ${
              activeTab === 'practical'
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔧 실기시험
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
                  <p className="font-medium text-gray-800">과목당 20문항 (총 60문항)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">2시간</p>
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
                    <span className="text-2xl">🔥</span>
                    <div>
                      <p className="font-medium text-gray-800">연소공학</p>
                      <p className="text-sm text-gray-500">연소 이론, 화염 특성, 폭발 현상</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <p className="font-medium text-gray-800">가스설비</p>
                      <p className="text-sm text-gray-500">고압가스설비, LPG설비, 도시가스설비</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <p className="font-medium text-gray-800">가스안전관리</p>
                      <p className="text-sm text-gray-500">안전장치, 가스누출검지, 법규</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">20문항</span>
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
                      <td className="py-3 px-4">2월</td>
                      <td className="py-3 px-4">3월</td>
                      <td className="py-3 px-4">4월</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">2회</td>
                      <td className="py-3 px-4">4월</td>
                      <td className="py-3 px-4">5월</td>
                      <td className="py-3 px-4">6월</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">3회</td>
                      <td className="py-3 px-4">7월</td>
                      <td className="py-3 px-4">8월</td>
                      <td className="py-3 px-4">9월</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 필기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">연소공학은 화학반응식과 폭발한계를 정확히 암기하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">가스설비는 각 설비의 구조와 작동원리를 그림과 함께 학습하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">가스안전관리는 고압가스안전관리법 핵심 조항을 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">기출문제를 반복 풀이하며 출제 경향을 파악하세요.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 형태</p>
                  <p className="font-medium text-gray-800">필답형</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 시간</p>
                  <p className="font-medium text-gray-800">2시간 30분</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">합격 기준</p>
                  <p className="font-medium text-gray-800">60점 이상</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">시험 과목</p>
                  <p className="font-medium text-gray-800">가스설비 실무</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 내용</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">주요 출제 영역</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 가스설비 설계 및 계산 (배관 직경, 압력 계산)</li>
                    <li>• 안전장치 선정 및 설치 (압력조정기, 안전밸브)</li>
                    <li>• 가스누출 검지 및 대응</li>
                    <li>• 가스사고 사례 분석 및 대책</li>
                    <li>• 고압가스안전관리법 적용</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">자주 출제되는 유형</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 배관 직경 계산 (가스 유량, 압력강하)</li>
                    <li>• 저장탱크 용량 계산</li>
                    <li>• 안전거리 산정</li>
                    <li>• 밸브 및 부속품 선정</li>
                    <li>• 가스설비 점검표 작성</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기시험 준비 팁</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-600">배관 설계 계산식(Weymouth, Panhandle)을 완벽히 숙지하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-600">단위 환산(m³, L, kg 등)을 정확히 할 수 있어야 합니다.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-600">고압가스안전관리법 시행규칙의 기술기준을 암기하세요.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-600">과거 기출문제를 통해 계산 문제를 반복 연습하세요.</p>
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
