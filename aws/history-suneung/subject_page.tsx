'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Castle, Scroll, Flag, Users, Target } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'premodern': { name: '전근대사', color: 'from-amber-500 to-orange-600', colorLight: 'amber', icon: Castle, description: '선사시대부터 조선시대까지', totalDays: 20 },
  'modern': { name: '근대사', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: Scroll, description: '개항기부터 대한제국까지', totalDays: 15 },
  'colonial': { name: '일제강점기', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Flag, description: '무단통치부터 광복까지', totalDays: 20 },
  'contemporary': { name: '현대사', color: 'from-green-500 to-emerald-600', colorLight: 'green', icon: Users, description: '광복부터 현재까지', totalDays: 15 },
  'mock-test': { name: '실전 모의고사', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: Target, description: '기출분석 및 실전훈련', totalDays: 20 },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'premodern': {
    units: [
      { name: '1단원: 선사~고대', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 고려', days: [6, 7, 8, 9, 10, 11, 12] },
      { name: '3단원: 조선', days: [13, 14, 15, 16, 17, 18, 19, 20] },
    ],
  },
  'modern': {
    units: [
      { name: '1단원: 개항과 개화운동', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 근대국가 수립 노력', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 근대 사회·경제·문화', days: [11, 12, 13, 14, 15] },
    ],
  },
  'colonial': {
    units: [
      { name: '1단원: 일제의 식민통치', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 3.1운동과 임시정부', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 무장독립투쟁', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 실력양성과 사회운동', days: [16, 17, 18, 19, 20] },
    ],
  },
  'contemporary': {
    units: [
      { name: '1단원: 광복과 정부수립', days: [1, 2, 3, 4] },
      { name: '2단원: 민주주의 발전', days: [5, 6, 7, 8, 9, 10] },
      { name: '3단원: 경제성장과 남북관계', days: [11, 12, 13, 14, 15] },
    ],
  },
  'mock-test': {
    units: [
      { name: '1단원: 시대별 기출분석', days: [1, 2, 3, 4, 5, 6, 7, 8] },
      { name: '2단원: 유형별 문제풀이', days: [9, 10, 11, 12, 13, 14] },
      { name: '3단원: 실전 모의고사', days: [15, 16, 17, 18, 19, 20] },
    ],
  },
};

export default function HistorySuneungSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`history-suneung-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/history-suneung" className="text-amber-600 hover:underline">
            한국사 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

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
              <Link href="/course/history-suneung" className="text-gray-300 hover:text-white transition">
                한국사 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/history-suneung" className="hover:underline">한국사 코스</Link>
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
                        href={`/course/history-suneung/${subject}/lesson/${day}`}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition
                          ${isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700'
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
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 키워드 정리</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">연표와 주요 사건 암기하기</p>
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
