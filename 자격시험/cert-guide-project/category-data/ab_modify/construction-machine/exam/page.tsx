'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConstructionMachineExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: "건설기계기관",
      topics: ["디젤기관 구조와 작동원리", "연료분사장치", "과급기와 배기시스템", "기관 성능과 효율", "냉각·윤활장치", "기관 정비와 고장진단"],
      questions: 20,
      time: 30,
      keyPoints: ["연료분사펌프 종류", "과급기 작동원리", "연소실 형상", "기관 성능곡선"],
      difficulty: "중상",
      passRate: "48%"
    },
    {
      name: "건설기계섀시",
      topics: ["동력전달장치", "토크컨버터", "변속기 구조", "조향장치", "제동장치", "주행장치(궤도/타이어)"],
      questions: 20,
      time: 30,
      keyPoints: ["토크컨버터 특성", "유압식 변속기", "파워스티어링", "브레이크 시스템"],
      difficulty: "중",
      passRate: "52%"
    },
    {
      name: "건설기계유압",
      topics: ["유압 기초이론", "유압펌프", "유압모터", "유압밸브", "유압실린더", "유압회로 해석"],
      questions: 20,
      time: 30,
      keyPoints: ["펌프 종류와 특성", "밸브 기호와 기능", "회로도 해석", "유압계산"],
      difficulty: "중상",
      passRate: "45%"
    },
    {
      name: "건설기계전기·안전관리",
      topics: ["시동장치", "충전장치", "조명장치", "안전관리법규", "건설기계 안전기준", "정기검사"],
      questions: 20,
      time: 30,
      keyPoints: ["축전지 관리", "발전기 원리", "안전기준 수치", "검사항목"],
      difficulty: "중",
      passRate: "55%"
    }
  ];

  const practicalAreas = [
    { name: "건설기계 설계", percentage: 25, description: "유압회로 설계, 기계요소 설계" },
    { name: "기관 정비", percentage: 25, description: "고장진단, 분해조립, 성능시험" },
    { name: "유압장치", percentage: 30, description: "유압회로 해석, 기기 정비" },
    { name: "안전관리", percentage: 20, description: "안전점검, 법규, 품질관리" }
  ];

  const schedules = [
    { session: "2025년 1회", written: "3월 2일", writtenResult: "3월 19일", practical: "4월 19일~5월 2일", finalResult: "5월 21일" },
    { session: "2025년 2회", written: "5월 11일", writtenResult: "5월 28일", practical: "6월 28일~7월 11일", finalResult: "7월 30일" },
    { session: "2025년 3회", written: "8월 3일", writtenResult: "8월 20일", practical: "10월 18일~10월 31일", finalResult: "11월 19일" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/construction/construction-machine" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>건설기계기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📋</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">시험 정보</h1>
              <p className="text-gray-600">건설기계기사 필기·실기 시험 안내</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2025년 시험 일정</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="p-3 text-left">회차</th>
                  <th className="p-3 text-left">필기시험</th>
                  <th className="p-3 text-left">필기발표</th>
                  <th className="p-3 text-left">실기시험</th>
                  <th className="p-3 text-left">최종발표</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule, index) => (
                  <tr key={index} className="border-b hover:bg-yellow-50">
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
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'written' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            📝 필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'practical' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            🔧 실기시험
          </button>
        </div>

        {activeTab === 'written' ? (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">필기시험 개요</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">80문항</div>
                  <div className="text-sm text-gray-600">총 문항 수</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">2시간</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">60점</div>
                  <div className="text-sm text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            {writtenSubjects.map((subject, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
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
                          <li key={i} className="text-orange-600">★ {point}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex gap-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">난이도: {subject.difficulty}</span>
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
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-600">필답형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">2시간 30분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="text-2xl font-bold text-amber-600">60점</div>
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
                      <span className="text-orange-600 font-bold">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full"
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
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <h4 className="font-bold text-yellow-800 mb-2">계산문제</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유압회로 유량/압력 계산</li>
                    <li>• 기관 출력/효율 계산</li>
                    <li>• 실린더 추력/속도 계산</li>
                    <li>• 제동거리/제동력 계산</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h4 className="font-bold text-orange-800 mb-2">서술형문제</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 유압회로도 해석</li>
                    <li>• 고장원인 및 대책</li>
                    <li>• 정비절차 서술</li>
                    <li>• 안전점검 항목 나열</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">⚠️ 실기 준비 시 주의사항</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>유압회로 기호를 정확히 암기하고 회로도를 해석할 수 있어야 합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>계산문제는 풀이과정과 단위를 명확히 표기해야 합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>SI단위 환산을 정확히 할 수 있어야 합니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500">✓</span>
                  <span>서술형은 핵심 키워드를 포함하여 체계적으로 답안을 작성합니다</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 시험 응시 TIP</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 필기시험 시 과목당 시간 배분을 철저히 하세요 (과목당 30분)</li>
            <li>• 유압과목은 계산문제가 많으므로 공학용 계산기 지참 필수</li>
            <li>• 실기시험은 도면 및 회로도 해석 능력이 당락을 좌우합니다</li>
            <li>• 안전관리 법규는 최신 개정내용을 확인하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
