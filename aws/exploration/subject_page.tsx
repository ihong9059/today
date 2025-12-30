'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Lock, Users, Scale, BookOpen, Map, Globe, Clock, Coins, TrendingUp, Atom, FlaskConical, Leaf, Globe2 } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  // 사회탐구
  'social-culture': { name: '사회문화', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: Users, description: '사회 현상과 문화를 탐구하는 과목', totalDays: 45 },
  'life-ethics': { name: '생활과 윤리', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: Scale, description: '실생활의 윤리적 쟁점을 다루는 과목', totalDays: 45 },
  'ethics-thought': { name: '윤리와 사상', color: 'from-indigo-500 to-purple-600', colorLight: 'indigo', icon: BookOpen, description: '동서양 윤리 사상의 흐름을 학습', totalDays: 45 },
  'korean-geography': { name: '한국지리', color: 'from-green-500 to-teal-600', colorLight: 'green', icon: Map, description: '우리나라의 자연환경과 인문환경 탐구', totalDays: 45 },
  'world-geography': { name: '세계지리', color: 'from-cyan-500 to-blue-600', colorLight: 'cyan', icon: Globe, description: '세계 각 지역의 특성과 쟁점 탐구', totalDays: 45 },
  'politics-law': { name: '정치와 법', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Scale, description: '민주정치와 법의 원리를 학습', totalDays: 45 },
  'east-asian-history': { name: '동아시아사', color: 'from-amber-500 to-orange-600', colorLight: 'amber', icon: Clock, description: '한중일 중심의 동아시아 역사 탐구', totalDays: 45 },
  'world-history': { name: '세계사', color: 'from-teal-500 to-emerald-600', colorLight: 'teal', icon: Globe, description: '인류 문명의 발전과 교류 탐구', totalDays: 45 },
  'economics': { name: '경제', color: 'from-yellow-500 to-amber-600', colorLight: 'yellow', icon: Coins, description: '경제 원리와 경제 문제 해결 탐구', totalDays: 45 },
  // 과학탐구
  'physics-1': { name: '물리학Ⅰ', color: 'from-sky-500 to-blue-600', colorLight: 'sky', icon: Atom, description: '역학, 열역학, 전자기, 현대물리의 기초', totalDays: 45 },
  'physics-2': { name: '물리학Ⅱ', color: 'from-blue-600 to-indigo-700', colorLight: 'blue', icon: Atom, description: '물리학Ⅰ 심화 및 양자역학 기초', totalDays: 45 },
  'chemistry-1': { name: '화학Ⅰ', color: 'from-orange-500 to-red-600', colorLight: 'orange', icon: FlaskConical, description: '물질의 구조와 화학 반응의 원리', totalDays: 45 },
  'chemistry-2': { name: '화학Ⅱ', color: 'from-red-500 to-pink-600', colorLight: 'red', icon: FlaskConical, description: '화학Ⅰ 심화 및 유기화학 기초', totalDays: 45 },
  'biology-1': { name: '생명과학Ⅰ', color: 'from-green-500 to-emerald-600', colorLight: 'green', icon: Leaf, description: '생명 현상의 기본 원리와 유전', totalDays: 45 },
  'biology-2': { name: '생명과학Ⅱ', color: 'from-emerald-500 to-teal-600', colorLight: 'emerald', icon: Leaf, description: '세포호흡, 광합성, 유전자 발현, 진화', totalDays: 45 },
  'earth-science-1': { name: '지구과학Ⅰ', color: 'from-violet-500 to-purple-600', colorLight: 'violet', icon: Globe2, description: '지구와 우주에 대한 기본 이해', totalDays: 45 },
  'earth-science-2': { name: '지구과학Ⅱ', color: 'from-purple-600 to-fuchsia-700', colorLight: 'purple', icon: Globe2, description: '지구과학Ⅰ 심화 및 우주론', totalDays: 45 },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  // 사회탐구
  'social-culture': {
    units: [
      { name: '1단원: 사회문화 현상의 탐구', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 개인과 사회 구조', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 문화와 사회', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 사회 계층과 불평등', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 현대 사회와 사회 변동', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'life-ethics': {
    units: [
      { name: '1단원: 현대 생활과 실천 윤리', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 생명과 윤리', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 사회와 윤리', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 과학과 윤리', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 문화와 윤리', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'ethics-thought': {
    units: [
      { name: '1단원: 인간과 윤리 사상', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 동양과 한국 윤리 사상', days: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '3단원: 서양 윤리 사상', days: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35] },
      { name: '4단원: 사회사상', days: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'korean-geography': {
    units: [
      { name: '1단원: 국토 인식과 지리 정보', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 지형 환경과 인간 생활', days: [8, 9, 10, 11, 12, 13, 14, 15] },
      { name: '3단원: 기후 환경과 인간 생활', days: [16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '4단원: 거주 공간의 변화', days: [24, 25, 26, 27, 28, 29, 30] },
      { name: '5단원: 생산과 소비의 공간', days: [31, 32, 33, 34, 35, 36, 37, 38] },
      { name: '6단원: 인구 변화와 다문화 공간', days: [39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'world-geography': {
    units: [
      { name: '1단원: 세계화와 지역 이해', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 세계의 자연환경', days: [8, 9, 10, 11, 12, 13, 14, 15, 16] },
      { name: '3단원: 세계의 인문환경', days: [17, 18, 19, 20, 21, 22, 23, 24, 25] },
      { name: '4단원: 몬순 아시아와 오세아니아', days: [26, 27, 28, 29, 30] },
      { name: '5단원: 건조·열대 아시아와 북부 아프리카', days: [31, 32, 33, 34, 35] },
      { name: '6단원: 유럽과 북부 아메리카', days: [36, 37, 38, 39, 40] },
      { name: '7단원: 사하라 이남 아프리카와 중남부 아메리카', days: [41, 42, 43, 44, 45] },
    ],
  },
  'politics-law': {
    units: [
      { name: '1단원: 민주주의와 헌법', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 민주 국가와 정부', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 정치 과정과 참여', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 개인 생활과 법', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 사회생활과 법', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'east-asian-history': {
    units: [
      { name: '1단원: 동아시아 역사의 시작', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 동아시아 세계의 성립', days: [8, 9, 10, 11, 12, 13, 14, 15] },
      { name: '3단원: 동아시아의 사회 변동과 문화 교류', days: [16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '4단원: 동아시아의 근대화 운동', days: [24, 25, 26, 27, 28, 29, 30, 31] },
      { name: '5단원: 오늘날의 동아시아', days: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'world-history': {
    units: [
      { name: '1단원: 인류의 출현과 문명의 발생', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 동아시아 지역의 역사', days: [8, 9, 10, 11, 12, 13, 14] },
      { name: '3단원: 서아시아·인도 지역의 역사', days: [15, 16, 17, 18, 19, 20, 21] },
      { name: '4단원: 유럽·아메리카 지역의 역사', days: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
      { name: '5단원: 제국주의와 두 차례 세계 대전', days: [32, 33, 34, 35, 36, 37, 38] },
      { name: '6단원: 현대 세계의 변화', days: [39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'economics': {
    units: [
      { name: '1단원: 경제생활과 경제 문제', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 시장과 경제 활동', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 국가와 경제 활동', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 세계 시장과 교역', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 경제생활과 금융', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  // 과학탐구
  'physics-1': {
    units: [
      { name: '1단원: 역학', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: '2단원: 열역학', days: [13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 전자기', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 파동과 빛', days: [31, 32, 33, 34, 35] },
      { name: '5단원: 현대물리와 실전', days: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'physics-2': {
    units: [
      { name: '1단원: 역학과 에너지', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 파동과 물질의 성질', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 전자기장', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 양자 역학과 실전', days: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'chemistry-1': {
    units: [
      { name: '1단원: 화학의 첫걸음', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 원자의 세계', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 화학 결합과 분자의 세계', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 역동적인 화학 반응', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 실전 모의고사', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'chemistry-2': {
    units: [
      { name: '1단원: 물질의 세 가지 상태와 용액', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 반응 엔탈피와 화학 평형', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 반응 속도와 촉매', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 전기 화학과 실전', days: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'biology-1': {
    units: [
      { name: '1단원: 생명 과학의 이해', days: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      { name: '2단원: 사람의 물질대사', days: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 항상성과 몸의 조절', days: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
      { name: '4단원: 유전', days: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
      { name: '5단원: 생태계와 상호 작용, 실전', days: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'biology-2': {
    units: [
      { name: '1단원: 세포와 물질대사', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: '2단원: 유전자와 생명 공학', days: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
      { name: '3단원: 생물의 진화', days: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
      { name: '4단원: 실전 모의고사', days: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'earth-science-1': {
    units: [
      { name: '1단원: 고체 지구', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 대기와 해양', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
      { name: '3단원: 우주', days: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] },
      { name: '4단원: 실전 모의고사', days: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'earth-science-2': {
    units: [
      { name: '1단원: 지구의 형성과 역장', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      { name: '2단원: 대기와 해양의 운동', days: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22] },
      { name: '3단원: 별과 외계 행성계', days: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
      { name: '4단원: 실전 모의고사', days: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
};

export default function ExplorationSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`exploration-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return <div className="min-h-screen flex items-center justify-center">과목을 찾을 수 없습니다.</div>;
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-${info.colorLight}-50`}>
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
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/courses" className="hover:text-blue-600">코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/exploration" className="hover:text-blue-600">탐구영역</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{info.name}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80">{info.description}</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/80">학습 진도</span>
              <span className="font-bold">{completedDays.length} / {info.totalDays}일 완료</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {units.map((unit, unitIndex) => (
          <div key={unitIndex} className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                {unitIndex + 1}
              </div>
              {unit.name}
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
              {unit.days.map((day) => {
                const isCompleted = completedDays.includes(day);
                return (
                  <Link
                    key={day}
                    href={`/course/exploration/${subject}/lesson/${day}`}
                    className={`relative p-4 rounded-xl text-center transition-all duration-200 ${
                      isCompleted
                        ? 'bg-green-100 border-2 border-green-500 text-green-700'
                        : 'bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md text-gray-700'
                    }`}
                  >
                    {isCompleted && (
                      <CheckCircle className="absolute top-1 right-1 w-4 h-4 text-green-500" />
                    )}
                    <div className="text-xs text-gray-500 mb-1">Day</div>
                    <div className="text-xl font-bold">{day}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            학습 팁
          </h3>
          <ul className="space-y-2 text-indigo-700 text-sm">
            <li>• 매일 1개 Day씩 꾸준히 학습하면 45일 만에 완성할 수 있습니다.</li>
            <li>• AI 프롬프트를 복사하여 Claude나 ChatGPT에 붙여넣기 하세요.</li>
            <li>• 중요 키워드를 클릭하면 관련 내용을 더 깊이 학습할 수 있습니다.</li>
            <li>• YouTube 영상으로 개념을 시각적으로 이해해 보세요.</li>
          </ul>
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
