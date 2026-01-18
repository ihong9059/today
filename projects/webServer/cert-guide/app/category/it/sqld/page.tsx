'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SQLDPage() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const parts = [
    { id: '1', name: '1과목', subject: '데이터 모델링의 이해', color: 'from-orange-500 to-amber-600', questions: '10문항', weight: '20%' },
    { id: '2', name: '2과목', subject: 'SQL 기본 및 활용', color: 'from-amber-500 to-yellow-600', questions: '40문항', weight: '80%' },
  ];

  const subjects = [
    { name: "데이터 모델링", path: "data-modeling", icon: "📐", desc: "ERD, 정규화, 모델 설계" },
    { name: "SQL 기본", path: "sql-basic", icon: "💾", desc: "SELECT, JOIN, 서브쿼리" },
    { name: "SQL 활용", path: "sql-advanced", icon: "⚡", desc: "윈도우 함수, 최적화" },
    { name: "실전 대비", path: "practical", icon: "🎯", desc: "기출문제 및 시험 전략" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <span>←</span>
            <span>IT·정보통신 카테고리로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🗄️</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">SQLD</h1>
              <p className="text-gray-600">SQL 개발자 (SQL Developer)</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            한국데이터산업진흥원 주관의 SQL 전문가 국가공인 자격증입니다.
            데이터베이스 설계와 SQL 활용 능력을 검증하며, 개발자 필수 자격으로 인정받고 있습니다.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">국가공인 자격</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">연 4회 시행</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">객관식 50문항</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {parts.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPart === part.id
                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-orange-300'
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
          <div className="bg-orange-50 rounded-xl p-4 mb-6 border border-orange-200">
            <h3 className="font-bold text-orange-800 mb-2">
              {parts.find(p => p.id === selectedPart)?.subject} 학습 포인트
            </h3>
            <p className="text-orange-700 text-sm">
              {selectedPart === '1' && '데이터 모델링 개요, 엔티티/속성/관계, 정규화, 반정규화에 대해 학습합니다.'}
              {selectedPart === '2' && 'SQL 기본 문법, 조인, 서브쿼리, 그룹 함수, 윈도우 함수 등을 학습합니다. 가장 비중이 높습니다!'}
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 학습 영역</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.path}
                href={`/category/it/sqld/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-colors border border-orange-100"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="ml-auto text-orange-400">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 정보</h2>
          <Link
            href="/category/it/sqld/exam"
            className="block p-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl hover:from-orange-600 hover:to-amber-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">시험 구성 및 합격 기준</h3>
                <p className="text-orange-100 text-sm">응시자격, 시험과목, 합격기준 안내</p>
              </div>
              <span className="text-2xl">→</span>
            </div>
          </Link>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">💡 SQLD 활용 TIP</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• <strong>취업</strong>: 백엔드/데이터 개발자 채용 시 필수 자격증</li>
            <li>• <strong>경력개발</strong>: SQLP(SQL 전문가)로 승급 가능</li>
            <li>• <strong>실무</strong>: 데이터베이스 설계/운영 업무에 직접 활용</li>
            <li>• <strong>대학생</strong>: 컴퓨터공학 전공자 필수 스펙</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
