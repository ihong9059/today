// 주식 관련 타입
export interface Stock {
  code: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  per: number;
  pbr: number;
  roe: number;
  dividendYield: number;
  sector: string;
  market: 'KOSPI' | 'KOSDAQ';
  isValueUp: boolean;
}

export interface StockRecommendation {
  stock: Stock;
  matchScore: number;
  targetPrice: number;
  reasons: string[];
  risks: string[];
  recommendationType: 'stable' | 'growth' | 'valueup' | 'dividend';
}

// 사용자 프로필 타입
export interface UserProfile {
  investmentAmount: number;
  investmentPeriod: 'short' | 'medium' | 'long';
  riskProfile: 'stable' | 'neutral' | 'aggressive';
  interestedSectors: string[];
}

// 교육 관련 타입
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  level: 'beginner' | 'intermediate' | 'advanced' | number;
  duration?: number;
  topics?: string[];
  order: number;
  quiz?: QuizQuestion;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningProgress {
  lessonId: string;
  completed: boolean;
  quizScore?: number;
  completedAt?: Date;
}

// 모의투자 관련 타입
export interface PaperTrade {
  id: string;
  stock: Stock;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalAmount: number;
  timestamp: Date;
}

export interface Holding {
  stock: Stock;
  quantity: number;
  avgPrice: number;
  currentValue: number;
  returnPercent: number;
}

export interface PaperPortfolio {
  cash: number;
  totalValue: number;
  holdings: Holding[];
  totalReturn: number;
  totalReturnPercent: number;
  trades: PaperTrade[];
}

// 용어 사전 타입
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
  category: string;
}

// 시장 데이터 타입
export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}
