import os

# 카테고리 정보
CATEGORY = {
    "id": "trade",
    "name": "무역·물류",
    "color1": "teal",
    "color2": "cyan",
    "gradient": "from-teal-500 to-cyan-500"
}

# 자격증 목록
CERTS = [
    {
        "id": "trade-english-1",
        "name": "무역영어 1급",
        "icon": "📧",
        "desc": "대한상공회의소 무역실무 영어 최상위 자격",
        "subjects": [
            {"id": "business-letter", "name": "무역서신", "topics": [
                {"id": "inquiry-offer", "name": "조회와 청약", "questions": [
                    {"q": "Inquiry Letter의 구성요소를 설명하시오.", "a": "상품문의, 가격조건, 납기, 결제조건 요청"},
                    {"q": "Firm Offer와 Free Offer의 차이를 설명하시오.", "a": "Firm: 구속력 있음, Free: 구속력 없음"},
                    {"q": "Counter Offer의 효력을 설명하시오.", "a": "원래 청약 거절+새로운 청약 제시"},
                    {"q": "Acceptance의 요건을 설명하시오.", "a": "무조건적 승낙, 유효기간 내, 통지"},
                    {"q": "Proforma Invoice의 용도를 설명하시오.", "a": "견적서, 수입허가, 신용장 개설 근거"}
                ]},
                {"id": "contract-claim", "name": "계약과 클레임", "questions": [
                    {"q": "Sales Contract의 필수조항을 설명하시오.", "a": "품명, 수량, 가격, 선적, 결제, 보험조건"},
                    {"q": "Force Majeure 조항을 설명하시오.", "a": "불가항력 사유로 인한 면책조항"},
                    {"q": "Claim Letter 작성요령을 설명하시오.", "a": "사실관계, 증빙서류, 보상요구 명확히"},
                    {"q": "Arbitration 조항을 설명하시오.", "a": "분쟁 시 중재기관 통한 해결 합의"},
                    {"q": "Letter of Guarantee의 종류를 설명하시오.", "a": "이행보증, 입찰보증, 선수금환급보증"}
                ]}
            ]},
            {"id": "trade-terms", "name": "무역용어", "topics": [
                {"id": "incoterms", "name": "인코텀즈", "questions": [
                    {"q": "Incoterms 2020의 11가지 조건을 설명하시오.", "a": "EXW, FCA, CPT, CIP, DAP, DPU, DDP, FAS, FOB, CFR, CIF"},
                    {"q": "FOB와 CIF의 차이를 설명하시오.", "a": "FOB: 본선인도, CIF: 운임보험료포함"},
                    {"q": "EXW 조건의 특징을 설명하시오.", "a": "공장인도, 매도인 최소의무, 매수인 운송/보험"},
                    {"q": "DDP 조건의 특징을 설명하시오.", "a": "관세지급인도, 매도인 최대의무"},
                    {"q": "FCA와 FOB의 차이를 설명하시오.", "a": "FCA: 운송인인도(모든운송), FOB: 해상운송만"}
                ]},
                {"id": "payment-terms", "name": "결제조건", "questions": [
                    {"q": "L/C의 종류를 설명하시오.", "a": "취소불능, 확인, 양도가능, 회전, Back-to-Back"},
                    {"q": "D/P와 D/A의 차이를 설명하시오.", "a": "D/P: 지급인도, D/A: 인수인도"},
                    {"q": "T/T 송금방식을 설명하시오.", "a": "전신환송금, 사전/사후 T/T"},
                    {"q": "Usance L/C를 설명하시오.", "a": "기한부 신용장, 일정기간 후 대금지급"},
                    {"q": "Standby L/C를 설명하시오.", "a": "보증신용장, 채무불이행 시 지급"}
                ]}
            ]}
        ]
    },
    {
        "id": "trade-english-2",
        "name": "무역영어 2급",
        "icon": "✉️",
        "desc": "대한상공회의소 무역실무 영어 중급 자격",
        "subjects": [
            {"id": "trade-correspondence", "name": "무역서신", "topics": [
                {"id": "basic-letter", "name": "기본서신", "questions": [
                    {"q": "무역서신의 기본구조를 설명하시오.", "a": "Letter Head, Date, Inside Address, Salutation, Body, Closing"},
                    {"q": "Circular Letter의 용도를 설명하시오.", "a": "거래처 통보문, 신제품/가격변동 안내"},
                    {"q": "Credit Inquiry의 목적을 설명하시오.", "a": "거래처 신용조회, 거래 가부 판단"},
                    {"q": "Order Letter 작성법을 설명하시오.", "a": "품명, 수량, 가격, 납기, 결제조건 명시"},
                    {"q": "Shipping Advice의 내용을 설명하시오.", "a": "선적완료 통보, B/L 정보, 도착예정일"}
                ]},
                {"id": "practical-letter", "name": "실무서신", "questions": [
                    {"q": "Amendment Request의 작성법을 설명하시오.", "a": "L/C 조건변경 요청, 변경사항 명확히"},
                    {"q": "Complaint Letter 작성법을 설명하시오.", "a": "문제점 기술, 증빙첨부, 해결요청"},
                    {"q": "Apology Letter 작성법을 설명하시오.", "a": "사과, 원인설명, 재발방지, 보상제시"},
                    {"q": "Reminder Letter의 목적을 설명하시오.", "a": "대금독촉, 선적독촉, 회신독촉"},
                    {"q": "Acknowledgment Letter의 용도를 설명하시오.", "a": "수신확인, 처리예정 통보"}
                ]}
            ]},
            {"id": "trade-vocab", "name": "무역용어", "topics": [
                {"id": "shipping-terms", "name": "선적용어", "questions": [
                    {"q": "Bill of Lading의 기능을 설명하시오.", "a": "운송계약증거, 화물수령증, 권리증권"},
                    {"q": "Packing List의 내용을 설명하시오.", "a": "포장명세, 개수, 중량, 용적"},
                    {"q": "Commercial Invoice의 기능을 설명하시오.", "a": "상업송장, 대금청구, 통관서류"},
                    {"q": "Certificate of Origin의 용도를 설명하시오.", "a": "원산지증명, 관세혜택, FTA 적용"},
                    {"q": "Insurance Policy의 종류를 설명하시오.", "a": "개별보험, 포괄예정보험"}
                ]}
            ]}
        ]
    },
    {
        "id": "trade-english-3",
        "name": "무역영어 3급",
        "icon": "📝",
        "desc": "대한상공회의소 무역실무 영어 초급 자격",
        "subjects": [
            {"id": "basic-trade", "name": "무역기초", "topics": [
                {"id": "trade-intro", "name": "무역개론", "questions": [
                    {"q": "무역의 정의를 설명하시오.", "a": "국가간 상품/서비스 교환, 수출/수입"},
                    {"q": "무역의 이점을 설명하시오.", "a": "비교우위, 규모의 경제, 시장확대"},
                    {"q": "수출입 절차를 설명하시오.", "a": "계약→신용장→생산→선적→통관→대금결제"},
                    {"q": "무역업 등록요건을 설명하시오.", "a": "사업자등록, 무역업고유번호 신청"},
                    {"q": "무역관련 기관을 설명하시오.", "a": "KOTRA, 무역협회, 관세청, 무역보험공사"}
                ]},
                {"id": "basic-docs", "name": "기초서류", "questions": [
                    {"q": "수출입신고서를 설명하시오.", "a": "관세청 제출, 품목/가격/수량 신고"},
                    {"q": "Offer Sheet의 구성을 설명하시오.", "a": "품명, 규격, 수량, 가격, 유효기간"},
                    {"q": "Purchase Order의 내용을 설명하시오.", "a": "구매발주서, 주문내역 확정"},
                    {"q": "Quotation의 목적을 설명하시오.", "a": "견적서, 가격/조건 제시"},
                    {"q": "Invoice와 Receipt의 차이를 설명하시오.", "a": "Invoice: 청구서, Receipt: 영수증"}
                ]}
            ]},
            {"id": "basic-english", "name": "기초영어", "topics": [
                {"id": "trade-expression", "name": "무역표현", "questions": [
                    {"q": "Please quote your best price의 의미를 설명하시오.", "a": "최저가격을 제시해 주세요"},
                    {"q": "We are pleased to inform의 용법을 설명하시오.", "a": "기쁜 마음으로 알려드립니다 (긍정적 통보)"},
                    {"q": "at your earliest convenience의 의미를 설명하시오.", "a": "가능한 빠른 시일 내에"},
                    {"q": "subject to의 의미를 설명하시오.", "a": "~을 조건으로, ~에 따라"},
                    {"q": "in compliance with의 의미를 설명하시오.", "a": "~에 따라, ~을 준수하여"}
                ]}
            ]}
        ]
    },
    {
        "id": "international-trader",
        "name": "국제무역사",
        "icon": "🌐",
        "desc": "한국무역협회 무역전문가 자격",
        "subjects": [
            {"id": "trade-practice", "name": "무역실무", "topics": [
                {"id": "trade-contract", "name": "무역계약", "questions": [
                    {"q": "무역계약의 성립요건을 설명하시오.", "a": "청약과 승낙, 당사자능력, 목적물 특정"},
                    {"q": "품질조건의 종류를 설명하시오.", "a": "견본매매, 표준품매매, 상표매매, 명세서매매"},
                    {"q": "수량조건 결정방법을 설명하시오.", "a": "개수, 중량, 용적, 포장단위"},
                    {"q": "가격조건의 구성을 설명하시오.", "a": "통화+금액+단위+인코텀즈"},
                    {"q": "선적조건의 내용을 설명하시오.", "a": "선적시기, 분할선적, 환적 허용여부"}
                ]},
                {"id": "trade-payment", "name": "결제와 금융", "questions": [
                    {"q": "신용장의 당사자를 설명하시오.", "a": "개설의뢰인, 수익자, 개설은행, 통지은행"},
                    {"q": "신용장 통일규칙(UCP 600)을 설명하시오.", "a": "ICC 제정, 신용장 국제표준규칙"},
                    {"q": "Discrepancy의 종류를 설명하시오.", "a": "서류불일치, L/C 조건 불합치"},
                    {"q": "무역금융의 종류를 설명하시오.", "a": "수출성장자금, 수입자금, 포페이팅"},
                    {"q": "환위험 관리를 설명하시오.", "a": "선물환, 통화옵션, 환변동보험"}
                ]}
            ]},
            {"id": "trade-logistics", "name": "물류와 보험", "topics": [
                {"id": "international-transport", "name": "국제운송", "questions": [
                    {"q": "해상운송의 종류를 설명하시오.", "a": "정기선, 부정기선, 전용선"},
                    {"q": "항공운송의 특징을 설명하시오.", "a": "신속, 고가품, 소량화물 적합"},
                    {"q": "복합운송의 개념을 설명하시오.", "a": "2가지 이상 운송수단, 단일계약"},
                    {"q": "컨테이너 운송을 설명하시오.", "a": "FCL/LCL, CY/CFS"},
                    {"q": "운임의 구성을 설명하시오.", "a": "기본운임, 할증료, 부대비용"}
                ]},
                {"id": "cargo-insurance", "name": "적하보험", "questions": [
                    {"q": "적하보험의 담보위험을 설명하시오.", "a": "ICC(A), ICC(B), ICC(C) 조건"},
                    {"q": "보험금액 산정을 설명하시오.", "a": "CIF가격 × 110%"},
                    {"q": "구상권의 개념을 설명하시오.", "a": "보험자가 제3자에 손해배상 청구"},
                    {"q": "공동해손을 설명하시오.", "a": "공동위험 회피위한 희생/비용 분담"},
                    {"q": "면책사항을 설명하시오.", "a": "고의, 자연소모, 포장불량, 지연손해"}
                ]}
            ]},
            {"id": "customs-law", "name": "관세법규", "topics": [
                {"id": "customs-procedure", "name": "통관절차", "questions": [
                    {"q": "수입통관절차를 설명하시오.", "a": "입항→하역→장치→신고→심사→납부→반출"},
                    {"q": "수출통관절차를 설명하시오.", "a": "신고→심사→검사→적재→출항"},
                    {"q": "과세가격 결정을 설명하시오.", "a": "거래가격, 합산요소, 공제요소"},
                    {"q": "관세의 종류를 설명하시오.", "a": "기본관세, 탄력관세, 보복관세"},
                    {"q": "FTA 활용을 설명하시오.", "a": "원산지증명, 협정세율 적용"}
                ]}
            ]}
        ]
    },
    {
        "id": "distribution-manager-1",
        "name": "유통관리사 1급",
        "icon": "🏪",
        "desc": "대한상공회의소 유통전문가 최상위 자격",
        "subjects": [
            {"id": "distribution-strategy", "name": "유통전략", "topics": [
                {"id": "channel-strategy", "name": "채널전략", "questions": [
                    {"q": "유통경로의 유형을 설명하시오.", "a": "직접/간접유통, 전속/선택/개방유통"},
                    {"q": "수직적 마케팅시스템을 설명하시오.", "a": "기업형, 계약형, 관리형 VMS"},
                    {"q": "옴니채널 전략을 설명하시오.", "a": "온오프라인 통합, 일관된 고객경험"},
                    {"q": "채널갈등 관리를 설명하시오.", "a": "수평/수직갈등, 조정메커니즘"},
                    {"q": "채널파워의 원천을 설명하시오.", "a": "보상, 강압, 전문성, 준거, 합법적 파워"}
                ]},
                {"id": "retail-strategy", "name": "소매전략", "questions": [
                    {"q": "소매업태의 종류를 설명하시오.", "a": "백화점, 할인점, 편의점, 전문점, 온라인"},
                    {"q": "소매믹스 전략을 설명하시오.", "a": "상품, 가격, 촉진, 입지, 서비스"},
                    {"q": "머천다이징을 설명하시오.", "a": "적정상품, 적정가격, 적정시기, 적정장소"},
                    {"q": "카테고리 관리를 설명하시오.", "a": "카테고리별 수익극대화, 역할/전략 설정"},
                    {"q": "고객관계관리(CRM)를 설명하시오.", "a": "고객데이터 분석, 맞춤 마케팅, 충성도"}
                ]}
            ]},
            {"id": "logistics-management", "name": "물류관리", "topics": [
                {"id": "supply-chain", "name": "공급사슬관리", "questions": [
                    {"q": "SCM의 목적을 설명하시오.", "a": "총비용 최소화, 고객서비스 극대화"},
                    {"q": "채찍효과를 설명하시오.", "a": "수요정보 왜곡, 상류로 갈수록 변동 확대"},
                    {"q": "VMI를 설명하시오.", "a": "공급자 재고관리, 자동발주"},
                    {"q": "CPFR을 설명하시오.", "a": "협력적 계획/예측/보충"},
                    {"q": "3PL과 4PL을 설명하시오.", "a": "3PL: 물류아웃소싱, 4PL: 공급사슬통합"}
                ]}
            ]}
        ]
    },
    {
        "id": "distribution-manager-2",
        "name": "유통관리사 2급",
        "icon": "🛒",
        "desc": "대한상공회의소 유통관리 중급 자격",
        "subjects": [
            {"id": "distribution-theory", "name": "유통경영", "topics": [
                {"id": "distribution-basic", "name": "유통기초", "questions": [
                    {"q": "유통의 기능을 설명하시오.", "a": "소유권이전, 물적유통, 정보전달, 금융"},
                    {"q": "도매상의 역할을 설명하시오.", "a": "대량구매, 분산판매, 재고유지, 금융제공"},
                    {"q": "소매상의 유형을 설명하시오.", "a": "점포형(백화점,할인점), 무점포형(온라인)"},
                    {"q": "프랜차이즈 시스템을 설명하시오.", "a": "본부-가맹점 계약, 브랜드/노하우 제공"},
                    {"q": "유통마진의 구조를 설명하시오.", "a": "매출-매입원가, 매입마진/판매마진"}
                ]},
                {"id": "store-operation", "name": "점포운영", "questions": [
                    {"q": "상권분석을 설명하시오.", "a": "1차/2차/3차 상권, 고객흡인력"},
                    {"q": "점포레이아웃을 설명하시오.", "a": "격자형, 자유형, 부띠크형, 동선설계"},
                    {"q": "진열의 원칙을 설명하시오.", "a": "보기쉽게, 고르기쉽게, 사기쉽게"},
                    {"q": "POP광고를 설명하시오.", "a": "구매시점 광고, 충동구매 유도"},
                    {"q": "손익분기점 분석을 설명하시오.", "a": "고정비/(1-변동비율)=손익분기매출"}
                ]}
            ]},
            {"id": "distribution-info", "name": "유통정보", "topics": [
                {"id": "pos-system", "name": "POS시스템", "questions": [
                    {"q": "POS시스템의 기능을 설명하시오.", "a": "판매관리, 재고관리, 고객관리, 분석"},
                    {"q": "바코드 체계를 설명하시오.", "a": "EAN-13, UPC, 국가/제조업체/상품코드"},
                    {"q": "RFID를 설명하시오.", "a": "무선인식, 재고추적, SCM 효율화"},
                    {"q": "EDI를 설명하시오.", "a": "전자문서교환, 표준양식, 자동처리"},
                    {"q": "빅데이터 활용을 설명하시오.", "a": "구매패턴 분석, 수요예측, 개인화"}
                ]}
            ]}
        ]
    },
    {
        "id": "distribution-manager-3",
        "name": "유통관리사 3급",
        "icon": "🏬",
        "desc": "대한상공회의소 유통관리 초급 자격",
        "subjects": [
            {"id": "distribution-intro", "name": "유통상식", "topics": [
                {"id": "distribution-overview", "name": "유통개론", "questions": [
                    {"q": "유통의 정의를 설명하시오.", "a": "생산자→소비자 상품/서비스 이동"},
                    {"q": "유통경로의 개념을 설명하시오.", "a": "중간상 개입 여부, 경로길이"},
                    {"q": "소매업의 특성을 설명하시오.", "a": "최종소비자 대상, 소량판매, 서비스"},
                    {"q": "유통환경 변화를 설명하시오.", "a": "온라인화, 옴니채널, 1인가구"},
                    {"q": "대형마트와 편의점 차이를 설명하시오.", "a": "규모, 취급품목, 영업시간, 입지"}
                ]},
                {"id": "customer-service", "name": "고객서비스", "questions": [
                    {"q": "고객서비스의 중요성을 설명하시오.", "a": "재구매, 구전효과, 차별화"},
                    {"q": "불만고객 응대를 설명하시오.", "a": "경청, 공감, 사과, 해결, 감사"},
                    {"q": "MOT(진실의 순간)를 설명하시오.", "a": "고객접점, 서비스품질 결정"},
                    {"q": "서비스 회복을 설명하시오.", "a": "불만→만족, 보상, 충성고객 전환"},
                    {"q": "고객만족도 측정을 설명하시오.", "a": "설문조사, NPS, 미스터리쇼핑"}
                ]}
            ]},
            {"id": "sales-basic", "name": "판매기초", "topics": [
                {"id": "selling-skill", "name": "판매기법", "questions": [
                    {"q": "판매 5단계를 설명하시오.", "a": "접근→니즈파악→상품설명→이의극복→마무리"},
                    {"q": "상향판매(Up-selling)를 설명하시오.", "a": "더 비싼 상품 권유"},
                    {"q": "교차판매(Cross-selling)를 설명하시오.", "a": "관련 상품 추가 권유"},
                    {"q": "판매촉진 수단을 설명하시오.", "a": "쿠폰, 샘플, 경품, 할인, POP"},
                    {"q": "계산대 응대를 설명하시오.", "a": "신속정확, 감사인사, 포장, 영수증"}
                ]}
            ]}
        ]
    },
    {
        "id": "logistics-manager",
        "name": "물류관리사",
        "icon": "📦",
        "desc": "한국산업인력공단 물류전문가 자격",
        "subjects": [
            {"id": "logistics-theory", "name": "물류관리론", "topics": [
                {"id": "logistics-basic", "name": "물류기초", "questions": [
                    {"q": "물류의 정의를 설명하시오.", "a": "물자 흐름의 계획/실행/통제"},
                    {"q": "물류의 5대 기능을 설명하시오.", "a": "운송, 보관, 하역, 포장, 정보"},
                    {"q": "물류비 구성을 설명하시오.", "a": "운송비, 보관비, 하역비, 포장비, 정보비"},
                    {"q": "물류합리화를 설명하시오.", "a": "표준화, 공동화, 정보화, 자동화"},
                    {"q": "물류아웃소싱을 설명하시오.", "a": "전문업체 위탁, 핵심역량 집중"}
                ]},
                {"id": "scm-theory", "name": "SCM이론", "questions": [
                    {"q": "SCM의 구성요소를 설명하시오.", "a": "계획, 조달, 생산, 배송, 반품"},
                    {"q": "Push와 Pull 시스템을 설명하시오.", "a": "Push: 예측생산, Pull: 주문생산"},
                    {"q": "JIT를 설명하시오.", "a": "적시생산, 재고최소화, 낭비제거"},
                    {"q": "린 물류를 설명하시오.", "a": "7대 낭비 제거, 가치흐름 최적화"},
                    {"q": "그린물류를 설명하시오.", "a": "환경친화적 물류, 탄소배출 감소"}
                ]}
            ]},
            {"id": "warehouse-management", "name": "보관하역론", "topics": [
                {"id": "warehouse-ops", "name": "창고관리", "questions": [
                    {"q": "창고의 종류를 설명하시오.", "a": "자가창고, 영업창고, 보세창고"},
                    {"q": "입출고 방식을 설명하시오.", "a": "FIFO, LIFO, FEFO"},
                    {"q": "로케이션 관리를 설명하시오.", "a": "고정/프리로케이션, 존/랙/셀"},
                    {"q": "재고관리 기법을 설명하시오.", "a": "ABC분석, 안전재고, 발주점"},
                    {"q": "WMS의 기능을 설명하시오.", "a": "입출고관리, 재고관리, 피킹, 재고실사"}
                ]},
                {"id": "material-handling", "name": "하역기기", "questions": [
                    {"q": "컨베이어의 종류를 설명하시오.", "a": "벨트, 롤러, 체인, 스크류"},
                    {"q": "지게차의 종류를 설명하시오.", "a": "카운터밸런스, 리치, 피커"},
                    {"q": "자동창고 시스템을 설명하시오.", "a": "AS/RS, 스태커크레인, 셔틀"},
                    {"q": "파렛트의 규격을 설명하시오.", "a": "T-11(1100×1100), 표준화"},
                    {"q": "유닛로드 시스템을 설명하시오.", "a": "단위화물화, 하역효율 향상"}
                ]}
            ]},
            {"id": "transport-theory", "name": "수송론", "topics": [
                {"id": "transport-mode", "name": "운송수단", "questions": [
                    {"q": "운송수단별 특성을 설명하시오.", "a": "도로(문전), 철도(대량), 해상(저렴), 항공(신속)"},
                    {"q": "복합운송의 장점을 설명하시오.", "a": "일관운송, 단일책임, 비용절감"},
                    {"q": "운송경로 최적화를 설명하시오.", "a": "최단경로, 차량배차, 배송계획"},
                    {"q": "공동배송을 설명하시오.", "a": "여러 화주 화물 혼적, 효율화"},
                    {"q": "밀크런 시스템을 설명하시오.", "a": "순회집하, 다수 공급처 순환"}
                ]},
                {"id": "international-logistics", "name": "국제물류", "questions": [
                    {"q": "포워더의 역할을 설명하시오.", "a": "운송주선, 서류처리, 통관대행"},
                    {"q": "FCL과 LCL을 설명하시오.", "a": "FCL: 컨테이너 전용, LCL: 혼적"},
                    {"q": "해상운임 구조를 설명하시오.", "a": "기본운임+BAF+CAF+THC"},
                    {"q": "항공화물 운임을 설명하시오.", "a": "중량/용적 중 큰 것 적용"},
                    {"q": "보세운송을 설명하시오.", "a": "관세 미납상태 국내이동"}
                ]}
            ]},
            {"id": "logistics-law", "name": "물류관련법규", "topics": [
                {"id": "logistics-regulation", "name": "물류법규", "questions": [
                    {"q": "물류정책기본법의 목적을 설명하시오.", "a": "물류체계 효율화, 국가경쟁력 강화"},
                    {"q": "화물자동차운수사업법을 설명하시오.", "a": "운송사업 허가, 운임/요금 규정"},
                    {"q": "물류시설법을 설명하시오.", "a": "물류단지 개발, 시설확충"},
                    {"q": "유통산업발전법을 설명하시오.", "a": "대형마트 영업규제, 전통시장 보호"},
                    {"q": "항만운송사업법을 설명하시오.", "a": "항만하역, 검수, 검량 사업 규정"}
                ]}
            ]}
        ]
    }
]

