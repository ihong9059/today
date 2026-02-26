'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import { lessons } from '@/data/education';
import { cn } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LessonPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const lesson = lessons.find(l => l.id === id);
  const lessonIndex = lessons.findIndex(l => l.id === id);
  const nextLesson = lessons[lessonIndex + 1];
  const prevLesson = lessons[lessonIndex - 1];

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">과정을 찾을 수 없습니다</h1>
            <Link href="/education">
              <Button>교육 센터로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const contentSections = lesson.content.split('\n\n').filter(s => s.trim());
  const progress = Math.round(((currentSection + 1) / contentSections.length) * 100);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (lesson.quiz) {
      setIsCorrect(answerIndex === lesson.quiz.correctAnswer);
    }
  };

  const handleNext = () => {
    if (currentSection < contentSections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else if (!showQuiz && lesson.quiz) {
      setShowQuiz(true);
    } else if (nextLesson) {
      router.push(`/education/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/education" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>교육 센터</span>
            </Link>
            <Badge variant={
              lesson.level === 'beginner' ? 'success' :
              lesson.level === 'intermediate' ? 'warning' : 'danger'
            }>
              {lesson.level === 'beginner' ? '입문' :
               lesson.level === 'intermediate' ? '중급' : '고급'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-4">
            <Progress value={showQuiz ? 100 : progress} className="flex-1 h-2" />
            <span className="text-sm text-gray-500">
              {showQuiz ? '퀴즈' : `${currentSection + 1}/${contentSections.length}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lesson.duration}분
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {contentSections.length}개 섹션
            </span>
          </div>
        </div>

        {/* Content or Quiz */}
        {!showQuiz ? (
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {contentSections[currentSection].split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : lesson.quiz && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">확인 퀴즈</span>
              </div>
              <CardTitle className="text-xl">{lesson.quiz.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lesson.quiz.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      'w-full p-4 rounded-lg border-2 text-left transition-all',
                      selectedAnswer === null
                        ? 'hover:border-blue-500 hover:bg-blue-50'
                        : selectedAnswer === idx
                          ? isCorrect
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : idx === lesson.quiz!.correctAnswer && selectedAnswer !== null
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 opacity-50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                        selectedAnswer === idx
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : idx === lesson.quiz!.correctAnswer && selectedAnswer !== null
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div className={cn(
                  'mt-6 p-4 rounded-lg',
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
                )}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    )}
                    <div>
                      <p className={cn(
                        'font-medium mb-1',
                        isCorrect ? 'text-green-700' : 'text-yellow-700'
                      )}>
                        {isCorrect ? '정답입니다!' : '아쉽네요, 다시 한번 복습해보세요.'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {lesson.quiz.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentSection === 0 && !showQuiz}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </Button>

          <Button onClick={handleNext}>
            {showQuiz && selectedAnswer !== null ? (
              nextLesson ? (
                <>다음 과정으로 <ChevronRight className="w-4 h-4 ml-1" /></>
              ) : (
                <>학습 완료 <CheckCircle className="w-4 h-4 ml-1" /></>
              )
            ) : currentSection < contentSections.length - 1 ? (
              <>다음 <ArrowRight className="w-4 h-4 ml-1" /></>
            ) : lesson.quiz ? (
              <>퀴즈 풀기 <HelpCircle className="w-4 h-4 ml-1" /></>
            ) : nextLesson ? (
              <>다음 과정으로 <ChevronRight className="w-4 h-4 ml-1" /></>
            ) : (
              <>학습 완료 <CheckCircle className="w-4 h-4 ml-1" /></>
            )}
          </Button>
        </div>

        {/* Related Topics */}
        {lesson.topics && lesson.topics.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">이 과정에서 배우는 내용</h3>
            <div className="flex flex-wrap gap-2">
              {lesson.topics.map((topic, idx) => (
                <Badge key={idx} variant="default" className="px-3 py-1">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Next Lesson Preview */}
        {nextLesson && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">다음 과정</h3>
            <Card hover>
              <CardContent className="p-4">
                <Link href={`/education/${nextLesson.id}`} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{nextLesson.title}</h4>
                      <p className="text-sm text-gray-500">{nextLesson.duration}분</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
