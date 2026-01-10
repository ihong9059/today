#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
보험·부동산 분야 자격시험 가이드 생성 스크립트
"""

import os

CATEGORY = {
    "id": "insurance",
    "name": "보험·부동산",
    "color1": "cyan",
    "color2": "teal",
    "gradient": "from-cyan-500 to-teal-500"
}

CERTIFICATIONS = [
    {
        "id": "damage-assessor",
        "name": "손해평가사",
        "description": "농작물재해 손해평가 전문가",
        "subjects": [
            {
                "id": "crop-damage",
                "name": "농작물재해보험",
                "topics": [
                    {"id": "crop-damage-1", "name": "농작물재해보험 이론", "color": "from-cyan-500 to-teal-500",
                     "questions": [
                        {"id": 1, "question": "농작물재해보험의 법적 근거는?", "answer": "농어업재해보험법에 근거하여 시행됩니다.", "prompt": "농작물재해보험법의 법적 근거와 주요 내용을 설명해주세요."},
                        {"id": 2, "question": "보험대상 농작물의 종류는?", "answer": "과수, 벼, 밭작물, 시설작물, 가축 등이 있습니다.", "prompt": "농작물재해보험 대상 작물의 종류와 각각의 특성을 설명해주세요."},
                        {"id": 3, "question": "자연재해의 종류와 보상범위는?", "answer": "태풍, 우박, 홍수, 가뭄, 냉해 등 자연재해로 인한 손해를 보상합니다.", "prompt": "농작물재해보험에서 보상하는 자연재해의 종류와 보상범위를 설명해주세요."},
                        {"id": 4, "question": "보험료 산정 방법은?", "answer": "영농규모, 작물종류, 지역별 위험도 등을 고려하여 산정합니다.", "prompt": "농작물재해보험 보험료 산정 방법과 고려요소를 설명해주세요."},
                        {"id": 5, "question": "손해평가의 절차는?", "answer": "피해신고 → 현장조사 → 손해액 산정 → 보험금 지급 절차로 진행됩니다.", "prompt": "농작물재해보험 손해평가 절차를 단계별로 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "assessment-practice",
                "name": "손해평가 실무",
                "topics": [
                    {"id": "assessment-practice-1", "name": "손해평가 기법", "color": "from-teal-500 to-emerald-500",
                     "questions": [
                        {"id": 1, "question": "과수류 손해평가 방법은?", "answer": "착과량 조사, 품질저하 평가, 수확량 감소율 산정 등을 수행합니다.", "prompt": "과수류 농작물의 손해평가 방법과 기법을 상세히 설명해주세요."},
                        {"id": 2, "question": "벼 손해평가 기준은?", "answer": "수확량 감소율, 품질등급 하락, 도복률 등을 평가합니다.", "prompt": "벼 농사의 손해평가 기준과 방법을 설명해주세요."},
                        {"id": 3, "question": "시설작물 피해 산정 방법은?", "answer": "시설 파손율, 작물 피해율, 복구비용 등을 종합 평가합니다.", "prompt": "시설작물 피해 산정 방법과 평가 기준을 설명해주세요."},
                        {"id": 4, "question": "손해평가서 작성 요령은?", "answer": "피해현황, 조사방법, 손해액 산정근거 등을 명확히 기재합니다.", "prompt": "손해평가서 작성 시 포함해야 할 항목과 작성 요령을 설명해주세요."},
                        {"id": 5, "question": "분쟁 조정 절차는?", "answer": "재심사 청구, 분쟁조정위원회 회부, 소송 등의 절차가 있습니다.", "prompt": "손해평가 관련 분쟁 발생 시 조정 절차를 설명해주세요."},
                    ]},
                ]
            },
        ]
    },
    {
        "id": "housing-manager",
        "name": "주택관리사(보)",
        "description": "공동주택 관리 전문가",
        "subjects": [
            {
                "id": "housing-law",
                "name": "주택관계법령",
                "topics": [
                    {"id": "housing-law-1", "name": "공동주택관리법", "color": "from-cyan-500 to-teal-500",
                     "questions": [
                        {"id": 1, "question": "공동주택관리법의 적용대상은?", "answer": "300세대 이상 공동주택, 승강기 설치 공동주택 등에 적용됩니다.", "prompt": "공동주택관리법의 적용대상과 관리의무 기준을 설명해주세요."},
                        {"id": 2, "question": "입주자대표회의 구성과 역할은?", "answer": "동별 대표자로 구성되며, 관리규약 제정, 관리비 운영 등을 담당합니다.", "prompt": "입주자대표회의의 구성 방법과 주요 역할을 설명해주세요."},
                        {"id": 3, "question": "관리규약의 주요 내용은?", "answer": "관리비 부과기준, 공용시설 이용, 층간소음 규정 등을 포함합니다.", "prompt": "공동주택 관리규약에 포함되어야 할 필수 사항을 설명해주세요."},
                        {"id": 4, "question": "장기수선충당금의 적립과 사용은?", "answer": "월별 적립하고, 장기수선계획에 따라 사용합니다.", "prompt": "장기수선충당금의 적립 기준과 사용 절차를 설명해주세요."},
                        {"id": 5, "question": "하자담보책임 기간은?", "answer": "구조체 10년, 설비 2~5년 등 부위별로 다릅니다.", "prompt": "공동주택 하자담보책임의 부위별 기간과 보수 절차를 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "facility-management",
                "name": "시설관리실무",
                "topics": [
                    {"id": "facility-management-1", "name": "건축물 유지관리", "color": "from-teal-500 to-emerald-500",
                     "questions": [
                        {"id": 1, "question": "승강기 안전관리 기준은?", "answer": "월 1회 자체점검, 연 1회 정기검사 등을 실시합니다.", "prompt": "공동주택 승강기 안전관리 기준과 점검 항목을 설명해주세요."},
                        {"id": 2, "question": "소방시설 점검 주기는?", "answer": "작동기능점검 연 1회, 종합정밀점검 연 1회 실시합니다.", "prompt": "공동주택 소방시설 점검 종류와 주기를 설명해주세요."},
                        {"id": 3, "question": "급수시설 관리 방법은?", "answer": "저수조 청소 연 2회, 수질검사 연 1회 이상 실시합니다.", "prompt": "공동주택 급수시설 관리 기준과 수질관리 방법을 설명해주세요."},
                        {"id": 4, "question": "전기시설 안전관리는?", "answer": "수전설비 점검, 접지저항 측정, 절연저항 측정 등을 수행합니다.", "prompt": "공동주택 전기시설 안전관리 점검 항목을 설명해주세요."},
                        {"id": 5, "question": "에너지 절약 관리 방안은?", "answer": "LED 조명 교체, 심야전력 활용, 태양광 설치 등이 있습니다.", "prompt": "공동주택 에너지 절약을 위한 관리 방안을 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "accounting-practice",
                "name": "회계관리실무",
                "topics": [
                    {"id": "accounting-practice-1", "name": "관리비 회계", "color": "from-emerald-500 to-green-500",
                     "questions": [
                        {"id": 1, "question": "관리비 항목 구성은?", "answer": "일반관리비, 청소비, 경비비, 수선유지비, 승강기유지비 등으로 구성됩니다.", "prompt": "공동주택 관리비의 세부 항목과 각 항목의 내용을 설명해주세요."},
                        {"id": 2, "question": "관리비 부과 기준은?", "answer": "전용면적, 세대별 균등, 사용량 비례 등 항목별로 다릅니다.", "prompt": "공동주택 관리비 부과 기준과 산정 방법을 설명해주세요."},
                        {"id": 3, "question": "예산 편성 절차는?", "answer": "예산안 작성 → 입대위 심의 → 입주자 공개 순으로 진행됩니다.", "prompt": "공동주택 관리비 예산 편성 절차와 주의사항을 설명해주세요."},
                        {"id": 4, "question": "결산 보고서 작성 방법은?", "answer": "수입·지출 명세, 이월금 내역, 결산 총괄표 등을 포함합니다.", "prompt": "공동주택 관리비 결산 보고서 작성 방법을 설명해주세요."},
                        {"id": 5, "question": "회계감사 대상과 절차는?", "answer": "300세대 이상 의무감사, 외부감사 또는 자체감사를 실시합니다.", "prompt": "공동주택 관리비 회계감사 대상과 절차를 설명해주세요."},
                    ]},
                ]
            },
        ]
    },
    {
        "id": "actuary",
        "name": "보험계리사",
        "description": "보험상품 설계 및 리스크 관리 전문가",
        "subjects": [
            {
                "id": "actuarial-math",
                "name": "보험수리학",
                "topics": [
                    {"id": "actuarial-math-1", "name": "생명보험수리", "color": "from-cyan-500 to-teal-500",
                     "questions": [
                        {"id": 1, "question": "생명표(Life Table)의 구성요소는?", "answer": "생존자수(lx), 사망자수(dx), 사망률(qx), 생존확률(px) 등입니다.", "prompt": "생명표의 구성요소와 각 요소의 의미를 수학적으로 설명해주세요."},
                        {"id": 2, "question": "순보험료 산출 원리는?", "answer": "수지상등의 원칙에 따라 보험료 현가 = 보험금 현가로 계산합니다.", "prompt": "생명보험 순보험료 산출의 수학적 원리를 설명해주세요."},
                        {"id": 3, "question": "책임준비금 계산 방법은?", "answer": "순보험료식, 질머식 등의 방법으로 계산합니다.", "prompt": "보험계약 책임준비금의 계산 방법과 종류를 설명해주세요."},
                        {"id": 4, "question": "해약환급금 산정 기준은?", "answer": "책임준비금에서 해약공제액을 차감하여 산정합니다.", "prompt": "생명보험 해약환급금 산정 방법과 기준을 설명해주세요."},
                        {"id": 5, "question": "이원분석의 목적과 방법은?", "answer": "이차익, 사차익, 비차익을 분석하여 상품 수익성을 평가합니다.", "prompt": "보험상품 이원분석의 목적과 분석 방법을 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "risk-management",
                "name": "리스크관리",
                "topics": [
                    {"id": "risk-management-1", "name": "보험리스크 관리", "color": "from-teal-500 to-emerald-500",
                     "questions": [
                        {"id": 1, "question": "보험리스크의 종류는?", "answer": "언더라이팅리스크, 가격리스크, 지급준비금리스크 등이 있습니다.", "prompt": "보험회사가 직면하는 주요 리스크의 종류와 특성을 설명해주세요."},
                        {"id": 2, "question": "지급여력(Solvency) 제도란?", "answer": "보험회사의 재무건전성을 평가하는 지표로, 지급여력비율로 측정합니다.", "prompt": "보험회사 지급여력제도의 의의와 산출 방법을 설명해주세요."},
                        {"id": 3, "question": "K-ICS 제도의 특징은?", "answer": "IFRS17 기반 새로운 지급여력제도로, 시가평가를 적용합니다.", "prompt": "K-ICS(신지급여력제도)의 주요 특징과 기존 제도와의 차이를 설명해주세요."},
                        {"id": 4, "question": "ALM(자산부채관리)이란?", "answer": "자산과 부채의 듀레이션을 일치시켜 금리리스크를 관리합니다.", "prompt": "보험회사 ALM의 개념과 관리 방법을 설명해주세요."},
                        {"id": 5, "question": "재보험의 역할은?", "answer": "리스크 분산, 인수능력 확대, 자본효율성 제고 등의 역할을 합니다.", "prompt": "재보험의 종류와 보험회사 리스크관리에서의 역할을 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "product-design",
                "name": "상품설계",
                "topics": [
                    {"id": "product-design-1", "name": "보험상품 개발", "color": "from-emerald-500 to-green-500",
                     "questions": [
                        {"id": 1, "question": "보험상품 개발 절차는?", "answer": "시장조사 → 상품설계 → 요율산출 → 인가신청 → 출시 순으로 진행됩니다.", "prompt": "보험상품 개발 절차와 각 단계별 주요 업무를 설명해주세요."},
                        {"id": 2, "question": "위험률 산출 방법은?", "answer": "경험통계, 생명표, 손해율 분석 등을 통해 산출합니다.", "prompt": "보험상품 위험률 산출 방법과 고려 요소를 설명해주세요."},
                        {"id": 3, "question": "사업비율 구조는?", "answer": "신계약비, 유지비, 수금비로 구성됩니다.", "prompt": "보험상품 사업비의 구조와 각 비용의 특성을 설명해주세요."},
                        {"id": 4, "question": "예정이율 결정 요인은?", "answer": "시장금리, 자산운용수익률, 경쟁상품 등을 고려합니다.", "prompt": "보험상품 예정이율 결정 시 고려 요인을 설명해주세요."},
                        {"id": 5, "question": "변액보험 특별계정 운용은?", "answer": "펀드 선택, 자산배분, 리밸런싱 등을 통해 운용합니다.", "prompt": "변액보험 특별계정의 운용 방법과 리스크 관리를 설명해주세요."},
                    ]},
                ]
            },
        ]
    },
    {
        "id": "loss-adjuster",
        "name": "손해사정사",
        "description": "보험사고 손해액 산정 전문가",
        "subjects": [
            {
                "id": "loss-adjustment-theory",
                "name": "손해사정 이론",
                "topics": [
                    {"id": "loss-adjustment-theory-1", "name": "손해사정 기초", "color": "from-cyan-500 to-teal-500",
                     "questions": [
                        {"id": 1, "question": "손해사정사의 역할과 자격은?", "answer": "보험금 청구에 대한 손해액 산정, 사고조사 등을 수행하는 전문가입니다.", "prompt": "손해사정사의 역할, 자격요건, 업무 범위를 설명해주세요."},
                        {"id": 2, "question": "손해보험의 보상원칙은?", "answer": "실손보상원칙, 대위원칙, 분담원칙, 근인원칙 등이 있습니다.", "prompt": "손해보험의 주요 보상원칙과 각각의 의미를 설명해주세요."},
                        {"id": 3, "question": "보험가액과 보험금액의 차이는?", "answer": "보험가액은 피보험이익의 금전적 평가액, 보험금액은 보험계약에서 정한 최고한도입니다.", "prompt": "보험가액과 보험금액의 개념과 차이점을 설명해주세요."},
                        {"id": 4, "question": "초과보험과 일부보험이란?", "answer": "초과보험은 보험금액 > 보험가액, 일부보험은 보험금액 < 보험가액인 경우입니다.", "prompt": "초과보험과 일부보험의 개념과 보험금 산정 방법을 설명해주세요."},
                        {"id": 5, "question": "면책사유의 종류는?", "answer": "고의, 중대한 과실, 전쟁, 핵위험 등이 있습니다.", "prompt": "손해보험 면책사유의 종류와 법적 근거를 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "property-loss",
                "name": "재물손해사정",
                "topics": [
                    {"id": "property-loss-1", "name": "재물손해 평가", "color": "from-teal-500 to-emerald-500",
                     "questions": [
                        {"id": 1, "question": "화재손해 산정 방법은?", "answer": "실제손해액, 복구비용, 잔존물가액 등을 산정합니다.", "prompt": "화재보험 손해액 산정 방법과 절차를 설명해주세요."},
                        {"id": 2, "question": "기업휴지손해 산정 기준은?", "answer": "영업이익 감소액, 경상비 지출액 등을 산정합니다.", "prompt": "기업휴지보험 손해액 산정 기준과 방법을 설명해주세요."},
                        {"id": 3, "question": "도난손해 조사 방법은?", "answer": "피해물품 확인, 시가 산정, 경찰신고 확인 등을 수행합니다.", "prompt": "도난손해 사고조사와 손해액 산정 방법을 설명해주세요."},
                        {"id": 4, "question": "건물손해 평가 기준은?", "answer": "재조달가액, 시가, 감가상각 등을 고려합니다.", "prompt": "건물 손해액 평가 기준과 산정 방법을 설명해주세요."},
                        {"id": 5, "question": "기계장치 손해 산정은?", "answer": "수리비, 교체비, 가동중단손실 등을 산정합니다.", "prompt": "기계장치 손해액 산정 방법과 감가상각 적용을 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "auto-loss",
                "name": "차량손해사정",
                "topics": [
                    {"id": "auto-loss-1", "name": "자동차사고 손해", "color": "from-emerald-500 to-green-500",
                     "questions": [
                        {"id": 1, "question": "대물배상 손해액 산정은?", "answer": "수리비, 시가, 교환가치감소액 등을 산정합니다.", "prompt": "자동차보험 대물배상 손해액 산정 방법을 설명해주세요."},
                        {"id": 2, "question": "차량수리비 산정 기준은?", "answer": "부품비, 공임비, 도장비 등을 표준공임 기준으로 산정합니다.", "prompt": "자동차 수리비 산정 기준과 표준공임 적용 방법을 설명해주세요."},
                        {"id": 3, "question": "전손처리 기준은?", "answer": "수리비가 차량시가의 일정비율 초과 시 전손처리합니다.", "prompt": "자동차 전손처리 기준과 보험금 산정 방법을 설명해주세요."},
                        {"id": 4, "question": "휴차손해 산정 방법은?", "answer": "영업용 차량의 수리기간 동안 영업손실을 산정합니다.", "prompt": "영업용 차량 휴차손해 산정 방법과 기준을 설명해주세요."},
                        {"id": 5, "question": "과실상계와 손해배상은?", "answer": "쌍방과실 비율에 따라 손해배상액을 산정합니다.", "prompt": "자동차사고 과실상계 방법과 손해배상액 산정을 설명해주세요."},
                    ]},
                ]
            },
        ]
    },
    {
        "id": "insurance-broker",
        "name": "보험중개사",
        "description": "보험상품 중개 전문가",
        "subjects": [
            {
                "id": "insurance-law",
                "name": "보험법규",
                "topics": [
                    {"id": "insurance-law-1", "name": "보험업법", "color": "from-cyan-500 to-teal-500",
                     "questions": [
                        {"id": 1, "question": "보험중개사의 법적 지위는?", "answer": "보험계약자를 위해 보험계약 체결을 중개하는 독립된 사업자입니다.", "prompt": "보험중개사의 법적 지위와 보험대리점과의 차이를 설명해주세요."},
                        {"id": 2, "question": "보험중개사 등록 요건은?", "answer": "자본금, 전문인력, 시설 등의 요건을 갖추어야 합니다.", "prompt": "보험중개사 등록 요건과 등록 절차를 설명해주세요."},
                        {"id": 3, "question": "보험중개사의 의무는?", "answer": "선량한 관리자의 주의의무, 설명의무, 비밀유지의무 등이 있습니다.", "prompt": "보험중개사의 법적 의무와 책임을 설명해주세요."},
                        {"id": 4, "question": "중개수수료 체계는?", "answer": "보험회사로부터 수수료를 받으며, 요율은 상품별로 다릅니다.", "prompt": "보험중개사 수수료 체계와 수취 방법을 설명해주세요."},
                        {"id": 5, "question": "손해배상책임보험 가입 의무는?", "answer": "중개행위로 인한 손해배상을 위해 의무적으로 가입해야 합니다.", "prompt": "보험중개사 손해배상책임보험의 가입 의무와 보상 범위를 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "underwriting",
                "name": "언더라이팅",
                "topics": [
                    {"id": "underwriting-1", "name": "인수심사 기법", "color": "from-teal-500 to-emerald-500",
                     "questions": [
                        {"id": 1, "question": "언더라이팅의 목적은?", "answer": "적정한 위험선택과 요율적용을 통해 수익성을 확보합니다.", "prompt": "보험 언더라이팅의 목적과 중요성을 설명해주세요."},
                        {"id": 2, "question": "위험평가 요소는?", "answer": "물리적 위험, 도덕적 위험, 환경적 위험 등을 평가합니다.", "prompt": "보험 인수 시 평가하는 위험 요소의 종류를 설명해주세요."},
                        {"id": 3, "question": "체결조건 협상 방법은?", "answer": "담보범위, 면책사항, 할인할증 등을 협상합니다.", "prompt": "보험계약 체결조건 협상 방법과 전략을 설명해주세요."},
                        {"id": 4, "question": "기업보험 인수 프로세스는?", "answer": "위험조사 → 손해율분석 → 요율산출 → 조건협상 순으로 진행됩니다.", "prompt": "기업보험 인수 프로세스와 각 단계별 업무를 설명해주세요."},
                        {"id": 5, "question": "특약 설계 방법은?", "answer": "고객 니즈에 맞는 담보확장, 면책축소 등의 특약을 설계합니다.", "prompt": "보험계약 특약 설계 방법과 주요 특약의 종류를 설명해주세요."},
                    ]},
                ]
            },
            {
                "id": "risk-consulting",
                "name": "리스크 컨설팅",
                "topics": [
                    {"id": "risk-consulting-1", "name": "기업리스크 분석", "color": "from-emerald-500 to-green-500",
                     "questions": [
                        {"id": 1, "question": "기업리스크 진단 방법은?", "answer": "현장조사, 재무분석, 손해이력 검토 등을 수행합니다.", "prompt": "기업리스크 진단 방법과 분석 도구를 설명해주세요."},
                        {"id": 2, "question": "보험프로그램 설계 절차는?", "answer": "리스크 파악 → 담보설계 → 보험사 선정 → 계약체결 순으로 진행됩니다.", "prompt": "기업 보험프로그램 설계 절차와 고려사항을 설명해주세요."},
                        {"id": 3, "question": "손해예방 서비스란?", "answer": "리스크 개선, 안전교육, 점검 서비스 등을 제공합니다.", "prompt": "보험중개사가 제공하는 손해예방 서비스의 종류를 설명해주세요."},
                        {"id": 4, "question": "클레임 관리 서비스는?", "answer": "사고접수, 손해사정 지원, 보험금 청구 대행 등을 수행합니다.", "prompt": "보험중개사의 클레임 관리 서비스 내용을 설명해주세요."},
                        {"id": 5, "question": "갱신관리 업무는?", "answer": "만기안내, 갱신조건 협상, 시장비교 등을 수행합니다.", "prompt": "보험계약 갱신관리 업무와 고객서비스 방법을 설명해주세요."},
                    ]},
                ]
            },
        ]
    },
]

def generate_category_page():
    """카테고리 메인 페이지 생성"""
    certs_jsx = ""
    for cert in CERTIFICATIONS:
        certs_jsx += f"""
        <Link href="/category/{CATEGORY['id']}/{cert['id']}" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
          <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
            <h3 className="text-xl font-bold text-white">{{cert['{cert['id']}'].name}}</h3>
            <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">{{cert['{cert['id']}'].desc}}</p>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
              <span>학습 시작하기</span>
              <span>→</span>
            </div>
          </div>
        </Link>"""

    content = f"""import Link from 'next/link';

