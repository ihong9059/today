'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KindergartenTeacherExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleAIHelp = (topic: string) => {
    setCurrentPrompt(`유치원정교사 임용시험 ${topic}에 대해 자세히 설명해주세요. 출제 경향, 핵심 내용, 학습 방법, 합격 전략 등을 포함해서 설명해주세요.`);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-pink-600 transition">홈</Link>
            <span>/</span>
            <Link href="/category/education" className="hover:text-pink-600 transition">교육</Link>
            <span>/</span>
            <Link href="/category/education/kindergarten-teacher" className="hover:text-pink-600 transition">유치원정교사</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">시험정보</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">📋 유치원정교사 임용시험 정보</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              activeTab === 'first'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            📝 1차 시험 (필기)
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              activeTab === 'second'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            🎤 2차 시험 (면접·실기)
          </button>
        </div>

        {/* 1차 시험 */}
        {activeTab === 'first' && (
          <div className="space-y-6">
            {/* 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1차 시험 개요</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-pink-600 text-sm mb-1">시험 시간</p>
                  <p className="text-2xl font-bold text-pink-700">약 4시간</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-purple-600 text-sm mb-1">문항 수</p>
                  <p className="text-2xl font-bold text-purple-700">교육학 1 + 전공 40</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-blue-600 text-sm mb-1">합격 기준</p>
                  <p className="text-2xl font-bold text-blue-700">선발예정 인원의 1.5배</p>
                </div>
              </div>
            </div>

            {/* 교육학 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">📚 교육학 (논술형)</h2>
                <button
                  onClick={() => handleAIHelp('교육학 논술')}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition text-sm font-medium"
                >
                  🤖 AI 도움
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-sm">문항 수</p>
                      <p className="font-bold">1문항</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">배점</p>
                      <p className="font-bold">20점</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">시험 시간</p>
                      <p className="font-bold">60분</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">출제 범위</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      '교육철학 및 교육사',
                      '교육심리학',
                      '교육사회학',
                      '교육과정',
                      '교육평가',
                      '교육행정 및 경영',
                      '교육방법 및 교육공학',
                      '생활지도 및 상담'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-pink-50 rounded-lg">
                        <span className="text-pink-500">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 전공 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🎓 전공 유아교육학</h2>
                <button
                  onClick={() => handleAIHelp('전공 유아교육학')}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium"
                >
                  🤖 AI 도움
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-sm">문항 수</p>
                      <p className="font-bold">40문항</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">배점</p>
                      <p className="font-bold">80점</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">시험 시간</p>
                      <p className="font-bold">140분</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">주요 출제 영역</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-pink-200 rounded-xl p-4">
                      <h4 className="font-bold text-pink-700 mb-2">유아교육론</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 유아교육의 역사와 사상</li>
                        <li>• 유아교육 이론 (피아제, 비고츠키 등)</li>
                        <li>• 유아교육 프로그램 (몬테소리, 레지오 에밀리아 등)</li>
                        <li>• 유아교육기관의 유형과 운영</li>
                      </ul>
                    </div>
                    <div className="border border-purple-200 rounded-xl p-4">
                      <h4 className="font-bold text-purple-700 mb-2">유아발달</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 신체/운동 발달</li>
                        <li>• 인지 발달 (피아제, 정보처리이론)</li>
                        <li>• 언어 발달</li>
                        <li>• 사회정서 발달 (애착, 자아개념)</li>
                      </ul>
                    </div>
                    <div className="border border-blue-200 rounded-xl p-4">
                      <h4 className="font-bold text-blue-700 mb-2">누리과정</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 2019 개정 누리과정의 이해</li>
                        <li>• 5개 영역 (신체운동건강, 의사소통, 사회관계, 예술경험, 자연탐구)</li>
                        <li>• 놀이중심 교육과정</li>
                        <li>• 유아 평가와 기록</li>
                      </ul>
                    </div>
                    <div className="border border-green-200 rounded-xl p-4">
                      <h4 className="font-bold text-green-700 mb-2">유아교과교육론</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 언어교육 (읽기, 쓰기 지도)</li>
                        <li>• 수학교육 (수 개념, 공간 개념)</li>
                        <li>• 과학교육 (탐구과정)</li>
                        <li>• 예술교육 (음악, 미술, 동작)</li>
                      </ul>
                    </div>
                    <div className="border border-orange-200 rounded-xl p-4">
                      <h4 className="font-bold text-orange-700 mb-2">교수학습방법</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 놀이지도 (자유놀이, 역할놀이, 구성놀이)</li>
                        <li>• 상호작용 (비계설정, 발문)</li>
                        <li>• 흥미영역 운영</li>
                        <li>• 일과운영 및 환경구성</li>
                      </ul>
                    </div>
                    <div className="border border-rose-200 rounded-xl p-4">
                      <h4 className="font-bold text-rose-700 mb-2">유아교육기관 운영</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 학급경영 및 생활지도</li>
                        <li>• 부모교육 및 가정연계</li>
                        <li>• 안전교육 및 건강관리</li>
                        <li>• 장학 및 평가</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 출제 경향 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">📊 최근 출제 경향</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-2">2019 개정 누리과정 중심 출제</h3>
                  <p className="text-gray-600 text-sm">
                    놀이중심 교육과정의 철학과 실천 방법, 교사의 역할(관찰자, 지원자, 기록자)에 대한 문항이
                    매년 다수 출제됩니다.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-2">통합적 문항 증가</h3>
                  <p className="text-gray-600 text-sm">
                    발달이론과 교수학습방법, 누리과정 영역과 평가 등 여러 영역을 통합한 문항이 증가하고 있습니다.
                    단순 암기보다 적용 능력을 평가합니다.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-900 mb-2">현장 사례 기반 문항</h3>
                  <p className="text-gray-600 text-sm">
                    유치원 현장의 구체적인 상황을 제시하고 적절한 교사의 대응, 상호작용, 환경구성 등을
                    묻는 문항이 많습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2차 시험 */}
        {activeTab === 'second' && (
          <div className="space-y-6">
            {/* 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2차 시험 개요</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-pink-50 rounded-xl p-4 text-center">
                  <p className="text-pink-600 text-sm mb-1">시험 유형</p>
                  <p className="text-xl font-bold text-pink-700">면접 + 수업실연</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <p className="text-purple-600 text-sm mb-1">평가 비중</p>
                  <p className="text-xl font-bold text-purple-700">1차:2차 = 7:3 ~ 5:5</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-blue-600 text-sm mb-1">대상</p>
                  <p className="text-xl font-bold text-blue-700">1차 합격자</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">※ 시·도교육청별로 세부 내용이 다를 수 있습니다.</p>
            </div>

            {/* 교직적성 심층면접 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🎤 교직적성 심층면접</h2>
                <button
                  onClick={() => handleAIHelp('교직적성 심층면접')}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition text-sm font-medium"
                >
                  🤖 AI 도움
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-sm">면접 시간</p>
                      <p className="font-bold">약 15~20분</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">면접 형태</p>
                      <p className="font-bold">개별 또는 집단</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">주요 평가 영역</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: '교직관 및 교육철학', desc: '유아교육에 대한 신념, 교사로서의 사명감', icon: '💡' },
                      { title: '인성 및 태도', desc: '성실성, 책임감, 긍정적 태도, 협동심', icon: '🤝' },
                      { title: '의사소통 능력', desc: '논리적 표현력, 경청, 공감 능력', icon: '💬' },
                      { title: '문제해결 능력', desc: '상황 판단력, 창의적 대안 제시', icon: '🧩' },
                      { title: '전문성', desc: '유아교육 지식, 현장 적용 능력', icon: '📚' },
                      { title: '교육 정책 이해', desc: '누리과정, 유아교육 정책 이해도', icon: '📋' }
                    ].map((item, index) => (
                      <div key={index} className="bg-pink-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{item.icon}</span>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">예상 질문 유형</h3>
                  <div className="space-y-2">
                    {[
                      '유치원 교사가 되고자 하는 이유는 무엇입니까?',
                      '놀이중심 교육과정에서 교사의 역할은 무엇이라고 생각합니까?',
                      '학부모가 자녀의 학습 진도에 대해 불만을 제기할 때 어떻게 대처하겠습니까?',
                      '유아 간 갈등 상황에서 교사로서 어떻게 개입하겠습니까?',
                      '다문화 유아를 위한 교육적 배려는 어떻게 해야 할까요?'
                    ].map((question, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 text-gray-700">
                        <span className="text-pink-500 font-bold mr-2">Q{index + 1}.</span>
                        {question}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 수업실연 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🎭 수업실연</h2>
                <button
                  onClick={() => handleAIHelp('수업실연')}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium"
                >
                  🤖 AI 도움
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-gray-500 text-sm">실연 시간</p>
                      <p className="font-bold">10~20분</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">준비 시간</p>
                      <p className="font-bold">약 30분</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">대상 연령</p>
                      <p className="font-bold">만 3~5세</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">수업실연 진행 과정</h3>
                  <div className="space-y-3">
                    {[
                      { step: '1', title: '주제 확인', desc: '지정된 누리과정 영역 및 활동 주제 확인' },
                      { step: '2', title: '지도안 작성', desc: '수업 지도안 작성 (약 30분)' },
                      { step: '3', title: '수업 실연', desc: '가상의 유아들을 대상으로 수업 시연' },
                      { step: '4', title: '질의응답', desc: '수업 관련 질문에 답변' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3">평가 기준</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { item: '수업 구성의 적절성', desc: '도입-전개-마무리 구성' },
                      { item: '발문 및 상호작용', desc: '개방형 발문, 유아 반응 수용' },
                      { item: '교수매체 활용', desc: '자료의 적절한 활용' },
                      { item: '유아 발달 고려', desc: '연령에 적합한 활동 수준' },
                      { item: '놀이중심 교육과정 반영', desc: '유아 주도성 존중' },
                      { item: '교사의 표현력', desc: '언어, 표정, 동작의 적절성' }
                    ].map((criterion, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-3">
                        <p className="font-medium text-purple-800">{criterion.item}</p>
                        <p className="text-sm text-purple-600">{criterion.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 수업실연 TIP */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-4">💡 수업실연 핵심 TIP</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">유아 수준의 언어 사용</p>
                      <p className="text-sm text-gray-600">쉽고 친근한 말투, 적절한 속도</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">가상 유아와 상호작용</p>
                      <p className="text-sm text-gray-600">유아의 대답을 상상하며 반응</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">놀이적 요소 포함</p>
                      <p className="text-sm text-gray-600">노래, 율동, 게임 등 활용</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">개방적 발문 활용</p>
                      <p className="text-sm text-gray-600">"왜 그렇게 생각해?", "어떻게 하면 좋을까?"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">밝은 표정과 제스처</p>
                      <p className="text-sm text-gray-600">유아의 관심을 끄는 표현력</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-500 mt-1">✓</span>
                    <div>
                      <p className="font-medium text-gray-900">시간 배분 연습</p>
                      <p className="text-sm text-gray-600">실연 시간 내 완료하도록 연습</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 구술면접 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">💬 구술면접</h2>
                <button
                  onClick={() => handleAIHelp('구술면접')}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                >
                  🤖 AI 도움
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  구술면접은 유아교육 관련 전문 지식과 현장 적용 능력을 종합적으로 평가합니다.
                  제시된 상황이나 자료를 바탕으로 구술 답변을 수행합니다.
                </p>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">주요 문제 유형</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-bold text-blue-800 mb-2">상황 제시형</h4>
                      <p className="text-sm text-gray-600">
                        유치원 현장의 구체적인 상황을 제시하고 교사로서의 대응 방안을 묻는 문항
                      </p>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <h4 className="font-bold text-indigo-800 mb-2">자료 분석형</h4>
                      <p className="text-sm text-gray-600">
                        관찰 기록, 포트폴리오 등 자료를 보고 분석하고 지도 방안을 제시하는 문항
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="font-bold text-purple-800 mb-2">개념 적용형</h4>
                      <p className="text-sm text-gray-600">
                        유아교육 이론이나 누리과정 개념을 현장에 적용하는 방안을 묻는 문항
                      </p>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-4">
                      <h4 className="font-bold text-pink-800 mb-2">갈등 해결형</h4>
                      <p className="text-sm text-gray-600">
                        유아 간 갈등, 학부모 민원 등 갈등 상황에서의 교사 역할을 묻는 문항
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/education/kindergarten-teacher"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-lg border"
          >
            ← 메인으로
          </Link>
          <Link
            href="/category/education/kindergarten-teacher/study/early-childhood-education"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-600 transition shadow-lg"
          >
            학습 시작하기 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-4 rounded-xl">
                {currentPrompt.slice(0, 100)}...
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-sm text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
