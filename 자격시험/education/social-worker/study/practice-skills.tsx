'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'communication-skills',
    name: '의사소통 기술',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '경청(Active Listening)의 기법과 중요성을 설명하시오.',
        answer: '집중, 반영, 명료화, 요약, 공감적 반응',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 경청(Active Listening)의 기법과 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 경청의 정의와 중요성
2. 집중하기(Attending)
3. 반영하기(Reflecting): 내용 반영, 감정 반영
4. 명료화(Clarification)
5. 요약(Summarizing)
6. 비언어적 경청 (눈 맞춤, 고개 끄덕임)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '질문 기법(개방형/폐쇄형)의 차이와 활용을 설명하시오.',
        answer: '개방형: 탐색, 폐쇄형: 구체적 정보, 상황별 활용',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 질문 기법(개방형/폐쇄형)의 차이와 활용을 설명하시오.

다음 순서로 설명해주세요:
1. 개방형 질문(Open-ended): 탐색, 상세한 답변
2. 폐쇄형 질문(Closed-ended): 구체적 정보, 예/아니오
3. 각 질문의 장단점
4. 면접 단계별 활용 (초기-중기-후기)
5. 유도 질문과 이중 질문 회피
6. 질문 기법 실습 예시

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '재진술(Paraphrasing)과 명료화(Clarification)를 설명하시오.',
        answer: '재진술: 내용 반영, 명료화: 모호함 구체화',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 재진술(Paraphrasing)과 명료화(Clarification)를 설명하시오.

다음 순서로 설명해주세요:
1. 재진술의 정의와 목적
2. 클라이언트 말을 자신의 언어로 표현
3. 명료화의 정의와 필요성
4. 모호한 내용을 구체화
5. 각 기법의 예시
6. 공감과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '직면(Confrontation) 기법의 원리와 주의사항을 설명하시오.',
        answer: '불일치 지적, 타이밍, 관계 기반, 공격 아님',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 직면(Confrontation) 기법의 원리와 주의사항을 설명하시오.

다음 순서로 설명해주세요:
1. 직면의 정의: 불일치 지적
2. 언어-비언어 불일치
3. 생각-감정-행동 불일치
4. 직면의 타이밍과 강도
5. 라포가 형성된 후 사용
6. 공격이 아닌 돕기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '해석(Interpretation) 기법과 통찰 촉진을 설명하시오.',
        answer: '무의식적 동기, 패턴 인식, 통찰, 신중한 사용',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 해석(Interpretation) 기법과 통찰 촉진을 설명하시오.

다음 순서로 설명해주세요:
1. 해석의 정의: 숨겨진 의미 제시
2. 무의식적 동기 탐색
3. 패턴과 주제 인식
4. 통찰(Insight) 촉진
5. 해석의 시기와 방법
6. 클라이언트 수용 확인

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'case-management',
    name: '사례관리',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '사례관리(Case Management)의 정의와 목적을 설명하시오.',
        answer: '복합적 욕구, 서비스 조정·연계, 지속성, 포괄적 지원',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 사례관리(Case Management)의 정의와 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 사례관리의 정의
2. 복합적 욕구를 가진 클라이언트
3. 서비스 조정과 연계
4. 지속성과 포괄성
5. 사례관리자의 역할
6. 일반 사회복지실천과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사례관리 과정(접수-사정-계획-개입-점검-종결)을 설명하시오.',
        answer: '접수→사정→계획→개입→점검(모니터링)→평가→종결',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 사례관리 과정(접수-사정-계획-개입-점검-종결)을 설명하시오.

다음 순서로 설명해주세요:
1. 접수와 스크리닝
2. 포괄적 사정
3. 서비스 계획 수립
4. 서비스 연계와 조정
5. 점검과 모니터링
6. 평가와 종결

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '자원 연계(Linkage)와 옹호(Advocacy)의 중요성을 설명하시오.',
        answer: '자원 연결, 접근성 증진, 권익 옹호, 장애물 제거',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 자원 연계(Linkage)와 옹호(Advocacy)의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 자원 연계의 정의와 목적
2. 공식·비공식 자원 발굴
3. 옹호의 정의: 권익 보호
4. 개별 옹호와 집단 옹호
5. 서비스 접근 장애물 제거
6. 사례관리자의 중개자·옹호자 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '통합사례관리와 슈퍼비전의 중요성을 설명하시오.',
        answer: '다기관 협력, 사례회의, 슈퍼비전, 소진 예방',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 통합사례관리와 슈퍼비전의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 통합사례관리의 개념
