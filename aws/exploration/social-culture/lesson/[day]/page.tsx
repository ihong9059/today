'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, BookOpen, Youtube, ExternalLink, ClipboardPaste } from 'lucide-react';

interface ConceptLink {
  title: string;
  keyword: string;
  description: string;
}

interface LessonData {
  title: string;
  desc: string;
  prompt: string;
  concepts: ConceptLink[];
  youtubeKeyword: string;
  funFact: string;
  challenge: string;
}

const lessonData: { [key: number]: LessonData } = {
  1: {
    title: '사회·문화 현상의 이해',
    desc: '자연 현상과 사회·문화 현상의 특성 비교 + 기능론/갈등론/상징적 상호작용론',
    prompt: `고등학교 사회문화 수능 준비 중입니다. "사회·문화 현상의 이해"에 대해 수능 기출 유형 중심으로 알려주세요.

## 1. 자연 현상 vs 사회·문화 현상 비교 (수능 1번 단골 유형)

다음 표를 완성해주세요:
| 구분 | 자연 현상 | 사회·문화 현상 |
|------|----------|---------------|
| 인과관계 | 필연성 (확실함) | 개연성 (확률적) |
| 가치 | 몰가치성 | 가치 함축성 |
| 법칙 | 보편성 | 보편성 + 특수성 공존 |
| 예측 | 정확한 예측 가능 | 예측 어려움 |

**수능 함정 주의:**
- "ㄱ은 자연현상, ㄴ과 ㄷ은 사회문화현상"일 때 "ㄴ은 ㄷ에 비해"라는 표현으로 낚시하는 문제 조심!

## 2. 기능론 vs 갈등론 vs 상징적 상호작용론 비교 (매년 출제)

각 관점에 대해 다음 내용을 정리해주세요:

**기능론:**
- 사회를 유기체에 비유
- 사회 각 부분이 상호 의존하며 전체 유지에 기여
- 사회 갈등은 균형 회복을 위한 일시적 과정
- 차등 보상의 순기능 강조
- 비판: 기존 체제 정당화, 변화 설명 어려움

**갈등론:**
- 지배집단과 피지배집단 간 이해관계 대립 강조
- 사회 불평등은 지배집단의 이익 유지 수단
- 귀속적 요인(가정 배경 등)이 불평등에 영향
- 비판: 사회 통합, 협력 설명 어려움

**상징적 상호작용론:**
- 미시적 관점 (개인 간 상호작용 중시)
- 행위자의 주관적 '상황 정의' 중시
- 개인의 능동적 해석과 의미 부여 강조
- 비판: 사회 구조의 영향력 간과

## 3. 수능 기출 유형 연습문제 5개

다음 형식으로 문제를 만들어주세요:
- 2024~2022학년도 수능/평가원 기출 스타일
- A, B, C가 각각 기능론, 갈등론, 상징적 상호작용론 중 하나인 문제
- "(가)에 들어갈 수 있는 것?"을 묻는 문제
- 정답과 오답 이유 상세 해설 포함

**예시 기출 유형:**
"(가)에는 '인간이 상황 정의에 기초하여 행동한다고 보는가?'가 들어갈 수 있다" → 상징적 상호작용론
"사회 갈등을 일시적 현상으로 보는가?" → 기능론
"지배 집단의 이익 관철 수단으로 사회 제도를 보는가?" → 갈등론

## 4. 핵심 암기 체크리스트

시험 직전 확인용:
□ 자연현상: 필연성, 몰가치성, 보편성
□ 사회문화현상: 개연성, 가치함축성, 보편성+특수성
□ 기능론: 합의, 균형, 유기체, 순기능
□ 갈등론: 대립, 지배-피지배, 귀속적 요인
□ 상징적 상호작용론: 미시적, 상황 정의, 능동성`,
    concepts: [
      { title: '자연현상 vs 사회문화현상', keyword: '사회문화 자연현상 사회문화현상 수능 기출', description: '수능 1번 단골! 필연성/개연성, 몰가치성/가치함축성 구분' },
      { title: '기능론 핵심정리', keyword: '사회문화 기능론 수능 정리', description: '거시적 관점, 사회=유기체, 합의와 균형, 차등보상 순기능' },
      { title: '갈등론 핵심정리', keyword: '사회문화 갈등론 수능 정리', description: '거시적 관점, 지배-피지배 대립, 귀속적 요인, 사회변동' },
      { title: '상징적 상호작용론', keyword: '상징적 상호작용론 수능 기출', description: '미시적 관점, 상황 정의, 주관적 의미 해석, 행위자 능동성' },
      { title: '3가지 관점 비교표', keyword: '기능론 갈등론 상징적상호작용론 비교', description: '수능 필수! 거시/미시, 사회관, 교육관, 불평등관 비교' }
    ],
    youtubeKeyword: '사회문화 기능론 갈등론 상징적상호작용론 수능 기출',
    funFact: '⚠️ 수능 함정: "ㄴ은 ㄷ에 비해"라는 표현이 나오면 ㄴ과 ㄷ이 같은 유형(둘 다 사회문화현상)인지 먼저 확인! 또한 상징적 상호작용론은 "미시적 관점"이고, 기능론과 갈등론은 "거시적 관점"입니다.',
    challenge: '🎯 기출 연습: "사회 갈등을 균형 회복의 일시적 과정으로 보는가?"에 해당하는 관점과, "행위자의 상황 정의를 중시하는가?"에 해당하는 관점을 각각 말해보세요!'
  }
};

