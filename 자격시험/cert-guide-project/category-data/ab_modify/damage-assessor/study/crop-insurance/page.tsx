'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  // 손해평가 이론 (13문제)
  {
    id: 1,
    question: "농작물재해보험에서 '손해평가'의 정의로 옳은 것은?",
    options: ["보험료 산정 업무", "재해로 인한 손해를 조사하고 평가하는 업무", "보험계약 체결 업무", "보험금 지급 업무"],
    answer: 1,
    explanation: "손해평가란 자연재해 등으로 인한 농작물의 손해를 현장에서 조사하고 평가하여 보험금 산정의 기초 자료를 만드는 업무입니다.",
    category: "손해평가 이론"
  },
  {
    id: 2,
    question: "손해평가의 기본 원칙에 해당하지 않는 것은?",
    options: ["공정성", "객관성", "신속성", "주관성"],
    answer: 3,
    explanation: "손해평가는 공정성, 객관성, 신속성을 기본 원칙으로 하며, 주관성은 배제해야 합니다.",
    category: "손해평가 이론"
  },
  {
    id: 3,
    question: "농작물재해보험의 손해평가 대상이 아닌 것은?",
    options: ["태풍 피해", "우박 피해", "시장가격 하락", "동상해"],
    answer: 2,
    explanation: "시장가격 하락은 재해가 아니므로 손해평가 대상이 아닙니다.",
    category: "손해평가 이론"
  },
  {
    id: 4,
    question: "손해평가 시 피해율 산정 공식으로 옳은 것은?",
    options: ["(기준수확량-수확량)/수확량×100", "(기준수확량-수확량)/기준수확량×100", "(수확량-기준수확량)/기준수확량×100", "수확량/기준수확량×100"],
    answer: 1,
    explanation: "피해율 = (기준수확량 - 실제수확량) / 기준수확량 × 100",
    category: "손해평가 이론"
  },
  {
    id: 5,
    question: "농작물재해보험에서 '자기부담비율'의 의미는?",
    options: ["보험회사가 부담하는 손해 비율", "농업인이 스스로 부담하는 손해 비율", "정부가 지원하는 보험료 비율", "재보험 비율"],
    answer: 1,
    explanation: "자기부담비율은 손해 발생 시 보험가입자(농업인)가 스스로 부담하는 손해의 비율입니다.",
    category: "손해평가 이론"
  },
  {
    id: 6,
    question: "보험금 산정 공식으로 옳은 것은?",
    options: ["보험가액 × 피해율", "보험가입금액 × (피해율 - 자기부담비율)", "(보험가입금액 × 피해율) - 자기부담금", "기준수확량 × 기준가격"],
    answer: 1,
    explanation: "보험금 = 보험가입금액 × (피해율 - 자기부담비율). 피해율이 자기부담비율을 초과하는 경우에만 보험금이 지급됩니다.",
    category: "손해평가 이론"
  },
  {
    id: 7,
    question: "'전손(全損)'의 판정 기준으로 옳은 것은?",
    options: ["피해율 50% 이상", "피해율 70% 이상", "피해율 80% 이상", "피해율 100%만 해당"],
    answer: 2,
    explanation: "일반적으로 피해율 80% 이상인 경우 전손으로 간주하여 보험금을 지급합니다.",
    category: "손해평가 이론"
  },
  {
    id: 8,
    question: "분손(分損)과 전손의 차이점은?",
    options: ["분손은 부분 손해, 전손은 전체 손해", "분손이 더 큰 피해", "전손은 자기부담 없음", "차이 없음"],
    answer: 0,
    explanation: "분손은 부분적인 손해를 의미하고, 전손은 피해율 80% 이상의 전체 손해를 의미합니다.",
    category: "손해평가 이론"
  },
  {
    id: 9,
    question: "손해평가 시 '감수량'이란?",
    options: ["실제 수확량", "기준수확량에서 실제수확량을 뺀 값", "예상 수확량", "평년 수확량"],
    answer: 1,
    explanation: "감수량 = 기준수확량 - 실제수확량으로, 재해로 인해 감소한 수확량을 의미합니다.",
    category: "손해평가 이론"
  },
  {
    id: 10,
    question: "복합 재해 발생 시 손해평가 방법은?",
    options: ["가장 큰 피해만 평가", "각 재해별 피해를 합산", "중복 피해 조정 후 평가", "재해 발생 순서대로 평가"],
    answer: 2,
    explanation: "복합 재해 시 중복 피해가 발생하지 않도록 조정하여 최종 피해율을 산정합니다.",
    category: "손해평가 이론"
  },
  {
    id: 11,
    question: "손해평가서의 필수 기재사항이 아닌 것은?",
    options: ["피해 원인", "피해율", "피해 면적", "농업인의 학력"],
    answer: 3,
    explanation: "손해평가서에는 피해 원인, 피해율, 피해 면적 등을 기재하며, 농업인의 학력은 기재사항이 아닙니다.",
    category: "손해평가 이론"
  },
  {
    id: 12,
    question: "손해평가 결과에 대한 이의신청 기간은?",
    options: ["결과 통지 후 7일 이내", "결과 통지 후 14일 이내", "결과 통지 후 30일 이내", "이의신청 불가"],
    answer: 1,
    explanation: "손해평가 결과에 대해 농업인은 통지받은 날부터 14일 이내에 이의신청을 할 수 있습니다.",
    category: "손해평가 이론"
  },
  {
    id: 13,
    question: "재평가(재조사)가 필요한 경우가 아닌 것은?",
    options: ["평가 결과에 명백한 오류가 있는 경우", "이의신청이 있는 경우", "농업인이 불만을 표시한 경우", "새로운 피해 발생 시"],
    answer: 2,
    explanation: "단순 불만 표시만으로는 재평가 사유가 되지 않으며, 명백한 오류, 이의신청, 추가 피해 등이 재평가 사유입니다.",
    category: "손해평가 이론"
  },
  // 작물별 평가요령 (12문제)
  {
    id: 14,
    question: "사과 피해율 산정 시 고려하지 않는 것은?",
    options: ["낙과율", "착색 불량", "병반과율", "농업인 희망 가격"],
    answer: 3,
    explanation: "사과 손해평가 시 낙과율, 착색 불량, 병반과 등을 고려하며, 농업인 희망 가격은 평가 기준이 아닙니다.",
    category: "작물별 평가요령"
  },
  {
    id: 15,
    question: "벼 손해평가에서 '등숙률'이란?",
    options: ["벼 껍질의 두께", "이삭 당 익은 알의 비율", "출수 후 일수", "벼 줄기의 굵기"],
    answer: 1,
    explanation: "등숙률은 이삭 당 정상적으로 익은 알(등숙립)의 비율을 의미합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 16,
    question: "포도의 열과(裂果) 피해 평가 방법은?",
    options: ["과실 무게 측정", "열과 발생 비율 산정", "당도 측정", "착색도 평가"],
    answer: 1,
    explanation: "열과 피해는 전체 과실 중 열과(껍질이 터진 과실)의 발생 비율로 평가합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 17,
    question: "배 손해평가 시 '동녹'이란?",
    options: ["녹색 반점", "과피에 생기는 갈색 거친 표면", "과실 부패", "잎 반점"],
    answer: 1,
    explanation: "동녹은 배 과피에 발생하는 갈색의 거친 코르크층으로, 상품가치를 떨어뜨립니다.",
    category: "작물별 평가요령"
  },
  {
    id: 18,
    question: "인삼 손해평가의 특성으로 옳은 것은?",
    options: ["단년생으로 평가 단순", "다년생으로 연근별 평가 필요", "지상부만 평가", "가격 변동과 무관"],
    answer: 1,
    explanation: "인삼은 4~6년근 다년생 작물로 연근(재배 년수)별로 손해평가를 실시합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 19,
    question: "고추 손해평가 시 역병 피해 판정 기준은?",
    options: ["잎 피해만 평가", "역병으로 인한 고사주 비율", "과실 무게 감소", "착색도 변화"],
    answer: 1,
    explanation: "고추 역병은 주로 뿌리와 줄기에 발생하여 포기 전체가 고사하므로 고사주 비율로 평가합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 20,
    question: "감귤 동해(凍害) 평가 시기로 적절한 것은?",
    options: ["동해 발생 직후", "동해 발생 후 2~3주 경과 후", "수확 시", "개화 시"],
    answer: 1,
    explanation: "동해는 피해 증상이 시간이 지나면서 나타나므로 발생 후 2~3주 경과 후 평가합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 21,
    question: "콩 손해평가에서 '협 피해'란?",
    options: ["뿌리 피해", "줄기 피해", "꼬투리(협) 피해", "잎 피해"],
    answer: 2,
    explanation: "콩의 협 피해는 콩이 들어있는 꼬투리(협)에 발생한 피해를 의미합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 22,
    question: "양파 도복(倒伏) 평가 시 주의사항은?",
    options: ["자연 도복과 재해 도복 구분", "모든 도복을 피해로 산정", "도복은 피해가 아님", "도복률만 측정"],
    answer: 0,
    explanation: "양파는 수확기에 자연 도복이 발생하므로 재해로 인한 조기 도복과 구분해야 합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 23,
    question: "마늘 수해(水害) 평가 항목이 아닌 것은?",
    options: ["침수 일수", "생육 피해", "부패 발생", "시장 가격"],
    answer: 3,
    explanation: "마늘 수해 평가 시 침수 일수, 생육 피해, 부패 발생 등을 평가하며, 시장 가격은 평가 항목이 아닙니다.",
    category: "작물별 평가요령"
  },
  {
    id: 24,
    question: "시설작물 손해평가의 특징은?",
    options: ["노지 작물과 동일", "시설물 피해와 작물 피해를 구분 평가", "시설물만 평가", "작물만 평가"],
    answer: 1,
    explanation: "시설작물 손해평가는 시설물(비닐하우스 등) 피해와 내부 작물 피해를 구분하여 평가합니다.",
    category: "작물별 평가요령"
  },
  {
    id: 25,
    question: "수확기 과수 낙과 평가 시 표본 조사 방법은?",
    options: ["전수 조사만 가능", "나무당 표본과 선정하여 조사", "육안으로만 판단", "무게로만 측정"],
    answer: 1,
    explanation: "수확기 낙과 평가는 나무당 표본과를 선정하여 조사하는 표본조사법을 사용합니다.",
    category: "작물별 평가요령"
  },
  // 현장실무 (13문제)
  {
    id: 26,
    question: "손해평가 현장조사 시 가장 먼저 해야 할 일은?",
    options: ["보험금 계산", "농업인 신원 확인 및 피해 현장 확인", "손해평가서 작성", "사진 촬영"],
    answer: 1,
    explanation: "현장조사 시 먼저 농업인 신원과 계약내용을 확인하고 피해 현장을 확인합니다.",
    category: "현장실무"
  },
  {
    id: 27,
    question: "현장조사 시 필수 휴대물품이 아닌 것은?",
    options: ["신분증", "계약 내역서", "측정 도구", "개인 도시락"],
    answer: 3,
    explanation: "현장조사 시 신분증, 계약 내역서, 측정 도구(자, 저울 등), 카메라 등은 필수이나 개인 도시락은 아닙니다.",
    category: "현장실무"
  },
  {
    id: 28,
    question: "피해 현장 사진 촬영 시 주의사항이 아닌 것은?",
    options: ["원경과 근경 모두 촬영", "날짜가 표시되도록 촬영", "농업인 얼굴 중심 촬영", "피해 상황이 명확히 보이도록 촬영"],
    answer: 2,
    explanation: "피해 사진은 피해 상황을 명확히 기록하는 것이 목적이며, 농업인 얼굴은 필수 촬영 대상이 아닙니다.",
    category: "현장실무"
  },
  {
    id: 29,
    question: "표본조사에서 표본 선정 원칙은?",
    options: ["피해가 큰 곳만 선정", "무작위로 대표성 있게 선정", "피해가 작은 곳만 선정", "농업인이 지정한 곳만"],
    answer: 1,
    explanation: "표본은 전체를 대표할 수 있도록 무작위로 선정하여 조사 결과의 객관성을 확보해야 합니다.",
    category: "현장실무"
  },
  {
    id: 30,
    question: "농업인과 평가 결과가 다를 때 대처 방법은?",
    options: ["농업인 주장 수용", "손해평가사 판단만 기재", "양측 의견을 기록하고 객관적 근거 제시", "평가 중단"],
    answer: 2,
    explanation: "의견이 다를 경우 양측 의견을 기록하고 객관적인 근거와 자료를 바탕으로 설명합니다.",
    category: "현장실무"
  },
  {
    id: 31,
    question: "손해평가 완료 후 농업인에게 해야 할 일은?",
    options: ["아무 설명 없이 퇴장", "평가 결과 설명 및 확인 서명 징구", "보험금 즉시 지급", "재평가 안내"],
    answer: 1,
    explanation: "손해평가 후 농업인에게 평가 결과를 설명하고 확인 서명을 받아야 합니다.",
    category: "현장실무"
  },
  {
    id: 32,
    question: "면적 측정 방법으로 적절하지 않은 것은?",
    options: ["줄자 이용", "GPS 측정기 이용", "육안으로 대략 추정", "항공사진 분석"],
    answer: 2,
    explanation: "면적 측정은 줄자, GPS, 항공사진 등 객관적인 방법을 사용하며, 육안 추정은 적절하지 않습니다.",
    category: "현장실무"
  },
  {
    id: 33,
    question: "손해평가 시 수확량 측정 방법으로 옳은 것은?",
    options: ["농업인 진술만 기록", "표본 구역 설정 후 실측", "인근 농가 평균 적용", "전년도 수확량 적용"],
    answer: 1,
    explanation: "수확량은 표본 구역을 설정하여 실제 측정(실측)하는 것이 원칙입니다.",
    category: "현장실무"
  },
  {
    id: 34,
    question: "재해 발생 후 손해평가 적정 시기는?",
    options: ["재해 발생 직후 즉시", "피해 정도가 확정될 수 있는 시점", "수확 후에만", "1년 후"],
    answer: 1,
    explanation: "손해평가는 피해 정도가 확정될 수 있는 적정 시점에 실시합니다. 재해 종류에 따라 다릅니다.",
    category: "현장실무"
  },
  {
    id: 35,
    question: "손해평가서 작성 시 주의사항이 아닌 것은?",
    options: ["정확한 수치 기재", "객관적 사실 기재", "개인 의견 과다 반영", "증빙자료 첨부"],
    answer: 2,
    explanation: "손해평가서는 객관적 사실과 정확한 수치를 기재해야 하며, 주관적 의견을 과다 반영해서는 안 됩니다.",
    category: "현장실무"
  },
  {
    id: 36,
    question: "기상자료 수집의 중요성은?",
    options: ["불필요한 절차", "재해 발생 사실과 인과관계 입증", "보험료 산정", "행정 편의"],
    answer: 1,
    explanation: "기상자료는 재해 발생 사실과 피해와의 인과관계를 입증하는 중요한 자료입니다.",
    category: "현장실무"
  },
  {
    id: 37,
    question: "현장조사 시 농업인 입회의 필요성은?",
    options: ["법적 의무 없음", "피해 사실 확인 및 분쟁 예방", "조사 시간 단축", "농업인 편의"],
    answer: 1,
    explanation: "농업인 입회는 피해 사실 확인과 향후 분쟁을 예방하기 위해 중요합니다.",
    category: "현장실무"
  },
  {
    id: 38,
    question: "손해평가 업무 중 금지 행위는?",
    options: ["정확한 측정", "객관적 평가", "금품 수수", "사진 촬영"],
    answer: 2,
    explanation: "손해평가사는 금품 수수, 허위 평가 등의 부정행위가 금지되어 있습니다.",
    category: "현장실무"
  },
  // 보험금 산정 (12문제)
  {
    id: 39,
    question: "보험가입금액이 1,000만원, 피해율 30%, 자기부담비율 10%일 때 보험금은?",
    options: ["100만원", "200만원", "300만원", "0원"],
    answer: 1,
    explanation: "보험금 = 1,000만원 × (30% - 10%) = 1,000만원 × 20% = 200만원",
    category: "보험금 산정"
  },
  {
    id: 40,
    question: "피해율이 자기부담비율보다 낮은 경우 보험금은?",
    options: ["피해율만큼 지급", "자기부담금만큼 지급", "지급되지 않음", "보험가입금액 전액"],
    answer: 2,
    explanation: "피해율이 자기부담비율 이하인 경우 보험금이 지급되지 않습니다.",
    category: "보험금 산정"
  },
  {
    id: 41,
    question: "기준수확량 100kg, 실제수확량 60kg일 때 피해율은?",
    options: ["40%", "60%", "100%", "160%"],
    answer: 0,
    explanation: "피해율 = (100kg - 60kg) / 100kg × 100 = 40%",
    category: "보험금 산정"
  },
  {
    id: 42,
    question: "보험가액과 보험가입금액의 관계로 옳은 것은?",
    options: ["항상 동일", "보험가입금액이 항상 높음", "보험가입금액은 보험가액 범위 내에서 선택", "관계 없음"],
    answer: 2,
    explanation: "보험가입금액은 보험가액(피해 최대 금액) 범위 내에서 가입자가 선택합니다.",
    category: "보험금 산정"
  },
  {
    id: 43,
    question: "착과감소보장 상품의 보험금 산정 기준은?",
    options: ["수확량 감소", "착과율 감소", "품질 저하", "가격 하락"],
    answer: 1,
    explanation: "착과감소보장은 착과율(꽃이 열매가 되는 비율) 감소를 기준으로 보험금을 산정합니다.",
    category: "보험금 산정"
  },
  {
    id: 44,
    question: "종합위험방식 상품의 특징은?",
    options: ["특정 재해만 보장", "모든 자연재해 및 조수해 등 종합 보장", "화재만 보장", "병해충만 보장"],
    answer: 1,
    explanation: "종합위험방식은 태풍, 우박, 가뭄, 동해, 조수해 등 다양한 위험을 종합적으로 보장합니다.",
    category: "보험금 산정"
  },
  {
    id: 45,
    question: "보험금 과다 청구 시 불이익은?",
    options: ["없음", "보험계약 해지 및 보험금 반환", "다음 해 보험료 할인", "즉시 지급"],
    answer: 1,
    explanation: "허위 또는 과다 청구 시 보험계약이 해지되고 이미 지급된 보험금 반환 및 법적 처벌을 받을 수 있습니다.",
    category: "보험금 산정"
  },
  {
    id: 46,
    question: "잔존물 가치가 있는 경우 보험금 산정은?",
    options: ["잔존물 가치 미고려", "잔존물 가치를 공제 후 지급", "잔존물 가치만큼 추가 지급", "잔존물은 보험자 귀속"],
    answer: 1,
    explanation: "피해 농작물에 잔존 가치가 있는 경우 해당 가치를 공제한 후 보험금을 산정합니다.",
    category: "보험금 산정"
  },
  {
    id: 47,
    question: "보험금 지급 기한은?",
    options: ["청구 후 3일 이내", "손해평가 완료 후 14일 이내", "1개월 이내", "기한 없음"],
    answer: 1,
    explanation: "보험금은 손해평가가 완료되고 보험금 청구가 접수된 후 일정 기간(약 14일) 이내에 지급됩니다.",
    category: "보험금 산정"
  },
  {
    id: 48,
    question: "이중 보험의 경우 보험금 처리는?",
    options: ["두 보험에서 전액 수령 가능", "비례 보상 원칙 적용", "먼저 가입한 보험만 지급", "나중 가입 보험만 지급"],
    answer: 1,
    explanation: "이중 보험의 경우 실손보상 원칙에 따라 각 보험에서 비례하여 보상합니다.",
    category: "보험금 산정"
  },
  {
    id: 49,
    question: "면책 사유에 해당하는 것은?",
    options: ["태풍 피해", "우박 피해", "고의에 의한 손해", "폭우 피해"],
    answer: 2,
    explanation: "보험계약자 또는 피보험자의 고의에 의한 손해는 면책 사유로 보험금이 지급되지 않습니다.",
    category: "보험금 산정"
  },
  {
    id: 50,
    question: "가입 농지 일부만 피해 시 보험금 산정 방법은?",
    options: ["전체 농지 기준 산정", "피해 면적 비율로 산정", "피해 없음 처리", "최소 피해만 인정"],
    answer: 1,
    explanation: "일부 농지만 피해 시 피해 면적 비율을 고려하여 보험금을 산정합니다.",
    category: "보험금 산정"
  }
];

