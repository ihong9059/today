#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
회계·세무 분야 자격시험 가이드 생성 스크립트
"""

import os

BASE_DIR = r"C:\todo\today\자격시험\accounting"

# 카테고리 색상: 회계·세무 - emerald/teal
CATEGORY_COLOR = "emerald"
GRADIENT = "from-emerald-500 to-teal-600"

# 자격증 정보
CERTIFICATIONS = [
    {
        "id": "cpa",
        "name": "공인회계사(CPA)",
        "description": "회계감사 및 재무제표 작성 전문가",
        "icon": "📊",
        "hasPage": True,
        "subjects": [
            {
                "id": "financial-accounting",
                "name": "재무회계",
                "topics": [
                    {
                        "id": "accounting-framework",
                        "name": "회계기준 체계",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "IFRS와 K-IFRS의 차이점은?", "answer": "K-IFRS는 한국채택국제회계기준으로, 국제회계기준(IFRS)을 한국 실정에 맞게 도입한 것", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: IFRS와 K-IFRS의 차이점은?\n\n상세히 설명해주세요."},
                            {"question": "재무제표의 5가지 구성요소는?", "answer": "재무상태표, 포괄손익계산서, 자본변동표, 현금흐름표, 주석", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 재무제표의 5가지 구성요소는?\n\n상세히 설명해주세요."},
                            {"question": "발생주의와 현금주의의 차이는?", "answer": "발생주의: 거래가 발생한 시점에 인식, 현금주의: 현금을 수취하거나 지급한 시점에 인식", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 발생주의와 현금주의의 차이는?\n\n상세히 설명해주세요."},
                            {"question": "계속기업가정이란?", "answer": "기업이 예측 가능한 미래까지 계속 영업활동을 수행할 것이라는 가정", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 계속기업가정이란?\n\n상세히 설명해주세요."},
                            {"question": "중요성의 원칙이란?", "answer": "정보누락이나 왜곡표시가 이용자의 경제적 의사결정에 영향을 미칠 수 있는 경우 그 정보는 중요함", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 중요성의 원칙이란?\n\n상세히 설명해주세요."}
                        ]
                    },
                    {
                        "id": "asset-accounting",
                        "name": "자산회계",
                        "color": "from-teal-500 to-cyan-500",
                        "questions": [
                            {"question": "유형자산의 인식조건 두 가지는?", "answer": "1) 미래경제적효익이 기업에 유입될 가능성이 높음, 2) 자산의 원가를 신뢰성 있게 측정 가능", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 유형자산의 인식조건 두 가지는?\n\n상세히 설명해주세요."},
                            {"question": "감가상각 방법 3가지는?", "answer": "정액법, 정률법, 생산량비례법", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 감가상각 방법 3가지는?\n\n상세히 설명해주세요."},
                            {"question": "무형자산의 종류는?", "answer": "특허권, 상표권, 영업권, 개발비, 저작권, 프랜차이즈권 등", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 무형자산의 종류는?\n\n상세히 설명해주세요."},
                            {"question": "재고자산 평가방법은?", "answer": "선입선출법(FIFO), 평균법, 개별법. 후입선출법(LIFO)은 K-IFRS에서 금지", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 재고자산 평가방법은?\n\n상세히 설명해주세요."},
                            {"question": "손상차손이란?", "answer": "자산의 회수가능액이 장부금액보다 낮을 때 인식하는 손실", "prompt": "공인회계사 시험 재무회계 문제입니다.\n\n문제: 손상차손이란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            },
            {
                "id": "cost-accounting",
                "name": "원가관리회계",
                "topics": [
                    {
                        "id": "cost-concepts",
                        "name": "원가개념",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "제조원가의 3요소는?", "answer": "직접재료비, 직접노무비, 제조간접비", "prompt": "공인회계사 시험 원가관리회계 문제입니다.\n\n문제: 제조원가의 3요소는?\n\n상세히 설명해주세요."},
                            {"question": "변동비와 고정비의 차이는?", "answer": "변동비: 조업도에 따라 총액 변동, 고정비: 조업도 변동에도 총액 일정", "prompt": "공인회계사 시험 원가관리회계 문제입니다.\n\n문제: 변동비와 고정비의 차이는?\n\n상세히 설명해주세요."},
                            {"question": "기회비용이란?", "answer": "어떤 대안을 선택함으로써 포기하는 다른 대안의 최대 이익", "prompt": "공인회계사 시험 원가관리회계 문제입니다.\n\n문제: 기회비용이란?\n\n상세히 설명해주세요."},
                            {"question": "매몰원가란?", "answer": "이미 발생하여 어떤 의사결정에도 영향을 미치지 않는 과거의 원가", "prompt": "공인회계사 시험 원가관리회계 문제입니다.\n\n문제: 매몰원가란?\n\n상세히 설명해주세요."},
                            {"question": "공헌이익이란?", "answer": "매출액에서 변동비를 차감한 금액. 고정비 회수와 이익 창출에 공헌", "prompt": "공인회계사 시험 원가관리회계 문제입니다.\n\n문제: 공헌이익이란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "tax-accountant",
        "name": "세무사",
        "description": "세금 신고 및 조세 상담 전문가",
        "icon": "📋",
        "hasPage": True,
        "subjects": [
            {
                "id": "tax-law",
                "name": "세법학",
                "topics": [
                    {
                        "id": "national-tax-basic",
                        "name": "국세기본법",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "국세부과의 제척기간은?", "answer": "일반: 5년, 무신고/포탈: 7년, 사기/부정행위: 10년", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 국세부과의 제척기간은?\n\n상세히 설명해주세요."},
                            {"question": "국세징수권 소멸시효는?", "answer": "5년. 다만, 체납처분 중에는 진행 정지", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 국세징수권 소멸시효는?\n\n상세히 설명해주세요."},
                            {"question": "수정신고와 경정청구의 차이는?", "answer": "수정신고: 과소신고시 세금 추가 납부, 경정청구: 과다납부시 환급 요청", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 수정신고와 경정청구의 차이는?\n\n상세히 설명해주세요."},
                            {"question": "가산세의 종류는?", "answer": "무신고가산세, 과소신고가산세, 납부지연가산세, 원천징수납부지연가산세 등", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 가산세의 종류는?\n\n상세히 설명해주세요."},
                            {"question": "조세심판청구란?", "answer": "위법/부당한 처분에 대해 조세심판원에 불복을 신청하는 행정구제 절차", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 조세심판청구란?\n\n상세히 설명해주세요."}
                        ]
                    },
                    {
                        "id": "income-tax",
                        "name": "소득세법",
                        "color": "from-teal-500 to-cyan-500",
                        "questions": [
                            {"question": "소득세의 과세기간은?", "answer": "1월 1일부터 12월 31일까지 1년", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 소득세의 과세기간은?\n\n상세히 설명해주세요."},
                            {"question": "종합소득세 과세대상 소득은?", "answer": "이자, 배당, 사업, 근로, 연금, 기타소득 (6가지)", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 종합소득세 과세대상 소득은?\n\n상세히 설명해주세요."},
                            {"question": "분리과세소득이란?", "answer": "종합소득에 합산하지 않고 원천징수로 납세의무 종결", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 분리과세소득이란?\n\n상세히 설명해주세요."},
                            {"question": "기본공제 대상자 요건은?", "answer": "배우자: 연간소득금액 100만원 이하, 부양가족: 연간소득금액 100만원 이하 + 연령요건", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 기본공제 대상자 요건은?\n\n상세히 설명해주세요."},
                            {"question": "세율 구조는?", "answer": "6%~45% 누진세율 (8단계)", "prompt": "세무사 시험 세법학 문제입니다.\n\n문제: 세율 구조는?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "customs-broker",
        "name": "관세사",
        "description": "수출입 통관 및 관세 업무 전문가",
        "icon": "📦",
        "hasPage": True,
        "subjects": [
            {
                "id": "customs-law",
                "name": "관세법",
                "topics": [
                    {
                        "id": "customs-basics",
                        "name": "관세법 기초",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "관세의 정의는?", "answer": "외국으로부터 수입되는 물품에 대해 부과하는 조세", "prompt": "관세사 시험 관세법 문제입니다.\n\n문제: 관세의 정의는?\n\n상세히 설명해주세요."},
                            {"question": "관세의 과세물건은?", "answer": "수입물품. 수입이란 외국물품을 국내에 반입하거나 소비/사용하는 것", "prompt": "관세사 시험 관세법 문제입니다.\n\n문제: 관세의 과세물건은?\n\n상세히 설명해주세요."},
                            {"question": "납세의무자는?", "answer": "수입신고를 한 화주. 보세구역에서 물품이 도난/분실된 경우 운영인", "prompt": "관세사 시험 관세법 문제입니다.\n\n문제: 납세의무자는?\n\n상세히 설명해주세요."},
                            {"question": "보세구역이란?", "answer": "외국물품을 장치/검사/처리하기 위해 세관장이 지정한 구역", "prompt": "관세사 시험 관세법 문제입니다.\n\n문제: 보세구역이란?\n\n상세히 설명해주세요."},
                            {"question": "수입신고시기는?", "answer": "물품이 보세구역에 반입된 후", "prompt": "관세사 시험 관세법 문제입니다.\n\n문제: 수입신고시기는?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "computerized-accounting-1",
        "name": "전산회계 1급",
        "description": "전산회계 실무 능력 국가공인자격",
        "icon": "💻",
        "hasPage": True,
        "subjects": [
            {
                "id": "accounting-principle",
                "name": "회계원리",
                "topics": [
                    {
                        "id": "basic-concepts",
                        "name": "회계기초개념",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "복식부기란?", "answer": "모든 거래를 차변과 대변에 동일 금액으로 기록하는 방식", "prompt": "전산회계 1급 시험 문제입니다.\n\n문제: 복식부기란?\n\n상세히 설명해주세요."},
                            {"question": "분개란?", "answer": "거래를 계정과목과 금액으로 차변과 대변에 구분 기록하는 것", "prompt": "전산회계 1급 시험 문제입니다.\n\n문제: 분개란?\n\n상세히 설명해주세요."},
                            {"question": "시산표란?", "answer": "분개와 전기의 정확성을 검증하기 위해 모든 계정의 차변/대변 합계를 작성한 표", "prompt": "전산회계 1급 시험 문제입니다.\n\n문제: 시산표란?\n\n상세히 설명해주세요."},
                            {"question": "결산이란?", "answer": "일정 기간의 경영성과와 재무상태를 확정하기 위한 절차", "prompt": "전산회계 1급 시험 문제입니다.\n\n문제: 결산이란?\n\n상세히 설명해주세요."},
                            {"question": "재무상태표 등식은?", "answer": "자산 = 부채 + 자본", "prompt": "전산회계 1급 시험 문제입니다.\n\n문제: 재무상태표 등식은?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "computerized-accounting-2",
        "name": "전산회계 2급",
        "description": "회계 기초 실무 능력 국가공인자격",
        "icon": "📝",
        "hasPage": True,
        "subjects": [
            {
                "id": "accounting-basics",
                "name": "회계원리 기초",
                "topics": [
                    {
                        "id": "intro-accounting",
                        "name": "회계의 이해",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "회계란?", "answer": "경제적 거래를 기록/분류/요약하여 이해관계자에게 정보 제공하는 과정", "prompt": "전산회계 2급 시험 문제입니다.\n\n문제: 회계란?\n\n상세히 설명해주세요."},
                            {"question": "회계의 분류는?", "answer": "재무회계(외부 보고), 관리회계(내부 의사결정), 세무회계(납세 목적)", "prompt": "전산회계 2급 시험 문제입니다.\n\n문제: 회계의 분류는?\n\n상세히 설명해주세요."},
                            {"question": "자산이란?", "answer": "과거 거래의 결과로 기업이 통제하고 미래 경제적 효익을 창출하는 자원", "prompt": "전산회계 2급 시험 문제입니다.\n\n문제: 자산이란?\n\n상세히 설명해주세요."},
                            {"question": "부채란?", "answer": "과거 거래로 발생한 현재 의무로, 이행시 경제적 효익이 유출되는 것", "prompt": "전산회계 2급 시험 문제입니다.\n\n문제: 부채란?\n\n상세히 설명해주세요."},
                            {"question": "자본이란?", "answer": "자산에서 부채를 차감한 잔여 지분. 순자산", "prompt": "전산회계 2급 시험 문제입니다.\n\n문제: 자본이란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "computerized-tax-1",
        "name": "전산세무 1급",
        "description": "전산세무 고급 실무 능력 국가공인자격",
        "icon": "🧮",
        "hasPage": True,
        "subjects": [
            {
                "id": "corporate-tax-practice",
                "name": "법인세 실무",
                "topics": [
                    {
                        "id": "tax-adjustment",
                        "name": "세무조정",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "익금산입이란?", "answer": "회계상 수익이 아니지만 세법상 익금으로 가산하는 조정", "prompt": "전산세무 1급 시험 문제입니다.\n\n문제: 익금산입이란?\n\n상세히 설명해주세요."},
                            {"question": "손금불산입이란?", "answer": "회계상 비용이지만 세법상 손금으로 인정하지 않아 가산하는 조정", "prompt": "전산세무 1급 시험 문제입니다.\n\n문제: 손금불산입이란?\n\n상세히 설명해주세요."},
                            {"question": "접대비 한도초과액 처리는?", "answer": "손금불산입하여 과세소득에 가산", "prompt": "전산세무 1급 시험 문제입니다.\n\n문제: 접대비 한도초과액 처리는?\n\n상세히 설명해주세요."},
                            {"question": "감가상각비 한도초과액 처리는?", "answer": "세법상 상각한도 초과분은 손금불산입", "prompt": "전산세무 1급 시험 문제입니다.\n\n문제: 감가상각비 한도초과액 처리는?\n\n상세히 설명해주세요."},
                            {"question": "대손충당금 한도는?", "answer": "채권잔액의 1%(금융업 2%) 또는 대손실적률 중 큰 금액", "prompt": "전산세무 1급 시험 문제입니다.\n\n문제: 대손충당금 한도는?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "computerized-tax-2",
        "name": "전산세무 2급",
        "description": "전산세무 중급 실무 능력 국가공인자격",
        "icon": "📊",
        "hasPage": True,
        "subjects": [
            {
                "id": "income-tax-practice",
                "name": "소득세 실무",
                "topics": [
                    {
                        "id": "withholding-tax",
                        "name": "원천징수",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "원천징수란?", "answer": "소득 지급자가 지급시 세금을 미리 징수하여 국가에 납부하는 제도", "prompt": "전산세무 2급 시험 문제입니다.\n\n문제: 원천징수란?\n\n상세히 설명해주세요."},
                            {"question": "근로소득 원천징수세율은?", "answer": "간이세액표에 따른 세액 (기본세율 6~45%)", "prompt": "전산세무 2급 시험 문제입니다.\n\n문제: 근로소득 원천징수세율은?\n\n상세히 설명해주세요."},
                            {"question": "이자소득 원천징수세율은?", "answer": "14% (지방소득세 1.4% 별도, 총 15.4%)", "prompt": "전산세무 2급 시험 문제입니다.\n\n문제: 이자소득 원천징수세율은?\n\n상세히 설명해주세요."},
                            {"question": "사업소득 원천징수세율은?", "answer": "3% (프리랜서 등 인적용역 사업소득)", "prompt": "전산세무 2급 시험 문제입니다.\n\n문제: 사업소득 원천징수세율은?\n\n상세히 설명해주세요."},
                            {"question": "원천징수영수증이란?", "answer": "소득 지급자가 원천징수 내역을 기재하여 소득자에게 교부하는 증명서", "prompt": "전산세무 2급 시험 문제입니다.\n\n문제: 원천징수영수증이란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "fat-1",
        "name": "FAT 1급",
        "description": "회계정보처리 국가공인자격 (한국공인회계사회)",
        "icon": "💼",
        "hasPage": True,
        "subjects": [
            {
                "id": "fat1-practice",
                "name": "회계정보처리",
                "topics": [
                    {
                        "id": "erp-basics",
                        "name": "ERP 회계실무",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "ERP란?", "answer": "전사적자원관리. 기업의 모든 업무 프로세스를 통합 관리하는 시스템", "prompt": "FAT 1급 시험 문제입니다.\n\n문제: ERP란?\n\n상세히 설명해주세요."},
                            {"question": "전자세금계산서란?", "answer": "국세청 시스템을 통해 전자적으로 발급/전송하는 세금계산서", "prompt": "FAT 1급 시험 문제입니다.\n\n문제: 전자세금계산서란?\n\n상세히 설명해주세요."},
                            {"question": "매입매출전표 입력시 필수항목은?", "answer": "거래일자, 거래처, 계정과목, 공급가액, 부가세", "prompt": "FAT 1급 시험 문제입니다.\n\n문제: 매입매출전표 입력시 필수항목은?\n\n상세히 설명해주세요."},
                            {"question": "부가세 예정신고 기한은?", "answer": "각 예정신고기간 종료일의 다음달 25일", "prompt": "FAT 1급 시험 문제입니다.\n\n문제: 부가세 예정신고 기한은?\n\n상세히 설명해주세요."},
                            {"question": "부가세 확정신고 기한은?", "answer": "각 확정신고기간 종료일의 다음달 25일 (1기: 7/25, 2기: 1/25)", "prompt": "FAT 1급 시험 문제입니다.\n\n문제: 부가세 확정신고 기한은?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "fat-2",
        "name": "FAT 2급",
        "description": "회계정보처리 기초 국가공인자격",
        "icon": "📖",
        "hasPage": True,
        "subjects": [
            {
                "id": "fat2-basics",
                "name": "재무회계 기초",
                "topics": [
                    {
                        "id": "basic-entries",
                        "name": "기초분개",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "현금계정의 성격은?", "answer": "자산계정. 증가시 차변, 감소시 대변 기록", "prompt": "FAT 2급 시험 문제입니다.\n\n문제: 현금계정의 성격은?\n\n상세히 설명해주세요."},
                            {"question": "매입채무의 성격은?", "answer": "부채계정. 증가시 대변, 감소시 차변 기록", "prompt": "FAT 2급 시험 문제입니다.\n\n문제: 매입채무의 성격은?\n\n상세히 설명해주세요."},
                            {"question": "매출의 성격은?", "answer": "수익계정. 발생시 대변 기록", "prompt": "FAT 2급 시험 문제입니다.\n\n문제: 매출의 성격은?\n\n상세히 설명해주세요."},
                            {"question": "급여의 성격은?", "answer": "비용계정. 발생시 차변 기록", "prompt": "FAT 2급 시험 문제입니다.\n\n문제: 급여의 성격은?\n\n상세히 설명해주세요."},
                            {"question": "자본금의 성격은?", "answer": "자본계정. 증가시 대변, 감소시 차변 기록", "prompt": "FAT 2급 시험 문제입니다.\n\n문제: 자본금의 성격은?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "tat-1",
        "name": "TAT 1급",
        "description": "세무정보처리 국가공인자격 (한국공인회계사회)",
        "icon": "📑",
        "hasPage": True,
        "subjects": [
            {
                "id": "tat1-tax",
                "name": "종합세무실무",
                "topics": [
                    {
                        "id": "tax-filing",
                        "name": "신고실무",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "법인세 신고기한은?", "answer": "사업연도 종료일부터 3개월 이내 (12월 법인: 3월 31일)", "prompt": "TAT 1급 시험 문제입니다.\n\n문제: 법인세 신고기한은?\n\n상세히 설명해주세요."},
                            {"question": "법인세 중간예납이란?", "answer": "직전 사업연도 세액의 1/2을 사업연도 개시 후 6개월 내 납부", "prompt": "TAT 1급 시험 문제입니다.\n\n문제: 법인세 중간예납이란?\n\n상세히 설명해주세요."},
                            {"question": "소득세 확정신고 기한은?", "answer": "다음연도 5월 31일 (성실신고확인대상자: 6월 30일)", "prompt": "TAT 1급 시험 문제입니다.\n\n문제: 소득세 확정신고 기한은?\n\n상세히 설명해주세요."},
                            {"question": "부가세 신고서식명은?", "answer": "부가가치세 과세표준 및 세액신고서", "prompt": "TAT 1급 시험 문제입니다.\n\n문제: 부가세 신고서식명은?\n\n상세히 설명해주세요."},
                            {"question": "세금계산서합계표란?", "answer": "매출/매입 세금계산서 내역을 거래처별로 집계한 표", "prompt": "TAT 1급 시험 문제입니다.\n\n문제: 세금계산서합계표란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "tat-2",
        "name": "TAT 2급",
        "description": "세무정보처리 기초 국가공인자격",
        "icon": "📋",
        "hasPage": True,
        "subjects": [
            {
                "id": "tat2-practice",
                "name": "세무정보처리",
                "topics": [
                    {
                        "id": "vat-correction",
                        "name": "부가세 수정신고",
                        "color": "from-emerald-500 to-teal-500",
                        "questions": [
                            {"question": "수정신고란?", "answer": "당초 신고한 과세표준이나 세액이 과소한 경우 추가 신고", "prompt": "TAT 2급 시험 문제입니다.\n\n문제: 수정신고란?\n\n상세히 설명해주세요."},
                            {"question": "경정청구란?", "answer": "당초 신고한 과세표준이나 세액이 과다한 경우 환급 청구", "prompt": "TAT 2급 시험 문제입니다.\n\n문제: 경정청구란?\n\n상세히 설명해주세요."},
                            {"question": "가산세 감면 요건은?", "answer": "법정신고기한 경과 후 1개월 내 수정신고시 90% 감면", "prompt": "TAT 2급 시험 문제입니다.\n\n문제: 가산세 감면 요건은?\n\n상세히 설명해주세요."},
                            {"question": "수정세금계산서 발급사유는?", "answer": "착오, 환입, 계약해제, 내국신용장 사후개설 등", "prompt": "TAT 2급 시험 문제입니다.\n\n문제: 수정세금계산서 발급사유는?\n\n상세히 설명해주세요."},
                            {"question": "대손세액공제란?", "answer": "외상매출금 등이 회수불능시 관련 부가세액을 공제받는 제도", "prompt": "TAT 2급 시험 문제입니다.\n\n문제: 대손세액공제란?\n\n상세히 설명해주세요."}
                        ]
                    }
                ]
            }
        ]
    }
]


def create_page_tsx(category_id: str) -> str:
    return f"export {{ default }} from './category-page';\n"


def create_category_page(category_id: str, certifications: list) -> str:
    cert_items = ""
    for cert in certifications:
        cert_items += f"""
    {{
      id: '{cert["id"]}',
      name: '{cert["name"]}',
      description: '{cert["description"]}',
      icon: '{cert["icon"]}',
      hasPage: {str(cert.get("hasPage", True)).lower()},
    }},"""

    return f"""'use client';

