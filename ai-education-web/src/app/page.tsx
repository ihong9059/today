import Link from 'next/link';
import { ArrowRight, Brain, Code, PlayCircle, Sparkles, Target } from 'lucide-react';
import LevelCard from '@/components/LevelCard';
import { curriculum } from '@/data/curriculum';

// YouTube 소개 영상 URL
const INTRO_VIDEO_URL = "https://www.youtube.com/watch?v=HTllLaf8Eto";
const INTRO_VIDEO_ID = "HTllLaf8Eto";
const INTRO_THUMBNAIL_URL = `https://img.youtube.com/vi/${INTRO_VIDEO_ID}/maxresdefault.jpg`;

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI를 시작하는 가장 쉬운 방법
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              중학교 수학에서 시작해서 GPT 원리까지,
              <br />
              단계별로 배우는 AI 교육 플랫폼
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/curriculum"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                학습 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                로드맵 보기
              </Link>
              <Link
                href="/report"
                className="inline-flex items-center px-8 py-4 border-2 border-orange-300 text-orange-200 font-semibold rounded-lg hover:bg-orange-500/20 transition-colors"
              >
                📊 분석 보고서
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center px-8 py-4 border-2 border-emerald-300 text-emerald-200 font-semibold rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                🐍 실습 가이드
              </Link>
              <Link
                href="/transformer"
                className="inline-flex items-center px-8 py-4 border-2 border-violet-300 text-violet-200 font-semibold rounded-lg hover:bg-violet-500/20 transition-colors"
              >
                🤖 Transformer 원리
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              강의 소개 영상
            </h2>
            <p className="text-gray-300">
              AI 첫걸음 과정이 어떻게 진행되는지 10분만 투자해서 알아보세요
            </p>
          </div>
          <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* YouTube 썸네일 배경 */}
            <img
              src={INTRO_THUMBNAIL_URL}
              alt="AI 첫걸음 소개 영상 썸네일"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* 오버레이 */}
            <a
              href={INTRO_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center group bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 group-hover:scale-110 transition-all shadow-lg">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-xl font-semibold drop-shadow-lg">소개 영상 보기</p>
                <p className="text-gray-200 text-sm mt-2 drop-shadow">YouTube에서 시청</p>
              </div>
            </a>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">8분</div>
              <div className="text-gray-400 text-sm">영상 길이</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">10개</div>
              <div className="text-gray-400 text-sm">레벨 소개</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">무료</div>
              <div className="text-gray-400 text-sm">완전 무료</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            왜 AI 첫걸음인가?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">핵심만 집중</h3>
              <p className="text-gray-600">
                불필요한 내용은 과감히 생략하고 핵심 개념만 깊이 있게 학습합니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">실습 중심</h3>
              <p className="text-gray-600">
                모든 개념을 코드로 직접 구현하며 체득합니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">직관적 이해</h3>
              <p className="text-gray-600">
                수학 공식보다 직관적인 이해를 먼저, 수식은 나중에 따라옵니다.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">완전 무료</h3>
              <p className="text-gray-600">
                양질의 교육 콘텐츠를 누구나 무료로 학습할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              학습 경로
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Level 0부터 Level 9까지, 체계적으로 설계된 커리큘럼을 따라가세요.
              <br />
              총 58개 레슨, 약 50시간의 학습 콘텐츠가 준비되어 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculum.slice(0, 6).map((level) => (
              <LevelCard key={level.id} level={level} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/curriculum"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              전체 커리큘럼 보기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10</div>
              <div className="text-gray-600">레벨</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">58</div>
              <div className="text-gray-600">레슨</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">학습 시간</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">무료</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 AI 학습을 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            &quot;행운은 준비가 기회를 만났을 때 생겨난다&quot;
          </p>
          <Link
            href="/level/0"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Level 0부터 시작하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
