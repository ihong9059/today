'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, BookOpen, FileText, MessageSquare, Languages, Target } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'reading': { name: '독서 (비문학)', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: BookOpen, description: '다양한 제재의 지문을 읽고 이해하는 능력 향상', totalDays: 45 },
  'literature': { name: '문학', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: FileText, description: '현대시, 현대소설, 고전시가, 고전소설 작품 분석', totalDays: 45 },
  'speech-writing': { name: '화법과 작문', color: 'from-green-500 to-teal-600', colorLight: 'green', icon: MessageSquare, description: '화법 이론과 작문 실전 능력 배양', totalDays: 30 },
  'language-media': { name: '언어와 매체', color: 'from-orange-500 to-red-600', colorLight: 'orange', icon: Languages, description: '음운론, 형태론, 통사론, 중세국어, 매체언어', totalDays: 30 },
  'suneung-korean': { name: '수능 국어 실전', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Target, description: '실전 모의고사와 고난도 문제 집중 훈련', totalDays: 45 },
};

// 레슨 제목 데이터
const lessonTitles: { [subject: string]: { [day: number]: { title: string; desc: string } } } = {
  'reading': {
    1: { title: '독서론 - 읽기의 원리', desc: '독서의 본질과 읽기 과정의 이해' },
    2: { title: '독서론 - 읽기 전략', desc: '효과적인 읽기를 위한 전략' },
    3: { title: '독서론 - 사실적 읽기', desc: '글에 드러난 정보의 파악' },
    4: { title: '독서론 - 추론적 읽기', desc: '숨겨진 의미의 추론' },
    5: { title: '독서론 - 비판적/창의적 읽기', desc: '글을 평가하고 재구성하기' },
    6: { title: '인문 - 철학 (1)', desc: '동양 철학의 이해' },
    7: { title: '인문 - 철학 (2)', desc: '서양 철학의 이해' },
    8: { title: '인문 - 철학 (3)', desc: '현대 철학과 윤리' },
    9: { title: '인문 - 역사', desc: '역사학의 방법과 해석' },
    10: { title: '인문 - 심리', desc: '인간 심리와 행동의 이해' },
    11: { title: '인문 - 논리학', desc: '논증과 오류의 분석' },
    12: { title: '인문 - 언어와 인식', desc: '언어철학과 인식론' },
    13: { title: '인문 - 종합 연습', desc: '인문 지문 실전 훈련' },
    14: { title: '사회 - 경제 (1)', desc: '시장과 가격 메커니즘' },
    15: { title: '사회 - 경제 (2)', desc: '금융과 투자의 이해' },
    16: { title: '사회 - 경제 (3)', desc: '국제경제와 무역' },
    17: { title: '사회 - 법 (1)', desc: '법의 기초 개념' },
    18: { title: '사회 - 법 (2)', desc: '헌법과 기본권' },
    19: { title: '사회 - 정치', desc: '민주주의와 정치 제도' },
    20: { title: '사회 - 사회학', desc: '사회 구조와 변동' },
    21: { title: '사회 - 종합 연습', desc: '사회 지문 실전 훈련' },
    22: { title: '과학 - 물리 (1)', desc: '역학과 에너지' },
    23: { title: '과학 - 물리 (2)', desc: '파동과 빛' },
    24: { title: '과학 - 화학 (1)', desc: '물질의 구조와 성질' },
    25: { title: '과학 - 화학 (2)', desc: '화학 반응과 에너지' },
    26: { title: '과학 - 생명과학 (1)', desc: '세포와 생명현상' },
    27: { title: '과학 - 생명과학 (2)', desc: '유전과 진화' },
    28: { title: '과학 - 지구과학', desc: '지구와 우주의 이해' },
    29: { title: '과학 - 종합 연습', desc: '과학 지문 실전 훈련' },
    30: { title: '기술 - 정보통신 (1)', desc: '컴퓨터와 네트워크' },
    31: { title: '기술 - 정보통신 (2)', desc: '인공지능과 빅데이터' },
    32: { title: '기술 - 공학 (1)', desc: '재료공학과 구조' },
    33: { title: '기술 - 공학 (2)', desc: '에너지공학' },
    34: { title: '기술 - 생명공학', desc: '유전자 기술의 이해' },
    35: { title: '기술 - 환경공학', desc: '환경문제와 기술적 해결' },
    36: { title: '기술 - 의료기술', desc: '의학 기술의 발전' },
    37: { title: '기술 - 종합 연습', desc: '기술 지문 실전 훈련' },
    38: { title: '예술 - 미술', desc: '미술 이론과 작품 감상' },
    39: { title: '예술 - 음악', desc: '음악 이론과 역사' },
    40: { title: '예술 - 건축/디자인', desc: '건축과 디자인의 이해' },
    41: { title: '융합형 (1)', desc: '인문+사회 융합 지문' },
    42: { title: '융합형 (2)', desc: '과학+기술 융합 지문' },
    43: { title: '융합형 (3)', desc: '인문+과학 융합 지문' },
    44: { title: '융합형 (4)', desc: '사회+기술 융합 지문' },
    45: { title: '융합형 (5)', desc: '고난도 융합 지문 정복' },
  },
  'literature': {
    1: { title: '현대시 - 시의 이해', desc: '시의 본질과 기본 개념' },
    2: { title: '현대시 - 표현 기법 (1)', desc: '비유법과 상징' },
    3: { title: '현대시 - 표현 기법 (2)', desc: '강조법, 변화법, 기타 기법' },
    4: { title: '현대시 - 운율', desc: '외형률과 내재율' },
    5: { title: '현대시 - 이미지', desc: '시각, 청각, 촉각적 심상' },
    6: { title: '현대시 - 주요 시인 (1)', desc: '김소월, 한용운' },
    7: { title: '현대시 - 주요 시인 (2)', desc: '윤동주, 이육사' },
    8: { title: '현대시 - 주요 시인 (3)', desc: '서정주, 박목월' },
    9: { title: '현대시 - 현대시 감상법', desc: '시 해석의 기본 원리' },
    10: { title: '현대시 - 실전 연습', desc: '기출 현대시 분석' },
    11: { title: '현대소설 - 소설의 이해', desc: '소설의 3요소와 구성' },
    12: { title: '현대소설 - 서술자와 시점', desc: '1인칭/3인칭 시점' },
    13: { title: '현대소설 - 인물 분석', desc: '인물의 유형과 성격' },
    14: { title: '현대소설 - 갈등과 주제', desc: '갈등의 유형과 주제 파악' },
    15: { title: '현대소설 - 주요 작가 (1)', desc: '이효석, 김유정' },
    16: { title: '현대소설 - 주요 작가 (2)', desc: '황순원, 오영수' },
    17: { title: '현대소설 - 주요 작가 (3)', desc: '이청준, 박완서' },
    18: { title: '현대소설 - 소설 감상법', desc: '소설 해석의 기본 원리' },
    19: { title: '현대소설 - 현대소설 연습 (1)', desc: '단편소설 분석' },
    20: { title: '현대소설 - 현대소설 연습 (2)', desc: '장편소설 발췌문 분석' },
    21: { title: '고전시가 - 향가와 고려가요', desc: '상고시대~고려시대 시가' },
    22: { title: '고전시가 - 시조의 이해', desc: '평시조, 사설시조' },
    23: { title: '고전시가 - 가사의 이해', desc: '가사 문학의 특징' },
    24: { title: '고전시가 - 주요 작품 (1)', desc: '정철, 윤선도' },
    25: { title: '고전시가 - 주요 작품 (2)', desc: '허난설헌, 신사임당' },
    26: { title: '고전시가 - 고전시가 해석법', desc: '옛말과 현대어 대응' },
    27: { title: '고전시가 - 고전시가 연습 (1)', desc: '향가, 고려가요 분석' },
    28: { title: '고전시가 - 고전시가 연습 (2)', desc: '시조 분석' },
    29: { title: '고전시가 - 고전시가 연습 (3)', desc: '가사 분석' },
    30: { title: '고전시가 - 종합 연습', desc: '고전시가 실전 훈련' },
    31: { title: '고전소설 - 고전소설의 특징', desc: '전기소설, 판소리계 소설' },
    32: { title: '고전소설 - 주요 작품 (1)', desc: '홍길동전, 허생전' },
    33: { title: '고전소설 - 주요 작품 (2)', desc: '춘향전, 심청전' },
    34: { title: '고전소설 - 주요 작품 (3)', desc: '흥부전, 토끼전' },
    35: { title: '고전소설 - 주요 작품 (4)', desc: '구운몽, 사씨남정기' },
    36: { title: '고전소설 - 고전소설 해석법', desc: '고어 해석과 문맥 파악' },
    37: { title: '고전소설 - 고전소설 연습 (1)', desc: '판소리계 소설 분석' },
    38: { title: '고전소설 - 고전소설 연습 (2)', desc: '영웅소설 분석' },
    39: { title: '고전소설 - 고전소설 연습 (3)', desc: '가정소설, 애정소설 분석' },
    40: { title: '고전소설 - 종합 연습', desc: '고전소설 실전 훈련' },
    41: { title: '복합지문 (1)', desc: '현대시+현대시 비교' },
    42: { title: '복합지문 (2)', desc: '고전시가+현대시 비교' },
    43: { title: '복합지문 (3)', desc: '고전소설+현대소설 비교' },
    44: { title: '복합지문 (4)', desc: '문학+비문학 융합' },
    45: { title: '복합지문 (5)', desc: '고난도 복합지문 정복' },
  },
  'speech-writing': {
    1: { title: '화법 - 의사소통의 원리', desc: '화법의 본질과 대화의 원리' },
    2: { title: '화법 - 협력의 원리', desc: '그라이스의 대화 격률' },
    3: { title: '화법 - 공손성의 원리', desc: '체면과 공손 전략' },
    4: { title: '화법 - 토론과 토의', desc: '논쟁과 협력적 의사결정' },
    5: { title: '화법 - 발표와 연설', desc: '효과적인 말하기 전략' },
    6: { title: '작문 - 글쓰기의 과정', desc: '계획, 집필, 수정' },
    7: { title: '작문 - 설명하는 글', desc: '정보 전달 글쓰기' },
    8: { title: '작문 - 주장하는 글', desc: '논증과 설득의 글쓰기' },
    9: { title: '작문 - 보고서와 기사문', desc: '객관적 글쓰기' },
    10: { title: '작문 - 자기소개서와 면접', desc: '자기 표현 글쓰기' },
    11: { title: '화법 실전 (1)', desc: '대화 분석하기' },
    12: { title: '화법 실전 (2)', desc: '토론 분석하기' },
    13: { title: '화법 실전 (3)', desc: '협상 분석하기' },
    14: { title: '화법 실전 (4)', desc: '발표 분석하기' },
    15: { title: '화법 실전 (5)', desc: '면접 분석하기' },
    16: { title: '화법 실전 (6)', desc: '화법 기출 분석' },
    17: { title: '화법 실전 (7)', desc: '화법 실전 모의고사 (1)' },
    18: { title: '화법 실전 (8)', desc: '화법 실전 모의고사 (2)' },
    19: { title: '작문 실전 (1)', desc: '글쓰기 과정 분석' },
    20: { title: '작문 실전 (2)', desc: '자료 활용하기' },
    21: { title: '작문 실전 (3)', desc: '고쳐쓰기 전략' },
    22: { title: '작문 실전 (4)', desc: '작문 기출 분석' },
    23: { title: '작문 실전 (5)', desc: '설명문 실전 연습' },
    24: { title: '작문 실전 (6)', desc: '논설문 실전 연습' },
    25: { title: '작문 실전 (7)', desc: '작문 실전 모의고사 (1)' },
    26: { title: '작문 실전 (8)', desc: '작문 실전 모의고사 (2)' },
    27: { title: '화작 복합 (1)', desc: '화법+작문 연계 문제' },
    28: { title: '화작 복합 (2)', desc: '고난도 화작 문제' },
    29: { title: '화작 복합 (3)', desc: '화작 종합 모의고사 (1)' },
    30: { title: '화작 복합 (4)', desc: '화작 종합 모의고사 (2)' },
  },
  'language-media': {
    1: { title: '음운론 - 음운의 개념', desc: '음운 체계의 이해' },
    2: { title: '음운론 - 음운의 변동 (1)', desc: '교체: 음절의 끝소리 규칙' },
    3: { title: '음운론 - 음운의 변동 (2)', desc: '동화: 비음화, 유음화' },
    4: { title: '음운론 - 음운의 변동 (3)', desc: '축약과 탈락' },
    5: { title: '음운론 - 음운론 종합 연습', desc: '음운 변동 실전 문제' },
    6: { title: '형태론 - 형태소와 단어', desc: '형태소의 개념과 종류' },
    7: { title: '형태론 - 단어의 형성 (1)', desc: '파생어' },
    8: { title: '형태론 - 단어의 형성 (2)', desc: '합성어' },
    9: { title: '형태론 - 품사의 분류', desc: '9품사 체계' },
    10: { title: '형태론 - 형태론 종합 연습', desc: '형태론 실전 문제' },
    11: { title: '통사론 - 문장의 구조', desc: '주어, 서술어, 목적어' },
    12: { title: '통사론 - 문장 성분', desc: '필수 성분과 부속 성분' },
    13: { title: '통사론 - 문장의 종류', desc: '홑문장과 겹문장' },
    14: { title: '통사론 - 문법 요소', desc: '시제, 높임법, 피동/사동' },
    15: { title: '통사론 - 통사론 종합 연습', desc: '통사론 실전 문제' },
    16: { title: '중세 국어 - 표기법', desc: '훈민정음과 옛 표기' },
    17: { title: '중세 국어 - 음운', desc: '옛 음운과 현대 국어' },
    18: { title: '중세 국어 - 문법', desc: '옛 문법과 현대 국어' },
    19: { title: '중세 국어 - 어휘', desc: '옛 어휘의 변천' },
    20: { title: '중세 국어 - 중세 국어 종합 연습', desc: '중세 국어 실전 문제' },
    21: { title: '매체 언어 - 매체의 특성', desc: '다양한 매체의 이해' },
    22: { title: '매체 언어 - 디지털 매체', desc: '인터넷과 SNS 언어' },
    23: { title: '매체 언어 - 영상 매체', desc: 'TV, 영화, 유튜브 분석' },
    24: { title: '매체 언어 - 광고와 뉴스', desc: '미디어 리터러시' },
    25: { title: '매체 언어 - 매체 언어 종합 연습', desc: '매체 언어 실전 문제' },
    26: { title: '언매 실전 (1)', desc: '음운론 기출 분석' },
    27: { title: '언매 실전 (2)', desc: '형태론 기출 분석' },
    28: { title: '언매 실전 (3)', desc: '통사론 기출 분석' },
    29: { title: '언매 실전 (4)', desc: '중세 국어 기출 분석' },
    30: { title: '언매 실전 (5)', desc: '언매 종합 모의고사' },
  },
  'suneung-korean': {
    1: { title: '시간 배분 전략 (1)', desc: '80분을 효율적으로 활용하는 방법' },
    2: { title: '시간 배분 전략 (2)', desc: '영역별 시간 배분 연습' },
    3: { title: '시간 배분 전략 (3)', desc: '실전 시간 관리 훈련' },
    4: { title: '독서 고난도 (1)', desc: '경제 지문 공략' },
    5: { title: '독서 고난도 (2)', desc: '법 지문 공략' },
    6: { title: '독서 고난도 (3)', desc: '과학 융합 지문 공략' },
    7: { title: '독서 고난도 (4)', desc: '기술 융합 지문 공략' },
    8: { title: '독서 고난도 (5)', desc: '철학 지문 공략' },
    9: { title: '독서 고난도 (6)', desc: '<보기> 문제 전략' },
    10: { title: '독서 고난도 (7)', desc: '추론 문제 집중 훈련' },
    11: { title: '독서 고난도 (8)', desc: '비판 문제 집중 훈련' },
    12: { title: '독서 고난도 (9)', desc: '어휘 문제 전략' },
    13: { title: '독서 고난도 (10)', desc: '독서 실전 모의고사' },
    14: { title: '문학 고난도 (1)', desc: '현대시 고난도 문제' },
    15: { title: '문학 고난도 (2)', desc: '현대소설 고난도 문제' },
    16: { title: '문학 고난도 (3)', desc: '고전시가 고난도 문제' },
    17: { title: '문학 고난도 (4)', desc: '고전소설 고난도 문제' },
    18: { title: '문학 고난도 (5)', desc: '복합지문 공략 (1)' },
    19: { title: '문학 고난도 (6)', desc: '복합지문 공략 (2)' },
    20: { title: '문학 고난도 (7)', desc: '외적 준거 적용 문제' },
    21: { title: '문학 고난도 (8)', desc: '작품 비교 문제' },
    22: { title: '문학 고난도 (9)', desc: '문학사적 맥락 문제' },
    23: { title: '문학 고난도 (10)', desc: '문학 실전 모의고사' },
    24: { title: '선택과목 집중 - 화작 (1)', desc: '화법 고난도 문제' },
    25: { title: '선택과목 집중 - 화작 (2)', desc: '작문 고난도 문제' },
    26: { title: '선택과목 집중 - 화작 (3)', desc: '화작 실전 모의고사' },
    27: { title: '선택과목 집중 - 언매 (1)', desc: '음운론 고난도 문제' },
    28: { title: '선택과목 집중 - 언매 (2)', desc: '형태론 고난도 문제' },
    29: { title: '선택과목 집중 - 언매 (3)', desc: '통사론 고난도 문제' },
    30: { title: '선택과목 집중 - 언매 (4)', desc: '중세 국어 고난도 문제' },
    31: { title: '선택과목 집중 - 언매 (5)', desc: '매체 언어 고난도 문제' },
    32: { title: '선택과목 집중 - 언매 (6)', desc: '언매 실전 모의고사' },
    33: { title: '선택과목 집중 (7)', desc: '선택과목 종합 점검' },
    34: { title: '실전 모의고사 (1)', desc: '6월 모평 유형 분석' },
    35: { title: '실전 모의고사 (2)', desc: '9월 모평 유형 분석' },
    36: { title: '실전 모의고사 (3)', desc: '수능 기출 유형 분석' },
    37: { title: '실전 모의고사 (4)', desc: '전 범위 모의고사 (1)' },
    38: { title: '실전 모의고사 (5)', desc: '전 범위 모의고사 (2)' },
    39: { title: '실전 모의고사 (6)', desc: '전 범위 모의고사 (3)' },
    40: { title: '실전 모의고사 (7)', desc: '전 범위 모의고사 (4)' },
    41: { title: '실전 모의고사 (8)', desc: '전 범위 모의고사 (5)' },
    42: { title: '실전 모의고사 (9)', desc: '오답 분석과 취약점 보완' },
    43: { title: '실전 모의고사 (10)', desc: '최종 점검 모의고사 (1)' },
    44: { title: '실전 모의고사 (11)', desc: '최종 점검 모의고사 (2)' },
    45: { title: '실전 모의고사 (12)', desc: '수능 D-1 최종 정리' },
  },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'reading': {
    units: [
      { name: '1단원: 독서론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 인문', days: [6, 7, 8, 9, 10, 11, 12, 13] },
      { name: '3단원: 사회', days: [14, 15, 16, 17, 18, 19, 20, 21] },
      { name: '4단원: 과학', days: [22, 23, 24, 25, 26, 27, 28, 29] },
      { name: '5단원: 기술', days: [30, 31, 32, 33, 34, 35, 36, 37] },
      { name: '6단원: 예술', days: [38, 39, 40] },
      { name: '7단원: 융합형 지문', days: [41, 42, 43, 44, 45] },
    ],
  },
  'literature': {
    units: [
      { name: '1단원: 현대시', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 현대소설', days: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
      { name: '3단원: 고전시가', days: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 고전소설', days: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
      { name: '5단원: 복합지문 연습', days: [41, 42, 43, 44, 45] },
    ],
  },
  'speech-writing': {
    units: [
      { name: '1단원: 화법 이론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 작문 이론', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 화법 실전', days: [11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '4단원: 작문 실전', days: [19, 20, 21, 22, 23, 24, 25, 26] },
      { name: '5단원: 화작 복합', days: [27, 28, 29, 30] },
    ],
  },
  'language-media': {
    units: [
      { name: '1단원: 음운론', days: [1, 2, 3, 4, 5] },
      { name: '2단원: 형태론', days: [6, 7, 8, 9, 10] },
      { name: '3단원: 통사론', days: [11, 12, 13, 14, 15] },
      { name: '4단원: 중세 국어', days: [16, 17, 18, 19, 20] },
      { name: '5단원: 매체 언어', days: [21, 22, 23, 24, 25] },
      { name: '6단원: 언매 실전', days: [26, 27, 28, 29, 30] },
    ],
  },
  'suneung-korean': {
    units: [
      { name: '1단원: 시간 배분 전략', days: [1, 2, 3] },
      { name: '2단원: 독서 고난도', days: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      { name: '3단원: 문학 고난도', days: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '4단원: 선택과목 집중', days: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
      { name: '5단원: 실전 모의고사', days: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
};

export default function KoreanSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];
  const titles = lessonTitles[subject] || {};

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`korean-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/korean" className="text-rose-600 hover:underline">
            국어 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/course/korean" className="text-gray-300 hover:text-white transition">
                국어 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/korean" className="hover:underline">국어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{info.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80 mt-1">{info.description}</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedDays.length} / {info.totalDays}일 완료</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 단원별 레슨 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {units.map((unit, unitIdx) => (
            <div key={unitIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="font-bold text-gray-900">{unit.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {unit.days.filter(d => completedDays.includes(d)).length} / {unit.days.length}일 완료
                </p>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    const lessonInfo = titles[day] || { title: `Day ${day}`, desc: '학습 콘텐츠' };
                    return (
                      <Link
                        key={day}
                        href={`/course/korean/${subject}/lesson/${day}`}
                        className={`
                          block p-4 rounded-xl transition border-l-4
                          ${isCompleted
                            ? 'bg-green-50 border-green-500 hover:bg-green-100'
                            : 'bg-gray-50 border-gray-200 hover:bg-rose-50 hover:border-rose-400'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold
                            ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                          `}>
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : day}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold truncate ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                              {lessonInfo.title}
                            </h3>
                            <p className={`text-sm truncate ${isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                              {lessonInfo.desc}
                            </p>
                          </div>
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 ${isCompleted ? 'text-green-400' : 'text-gray-400'}`} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 안내 */}
        <div className="mt-8 bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 개념 이해하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">연습 문제를 풀고 오답 분석하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm text-gray-600">유튜브 참고 영상으로 심화 학습</p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
