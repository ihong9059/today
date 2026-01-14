'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FinancialManagerExamPage() {
  const [activeTab, setActiveTab] = useState('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-indigo-100 mb-2">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>›</span>
            <Link href="/category/agriculture" className="hover:text-white">농림·축산</Link>
            <span>›</span>
            <Link href="/category/agriculture/financial-manager" className="hover:text-white">재경관리사</Link>
            <span>›</span>
            <span className="text-white">시험정보</span>
          </div>
          <h1 className="text-2xl font-bold">💼 재경관리사 시험정보</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab('written')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'written' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>시험개요</button>
          <button onClick={() => setActiveTab('subjects')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'subjects' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>과목별 안내</button>
          <button onClick={() => setActiveTab('tips')} className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'tips' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}>합격 전략</button>
        </div>

        {activeTab === 'written' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📝 시험 개요</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험형태</p><p className="font-medium">객관식 4지선다</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">문항수</p><p className="font-medium">총 120문항 (과목당 40문항)</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">시험시간</p><p className="font-medium">150분 (2시간 30분)</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">합격기준</p><p className="font-medium">과목당 40점, 평균 70점</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">응시료</p><p className="font-medium">70,000원</p></div>
                <div className="p-4 bg-gray-50 rounded-lg"><p className="text-sm text-gray-500">주관</p><p className="font-medium">삼일회계법인</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험과목</h2>
              <div className="space-y-2">
                <div className="p-3 bg-indigo-50 rounded-lg flex justify-between"><span>재무회계</span><span className="text-gray-500">40문항</span></div>
                <div className="p-3 bg-indigo-50 rounded-lg flex justify-between"><span>세무회계</span><span className="text-gray-500">40문항</span></div>
                <div className="p-3 bg-indigo-50 rounded-lg flex justify-between"><span>원가관리회계</span><span className="text-gray-500">40문항</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ 유의사항</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• 신분증, 수험표 지참 필수</li>
                <li>• 계산기 지참 가능 (공학용 계산기 불가)</li>
                <li>• 합격 유효기간: 영구</li>
                <li>• 온라인 접수만 가능 (삼일회계법인 자격시험센터)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📊 재무회계 (40문항)</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">회계원리</p>
                  <p className="text-sm text-gray-500">회계의 기초개념, 거래의 기록, 결산절차</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">재무제표</p>
                  <p className="text-sm text-gray-500">재무상태표, 손익계산서, 현금흐름표, 자본변동표</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">자산회계</p>
                  <p className="text-sm text-gray-500">유동자산, 유형자산, 무형자산, 투자자산</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">부채/자본회계</p>
                  <p className="text-sm text-gray-500">유동부채, 비유동부채, 자본거래, 이익잉여금</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 세무회계 (40문항)</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">부가가치세</p>
                  <p className="text-sm text-gray-500">과세체계, 세금계산서, 신고납부</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">소득세</p>
                  <p className="text-sm text-gray-500">종합소득세, 원천징수, 연말정산</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">법인세</p>
                  <p className="text-sm text-gray-500">세무조정, 소득금액계산, 세액계산</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💰 원가관리회계 (40문항)</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">원가회계</p>
                  <p className="text-sm text-gray-500">원가의 개념, 원가배분, 개별/종합원가계산</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">관리회계</p>
                  <p className="text-sm text-gray-500">CVP분석, 관련원가분석, 예산편성</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">성과평가</p>
                  <p className="text-sm text-gray-500">책임회계, 성과평가지표, 대체가격</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50">
                  <p className="font-medium text-indigo-800">1. 재무회계 우선 학습</p>
                  <p className="text-sm text-indigo-600 mt-1">회계의 기본 원리를 탄탄히 다지면 세무회계와 원가회계 이해가 수월해집니다.</p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <p className="font-medium text-purple-800">2. 세무회계는 세법 개정 확인</p>
                  <p className="text-sm text-purple-600 mt-1">매년 세법이 개정되므로 최신 개정 내용을 반드시 확인하세요.</p>
                </div>
                <div className="p-4 border-l-4 border-pink-500 bg-pink-50">
                  <p className="font-medium text-pink-800">3. 원가관리회계는 계산 문제 반복</p>
                  <p className="text-sm text-pink-600 mt-1">CVP분석, 표준원가차이분석 등 계산 문제를 충분히 연습하세요.</p>
                </div>
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <p className="font-medium text-blue-800">4. 기출문제 3회독</p>
                  <p className="text-sm text-blue-600 mt-1">최근 5년 기출문제를 최소 3회 이상 반복 풀이하세요.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 학습 순서</h2>
              <ol className="space-y-3 text-gray-600">
                <li className="flex gap-3"><span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span><span className="flex-1">재무회계 기본서 정독 (2주)</span></li>
                <li className="flex gap-3"><span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span><span className="flex-1">세무회계 기본서 정독 (2주)</span></li>
                <li className="flex gap-3"><span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span><span className="flex-1">원가관리회계 기본서 정독 (2주)</span></li>
                <li className="flex gap-3"><span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">4</span><span className="flex-1">기출문제 풀이 및 오답노트 (2주)</span></li>
                <li className="flex gap-3"><span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">5</span><span className="flex-1">모의고사 및 최종 정리 (1주)</span></li>
              </ol>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
