'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HotelAdminExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '호텔실무론', questions: 20, topics: ['프런트오피스', '하우스키핑', 'F&B 기초', '객실관리', '호텔 조직'], tips: '각 부서별 업무 흐름을 이해하세요.', passRate: 48 },
    { name: '고객서비스론', questions: 20, topics: ['서비스 마인드', '고객 응대', '불만 처리', 'MOT 관리', '서비스 품질'], tips: '실제 상황별 응대 방법을 숙지하세요.', passRate: 52 },
    { name: '호텔영어', questions: 20, topics: ['예약 표현', '체크인/아웃', '안내 표현', '불만 응대', '전화 영어'], tips: '호텔 상황별 영어 표현을 암기하세요.', passRate: 45 },
  ];

  const practicalTopics = [
    { name: '프런트 업무', desc: '체크인/아웃 절차, 예약 관리, 고객 응대', weight: '30%' },
    { name: '하우스키핑', desc: '객실 점검, 청소 기준, 린넨 관리', weight: '25%' },
    { name: 'F&B 서비스', desc: '레스토랑 서비스, 연회 진행, 룸서비스', weight: '25%' },
    { name: '고객 관리', desc: '불만 처리, VIP 응대, 상황 대처', weight: '20%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/hotel-admin" className="text-rose-600 hover:text-rose-800 font-medium">← 호텔관리사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🛎️ 호텔관리사 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-rose-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-rose-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-50'}`}>📋 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-rose-50 rounded-xl p-4"><p className="text-rose-600 font-bold text-2xl">60문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-rose-50 rounded-xl p-4"><p className="text-rose-600 font-bold text-2xl">60분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-rose-50 rounded-xl p-4"><p className="text-rose-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-rose-50 rounded-xl p-4"><p className="text-rose-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">4지선다</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-3"><p className="text-sm text-rose-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-rose-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/hotel-admin/study/front-office" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">프런트오피스</Link>
                <Link href="/category/service/hotel-admin/study/housekeeping" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">하우스키핑</Link>
                <Link href="/category/service/hotel-admin/study/fb-service" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">F&B서비스</Link>
                <Link href="/category/service/hotel-admin/study/hotel-english" className="py-3 px-4 bg-rose-100 text-rose-700 rounded-xl text-center font-medium hover:bg-rose-200 transition">호텔영어</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>호텔 각 부서별 업무 절차를 정확히 숙지하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>고객 서비스 상황별 대응 방법을 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>호텔 영어 표현을 상황별로 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제를 반복 풀이하여 출제 경향을 파악하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">필답형</p><p className="text-sm text-gray-500">시험 유형</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">2시간 30분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-pink-50 rounded-xl p-4"><p className="text-pink-600 font-bold text-2xl">서술형</p><p className="text-sm text-gray-500">답변 형식</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 평가 영역</h2>
              <div className="space-y-4">
                {practicalTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                    <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{topic.name}</h3><p className="text-sm text-gray-500">{topic.desc}</p></div>
                    <div className="text-right"><p className="text-pink-600 font-bold">{topic.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자주 출제되는 실기 문제</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">프런트 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 체크인 절차 설명</li><li>• 예약 변경 처리</li><li>• 오버부킹 대응</li><li>• VIP 고객 응대</li></ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">하우스키핑</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 객실 청소 순서</li><li>• 품질 점검 체크리스트</li><li>• 분실물 처리</li><li>• 린넨 관리</li></ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">F&B 서비스</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 테이블 세팅</li><li>• 주문 접수 절차</li><li>• 연회 진행</li><li>• 룸서비스 운영</li></ul>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h3 className="font-bold text-pink-700 mb-2">고객 관리</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 불만 고객 응대</li><li>• 응급 상황 대처</li><li>• 고객 피드백 처리</li><li>• 서비스 회복</li></ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/hotel-admin/study/practical" className="block py-4 px-6 bg-pink-100 text-pink-700 rounded-xl text-center font-medium hover:bg-pink-200 transition">실기 문제 풀기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>업무 절차를 단계별로 명확히 서술하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>고객 응대 시 예의와 전문성을 강조하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>문제 해결 시 대안과 후속 조치를 포함하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>호텔 전문 용어를 적절히 활용하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
