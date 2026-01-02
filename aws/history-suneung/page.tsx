'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Landmark, Castle, Flag, Users, Scroll, Target, Youtube } from 'lucide-react';

const subjects = [
  {
    id: 'premodern',
    name: '전근대사',
    icon: Castle,
    color: 'from-amber-500 to-orange-600',
    description: '선사시대부터 조선시대까지',
    topics: ['고조선', '삼국시대', '고려', '조선 전기', '조선 후기'],
    difficulty: '중',
    totalDays: 20,
    ratio: '6문항 (30%)',
  },
  {
    id: 'modern',
    name: '근대사',
    icon: Scroll,
    color: 'from-blue-500 to-indigo-600',
    description: '개항기부터 대한제국까지',
    topics: ['강화도조약', '동학농민운동', '갑오개혁', '독립협회', '국권피탈'],
    difficulty: '중상',
    totalDays: 15,
    ratio: '5문항 (25%)',
  },
  {
    id: 'colonial',
    name: '일제강점기',
    icon: Flag,
    color: 'from-red-500 to-rose-600',
    description: '무단통치부터 광복까지',
    topics: ['무단통치', '3.1운동', '임시정부', '무장투쟁', '민족말살'],
    difficulty: '상',
    totalDays: 20,
    ratio: '5문항 (25%)',
  },
  {
    id: 'contemporary',
    name: '현대사',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    description: '광복부터 현재까지',
    topics: ['정부수립', '6.25전쟁', '민주화운동', '경제성장', '남북관계'],
    difficulty: '상',
    totalDays: 15,
    ratio: '4문항 (20%)',
  },
  {
    id: 'mock-test',
    name: '실전 모의고사',
    icon: Target,
    color: 'from-purple-500 to-pink-600',
    description: '기출분석 및 실전훈련',
    topics: ['시대별 기출', '유형별 문제', '실전 모의'],
    difficulty: '종합',
    totalDays: 20,
    ratio: '20문항',
  },
];

