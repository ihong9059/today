'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConventionPlanner1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    { name: '컨벤션산업론', questions: 25, topics: ['MICE 산업 개념', '컨벤션 유형', '산업 현황', '트렌드 분석', '정책·제도'], tips: '산업 전반의 구조와 흐름을 파악하세요.', passRate: 35 },
    { name: '컨벤션마케팅론', questions: 25, topics: ['마케팅 전략', '홍보·PR', '참가자 유치', '스폰서십', '디지털 마케팅'], tips: '실제 마케팅 사례를 분석해보세요.', passRate: 32 },
    { name: '컨벤션실무론', questions: 25, topics: ['기획 프로세스', '예산 관리', '운영 매뉴얼', '위기 관리', '평가·분석'], tips: '실무 절차를 단계별로 암기하세요.', passRate: 30 },
    { name: '국제회의론', questions: 25, topics: ['국제기구', '유치 전략', '개최 절차', '의전·프로토콜', '사후 관리'], tips: '국제회의 유치 사례를 학습하세요.', passRate: 28 },
  ];

  const practicalTopics = [
    { name: '기획서 구성', desc: '목차, 개요, 목적, 기대효과 작성', weight: '20%' },
    { name: '프로그램 기획', desc: '세션 구성, 시간표, 참가자 관리', weight: '25%' },
    { name: '예산 수립', desc: '수입·지출 계획, 원가 분석', weight: '20%' },
    { name: '마케팅 계획', desc: '홍보 전략, 참가자 유치 방안', weight: '20%' },
    { name: '운영 계획', desc: '인력 배치, 시설·장비, 위기 관리', weight: '15%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/convention-planner-1" className="text-purple-600 hover:text-purple-800 font-medium">← 컨벤션기획사1급</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎪 컨벤션기획사1급 시험 안내</h1>
          <p className="text-gray-500">필기시험과 실기시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('practical')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'practical' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}>📋 실기시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-purple-50 rounded-xl p-4"><p className="text-purple-600 font-bold text-2xl">100문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-purple-50 rounded-xl p-4"><p className="text-purple-600 font-bold text-2xl">150분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-purple-50 rounded-xl p-4"><p className="text-purple-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준 (과목별 40점)</p></div>
                <div className="bg-purple-50 rounded-xl p-4"><p className="text-purple-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">4지선다</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3"><p className="text-sm text-purple-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-purple-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/category/service/convention-planner-1/study/convention-overview" className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-medium hover:bg-purple-200 transition">컨벤션 개론</Link>
                <Link href="/category/service/convention-planner-1/study/marketing-promotion" className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-medium hover:bg-purple-200 transition">마케팅·홍보</Link>
                <Link href="/category/service/convention-planner-1/study/operation-management" className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-medium hover:bg-purple-200 transition">운영관리</Link>
                <Link href="/category/service/convention-planner-1/study/international-convention" className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-medium hover:bg-purple-200 transition">국제회의론</Link>
                <Link href="/category/service/convention-planner-1/study/practical" className="py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-medium hover:bg-purple-200 transition">실기시험</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>MICE 산업 개념과 구조를 확실히 이해하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>국내외 컨벤션 유치 사례를 학습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>마케팅 이론과 실무 적용 사례를 연결하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제 분석으로 출제 경향을 파악하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practical' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-indigo-50 rounded-xl p-4"><p className="text-indigo-600 font-bold text-2xl">기획서 작성</p><p className="text-sm text-gray-500">시험 유형</p></div>
                <div className="bg-indigo-50 rounded-xl p-4"><p className="text-indigo-600 font-bold text-2xl">3시간</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-indigo-50 rounded-xl p-4"><p className="text-indigo-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-indigo-50 rounded-xl p-4"><p className="text-indigo-600 font-bold text-2xl">서술형</p><p className="text-sm text-gray-500">답변 형식</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기 평가 영역</h2>
              <div className="space-y-4">
                {practicalTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{topic.name}</h3><p className="text-sm text-gray-500">{topic.desc}</p></div>
                    <div className="text-right"><p className="text-indigo-600 font-bold">{topic.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📄 기획서 작성 예시 주제</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-bold text-indigo-700 mb-2">국제회의 유형</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 국제학술대회 기획</li>
                    <li>• 정부 간 회의 유치</li>
                    <li>• 국제기구 총회 개최</li>
                    <li>• 글로벌 포럼 운영</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h3 className="font-bold text-indigo-700 mb-2">기업 행사 유형</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 신제품 런칭 이벤트</li>
                    <li>• 기업 컨퍼런스</li>
                    <li>• 인센티브 투어</li>
                    <li>• 전시회·박람회</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 기획서 작성 체크리스트</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">행사 개요 (명칭, 일시, 장소)</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">목적 및 기대효과</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">프로그램 세부 일정</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">예산 계획서</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">마케팅·홍보 계획</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">운영 조직도</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">위기관리 계획</span></div>
                  <div className="flex items-center gap-2"><span className="w-5 h-5 bg-indigo-600 text-white rounded text-xs flex items-center justify-center">✓</span><span className="text-gray-700">사후 평가 방안</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 실기 학습</h2>
              <Link href="/category/service/convention-planner-1/study/practical" className="block py-4 px-6 bg-indigo-100 text-indigo-700 rounded-xl text-center font-medium hover:bg-indigo-200 transition">기획서 작성 연습하기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 실기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>기획서 표준 양식을 숙지하고 체계적으로 작성하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>예산 수립 시 현실적인 비용 산정이 중요합니다</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>실제 성공 사례를 분석하여 참고하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>시간 배분을 계획하고 연습하세요 (3시간)</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
