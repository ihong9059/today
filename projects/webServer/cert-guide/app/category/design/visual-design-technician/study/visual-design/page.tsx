'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function VisualDesignStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('visual-design-technician-visual-design-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('visual-design-technician-visual-design-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const topics = [
    {
      id: 1,
      name: '시각전달 원리',
      icon: '📡',
      questions: [
        { id: 1, question: '시각커뮤니케이션(Visual Communication)이란?', answer: '시각적 요소를 통해 정보와 메시지를 전달하는 과정', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 시각커뮤니케이션(Visual Communication)이란?\n\n다음 순서로 설명해주세요:\n1. 시각커뮤니케이션의 정의\n2. 커뮤니케이션 모델 (송신자-메시지-수신자)\n3. 시각적 요소의 역할\n4. 효과적인 시각커뮤니케이션 방법\n5. 연습문제 3개' },
        { id: 2, question: '기호학(Semiotics)에서 기표와 기의란?', answer: '기표(Signifier)는 표현 형식, 기의(Signified)는 의미 내용', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 기호학(Semiotics)에서 기표와 기의란?\n\n다음 순서로 설명해주세요:\n1. 소쉬르의 기호학 개념\n2. 기표와 기의의 관계\n3. 디자인에서의 기호학 적용\n4. 브랜드 심볼과 기호학\n5. 연습문제 3개' },
        { id: 3, question: '아이콘, 인덱스, 심볼의 차이는?', answer: '아이콘(유사), 인덱스(인과), 심볼(관습적 약속)', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 아이콘, 인덱스, 심볼의 차이는?\n\n다음 순서로 설명해주세요:\n1. 퍼스(Peirce)의 기호 분류\n2. 각 유형의 정의와 예시\n3. 시각디자인에서의 활용\n4. 픽토그램과 기호 유형\n5. 연습문제 3개' },
        { id: 4, question: '시각적 위계(Visual Hierarchy)란?', answer: '중요도에 따라 시각 요소를 배치하여 정보 전달 순서 결정', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 시각적 위계(Visual Hierarchy)란?\n\n다음 순서로 설명해주세요:\n1. 시각적 위계의 정의와 목적\n2. 위계 설정 방법 (크기, 색상, 위치)\n3. 편집디자인에서의 위계\n4. 웹/앱에서의 시각적 위계\n5. 연습문제 3개' },
        { id: 5, question: '포컬포인트(Focal Point)란?', answer: '디자인에서 시선이 가장 먼저 향하는 시각적 중심점', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 포컬포인트(Focal Point)란?\n\n다음 순서로 설명해주세요:\n1. 포컬포인트의 정의\n2. 포컬포인트 생성 방법\n3. 광고디자인에서의 활용\n4. 시선 유도와 포컬포인트\n5. 연습문제 3개' },
        { id: 6, question: '시각적 노이즈(Visual Noise)란?', answer: '메시지 전달을 방해하는 불필요한 시각 요소', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 시각적 노이즈(Visual Noise)란?\n\n다음 순서로 설명해주세요:\n1. 시각적 노이즈의 개념\n2. 노이즈의 유형과 원인\n3. 노이즈 제거 방법\n4. 미니멀리즘과 노이즈\n5. 연습문제 3개' },
        { id: 7, question: 'AIDA 모델이란?', answer: 'Attention(주의), Interest(관심), Desire(욕구), Action(행동) 광고 효과 모델', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: AIDA 모델이란?\n\n다음 순서로 설명해주세요:\n1. AIDA 모델의 정의와 역사\n2. 각 단계의 역할\n3. 광고디자인에서의 적용\n4. 현대적 변형 모델\n5. 연습문제 3개' },
        { id: 8, question: '픽토그램(Pictogram)의 특징은?', answer: '언어를 초월한 보편적 이해 가능한 그림 기호', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 픽토그램(Pictogram)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 픽토그램의 정의와 역사\n2. 좋은 픽토그램의 조건\n3. 올림픽 픽토그램 사례\n4. 공공 사인에서의 활용\n5. 연습문제 3개' },
        { id: 9, question: '데이터 시각화(Data Visualization)의 목적은?', answer: '복잡한 데이터를 이해하기 쉽게 시각적으로 표현', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 데이터 시각화(Data Visualization)의 목적은?\n\n다음 순서로 설명해주세요:\n1. 데이터 시각화의 정의\n2. 차트와 그래프 유형\n3. 인포그래픽 제작 원칙\n4. 데이터 시각화 도구\n5. 연습문제 3개' },
        { id: 10, question: '시각적 은유(Visual Metaphor)란?', answer: '추상적 개념을 구체적 이미지로 비유하여 표현', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 시각적 은유(Visual Metaphor)란?\n\n다음 순서로 설명해주세요:\n1. 시각적 은유의 정의\n2. 은유의 유형과 사례\n3. 광고에서의 은유 활용\n4. 효과적인 은유 개발 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 2,
      name: '타이포그래피',
      icon: '✏️',
      questions: [
        { id: 11, question: '타이포그래피(Typography)의 정의는?', answer: '활자를 사용하여 텍스트를 배열하고 디자인하는 기술', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 타이포그래피(Typography)의 정의는?\n\n다음 순서로 설명해주세요:\n1. 타이포그래피의 역사와 발전\n2. 활자의 기본 요소\n3. 타이포그래피의 역할\n4. 디지털 시대의 타이포그래피\n5. 연습문제 3개' },
        { id: 12, question: '세리프(Serif)와 산세리프(Sans-serif)의 차이는?', answer: '세리프는 획 끝에 장식(삐침), 산세리프는 장식 없음', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 세리프(Serif)와 산세리프(Sans-serif)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 세리프체의 특징과 종류\n2. 산세리프체의 특징과 종류\n3. 가독성과 용도 비교\n4. 대표 서체 예시\n5. 연습문제 3개' },
        { id: 13, question: '자간(Kerning)과 행간(Leading)의 차이는?', answer: '자간은 글자 사이 간격, 행간은 줄 사이 간격', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 자간(Kerning)과 행간(Leading)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 자간(Kerning)의 정의와 조절\n2. 행간(Leading)의 정의와 설정\n3. 트래킹과 자간의 차이\n4. 적절한 간격 설정 방법\n5. 연습문제 3개' },
        { id: 14, question: '서체의 굵기(Weight) 종류는?', answer: 'Light, Regular, Medium, Bold, Black 등', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 서체의 굵기(Weight) 종류는?\n\n다음 순서로 설명해주세요:\n1. 서체 굵기의 분류\n2. 굵기에 따른 활용\n3. 가변 폰트(Variable Font)\n4. 적절한 굵기 조합\n5. 연습문제 3개' },
        { id: 15, question: 'X-height란?', answer: '소문자 x의 높이, 서체의 가독성에 영향', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: X-height란?\n\n다음 순서로 설명해주세요:\n1. X-height의 정의\n2. 활자 해부학 용어\n3. X-height와 가독성 관계\n4. 서체 선택 시 고려사항\n5. 연습문제 3개' },
        { id: 16, question: '레터링(Lettering)과 캘리그래피(Calligraphy)의 차이는?', answer: '레터링은 문자 그리기, 캘리그래피는 문자 쓰기', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 레터링(Lettering)과 캘리그래피(Calligraphy)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 레터링의 정의와 특징\n2. 캘리그래피의 정의와 역사\n3. 각각의 제작 방법\n4. 디자인에서의 활용\n5. 연습문제 3개' },
        { id: 17, question: '서체 분류 체계(폭스 분류)는?', answer: 'Old Style, Transitional, Modern, Slab Serif, Sans Serif', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 서체 분류 체계(폭스 분류)는?\n\n다음 순서로 설명해주세요:\n1. 서체 분류의 필요성\n2. 주요 분류 체계 설명\n3. 각 분류의 특징과 예시\n4. 서체 선택 가이드\n5. 연습문제 3개' },
        { id: 18, question: '텍스트 정렬(Alignment) 방식은?', answer: '좌측, 우측, 가운데, 양쪽 정렬', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 텍스트 정렬(Alignment) 방식은?\n\n다음 순서로 설명해주세요:\n1. 각 정렬 방식의 특징\n2. 정렬에 따른 느낌과 효과\n3. 적절한 정렬 선택\n4. 래그(Rag) 처리\n5. 연습문제 3개' },
        { id: 19, question: '가독성(Legibility)과 판독성(Readability)의 차이는?', answer: '가독성은 글자 인식, 판독성은 텍스트 이해 용이성', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 가독성(Legibility)과 판독성(Readability)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 가독성의 정의와 요소\n2. 판독성의 정의와 요소\n3. 영향을 미치는 요인\n4. 가독성/판독성 향상 방법\n5. 연습문제 3개' },
        { id: 20, question: '웹 폰트(Web Font) 사용 시 고려사항은?', answer: '로딩 속도, 브라우저 호환성, 라이선스', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 웹 폰트(Web Font) 사용 시 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 웹 폰트의 종류 (시스템, CDN, 호스팅)\n2. 성능 최적화 방법\n3. 폰트 라이선스 종류\n4. 웹 접근성과 폰트\n5. 연습문제 3개' },
      ]
    },
    {
      id: 3,
      name: '편집디자인',
      icon: '📰',
      questions: [
        { id: 21, question: '편집디자인(Editorial Design)의 범위는?', answer: '책, 잡지, 신문, 브로슈어 등 출판물 디자인', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 편집디자인(Editorial Design)의 범위는?\n\n다음 순서로 설명해주세요:\n1. 편집디자인의 정의\n2. 출판물의 종류와 특성\n3. 편집디자이너의 역할\n4. 디지털 퍼블리싱\n5. 연습문제 3개' },
        { id: 22, question: '그리드 시스템의 구성 요소는?', answer: '칼럼, 모듈, 마진, 거터, 베이스라인', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 그리드 시스템의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 각 구성 요소의 정의\n2. 그리드 설계 방법\n3. 칼럼 그리드와 모듈 그리드\n4. 그리드 깨기(Breaking the Grid)\n5. 연습문제 3개' },
        { id: 23, question: '레이아웃의 기본 원칙은?', answer: '균형, 통일, 대비, 리듬, 여백 활용', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 레이아웃의 기본 원칙은?\n\n다음 순서로 설명해주세요:\n1. 레이아웃 원칙 상세 설명\n2. 여백(White Space)의 중요성\n3. 시각적 흐름 설계\n4. 레이아웃 유형\n5. 연습문제 3개' },
        { id: 24, question: '인쇄용 판형 규격은?', answer: 'A판(A4 등), B판(B5 등), 국판, 신국판, 크라운판', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 인쇄용 판형 규격은?\n\n다음 순서로 설명해주세요:\n1. 국제 표준 용지 규격\n2. 한국 판형 규격\n3. 용지 크기와 접지\n4. 판형 선택 기준\n5. 연습문제 3개' },
        { id: 25, question: '마스터 페이지(Master Page)란?', answer: '반복 사용되는 요소를 담은 템플릿 페이지', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 마스터 페이지(Master Page)란?\n\n다음 순서로 설명해주세요:\n1. 마스터 페이지의 정의와 목적\n2. 포함되는 요소\n3. 인디자인에서의 활용\n4. 마스터 페이지 설계 팁\n5. 연습문제 3개' },
        { id: 26, question: '책의 구조(앞표지부터 뒤표지)는?', answer: '표지, 속표지, 판권, 목차, 본문, 색인, 뒤표지', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 책의 구조(앞표지부터 뒤표지)는?\n\n다음 순서로 설명해주세요:\n1. 책의 구성 요소 상세\n2. 각 부분의 역할과 디자인\n3. 펼침면(Spread) 개념\n4. 바인딩과 제책\n5. 연습문제 3개' },
        { id: 27, question: '잡지 디자인의 특징은?', answer: '주기성, 섹션 구분, 광고와 기사 배치, 연속성', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 잡지 디자인의 특징은?\n\n다음 순서로 설명해주세요:\n1. 잡지 디자인의 요소\n2. 표지 디자인 전략\n3. 오프닝 스프레드 디자인\n4. 광고와 기사의 조화\n5. 연습문제 3개' },
        { id: 28, question: '인포메이션 그래픽스(Infographics)의 유형은?', answer: '통계형, 프로세스형, 비교형, 지리형, 타임라인형', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 인포메이션 그래픽스(Infographics)의 유형은?\n\n다음 순서로 설명해주세요:\n1. 인포그래픽의 정의\n2. 각 유형의 특징과 예시\n3. 효과적인 인포그래픽 제작법\n4. 데이터 시각화와의 관계\n5. 연습문제 3개' },
        { id: 29, question: '블리드(Bleed)와 트림(Trim)이란?', answer: '블리드는 재단 여분, 트림은 최종 재단선', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 블리드(Bleed)와 트림(Trim)이란?\n\n다음 순서로 설명해주세요:\n1. 블리드와 트림의 정의\n2. 인쇄 여백 설정 방법\n3. 안전 영역(Safety Area)\n4. 인쇄 사고 방지\n5. 연습문제 3개' },
        { id: 30, question: '콘텐츠 전략(Content Strategy)이란?', answer: '콘텐츠 기획, 제작, 배포, 관리 전체 계획', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 콘텐츠 전략(Content Strategy)이란?\n\n다음 순서로 설명해주세요:\n1. 콘텐츠 전략의 정의\n2. 전략 수립 과정\n3. 편집디자인에서의 적용\n4. 디지털 콘텐츠 전략\n5. 연습문제 3개' },
      ]
    },
    {
      id: 4,
      name: '광고·패키지',
      icon: '📦',
      questions: [
        { id: 31, question: '광고디자인의 구성 요소는?', answer: '헤드라인, 바디카피, 비주얼, 로고, 슬로건', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 광고디자인의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 각 요소의 정의와 역할\n2. 요소 간의 관계\n3. 효과적인 배치 방법\n4. 매체별 광고 디자인\n5. 연습문제 3개' },
        { id: 32, question: '헤드라인(Headline)의 유형은?', answer: '정보형, 질문형, 명령형, 호기심형, 뉴스형', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 헤드라인(Headline)의 유형은?\n\n다음 순서로 설명해주세요:\n1. 헤드라인의 역할\n2. 각 유형의 특징과 예시\n3. 효과적인 헤드라인 작성법\n4. 비주얼과의 관계\n5. 연습문제 3개' },
        { id: 33, question: '카피라이팅(Copywriting)의 원칙은?', answer: '간결성, 명확성, 설득력, 독창성, 타겟 적합성', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 카피라이팅(Copywriting)의 원칙은?\n\n다음 순서로 설명해주세요:\n1. 카피라이팅의 정의\n2. 좋은 카피의 조건\n3. 헤드라인과 바디카피 작성\n4. 슬로건과 태그라인\n5. 연습문제 3개' },
        { id: 34, question: '패키지디자인의 기능은?', answer: '보호, 편의, 정보전달, 판촉, 브랜딩', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 패키지디자인의 기능은?\n\n다음 순서로 설명해주세요:\n1. 패키지의 5가지 기능\n2. 패키지와 마케팅\n3. 패키지 디자인 프로세스\n4. 친환경 패키지 트렌드\n5. 연습문제 3개' },
        { id: 35, question: 'POP(Point of Purchase) 디자인이란?', answer: '구매 시점에서 소비자를 자극하는 판촉물 디자인', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: POP(Point of Purchase) 디자인이란?\n\n다음 순서로 설명해주세요:\n1. POP의 정의와 목적\n2. POP의 종류\n3. 효과적인 POP 디자인 요소\n4. POP 배치 전략\n5. 연습문제 3개' },
        { id: 36, question: '라벨(Label) 디자인의 요소는?', answer: '브랜드명, 제품명, 성분, 바코드, 사용법, 인증마크', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 라벨(Label) 디자인의 요소는?\n\n다음 순서로 설명해주세요:\n1. 라벨의 필수 정보\n2. 법적 표기 요건\n3. 디자인 시 고려사항\n4. 라벨 소재와 인쇄\n5. 연습문제 3개' },
        { id: 37, question: '다이라인(Dieline)이란?', answer: '패키지 전개도, 칼선과 접는선 표시', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 다이라인(Dieline)이란?\n\n다음 순서로 설명해주세요:\n1. 다이라인의 정의와 용도\n2. 칼선, 접선, 풀칠면 표시\n3. 다이라인 제작 시 주의점\n4. 패키지 목업 제작\n5. 연습문제 3개' },
        { id: 38, question: '옥외광고(OOH Advertising)의 종류는?', answer: '빌보드, 버스쉘터, 전광판, 래핑, 거리시설물', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 옥외광고(OOH Advertising)의 종류는?\n\n다음 순서로 설명해주세요:\n1. 옥외광고의 정의와 특성\n2. 매체별 특징\n3. 디자인 시 고려사항\n4. 디지털 OOH 트렌드\n5. 연습문제 3개' },
        { id: 39, question: '배너광고(Banner Ad) 디자인 원칙은?', answer: '단순함, 강한 CTA, 브랜드 일관성, 애니메이션 활용', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 배너광고(Banner Ad) 디자인 원칙은?\n\n다음 순서로 설명해주세요:\n1. 배너광고의 종류와 규격\n2. 효과적인 배너 디자인 요소\n3. CTA(Call to Action) 설계\n4. 배너 광고 성과 측정\n5. 연습문제 3개' },
        { id: 40, question: '브랜드 가이드라인(Brand Guidelines)이란?', answer: '브랜드 시각 요소 사용 규정과 표준 문서', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 브랜드 가이드라인(Brand Guidelines)이란?\n\n다음 순서로 설명해주세요:\n1. 브랜드 가이드라인의 정의와 목적\n2. 포함 내용 (로고, 색상, 서체 등)\n3. 적용 사례와 예시\n4. 가이드라인 작성 방법\n5. 연습문제 3개' },
      ]
    },
    {
      id: 5,
      name: 'CI/BI 디자인',
      icon: '🏢',
      questions: [
        { id: 41, question: 'CI(Corporate Identity)란?', answer: '기업의 통합적 이미지 시스템, 시각적 일관성', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: CI(Corporate Identity)란?\n\n다음 순서로 설명해주세요:\n1. CI의 정의와 구성 요소\n2. MI, BI, VI의 관계\n3. CI 개발 프로세스\n4. CI 적용과 관리\n5. 연습문제 3개' },
        { id: 42, question: 'BI(Brand Identity)란?', answer: '브랜드의 개성과 가치를 시각화한 아이덴티티 시스템', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: BI(Brand Identity)란?\n\n다음 순서로 설명해주세요:\n1. BI의 정의와 CI와의 차이\n2. BI 구성 요소\n3. 브랜드 포지셔닝\n4. BI 리뉴얼 사례\n5. 연습문제 3개' },
        { id: 43, question: '로고타입(Logotype)과 심볼마크(Symbol Mark)의 차이는?', answer: '로고타입은 문자, 심볼마크는 도형/기호', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 로고타입(Logotype)과 심볼마크(Symbol Mark)의 차이는?\n\n다음 순서로 설명해주세요:\n1. 각각의 정의와 특징\n2. 콤비네이션 마크\n3. 로고 디자인 시 고려사항\n4. 성공적인 로고 사례\n5. 연습문제 3개' },
        { id: 44, question: '시그니처(Signature)란?', answer: '심볼마크와 로고타입의 조합 방식', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 시그니처(Signature)란?\n\n다음 순서로 설명해주세요:\n1. 시그니처의 정의\n2. 시그니처 유형 (수평, 수직, 독립)\n3. 배치와 여백 규정\n4. 시그니처 사용 가이드\n5. 연습문제 3개' },
        { id: 45, question: '전용색상(Corporate Color)의 역할은?', answer: '브랜드 인식, 일관성 유지, 감정 연상', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 전용색상(Corporate Color)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 전용색상의 정의\n2. 주색상과 보조색상\n3. 색상 재현 규정 (Pantone, CMYK 등)\n4. 색상 선정 전략\n5. 연습문제 3개' },
        { id: 46, question: '전용서체(Corporate Typeface)란?', answer: '기업 전용으로 개발하거나 지정한 서체', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 전용서체(Corporate Typeface)란?\n\n다음 순서로 설명해주세요:\n1. 전용서체의 정의와 목적\n2. 기존 서체 지정 vs 개발\n3. 전용서체 활용 범위\n4. 전용서체 개발 사례\n5. 연습문제 3개' },
        { id: 47, question: 'CI 매뉴얼의 구성은?', answer: '기본요소(로고, 색상, 서체)와 응용요소(명함, 봉투 등)', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: CI 매뉴얼의 구성은?\n\n다음 순서로 설명해주세요:\n1. 기본요소 섹션 내용\n2. 응용요소 섹션 내용\n3. 금지 사항 규정\n4. 디지털 CI 매뉴얼\n5. 연습문제 3개' },
        { id: 48, question: '브랜드 아키텍처(Brand Architecture)란?', answer: '기업 내 다양한 브랜드 간의 관계와 구조', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 브랜드 아키텍처(Brand Architecture)란?\n\n다음 순서로 설명해주세요:\n1. 브랜드 아키텍처의 정의\n2. 유형 (단일, 보증, 독립)\n3. 각 유형의 장단점\n4. 아키텍처 설계 전략\n5. 연습문제 3개' },
        { id: 49, question: '리브랜딩(Rebranding)이란?', answer: '기존 브랜드 이미지를 새롭게 재구축', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 리브랜딩(Rebranding)이란?\n\n다음 순서로 설명해주세요:\n1. 리브랜딩의 정의와 목적\n2. 리브랜딩 시점과 이유\n3. 리브랜딩 프로세스\n4. 성공/실패 사례\n5. 연습문제 3개' },
        { id: 50, question: '브랜드 터치포인트(Brand Touchpoint)란?', answer: '고객이 브랜드와 접촉하는 모든 접점', prompt: '시각디자인산업기사 시각디자인 문제입니다.\n\n문제: 브랜드 터치포인트(Brand Touchpoint)란?\n\n다음 순서로 설명해주세요:\n1. 터치포인트의 정의\n2. 온라인/오프라인 터치포인트\n3. 터치포인트별 디자인\n4. 일관된 브랜드 경험 설계\n5. 연습문제 3개' },
      ]
    },
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/visual-design-technician" className="text-gray-500 hover:text-gray-700">시각디자인산업기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-pink-600 font-medium">시각디자인</span>
        </nav>

        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl">
                👁️
              </div>
              <div>
                <h1 className="text-2xl font-bold">시각디자인</h1>
                <p className="text-pink-100">시각전달, 타이포그래피, 편집디자인</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">학습 진행률</span>
              <span className="font-bold text-pink-600">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            completedQuestions.includes(q.id)
                              ? 'bg-pink-500 border-pink-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            Q{q.id}. {q.question}
                          </p>
                          <p className="text-pink-600 text-sm mt-1">A. {q.answer}</p>
                          <button
                            onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="mt-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm hover:bg-pink-200 transition"
                          >
                            🤖 AI에게 자세히 물어보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/category/design/visual-design-technician"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-xl shadow hover:shadow-md transition"
          >
            ← 시각디자인산업기사 메인으로
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 시각디자인 학습 화이팅! 👁️</p>
        </div>
      </footer>
    </div>
  );
}
