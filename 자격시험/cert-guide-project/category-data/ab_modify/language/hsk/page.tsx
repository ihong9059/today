'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HSKPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    { id: '6', name: 'HSK 6급', desc: '최고급', color: 'from-red-600 to-orange-700', words: '5000+', cefr: 'C2' },
    { id: '5', name: 'HSK 5급', desc: '고급', color: 'from-red-500 to-orange-600', words: '2500', cefr: 'C1' },
    { id: '4', name: 'HSK 4급', desc: '중고급', color: 'from-orange-500 to-amber-600', words: '1200', cefr: 'B2' },
    { id: '3', name: 'HSK 3급', desc: '중급', color: 'from-amber-500 to-yellow-600', words: '600', cefr: 'B1' },
    { id: '2', name: 'HSK 2급', desc: '초중급', color: 'from-yellow-500 to-lime-600', words: '300', cefr: 'A2' },
    { id: '1', name: 'HSK 1급', desc: '초급', color: 'from-lime-500 to-green-600', words: '150', cefr: 'A1' },
  ];

  const subjects = [
    { name: "듣기", path: "listening", icon: "🎧", desc: "청력 이해 영역" },
    { name: "독해", path: "reading", icon: "📖", desc: "읽기 이해 영역" },
    { name: "쓰기", path: "writing", icon: "✍️", desc: "작문 영역 (3급 이상)" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "시험 전략 학습" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language" className="text-red-600 hover:text-red-800 flex items-center gap-2">
            <span>←</span>
            <span>언어 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🇨🇳</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">HSK</h1>
              <p className="text-gray-600">汉语水平考试 (Hanyu Shuiping Kaoshi)</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            중국 정부가 공인하는 국제 중국어 능력 표준화 시험입니다.
            전 세계 150개국 이상에서 시행되며, 유학, 취업, 비즈니스에 활용됩니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">1~6급 등급제</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">연 12회 시행</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">2년 유효</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedLevel === level.id
                  ? 'border-red-500 bg-red-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${level.color} bg-clip-text text-transparent`}>
                {level.name}
              </div>
              <div className="text-sm text-gray-600">{level.desc}</div>
              <div className="text-xs text-gray-500 mt-1">{level.words}어휘 · {level.cefr}</div>
            </button>
          ))}
        </div>

        {selectedLevel && (
          <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
            <h3 className="font-bold text-red-800 mb-2">
              HSK {selectedLevel}급 학습 포인트
            </h3>
            <p className="text-red-700 text-sm">
              {selectedLevel === '6' && '고급 어휘와 복잡한 문장 구조, 뉴스/논설문 수준의 독해력이 필요합니다.'}
              {selectedLevel === '5' && '비즈니스 중국어와 신문 기사를 이해하고, 자연스러운 회화가 가능해야 합니다.'}
              {selectedLevel === '4' && '다양한 주제에 대해 토론하고, 원어민과 기본적인 소통이 가능해야 합니다.'}
              {selectedLevel === '3' && '일상생활, 학습, 업무에서 기본적인 의사소통이 가능해야 합니다.'}
              {selectedLevel === '2' && '일상적인 화제에 대해 간단한 대화가 가능해야 합니다.'}
              {selectedLevel === '1' && '기초 어휘와 간단한 문장을 이해하고 사용할 수 있어야 합니다.'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 영역</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/language/hsk/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition-colors border border-red-100"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="ml-auto text-red-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
          <Link
            href="/category/language/hsk/exam"
            className="block p-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">시험 구성 및 합격 기준</h3>
                <p className="text-red-100 text-sm">등급별 문항 수, 시간, 점수 기준</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Link>
        </div>

        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">💡 HSK 활용 TIP</h3>
          <ul className="space-y-2 text-red-700 text-sm">
            <li>• <strong>중국 유학</strong>: 학사 HSK 4급, 석사 HSK 5급 이상 권장</li>
            <li>• <strong>취업</strong>: 중국 기업/중국어 직무 HSK 5급 이상 필요</li>
            <li>• <strong>HSK 6급</strong>: 중국어 최고 수준 증명, 통역/번역 분야 필수</li>
            <li>• <strong>HSKK</strong>: 말하기 시험 별도 응시로 회화 능력 증명</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
