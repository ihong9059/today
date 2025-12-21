'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronRight, BookOpen, Clock, Users } from 'lucide-react';

// 강좌 데이터 (대분류 > 중분류 > 소분류)
const courseData = {
  categories: [
    {
      id: 'free',
      name: 'Free',
      description: '무료로 시작하는 프로그래밍',
      subcategories: [
        {
          id: 'intro',
          name: '입문',
          courses: [
            { id: 1, title: '프로그래밍 시작하기', level: '입문', duration: '2시간', students: 1500, badge: 'FREE' },
            { id: 2, title: 'C언어 첫걸음', level: '입문', duration: '3시간', students: 1200, badge: 'FREE' },
          ],
        },
      ],
    },
    {
      id: 'coding',
      name: '코딩',
      description: '프로그래밍 언어 학습',
      subcategories: [
        {
          id: 'c',
          name: 'C',
          levels: [
            {
              id: 'beginner',
              name: '초급',
              courses: [
                { id: 3, title: 'C언어 기초 문법', level: '초급', duration: '5시간', students: 800, price: '45,000원' },
                { id: 4, title: '포인터 완벽 이해', level: '초급', duration: '4시간', students: 650, price: '35,000원' },
              ],
            },
            {
              id: 'intermediate',
              name: '중급',
              courses: [
                { id: 5, title: '자료구조와 알고리즘', level: '중급', duration: '8시간', students: 450, price: '65,000원' },
                { id: 6, title: '메모리 관리 심화', level: '중급', duration: '6시간', students: 320, price: '55,000원' },
              ],
            },
            {
              id: 'advanced',
              name: '고급',
              courses: [
                { id: 7, title: '시스템 프로그래밍', level: '고급', duration: '10시간', students: 180, price: '95,000원' },
              ],
            },
          ],
        },
        {
          id: 'python',
          name: 'Python',
          levels: [
            {
              id: 'beginner',
              name: '초급',
              courses: [
                { id: 8, title: 'Python 기초', level: '초급', duration: '4시간', students: 1100, price: '35,000원' },
              ],
            },
          ],
        },
        {
          id: 'c-firmware',
          name: 'C (Firmware)',
          levels: [
            {
              id: 'beginner',
              name: '초급',
              courses: [
                { id: 9, title: 'STM32 GPIO 마스터', level: '초급', duration: '6시간', students: 380, price: '55,000원' },
                { id: 10, title: 'Arduino 펌웨어 기초', level: '초급', duration: '5시간', students: 520, price: '45,000원' },
              ],
            },
            {
              id: 'intermediate',
              name: '중급',
              courses: [
                { id: 11, title: 'UART/SPI/I2C 통신', level: '중급', duration: '8시간', students: 280, price: '75,000원' },
              ],
            },
          ],
        },
        {
          id: 'python-hardware',
          name: 'Python (Hardware)',
          levels: [
            {
              id: 'beginner',
              name: '초급',
              courses: [
                { id: 12, title: 'Raspberry Pi Python', level: '초급', duration: '5시간', students: 420, price: '45,000원' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'elementary',
      name: '초등교육',
      description: '어린이를 위한 코딩 교육',
      subcategories: [
        {
          id: 'scratch',
          name: 'Scratch',
          courses: [
            { id: 13, title: '스크래치로 게임 만들기', level: '입문', duration: '3시간', students: 890, price: '25,000원' },
          ],
        },
      ],
    },
  ],
};

// 강좌 카드 컴포넌트
function CourseCard({ course }: { course: any }) {
  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-900 relative">
          {course.badge && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {course.badge}
            </span>
          )}
          {course.price && (
            <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {course.price}
            </span>
          )}
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students}명
            </span>
          </div>
          <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
            course.level === '입문' ? 'bg-green-100 text-green-700' :
            course.level === '초급' ? 'bg-blue-100 text-blue-700' :
            course.level === '중급' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {course.level}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const selectedCategoryData = courseData.categories.find(c => c.id === selectedCategory);
  const selectedSubcategoryData = selectedCategoryData?.subcategories.find(s => s.id === selectedSubcategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">강좌 목록</h1>
          <p className="text-blue-200">체계적인 커리큘럼으로 실력을 키워보세요</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <button onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); setSelectedLevel(null); }} className="hover:text-blue-600">
            전체
          </button>
          {selectedCategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => { setSelectedSubcategory(null); setSelectedLevel(null); }} className="hover:text-blue-600">
                {selectedCategoryData?.name}
              </button>
            </>
          )}
          {selectedSubcategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => setSelectedLevel(null)} className="hover:text-blue-600">
                {selectedSubcategoryData?.name}
              </button>
            </>
          )}
          {selectedLevel && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{selectedLevel}</span>
            </>
          )}
        </div>

        {/* 대분류 선택 */}
        {!selectedCategory && (
          <div className="grid md:grid-cols-3 gap-6">
            {courseData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
                <p className="text-blue-600 text-sm mt-4 flex items-center gap-1">
                  강좌 보기 <ChevronRight className="w-4 h-4" />
                </p>
              </button>
            ))}
          </div>
        )}

        {/* 중분류 선택 */}
        {selectedCategory && !selectedSubcategory && selectedCategoryData && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedCategoryData.name}</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {selectedCategoryData.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubcategory(sub.id)}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-left hover:shadow-md hover:border-green-200 transition-all"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{sub.name}</h4>
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    선택 <ChevronRight className="w-4 h-4" />
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 소분류(레벨) 선택 또는 강좌 목록 */}
        {selectedSubcategory && selectedSubcategoryData && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedSubcategoryData.name}</h2>

            {/* 레벨이 있는 경우 */}
            {'levels' in selectedSubcategoryData && !selectedLevel && (
              <div className="flex gap-4 mb-8">
                {(selectedSubcategoryData as any).levels.map((level: any) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.name)}
                    className={`px-6 py-3 rounded-xl font-semibold transition ${
                      level.name === '초급' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                      level.name === '중급' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                      'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            )}

            {/* 강좌 목록 표시 */}
            {'levels' in selectedSubcategoryData && selectedLevel && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(selectedSubcategoryData as any).levels
                  .find((l: any) => l.name === selectedLevel)?.courses
                  .map((course: any) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            )}

            {/* 레벨 없이 바로 강좌 목록 */}
            {'courses' in selectedSubcategoryData && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(selectedSubcategoryData as any).courses.map((course: any) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