export default function CropInsurancePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('damage-assessor-crop-insurance-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('damage-assessor-crop-insurance-progress', JSON.stringify({
      score: newScore, answered: Array.from(answered), current
    }));
  };

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const newAnswered = new Set(answeredQuestions).add(currentQuestion);
    setAnsweredQuestions(newAnswered);
    let newScore = score;
    if (index === questions[currentQuestion].answer) newScore = score + 1;
    setScore(newScore);
    saveProgress(newScore, newAnswered, currentQuestion);
    if (newAnswered.size === questions.length) setIsComplete(true);
  };

  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowExplanation(false); saveProgress(score, answeredQuestions, currentQuestion + 1); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowExplanation(false); } };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); setScore(0); setAnsweredQuestions(new Set()); setIsComplete(false); localStorage.removeItem('damage-assessor-crop-insurance-progress'); };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = { "손해평가 이론": "bg-emerald-100 text-emerald-800", "작물별 평가요령": "bg-teal-100 text-teal-800", "현장실무": "bg-cyan-100 text-cyan-800", "보험금 산정": "bg-blue-100 text-blue-800" };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>손해평가사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">농작물재해보험 이론과 실무</h1>
          <p className="text-emerald-100">손해평가 이론, 작물별 평가, 현장실무</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-600">학습 진행률</span><span className="text-sm font-medium text-emerald-600">{answeredQuestions.size} / {questions.length} 문제</span></div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
          <div className="flex justify-between items-center mt-2"><span className="text-sm text-gray-500">현재 점수: {score}점</span><span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span></div>
        </div>

        {isComplete && (<div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center"><div className="text-6xl mb-4">🎉</div><h2 className="text-2xl font-bold mb-2">학습 완료!</h2><p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p><button onClick={resetQuiz} className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">다시 도전하기</button></div>)}

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6"><span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>{question.category}</span><span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span></div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">{question.options.map((option, index) => { let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 "; if (showExplanation) { if (index === question.answer) buttonClass += "border-green-500 bg-green-50 text-green-800"; else if (index === selectedAnswer) buttonClass += "border-red-500 bg-red-50 text-red-800"; else buttonClass += "border-gray-200 bg-gray-50 text-gray-500"; } else if (answeredQuestions.has(currentQuestion)) { buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"; } else { buttonClass += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer"; } return (<button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={buttonClass}><span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}</button>); })}</div>
          {showExplanation && (<div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200"><h3 className="font-bold text-teal-800 mb-2">💡 해설</h3><p className="text-teal-900">{question.explanation}</p></div>)}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>이전 문제</button>
          <button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">처음부터 다시</button>
          <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">다음 문제<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6"><h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{["손해평가 이론", "작물별 평가요령", "현장실무", "보험금 산정"].map((category, idx) => { const count = questions.filter(q => q.category === category).length; return (<div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}><div className="font-medium">{category}</div><div className="text-sm opacity-80">{count}문제</div></div>); })}</div></div>
      </div>
    </div>
  );
}
