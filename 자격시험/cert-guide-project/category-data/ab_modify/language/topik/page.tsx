'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TOPIKPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    { id: '6', name: 'TOPIK 6급', desc: '최고급', color: 'from-blue-700 to-red-600', score: '230~300', cefr: 'C2' },
    { id: '5', name: 'TOPIK 5급', desc: '고급', color: 'from-blue-600 to-red-500', score: '190~229', cefr: 'C1' },
    { id: '4', name: 'TOPIK 4급', desc: '중고급', color: 'from-blue-500 to-red-400', score: '150~189', cefr: 'B2' },
    { id: '3', name: 'TOPIK 3급', desc: '중급', color: 'from-sky-500 to-rose-400', score: '120~149', cefr: 'B1' },
    { id: '2', name: 'TOPIK 2급', desc: '초중급', color: 'from-sky-400 to-rose-300', score: '80~139', cefr: 'A2' },
    { id: '1', name: 'TOPIK 1급', desc: '초급', color: 'from-sky-300 to-rose-200', score: '80~139', cefr: 'A1' },
  ];

  const subjects = [
    { name: "듣기", path: "listening", icon: "🎧", desc: "청취 이해 영역" },
    { name: "읽기", path: "reading", icon: "📖", desc: "독해 영역" },
    { name: "쓰기", path: "writing", icon: "✍️", desc: "작문 영역 (TOPIK II)" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "시험 전략 학습" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🇰🇷</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">TOPIK</h1>
              <p className="text-gray-600">Test of Proficiency in Korean (한국어능력시험)</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            대한민국 교육부 주관의 한국어 능력 평가 시험입니다.
            외국인 및 재외동포를 대상으로 한국 유학, 취업, 이민 등에 활용됩니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">TOPIK I (1~2급)</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">TOPIK II (3~6급)</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">연 6회 시행</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLevel === level.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                {level.name}
              </div>
              <div className="text-sm text-gray-600">{level.desc}</div>
              <div className="text-xs text-gray-500 mt-1">{level.score}점 · {level.cefr}</div>
            </button>
          ))}
        </div>

        {selectedLevel && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">
              TOPIK {selectedLevel}급 학습 포인트
            </h3>
            <p className="text-blue-700 text-sm">
              {selectedLevel === '6' && '전문적인 연구나 업무 수행에 필요한 언어 기능을 수행할 수 있습니다.'}
              {selectedLevel === '5' && '전문 분야에서 연구나 업무 수행에 필요한 언어 기능을 어느 정도 수행할 수 있습니다.'}
              {selectedLevel === '4' && '뉴스, 신문 기사를 이해하고 사회적 주제에 대해 논의할 수 있습니다.'}
              {selectedLevel === '3' && '일상생활에 큰 어려움이 없고, 공공시설 이용 및 사회적 관계 유지가 가능합니다.'}
              {selectedLevel === '2' && '일상생활과 관련된 주제로 대화할 수 있고, 간단한 글을 이해할 수 있습니다.'}
              {selectedLevel === '1' && '자기소개, 물건 사기 등 기초적인 생활에 필요한 한국어를 구사할 수 있습니다.'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 영역</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/language/topik/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl hover:from-blue-100 hover:to-red-100 transition-colors border border-blue-100"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="ml-auto text-blue-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
          <Link
            href="/category/language/topik/exam"
            className="block p-4 bg-gradient-to-r from-blue-500 to-red-500 text-white rounded-xl hover:from-blue-600 hover:to-red-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">시험 구성 및 합격 기준</h3>
                <p className="text-blue-100 text-sm">TOPIK I/II 시험 구성, 등급별 점수</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Link>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 TOPIK 활용 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• <strong>한국 유학</strong>: 대학 입학 시 TOPIK 3급 이상, 대학원 4급 이상 권장</li>
            <li>• <strong>취업 비자</strong>: E-7 비자 등 취업 비자 발급 시 TOPIK 점수 요구</li>
            <li>• <strong>귀화</strong>: 한국 국적 취득 시 TOPIK 5급 이상 필요</li>
            <li>• <strong>결혼이민</strong>: F-6 비자 연장 시 TOPIK 점수 활용 가능</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
