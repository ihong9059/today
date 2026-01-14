'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SocialWorker2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const requiredSubjects = [
    {
      category: '필수과목 (10과목)',
      icon: '📚',
      subjects: [
        { name: '사회복지개론', description: '사회복지의 개념, 역사, 가치, 윤리' },
        { name: '인간행동과 사회환경', description: '인간발달, 성격이론, 사회체계' },
        { name: '사회복지정책론', description: '복지정책의 형성, 분석, 평가' },
        { name: '사회복지법제와 실천', description: '사회복지 관련 법률 체계' },
        { name: '사회복지실천론', description: '개입 과정, 면접기술, 관계형성' },
        { name: '사회복지실천기술론', description: '개인, 집단, 가족 대상 실천기술' },
        { name: '사회복지조사론', description: '조사 설계, 자료수집, 분석방법' },
        { name: '사회복지행정론', description: '조직관리, 인사, 재정, 평가' },
        { name: '지역사회복지론', description: '지역사회 조직화, 자원개발' },
        { name: '사회복지현장실습', description: '160시간 이상 현장실습' }
      ]
    },
    {
      category: '선택과목 (7과목 중 4과목)',
      icon: '📖',
      subjects: [
        { name: '아동복지론', description: '아동의 권리, 보호, 복지서비스' },
        { name: '청소년복지론', description: '청소년 문제, 정책, 프로그램' },
        { name: '노인복지론', description: '노화, 노인문제, 복지정책' },
        { name: '장애인복지론', description: '장애의 이해, 재활, 복지서비스' },
        { name: '가족복지론', description: '가족문제, 가족치료, 가족정책' },
        { name: '정신건강론', description: '정신건강, 정신질환, 개입방법' },
        { name: '의료사회복지론', description: '의료현장의 사회복지 실천' }
      ]
    }
  ];

  const acquisitionMethods = [
    {
      title: '대학 졸업',
      icon: '🎓',
      description: '사회복지학 전공 또는 관련학과',
      requirements: ['4년제 대학: 필수 10과목 + 선택 4과목 이상', '3년제 전문대: 필수 10과목 + 선택 4과목 이상', '2년제 전문대: 필수 10과목 + 선택 4과목 이상']
    },
    {
      title: '학점은행제',
      icon: '📱',
      description: '온라인 학점 이수로 취득',
      requirements: ['필수 10과목 + 선택 4과목 이상 이수', '현장실습 160시간 이상', '총 14과목 42학점 이상']
    },
    {
      title: '대학원',
      icon: '🏛️',
      description: '사회복지학 석사 이상',
      requirements: ['대학원 과정 중 필수과목 이수', '현장실습 160시간', '사회복지 관련 학위 취득']
    }
  ];

  const careerPaths = [
    { field: '사회복지관', description: '종합사회복지관, 노인복지관 등', icon: '🏢' },
    { field: '아동·청소년시설', description: '아동보호, 청소년상담, 지역아동센터', icon: '👶' },
    { field: '노인복지시설', description: '요양원, 주간보호센터, 경로당', icon: '👴' },
    { field: '장애인복지시설', description: '장애인복지관, 직업재활시설', icon: '♿' },
    { field: '의료기관', description: '병원, 정신건강복지센터', icon: '🏥' },
    { field: '공공기관', description: '주민센터, 구청, 공단', icon: '🏛️' }
  ];

  const openAIModal = (prompt: string) => {
    setAiPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-pink-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/welfare" className="hover:text-white">사회복지·상담</Link>
            <span>/</span>
            <span className="text-white">사회복지사 2급</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">💝</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">사회복지사 2급</h1>
              <p className="text-xl text-pink-100">Social Worker Level 2</p>
            </div>
          </div>
          <p className="text-lg text-pink-50 max-w-3xl">
            사회복지사 2급은 사회복지 현장에서 클라이언트를 직접 만나 상담, 자원연결,
            프로그램 진행 등의 실무를 담당하는 사회복지 전문 인력 자격증입니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/category/welfare/social-worker-2/study"
              className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
            >
              📚 학습하기
            </Link>
            <button
              onClick={() => openAIModal('사회복지사 2급 자격증 취득을 위한 효율적인 학점 이수 전략과 현장실습 준비 방법을 알려주세요.')}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors border border-pink-400"
            >
              🤖 AI 학습 도우미
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-sm text-gray-500">이수과목</div>
                <div className="text-xl font-bold text-gray-900">14과목</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-sm text-gray-500">현장실습</div>
                <div className="text-xl font-bold text-gray-900">160시간</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🎓</div>
                <div className="text-sm text-gray-500">취득방법</div>
                <div className="text-xl font-bold text-gray-900">학점이수</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm text-gray-500">자격발급</div>
                <div className="text-xl font-bold text-gray-900">보건복지부</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📌 자격 개요</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  사회복지사 2급은 「사회복지사업법」에 따른 국가공인 자격증으로,
                  사회복지 관련 교과목을 이수하고 현장실습을 완료하면 취득할 수 있습니다.
                  별도의 시험 없이 학점 이수만으로 취득 가능하여 접근성이 높습니다.
                </p>
                <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">⚠️ 2020년 제도 변경 사항</h4>
                  <ul className="text-sm text-pink-700 space-y-1">
                    <li>• 현장실습 시간: 120시간 → <strong>160시간</strong>으로 확대</li>
                    <li>• 실습기관: 사회복지사 1급 자격 소지자가 있는 기관</li>
                    <li>• 실습지도자: 3년 이상 경력의 사회복지사</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 취득 방법 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 취득 방법</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {acquisitionMethods.map((method, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors">
                    <div className="text-3xl mb-3">{method.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{method.description}</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {method.requirements.map((req, idx) => (
                        <li key={idx}>• {req}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 이수과목 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 이수과목</h2>
              {requiredSubjects.map((category, catIndex) => (
                <div key={catIndex} className="mb-6 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>{category.icon}</span> {category.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.subjects.map((subject, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition-colors">
                        <div className="font-medium text-gray-900">{subject.name}</div>
                        <div className="text-sm text-gray-500">{subject.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 현장실습 안내 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🏢 현장실습 안내</h2>
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">실습 요건</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>📍 실습시간: <strong>160시간 이상</strong></li>
                      <li>📍 실습기간: 4주(1일 8시간 기준)</li>
                      <li>📍 실습기관: 사회복지시설·기관</li>
                      <li>📍 실습지도자: 1급 자격 + 3년 경력</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">실습 내용</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>✓ 기관 이해 및 오리엔테이션</li>
                      <li>✓ 사례관리 및 상담 참관</li>
                      <li>✓ 프로그램 기획 및 진행</li>
                      <li>✓ 행정업무 및 서류작성</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 진로 분야 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">💼 진로 분야</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {careerPaths.map((career, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors">
                    <div className="text-3xl mb-2">{career.icon}</div>
                    <div className="font-semibold text-gray-900">{career.field}</div>
                    <div className="text-xs text-gray-500 mt-1">{career.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">🤖 AI 학습 도우미</h2>
              <p className="text-pink-100 mb-6">
                사회복지사 2급 자격 취득에 필요한 모든 것을 AI에게 물어보세요!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => openAIModal('사회복지사 2급 필수과목 10개의 핵심 내용을 정리해주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">📚 필수과목 핵심정리</span>
                </button>
                <button
                  onClick={() => openAIModal('사회복지사 2급 현장실습 준비 방법과 좋은 실습기관 선정 기준을 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">🏢 현장실습 가이드</span>
                </button>
                <button
                  onClick={() => openAIModal('학점은행제로 사회복지사 2급을 취득하는 구체적인 절차와 비용을 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">📱 학점은행제 안내</span>
                </button>
                <button
                  onClick={() => openAIModal('사회복지사 2급 취득 후 1급 시험 준비 방법과 승급 전략을 알려주세요.')}
                  className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition-colors"
                >
                  <span className="font-medium">🎯 1급 승급 전략</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 취득 로드맵 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🗺️ 취득 로드맵</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-gray-900">교육기관 선택</div>
                    <div className="text-sm text-gray-500">대학/학점은행제 선택</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-gray-900">교과목 이수</div>
                    <div className="text-sm text-gray-500">필수 10과목 + 선택 4과목</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-gray-900">현장실습</div>
                    <div className="text-sm text-gray-500">160시간 이상 실습</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-gray-900">자격증 신청</div>
                    <div className="text-sm text-gray-500">한국사회복지사협회</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 비용 안내 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💰 비용 안내</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">학점은행제 (14과목)</span>
                  <span className="font-bold text-gray-900">약 70-100만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">현장실습비</span>
                  <span className="font-bold text-gray-900">약 20-30만원</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">자격증 발급비</span>
                  <span className="font-bold text-gray-900">10,000원</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                * 교육기관에 따라 비용이 다를 수 있습니다
              </p>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 연계 자격증</h3>
              <div className="space-y-3">
                <Link href="/category/welfare/social-worker-1" className="block p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
                  <div className="font-medium text-gray-900">🤝 사회복지사 1급</div>
                  <div className="text-sm text-gray-500">상위 자격, 시험 합격 필요</div>
                </Link>
                <Link href="/category/welfare/youth-counselor-2" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <div className="font-medium text-gray-900">👥 청소년상담사 2급</div>
                  <div className="text-sm text-gray-500">청소년 상담 전문</div>
                </Link>
                <Link href="/category/education/lifelong-educator-2" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <div className="font-medium text-gray-900">📖 평생교육사 2급</div>
                  <div className="text-sm text-gray-500">평생교육 분야</div>
                </Link>
              </div>
            </div>

            {/* 유용한 사이트 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 유용한 사이트</h3>
              <div className="space-y-2">
                <a href="https://www.welfare.net" target="_blank" rel="noopener noreferrer" className="block text-pink-600 hover:text-pink-700 text-sm">
                  → 한국사회복지사협회
                </a>
                <a href="https://www.cb.or.kr" target="_blank" rel="noopener noreferrer" className="block text-pink-600 hover:text-pink-700 text-sm">
                  → 학점은행제
                </a>
                <a href="https://www.mohw.go.kr" target="_blank" rel="noopener noreferrer" className="block text-pink-600 hover:text-pink-700 text-sm">
                  → 보건복지부
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">{aiPrompt}</p>
            </div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(aiPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
