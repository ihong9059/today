'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Cpu, Users, BookOpen, Compass } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; fullName: string; color: string; colorLight: string; icon: any; description: string; totalDays: number; target: string } } = {
  'ai-basics': {
    name: 'AI 기초',
    fullName: '1단계: AI 기초 마스터',
    color: 'from-blue-500 to-indigo-600',
    colorLight: 'blue',
    icon: Cpu,
    description: 'ChatGPT, Claude, Gemini 사용법 완벽 정복',
    totalDays: 15,
    target: '학부형 단독'
  },
  'mindset': {
    name: '마인드셋',
    fullName: '2단계: 마인드셋 변화',
    color: 'from-purple-500 to-pink-600',
    colorLight: 'purple',
    icon: Users,
    description: '가르치는 부모에서 함께 배우는 부모로',
    totalDays: 10,
    target: '학부형 단독'
  },
  'education': {
    name: '자녀 교육',
    fullName: '3단계: 자녀 교육 실전',
    color: 'from-green-500 to-emerald-600',
    colorLight: 'green',
    icon: BookOpen,
    description: 'AI 활용 교과별 학습 지원 실습',
    totalDays: 20,
    target: '학부형 + 자녀'
  },
  'career': {
    name: '진로 교육',
    fullName: '4단계: 진로 교육',
    color: 'from-orange-500 to-red-600',
    colorLight: 'orange',
    icon: Compass,
    description: 'AI 시대 진로 탐색과 설계',
    totalDays: 15,
    target: '학부형 + 자녀'
  },
};

