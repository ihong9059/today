'use client';

import { useState } from 'react';

export default function InformationManagementProExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-violet-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-violet-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/information-management-pro" className="text-gray-600 hover:text-violet-600">정보관리기술사</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">{activeTab === 'written' ? '필기시험' : '면접시험'}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">정보관리기술사 시험 상세</h1>
              <p className="text-violet-100">Professional Engineer Information Management - 최고급 IT 전문자격</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex">
            <button onClick={() => setActiveTab('written')} className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'written' ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>📝 필기시험</button>
            <button onClick={() => setActiveTab('interview')} className={`px-6 py-4 font-medium text-sm border-b-2 transition ${activeTab === 'interview' ? 'border-violet-500 text-violet-600 bg-violet-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>🎤 면접시험</button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? <WrittenExamContent /> : <InterviewExamContent />}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}

function WrittenExamContent() {
  const subjects = [
    { id: 1, name: '데이터 아키텍처', topics: ['데이터 모델링', '데이터베이스 설계', '빅데이터 아키텍처', '데이터 품질 관리', 'NoSQL/NewSQL'], color: 'violet', studyLink: '/category/it/information-management-pro/study/data-architecture' },
    { id: 2, name: '소프트웨어 공학', topics: ['개발 방법론', '아키텍처 패턴', '품질 관리', '프로젝트 관리', 'DevOps/MLOps'], color: 'purple', studyLink: '/category/it/information-management-pro/study/sw-engineering' },
    { id: 3, name: 'IT 전략/거버넌스', topics: ['EA(Enterprise Architecture)', 'IT 거버넌스', 'ITSM/ITIL', '디지털 전환', 'IT 투자 관리'], color: 'indigo', studyLink: '/category/it/information-management-pro/study/it-strategy' },
    { id: 4, name: '신기술 동향', topics: ['클라우드 컴퓨팅', 'AI/머신러닝', '블록체인', '보안 기술', 'IoT/엣지 컴퓨팅'], color: 'blue', studyLink: '/category/it/information-management-pro/study/emerging-tech' }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📝 필기시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-violet-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-violet-600">단답형+서술형</div><div className="text-sm text-gray-600">시험 유형</div></div>
          <div className="bg-purple-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-purple-600">4시간</div><div className="text-sm text-gray-600">시험 시간</div></div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-indigo-600">100점 만점</div><div className="text-sm text-gray-600">배점</div></div>
          <div className="bg-blue-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-blue-600">60점 이상</div><div className="text-sm text-gray-600">합격 기준</div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 구성</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-violet-600 mb-2">1교시 - 단답형 (100분)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 10~13문제 중 10문제 선택</li>
              <li>• 각 문제당 10점 배점</li>
              <li>• 핵심 개념을 간결하게 설명</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-purple-600 mb-2">2교시 - 서술형 (100분)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 4~6문제 중 4문제 선택</li>
              <li>• 각 문제당 25점 배점</li>
              <li>• 심층적인 분석과 논술 요구</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">📚 출제 분야별 상세</h2>
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className={`bg-${subject.color}-500 text-white px-6 py-4`}>
              <span className="font-bold text-lg">{subject.name}</span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">📌 주요 토픽</h4>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic, idx) => (
                    <span key={idx} className={`px-3 py-1 bg-${subject.color}-100 text-${subject.color}-700 rounded-full text-sm`}>{topic}</span>
                  ))}
                </div>
              </div>
              <a href={subject.studyLink} className={`inline-flex items-center gap-2 px-4 py-2 bg-${subject.color}-100 text-${subject.color}-700 rounded-lg hover:bg-${subject.color}-200 transition`}>📖 학습하기 →</a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">💡 합격 전략</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-violet-600 mb-2">단답형 전략</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 정의 → 특징 → 장단점 순서로 구조화</li>
              <li>• 핵심 키워드 중심 간결한 서술</li>
              <li>• 최신 기술 트렌드 숙지 필수</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-2">서술형 전략</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 서론-본론-결론 체계적 구성</li>
              <li>• 실무 사례와 경험 연계</li>
              <li>• 도표/다이어그램 활용</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function InterviewExamContent() {
  const interviewTopics = [
    { category: '기술 심층 질문', icon: '💻', topics: ['필기시험 답안 검증', '기술적 깊이 확인', '실무 적용 능력', '문제 해결 접근법'] },
    { category: '프로젝트 경험', icon: '📂', topics: ['주요 프로젝트 설명', '역할과 기여도', '어려움 극복 사례', '성과와 교훈'] },
    { category: '리더십/관리', icon: '👔', topics: ['팀 관리 경험', '이해관계자 조정', '기술 의사결정', '후배 육성'] },
    { category: '최신 동향', icon: '🔮', topics: ['기술 트렌드 전망', '산업 변화 대응', '지속적 학습 방법', '전문가로서 비전'] }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎤 면접시험 개요</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-violet-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-violet-600">구술형</div><div className="text-sm text-gray-600">시험 유형</div></div>
          <div className="bg-purple-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-purple-600">15~30분</div><div className="text-sm text-gray-600">면접 시간</div></div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-indigo-600">100점 만점</div><div className="text-sm text-gray-600">배점</div></div>
          <div className="bg-blue-50 p-4 rounded-lg text-center"><div className="text-2xl font-bold text-blue-600">60점 이상</div><div className="text-sm text-gray-600">합격 기준</div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📋 평가 항목</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-violet-600 mb-2">기술적 역량 (40%)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 전문 지식의 깊이와 정확성</li>
              <li>• 기술 적용 및 응용 능력</li>
              <li>• 최신 기술 동향 파악</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-purple-600 mb-2">경험 및 실무 (30%)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 프로젝트 수행 경험</li>
              <li>• 문제 해결 사례</li>
              <li>• 실무 적용 능력</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-indigo-600 mb-2">의사소통 (15%)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 논리적 설명 능력</li>
              <li>• 질문 이해 및 답변 적절성</li>
              <li>• 전문가다운 태도</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-blue-600 mb-2">품위 및 자질 (15%)</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 기술사로서의 윤리의식</li>
              <li>• 사회적 책임감</li>
              <li>• 지속적 발전 의지</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {interviewTopics.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><span className="text-2xl">{section.icon}</span>{section.category}</h3>
            <ul className="space-y-2">{section.topics.map((topic, tIdx) => (<li key={tIdx} className="flex items-center gap-2 text-sm text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>{topic}</li>))}</ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">💡 면접 합격 전략</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-violet-600 mb-2">사전 준비</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 필기 답안 복기 및 보완</li>
              <li>• 경력 기술서 숙지</li>
              <li>• 예상 질문 답변 준비</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-2">면접 중</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 자신감 있는 태도</li>
              <li>• 구조화된 답변</li>
              <li>• 모르면 솔직히 인정</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-indigo-600 mb-2">핵심 포인트</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 실무 경험 구체적 설명</li>
              <li>• 기술사 역할 인식</li>
              <li>• 전문가적 비전 제시</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href="/category/it/information-management-pro/study/practical" className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition font-bold">🎯 면접 대비 학습 →</a>
      </div>
    </div>
  );
}
