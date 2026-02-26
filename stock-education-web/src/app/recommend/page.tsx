'use client';

import { useState } from 'react';
import {
  Brain,
  Target,
  Shield,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import RecommendationCard from '@/components/stock/RecommendationCard';
import { stockRecommendations } from '@/data/stocks';
import { cn } from '@/lib/utils';

type InvestmentType = 'stable' | 'growth' | 'valueup' | 'dividend';
type RiskLevel = 'low' | 'medium' | 'high';
type InvestmentTerm = 'short' | 'medium' | 'long';

interface SurveyAnswer {
  investmentType: InvestmentType | null;
  riskLevel: RiskLevel | null;
  investmentTerm: InvestmentTerm | null;
  investmentAmount: string | null;
}

const surveyQuestions = [
  {
    id: 'investmentType',
    question: '어떤 투자 스타일을 선호하시나요?',
    options: [
      { value: 'stable', label: '안정형', description: '안정적인 수익과 낮은 변동성', icon: Shield, color: 'bg-blue-500' },
      { value: 'growth', label: '성장형', description: '높은 성장 잠재력 추구', icon: TrendingUp, color: 'bg-green-500' },
      { value: 'valueup', label: '밸류업', description: '저평가된 가치주 투자', icon: Target, color: 'bg-purple-500' },
      { value: 'dividend', label: '배당형', description: '정기적인 배당 수익', icon: Sparkles, color: 'bg-orange-500' },
    ]
  },
  {
    id: 'riskLevel',
    question: '투자 리스크를 어느 정도 감수하실 수 있나요?',
    options: [
      { value: 'low', label: '낮음', description: '원금 보존이 가장 중요해요', icon: Shield, color: 'bg-blue-500' },
      { value: 'medium', label: '보통', description: '어느 정도 손실은 감수할 수 있어요', icon: Target, color: 'bg-yellow-500' },
      { value: 'high', label: '높음', description: '높은 수익을 위해 큰 리스크도 OK', icon: TrendingUp, color: 'bg-red-500' },
    ]
  },
  {
    id: 'investmentTerm',
    question: '투자 기간은 어느 정도로 생각하시나요?',
    options: [
      { value: 'short', label: '단기', description: '1년 이내', icon: Target, color: 'bg-orange-500' },
      { value: 'medium', label: '중기', description: '1~3년', icon: Target, color: 'bg-blue-500' },
      { value: 'long', label: '장기', description: '3년 이상', icon: Target, color: 'bg-green-500' },
    ]
  },
  {
    id: 'investmentAmount',
    question: '투자 예정 금액은 얼마인가요?',
    options: [
      { value: '100', label: '100만원 미만', description: '소액으로 시작', icon: Target, color: 'bg-gray-500' },
      { value: '500', label: '100~500만원', description: '적당한 규모', icon: Target, color: 'bg-blue-500' },
      { value: '1000', label: '500~1000만원', description: '본격적인 투자', icon: Target, color: 'bg-purple-500' },
      { value: '5000', label: '1000만원 이상', description: '적극적인 투자', icon: Target, color: 'bg-green-500' },
    ]
  }
];

export default function RecommendPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<SurveyAnswer>({
    investmentType: null,
    riskLevel: null,
    investmentTerm: null,
    investmentAmount: null
  });

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    if (currentStep < surveyQuestions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowResults(false);
    setAnswers({
      investmentType: null,
      riskLevel: null,
      investmentTerm: null,
      investmentAmount: null
    });
  };

  const progress = ((currentStep + 1) / surveyQuestions.length) * 100;
  const isCurrentAnswered = answers[surveyQuestions[currentStep]?.id as keyof SurveyAnswer] !== null;
  const allAnswered = Object.values(answers).every(v => v !== null);

  // Filter recommendations based on answers
  const filteredRecommendations = stockRecommendations.filter(rec => {
    if (answers.investmentType && rec.recommendationType !== answers.investmentType) {
      return false;
    }
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Results Header */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI 맞춤 종목 추천</h1>
            <p className="text-purple-100 max-w-2xl mx-auto">
              {answers.investmentType === 'stable' && '안정적인 수익을 추구하는 당신을 위한 종목입니다.'}
              {answers.investmentType === 'growth' && '높은 성장 잠재력을 가진 종목들을 추천합니다.'}
              {answers.investmentType === 'valueup' && '저평가된 가치주를 선별했습니다.'}
              {answers.investmentType === 'dividend' && '꾸준한 배당 수익을 기대할 수 있는 종목입니다.'}
            </p>
          </div>
        </section>

        {/* Warning Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>투자 유의사항:</strong> 본 추천은 AI 분석 기반의 참고 정보이며, 투자 결정의 최종 책임은 본인에게 있습니다.
                  실제 투자 전 충분한 분석과 검토를 권장합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Profile Summary */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">내 투자 프로필</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">투자 스타일</p>
                  <p className="font-semibold text-gray-900">
                    {answers.investmentType === 'stable' && '안정형'}
                    {answers.investmentType === 'growth' && '성장형'}
                    {answers.investmentType === 'valueup' && '밸류업'}
                    {answers.investmentType === 'dividend' && '배당형'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">리스크 허용</p>
                  <p className="font-semibold text-gray-900">
                    {answers.riskLevel === 'low' && '낮음'}
                    {answers.riskLevel === 'medium' && '보통'}
                    {answers.riskLevel === 'high' && '높음'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">투자 기간</p>
                  <p className="font-semibold text-gray-900">
                    {answers.investmentTerm === 'short' && '단기'}
                    {answers.investmentTerm === 'medium' && '중기'}
                    {answers.investmentTerm === 'long' && '장기'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">투자 금액</p>
                  <p className="font-semibold text-gray-900">
                    {answers.investmentAmount === '100' && '100만원 미만'}
                    {answers.investmentAmount === '500' && '100~500만원'}
                    {answers.investmentAmount === '1000' && '500~1000만원'}
                    {answers.investmentAmount === '5000' && '1000만원 이상'}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={handleRestart}>
                  다시 분석하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommendations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            추천 종목 <span className="text-blue-600">{filteredRecommendations.length}개</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((rec, idx) => (
              <RecommendationCard
                key={rec.stock.code}
                recommendation={rec}
                rank={idx + 1}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  const currentQuestion = surveyQuestions[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI 종목 추천</h1>
          <p className="text-purple-100 max-w-2xl mx-auto">
            몇 가지 질문에 답하시면 AI가 당신에게 맞는 종목을 추천해드립니다.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4 mb-2">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {currentStep + 1} / {surveyQuestions.length}
          </span>
        </div>
      </div>

      {/* Survey Question */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
            <CardDescription>가장 적합한 답변을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                const isSelected = answers[currentQuestion.id as keyof SurveyAnswer] === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 transition-all text-left',
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-12 h-12 rounded-lg flex items-center justify-center',
                        isSelected ? 'bg-blue-500' : option.color
                      )}>
                        {isSelected ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.description}</div>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                이전
              </Button>

              {currentStep === surveyQuestions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  추천 받기
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!isCurrentAnswered}
                >
                  다음
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {surveyQuestions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                idx === currentStep
                  ? 'bg-blue-600 w-6'
                  : answers[surveyQuestions[idx].id as keyof SurveyAnswer]
                    ? 'bg-blue-300'
                    : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
