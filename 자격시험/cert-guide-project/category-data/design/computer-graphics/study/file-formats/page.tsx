'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({});

  const topic = {
    id: 'file-formats',
    name: '파일 형식',
    color: 'from-green-500 to-emerald-600'
  };

  const questions = [
      {
        id: 1,
        question: 'PSD, AI, INDD 파일 차이는?',
        answer: 'PSD(포토샵), AI(일러스트), INDD(인디자인). 각 프로그램 원본 작업 파일',
        prompt: '컴퓨터그래픽스운용기능사 시험 관련 질문입니다: PSD, AI, INDD 파일 차이는? 자세히 설명해주세요.'
      },
      {
        id: 2,
        question: 'JPEG와 PNG 차이는?',
        answer: 'JPEG(손실압축, 사진용), PNG(무손실, 투명도 지원). 웹 이미지용',
        prompt: '컴퓨터그래픽스운용기능사 시험 관련 질문입니다: JPEG와 PNG 차이는? 자세히 설명해주세요.'
      },
      {
        id: 3,
        question: 'PDF 장점은?',
        answer: '플랫폼 독립적, 인쇄용 표준, 레이아웃 유지, 폰트 임베드 가능',
        prompt: '컴퓨터그래픽스운용기능사 시험 관련 질문입니다: PDF 장점은? 자세히 설명해주세요.'
      },
      {
        id: 4,
        question: 'SVG 파일 특징은?',
        answer: 'XML 기반 벡터, 웹용, 확대축소 자유, CSS/JS로 제어 가능',
        prompt: '컴퓨터그래픽스운용기능사 시험 관련 질문입니다: SVG 파일 특징은? 자세히 설명해주세요.'
      },
      {
        id: 5,
        question: 'TIFF 파일 용도는?',
        answer: '고품질 인쇄, 무손실 압축, 레이어 보존 가능, 전문 인쇄용',
        prompt: '컴퓨터그래픽스운용기능사 시험 관련 질문입니다: TIFF 파일 용도는? 자세히 설명해주세요.'
      },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('computer-graphics-file-formats-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleComplete = (id: number) => {
    const updated = { ...completedQuestions, [id]: !completedQuestions[id] };
    setCompletedQuestions(updated);
    localStorage.setItem('computer-graphics-file-formats-progress', JSON.stringify(updated));
  };

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design" className="text-gray-600 hover:text-pink-600">디자인·문화</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/design/computer-graphics" className="text-gray-600 hover:text-pink-600">컴퓨터그래픽스운용기능사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">{topic.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${topic.color} text-white py-8`}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{topic.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-white/90 text-sm">{completedCount}/{questions.length} 완료</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`bg-white rounded-xl shadow p-6 border-l-4 transition-all ${
                completedQuestions[q.id]
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleComplete(q.id)}
                  className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    completedQuestions[q.id]
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  {completedQuestions[q.id] && '✓'}
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2">{q.question}</h3>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">💡 {q.answer}</p>
                  <div className="flex gap-2 flex-wrap">
                    <a
                      href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                    >
                      🧡 Claude
                    </a>
                    <a
                      href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                    >
                      💚 ChatGPT
                    </a>
                    <a
                      href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                    >
                      💙 Gemini
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/category/design/computer-graphics"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
