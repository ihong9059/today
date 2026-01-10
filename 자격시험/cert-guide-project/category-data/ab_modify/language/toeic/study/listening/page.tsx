'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ListeningStudyPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toeic-listening-completed');
    if (saved) setCompletedItems(new Set(JSON.parse(saved)));
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('toeic-listening-completed', JSON.stringify([...newCompleted]));
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
      title: "Part 1: 사진 묘사 (Photographs)",
      items: [
        { id: "1-1", question: "사진 속 인물이 'typing on a keyboard'를 하고 있을 때 자주 쓰이는 표현들을 학습하세요", prompt: "TOEIC Part 1 사진 묘사 문제입니다.\n\n'A person is typing on a keyboard'와 유사한 사무실 동작 묘사 표현 10가지를 알려주세요.\n\n각 표현에 대해:\n1. 영어 문장\n2. 한국어 해석\n3. 자주 나오는 변형 표현\n4. 주의할 함정 표현" },
        { id: "1-2", question: "'be being + p.p.' (진행 수동태)와 'be + p.p.' (단순 수동태)의 차이를 구분하세요", prompt: "TOEIC Part 1 문법 포인트입니다.\n\n'is being repaired' vs 'is repaired'의 차이를 설명해주세요.\n\n다음을 포함해주세요:\n1. 두 형태의 의미 차이\n2. Part 1에서 출제되는 예시 5개씩\n3. 사진 상황별 올바른 선택 방법\n4. 자주 틀리는 함정 패턴" },
        { id: "1-3", question: "사물/배경 묘사에서 'There is/are' 구문과 위치 전치사 표현을 익히세요", prompt: "TOEIC Part 1 사물/배경 묘사입니다.\n\n'There is/are' 구문과 위치 전치사(on, in, next to, beside, in front of 등)를 사용한 표현을 알려주세요.\n\n포함 내용:\n1. 위치 전치사 10가지와 예문\n2. 사물 배치 묘사 표현 10가지\n3. Part 1에서 자주 나오는 배경 묘사\n4. 오답을 유도하는 함정 표현" },
        { id: "1-4", question: "Part 1 빈출 동사 'hold, carry, wear, put on'의 뉘앙스 차이를 파악하세요", prompt: "TOEIC Part 1 빈출 동사입니다.\n\nhold, carry, wear, put on의 차이점을 설명해주세요.\n\n각 동사에 대해:\n1. 정확한 의미와 용법\n2. Part 1 예문 3개씩\n3. 서로 혼동하기 쉬운 상황\n4. 사진에서 구분하는 방법" },
        { id: "1-5", question: "야외 사진에서 자주 나오는 표현 (pedestrians, vehicles, construction)을 학습하세요", prompt: "TOEIC Part 1 야외 사진 묘사입니다.\n\n거리, 교통, 건설 현장 관련 표현을 알려주세요.\n\n포함 내용:\n1. 보행자/차량 관련 표현 10가지\n2. 건설/공사 현장 표현 10가지\n3. 날씨/자연 배경 표현 5가지\n4. 실전 예문과 해석" },
        { id: "1-6", question: "사진 속 복수 인물 묘사: 'Some people are...' vs 'All of them are...' 구분하세요", prompt: "TOEIC Part 1 복수 인물 묘사입니다.\n\nSome, All, Most, One of them 등 수량 표현의 차이를 설명해주세요.\n\n포함 내용:\n1. 각 표현의 정확한 의미\n2. 사진에서 판단하는 기준\n3. 오답이 되는 경우\n4. 실전 연습 문제 5개" },
        { id: "1-7", question: "상태 동사 vs 동작 동사: 'is standing' vs 'stands'의 차이를 이해하세요", prompt: "TOEIC Part 1 시제/상태 문제입니다.\n\n현재진행형 vs 현재시제의 Part 1 출제 패턴을 설명해주세요.\n\n포함 내용:\n1. 상태 동사와 동작 동사 구분\n2. Part 1에서 정답이 되는 경우\n3. 자주 출제되는 예문 10개\n4. 함정 선택지 패턴" },
        { id: "1-8", question: "음식/레스토랑 사진 관련 표현을 집중 학습하세요", prompt: "TOEIC Part 1 음식/레스토랑 묘사입니다.\n\n식사, 요리, 서빙 관련 표현을 알려주세요.\n\n포함 내용:\n1. 식사 동작 표현 10가지\n2. 테이블/식기 묘사 표현\n3. 서빙/주문 관련 표현\n4. 실전 예문과 해석" },
        { id: "1-9", question: "실험실/의료 환경 사진에서 나오는 전문 표현을 익히세요", prompt: "TOEIC Part 1 실험실/의료 묘사입니다.\n\n연구소, 병원, 실험실 관련 표현을 알려주세요.\n\n포함 내용:\n1. 실험 동작 표현 10가지\n2. 의료/진료 관련 표현\n3. 장비/기구 묘사 표현\n4. 자주 출제되는 패턴" },
        { id: "1-10", question: "Part 1 오답 유형 분석: 비슷하게 들리는 단어(sound-alike) 함정을 파악하세요", prompt: "TOEIC Part 1 오답 함정 분석입니다.\n\n발음이 비슷한 단어로 유도하는 오답 패턴을 설명해주세요.\n\n포함 내용:\n1. 자주 출제되는 유사 발음 쌍 20개\n2. 함정을 피하는 방법\n3. 실전 예시와 정답 찾는 팁\n4. 집중해서 들어야 할 포인트" }
      ]
    },
    {
      title: "Part 2: 질의응답 (Question-Response)",
      items: [
        { id: "2-1", question: "의문사 질문(5W1H)에 대한 적절한 응답 패턴을 학습하세요", prompt: "TOEIC Part 2 의문사 질문입니다.\n\nWho, What, When, Where, Why, How 질문별 응답 패턴을 알려주세요.\n\n각 의문사에 대해:\n1. 대표 질문 유형 3가지\n2. 정답이 되는 응답 패턴\n3. 간접 응답 예시\n4. 오답 유형" },
        { id: "2-2", question: "Yes/No 질문에 대한 다양한 응답 (긍정/부정/우회) 패턴을 익히세요", prompt: "TOEIC Part 2 Yes/No 질문입니다.\n\nYes/No로 시작하지 않는 정답 패턴을 설명해주세요.\n\n포함 내용:\n1. Yes/No 없이 긍정 응답하는 방법\n2. 우회적 응답 패턴 10가지\n3. 정답이 되는 간접 응답\n4. 실전 예문 10개" },
        { id: "2-3", question: "선택 질문 (A or B?)에 대한 응답: 둘 다 선택, 모름, 제3의 선택 패턴", prompt: "TOEIC Part 2 선택 질문입니다.\n\n'A or B?' 질문에 대한 다양한 응답 유형을 알려주세요.\n\n포함 내용:\n1. A 선택 / B 선택 응답\n2. 둘 다 선택하는 응답\n3. 모르겠다는 응답\n4. 제3의 대안 제시 응답\n5. 실전 예문 10개" },
        { id: "2-4", question: "제안/요청 질문 (Would you...? / Could you...?)의 수락/거절 패턴", prompt: "TOEIC Part 2 제안/요청 질문입니다.\n\nWould you, Could you, Can you 등 요청 표현에 대한 응답을 알려주세요.\n\n포함 내용:\n1. 수락 표현 10가지\n2. 거절 표현 10가지\n3. 조건부 수락 표현\n4. 실전 예문과 해석" },
        { id: "2-5", question: "부정 의문문 (Isn't it...? / Don't you...?)에 대한 응답 방법", prompt: "TOEIC Part 2 부정 의문문입니다.\n\n부정 의문문에 대한 올바른 응답 방법을 설명해주세요.\n\n포함 내용:\n1. 부정 의문문의 의미\n2. Yes/No 응답의 의미 차이\n3. 자주 출제되는 패턴\n4. 실전 예문 10개" },
        { id: "2-6", question: "부가 의문문 (tag question)의 응답 패턴을 파악하세요", prompt: "TOEIC Part 2 부가 의문문입니다.\n\n'..., isn't it?', '..., don't you?' 등 tag question 응답법을 알려주세요.\n\n포함 내용:\n1. 부가 의문문 형성 규칙\n2. 응답 방법\n3. 자주 출제되는 유형\n4. 실전 예문 10개" },
        { id: "2-7", question: "간접 응답 유형: 질문에 직접 답하지 않는 정답 패턴", prompt: "TOEIC Part 2 간접 응답입니다.\n\n질문에 직접 답하지 않고 정답이 되는 패턴을 설명해주세요.\n\n포함 내용:\n1. 간접 응답이 정답인 경우\n2. 우회 응답 유형 10가지\n3. 추가 정보 제공 응답\n4. 실전 예문과 분석" },
        { id: "2-8", question: "시제/주어 일치: 질문과 응답의 시제/인칭 매칭 확인법", prompt: "TOEIC Part 2 시제/주어 일치입니다.\n\n질문과 응답의 시제, 주어가 일치해야 하는 경우를 설명해주세요.\n\n포함 내용:\n1. 시제 일치 규칙\n2. 주어 일치 확인법\n3. 불일치로 오답이 되는 경우\n4. 실전 예문 10개" },
        { id: "2-9", question: "비슷하게 들리는 단어(sound-alike) 함정을 피하는 방법", prompt: "TOEIC Part 2 발음 함정입니다.\n\n비슷한 발음으로 유도하는 오답을 피하는 방법을 알려주세요.\n\n포함 내용:\n1. 자주 나오는 유사 발음 쌍 15개\n2. 문맥으로 구분하는 방법\n3. 함정 유형별 대처법\n4. 실전 연습 문제" },
        { id: "2-10", question: "Part 2 고득점 전략: 첫 단어 집중 청취 + 소거법 활용", prompt: "TOEIC Part 2 고득점 전략입니다.\n\n파트 2에서 고득점을 위한 청취 전략을 알려주세요.\n\n포함 내용:\n1. 첫 단어(의문사) 집중법\n2. 소거법 활용 전략\n3. 시간 내 판단하는 방법\n4. 실전 적용 팁" }
      ]
    },
    {
      title: "Part 3: 짧은 대화 (Short Conversations)",
      items: [
        { id: "3-1", question: "대화 시작 전 질문 먼저 읽기(Pre-reading) 전략을 연습하세요", prompt: "TOEIC Part 3 Pre-reading 전략입니다.\n\n대화 전 질문을 읽는 효과적인 방법을 알려주세요.\n\n포함 내용:\n1. Direction 시간 활용법\n2. 질문 유형별 키워드 파악\n3. 선택지 훑어보는 방법\n4. 시간 배분 전략" },
        { id: "3-2", question: "화자의 관계(speaker relationship) 파악 문제 유형을 학습하세요", prompt: "TOEIC Part 3 화자 관계 문제입니다.\n\n'What is the relationship between the speakers?' 유형을 공략하세요.\n\n포함 내용:\n1. 자주 나오는 관계 유형 10가지\n2. 관계를 파악하는 단서\n3. 대표 표현과 예문\n4. 실전 연습 문제" },
        { id: "3-3", question: "대화 장소(location) 추론 문제의 단서 표현을 익히세요", prompt: "TOEIC Part 3 장소 추론 문제입니다.\n\n대화가 이루어지는 장소를 파악하는 방법을 알려주세요.\n\n장소별 단서:\n1. 사무실 관련 표현\n2. 상점/매장 표현\n3. 레스토랑/호텔 표현\n4. 공항/교통 관련 표현\n5. 병원/은행 표현" },
        { id: "3-4", question: "대화의 목적(purpose) 파악: What does the man want? 유형", prompt: "TOEIC Part 3 목적 파악 문제입니다.\n\n화자의 의도/목적을 묻는 문제 유형을 설명해주세요.\n\n포함 내용:\n1. 목적 파악 질문 유형\n2. 목적을 나타내는 표현\n3. 자주 나오는 상황 10가지\n4. 실전 예문과 분석" },
        { id: "3-5", question: "세부 정보(detail) 문제: What, When, Where, How much 질문 대응", prompt: "TOEIC Part 3 세부 정보 문제입니다.\n\n구체적인 정보를 묻는 문제 유형을 공략하세요.\n\n포함 내용:\n1. 시간/날짜 관련 문제\n2. 장소/위치 문제\n3. 가격/수량 문제\n4. 이름/직책 문제\n5. 청취 포인트" },
        { id: "3-6", question: "추론 문제(What can be inferred?)의 접근법을 익히세요", prompt: "TOEIC Part 3 추론 문제입니다.\n\n직접 언급되지 않은 내용을 추론하는 방법을 알려주세요.\n\n포함 내용:\n1. 추론 문제 유형\n2. 맥락에서 추론하는 방법\n3. 자주 나오는 추론 패턴\n4. 실전 연습 문제" },
        { id: "3-7", question: "다음 행동(What will the speaker do next?) 예측 문제 전략", prompt: "TOEIC Part 3 다음 행동 예측 문제입니다.\n\n화자의 다음 행동을 묻는 문제를 공략하세요.\n\n포함 내용:\n1. 다음 행동 예측 단서\n2. 자주 나오는 패턴\n3. 대화 끝부분 집중 청취\n4. 실전 예문과 분석" },
        { id: "3-8", question: "의도 파악 문제: What does the woman mean when she says...?", prompt: "TOEIC Part 3 의도 파악 문제입니다.\n\n특정 발언의 의도를 묻는 문제 유형을 설명해주세요.\n\n포함 내용:\n1. 의도 파악 문제 형식\n2. 맥락에서 의도 파악하기\n3. 자주 나오는 관용 표현\n4. 실전 예문과 분석" },
        { id: "3-9", question: "그래픽 연계 문제: 도표/일정표와 함께 출제되는 문제 대응법", prompt: "TOEIC Part 3 그래픽 연계 문제입니다.\n\n도표, 일정표, 쿠폰 등과 연계된 문제를 공략하세요.\n\n포함 내용:\n1. 그래픽 유형별 특징\n2. 미리 그래픽 분석하는 방법\n3. 청취와 그래픽 매칭 전략\n4. 실전 연습 팁" },
        { id: "3-10", question: "3인 대화 문제의 특징과 공략법을 학습하세요", prompt: "TOEIC Part 3 3인 대화 문제입니다.\n\n3명이 등장하는 대화 문제를 공략하세요.\n\n포함 내용:\n1. 3인 대화의 특징\n2. 화자 구분하는 방법\n3. 자주 나오는 상황\n4. 청취 전략과 팁" }
      ]
    },
    {
      title: "Part 4: 설명문 (Short Talks)",
      items: [
        { id: "4-1", question: "전화 메시지(voicemail) 유형의 특징과 빈출 표현을 익히세요", prompt: "TOEIC Part 4 전화 메시지 유형입니다.\n\n음성 메시지에서 자주 나오는 표현을 알려주세요.\n\n포함 내용:\n1. 전화 메시지 시작/끝 표현\n2. 목적 전달 표현\n3. 연락처/콜백 요청 표현\n4. 빈출 질문 유형" },
        { id: "4-2", question: "공지/안내(announcement) 유형: 회사, 공항, 매장 안내방송", prompt: "TOEIC Part 4 공지/안내 유형입니다.\n\n안내방송에서 나오는 표현과 질문 유형을 알려주세요.\n\n포함 내용:\n1. 회사 공지 표현\n2. 공항/교통 안내 표현\n3. 매장/행사 안내 표현\n4. 빈출 질문과 정답 패턴" },
        { id: "4-3", question: "광고/홍보(advertisement) 유형: 제품, 서비스, 이벤트 광고", prompt: "TOEIC Part 4 광고 유형입니다.\n\n광고/홍보 담화에서 나오는 표현을 알려주세요.\n\n포함 내용:\n1. 제품 홍보 표현\n2. 서비스 광고 표현\n3. 이벤트/할인 안내 표현\n4. 행동 유도(CTA) 표현" },
        { id: "4-4", question: "뉴스/보도(news report) 유형의 구조와 빈출 표현", prompt: "TOEIC Part 4 뉴스 유형입니다.\n\n뉴스/보도 담화의 구조와 표현을 알려주세요.\n\n포함 내용:\n1. 뉴스 시작/마무리 표현\n2. 인용/인터뷰 표현\n3. 날씨/교통 보도 표현\n4. 빈출 질문 유형" },
        { id: "4-5", question: "회의/프레젠테이션(meeting/presentation) 유형 공략", prompt: "TOEIC Part 4 회의/발표 유형입니다.\n\n회의, 프레젠테이션 담화를 공략하세요.\n\n포함 내용:\n1. 회의 시작/진행 표현\n2. 안건/의제 소개 표현\n3. 발표자 소개 표현\n4. 질의응답 관련 표현" },
        { id: "4-6", question: "행사/투어 안내(tour guide) 유형의 특징과 표현", prompt: "TOEIC Part 4 투어/행사 안내 유형입니다.\n\n관광 안내, 행사 진행 담화를 공략하세요.\n\n포함 내용:\n1. 투어 시작/일정 안내 표현\n2. 장소/명소 설명 표현\n3. 주의사항/규칙 안내 표현\n4. 빈출 질문 유형" },
        { id: "4-7", question: "연설/축사(speech) 유형: 시상식, 환영사, 기념사", prompt: "TOEIC Part 4 연설 유형입니다.\n\n시상식, 환영사, 기념사 담화를 공략하세요.\n\n포함 내용:\n1. 연설 시작/마무리 표현\n2. 수상자/인물 소개 표현\n3. 감사/축하 표현\n4. 빈출 질문 유형" },
        { id: "4-8", question: "교육/강연(lecture/training) 유형의 구조와 표현", prompt: "TOEIC Part 4 강연/교육 유형입니다.\n\n교육, 세미나, 워크샵 담화를 공략하세요.\n\n포함 내용:\n1. 강연 소개/목적 표현\n2. 내용 전개 표현\n3. 질문/참여 유도 표현\n4. 빈출 질문 유형" },
        { id: "4-9", question: "그래픽 연계 문제: 일정표, 가격표, 지도와 함께 출제되는 유형", prompt: "TOEIC Part 4 그래픽 연계 문제입니다.\n\n그래픽(도표, 일정표, 지도 등)과 연계된 문제를 공략하세요.\n\n포함 내용:\n1. 그래픽 유형별 특징\n2. 그래픽 미리 분석법\n3. 담화와 그래픽 매칭 전략\n4. 실전 대응 팁" },
        { id: "4-10", question: "Part 4 시간 관리: 질문 미리 읽기와 마킹 전략", prompt: "TOEIC Part 4 시간 관리 전략입니다.\n\n효율적인 Part 4 공략법을 알려주세요.\n\n포함 내용:\n1. Direction 시간 활용법\n2. 담화 간 시간 활용\n3. 질문 미리 읽는 우선순위\n4. 빠른 마킹 전략" }
      ]
    },
    {
      title: "Listening 실전 훈련",
      items: [
        { id: "5-1", question: "쉐도잉(Shadowing) 연습: 음원을 듣고 즉시 따라 말하는 훈련법", prompt: "TOEIC Listening 쉐도잉 훈련입니다.\n\n효과적인 쉐도잉 연습 방법을 알려주세요.\n\n포함 내용:\n1. 쉐도잉의 효과\n2. 단계별 연습 방법\n3. Part별 쉐도잉 팁\n4. 일일 연습 루틴" },
        { id: "5-2", question: "딕테이션(Dictation) 연습: 받아쓰기로 청취력 향상시키는 방법", prompt: "TOEIC Listening 딕테이션 훈련입니다.\n\n받아쓰기 연습으로 청취력을 향상시키는 방법을 알려주세요.\n\n포함 내용:\n1. 딕테이션의 효과\n2. 효율적인 연습 방법\n3. 자주 놓치는 부분 집중 훈련\n4. 일일 연습 계획" },
        { id: "5-3", question: "연음/축약형 듣기: want to→wanna, going to→gonna 등 자연스러운 발음", prompt: "TOEIC Listening 연음/축약 훈련입니다.\n\n영어의 연음, 축약 패턴을 알려주세요.\n\n포함 내용:\n1. 자주 나오는 연음 패턴 20개\n2. 축약형 표현 20개\n3. 탈락/동화 현상\n4. 연습 방법과 예문" },
        { id: "5-4", question: "미국/영국/호주 발음 차이: TOEIC에 나오는 다양한 억양 적응하기", prompt: "TOEIC Listening 발음 차이입니다.\n\n미국, 영국, 호주, 캐나다 발음의 차이를 알려주세요.\n\n포함 내용:\n1. 국가별 발음 특징\n2. 자주 다르게 발음되는 단어\n3. 억양 차이 적응법\n4. 연습 자료 추천" },
        { id: "5-5", question: "1.2~1.5배속 청취 훈련: 실전 속도보다 빠르게 듣는 연습", prompt: "TOEIC Listening 배속 훈련입니다.\n\n빠른 속도로 듣기 연습하는 방법을 알려주세요.\n\n포함 내용:\n1. 배속 훈련의 효과\n2. 단계별 속도 높이는 방법\n3. 적정 연습 시간\n4. 주의사항과 팁" },
        { id: "5-6", question: "키워드 청취 훈련: 전체를 듣지 않고 핵심 정보만 빠르게 포착하기", prompt: "TOEIC Listening 키워드 훈련입니다.\n\n핵심 정보를 빠르게 포착하는 방법을 알려주세요.\n\n포함 내용:\n1. 키워드 청취의 원리\n2. Part별 키워드 유형\n3. 연습 방법\n4. 실전 적용 팁" },
        { id: "5-7", question: "노트 테이킹 전략: LC 시험 중 메모 활용법", prompt: "TOEIC Listening 노트 테이킹입니다.\n\nLC 시험 중 효과적인 메모 방법을 알려주세요.\n\n포함 내용:\n1. 메모해야 할 정보\n2. 약어/기호 사용법\n3. Part별 메모 전략\n4. 시간 관리와 균형" },
        { id: "5-8", question: "오답 소거법: 확실한 오답 먼저 제거하고 정답 찾기", prompt: "TOEIC Listening 오답 소거법입니다.\n\n오답을 빠르게 제거하는 방법을 알려주세요.\n\n포함 내용:\n1. 오답의 특징\n2. Part별 오답 패턴\n3. 소거법 적용 전략\n4. 실전 연습 방법" },
        { id: "5-9", question: "집중력 유지 훈련: 45분간 집중력을 유지하는 방법", prompt: "TOEIC Listening 집중력 훈련입니다.\n\n45분간 집중력을 유지하는 방법을 알려주세요.\n\n포함 내용:\n1. 집중력 저하 원인\n2. 집중력 향상 방법\n3. 실전 시험 중 팁\n4. 일상 훈련 방법" },
        { id: "5-10", question: "모의고사 활용법: LC 실전 모의고사로 실력 점검하기", prompt: "TOEIC Listening 모의고사 활용법입니다.\n\n모의고사를 효과적으로 활용하는 방법을 알려주세요.\n\n포함 내용:\n1. 모의고사 선택 기준\n2. 실전처럼 푸는 방법\n3. 오답 분석 방법\n4. 취약점 보완 전략" }
      ]
    }
  ];

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progress = Math.round((completedItems.size / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/toeic" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
            <span>←</span>
            <span>TOEIC으로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎧</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">LC (Listening Comprehension)</h1>
              <p className="text-gray-600">Part 1~4 청해 연습 50문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-blue-600">{progress}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedItems.size} / {totalItems} 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              >
                <h2 className="text-lg font-bold">{topic.title}</h2>
                <span className="text-2xl">{openTopics.has(topicIndex) ? '−' : '+'}</span>
              </button>

              {openTopics.has(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={completedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className={`flex-1 ${completedItems.has(item.id) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.question}
                      </span>
                      <button
                        onClick={() => openAIHelper(item.prompt)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
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

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">💡 LC 고득점 TIP</h3>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• 매일 30분 이상 영어 듣기로 귀를 영어에 노출시키세요</li>
            <li>• ETS 공식 음원으로 실제 시험 속도와 발음에 익숙해지세요</li>
            <li>• 쉐도잉과 딕테이션을 병행하면 청취력이 빠르게 향상됩니다</li>
            <li>• Part 3-4는 질문을 미리 읽는 습관이 가장 중요합니다</li>
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