def create_category_page():
    """카테고리 메인 페이지 생성"""
    certs_jsx = ""
    for cert in CERTS:
        certs_jsx += f'''
            <Link href="/category/{CATEGORY['id']}/{cert['id']}" className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden group">
              <div className="bg-gradient-to-r {CATEGORY['gradient']} p-6 text-center">
                <span className="text-5xl">{cert['icon']}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-{CATEGORY['color1']}-600">{cert['name']}</h3>
                <p className="text-gray-500 text-sm mt-1">{cert['desc']}</p>
                <div className="mt-3 text-{CATEGORY['color1']}-500 text-sm font-medium">학습하기 →</div>
              </div>
            </Link>'''

    return f'''import Link from 'next/link';

export default function TradeCategoryPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
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
          <span className="text-6xl mb-4 block">📦</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">무역, 유통, 물류 분야 자격증 {len(CERTS)}개</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs_jsx}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

def create_cert_main_page(cert):
    """자격증 메인 페이지 생성"""
    subjects_jsx = ""
    for subj in cert['subjects']:
        subjects_jsx += f'''
            <Link href="/category/{CATEGORY['id']}/{cert['id']}/study/{subj['id']}" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 group">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r {CATEGORY['gradient']} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">📖</div>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-{CATEGORY['color1']}-600">{subj['name']}</h3>
                  <p className="text-gray-500 text-sm">{len(subj['topics'])}개 토픽</p>
                </div>
              </div>
            </Link>'''

    return f'''import Link from 'next/link';

