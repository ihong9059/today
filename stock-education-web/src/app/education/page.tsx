'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Clock,
  CheckCircle,
  Lock,
  ChevronRight,
  Trophy,
  Star,
  ArrowRight
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import { lessons, levels } from '@/data/education';
import { cn } from '@/lib/utils';

export default function EducationPage() {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const filteredLessons = lessons.filter(lesson => lesson.level === selectedLevel);
  const completedLessons = 0; // This would come from user state
  const totalLessons = lessons.length;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              교육 센터
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              주식의 역사부터 최신 정책까지, 체계적인 교육 과정으로 투자 실력을 키워보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">학습 진행률</h2>
                    <p className="text-sm text-gray-500">전체 {totalLessons}개 과정 중 {completedLessons}개 완료</p>
                  </div>
                </div>
                <Progress value={overallProgress} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">
                  {overallProgress === 0
                    ? '첫 번째 과정을 시작해보세요!'
                    : `${overallProgress}% 완료 - 계속 진행해보세요!`}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center bg-blue-50 rounded-xl p-4">
                <div className="text-4xl font-bold text-blue-600 mb-1">{completedLessons}</div>
                <div className="text-sm text-gray-600">완료한 과정</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Level Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id as 'beginner' | 'intermediate' | 'advanced')}
              className={cn(
                'flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all',
                selectedLevel === level.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                level.color
              )}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{level.name}</div>
                <div className="text-sm text-gray-500">{level.description}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => {
            const isCompleted = false; // Would come from user state
            const isLocked = index > 0 && !isCompleted; // Simple lock logic

            return (
              <Card
                key={lesson.id}
                className={cn(
                  'overflow-hidden transition-all',
                  isLocked ? 'opacity-70' : 'hover:shadow-lg'
                )}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-white" />
                        ) : (
                          <BookOpen className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <Badge variant={
                          lesson.level === 'beginner' ? 'success' :
                          lesson.level === 'intermediate' ? 'warning' : 'danger'
                        }>
                          {lesson.level === 'beginner' ? '입문' :
                           lesson.level === 'intermediate' ? '중급' : '고급'}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}분
                    </span>
                  </div>
                  <CardTitle className="mt-3">{lesson.title}</CardTitle>
                  <CardDescription>{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lesson.topics && lesson.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.slice(0, 3).map((topic, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                        {lesson.topics.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{lesson.topics.length - 3}개 더
                          </span>
                        )}
                      </div>
                    )}

                    <Link href={`/education/${lesson.id}`}>
                      <Button
                        className="w-full"
                        variant={isLocked ? 'outline' : 'primary'}
                        disabled={isLocked}
                      >
                        {isCompleted ? (
                          <>복습하기</>
                        ) : isLocked ? (
                          <>이전 과정을 완료하세요</>
                        ) : (
                          <>학습 시작 <ChevronRight className="w-4 h-4 ml-1" /></>
                        )}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                학습을 마치셨나요?
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                이제 AI가 분석한 맞춤 종목 추천을 받아보거나,
                모의투자로 실전 연습을 시작해보세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/recommend">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    AI 종목 추천 받기
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/paper-trading">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    모의투자 시작하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
