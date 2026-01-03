'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'hm-practical',
    name: '실기',
    icon: '🧪',
    color: 'from-purple-500 to-pink-500',
  };

  const topics: Topic[] = [
    {
      id: 'facility-standards',
      title: '제조소등의 시설기준',
      description: '위치·구조·설비 기준',
      icon: '🏭',
      questions: [
        {
          id: 'fs-1',
          question: '옥내저장소의 바닥면적 기준은?',
          options: ['50㎡ 이하', '100㎡ 이하', '150㎡ 이하', '200㎡ 이하'],
          answer: 2,
          explanation: '옥내저장소의 바닥면적은 150㎡ 이하여야 합니다. (단, 특수한 경우 예외)',
        },
        {
          id: 'fs-2',
          question: '위험물 저장탱크의 방유제 용량 기준은?',
          options: ['탱크용량의 50%', '탱크용량의 100%', '탱크용량의 110%', '탱크용량의 150%'],
          answer: 2,
          explanation: '방유제 용량은 탱크용량의 110% 이상이어야 합니다.',
        },
        {
          id: 'fs-3',
          question: '주유취급소의 고정급유설비 호스 길이는?',
          options: ['3m 이하', '5m 이하', '7m 이하', '10m 이하'],
          answer: 1,
          explanation: '고정급유설비의 호스 길이는 5m 이하(현수식은 3m 이하)입니다.',
        },
        {
          id: 'fs-4',
          question: '옥외저장소에서 위험물 용기의 적재 높이는?',
          options: ['3m 이하', '4m 이하', '5m 이하', '6m 이하'],
          answer: 0,
          explanation: '옥외저장소의 용기 적재 높이는 3m 이하입니다. (기계적 적재는 6m 이하)',
        },
        {
          id: 'fs-5',
          question: '이동탱크저장소의 탱크 용량 기준은?',
          options: ['10,000L 이하', '20,000L 이하', '30,000L 이하', '40,000L 이하'],
          answer: 2,
          explanation: '이동탱크저장소의 탱크 용량은 30,000L 이하입니다.',
        },
      ],
    },
    {
      id: 'safety-distance',
      title: '안전거리와 보유공지',
      description: '안전 이격 거리 기준',
      icon: '📏',
      questions: [
        {
          id: 'sd-1',
          question: '제조소에서 주거지역까지의 안전거리는?',
          options: ['10m', '20m', '30m', '50m'],
          answer: 2,
          explanation: '제조소에서 주거지역까지는 30m 이상의 안전거리를 유지해야 합니다.',
        },
        {
          id: 'sd-2',
          question: '옥외탱크저장소의 보유공지 기준(지정수량 500배 이하)은?',
          options: ['1m 이상', '2m 이상', '3m 이상', '5m 이상'],
          answer: 2,
          explanation: '지정수량 500배 이하인 옥외탱크저장소의 보유공지는 3m 이상입니다.',
        },
        {
          id: 'sd-3',
          question: '보유공지의 정의로 옳은 것은?',
          options: ['건물 내부 공간', '제조소등 주위의 빈 공간', '지하 저장공간', '옥상 공간'],
          answer: 1,
          explanation: '보유공지는 제조소등과 다른 시설 사이에 확보해야 하는 빈 공간입니다.',
        },
        {
          id: 'sd-4',
          question: '안전거리 단축이 가능한 경우는?',
          options: ['지정수량 감소', '방화상 유효한 담 설치', '소화설비 증설', '야간 조업'],
          answer: 1,
          explanation: '방화상 유효한 담(내화구조의 벽)을 설치하면 안전거리를 단축할 수 있습니다.',
        },
        {
          id: 'sd-5',
          question: '지정수량 10배 이하 옥내저장소의 보유공지는?',
          options: ['불필요', '0.5m 이상', '1m 이상', '2m 이상'],
          answer: 0,
          explanation: '지정수량 10배 이하인 옥내저장소는 보유공지가 필요하지 않습니다.',
        },
      ],
    },
    {
      id: 'fire-equipment',
      title: '소화설비 기준',
      description: '소화설비 설치 기준',
      icon: '🧯',
      questions: [
        {
          id: 'fe-1',
          question: '소형 소화기 1개의 능력단위는?',
          options: ['0.5', '1', '1.5', '2'],
          answer: 1,
          explanation: '소형 소화기 1개는 능력단위 1로 계산합니다.',
        },
        {
          id: 'fe-2',
          question: '제4류 위험물에 적응성이 없는 소화설비는?',
          options: ['포소화설비', 'CO₂ 소화설비', '할로겐화합물 소화설비', '옥내소화전'],
          answer: 3,
          explanation: '옥내소화전(물)은 제4류 위험물(인화성 액체)에 부적합합니다.',
        },
        {
          id: 'fe-3',
          question: '옥외탱크저장소에 설치해야 하는 소화설비는?',
          options: ['소형 소화기만', '대형 소화기', '포소화설비', '스프링클러'],
          answer: 2,
          explanation: '일정 규모 이상의 옥외탱크저장소에는 포소화설비를 설치해야 합니다.',
        },
        {
          id: 'fe-4',
          question: '제3종 분말소화설비의 방사량 기준은?',
          options: ['30초 이상', '60초 이상', '90초 이상', '120초 이상'],
          answer: 1,
          explanation: '제3종 분말소화설비는 60초 이상 방사할 수 있어야 합니다.',
        },
        {
          id: 'fe-5',
          question: '경보설비가 필요한 제조소등의 지정수량 배수는?',
          options: ['5배 이상', '10배 이상', '50배 이상', '100배 이상'],
          answer: 1,
          explanation: '지정수량 10배 이상인 제조소등에는 경보설비를 설치해야 합니다.',
        },
      ],
    },
    {
      id: 'designated-quantity',
      title: '지정수량 계산',
      description: '위험물 수량 계산',
      icon: '🔢',
      questions: [
        {
          id: 'dq-1',
          question: '휘발유 100L와 등유 500L를 저장할 때 지정수량 배수는?',
          options: ['0.5배', '1배', '1.5배', '2배'],
          answer: 1,
          explanation: '휘발유(200L): 100/200 = 0.5 + 등유(1000L): 500/1000 = 0.5 → 합계 1배',
        },
        {
          id: 'dq-2',
          question: '지정수량 미만 저장 시 적용되는 법령은?',
          options: ['위험물안전관리법', '소방기본법', '시·도 조례', '화학물질관리법'],
          answer: 2,
          explanation: '지정수량 미만의 위험물은 시·도 조례에 따라 규제됩니다.',
        },
        {
          id: 'dq-3',
          question: '과산화수소 36% 용액 1000kg의 지정수량 배수는? (지정수량 300kg)',
          options: ['약 1.2배', '약 2.4배', '약 3.3배', '약 4.8배'],
          answer: 2,
          explanation: '1000kg / 300kg ≈ 3.33배',
        },
        {
          id: 'dq-4',
          question: '이황화탄소(CS₂)의 지정수량은?',
          options: ['50L', '100L', '200L', '400L'],
          answer: 0,
          explanation: '이황화탄소는 특수인화물로 지정수량이 50L입니다.',
        },
        {
          id: 'dq-5',
          question: '제1석유류(수용성)의 지정수량은?',
          options: ['200L', '400L', '1000L', '2000L'],
          answer: 1,
          explanation: '제1석유류 수용성(아세톤 등)의 지정수량은 400L입니다.',
        },
      ],
    },
    {
      id: 'regulations',
      title: '법규 및 행정',
      description: '위험물안전관리법 관련',
      icon: '📜',
      questions: [
        {
          id: 'reg-1',
          question: '위험물안전관리자 선임 대상이 아닌 것은?',
          options: ['제조소', '주유취급소', '지정수량 5배 옥내저장소', '이동탱크저장소'],
          answer: 2,
          explanation: '지정수량 10배 미만인 옥내저장소는 안전관리자 선임 대상이 아닙니다.',
        },
        {
          id: 'reg-2',
          question: '위험물 운반용기의 외부 표시사항이 아닌 것은?',
          options: ['위험물의 품명', '수량', '제조일자', '위험등급'],
          answer: 2,
          explanation: '운반용기 외부에는 품명, 수량, 위험등급, 화기엄금 등을 표시하지만 제조일자는 필수가 아닙니다.',
        },
        {
          id: 'reg-3',
          question: '정기점검 대상 제조소등의 점검 주기는?',
          options: ['월 1회', '분기 1회', '반기 1회', '연 1회'],
          answer: 3,
          explanation: '정기점검은 연 1회 이상 실시해야 합니다.',
        },
        {
          id: 'reg-4',
          question: '완공검사 전 위험물을 반입할 수 있는 경우는?',
          options: ['절대 불가', '가사용승인 후', '신고 후', '자체 판단'],
          answer: 1,
          explanation: '완공검사 전에는 가사용승인을 받은 후에만 위험물을 반입할 수 있습니다.',
        },
        {
          id: 'reg-5',
          question: '제조소등의 변경허가가 필요한 경우가 아닌 것은?',
          options: ['위치 변경', '구조 변경', '저장수량 10배 증가', '소화기 교체'],
          answer: 3,
          explanation: '소화기 교체는 경미한 사항으로 변경허가 대상이 아닙니다.',
        },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`completed-${subject.id}`);
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, [subject.id]);

  const toggleQuestion = (questionId: string) => {
    const newCompleted = {
      ...completedQuestions,
      [questionId]: !completedQuestions[questionId],
    };
    setCompletedQuestions(newCompleted);
    localStorage.setItem(`completed-${subject.id}`, JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const createAIPrompt = (question: Question, showAnswer: boolean) => {
    let prompt = `[위험물산업기사 - 실기] 문제:\n${question.question}\n\n`;
    prompt += `선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
    if (showAnswer) {
      prompt += `\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})`;
      prompt += `\n해설: ${question.explanation}`;
      prompt += `\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    } else {
      prompt += `\n\n이 문제의 정답과 해설을 알려주세요.`;
    }
    return prompt;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-orange-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/hazardous-materials" className="text-gray-600 hover:text-orange-600">위험물산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-white/80">위험물산업기사 실기시험</p>
            </div>
          </div>

          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedCount}/{totalQuestions} ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[q.id]).length;
            const isExpanded = expandedTopics[topic.id];

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className={`transform transition ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t divide-y">
                    {topic.questions.map((question, qIndex) => {
                      const isCompleted = completedQuestions[question.id];

                      return (
                        <div key={question.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isCompleted
                                  ? 'bg-purple-500 border-purple-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {qIndex + 1}. {question.question}
                              </p>
                              <div className="mt-2 space-y-1">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={oIndex}
                                    className={`p-2 rounded text-sm ${
                                      oIndex === question.answer
                                        ? 'bg-purple-100 text-purple-800 font-medium'
                                        : 'bg-gray-50 text-gray-600'
                                    }`}
                                  >
                                    {oIndex + 1}. {option}
                                    {oIndex === question.answer && ' ✓'}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>해설:</strong> {question.explanation}
                                </p>
                              </div>
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://claude.ai', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition flex items-center gap-1"
                                >
                                  🧡 Claude
                                </button>
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://chat.openai.com', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition flex items-center gap-1"
                                >
                                  💚 ChatGPT
                                </button>
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://gemini.google.com', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition flex items-center gap-1"
                                >
                                  💙 Gemini
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/category/chemistry/hazardous-materials/study/hazardous-properties"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 위험물의 성질과 취급
          </Link>
          <Link
            href="/category/chemistry/hazardous-materials"
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            위험물산업기사 홈 →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
