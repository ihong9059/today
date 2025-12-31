'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  Video,
  CheckCircle,
  Circle,
  Calendar,
  Award,
} from 'lucide-react';

// 학교급별 코스 데이터 (30일 구조)
const levelData: Record<string, any> = {
  // ============================================
  // 초등교사 코스 (30일)
  // ============================================
  'elementary': {
    title: '초등교사 AI 활용 과정',
    subtitle: '초등학생 눈높이에 맞는 AI 활용 수업 설계 마스터',
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    liveInfo: {
      schedule: '매주 화요일 7PM | 초등 AI 수업 사례 공유',
    },
    announcement: {
      title: '30일 과정 전체 오픈!',
      description: '초등학생 맞춤형 AI 수업을 설계해보세요! 매일 15-30분 학습으로 AI 수업 전문가가 되세요! 🌱',
    },
    stages: [
      {
        id: 1,
        title: '1단계: AI 기초 마스터',
        subtitle: 'AI 도구 활용과 프롬프트 작성의 기초',
        icon: '🤖',
        days: [
          { day: 1, title: 'AI 시대의 초등교육 변화', description: '교육 패러다임 | AI 트렌드 | 교사 역할', completed: false },
          { day: 2, title: 'AI 도구 완전 정복', description: 'Claude | ChatGPT | Gemini 사용법', completed: false },
          { day: 3, title: '효과적인 프롬프트 작성', description: '프롬프트 구조 | 역할 부여 | 맥락 설정', completed: false },
          { day: 4, title: '교육용 프롬프트 실습', description: '수업 자료 | 평가 문항 | 활동 설계', completed: false },
          { day: 5, title: 'AI 윤리와 학생 지도', description: 'AI 윤리 | 저작권 | 안전한 사용', completed: false },
        ],
      },
      {
        id: 2,
        title: '2단계: 초등학생 발달 이해',
        subtitle: '초등학생 특성에 맞는 AI 교육 접근법',
        icon: '👧',
        days: [
          { day: 6, title: '초등학생 발달 특성', description: '인지 발달 | 정서 발달 | 학습 특성', completed: false },
          { day: 7, title: '학년별 AI 교육 전략', description: '저학년 | 중학년 | 고학년 맞춤', completed: false },
          { day: 8, title: '학습 동기와 AI', description: '내재적 동기 | 흥미 유발 | 성취감', completed: false },
          { day: 9, title: '초등학생 학습 스타일', description: '시각형 | 청각형 | 체험형 학습자', completed: false },
          { day: 10, title: '특수교육 대상 AI 지원', description: '개별화 교육 | AI 보조 도구 | 접근성', completed: false },
        ],
      },
      {
        id: 3,
        title: '3단계: 놀이 체험 AI 수업',
        subtitle: '게임과 놀이 기반 AI 활용 수업 설계',
        icon: '🎮',
        days: [
          { day: 11, title: '게이미피케이션과 AI', description: 'AI 퀴즈 | 보상 시스템 | 레벨 설계', completed: false },
          { day: 12, title: 'AI 이야기 만들기', description: '동화 창작 | 캐릭터 설정 | 스토리텔링', completed: false },
          { day: 13, title: 'AI 그림 활동', description: 'AI 그림책 | 삽화 만들기 | 전시 활동', completed: false },
          { day: 14, title: '탐구 놀이와 AI', description: '과학 탐구 | 조사 학습 | 발표 활동', completed: false },
          { day: 15, title: '협동 놀이 AI 활용', description: '모둠 활동 | 역할 놀이 | 협력 게임', completed: false },
        ],
      },
      {
        id: 4,
        title: '4단계: 교과별 AI 활용',
        subtitle: '각 교과에서 AI를 효과적으로 활용하는 방법',
        icon: '📖',
        days: [
          { day: 16, title: '국어과 AI 수업', description: '읽기 | 쓰기 | 말하기 AI 활용', completed: false },
          { day: 17, title: '수학과 AI 수업', description: '연산 | 문제해결 | 사고력 AI', completed: false },
          { day: 18, title: '사회과 AI 수업', description: '조사 학습 | 지역 탐구 | 역사 AI', completed: false },
          { day: 19, title: '과학과 AI 수업', description: '탐구 실험 | 관찰 기록 | 과학 글쓰기', completed: false },
          { day: 20, title: '예체능 AI 수업', description: '미술 | 음악 | 체육 AI 활용', completed: false },
          { day: 21, title: '영어과 AI 수업', description: '파닉스 | 회화 | 영어 동화', completed: false },
          { day: 22, title: '통합교과 AI 수업', description: '주제 중심 | 프로젝트 | 융합 활동', completed: false },
        ],
      },
      {
        id: 5,
        title: '5단계: 수업 설계와 평가',
        subtitle: 'AI 수업 지도안 작성과 학생 평가',
        icon: '📝',
        days: [
          { day: 23, title: 'AI 수업 지도안 작성', description: '학습 목표 | 활동 설계 | 시간 배분', completed: false },
          { day: 24, title: '수행평가 AI 설계', description: '평가 기준 | 루브릭 | 피드백', completed: false },
          { day: 25, title: '학생 관찰 기록', description: '관찰 기록 | 성장 평가 | AI 활용 기록', completed: false },
          { day: 26, title: '학부모 소통 전략', description: 'AI 교육 안내 | 가정 연계 | 상담', completed: false },
          { day: 27, title: '모의 수업 실습', description: '수업 시연 | 동료 피드백 | 개선점', completed: false },
        ],
      },
      {
        id: 6,
        title: '6단계: 포트폴리오 완성',
        subtitle: 'AI 활용 교육 역량 정리와 성찰',
        icon: '🏆',
        days: [
          { day: 28, title: '수업 사례 정리', description: '우수 사례 | 개선 사례 | 성장 기록', completed: false },
          { day: 29, title: '교사 성찰과 발전', description: '자기 성찰 | 역량 평가 | 발전 계획', completed: false },
          { day: 30, title: '포트폴리오 완성', description: '포트폴리오 정리 | 공유 | 수료', completed: false },
        ],
      },
    ],
  },

  // ============================================
  // 중등교사 코스 (30일)
  // ============================================
  'middle': {
    title: '중등교사 AI 활용 과정',
    subtitle: '중학생 진로탐색과 AI 융합 수업 전략 마스터',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    liveInfo: {
      schedule: '매주 수요일 7PM | 중등 AI 교육 세미나',
    },
    announcement: {
      title: '30일 과정 전체 오픈!',
      description: '자유학기제 AI 프로그램을 설계해보세요! 세특 작성과 진로 지도까지! 📚',
    },
    stages: [
      {
        id: 1,
        title: '1단계: AI 기초 마스터',
        subtitle: 'AI 도구 활용과 프롬프트 작성의 기초',
        icon: '🤖',
        days: [
          { day: 1, title: 'AI 시대의 중등교육 변화', description: '교육 패러다임 | AI 트렌드 | 교사 역할', completed: false },
          { day: 2, title: 'AI 도구 완전 정복', description: 'Claude | ChatGPT | Gemini 사용법', completed: false },
          { day: 3, title: '효과적인 프롬프트 작성', description: '프롬프트 구조 | 역할 부여 | 맥락 설정', completed: false },
          { day: 4, title: '교육용 프롬프트 실습', description: '수업 자료 | 평가 문항 | 활동 설계', completed: false },
          { day: 5, title: 'AI 윤리와 학생 지도', description: 'AI 윤리 | 저작권 | 안전한 사용', completed: false },
        ],
      },
      {
        id: 2,
        title: '2단계: 청소년 발달 이해',
        subtitle: '청소년 특성에 맞는 AI 교육 접근법',
        icon: '👦',
        days: [
          { day: 6, title: '청소년 발달 특성', description: '인지 발달 | 정서 발달 | 사회성 발달', completed: false },
          { day: 7, title: '중학생 학습 동기', description: '내재적 동기 | 자기결정성 | 성취 목표', completed: false },
          { day: 8, title: '또래 관계와 AI 학습', description: '협력 학습 | 또래 튜터링 | 모둠 활동', completed: false },
          { day: 9, title: '자기주도 학습과 AI', description: '학습 계획 | 시간 관리 | 자기 평가', completed: false },
          { day: 10, title: '학습 부진 학생 AI 지원', description: '개별화 지원 | 보충 학습 | 동기 부여', completed: false },
        ],
      },
      {
        id: 3,
        title: '3단계: 자유학기제/진로 AI',
        subtitle: '자유학기제와 진로 탐색에 AI 활용',
        icon: '🎯',
        days: [
          { day: 11, title: '자유학기제 AI 프로그램', description: '주제선택 | 예술체육 | 동아리 활동', completed: false },
          { day: 12, title: '진로 탐색 AI 활용', description: '적성 검사 | 직업 탐색 | 진로 로드맵', completed: false },
          { day: 13, title: '고교학점제 연계', description: '선택과목 | 진로 연계 | 학업 설계', completed: false },
          { day: 14, title: '체험 활동 AI 설계', description: '현장 체험 | 직업 인터뷰 | 진로 캠프', completed: false },
          { day: 15, title: '진로 포트폴리오 AI', description: '진로 기록 | 활동 정리 | 성장 기록', completed: false },
        ],
      },
      {
        id: 4,
        title: '4단계: 교과 융합 AI 수업',
        subtitle: '교과별 AI 활용과 융합 수업 설계',
        icon: '📖',
        days: [
          { day: 16, title: '국어과 AI 수업', description: '읽기 | 쓰기 | 토론 AI 활용', completed: false },
          { day: 17, title: '영어과 AI 수업', description: '독해 | 작문 | 회화 AI 활용', completed: false },
          { day: 18, title: '수학과 AI 수업', description: '개념 이해 | 문제 해결 | 탐구 활동', completed: false },
          { day: 19, title: '과학과 AI 수업', description: '탐구 실험 | 데이터 분석 | 과학 글쓰기', completed: false },
          { day: 20, title: '사회과 AI 수업', description: '역사 탐구 | 지리 분석 | 시사 토론', completed: false },
          { day: 21, title: '예체능 AI 수업', description: '미술 | 음악 | 체육 AI 활용', completed: false },
          { day: 22, title: '융합 프로젝트 수업', description: 'STEAM | 주제 중심 | 문제해결', completed: false },
        ],
      },
      {
        id: 5,
        title: '5단계: 수업 설계와 평가',
        subtitle: '세특 작성과 과정 중심 평가',
        icon: '📝',
        days: [
          { day: 23, title: 'AI 수업 지도안 작성', description: '성취기준 | 활동 설계 | 시간 배분', completed: false },
          { day: 24, title: '과정 중심 평가 설계', description: '수행평가 | 포트폴리오 | 피드백', completed: false },
          { day: 25, title: '세특/생기부 AI 작성', description: '세부능력특기사항 | 창체 기록 | AI 활용', completed: false },
          { day: 26, title: '진로 상담 AI 활용', description: '진로 상담 | 학부모 상담 | 기록 관리', completed: false },
          { day: 27, title: '모의 수업 실습', description: '수업 시연 | 동료 피드백 | 개선점', completed: false },
        ],
      },
      {
        id: 6,
        title: '6단계: 포트폴리오 완성',
        subtitle: 'AI 활용 교육 역량 정리와 성찰',
        icon: '🏆',
        days: [
          { day: 28, title: '수업 사례 정리', description: '우수 사례 | 개선 사례 | 성장 기록', completed: false },
          { day: 29, title: '교사 성찰과 발전', description: '자기 성찰 | 역량 평가 | 발전 계획', completed: false },
          { day: 30, title: '포트폴리오 완성', description: '포트폴리오 정리 | 공유 | 수료', completed: false },
        ],
      },
    ],
  },

  // ============================================
  // 고등교사 코스 (30일)
  // ============================================
  'high': {
    title: '고등교사 AI 활용 과정',
    subtitle: '고등학생 진로/진학 지도와 심화 AI 교육 마스터',
    icon: '🎓',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    liveInfo: {
      schedule: '매주 목요일 7PM | 고등 AI 진로진학 세미나',
    },
    announcement: {
      title: '30일 과정 전체 오픈!',
      description: '세특/생기부 AI 작성부터 진학 상담까지! 대입 연계 AI 지도 전략을 배워보세요! 🎓',
    },
    stages: [
      {
        id: 1,
        title: '1단계: AI 기초 마스터',
        subtitle: 'AI 도구 활용과 프롬프트 작성의 기초',
        icon: '🤖',
        days: [
          { day: 1, title: 'AI 시대의 고등교육 변화', description: '교육 패러다임 | 대입 변화 | 교사 역할', completed: false },
          { day: 2, title: 'AI 도구 완전 정복', description: 'Claude | ChatGPT | Gemini 사용법', completed: false },
          { day: 3, title: '효과적인 프롬프트 작성', description: '프롬프트 구조 | 역할 부여 | 맥락 설정', completed: false },
          { day: 4, title: '교육용 프롬프트 실습', description: '수업 자료 | 평가 문항 | 논술 지도', completed: false },
          { day: 5, title: 'AI 윤리와 학생 지도', description: 'AI 윤리 | 저작권 | 학생 AI 사용 지도', completed: false },
        ],
      },
      {
        id: 2,
        title: '2단계: 고등학생 특성 이해',
        subtitle: '고등학생 발달과 학습 전략',
        icon: '🧑‍🎓',
        days: [
          { day: 6, title: '고등학생 발달 특성', description: '인지 발달 | 정서 발달 | 진로 성숙', completed: false },
          { day: 7, title: '교과 심화 AI 수업', description: '심화 학습 | 탐구 보고서 | 논술', completed: false },
          { day: 8, title: '세특 작성법 기초', description: '세특 구조 | 작성 원리 | 좋은 세특', completed: false },
          { day: 9, title: '세특 AI 작성 실전', description: '교과별 세특 | AI 초안 | 수정 전략', completed: false },
          { day: 10, title: '수행평가와 AI', description: 'AI 시대 수행평가 | 채점 | 피드백', completed: false },
        ],
      },
      {
        id: 3,
        title: '3단계: 세특/생기부 AI 활용',
        subtitle: '학생부종합전형 대비 기록 전략',
        icon: '📋',
        days: [
          { day: 11, title: '학생부종합전형 이해', description: '학종 평가 요소 | 대학별 특성 | AI 분석', completed: false },
          { day: 12, title: '독서활동 AI 지도', description: '진로 연계 독서 | 독서 기록 | AI 활용', completed: false },
          { day: 13, title: '동아리/자율활동 AI 설계', description: '활동 설계 | 기록 작성 | 세특 연계', completed: false },
          { day: 14, title: '봉사/진로활동 AI 지도', description: '봉사 활동 | 진로 활동 | 기록 전략', completed: false },
          { day: 15, title: '생기부 최종 점검', description: '학생부 분석 | 일관성 | 관리 시스템', completed: false },
        ],
      },
      {
        id: 4,
        title: '4단계: 교과별 심화 AI 수업',
        subtitle: '고등학교 교과 심화 수업과 탐구 지도',
        icon: '📖',
        days: [
          { day: 16, title: '국어과 AI 수업', description: '문학 | 비문학 | 글쓰기 AI 활용', completed: false },
          { day: 17, title: '영어과 AI 수업', description: '독해 | 작문 | 말하기 AI 활용', completed: false },
          { day: 18, title: '수학과 AI 수업', description: '개념 | 문제해결 | 탐구 AI 활용', completed: false },
          { day: 19, title: '과학과 AI 수업 (물리/화학)', description: '탐구 실험 | 보고서 | 논술', completed: false },
          { day: 20, title: '과학과 AI 수업 (생명/지구)', description: '탐구 활동 | 에세이 | 과학 글쓰기', completed: false },
          { day: 21, title: '사회과 AI 수업', description: '탐구 | 토론 | 시사 이슈 AI', completed: false },
          { day: 22, title: '융합 프로젝트 AI 설계', description: 'R&E | 소논문 | 융합 탐구', completed: false },
        ],
      },
      {
        id: 5,
        title: '5단계: 진로진학 AI 상담',
        subtitle: '대입 전형 분석과 진학 지도',
        icon: '🎯',
        days: [
          { day: 23, title: '대학/학과 탐색 AI', description: '대학 정보 | 학과 분석 | 입시 요강', completed: false },
          { day: 24, title: '자기소개서 AI 지도', description: '소재 발굴 | 작성 지도 | 첨삭', completed: false },
          { day: 25, title: '면접 준비 AI 지도', description: '예상 질문 | 모의 면접 | 피드백', completed: false },
          { day: 26, title: '추천서/학생부 AI 작성', description: '추천서 작성 | 학생부 완성 | 전략', completed: false },
          { day: 27, title: '진학 상담 종합 실습', description: '상담 프로세스 | 학부모 상담 | 사례', completed: false },
        ],
      },
      {
        id: 6,
        title: '6단계: 포트폴리오 완성',
        subtitle: 'AI 활용 교육 역량 정리와 성찰',
        icon: '🏆',
        days: [
          { day: 28, title: 'AI 수업 지도안 작성', description: '교과별 지도안 | AI 활용 계획', completed: false },
          { day: 29, title: '수업 사례 정리', description: '우수 사례 | 개선 사례 | 공유', completed: false },
          { day: 30, title: '포트폴리오 완성', description: '역량 정리 | 성찰 | 발전 계획 | 수료', completed: false },
        ],
      },
    ],
  },
};

