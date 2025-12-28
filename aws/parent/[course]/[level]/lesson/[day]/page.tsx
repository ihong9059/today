'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Play, CheckCircle, Lock, Video, FileText, HelpCircle } from 'lucide-react';

// 코스별 레슨 데이터
const lessonData: Record<string, Record<string, Record<number, any>>> = {
  'ai-understanding': {
    '초급': {
      1: { title: 'AI란 무엇인가?', description: '인공지능의 정의와 우리 일상 속 AI', videoUrl: '', objectives: ['AI의 기본 개념 이해', '머신러닝과 딥러닝의 차이점 알기', '일상 속 AI 사례 찾기'] },
      2: { title: 'AI의 역사와 발전', description: 'AI의 탄생부터 현재까지', videoUrl: '', objectives: ['AI 발전의 주요 이정표', '기술 발전의 흐름 이해', '미래 AI 전망'] },
      3: { title: 'AI가 할 수 있는 것들', description: '이미지 인식, 자연어 처리, 추천 시스템', videoUrl: '', objectives: ['AI의 주요 기능 이해', '각 기술의 활용 사례', 'AI의 한계 인식'] },
      4: { title: 'AI와 일상생활', description: '스마트홈, 자율주행, 개인비서', videoUrl: '', objectives: ['일상 속 AI 발견하기', '스마트 기기의 원리 이해', 'AI 활용의 편의성'] },
      5: { title: 'AI 시대 준비하기', description: 'AI 리터러시와 미래 직업', videoUrl: '', objectives: ['AI 리터러시의 중요성', '미래 직업 트렌드', '올바른 AI 활용 자세'] },
    },
    '중급': {
      1: { title: '머신러닝 기초', description: '학습 데이터, 모델 훈련, 예측', videoUrl: '', objectives: ['머신러닝 원리 이해', '학습 과정 이해', '예측의 개념'] },
      2: { title: '딥러닝과 신경망', description: '뉴런, 레이어, 역전파', videoUrl: '', objectives: ['신경망 구조 이해', '딥러닝 동작 원리', '학습 메커니즘'] },
      3: { title: 'AI 모델 평가하기', description: '정확도, 과적합, 검증', videoUrl: '', objectives: ['모델 성능 평가 방법', '과적합 이해', '검증 기법'] },
      4: { title: 'AI와 산업 혁신', description: '의료, 금융, 제조업', videoUrl: '', objectives: ['산업별 AI 활용', '혁신 사례', '적용 가능성'] },
      5: { title: 'AI 윤리와 사회적 영향', description: '편향성, 프라이버시, 일자리', videoUrl: '', objectives: ['AI 윤리 문제', '사회적 영향', '책임있는 AI'] },
    },
    '고급': {
      1: { title: '대규모 언어 모델 (LLM)', description: 'GPT, Claude, Gemini의 원리', videoUrl: '', objectives: ['LLM 아키텍처', '트랜스포머 이해', '각 모델 특징'] },
      2: { title: '생성형 AI의 세계', description: '이미지, 음악, 코드 생성', videoUrl: '', objectives: ['생성 AI 원리', '다양한 생성 모델', '활용 사례'] },
      3: { title: 'AGI와 AI의 미래', description: '범용 인공지능, 특이점, 예측', videoUrl: '', objectives: ['AGI 개념', '미래 시나리오', '준비 자세'] },
      4: { title: 'AI 기반 의사결정', description: '데이터 기반 판단, AI 조언 활용', videoUrl: '', objectives: ['의사결정 프레임워크', 'AI 활용 방법', '판단력 향상'] },
      5: { title: 'AI 시대 리더의 역할', description: '변화 관리, 팀 교육, 비전 수립', videoUrl: '', objectives: ['리더십 역할', '조직 변화 관리', '비전 제시'] },
    },
  },
  'ai-tools': {
    '초급': {
      1: { title: 'Claude 시작하기', description: 'Claude 가입, 인터페이스, 첫 대화', videoUrl: '', objectives: ['Claude 가입하기', '인터페이스 익히기', '첫 대화 나누기'] },
      2: { title: 'Gemini 시작하기', description: 'Gemini 접속, 구글 연동, 첫 대화', videoUrl: '', objectives: ['Gemini 접속하기', '구글 계정 연동', '기본 사용법 익히기'] },
      3: { title: '효과적인 질문법', description: '좋은 프롬프트, 구체적 요청, 맥락 제공', videoUrl: '', objectives: ['좋은 프롬프트 작성', '구체적인 요청법', '맥락 제공 방법'] },
      4: { title: '정보 검색과 요약', description: '뉴스 요약, 개념 설명, 비교 분석', videoUrl: '', objectives: ['정보 요약 요청', '개념 설명 받기', '비교 분석 활용'] },
      5: { title: '글쓰기 도우미', description: '이메일, 보고서 초안, 문장 다듬기', videoUrl: '', objectives: ['이메일 작성 보조', '보고서 초안 작성', '문장 교정 활용'] },
    },
    '중급': {
      1: { title: '문서 작성 자동화', description: '보고서, 제안서, 회의록', videoUrl: '', objectives: ['문서 템플릿 활용', '자동화 기법', '효율적 작성'] },
      2: { title: '데이터 분석 보조', description: '엑셀 수식, 데이터 해석, 차트 제안', videoUrl: '', objectives: ['엑셀 수식 도움', '데이터 해석 요청', '시각화 아이디어'] },
      3: { title: '번역과 다국어 소통', description: '문서 번역, 이메일 번역, 문화적 맥락', videoUrl: '', objectives: ['정확한 번역 요청', '문화적 뉘앙스', '비즈니스 번역'] },
      4: { title: '아이디어 브레인스토밍', description: '기획, 문제 해결, 대안 제시', videoUrl: '', objectives: ['아이디어 발상', '문제 해결 접근', '대안 도출'] },
      5: { title: '콘텐츠 제작 보조', description: '블로그, SNS, 마케팅 문구', videoUrl: '', objectives: ['콘텐츠 기획', 'SNS 글 작성', '마케팅 카피'] },
    },
    '고급': {
      1: { title: '고급 프롬프트 기법', description: '역할 부여, 단계별 사고, 제약조건', videoUrl: '', objectives: ['역할 기반 프롬프트', 'Chain of Thought', '제약조건 설정'] },
      2: { title: '멀티턴 대화 전략', description: '맥락 유지, 점진적 구체화, 피드백', videoUrl: '', objectives: ['대화 맥락 관리', '점진적 개선', '피드백 루프'] },
      3: { title: 'Claude vs Gemini 비교', description: '각 AI 강점, 적합한 용도, 조합 사용', videoUrl: '', objectives: ['AI별 강점 파악', '용도별 선택', '조합 활용'] },
      4: { title: '교육 분야 활용', description: '학습 자료, 퀴즈 생성, 개인화 학습', videoUrl: '', objectives: ['교육 자료 제작', '평가 도구 생성', '맞춤 학습'] },
      5: { title: 'AI 워크플로우 구축', description: '자동화 시나리오, 템플릿, 효율화', videoUrl: '', objectives: ['워크플로우 설계', '템플릿 제작', '업무 효율화'] },
    },
  },
  'career-exploration': {
    '초급': {
      1: { title: '진로란 무엇인가?', description: '진로의 정의, 진로 vs 직업', videoUrl: '', objectives: ['진로 개념 이해', '직업과의 차이', '진로 발달 단계'] },
      2: { title: 'AI로 직업 세계 탐험', description: 'AI 활용 직업 정보, 미래 직업', videoUrl: '', objectives: ['직업 정보 검색', '미래 직업 탐색', '새로운 직종 발견'] },
      3: { title: '자녀 성향 파악하기', description: '흥미 탐색, 적성 발견, 가치관', videoUrl: '', objectives: ['흥미 탐색법', '적성 발견 방법', '가치관 이해'] },
      4: { title: '진로 대화의 기술', description: '경청, 질문, 공감', videoUrl: '', objectives: ['경청하기', '질문하기', '공감하기'] },
      5: { title: 'AI와 진로 시뮬레이션', description: '직업 체험, 하루 일과, 역할극', videoUrl: '', objectives: ['직업 시뮬레이션', '하루 체험', 'AI 역할극'] },
    },
    '중급': {
      1: { title: '다중지능 이해하기', description: '8가지 지능, 강점 발견', videoUrl: '', objectives: ['다중지능 이론', '강점 파악', '학습 스타일'] },
      2: { title: '진로 성숙도 평가', description: '진로 인식, 탐색, 준비', videoUrl: '', objectives: ['성숙도 평가', '발달 단계', '개선 방향'] },
      3: { title: 'AI 기반 진로 매칭', description: '성향 분석, 직업 추천', videoUrl: '', objectives: ['AI 분석 활용', '매칭 이해', '적합도 평가'] },
      4: { title: '단기 목표 설정', description: '학년별 목표, 경험 계획', videoUrl: '', objectives: ['목표 설정법', '경험 계획', '역량 개발'] },
      5: { title: '장기 진로 로드맵', description: '진학 계획, 포트폴리오', videoUrl: '', objectives: ['로드맵 작성', '포트폴리오', '실천 전략'] },
    },
    '고급': {
      1: { title: '진로 코칭 기초', description: '코칭 마인드셋, 질문, 피드백', videoUrl: '', objectives: ['코칭 마인드', '질문 기법', '피드백 방법'] },
      2: { title: '동기부여 전략', description: '내재적 동기, 성취감, 실패 극복', videoUrl: '', objectives: ['동기부여 방법', '성취감 경험', '회복탄력성'] },
      3: { title: '진로 장벽 극복', description: '불안 해소, 갈등 해결', videoUrl: '', objectives: ['불안 해소법', '갈등 해결', '지지 시스템'] },
      4: { title: '전문 상담 활용', description: '진로상담사, 학교 상담', videoUrl: '', objectives: ['전문가 활용', '상담 기관', '연계 방법'] },
      5: { title: '멘토링 네트워크', description: '멘토 찾기, 현직자 연결', videoUrl: '', objectives: ['멘토 찾기', '네트워킹', '관계 유지'] },
    },
  },
  'mbti-career': {
    '초급': {
      1: { title: 'MBTI란 무엇인가?', description: '4가지 선호지표, 16가지 유형', videoUrl: '', objectives: ['MBTI 이해', '선호지표 학습', '16유형 파악'] },
      2: { title: '나의 MBTI 알아보기', description: 'MBTI 검사, 결과 해석', videoUrl: '', objectives: ['검사 진행', '결과 해석', '특성 이해'] },
      3: { title: '자녀의 MBTI 파악하기', description: '행동 관찰, 대화 패턴', videoUrl: '', objectives: ['행동 관찰법', '패턴 파악', '유형 추정'] },
      4: { title: 'MBTI 유형별 적합 직업', description: '16유형별 직업군', videoUrl: '', objectives: ['유형별 직업', '강점 활용', '적합도 이해'] },
      5: { title: 'AI로 MBTI 진로 상담', description: 'AI 진로 상담, 맞춤 추천', videoUrl: '', objectives: ['AI 상담 활용', '맞춤 추천', '심층 분석'] },
    },
    '중급': {
      1: { title: 'MBTI 인지기능', description: '8가지 인지기능, 주기능, 부기능', videoUrl: '', objectives: ['인지기능 이해', '기능 서열', '발달 순서'] },
      2: { title: 'MBTI 발달 단계', description: '연령별 발달, 성장 과정', videoUrl: '', objectives: ['발달 단계', '성장 과정', '균형 발달'] },
      3: { title: 'MBTI 스트레스 반응', description: '열등기능, 스트레스 패턴', videoUrl: '', objectives: ['스트레스 반응', '열등기능', '대처법'] },
      4: { title: '유형별 업무 스타일', description: '의사소통, 리더십, 팀워크', videoUrl: '', objectives: ['업무 스타일', '소통 방식', '협업 방법'] },
      5: { title: '직장 적응과 성장', description: '환경 적합성, 역량 개발', videoUrl: '', objectives: ['환경 적합성', '역량 개발', '커리어 패스'] },
    },
    '고급': {
      1: { title: 'MBTI 진로 상담 기법', description: '상담 프레임워크, 질문법', videoUrl: '', objectives: ['상담 기법', '질문법', '해석 방법'] },
      2: { title: '유형 간 이해와 소통', description: '부모-자녀 유형, 갈등 해소', videoUrl: '', objectives: ['유형 간 이해', '갈등 해소', '시너지 창출'] },
      3: { title: 'MBTI 기반 학습 지도', description: '학습 스타일, 동기부여', videoUrl: '', objectives: ['학습 스타일', '동기부여', '환경 설정'] },
      4: { title: 'MBTI 진로 포트폴리오', description: '강점 문서화, 어필 전략', videoUrl: '', objectives: ['포트폴리오 작성', '강점 정리', '어필 전략'] },
      5: { title: '종합 진로 설계', description: '통합 분석, 맞춤 로드맵', videoUrl: '', objectives: ['통합 분석', '로드맵 작성', '실행 계획'] },
    },
  },
  'future-jobs': {
    '초급': {
      1: { title: '일자리의 미래', description: '4차 산업혁명, 자동화', videoUrl: '', objectives: ['산업 변화', '자동화 영향', '새로운 일자리'] },
      2: { title: 'AI 관련 직종', description: 'AI 엔지니어, 데이터 사이언티스트', videoUrl: '', objectives: ['AI 직종 이해', '역할 파악', '요구 역량'] },
      3: { title: '그린 & 지속가능 직종', description: '친환경 에너지, ESG', videoUrl: '', objectives: ['그린 직종', 'ESG 이해', '미래 전망'] },
      4: { title: '헬스케어 & 바이오', description: '원격의료, 유전체 분석', videoUrl: '', objectives: ['헬스케어 혁신', '바이오 기술', '직업 기회'] },
      5: { title: '크리에이터 이코노미', description: '콘텐츠, 메타버스, NFT', videoUrl: '', objectives: ['크리에이터 경제', '메타버스 직업', 'NFT 활용'] },
    },
    '중급': {
      1: { title: '기술 분야 직업 분석', description: '개발자, 보안, 클라우드', videoUrl: '', objectives: ['기술 직종', '역량 요건', '진입 경로'] },
      2: { title: '비즈니스 분야 직업 분석', description: '성장해커, UX, PM', videoUrl: '', objectives: ['비즈니스 직종', '역할 이해', '필요 스킬'] },
      3: { title: '융합 분야 직업 분석', description: '에듀테크, 핀테크, 헬스테크', videoUrl: '', objectives: ['융합 분야', '기회 탐색', '트렌드 파악'] },
      4: { title: '필수 역량 개발', description: '디지털 리터러시, 창의성', videoUrl: '', objectives: ['핵심 역량', '개발 방법', '학습 자원'] },
      5: { title: '학습 로드맵', description: '온라인 코스, 자격증, 프로젝트', videoUrl: '', objectives: ['학습 경로', '자격증 정보', '경험 쌓기'] },
    },
    '고급': {
      1: { title: '산업 분석 방법', description: '트렌드 파악, 성장 산업', videoUrl: '', objectives: ['산업 분석', '트렌드 파악', '기회 포착'] },
      2: { title: '네트워킹 전략', description: '현직자 연결, 커뮤니티', videoUrl: '', objectives: ['네트워킹', '멘토 찾기', '커뮤니티 활용'] },
      3: { title: '포트폴리오 전략', description: '경험 쌓기, 브랜딩', videoUrl: '', objectives: ['포트폴리오', '경험 정리', '개인 브랜딩'] },
      4: { title: '자녀별 맞춤 로드맵', description: '성향 기반, 마일스톤', videoUrl: '', objectives: ['맞춤 설계', '마일스톤', '실행 계획'] },
      5: { title: '부모의 역할', description: '지원 방법, 리소스, 동반', videoUrl: '', objectives: ['부모 역할', '지원 방법', '장기 동반'] },
    },
  },
};

