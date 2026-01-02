'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Calculator, Function, TrendingUp, BarChart3, Compass, Target, Youtube } from 'lucide-react';

const subjects = [
  {
    id: 'math1',
    name: '수학 I',
    icon: Calculator,
    color: 'from-blue-500 to-indigo-600',
    description: '지수로그, 삼각함수, 수열',
    topics: ['지수', '로그', '지수함수/로그함수', '삼각함수', '수열'],
    difficulty: '중상',
    totalDays: 45,
    ratio: '공통',
  },
  {
    id: 'math2',
    name: '수학 II',
    icon: Function,
    color: 'from-indigo-500 to-purple-600',
    description: '함수의 극한, 미분, 적분',
    topics: ['함수의 극한', '함수의 연속', '미분계수', '도함수', '정적분'],
    difficulty: '상',
    totalDays: 45,
    ratio: '공통',
  },
  {
    id: 'prob-stat',
    name: '확률과 통계',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-600',
    description: '경우의 수, 확률, 통계',
    topics: ['순열/조합', '이항정리', '확률', '조건부확률', '정규분포'],
    difficulty: '중',
    totalDays: 30,
    ratio: '선택 (45.6%)',
  },
  {
    id: 'calculus',
    name: '미적분',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-600',
    description: '급수, 미분법, 적분법',
    topics: ['수열의 극한', '급수', '미분법', '적분법', '입체도형'],
    difficulty: '최상',
    totalDays: 40,
    ratio: '선택 (51.3%)',
  },
  {
    id: 'geometry',
    name: '기하',
    icon: Compass,
    color: 'from-orange-500 to-amber-600',
    description: '이차곡선, 벡터, 공간도형',
    topics: ['포물선', '타원/쌍곡선', '평면벡터', '공간도형', '정사영'],
    difficulty: '상',
    totalDays: 20,
    ratio: '선택 (3.1%)',
  },
  {
    id: 'mock-test',
    name: '실전 모의고사',
    icon: Target,
    color: 'from-red-500 to-rose-600',
    description: '시간 배분 전략, 실전 훈련',
    topics: ['시간 배분', '공통과목 실전', '선택과목 실전', '통합 모의'],
    difficulty: '최상',
    totalDays: 30,
    ratio: '종합',
  },
];

export default function MathSuneungPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/course/korean" className="text-gray-300 hover:text-white transition">
                국어 코스
              </Link>
              <Link href="/course/english-suneung" className="text-gray-300 hover:text-white transition">
                영어수능 코스
              </Link>
              <Link href="/course/exploration" className="text-gray-300 hover:text-white transition">
                탐구 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Youtube className="w-5 h-5" />
            <span className="text-sm font-medium">유튜브 참고 영상 연동</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            수능 수학 코스
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            AI와 함께하는 본격적인 수능 수학 준비<br />
            수학I · 수학II · 확률과통계 · 미적분 · 기하 · 실전
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">6개 코스</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">210일 콘텐츠</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">2023~2025 출제경향 반영</span>
          </div>
        </div>
      </section>

      {/* 학습 방법 안내 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl">1</span>
              </div>
              <span>AI 프롬프트 복사</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-xl">2</span>
              </div>
              <span>Claude/ChatGPT에 질문</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-xl">3</span>
              </div>
              <span>개념 정리 및 문제 풀이</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Youtube className="w-5 h-5 text-green-600" />
              </div>
              <span>유튜브 영상으로 심화</span>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 출제 경향 안내 */}
      <section className="py-8 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">2023~2025 수능 수학 출제 경향</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-indigo-600 mb-2">킬러문항 배제</h4>
              <p className="text-sm text-gray-600">극악한 난이도 감소, 준킬러 문항으로 변별</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-2">미적분 선택 51.3%</h4>
              <p className="text-sm text-gray-600">매년 증가 추세, 이과 필수 선택</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-pink-600 mb-2">주관식 변별력</h4>
              <p className="text-sm text-gray-600">22번, 30번이 최상위권 변별 핵심</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-rose-600 mb-2">개념 충실성</h4>
              <p className="text-sm text-gray-600">기술적 풀이보다 개념 이해 중시</p>
            </div>
          </div>
        </div>
      </section>

      {/* 코스 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const IconComponent = subject.icon;
            return (
              <Link
                key={subject.id}
                href={`/course/math-suneung/${subject.id}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{subject.name}</h2>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-white/30 px-2 py-0.5 rounded">{subject.ratio}</span>
                        <span className="text-xs bg-white/30 px-2 py-0.5 rounded">난이도: {subject.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{subject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {subject.topics.map((topic, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{subject.totalDays}일 과정</span>
                    <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
                      학습하기 <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 코스 구성 안내 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">코스 구성 안내</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">코스</th>
                  <th className="text-left py-3 px-4">영역</th>
                  <th className="text-center py-3 px-4">일수</th>
                  <th className="text-left py-3 px-4">주요 내용</th>
                  <th className="text-center py-3 px-4">배점</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">수학 I</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">공통</span></td>
                  <td className="text-center py-3 px-4">45일</td>
                  <td className="py-3 px-4">지수로그, 삼각함수, 수열</td>
                  <td className="text-center py-3 px-4">11문항</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">수학 II</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">공통</span></td>
                  <td className="text-center py-3 px-4">45일</td>
                  <td className="py-3 px-4">함수의 극한, 미분, 적분</td>
                  <td className="text-center py-3 px-4">11문항</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">확률과 통계</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">선택</span></td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">경우의 수, 확률, 통계</td>
                  <td className="text-center py-3 px-4">8문항 (26점)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">미적분</td>
                  <td className="py-3 px-4"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">선택</span></td>
                  <td className="text-center py-3 px-4">40일</td>
                  <td className="py-3 px-4">급수, 미분법, 적분법</td>
                  <td className="text-center py-3 px-4">8문항 (26점)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">기하</td>
                  <td className="py-3 px-4"><span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">선택</span></td>
                  <td className="text-center py-3 px-4">20일</td>
                  <td className="py-3 px-4">이차곡선, 벡터, 공간도형</td>
                  <td className="text-center py-3 px-4">8문항 (26점)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">실전 모의고사</td>
                  <td className="py-3 px-4"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">종합</span></td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">시간 배분, 실전 훈련</td>
                  <td className="text-center py-3 px-4">30문항 (100점)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 선택과목 안내 */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">선택과목 응시 현황 (2025학년도)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">51.3%</div>
              <p className="font-semibold text-gray-900">미적분</p>
              <p className="text-sm text-gray-500 mt-1">이과 계열 필수</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">45.6%</div>
              <p className="font-semibold text-gray-900">확률과 통계</p>
              <p className="text-sm text-gray-500 mt-1">문과 계열 선호</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3.1%</div>
              <p className="font-semibold text-gray-900">기하</p>
              <p className="text-sm text-gray-500 mt-1">특정 학과 필요시</p>
            </div>
          </div>
        </div>

        {/* 학습 권장 순서 */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">학습 권장 순서</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">기초</span>
              <p className="font-semibold">수학 I + 수학 II</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">선택</span>
              <p className="font-semibold">확통 or 미적분 or 기하</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">실전</span>
              <p className="font-semibold">실전 모의고사</p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
