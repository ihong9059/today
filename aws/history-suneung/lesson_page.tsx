'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Youtube, ExternalLink, Castle, Scroll, Flag, Users } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; bgColor: string; textColor: string; icon: any; totalDays: number } } = {
  'premodern': { name: '전근대사', color: 'from-amber-500 to-orange-600', bgColor: 'from-slate-50 to-amber-50', textColor: 'amber', icon: Castle, totalDays: 20 },
  'modern': { name: '근대사', color: 'from-blue-500 to-indigo-600', bgColor: 'from-slate-50 to-blue-50', textColor: 'blue', icon: Scroll, totalDays: 15 },
  'colonial': { name: '일제강점기', color: 'from-red-500 to-rose-600', bgColor: 'from-slate-50 to-red-50', textColor: 'red', icon: Flag, totalDays: 20 },
  'contemporary': { name: '현대사', color: 'from-green-500 to-emerald-600', bgColor: 'from-slate-50 to-green-50', textColor: 'green', icon: Users, totalDays: 15 },
  'mock-test': { name: '실전 모의고사', color: 'from-purple-500 to-pink-600', bgColor: 'from-slate-50 to-purple-50', textColor: 'purple', icon: Target, totalDays: 20 },
};

// 전근대사 레슨 데이터
const premodernLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '선사시대와 청동기·철기',
    desc: '구석기, 신석기, 청동기, 철기 시대의 특징',
    prompt: `수능 한국사에서 "선사시대와 청동기·철기 문화"에 대해 알려주세요.

1. 왜 선사시대를 배워야 할까요?
   - 한국사의 시작
   - 수능 출제 빈도와 중요성

2. 핵심 개념
   - 구석기: 뗀석기, 주먹도끼, 이동생활
   - 신석기: 간석기, 빗살무늬토기, 정착생활
   - 청동기: 비파형동검, 고인돌, 계급발생
   - 철기: 철제농기구, 세형동검, 중국과 교류

3. 수능 출제 유형
   - 유물 사진 제시 → 시대 판별
   - 시대별 특징 비교
   - 유적지와 유물 연결

4. 연습 문제 (5개)
   - 기본 개념 3문제
   - 수능형 응용 2문제

5. 다음 단계 예고
   (다음은 "고조선과 여러 나라의 성장"입니다)`,
    funFact: '💡 재미있는 사실: 고인돌은 한반도에 약 3만 개가 있어서 전 세계 고인돌의 40% 이상을 차지해요!',
    challenge: '🎯 도전 과제: 구석기→신석기→청동기→철기의 주요 유물 하나씩 암기해보세요!',
    youtubeKeyword: '수능 한국사 선사시대 청동기 철기 강의'
  },
  2: {
    title: '고조선과 여러 나라의 성장',
    desc: '단군왕검, 위만조선, 부여, 고구려, 옥저, 동예, 삼한',
    prompt: `수능 한국사에서 "고조선과 여러 나라의 성장"에 대해 알려주세요.

1. 고조선
   - 건국: 단군왕검 (BC 2333년)
   - 8조법금: 생명, 재산, 노동력 존중
   - 위만조선: 철기문화, 중계무역
   - 멸망: 한 무제 침략 (BC 108년)

2. 여러 나라의 성장
   - 부여: 영고(제천행사), 1책12법, 순장
   - 고구려: 동맹, 서옥제, 형사취수제
   - 옥저: 민며느리제, 가족공동무덤
   - 동예: 무천, 책화, 단궁·과하마
   - 삼한: 천군, 소도, 두레

3. 수능 출제 유형
   - 나라별 풍습 구별하기
   - 제천행사 연결하기
   - 8조법금 내용 파악

4. 연습 문제 (5개)

5. 다음 단계 예고
   (다음은 "삼국의 성립과 발전"입니다)`,
    funFact: '💡 재미있는 사실: "소도"는 신성한 구역으로, 죄인이라도 들어가면 잡지 못했대요!',
    challenge: '🎯 도전 과제: 영고-동맹-무천이 각각 어느 나라 제천행사인지 외워보세요!',
    youtubeKeyword: '수능 한국사 고조선 여러나라 부여 삼한 강의'
  },
  3: {
    title: '삼국의 성립과 발전',
    desc: '고구려, 백제, 신라의 건국과 전성기',
    prompt: `수능 한국사에서 "삼국의 성립과 발전"에 대해 알려주세요.

1. 고구려
   - 건국: 주몽 (BC 37년)
   - 태조왕: 옥저 정복
   - 광개토대왕: 영토 확장, 광개토대왕릉비
   - 장수왕: 평양 천도, 남진정책

2. 백제
   - 건국: 온조 (BC 18년)
   - 근초고왕: 마한 통합, 전성기
   - 무령왕: 22담로 설치
   - 성왕: 사비 천도, 국호 남부여

3. 신라
   - 건국: 박혁거세 (BC 57년)
   - 법흥왕: 불교 공인, 율령 반포
   - 진흥왕: 한강 유역 점령, 순수비

4. 수능 출제 유형
   - 왕과 업적 연결하기
   - 비석 내용 분석

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 광개토대왕릉비는 높이 6.39m로, 현존하는 최대의 고구려 비석이에요!',
    challenge: '🎯 도전 과제: 고구려-백제-신라의 전성기 왕을 암기해보세요!',
    youtubeKeyword: '수능 한국사 삼국 고구려 백제 신라 강의'
  },
  4: {
    title: '삼국의 문화와 대외관계',
    desc: '불교, 유학, 고분, 일본 전파',
    prompt: `수능 한국사에서 "삼국의 문화와 대외관계"에 대해 알려주세요.

1. 불교의 수용
   - 고구려: 소수림왕 (372년)
   - 백제: 침류왕 (384년)
   - 신라: 법흥왕 (527년, 이차돈 순교)

2. 고분 문화
   - 고구려: 돌무지무덤 → 굴식돌방무덤 (벽화)
   - 백제: 굴식돌방무덤 (무령왕릉)
   - 신라: 돌무지덧널무덤 (천마총)

3. 대외관계
   - 일본 전파: 아직기(한자), 왕인(천자문), 담징(종이,먹)
   - 중국: 조공·책봉 관계

4. 수능 출제 유형
   - 고분 양식 비교
   - 문화 전파 경로
   - 승려·학자 업적

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 담징은 일본에 종이와 먹 만드는 법을 전했고, 호류지 금당벽화를 그렸대요!',
    challenge: '🎯 도전 과제: 삼국의 불교 수용 순서와 왕을 외워보세요!',
    youtubeKeyword: '수능 한국사 삼국문화 고분 불교 강의'
  },
  5: {
    title: '신라의 삼국통일과 남북국시대',
    desc: '삼국통일, 통일신라, 발해',
    prompt: `수능 한국사에서 "신라의 삼국통일과 남북국시대"에 대해 알려주세요.

1. 삼국통일 과정
   - 나당연합: 660년 백제 멸망
   - 668년 고구려 멸망
   - 나당전쟁: 매소성, 기벌포 승리
   - 676년 삼국통일 완성

2. 통일신라
   - 신문왕: 국학 설립, 9주 5소경
   - 원성왕: 독서삼품과
   - 장보고: 청해진, 해상무역

3. 발해
   - 건국: 대조영 (698년)
   - 무왕: 당 공격, 산둥반도 공격
   - 선왕: 해동성국, 5경 15부 62주

4. 수능 출제 유형
   - 삼국통일 과정 순서
   - 통일신라 vs 발해 비교
   - 제도 연결하기

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 발해는 "해동성국"이라 불렸는데, 바다 동쪽의 번성한 나라라는 뜻이에요!',
    challenge: '🎯 도전 과제: 660→668→676 삼국통일 과정을 정리해보세요!',
    youtubeKeyword: '수능 한국사 삼국통일 발해 남북국시대 강의'
  },
};

// 근대사 레슨 데이터
const modernLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '흥선대원군의 정치와 개항',
    desc: '대원군의 개혁과 강화도조약',
    prompt: `수능 한국사에서 "흥선대원군의 정치와 개항"에 대해 알려주세요.

1. 흥선대원군의 개혁
   - 왕권 강화: 세도정치 타파, 비변사 폐지
   - 서원 철폐: 47개만 남김
   - 호포제: 양반에게도 군포 징수
   - 경복궁 중건: 당백전, 원납전 문제

2. 통상수교 거부 정책
   - 병인박해 (1866): 천주교 탄압
   - 병인양요 (1866): 프랑스 침략
   - 오페르트 도굴 사건 (1868)
   - 신미양요 (1871): 미국 침략
   - 척화비 건립

3. 강화도조약 (1876)
   - 최초의 근대적 조약
   - 불평등 조약: 치외법권, 해안측량권
   - 부산·원산·인천 개항

4. 수능 출제 유형
   - 대원군 정책 판별
   - 양요 비교
   - 조약 내용 분석

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 척화비에는 "洋夷侵犯 非戰則和 主和賣國"이라고 적혀 있어요!',
    challenge: '🎯 도전 과제: 병인양요(1866)-신미양요(1871)-강화도조약(1876) 순서를 암기하세요!',
    youtubeKeyword: '수능 한국사 흥선대원군 강화도조약 강의'
  },
  2: {
    title: '개화정책과 임오군란·갑신정변',
    desc: '통리기무아문, 별기군, 급진개화파',
    prompt: `수능 한국사에서 "개화정책과 임오군란·갑신정변"에 대해 알려주세요.

1. 개화정책
   - 통리기무아문 설치 (1880)
   - 별기군 창설: 일본식 군대
   - 영선사 (청), 조사시찰단 (일본)
   - 신사유람단: 박정양 등

2. 임오군란 (1882)
   - 원인: 구식 군인 차별, 밀린 급료
   - 결과: 청군 개입, 제물포조약
   - 청의 내정간섭 강화

3. 갑신정변 (1884)
   - 주체: 급진개화파 (김옥균, 박영효)
   - 14개조 개혁안: 문벌폐지, 재정일원화
   - 3일 천하: 청군 개입으로 실패
   - 한성조약, 톈진조약

4. 수능 출제 유형
   - 임오군란 vs 갑신정변 비교
   - 개화파 분류
   - 조약 내용

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 갑신정변은 "3일 천하"로 끝났지만, 14개조 개혁안은 이후 갑오개혁에 영향을 줬어요!',
    challenge: '🎯 도전 과제: 임오군란(1882)-갑신정변(1884)의 차이점을 정리해보세요!',
    youtubeKeyword: '수능 한국사 임오군란 갑신정변 개화 강의'
  },
  3: {
    title: '동학농민운동',
    desc: '고부봉기부터 우금치전투까지',
    prompt: `수능 한국사에서 "동학농민운동"에 대해 알려주세요.

1. 배경
   - 삼정문란, 외세침략
   - 동학: 인내천, 보국안민, 제폭구민

2. 1차 봉기 (1894.1~5)
   - 고부봉기: 전봉준, 조병갑
   - 백산봉기: 4대 명의
   - 황토현, 황룡촌 전투 승리
   - 전주화약: 폐정개혁 12개조
   - 집강소 설치

3. 2차 봉기 (1894.9~12)
   - 원인: 일본의 경복궁 점령
   - 공주 우금치전투 패배
   - 전봉준 체포, 처형

4. 수능 출제 유형
   - 1차 vs 2차 봉기 비교
   - 폐정개혁안 내용
   - 집강소 역할

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 전봉준의 별명은 "녹두장군"인데, 키가 작고 얼굴이 녹두처럼 생겨서래요!',
    challenge: '🎯 도전 과제: 고부봉기→백산봉기→전주화약→우금치전투 순서를 외워보세요!',
    youtubeKeyword: '수능 한국사 동학농민운동 전봉준 강의'
  },
};