export default function HistorySuneungPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
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
              <Link href="/course/math-suneung" className="text-gray-300 hover:text-white transition">
                수학수능 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Youtube className="w-5 h-5" />
            <span className="text-sm font-medium">유튜브 참고 영상 연동</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            수능 한국사 코스
          </h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            AI와 함께하는 본격적인 수능 한국사 준비<br />
            전근대사 · 근대사 · 일제강점기 · 현대사 · 실전
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">5개 코스</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">90일 콘텐츠</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">절대평가 1등급 목표</span>
          </div>
        </div>
      </section>

      {/* 학습 방법 안내 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-xl">1</span>
              </div>
              <span>AI 프롬프트 복사</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">2</span>
              </div>
              <span>Claude/ChatGPT에 질문</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-xl">3</span>
              </div>
              <span>개념 정리 및 연표 암기</span>
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
      <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">2023~2025 수능 한국사 출제 경향</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-amber-600 mb-2">절대평가 유지</h4>
              <p className="text-sm text-gray-600">40점 이상 1등급, 체감 난이도 낮음</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-orange-600 mb-2">근현대사 70%</h4>
              <p className="text-sm text-gray-600">일제강점기, 현대사 비중 매우 높음</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-red-600 mb-2">남북관계 필수</h4>
              <p className="text-sm text-gray-600">정부별 남북관계 100% 출제</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-rose-600 mb-2">연표 암기 핵심</h4>
              <p className="text-sm text-gray-600">10년 단위 근현대사 연도 필수</p>
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
                href={`/course/history-suneung/${subject.id}`}
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
                    <span className="text-amber-600 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
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
                  <th className="text-left py-3 px-4">시대</th>
                  <th className="text-center py-3 px-4">일수</th>
                  <th className="text-left py-3 px-4">주요 내용</th>
                  <th className="text-center py-3 px-4">출제 비중</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">전근대사</td>
                  <td className="py-3 px-4"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">선사~조선</span></td>
                  <td className="text-center py-3 px-4">20일</td>
                  <td className="py-3 px-4">고조선, 삼국, 고려, 조선</td>
                  <td className="text-center py-3 px-4">6문항 (30%)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">근대사</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">개항~대한제국</span></td>
                  <td className="text-center py-3 px-4">15일</td>
                  <td className="py-3 px-4">개항, 동학, 갑오개혁, 국권피탈</td>
                  <td className="text-center py-3 px-4">5문항 (25%)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">일제강점기</td>
                  <td className="py-3 px-4"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">1910~1945</span></td>
                  <td className="text-center py-3 px-4">20일</td>
                  <td className="py-3 px-4">3.1운동, 임시정부, 독립운동</td>
                  <td className="text-center py-3 px-4">5문항 (25%)</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">현대사</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">1945~현재</span></td>
                  <td className="text-center py-3 px-4">15일</td>
                  <td className="py-3 px-4">정부수립, 6.25, 민주화, 남북관계</td>
                  <td className="text-center py-3 px-4">4문항 (20%)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">실전 모의고사</td>
                  <td className="py-3 px-4"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">종합</span></td>
                  <td className="text-center py-3 px-4">20일</td>
                  <td className="py-3 px-4">기출분석, 실전훈련</td>
                  <td className="text-center py-3 px-4">20문항 (100%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 등급 기준 안내 */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">한국사 등급 기준 (절대평가)</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-amber-600 mb-1">1등급</div>
              <p className="text-sm text-gray-600">40점 이상</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">2등급</div>
              <p className="text-sm text-gray-600">35~39점</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">3등급</div>
              <p className="text-sm text-gray-600">30~34점</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-rose-600 mb-1">4등급</div>
              <p className="text-sm text-gray-600">25~29점</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">5등급</div>
              <p className="text-sm text-gray-600">20~24점</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">대부분의 대학에서 3등급(30점) 이상이면 불이익 없음</p>
        </div>

        {/* 학습 권장 순서 */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">학습 권장 순서</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">기초</span>
              <p className="font-semibold">전근대사</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">핵심</span>
              <p className="font-semibold">근대사 + 일제강점기</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">필수</span>
              <p className="font-semibold">현대사</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">마무리</span>
              <p className="font-semibold">실전 모의고사</p>
            </div>
          </div>
        </div>

        {/* 필수 암기 연도 */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">필수 암기 연도 TOP 12</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <div className="font-bold text-amber-700">1876</div>
              <p className="text-xs text-gray-600">강화도조약</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-xl">
              <div className="font-bold text-amber-700">1894</div>
              <p className="text-xs text-gray-600">동학농민운동</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="font-bold text-blue-700">1897</div>
              <p className="text-xs text-gray-600">대한제국</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="font-bold text-blue-700">1910</div>
              <p className="text-xs text-gray-600">국권피탈</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="font-bold text-red-700">1919</div>
              <p className="text-xs text-gray-600">3.1운동</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <div className="font-bold text-red-700">1945</div>
              <p className="text-xs text-gray-600">8.15광복</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="font-bold text-green-700">1948</div>
              <p className="text-xs text-gray-600">정부수립</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="font-bold text-green-700">1950</div>
              <p className="text-xs text-gray-600">6.25전쟁</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="font-bold text-purple-700">1972</div>
              <p className="text-xs text-gray-600">7.4공동성명</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="font-bold text-purple-700">1980</div>
              <p className="text-xs text-gray-600">5.18민주화</p>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-xl">
              <div className="font-bold text-pink-700">1987</div>
              <p className="text-xs text-gray-600">6월항쟁</p>
            </div>
            <div className="text-center p-3 bg-pink-50 rounded-xl">
              <div className="font-bold text-pink-700">2000</div>
              <p className="text-xs text-gray-600">6.15선언</p>
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