export default function TeacherLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;

  const [userName, setUserName] = useState('선생님');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const currentLevel = levelData[level];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료된 레슨 로드
    const savedProgress = localStorage.getItem(`teacher-${level}-progress`);
    if (savedProgress) {
      try {
        setCompletedDays(JSON.parse(savedProgress));
      } catch (e) {}
    }
  }, [level]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleStartLesson = (day: number) => {
    router.push(`/course/teacher/${level}/lesson/${day}`);
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 코스입니다</h1>
          <Link href="/course/teacher" className="text-blue-600 hover:underline">
            교사/교육자 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const totalDays = 30;
  const completedCount = completedDays.length;
  const progressPercentage = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">소개</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/teacher" className="text-gray-500 hover:text-gray-700">교사/교육자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{currentLevel.title}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{currentLevel.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{currentLevel.title}</h1>
              <p className="text-white/80">{currentLevel.subtitle}</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4 mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                학습 진행률
              </span>
              <span className="font-bold">{completedCount}/{totalDays}일 완료 ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 공지사항 */}
        <div className={`${currentLevel.bgColor} border rounded-xl p-4 mb-6`}>
          <h3 className={`font-semibold ${currentLevel.textColor} mb-1`}>{currentLevel.announcement.title}</h3>
          <p className="text-gray-700 text-sm">{currentLevel.announcement.description}</p>
        </div>

        {/* 라이브 일정 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Video className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">라이브 수업</h3>
            <p className="text-blue-700 text-sm">{currentLevel.liveInfo.schedule}</p>
          </div>
        </div>

        {/* 단계별 강좌 목록 */}
        <div className="space-y-6">
          {currentLevel.stages.map((stage: any) => (
            <div key={stage.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`p-4 ${currentLevel.bgColor} border-b`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{stage.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{stage.title}</h3>
                    <p className="text-sm text-gray-600">{stage.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {stage.days.map((lesson: any) => {
                  const isCompleted = completedDays.includes(lesson.day);
                  return (
                    <div
                      key={lesson.day}
                      className="p-4 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => handleStartLesson(lesson.day)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : `bg-gradient-to-br ${currentLevel.color} text-white`
                          }`}>
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : lesson.day}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              Day {lesson.day}: {lesson.title}
                            </h4>
                            <p className="text-sm text-gray-500">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                              완료
                            </span>
                          ) : (
                            <button className={`px-4 py-2 bg-gradient-to-r ${currentLevel.color} text-white text-sm rounded-lg hover:opacity-90 transition flex items-center gap-1`}>
                              <Play className="w-4 h-4" />
                              시작
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 뒤로 가기 */}
        <div className="mt-8">
          <Link
            href="/course/teacher"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>다른 학교급 선택하기</span>
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
