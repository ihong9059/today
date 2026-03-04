import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { curriculum } from '@/data/curriculum';

export default function RoadmapPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            학습 로드맵
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            AI 학습의 전체 여정을 한눈에 확인하세요.
            <br />
            각 레벨을 클릭하면 상세 내용을 볼 수 있습니다.
          </p>
        </div>

        {/* Roadmap Visualization */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Foundation */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mr-2">1</span>
                기초 단계
              </h2>
              <div className="flex items-center space-x-4">
                <Link href="/level/0" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors border-2 border-gray-300">
                    <div className="text-2xl mb-2">🐍</div>
                    <div className="font-bold">Level 0</div>
                    <div className="text-sm text-gray-600">Python 기초</div>
                    <div className="text-xs text-gray-500 mt-1">4시간</div>
                  </div>
                </Link>
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <Link href="/level/1" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors border-2 border-blue-300">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="font-bold">Level 1</div>
                    <div className="text-sm text-gray-600">AI 기초 이론</div>
                    <div className="text-xs text-gray-500 mt-1">5시간</div>
                  </div>
                </Link>
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <Link href="/level/2" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors border-2 border-purple-300">
                    <div className="text-2xl mb-2">📐</div>
                    <div className="font-bold">Level 2</div>
                    <div className="text-sm text-gray-600">수학 기초</div>
                    <div className="text-xs text-gray-500 mt-1">6시간</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Core Deep Learning */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center text-sm font-bold mr-2">2</span>
                딥러닝 핵심
              </h2>
              <div className="flex items-center space-x-4">
                <Link href="/level/3" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-red-100 rounded-xl hover:bg-red-200 transition-colors border-2 border-red-300">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="font-bold">Level 3</div>
                    <div className="text-sm text-gray-600">딥러닝 핵심</div>
                    <div className="text-xs text-gray-500 mt-1">6시간</div>
                  </div>
                </Link>
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <Link href="/level/4" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-orange-100 rounded-xl hover:bg-orange-200 transition-colors border-2 border-orange-300">
                    <div className="text-2xl mb-2">🔦</div>
                    <div className="font-bold">Level 4</div>
                    <div className="text-sm text-gray-600">PyTorch 입문</div>
                    <div className="text-xs text-gray-500 mt-1">5시간</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Specialization */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold mr-2">3</span>
                전문 분야
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">이미지 처리 트랙</p>
                  <div className="flex items-center space-x-4">
                    <Link href="/level/5" className="flex-shrink-0">
                      <div className="w-48 p-4 bg-green-100 rounded-xl hover:bg-green-200 transition-colors border-2 border-green-300">
                        <div className="text-2xl mb-2">🖼️</div>
                        <div className="font-bold">Level 5</div>
                        <div className="text-sm text-gray-600">CNN & 이미지</div>
                        <div className="text-xs text-gray-500 mt-1">6시간</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">자연어 처리 트랙</p>
                  <div className="flex items-center space-x-4">
                    <Link href="/level/6" className="flex-shrink-0">
                      <div className="w-48 p-4 bg-teal-100 rounded-xl hover:bg-teal-200 transition-colors border-2 border-teal-300">
                        <div className="text-2xl mb-2">🔄</div>
                        <div className="font-bold">Level 6</div>
                        <div className="text-sm text-gray-600">RNN/LSTM</div>
                        <div className="text-xs text-gray-500 mt-1">5시간</div>
                      </div>
                    </Link>
                    <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    <Link href="/level/7" className="flex-shrink-0">
                      <div className="w-48 p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200 transition-colors border-2 border-indigo-300">
                        <div className="text-2xl mb-2">🤖</div>
                        <div className="font-bold">Level 7</div>
                        <div className="text-sm text-gray-600">Transformer</div>
                        <div className="text-xs text-gray-500 mt-1">6시간</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-sm font-bold mr-2">4</span>
                고급 & 프로젝트
              </h2>
              <div className="flex items-center space-x-4">
                <Link href="/level/8" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-lime-100 rounded-xl hover:bg-lime-200 transition-colors border-2 border-lime-300">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="font-bold">Level 8</div>
                    <div className="text-sm text-gray-600">GPU/CUDA</div>
                    <div className="text-xs text-gray-500 mt-1">5시간 (선택)</div>
                  </div>
                </Link>
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
                <Link href="/level/9" className="flex-shrink-0">
                  <div className="w-48 p-4 bg-pink-100 rounded-xl hover:bg-pink-200 transition-colors border-2 border-pink-300 ring-2 ring-pink-400 ring-offset-2">
                    <div className="text-2xl mb-2">🚗</div>
                    <div className="font-bold">Level 9</div>
                    <div className="text-sm text-gray-600">종합 프로젝트</div>
                    <div className="text-xs text-gray-500 mt-1">8시간</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Level Summary */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">레벨별 요약</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {curriculum.map((level) => (
              <Link
                key={level.id}
                href={`/level/${level.id}`}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 ${level.color} rounded-xl flex items-center justify-center text-white text-xl mr-4`}>
                  {level.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {level.title}: {level.subtitle}
                  </div>
                  <div className="text-sm text-gray-600">
                    {level.lessons.length}개 레슨 · {level.totalTime}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
