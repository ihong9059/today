'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReadingStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toeic-reading-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('toeic-reading-completed', JSON.stringify([...newCompleted]));
  };

  const toggleItem = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedItems(newCompleted);
    saveProgress(newCompleted);
  };

  const toggleTopic = (index: number) => {
    const newOpen = new Set(openTopics);
    if (newOpen.has(index)) newOpen.delete(index);
    else newOpen.add(index);
    setOpenTopics(newOpen);
  };

  const openAIHelper = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "Part 5: 품사 문제 (Word Forms)",
      items: [
        { id: "1-1", question: "명사 자리: 관사(a/the) 뒤, 전치사 뒤, 소유격 뒤에 명사가 오는 패턴", prompt: "TOEIC Part 5 명사 자리 문제입니다.\n\n명사가 들어갈 자리를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 관사 뒤 명사 규칙\n2. 전치사 뒤 명사 규칙\n3. 소유격 뒤 명사 규칙\n4. 자주 출제되는 예문 10개\n5. 명사 어미 (-tion, -ment, -ness 등)" },
        { id: "1-2", question: "동사 자리: 주어 뒤, 조동사 뒤에 동사가 필요한 패턴 파악", prompt: "TOEIC Part 5 동사 자리 문제입니다.\n\n동사가 들어갈 자리를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 주어 + 동사 구조\n2. 조동사 + 동사원형\n3. to + 동사원형\n4. 자주 출제되는 예문 10개\n5. 주의할 동사 형태" },
        { id: "1-3", question: "형용사 자리: 명사 앞, be동사 뒤, 보어 자리에서의 형용사 사용", prompt: "TOEIC Part 5 형용사 자리 문제입니다.\n\n형용사가 들어갈 자리를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 명사 수식 위치\n2. 보어로서의 형용사\n3. 형용사 어미 (-ive, -ful, -able 등)\n4. 자주 출제되는 예문 10개\n5. 분사형 형용사 (v-ing vs v-ed)" },
        { id: "1-4", question: "부사 자리: 동사/형용사/문장 수식, 부사의 다양한 위치", prompt: "TOEIC Part 5 부사 자리 문제입니다.\n\n부사가 들어갈 자리를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 동사 수식 부사 위치\n2. 형용사 수식 부사 위치\n3. 문장 수식 부사 위치\n4. 부사 어미 (-ly)\n5. 자주 출제되는 예문 10개" },
        { id: "1-5", question: "혼동하기 쉬운 품사: late/lately, hard/hardly, near/nearly 구분", prompt: "TOEIC Part 5 혼동 품사 문제입니다.\n\n형태가 비슷하지만 의미가 다른 품사를 구분하세요.\n\n포함 내용:\n1. late vs lately\n2. hard vs hardly\n3. near vs nearly\n4. high vs highly\n5. 각각의 예문과 의미 차이" },
        { id: "1-6", question: "복합명사 vs 형용사+명사: customer satisfaction, safety regulations 패턴", prompt: "TOEIC Part 5 복합명사 문제입니다.\n\n복합명사와 형용사+명사 구조를 구분하세요.\n\n포함 내용:\n1. 복합명사의 특징\n2. 형용사+명사 구조\n3. 자주 나오는 복합명사 30개\n4. 출제 패턴과 예문" },
        { id: "1-7", question: "파생어 패턴: success/successful/successfully 같은 어족 완전 정복", prompt: "TOEIC Part 5 파생어 문제입니다.\n\n한 단어에서 파생된 품사별 형태를 학습하세요.\n\n포함 내용:\n1. 자주 나오는 파생어 20세트\n2. 품사별 어미 규칙\n3. 문맥에서 품사 판단법\n4. 실전 예문과 해설" },
        { id: "1-8", question: "동명사 vs to부정사 vs 명사: '~하는 것'을 표현하는 세 가지 방법", prompt: "TOEIC Part 5 동명사/to부정사/명사 구분입니다.\n\n목적어/주어 자리에서 세 형태를 구분하세요.\n\n포함 내용:\n1. 동명사만 목적어로 취하는 동사\n2. to부정사만 목적어로 취하는 동사\n3. 둘 다 가능한 동사\n4. 명사로 대체 가능한 경우" },
        { id: "1-9", question: "분사 형용사: interesting vs interested, confusing vs confused 구분", prompt: "TOEIC Part 5 분사 형용사 문제입니다.\n\n현재분사(-ing)와 과거분사(-ed) 형용사를 구분하세요.\n\n포함 내용:\n1. -ing 형용사의 의미\n2. -ed 형용사의 의미\n3. 자주 나오는 분사 형용사 쌍 15개\n4. 주어에 따른 선택 방법" },
        { id: "1-10", question: "품사 문제 30초 풀이법: 빈칸 전후만 보고 빠르게 판단하기", prompt: "TOEIC Part 5 품사 문제 속풀이법입니다.\n\n품사 문제를 30초 안에 푸는 방법을 알려주세요.\n\n포함 내용:\n1. 빈칸 전후 확인 순서\n2. 품사별 판단 단서\n3. 시간 단축 전략\n4. 실전 연습 10문제" }
      ]
    },
    {
      title: "Part 5: 문법 문제 (Grammar)",
      items: [
        { id: "2-1", question: "시제 문제: 현재/과거/미래/완료 시제 선택 기준", prompt: "TOEIC Part 5 시제 문제입니다.\n\n문맥에 맞는 시제를 선택하는 방법을 알려주세요.\n\n포함 내용:\n1. 시간 부사와 시제 매칭\n2. 현재완료 vs 과거시제\n3. 미래시제 표현들\n4. 자주 출제되는 시제 문제 10개" },
        { id: "2-2", question: "태 문제: 능동태 vs 수동태 선택, by + 행위자 패턴", prompt: "TOEIC Part 5 태 문제입니다.\n\n능동태와 수동태를 구분하는 방법을 알려주세요.\n\n포함 내용:\n1. 수동태 형성 규칙\n2. 수동태 사용 상황\n3. by + 행위자 유무\n4. 자주 출제되는 예문 10개" },
        { id: "2-3", question: "주어-동사 수일치: 단수/복수 주어에 따른 동사 형태", prompt: "TOEIC Part 5 수일치 문제입니다.\n\n주어와 동사의 수일치 규칙을 알려주세요.\n\n포함 내용:\n1. 단수 주어 + 단수 동사\n2. 복수 주어 + 복수 동사\n3. 헷갈리는 주어 (each, every, neither 등)\n4. 삽입구가 있는 경우" },
        { id: "2-4", question: "관계대명사: who, which, that, whose의 선택 기준", prompt: "TOEIC Part 5 관계대명사 문제입니다.\n\n관계대명사 선택 기준을 알려주세요.\n\n포함 내용:\n1. who vs which vs that\n2. whose의 용법\n3. 관계대명사 생략 가능 조건\n4. 자주 출제되는 예문 10개" },
        { id: "2-5", question: "접속사 vs 전치사: although vs despite, because vs because of", prompt: "TOEIC Part 5 접속사/전치사 구분입니다.\n\n접속사와 전치사를 구분하는 방법을 알려주세요.\n\n포함 내용:\n1. 접속사 + 주어 + 동사\n2. 전치사 + 명사(구)\n3. 자주 혼동하는 쌍 10개\n4. 실전 예문과 해설" },
        { id: "2-6", question: "가정법: if절의 시제와 주절의 조동사 조합", prompt: "TOEIC Part 5 가정법 문제입니다.\n\n가정법 문장 구조를 알려주세요.\n\n포함 내용:\n1. 가정법 현재\n2. 가정법 과거\n3. 가정법 과거완료\n4. if 생략 도치 구문" },
        { id: "2-7", question: "비교급/최상급: more, most, as...as, the + 비교급 패턴", prompt: "TOEIC Part 5 비교급/최상급 문제입니다.\n\n비교 표현을 완벽히 정리하세요.\n\n포함 내용:\n1. 비교급 형성 규칙\n2. 최상급 형성 규칙\n3. 원급 비교 (as...as)\n4. 불규칙 비교급/최상급" },
        { id: "2-8", question: "to부정사 vs 동명사: remember, forget, stop 뒤 의미 변화", prompt: "TOEIC Part 5 to부정사/동명사 문제입니다.\n\n동사 뒤에 오는 형태에 따른 의미 변화를 알려주세요.\n\n포함 내용:\n1. remember to do vs doing\n2. forget to do vs doing\n3. stop to do vs doing\n4. 기타 의미 변화 동사" },
        { id: "2-9", question: "대명사: 인칭/지시/부정/재귀 대명사 선택 기준", prompt: "TOEIC Part 5 대명사 문제입니다.\n\n다양한 대명사의 선택 기준을 알려주세요.\n\n포함 내용:\n1. 인칭대명사 격 변화\n2. 지시대명사 (this, that, those)\n3. 부정대명사 (one, another, other)\n4. 재귀대명사 (-self)" },
        { id: "2-10", question: "도치 구문: 부정어 도치, so/neither 도치, there/here 도치", prompt: "TOEIC Part 5 도치 문제입니다.\n\n도치 구문의 유형과 형태를 알려주세요.\n\n포함 내용:\n1. 부정어 도치 (Never, Hardly 등)\n2. so/neither 도치\n3. 장소 부사 도치\n4. 실전 예문 10개" }
      ]
    },
    {
      title: "Part 5: 어휘 문제 (Vocabulary)",
      items: [
        { id: "3-1", question: "비즈니스 필수 어휘: 회의, 계약, 마케팅 관련 핵심 단어", prompt: "TOEIC Part 5 비즈니스 어휘입니다.\n\n회의, 계약, 마케팅 관련 필수 어휘를 알려주세요.\n\n포함 내용:\n1. 회의 관련 어휘 20개\n2. 계약 관련 어휘 20개\n3. 마케팅 관련 어휘 20개\n4. 예문과 콜로케이션" },
        { id: "3-2", question: "동의어/유의어: increase, rise, grow, expand 뉘앙스 차이", prompt: "TOEIC Part 5 동의어 문제입니다.\n\n비슷한 의미의 단어들 뉘앙스 차이를 알려주세요.\n\n포함 내용:\n1. 증가 관련 동사 비교\n2. 감소 관련 동사 비교\n3. 변화 관련 동사 비교\n4. 문맥별 적절한 선택" },
        { id: "3-3", question: "콜로케이션: make a decision, take responsibility 등 자연스러운 조합", prompt: "TOEIC Part 5 콜로케이션입니다.\n\n자연스러운 단어 조합을 알려주세요.\n\n포함 내용:\n1. make + 명사 조합 20개\n2. take + 명사 조합 20개\n3. have + 명사 조합 20개\n4. give + 명사 조합 20개" },
        { id: "3-4", question: "전치사 + 명사: in advance, on behalf of, at the moment 숙어", prompt: "TOEIC Part 5 전치사 숙어입니다.\n\n자주 나오는 전치사 + 명사 숙어를 알려주세요.\n\n포함 내용:\n1. in + 명사 숙어 15개\n2. on + 명사 숙어 15개\n3. at + 명사 숙어 10개\n4. 기타 전치사 숙어 10개" },
        { id: "3-5", question: "동사 + 전치사: comply with, apply for, account for 패턴", prompt: "TOEIC Part 5 동사 + 전치사 패턴입니다.\n\n자주 나오는 동사 + 전치사 조합을 알려주세요.\n\n포함 내용:\n1. 동사 + with 패턴 15개\n2. 동사 + for 패턴 15개\n3. 동사 + to 패턴 15개\n4. 동사 + from/of 패턴" },
        { id: "3-6", question: "혼동 어휘: affect vs effect, accept vs except, adapt vs adopt", prompt: "TOEIC Part 5 혼동 어휘입니다.\n\n철자가 비슷해서 혼동하기 쉬운 단어를 구분하세요.\n\n포함 내용:\n1. 자주 혼동하는 단어 쌍 20개\n2. 각 단어의 정확한 의미\n3. 구분하는 방법\n4. 실전 예문" },
        { id: "3-7", question: "형용사 어휘: profitable, affordable, reliable 등 -able/-ible 형용사", prompt: "TOEIC Part 5 형용사 어휘입니다.\n\n자주 나오는 형용사를 학습하세요.\n\n포함 내용:\n1. -able/-ible 형용사 30개\n2. -ive 형용사 20개\n3. -ful/-less 형용사 20개\n4. 예문과 반의어" },
        { id: "3-8", question: "부사 어휘: approximately, significantly, considerably 정도 부사", prompt: "TOEIC Part 5 부사 어휘입니다.\n\n정도를 나타내는 부사를 학습하세요.\n\n포함 내용:\n1. 강조 부사 20개\n2. 정도 부사 20개\n3. 빈도 부사 15개\n4. 예문과 뉘앙스 차이" },
        { id: "3-9", question: "구동사: put off, turn down, carry out 등 2어 동사", prompt: "TOEIC Part 5 구동사입니다.\n\n자주 나오는 구동사(phrasal verbs)를 학습하세요.\n\n포함 내용:\n1. put 구동사 10개\n2. turn 구동사 10개\n3. carry 구동사 10개\n4. take 구동사 10개" },
        { id: "3-10", question: "문맥 어휘: 빈칸 전후 문맥으로 적절한 어휘 고르기 전략", prompt: "TOEIC Part 5 문맥 어휘 문제입니다.\n\n문맥에 맞는 어휘를 선택하는 전략을 알려주세요.\n\n포함 내용:\n1. 문맥 파악 방법\n2. 선택지 분석 요령\n3. 오답 소거법\n4. 실전 연습 문제 10개" }
      ]
    },
    {
      title: "Part 6: 장문 빈칸 (Text Completion)",
      items: [
        { id: "4-1", question: "Part 6 지문 유형: 이메일, 공지, 편지, 기사 패턴 파악", prompt: "TOEIC Part 6 지문 유형입니다.\n\nPart 6에 나오는 다양한 지문 유형을 파악하세요.\n\n포함 내용:\n1. 이메일/편지 지문 특징\n2. 공지/안내문 특징\n3. 기사/보도문 특징\n4. 유형별 빈출 표현" },
        { id: "4-2", question: "문맥 흐름 파악: 전체 글의 논리적 흐름 이해하기", prompt: "TOEIC Part 6 문맥 파악입니다.\n\n글의 논리적 흐름을 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 서론-본론-결론 구조\n2. 연결어로 흐름 파악\n3. 시간/순서 흐름\n4. 인과관계 파악" },
        { id: "4-3", question: "문장 삽입 문제: 문맥에 맞는 완전한 문장 고르기 전략", prompt: "TOEIC Part 6 문장 삽입 문제입니다.\n\n문장 삽입 문제 공략법을 알려주세요.\n\n포함 내용:\n1. 삽입 문장의 특징\n2. 전후 문맥 연결 확인\n3. 지시어/연결어 단서\n4. 실전 연습 방법" },
        { id: "4-4", question: "접속부사 문제: However, Therefore, Furthermore 등 연결어 선택", prompt: "TOEIC Part 6 접속부사 문제입니다.\n\n문맥에 맞는 연결어 선택법을 알려주세요.\n\n포함 내용:\n1. 대조 연결어 (However, Nevertheless)\n2. 인과 연결어 (Therefore, Consequently)\n3. 추가 연결어 (Furthermore, Moreover)\n4. 예시/요약 연결어" },
        { id: "4-5", question: "시제 일관성: 지문 내 시제 흐름 유지하기", prompt: "TOEIC Part 6 시제 일관성입니다.\n\n지문 내 시제 일관성을 유지하는 방법을 알려주세요.\n\n포함 내용:\n1. 과거 시제 지문 패턴\n2. 현재/미래 시제 지문\n3. 시제 전환 신호\n4. 실전 예문 분석" },
        { id: "4-6", question: "대명사 참조: it, they, this, that이 가리키는 대상 파악", prompt: "TOEIC Part 6 대명사 참조 문제입니다.\n\n대명사가 가리키는 대상을 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 인칭대명사 참조\n2. 지시대명사 참조\n3. 선행사 찾는 방법\n4. 실전 예문 분석" },
        { id: "4-7", question: "어휘/문법 복합 문제: Part 5 유형이 Part 6에 적용되는 패턴", prompt: "TOEIC Part 6 어휘/문법 문제입니다.\n\nPart 6의 어휘/문법 문제 풀이법을 알려주세요.\n\n포함 내용:\n1. Part 5와의 차이점\n2. 문맥 활용 전략\n3. 품사/시제/태 문제\n4. 어휘 문제 접근법" },
        { id: "4-8", question: "Part 6 시간 관리: 세트당 2분 내 풀기 전략", prompt: "TOEIC Part 6 시간 관리입니다.\n\n효율적인 시간 배분 전략을 알려주세요.\n\n포함 내용:\n1. 지문 읽는 순서\n2. 문제 유형별 시간 배분\n3. 건너뛰기 전략\n4. 실전 연습 방법" },
        { id: "4-9", question: "지문 속 단서 찾기: 빈칸 전후 문장에서 힌트 포착하기", prompt: "TOEIC Part 6 단서 찾기입니다.\n\n빈칸 주변에서 단서를 찾는 방법을 알려주세요.\n\n포함 내용:\n1. 전 문장 단서\n2. 후 문장 단서\n3. 지문 전체 맥락\n4. 단서 유형별 정리" },
        { id: "4-10", question: "Part 6 고득점 전략: 전체 지문을 읽어야 할 때 vs 빈칸만 볼 때", prompt: "TOEIC Part 6 고득점 전략입니다.\n\n상황별 문제 풀이 전략을 알려주세요.\n\n포함 내용:\n1. 전체 읽기가 필요한 문제\n2. 빈칸 주변만 봐도 되는 문제\n3. 문제 유형별 판단 기준\n4. 실전 적용 팁" }
      ]
    },
    {
      title: "Part 7: 독해 (Reading Comprehension)",
      items: [
        { id: "5-1", question: "지문 유형별 특징: 이메일, 광고, 기사, 양식, 채팅 패턴", prompt: "TOEIC Part 7 지문 유형입니다.\n\nPart 7의 다양한 지문 유형을 파악하세요.\n\n포함 내용:\n1. 이메일/편지 특징과 빈출 질문\n2. 광고/공지 특징\n3. 기사/리뷰 특징\n4. 양식/일정표 특징\n5. 문자/채팅 특징" },
        { id: "5-2", question: "질문 유형 분석: 주제, 목적, 세부정보, 추론, NOT 문제", prompt: "TOEIC Part 7 질문 유형입니다.\n\n질문 유형별 접근법을 알려주세요.\n\n포함 내용:\n1. 주제/목적 문제\n2. 세부정보 문제\n3. 추론 문제\n4. NOT/TRUE 문제\n5. 동의어 문제" },
        { id: "5-3", question: "스키밍(Skimming) 전략: 빠르게 전체 내용 파악하기", prompt: "TOEIC Part 7 스키밍 전략입니다.\n\n빠르게 지문 내용을 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 스키밍의 원리\n2. 핵심 문장 찾는 법\n3. 단락별 요점 파악\n4. 실전 연습 방법" },
        { id: "5-4", question: "스캐닝(Scanning) 전략: 특정 정보 빠르게 찾기", prompt: "TOEIC Part 7 스캐닝 전략입니다.\n\n특정 정보를 빠르게 찾는 방법을 알려주세요.\n\n포함 내용:\n1. 스캐닝의 원리\n2. 키워드 활용법\n3. 숫자/고유명사 찾기\n4. 질문별 스캐닝 팁" },
        { id: "5-5", question: "복수지문(Double/Triple Passage) 공략: 지문 간 연결고리 찾기", prompt: "TOEIC Part 7 복수지문 문제입니다.\n\n2~3개 지문 연계 문제를 공략하세요.\n\n포함 내용:\n1. 복수지문의 특징\n2. 지문 간 관계 파악\n3. 연계 질문 유형\n4. 시간 배분 전략" },
        { id: "5-6", question: "NOT/TRUE 문제: 선택지 하나하나 지문에서 확인하기", prompt: "TOEIC Part 7 NOT/TRUE 문제입니다.\n\nNOT/TRUE 문제 풀이 전략을 알려주세요.\n\n포함 내용:\n1. NOT 문제 접근법\n2. TRUE 문제 접근법\n3. 선택지 검증 순서\n4. 시간 단축 팁" },
        { id: "5-7", question: "동의어 문제: 문맥에서 단어의 의미 파악하기", prompt: "TOEIC Part 7 동의어 문제입니다.\n\n문맥 속 단어 의미를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 동의어 문제 형식\n2. 문맥으로 의미 추론\n3. 다의어 구분법\n4. 자주 나오는 동의어 쌍" },
        { id: "5-8", question: "의도 파악 문제: 특정 문장/표현의 목적 이해하기", prompt: "TOEIC Part 7 의도 파악 문제입니다.\n\n문장의 의도를 파악하는 방법을 알려주세요.\n\n포함 내용:\n1. 의도 파악 문제 형식\n2. 문맥에서 의도 추론\n3. 관용 표현의 의도\n4. 실전 예문 분석" },
        { id: "5-9", question: "Part 7 시간 관리: 단일지문 2분, 복수지문 4분 목표", prompt: "TOEIC Part 7 시간 관리입니다.\n\n효율적인 시간 배분 전략을 알려주세요.\n\n포함 내용:\n1. 지문 유형별 시간 배분\n2. 순서 정하기 전략\n3. 찍기 타이밍\n4. 실전 연습 루틴" },
        { id: "5-10", question: "Part 7 고득점 전략: 질문 먼저 읽기 vs 지문 먼저 읽기", prompt: "TOEIC Part 7 고득점 전략입니다.\n\n효과적인 문제 풀이 순서를 알려주세요.\n\n포함 내용:\n1. 질문 먼저 읽기 장단점\n2. 지문 먼저 읽기 장단점\n3. 상황별 최적 전략\n4. 개인별 맞춤 팁" }
      ]
    }
  ];

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progress = Math.round((completedItems.size / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/toeic" className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
            <span>←</span>
            <span>TOEIC으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📖</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">RC (Reading Comprehension)</h1>
              <p className="text-gray-600">Part 5~7 독해 연습 50문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-indigo-600">{progress}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedItems.size} / {totalItems} 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
              >
                <h2 className="text-lg font-bold">{topic.title}</h2>
                <span className="text-2xl">{openTopics.has(topicIndex) ? '−' : '+'}</span>
              </button>

              {openTopics.has(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={completedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className={`flex-1 ${completedItems.has(item.id) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.question}
                      </span>
                      <button
                        onClick={() => openAIHelper(item.prompt)}
                        className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
                      >
                        🤖 AI
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">💡 RC 고득점 TIP</h3>
          <ul className="space-y-2 text-indigo-700 text-sm">
            <li>• Part 5는 문제당 30초 이내, 품사 문제는 빈칸 전후만 보세요</li>
            <li>• Part 6는 문맥 흐름이 핵심, 접속부사와 시제 일관성 체크</li>
            <li>• Part 7은 질문 유형 파악 후 스캐닝으로 정보 찾기</li>
            <li>• 어휘력이 RC 점수의 핵심, 매일 30개씩 암기하세요</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