const cert = {{
  'damage-assessor': {{ name: '손해평가사', desc: '농작물재해 손해평가' }},
  'housing-manager': {{ name: '주택관리사(보)', desc: '공동주택 관리' }},
  'actuary': {{ name: '보험계리사', desc: '보험상품 설계 및 리스크 관리' }},
  'loss-adjuster': {{ name: '손해사정사', desc: '보험사고 손해액 산정' }},
  'insurance-broker': {{ name: '보험중개사', desc: '보험상품 중개' }},
}};

export default function InsuranceCategoryPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-{CATEGORY['color1']}-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY['color1']}-600 font-medium">{CATEGORY['name']}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY['gradient']} text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🏠</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{CATEGORY['name']} 자격시험</h1>
          <p className="text-lg text-{CATEGORY['color1']}-100">보험, 부동산, 리스크관리 분야 전문자격</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/category/insurance/damage-assessor" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
              <h3 className="text-xl font-bold text-white">손해평가사</h3>
              <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">농작물재해 손해평가</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/housing-manager" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
              <h3 className="text-xl font-bold text-white">주택관리사(보)</h3>
              <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">공동주택 관리</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/actuary" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
              <h3 className="text-xl font-bold text-white">보험계리사</h3>
              <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">보험상품 설계 및 리스크 관리</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/loss-adjuster" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
              <h3 className="text-xl font-bold text-white">손해사정사</h3>
              <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">보험사고 손해액 산정</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
          <Link href="/category/insurance/insurance-broker" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
            <div className="bg-gradient-to-r {CATEGORY['gradient']} p-4">
              <h3 className="text-xl font-bold text-white">보험중개사</h3>
              <p className="text-{CATEGORY['color1']}-100 text-sm mt-1">보험상품 중개</p>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-{CATEGORY['color1']}-600">
                <span>학습 시작하기</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
