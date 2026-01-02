'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Headphones, BookOpen, FileText, Languages, Target, Sparkles } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'listening': { name: '듣기', color: 'from-blue-500 to-cyan-600', colorLight: 'blue', icon: Headphones, description: '17문항 유형별 집중 훈련', totalDays: 30 },
  'reading-basic': { name: '독해 기초', color: 'from-green-500 to-emerald-600', colorLight: 'green', icon: BookOpen, description: '글 유형별 접근법 (주제, 요지, 제목)', totalDays: 30 },
  'reading-advanced': { name: '독해 심화', color: 'from-purple-500 to-violet-600', colorLight: 'purple', icon: FileText, description: '빈칸, 순서, 삽입 고난도 유형', totalDays: 35 },
  'vocabulary': { name: '어휘/문법', color: 'from-orange-500 to-amber-600', colorLight: 'orange', icon: Languages, description: '수능 필수 어휘 1,800 + 핵심 문법', totalDays: 25 },
  'ebs': { name: 'EBS 연계', color: 'from-pink-500 to-rose-600', colorLight: 'pink', icon: Sparkles, description: '수능특강, 수능완성 지문 분석', totalDays: 30 },
  'mock-test': { name: '실전 모의고사', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Target, description: '시간 배분 전략, 실전 훈련', totalDays: 30 },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'listening': {
    units: [
      { name: '1단원: 목적/의견/요지 파악', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 관계/장소 추론', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 그림/도표/할 일', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 숫자 정보/내용 일치', days: [16, 17, 18, 19, 20] },
      { name: '5단원: 장문 듣기/종합', days: [21, 22, 23, 24, 25] },
      { name: '6단원: 실전 듣기 모의', days: [26, 27, 28, 29, 30] },
    ],
  },
  'reading-basic': {
    units: [
      { name: '1단원: 주제/요지 파악', days: [1, 2, 3, 4, 5, 6] },
      { name: '2단원: 제목 추론', days: [7, 8, 9, 10, 11, 12] },
      { name: '3단원: 목적/심경 파악', days: [13, 14, 15, 16, 17, 18] },
      { name: '4단원: 도표/내용 일치', days: [19, 20, 21, 22, 23, 24] },
      { name: '5단원: 어법/어휘', days: [25, 26, 27, 28, 29, 30] },
    ],
  },
  'reading-advanced': {
    units: [
      { name: '1단원: 빈칸 추론 (어구)', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 빈칸 추론 (문장)', days: [8, 9, 10, 11, 12, 13, 14] },
      { name: '3단원: 함축 의미 추론', days: [15, 16, 17, 18, 19] },
      { name: '4단원: 글의 순서', days: [20, 21, 22, 23, 24, 25, 26] },
      { name: '5단원: 문장 삽입', days: [27, 28, 29, 30, 31] },
      { name: '6단원: 요약문 완성', days: [32, 33, 34, 35] },
    ],
  },
  'vocabulary': {
    units: [
      { name: '1단원: 필수 어휘 600 (1)', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 필수 어휘 600 (2)', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 필수 어휘 600 (3)', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 핵심 문법 30', days: [16, 17, 18, 19, 20] },
      { name: '5단원: 어법 실전', days: [21, 22, 23, 24, 25] },
    ],
  },
  'ebs': {
    units: [
      { name: '1단원: 수능특강 영어', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 수능특강 영어독해연습', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 수능완성', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
    ],
  },
  'mock-test': {
    units: [
      { name: '1단원: 시간 배분 전략', days: [1, 2, 3] },
      { name: '2단원: 듣기+독해 통합', days: [4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: '3단원: 고난도 집중', days: [13, 14, 15, 16, 17, 18, 19, 20, 21] },
      { name: '4단원: 실전 모의고사', days: [22, 23, 24, 25, 26, 27, 28, 29, 30] },
    ],
  },
};

export default function EnglishSuneungSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`english-suneung-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/english-suneung" className="text-blue-600 hover:underline">
            영어수능 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

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
              <Link href="/course/english-suneung" className="text-gray-300 hover:text-white transition">
                영어수능 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/english-suneung" className="hover:underline">영어수능 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{info.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80 mt-1">{info.description}</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedDays.length} / {info.totalDays}일 완료</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 단원별 레슨 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {units.map((unit, unitIdx) => (
            <div key={unitIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="font-bold text-gray-900">{unit.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {unit.days.filter(d => completedDays.includes(d)).length} / {unit.days.length}일 완료
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-2">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    return (
                      <Link
                        key={day}
                        href={`/course/english-suneung/${subject}/lesson/${day}`}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition
                          ${isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          day
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 안내 */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 개념 이해하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">연습 문제를 풀고 오답 분석하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm text-gray-600">유튜브 참고 영상으로 심화 학습</p>
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
