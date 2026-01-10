'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TourGuideInterpreterPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'study'>('overview');

  const examSchedule = [
    { round: '1회', registration: '2026.01.13 ~ 01.17', written: '02.22', interview: '04.05 ~ 04.12' },
    { round: '2회', registration: '2026.05.12 ~ 05.16', written: '06.21', interview: '08.02 ~ 08.09' },
  ];

  const studySubjects = [
    { name: '한국사', path: 'korean-history', icon: '📜', desc: '한국의 역사, 왕조, 주요 사건' },
    { name: '한국문화', path: 'korean-culture', icon: '🎭', desc: '전통문화, 예술, 민속, 유산' },
    { name: '관광자원해설', path: 'tourism-resources', icon: '🏛️', desc: '관광지, 명소, 자연환경 해설' },
    { name: '관광영어', path: 'tour-english', icon: '🌐', desc: '관광 통역, 영어 회화, 용어' },
    { name: '면접', path: 'practical', icon: '🎤', desc: '면접시험 대비 연습' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service" className="text-emerald-600 hover:text-emerald-800 font-medium">← 서비스 분야</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🌏</span>
            <div>
              <h1 className="text-3xl font-bold">관광통역안내사</h1>
              <p className="text-emerald-100">Tour Guide Interpreter</p>
            </div>
          </div>
          <p className="text-emerald-50 mb-6">외국인 관광객에게 한국의 역사, 문화, 관광지를 외국어로 안내하는 국가공인 전문자격</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-emerald-100">시행기관</span>
              <p className="font-bold">한국산업인력공단</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-emerald-100">시험형태</span>
              <p className="font-bold">필기 + 면접</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-emerald-100">응시언어</span>
              <p className="font-bold">영·일·중 등 11개</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-emerald-100">2024 합격률</span>
              <p className="font-bold">필기 35% / 면접 65%</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-600">80</p>
            <p className="text-sm text-gray-500">필기 문항수</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-teal-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-emerald-600">26,000원</p>
            <p className="text-sm text-gray-500">필기 응시료</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-teal-600">무관</p>
            <p className="text-sm text-gray-500">응시 자격</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>📋 자격개요</button>
          <button onClick={() => setActiveTab('schedule')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'schedule' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>📅 시험일정</button>
          <button onClick={() => setActiveTab('study')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'study' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>📖 학습하기</button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🌏 자격증 개요</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                관광통역안내사는 외국인 관광객을 대상으로 한국의 역사, 문화, 관광지를 해당 외국어로 안내하고 설명하는 국가공인 전문자격입니다.
                여행사, 호텔, 관광공사, 프리랜서 가이드 등으로 활동할 수 있습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <h3 className="font-bold text-emerald-700 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 외국인 관광객 인솔 및 안내</li>
                    <li>• 역사·문화 유적지 해설</li>
                    <li>• 통역 및 의사소통 지원</li>
                    <li>• 관광 일정 관리</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <h3 className="font-bold text-emerald-700 mb-2">진출 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 여행사 전속 가이드</li>
                    <li>• 프리랜서 관광안내원</li>
                    <li>• 호텔·리조트 컨시어지</li>
                    <li>• 한국관광공사 등 공공기관</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🌐 응시 가능 언어</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">영어</span>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">일본어</span>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium">중국어</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">불어</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">독일어</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">스페인어</span>
                <span className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">러시아어</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">이탈리아어</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">태국어</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">베트남어</span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">말레이·인도네시아어</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시험 과목</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-gray-800">1차 필기시험</h3>
                  <p className="text-sm text-gray-500">객관식 80문항 / 80분 / 과목당 40점, 평균 60점 이상</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">국사</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">관광자원해설</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">관광법규</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">관광학개론</span>
                  </div>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-bold text-gray-800">2차 면접시험</h3>
                  <p className="text-sm text-gray-500">외국어 면접 / 약 10~15분 / 60점 이상</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">외국어 구술능력</span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">관광안내 지식</span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">인성·태도</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/category/service/tour-guide/exam" className="block bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">시험 상세 안내</h2>
                  <p className="text-emerald-100">필기·면접 과목별 상세 정보 확인</p>
                </div>
                <span className="text-3xl">→</span>
              </div>
            </Link>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-emerald-200">
                      <th className="py-3 text-left text-gray-600">회차</th>
                      <th className="py-3 text-left text-gray-600">접수기간</th>
                      <th className="py-3 text-left text-gray-600">필기시험</th>
                      <th className="py-3 text-left text-gray-600">면접시험</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((schedule, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 font-bold text-emerald-600">{schedule.round}</td>
                        <td className="py-4 text-gray-600">{schedule.registration}</td>
                        <td className="py-4 text-gray-600">{schedule.written}</td>
                        <td className="py-4 text-gray-600">{schedule.interview}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">⚠️ 유의사항</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 원서접수는 Q-Net(큐넷)에서 온라인으로 진행됩니다</li>
                <li>• 필기시험 합격 후 2년간 필기시험이 면제됩니다</li>
                <li>• 면접시험은 응시 외국어로 진행됩니다</li>
                <li>• 시험 일정은 변경될 수 있으니 Q-Net에서 확인하세요</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studySubjects.map((subject, index) => (
                <Link key={index} href={`/category/service/tour-guide/study/${subject.path}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group">
                  <span className="text-4xl mb-4 block">{subject.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.desc}</p>
                  <div className="mt-4 text-emerald-600 font-medium text-sm">학습하기 →</div>
                </Link>
              ))}
            </div>

            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 추천 학습 순서</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-4 py-2 bg-white rounded-full text-emerald-700 font-medium">1. 한국사</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-emerald-700 font-medium">2. 한국문화</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-emerald-700 font-medium">3. 관광자원해설</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-emerald-700 font-medium">4. 관광영어</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-emerald-700 font-medium">5. 면접</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
