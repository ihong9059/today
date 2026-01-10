'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ColoristEngineerPage() {
  const [showAIModal, setShowAIModal] = useState(false);

  const studyTopics = [
    { id: 'color-basics', title: '색채기초', desc: '색의 3속성, 색채 지각, 색의 혼합', questions: 50 },
    { id: 'color-system', title: '색채체계', desc: 'KS색체계, 먼셀, NCS, PCCS, 오스트발트', questions: 50 },
    { id: 'color-psychology', title: '색채심리', desc: '색채 감정, 연상, 이미지 스케일, 심리효과', questions: 50 },
    { id: 'color-harmony', title: '색채조화', desc: '배색 원리, 배색 기법, 색채 조화론', questions: 50 },
    { id: 'color-planning', title: '색채계획', desc: '색채 마케팅, 환경색채, 색채 디자인 실무', questions: 50 },
  ];

  const examInfo = {
    written: {
      subjects: ['색채심리·마케팅', '색채디자인', '색채관리', '색채지각론'],
      questions: 100,
      time: 150,
      passing: 60
    },
    practical: {
      type: '작업형',
      time: 300,
      passing: 60,
      content: ['색채계획', '색채디자인', '색채관리']
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white transition-colors">홈</Link>
            <span>/</span>
            <Link href="/category/design" className="hover:text-white transition-colors">디자인</Link>
            <span>/</span>
            <span>컬러리스트기사</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">컬러리스트기사</h1>
          <p className="text-xl text-pink-100 mb-6">색채 전문가로서 색채 계획, 디자인, 관리 능력을 인증하는 국가기술자격</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/category/design/colorist-engineer/exam"
              className="px-6 py-3 bg-white text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-colors"
            >
              시험 정보 보기
            </Link>
            <button
              onClick={() => setShowAIModal(true)}
              className="px-6 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-400 transition-colors flex items-center gap-2"
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
              <div className="text-3xl font-bold text-pink-600">기사</div>
              <div className="text-gray-600">자격 등급</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600">연 3회</div>
              <div className="text-gray-600">시험 횟수</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-pink-600">34.1%</div>
              <div className="text-gray-600">2023 합격률</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-purple-600">한국산업인력공단</div>
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
                <h3 className="text-lg font-semibold text-gray-800 mb-3">컬러리스트기사란?</h3>
                <p className="text-gray-600 leading-relaxed">
                  컬러리스트기사는 색채에 관한 전문 지식을 바탕으로 색채 계획, 색채 디자인, 색채 관리 등의
                  업무를 수행하는 색채 전문가입니다. 제품, 환경, 패션, 미디어 등 다양한 분야에서
                  색채를 통해 가치를 창출하고 문제를 해결하는 역할을 합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">주요 업무</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>색채 트렌드 분석 및 예측</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>제품, 환경, 패션 색채 계획 수립</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>색채 디자인 및 배색 개발</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>색채 품질 관리 및 표준화</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">•</span>
                    <span>색채 마케팅 전략 수립</span>
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
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-pink-700 mb-4">기사 응시 자격</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">1.</span>
                  <span>산업기사 + 실무경력 1년</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">2.</span>
                  <span>기능사 + 실무경력 3년</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">3.</span>
                  <span>관련학과 4년제 대졸(예정)자</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">4.</span>
                  <span>관련학과 전문대졸 + 실무경력 2년</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 font-bold">5.</span>
                  <span>실무경력 4년 이상</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">관련 학과</h3>
              <div className="flex flex-wrap gap-2">
                {['시각디자인', '산업디자인', '제품디자인', '색채학', '미술', '공예', '패션디자인', '섬유디자인', '환경디자인', '광고디자인'].map((dept) => (
                  <span key={dept} className="px-3 py-1 bg-white rounded-full text-sm text-purple-600 shadow-sm">
                    {dept}
                  </span>
                ))}
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
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span className="w-6 h-6 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 text-sm font-medium">
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
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span className="w-6 h-6 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 text-sm font-medium">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTopics.map((topic) => (
              <Link
                key={topic.id}
                href={`/category/design/colorist-engineer/study/${topic.id}`}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all group"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{topic.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">{topic.questions}문제</span>
                  <span className="text-pink-500 group-hover:translate-x-1 transition-transform">→</span>
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
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채기초 & 색채체계 (4주)</h3>
                  <p className="text-gray-600 text-sm">색의 3속성, 색채 지각 원리를 익히고 다양한 색채체계(먼셀, NCS, PCCS 등)를 학습합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채심리 & 색채조화 (3주)</h3>
                  <p className="text-gray-600 text-sm">색채의 심리적 효과와 감정을 이해하고, 배색 원리와 조화론을 학습합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-800">색채계획 (3주)</h3>
                  <p className="text-gray-600 text-sm">색채 마케팅, 환경색채, 제품색채 등 실무 응용 분야를 학습합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-800">기출문제 & 실기 대비 (2주)</h3>
                  <p className="text-gray-600 text-sm">기출문제 풀이와 함께 실기시험(색채계획 실무)을 집중 준비합니다.</p>
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
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-pink-700 mb-4">필기시험 전략</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>색채체계(먼셀, NCS, PCCS)는 반드시 암기</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>색의 3속성(색상, 명도, 채도) 개념 확실히</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>배색 기법 용어(톤온톤, 톤인톤 등) 정리</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500">✓</span>
                  <span>색채 심리, 이미지 스케일 출제 빈도 높음</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-4">실기시험 전략</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>색채계획서 작성 연습 필수</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>배색 실습으로 색 감각 훈련</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>색채 분석 및 제안서 형식 숙지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  <span>시간 배분 연습 (5시간 실기)</span>
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
                  {['제품디자인', '패션/섬유', '인테리어', '건축/환경', '그래픽디자인', '광고/마케팅', '화장품', '자동차', '가전제품', '색채컨설팅'].map((field) => (
                    <span key={field} className="px-4 py-2 bg-pink-50 text-pink-700 rounded-lg text-sm">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">전망</h3>
                <p className="text-gray-600 leading-relaxed">
                  디자인과 마케팅에서 색채의 중요성이 증가하면서 컬러리스트 수요가 늘고 있습니다.
                  특히 제품 차별화, 브랜드 아이덴티티, UX/UI 디자인 분야에서 색채 전문가의
                  역할이 강조되고 있어 향후 전망이 밝습니다.
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
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">2026년 시험 일정</h3>
                <p className="text-pink-100">한국산업인력공단 Q-Net에서 정확한 일정을 확인하세요.</p>
              </div>
              <a
                href="https://www.q-net.or.kr/crf005.do?id=crf00505&gSite=Q&gId="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-colors"
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
            <Link href="/category/design/colorist-technician" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">컬러리스트산업기사</h3>
              <p className="text-gray-600 text-sm">기사 자격의 하위 등급으로, 색채 실무 능력을 검증합니다.</p>
            </Link>
            <Link href="/category/design/visual-design-engineer" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">시각디자인기사</h3>
              <p className="text-gray-600 text-sm">그래픽, 편집, 광고 등 시각 커뮤니케이션 분야 자격증입니다.</p>
            </Link>
            <Link href="/category/design/product-design-engineer" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">제품디자인기사</h3>
              <p className="text-gray-600 text-sm">제품의 기능과 조형을 설계하는 산업디자인 분야 자격증입니다.</p>
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
            <p className="text-gray-600 mb-6">AI 챗봇을 활용하여 컬러리스트기사 학습에 도움을 받으세요.</p>
            <div className="space-y-3">
              <a
                href="https://chat.openai.com/?q=컬러리스트기사 시험 준비를 도와주세요"
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
                href="https://claude.ai/new?q=컬러리스트기사 시험 준비를 도와주세요"
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
                href="https://gemini.google.com/?q=컬러리스트기사 시험 준비를 도와주세요"
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
