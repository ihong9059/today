'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Code2, Cpu, Users, Award, BookOpen, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            UTTEC Edu에 오신 것을 환영합니다
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            임베디드 시스템과 하드웨어 프로그래밍을 위한 최고의 교육 플랫폼
          </p>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">UTTEC Edu란?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              UTTEC Edu는 하드웨어 C언어 프로그래밍과 임베디드 시스템 개발을
              체계적으로 배울 수 있는 온라인 교육 플랫폼입니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">하드웨어 중심</h3>
              <p className="text-gray-600">
                STM32, Arduino, ESP32, Raspberry Pi 등
                실제 하드웨어 플랫폼 기반 학습
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">체계적 커리큘럼</h3>
              <p className="text-gray-600">
                초급부터 고급까지 단계별로 설계된
                학습 로드맵 제공
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">실전 프로젝트</h3>
              <p className="text-gray-600">
                이론과 함께 실습 프로젝트로
                실무 역량 강화
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 강좌 분류 안내 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">강좌 분류 체계</h2>
            <p className="text-gray-600">체계적인 분류로 원하는 강좌를 쉽게 찾으세요</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="space-y-6">
              {/* 대분류 */}
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-lg">대분류</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Free</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">코딩</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">초등교육</span>
                </div>
              </div>

              {/* 중분류 */}
              <div className="flex items-start gap-4 ml-8">
                <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-lg">중분류</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">C</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Python</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">C (Firmware)</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">Python (Hardware)</span>
                </div>
              </div>

              {/* 소분류 */}
              <div className="flex items-start gap-4 ml-16">
                <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg">소분류</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">초급</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">중급</span>
                  <span className="px-4 py-2 bg-white rounded-lg shadow-sm">고급</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600 mt-2">강좌 수</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-600">1,000+</p>
              <p className="text-gray-600 mt-2">수강생</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-600">95%</p>
              <p className="text-gray-600 mt-2">만족도</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-orange-500">24/7</p>
              <p className="text-gray-600 mt-2">학습 지원</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-blue-200 mb-8">
            UTTEC Edu와 함께 임베디드 전문가로 성장하세요
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              강좌 둘러보기
            </Link>
            <Link
              href="/register"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              무료 회원가입
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
