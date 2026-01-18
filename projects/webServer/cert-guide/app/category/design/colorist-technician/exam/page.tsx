'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ColoristTechnicianExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-rose-100 mb-4">
            <Link href="/category/design/colorist-technician" className="hover:text-white transition-colors">
              컬러리스트산업기사
            </Link>
            <span>/</span>
            <span>시험 정보</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">시험 정보</h1>
          <p className="text-rose-100">컬러리스트산업기사 필기·실기 시험 상세 안내</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('written')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'written'
                ? 'bg-rose-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-rose-50'
            }`}
          >
            필기시험
          </button>
          <button
            onClick={() => setActiveTab('practical')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'practical'
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            실기시험
          </button>
        </div>

        {/* Written Exam Content */}
        {activeTab === 'written' && (
          <div className="space-y-8">
            {/* 시험 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-3xl font-bold text-rose-500">3과목</div>
                  <div className="text-gray-600">시험 과목</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-pink-500">60문항</div>
                  <div className="text-gray-600">객관식 4지선다</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-3xl font-bold text-rose-500">90분</div>
                  <div className="text-gray-600">시험 시간</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-pink-500">60점</div>
                  <div className="text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            {/* 과목별 상세 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">과목별 상세</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-rose-500 pl-6 py-4 bg-rose-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1. 색채이론 (20문항)</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 색의 기초: 빛과 색, 색의 3속성</li>
                    <li>• 색채 체계: 먼셀, PCCS, NCS 등</li>
                    <li>• 색의 혼합: 가산혼합, 감산혼합, 중간혼합</li>
                    <li>• 색채 지각: 대비, 동화, 잔상, 순응</li>
                  </ul>
                </div>
                <div className="border-l-4 border-pink-500 pl-6 py-4 bg-pink-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2. 색채디자인 (20문항)</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 색채 심리: 색채 감정, 연상, 상징</li>
                    <li>• 색채 조화: 배색 원리, 배색 기법</li>
                    <li>• 이미지 스케일: 단색/배색 이미지</li>
                    <li>• 색채 계획: 디자인 분야별 색채 적용</li>
                  </ul>
                </div>
                <div className="border-l-4 border-rose-500 pl-6 py-4 bg-rose-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3. 색채관리 (20문항)</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 색채 측정: 측색기, CIE 표색계</li>
                    <li>• 색채 재현: 인쇄, 디지털 색채</li>
                    <li>• 색채 품질: 색차 관리, 표준화</li>
                    <li>• 색채 규정: 안전색채, 환경색채</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 출제 경향 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">출제 경향</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-rose-500 mb-3">자주 출제되는 주제</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      먼셀/PCCS 색체계 표기법
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      색의 3속성 관련 문제
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      배색 기법 용어
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                      색채 대비 현상
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-pink-500 mb-3">학습 포인트</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      기사보다 범위가 좁아 집중 학습
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      기본 용어와 개념 확실히 암기
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      색체계별 특징 비교 정리
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      기출문제 반복 풀이
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practical Exam Content */}
        {activeTab === 'practical' && (
          <div className="space-y-8">
            {/* 시험 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-pink-500">작업형</div>
                  <div className="text-gray-600">시험 유형</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-3xl font-bold text-rose-500">4시간</div>
                  <div className="text-gray-600">240분</div>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <div className="text-3xl font-bold text-pink-500">100점</div>
                  <div className="text-gray-600">만점</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-xl">
                  <div className="text-3xl font-bold text-rose-500">60점</div>
                  <div className="text-gray-600">합격 기준</div>
                </div>
              </div>
            </div>

            {/* 평가 영역 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">평가 영역: 색채계획 실무</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-pink-500 pl-6 py-4 bg-pink-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">1. 색채 분석</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 주어진 자료의 색채 분석</li>
                    <li>• 색채 특성 파악 및 정리</li>
                    <li>• 색채 현황 조사 결과 작성</li>
                  </ul>
                </div>
                <div className="border-l-4 border-rose-500 pl-6 py-4 bg-rose-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">2. 색채 계획</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 색채 콘셉트 설정</li>
                    <li>• 색채 팔레트 구성</li>
                    <li>• 배색 계획 수립</li>
                  </ul>
                </div>
                <div className="border-l-4 border-pink-500 pl-6 py-4 bg-pink-50/50 rounded-r-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">3. 색채 적용</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 색채 시안 제작</li>
                    <li>• 색채 적용 결과물 완성</li>
                    <li>• 색채 계획서 작성</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 준비물 및 주의사항 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">수험자 준비물</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-pink-500">✓</span>
                    신분증
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-500">✓</span>
                    필기도구 (연필, 지우개, 자)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-500">✓</span>
                    색연필 또는 마카
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-pink-500">✓</span>
                    색채 도구 (공지 확인)
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">주의사항</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">!</span>
                    시험 시작 30분 전까지 입실
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">!</span>
                    4시간 시험 - 컨디션 관리
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">!</span>
                    색채 도구 사전 점검
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-rose-500">!</span>
                    시간 배분 전략 수립
                  </li>
                </ul>
              </div>
            </div>

            {/* 실기 합격 전략 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">실기 합격 전략</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
                  <div className="text-4xl mb-3">📝</div>
                  <h3 className="font-semibold text-gray-800 mb-2">계획서 양식</h3>
                  <p className="text-sm text-gray-600">색채계획서 작성 형식을 미리 숙지하고 연습합니다.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
                  <div className="text-4xl mb-3">🎨</div>
                  <h3 className="font-semibold text-gray-800 mb-2">배색 연습</h3>
                  <p className="text-sm text-gray-600">다양한 배색을 직접 해보며 색 감각을 키웁니다.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="font-semibold text-gray-800 mb-2">시간 관리</h3>
                  <p className="text-sm text-gray-600">4시간을 효율적으로 분배하여 모든 과제를 완료합니다.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/design/colorist-technician"
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium"
          >
            ← 메인으로
          </Link>
          <Link
            href="/category/design/colorist-technician/study/color-theory"
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl transition-colors font-medium"
          >
            학습 시작하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
