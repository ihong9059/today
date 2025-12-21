'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Brain, Users, ArrowRight } from 'lucide-react';

export default function MBTIPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">성격 유형 검사</h1>
          <p className="text-purple-200 text-lg">나에게 맞는 학습 스타일과 진로를 찾아보세요!</p>
        </div>
      </section>

      {/* 테스트 선택 */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* MBTI 검사 (성인용) */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-5xl mb-2">🧠</div>
                <div className="flex gap-2 justify-center">
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">INTJ</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">ENFP</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">+14</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">MBTI 성격 유형 검사</h2>
              <p className="text-gray-600 mb-4">
                40문항으로 구성된 상세한 MBTI 검사입니다.<br />
                나의 에너지 방향, 인식, 판단, 생활 양식을 분석합니다.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">40문항</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">10~15분</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">16세 이상</span>
              </div>
              <a
                href="/mbti-test.html"
                target="_blank"
                className="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-900 hover:to-black transition flex items-center justify-center gap-2"
              >
                검사 시작하기
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* MMTIC 검사 (초등학생용) */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-5xl mb-2">🌈</div>
                <div className="flex gap-2 justify-center">
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">초등학생</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-sm">재미있게!</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">MMTIC 성격 검사</h2>
              <p className="text-gray-600 mb-4">
                초등학생을 위한 쉽고 재미있는 성격 유형 검사입니다.<br />
                나의 성격 유형과 어울리는 친구, 직업을 알아봐요!
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">쉬운 문항</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">5~10분</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">초등학생용</span>
              </div>
              <a
                href="/mmtic-test.html"
                target="_blank"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-700 transition flex items-center justify-center gap-2"
              >
                검사 시작하기
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            검사 안내
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              정답은 없습니다. 평소의 자신을 떠올리며 솔직하게 응답해 주세요.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              너무 오래 고민하지 마시고, 직관적으로 선택해 주세요.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              성격 유형은 고정되어 있지 않으며, 환경과 경험에 따라 변할 수 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              검사 결과는 자기 이해를 위한 참고 자료입니다.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
