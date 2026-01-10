"use client";

import Link from "next/link";
import { useState } from "react";

export default function BakeryExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: "빵류재료",
      questions: 20,
      difficulty: "중",
      passRate: "50%",
      color: "bg-amber-500",
      topics: [
        "밀가루의 종류와 특성",
        "이스트의 종류와 발효 원리",
        "유지류의 기능과 종류",
        "당류와 감미료",
        "유제품의 종류와 특성",
        "계란의 기능과 활용",
        "소금의 역할",
        "개량제와 첨가물",
      ],
      tips: "밀가루 단백질 함량과 글루텐 형성 원리가 핵심입니다.",
      studyLink: "/category/service/bakery/study/baking-theory",
    },
    {
      id: 2,
      name: "제조 및 위생관리",
      questions: 40,
      difficulty: "중",
      passRate: "45%",
      color: "bg-orange-500",
      topics: [
        "반죽의 종류와 방법",
        "발효 공정 관리",
        "성형 및 팬닝",
        "굽기와 냉각",
        "제빵 공정별 주의사항",
        "식품위생법규",
        "개인위생 관리",
        "작업장 위생 관리",
      ],
      tips: "발효 온도, 시간, 습도 조건을 정확히 암기하세요.",
      studyLink: "/category/service/bakery/study/food-hygiene",
    },
  ];

  const practicalAreas = [
    {
      name: "재료 계량",
      weight: "10%",
      items: ["재료별 정확한 계량", "계량기 사용법", "재료 전처리"],
    },
    {
      name: "반죽 공정",
      weight: "25%",
      items: ["믹싱 단계 판단", "반죽 온도 관리", "글루텐 발전 확인"],
    },
    {
      name: "발효 관리",
      weight: "20%",
      items: ["1차 발효 관리", "펀칭 시점 판단", "2차 발효(벤치타임)"],
    },
    {
      name: "성형 및 팬닝",
      weight: "15%",
      items: ["분할 정확도", "성형 기술", "팬닝 배열"],
    },
    {
      name: "굽기",
      weight: "20%",
      items: ["오븐 온도 관리", "굽기 시간 조절", "구운 색 판정"],
    },
    {
      name: "위생 및 정리",
      weight: "10%",
      items: ["작업대 위생", "도구 세척", "개인 위생"],
    },
  ];

  const practicalItems = [
    { name: "식빵", time: "3시간 30분", difficulty: "중", category: "식빵류" },
    { name: "버터톱식빵", time: "3시간 30분", difficulty: "중", category: "식빵류" },
    { name: "풀먼식빵", time: "3시간 30분", difficulty: "중상", category: "식빵류" },
    { name: "밤식빵", time: "3시간 30분", difficulty: "중", category: "식빵류" },
    { name: "옥수수식빵", time: "3시간 30분", difficulty: "중", category: "식빵류" },
    { name: "우유식빵", time: "3시간 30분", difficulty: "중", category: "식빵류" },
    { name: "단과자빵", time: "3시간", difficulty: "중", category: "과자빵류" },
    { name: "소시지빵", time: "3시간", difficulty: "중", category: "과자빵류" },
    { name: "크림빵", time: "3시간", difficulty: "중", category: "과자빵류" },
    { name: "소보로빵", time: "3시간", difficulty: "중", category: "과자빵류" },
    { name: "모카빵", time: "3시간", difficulty: "중", category: "과자빵류" },
    { name: "스위트롤", time: "3시간", difficulty: "중", category: "롤류" },
    { name: "버터롤", time: "3시간", difficulty: "중", category: "롤류" },
    { name: "통밀빵", time: "3시간", difficulty: "중", category: "건강빵류" },
    { name: "호밀빵", time: "3시간", difficulty: "중상", category: "건강빵류" },
    { name: "더치빵", time: "3시간", difficulty: "중", category: "특수빵류" },
    { name: "베이글", time: "3시간", difficulty: "중상", category: "특수빵류" },
    { name: "빵도넛", time: "3시간", difficulty: "중", category: "특수빵류" },
    { name: "그리시니", time: "2시간 30분", difficulty: "하", category: "특수빵류" },
    { name: "브리오슈", time: "3시간 30분", difficulty: "상", category: "특수빵류" },
  ];

  const frequencyData = [
    { category: "매회 출제", items: ["식빵", "버터롤", "단과자빵"], color: "bg-red-100 text-red-700" },
    { category: "자주 출제", items: ["소보로빵", "크림빵", "스위트롤", "소시지빵"], color: "bg-orange-100 text-orange-700" },
    { category: "간헐 출제", items: ["베이글", "호밀빵", "브리오슈", "그리시니"], color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-amber-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <Link href="/category/service/bakery" className="hover:text-white transition">제빵기능사</Link>
            <span>/</span>
            <span className="text-white">시험 상세</span>
          </nav>
          <h1 className="text-4xl font-bold mb-4">🍞 제빵기능사 시험 상세</h1>
          <p className="text-amber-100 text-lg">필기시험과 실기시험의 모든 정보를 확인하세요</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 탭 네비게이션 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              activeTab === 'written'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-amber-50'
            }`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition ${
              activeTab === 'practical'
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-orange-50'
            }`}
          >
            👨‍🍳 실기시험
          </button>
        </div>

        {/* 필기시험 탭 */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-sm text-gray-500">과목수</div>
                  <div className="font-bold text-xl text-amber-700">2과목</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-2">❓</div>
                  <div className="text-sm text-gray-500">문항수</div>
                  <div className="font-bold text-xl text-amber-700">60문항</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-sm text-gray-500">시험시간</div>
                  <div className="font-bold text-xl text-amber-700">60분</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-sm text-gray-500">합격기준</div>
                  <div className="font-bold text-xl text-amber-700">60점 이상</div>
                </div>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {writtenSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className={`${subject.color} text-white p-6`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold">{subject.name}</h3>
                        <p className="text-white/80">{subject.questions}문항 출제</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white/80">난이도: {subject.difficulty}</div>
                        <div className="text-sm text-white/80">합격률: {subject.passRate}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-4">주요 출제 토픽</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {subject.topics.map((topic, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 text-center">
                          {topic}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                      <div>
                        <span className="font-bold text-amber-700">💡 학습 팁: </span>
                        <span className="text-gray-700">{subject.tips}</span>
                      </div>
                      <Link
                        href={subject.studyLink}
                        className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition text-sm font-medium"
                      >
                        학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 합격 전략 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 필기시험 합격 전략</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-amber-50 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-4">✅ 이것만은 꼭!</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>밀가루 단백질 함량별 용도 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>발효 조건 (온도, 습도, 시간) 숙지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>식품위생법 주요 조항 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500">•</span>
                      <span>반죽법 종류와 특징 구분</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-4">⚠️ 자주 틀리는 포인트</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>이스트 종류별 사용량 차이</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>글루텐 형성에 영향을 미치는 요인</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>HACCP 관련 문제</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>계란의 기포성과 유화성 구분</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 실기시험 탭 */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">실기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="text-sm text-gray-500">시험유형</div>
                  <div className="font-bold text-xl text-orange-700">작업형</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl mb-2">🍞</div>
                  <div className="text-sm text-gray-500">출제품목</div>
                  <div className="font-bold text-xl text-orange-700">20종</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl mb-2">⏱️</div>
                  <div className="text-sm text-gray-500">시험시간</div>
                  <div className="font-bold text-xl text-orange-700">3~4시간</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-sm text-gray-500">합격기준</div>
                  <div className="font-bold text-xl text-orange-700">60점 이상</div>
                </div>
              </div>
            </div>

            {/* 영역별 배점 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">영역별 배점</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {practicalAreas.map((area, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold text-gray-800">{area.name}</h3>
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {area.weight}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {area.items.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 출제 품목 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">실기 출제 품목 (20종)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="px-4 py-3 text-left font-bold text-gray-700">품목명</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-700">분류</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-700">시험시간</th>
                      <th className="px-4 py-3 text-center font-bold text-gray-700">난이도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practicalItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-amber-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-600">{item.time}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            item.difficulty === '상' ? 'bg-red-100 text-red-700' :
                            item.difficulty === '중상' ? 'bg-orange-100 text-orange-700' :
                            item.difficulty === '중' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.difficulty}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 출제 경향 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 출제 경향 분석</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {frequencyData.map((freq, index) => (
                  <div key={index} className="p-4 rounded-xl border-2 border-gray-100">
                    <h3 className={`font-bold mb-3 px-3 py-1 rounded-lg inline-block ${freq.color}`}>
                      {freq.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {freq.items.map((item, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 실기 대비 팁 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 실기시험 대비 팁</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-4">🎯 핵심 포인트</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">1.</span>
                      <span>반죽 온도 관리가 가장 중요 (27±1°C)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">2.</span>
                      <span>발효 상태 판단 능력 (핑거테스트)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">3.</span>
                      <span>정확한 분할 무게 (오차 ±5% 이내)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold">4.</span>
                      <span>균일한 성형과 팬닝 배열</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 bg-amber-50 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-4">⚠️ 감점 주의사항</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>반죽 과발효/저발효</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>불균일한 분할 무게</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>과도한 굽기 또는 덜 익은 상태</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>위생 상태 불량 (앞치마, 위생모)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">💡 합격 팁</h4>
                <p className="text-gray-700">
                  실기시험은 최소 20회 이상 반복 연습이 필요합니다. 학원 수강 또는 온라인 강의를 통해
                  기본기를 익히고, 시간 관리 연습에 집중하세요. 특히 식빵, 버터롤, 단과자빵은
                  매회 출제되므로 완벽하게 숙달해야 합니다.
                </p>
              </div>
            </div>

            {/* 학습 링크 */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">🎓 실기 학습하기</h2>
              <p className="text-orange-100 mb-6">실기시험 대비 문제와 가이드를 확인하세요.</p>
              <Link
                href="/category/service/bakery/study/practical"
                className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition"
              >
                실기 학습 시작 →
              </Link>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-12 flex justify-between">
          <Link
            href="/category/service/bakery"
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            제빵기능사 메인
          </Link>
          <Link
            href="/category/service/bakery/study/food-hygiene"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition font-medium"
          >
            학습 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 UTTEC 자격시험 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