// 일제강점기 레슨 데이터
const colonialLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '무단통치 (1910년대)',
    desc: '헌병경찰, 토지조사사업',
    prompt: `수능 한국사에서 "일제 무단통치"에 대해 알려주세요.

1. 무단통치의 특징
   - 헌병경찰제: 즉결처분권
   - 조선태형령: 태형(곤장)
   - 언론·집회·결사 금지
   - 105인 사건: 신민회 탄압

2. 토지조사사업 (1910~1918)
   - 목적: 토지 약탈, 세금 확보
   - 기한부 신고제
   - 결과: 동양척식주식회사 토지 약탈
   - 농민의 소작농 전락

3. 회사령 (1910)
   - 총독부 허가제
   - 민족자본 성장 억제

4. 수능 출제 유형
   - 1910년대 통치 특징
   - 토지조사사업 영향
   - 경제 수탈 정책

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 1910년대를 "무단통치"라고 부르는 이유는 군인(헌병)이 경찰을 겸했기 때문이에요!',
    challenge: '🎯 도전 과제: 토지조사사업의 기한부 신고제가 왜 문제였는지 정리해보세요!',
    youtubeKeyword: '수능 한국사 무단통치 토지조사사업 강의'
  },
  2: {
    title: '3.1운동',
    desc: '민족자결주의, 독립선언, 전개과정',
    prompt: `수능 한국사에서 "3.1운동"에 대해 알려주세요.

