'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TourGuideExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  const writtenSubjects = [
    { name: '국사', questions: 20, topics: ['선사시대', '고대왕조', '고려시대', '조선시대', '근현대사'], tips: '주요 역사 사건과 인물을 암기하세요.', passRate: 40 },
    { name: '관광자원해설', questions: 20, topics: ['문화유산', '자연관광자원', '인문관광자원', '지역별 관광지', '관광해설 기법'], tips: '유네스코 유산과 주요 명소를 숙지하세요.', passRate: 38 },
    { name: '관광법규', questions: 20, topics: ['관광기본법', '관광진흥법', '여행업 규정', '문화재보호법', '출입국관리법'], tips: '주요 법규와 조항을 정리하세요.', passRate: 42 },
    { name: '관광학개론', questions: 20, topics: ['관광의 개념', '관광산업', '관광마케팅', '관광정책', '관광 트렌드'], tips: '관광 이론과 용어를 이해하세요.', passRate: 45 },
  ];

  const interviewTopics = [
    { name: '관광지 안내', desc: '주요 관광지에 대한 외국어 해설', weight: '30%' },
    { name: '한국문화 소개', desc: '전통문화, 음식, 예절 등 설명', weight: '25%' },
    { name: '상황대처 능력', desc: '돌발 상황, 고객 응대 시나리오', weight: '25%' },
    { name: '언어능력·태도', desc: '외국어 유창성, 발음, 서비스 마인드', weight: '20%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/category/service/tour-guide" className="text-emerald-600 hover:text-emerald-800 font-medium">← 관광통역안내사</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🌏 관광통역안내사 시험 안내</h1>
          <p className="text-gray-500">필기시험과 면접시험 상세 정보</p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          <button onClick={() => setActiveTab('written')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'written' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-emerald-50'}`}>📝 필기시험</button>
          <button onClick={() => setActiveTab('interview')} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === 'interview' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-teal-50'}`}>🎤 면접시험</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-emerald-50 rounded-xl p-4"><p className="text-emerald-600 font-bold text-2xl">80문항</p><p className="text-sm text-gray-500">총 문항수</p></div>
                <div className="bg-emerald-50 rounded-xl p-4"><p className="text-emerald-600 font-bold text-2xl">80분</p><p className="text-sm text-gray-500">시험 시간</p></div>
                <div className="bg-emerald-50 rounded-xl p-4"><p className="text-emerald-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">평균 합격</p></div>
                <div className="bg-emerald-50 rounded-xl p-4"><p className="text-emerald-600 font-bold text-2xl">객관식</p><p className="text-sm text-gray-500">문제 유형</p></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">{subject.questions}문항</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">주요 토픽</p>
                    <div className="flex flex-wrap gap-2">{subject.topics.map((topic, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{topic}</span>))}</div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-3"><p className="text-sm text-emerald-700">💡 {subject.tips}</p></div>
                  <div className="mt-3 flex items-center justify-between"><span className="text-xs text-gray-400">평균 합격률</span><span className="text-emerald-600 font-bold">{subject.passRate}%</span></div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/category/service/tour-guide/study/korean-history" className="py-3 px-4 bg-emerald-100 text-emerald-700 rounded-xl text-center font-medium hover:bg-emerald-200 transition">한국사</Link>
                <Link href="/category/service/tour-guide/study/korean-culture" className="py-3 px-4 bg-emerald-100 text-emerald-700 rounded-xl text-center font-medium hover:bg-emerald-200 transition">한국문화</Link>
                <Link href="/category/service/tour-guide/study/tourism-resources" className="py-3 px-4 bg-emerald-100 text-emerald-700 rounded-xl text-center font-medium hover:bg-emerald-200 transition">관광자원해설</Link>
                <Link href="/category/service/tour-guide/study/tour-english" className="py-3 px-4 bg-emerald-100 text-emerald-700 rounded-xl text-center font-medium hover:bg-emerald-200 transition">관광영어</Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 필기시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>국사는 주요 왕조와 사건 위주로 암기하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>유네스코 세계유산과 주요 관광지를 숙지하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>관광법규는 출제빈도 높은 조항 중심으로 학습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>기출문제를 반복 풀이하여 출제 경향을 파악하세요</p></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">면접시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">4영역</p><p className="text-sm text-gray-500">평가 영역</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">15분</p><p className="text-sm text-gray-500">면접 시간</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">60점</p><p className="text-sm text-gray-500">합격 기준</p></div>
                <div className="bg-teal-50 rounded-xl p-4"><p className="text-teal-600 font-bold text-2xl">외국어</p><p className="text-sm text-gray-500">면접 언어</p></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">면접 평가 영역</h2>
              <div className="space-y-4">
                {interviewTopics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-teal-50 rounded-xl">
                    <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                    <div className="flex-1"><h3 className="font-bold text-gray-800">{topic.name}</h3><p className="text-sm text-gray-500">{topic.desc}</p></div>
                    <div className="text-right"><p className="text-teal-600 font-bold">{topic.weight}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 자주 나오는 면접 주제</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-xl p-4">
                  <h3 className="font-bold text-teal-700 mb-2">관광지 안내</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 경복궁, 창덕궁 해설</li><li>• 한옥마을 소개</li><li>• 제주도 관광지</li><li>• DMZ 관련 설명</li></ul>
                </div>
                <div className="bg-teal-50 rounded-xl p-4">
                  <h3 className="font-bold text-teal-700 mb-2">한국문화</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 한식 소개 (김치, 비빔밥)</li><li>• 한복, 전통의례</li><li>• K-pop, 한류 문화</li><li>• 한국의 명절</li></ul>
                </div>
                <div className="bg-teal-50 rounded-xl p-4">
                  <h3 className="font-bold text-teal-700 mb-2">상황대처</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 일정 변경 대처</li><li>• 불만 고객 응대</li><li>• 응급 상황 처리</li><li>• 분실물 처리</li></ul>
                </div>
                <div className="bg-teal-50 rounded-xl p-4">
                  <h3 className="font-bold text-teal-700 mb-2">기타</h3>
                  <ul className="text-sm text-gray-600 space-y-1"><li>• 자기소개</li><li>• 지원 동기</li><li>• 한국 여행 추천 코스</li><li>• 시사 이슈</li></ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 면접 학습</h2>
              <Link href="/category/service/tour-guide/study/practical" className="block py-4 px-6 bg-teal-100 text-teal-700 rounded-xl text-center font-medium hover:bg-teal-200 transition">면접 문제 풀기 →</Link>
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🎯 면접시험 합격 전략</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span><p>주요 관광지 해설을 외국어로 연습하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span><p>한국문화 소개 스크립트를 미리 준비하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span><p>돌발 상황 시나리오를 예상하고 대비하세요</p></div>
                <div className="flex items-start gap-3"><span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span><p>밝은 표정과 자신감 있는 태도를 유지하세요</p></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
