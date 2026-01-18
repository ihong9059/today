"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClinicalPsychologist1ExamPage() {
  const [activeTab, setActiveTab] = useState<"written" | "practical">("written");

  const writtenSubjects = [
    {
      name: "심리학개론",
      icon: "🧠",
      color: "cyan",
      questions: 20,
      difficulty: "중",
      passRate: "65%",
      topics: [
        "심리학의 역사와 관점",
        "생물심리학과 신경과학",
        "감각과 지각",
        "학습과 기억",
        "사고와 언어",
        "동기와 정서",
        "발달심리학",
        "성격심리학",
        "사회심리학",
        "심리학 연구방법론",
      ],
      tips: "심리학의 주요 이론가와 그들의 기여를 정리하세요. 각 관점(행동주의, 인지주의, 정신분석 등)의 차이점을 명확히 이해해야 합니다.",
    },
    {
      name: "이상심리학",
      icon: "🔬",
      color: "blue",
      questions: 20,
      difficulty: "상",
      passRate: "55%",
      topics: [
        "이상행동의 정의와 분류",
        "DSM-5 진단체계",
        "불안장애와 강박장애",
        "우울장애와 양극성장애",
        "조현병 스펙트럼 장애",
        "성격장애",
        "외상 및 스트레스 관련 장애",
        "신경발달장애",
        "물질관련 장애",
        "신경인지장애",
      ],
      tips: "DSM-5 진단기준을 정확히 암기하세요. 각 장애의 감별진단 포인트가 자주 출제됩니다.",
    },
    {
      name: "심리검사",
      icon: "📊",
      color: "indigo",
      questions: 20,
      difficulty: "상",
      passRate: "50%",
      topics: [
        "심리측정의 기초",
        "신뢰도와 타당도",
        "지능검사 (K-WAIS, K-WISC)",
        "객관적 성격검사 (MMPI-2)",
        "투사적 검사 (로샤, TAT)",
        "신경심리검사",
        "발달검사",
        "적성 및 흥미검사",
        "검사의 실시와 채점",
        "검사 결과 해석과 보고서",
      ],
      tips: "MMPI-2 척도와 로샤 검사 해석이 핵심입니다. 각 검사의 실시방법과 해석 원리를 숙지하세요.",
    },
    {
      name: "임상심리학",
      icon: "🏥",
      color: "violet",
      questions: 20,
      difficulty: "상",
      passRate: "52%",
      topics: [
        "임상심리학의 역사와 역할",
        "임상 면담 기법",
        "사례개념화",
        "심리평가 보고서 작성",
        "심리치료 이론과 기법",
        "근거기반 치료",
        "치료적 관계",
        "윤리와 법적 이슈",
        "임상 수퍼비전",
        "다문화 역량",
      ],
      tips: "사례개념화와 치료계획 수립 능력이 중요합니다. 다양한 사례를 통해 연습하세요.",
    },
    {
      name: "심리상담",
      icon: "💬",
      color: "purple",
      questions: 20,
      difficulty: "중",
      passRate: "60%",
      topics: [
        "상담의 기초 개념",
        "상담 관계와 촉진 기술",
        "정신분석적 상담",
        "인간중심 상담",
        "인지행동 상담",
        "게슈탈트 상담",
        "가족 및 부부상담",
        "집단상담",
        "위기상담",
        "상담 윤리",
      ],
      tips: "각 상담이론의 핵심 개념과 기법을 비교하여 정리하세요. 실제 상담 장면에서의 적용이 중요합니다.",
    },
  ];

  const practicalAreas = [
    {
      area: "심리평가 실무",
      weight: 40,
      items: [
        "지능검사 실시 및 채점",
        "MMPI-2 프로파일 해석",
        "로샤 검사 채점 (Exner 체계)",
        "BGT 검사 실시",
        "종합심리평가 보고서 작성",
      ],
    },
    {
      area: "사례개념화",
      weight: 30,
      items: [
        "DSM-5 진단",
        "생물-심리-사회 모델 적용",
        "주호소 문제 분석",
        "치료 목표 설정",
        "치료 계획 수립",
      ],
    },
    {
      area: "심리치료",
      weight: 30,
      items: [
        "치료적 면담 기술",
        "인지행동치료 기법 적용",
        "치료 진행 기록",
        "종결 및 추수상담",
        "윤리적 의사결정",
      ],
    },
  ];

  const examFrequency = [
    { topic: "DSM-5 진단기준", frequency: "매회", importance: "필수" },
    { topic: "MMPI-2 척도 해석", frequency: "매회", importance: "필수" },
    { topic: "로샤 검사 채점", frequency: "매회", importance: "필수" },
    { topic: "K-WAIS 하위검사", frequency: "자주", importance: "중요" },
    { topic: "인지행동치료 기법", frequency: "자주", importance: "중요" },
    { topic: "사례개념화", frequency: "자주", importance: "중요" },
    { topic: "불안장애/우울장애", frequency: "자주", importance: "중요" },
    { topic: "성격장애 유형", frequency: "가끔", importance: "보통" },
    { topic: "신경심리검사", frequency: "가끔", importance: "보통" },
    { topic: "상담윤리", frequency: "가끔", importance: "보통" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-gray-800">자격시험 가이드</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/welfare" className="text-gray-500 hover:text-gray-700">사회복지·상담</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/welfare/clinical-psychologist-1" className="text-gray-500 hover:text-gray-700">임상심리사 1급</Link>
              <span className="text-gray-300">/</span>
              <span className="text-cyan-600 font-medium">시험정보</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/welfare/clinical-psychologist-1" className="inline-flex items-center text-cyan-100 hover:text-white mb-4 transition">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            임상심리사 1급 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-2">시험 상세 정보</h1>
          <p className="text-cyan-100 text-lg">필기시험 5과목 + 실기시험 상세 안내</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("written")}
              className={`px-6 py-4 font-medium transition border-b-2 ${
                activeTab === "written"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab("practical")}
              className={`px-6 py-4 font-medium transition border-b-2 ${
                activeTab === "practical"
                  ? "border-cyan-500 text-cyan-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🔬 실기시험
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "written" ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">과목수</p>
                  <p className="text-2xl font-bold text-cyan-600">5과목</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">총 문항</p>
                  <p className="text-2xl font-bold text-blue-600">100문항</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-indigo-600">150분</p>
                </div>
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-violet-600">60점</p>
                </div>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-6">
              {writtenSubjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className={`bg-${subject.color}-500 text-white p-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{subject.name}</h3>
                          <p className="text-sm opacity-80">{subject.questions}문항 | 난이도: {subject.difficulty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-80">예상 합격률</p>
                        <p className="text-xl font-bold">{subject.passRate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-gray-800 mb-3">주요 출제 토픽</h4>
                    <div className="grid md:grid-cols-2 gap-2 mb-4">
                      {subject.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600">
                          <span className={`w-2 h-2 bg-${subject.color}-400 rounded-full`}></span>
                          {topic}
                        </div>
                      ))}
                    </div>
                    <div className={`bg-${subject.color}-50 rounded-lg p-4`}>
                      <p className={`text-sm text-${subject.color}-800`}>
                        <strong>💡 학습 Tip:</strong> {subject.tips}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Link
                        href={`/category/welfare/clinical-psychologist-1/study/${
                          index === 0 ? "psychology-intro" :
                          index === 1 ? "abnormal-psychology" :
                          index === 2 ? "psychological-assessment" :
                          index === 3 ? "clinical-psychology" : "counseling"
                        }`}
                        className={`inline-flex items-center gap-2 bg-${subject.color}-500 text-white px-4 py-2 rounded-lg hover:bg-${subject.color}-600 transition`}
                      >
                        학습하기 →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 출제 빈도 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 출제 빈도 분석</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium text-gray-700">토픽</th>
                      <th className="text-center p-3 font-medium text-gray-700">출제 빈도</th>
                      <th className="text-center p-3 font-medium text-gray-700">중요도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examFrequency.map((item, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-3 text-gray-800">{item.topic}</td>
                        <td className="p-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            item.frequency === "매회" ? "bg-red-100 text-red-700" :
                            item.frequency === "자주" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {item.frequency}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            item.importance === "필수" ? "bg-cyan-100 text-cyan-700" :
                            item.importance === "중요" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {item.importance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-violet-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험과목</p>
                  <p className="text-xl font-bold text-violet-600">임상심리실무</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험시간</p>
                  <p className="text-2xl font-bold text-purple-600">180분</p>
                </div>
                <div className="bg-fuchsia-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">시험유형</p>
                  <p className="text-lg font-bold text-fuchsia-600">필답형+작업형</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 text-sm">합격기준</p>
                  <p className="text-2xl font-bold text-pink-600">60점</p>
                </div>
              </div>
            </div>

            {/* 실기 영역별 상세 */}
            <div className="grid md:grid-cols-3 gap-6">
              {practicalAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-4">
                    <h3 className="text-lg font-bold">{area.area}</h3>
                    <p className="text-violet-100">배점: {area.weight}%</p>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2">
                      {area.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="text-violet-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* 실기 대비 전략 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 실기 대비 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-violet-50 rounded-lg p-4">
                    <h4 className="font-bold text-violet-800 mb-2">심리검사 실습</h4>
                    <ul className="text-sm text-violet-700 space-y-1">
                      <li>• K-WAIS-IV 실시 및 채점 연습</li>
                      <li>• MMPI-2 프로파일 해석 사례 50개+</li>
                      <li>• 로샤 검사 Exner 체계 채점 숙달</li>
                      <li>• BGT 검사 실시 및 해석</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-2">보고서 작성</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• 종합심리평가 보고서 양식 숙지</li>
                      <li>• 의뢰 목적별 보고서 형식</li>
                      <li>• 검사 결과 통합 해석 연습</li>
                      <li>• 권고사항 작성법</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-fuchsia-50 rounded-lg p-4">
                    <h4 className="font-bold text-fuchsia-800 mb-2">사례개념화</h4>
                    <ul className="text-sm text-fuchsia-700 space-y-1">
                      <li>• DSM-5 진단 연습 (사례 30개+)</li>
                      <li>• 생물-심리-사회 모델 적용</li>
                      <li>• 치료계획 수립 연습</li>
                      <li>• 예후 평가 작성</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4">
                    <h4 className="font-bold text-pink-800 mb-2">시간 관리</h4>
                    <ul className="text-sm text-pink-700 space-y-1">
                      <li>• 심리평가 파트: 70분</li>
                      <li>• 사례개념화 파트: 55분</li>
                      <li>• 심리치료 파트: 55분</li>
                      <li>• 모의시험으로 시간 배분 연습</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 실기 학습 링크 */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">📚 실기 집중 학습</h3>
              <p className="text-violet-100 mb-4">실기시험 대비를 위한 실무 중심 학습을 시작하세요.</p>
              <Link
                href="/category/welfare/clinical-psychologist-1/study/practical"
                className="inline-flex items-center gap-2 bg-white text-violet-600 px-6 py-3 rounded-lg font-bold hover:bg-violet-50 transition"
              >
                실기 학습하기 →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
