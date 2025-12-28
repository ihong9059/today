'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Copy, ExternalLink, CheckCircle, Volume2 } from 'lucide-react';

// AI 서비스 목록
const aiServices = [
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
];

// 코스 정보
const courseInfo: Record<string, { title: string; icon: string; color: string }> = {
  'ai-understanding': { title: 'AI 시대 이해하기', icon: '🤖', color: 'from-blue-500 to-indigo-500' },
  'career-exploration': { title: '진로 탐색', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
  'mbti-career': { title: 'MBTI 직업', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
  'future-jobs': { title: '미래 직종', icon: '🚀', color: 'from-orange-500 to-red-500' },
};

// 레슨별 프롬프트 데이터
const lessonPrompts: Record<string, Record<number, { title: string; subtitle: string; prompts: { id: number; title: string; prompt: string }[] }>> = {
  'ai-understanding': {
    1: {
      title: 'AI란 무엇인가?',
      subtitle: '인공지능의 정의와 우리 일상 속 AI를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI의 기본 개념 이해하기',
          prompt: `인공지능(AI)에 대해 쉽게 설명해주세요.

다음 내용을 포함해서 설명해주세요:
1. AI(인공지능)란 무엇인가요?
2. AI는 어떻게 작동하나요? (간단히)
3. 머신러닝과 딥러닝의 차이는 무엇인가요?
4. AI가 사람과 다른 점은 무엇인가요?

초등학생도 이해할 수 있게 쉬운 비유와 예시를 들어서 설명해주세요.
답변을 읽어줄 때 자연스럽게 들리도록 대화체로 작성해주세요.`,
        },
        {
          id: 2,
          title: '일상 속 AI 찾아보기',
          prompt: `우리 일상생활에서 사용되는 AI 사례를 알려주세요.

다음 분야별로 3가지씩 예시를 들어주세요:
1. 스마트폰에서 사용하는 AI
2. 집에서 사용하는 AI (스마트홈)
3. 학교나 학습에서 사용하는 AI
4. 게임이나 엔터테인먼트의 AI

각 사례마다:
- 어떤 AI 기술이 사용되는지
- 우리에게 어떤 도움을 주는지
설명해주세요.

학부모가 자녀에게 설명해줄 수 있도록 쉽고 재미있게 작성해주세요.`,
        },
        {
          id: 3,
          title: 'AI의 장점과 주의할 점',
          prompt: `AI를 사용할 때 알아야 할 장점과 주의할 점을 알려주세요.

1. AI의 좋은 점 (5가지)
   - 각각 구체적인 예시와 함께

2. AI 사용 시 주의할 점 (5가지)
   - 왜 주의해야 하는지 이유와 함께

3. 자녀와 함께 AI를 올바르게 사용하는 방법
   - 부모가 할 수 있는 것
   - 자녀에게 알려줄 것

학부모 입장에서 자녀에게 AI 교육을 시킬 때 참고할 수 있도록 작성해주세요.`,
        },
      ],
    },
    2: {
      title: 'AI의 역사와 발전',
      subtitle: 'AI의 탄생부터 현재까지의 발전 과정을 알아봅니다.',
      prompts: [
        { id: 1, title: 'AI의 탄생과 역사', prompt: 'AI의 역사에 대해 알려주세요. 언제 처음 시작되었고, 어떻게 발전해왔는지 시대별로 정리해주세요.' },
      ],
    },
    3: {
      title: 'AI가 할 수 있는 것들',
      subtitle: '이미지 인식, 자연어 처리, 추천 시스템 등 AI의 능력을 알아봅니다.',
      prompts: [
        { id: 1, title: 'AI의 주요 기능', prompt: 'AI가 할 수 있는 주요 기능들을 설명해주세요. 이미지 인식, 음성 인식, 자연어 처리, 추천 시스템 등을 예시와 함께 알려주세요.' },
      ],
    },
    4: {
      title: 'AI와 일상생활',
      subtitle: '스마트홈, 자율주행, 개인비서 등 일상 속 AI를 살펴봅니다.',
      prompts: [
        { id: 1, title: '일상 속 AI 기술', prompt: '우리 일상에서 사용되는 AI 기술들을 분야별로 설명해주세요. 스마트홈, 자율주행, AI 비서 등의 예시를 들어주세요.' },
      ],
    },
    5: {
      title: 'AI 시대 준비하기',
      subtitle: 'AI 리터러시와 미래 역량을 알아봅니다.',
      prompts: [
        { id: 1, title: 'AI 시대 필요 역량', prompt: 'AI 시대를 살아가기 위해 필요한 역량과 준비 방법을 알려주세요. 자녀 교육 관점에서 부모가 할 수 있는 것들도 포함해주세요.' },
      ],
    },
  },
  'career-exploration': {
    1: { title: '진로란 무엇인가?', subtitle: '진로의 정의와 개념', prompts: [{ id: 1, title: '진로 개념 이해', prompt: '진로란 무엇인지, 직업과의 차이점은 무엇인지 설명해주세요.' }] },
    2: { title: 'AI로 직업 세계 탐험', subtitle: 'AI 활용 직업 정보', prompts: [{ id: 1, title: '직업 탐색', prompt: 'AI를 활용해서 다양한 직업을 탐색하는 방법을 알려주세요.' }] },
    3: { title: '자녀 성향 파악하기', subtitle: '흥미와 적성 발견', prompts: [{ id: 1, title: '성향 파악', prompt: '자녀의 흥미와 적성을 파악하는 방법을 알려주세요.' }] },
    4: { title: '진로 대화의 기술', subtitle: '경청과 공감', prompts: [{ id: 1, title: '진로 대화', prompt: '자녀와 진로에 대해 대화하는 효과적인 방법을 알려주세요.' }] },
    5: { title: 'AI와 함께 진로 시뮬레이션', subtitle: '직업 체험', prompts: [{ id: 1, title: '진로 시뮬레이션', prompt: 'AI를 활용해서 직업을 간접 체험하는 방법을 알려주세요.' }] },
  },
  'mbti-career': {
    1: { title: 'MBTI란 무엇인가?', subtitle: '16가지 성격유형', prompts: [{ id: 1, title: 'MBTI 이해', prompt: 'MBTI가 무엇인지, 4가지 선호지표와 16가지 유형에 대해 설명해주세요.' }] },
    2: { title: '나의 MBTI 알아보기', subtitle: 'MBTI 검사', prompts: [{ id: 1, title: 'MBTI 검사', prompt: 'MBTI 검사를 하고 결과를 해석하는 방법을 알려주세요.' }] },
    3: { title: '자녀의 MBTI 파악하기', subtitle: '행동 관찰', prompts: [{ id: 1, title: 'MBTI 파악', prompt: '자녀의 행동을 관찰해서 MBTI 유형을 추정하는 방법을 알려주세요.' }] },
    4: { title: 'MBTI 유형별 적합 직업', subtitle: '유형별 직업군', prompts: [{ id: 1, title: '유형별 직업', prompt: 'MBTI 유형별로 적합한 직업군을 알려주세요.' }] },
    5: { title: 'AI로 MBTI 진로 상담', subtitle: 'AI 상담 활용', prompts: [{ id: 1, title: 'AI 진로상담', prompt: 'AI를 활용해서 MBTI 기반 진로 상담을 받는 방법을 알려주세요.' }] },
  },
  'future-jobs': {
    1: { title: '일자리의 미래', subtitle: '4차 산업혁명', prompts: [{ id: 1, title: '미래 일자리', prompt: '4차 산업혁명 시대의 일자리 변화에 대해 설명해주세요.' }] },
    2: { title: 'AI 관련 직종', subtitle: 'AI 엔지니어', prompts: [{ id: 1, title: 'AI 직종', prompt: 'AI 관련 직종들과 필요한 역량에 대해 알려주세요.' }] },
    3: { title: '그린 & 지속가능 직종', subtitle: '친환경 에너지', prompts: [{ id: 1, title: '그린 직종', prompt: '친환경, 지속가능 분야의 유망 직종을 알려주세요.' }] },
    4: { title: '헬스케어 & 바이오', subtitle: '의료 혁신', prompts: [{ id: 1, title: '헬스케어 직종', prompt: '헬스케어, 바이오 분야의 미래 직종을 알려주세요.' }] },
    5: { title: '크리에이터 이코노미', subtitle: '콘텐츠 창작', prompts: [{ id: 1, title: '크리에이터', prompt: '크리에이터 이코노미와 관련 직업에 대해 알려주세요.' }] },
  },
};

