** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.
** The server may need to be upgraded. See https://openssh.com/pq.html
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Lock, BookOpen, FileText, MessageSquare, Languages, Target } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'reading': { name: '독서 (비문학)', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: BookOpen, description: '다양한 제재의 지문을 읽고 이해하는 능력 향상', totalDays: 45 },
  'literature': { name: '문학', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: FileText, description: '현대시, 현대소설, 고전시가, 고전소설 작품 분석', totalDays: 45 },
  'speech-writing': { name: '화법과 작문', color: 'from-green-500 to-teal-600', colorLight: 'green', icon: MessageSquare, description: '화법 이론과 작문 실전 능력 배양', totalDays: 30 },
  'language-media': { name: '언어와 매체', color: 'from-orange-500 to-red-600', colorLight: 'orange', icon: Languages, description: '음운론, 형태론, 통사론, 중세국어, 매체언어', totalDays: 30 },
  'suneung-korean': { name: '수능 국어 실전', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Target, description: '실전 모의고사와 고난도 문제 집중 훈련', totalDays: 45 },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'reading': {
    units: [
      { name: '1단원: 독서론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 인문', days: [6, 7, 8, 9, 10, 11, 12, 13] },
      { name: '3단원: 사회', days: [14, 15, 16, 17, 18, 19, 20, 21] },
      { name: '4단원: 과학', days: [22, 23, 24, 25, 26, 27, 28, 29] },
      { name: '5단원: 기술', days: [30, 31, 32, 33, 34, 35, 36, 37] },
      { name: '6단원: 예술', days: [38, 39, 40] },
      { name: '7단원: 융합형 지문', days: [41, 42, 43, 44, 45] },
    ],
  },
  'literature': {
    units: [
      { name: '1단원: 현대시', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 현대소설', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 고전시가', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 고전소설', days: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
      { name: '5단원: 복합지문 연습', days: [41, 42, 43, 44, 45] },
    ],
  },
  'speech-writing': {
    units: [
      { name: '1단원: 화법 이론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 작문 이론', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 화법 실전', days: [11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '4단원: 작문 실전', days: [19, 20, 21, 22, 23, 24, 25, 26] },
      { name: '5단원: 화작 복합', days: [27, 28, 29, 30] },
    ],
  },
  'language-media': {
    units: [
      { name: '1단원: 음운론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 형태론', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 통사론', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 중세 국어', days: [16, 17, 18, 19, 20] },
      { name: '5단원: 매체 언어', days: [21, 22, 23, 24, 25] },
      { name: '6단원: 언매 실전', days: [26, 27, 28, 29, 30] },
    ],
  },
  'suneung-korean': {
    units: [
      { name: '1단원: 시간 배분 전략', days: [1, 2, 3] },
      { name: '2단원: 독서 고난도', days: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      { name: '3단원: 문학 고난도', days: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '4단원: 선택과목 집중', days: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
      { name: '5단원: 실전 모의고사', days: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
};

export default function KoreanSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`korean-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/korean" className="text-rose-600 hover:underline">
            국어 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

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
              <Link href="/course/korean" className="text-gray-300 hover:text-white transition">
                국어 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/korean" className="hover:underline">국어 코스</Link>
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
                <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-15 gap-2">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    return (
                      <Link
                        key={day}
                        href={`/course/korean/${subject}/lesson/${day}`}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition
                          ${isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-rose-100 hover:text-rose-700'
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
        <div className="mt-8 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 개념 이해하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
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
