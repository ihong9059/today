'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

// 강좌 카드 데이터
const freeClasses = [
  {
    id: 1,
    title: 'STM32',
    subtitle: 'ARM Cortex-M 기반',
    description: 'STM32 입문부터 실전까지',
    image: '/images/stm32.jpg',
    badge: 'FREE',
  },
  {
    id: 2,
    title: 'Arduino',
    subtitle: 'AVR/ARM 기반',
    description: '아두이노 프로그래밍의 모든 것',
    image: '/images/arduino.jpg',
    badge: 'FREE',
  },
  {
    id: 3,
    title: 'ESP32',
    subtitle: 'WiFi/BLE 지원',
    description: 'IoT 프로젝트 완전정복',
    image: '/images/esp32.jpg',
    badge: 'FREE',
  },
  {
    id: 4,
    title: 'Raspberry Pi',
    subtitle: 'Linux 기반',
    description: '라즈베리파이로 배우는 임베디드',
    image: '/images/raspberrypi.jpg',
    badge: 'FREE',
  },
];

const practiceClasses = [
  {
    id: 5,
    title: 'GPIO 실습',
    subtitle: '입출력 제어',
    description: 'LED, 버튼, 센서 제어하기',
    image: '/images/gpio.jpg',
    badge: 'FREE',
  },
  {
    id: 6,
    title: 'UART 통신',
    subtitle: '시리얼 통신',
    description: '시리얼 모니터와 데이터 통신',
    image: '/images/uart.jpg',
    badge: 'FREE',
  },
  {
    id: 7,
    title: 'I2C/SPI',
    subtitle: '버스 통신',
    description: '센서, 디스플레이 연결하기',
    image: '/images/i2c.jpg',
    badge: 'FREE',
  },
  {
    id: 8,
    title: 'PWM/ADC',
    subtitle: '아날로그 제어',
    description: '모터, 서보, 센서 값 읽기',
    image: '/images/pwm.jpg',
    badge: 'FREE',
  },
];

// 카드 컴포넌트
function CourseCard({ course }: { course: typeof freeClasses[0] }) {
  return (
    <Link href={`/courses/${course.id}`} className="flex-shrink-0 w-56 group">
      <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl overflow-hidden aspect-[3/4] shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        {/* 배지 */}
        {course.badge && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            {course.badge}
          </span>
        )}

        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* 콘텐츠 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{course.title}</h3>
          <div className="w-8 h-0.5 bg-white/50 mb-2" />
          <p className="text-sm text-gray-300">{course.subtitle}</p>
          <p className="text-xs text-gray-400 mt-1">{course.description}</p>
        </div>
      </div>
    </Link>
  );
}

// 카드 슬라이더 컴포넌트
function CardSlider({ title, subtitle, courses }: { title: string; subtitle: string; courses: typeof freeClasses }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-yellow-500">👆</span> {title}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 헤더/네비게이션 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold">C</span>
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition">
                MBTI
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-white transition">
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Free Classes 섹션 */}
        <CardSlider
          title="Free Classes"
          subtitle="무료로 배우는 하드웨어 C언어 프로그래밍"
          courses={freeClasses}
        />

        {/* 실전 프로젝트 섹션 */}
        <CardSlider
          title="실전 프로젝트 강의"
          subtitle="직접 만들어보며 배우는 실습 가이드"
          courses={practiceClasses}
        />
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="text-white font-semibold">UTTEC Edu</span>
          </div>
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