2. 다기관·다전문가 협력
3. 사례회의(Case Conference)
4. 슈퍼비전의 정의와 기능
5. 행정적·교육적·지지적 슈퍼비전
6. 사례관리자 소진 예방

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '사례관리에서 모니터링과 재사정의 중요성을 설명하시오.',
        answer: '지속적 점검, 변화 파악, 계획 수정, 서비스 질 관리',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 사례관리에서 모니터링과 재사정의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 모니터링의 정의와 목적
2. 서비스 제공 과정 점검
3. 클라이언트 상태 변화 파악
4. 재사정(Reassessment)
5. 계획 수정과 조정
6. 서비스 질 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'family-therapy',
    name: '가족치료',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '가족체계 이론과 가족 항상성(Homeostasis)을 설명하시오.',
        answer: '전체성, 순환성, 피드백, 항상성 유지',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 가족체계 이론과 가족 항상성(Homeostasis)을 설명하시오.

다음 순서로 설명해주세요:
1. 가족을 하나의 체계로 이해
2. 전체성: 부분의 합 이상
3. 순환적 인과관계
4. 피드백(긍정적, 부정적)
5. 항상성(Homeostasis): 균형 유지
6. 증상을 가진 사람(IP)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '구조적 가족치료의 주요 개념과 기법을 설명하시오.',
        answer: '미누친, 경계, 연합, 하위체계, 합류, 재구조화',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 구조적 가족치료의 주요 개념과 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 미누친(Minuchin)의 구조적 가족치료
2. 가족 구조: 경계, 연합, 권력
3. 하위체계: 부부, 부모-자녀, 형제
4. 경계: 명확, 경직, 밀착
5. 개입 기법: 합류(Joining), 재구조화(Restructuring)
6. 가족 조각(Family Sculpture)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '전략적 가족치료와 역설적 개입을 설명하시오.',
        answer: '헤일리, 문제해결, 역설적 지시, 증상처방',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 전략적 가족치료와 역설적 개입을 설명하시오.

다음 순서로 설명해주세요:
1. 헤일리(Haley)의 전략적 가족치료
2. 문제 중심, 단기 개입
3. 역설적 지시(Paradoxical Intervention)
4. 증상 처방(Symptom Prescription)
5. 재명명(Reframing)
6. 저항 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '경험적 가족치료와 사티어(Satir)의 의사소통 유형을 설명하시오.',
        answer: '회유형, 비난형, 초이성형, 산만형, 일치형',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 경험적 가족치료와 사티어(Satir)의 의사소통 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 사티어의 경험적 가족치료
2. 역기능적 의사소통 유형
3. 회유형(Placating), 비난형(Blaming)
4. 초이성형(Computing), 산만형(Distracting)
5. 일치형(Congruent): 기능적 의사소통
6. 가족 조각과 역할극

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '해결중심 단기가족치료의 기법을 설명하시오.',
        answer: '예외질문, 기적질문, 척도질문, 강점 관점',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 해결중심 단기가족치료의 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 해결중심(Solution-Focused) 접근
2. 문제 아닌 해결에 초점
3. 예외질문: 문제 없을 때
4. 기적질문(Miracle Question)
5. 척도질문(Scaling Question)
6. 강점과 자원 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'group-work',
    name: '집단 대상 실천',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '집단 대상 실천(Group Work)의 목적과 장점을 설명하시오.',
        answer: '상호원조, 보편성, 집단 역동, 비용 효과적',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 집단 대상 실천(Group Work)의 목적과 장점을 설명하시오.

다음 순서로 설명해주세요:
1. 집단 대상 실천의 정의
2. 상호원조 체계(Mutual Aid System)
3. 보편성(Universality): 혼자가 아님
4. 집단 역동(Group Dynamics)
5. 비용 효과성
6. 개별 실천과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '집단 발달 단계(준비-초기-중기-종결)를 설명하시오.',
        answer: '준비→초기(형성)→중기(작업)→종결',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 집단 발달 단계(준비-초기-중기-종결)를 설명하시오.

다음 순서로 설명해주세요:
1. 준비 단계: 계획, 모집, 구성
2. 초기 단계: 신뢰 형성, 규범 수립
3. 중기 단계: 갈등, 응집력, 작업
4. 종결 단계: 평가, 분리
5. 각 단계별 리더의 역할
6. 터크만(Tuckman)의 5단계 모델

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '집단 응집력(Cohesion)과 집단 규범(Norms)을 설명하시오.',
        answer: '응집력: 결속력, 규범: 행동 기준',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 집단 응집력(Cohesion)과 집단 규범(Norms)을 설명하시오.

