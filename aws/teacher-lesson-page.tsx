'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Copy, ExternalLink, CheckCircle, Youtube, PartyPopper } from 'lucide-react';

// LessonData 인터페이스
interface LessonData {
  title: string;
  subtitle: string;
  youtubeKeyword: string;
  prompts: { id: number; title: string; prompt: string }[];
}

// === 초등교사 레슨 데이터 ===
ELEMENTARY_DATA_PLACEHOLDER

// === 중등교사 레슨 데이터 ===
MIDDLE_DATA_PLACEHOLDER

// === 고등교사 레슨 데이터 ===
HIGH_DATA_PLACEHOLDER

// AI 서비스 목록 - Claude 기본
const aiServices = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', color: 'bg-orange-500 hover:bg-orange-600', icon: '🧡' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
];

// 학교급별 정보
const levelInfo: Record<string, { title: string; icon: string; color: string; bgColor: string; textColor: string }> = {
  'elementary': { title: '초등교사 AI 활용 과정', icon: '🌱', color: 'from-green-500 to-emerald-600', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  'middle': { title: '중등교사 AI 활용 과정', icon: '📚', color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  'high': { title: '고등교사 AI 활용 과정', icon: '🎓', color: 'from-purple-500 to-pink-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
};

// 레슨 데이터 가져오기
const getLessonData = (level: string, day: number): LessonData => {
  const lessonMaps: Record<string, Record<number, LessonData>> = {
    'elementary': elementaryLessons,
    'middle': middleLessons,
    'high': highLessons,
  };

  const levelLessons = lessonMaps[level];
  if (levelLessons && levelLessons[day]) {
    return levelLessons[day];
  }

  // Fallback for any missing data
  const levelNames: Record<string, string> = { 'elementary': '초등', 'middle': '중등', 'high': '고등' };
  return {
    title: `Day ${day} 학습`,
    subtitle: `${levelNames[level] || ''} AI 활용 교육 ${day}일차 학습입니다.`,
    youtubeKeyword: `${levelNames[level]} AI 교육`,
    prompts: [
      { id: 1, title: '학습 내용', prompt: `[${levelNames[level]}교사 코스 Day ${day}] 오늘의 학습 주제에 대해 알려주세요.` }
    ],
  };
};

export default function TeacherLessonPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('선생님');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string>('claude');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentLevel = levelInfo[level];
  const lessonData = getLessonData(level, day);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료 상태 확인
    const savedProgress = localStorage.getItem(`teacher-${level}-progress`);
    if (savedProgress) {
      try {
        const completedDays = JSON.parse(savedProgress);
        setIsCompleted(completedDays.includes(day));
      } catch (e) {}
    }
  }, [level, day]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAIService = () => {
    const service = aiServices.find(s => s.id === selectedAI);
    if (service) {
      window.open(service.url, '_blank');
    }
  };

  const markAsComplete = () => {
    const savedProgress = localStorage.getItem(`teacher-${level}-progress`);
    let completedDays: number[] = [];

    if (savedProgress) {
      try {
        completedDays = JSON.parse(savedProgress);
      } catch (e) {}
    }

    if (!completedDays.includes(day)) {
      completedDays.push(day);
      localStorage.setItem(`teacher-${level}-progress`, JSON.stringify(completedDays));
      setIsCompleted(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const goToNextDay = () => {
    if (day < 30) {
      router.push(`/course/teacher/${level}/lesson/${day + 1}`);
    } else {
      router.push(`/course/teacher/${level}`);
    }
  };

  const goToPrevDay = () => {
    if (day > 1) {
      router.push(`/course/teacher/${level}/lesson/${day - 1}`);
    }
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 축하 애니메이션 */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-bounce">
            <div className="text-center">
              <PartyPopper className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">학습 완료! 🎉</h2>
              <p className="text-gray-600">Day {day} 학습을 완료했습니다!</p>
            </div>
          </div>
        </div>
      )}

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
          <Link href="/course/teacher" className="text-gray-500 hover:text-gray-700">교사/교육자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/teacher/${level}`} className="text-gray-500 hover:text-gray-700">{currentLevel.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentLevel.icon}</span>
              <div>
                <p className="text-white/70 text-sm">{currentLevel.title}</p>
                <h1 className="text-2xl font-bold">Day {day}: {lessonData.title}</h1>
              </div>
            </div>
            {isCompleted && (
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">완료</span>
              </div>
            )}
          </div>
          <p className="text-white/80">{lessonData.subtitle}</p>

          {/* 진행률 바 */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${(day / 30) * 100}%` }}
            />
          </div>
          <p className="text-white/70 text-sm mt-2">{day}/30일 진행중</p>
        </div>

        {/* AI 서비스 선택 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 AI 서비스 선택</h2>
          <p className="text-gray-600 text-sm mb-4">프롬프트를 복사한 후 사용할 AI 서비스를 선택하세요.</p>

          <div className="flex flex-wrap gap-3">
            {aiServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedAI(service.id)}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  selectedAI === service.id
                    ? `${service.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{service.icon}</span>
                {service.name}
              </button>
            ))}
          </div>

          <button
            onClick={openAIService}
            className={`mt-4 w-full py-3 bg-gradient-to-r ${currentLevel.color} text-white font-semibold rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2`}
          >
            <ExternalLink className="w-5 h-5" />
            {aiServices.find(s => s.id === selectedAI)?.name} 열기
          </button>
        </div>

        {/* 학습 안내 */}
        <div className={`${currentLevel.bgColor} rounded-xl p-4 mb-6`}>
          <h3 className={`font-semibold ${currentLevel.textColor} mb-2`}>📖 학습 방법</h3>
          <ol className="text-gray-700 text-sm space-y-1">
            <li>1. 아래 프롬프트를 순서대로 복사합니다.</li>
            <li>2. 위에서 선택한 AI 서비스에 붙여넣기 합니다.</li>
            <li>3. AI 응답을 읽고 학습합니다.</li>
            <li>4. 모든 프롬프트 실습 후 '학습 완료' 버튼을 클릭합니다.</li>
          </ol>
        </div>

        {/* 프롬프트 카드 */}
        <div className="space-y-6 mb-8">
          {lessonData.prompts.map((prompt, index) => (
            <div key={prompt.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`p-4 ${currentLevel.bgColor} border-b`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${currentLevel.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900">{prompt.title}</h3>
                  </div>
                  <button
                    onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                      copiedId === prompt.id
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-r ${currentLevel.color} text-white hover:opacity-90`
                    }`}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        복사됨!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        복사
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 rounded-lg p-4 overflow-x-auto">
                  {prompt.prompt}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* 유튜브 참고 영상 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Youtube className="w-6 h-6 text-red-500" />
            참고 영상
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            오늘 학습 주제와 관련된 유튜브 영상을 검색해보세요.
          </p>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(lessonData.youtubeKeyword)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Youtube className="w-5 h-5" />
            "{lessonData.youtubeKeyword}" 검색하기
          </a>
        </div>

        {/* 학습 완료 버튼 */}
        {!isCompleted && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">✅ 학습 완료</h2>
            <p className="text-gray-600 text-sm mb-4">
              모든 프롬프트를 실습하셨나요? 학습 완료 버튼을 눌러 진도를 저장하세요.
            </p>
            <button
              onClick={markAsComplete}
              className={`w-full py-4 bg-gradient-to-r ${currentLevel.color} text-white font-bold rounded-xl hover:opacity-90 transition text-lg`}
            >
              Day {day} 학습 완료! 🎉
            </button>
          </div>
        )}

        {/* 네비게이션 */}
        <div className="flex justify-between items-center">
          <button
            onClick={goToPrevDay}
            disabled={day <= 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              day <= 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            이전 Day
          </button>

          <Link
            href={`/course/teacher/${level}`}
            className="text-gray-600 hover:text-gray-900"
          >
            목록으로
          </Link>

          <button
            onClick={goToNextDay}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition bg-gradient-to-r ${currentLevel.color} text-white hover:opacity-90`}
          >
            {day < 30 ? '다음 Day' : '코스 완료'}
            <ChevronRight className="w-5 h-5" />
          </button>
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
