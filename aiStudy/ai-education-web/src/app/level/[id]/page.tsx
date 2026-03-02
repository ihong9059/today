import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock, PlayCircle, BookOpen } from 'lucide-react';
import { curriculum, getLevelById } from '@/data/curriculum';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return curriculum.map((level) => ({
    id: level.id.toString(),
  }));
}

export default async function LevelPage({ params }: PageProps) {
  const { id } = await params;
  const levelId = parseInt(id, 10);
  const level = getLevelById(levelId);

  if (!level) {
    notFound();
  }

  const prevLevel = levelId > 0 ? getLevelById(levelId - 1) : null;
  const nextLevel = levelId < 9 ? getLevelById(levelId + 1) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={`${level.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/curriculum"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            커리큘럼으로 돌아가기
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{level.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{level.title}</h1>
              <p className="text-xl text-white/90">{level.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 text-lg text-white/80 max-w-3xl">
            {level.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
              <BookOpen className="h-5 w-5" />
              <span>{level.lessons.length}개 레슨</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5" />
              <span>총 {level.totalTime}</span>
            </div>
          </div>
          {level.prerequisites.length > 0 && (
            <div className="mt-4">
              <span className="text-white/70">선수과목: </span>
              {level.prerequisites.map((prereq, idx) => (
                <span key={prereq}>
                  <Link href={`/level/${prereq.replace('Level ', '')}`} className="underline hover:text-white">
                    {prereq}
                  </Link>
                  {idx < level.prerequisites.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lessons List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">레슨 목록</h2>
        <div className="space-y-4">
          {level.lessons.map((lesson, index) => (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group"
            >
              <div className="flex items-center p-6">
                <div className={`w-12 h-12 ${level.color} text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4 group-hover:scale-110 transition-transform`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {lesson.description}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                  {lesson.videoUrl && (
                    <div className="flex items-center text-blue-500">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                  )}
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          {prevLevel ? (
            <Link
              href={`/level/${prevLevel.id}`}
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              {prevLevel.title}: {prevLevel.subtitle}
            </Link>
          ) : (
            <div />
          )}
          {nextLevel ? (
            <Link
              href={`/level/${nextLevel.id}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {nextLevel.title}: {nextLevel.subtitle}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