"""
    return content

def generate_main_page(cert):
    """자격증 메인 페이지 생성"""
    subjects_jsx = ""
    for subj in cert['subjects']:
        subjects_jsx += f"""
          <Link href="/category/{CATEGORY['id']}/{cert['id']}/study/{subj['id']}" className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-{CATEGORY['color1']}-500">
            <h3 className="text-lg font-semibold text-gray-800">{subj['name']}</h3>
            <p className="text-gray-500 text-sm mt-2">학습 시작하기 →</p>
          </Link>"""

    content = f"""import Link from 'next/link';

export default function {cert['id'].replace('-', ' ').title().replace(' ', '')}MainPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-{CATEGORY['color1']}-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY['id']}" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">{CATEGORY['name']}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY['color1']}-600 font-medium">{cert['name']}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY['gradient']} text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{cert['name']}</h1>
          <p className="text-lg text-{CATEGORY['color1']}-100">{cert['description']}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex gap-4 mb-8">
          <Link href="/category/{CATEGORY['id']}/{cert['id']}/exam" className="flex-1 bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition">
            <span className="text-3xl">📋</span>
            <h3 className="font-semibold mt-2">시험정보</h3>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 과목별 학습</h2>
        <div className="grid gap-4">{subjects_jsx}
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
"""
    return content

def generate_exam_page(cert):
    """시험정보 페이지 생성"""
    content = f"""import Link from 'next/link';

