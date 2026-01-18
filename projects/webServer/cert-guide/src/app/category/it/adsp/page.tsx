'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ADsPPage() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const parts = [
    { id: '1', name: '1과목', subject: '데이터 이해', color: 'from-cyan-500 to-blue-600', questions: '10문항', weight: '20%' },
    { id: '2', name: '2과목', subject: '데이터 분석 기획', color: 'from-blue-500 to-indigo-600', questions: '10문항', weight: '20%' },
    { id: '3', name: '3과목', subject: '데이터 분석', color: 'from-indigo-500 to-purple-600', questions: '30문항', weight: '60%' },
  ];

  const subjects = [
    { name: "데이터 이해", path: "data-understanding", icon: "📊", desc: "데이터 개념과 활용" },
    { name: "데이터 분석 기획", path: "data-planning", icon: "📋", desc: "분석 계획 수립" },
    { name: "데이터 분석", path: "data-analysis", icon: "🔬", desc: "통계, 마이닝, 시각화" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "기출문제 및 시험 전략" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it" className="text-cyan-600 hover:text-cyan-800 flex items-center gap-2">
            <span>←</span>
            <span>IT·정보통신 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📈</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">ADsP</h1>
              <p className="text-gray-600">데이터분석 준전문가 (Advanced Data Analytics Semi-Professional)</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            한국데이터산업진흥원 주관의 데이터 분석 국가공인 자격증입니다.
            데이터 이해, 분석 기획, 분석 기법에 대한 기본 역량을 검증합니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">국가공인 자격</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">연 4회 시행</span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">객관식 50문항</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {parts.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPart === part.id
                  ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-cyan-300'
              }`}
            >
              <div className={`text-lg font-bold bg-gradient-to-r ${part.color} bg-clip-text text-transparent`}>
                {part.name}
              </div>
              <div className="text-sm font-medium text-gray-700">{part.subject}</div>
              <div className="text-xs text-gray-500 mt-1">{part.questions} · {part.weight}</div>
            </button>
          ))}
        </div>

        {selectedPart && (
          <div className="bg-cyan-50 rounded-xl p-4 mb-6 border border-cyan-200">
            <h3 className="font-bold text-cyan-800 mb-2">
              {parts.find(p => p.id === selectedPart)?.subject} 학습 포인트
            </h3>
            <p className="text-cyan-700 text-sm">
              {selectedPart === '1' && '데이터의 정의, 데이터베이스, 빅데이터 개념, 데이터 가치와 활용에 대해 학습합니다.'}
              {selectedPart === '2' && '분석 과제 정의, 분석 프로젝트 관리, 분석 거버넌스 체계 수립에 대해 학습합니다.'}
              {selectedPart === '3' && 'R/Python 기초, 통계 분석, 데이터 마이닝, 시각화에 대해 학습합니다. 가장 비중이 높습니다!'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 영역</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/it/adsp/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl hover:from-cyan-100 hover:to-blue-100 transition-colors border border-cyan-100"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="ml-auto text-cyan-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
          <Link
            href="/category/it/adsp/exam"
            className="block p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">시험 구성 및 합격 기준</h3>
                <p className="text-cyan-100 text-sm">응시자격, 시험과목, 합격기준 안내</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Link>
        </div>

        <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
          <h3 className="font-bold text-cyan-800 mb-3">💡 ADsP 활용 TIP</h3>
          <ul className="space-y-2 text-cyan-700 text-sm">
            <li>• <strong>취업</strong>: 데이터 분석가 취업 시 기본 자격증으로 활용</li>
            <li>• <strong>경력개발</strong>: ADP(데이터분석 전문가)로 승급 가능</li>
            <li>• <strong>공무원</strong>: 데이터 관련 직렬 가산점 부여</li>
            <li>• <strong>대학생</strong>: 데이터 분석 입문 자격으로 적합</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
