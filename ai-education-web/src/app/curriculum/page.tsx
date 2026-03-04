import LevelCard from '@/components/LevelCard';
import { curriculum } from '@/data/curriculum';

export default function CurriculumPage() {
  const totalLessons = curriculum.reduce((sum, level) => sum + level.lessons.length, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            전체 커리큘럼
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Level 0부터 Level 9까지, 체계적으로 설계된 AI 학습 경로입니다.
            <br />
            각 레벨을 순서대로 학습하면 AI의 기초부터 실전 프로젝트까지 완성할 수 있습니다.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{curriculum.length}</div>
              <div className="text-gray-600 text-sm">레벨</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{totalLessons}</div>
              <div className="text-gray-600 text-sm">레슨</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 text-sm">학습 시간</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600 text-sm">무료</div>
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">추천 학습 경로</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-2">입문자 코스</h3>
              <p className="text-sm text-blue-700 mb-3">약 30시간</p>
              <p className="text-sm text-gray-600">
                Level 0 → 1 → 2 → 3 → 4 → 5
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Python 기초부터 CNN 이미지 분류까지
              </p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-semibold text-green-800 mb-2">전체 코스</h3>
              <p className="text-sm text-green-700 mb-3">약 50시간</p>
              <p className="text-sm text-gray-600">
                Level 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
              </p>
              <p className="text-xs text-gray-500 mt-2">
                기초부터 번호판 인식 프로젝트까지 완전 정복
              </p>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-2">빠른 실습 코스</h3>
              <p className="text-sm text-purple-700 mb-3">약 20시간</p>
              <p className="text-sm text-gray-600">
                Level 0 → 1 → 4 → 5 → 9
              </p>
              <p className="text-xs text-gray-500 mt-2">
                핵심만 빠르게, 실습 중심으로
              </p>
            </div>
          </div>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </div>
    </div>
  );
}
