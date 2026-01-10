'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ColoristTechnicianPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  const studyTopics = [
    { id: 'color-theory', title: '색채이론', desc: '색의 3속성, 색채체계, 색의 혼합, 색채 지각', questions: 50 },
    { id: 'color-application', title: '색채응용', desc: '색채심리, 배색기법, 색채조화, 이미지스케일', questions: 50 },
    { id: 'color-practice', title: '색채실무', desc: '색채계획, 색채마케팅, 환경색채, 색채관리', questions: 50 },
  ];

  const examInfo = {
    written: {
      subjects: ['색채이론', '색채디자인', '색채관리'],
      questions: 60,
      time: 90,
      passing: 60
    },
    practical: {
      type: '작업형',
      time: 240,
      passing: 60,
      content: ['색채계획 실무']
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-rose-100 mb-4">
            <Link href="/" className="hover:text-white transition-colors">홈</Link>
            <span>/</span>
            <Link href="/category/design" className="hover:text-white transition-colors">디자인</Link>
            <span>/</span>
            <span>컬러리스트산업기사</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">컬러리스트산업기사</h1>
          <p className="text-xl text-rose-100 mb-6">색채 실무 능력을 갖춘 색채 전문 기술인력 양성을 위한 국가기술자격</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/category/design/colorist-technician/exam"
              className="px-6 py-3 bg-white text-rose-500 rounded-xl font-medium hover:bg-rose-50 transition-colors"
            >
              시험 정보 보기
            </Link>
            <button
              onClick={() => setShowAIModal(true)}
              className="px-6 py-3 bg-rose-400 text-white rounded-xl font-medium hover:bg-rose-300 transition-colors flex items-center gap-2"
            >
              <span>AI 학습 도우미</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 빠른 정보 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-rose-500">산업기사</div>
              <div className="text-gray-600">자격 등급</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-500">연 3회</div>
              <div className="text-gray-600">시험 횟수</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-rose-500">42.8%</div>
              <div className="text-gray-600">2023 합격률</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-500">한국산업인력공단</div>
              <div className="text-gray-600">시행 기관</div>
            </div>
          </div>
        </div>
      </section>

      {/* 자격증 개요 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">자격증 개요</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">컬러리스트산업기사란?</h3>
                <p className="text-gray-600 leading-relaxed">
                  컬러리스트산업기사는 색채에 관한 기초 지식과 실무 능력을 바탕으로 색채 디자인,
                  배색 계획, 색채 관리 등의 업무를 수행하는 색채 실무 전문가입니다.
                  기사 자격보다 진입 장벽이 낮아 색채 분야 입문자에게 적합합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 업무</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>제품, 환경의 색채 적용 및 관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>배색 계획 및 색채 시안 제작</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>색채 품질 검사 및 관리</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1">•</span>
                    <span>색채 자료 수집 및 분석 보조</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 응시 자격 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">응시 자격</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-rose-700 mb-4">산업기사 응시 자격</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">1.</span>
                  <span>기능사 + 실무경력 1년</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">2.</span>
                  <span>관련학과 전문대졸(예정)자</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">3.</span>
                  <span>관련학과 4년제 2년 이상 수료자</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">4.</span>
                  <span>실무경력 2년 이상</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">5.</span>
                  <span>동일·유사 분야 산업기사 자격 취득자</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-pink-700 mb-4">기사와의 차이점</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500">📋</span>
                  <span>필기: 3과목 60문항 (기사: 4과목 100문항)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500">⏱️</span>
                  <span>실기: 4시간 (기사: 5시간)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500">📚</span>
                  <span>시험 범위가 기사보다 좁음</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500">🎯</span>
                  <span>실무 중심의 기초적 내용</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 시험 과목 요약 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 과목</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">필기시험</h3>
                  <p className="text-gray-500 text-sm">{examInfo.written.questions}문항 / {examInfo.written.time}분</p>
                </div>
              </div>
              <ul className="space-y-2">
                {examInfo.written.subjects.map((subject, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 text-sm font-medium">
                      {index + 1}
                    </span>
                    {subject}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">합격 기준: 과목당 40점 이상, 평균 {examInfo.written.passing}점 이상</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">실기시험</h3>
                  <p className="text-gray-500 text-sm">{examInfo.practical.type} / {examInfo.practical.time}분</p>
                </div>
              </div>
              <ul className="space-y-2">
                {examInfo.practical.content.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="w-6 h-6 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 text-sm font-medium">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">합격 기준: {examInfo.practical.passing}점 이상</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 학습 콘텐츠 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">학습 콘텐츠</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {studyTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/category/design/colorist-technician/study/${topic.id}`}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all group"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-rose-500 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{topic.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-pink-500 font-medium">{topic.questions}문제</span>
                  <span className="text-rose-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 공부 순서 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">추천 공부 순서</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채이론 기초 (3주)</h3>
                  <p className="text-gray-600 text-sm">색의 3속성, 색채체계(먼셀, PCCS), 색의 혼합, 색채 지각 등 기본 이론을 학습합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채응용 (2주)</h3>
                  <p className="text-gray-600 text-sm">색채심리, 배색기법, 색채조화론, 이미지 스케일 등 응용 분야를 학습합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채실무 & 실기 (3주)</h3>
                  <p className="text-gray-600 text-sm">색채계획, 색채마케팅, 환경색채 등 실무 내용과 함께 실기시험을 준비합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 합격 전략 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">합격 전략</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-rose-700 mb-4">필기시험 전략</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✓</span>
                  <span>먼셀 색체계 표기법과 색상환 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✓</span>
                  <span>PCCS 톤 기호와 특징 정리</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✓</span>
                  <span>배색 기법 용어 확실히 구분</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500">✓</span>
                  <span>색채 대비 현상 유형별 정리</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-pink-700 mb-4">실기시험 전략</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>색채계획서 작성 형식 숙지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>배색 실습으로 색 감각 훈련</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>4시간 시간 관리 연습</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>색채 도구 사용법 익히기</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 진로 및 전망 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">진로 및 전망</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">취업 분야</h3>
                <div className="flex flex-wrap gap-2">
                  {['제품디자인', '패션/섬유', '인테리어', '그래픽디자인', '화장품', '색채컨설팅', '교육/강의'].map((field) => (
                    <span key={field} className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">자격 활용</h3>
                <p className="text-gray-600 leading-relaxed">
                  산업기사 취득 후 1년 실무 경력을 쌓으면 기사 응시 자격이 주어집니다.
                  색채 관련 실무 경험을 쌓으면서 기사 자격 취득을 목표로 할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 시험 일정 안내 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 일정 안내</h2>
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">2026년 시험 일정</h3>
                <p className="text-rose-100">한국산업인력공단 Q-Net에서 정확한 일정을 확인하세요.</p>
              </div>
              <a
                href="https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&gId="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-500 rounded-xl font-medium hover:bg-rose-50 transition-colors"
              >
                <span>Q-Net 바로가기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 관련 자격증 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">관련 자격증</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/category/design/colorist-engineer" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">컬러리스트기사</h3>
              <p className="text-gray-600 text-sm">산업기사의 상위 자격으로, 더 깊은 전문 지식을 검증합니다.</p>
            </Link>
            <Link href="/category/design/visual-design-technician" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">시각디자인산업기사</h3>
              <p className="text-gray-600 text-sm">시각 커뮤니케이션 분야의 산업기사 자격증입니다.</p>
            </Link>
            <Link href="/category/design/web-design" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">웹디자인기능사</h3>
              <p className="text-gray-600 text-sm">웹 디자인 분야의 기능사 자격증입니다.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* AI 모달 */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6">AI 챗봇을 활용하여 컬러리스트산업기사 학습에 도움을 받으세요.</p>
            <div className="space-y-3">
              <a
                href="https://chat.openai.com/?q=컬러리스트산업기사 시험 준비를 도와주세요"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">ChatGPT</div>
                  <div className="text-sm text-gray-500">OpenAI의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href="https://claude.ai/new?q=컬러리스트산업기사 시험 준비를 도와주세요"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Claude</div>
                  <div className="text-sm text-gray-500">Anthropic의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href="https://gemini.google.com/?q=컬러리스트산업기사 시험 준비를 도와주세요"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Gemini</div>
                  <div className="text-sm text-gray-500">Google의 AI 어시스턴트</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