export default function {cert['id'].replace('-', ' ').title().replace(' ', '')}ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-{CATEGORY['color1']}-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY['id']}" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">{CATEGORY['name']}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY['id']}/{cert['id']}" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">{cert['name']}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY['color1']}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY['gradient']} text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">{cert['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">시험 정보 및 일정</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 시험 개요</h2>
          <p className="text-gray-600">{cert['description']} 자격시험입니다.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정</h2>
          <p className="text-gray-600">해당 자격증 시행기관의 공식 홈페이지에서 정확한 시험일정을 확인하세요.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 시험 과목</h2>
          <ul className="space-y-2">
            {"".join([f'<li className="text-gray-600">• {subj["name"]}</li>' for subj in cert['subjects']])}
          </ul>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
"""
    return content

def generate_study_page(cert, subject):
    """학습 페이지 생성"""
    topics_data = []
    for topic in subject['topics']:
        questions_data = []
        for q in topic['questions']:
            questions_data.append(f"""      {{
        id: {q['id']},
        question: '{q['question'].replace("'", "\\'")}',
        answer: '{q['answer'].replace("'", "\\'")}',
        prompt: `{q['prompt']}`
      }}""")

        topics_data.append(f"""  {{
    id: '{topic['id']}',
    name: '{topic['name']}',
    color: '{topic['color']}',
    questions: [
{','.join(questions_data)}
    ]
  }}""")

    content = f"""'use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
{','.join(topics_data)}
];

