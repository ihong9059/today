'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, PlayCircle, ExternalLink, BookOpen } from 'lucide-react';
import { getLessonById, getNextLesson, getPrevLesson } from '@/data/curriculum';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.id as string;

  const result = getLessonById(lessonId);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레슨을 찾을 수 없습니다</h1>
          <Link href="/curriculum" className="text-blue-600 hover:underline">
            커리큘럼으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const { level, lesson } = result;
  const prevLesson = getPrevLesson(lessonId);
  const nextLesson = getNextLesson(lessonId);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = lesson.videoUrl ? getYouTubeEmbedUrl(lesson.videoUrl) : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={`${level.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/level/${level.id}`}
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {level.title}: {level.subtitle}
          </Link>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{level.icon}</span>
            <div>
              <p className="text-white/80 text-sm">{level.title}</p>
              <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
            </div>
          </div>
          <p className="mt-3 text-white/90">{lesson.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center text-white/80">
              <Clock className="h-4 w-4 mr-1" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            {embedUrl && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <PlayCircle className="h-5 w-5 mr-2 text-red-500" />
                    강의 영상
                  </h2>
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center"
                  >
                    YouTube에서 보기
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    title={lesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Lesson Content */}
            {lesson.content && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    학습 내용
                  </h2>
                </div>
                <div className="p-6">
                  <MarkdownRenderer content={lesson.content} />
                </div>
              </div>
            )}

            {/* Placeholder for lessons without content */}
            {!lesson.content && !embedUrl && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  콘텐츠 준비 중
                </h3>
                <p className="text-gray-600">
                  이 레슨의 상세 콘텐츠는 현재 준비 중입니다.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lesson Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">레슨 정보</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">레벨</dt>
                  <dd className="font-medium">{level.title}: {level.subtitle}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">예상 소요 시간</dt>
                  <dd className="font-medium">{lesson.duration}</dd>
                </div>
                {lesson.videoUrl && (
                  <div>
                    <dt className="text-sm text-gray-500">참고 영상</dt>
                    <dd>
                      <a
                        href={lesson.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center"
                      >
                        YouTube 링크
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">이 레벨의 다른 레슨</h3>
              <ul className="space-y-2">
                {level.lessons.map((l, idx) => (
                  <li key={l.id}>
                    <Link
                      href={`/lesson/${l.id}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        l.id === lessonId
                          ? `${level.color} text-white`
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {idx + 1}. {l.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between">
          {prevLesson ? (
            <Link
              href={`/lesson/${prevLesson.lesson.id}`}
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <div className="text-left">
                <div className="text-xs text-gray-500">이전 레슨</div>
                <div>{prevLesson.lesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/lesson/${nextLesson.lesson.id}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-blue-200">다음 레슨</div>
                <div>{nextLesson.lesson.title}</div>
              </div>
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          ) : (
            <Link
              href="/curriculum"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              커리큘럼 완료!
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
