'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Headphones, BookOpen, FileText, Languages, Target, Youtube, Sparkles } from 'lucide-react';

const subjects = [
  {
    id: 'listening',
    name: '듣기',
    icon: Headphones,
    color: 'from-blue-500 to-cyan-600',
    description: '17문항 유형별 집중 훈련',
    topics: ['목적/의견', '관계/장소', '그림/도표', '숫자/시간', '장문 듣기'],
    difficulty: '중',
    totalDays: 30,
  },
  {
    id: 'reading-basic',
    name: '독해 기초',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    description: '글 유형별 접근법 (주제, 요지, 제목)',
    topics: ['주제/요지', '제목 추론', '목적/심경', '도표/일치', '어법/어휘'],
    difficulty: '중',
    totalDays: 30,
  },
  {
    id: 'reading-advanced',
    name: '독해 심화',
    icon: FileText,
    color: 'from-purple-500 to-violet-600',
    description: '빈칸, 순서, 삽입 고난도 유형',
    topics: ['빈칸 추론 (어구)', '빈칸 추론 (문장)', '함축 의미', '글의 순서', '문장 삽입'],
    difficulty: '상',
    totalDays: 35,
  },
  {
    id: 'vocabulary',
    name: '어휘/문법',
    icon: Languages,
    color: 'from-orange-500 to-amber-600',
    description: '수능 필수 어휘 1,800 + 핵심 문법',
    topics: ['필수 어휘 600×3', '핵심 문법 30', '어법 실전'],
    difficulty: '중',
    totalDays: 25,
  },
  {
    id: 'ebs',
    name: 'EBS 연계',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-600',
    description: '수능특강, 수능완성 지문 분석',
    topics: ['수능특강 영어', '수능특강 영어독해연습', '수능완성'],
    difficulty: '중상',
    totalDays: 30,
  },
  {
    id: 'mock-test',
    name: '실전 모의고사',
    icon: Target,
    color: 'from-red-500 to-rose-600',
    description: '시간 배분 전략, 실전 훈련',
    topics: ['시간 배분', '듣기+독해 통합', '고난도 집중', '실전 모의'],
    difficulty: '최상',
    totalDays: 30,
  },
];

export default function EnglishSuneungPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <Link href="/course/math-suneung" className="text-gray-300 hover:text-white transition">
                수학수능 코스
              </Link>
              <Link href="/course/exploration" className="text-gray-300 hover:text-white transition">
                탐구 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Youtube className="w-5 h-5" />
            <span className="text-sm font-medium">유튜브 참고 영상 연동</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            수능 영어 코스
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            AI와 함께하는 본격적인 수능 영어 준비<br />
            듣기 · 독해 기초/심화 · 어휘/문법 · EBS 연계 · 실전
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">6개 코스</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">180일 콘텐츠</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">2023~2025 출제경향 반영</span>
          </div>
        </div>
      </section>

      {/* 학습 방법 안내 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">1</span>
              </div>
              <span>AI 프롬프트 복사</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl">2</span>
              </div>
              <span>Claude/ChatGPT에 질문</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
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
      <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">2023~2025 수능 영어 출제 경향</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">빈칸 추론 강화</h4>
              <p className="text-sm text-gray-600">오답률 70~85%, 논리 흐름 파악 필수</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-indigo-600 mb-2">순서/삽입 변별</h4>
              <p className="text-sm text-gray-600">a/the, 대명사, 지시어 분석 중요</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-2">문장 길이 증가</h4>
              <p className="text-sm text-gray-600">개별 문장 복잡도 상승, 구조 파악 필요</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-pink-600 mb-2">EBS 간접연계</h4>
              <p className="text-sm text-gray-600">53.3% 연계, 지문 분석 능력 필요</p>
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
                href={`/course/english-suneung/${subject.id}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{subject.name}</h2>
                      <span className="text-xs bg-white/30 px-2 py-0.5 rounded">난이도: {subject.difficulty}</span>
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
                    <span className="text-blue-600 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
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
                  <th className="text-center py-3 px-4">일수</th>
                  <th className="text-left py-3 px-4">주요 내용</th>
                  <th className="text-center py-3 px-4">수능 문항</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">듣기</td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">목적/의견, 관계/장소, 숫자/시간, 장문 듣기</td>
                  <td className="text-center py-3 px-4">1~17번</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">독해 기초</td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">주제/요지, 제목, 목적/심경, 도표/일치</td>
                  <td className="text-center py-3 px-4">18~30번</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">독해 심화</td>
                  <td className="text-center py-3 px-4">35일</td>
                  <td className="py-3 px-4">빈칸 추론, 함축 의미, 순서, 삽입, 요약</td>
                  <td className="text-center py-3 px-4">31~40번</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">어휘/문법</td>
                  <td className="text-center py-3 px-4">25일</td>
                  <td className="py-3 px-4">필수 어휘 1,800, 핵심 문법 30, 어법 실전</td>
                  <td className="text-center py-3 px-4">28~30번</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">EBS 연계</td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">수능특강, 수능완성 지문 분석</td>
                  <td className="text-center py-3 px-4">전 영역</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">실전 모의고사</td>
                  <td className="text-center py-3 px-4">30일</td>
                  <td className="py-3 px-4">시간 배분, 실전 훈련, 고난도 집중</td>
                  <td className="text-center py-3 px-4">전 영역</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 학습 권장 순서 */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">학습 권장 순서</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">기초</span>
              <p className="font-semibold">듣기 + 독해 기초</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">중급</span>
              <p className="font-semibold">어휘/문법 + EBS</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center">
              <span className="text-sm text-gray-500">심화</span>
              <p className="font-semibold">독해 심화</p>
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