import Link from 'next/link';

const certifications = [{cert_items}
];

export default function AccountingCategoryPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">회계·세무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br {GRADIENT} rounded-2xl shadow-lg mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">회계·세무 분야</h1>
          <p className="text-gray-600">회계, 세무, 관세 관련 자격증</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{certifications.map((cert) => (
            <Link
              key={{cert.id}}
              href={{cert.hasPage ? `/category/accounting/${{cert.id}}` : '#'}}
              className={{`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 ${{cert.hasPage ? 'hover:-translate-y-1' : 'opacity-50 cursor-not-allowed'}}`}}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{{cert.icon}}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{{cert.name}}</h3>
                  <p className="text-sm text-gray-500 mb-2">{{cert.description}}</p>
                  {{cert.hasPage ? (
                    <span className="inline-flex items-center text-sm text-{CATEGORY_COLOR}-600 font-medium">
                      학습하기 →
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-sm text-gray-400">
                      준비중
                    </span>
                  )}}
                </div>
              </div>
            </Link>
          ))}}
        </div>
      </main>
    </div>
  );
}}
"""


def create_cert_page_tsx() -> str:
    return "export { default } from './main-page';\n"


def create_cert_main_page(cert_id: str, cert_name: str, subjects: list) -> str:
    subject_items = ""
    for subject in subjects:
        subject_items += f"""
            {{
              id: '{subject["id"]}',
              name: '{subject["name"]}',
              topics: {len(subject.get("topics", []))},
            }},"""

    return f"""'use client';

