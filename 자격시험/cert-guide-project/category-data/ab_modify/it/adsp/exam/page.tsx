'use client';

import Link from 'next/link';

export default function ADsPExamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/it/adsp" className="text-cyan-600 hover:text-cyan-800 flex items-center gap-2">
            <span>←</span>
            <span>ADsP로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ADsP 시험 정보</h1>
              <p className="text-gray-600">데이터분석 준전문가 자격시험 안내</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
              <h3 className="font-bold text-cyan-800 mb-3">📌 기본 정보</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">시행기관</p>
                  <p className="font-medium text-gray-800">한국데이터산업진흥원</p>
                </div>
                <div>
                  <p className="text-gray-600">자격종류</p>
                  <p className="font-medium text-gray-800">국가공인 민간자격</p>
                </div>
                <div>
                  <p className="text-gray-600">시험횟수</p>
                  <p className="font-medium text-gray-800">연 4회 (3월, 6월, 9월, 12월)</p>
                </div>
                <div>
                  <p className="text-gray-600">응시료</p>
                  <p className="font-medium text-gray-800">50,000원</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">✅ 응시자격</h3>
              <p className="text-blue-700 font-medium">제한 없음</p>
              <p className="text-blue-600 text-sm mt-1">누구나 응시 가능합니다.</p>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4">📝 시험 구성</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">과목</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">내용</th>
                      <th className="px-4 py-2 text-center font-medium text-gray-600 border-b">문항수</th>
                      <th className="px-4 py-2 text-center font-medium text-gray-600 border-b">배점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium text-cyan-700">1과목</td>
                      <td className="px-4 py-3">데이터 이해</td>
                      <td className="px-4 py-3 text-center">10문항</td>
                      <td className="px-4 py-3 text-center">20점</td>
                    </tr>
                    <tr className="border-b bg-gray-50">
                      <td className="px-4 py-3 font-medium text-blue-700">2과목</td>
                      <td className="px-4 py-3">데이터 분석 기획</td>
                      <td className="px-4 py-3 text-center">10문항</td>
                      <td className="px-4 py-3 text-center">20점</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-indigo-700">3과목</td>
                      <td className="px-4 py-3">데이터 분석</td>
                      <td className="px-4 py-3 text-center">30문항</td>
                      <td className="px-4 py-3 text-center">60점</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-cyan-50 font-medium">
                      <td className="px-4 py-3" colSpan={2}>합계</td>
                      <td className="px-4 py-3 text-center">50문항</td>
                      <td className="px-4 py-3 text-center">100점</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4">⏱️ 시험 시간</h3>
              <div className="flex items-center gap-4">
                <div className="text-center p-4 bg-cyan-50 rounded-lg flex-1">
                  <p className="text-3xl font-bold text-cyan-600">90분</p>
                  <p className="text-sm text-gray-600">총 시험 시간</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg flex-1">
                  <p className="text-3xl font-bold text-blue-600">50문항</p>
                  <p className="text-sm text-gray-600">4지선다 객관식</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg flex-1">
                  <p className="text-3xl font-bold text-indigo-600">CBT</p>
                  <p className="text-sm text-gray-600">컴퓨터 시험</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-bold text-indigo-800 mb-3">🎯 합격 기준</h3>
              <div className="space-y-2 text-indigo-700">
                <p className="font-medium">• 총점 100점 만점 중 <strong>60점 이상</strong> 취득</p>
                <p className="text-sm">• 과목별 과락 없음 (총점만 충족하면 합격)</p>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-4">
              <h3 className="font-bold text-gray-800 mb-4">📊 과목별 세부 내용</h3>
              <div className="space-y-4">
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <h4 className="font-bold text-cyan-800 mb-2">1과목: 데이터 이해 (10문항)</h4>
                  <ul className="text-sm text-cyan-700 space-y-1">
                    <li>• 데이터의 이해: 데이터 정의, 데이터베이스 정의와 특징</li>
                    <li>• 데이터의 가치와 미래: 빅데이터 등장, 데이터 사이언스</li>
                    <li>• 데이터 산업: 데이터 산업 현황, 개인정보보호법</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">2과목: 데이터 분석 기획 (10문항)</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 분석 기획: 분석 기획 방향, 분석 방법론</li>
                    <li>• 분석 마스터 플랜: 분석 과제 정의, 분석 프로젝트 관리</li>
                    <li>• 분석 거버넌스: 분석 조직, 분석 성숙도 모델</li>
                  </ul>
                </div>
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <h4 className="font-bold text-indigo-800 mb-2">3과목: 데이터 분석 (30문항)</h4>
                  <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• R 기초와 데이터 마트: R 기본 문법, 데이터 구조</li>
                    <li>• 통계 분석: 기술통계, 추론통계, 가설검정</li>
                    <li>• 데이터 마이닝: 분류, 군집, 연관분석</li>
                    <li>• 데이터 시각화: 시각화 원칙, 그래프 유형</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3">📈 합격률 현황</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-lg font-bold text-amber-600">2024</p>
                  <p className="text-2xl font-bold text-gray-800">55%</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-lg font-bold text-amber-600">2023</p>
                  <p className="text-2xl font-bold text-gray-800">52%</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-lg font-bold text-amber-600">2022</p>
                  <p className="text-2xl font-bold text-gray-800">48%</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <p className="text-lg font-bold text-amber-600">2021</p>
                  <p className="text-2xl font-bold text-gray-800">45%</p>
                </div>
              </div>
              <p className="text-sm text-amber-700 mt-3">※ 평균 합격률 약 50% 수준</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3">🔗 관련 자격증</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-green-800">ADsP → ADP 승급</p>
                  <p className="text-sm text-green-600">ADsP 취득 후 ADP(데이터분석 전문가) 응시 가능</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-green-800">빅데이터분석기사</p>
                  <p className="text-sm text-green-600">국가기술자격증으로 실기 포함</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
          <h3 className="font-bold text-cyan-800 mb-3">💡 시험 준비 TIP</h3>
          <ul className="space-y-2 text-cyan-700 text-sm">
            <li>• <strong>3과목 집중</strong>: 60% 배점이므로 3과목에 가장 많은 시간 투자</li>
            <li>• <strong>기출문제 풀이</strong>: 기출 유형이 반복되므로 기출 분석 필수</li>
            <li>• <strong>R 기초</strong>: 코드 실행 결과 예측 문제 대비</li>
            <li>• <strong>통계 개념</strong>: 기본 통계 용어와 공식 암기 필요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
