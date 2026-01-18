'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HazardousCraftsmanExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '일반화학',
      questions: 20,
      topics: ['원자와 분자', '화학반응', '산과 염기', '산화와 환원', '기체의 성질', '용액과 농도'],
      difficulty: 3,
      passRate: '52%',
      href: '/category/safety/hazardous-craftsman/study/general-chemistry'
    },
    {
      name: '화재예방과 소화방법',
      questions: 20,
      topics: ['연소의 조건', '연소의 종류', '소화의 원리', '소화약제', '소화설비', '화재 분류'],
      difficulty: 2,
      passRate: '58%',
      href: '/category/safety/hazardous-craftsman/study/fire-prevention'
    },
    {
      name: '위험물의 성질과 취급',
      questions: 20,
      topics: ['위험물 분류', '1류~6류 성질', '저장 기준', '취급 방법', '운반 기준', '표지 및 게시판'],
      difficulty: 3,
      passRate: '48%',
      href: '/category/safety/hazardous-craftsman/study/hazardous-properties'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-red-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-red-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-craftsman" className="text-gray-600 hover:text-red-600">위험물기능사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/safety/hazardous-craftsman" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-4">
            ← 위험물기능사 메인으로
          </Link>
          <h1 className="text-3xl font-bold">위험물기능사 시험 정보</h1>
          <p className="text-red-100 mt-2">Craftsman Hazardous Materials Exam Guide</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('written')}
              className={`flex-1 py-4 text-center font-medium transition ${
                activeTab === 'written'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`flex-1 py-4 text-center font-medium transition ${
                activeTab === 'practical'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🔧 실기시험
            </button>
          </div>

          {activeTab === 'written' && (
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                  <p className="text-sm text-red-600">문항 수</p>
                  <p className="text-2xl font-bold text-red-700">60문항</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                  <p className="text-sm text-orange-600">시험 시간</p>
                  <p className="text-2xl font-bold text-orange-700">60분</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                  <p className="text-sm text-yellow-600">합격 기준</p>
                  <p className="text-2xl font-bold text-yellow-700">60점 이상</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <p className="text-sm text-green-600">시험 방식</p>
                  <p className="text-2xl font-bold text-green-700">CBT</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">과목별 상세</h3>
              <div className="space-y-4">
                {writtenSubjects.map((subject, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">{i + 1}</span>
                        <div>
                          <h4 className="font-bold text-gray-800">{subject.name}</h4>
                          <p className="text-sm text-gray-500">{subject.questions}문항 출제</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">합격률 {subject.passRate}</p>
                        </div>
                        <Link href={subject.href} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition">
                          학습하기
                        </Link>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-2">주요 출제 토픽</p>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, j) => (
                          <span key={j} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{topic}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  <span>💡</span> 필기시험 합격 전략
                </h3>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• <strong>위험물 분류표:</strong> 1~6류 위험물 분류 기준과 대표 물질 완벽 암기</li>
                  <li>• <strong>소화약제:</strong> 각 위험물에 적합한 소화약제 표 숙지</li>
                  <li>• <strong>화학 기초:</strong> 원소 기호, 화학식, 기본 계산 문제 연습</li>
                  <li>• <strong>기출문제:</strong> 최근 5개년 기출문제 반복 풀이</li>
                  <li>• <strong>CBT 적응:</strong> 컴퓨터 시험 방식에 미리 적응하기</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'practical' && (
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                  <p className="text-sm text-red-600">시험 형태</p>
                  <p className="text-2xl font-bold text-red-700">필답형</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                  <p className="text-sm text-orange-600">시험 시간</p>
                  <p className="text-2xl font-bold text-orange-700">1시간 30분</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                  <p className="text-sm text-yellow-600">합격 기준</p>
                  <p className="text-2xl font-bold text-yellow-700">60점 이상</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <p className="text-sm text-green-600">2024 합격률</p>
                  <p className="text-2xl font-bold text-green-700">52%</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">실기시험 출제 범위</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-gray-800 mb-4">위험물 취급 실무</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">위험물 관리</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 위험물 분류 및 성상 판단</li>
                      <li>• 저장·취급 기준 적용</li>
                      <li>• 위험물 표지 및 게시판</li>
                      <li>• 운반 용기 기준</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">안전관리</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 소화설비 운용</li>
                      <li>• 화재 예방 조치</li>
                      <li>• 누출 시 응급조치</li>
                      <li>• 안전 점검 사항</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">계산 문제</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 저장량 계산</li>
                      <li>• 보유공지 계산</li>
                      <li>• 소화설비 용량 계산</li>
                      <li>• 농도 및 비중 계산</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-800 mb-2">법규 적용</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 제조소 설치 기준</li>
                      <li>• 옥내저장소 기준</li>
                      <li>• 옥외저장소 기준</li>
                      <li>• 이동탱크저장소 기준</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link
                href="/category/safety/hazardous-craftsman/study/practical"
                className="block w-full text-center py-4 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 transition"
              >
                실기시험 학습하기 →
              </Link>

              <div className="mt-8 bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <span>⚠️</span> 실기시험 주의사항
                </h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• <strong>서술형 답안:</strong> 핵심 키워드를 포함하여 명확하게 작성</li>
                  <li>• <strong>계산 문제:</strong> 풀이 과정과 단위까지 정확히 기재</li>
                  <li>• <strong>법규 문제:</strong> 정확한 수치와 기준 암기 필수</li>
                  <li>• <strong>시간 배분:</strong> 1시간 30분 내에 모든 문제 답변</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">2025년 시험 일정</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">시험 구분</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">접수 기간</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">시험 일정</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">합격 발표</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">필기 (CBT)</td>
                  <td className="px-4 py-3 text-gray-600">상시 접수</td>
                  <td className="px-4 py-3 text-gray-600">상시 시험</td>
                  <td className="px-4 py-3 text-gray-600">시험 직후 발표</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">실기</td>
                  <td className="px-4 py-3 text-gray-600">분기별 접수</td>
                  <td className="px-4 py-3 text-gray-600">분기별 시행</td>
                  <td className="px-4 py-3 text-gray-600">시험 후 약 2주</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ※ 정확한 일정은 <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Q-Net</a>에서 확인하세요.
          </p>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
