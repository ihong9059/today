'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Play, CheckCircle, Video, FileText, HelpCircle } from 'lucide-react';

// 코스별 레슨 데이터
const lessonData: Record<string, Record<number, any>> = {
  'ai-understanding': {
    1: { title: 'AI란 무엇인가?', description: '인공지능의 정의와 우리 일상 속 AI', videoUrl: '', objectives: ['AI의 기본 개념 이해', '머신러닝과 딥러닝의 차이점 알기', '일상 속 AI 사례 찾기'] },
    2: { title: 'AI의 역사와 발전', description: 'AI의 탄생부터 현재까지', videoUrl: '', objectives: ['AI 발전의 주요 이정표', '기술 발전의 흐름 이해', '미래 AI 전망'] },
    3: { title: 'AI가 할 수 있는 것들', description: '이미지 인식, 자연어 처리, 추천 시스템', videoUrl: '', objectives: ['AI의 주요 기능 이해', '각 기술의 활용 사례', 'AI의 한계 인식'] },
    4: { title: 'AI와 일상생활', description: '스마트홈, 자율주행, 개인비서', videoUrl: '', objectives: ['일상 속 AI 발견하기', '스마트 기기의 원리 이해', 'AI 활용의 편의성'] },
    5: { title: 'AI 시대 준비하기', description: 'AI 리터러시와 미래 직업', videoUrl: '', objectives: ['AI 리터러시의 중요성', '미래 직업 트렌드', '올바른 AI 활용 자세'] },
  },
  'career-exploration': {
    1: { title: '진로란 무엇인가?', description: '진로의 정의, 진로 vs 직업', videoUrl: '', objectives: ['진로 개념 이해', '직업과의 차이', '진로 발달 단계'] },
    2: { title: 'AI로 직업 세계 탐험', description: 'AI 활용 직업 정보, 미래 직업', videoUrl: '', objectives: ['직업 정보 검색', '미래 직업 탐색', '새로운 직종 발견'] },
    3: { title: '자녀 성향 파악하기', description: '흥미 탐색, 적성 발견, 가치관', videoUrl: '', objectives: ['흥미 탐색법', '적성 발견 방법', '가치관 이해'] },
    4: { title: '진로 대화의 기술', description: '경청, 질문, 공감', videoUrl: '', objectives: ['경청하기', '질문하기', '공감하기'] },
    5: { title: 'AI와 함께 진로 시뮬레이션', description: '직업 체험, 하루 일과, 역할극', videoUrl: '', objectives: ['직업 시뮬레이션', '하루 체험', 'AI 역할극'] },
  },
  'mbti-career': {
    1: { title: 'MBTI란 무엇인가?', description: '4가지 선호지표, 16가지 유형', videoUrl: '', objectives: ['MBTI 이해', '선호지표 학습', '16유형 파악'] },
    2: { title: '나의 MBTI 알아보기', description: 'MBTI 검사, 결과 해석', videoUrl: '', objectives: ['검사 진행', '결과 해석', '특성 이해'] },
    3: { title: '자녀의 MBTI 파악하기', description: '행동 관찰, 대화 패턴', videoUrl: '', objectives: ['행동 관찰법', '패턴 파악', '유형 추정'] },
    4: { title: 'MBTI 유형별 적합 직업', description: '16유형별 직업군', videoUrl: '', objectives: ['유형별 직업', '강점 활용', '적합도 이해'] },
    5: { title: 'AI로 MBTI 진로 상담', description: 'AI 진로 상담, 맞춤 추천', videoUrl: '', objectives: ['AI 상담 활용', '맞춤 추천', '심층 분석'] },
  },
  'future-jobs': {
    1: { title: '일자리의 미래', description: '4차 산업혁명, 자동화', videoUrl: '', objectives: ['산업 변화', '자동화 영향', '새로운 일자리'] },
    2: { title: 'AI 관련 직종', description: 'AI 엔지니어, 데이터 사이언티스트', videoUrl: '', objectives: ['AI 직종 이해', '역할 파악', '요구 역량'] },
    3: { title: '그린 & 지속가능 직종', description: '친환경 에너지, ESG', videoUrl: '', objectives: ['그린 직종', 'ESG 이해', '미래 전망'] },
    4: { title: '헬스케어 & 바이오', description: '원격의료, 유전체 분석', videoUrl: '', objectives: ['헬스케어 혁신', '바이오 기술', '직업 기회'] },
    5: { title: '크리에이터 이코노미', description: '콘텐츠, 메타버스, NFT', videoUrl: '', objectives: ['크리에이터 경제', '메타버스 직업', 'NFT 활용'] },
  },
};

// 코스 정보
const courseInfo: Record<string, { title: string; icon: string; color: string }> = {
  'ai-understanding': { title: 'AI 시대 이해하기', icon: '🤖', color: 'from-blue-500 to-indigo-500' },
  'career-exploration': { title: '진로 탐색', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
  'mbti-career': { title: 'MBTI 직업', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
  'future-jobs': { title: '미래 직종', icon: '🚀', color: 'from-orange-500 to-red-500' },
};

export default function ParentLessonPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const lessonInfo = lessonData[course]?.[day];
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
          <Link href="/course/parent" className="text-blue-600 hover:underline">학부형 코스로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const maxDay = Object.keys(lessonData[course]).length;
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
        <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/parent" className="text-gray-500 hover:text-gray-700">학부형 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/parent/${course}`} className="text-gray-500 hover:text-gray-700">{courseDetails.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${courseDetails.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{courseDetails.icon}</span>
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
            <Link href={`/course/parent/${course}/lesson/${prevDay}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {prevDay}</span>
            </Link>
          ) : <div />}

          {nextDay ? (
            <Link href={`/course/parent/${course}/lesson/${nextDay}`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <span>Day {nextDay}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/parent/${course}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
