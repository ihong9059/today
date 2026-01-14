'use client';

import { useState, useEffect } from 'react';

export default function ConstructionStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = { name: '태양광발전설비 시공', icon: '🔧', description: '모듈 설치, 배선공사, 접지공사, 시운전, 안전관리 등 시공 실무' };

  const topics = [
    {
      id: 1, name: '모듈 설치공법',
      questions: [
        { id: 1, question: '지붕형 태양광 설치 시 지붕 종류별 시공법을 설명하시오.', answer: '기와지붕: 기와 고정금구, 슬레이트: 관통볼트, 판넬지붕: 클램프', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 지붕 종류별 시공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지붕 종류\n2. 시공법 비교\n3. 방수 처리\n4. 주의사항\n5. 예상 문제 3개' },
        { id: 2, question: '지상형 태양광 구조물 시공 순서를 설명하시오.', answer: '측량→기초시공→지주설치→가로대설치→모듈설치→배선', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 지상형 구조물 시공 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공 순서\n2. 각 단계 내용\n3. 품질관리\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 3, question: '스크류 파일 기초 시공법을 설명하시오.', answer: '천공없이 회전압입, 토질에 따라 선정, 인발력 시험 필수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 스크류 파일 기초 시공법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공 원리\n2. 장단점\n3. 적용 조건\n4. 품질 시험\n5. 예상 문제 3개' },
        { id: 4, question: '콘크리트 기초 시공 시 주의사항을 설명하시오.', answer: '앵커볼트 위치정밀도, 양생기간, 레벨링, 방수처리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 콘크리트 기초 시공 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공 절차\n2. 품질관리\n3. 주의사항\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 5, question: '모듈 취급 및 운반 시 주의사항을 설명하시오.', answer: '수직 운반, 충격방지, 프레임 파지, 셀 손상 방지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 취급 및 운반 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운반 방법\n2. 보관 조건\n3. 취급 주의사항\n4. 손상 유형\n5. 예상 문제 3개' },
        { id: 6, question: '클램프 종류와 선정 기준을 설명하시오.', answer: '미드클램프(중간), 엔드클램프(끝), 모듈 두께에 맞게 선정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 클램프 종류와 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 클램프 종류\n2. 선정 기준\n3. 설치 방법\n4. 체결 토크\n5. 예상 문제 3개' },
        { id: 7, question: '수상태양광 설치 시공 특성을 설명하시오.', answer: '부력체 조립, 계류시스템, 수상배선, 안전관리 특수성', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 수상태양광 설치 시공 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공 절차\n2. 특수 장비\n3. 안전관리\n4. 품질관리\n5. 예상 문제 3개' },
        { id: 8, question: '영농형 태양광 구조물 시공 특성을 설명하시오.', answer: '높이 확보(2.5m+), 농기계 통행로, 차광률 관리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 영농형 태양광 구조물 시공 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 기준\n2. 시공 방법\n3. 농업 병행\n4. 유지관리\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 2, name: '전기배선공사',
      questions: [
        { id: 9, question: 'DC 케이블 배선 시 주의사항을 설명하시오.', answer: '극성 확인, UV내성 케이블, 피복 손상 방지, 굴곡반경 준수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC 케이블 배선 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 케이블 선정\n2. 배선 방법\n3. 주의사항\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 10, question: 'MC4 커넥터 연결 방법과 주의사항을 설명하시오.', answer: '전용 공구 사용, 끝까지 삽입, 방수 확인, 역극성 방지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: MC4 커넥터 연결 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연결 절차\n2. 공구 사용법\n3. 주의사항\n4. 품질 확인\n5. 예상 문제 3개' },
        { id: 11, question: '케이블 트레이/덕트 시공 기준을 설명하시오.', answer: '케이블 점적률 40% 이하, 지지간격, 굴곡부 처리, 접지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 케이블 트레이/덕트 시공 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 기준\n2. 시공 방법\n3. 케이블 정리\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 12, question: '전선관 배관 시공 방법을 설명하시오.', answer: '굴곡 3개소 이하, 풀박스 설치, 방수 처리, 접지 연속성', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전선관 배관 시공 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관 기준\n2. 시공 방법\n3. 풀박스 설치\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 13, question: '접속함 설치 위치와 시공 기준을 설명하시오.', answer: '접근 용이, 배수 양호, 환기, 스트링 연결 최적화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접속함 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 위치\n2. 시공 방법\n3. 내부 결선\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 14, question: '인버터 설치 위치 선정 기준을 설명하시오.', answer: '환기 양호, 직사광선 회피, 점검 공간, 케이블 길이 최소화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 설치 위치 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선정 기준\n2. 설치 환경\n3. 이격 거리\n4. 시공 방법\n5. 예상 문제 3개' },
        { id: 15, question: '케이블 단말 처리 방법을 설명하시오.', answer: '피복 제거, 압착단자 사용, 절연테이프, 수축튜브', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 케이블 단말 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처리 절차\n2. 사용 공구\n3. 품질 기준\n4. 주의사항\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 3, name: '접지공사',
      questions: [
        { id: 16, question: '태양광 설비의 접지 시공 순서를 설명하시오.', answer: '접지극 매설→접지선 포설→기기 접지→등전위본딩→측정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지 시공 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시공 순서\n2. 각 단계 내용\n3. 품질관리\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 17, question: '접지극 매설 방법과 기준을 설명하시오.', answer: '지하 75cm 이상, 동결선 이하, 습기 있는 토양', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지극 매설 방법과 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매설 깊이\n2. 위치 선정\n3. 시공 방법\n4. 저감재 사용\n5. 예상 문제 3개' },
        { id: 18, question: '접지저항 측정 방법을 설명하시오.', answer: '3전극법(보조전극 배치), 클램프법, 측정 조건(건조기)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지저항 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 방법\n2. 전극 배치\n3. 측정 절차\n4. 결과 판정\n5. 예상 문제 3개' },
        { id: 19, question: '접지저항 저감 방법을 설명하시오.', answer: '저감재 사용, 병렬접지, 심타접지, 메쉬접지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지저항 저감 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저감 방법\n2. 각 방법 특성\n3. 선정 기준\n4. 효과 검증\n5. 예상 문제 3개' },
        { id: 20, question: '모듈 프레임 접지 연결 방법을 설명하시오.', answer: '접지와셔, 접지클램프, 접지선 연결, 연속성 확보', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 프레임 접지 연결 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연결 방법\n2. 재료 선정\n3. 시공 순서\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 21, question: '등전위본딩 시공 방법을 설명하시오.', answer: '금속구조물 상호연결, 본딩도체 규격, 연결점 처리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 등전위본딩 시공 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본딩 목적\n2. 시공 방법\n3. 도체 규격\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 22, question: 'SPD 설치 시공 방법을 설명하시오.', answer: '최단거리 배선, 병렬연결, 접지선 연결, 표시등 확인', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SPD 설치 시공 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 위치\n2. 연결 방법\n3. 접지 연결\n4. 검사 항목\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 4, name: '시운전 및 검사',
      questions: [
        { id: 23, question: '태양광 설비 시운전 절차를 설명하시오.', answer: '육안검사→절연측정→접지측정→개방전압확인→계통연계→출력확인', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 시운전 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시운전 순서\n2. 각 단계 내용\n3. 확인 항목\n4. 기록 작성\n5. 예상 문제 3개' },
        { id: 24, question: '절연저항 측정 방법과 판정 기준을 설명하시오.', answer: 'DC측 500V 메거, 1MΩ 이상 / AC측 500V 메거, 0.1MΩ 이상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 절연저항 측정 방법과 판정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 방법\n2. 측정 전압\n3. 판정 기준\n4. 불량 시 조치\n5. 예상 문제 3개' },
        { id: 25, question: '개방전압(Voc) 측정 방법과 확인사항을 설명하시오.', answer: '멀티미터 DC전압, 스트링별 측정, 이론값 대비 ±5% 이내', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 개방전압 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 방법\n2. 측정 조건\n3. 판정 기준\n4. 이상 시 조치\n5. 예상 문제 3개' },
        { id: 26, question: 'I-V 특성 측정 방법을 설명하시오.', answer: 'I-V 커브트레이서 사용, STC 보정, 모듈/스트링/어레이 측정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: I-V 특성 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 장비\n2. 측정 절차\n3. 데이터 분석\n4. 결과 활용\n5. 예상 문제 3개' },
        { id: 27, question: '계통연계 시험 항목을 설명하시오.', answer: '전압/주파수 범위, 단독운전방지, 역률, 고조파, 동기화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통연계 시험 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 항목\n2. 시험 방법\n3. 판정 기준\n4. 기록 작성\n5. 예상 문제 3개' },
        { id: 28, question: '인버터 동작 확인 항목을 설명하시오.', answer: 'MPPT 동작, 출력전압/전류, 효율, 보호기능, 통신', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 동작 확인 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확인 항목\n2. 측정 방법\n3. 판정 기준\n4. 이상 시 조치\n5. 예상 문제 3개' },
        { id: 29, question: '준공검사 절차와 제출 서류를 설명하시오.', answer: '한전 계통연계, 사용전검사, 발전사업허가, 설비확인', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 준공검사 절차와 제출 서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 절차\n2. 제출 서류\n3. 검사 항목\n4. 보완 조치\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 5, name: '안전관리',
      questions: [
        { id: 30, question: '태양광 시공 시 전기안전 수칙을 설명하시오.', answer: '활선작업 금지, 절연장갑, 검전기 사용, 단락방지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기안전 수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전 수칙\n2. 보호구 착용\n3. 작업 절차\n4. 비상 조치\n5. 예상 문제 3개' },
        { id: 31, question: 'PV 모듈의 감전 위험성과 대책을 설명하시오.', answer: '일조 시 항상 발전, 차광 필요, 절연장갑, DC 전압 주의', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PV 모듈의 감전 위험성과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험 요인\n2. 전압 특성\n3. 안전 대책\n4. 작업 수칙\n5. 예상 문제 3개' },
        { id: 32, question: '고소작업 안전관리를 설명하시오.', answer: '안전대 착용, 추락방지망, 작업발판, 2인 이상 작업', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 고소작업 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전 장비\n2. 작업 절차\n3. 주의사항\n4. 비상 대응\n5. 예상 문제 3개' },
        { id: 33, question: '중량물 취급 안전관리를 설명하시오.', answer: '양중장비 사용, 신호수 배치, 인력운반 제한, 와이어 점검', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 중량물 취급 안전관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양중 장비\n2. 작업 절차\n3. 안전 수칙\n4. 점검 항목\n5. 예상 문제 3개' },
        { id: 34, question: '화재 예방 및 대응 방안을 설명하시오.', answer: '케이블 정리, 접속부 관리, 소화기 비치, 비상연락망', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 화재 예방 및 대응 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재 원인\n2. 예방 조치\n3. 소화 장비\n4. 대응 절차\n5. 예상 문제 3개' },
        { id: 35, question: '안전보호구 종류와 착용 기준을 설명하시오.', answer: '안전모, 안전대, 절연장갑, 안전화, 보안경', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 안전보호구 종류와 착용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보호구 종류\n2. 착용 기준\n3. 점검 방법\n4. 관리 요령\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 6, name: '품질관리',
      questions: [
        { id: 36, question: '자재 입고 검수 항목을 설명하시오.', answer: '외관검사, 수량확인, 시험성적서, 인증마크, 규격 적합성', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 자재 입고 검수 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검수 항목\n2. 검사 방법\n3. 서류 확인\n4. 불합격 조치\n5. 예상 문제 3개' },
        { id: 37, question: '모듈 수입검사 항목을 설명하시오.', answer: '외관(파손, 오염), 플래시테스트 성적서, 인증(KC), EL 검사', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 수입검사 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외관 검사\n2. 서류 확인\n3. 성능 검사\n4. 불합격 처리\n5. 예상 문제 3개' },
        { id: 38, question: '시공 중 품질관리 체크리스트를 설명하시오.', answer: '기초검사, 구조물검사, 배선검사, 접지검사, 중간검사', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 시공 중 품질관리 체크리스트를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 항목\n2. 검사 시점\n3. 판정 기준\n4. 기록 관리\n5. 예상 문제 3개' },
        { id: 39, question: '하자 유형과 예방 방법을 설명하시오.', answer: '시공불량, 자재불량, 설계오류 / 검수강화, 교육, 감리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 하자 유형과 예방 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하자 유형\n2. 발생 원인\n3. 예방 방법\n4. 보수 절차\n5. 예상 문제 3개' },
        { id: 40, question: '공사 기록 및 문서 관리를 설명하시오.', answer: '공사일지, 검사기록, 사진대지, 준공도서, 유지관리매뉴얼', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 공사 기록 및 문서 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기록 종류\n2. 작성 요령\n3. 보관 기간\n4. 인수인계\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 7, name: '유지보수',
      questions: [
        { id: 41, question: '정기점검 항목과 주기를 설명하시오.', answer: '일상점검(육안), 월간점검(청소), 연간점검(정밀), 특별점검', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 정기점검 항목과 주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 주기\n2. 점검 항목\n3. 점검 방법\n4. 기록 관리\n5. 예상 문제 3개' },
        { id: 42, question: '모듈 세정 방법과 주의사항을 설명하시오.', answer: '물 세척, 저압, 세제 주의, 고온 시 피하기, 흠집 방지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 세정 방법과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세정 방법\n2. 세정 시기\n3. 주의사항\n4. 효과 측정\n5. 예상 문제 3개' },
        { id: 43, question: '성능저하 원인과 진단 방법을 설명하시오.', answer: '오염, 음영, 열화, 고장 / 발전량 분석, I-V 측정, 열화상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 성능저하 원인과 진단 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저하 원인\n2. 진단 방법\n3. 측정 장비\n4. 개선 조치\n5. 예상 문제 3개' },
        { id: 44, question: '고장 유형과 조치 방법을 설명하시오.', answer: '모듈고장, 인버터고장, 배선고장 / 교체, 수리, 재연결', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 고장 유형과 조치 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고장 유형\n2. 진단 방법\n3. 조치 방법\n4. 예방 대책\n5. 예상 문제 3개' },
        { id: 45, question: '열화상 카메라를 이용한 점검 방법을 설명하시오.', answer: '핫스팟 검출, 접속부 발열, 셀 불량, 부하 상태에서 촬영', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 열화상 카메라 점검 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촬영 조건\n2. 분석 방법\n3. 이상 판정\n4. 조치 방법\n5. 예상 문제 3개' },
        { id: 46, question: '인버터 고장 진단 및 조치를 설명하시오.', answer: '에러코드 확인, 전압/전류 측정, 리셋, 부품 교체', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 고장 진단 및 조치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고장 증상\n2. 진단 방법\n3. 조치 절차\n4. 예방 관리\n5. 예상 문제 3개' },
        { id: 47, question: '예방정비 계획 수립 방법을 설명하시오.', answer: '장비별 점검주기, 부품교체주기, 예산편성, 인력계획', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 예방정비 계획 수립 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계획 항목\n2. 주기 설정\n3. 예산 편성\n4. 실행 관리\n5. 예상 문제 3개' },
        { id: 48, question: 'O&M 비용 구성과 관리를 설명하시오.', answer: '인건비, 부품비, 보험료, 토지임대료, 관리비', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: O&M 비용 구성과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비용 구성\n2. 비용 절감\n3. 예산 관리\n4. 실적 분석\n5. 예상 문제 3개' },
        { id: 49, question: 'RCM(신뢰성중심유지보수) 적용 방안을 설명하시오.', answer: '고장모드분석, 중요도평가, 정비전략수립, 최적화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: RCM 적용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RCM 개념\n2. 적용 절차\n3. 분석 방법\n4. 기대 효과\n5. 예상 문제 3개' },
        { id: 50, question: '수명연장을 위한 관리 방안을 설명하시오.', answer: '정기점검, 부품교체, 환경관리, 성능모니터링', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 수명연장을 위한 관리 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열화 요인\n2. 관리 방안\n3. 교체 기준\n4. 경제성 분석\n5. 예상 문제 3개' },
      ],
    },
  ];

  useEffect(() => { const saved = localStorage.getItem('solar-construction-completed'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleComplete = (id: number) => { const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id]; setCompletedQuestions(updated); localStorage.setItem('solar-construction-completed', JSON.stringify(updated)); };
  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-green-600">홈</a><span className="text-gray-300">›</span><a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-green-600">태양광발전설비기사</a><span className="text-gray-300">›</span><span className="text-green-600 font-medium">{subject.name}</span></nav></div></header>

      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4 mb-4"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-green-100">{subject.description}</p></div></div><div className="bg-white/20 rounded-lg p-4"><div className="flex justify-between text-sm mb-2"><span>진행률</span><span>{completedQuestions.length}/{totalQuestions} ({progress}%)</span></div><div className="h-3 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }}></div></div></div></div></section>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic, tIdx) => (<div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden"><button onClick={() => setExpandedTopics(expandedTopics.includes(tIdx) ? expandedTopics.filter((t) => t !== tIdx) : [...expandedTopics, tIdx])} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span><span className="font-bold text-gray-800">{topic.name}</span><span className="text-sm text-gray-500">({topic.questions.length}문항)</span></div><span className={`transform transition ${expandedTopics.includes(tIdx) ? 'rotate-180' : ''}`}>▼</span></button>{expandedTopics.includes(tIdx) && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`border rounded-lg p-4 ${completedQuestions.includes(q.id) ? 'bg-green-50 border-green-300' : 'border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions.includes(q.id) && '✓'}</button><div className="flex-1"><p className="text-gray-800 font-medium">Q{q.id}. {q.question}</p><p className="text-sm text-green-700 mt-2 bg-green-50 p-2 rounded">💡 {q.answer}</p><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">🤖 AI에게 질문</button></div></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
