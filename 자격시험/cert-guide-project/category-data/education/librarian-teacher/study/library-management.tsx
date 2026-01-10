'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'library-theory',
    name: '도서관 경영 이론',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '도서관 경영의 개념과 특성을 설명하시오.', answer: '목표설정, 계획수립, 조직화, 지휘, 통제, 평가', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 경영의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 경영의 개념\n2. 경영 프로세스 (계획-조직-지휘-통제)\n3. 도서관 경영의 특수성\n4. 공공성과 효율성의 조화\n5. 최근 도서관 경영 트렌드\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도서관 경영 철학과 가치를 설명하시오.', answer: '이용자 중심, 평등한 접근, 지적자유, 정보공유', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 경영 철학과 가치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관의 사회적 사명\n2. 이용자 중심주의\n3. 지적 자유와 정보 접근권\n4. ALA의 도서관 권리선언\n5. 학교도서관 헌장\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도서관 조직 구조와 설계를 설명하시오.', answer: '기능별 조직, 팀제 조직, 매트릭스 조직, 네트워크 조직', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 조직 구조와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직 구조의 유형 (기능별, 팀제)\n2. 학교도서관 조직 구조\n3. 조직 설계 원리\n4. 사서교사의 역할과 책임\n5. 협력적 조직 문화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도서관 리더십과 동기부여를 설명하시오.', answer: '변혁적 리더십, 서번트 리더십, 내재적 동기, 외재적 동기', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 리더십과 동기부여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리더십 이론 (변혁적, 서번트)\n2. 도서관 관리자의 리더십 역할\n3. 직원 동기부여 전략\n4. 팀워크 강화 방안\n5. 학교도서관 운영위원회 리더십\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도서관 전략적 계획을 설명하시오.', answer: 'SWOT 분석, 미션·비전, 목표설정, 실행계획, 평가', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 전략적 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전략적 계획의 개념과 필요성\n2. 환경분석 (SWOT)\n3. 미션·비전·핵심가치 설정\n4. 목표 및 실행계획 수립\n5. 성과평가 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'hr-management',
    name: '인적자원 관리',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '도서관 인적자원관리의 개념을 설명하시오.', answer: '선발, 배치, 교육훈련, 평가, 보상, 경력개발', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 인적자원관리의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인적자원관리의 목적\n2. 채용 및 선발 과정\n3. 교육훈련 및 역량 개발\n4. 성과평가와 피드백\n5. 경력개발과 승진\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '사서의 전문성 개발을 설명하시오.', answer: '계속교육, 자기주도학습, 전문학습공동체, 학회활동', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 사서의 전문성 개발을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사서의 핵심 역량\n2. 계속교육의 필요성과 방법\n3. 전문학습공동체 (PLC)\n4. 학술활동 및 연구\n5. 사서교사 연수 프로그램\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도서관 자원봉사자 관리를 설명하시오.', answer: '모집, 교육, 배치, 슈퍼비전, 인정·보상', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 자원봉사자 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자원봉사자 활용의 의의\n2. 모집 및 선발 방법\n3. 오리엔테이션 및 교육\n4. 역할 배분과 슈퍼비전\n5. 학부모 도서관 자원봉사 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도서관 직원 평가제도를 설명하시오.', answer: '목표관리(MBO), 다면평가, 역량평가, 성과급', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 직원 평가제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직원평가의 목적\n2. 평가 방법 (MBO, 다면평가)\n3. 평가 기준 및 척도\n4. 평가 결과 활용\n5. 교원 평가와의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도서관 조직문화 형성을 설명하시오.', answer: '소통, 협력, 혁신, 학습조직, 성과지향', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 조직문화 형성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직문화의 개념과 중요성\n2. 바람직한 도서관 조직문화\n3. 의사소통 활성화\n4. 학습조직 구축\n5. 혁신과 변화 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'facility-budget',
    name: '시설·예산 관리',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '도서관 시설 계획을 설명하시오.', answer: '입지 선정, 공간 배치, 환경 디자인, 접근성', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 시설 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시설 계획의 원칙\n2. 공간 구성 (열람실, 서고, 사무실)\n3. 학교도서관 공간 기준\n4. 유니버설 디자인\n5. 학습공간 혁신 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도서관 예산 편성과 집행을 설명하시오.', answer: '예산 항목, 품목별 예산, 집행 절차, 결산', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 예산 편성과 집행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산의 종류와 편성 원칙\n2. 주요 예산 항목 (자료, 운영비)\n3. 예산 신청 및 확보 전략\n4. 집행 및 정산 절차\n5. 학교회계와의 연계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '장서 관리 시스템을 설명하시오.', answer: '도서관리 프로그램, RFID, 바코드, 서가 관리', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 장서 관리 시스템을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 자동화 시스템\n2. RFID와 바코드 기술\n3. 서가 배치 및 정리\n4. 장서점검(inventory)\n5. 클라우드 기반 도서관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도서관 설비 및 비품 관리를 설명하시오.', answer: 'ICT 장비, 가구, 보안 시스템, 유지보수', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 설비 및 비품 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ICT 장비 (PC, 프린터, 전자칠판)\n2. 서가 및 열람 가구\n3. 보안 시스템 (CCTV, 도난방지)\n4. 정기 점검 및 유지보수\n5. 메이커스페이스 장비 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도서관 안전 관리를 설명하시오.', answer: '재난대비, 소방, 위생, 개인정보보호, 매뉴얼', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 안전 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재난 및 비상사태 대응\n2. 화재 예방 및 소방 시설\n3. 위생 및 환경 관리\n4. 개인정보보호 및 보안\n5. 안전 매뉴얼 작성\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'marketing-pr',
    name: '마케팅 및 홍보',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '도서관 마케팅의 개념을 설명하시오.', answer: '4P(Product, Price, Place, Promotion), 이용자 세분화', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 마케팅의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 마케팅의 필요성\n2. 마케팅 4P 전략\n3. 목표 이용자 분석 및 세분화\n4. 도서관 브랜드 구축\n5. 학교도서관 마케팅 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도서관 홍보 전략을 설명하시오.', answer: '온·오프라인 홍보, SNS, 북큐레이션, 캠페인', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 홍보 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 홍보의 목적과 중요성\n2. 온라인 홍보 (웹사이트, SNS)\n3. 오프라인 홍보 (포스터, 리플릿)\n4. 독서캠페인 및 행사 홍보\n5. 학교 홈페이지·가정통신문 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이용자 관계 관리(CRM)를 설명하시오.', answer: '이용자 DB, 만족도 조사, 피드백, 커뮤니케이션', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 이용자 관계 관리(CRM)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CRM의 개념과 목적\n2. 이용자 데이터 수집 및 분석\n3. 맞춤형 서비스 제공\n4. 이용자 만족도 조사\n5. 학생·교사 의견 수렴 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '도서관 프로그램 기획 및 운영을 설명하시오.', answer: '요구분석, 기획, 실행, 평가, 개선', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 프로그램 기획 및 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로그램 요구 분석\n2. 기획 및 예산 수립\n3. 실행 및 진행 관리\n4. 참가자 모집 및 홍보\n5. 평가 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '도서관 디지털 마케팅을 설명하시오.', answer: 'SNS, 블로그, 유튜브, 이메일 뉴스레터, 앱', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 디지털 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SNS 마케팅 (인스타그램, 페이스북)\n2. 블로그 및 유튜브 콘텐츠\n3. 모바일 앱 서비스\n4. 이메일 뉴스레터\n5. 학급 단체 채팅방 활용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'evaluation',
    name: '도서관 평가',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '도서관 평가의 개념과 목적을 설명하시오.', answer: '성과 측정, 품질 개선, 책임성, 의사결정 지원', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 평가의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 평가의 정의\n2. 평가의 목적 (품질 개선, 책임성)\n3. 평가 유형 (투입·과정·산출·성과)\n4. 평가 주체 (자체평가, 외부평가)\n5. 학교도서관 평가인증제\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '도서관 성과지표를 설명하시오.', answer: '장서, 이용, 서비스, 만족도, ROI', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 성과지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성과지표의 개념과 종류\n2. 투입 지표 (장서, 예산, 인력)\n3. 과정 지표 (운영 시간, 프로그램)\n4. 산출 지표 (대출, 이용자 수)\n5. 성과 지표 (만족도, 학업성취)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '도서관 통계 수집 및 분석을 설명하시오.', answer: '장서 통계, 이용 통계, 대출 통계, 데이터 분석', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 도서관 통계 수집 및 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도서관 통계의 중요성\n2. 주요 통계 항목 (장서, 이용, 대출)\n3. 통계 수집 방법 및 도구\n4. 데이터 분석 및 시각화\n5. 국가도서관통계시스템\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '이용자 만족도 조사를 설명하시오.', answer: 'LibQUAL+, 설문조사, 인터뷰, FGI, 분석 방법', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 이용자 만족도 조사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 만족도 조사의 목적\n2. 조사 방법 (설문, 인터뷰, FGI)\n3. LibQUAL+ 모형\n4. 설문지 설계 및 실시\n5. 결과 분석 및 개선 방안 도출\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학교도서관 평가인증제를 설명하시오.', answer: '평가 영역, 지표, 절차, 인증 기준, 개선', prompt: '사서교사 임용시험 도서관경영 문제입니다.\n\n문제: 학교도서관 평가인증제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평가인증제의 목적과 배경\n2. 평가 영역 및 지표\n3. 평가 절차 및 방법\n4. 인증 등급 및 기준\n5. 평가 결과 활용 및 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function LibraryManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('librarian-teacher-library-management-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('librarian-teacher-library-management-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-blue-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/librarian-teacher" className="text-gray-600 hover:text-blue-600">사서교사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">도서관경영</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-gray-800">도서관경영 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">사서교사 임용시험 - 도서관 조직 운영과 관리</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-blue-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
