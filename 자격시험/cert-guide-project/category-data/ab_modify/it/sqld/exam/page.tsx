'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SQLDExamPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/sqld" className="text-orange-600 hover:text-orange-800 flex items-center gap-2">
            <span>←</span>
            <span>SQLD로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SQLD 시험 정보</h1>
              <p className="text-gray-600">SQL 개발자 자격검정</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              시험 개요
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === 'subjects'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              과목 상세
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h3 className="font-bold text-orange-800 mb-2">📝 시험 형식</h3>
                  <ul className="space-y-1 text-orange-700 text-sm">
                    <li>• 문항수: 50문항 (객관식 4지선다)</li>
                    <li>• 시험시간: 90분</li>
                    <li>• 과락: 과목당 40% 미만 시 불합격</li>
                    <li>• 합격: 총점 60점 이상</li>
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-2">💰 응시료 및 일정</h3>
                  <ul className="space-y-1 text-amber-700 text-sm">
                    <li>• 응시료: 50,000원</li>
                    <li>• 시행: 연 4회 (3, 6, 9, 12월)</li>
                    <li>• 접수: 시험 약 1개월 전</li>
                    <li>• 주관: 한국데이터산업진흥원</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-2">🎯 합격 기준</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">총점</p>
                    <p className="text-2xl font-bold text-orange-600">60점 이상</p>
                  </div>
                  <div>
                    <p className="text-gray-600">과목별 최소</p>
                    <p className="text-2xl font-bold text-orange-600">40% 이상</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">📊 최근 합격률</h3>
                <ul className="space-y-1 text-blue-700 text-sm">
                  <li>• 평균 합격률: 약 45~55%</li>
                  <li>• 연간 응시자: 약 5만명</li>
                  <li>• 난이도: 중상 (IT 자격증 중 보통)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-orange-800">1과목: 데이터 모델링의 이해</h3>
                  <span className="text-sm bg-orange-200 text-orange-800 px-2 py-1 rounded">10문항 (20%)</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">데이터 모델링의 이해</p>
                    <p className="text-gray-600">데이터 모델 개념, 3층 스키마, 데이터 모델링 중요성</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">엔티티</p>
                    <p className="text-gray-600">엔티티 정의, 분류, 명명규칙</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">속성</p>
                    <p className="text-gray-600">속성 정의, 분류, 도메인</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">관계</p>
                    <p className="text-gray-600">관계 정의, 표기법, 관계 유형</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">식별자</p>
                    <p className="text-gray-600">주식별자/외래식별자, 식별자 관계</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-amber-800">2과목: SQL 기본 및 활용</h3>
                  <span className="text-sm bg-amber-200 text-amber-800 px-2 py-1 rounded">40문항 (80%)</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">SQL 기본</p>
                    <p className="text-gray-600">DDL, DML, TCL, WHERE, 함수</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">SQL 활용</p>
                    <p className="text-gray-600">조인, 서브쿼리, 집합연산자, 그룹함수</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-800">SQL 최적화 기본</p>
                    <p className="text-gray-600">옵티마이저, 인덱스, 조인 수행원리</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">💡 과목별 학습 전략</h3>
                <ul className="space-y-1 text-green-700 text-sm">
                  <li>• <strong>1과목</strong>: 개념 위주로 빠르게 정리 (2주)</li>
                  <li>• <strong>2과목</strong>: SQL 실습 병행 필수! (4주 이상)</li>
                  <li>• 2과목 비중이 80%이므로 SQL에 집중</li>
                  <li>• 기출문제 반복 풀이로 문제 유형 익히기</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">📅 2026년 시험 일정 (예정)</h3>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-orange-700">제52회</p>
              <p className="text-gray-600">3월 8일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-orange-700">제53회</p>
              <p className="text-gray-600">6월 14일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-orange-700">제54회</p>
              <p className="text-gray-600">9월 6일</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <p className="font-bold text-orange-700">제55회</p>
              <p className="text-gray-600">12월 6일</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
