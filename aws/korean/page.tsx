'use client';

import Link from 'next/link';
import { Brain, ChevronRight, BookOpen, FileText, MessageSquare, Languages, Target, Youtube } from 'lucide-react';

const subjects = [
  {
    id: 'reading',
    name: '독서 (비문학)',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-600',
    description: '다양한 제재의 지문을 읽고 이해하는 능력 향상',
    topics: ['독서론', '인문', '사회', '과학', '기술', '예술', '융합형'],
    difficulty: '중상',
    totalDays: 45,
    ratio: '공통',
  },
  {
    id: 'literature',
    name: '문학',
    icon: FileText,
    color: 'from-purple-500 to-pink-600',
    description: '현대시, 현대소설, 고전시가, 고전소설 작품 분석',
    topics: ['현대시', '현대소설', '고전시가', '고전소설', '복합지문'],
    difficulty: '중상',
    totalDays: 45,
    ratio: '공통',
  },
  {
    id: 'speech-writing',
    name: '화법과 작문',
    icon: MessageSquare,
    color: 'from-green-500 to-teal-600',
    description: '화법 이론과 작문 실전 능력 배양',
    topics: ['화법 이론', '작문 이론', '화법 실전', '작문 실전', '복합'],
    difficulty: '중',
    totalDays: 30,
    ratio: '선택',
  },
  {
    id: 'language-media',
    name: '언어와 매체',
    icon: Languages,
    color: 'from-orange-500 to-red-600',
    description: '음운론, 형태론, 통사론, 중세국어, 매체언어',
    topics: ['음운론', '형태론', '통사론', '중세국어', '매체언어'],
    difficulty: '상',
    totalDays: 30,
    ratio: '선택',
  },
  {
    id: 'suneung-korean',
    name: '수능 국어 실전',
    icon: Target,
    color: 'from-red-500 to-rose-600',
    description: '실전 모의고사와 고난도 문제 집중 훈련',
    topics: ['시간 배분', '독서 고난도', '문학 고난도', '선택과목', '실전 모의'],
    difficulty: '최상',
    totalDays: 45,
    ratio: '종합',
  },
];

export default function KoreanCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
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
              <Link href="/course/english" className="text-gray-300 hover:text-white transition">
                영어 코스
              </Link>
              <Link href="/course/math" className="text-gray-300 hover:text-white transition">
                수학 코스
              </Link>
              <Link href="/course/exploration" className="text-gray-300 hover:text-white transition">
                탐구 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Youtube className="w-5 h-5" />
            <span className="text-sm font-medium">유튜브 참고 영상 연동</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            수능 국어 코스
          </h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            AI와 함께하는 체계적인 국어 학습<br />
            독서 · 문학 · 화법과작문 · 언어와매체 · 실전
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">5개 코스</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">195일 콘텐츠</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">2023~2025 출제경향 반영</span>
          </div>
        </div>
      </section>

      {/* 학습 방법 안내 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                <span className="text-xl">1</span>
              </div>
              <span>AI 프롬프트 복사</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl">2</span>
              </div>
              <span>ChatGPT/Claude에 질문</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
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
      <section className="py-8 bg-gradient-to-r from-rose-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">2023~2025 수능 국어 출제 경향</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-rose-600 mb-2">킬러문항 배제</h4>
              <p className="text-sm text-gray-600">초고난도 문항 감소, 중상 난이도 문항 증가</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-orange-600 mb-2">문학 변별력 강화</h4>
              <p className="text-sm text-gray-600">현대시/현대소설 해석 난이도 상승</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-yellow-600 mb-2">융합형 지문 증가</h4>
              <p className="text-sm text-gray-600">(가)(나) 복합 지문 6문항 세트 출제</p>
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
                href={`/course/korean/${subject.id}`}
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
                    <span className="text-rose-600 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
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
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">독서 (비문학)</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">공통</span></td>
                  <td className="text-center py-3 px-4">45일</td>
                  <td className="py-3 px-4">독서론, 인문, 사회, 과학, 기술, 예술, 융합형 지문</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">문학</td>
                  <td className="py-3 px-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">공통</span></td>
                  <td className="text-center py-3 px-4">45일</td>
                  <td className="py-3 px-4">현대시, 현대소설, 고전시가, 고전소설, 복합지문</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">화법과 작문</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">선택</span></td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">화법/작문 이론, 실전 문제, 복합 유형</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">언어와 매체</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">선택</span></td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">음운론, 형태론, 통사론, 중세국어, 매체언어</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">수능 국어 실전</td>
                  <td className="py-3 px-4"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs">종합</span></td>
                  <td className="text-center py-3 px-4">45일</td>
                  <td className="py-3 px-4">시간 배분, 고난도 집중, 실전 모의고사</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 학습 권장 순서 */}
        <div className="mt-8 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">학습 권장 순서</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">기초</span>
              <p className="font-semibold">독서 + 문학</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">선택</span>
              <p className="font-semibold">화작 또는 언매</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">심화</span>
              <p className="font-semibold">수능 국어 실전</p>
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