// 레슨별 제목 데이터
const lessonTitles: { [key: string]: { [day: number]: string } } = {
  'ai-basics': {
    1: 'ChatGPT 시작하기',
    2: 'Claude 시작하기',
    3: 'Gemini 시작하기',
    4: 'AI 도구 비교와 선택',
    5: '효과적인 질문법 기초',
    6: '역할 부여하기',
    7: '단계별 대화법',
    8: '형식 지정하기',
    9: '수준 조절하기',
    10: '예시 요청하기',
    11: '학습 자료 생성하기',
    12: '오류 수정하기',
    13: '대화 이어가기',
    14: '일상에서 AI 활용',
    15: 'AI 기초 마무리',
  },
  'mindset': {
    1: 'AI 시대의 부모 역할',
    2: '가르치기 vs 함께 배우기',
    3: '정답 중심에서 과정 중심으로',
    4: '실패를 격려하는 부모',
    5: '질문하는 아이로 키우기',
    6: '비교하지 않기',
    7: '경청하는 부모',
    8: '함께 성장하는 자세',
    9: '디지털 세대 이해하기',
    10: '마인드셋 마무리',
  },
  'education': {
    1: 'AI 학습 환경 준비',
    2: '자녀와 AI 규칙 정하기',
    3: '학습 목표 설정하기',
    4: '일일 학습 루틴 만들기',
    5: '학습 진도 관리법',
    6: '국어 - 독해력 키우기',
    7: '국어 - 글쓰기 지도',
    8: '수학 - 개념 이해 돕기',
    9: '수학 - 문제 풀이 전략',
    10: '영어 - 단어 암기법',
    11: '영어 - 문법 정리',
    12: '영어 - 독해 연습',
    13: '사회 - 개념 정리',
    14: '과학 - 실험과 탐구',
    15: '교과 통합 프로젝트',
    16: '자기주도 학습이란',
    17: '학습 동기 부여',
    18: '시간 관리 능력',
    19: '복습과 정리 습관',
    20: '자녀 교육 마무리',
  },
  'career': {
    1: 'AI가 바꾸는 직업 세계',
    2: '사라지는 직업 vs 생기는 직업',
    3: '미래 유망 직종 탐색',
    4: 'AI 시대 필수 역량',
    5: '평생 학습의 중요성',
    6: '자녀 강점 발견하기',
    7: '흥미와 적성 검사',
    8: '진로 대화법',
    9: '롤모델 찾기',
    10: '다양한 경험 제공하기',
    11: '진로 로드맵 만들기',
    12: '목표 설정과 계획',
    13: '실패와 방향 전환',
    14: '네트워크 형성',
    15: '진로 교육 마무리',
  },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'ai-basics': {
    units: [
      { name: '1단원: AI 도구 시작하기', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 효과적인 AI 대화법', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 일상에서 AI 활용하기', days: [11, 12, 13, 14, 15] },
    ],
  },
  'mindset': {
    units: [
      { name: '1단원: 부모 역할의 변화', days: [1, 2, 3, 4, 5] },
      { name: '2단원: AI 시대 필수 역량', days: [6, 7, 8, 9, 10] },
    ],
  },
  'education': {
    units: [
      { name: '1단원: AI 학습 환경 구축', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 교과별 AI 활용', days: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { name: '3단원: 자기주도 학습 유도', days: [16, 17, 18, 19, 20] },
    ],
  },
  'career': {
    units: [
      { name: '1단원: 미래 직업 세계 이해', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 자녀 적성 탐색', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 진로 설계와 실행', days: [11, 12, 13, 14, 15] },
    ],
  },
};

export default function ParentSubjectPage() {
  const params = useParams();
  const subject = params.course as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`parent-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/parent" className="text-purple-600 hover:underline">
            학부형 트랙으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
              <Link href="/course/parent" className="text-gray-300 hover:text-white transition">
                학부형 트랙
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/parent" className="hover:underline">학부형 트랙</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{info.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-white/30 px-2 py-0.5 rounded">{info.target}</span>
              </div>
              <h1 className="text-3xl font-bold">{info.fullName}</h1>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    const title = lessonTitles[subject]?.[day] || `Day ${day}`;

                    // 과목별 색상 설정
                    const colorSchemes: { [key: string]: { bg: string; border: string; hover: string; circle: string; text: string; arrow: string } } = {
                      'ai-basics': {
                        bg: 'bg-blue-50',
                        border: 'border-blue-200',
                        hover: 'hover:bg-blue-100 hover:border-blue-300',
                        circle: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white',
                        text: 'text-blue-700',
                        arrow: 'text-blue-400'
                      },
                      'mindset': {
                        bg: 'bg-purple-50',
                        border: 'border-purple-200',
                        hover: 'hover:bg-purple-100 hover:border-purple-300',
                        circle: 'bg-gradient-to-br from-purple-500 to-pink-600 text-white',
                        text: 'text-purple-700',
                        arrow: 'text-purple-400'
                      },
                      'education': {
                        bg: 'bg-emerald-50',
                        border: 'border-emerald-200',
                        hover: 'hover:bg-emerald-100 hover:border-emerald-300',
                        circle: 'bg-gradient-to-br from-green-500 to-emerald-600 text-white',
                        text: 'text-emerald-700',
                        arrow: 'text-emerald-400'
                      },
                      'career': {
                        bg: 'bg-orange-50',
                        border: 'border-orange-200',
                        hover: 'hover:bg-orange-100 hover:border-orange-300',
                        circle: 'bg-gradient-to-br from-orange-500 to-red-600 text-white',
                        text: 'text-orange-700',
                        arrow: 'text-orange-400'
                      },
                    };

                    const colors = colorSchemes[subject] || colorSchemes['ai-basics'];

                    return (
                      <Link
                        key={day}
                        href={`/course/parent/${subject}/lesson/${day}`}
                        className={`
                          p-4 rounded-xl flex items-center gap-3 transition border shadow-sm
                          ${isCompleted
                            ? 'bg-green-50 border-green-300 hover:bg-green-100'
                            : `${colors.bg} ${colors.border} ${colors.hover}`
                          }
                        `}
                      >
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold shadow-sm
                          ${isCompleted
                            ? 'bg-green-500 text-white'
                            : colors.circle
                          }
                        `}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            day
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isCompleted ? 'text-green-700' : colors.text}`}>
                            {title}
                          </p>
                          <p className="text-xs text-gray-500">Day {day}</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isCompleted ? 'text-green-400' : colors.arrow}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 안내 */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 직접 실습해보기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">오늘의 실습 과제 완수하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm text-gray-600">유튜브 참고 영상으로 심화 학습</p>
            </div>
          </div>
        </div>

        {/* 3단계 연계 코스 안내 */}
        {subject === 'education' && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4">🔗 연계 대학진학 코스</h3>
            <p className="text-gray-600 mb-4">
              자녀와 함께 아래 코스들을 AI로 학습해보세요.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/course/english" className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition text-center">
                <span className="text-2xl">🇬🇧</span>
                <p className="font-semibold mt-2">영어</p>
              </Link>
              <Link href="/course/math" className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition text-center">
                <span className="text-2xl">🔢</span>
                <p className="font-semibold mt-2">수학</p>
              </Link>
              <Link href="/course/korean" className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition text-center">
                <span className="text-2xl">📝</span>
                <p className="font-semibold mt-2">국어</p>
              </Link>
              <Link href="/course/exploration" className="p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition text-center">
                <span className="text-2xl">📊</span>
                <p className="font-semibold mt-2">탐구</p>
              </Link>
            </div>
          </div>
        )}
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
