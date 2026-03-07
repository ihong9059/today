'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TransformerPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 to-purple-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            메인으로 돌아가기
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">🤖 Transformer 쉽게 이해하기</h1>
          <p className="mt-2 text-white/80">ChatGPT, 번역기, 이미지 생성 AI의 핵심 원리</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ============================================ */}
        {/* 1. 왜 Transformer인가 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            1. 왜 Transformer가 중요한가?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            2017년 Google이 발표한 <strong>&quot;Attention Is All You Need&quot;</strong> 논문에서 처음 소개된 Transformer는
            현재 <strong>거의 모든 AI의 핵심 구조</strong>입니다.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { emoji: '💬', title: 'ChatGPT', desc: 'GPT = Generative Pre-trained Transformer' },
              { emoji: '🌐', title: 'Google 번역', desc: 'Transformer 기반 번역 모델' },
              { emoji: '🎨', title: 'DALL-E, Midjourney', desc: 'Transformer로 이미지 생성' },
            ].map((item, i) => (
              <div key={i} className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-bold text-gray-900">{item.title}</div>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-violet-50 border border-violet-200 rounded-lg p-4 text-violet-800 text-sm">
            <strong>한마디로:</strong> Transformer는 &quot;문장을 이해하고 생성하는 AI&quot;의 기본 설계도입니다.
          </div>
        </section>

        {/* ============================================ */}
        {/* 2. 이전 방식의 문제점 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            2. Transformer 이전에는? (RNN의 한계)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Transformer 이전에는 <strong>RNN (순환 신경망)</strong>이 문장을 처리했습니다.
            RNN은 단어를 <strong>하나씩 순서대로</strong> 읽는 방식입니다.
          </p>

          <div className="bg-gray-900 rounded-lg p-5 mb-4">
            <p className="text-gray-400 text-xs mb-3 font-mono">RNN 방식: 단어를 하나씩 순서대로 처리</p>
            <div className="flex items-center justify-center gap-2 flex-wrap font-mono text-sm">
              {['나는', '오늘', '학교에서', '수학을', '공부했다'].map((word, i) => (
                <div key={i} className="flex items-center">
                  <div className="bg-blue-900 border border-blue-500 rounded px-3 py-2 text-blue-300">
                    {word}
                  </div>
                  {i < 4 && <span className="text-yellow-400 mx-1">→</span>}
                </div>
              ))}
            </div>
            <p className="text-red-400 text-xs mt-3 text-center">
              ⚠️ 문제: 앞의 단어(&quot;나는&quot;)를 처리할 때, 뒤의 단어(&quot;공부했다&quot;)를 아직 모름
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">❌ RNN의 문제점</h4>
              <ul className="space-y-2 text-sm text-red-700">
                <li><strong>느림:</strong> 단어를 하나씩 처리 → 병렬 처리 불가</li>
                <li><strong>기억력 한계:</strong> 문장이 길면 앞부분을 잊어버림</li>
                <li><strong>먼 관계 파악 어려움:</strong> &quot;그녀가... 10문장 뒤 ... 그녀의&quot; 연결 어려움</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">✅ Transformer의 해결</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li><strong>빠름:</strong> 모든 단어를 동시에 처리 → 병렬 처리 가능</li>
                <li><strong>무한 기억:</strong> 문장 전체를 한 번에 봄</li>
                <li><strong>먼 관계도 OK:</strong> 어떤 단어든 직접 연결 가능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. Attention - 핵심 아이디어 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            3. 핵심 아이디어: Attention (집중)
          </h2>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
            <h3 className="font-bold text-amber-800 text-lg mb-2">🎯 Attention을 한마디로?</h3>
            <p className="text-amber-800 text-lg">
              <strong>&quot;이 단어를 이해하려면, 문장에서 어떤 다른 단어에 집중해야 할까?&quot;</strong>
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">일상 비유: 시험 공부</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 mb-3">
              교과서를 읽을 때, 모든 글자에 똑같이 집중하지 않습니다.
              <strong> 중요한 단어에 형광펜</strong>을 치듯이, AI도 중요한 단어에 더 집중합니다.
            </p>
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-gray-700 text-lg">
                &quot;그 <span className="bg-yellow-300 px-1 font-bold">고양이</span>는 매우 귀여웠고,
                <span className="bg-yellow-100 px-1">집에서</span> 항상 소파 위에서 잠을 잤는데,
                <span className="bg-yellow-300 px-1 font-bold">그것</span>은 정말 게을렀다.&quot;
              </p>
              <p className="text-sm text-gray-500 mt-2">
                → &quot;그것&quot;이 무엇인지 알려면? → <strong>&quot;고양이&quot;</strong>에 집중! (Attention)
              </p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">Self-Attention 시각화</h3>
          <div className="bg-gray-900 rounded-lg p-5 mb-4">
            <p className="text-gray-400 text-xs mb-4 font-mono">문장: &quot;나는 학교에서 수학을 공부했다&quot;</p>
            <div className="space-y-3">
              {[
                { word: '나는', attention: [100, 10, 20, 15, 30], colors: ['bg-yellow-400', 'bg-yellow-900', 'bg-yellow-800', 'bg-yellow-800', 'bg-yellow-700'] },
                { word: '공부했다', attention: [30, 15, 25, 40, 100], colors: ['bg-yellow-700', 'bg-yellow-800', 'bg-yellow-700', 'bg-yellow-600', 'bg-yellow-400'] },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-violet-400 font-bold font-mono w-20 text-right text-sm">{item.word} →</span>
                    {['나는', '학교에서', '수학을', '공부했다'].map((target, j) => {
                      // Simplified opacity mapping
                      const isHighlight = (i === 0 && j === 0) || (i === 1 && j === 3);
                      const isMedium = (i === 0 && j === 3) || (i === 1 && j === 2);
                      return (
                        <div
                          key={j}
                          className={`rounded px-3 py-1.5 text-xs font-mono ${
                            isHighlight
                              ? 'bg-yellow-400 text-gray-900 font-bold'
                              : isMedium
                              ? 'bg-yellow-700 text-yellow-100'
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {target}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center">
              밝을수록 = 더 집중 | &quot;나는&quot;은 자기 자신에게, &quot;공부했다&quot;도 자기 자신에게 가장 집중
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. Q, K, V 쉽게 이해하기 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            4. Query, Key, Value — 도서관 비유
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Attention의 핵심은 <strong>Query(질문)</strong>, <strong>Key(키워드)</strong>, <strong>Value(내용)</strong> 세 가지입니다.
            도서관에서 책을 찾는 것에 비유하면 쉽게 이해할 수 있습니다.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-5 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <h4 className="font-bold text-blue-800 text-lg">Query (질문)</h4>
              <p className="text-blue-700 mt-2 text-sm">
                &quot;AI에 대한 책을 찾고 싶어요&quot;
              </p>
              <div className="mt-3 bg-blue-100 rounded p-2 text-xs text-blue-600">
                = 내가 지금 알고 싶은 것
              </div>
            </div>
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5 text-center">
              <div className="text-4xl mb-2">🏷️</div>
              <h4 className="font-bold text-green-800 text-lg">Key (키워드)</h4>
              <p className="text-green-700 mt-2 text-sm">
                각 책에 붙은 제목/태그<br />
                &quot;인공지능&quot;, &quot;요리&quot;, &quot;여행&quot;...
              </p>
              <div className="mt-3 bg-green-100 rounded p-2 text-xs text-green-600">
                = 각 정보의 라벨
              </div>
            </div>
            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-5 text-center">
              <div className="text-4xl mb-2">📖</div>
              <h4 className="font-bold text-purple-800 text-lg">Value (내용)</h4>
              <p className="text-purple-700 mt-2 text-sm">
                책 안의 실제 내용
              </p>
              <div className="mt-3 bg-purple-100 rounded p-2 text-xs text-purple-600">
                = 실제로 전달할 정보
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-5 mb-4">
            <p className="text-gray-400 text-xs mb-3 font-mono">도서관 비유로 보는 Attention 과정</p>
            <div className="space-y-4 text-sm font-mono">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold min-w-[80px]">Step 1</span>
                <span className="text-gray-300">Query(&quot;AI 책 찾기&quot;)와 모든 Key(&quot;인공지능&quot;, &quot;요리&quot;, &quot;여행&quot;...)를 비교</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 font-bold min-w-[80px]">Step 2</span>
                <span className="text-gray-300">비슷한 정도를 점수로 계산 → &quot;인공지능&quot;: 95점, &quot;요리&quot;: 5점, &quot;여행&quot;: 10점</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold min-w-[80px]">Step 3</span>
                <span className="text-gray-300">점수를 비율로 변환 (Softmax) → 인공지능: 86%, 요리: 5%, 여행: 9%</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400 font-bold min-w-[80px]">Step 4</span>
                <span className="text-gray-300">비율에 따라 Value(책 내용)를 섞어서 최종 답 생성</span>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-sm text-violet-800">
            <strong>수식으로 보면:</strong>
            <div className="bg-white rounded-lg p-4 mt-2 text-center text-lg font-mono">
              Attention(Q, K, V) = softmax(Q × K<sup>T</sup> / √d) × V
            </div>
            <p className="mt-2 text-violet-600">
              Q×K<sup>T</sup> = 질문과 키워드 비교 | √d = 크기 조절 | softmax = 비율 변환 | ×V = 내용 추출
            </p>
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. Multi-Head Attention */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            5. Multi-Head Attention — 여러 관점으로 보기
          </h2>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-amber-800 mb-2">🎯 한마디로?</h3>
            <p className="text-amber-800">
              하나의 문장을 <strong>여러 명이 각자 다른 관점</strong>으로 읽는 것!
            </p>
          </div>

          <h3 className="font-semibold text-gray-900 mb-3">비유: 같은 영화를 보는 여러 평론가</h3>
          <div className="grid md:grid-cols-4 gap-3 mb-4">
            {[
              { head: 'Head 1', role: '문법 전문가', focus: '주어-동사 관계', example: '"나는" ↔ "공부했다"' },
              { head: 'Head 2', role: '장소 전문가', focus: '어디서 일어났는지', example: '"학교에서" ↔ "공부했다"' },
              { head: 'Head 3', role: '감정 전문가', focus: '감정/태도', example: '"열심히" ↔ "공부했다"' },
              { head: 'Head 4', role: '시간 전문가', focus: '언제 일어났는지', example: '"오늘" ↔ "공부했다"' },
            ].map((item, i) => (
              <div key={i} className="bg-violet-50 border border-violet-200 rounded-lg p-3 text-center">
                <div className="text-xs font-semibold text-violet-600 mb-1">{item.head}</div>
                <div className="font-bold text-gray-900 text-sm">{item.role}</div>
                <p className="text-xs text-gray-600 mt-1">{item.focus}</p>
                <div className="mt-2 bg-white rounded px-2 py-1 text-xs text-violet-700 font-mono">
                  {item.example}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-lg p-5">
            <p className="text-gray-400 text-xs mb-3 font-mono">Multi-Head Attention 흐름</p>
            <div className="flex items-center justify-center gap-3 flex-wrap text-sm font-mono">
              <div className="bg-blue-900 border border-blue-500 rounded-lg px-4 py-3 text-blue-300 text-center">
                <div className="font-bold">입력</div>
                <div className="text-xs text-blue-400">&quot;나는 학교에서 공부했다&quot;</div>
              </div>
              <span className="text-yellow-400">→</span>
              <div className="space-y-1">
                {['Head 1', 'Head 2', 'Head 3', 'Head 4'].map((h, i) => (
                  <div key={i} className="bg-violet-900 border border-violet-500 rounded px-3 py-1 text-violet-300 text-xs">
                    {h}: 각자 Attention
                  </div>
                ))}
              </div>
              <span className="text-yellow-400">→</span>
              <div className="bg-green-900 border border-green-500 rounded-lg px-4 py-3 text-green-300 text-center">
                <div className="font-bold">합치기</div>
                <div className="text-xs text-green-400">Concat + Linear</div>
              </div>
              <span className="text-yellow-400">→</span>
              <div className="bg-orange-900 border border-orange-500 rounded-lg px-4 py-3 text-orange-300 text-center">
                <div className="font-bold">최종 이해</div>
                <div className="text-xs text-orange-400">다각도 종합</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 6. Transformer 전체 구조 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            6. Transformer 전체 구조 — 레스토랑 비유
          </h2>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800">
              Transformer는 크게 <strong>Encoder (이해하는 부분)</strong>와 <strong>Decoder (생성하는 부분)</strong>로 나뉩니다.
              레스토랑에 비유하면 이해하기 쉽습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-5">
              <h3 className="font-bold text-blue-800 text-lg mb-3 text-center">🧑‍🍳 Encoder (주방장)</h3>
              <p className="text-blue-700 text-sm mb-4 text-center">&quot;입력을 깊이 이해하는 역할&quot;</p>
              <div className="space-y-2">
                {[
                  ['📋 주문서 읽기', 'Input Embedding — 단어를 숫자 벡터로 변환'],
                  ['📍 순서 표시', 'Positional Encoding — 단어 위치 정보 추가'],
                  ['🔍 재료 분석', 'Self-Attention — 단어 간 관계 파악'],
                  ['✨ 요리법 결정', 'Feed Forward — 최종 의미 정리'],
                ].map(([title, desc], i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="font-semibold text-gray-900 text-sm">{title}</div>
                    <div className="text-xs text-gray-600">{desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-blue-100 rounded-lg p-3 text-xs text-blue-700 text-center">
                예: BERT는 Encoder만 사용 → 문장 이해 특화
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-5">
              <h3 className="font-bold text-orange-800 text-lg mb-3 text-center">🍽️ Decoder (서빙 담당)</h3>
              <p className="text-orange-700 text-sm mb-4 text-center">&quot;이해한 내용을 바탕으로 출력 생성&quot;</p>
              <div className="space-y-2">
                {[
                  ['📝 이전 주문 확인', 'Masked Self-Attention — 이미 생성한 단어들 참고'],
                  ['🔗 주방과 소통', 'Cross-Attention — Encoder 결과 참조'],
                  ['🍳 요리 완성', 'Feed Forward — 다음 단어 결정'],
                  ['🍽️ 서빙', 'Output — 단어 하나씩 출력'],
                ].map(([title, desc], i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-orange-200">
                    <div className="font-semibold text-gray-900 text-sm">{title}</div>
                    <div className="text-xs text-gray-600">{desc}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-orange-100 rounded-lg p-3 text-xs text-orange-700 text-center">
                예: GPT는 Decoder만 사용 → 텍스트 생성 특화
              </div>
            </div>
          </div>

          {/* 전체 흐름 */}
          <div className="bg-gray-900 rounded-lg p-5">
            <p className="text-gray-400 text-xs mb-3 font-mono">번역 예시: &quot;나는 학생입니다&quot; → &quot;I am a student&quot;</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <div className="bg-gray-700 rounded px-3 py-2 text-gray-300 text-sm">&quot;나는 학생입니다&quot;</div>
                <span className="text-yellow-400">→</span>
                <div className="bg-blue-900 border border-blue-500 rounded-lg px-4 py-2 text-blue-300 text-sm font-bold">Encoder</div>
                <span className="text-yellow-400">→</span>
                <div className="bg-purple-900 border border-purple-500 rounded px-3 py-2 text-purple-300 text-sm">의미 벡터</div>
                <span className="text-yellow-400">→</span>
                <div className="bg-orange-900 border border-orange-500 rounded-lg px-4 py-2 text-orange-300 text-sm font-bold">Decoder</div>
                <span className="text-yellow-400">→</span>
                <div className="bg-green-900 border border-green-500 rounded px-3 py-2 text-green-300 text-sm">&quot;I am a student&quot;</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 7. Positional Encoding */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            7. Positional Encoding — 순서 정보 넣기
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Transformer는 모든 단어를 <strong>동시에</strong> 처리합니다.
            그래서 &quot;개가 사람을 물었다&quot;와 &quot;사람이 개를 물었다&quot;를 구분하려면 <strong>단어의 위치 정보</strong>가 필요합니다.
          </p>

          <div className="bg-gray-900 rounded-lg p-5 mb-4">
            <p className="text-gray-400 text-xs mb-3 font-mono">Positional Encoding = 좌석 번호표</p>
            <div className="flex items-center justify-center gap-2 flex-wrap text-sm font-mono">
              {[
                { word: '나는', pos: '1번 자리' },
                { word: '오늘', pos: '2번 자리' },
                { word: '학교에', pos: '3번 자리' },
                { word: '갔다', pos: '4번 자리' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="bg-violet-900 border border-violet-500 rounded px-3 py-2 text-violet-300">
                    {item.word}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">+ {item.pos}</div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-3 text-center">
              각 단어에 &quot;몇 번째인지&quot; 정보를 더해줌 → sin/cos 함수 사용
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <strong>비유:</strong> 영화관에서 좌석 번호가 없으면 자리를 찾을 수 없듯이,
            Transformer에게 단어 순서를 알려주는 것이 Positional Encoding입니다.
          </div>
        </section>

        {/* ============================================ */}
        {/* 8. GPT vs BERT */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            8. GPT vs BERT — 두 가지 활용법
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Transformer의 Encoder와 Decoder를 각각 따로 사용하면서 두 가지 대표 모델이 탄생했습니다.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-orange-300 rounded-xl p-5">
              <h3 className="font-bold text-orange-800 text-xl mb-1 text-center">GPT</h3>
              <p className="text-orange-600 text-sm text-center mb-4">Generative Pre-trained Transformer</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start"><span className="mr-2">🏗️</span><span><strong>구조:</strong> Decoder만 사용</span></div>
                <div className="flex items-start"><span className="mr-2">📝</span><span><strong>방식:</strong> 왼쪽→오른쪽 한 방향으로 다음 단어 예측</span></div>
                <div className="flex items-start"><span className="mr-2">🎯</span><span><strong>특기:</strong> 글쓰기, 대화, 코딩, 번역</span></div>
                <div className="flex items-start"><span className="mr-2">💡</span><span><strong>비유:</strong> 소설가 — 앞 문장을 보고 다음 문장을 씀</span></div>
              </div>
              <div className="mt-4 bg-orange-50 rounded-lg p-3">
                <p className="text-xs text-orange-700 font-mono">
                  입력: &quot;오늘 날씨가&quot;<br/>
                  GPT: &quot;오늘 날씨가 <strong>좋아서 산책을 했다.</strong>&quot;
                </p>
              </div>
              <div className="mt-3 bg-orange-100 rounded p-2 text-xs text-orange-800 text-center">
                ChatGPT, GPT-4, Claude ← 모두 이 방식
              </div>
            </div>

            <div className="border-2 border-blue-300 rounded-xl p-5">
              <h3 className="font-bold text-blue-800 text-xl mb-1 text-center">BERT</h3>
              <p className="text-blue-600 text-sm text-center mb-4">Bidirectional Encoder Representations</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start"><span className="mr-2">🏗️</span><span><strong>구조:</strong> Encoder만 사용</span></div>
                <div className="flex items-start"><span className="mr-2">📝</span><span><strong>방식:</strong> 양방향으로 문장 전체를 읽고 빈칸 맞추기</span></div>
                <div className="flex items-start"><span className="mr-2">🎯</span><span><strong>특기:</strong> 검색, 분류, 감정 분석, 질문 답변</span></div>
                <div className="flex items-start"><span className="mr-2">💡</span><span><strong>비유:</strong> 독해 전문가 — 문장을 깊이 분석</span></div>
              </div>
              <div className="mt-4 bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-700 font-mono">
                  입력: &quot;나는 [빈칸] 에서 공부했다&quot;<br/>
                  BERT: &quot;나는 <strong>학교</strong> 에서 공부했다&quot;
                </p>
              </div>
              <div className="mt-3 bg-blue-100 rounded p-2 text-xs text-blue-800 text-center">
                Google 검색, 스팸 필터 ← 이 방식 활용
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 9. ChatGPT는 어떻게 대답할까 */}
        {/* ============================================ */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            9. ChatGPT는 어떻게 대답할까?
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            ChatGPT는 사실 매우 단순한 원리로 동작합니다:
            <strong> &quot;지금까지의 글을 보고, 다음에 올 가장 적절한 단어를 예측&quot;</strong>하는 것의 반복입니다.
          </p>

          <div className="bg-gray-900 rounded-lg p-5 mb-4">
            <p className="text-gray-400 text-xs mb-3 font-mono">ChatGPT의 답변 생성 과정</p>
            <div className="space-y-3 text-sm font-mono">
              <div className="flex items-start gap-2">
                <span className="text-blue-400 min-w-[60px]">입력:</span>
                <span className="text-gray-300">&quot;한국의 수도는?&quot;</span>
              </div>
              <div className="border-t border-gray-700 pt-2 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 min-w-[60px]">Step 1:</span>
                  <span className="text-gray-300">&quot;한국의 수도는?&quot; → 다음 단어 예측 → <span className="text-yellow-400 font-bold">&quot;서울&quot;</span> (확률 92%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 min-w-[60px]">Step 2:</span>
                  <span className="text-gray-300">&quot;한국의 수도는? 서울&quot; → 다음 단어 → <span className="text-yellow-400 font-bold">&quot;입니다&quot;</span> (확률 87%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 min-w-[60px]">Step 3:</span>
                  <span className="text-gray-300">&quot;한국의 수도는? 서울입니다&quot; → 다음 단어 → <span className="text-yellow-400 font-bold">&quot;.&quot;</span> (확률 95%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 min-w-[60px]">Step 4:</span>
                  <span className="text-gray-300">→ <span className="text-red-400">[종료 토큰]</span> → 완료!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>핵심 포인트:</strong>
            <ul className="mt-2 space-y-1">
              <li>• ChatGPT는 &quot;이해&quot;하는 것이 아니라 &quot;가장 그럴듯한 다음 단어&quot;를 예측할 뿐</li>
              <li>• 하지만 수천억 개의 텍스트로 학습하여 매우 자연스러운 문장을 생성</li>
              <li>• RLHF (인간 피드백 강화학습)로 유용하고 안전한 답변을 하도록 추가 학습</li>
            </ul>
          </div>
        </section>

        {/* ============================================ */}
        {/* 10. 정리 */}
        {/* ============================================ */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-violet-700 mb-4 flex items-center">
            <span className="w-1 h-6 bg-violet-500 rounded mr-3"></span>
            10. 한눈에 정리
          </h2>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm divide-y divide-violet-200">
              <thead>
                <tr className="bg-violet-100">
                  <th className="px-4 py-3 text-left font-semibold text-violet-900">개념</th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-900">한마디 설명</th>
                  <th className="px-4 py-3 text-left font-semibold text-violet-900">비유</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100">
                {[
                  ['Attention', '중요한 단어에 집중하기', '형광펜 치기'],
                  ['Self-Attention', '문장 안에서 단어끼리 관계 파악', '반 친구들끼리 소통'],
                  ['Multi-Head', '여러 관점으로 동시에 분석', '여러 전문가 의견 종합'],
                  ['Positional Encoding', '단어 순서 정보 추가', '좌석 번호표'],
                  ['Encoder', '입력을 깊이 이해', '주방장 (재료 분석)'],
                  ['Decoder', '이해한 것을 바탕으로 생성', '서빙 (요리 전달)'],
                  ['GPT', '다음 단어 예측 (생성형)', '소설가'],
                  ['BERT', '빈칸 맞추기 (이해형)', '독해 전문가'],
                ].map(([concept, desc, metaphor], i) => (
                  <tr key={i} className="hover:bg-violet-50">
                    <td className="px-4 py-2 font-bold text-violet-800">{concept}</td>
                    <td className="px-4 py-2 text-gray-700">{desc}</td>
                    <td className="px-4 py-2 text-gray-500">{metaphor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-violet-100 rounded-lg p-4 text-violet-900">
            <strong>학습 순서 권장:</strong>
            <div className="flex items-center gap-2 mt-2 flex-wrap text-sm">
              {[
                'Level 1 (퍼셉트론)',
                'Level 3 (딥러닝 핵심)',
                'Level 6 (RNN/LSTM)',
                'Level 7 (Transformer)',
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <span className="bg-violet-200 rounded px-2 py-1 font-medium">{step}</span>
                  {i < 3 && <span className="mx-1 text-violet-400">→</span>}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-violet-700">
              Transformer를 완전히 이해하려면 위 순서대로 학습하는 것을 권장합니다.
              <Link href="/curriculum" className="underline font-semibold ml-1">커리큘럼 보기 →</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
