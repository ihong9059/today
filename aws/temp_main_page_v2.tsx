'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, BookOpen, Code, GraduationCap, Scale, Cpu, Leaf, ChevronDown } from 'lucide-react';

// 강좌 카테고리 데이터 (대분류 > 중분류 > 소분류)
const categoryData = [
  {
    id: 'free',
    name: 'Free',
    icon: '🎁',
    color: 'from-green-500 to-emerald-600',
    subcategories: [
      {
        id: 'intro',
        name: '입문',
        courses: [
          { id: 1, title: '프로그래밍 시작하기', level: '입문' },
          { id: 2, title: 'C언어 첫걸음', level: '입문' },
        ],
      },
    ],
  },
  {
    id: 'coding',
    name: '코딩',
    icon: '💻',
    color: 'from-blue-500 to-indigo-600',
    subcategories: [
      {
        id: 'c',
        name: 'C',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 3, title: 'C언어 기초 문법' }, { id: 4, title: '포인터 완벽 이해' }] },
          { id: 'intermediate', name: '중급', courses: [{ id: 5, title: '자료구조와 알고리즘' }, { id: 6, title: '메모리 관리 심화' }] },
          { id: 'advanced', name: '고급', courses: [{ id: 7, title: '시스템 프로그래밍' }] },
        ],
      },
      {
        id: 'python',
        name: 'Python',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 8, title: 'Python 기초' }] },
          { id: 'intermediate', name: '중급', courses: [{ id: 9, title: 'Python 심화' }] },
        ],
      },
      {
        id: 'c-firmware',
        name: 'C (Firmware)',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 10, title: 'STM32 GPIO 마스터' }, { id: 11, title: 'Arduino 펌웨어 기초' }] },
          { id: 'intermediate', name: '중급', courses: [{ id: 12, title: 'UART/SPI/I2C 통신' }] },
        ],
      },
      {
        id: 'python-hardware',
        name: 'Python (Hardware)',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 13, title: 'Raspberry Pi Python' }] },
        ],
      },
    ],
  },
  {
    id: 'elementary',
    name: '초등교육',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    subcategories: [
      {
        id: 'scratch',
        name: 'Scratch',
        courses: [{ id: 14, title: '스크래치로 게임 만들기' }],
      },
      {
        id: 'entry',
        name: 'Entry',
        courses: [{ id: 15, title: '엔트리로 배우는 코딩' }],
      },
    ],
  },
  {
    id: 'law',
    name: '법률',
    icon: '⚖️',
    color: 'from-amber-500 to-orange-600',
    subcategories: [
      {
        id: 'ip',
        name: '지식재산권',
        courses: [{ id: 16, title: '특허 기초' }, { id: 17, title: '저작권의 이해' }],
      },
      {
        id: 'contract',
        name: '계약법',
        courses: [{ id: 18, title: 'SW 계약 실무' }],
      },
    ],
  },
  {
    id: 'iot',
    name: 'IoT',
    icon: '📡',
    color: 'from-cyan-500 to-teal-600',
    subcategories: [
      {
        id: 'sensor',
        name: '센서',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 19, title: '센서 기초' }] },
          { id: 'intermediate', name: '중급', courses: [{ id: 20, title: '센서 응용' }] },
        ],
      },
      {
        id: 'network',
        name: '네트워크',
        levels: [
          { id: 'beginner', name: '초급', courses: [{ id: 21, title: 'WiFi/BLE 통신' }] },
        ],
      },
    ],
  },
];

// 카테고리 카드 컴포넌트
function CategoryCard({ category, isSelected, onClick }: { category: typeof categoryData[0]; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
        isSelected
          ? `bg-gradient-to-br ${category.color} text-white shadow-lg scale-105`
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
      }`}
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {category.name}
      </h3>
      <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
    </button>
  );
}

// 서브카테고리 패널
function SubcategoryPanel({ category, selectedSub, onSelectSub, selectedLevel, onSelectLevel }: {
  category: typeof categoryData[0];
  selectedSub: string | null;
  onSelectSub: (id: string) => void;
  selectedLevel: string | null;
  onSelectLevel: (level: string) => void;
}) {
  const selectedSubData = category.subcategories.find(s => s.id === selectedSub);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>{category.icon}</span> {category.name}
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-blue-600">중분류 선택</span>
      </h4>

      {/* 중분류 버튼들 */}
      <div className="flex flex-wrap gap-3 mb-6">
        {category.subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelectSub(sub.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedSub === sub.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* 소분류 (레벨) 선택 */}
      {selectedSubData && 'levels' in selectedSubData && (
        <div className="border-t pt-4">
          <h5 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <span>{selectedSubData.name}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-green-600">레벨 선택</span>
          </h5>
          <div className="flex gap-3">
            {(selectedSubData as any).levels.map((level: any) => (
              <button
                key={level.id}
                onClick={() => onSelectLevel(level.name)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLevel === level.name
                    ? level.name === '초급' ? 'bg-green-500 text-white' :
                      level.name === '중급' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>

          {/* 선택된 레벨의 강좌 목록 */}
          {selectedLevel && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              {(selectedSubData as any).levels
                .find((l: any) => l.name === selectedLevel)?.courses
                .map((course: any) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition group"
                  >
                    <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {course.title}
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      )}

      {/* 레벨 없이 바로 강좌 목록 */}
      {selectedSubData && 'courses' in selectedSubData && !('levels' in selectedSubData) && (
        <div className="border-t pt-4">
          <h5 className="text-sm font-medium text-gray-600 mb-3">{selectedSubData.name} 강좌</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(selectedSubData as any).courses.map((course: any) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition group"
              >
                <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  {course.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setSelectedSub(null);
      setSelectedLevel(null);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSub(null);
      setSelectedLevel(null);
    }
  };

  const selectedCategoryData = categoryData.find(c => c.id === selectedCategory);

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

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">하드웨어 C언어 교육 플랫폼</h1>
          <p className="text-slate-300 text-lg">체계적인 커리큘럼으로 임베디드 개발자로 성장하세요</p>
        </div>
      </section>

      {/* 메인 콘텐츠 - 카테고리 탐색 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">강좌 카테고리</h2>
          <p className="text-gray-600">관심 있는 분야를 선택하세요</p>
        </div>

        {/* 대분류 카테고리 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        {/* 선택된 카테고리의 서브카테고리 패널 */}
        {selectedCategoryData && (
          <SubcategoryPanel
            category={selectedCategoryData}
            selectedSub={selectedSub}
            onSelectSub={setSelectedSub}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
        )}

        {/* 빠른 시작 안내 */}
        {!selectedCategory && (
          <div className="mt-12 bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 빠른 시작</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">1️⃣</div>
                <h4 className="font-semibold text-gray-900 mb-2">대분류 선택</h4>
                <p className="text-gray-600 text-sm">Free, 코딩, 초등교육 등 관심 분야를 선택하세요</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">2️⃣</div>
                <h4 className="font-semibold text-gray-900 mb-2">중분류 선택</h4>
                <p className="text-gray-600 text-sm">C, Python, Firmware 등 세부 분야를 선택하세요</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl mb-3">3️⃣</div>
                <h4 className="font-semibold text-gray-900 mb-2">레벨 선택</h4>
                <p className="text-gray-600 text-sm">초급, 중급, 고급 중 자신에게 맞는 레벨을 선택하세요</p>
              </div>
            </div>
          </div>
        )}
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
