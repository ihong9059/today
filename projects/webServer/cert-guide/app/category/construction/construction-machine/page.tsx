'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConstructionMachineEngineerPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const sections = [
    {
      title: "1. 자격증 개요",
      content: `건설기계기사는 건설기계의 설계, 제작, 정비 및 운영에 관한 전문 기술인력을 양성하기 위한 국가기술자격입니다.

주요 업무:
• 굴삭기, 불도저, 로더, 크레인 등 건설기계 설계
• 건설기계 생산 및 제조 공정 관리
• 건설기계 정비 및 품질관리
• 건설현장 기계설비 운영 및 관리
• 건설기계 안전관리 및 기술지도

건설산업의 기계화가 가속화되면서 건설기계 전문 기술인력에 대한 수요가 꾸준히 증가하고 있습니다.`
    },
    {
      title: "2. 시험 정보",
      content: `시험 구성:
• 필기시험: 4과목, 과목당 20문항 (총 80문항)
• 실기시험: 필답형 (약 2시간 30분)

필기시험 과목:
1. 건설기계기관 (디젤·가솔린기관)
2. 건설기계섀시 (동력전달·주행·제동장치)
3. 건설기계유압 (유압회로·장치)
4. 건설기계전기·안전관리

합격 기준:
• 필기: 과목당 40점 이상, 전 과목 평균 60점 이상
• 실기: 60점 이상

응시 자격:
• 관련학과 졸업(예정)자
• 기사 수준의 훈련과정 이수자
• 산업기사 + 실무경력 1년
• 실무경력 4년 이상`
    },
    {
      title: "3. 출제 기준 및 경향",
      content: `최근 출제 경향:

건설기계기관:
• 디젤기관의 연소 및 성능 특성
• 연료분사장치 및 과급기 원리
• 기관 정비 및 고장진단

건설기계섀시:
• 동력전달장치 구조와 작동원리
• 조향장치 및 제동장치
• 주행장치(무한궤도, 타이어) 특성

건설기계유압:
• 유압펌프, 밸브, 실린더 작동원리
• 유압회로 해석 및 설계
• 유압기기 정비 및 고장진단

전기·안전관리:
• 시동장치, 충전장치, 조명장치
• 건설기계 안전기준 및 관계법규
• 안전점검 및 재해예방`
    },
    {
      title: "4. 과목별 학습 전략",
      content: `건설기계기관 (30% 비중):
• 4행정 디젤기관의 작동원리 이해
• 연료분사펌프, 노즐 구조 암기
• 기관 성능계산 문제 연습
• 과급기 종류와 특성 비교

건설기계섀시 (25% 비중):
• 토크컨버터, 변속기 작동원리
• 조향장치 종류 및 특성
• 제동장치 구조와 제동력 계산
• 무한궤도 구조와 장력조절

건설기계유압 (30% 비중):
• 유압기본공식 (압력, 유량, 동력)
• 유압펌프 종류와 특성
• 방향제어밸브, 압력제어밸브 구조
• 유압회로도 해석 능력

전기·안전관리 (15% 비중):
• 축전지 용량계산 및 관리
• 건설기계 안전기준 숙지
• 정기검사 항목 및 기준`
    },
    {
      title: "5. 필기시험 준비",
      content: `추천 학습 방법:

1단계 - 기초 이론 학습 (4주):
• 기본서로 전 과목 이론 학습
• 기계공학 기초(역학, 유체역학) 복습
• 핵심 공식 및 원리 정리노트 작성

2단계 - 과목별 심화 (4주):
• 기관: 디젤기관 구조와 작동 집중
• 섀시: 동력전달 경로 체계적 이해
• 유압: 회로도 해석 반복 연습
• 전기·안전: 법규 및 안전기준 암기

3단계 - 기출문제 풀이 (3주):
• 최근 5년 기출문제 3회 이상 반복
• 오답노트 작성 및 취약점 보완
• 계산문제 풀이 속도 향상

4단계 - 실전 모의고사 (1주):
• 실전과 동일한 환경에서 모의시험
• 시간 배분 연습 (과목당 30분)
• 최종 핵심내용 암기`
    },
    {
      title: "6. 실기시험 준비",
      content: `실기시험 유형:
• 필답형 (주관식)
• 계산문제 및 서술형 문제 출제
• 시험시간: 약 2시간 30분

주요 출제 영역:
• 건설기계 설계 및 제도
• 유압회로 설계 및 해석
• 기관 성능 계산
• 건설기계 정비 및 고장진단
• 안전관리 및 품질관리

합격 전략:
• 계산문제: 공식 유도과정 포함 서술
• 서술형: 핵심 키워드 포함 답안 작성
• 도면해석: 유압회로도 기호 완벽 숙지
• 단위환산: SI단위 계산 정확히`
    },
    {
      title: "7. 핵심 암기 사항",
      content: `중요 공식:
• 출력 P = (2πNT)/60 [W]
• 유량 Q = A × v [m³/s]
• 유압동력 L = P × Q [W]
• 실린더 추력 F = P × A [N]
• 제동거리 S = v²/2μg [m]

핵심 수치:
• 디젤기관 압축비: 15~22:1
• 유압유 점도: 32~68 cSt (40°C)
• 작동유 온도: 40~60°C 최적
• 안전밸브 설정압력: 정격+10~15%

주요 기호:
• P: 압력, Q: 유량, T: 토크
• η: 효율, ρ: 밀도
• A: 면적, v: 속도`
    },
    {
      title: "8. 자주 틀리는 유형",
      content: `주의해야 할 포인트:

1. 단위 환산 실수:
• kW ↔ PS (마력) 환산
• MPa ↔ kgf/cm² 환산
• L/min ↔ m³/s 환산

2. 유압회로 해석:
• 직렬/병렬 회로 구분
• 압력손실 계산 시 마찰계수 적용
• 실린더 전진/후진 속도 차이

3. 기관 관련:
• 2행정/4행정 출력 차이
• 연료분사 시기 진각/지각 효과
• 과급기 서지(surge) 현상

4. 섀시 관련:
• 토크컨버터 스톨 상태
• 조향각과 선회반경 관계
• 제동 시 하중이동 현상`
    },
    {
      title: "9. 취업 및 진로",
      content: `주요 취업 분야:

건설기계 제조업체:
• 두산인프라코어, 현대건설기계
• 볼보건설기계, 캐터필라
• 설계, 생산, 품질관리 부서

건설회사:
• 대형 건설사 기계설비팀
• 플랜트 건설사 기계부서
• 건설기계 운영 및 관리

정비 및 서비스:
• 건설기계 정비업체
• 렌탈 및 리스 업체
• A/S 및 기술지원

연봉 수준 (경력별):
• 신입: 3,000~3,500만원
• 3년차: 3,800~4,500만원
• 7년차 이상: 5,000만원 이상

자격 활용:
• 건설기계 제작·정비업 기술인력
• 건설현장 기계설비 관리자
• 건설기계 검사원`
    },
    {
      title: "10. 관련 자격증",
      content: `상위 자격:
• 건설기계기술사: 최고급 기술자격
• 기계기술사: 기계분야 최상위

동급 자격:
• 일반기계기사: 일반 기계 설계·제작
• 자동차정비기사: 자동차 정비 전문
• 메카트로닉스기사: 기계+전자 융합

하위/연관 자격:
• 건설기계정비기능사: 정비 실무
• 굴삭기운전기능사: 장비 운전
• 지게차운전기능사: 지게차 운전

추천 취득 순서:
1. 건설기계기사 (기본)
2. 굴삭기/지게차 운전면허 (실무)
3. 건설기계기술사 (전문가)`
    },
    {
      title: "11. 학습 자료",
      content: `추천 교재:
• 건설기계기사 필기 (성안당)
• 건설기계기사 실기 (예문사)
• 건설기계정비 실무 (일진사)

온라인 학습:
• 한국산업인력공단 큐넷
• 유튜브 건설기계 강의
• 네이버 카페 수험생 커뮤니티

실습 방법:
• 건설기계 정비학원 실습
• 건설현장 견학 및 체험
• 유압장비 시뮬레이터 활용

참고 자료:
• 건설기계관리법령집
• KS규격 (건설기계 관련)
• 제조사 정비매뉴얼`
    }
  ];

  const subjects = [
    { name: "건설기계기관", path: "internal-combustion", icon: "🔧", desc: "디젤·가솔린 기관 구조와 작동원리" },
    { name: "건설기계섀시", path: "machine-design", icon: "⚙️", desc: "동력전달·주행·제동장치" },
    { name: "건설기계유압", path: "hydraulics", icon: "💧", desc: "유압회로 및 유압장치" },
    { name: "재료역학", path: "material-mechanics", icon: "🔩", desc: "응력, 변형률, 재료강도" },
    { name: "실기(필답형)", path: "practical", icon: "📝", desc: "설계, 정비, 고장진단 실무" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/construction" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>건설 분야로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🏗️</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">건설기계기사</h1>
              <p className="text-gray-600">Construction Machinery Engineer</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">국가기술자격</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">한국산업인력공단</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">기사</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link href="/category/construction/construction-machine/exam" className="block p-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <h3 className="font-bold text-lg">시험 정보</h3>
                <p className="text-yellow-100 text-sm">일정, 과목, 합격기준</p>
              </div>
            </div>
          </Link>
          <div className="p-6 bg-white rounded-xl border-2 border-yellow-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-bold text-lg text-gray-800">합격률</h3>
                <p className="text-gray-600 text-sm">필기 45% / 실기 55%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>과목별 학습하기</span>
          </h2>
          <div className="grid gap-3">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/construction/construction-machine/study/${subject.path}`}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-all border border-yellow-200"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.desc}</p>
                </div>
                <span className="text-yellow-500">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📖</span>
              <span>자격증 상세 정보</span>
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{section.title}</span>
                  <span className={`transform transition-transform ${openSection === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 합격 TIP</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 유압회로 해석 문제가 실기에서 자주 출제됩니다 - 기호 완벽 숙지</li>
            <li>• 디젤기관 연료분사장치 구조와 원리는 필수 암기 항목입니다</li>
            <li>• 계산문제는 단위환산에서 실수하지 않도록 주의하세요</li>
            <li>• 건설기계 안전기준과 정기검사 항목을 꼼꼼히 학습하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