// 코스 정보
const courseInfo: Record<string, { title: string; icon: string; color: string }> = {
  'ai-understanding': { title: 'AI 시대 이해하기', icon: '🤖', color: 'from-blue-500 to-indigo-500' },
  'ai-tools': { title: 'AI 도구 활용법', icon: '💬', color: 'from-purple-500 to-pink-500' },
  'career-exploration': { title: '진로 탐색', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
  'mbti-career': { title: 'MBTI 직업', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
  'future-jobs': { title: '미래 직종', icon: '🚀', color: 'from-orange-500 to-red-500' },
};

export default function ParentLessonPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const lessonInfo = lessonData[course]?.[level]?.[day];
  const courseDetails = courseInfo[course];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!lessonInfo || !courseDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레슨입니다</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">강좌 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">수강 신청이 필요합니다</h2>
          <p className="text-gray-600 mb-6">이 강좌를 수강하려면 먼저 등록해주세요.</p>
          <Link href="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">강좌 목록 보기</Link>
        </div>
      </div>
    );
  }

  const maxDay = Object.keys(lessonData[course][level]).length;
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < maxDay ? day + 1 : null;

  // 퀴즈 데이터 (샘플)
  const quizQuestions = [
    { question: `${lessonInfo.title}에 대한 핵심 내용은?`, options: ['정답 1', '정답 2', '정답 3', '정답 4'], correct: 0 },
    { question: '이 강의에서 배운 내용을 실생활에 적용하려면?', options: ['적용 방법 1', '적용 방법 2', '적용 방법 3', '적용 방법 4'], correct: 1 },
  ];

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
  };

  const quizScore = Object.entries(quizAnswers).filter(([idx, ans]) => quizQuestions[parseInt(idx)]?.correct === ans).length;

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
          <Link href="/course/parent" className="text-gray-500 hover:text-gray-700">학부형 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/parent/${course}/${level}`} className="text-gray-500 hover:text-gray-700">{courseDetails.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${courseDetails.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{courseDetails.icon}</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{level}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Day {day}: {lessonInfo.title}</h1>
          <p className="text-white/80">{lessonInfo.description}</p>
        </div>

        {/* 학습 목표 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            학습 목표
          </h2>
          <ul className="space-y-2">
            {lessonInfo.objectives.map((obj: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">{idx + 1}</span>
                <span className="text-gray-700">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 영상 섹션 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-500" />
            강의 영상
          </h2>
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            {lessonInfo.videoUrl ? (
              <iframe width="100%" height="100%" src={lessonInfo.videoUrl} title={lessonInfo.title} frameBorder="0" allowFullScreen className="rounded-lg" />
            ) : (
              <div className="text-center text-gray-400">
                <Play className="w-16 h-16 mx-auto mb-2" />
                <p>영상 준비 중입니다</p>
              </div>
            )}
          </div>
        </div>

        {/* 학습 자료 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            학습 자료
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Day {day} 강의 자료 (PDF)</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">다운로드</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">실습 워크시트</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">다운로드</button>
            </div>
          </div>
        </div>

        {/* 퀴즈 섹션 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            학습 퀴즈
          </h2>

          {!showQuizResults ? (
            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900 mb-3">Q{qIdx + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => (
                      <label key={oIdx} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${quizAnswers[qIdx] === oIdx ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200'} border`}>
                        <input type="radio" name={`quiz-${qIdx}`} checked={quizAnswers[qIdx] === oIdx} onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })} className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < quizQuestions.length} className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                정답 확인하기
              </button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">{quizScore === quizQuestions.length ? '🎉' : '📚'}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{quizScore}/{quizQuestions.length} 정답!</h3>
              <p className="text-gray-600 mb-4">{quizScore === quizQuestions.length ? '완벽합니다! 다음 강의로 넘어가세요.' : '틀린 문제를 다시 확인해보세요.'}</p>
              <button onClick={() => { setShowQuizResults(false); setQuizAnswers({}); }} className="text-blue-600 hover:text-blue-700 font-medium">다시 풀기</button>
            </div>
          )}
        </div>

        {/* 이전/다음 네비게이션 */}
        <div className="flex justify-between items-center">
          {prevDay ? (
            <Link href={`/course/parent/${course}/${level}/lesson/${prevDay}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {prevDay}</span>
            </Link>
          ) : <div />}

          {nextDay ? (
            <Link href={`/course/parent/${course}/${level}/lesson/${nextDay}`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <span>Day {nextDay}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/parent/${course}/${level}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <span>코스로 돌아가기</span>
              <CheckCircle className="w-5 h-5" />
            </Link>
          )}
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
