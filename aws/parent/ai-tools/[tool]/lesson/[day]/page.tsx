'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Play, CheckCircle, Video, FileText, HelpCircle, ExternalLink } from 'lucide-react';

// 도구별 레슨 데이터
const lessonData: Record<string, Record<number, any>> = {
  'claude': {
    1: { title: 'Claude 시작하기', description: 'Claude.ai 가입, 인터페이스, 첫 대화', videoUrl: '', objectives: ['Claude.ai 가입하기', '인터페이스 익히기', '첫 대화 나누기'], practiceUrl: 'https://claude.ai' },
    2: { title: 'Claude와 효과적인 대화', description: '좋은 프롬프트, 맥락 제공, 명확한 요청', videoUrl: '', objectives: ['좋은 프롬프트 작성', '맥락 제공하기', '명확한 요청법'], practiceUrl: 'https://claude.ai' },
    3: { title: 'Claude의 강점 활용', description: '긴 문서 분석, 코드 리뷰, 글쓰기 도우미', videoUrl: '', objectives: ['긴 문서 분석', '코드 리뷰 요청', '글쓰기 도움 받기'], practiceUrl: 'https://claude.ai' },
    4: { title: '일상에서 Claude 활용', description: '정보 검색, 학습 도우미, 아이디어 브레인스토밍', videoUrl: '', objectives: ['정보 요약 요청', '학습 도우미 활용', '아이디어 발상'], practiceUrl: 'https://claude.ai' },
    5: { title: '업무 생산성 향상', description: '이메일 작성, 보고서 초안, 회의 준비', videoUrl: '', objectives: ['이메일 작성 보조', '보고서 초안 작성', '회의 자료 준비'], practiceUrl: 'https://claude.ai' },
  },
  'gemini': {
    1: { title: 'Gemini 시작하기', description: 'Gemini 접속, Google 계정 연동, 첫 대화', videoUrl: '', objectives: ['Gemini 접속하기', 'Google 계정 연동', '첫 대화 나누기'], practiceUrl: 'https://gemini.google.com' },
    2: { title: 'Gemini와 효과적인 대화', description: '좋은 프롬프트, 이미지 활용, 맥락 유지', videoUrl: '', objectives: ['좋은 프롬프트 작성', '이미지 활용하기', '맥락 유지하기'], practiceUrl: 'https://gemini.google.com' },
    3: { title: 'Gemini의 강점 활용', description: 'Google 서비스 연동, 실시간 정보, 이미지 분석', videoUrl: '', objectives: ['Google 서비스 연동', '실시간 정보 활용', '이미지 분석'], practiceUrl: 'https://gemini.google.com' },
    4: { title: '일상에서 Gemini 활용', description: '여행 계획, 레시피 추천, 학습 도우미', videoUrl: '', objectives: ['여행 계획 세우기', '레시피 추천 받기', '학습 도움 받기'], practiceUrl: 'https://gemini.google.com' },
    5: { title: '업무 생산성 향상', description: 'Gmail 연동, 문서 작성, 프레젠테이션 준비', videoUrl: '', objectives: ['Gmail 연동 활용', '문서 작성 보조', '프레젠테이션 준비'], practiceUrl: 'https://gemini.google.com' },
  },
};

// 도구 정보
const toolInfo: Record<string, { title: string; icon: string; color: string; bgColor: string; textColor: string; officialUrl: string }> = {
  'claude': { title: 'Claude', icon: '🟣', color: 'from-purple-600 to-purple-700', bgColor: 'bg-purple-50', textColor: 'text-purple-600', officialUrl: 'https://claude.ai' },
  'gemini': { title: 'Gemini', icon: '🔵', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600', officialUrl: 'https://gemini.google.com' },
};

export default function AiToolsLessonPage() {
  const router = useRouter();
  const params = useParams();
  const tool = params.tool as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const lessonInfo = lessonData[tool]?.[day];
  const toolDetails = toolInfo[tool];

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

  if (!lessonInfo || !toolDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레슨입니다</h1>
          <Link href="/course/parent" className="text-blue-600 hover:underline">학부형 코스로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const maxDay = Object.keys(lessonData[tool]).length;
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < maxDay ? day + 1 : null;

  // 퀴즈 데이터 (샘플)
  const quizQuestions = [
    { question: `${lessonInfo.title}에 대한 핵심 내용은?`, options: ['정답 1', '정답 2', '정답 3', '정답 4'], correct: 0 },
    { question: `${toolDetails.title}을 활용한 실습 결과는?`, options: ['적용 방법 1', '적용 방법 2', '적용 방법 3', '적용 방법 4'], correct: 1 },
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
          <Link href={`/course/parent/ai-tools/${tool}`} className="text-gray-500 hover:text-gray-700">{toolDetails.title} 활용법</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 도구 선택 탭 */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 flex gap-2">
          <Link
            href={`/course/parent/ai-tools/claude/lesson/${day}`}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              tool === 'claude'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🟣 Claude
          </Link>
          <Link
            href={`/course/parent/ai-tools/gemini/lesson/${day}`}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              tool === 'gemini'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔵 Gemini
          </Link>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${toolDetails.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{toolDetails.icon}</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{toolDetails.title}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Day {day}: {lessonInfo.title}</h1>
          <p className="text-white/80">{lessonInfo.description}</p>
        </div>

        {/* 실습 링크 */}
        <div className={`${toolDetails.bgColor} border rounded-xl p-5 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-semibold ${toolDetails.textColor} mb-1`}>
                {toolDetails.icon} {toolDetails.title}에서 직접 실습하기
              </h3>
              <p className="text-gray-600 text-sm">강의를 보면서 {toolDetails.title}에서 직접 실습해보세요!</p>
            </div>
            <a
              href={lessonInfo.practiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${toolDetails.color} text-white rounded-lg font-medium hover:opacity-90 transition`}
            >
              <ExternalLink className="w-4 h-4" />
              {toolDetails.title} 열기
            </a>
          </div>
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
              <span className="text-gray-700">{toolDetails.title} Day {day} 강의 자료 (PDF)</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">다운로드</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">프롬프트 예시 모음</span>
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
            <Link href={`/course/parent/ai-tools/${tool}/lesson/${prevDay}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {prevDay}</span>
            </Link>
          ) : <div />}

          {nextDay ? (
            <Link href={`/course/parent/ai-tools/${tool}/lesson/${nextDay}`} className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${toolDetails.color} text-white rounded-lg hover:opacity-90 transition`}>
              <span>Day {nextDay}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/parent/ai-tools/${tool}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
