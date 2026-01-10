'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ArchitectEngineerExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '건축계획',
      questions: 25,
      difficulty: '중',
      passRate: '40%',
      topics: [
        '건축계획 총론',
        '주거건축 계획',
        '상업·업무건축',
        '공공·문화건축',
        '교육·의료건축',
        '동선계획',
        '모듈러 설계',
        '친환경 건축',
      ],
      keyPoints: [
        '건축물 유형별 소요실 구성',
        '동선계획의 원칙과 유형',
        '주차장 설계기준',
        '피난계획과 안전구획',
      ],
      studyPath: '/category/construction/architect-engineer/study/building-planning',
    },
    {
      id: 2,
      name: '건축구조',
      questions: 25,
      difficulty: '상',
      passRate: '30%',
      topics: [
        '구조역학 기초',
        '하중 및 외력',
        '철근콘크리트구조',
        '철골구조',
        '조적·목구조',
        '기초구조',
        '내진설계',
        '구조계산',
      ],
      keyPoints: [
        '보·기둥 단면 설계',
        '철근 배근 및 정착 기준',
        '철골 접합부 설계',
        '기초의 종류와 선정기준',
      ],
      studyPath: '/category/construction/architect-engineer/study/building-structure',
    },
    {
      id: 3,
      name: '건축설비',
      questions: 25,
      difficulty: '중',
      passRate: '45%',
      topics: [
        '급수·급탕 설비',
        '배수·통기 설비',
        '냉난방 설비',
        '공기조화 설비',
        '환기 설비',
        '전기·조명 설비',
        '소화·방재 설비',
        '승강기 설비',
      ],
      keyPoints: [
        '급수방식별 특징 비교',
        '냉난방 부하 계산',
        '환기량 산정 방법',
        '소방설비 설치기준',
      ],
      studyPath: '/category/construction/architect-engineer/study/building-equipment',
    },
    {
      id: 4,
      name: '건축시공',
      questions: 25,
      difficulty: '중',
      passRate: '40%',
      topics: [
        '가설공사',
        '토공사·기초공사',
        '철근콘크리트공사',
        '철골공사',
        '조적·미장공사',
        '방수·단열공사',
        '마감공사',
        '적산·견적',
      ],
      keyPoints: [
        '콘크리트 타설 및 양생',
        '철근 이음·정착 길이',
        '방수공법별 시공방법',
        '공정관리와 품질관리',
      ],
      studyPath: '/category/construction/architect-engineer/study/building-construction',
    },
  ];

  const practicalAreas = [
    {
      name: '건축설계 도면',
      percentage: 40,
      items: [
        '평면도 작성 (축척 1/100)',
        '입면도 작성',
        '단면도 작성',
        '부분상세도',
        '창호도·마감표',
      ],
      frequency: '매회 출제',
    },
    {
      name: '건축적산',
      percentage: 25,
      items: [
        '수량산출서 작성',
        '면적·체적 산출',
        '단가 적용',
        '일위대가 작성',
        '견적서 작성',
      ],
      frequency: '매회 출제',
    },
    {
      name: '구조계산',
      percentage: 20,
      items: [
        '보 단면 설계',
        '기둥 단면 설계',
        '철근량 산정',
        '하중 계산',
        '처짐 검토',
      ],
      frequency: '자주 출제',
    },
    {
      name: '설비계획',
      percentage: 15,
      items: [
        '급배수 계통도',
        '냉난방 부하계산',
        '환기량 산정',
        '조명 설계',
        '피난계획',
      ],
      frequency: '자주 출제',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction" className="text-gray-500 hover:text-gray-700">건축·토목</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/construction/architect-engineer" className="text-gray-500 hover:text-gray-700">건축기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🏛️</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">건축기사 시험 상세정보</h1>
              <p className="text-orange-100">필기·실기 시험 구성과 합격 전략</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[52px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'written'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'practical'
                  ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">100문항</div>
                  <div className="text-sm text-gray-600">객관식 4지선다</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">2시간 30분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">60점 이상</div>
                  <div className="text-sm text-gray-600">평균 합격기준</div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-bold text-yellow-800 mb-2">⚠️ 과락 기준</h3>
                <p className="text-sm text-yellow-700">각 과목당 40점 미만 시 과락 처리됩니다. 평균 60점 이상이어도 한 과목이라도 40점 미만이면 불합격!</p>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세정보</h2>
              {writtenSubjects.map((subject) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">{subject.id}과목</span>
                        <h3 className="text-lg font-bold">{subject.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-orange-100">{subject.questions}문항</div>
                        <div className="text-xs text-orange-200">난이도: {subject.difficulty} | 합격률: {subject.passRate}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2">📖 출제 토픽</h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-700 mb-2">🎯 핵심 포인트</h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {subject.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-orange-500">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={subject.studyPath}
                      className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition font-medium text-sm"
                    >
                      📝 학습하기 →
                    </Link>
                  </div>
                </div>
              ))}
            </section>

            {/* 필기 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 필기 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 p-1 rounded">✓</span> 고득점 전략
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">1.</span>
                      <span><strong>건축계획</strong>은 각론 위주로 건물 유형별 특성 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">2.</span>
                      <span><strong>건축구조</strong>는 계산문제 공식 암기 및 반복 연습</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">3.</span>
                      <span><strong>건축설비</strong>는 시스템별 원리 이해 중심</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">4.</span>
                      <span><strong>건축시공</strong>은 공정순서와 품질관리 포인트 암기</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-700 flex items-center gap-2">
                    <span className="bg-red-100 text-red-600 p-1 rounded">!</span> 자주 틀리는 유형
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>철근 이음·정착 길이 계산</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>냉난방 부하 계산 공식</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>건축물 유형별 소요실 구성</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>콘크리트 배합설계 계산</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">필답형+작업형</div>
                  <div className="text-sm text-gray-600">복합형</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">약 6시간</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">100점 만점</div>
                  <div className="text-sm text-gray-600">배점</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">60점 이상</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">📌 시험 특징</h3>
                <p className="text-sm text-blue-700">작업형은 건축설계 도면 작성이 주요 출제영역입니다. 평면도, 입면도, 단면도 작성과 적산 문제가 함께 출제됩니다. CAD 사용이 아닌 수작업 제도입니다.</p>
              </div>
            </section>

            {/* 영역별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">📋 영역별 출제 비중</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{area.name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{area.percentage}%</div>
                          <div className="text-xs text-red-200">{area.frequency}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {area.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 출제경향 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 최근 출제경향</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 font-bold text-gray-700">출제 유형</th>
                      <th className="text-center py-2 px-3 font-bold text-gray-700">2024</th>
                      <th className="text-center py-2 px-3 font-bold text-gray-700">2025</th>
                      <th className="text-left py-2 px-3 font-bold text-gray-700">출제 빈도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { type: '평면도 작성', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '입면도 작성', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '단면도 작성', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '수량산출', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '철근량 계산', y24: '○', y25: '●', freq: '자주 출제' },
                      { type: '구조계산', y24: '●', y25: '○', freq: '자주 출제' },
                      { type: '설비계획', y24: '○', y25: '●', freq: '자주 출제' },
                      { type: '일위대가 작성', y24: '●', y25: '●', freq: '매회 출제' },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{row.type}</td>
                        <td className="text-center py-2 px-3 text-red-500">{row.y24}</td>
                        <td className="text-center py-2 px-3 text-red-500">{row.y25}</td>
                        <td className="py-2 px-3 text-gray-500">{row.freq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">● 출제됨 / ○ 일부 출제</p>
            </section>

            {/* 실기 대비 팁 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기 대비 팁</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">✅ 필수 연습 항목</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">1.</span>
                      <span>평면도 제도 연습 (축척 1/100, 1/200)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">2.</span>
                      <span>부분상세도 작성 (창호, 계단, 지붕)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">3.</span>
                      <span>적산 계산 연습 (면적, 체적, 수량)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">4.</span>
                      <span>철근량 산정 및 배근도 작성</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">📝 답안 작성 요령</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>도면은 정확한 축척과 치수 기입</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>선의 굵기 구분 (외곽선, 중심선, 치수선)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>적산은 계산 과정을 명확히 기재</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>시간 배분 철저 (도면 60%, 적산 40%)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 실기 학습 링크 */}
            <div className="flex justify-center">
              <Link
                href="/category/construction/architect-engineer/study/practical"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition"
              >
                <span className="text-2xl">✍️</span>
                <span>실기 문제 풀이하기</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