다음 순서로 설명해주세요:
1. 응집력(Cohesion)의 정의: 우리감
2. 응집력 형성 요인
3. 높은 응집력의 효과
4. 집단 규범(Norms)의 정의
5. 규범 수립과 유지
6. 역기능적 규범 다루기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '집단 리더의 역할과 리더십 유형을 설명하시오.',
        answer: '촉진자, 모델, 권위적-민주적-자유방임',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 집단 리더의 역할과 리더십 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 집단 리더의 역할: 촉진자, 모델
2. 권위적(Authoritarian) 리더십
3. 민주적(Democratic) 리더십
4. 자유방임(Laissez-faire) 리더십
5. 상황에 따른 리더십 선택
6. 공동 리더십(Co-leadership)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '집단 내 문제 상황(독점, 침묵, 하위집단) 다루기를 설명하시오.',
        answer: '독점자 제한, 침묵자 격려, 하위집단 통합',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 집단 내 문제 상황(독점, 침묵, 하위집단) 다루기를 설명하시오.

다음 순서로 설명해주세요:
1. 독점자(Monopolizer) 다루기
2. 침묵하는 성원 격려
3. 하위집단(Subgroup) 형성 대응
4. 스케이프고트(Scapegoat) 보호
5. 갈등 조정과 중재
6. 이탈 방지 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'specialized-intervention',
    name: '특수 개입 기법',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '동기강화상담(Motivational Interviewing)의 원리와 기법을 설명하시오.',
        answer: '양가감정, 변화동기, 공감, 불일치 확대, OARS',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 동기강화상담(Motivational Interviewing)의 원리와 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 동기강화상담의 정의와 목적
2. 양가감정(Ambivalence) 다루기
3. 변화동기 강화
4. 불일치 확대(Discrepancy)
5. OARS 기법: Open questions, Affirmation, Reflective listening, Summarizing
6. 중독 분야 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '인지행동치료(CBT) 기법을 설명하시오.',
        answer: '자동적 사고, 인지왜곡, 인지재구조화, 행동실험',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 인지행동치료(CBT) 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 인지행동치료의 기본 가정
2. 자동적 사고(Automatic Thoughts) 포착
3. 인지왜곡 확인
4. 인지재구조화(Cognitive Restructuring)
5. 행동실험(Behavioral Experiment)
6. 우울·불안 개입

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '마음챙김(Mindfulness) 기반 개입을 설명하시오.',
        answer: '현재 순간 자각, 비판단적 수용, 호흡, MBSR, MBCT',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 마음챙김(Mindfulness) 기반 개입을 설명하시오.

다음 순서로 설명해주세요:
1. 마음챙김의 정의: 현재 순간 자각
2. 비판단적 수용
3. 호흡 명상과 신체 스캔
4. MBSR(Mindfulness-Based Stress Reduction)
5. MBCT(Mindfulness-Based Cognitive Therapy)
6. 스트레스·우울 재발 예방

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '트라우마 치료 기법(EMDR, TF-CBT)을 설명하시오.',
        answer: 'EMDR: 안구운동, TF-CBT: 노출·인지치료',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 트라우마 치료 기법(EMDR, TF-CBT)을 설명하시오.

다음 순서로 설명해주세요:
1. PTSD와 트라우마의 이해
2. EMDR(Eye Movement Desensitization and Reprocessing)
3. 안구운동과 정보처리
4. TF-CBT(Trauma-Focused CBT)
5. 단계적 노출과 인지재구조화
6. 안정화-트라우마 처리-통합

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '놀이치료와 미술치료의 적용을 설명하시오.',
        answer: '아동 대상, 비언어적 표현, 투사, 치료적 관계',
        prompt: `사회복지사 1급 사회복지실천기술론 문제입니다.

문제: 놀이치료와 미술치료의 적용을 설명하시오.

다음 순서로 설명해주세요:
1. 놀이치료: 아동의 자연스러운 언어
2. 놀이를 통한 감정 표현과 카타르시스
3. 미술치료: 비언어적 표현 매체
4. 그림을 통한 투사와 통찰
5. 치료적 관계 형성
6. 학대·트라우마 아동 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function PracticeSkillsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-practice-skills-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('social-worker-practice-skills-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/education/social-worker" className="text-gray-600 hover:text-pink-600">사회복지사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">사회복지실천기술론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🤝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">사회복지실천기술론 학습</h1>
                <p className="text-pink-100">사회복지사 1급 - 사회복지실천 영역</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-pink-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
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
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