1. 배경
   - 윌슨의 민족자결주의
   - 2.8 독립선언 (도쿄)
   - 고종 독살설

2. 전개
   - 1919.3.1: 독립선언서 낭독
   - 민족대표 33인 (종교계)
   - 탑골공원 → 전국 확산
   - 만세시위 → 무력항쟁

3. 일제의 탄압
   - 제암리 학살
   - 유관순 순국

4. 영향
   - 대한민국 임시정부 수립
   - 일제 통치방식 변화 (문화통치)
   - 독립운동의 분수령

5. 수능 출제 유형
   - 배경과 영향
   - 전개 과정
   - 의의 파악

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 3.1운동 당시 약 200만 명이 참여했고, 이는 당시 인구의 약 10%예요!',
    challenge: '🎯 도전 과제: 3.1운동의 배경-전개-영향을 시간순으로 정리해보세요!',
    youtubeKeyword: '수능 한국사 3.1운동 독립선언 강의'
  },
  3: {
    title: '대한민국 임시정부',
    desc: '상해 임시정부, 활동, 한국광복군',
    prompt: `수능 한국사에서 "대한민국 임시정부"에 대해 알려주세요.

1. 수립 (1919.4.11)
   - 상해에서 수립
   - 민주공화제 채택
   - 삼권분립: 대통령 이승만

2. 초기 활동
   - 연통제, 교통국
   - 독립신문 발간
   - 파리강화회의 파견 (김규식)

3. 시련과 재정비
   - 국민대표회의 (1923): 분열
   - 김구 주도 재정비
   - 한인애국단: 이봉창, 윤봉길 의거

4. 한국광복군 (1940)
   - 총사령관: 지청천
   - 인도-버마 전선 참전
   - 국내진공작전 준비 (광복으로 무산)

5. 수능 출제 유형
   - 임시정부 조직
   - 시기별 활동
   - 광복군 활동

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 임시정부는 상해→항주→중경 등 중국 각지를 이동하며 27년간 활동했어요!',
    challenge: '🎯 도전 과제: 임시정부의 이동 경로와 주요 사건을 연결해보세요!',
    youtubeKeyword: '수능 한국사 대한민국임시정부 광복군 강의'
  },
};

// 현대사 레슨 데이터
const contemporaryLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '8.15 광복과 분단',
    desc: '광복, 모스크바3상회의, 신탁통치',
    prompt: `수능 한국사에서 "8.15 광복과 분단"에 대해 알려주세요.

1. 8.15 광복 (1945)
   - 일본 무조건 항복
   - 건국준비위원회 (여운형)
   - 38선 분단: 미소 분할점령

2. 모스크바 3상회의 (1945.12)
   - 미·영·소 외상회의
   - 결정: 임시정부 수립 → 최대 5년 신탁통치
   - 좌우 대립 격화

3. 미소공동위원회
   - 1차 결렬 (1946)
   - 좌우합작운동 (여운형, 김규식)
   - 2차 결렬 (1947)

4. UN 결의
   - 남북한 총선거 결의
   - 소련 거부 → 남한만 선거

5. 수능 출제 유형
   - 광복 직후 정세
   - 좌우 대립
   - 분단 과정

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 38선은 미국 대령 2명이 30분 만에 그은 선이었대요!',
    challenge: '🎯 도전 과제: 광복(1945.8)→모스크바회의(1945.12)→5.10총선(1948.5) 순서 정리!',
    youtubeKeyword: '수능 한국사 광복 분단 모스크바3상회의 강의'
  },
  2: {
    title: '대한민국 정부 수립과 6.25전쟁',
    desc: '5.10총선, 제헌헌법, 6.25전쟁',
    prompt: `수능 한국사에서 "대한민국 정부 수립과 6.25전쟁"에 대해 알려주세요.

1. 5.10 총선거 (1948)
   - 남한만 총선거
   - 제헌국회 구성
   - 제헌헌법: 대통령 간선제

2. 정부 수립
   - 대한민국 (1948.8.15): 이승만
   - 조선민주주의인민공화국 (1948.9.9): 김일성

3. 6.25 전쟁 (1950.6.25~1953.7.27)
   - 북한 남침
   - 낙동강 방어선
   - 인천상륙작전 (1950.9.15)
   - 중공군 개입 → 1.4 후퇴
   - 휴전협정 (판문점)

4. 전쟁의 영향
   - 분단 고착화
   - 반공체제 강화
   - 경제 파탄

5. 수능 출제 유형
   - 전쟁 전개 순서
   - 휴전협정 내용
   - 전쟁 영향

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 인천상륙작전의 성공 확률은 5000분의 1이었다고 맥아더가 말했대요!',
    challenge: '🎯 도전 과제: 6.25 전쟁의 주요 전투를 시간순으로 나열해보세요!',
    youtubeKeyword: '수능 한국사 6.25전쟁 인천상륙작전 강의'
  },
  3: {
    title: '4.19혁명과 5.16군사정변',
    desc: '이승만 하야, 장면 내각, 박정희',
    prompt: `수능 한국사에서 "4.19혁명과 5.16군사정변"에 대해 알려주세요.

1. 이승만 정권
   - 발췌개헌 (1952): 직선제
   - 사사오입개헌 (1954): 초대 대통령 제한 철폐
   - 3.15 부정선거 (1960)

2. 4.19 혁명 (1960.4.19)
   - 학생, 시민 봉기
   - 이승만 하야
   - 의의: 민주주의 수호

3. 장면 내각 (1960~1961)
   - 내각책임제, 양원제
   - 민주당 신·구파 갈등
   - 혁신계 활동

4. 5.16 군사정변 (1961.5.16)
   - 박정희 주도
   - 국가재건최고회의
   - 제3공화국 출범

5. 수능 출제 유형
   - 이승만 정권 개헌
   - 4.19 배경과 의의
   - 장면 내각 특징

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 4.19혁명 때 "부정선거 다시 하라!"는 구호가 울려 퍼졌어요!',
    challenge: '🎯 도전 과제: 발췌개헌(1952)-사사오입(1954)-4.19(1960) 순서를 정리하세요!',
    youtubeKeyword: '수능 한국사 4.19혁명 5.16군사정변 강의'
  },
  4: {
    title: '민주화운동의 전개',
    desc: '유신체제, 5.18, 6월항쟁',
    prompt: `수능 한국사에서 "민주화운동의 전개"에 대해 알려주세요.

1. 유신체제 (1972~1979)
   - 10월 유신: 대통령 간선제, 긴급조치권
   - 민청학련 사건 (1974)
   - YH 사건 → 부마항쟁 (1979)
   - 10.26 사태: 박정희 서거

2. 5.18 민주화운동 (1980.5.18)
   - 12.12 군사반란 → 전두환 집권
   - 광주 시민 봉기
   - 계엄군 진압
   - 의의: 민주주의 수호의 상징

3. 6월 민주항쟁 (1987.6)
   - 박종철 고문치사
   - 4.13 호헌조치
   - 이한열 사망
   - 6.29 민주화선언

4. 수능 출제 유형 (100% 출제!)
   - 민주화운동 순서
   - 각 운동의 배경과 결과
   - 정부별 연결

5. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 6월항쟁 때 전국에서 100만 명 이상이 넥타이부대로 참여했어요!',
    challenge: '🎯 도전 과제: 4.19→유신→5.18→6월항쟁 민주화운동 흐름을 정리하세요!',
    youtubeKeyword: '수능 한국사 5.18민주화운동 6월항쟁 강의'
  },
  5: {
    title: '남북관계의 변화',
    desc: '7.4공동성명, 남북기본합의서, 6.15선언',
    prompt: `수능 한국사에서 "남북관계의 변화"에 대해 알려주세요.

1. 박정희 정부
   - 7.4 남북공동성명 (1972)
   - 3대 원칙: 자주, 평화, 민족대단결
   - 남북조절위원회

2. 노태우 정부
   - 북방정책
   - 남북한 유엔 동시가입 (1991)
   - 남북기본합의서 (1991.12)
   - 한반도 비핵화 공동선언

3. 김대중 정부
   - 햇볕정책
   - 제1차 남북정상회담 (2000.6)
   - 6.15 남북공동선언
   - 개성공단, 금강산관광, 경의선 연결

4. 노무현 정부
   - 제2차 남북정상회담 (2007.10)
   - 10.4 선언

5. 수능 출제 유형 (매년 출제!)
   - 정부별 남북관계
   - 선언 내용
   - 연도 연결

6. 연습 문제 (5개)`,
    funFact: '💡 재미있는 사실: 김대중 대통령은 6.15 선언으로 노벨평화상을 수상했어요 (2000년)!',
    challenge: '🎯 도전 과제: 7.4(1972)-남북기본합의서(1991)-6.15(2000) 정부별로 외우세요!',
    youtubeKeyword: '수능 한국사 남북관계 7.4공동성명 6.15선언 강의'
  },
};

// 기본 레슨 데이터
const getDefaultLesson = (subject: string, day: number) => ({
  title: `Day ${day} 학습`,
  desc: `${subjectInfo[subject]?.name || subject} ${day}일차`,
  prompt: `${subjectInfo[subject]?.name || subject} ${day}일차 학습 내용을 자세히 알려주세요.

1. 오늘의 학습 목표
2. 핵심 개념 설명
   - 주요 사건과 인물
   - 시대적 배경
3. 수능 출제 유형
4. 연습 문제 (5개)
5. 다음 단계 예고`,
  funFact: '💡 학습 팁: 한국사는 연표가 핵심! 시대 순서를 먼저 잡으세요.',
  challenge: '🎯 도전 과제: 오늘 배운 내용의 핵심 키워드 5개를 암기하세요!',
  youtubeKeyword: `수능 ${subjectInfo[subject]?.name || subject} 강의`
});

const getLessonData = (subject: string, day: number) => {
  switch (subject) {
    case 'premodern':
      return premodernLessons[day] || getDefaultLesson(subject, day);
    case 'modern':
      return modernLessons[day] || getDefaultLesson(subject, day);
    case 'colonial':
      return colonialLessons[day] || getDefaultLesson(subject, day);
    case 'contemporary':
      return contemporaryLessons[day] || getDefaultLesson(subject, day);
    default:
      return getDefaultLesson(subject, day);
  }
};

export default function HistorySuneungLessonPage() {
  const params = useParams();
  const subject = params.subject as string;
  const day = Number(params.day);
  const subjectData = subjectInfo[subject];
  const lesson = getLessonData(subject, day);

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`history-suneung-${subject}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [subject, day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const urls = {
      claude: 'https://claude.ai/new',
      chatgpt: 'https://chat.openai.com/',
      gemini: 'https://gemini.google.com/',
    };
    window.open(urls[selectedAI], '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`history-suneung-${subject}-day${day}-completed`, 'true');

    // 전체 완료 목록 업데이트
    const savedList = localStorage.getItem(`history-suneung-${subject}-completed`);
    const completedList = savedList ? JSON.parse(savedList) : [];
    if (!completedList.includes(day)) {
      completedList.push(day);
      localStorage.setItem(`history-suneung-${subject}-completed`, JSON.stringify(completedList));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const openYouTube = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(searchUrl, '_blank');
  };

  if (!subjectData) {
    return <div className="min-h-screen flex items-center justify-center">과목을 찾을 수 없습니다.</div>;
  }

  const maxDay = subjectData.totalDays;
  const IconComponent = subjectData.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${subjectData.bgColor}`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '🏛️'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2"><Brain className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/history-suneung" className="hover:text-amber-600">한국사 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/history-suneung/${subject}`} className="hover:text-amber-600">{subjectData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${subjectData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">{subjectData.name}</div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-white/80">{lesson.desc}</p>
              </div>
            </div>
            {completed && (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">완료!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 mb-1">학습 팁</p>
              <p className="text-amber-700 text-sm">{lesson.funFact}</p>
            </div>
          </div>
        </div>

        {/* AI 프롬프트 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className={`w-5 h-5 text-${subjectData.textColor}-500`} />
              AI 프롬프트
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt' | 'gemini')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : `bg-gradient-to-r ${subjectData.color} text-white`}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI 열기
            </button>
          </div>
        </div>

        {/* 유튜브 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-red-500" />
            유튜브 참고 영상
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            관련 강의 영상을 검색하여 심화 학습을 해보세요.
          </p>
          <button
            onClick={openYouTube}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            유튜브에서 검색하기
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* 도전 과제 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-800 font-medium">{lesson.challenge}</p>
        </div>

        {/* 완료 버튼 */}
        {!completed ? (
          <button
            onClick={markComplete}
            className={`w-full bg-gradient-to-r ${subjectData.color} text-white py-4 rounded-xl font-bold text-lg transition hover:opacity-90 flex items-center justify-center gap-2`}
          >
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        ) : (
          <div className="bg-green-100 text-green-800 py-4 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료! 수고하셨습니다!
          </div>
        )}

        {/* 네비게이션 */}
        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link
              href={`/course/history-suneung/${subject}/lesson/${day - 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨
            </Link>
          ) : <div />}
          {day < maxDay ? (
            <Link
              href={`/course/history-suneung/${subject}/lesson/${day + 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition"
            >
              다음 레슨
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/course/history-suneung/${subject}`}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
            >
              코스 완료!
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
