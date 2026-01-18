'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BarberPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'study'>('overview');

  const examSchedule = [
    { round: '1회', registration: '2026.01.06 ~ 01.09', written: '02.08', practical: '03.15 ~ 03.28' },
    { round: '2회', registration: '2026.04.14 ~ 04.17', written: '05.17', practical: '06.21 ~ 07.04' },
    { round: '3회', registration: '2026.06.23 ~ 06.26', written: '07.26', practical: '08.30 ~ 09.12' },
  ];

  const studySubjects = [
    { name: '이용이론', path: 'barber-theory', icon: '📚', desc: '이용의 역사, 위생, 피부·모발학' },
    { name: '커트기법', path: 'hair-cutting', icon: '✂️', desc: '클리퍼, 시저스, 레이어 커트' },
    { name: '헤어디자인', path: 'hair-design', icon: '💈', desc: '얼굴형별 디자인, 트렌드 스타일' },
    { name: '면도·관리', path: 'shave-care', icon: '🪒', desc: '면도 기법, 두피·피부 관리' },
    { name: '실기', path: 'practical', icon: '🎯', desc: '실기시험 과제 연습' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service" className="text-slate-600 hover:text-slate-800 font-medium">← 서비스 분야</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-700 to-blue-800 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">💈</span>
            <div>
              <h1 className="text-3xl font-bold">이용사</h1>
              <p className="text-slate-200">Barber License</p>
            </div>
          </div>
          <p className="text-slate-100 mb-6">남성 헤어 커트, 면도, 두피 관리 등 이용 서비스 전문가 국가기술자격</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-slate-200">시행기관</span>
              <p className="font-bold">한국산업인력공단</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-slate-200">시험형태</span>
              <p className="font-bold">필기 + 실기</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-slate-200">필기시간</span>
              <p className="font-bold">60분</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="text-sm text-slate-200">2024 합격률</span>
              <p className="font-bold">필기 48% / 실기 42%</p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-slate-700">60</p>
            <p className="text-sm text-gray-500">필기 문항수</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">60점</p>
            <p className="text-sm text-gray-500">합격 기준</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-slate-700">14,500원</p>
            <p className="text-sm text-gray-500">필기 응시료</p>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-blue-600">무관</p>
            <p className="text-sm text-gray-500">응시 자격</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'overview' ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>📋 자격개요</button>
          <button onClick={() => setActiveTab('schedule')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'schedule' ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>📅 시험일정</button>
          <button onClick={() => setActiveTab('study')} className={`px-6 py-3 rounded-xl font-bold transition whitespace-nowrap ${activeTab === 'study' ? 'bg-slate-700 text-white' : 'bg-white text-gray-600 hover:bg-slate-50'}`}>📖 학습하기</button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💈 자격증 개요</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                이용사는 남성 헤어 커트, 면도, 두피 관리 등 이용 서비스 전반에 관한 전문 기술을 평가하는 국가기술자격입니다.
                이용실, 바버샵, 호텔, 방송·영화 현장 등에서 활동할 수 있습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-700 mb-2">주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 남성 헤어 커트 및 스타일링</li>
                    <li>• 면도 및 수염 관리</li>
                    <li>• 두피 관리 및 샴푸</li>
                    <li>• 헤어 디자인 상담</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-700 mb-2">진출 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 이용실, 바버샵 운영</li>
                    <li>• 호텔, 리조트 이용실</li>
                    <li>• 방송·영화 헤어팀</li>
                    <li>• 이용 교육 강사</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시험 과목</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-slate-500 pl-4">
                  <h3 className="font-bold text-gray-800">필기시험</h3>
                  <p className="text-sm text-gray-500">객관식 60문항 / 60분 / 60점 이상 합격</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">이용이론</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">피부학</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">공중위생학</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">소독학</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-bold text-gray-800">실기시험</h3>
                  <p className="text-sm text-gray-500">작업형 / 약 1시간 30분 / 60점 이상 합격</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">기본 커트</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">스포츠 커트</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">면도</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">아이롱</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/category/service/barber/exam" className="block bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl p-6 text-white hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">시험 상세 안내</h2>
                  <p className="text-slate-200">필기·실기 과목별 상세 정보 확인</p>
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
                    <tr className="border-b-2 border-slate-200">
                      <th className="py-3 text-left text-gray-600">회차</th>
                      <th className="py-3 text-left text-gray-600">접수기간</th>
                      <th className="py-3 text-left text-gray-600">필기시험</th>
                      <th className="py-3 text-left text-gray-600">실기시험</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((schedule, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 font-bold text-slate-700">{schedule.round}</td>
                        <td className="py-4 text-gray-600">{schedule.registration}</td>
                        <td className="py-4 text-gray-600">{schedule.written}</td>
                        <td className="py-4 text-gray-600">{schedule.practical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">⚠️ 유의사항</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 원서접수는 Q-Net(큐넷)에서 온라인으로 진행됩니다</li>
                <li>• 필기시험 합격 후 2년간 필기시험이 면제됩니다</li>
                <li>• 실기시험은 지정된 장소에서 실시됩니다</li>
                <li>• 시험 일정은 변경될 수 있으니 Q-Net에서 확인하세요</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'study' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studySubjects.map((subject, index) => (
                <Link key={index} href={`/category/service/barber/study/${subject.path}`} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group">
                  <span className="text-4xl mb-4 block">{subject.icon}</span>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-slate-600">{subject.name}</h3>
                  <p className="text-sm text-gray-500">{subject.desc}</p>
                  <div className="mt-4 text-slate-600 font-medium text-sm">학습하기 →</div>
                </Link>
              ))}
            </div>

            <div className="bg-gradient-to-r from-slate-100 to-blue-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 추천 학습 순서</h2>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-4 py-2 bg-white rounded-full text-slate-700 font-medium">1. 이용이론</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-slate-700 font-medium">2. 커트기법</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-slate-700 font-medium">3. 헤어디자인</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-slate-700 font-medium">4. 면도·관리</span>
                <span className="text-gray-400">→</span>
                <span className="px-4 py-2 bg-white rounded-full text-slate-700 font-medium">5. 실기</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
