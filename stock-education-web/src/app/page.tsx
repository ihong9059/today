'use client';

import Link from 'next/link';
import {
  TrendingUp,
  BookOpen,
  Brain,
  PieChart,
  ArrowRight,
  Shield,
  Target,
  Users,
  Sparkles
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import MarketOverview from '@/components/stock/MarketOverview';
import RealtimeStockList from '@/components/stock/RealtimeStockList';

const features = [
  {
    icon: BookOpen,
    title: '체계적인 교육',
    description: '주식의 역사부터 최신 정책까지, 단계별로 쉽게 배우세요.',
    href: '/education',
    color: 'bg-blue-500',
  },
  {
    icon: Brain,
    title: 'AI 종목 추천',
    description: '투자 성향 분석 후 맞춤형 종목을 AI가 추천해드립니다.',
    href: '/recommend',
    color: 'bg-purple-500',
  },
  {
    icon: PieChart,
    title: '모의투자',
    description: '실제 돈 없이 1억원으로 투자를 연습해보세요.',
    href: '/paper-trading',
    color: 'bg-green-500',
  },
  {
    icon: Target,
    title: '용어사전',
    description: '어려운 주식 용어를 쉽게 찾아보고 이해하세요.',
    href: '/glossary',
    color: 'bg-orange-500',
  },
];

const benefits = [
  {
    icon: Shield,
    title: '리스크 관리',
    description: '초보자도 안전하게 투자할 수 있도록 리스크를 분석합니다.',
  },
  {
    icon: Sparkles,
    title: 'AI 기반 분석',
    description: '최신 AI 기술로 객관적인 투자 분석을 제공합니다.',
  },
  {
    icon: Users,
    title: '초보자 맞춤',
    description: '어려운 전문 용어 없이 쉽게 설명해드립니다.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              주식 초보자를 위한<br />
              <span className="text-blue-200">똑똑한 투자 시작</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              기초부터 실전까지, AI와 함께 체계적으로 배우고
              나에게 맞는 종목을 찾아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/education">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                  <BookOpen className="w-5 h-5 mr-2" />
                  무료로 시작하기
                </Button>
              </Link>
              <Link href="/recommend">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  <Brain className="w-5 h-5 mr-2" />
                  AI 추천 받기
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Market Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <MarketOverview />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            주식입문이 제공하는 서비스
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            초보자에게 필요한 모든 것을 한 곳에서 제공합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card hover className="h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>
                  <span className="text-blue-600 font-medium text-sm flex items-center">
                    자세히 보기 <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                왜 주식입문인가요?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                오늘의 추천 종목
              </h3>
              <RealtimeStockList
                codes={['005930', '000660', '105560']}
                limit={3}
                refreshInterval={60000}
              />
              <Link href="/recommend" className="block mt-4">
                <Button variant="outline" className="w-full">
                  더 많은 추천 보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            1억원 가상 자금으로 리스크 없이 투자를 연습하고,
            AI가 추천하는 종목으로 실전 감각을 키워보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/paper-trading">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                <PieChart className="w-5 h-5 mr-2" />
                모의투자 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">9+</div>
            <div className="text-gray-600">체계적인 교육 과정</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">용어사전 항목</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">AI</div>
            <div className="text-gray-600">맞춤형 종목 분석</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1억</div>
            <div className="text-gray-600">가상 투자금 제공</div>
          </div>
        </div>
      </section>
    </div>
  );
}