import Link from 'next/link';

const subjects = [{subject_items}
];

export default function {cert_id.replace('-', '').title()}MainPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">{cert_name}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{cert_name}</h1>
          <p className="text-gray-600">과목을 선택하여 학습을 시작하세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {{subjects.map((subject) => (
            <Link
              key={{subject.id}}
              href={{`/category/accounting/{cert_id}/study/${{subject.id}}`}}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1"
            >
              <h3 className="font-bold text-gray-800 mb-2">{{subject.name}}</h3>
              <p className="text-sm text-gray-500">{{subject.topics}}개 토픽</p>
              <span className="inline-flex items-center text-sm text-{CATEGORY_COLOR}-600 font-medium mt-2">
                학습하기 →
              </span>
            </Link>
          ))}}
        </div>

        <div className="text-center">
          <Link
            href={{`/category/accounting/{cert_id}/exam`}}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r {GRADIENT} text-white rounded-lg hover:opacity-90 transition"
          >
            📋 시험정보 보기
          </Link>
        </div>
      </main>
    </div>
  );
}}
"""


def create_exam_page_tsx() -> str:
    return "export { default } from '../exam-page';\n"


def create_exam_page(cert_id: str, cert_name: str) -> str:
    return f"""'use client';

import Link from 'next/link';

