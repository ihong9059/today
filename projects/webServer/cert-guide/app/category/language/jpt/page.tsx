'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JPTPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('600');

  const levels = [
    { id: '900', name: '900+', desc: '최상급', color: 'from-pink-600 to-rose-700' },
    { id: '800', name: '800+', desc: '상급', color: 'from-pink-500 to-rose-600' },
    { id: '700', name: '700+', desc: '중상급', color: 'from-pink-400 to-rose-500' },
    { id: '600', name: '600+', desc: '중급', color: 'from-pink-300 to-rose-400' },
    { id: '500', name: '500+', desc: '중하급', color: 'from-pink-200 to-rose-300' },
  ];

  const subjects = [
    { name: "청해", path: "listening", icon: "🎧", desc: "듣기 이해 100문항" },
    { name: "독해", path: "reading", icon: "📖", desc: "읽기/문법/어휘 100문항" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "시험 전략 25문항" },
  ];

  const levelDetails: Record<string, { ability: string; usage: string; time: string }> = {
    '900': { ability: '거의 완벽한 일본어 구사', usage: '통역/번역, 일본 본사 근무', time: '약 2년+' },
    '800': { ability: '비즈니스 일본어 능숙', usage: '일본 취업, 대기업 우대', time: '약 1.5년' },
    '700': { ability: '일상/업무 의사소통 원활', usage: '일본계 기업 취업', time: '약 1년' },
    '600': { ability: '기본적인 의사소통 가능', usage: '취업 기본 조건', time: '약 8개월' },
    '500': { ability: '간단한 의사소통 가능', usage: '일본어 학습 기초', time: '약 6개월' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-pink-600 hover:text-pink-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🗾</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">JPT</h1>
              <p className="text-gray-600">Japanese Proficiency Test</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            JPT는 한국에서 개발된 일본어 능력 평가 시험으로, TOEIC과 유사한 형식의
            객관식 시험입니다. 청해 100문항, 독해 100문항 총 200문항으로 구성되며
            990점 만점입니다.
          </p>
          <div className="flex items-center gap-2 text-sm text-pink-600">
            <span>📅</span>
            <span>매월 시행 (연 12회)</span>
            <span className="mx-2">|</span>
            <span>💰</span>
            <span>응시료: 44,000원</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">목표 점수 선택</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === level.id
                    ? `bg-gradient-to-r ${level.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.name} ({level.desc})
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-pink-50 rounded-xl">
            <div className="text-center">
              <div className="text-sm text-gray-500">능력 수준</div>
              <div className="font-bold text-pink-700 text-sm">{levelDetails[selectedLevel].ability}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">활용 분야</div>
              <div className="font-bold text-pink-700 text-sm">{levelDetails[selectedLevel].usage}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">학습 기간</div>
              <div className="font-bold text-pink-700">{levelDetails[selectedLevel].time}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link
            href="/category/language/jpt/exam"
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-bold text-gray-800">시험 안내</h3>
              <p className="text-sm text-gray-500">시험 구조, 점수 체계, 환산표</p>
            </div>
          </Link>
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl shadow-md p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎯</span>
              <h3 className="font-bold">JPT vs JLPT</h3>
            </div>
            <p className="text-sm text-pink-100">JPT 700 ≈ JLPT N2 / JPT 850 ≈ JLPT N1</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4">
            <h2 className="text-xl font-bold text-white">📚 학습 과목</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/language/jpt/study/${subject.path}`}
                className="flex items-center justify-between p-4 hover:bg-pink-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.desc}</p>
                  </div>
                </div>
                <span className="text-pink-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏢</span> 기업별 요구 점수
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>삼성그룹</span>
                <span className="font-semibold text-pink-600">JPT 700+</span>
              </li>
              <li className="flex justify-between">
                <span>LG그룹</span>
                <span className="font-semibold text-pink-600">JPT 600+</span>
              </li>
              <li className="flex justify-between">
                <span>일본계 기업</span>
                <span className="font-semibold text-pink-600">JPT 700~850</span>
              </li>
              <li className="flex justify-between">
                <span>통역/번역</span>
                <span className="font-semibold text-pink-600">JPT 900+</span>
              </li>
              <li className="flex justify-between">
                <span>일본 유학</span>
                <span className="font-semibold text-pink-600">JPT 700+</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📊</span> 시험 구성
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>청해 (Part 1~4)</span>
                <span className="font-semibold">100문항 / 45분</span>
              </li>
              <li className="flex justify-between">
                <span>독해 (Part 5~8)</span>
                <span className="font-semibold">100문항 / 50분</span>
              </li>
              <li className="flex justify-between border-t pt-2 mt-2">
                <span>총점</span>
                <span className="font-semibold text-pink-600">990점 만점</span>
              </li>
              <li className="flex justify-between">
                <span>시험 시간</span>
                <span className="font-semibold">약 100분</span>
              </li>
              <li className="flex justify-between">
                <span>문항 수</span>
                <span className="font-semibold">200문항</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
          <h3 className="font-bold text-pink-800 mb-3">💡 JPT 학습 TIP</h3>
          <ul className="space-y-2 text-pink-700 text-sm">
            <li>• JLPT와 달리 매월 시험이 있어 빠른 점수 취득 가능</li>
            <li>• 청해 파트에서 사진/그림 문제가 출제됨 (TOEIC과 유사)</li>
            <li>• 독해 파트는 어휘, 문법, 독해가 모두 포함됨</li>
            <li>• 기업에서 JLPT와 동등하게 인정받는 공인 시험</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