export default function ParentLessonPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string>('gemini');
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(1);

  const lessonInfo = lessonPrompts[course]?.[day];
  const courseDetails = courseInfo[course];
  const selectedAIService = aiServices.find(ai => ai.id === selectedAI);

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

  const handleCopyPrompt = async (prompt: string, promptId: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handleOpenAI = () => {
    if (selectedAIService) {
      window.open(selectedAIService.url, '_blank');
    }
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

  const maxDay = Object.keys(lessonPrompts[course] || {}).length;
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < maxDay ? day + 1 : null;

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
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
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
          <p className="text-white/80">{lessonInfo.subtitle}</p>
        </div>

        {/* AI 선택 버튼 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">AI 선택</h2>
          <p className="text-gray-600 text-sm mb-4">
            사용할 AI를 선택하세요. 프롬프트를 복사한 후 AI에게 질문하면 답변을 받을 수 있습니다.
          </p>
          <div className="flex gap-3 mb-4">
            {aiServices.map((ai) => (
              <button
                key={ai.id}
                onClick={() => setSelectedAI(ai.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  selectedAI === ai.id
                    ? `${ai.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{ai.icon}</span>
                {ai.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleOpenAI}
            className={`w-full py-3 ${selectedAIService?.color} text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition`}
          >
            <ExternalLink className="w-5 h-5" />
            {selectedAIService?.name} 열기
          </button>
        </div>

        {/* 학습 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            학습 방법
          </h3>
          <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
            <li>아래 프롬프트에서 "복사하기" 버튼을 클릭하세요</li>
            <li>위의 "{selectedAIService?.name} 열기" 버튼을 눌러 AI 사이트로 이동하세요</li>
            <li>복사한 내용을 AI 입력창에 붙여넣고 전송하세요</li>
            <li>AI의 답변을 읽거나, 음성 읽기 기능을 사용하세요</li>
          </ol>
        </div>

        {/* 프롬프트 카드들 */}
        <div className="space-y-4">
          {lessonInfo.prompts.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 프롬프트 헤더 */}
              <button
                onClick={() => setExpandedPrompt(expandedPrompt === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{item.title}</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrompt === item.id ? 'rotate-90' : ''}`} />
              </button>

              {/* 프롬프트 내용 */}
              {expandedPrompt === item.id && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{item.prompt}</pre>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(item.prompt, item.id)}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      copiedPromptId === item.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {copiedPromptId === item.id ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        프롬프트 복사하기
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 이전/다음 네비게이션 */}
        <div className="flex justify-between items-center mt-8">
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