// Day 2~45는 추후 추가 예정
for (let i = 2; i <= 45; i++) {
  lessonData[i] = {
    title: `Day ${i} 준비 중`,
    desc: '콘텐츠 준비 중입니다',
    prompt: '콘텐츠가 곧 업데이트됩니다.',
    concepts: [],
    youtubeKeyword: '사회문화 수능',
    funFact: '💡 콘텐츠 준비 중입니다.',
    challenge: '🎯 콘텐츠 준비 중입니다.'
  };
}

export default function SocialCultureLessonPage() {
  const params = useParams();
  const day = Number(params.day);
  const lesson = lessonData[day];

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showPasteArea, setShowPasteArea] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`exploration-social-culture-day${day}-completed`);
    if (saved === 'true') setCompleted(true);

    const savedResponse = localStorage.getItem(`exploration-social-culture-day${day}-response`);
    if (savedResponse) setAiResponse(savedResponse);
  }, [day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setAiResponse(text);
      localStorage.setItem(`exploration-social-culture-day${day}-response`, text);
    } catch {
      alert('클립보드에서 붙여넣기할 수 없습니다. 직접 입력해주세요.');
    }
  };

  const searchConcept = (keyword: string) => {
    window.open(`https://search.naver.com/search.naver?query=${encodeURIComponent(keyword)}`, '_blank');
  };

  const openYoutube = () => {
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`, '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`exploration-social-culture-day${day}-completed`, 'true');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '📚'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

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
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/exploration" className="hover:text-indigo-600">탐구영역</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/exploration/social-culture" className="hover:text-indigo-600">사회·문화</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-indigo-100">{lesson.desc}</p>
              </div>
            </div>
            {completed && (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">완료!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 학습 팁 */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 mb-1">학습 방법</p>
              <p className="text-amber-700 text-sm">1. AI 프롬프트를 복사해서 Claude나 ChatGPT에 질문하세요. 2. AI 답변을 아래 영역에 붙여넣어 저장하세요. 3. 핵심 개념 링크를 통해 추가 학습하세요.</p>
            </div>
          </div>
        </div>

        {/* AI 프롬프트 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              Step 1: AI에게 질문하기
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        {/* AI 응답 붙여넣기 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ClipboardPaste className="w-5 h-5 text-green-500" />
              Step 2: AI 응답 저장하기
            </h2>
            <button
              onClick={() => setShowPasteArea(!showPasteArea)}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              {showPasteArea ? '접기' : '펼치기'}
            </button>
          </div>

          {showPasteArea && (
            <>
              <textarea
                value={aiResponse}
                onChange={(e) => {
                  setAiResponse(e.target.value);
                  localStorage.setItem(`exploration-social-culture-day${day}-response`, e.target.value);
                }}
                placeholder="AI의 응답을 여기에 붙여넣으세요..."
                className="w-full h-64 p-4 border border-gray-200 rounded-xl text-sm font-mono resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handlePaste}
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                <ClipboardPaste className="w-5 h-5" />
                클립보드에서 붙여넣기
              </button>
            </>
          )}

          {aiResponse && !showPasteArea && (
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 max-h-32 overflow-hidden">
              <p className="line-clamp-3">{aiResponse.substring(0, 200)}...</p>
              <button onClick={() => setShowPasteArea(true)} className="text-indigo-600 hover:underline mt-2">
                전체 보기
              </button>
            </div>
          )}
        </div>

        {/* 핵심 개념 링크 */}
        {lesson.concepts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Step 3: 핵심 개념 상세 학습
            </h2>
            <div className="grid gap-3">
              {lesson.concepts.map((concept, index) => (
                <button
                  key={index}
                  onClick={() => searchConcept(concept.keyword)}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition text-left group"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-700">{concept.title}</h3>
                    <p className="text-sm text-gray-500">{concept.description}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* YouTube 링크 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-red-500" />
            Step 4: 영상으로 복습하기
          </h2>
          <button
            onClick={openYoutube}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl hover:from-red-100 hover:to-orange-100 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">YouTube에서 관련 강의 보기</h3>
                <p className="text-sm text-gray-500">"{lesson.youtubeKeyword}" 검색 결과</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
          </button>
        </div>

        {/* 수능 출제 포인트 & 오늘의 도전 */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-500" />
              수능 출제 포인트
            </h3>
            <p className="text-purple-700 text-sm">{lesson.funFact}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              오늘의 도전
            </h3>
            <p className="text-green-700 text-sm">{lesson.challenge}</p>
          </div>
        </div>

        {/* 학습 완료 버튼 */}
        {!completed && (
          <button onClick={markComplete} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        {/* 이전/다음 네비게이션 */}
        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/exploration/social-culture/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 45 ? (
            <Link href={`/course/exploration/social-culture/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/course/exploration/social-culture" className="flex items-center gap-2 text-indigo-600 font-medium">
              <span>코스 완료!</span>
              <Trophy className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
