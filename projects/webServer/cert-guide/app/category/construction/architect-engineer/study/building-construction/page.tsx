'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function BuildingConstructionStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('architect-engineer-building-construction-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('architect-engineer-building-construction-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '가설공사',
      questions: [
        { id: 1, question: '가설공사의 종류와 특성을 설명하시오.', answer: '가설울타리, 가설건물, 가설비계, 가설통로', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 가설공사의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가설공사의 정의\n2. 가설울타리·가설건물\n3. 비계·동바리\n4. 가설공사의 원가 비율' },
        { id: 2, question: '강관비계의 설치기준을 설명하시오.', answer: '띠장간격 1.8m, 장선간격 1.5m', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 강관비계의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강관비계의 구성요소\n2. 띠장·장선의 간격\n3. 벽연결재 설치\n4. 안전시설' },
        { id: 3, question: '시스템비계의 특징을 설명하시오.', answer: '부재 규격화, 조립해체 용이', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 시스템비계의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템비계의 정의\n2. 구성요소\n3. 강관비계와의 비교\n4. 장단점' },
        { id: 4, question: '동바리의 설치기준을 설명하시오.', answer: '수직하중 지지, 좌굴방지', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 동바리의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동바리의 역할\n2. 설치 간격\n3. 수평연결재\n4. 안전점검 사항' },
        { id: 5, question: '거푸집의 종류와 특성을 설명하시오.', answer: '합판거푸집, 강재거푸집, 알폼', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 거푸집의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합판거푸집\n2. 강재(메탈폼)거푸집\n3. 알루미늄거푸집(알폼)\n4. 선정 기준' },
        { id: 6, question: '거푸집 존치기간을 설명하시오.', answer: '기초/보측면 2일, 슬래브/보하면 압축강도기준', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 거푸집 존치기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 존치기간의 의미\n2. 부위별 존치기간\n3. 콘크리트 강도 기준\n4. 조기 탈형 시 주의사항' },
        { id: 7, question: '거푸집 측압의 산정방법을 설명하시오.', answer: 'P = Wc × H (콘크리트 단위중량×타설높이)', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 거푸집 측압의 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측압의 발생 원리\n2. 측압 산정 공식\n3. 영향 요인\n4. 측압 저감 방법' },
        { id: 8, question: '슬립폼 공법을 설명하시오.', answer: '연속 수직 타설, 고층 코어 적용', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 슬립폼 공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슬립폼의 원리\n2. 적용 구조물\n3. 장단점\n4. 시공 시 주의사항' },
        { id: 9, question: '작업발판의 설치기준을 설명하시오.', answer: '폭 40cm 이상, 틈새 3cm 이하', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 작업발판의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작업발판의 역할\n2. 설치 기준\n3. 안전난간 설치\n4. 점검 사항' },
        { id: 10, question: '가설전기 및 가설급수 계획을 설명하시오.', answer: '임시전력, 임시급수, 공사용수', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 가설전기 및 가설급수 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가설전기 용량 산정\n2. 분전반 배치\n3. 가설급수 계획\n4. 안전 관리' },
      ],
    },
    {
      title: '토공사·기초공사',
      questions: [
        { id: 11, question: '흙파기 공법의 종류를 설명하시오.', answer: '오픈컷, 아일랜드컷, 트렌치컷', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 흙파기 공법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오픈컷 공법\n2. 아일랜드컷 공법\n3. 트렌치컷 공법\n4. 공법 선정 기준' },
        { id: 12, question: '흙막이 공법의 종류를 설명하시오.', answer: 'H-Pile+토류판, Sheet Pile, 지하연속벽', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 흙막이 공법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. H-Pile+토류판\n2. Sheet Pile\n3. 지하연속벽(Slurry Wall)\n4. SCW, CIP' },
        { id: 13, question: '지보공의 종류와 역할을 설명하시오.', answer: '버팀보, 스트럿, 어스앵커', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 지보공의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 버팀보(Strut)\n2. 어스앵커\n3. 락볼트\n4. 지보공 설계' },
        { id: 14, question: '배수공법의 종류를 설명하시오.', answer: '집수정, 웰포인트, 딥웰', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 배수공법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집수정(Sump Pit)\n2. 웰포인트(Well Point)\n3. 딥웰(Deep Well)\n4. 공법 선정 기준' },
        { id: 15, question: '흙의 다짐관리를 설명하시오.', answer: '다짐도=현장건조밀도/최대건조밀도×100', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 흙의 다짐관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 다짐의 목적\n2. 다짐도 측정 방법\n3. 최적함수비\n4. 다짐 장비' },
        { id: 16, question: '기초말뚝의 종류와 시공방법을 설명하시오.', answer: '기성말뚝(PHC, SC), 현장타설말뚝', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 기초말뚝의 종류와 시공방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기성콘크리트말뚝(PHC)\n2. 강관말뚝\n3. 현장타설말뚝\n4. 시공관리' },
        { id: 17, question: '지반개량공법을 설명하시오.', answer: '치환, 다짐, 배수, 고결', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 지반개량공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 치환공법\n2. 다짐공법(SCP, 진동다짐)\n3. 배수공법(PVD)\n4. 고결공법(약액주입)' },
        { id: 18, question: '역타공법(Top-Down)을 설명하시오.', answer: '지상·지하 동시 시공', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 역타공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역타공법의 원리\n2. 시공 순서\n3. 장단점\n4. 적용 조건' },
        { id: 19, question: '히빙(Heaving)의 원인과 대책을 설명하시오.', answer: '연약점토지반 굴착 시 바닥면 융기', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 히빙의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 히빙의 발생 원리\n2. 발생 조건\n3. 예방 대책\n4. 안전율 검토' },
        { id: 20, question: '보일링(Boiling)의 원인과 대책을 설명하시오.', answer: '지하수위차로 모래지반 분사 현상', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 보일링의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보일링의 발생 원리\n2. 발생 조건\n3. 예방 대책\n4. 침투류 해석' },
      ],
    },
    {
      title: '철근콘크리트공사',
      questions: [
        { id: 21, question: '콘크리트 배합설계의 절차를 설명하시오.', answer: '강도→물시멘트비→단위수량→단위시멘트량', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 콘크리트 배합설계의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계기준강도 결정\n2. 물시멘트비 결정\n3. 단위수량·시멘트량\n4. 골재량 산정' },
        { id: 22, question: '콘크리트 슬럼프 시험을 설명하시오.', answer: '워커빌리티 측정, 보통 80~150mm', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 콘크리트 슬럼프 시험을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 슬럼프의 의미\n2. 시험 방법\n3. 허용 오차\n4. 슬럼프 값 기준' },
        { id: 23, question: '콘크리트 타설 시 주의사항을 설명하시오.', answer: '연속타설, 다짐, 낙하높이 제한', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 콘크리트 타설 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 타설 준비\n2. 타설 방법\n3. 다짐(바이브레이터)\n4. 콜드조인트 방지' },
        { id: 24, question: '콘크리트 양생의 종류와 방법을 설명하시오.', answer: '습윤양생, 막양생, 증기양생', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 콘크리트 양생의 종류와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양생의 목적\n2. 습윤양생\n3. 막양생\n4. 특수양생(증기, 한중)' },
        { id: 25, question: '한중콘크리트 시공을 설명하시오.', answer: '기온 4℃ 이하, 가열·보온·양생', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 한중콘크리트 시공을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한중콘크리트 정의\n2. 재료 가열\n3. 보온 양생\n4. 초기 동해 방지' },
        { id: 26, question: '서중콘크리트 시공을 설명하시오.', answer: '기온 25℃ 이상, 냉각·지연제·양생', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 서중콘크리트 시공을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서중콘크리트 정의\n2. 재료 냉각\n3. 수화열 저감\n4. 급건조 방지' },
        { id: 27, question: '철근의 가공과 조립을 설명하시오.', answer: '절단, 절곡, 조립, 간격재', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 철근의 가공과 조립을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 철근 가공(절단, 절곡)\n2. 절곡 내면 반지름\n3. 철근 조립\n4. 간격재 설치' },
        { id: 28, question: '철근의 이음과 정착을 설명하시오.', answer: '겹침이음, 기계적이음, 용접이음', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 철근의 이음과 정착을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이음의 종류\n2. 겹침이음 길이\n3. 정착 길이\n4. 이음 위치 제한' },
        { id: 29, question: '고강도콘크리트의 특성을 설명하시오.', answer: 'fck 40MPa 이상, 자기충전성', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 고강도콘크리트의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고강도콘크리트의 정의\n2. 재료 및 배합\n3. 특성 및 장점\n4. 시공 주의사항' },
        { id: 30, question: '콘크리트의 균열 원인과 대책을 설명하시오.', answer: '건조수축, 온도응력, 구조적 균열', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 콘크리트의 균열 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균열의 종류\n2. 발생 원인\n3. 예방 대책\n4. 보수 방법' },
      ],
    },
    {
      title: '마감·방수공사',
      questions: [
        { id: 31, question: '방수공법의 종류를 설명하시오.', answer: '아스팔트, 시트, 도막, 시멘트계', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 방수공법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 아스팔트 방수\n2. 시트 방수\n3. 도막 방수\n4. 시멘트계 방수' },
        { id: 32, question: '옥상 아스팔트 방수 시공순서를 설명하시오.', answer: '바탕처리→프라이머→아스팔트펠트', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 옥상 아스팔트 방수 시공순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바탕 처리\n2. 프라이머 도포\n3. 아스팔트층 시공\n4. 보호층 시공' },
        { id: 33, question: '지하 외벽 방수공법을 설명하시오.', answer: '외방수, 내방수, 이중벽 방수', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 지하 외벽 방수공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외방수의 특성\n2. 내방수의 특성\n3. 이중벽 방수\n4. 공법 선정 기준' },
        { id: 34, question: '단열공법의 종류를 설명하시오.', answer: '내단열, 외단열, 중단열', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 단열공법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내단열 공법\n2. 외단열 공법\n3. 중단열 공법\n4. 결로 방지' },
        { id: 35, question: '미장공사의 종류와 시공을 설명하시오.', answer: '시멘트모르타르, 석고플라스터', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 미장공사의 종류와 시공을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시멘트모르타르 미장\n2. 석고플라스터 미장\n3. 바름 횟수와 두께\n4. 균열 방지' },
        { id: 36, question: '타일공사의 시공방법을 설명하시오.', answer: '압착붙이기, 접착붙이기, 떠붙이기', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 타일공사의 시공방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압착붙이기\n2. 접착붙이기\n3. 떠붙이기\n4. 줄눈 시공' },
        { id: 37, question: '도장공사의 일반사항을 설명하시오.', answer: '바탕처리, 퍼티, 하도·중도·상도', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 도장공사의 일반사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바탕 처리\n2. 퍼티 바름\n3. 도장 순서\n4. 건조 시간' },
        { id: 38, question: '창호공사의 종류와 시공을 설명하시오.', answer: '알루미늄, PVC, 스틸, 목재 창호', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 창호공사의 종류와 시공을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 창호의 종류\n2. 설치 방법\n3. 기밀·수밀 성능\n4. 유리 끼우기' },
        { id: 39, question: '유리공사의 종류와 시공을 설명하시오.', answer: '복층유리, 강화유리, 접합유리', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 유리공사의 종류와 시공을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유리의 종류\n2. 설치 방법\n3. 끼움재\n4. 안전 기준' },
        { id: 40, question: '석공사의 시공방법을 설명하시오.', answer: '습식공법, 건식공법', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 석공사의 시공방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식공법\n2. 건식공법\n3. 앵커 설치\n4. 줄눈 처리' },
      ],
    },
    {
      title: '적산·공정관리',
      questions: [
        { id: 41, question: '적산의 정의와 종류를 설명하시오.', answer: '수량산출, 내역작성, 견적', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 적산의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적산의 정의\n2. 수량산출\n3. 단가적용\n4. 견적서 작성' },
        { id: 42, question: '수량산출의 원칙을 설명하시오.', answer: '도면 기준, 내역 순서, 중복 제외', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 수량산출의 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수량산출의 기준\n2. 산출 순서\n3. 물량 산출 방법\n4. 할증 적용' },
        { id: 43, question: '일위대가의 구성을 설명하시오.', answer: '재료비+노무비+경비', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 일위대가의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재료비 산정\n2. 노무비 산정\n3. 경비 산정\n4. 일위대가표 작성' },
        { id: 44, question: '공사원가의 구성을 설명하시오.', answer: '재료비+노무비+경비+일반관리비+이윤', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 공사원가의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접공사비\n2. 간접공사비\n3. 일반관리비\n4. 이윤' },
        { id: 45, question: '공정계획의 종류와 특성을 설명하시오.', answer: '바차트, 네트워크공정표(CPM, PERT)', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 공정계획의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바차트(Gantt Chart)\n2. CPM(주공정법)\n3. PERT\n4. 공정표 선택 기준' },
        { id: 46, question: 'CPM 네트워크 공정표를 설명하시오.', answer: 'Critical Path, 주경로 관리', prompt: '건축기사 건축시공 문제입니다.\n\n문제: CPM 네트워크 공정표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CPM의 원리\n2. 주경로(Critical Path)\n3. 여유시간(Float)\n4. 공기단축 방법' },
        { id: 47, question: '품질관리의 기본 개념을 설명하시오.', answer: 'QC 7가지 도구, PDCA', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 품질관리의 기본 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 품질관리의 정의\n2. QC 7가지 도구\n3. PDCA 사이클\n4. 건설 품질관리' },
        { id: 48, question: '안전관리계획의 내용을 설명하시오.', answer: '안전조직, 안전교육, 재해예방', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 안전관리계획의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전관리 조직\n2. 안전교육 계획\n3. 재해예방 대책\n4. 비상대응 계획' },
        { id: 49, question: '환경관리계획의 내용을 설명하시오.', answer: '소음·진동·분진·폐기물 관리', prompt: '건축기사 건축시공 문제입니다.\n\n문제: 환경관리계획의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소음·진동 관리\n2. 분진 관리\n3. 폐기물 관리\n4. 수질 오염 방지' },
        { id: 50, question: 'VE(Value Engineering)의 개념을 설명하시오.', answer: '가치=기능/비용, 비용절감·성능향상', prompt: '건축기사 건축시공 문제입니다.\n\n문제: VE의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VE의 정의\n2. 기능 분석\n3. 대안 검토\n4. 적용 사례' },
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
            <span className="text-orange-500">👷</span> 건축시공
          </h1>
          <p className="text-gray-500 mt-1">건축기사 필기 4과목 (50문항)</p>
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
                          onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