export default function StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{subject['id']}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleQuestion = (questionId: string) => {{
    const updated = {{ ...completedQuestions, [questionId]: !completedQuestions[questionId] }};
    setCompletedQuestions(updated);
    localStorage.setItem('{subject['id']}-progress', JSON.stringify(updated));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics(prev => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-{CATEGORY['color1']}-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY['id']}" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">{CATEGORY['name']}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY['id']}/{cert['id']}" className="text-gray-600 hover:text-{CATEGORY['color1']}-600">{cert['name']}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY['color1']}-600 font-medium">{subject['name']}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY['gradient']} text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{subject['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">{cert['name']} - {subject['name']} 학습</p>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all" style={{{{ width: `${{progressPercent}}%` }}}}></div>
          </div>
          <p className="text-sm mt-2 text-{CATEGORY['color1']}-100">{{completedCount}}/{{totalQuestions}} 완료 ({{progressPercent}}%)</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        {{topics.map((topic) => (
          <div key={{topic.id}} className="mb-6">
            <button
              onClick={{() => toggleTopic(topic.id)}}
              className={{`w-full flex items-center justify-between p-4 bg-gradient-to-r ${{topic.color}} text-white rounded-lg shadow-md`}}
            >
              <h2 className="text-lg font-bold">{{topic.name}}</h2>
              <span className="text-2xl">{{expandedTopics[topic.id] ? '−' : '+'}}</span>
            </button>

            {{expandedTopics[topic.id] && (
              <div className="mt-3 space-y-3">
                {{topic.questions.map((q) => {{
                  const qKey = `${{topic.id}}-${{q.id}}`;
                  return (
                    <div key={{qKey}} className="bg-white rounded-lg shadow-md p-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={{!!completedQuestions[qKey]}}
                          onChange={{() => toggleQuestion(qKey)}}
                          className="mt-1 w-5 h-5 text-{CATEGORY['color1']}-600"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{{q.question}}</h3>
                          <p className="text-gray-600 mt-2 text-sm">{{q.answer}}</p>
                          <div className="flex gap-2 flex-wrap mt-3">
                            <a
                              href={{`https://claude.ai/new?q=${{encodeURIComponent(q.prompt)}}`}}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                            >
                              🧡 Claude
                            </a>
                            <a
                              href={{`https://chat.openai.com/?q=${{encodeURIComponent(q.prompt)}}`}}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                            >
                              💚 ChatGPT
                            </a>
                            <a
                              href={{`https://gemini.google.com/app?q=${{encodeURIComponent(q.prompt)}}`}}
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
                }})}}
              </div>
            )}}
          </div>
        ))}}
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
"""
    return content

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # 카테고리 디렉토리 생성
    category_dir = base_dir
    os.makedirs(category_dir, exist_ok=True)

    # 카테고리 페이지 생성
    with open(os.path.join(category_dir, 'category-page.tsx'), 'w', encoding='utf-8') as f:
        f.write(generate_category_page())

    with open(os.path.join(category_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write("export { default } from './category-page';")

    print(f"Created: {CATEGORY['name']} category page")

    # 각 자격증별 페이지 생성
    for cert in CERTIFICATIONS:
        cert_dir = os.path.join(category_dir, cert['id'])
        os.makedirs(cert_dir, exist_ok=True)

        # 메인 페이지
        with open(os.path.join(cert_dir, 'main-page.tsx'), 'w', encoding='utf-8') as f:
            f.write(generate_main_page(cert))
        with open(os.path.join(cert_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
            f.write("export { default } from './main-page';")

        # 시험정보 페이지
        exam_dir = os.path.join(cert_dir, 'exam')
        os.makedirs(exam_dir, exist_ok=True)
        with open(os.path.join(cert_dir, 'exam-page.tsx'), 'w', encoding='utf-8') as f:
            f.write(generate_exam_page(cert))
        with open(os.path.join(exam_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
            f.write("export { default } from '../exam-page';")

        # 학습 페이지
        study_dir = os.path.join(cert_dir, 'study')
        os.makedirs(study_dir, exist_ok=True)

        for subject in cert['subjects']:
            subject_dir = os.path.join(study_dir, subject['id'])
            os.makedirs(subject_dir, exist_ok=True)
            with open(os.path.join(subject_dir, 'page.tsx'), 'w', encoding='utf-8') as f:
                f.write(generate_study_page(cert, subject))

        print(f"Created: {cert['name']}")

    print(f"\n✅ {CATEGORY['name']} 분야 생성 완료!")
    print(f"총 {len(CERTIFICATIONS)}개 자격증")

if __name__ == '__main__':
    main()
