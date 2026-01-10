'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthInstructor2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  const writtenSubjects = [
    {
      id: 'youth-policy',
      name: '청소년육성제도론',
      icon: '📋',
      questions: 20,
      time: 25,
      difficulty: '중',
      passRate: '48%',
      topics: [
        '청소년기본법의 이해',
        '청소년활동진흥법',
        '청소년복지지원법',
        '청소년보호법',
        '청소년 정책의 역사',
        '청소년 행정체계',
        '청소년 관련 기관',
        '국제 청소년 정책',
      ],
      tips: [
        '법령의 목적, 정의, 주요 조항을 중심으로 암기',
        '개정 연혁과 변경사항 숙지',
        '청소년 관련 기관의 역할과 기능 구분',
      ],
    },
    {
      id: 'instruction-method',
      name: '청소년지도방법론',
      icon: '🎓',
      questions: 20,
      time: 25,
      difficulty: '중',
      passRate: '45%',
      topics: [
        '청소년지도의 개념',
        '청소년지도사의 역할',
        '프로그램 기획',
        '프로그램 운영',
        '프로그램 평가',
        '집단지도 기법',
        '개인지도 기법',
        '청소년 리더십 개발',
      ],
      tips: [
        '프로그램 기획-실행-평가 단계별 절차 숙지',
        '다양한 지도기법의 특징과 적용 상황 이해',
        '실제 사례 적용 문제에 대비',
      ],
    },
    {
      id: 'psychology-counseling',
      name: '청소년심리및상담',
      icon: '🧠',
      questions: 20,
      time: 25,
      difficulty: '상',
      passRate: '42%',
      topics: [
        '청소년 발달이론',
        '인지발달 (피아제)',
        '심리사회적 발달 (에릭슨)',
        '도덕성 발달 (콜버그)',
        '상담이론과 기법',
        '청소년 문제행동',
        '위기청소년 상담',
        '집단상담 프로그램',
      ],
      tips: [
        '주요 발달이론가와 핵심 개념 연결하여 암기',
        '상담기법별 적용 사례 정리',
        '문제행동 유형별 개입 전략 숙지',
      ],
    },
    {
      id: 'youth-culture',
      name: '청소년문화',
      icon: '🎭',
      questions: 20,
      time: 25,
      difficulty: '중',
      passRate: '50%',
      topics: [
        '청소년문화의 개념',
        '청소년 하위문화',
        '미디어와 청소년',
        '인터넷·게임 문화',
        '또래 문화',
        '여가 문화',
        '소비 문화',
        '다문화 청소년',
      ],
      tips: [
        '최신 청소년 문화 트렌드 파악',
        '미디어 리터러시 관련 내용 숙지',
        '문화 관련 정책과 프로그램 연계',
      ],
    },
    {
      id: 'youth-activity',
      name: '청소년활동',
      icon: '⚽',
      questions: 20,
      time: 25,
      difficulty: '중',
      passRate: '47%',
      topics: [
        '청소년활동의 개념',
        '수련활동',
        '교류활동',
        '문화활동',
        '봉사활동',
        '청소년수련시설',
        '청소년동아리',
        '국제청소년성취포상제',
      ],
      tips: [
        '활동 유형별 정의와 특성 구분',
        '수련시설 유형과 기능 암기',
        '주요 청소년활동 프로그램 이해',
      ],
    },
  ];

  const interviewInfo = {
    format: '개별 구술면접',
    duration: '15~20분',
    evaluators: '2~3인',
    passScore: '평균 60점 이상',
    areas: [
      { name: '청소년 정책 이해도', weight: 25, description: '청소년 관련 법령, 정책, 사업에 대한 이해' },
      { name: '지도자 자질', weight: 25, description: '청소년지도사로서의 소양, 인성, 가치관' },
      { name: '전문성', weight: 25, description: '청소년지도 이론과 실무 적용 능력' },
      { name: '의사소통', weight: 25, description: '논리적 표현력, 질문 이해력, 대응력' },
    ],
    sampleQuestions: [
      '청소년지도사가 되려는 동기는 무엇입니까?',
      '청소년기본법에서 정의하는 청소년의 연령 범위와 그 이유는?',
      '위기청소년을 만났을 때 어떻게 대처하시겠습니까?',
      '청소년 프로그램을 기획할 때 가장 중요하게 생각하는 것은?',
      '또래상담 프로그램의 효과와 한계에 대해 설명해주세요.',
      '학교 밖 청소년을 위한 지원 방안은 무엇이 있을까요?',
      '청소년의 디지털 미디어 이용에 대한 바람직한 지도 방향은?',
      '청소년지도사로서 갖추어야 할 가장 중요한 역량은 무엇이라 생각합니까?',
    ],
  };

  const examSchedule = [
    { year: '2026', round: '1회', apply: '3.4~3.15', written: '5.17', writtenResult: '6.19', interview: '7.12~7.13', finalResult: '8.7' },
    { year: '2026', round: '2회', apply: '8.4~8.15', written: '10.18', writtenResult: '11.20', interview: '12.13~12.14', finalResult: '1.8(2027)' },
  ];

  const passingCriteria = {
    written: {
      perSubject: '40점 이상',
      average: '60점 이상',
      total: '100문항 / 100분',
    },
    interview: {
      average: '60점 이상',
      format: '구술면접',
    },
  };

  const studyStrategy = [
    { phase: '기초 다지기', weeks: '1-4주', content: '청소년육성제도론, 청소년심리및상담 기본 이론 학습' },
    { phase: '심화 학습', weeks: '5-8주', content: '청소년지도방법론, 문화, 활동 과목 정리' },
    { phase: '문제풀이', weeks: '9-12주', content: '기출문제 분석, 오답정리, 모의고사' },
    { phase: '면접 준비', weeks: '필기 합격 후', content: '예상 질문 연습, 모의 면접' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-500 hover:text-gray-700">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/youth-instructor-2" className="text-gray-500 hover:text-gray-700">청소년지도사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">시험 정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-teal-500 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <span className="text-4xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">청소년지도사 2급 시험 정보</h1>
              <p className="text-green-100 mt-1">필기시험 5과목 + 면접시험</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 bg-white rounded-xl p-2 shadow-sm">
          <button
            onClick={() => setActiveTab('written')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              activeTab === 'written'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📚 필기시험
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              activeTab === 'interview'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎤 면접시험
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">5과목</p>
                  <p className="text-sm text-gray-600">시험 과목</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">100문항</p>
                  <p className="text-sm text-gray-600">총 문항수</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">100분</p>
                  <p className="text-sm text-gray-600">시험 시간</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">객관식</p>
                  <p className="text-sm text-gray-600">4지선다</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 합격 기준:</strong> 과목당 40점 이상 + 전 과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세 정보</h2>
              {writtenSubjects.map((subject, idx) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-2xl text-white flex-shrink-0">
                        {subject.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{idx + 1}과목: {subject.name}</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{subject.questions}문항</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{subject.time}분</span>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-500 mb-4">
                          <span>난이도: <span className="text-green-600 font-medium">{subject.difficulty}</span></span>
                          <span>합격률: <span className="text-green-600 font-medium">{subject.passRate}</span></span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-2">📌 출제 토픽</h4>
                            <div className="flex flex-wrap gap-2">
                              {subject.topics.map((topic, i) => (
                                <span key={i} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 mb-2">💡 학습 팁</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {subject.tips.map((tip, i) => (
                                <li key={i}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4">
                          <Link
                            href={`/category/education/youth-instructor-2/study/${subject.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
                          >
                            📖 {subject.name} 학습하기 →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📅 2026년 시험 일정</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="p-3 text-left">회차</th>
                      <th className="p-3 text-left">원서접수</th>
                      <th className="p-3 text-left">필기시험</th>
                      <th className="p-3 text-left">필기발표</th>
                      <th className="p-3 text-left">면접시험</th>
                      <th className="p-3 text-left">최종발표</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule.map((schedule) => (
                      <tr key={schedule.round} className="border-b">
                        <td className="p-3 font-medium">{schedule.round}</td>
                        <td className="p-3">{schedule.apply}</td>
                        <td className="p-3 text-green-600 font-medium">{schedule.written}</td>
                        <td className="p-3">{schedule.writtenResult}</td>
                        <td className="p-3 text-green-600 font-medium">{schedule.interview}</td>
                        <td className="p-3">{schedule.finalResult}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 학습 전략 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 학습 전략</h2>
              <div className="space-y-4">
                {studyStrategy.map((phase, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800">{phase.phase}</h4>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{phase.weeks}</span>
                      </div>
                      <p className="text-sm text-gray-600">{phase.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 출제 경향 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 출제 경향 분석</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-800 mb-2">🔴 매회 출제</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 청소년기본법 조항</li>
                    <li>• 에릭슨 발달이론</li>
                    <li>• 프로그램 기획 단계</li>
                    <li>• 수련시설 유형</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-2">🟠 자주 출제</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• 피아제 인지발달</li>
                    <li>• 상담이론 비교</li>
                    <li>• 청소년활동 유형</li>
                    <li>• 미디어 리터러시</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">🟡 간헐 출제</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 국제협약</li>
                    <li>• 청소년 정책 역사</li>
                    <li>• 다문화 청소년</li>
                    <li>• 특수 상담기법</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 면접시험 개요 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 면접시험 개요</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{interviewInfo.format}</p>
                  <p className="text-sm text-gray-600">면접 형식</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{interviewInfo.duration}</p>
                  <p className="text-sm text-gray-600">소요 시간</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{interviewInfo.evaluators}</p>
                  <p className="text-sm text-gray-600">면접위원</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{interviewInfo.passScore}</p>
                  <p className="text-sm text-gray-600">합격 기준</p>
                </div>
              </div>
            </div>

            {/* 평가 영역 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 평가 영역</h2>
              <div className="space-y-4">
                {interviewInfo.areas.map((area, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{area.name}</h4>
                      <span className="text-green-600 font-bold">{area.weight}%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{area.description}</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                        style={{ width: `${area.weight}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 예상 질문 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💬 예상 질문</h2>
              <div className="space-y-3">
                {interviewInfo.sampleQuestions.map((question, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700">{question}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/category/education/youth-instructor-2/study/practical"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  🎯 면접 대비 학습하기 →
                </Link>
              </div>
            </div>

            {/* 면접 준비 팁 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 면접 준비 팁</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">✅ 해야 할 것</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 청소년 관련 법령 핵심 조항 암기</li>
                    <li>• 최근 청소년 정책 동향 파악</li>
                    <li>• 자기소개 및 지원동기 준비</li>
                    <li>• 모의 면접 연습 (녹화 추천)</li>
                    <li>• 청소년 현장 경험 사례 정리</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">❌ 피해야 할 것</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• 모르는 내용 억지로 답변</li>
                    <li>• 너무 길거나 두서없는 답변</li>
                    <li>• 청소년에 대한 부정적 표현</li>
                    <li>• 면접위원과 눈 맞춤 회피</li>
                    <li>• 자신감 없는 태도</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 면접 복장 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">👔 면접 복장 및 태도</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <span className="text-3xl mb-2 block">👔</span>
                  <h4 className="font-bold text-blue-800">복장</h4>
                  <p className="text-sm text-blue-700 mt-1">단정한 정장 또는 세미정장</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <span className="text-3xl mb-2 block">😊</span>
                  <h4 className="font-bold text-purple-800">표정</h4>
                  <p className="text-sm text-purple-700 mt-1">밝고 자연스러운 미소</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg text-center">
                  <span className="text-3xl mb-2 block">🗣️</span>
                  <h4 className="font-bold text-orange-800">말투</h4>
                  <p className="text-sm text-orange-700 mt-1">명확하고 차분한 어조</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/category/education/youth-instructor-2"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            ← 청소년지도사 2급 메인으로
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">시험 정보는 한국산업인력공단 공고를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
