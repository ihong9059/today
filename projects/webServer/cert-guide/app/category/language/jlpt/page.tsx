'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JLPTPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>('N2');

  const levels = [
    { id: 'N1', name: 'N1', desc: '최상급', color: 'from-rose-600 to-red-700' },
    { id: 'N2', name: 'N2', desc: '상급', color: 'from-rose-500 to-red-600' },
    { id: 'N3', name: 'N3', desc: '중급', color: 'from-rose-400 to-red-500' },
    { id: 'N4', name: 'N4', desc: '초중급', color: 'from-rose-300 to-red-400' },
    { id: 'N5', name: 'N5', desc: '초급', color: 'from-rose-200 to-red-300' },
  ];

  const subjects = [
    { name: "문자·어휘", path: "vocabulary", icon: "📝", desc: "한자/어휘 50문항" },
    { name: "문법", path: "grammar", icon: "📖", desc: "문법 표현 50문항" },
    { name: "독해", path: "reading", icon: "📄", desc: "읽기 이해 50문항" },
    { name: "청해", path: "listening", icon: "🎧", desc: "듣기 이해 50문항" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "시험 전략 25문항" },
  ];

  const levelDetails: Record<string, { vocab: string; kanji: string; time: string; pass: string }> = {
    N1: { vocab: '10,000어 이상', kanji: '2,000자 이상', time: '170분', pass: '100/180점' },
    N2: { vocab: '6,000어 이상', kanji: '1,000자 이상', time: '155분', pass: '90/180점' },
    N3: { vocab: '3,500어 이상', kanji: '650자 이상', time: '140분', pass: '95/180점' },
    N4: { vocab: '1,500어 이상', kanji: '300자 이상', time: '125분', pass: '90/180점' },
    N5: { vocab: '800어 이상', kanji: '100자 이상', time: '105분', pass: '80/180점' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-rose-600 hover:text-rose-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🇯🇵</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">JLPT</h1>
              <p className="text-gray-600">Japanese Language Proficiency Test</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            일본어능력시험은 일본 국제교류기금에서 주관하는 세계 최대 규모의 일본어 시험입니다.
            N5(초급)부터 N1(최상급)까지 5개 레벨로 구성되어 있습니다.
          </p>
          <div className="flex items-center gap-2 text-sm text-rose-600">
            <span>📅</span>
            <span>연 2회 시행 (7월, 12월)</span>
            <span className="mx-2">|</span>
            <span>💰</span>
            <span>응시료: 50,000원</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">레벨 선택</h2>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-rose-50 rounded-xl">
            <div className="text-center">
              <div className="text-sm text-gray-500">필요 어휘</div>
              <div className="font-bold text-rose-700">{levelDetails[selectedLevel].vocab}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">필요 한자</div>
              <div className="font-bold text-rose-700">{levelDetails[selectedLevel].kanji}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">시험 시간</div>
              <div className="font-bold text-rose-700">{levelDetails[selectedLevel].time}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">합격 기준</div>
              <div className="font-bold text-rose-700">{levelDetails[selectedLevel].pass}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Link
            href="/category/language/jlpt/exam"
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow flex items-center gap-4"
          >
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-bold text-gray-800">시험 안내</h3>
              <p className="text-sm text-gray-500">레벨별 시험 구조, 합격 기준</p>
            </div>
          </Link>
          <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-xl shadow-md p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎯</span>
              <h3 className="font-bold">목표 달성</h3>
            </div>
            <p className="text-sm text-rose-100">N2 이상 취득 시 취업/유학에 활용 가능</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-rose-500 to-red-600 p-4">
            <h2 className="text-xl font-bold text-white">📚 학습 과목</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/language/jlpt/study/${subject.path}`}
                className="flex items-center justify-between p-4 hover:bg-rose-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-800">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.desc}</p>
                  </div>
                </div>
                <span className="text-rose-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏢</span> 활용 분야
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>일본 취업</span>
                <span className="font-semibold text-rose-600">N1~N2</span>
              </li>
              <li className="flex justify-between">
                <span>일본 유학</span>
                <span className="font-semibold text-rose-600">N2 이상</span>
              </li>
              <li className="flex justify-between">
                <span>국내 일본계 기업</span>
                <span className="font-semibold text-rose-600">N2~N3</span>
              </li>
              <li className="flex justify-between">
                <span>통역/번역</span>
                <span className="font-semibold text-rose-600">N1 필수</span>
              </li>
              <li className="flex justify-between">
                <span>관광/서비스</span>
                <span className="font-semibold text-rose-600">N3~N4</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>📊</span> 레벨별 난이도
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-rose-700 w-8">N1</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-rose-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-rose-700 w-8">N2</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-rose-700 w-8">N3</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-rose-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-rose-700 w-8">N4</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-rose-300 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-rose-700 w-8">N5</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-rose-200 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
          <h3 className="font-bold text-rose-800 mb-3">💡 JLPT 학습 TIP</h3>
          <ul className="space-y-2 text-rose-700 text-sm">
            <li>• N5→N4→N3→N2→N1 순서로 단계별 학습 권장</li>
            <li>• 한자 학습이 가장 중요! 매일 10개씩 꾸준히 암기하세요</li>
            <li>• 청해는 일본 드라마/애니메이션으로 귀를 트이게 하세요</li>
            <li>• N2 목표 시 약 1년, N1 목표 시 약 2년 학습 기간 필요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
