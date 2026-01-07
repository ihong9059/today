'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TeacherExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      name: '교육학',
      time: '60분',
      type: '논술 1문항',
      score: '20점',
      color: 'blue',
      topics: [
        '교육심리학 (발달, 학습, 동기)',
        '교육과정 (편성, 운영, 유형)',
        '교육평가 (유형, 방법, 문항)',
        '교육행정 (조직, 장학, 리더십)',
        '교육사회학 (기능론, 갈등론)',
        '교육철학 (항존주의, 진보주의)',
        '생활지도 및 상담',
        '교육공학 및 교수설계'
      ],
      tips: '핵심 이론가와 개념을 키워드 중심으로 암기하세요'
    },
    {
      name: '전공 A (교과내용학)',
      time: '90분',
      type: '기입형 4문항 + 서술형 8문항',
      score: '40점',
      color: 'green',
      topics: [
        '전공 교과의 기본 개념 및 원리',
        '교과별 핵심 이론 및 학자',
        '교과 내용의 구조와 체계',
        '최신 학문 동향 및 쟁점',
        '기입형: 용어, 개념, 수식 등',
        '서술형: 설명, 비교, 적용 문제',
        '교과별 특수 영역',
        '통합적 사고력 문제'
      ],
      tips: '기본서를 완벽히 숙지하고 기출 유형을 분석하세요'
    },
    {
      name: '전공 B (교과교육학+내용학)',
      time: '90분',
      type: '기입형 2문항 + 서술형 9문항',
      score: '40점',
      color: 'purple',
      topics: [
        '교과교육론 (목표, 내용, 방법)',
        '교과교육과정 (성취기준, 핵심역량)',
        '교수학습 방법 및 모형',
        '교과 평가 방법 및 도구',
        '교과 교재 연구 및 지도',
        '학습자 특성에 따른 지도',
        '교과 융합 및 통합 지도',
        '교과내용학 심화 문제'
      ],
      tips: '교육과정 문서를 꼼꼼히 읽고 교과교육학 이론을 연결하세요'
    }
  ];

  const secondExamAreas = [
    {
      name: '교직논술',
      time: '60분',
      type: '논술형',
      weight: '30~40%',
      color: 'purple',
      details: [
        { topic: '교육정책 및 현안', items: ['교육과정 정책', '평가 정책', '학교 자치', '디지털 교육'] },
        { topic: '학생지도', items: ['생활지도', '학교폭력', '다문화 교육', '특수교육'] },
        { topic: '교직관', items: ['교사 전문성', '교사 윤리', '교사 역할', '수업 전문성'] },
        { topic: '논술 구성', items: ['서론-본론-결론', '논리적 전개', '근거 제시', '분량 조절'] }
      ],
      trend: '최근 교육정책, 미래교육, 학생 인권 관련 출제 증가'
    },
    {
      name: '수업실연',
      time: '15~20분',
      type: '시연형',
      weight: '30~40%',
      color: 'orange',
      details: [
        { topic: '지도안 작성', items: ['학습목표 설정', '도입-전개-정리', '학습활동 구성', '평가 계획'] },
        { topic: '수업 시연', items: ['발문 기술', '판서 구성', '매체 활용', '시간 관리'] },
        { topic: '학생 상호작용', items: ['참여 유도', '피드백 제공', '개별화 지도', '동기 유발'] },
        { topic: '교과 특성', items: ['교과별 특수성', '활동 중심 수업', '탐구 수업', '협동 학습'] }
      ],
      trend: '학생 중심 수업, 과정중심평가 연계 출제 증가'
    },
    {
      name: '심층면접',
      time: '15~20분',
      type: '구술형',
      weight: '20~30%',
      color: 'teal',
      details: [
        { topic: '교직 적성', items: ['교직 동기', '교육관', '학생관', '수업관'] },
        { topic: '상황 대처', items: ['학교폭력', '학부모 민원', '학생 갈등', '수업 문제'] },
        { topic: '인성 및 태도', items: ['의사소통', '협력', '책임감', '윤리의식'] },
        { topic: '집단토론', items: ['찬반 토론', '문제 해결', '합의 도출', '역할 분담'] }
      ],
      trend: '구체적 사례 제시, 상황판단형 질문 증가'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/teacher-certificate" className="text-gray-600 hover:text-indigo-600">교원자격증</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/education/teacher-certificate" className="text-indigo-200 hover:text-white mb-4 inline-block">
            ← 교원자격증 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">교원임용시험 상세 안내</h1>
          <p className="text-indigo-100">1차 필기시험과 2차 시험 구성을 상세히 알아보세요</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'first'
                ? 'bg-indigo-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 1차 시험 (필기)
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'second'
                ? 'bg-purple-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎤 2차 시험 (논술/실연/면접)
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'first' ? (
          <div className="space-y-8">
            {/* 1차 시험 개요 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">1차 시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-sm text-gray-500">시험 영역</div>
                  <div className="font-bold text-gray-800">3영역</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">⏱️</div>
                  <div className="text-sm text-gray-500">총 시험시간</div>
                  <div className="font-bold text-gray-800">240분</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">📝</div>
                  <div className="text-sm text-gray-500">총 배점</div>
                  <div className="font-bold text-gray-800">100점</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-sm text-gray-500">합격 기준</div>
                  <div className="font-bold text-gray-800">선발배수</div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 합격 기준:</strong> 시·도교육청별로 선발 예정 인원의 일정 배수(보통 1.5~2배)를
                  1차 합격자로 선발합니다. 과목별 과락(40% 미만) 시 불합격됩니다.
                </p>
              </div>
            </section>

            {/* 영역별 상세 */}
            {firstExamSubjects.map((subject, index) => (
              <section key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className={`bg-${subject.color}-500 text-white p-6`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                      <p className="text-sm opacity-90">시험시간: {subject.time} | {subject.type} | 배점: {subject.score}</p>
                    </div>
                    <Link
                      href={`/category/education/teacher-certificate/study/${index === 0 ? 'education-theory' : 'major-subject'}`}
                      className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-800 mb-4">📌 주요 출제 영역</h4>
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <span className={`w-2 h-2 bg-${subject.color}-500 rounded-full`}></span>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`bg-${subject.color}-50 rounded-xl p-4 border border-${subject.color}-200`}>
                    <p className="text-sm text-gray-700">
                      <strong>💡 학습 전략:</strong> {subject.tips}
                    </p>
                  </div>
                </div>
              </section>
            ))}

            {/* 1차 합격 전략 */}
            <section className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">🎯 1차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">교육학 공략법</h3>
                  <ul className="space-y-2 text-indigo-100">
                    <li>• 주요 이론가 이름과 핵심 개념 연결 암기</li>
                    <li>• 교육과정 문서(2022 개정 등) 숙지</li>
                    <li>• 최근 교육정책 트렌드 파악</li>
                    <li>• 논술 답안 구조화 연습 (서론-본론-결론)</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">전공 공략법</h3>
                  <ul className="space-y-2 text-indigo-100">
                    <li>• 기본서 3회독 후 심화서 학습</li>
                    <li>• 기출문제 10개년 완벽 분석</li>
                    <li>• 기입형은 정확한 용어 암기</li>
                    <li>• 서술형은 키워드 중심 답안 작성</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 2차 시험 개요 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">2차 시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">📋</div>
                  <div className="text-sm text-gray-500">시험 영역</div>
                  <div className="font-bold text-gray-800">3영역</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">⏱️</div>
                  <div className="text-sm text-gray-500">총 소요시간</div>
                  <div className="font-bold text-gray-800">1~2일</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-sm text-gray-500">평가 방식</div>
                  <div className="font-bold text-gray-800">절대평가</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-sm text-gray-500">합격 기준</div>
                  <div className="font-bold text-gray-800">1+2차 합산</div>
                </div>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>💡 참고:</strong> 2차 시험은 시·도교육청마다 형식과 배점이 다릅니다.
                  지원 지역의 기출 유형을 반드시 확인하세요. 일부 지역은 집단토론을 시행합니다.
                </p>
              </div>
            </section>

            {/* 영역별 상세 */}
            {secondExamAreas.map((area, index) => (
              <section key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className={`bg-${area.color}-500 text-white p-6`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{area.name}</h3>
                      <p className="text-sm opacity-90">시간: {area.time} | {area.type} | 비중: {area.weight}</p>
                    </div>
                    <Link
                      href={`/category/education/teacher-certificate/study/${index === 0 ? 'teaching-essay' : index === 1 ? 'class-demonstration' : 'interview'}`}
                      className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                    >
                      학습하기 →
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    {area.details.map((detail, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-800 mb-2">{detail.topic}</h4>
                        <div className="flex flex-wrap gap-2">
                          {detail.items.map((item, j) => (
                            <span key={j} className={`px-2 py-1 bg-${area.color}-100 text-${area.color}-700 rounded text-sm`}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`bg-${area.color}-50 rounded-xl p-4 border border-${area.color}-200`}>
                    <p className="text-sm text-gray-700">
                      <strong>📊 최근 출제 경향:</strong> {area.trend}
                    </p>
                  </div>
                </div>
              </section>
            ))}

            {/* 2차 합격 전략 */}
            <section className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">🎯 2차 시험 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">✍️ 교직논술</h3>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• 교육정책 관련 시사 상식</li>
                    <li>• 논술 구조화 연습</li>
                    <li>• 첨삭 스터디 참여</li>
                    <li>• 분량 조절 훈련</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">🎓 수업실연</h3>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• 지도안 작성 연습</li>
                    <li>• 발문 기술 훈련</li>
                    <li>• 카메라 촬영 자기분석</li>
                    <li>• 스터디 피드백</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">💬 면접</h3>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    <li>• 예상 질문 정리</li>
                    <li>• 모의면접 참여</li>
                    <li>• 비언어적 표현 연습</li>
                    <li>• 교직관 정립</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 지역별 특징 */}
            <section className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 시·도별 2차 시험 특징</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-700">지역</th>
                      <th className="text-center p-4 font-semibold text-gray-700">논술</th>
                      <th className="text-center p-4 font-semibold text-gray-700">수업실연</th>
                      <th className="text-center p-4 font-semibold text-gray-700">면접</th>
                      <th className="text-center p-4 font-semibold text-gray-700">특이사항</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">서울</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center text-sm text-gray-600">집단면접 포함</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">경기</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center text-sm text-gray-600">교과별 상이</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">인천</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center text-sm text-gray-600">-</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-medium">부산</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center">○</td>
                      <td className="p-4 text-center text-sm text-gray-600">집단토론</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                ※ 상세 내용은 각 시·도교육청 공고를 확인하세요.
              </p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
