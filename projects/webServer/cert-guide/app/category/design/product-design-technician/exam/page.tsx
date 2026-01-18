'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductDesignTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const writtenSubjects = [
    {
      name: '디자인 일반',
      questions: 20,
      time: 30,
      passingRate: '55%',
      difficulty: '중',
      topics: ['디자인 역사와 사조', '조형의 원리', '색채학 기초', '디자인 프로세스', '디자인 방법론', '제품디자인 개론', '디자인 트렌드', '디자인 윤리']
    },
    {
      name: '인간공학',
      questions: 20,
      time: 30,
      passingRate: '50%',
      difficulty: '중',
      topics: ['인체측정학', '작업생리학', '인지공학 기초', '감성공학', '사용성 평가', '인터페이스 설계', '작업환경 설계', '유니버설 디자인']
    },
    {
      name: '재료 및 공정',
      questions: 20,
      time: 30,
      passingRate: '45%',
      difficulty: '중상',
      topics: ['금속재료', '플라스틱재료', '사출성형', '프레스가공', '표면처리', '도장/도금', '조립공정', '품질관리']
    },
    {
      name: 'CAD 실무',
      questions: 20,
      time: 30,
      passingRate: '55%',
      difficulty: '중',
      topics: ['2D CAD 기초', '3D 모델링', '렌더링 기법', '도면 작성법', '치수기입', '파일 관리', '출력 설정', '협업 도구']
    }
  ];

  const practicalAreas = [
    { name: '아이디어 발상', percentage: 20, items: ['썸네일 스케치', '컨셉 도출', '아이디어 전개', '독창성'] },
    { name: '디자인 전개', percentage: 25, items: ['형태 발전', '비례와 균형', '기능적 고려', '구조 표현'] },
    { name: '렌더링 표현', percentage: 30, items: ['채색 기법', '재질 표현', '명암 처리', '배경 처리'] },
    { name: '완성도', percentage: 25, items: ['3면도', '치수 표기', '전체 레이아웃', '프레젠테이션'] }
  ];

  const examTrends = [
    { topic: '디자인 역사/사조', frequency: '매회', importance: 'high' },
    { topic: '조형원리', frequency: '매회', importance: 'high' },
    { topic: '색채학', frequency: '매회', importance: 'high' },
    { topic: '인체측정', frequency: '자주', importance: 'medium' },
    { topic: '플라스틱 성형', frequency: '자주', importance: 'medium' },
    { topic: '3D 모델링', frequency: '자주', importance: 'medium' },
    { topic: '표면처리', frequency: '간헐', importance: 'low' },
    { topic: '유니버설 디자인', frequency: '간헐', importance: 'low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/product-design-technician" className="text-gray-500 hover:text-gray-700">제품디자인산업기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-teal-600 font-medium">시험 정보</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
              🪑
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">제품디자인산업기사 시험 정보</h1>
              <p className="text-gray-500">Industrial Product Design Technician Exam Guide</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setActiveTab('written')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'written'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                activeTab === 'practical'
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎨 실기시험
            </button>
          </div>
        </div>

        {/* Written Exam Content */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">과목수</p>
                  <p className="text-2xl font-bold text-teal-800">4과목</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">총 문항</p>
                  <p className="text-2xl font-bold text-cyan-800">80문항</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-sky-600">시험시간</p>
                  <p className="text-2xl font-bold text-sky-800">120분</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">합격기준</p>
                  <p className="text-2xl font-bold text-blue-800">60점</p>
                </div>
              </div>
            </div>

            {/* Subject Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">📚 과목별 상세</h2>
              <div className="space-y-6">
                {writtenSubjects.map((subject, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800">{subject.name}</h3>
                        <div className="flex gap-4 text-sm">
                          <span className="text-teal-600">{subject.questions}문항</span>
                          <span className="text-cyan-600">합격률 {subject.passingRate}</span>
                          <span className={`px-2 py-1 rounded ${
                            subject.difficulty === '중상' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'
                          }`}>{subject.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-3">핵심 출제 토픽</p>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, tidx) => (
                          <span key={tidx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link
                          href={`/category/design/product-design-technician/study/${
                            idx === 0 ? 'design-basics' : idx === 1 ? 'human-factors' : idx === 2 ? 'material-process' : 'cad-practice'
                          }`}
                          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 font-medium"
                        >
                          학습하러 가기 →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Trends */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 출제 경향</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">토픽</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">출제 빈도</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">중요도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examTrends.map((trend, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">{trend.topic}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm ${
                            trend.frequency === '매회' ? 'bg-red-100 text-red-700' :
                            trend.frequency === '자주' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>{trend.frequency}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${
                            trend.importance === 'high' ? 'bg-red-500' :
                            trend.importance === 'medium' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Study Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <h3 className="font-semibold text-teal-800 mb-3">📌 필수 암기 항목</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 디자인 사조별 특징과 대표 디자이너</li>
                    <li>• 조형원리 7가지 (균형, 조화, 비례 등)</li>
                    <li>• 색채 3속성과 배색 원리</li>
                    <li>• 인체측정 기준점과 백분위</li>
                    <li>• 플라스틱 종류별 특성</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <h3 className="font-semibold text-cyan-800 mb-3">⚠️ 주의 사항</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 과목당 40점 미만 시 과락</li>
                    <li>• 재료공정 과목은 꼼꼼한 학습 필요</li>
                    <li>• 유사 용어 구분 주의 (예: 점이 vs 반복)</li>
                    <li>• 최신 기출문제 3개년 필수 풀이</li>
                    <li>• CBT 시험 환경에 미리 적응</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Content */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎨 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-teal-600">시험 유형</p>
                  <p className="text-2xl font-bold text-teal-800">작업형</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-cyan-600">시험시간</p>
                  <p className="text-2xl font-bold text-cyan-800">5시간</p>
                </div>
                <div className="bg-sky-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-sky-600">합격기준</p>
                  <p className="text-2xl font-bold text-sky-800">60점</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600">준비물</p>
                  <p className="text-2xl font-bold text-blue-800">개인지참</p>
                </div>
              </div>
            </div>

            {/* Evaluation Areas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">📐 평가 영역별 상세</h2>
              <div className="space-y-4">
                {practicalAreas.map((area, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800">{area.name}</h3>
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-bold">
                        {area.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${area.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.items.map((item, iidx) => (
                        <span key={iidx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Process */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 시험 진행 과정</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200"></div>
                <div className="space-y-6">
                  {[
                    { time: '0:00', title: '문제 확인', desc: '주제 파악 및 작업 계획 수립' },
                    { time: '0:30', title: '아이디어 스케치', desc: '썸네일 스케치 10~15개 이상 작성' },
                    { time: '1:00', title: '디자인 전개', desc: '선정 아이디어 3~4개 상세 전개' },
                    { time: '2:00', title: '최종 디자인 선정', desc: '렌더링할 디자인 1개 확정' },
                    { time: '2:30', title: '렌더링 작업', desc: '채색, 재질 표현, 명암 처리' },
                    { time: '4:00', title: '3면도 작성', desc: '정면/측면/평면도 및 치수 기입' },
                    { time: '4:30', title: '마무리', desc: '레이아웃 정리, 최종 점검' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start pl-8">
                      <div className="absolute left-2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white"></div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-teal-600 font-mono font-bold">{step.time}</span>
                          <span className="font-semibold text-gray-800">{step.title}</span>
                        </div>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Required Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🛠️ 준비물</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <h3 className="font-semibold text-teal-800 mb-2">✏️ 스케치 도구</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 연필 (2B, 4B, 6B)</li>
                    <li>• 샤프 (0.5mm)</li>
                    <li>• 지우개</li>
                    <li>• 마카 (그레이톤)</li>
                  </ul>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <h3 className="font-semibold text-cyan-800 mb-2">🎨 채색 도구</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 마카 (컬러)</li>
                    <li>• 파스텔</li>
                    <li>• 색연필</li>
                    <li>• 포스카 (화이트)</li>
                  </ul>
                </div>
                <div className="p-4 bg-sky-50 rounded-xl">
                  <h3 className="font-semibold text-sky-800 mb-2">📏 제도 도구</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 자 (30cm, 삼각자)</li>
                    <li>• 컴퍼스</li>
                    <li>• 운형자</li>
                    <li>• 디바이더</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기 합격 팁</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">✅ 해야 할 것</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 아이디어 스케치 최소 10개 이상</li>
                    <li>• 3면도에 치수 반드시 기입</li>
                    <li>• 재질감 표현에 신경쓰기</li>
                    <li>• 시간 배분 철저히 하기</li>
                    <li>• 깔끔한 레이아웃 유지</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-3">❌ 피해야 할 것</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 너무 복잡한 형태 시도</li>
                    <li>• 시간 배분 없이 진행</li>
                    <li>• 렌더링에만 시간 투자</li>
                    <li>• 3면도 생략하기</li>
                    <li>• 지저분한 마감</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/category/design/product-design-technician"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg text-gray-700 hover:bg-gray-50 transition"
          >
            ← 제품디자인산업기사 홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
