'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, PlayCircle, ExternalLink, BookOpen } from 'lucide-react';
import { getLessonById, getNextLesson, getPrevLesson } from '@/data/curriculum';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ColabButton from '@/components/ColabButton';

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
            {/* Video Section - 클릭 시 새 탭에서 YouTube 재생 */}
            {lesson.videoUrl && (
              <a
                href={lesson.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-gray-900">
                  <img
                    src={`https://img.youtube.com/vi/${lesson.videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]}/maxresdefault.jpg`}
                    alt={`${lesson.title} 강의 영상`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all shadow-lg">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-semibold flex items-center">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        강의 영상 보기 (새 탭에서 재생)
                      </span>
                      <span className="text-sm text-gray-300 flex items-center">
                        YouTube
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {/* Colab Notebook Download - Level 3 이상에서만 표시 (PyTorch/GPU 필요) */}
            {lesson.content && level.id >= 3 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl shadow-sm p-5 border border-orange-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <span className="text-xl mr-2">📓</span>
                      Google Colab에서 실습하기
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      이 레슨은 PyTorch/GPU가 필요합니다. 노트북을 다운로드 후{' '}
                      <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Colab</a>에서 열어주세요.
                    </p>
                  </div>
                  <ColabButton
                    lessonTitle={lesson.title}
                    levelTitle={level.title}
                    lessonContent={lesson.content}
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
            {!lesson.content && !lesson.videoUrl && (
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

            {/* Colab Guide - Level 3 이상에서만 표시 */}
            {level.id >= 3 && (
              <div className="bg-orange-50 rounded-xl shadow-sm p-6 border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">💡</span>실습 환경 안내
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>이 레벨은 <strong>PyTorch/GPU</strong>가 필요하여 Google Colab 사용을 권장합니다.</p>
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <p className="text-xs text-gray-500">
                      Colab은 무료 GPU를 제공하여 PyTorch, CNN, Transformer 등을 실행할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pyodide Guide - Level 0~2에서만 표시 */}
            {level.id < 3 && (
              <div className="bg-green-50 rounded-xl shadow-sm p-6 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">💡</span>실습 환경 안내
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>코드 블록의 <strong>▶ 실행</strong> 버튼을 누르면 브라우저에서 바로 Python을 실행할 수 있습니다.</p>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-gray-500">
                      별도 설치 없이 NumPy, Matplotlib 등 기본 라이브러리를 사용할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
