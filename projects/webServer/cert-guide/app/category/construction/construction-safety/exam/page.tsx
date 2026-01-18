'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ConstructionSafetyExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      id: 1,
      name: '안전관리론',
      questions: 25,
      difficulty: '중',
      passRate: '45%',
      topics: [
        '안전관리 개요 및 조직',
        '재해발생 원인분석',
        '위험성평가 기법',
        '안전점검 및 진단',
        '휴먼에러와 불안전행동',
        '안전교육훈련',
        'KOSHA-MS/ISO45001',
        '무재해운동',
      ],
      keyPoints: [
        '하인리히 법칙과 버드의 법칙 구분',
        '재해발생 4M 요인 분석',
        '위험성평가 4단계 절차',
        'KOSHA-MS 구축 요건',
      ],
      studyPath: '/category/construction/construction-safety/study/safety-management',
    },
    {
      id: 2,
      name: '건설안전기술',
      questions: 25,
      difficulty: '상',
      passRate: '35%',
      topics: [
        '가설공사 안전',
        '굴착·흙막이 공사',
        '콘크리트 공사',
        '철골공사 안전',
        '해체공사 안전',
        '타워크레인 작업',
        '고소작업 안전',
        '전기·화재 안전',
      ],
      keyPoints: [
        '비계 설치기준과 점검사항',
        '흙막이 가시설 안전',
        '양중작업 신호수 배치',
        '밀폐공간 작업 안전수칙',
      ],
      studyPath: '/category/construction/construction-safety/study/construction-safety',
    },
    {
      id: 3,
      name: '건설재료학',
      questions: 25,
      difficulty: '중',
      passRate: '50%',
      topics: [
        '시멘트의 종류와 특성',
        '콘크리트 배합설계',
        '골재의 품질기준',
        '철근·철골 재료',
        '목재의 특성과 결함',
        '방수·방습 재료',
        '단열재료',
        '도장재료',
      ],
      keyPoints: [
        '시멘트 분말도와 강도 관계',
        '콘크리트 슬럼프 시험',
        '철근의 기계적 성질',
        '방수공법별 특징 비교',
      ],
      studyPath: '/category/construction/construction-safety/study/construction-materials',
    },
    {
      id: 4,
      name: '산업안전관계법규',
      questions: 25,
      difficulty: '중',
      passRate: '40%',
      topics: [
        '산업안전보건법 총칙',
        '안전보건관리체제',
        '안전보건교육',
        '유해·위험작업 규제',
        '건설기술진흥법',
        '산업안전보건기준규칙',
        '중대재해처벌법',
        '벌칙 규정',
      ],
      keyPoints: [
        '안전관리자 선임기준',
        '안전보건교육 시간 및 내용',
        '유해·위험작업 취업제한',
        '중대재해 발생 시 조치사항',
      ],
      studyPath: '/category/construction/construction-safety/study/safety-law',
    },
  ];

  const practicalAreas = [
    {
      name: '안전관리계획',
      percentage: 30,
      items: [
        '건설공사 위험성평가 실시',
        '안전관리 조직 구성',
        '비상대응계획 수립',
        '안전점검표 작성',
        '작업별 안전작업허가서',
      ],
      frequency: '매회 출제',
    },
    {
      name: '가설공사 안전',
      percentage: 25,
      items: [
        '강관비계 설치 검토',
        '시스템동바리 구조검토',
        '작업발판 설치기준',
        '안전난간 설치',
        '낙하물방지망 설치',
      ],
      frequency: '매회 출제',
    },
    {
      name: '건설기계 안전',
      percentage: 20,
      items: [
        '타워크레인 작업계획',
        '양중작업 안전수칙',
        '굴착기 작업 안전',
        '고소작업대 사용',
        '항타기·항발기 안전',
      ],
      frequency: '자주 출제',
    },
    {
      name: '재해사례 분석',
      percentage: 25,
      items: [
        '재해원인 분석(4M)',
        '재발방지 대책 수립',
        '유사재해 예방조치',
        '법규 위반사항 판단',
        '개선대책 제시',
      ],
      frequency: '매회 출제',
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
            <Link href="/category/construction/construction-safety" className="text-gray-500 hover:text-gray-700">건설안전기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🦺</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">건설안전기사 시험 상세정보</h1>
              <p className="text-amber-100">필기·실기 시험 구성과 합격 전략</p>
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
                  ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'practical'
                  ? 'text-amber-600 border-b-2 border-amber-600 bg-amber-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🔧 실기시험
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
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">4과목</div>
                  <div className="text-sm text-gray-600">시험 과목</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">100문항</div>
                  <div className="text-sm text-gray-600">객관식 4지선다</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">2시간 30분</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">60점 이상</div>
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
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">{subject.id}과목</span>
                        <h3 className="text-lg font-bold">{subject.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-amber-100">{subject.questions}문항</div>
                        <div className="text-xs text-amber-200">난이도: {subject.difficulty} | 합격률: {subject.passRate}</div>
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
                            <span className="text-amber-500">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={subject.studyPath}
                      className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition font-medium text-sm"
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
                      <span><strong>안전관리론</strong>은 개념 위주로 확실히 이해하고 70점 이상 목표</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">2.</span>
                      <span><strong>건설안전기술</strong>은 가설공사, 기계안전 사례 중심 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">3.</span>
                      <span><strong>법규</strong>는 최신 개정사항 반드시 체크 (산안법, 중대재해법)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">4.</span>
                      <span><strong>재료학</strong>은 비교표로 정리하면 효율적</span>
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
                      <span>비계 종류별 설치기준 혼동</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>안전관리자 선임기준 착오</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>시멘트 종류별 특성 혼동</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">•</span>
                      <span>안전교육 시간·대상 구분</span>
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">필답형</div>
                  <div className="text-sm text-gray-600">시험 유형</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">3시간</div>
                  <div className="text-sm text-gray-600">시험 시간</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">100점 만점</div>
                  <div className="text-sm text-gray-600">배점</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">60점 이상</div>
                  <div className="text-sm text-gray-600">합격기준</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">📌 시험 특징</h3>
                <p className="text-sm text-blue-700">주관식 서술형으로 출제되며, 현장 사례를 바탕으로 위험요인 분석, 안전대책 수립, 법규 적용 등을 묻습니다. 단순 암기보다 응용력이 중요합니다.</p>
              </div>
            </section>

            {/* 영역별 상세 */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">📋 영역별 출제 비중</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">{area.name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{area.percentage}%</div>
                          <div className="text-xs text-orange-200">{area.frequency}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {area.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
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
                      { type: '위험성평가 실시', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '비계·동바리 안전검토', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '타워크레인 작업계획', y24: '●', y25: '○', freq: '자주 출제' },
                      { type: '재해사례 분석', y24: '●', y25: '●', freq: '매회 출제' },
                      { type: '밀폐공간 작업안전', y24: '○', y25: '●', freq: '자주 출제' },
                      { type: '굴착작업 안전', y24: '●', y25: '○', freq: '자주 출제' },
                      { type: '안전관리계획서', y24: '○', y25: '●', freq: '자주 출제' },
                      { type: '법규 적용 판단', y24: '●', y25: '●', freq: '매회 출제' },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3">{row.type}</td>
                        <td className="text-center py-2 px-3 text-orange-500">{row.y24}</td>
                        <td className="text-center py-2 px-3 text-orange-500">{row.y25}</td>
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
                  <h3 className="font-bold text-gray-700">✅ 필수 암기 항목</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">1.</span>
                      <span>위험성평가 4단계: 유해위험요인 파악 → 위험성 결정 → 위험성 감소대책 수립 → 기록</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">2.</span>
                      <span>비계 설치기준 (강관비계, 시스템비계 각각)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">3.</span>
                      <span>재해원인 분석법 (4M: Man, Machine, Media, Management)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">4.</span>
                      <span>안전관리자 선임기준 (상시근로자 50인 이상 등)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-gray-700">📝 답안 작성 요령</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>번호를 매겨 항목별로 구분하여 서술</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>법규 근거가 있으면 조문명 기재</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>수치가 있는 기준은 정확히 기재</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">•</span>
                      <span>그림이나 도식이 필요하면 간단히 작성</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 실기 학습 링크 */}
            <div className="flex justify-center">
              <Link
                href="/category/construction/construction-safety/study/practical"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition"
              >
                <span className="text-2xl">📝</span>
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