export default function {cert_id.replace('-', '').title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting/{cert_id}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{cert_name}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{cert_name} 시험정보</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">시험 개요</h2>
          <div className="space-y-3 text-gray-600">
            <p>• 시험 정보는 해당 주관기관 홈페이지에서 확인하세요</p>
            <p>• 시험일정 및 접수는 주관기관에서 안내합니다</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/category/accounting/{cert_id}"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            ← 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}}
"""


def create_study_page(cert_id: str, cert_name: str, subject_id: str, subject_name: str, topics: list) -> str:
    topics_str = "const topics = [\n"
    for topic in topics:
        topics_str += f"""  {{
    id: '{topic["id"]}',
    name: '{topic["name"]}',
    color: '{topic["color"]}',
    questions: [\n"""
        for i, q in enumerate(topic["questions"], 1):
            prompt_escaped = q["prompt"].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
            topics_str += f"""      {{
        id: {i},
        question: '{q["question"].replace("'", "\\'")}',
        answer: '{q["answer"].replace("'", "\\'")}',
        prompt: `{prompt_escaped}`
      }},\n"""
        topics_str += "    ],\n  },\n"
    topics_str += "];\n"

    return f"""'use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

{topics_str}

export default function {subject_id.replace('-', '').title()}StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{cert_id}-{subject_id}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = `${{topicId}}-${{questionId}}`;
    const updated = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(updated);
    localStorage.setItem('{cert_id}-{subject_id}-progress', JSON.stringify(updated));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics(prev => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const getTopicProgress = (topicId: string, questionCount: number) => {{
    let completed = 0;
    for (let i = 1; i <= questionCount; i++) {{
      if (completedQuestions[`${{topicId}}-${{i}}`]) completed++;
    }}
    return completed;
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">회계·세무</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/accounting/{cert_id}" className="text-gray-600 hover:text-{CATEGORY_COLOR}-600">{cert_name}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR}-600 font-medium">{subject_name}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{subject_name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r {GRADIENT} h-2 rounded-full transition-all"
                style={{{{ width: `${{(totalCompleted / totalQuestions) * 100}}%` }}}}
              />
            </div>
            <span className="text-sm text-gray-600">{{totalCompleted}}/{{totalQuestions}}</span>
          </div>
        </div>

        <div className="space-y-6">
          {{topics.map((topic) => (
            <div key={{topic.id}} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={{() => toggleTopic(topic.id)}}
                className={{`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${{topic.color}} text-white`}}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{{topic.name}}</span>
                  <span className="text-sm opacity-80">
                    ({{getTopicProgress(topic.id, topic.questions.length)}}/{{topic.questions.length}})
                  </span>
                </div>
                <span className="text-xl">{{expandedTopics[topic.id] ? '−' : '+'}}</span>
              </button>

              {{expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {{topic.questions.map((q) => (
                    <div key={{q.id}} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={{() => toggleComplete(topic.id, q.id)}}
                          className={{`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${{
                            completedQuestions[`${{topic.id}}-${{q.id}}`]
                              ? 'bg-{CATEGORY_COLOR}-500 border-{CATEGORY_COLOR}-500 text-white'
                              : 'border-gray-300'
                          }}`}}
                        >
                          {{completedQuestions[`${{topic.id}}-${{q.id}}`] && '✓'}}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{{q.id}}. {{q.question}}</p>
                          <p className="text-{CATEGORY_COLOR}-600 font-medium mb-3">💡 {{q.answer}}</p>
                          <div className="flex gap-2 flex-wrap">
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
                  ))}}
                </div>
              )}}
            </div>
          ))}}
        </div>
      </main>
    </div>
  );
}}
"""


def main():
    # 카테고리 메인 폴더
    os.makedirs(BASE_DIR, exist_ok=True)

    # page.tsx
    with open(os.path.join(BASE_DIR, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(create_page_tsx("accounting"))

    # category-page.tsx
    with open(os.path.join(BASE_DIR, "category-page.tsx"), "w", encoding="utf-8") as f:
        f.write(create_category_page("accounting", CERTIFICATIONS))

    # 각 자격증별 폴더 생성
    for cert in CERTIFICATIONS:
        cert_dir = os.path.join(BASE_DIR, cert["id"])
        os.makedirs(cert_dir, exist_ok=True)

        # page.tsx
        with open(os.path.join(cert_dir, "page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_cert_page_tsx())

        # main-page.tsx
        with open(os.path.join(cert_dir, "main-page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_cert_main_page(cert["id"], cert["name"], cert["subjects"]))

        # exam 폴더
        exam_dir = os.path.join(cert_dir, "exam")
        os.makedirs(exam_dir, exist_ok=True)

        with open(os.path.join(exam_dir, "page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_exam_page_tsx())

        # exam-page.tsx
        with open(os.path.join(cert_dir, "exam-page.tsx"), "w", encoding="utf-8") as f:
            f.write(create_exam_page(cert["id"], cert["name"]))

        # study 폴더와 각 과목별 페이지
        for subject in cert["subjects"]:
            study_subject_dir = os.path.join(cert_dir, "study", subject["id"])
            os.makedirs(study_subject_dir, exist_ok=True)

            with open(os.path.join(study_subject_dir, "page.tsx"), "w", encoding="utf-8") as f:
                f.write(create_study_page(
                    cert["id"],
                    cert["name"],
                    subject["id"],
                    subject["name"],
                    subject["topics"]
                ))

    print("회계·세무 분야 파일 생성 완료!")
    print(f"생성 위치: {BASE_DIR}")


if __name__ == "__main__":
    main()
