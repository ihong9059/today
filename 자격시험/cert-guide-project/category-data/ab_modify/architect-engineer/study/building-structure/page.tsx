'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BuildingStructureStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('architect-engineer-building-structure-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('architect-engineer-building-structure-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '구조역학 기초',
      questions: [
        { id: 1, question: '응력(Stress)과 변형률(Strain)의 관계를 설명하시오.', answer: 'σ = E × ε (후크의 법칙)', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 응력과 변형률의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 응력의 정의와 종류\n2. 변형률의 정의\n3. 후크의 법칙\n4. 탄성계수의 의미' },
        { id: 2, question: '힘의 평형조건 3가지를 설명하시오.', answer: 'ΣFx=0, ΣFy=0, ΣM=0', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 힘의 평형조건 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수평력의 평형\n2. 수직력의 평형\n3. 모멘트의 평형\n4. 적용 사례' },
        { id: 3, question: '정정보와 부정정보의 차이를 설명하시오.', answer: '정정보=평형조건만으로 해석, 부정정보=변형조건 필요', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 정정보와 부정정보의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정정구조물의 정의\n2. 부정정구조물의 정의\n3. 부정정차수의 개념\n4. 해석 방법의 차이' },
        { id: 4, question: '단면1차모멘트와 단면2차모멘트의 개념을 설명하시오.', answer: '1차=도심 결정, 2차=휨강성 결정', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 단면1차모멘트와 2차모멘트의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단면1차모멘트의 정의와 용도\n2. 단면2차모멘트의 정의와 용도\n3. 계산 방법\n4. 단면계수와의 관계' },
        { id: 5, question: '휨모멘트와 전단력의 관계를 설명하시오.', answer: 'V = dM/dx (전단력은 휨모멘트의 미분)', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 휨모멘트와 전단력의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 휨모멘트의 정의\n2. 전단력의 정의\n3. 미분 관계식\n4. 모멘트도와 전단력도' },
        { id: 6, question: '반력의 종류와 특성을 설명하시오.', answer: '이동단, 회전단, 고정단의 반력', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 반력의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이동단(롤러)의 반력\n2. 회전단(힌지)의 반력\n3. 고정단의 반력\n4. 반력 산정 방법' },
        { id: 7, question: '트러스의 종류와 해석방법을 설명하시오.', answer: '절점법, 단면법으로 부재력 산정', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 트러스의 종류와 해석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트러스의 정의와 종류\n2. 절점법 해석\n3. 단면법 해석\n4. 영부재 판별' },
        { id: 8, question: '처짐(Deflection)의 계산방법을 설명하시오.', answer: '탄성하중법, 공액보법, 단위하중법', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 처짐의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처짐의 정의와 중요성\n2. 탄성하중법\n3. 공액보법\n4. 처짐 한계 기준' },
        { id: 9, question: '좌굴(Buckling)현상과 임계하중을 설명하시오.', answer: 'Pcr = π²EI/(KL)², 세장비에 반비례', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 좌굴현상과 임계하중을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 좌굴의 정의\n2. 오일러 공식\n3. 유효좌굴길이(K)\n4. 세장비와 좌굴의 관계' },
        { id: 10, question: '합성응력(조합응력)을 설명하시오.', answer: '축력+휨모멘트, σ = N/A ± M/Z', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 합성응력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합성응력의 정의\n2. 축력과 휨의 조합\n3. 핵의 개념\n4. 편심하중 시 응력분포' },
      ],
    },
    {
      title: '하중 및 외력',
      questions: [
        { id: 11, question: '건축물에 작용하는 하중의 종류를 설명하시오.', answer: '고정하중, 활하중, 풍하중, 지진하중 등', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 건축물에 작용하는 하중의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정하중(Dead Load)\n2. 활하중(Live Load)\n3. 환경하중(풍하중, 설하중)\n4. 특수하중' },
        { id: 12, question: '활하중의 종류와 산정방법을 설명하시오.', answer: '용도별 등분포하중, 집중하중', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 활하중의 종류와 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 활하중의 정의\n2. 용도별 기준 하중\n3. 저감 규정\n4. 충격하중 고려' },
        { id: 13, question: '풍하중의 산정방법을 설명하시오.', answer: 'W = qz × G × Cf × A', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 풍하중의 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본풍속의 개념\n2. 설계속도압 산정\n3. 가스트계수(G)\n4. 풍력계수(Cf)' },
        { id: 14, question: '지진하중의 산정방법을 설명하시오.', answer: 'V = Cs × W, 내진설계', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 지진하중의 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지진력의 개념\n2. 등가정적해석법\n3. 응답스펙트럼해석\n4. 지반종류별 계수' },
        { id: 15, question: '하중조합의 종류와 계산방법을 설명하시오.', answer: '극한강도설계법, 허용응력설계법', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 하중조합의 종류와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강도설계법 하중조합\n2. 허용응력설계법 하중조합\n3. 하중계수의 의미\n4. 조합 시 주의사항' },
        { id: 16, question: '내진설계의 기본개념을 설명하시오.', answer: '연성확보, 층간변위 제한, 비구조요소 보호', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 내진설계의 기본개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내진설계의 목표\n2. 내진등급 분류\n3. 구조시스템별 특성\n4. 연성설계 개념' },
        { id: 17, question: '면진구조와 제진구조를 비교하시오.', answer: '면진=진동절연, 제진=에너지흡수', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 면진구조와 제진구조를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 면진구조의 원리\n2. 제진구조의 원리\n3. 각 방식의 장단점\n4. 적용 사례' },
        { id: 18, question: '설하중의 산정방법을 설명하시오.', answer: 'S = μ × Ce × Ct × Is × Sg', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 설하중의 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지상적설하중\n2. 지붕형상계수\n3. 노출계수\n4. 중요도계수' },
        { id: 19, question: '토압의 종류와 산정방법을 설명하시오.', answer: '주동토압, 정지토압, 수동토압', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 토압의 종류와 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주동토압의 개념\n2. 정지토압의 개념\n3. 수동토압의 개념\n4. 토압계수 산정' },
        { id: 20, question: '수압과 부력의 계산방법을 설명하시오.', answer: 'P = γw × h, 부력 = γw × V', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 수압과 부력의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정수압의 개념\n2. 수압 분포도\n3. 부력의 계산\n4. 지하구조물 설계 시 고려사항' },
      ],
    },
    {
      title: '철근콘크리트구조',
      questions: [
        { id: 21, question: '철근콘크리트의 기본원리를 설명하시오.', answer: '콘크리트=압축, 철근=인장 분담', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 철근콘크리트의 기본원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RC의 복합거동\n2. 콘크리트와 철근의 역할\n3. 부착응력의 중요성\n4. 장점과 단점' },
        { id: 22, question: '콘크리트의 설계기준강도(fck)와 철근의 설계기준항복강도(fy)를 설명하시오.', answer: 'fck=압축강도, fy=항복점', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 설계기준강도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. fck의 정의와 결정\n2. fy의 정의와 종류\n3. 강도저감계수\n4. 재료계수' },
        { id: 23, question: '보의 휨설계 순서를 설명하시오.', answer: '소요모멘트→단면결정→철근량산정', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 보의 휨설계 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소요강도 산정\n2. 유효깊이 가정\n3. 철근량 산정\n4. 검토 및 확인' },
        { id: 24, question: '복근보와 단근보의 차이를 설명하시오.', answer: '복근보=인장철근+압축철근, 단근보=인장철근만', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 복근보와 단근보의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단근보의 특성\n2. 복근보의 필요성\n3. 압축철근의 역할\n4. 설계 방법의 차이' },
        { id: 25, question: '전단보강근(스터럽)의 설계를 설명하시오.', answer: 'Vs = Av × fy × d / s', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 전단보강근의 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전단파괴의 형태\n2. 콘크리트 전단강도\n3. 스터럽의 역할\n4. 배치간격 결정' },
        { id: 26, question: '기둥의 설계원리와 종류를 설명하시오.', answer: '나선철근기둥, 띠철근기둥', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 기둥의 설계원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기둥의 거동 특성\n2. 띠철근기둥의 설계\n3. 나선철근기둥의 설계\n4. 세장한 기둥의 고려' },
        { id: 27, question: '철근의 이음과 정착길이를 설명하시오.', answer: '겹침이음, 기계적이음, 용접이음', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 철근의 이음과 정착길이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정착길이의 개념\n2. 이음의 종류\n3. 이음길이 산정\n4. 이음 위치 제한' },
        { id: 28, question: '슬래브의 설계방법을 설명하시오.', answer: '1방향슬래브, 2방향슬래브', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 슬래브의 설계방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1방향슬래브의 조건\n2. 2방향슬래브의 조건\n3. 철근 배근 방법\n4. 처짐 검토' },
        { id: 29, question: '피복두께의 규정과 중요성을 설명하시오.', answer: '내구성, 내화성, 부착력 확보', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 피복두께의 규정과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피복두께의 정의\n2. 환경별 최소 피복두께\n3. 피복두께의 역할\n4. 시공 시 확보 방법' },
        { id: 30, question: '균열폭 제어의 원리를 설명하시오.', answer: '철근배치, 피복두께, 철근응력 제한', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 균열폭 제어의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균열의 발생 원인\n2. 허용균열폭 기준\n3. 균열제어 방법\n4. 배력철근의 역할' },
      ],
    },
    {
      title: '철골구조',
      questions: [
        { id: 31, question: '강재의 종류와 특성을 설명하시오.', answer: 'SS400, SM490, SN490 등', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 강재의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강재의 분류체계\n2. 일반구조용 강재\n3. 건축구조용 강재(SN)\n4. 기계적 성질' },
        { id: 32, question: '인장재의 설계원리를 설명하시오.', answer: '순단면적, 유효순단면적 검토', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 인장재의 설계원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총단면항복\n2. 순단면파단\n3. 유효순단면적\n4. 전단지연 효과' },
        { id: 33, question: '압축재의 좌굴설계를 설명하시오.', answer: '세장비, 유효좌굴길이, 임계응력', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 압축재의 좌굴설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 좌굴의 종류\n2. 세장비 산정\n3. 좌굴응력 계산\n4. 설계강도 결정' },
        { id: 34, question: '휨재(보)의 설계원리를 설명하시오.', answer: '횡좌굴, 국부좌굴 검토', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 휨재의 설계원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 횡좌굴의 개념\n2. 국부좌굴의 개념\n3. 단면의 분류(콤팩트, 비콤팩트)\n4. 휨강도 산정' },
        { id: 35, question: '조합력을 받는 부재의 설계를 설명하시오.', answer: '휨+축력 상호작용', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 조합력을 받는 부재의 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조합응력의 개념\n2. 상호작용식\n3. 1차/2차 효과\n4. P-Δ 효과' },
        { id: 36, question: '볼트접합의 종류와 설계를 설명하시오.', answer: '일반볼트, 고력볼트(마찰/지압)', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 볼트접합의 종류와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반볼트 접합\n2. 마찰접합형 고력볼트\n3. 지압접합형 고력볼트\n4. 접합부 강도 산정' },
        { id: 37, question: '용접접합의 종류와 설계를 설명하시오.', answer: '필릿용접, 그루브용접, 플러그용접', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 용접접합의 종류와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필릿용접의 특성\n2. 그루브(완전용입)용접\n3. 용접부 강도 산정\n4. 용접결함과 검사' },
        { id: 38, question: '강접합과 핀접합의 차이를 설명하시오.', answer: '강접합=모멘트전달, 핀접합=회전허용', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 강접합과 핀접합의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강접합의 특성\n2. 핀접합의 특성\n3. 각 접합의 설계 방법\n4. 적용 사례' },
        { id: 39, question: '브레이스 구조의 종류와 특성을 설명하시오.', answer: 'X형, V형, K형 브레이스', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 브레이스 구조의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가새의 역할\n2. 중심브레이스 구조\n3. 편심브레이스 구조\n4. 내진성능' },
        { id: 40, question: '합성보의 설계원리를 설명하시오.', answer: '콘크리트슬래브+철골보, 전단연결재', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 합성보의 설계원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합성보의 개념\n2. 유효폭의 결정\n3. 전단연결재의 역할\n4. 완전합성/부분합성' },
      ],
    },
    {
      title: '기초구조',
      questions: [
        { id: 41, question: '기초의 종류와 선정기준을 설명하시오.', answer: '직접기초, 깊은기초(말뚝)', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 기초의 종류와 선정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접기초의 종류\n2. 깊은기초의 종류\n3. 선정 시 고려사항\n4. 지반조사의 중요성' },
        { id: 42, question: '독립기초의 설계방법을 설명하시오.', answer: '지반지지력 검토, 펀칭전단 검토', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 독립기초의 설계방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초 크기 결정\n2. 지반지지력 검토\n3. 휨설계\n4. 펀칭전단 검토' },
        { id: 43, question: '복합기초와 연속기초를 설명하시오.', answer: '복합기초=2개이상기둥, 연속기초=벽하부', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 복합기초와 연속기초를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복합기초의 적용\n2. 연속기초의 적용\n3. 설계 방법\n4. 배근 상세' },
        { id: 44, question: '온통기초(매트기초)의 설계원리를 설명하시오.', answer: '건물전체를 하나의 기초로, 침하균등화', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 온통기초의 설계원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온통기초의 적용 조건\n2. 설계 방법\n3. 장단점\n4. 시공 시 주의사항' },
        { id: 45, question: '말뚝기초의 종류와 설계를 설명하시오.', answer: '기성말뚝, 현장타설말뚝', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 말뚝기초의 종류와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기성말뚝의 종류\n2. 현장타설말뚝의 종류\n3. 지지력 산정\n4. 부마찰력 고려' },
        { id: 46, question: '말뚝의 지지력 산정방법을 설명하시오.', answer: '선단지지력+주면마찰력', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 말뚝의 지지력 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선단지지력 산정\n2. 주면마찰력 산정\n3. 정역학적 공식\n4. 동역학적 공식' },
        { id: 47, question: '지반의 허용지지력 산정을 설명하시오.', answer: '극한지지력/안전율, 침하량 검토', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 지반의 허용지지력 산정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 극한지지력의 개념\n2. 안전율 적용\n3. 침하량에 의한 검토\n4. 지반조사 결과 활용' },
        { id: 48, question: '흙막이벽의 종류와 설계를 설명하시오.', answer: '엄지말뚝+토류판, 시트파일, 지하연속벽', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 흙막이벽의 종류와 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흙막이의 종류\n2. 토압 산정\n3. 버팀대/앵커 설계\n4. 안정성 검토' },
        { id: 49, question: '지하외벽의 설계를 설명하시오.', answer: '토압+수압 고려, 방수 대책', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 지하외벽의 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작용하중 산정\n2. 구조설계\n3. 균열제어\n4. 방수 계획' },
        { id: 50, question: '부등침하의 원인과 대책을 설명하시오.', answer: '지반불균일, 하중편차, 기초형식차이', prompt: '건축기사 건축구조 문제입니다.\n\n문제: 부등침하의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부등침하의 원인\n2. 피해 유형\n3. 설계단계 대책\n4. 시공단계 대책' },
      ],
    },
  ];

  const progress = Math.round((completedQuestions.size / 50) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/category/construction/architect-engineer" className="flex items-center gap-2 text-orange-600">
            <span>←</span><span className="font-medium">건축기사</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{completedQuestions.size}/50 완료</div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-orange-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-orange-500">🏗️</span> 건축구조
          </h1>
          <p className="text-gray-500 mt-1">건축기사 필기 2과목 (50문항)</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => {
                  const newOpen = new Set(openTopics);
                  if (newOpen.has(topicIdx)) newOpen.delete(topicIdx);
                  else newOpen.add(topicIdx);
                  setOpenTopics(newOpen);
                }}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white"
              >
                <span className="font-bold">{topic.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-orange-100">
                    {topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}
                  </span>
                  <span>{openTopics.has(topicIdx) ? '▼' : '▶'}</span>
                </div>
              </button>
              {openTopics.has(topicIdx) && (
                <div className="divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                            completedQuestions.has(q.id)
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-500 mt-1">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

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

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
