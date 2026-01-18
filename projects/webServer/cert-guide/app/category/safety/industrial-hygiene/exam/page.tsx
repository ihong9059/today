'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IndustrialHygieneExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: "산업위생학개론",
      topics: ["산업위생의 정의와 역사", "인간공학 기초", "작업생리", "산업피로", "산업위생 프로그램"],
      questions: 20,
      time: 30,
      keyPoints: ["산업위생 4대 영역", "인체측정", "작업부하", "VDT 증후군"],
      difficulty: "중",
      passRate: "42%"
    },
    {
      name: "작업환경측정 및 평가",
      topics: ["시료채취 이론", "측정기기", "분석방법", "노출평가", "측정계획"],
      questions: 20,
      time: 30,
      keyPoints: ["TWA 계산", "개인시료/지역시료", "노출지수", "측정주기"],
      difficulty: "상",
      passRate: "35%"
    },
    {
      name: "작업환경관리대책",
      topics: ["환기공학", "국소배기장치", "전체환기", "개인보호구", "행정적 관리"],
      questions: 20,
      time: 30,
      keyPoints: ["필요환기량", "제어풍속", "후드 설계", "보호구 선정"],
      difficulty: "상",
      passRate: "38%"
    },
    {
      name: "물리적 유해인자관리",
      topics: ["소음", "진동", "온열조건", "이상기압", "방사선", "조명"],
      questions: 20,
      time: 30,
      keyPoints: ["dB 합성", "WBGT", "조도기준", "방사선 피폭한도"],
      difficulty: "중",
      passRate: "45%"
    },
    {
      name: "산업독성학",
      topics: ["독성학 원리", "유해물질 분류", "건강영향", "생물학적 모니터링", "응급처치"],
      questions: 20,
      time: 30,
      keyPoints: ["용량-반응", "반감기", "BEI", "특수건강진단"],
      difficulty: "중상",
      passRate: "40%"
    }
  ];

  const practicalAreas = [
    { name: "작업환경측정 계획", percentage: 20, description: "측정대상, 측정지점, 측정주기 결정" },
    { name: "노출평가", percentage: 25, description: "TWA 계산, 노출지수, 평가서 작성" },
    { name: "환기설비 설계", percentage: 25, description: "필요환기량, 덕트설계, 압력손실" },
    { name: "유해인자 관리", percentage: 20, description: "물질별 관리대책, 보호구 선정" },
    { name: "법규 적용", percentage: 10, description: "산안법, 측정고시, 관리기준" }
  ];

  const schedules = [
    { session: "2025년 1회", written: "3월 2일", writtenResult: "3월 19일", practical: "4월 19일~5월 2일", finalResult: "5월 21일" },
    { session: "2025년 2회", written: "5월 11일", writtenResult: "5월 28일", practical: "6월 28일~7월 11일", finalResult: "7월 30일" },
    { session: "2025년 3회", written: "8월 3일", writtenResult: "8월 20일", practical: "10월 18일~10월 31일", finalResult: "11월 19일" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/safety/industrial-hygiene" className="text-teal-600 hover:text-teal-800 flex items-center gap-2">
            <span>←</span>
            <span>산업위생관리기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📋</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">시험 정보</h1>
              <p className="text-gray-600">산업위생관리기사 필기·실기 시험 안내</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2025년 시험 일정</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-100">
                  <th className="p-3 text-left">회차</th>
                  <th className="p-3 text-left">필기시험</th>
                  <th className="p-3 text-left">필기발표</th>
                  <th className="p-3 text-left">실기시험</th>
                  <th className="p-3 text-left">최종발표</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={index} className="border-b hover:bg-teal-50">
                    <td className="p-3 font-medium">{schedule.session}</td>
                    <td className="p-3">{schedule.written}</td>
                    <td className="p-3">{schedule.writtenResult}</td>
                    <td className="p-3">{schedule.practical}</td>
                    <td className="p-3">{schedule.finalResult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'written' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'practical' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            🔧 실기시험
          </button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">필기시험 개요</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <div className="text-2xl font-bold text-teal-600">5과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-600">100문항</div>
                  <div className="text-sm text-gray-600">총 문항 수</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">2시간 30분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="p-4 bg-teal-50 rounded-xl">
                  <div className="text-2xl font-bold text-teal-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            {writtenSubjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{index + 1}. {subject.name}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{subject.questions}문항</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-white text-sm">{subject.time}분</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">📌 출제 토픽</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {subject.topics.map((topic, i) => (
                          <li key={i}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">⭐ 핵심 포인트</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {subject.keyPoints.map((point, i) => (
                          <li key={i} className="text-teal-600">★ {point}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded text-xs">난이도: {subject.difficulty}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">합격률: {subject.passRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">실기시험 개요</h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <div className="text-2xl font-bold text-teal-600">필답형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-600">3시간</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📊 출제 영역별 비중</h3>
              <div className="space-y-4">
                {practicalAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{area.name}</span>
                      <span className="text-teal-600 font-bold">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-4 rounded-full"
                        style={{ width: `${area.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">📝 실기시험 문제 유형</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <h4 className="font-bold text-teal-800 mb-2">계산문제</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TWA, STEL 계산</li>
                    <li>• 노출지수 산출</li>
                    <li>• 필요환기량 계산</li>
                    <li>• 소음 dB 합성</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <h4 className="font-bold text-cyan-800 mb-2">서술형문제</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 측정계획서 작성</li>
                    <li>• 관리대책 수립</li>
                    <li>• 유해물질 특성 설명</li>
                    <li>• 법규 적용 해석</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ 실기 준비 시 주의사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>TWA, 노출지수 계산은 매회 출제되므로 공식을 정확히 암기하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>환기 관련 계산문제는 단위 환산에 주의하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>관리대책 서술 시 공학적/행정적/보호구 대책을 구분하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500">✓</span>
                  <span>법정 측정주기, 특수건강진단 대상물질을 암기하세요</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-200">
          <h3 className="font-bold text-teal-800 mb-3">💡 시험 응시 TIP</h3>
          <ul className="space-y-2 text-teal-700 text-sm">
            <li>• 필기시험 시 과목당 시간 배분을 철저히 하세요 (과목당 30분)</li>
            <li>• 계산문제가 많으므로 공학용 계산기 지참 필수</li>
            <li>• 실기시험 3시간이므로 시간 안배가 중요합니다</li>
            <li>• 최신 산업안전보건법 개정내용을 확인하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