export default function {cert['id'].replace('-', '').title()}MainPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">{cert['icon']}</span>
          <h1 className="text-3xl font-bold mb-2">{cert['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">{cert['desc']}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">📚 학습과목</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {subjects_jsx}
        </div>

        <div className="mt-8">
          <Link href="/category/{CATEGORY['id']}/{cert['id']}/exam" className="inline-flex items-center gap-2 bg-{CATEGORY['color1']}-100 text-{CATEGORY['color1']}-700 px-4 py-2 rounded-lg hover:bg-{CATEGORY['color1']}-200 transition">
            📋 시험정보 보기
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

def create_exam_page(cert):
    """시험정보 페이지 생성"""
    return f'''import Link from 'next/link';

export default function {cert['id'].replace('-', '').title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
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

      <section className="bg-gradient-to-r {CATEGORY['gradient']} text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">{cert['name']} 시험정보</h1>
          <p className="text-{CATEGORY['color1']}-100 mt-1">응시자격, 시험과목, 합격기준</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📋 시험 개요</h2>
            <p className="text-gray-600">대한상공회의소, 한국무역협회, 한국산업인력공단에서 시행하는 자격시험입니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">제한 없음 (일부 자격증은 관련 경력/학력 우대)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {"".join([f"<li>{subj['name']}</li>" for subj in cert['subjects']])}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">과목당 40점 이상, 전체 평균 60점 이상</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

def create_study_page(cert, subject):
    """학습 페이지 생성"""
    topics_data = []
    for topic in subject['topics']:
        questions = []
        for i, q in enumerate(topic['questions'], 1):
            prompt = f"{cert['name']} {subject['name']} 문제입니다.\\n\\n문제: {q['q']}\\n\\n다음 순서로 설명해주세요:\\n1. 핵심 개념 정리\\n2. 상세 설명\\n3. 적용 예시\\n4. 실무 적용\\n5. 연습문제 3개"
            questions.append(f'''{{
        id: {i},
        question: '{q["q"].replace("'", "\\'")}',
        answer: '{q["a"].replace("'", "\\'")}',
        prompt: `{prompt}`
      }}''')

        topics_data.append(f'''{{
    id: '{topic["id"]}',
    name: '{topic["name"]}',
    color: '{CATEGORY["gradient"]}',
    questions: [
      {",".join(questions)}
    ]
  }}''')

    func_name = f"{subject['id'].replace('-', '').title()}StudyPage"

    return f''''use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
  {",".join(topics_data)}
];

export default function {func_name}() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{subject["id"]}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = topicId + "-" + questionId;
    const newCompleted = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem('{subject["id"]}-progress', JSON.stringify(newCompleted));
  }};

  const toggleTopic = (topicId: string) => {{
    setExpandedTopics((prev) => ({{ ...prev, [topicId]: !prev[topicId] }}));
  }};

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">{cert['icon']}</span></div>
              <div>
                <h1 className="text-2xl font-bold">{subject['name']} 학습</h1>
                <p className="text-{CATEGORY['color1']}-100">{cert['name']}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{{progress}}%</p>
              <p className="text-{CATEGORY['color1']}-100 text-sm">{{completedCount}}/{{totalQuestions}} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white rounded-full h-3 transition-all duration-500" style={{{{ width: progress + "%" }}}} />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {{topics.map((topic) => {{
            const topicCompleted = topic.questions.filter((q) => completedQuestions[topic.id + "-" + q.id]).length;
            return (
              <div key={{topic.id}} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button onClick={{() => toggleTopic(topic.id)}} className={{"w-full p-4 bg-gradient-to-r " + topic.color + " text-white flex items-center justify-between"}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{{topic.name}}</h2>
                      <p className="text-sm opacity-80">{{topicCompleted}}/{{topic.questions.length}} 완료</p>
                    </div>
                  </div>
                  <span className="text-2xl">{{expandedTopics[topic.id] ? "−" : "+"}}</span>
                </button>
                {{expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {{topic.questions.map((q) => {{
                      const isCompleted = completedQuestions[topic.id + "-" + q.id];
                      return (
                        <div key={{q.id}} className={{"p-4 rounded-lg border-2 transition " + (isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200")}}>
                          <div className="flex items-start gap-3">
                            <button onClick={{() => toggleComplete(topic.id, q.id)}} className={{"mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition " + (isCompleted ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500")}}>
                              {{isCompleted && "✓"}}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Q{{q.id}}. {{q.question}}</p>
                              <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {{q.answer}}</p>
                              <div className="flex gap-2 flex-wrap">
                                <a href={{"https://claude.ai/new?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🧡 Claude</a>
                                <a href={{"https://chat.openai.com/?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">💚 ChatGPT</a>
                                <a href={{"https://gemini.google.com/app?q=" + encodeURIComponent(q.prompt)}} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition">💙 Gemini</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }})}}
                  </div>
                )}}
              </div>
            );
          }})}}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}}
'''

def main():
    base_dir = "C:/todo/today/자격시험/trade"

    # 카테고리 폴더 생성
    os.makedirs(base_dir, exist_ok=True)

    # 카테고리 page.tsx
    with open(f"{base_dir}/page.tsx", 'w', encoding='utf-8') as f:
        f.write("export { default } from './category-page';")

    # 카테고리 메인 페이지
    with open(f"{base_dir}/category-page.tsx", 'w', encoding='utf-8') as f:
        f.write(create_category_page())

    print(f"Created: {base_dir}/category-page.tsx")

    # 각 자격증별 파일 생성
    for cert in CERTS:
        cert_dir = f"{base_dir}/{cert['id']}"
        os.makedirs(cert_dir, exist_ok=True)
        os.makedirs(f"{cert_dir}/exam", exist_ok=True)
        os.makedirs(f"{cert_dir}/study", exist_ok=True)

        # 자격증 page.tsx
        with open(f"{cert_dir}/page.tsx", 'w', encoding='utf-8') as f:
            f.write("export { default } from './main-page';")

        # 자격증 메인 페이지
        with open(f"{cert_dir}/main-page.tsx", 'w', encoding='utf-8') as f:
            f.write(create_cert_main_page(cert))

        # 시험정보 page.tsx
        with open(f"{cert_dir}/exam/page.tsx", 'w', encoding='utf-8') as f:
            f.write("export { default } from '../exam-page';")

        # 시험정보 페이지
        with open(f"{cert_dir}/exam-page.tsx", 'w', encoding='utf-8') as f:
            f.write(create_exam_page(cert))

        print(f"Created: {cert_dir}")

        # 각 과목별 study 페이지 생성
        for subject in cert['subjects']:
            study_dir = f"{cert_dir}/study/{subject['id']}"
            os.makedirs(study_dir, exist_ok=True)

            with open(f"{study_dir}/page.tsx", 'w', encoding='utf-8') as f:
                f.write(create_study_page(cert, subject))

            print(f"  Created: {study_dir}/page.tsx")

    print(f"\nTotal: {len(CERTS)} certifications created")

if __name__ == "__main__":
    main()
