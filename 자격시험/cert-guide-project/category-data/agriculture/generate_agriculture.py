#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
농림·축산 분야 자격시험 가이드 생성 스크립트
"""

import os

CATEGORY = {
    "id": "agriculture",
    "name": "농림·축산",
    "color1": "lime",
    "color2": "green",
    "gradient": "from-lime-500 to-green-600"
}

CERTIFICATIONS = [
    {
        "id": "plant-protection-engineer",
        "name": "식물보호기사",
        "desc": "병해충 방제 전문가",
        "icon": "🌿",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "plant-pest",
                "name": "필기과목",
                "topics": [
                    {"id": "plant-pathology", "name": "식물병리학", "color": "from-lime-500 to-green-600", "questions": [
                        {"id": 1, "question": "식물병의 정의와 발생 조건은?", "answer": "식물의 정상적 생리기능 장애. 발생조건: 병원체(기주), 환경조건(온습도/광), 감수성 식물 3요소 충족 필요"},
                        {"id": 2, "question": "식물병원균의 종류는?", "answer": "진균(곰팡이), 세균, 바이러스, 파이토플라스마, 선충. 진균이 70% 이상 차지"},
                        {"id": 3, "question": "곰팡이병 방제법은?", "answer": "예방적 살균제 처리, 저항성 품종 재배, 윤작, 이병체 제거, 환기 개선"},
                        {"id": 4, "question": "세균병 특징은?", "answer": "수침상 증상, 악취 발생, 물관부 이동. 무름병, 궤양병, 점무늬병 등"},
                        {"id": 5, "question": "바이러스병 방제 전략은?", "answer": "매개충 방제(진딧물/총채벌레), 무병묘 사용, 이병주 제거, 저항성 품종"}
                    ]},
                    {"id": "entomology", "name": "농업곤충학", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "곤충의 기본 구조는?", "answer": "머리(촉각/눈/구기), 가슴(다리3쌍/날개2쌍), 배(생식기/호흡기). 외골격 구조"},
                        {"id": 2, "question": "불완전변태와 완전변태 차이는?", "answer": "불완전: 알→약충→성충 (메뚜기/매미). 완전: 알→유충→번데기→성충 (나비/딱정벌레)"},
                        {"id": 3, "question": "주요 해충 분류는?", "answer": "저작구(나방유충), 흡수구(진딧물/멸구), 천공해충(나무좀), 지하해충(굼벵이)"},
                        {"id": 4, "question": "천적을 이용한 생물적 방제란?", "answer": "포식성/기생성 천적 활용. 무당벌레(진딧물), 기생벌(나방), 포식응애(응애)"},
                        {"id": 5, "question": "종합적병해충관리(IPM)란?", "answer": "여러 방제법(경종적/생물적/화학적) 조합으로 경제적 피해수준 이하 유지하는 전략"}
                    ]},
                    {"id": "pesticide", "name": "농약학", "color": "from-yellow-500 to-amber-600", "questions": [
                        {"id": 1, "question": "농약 분류법은?", "answer": "용도별(살충제/살균제/제초제), 작용기작별, 화학구조별, 제형별(유제/수화제/입제)"},
                        {"id": 2, "question": "농약의 안전사용기준이란?", "answer": "살포횟수, 희석배수, 수확 전 최종살포일(PHI) 준수. 잔류허용기준(MRL) 초과 방지"},
                        {"id": 3, "question": "살충제 작용기작 종류는?", "answer": "신경계(유기인계/카바메이트/피레스로이드), 호흡저해, 키틴합성저해(IGR), 기피제"},
                        {"id": 4, "question": "저항성 관리 방법은?", "answer": "작용기작 다른 약제 교호살포, 혼합제 사용, 적정 농도/시기 준수, IPM 적용"},
                        {"id": 5, "question": "친환경 농약 종류는?", "answer": "미생물제제(BT), 님오일, 고삼추출물, 제충국, 식물추출물, 페로몬"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "plant-protection-technician",
        "name": "식물보호산업기사",
        "desc": "병해충 방제 기술인력",
        "icon": "🌱",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "plant-tech",
                "name": "필기과목",
                "topics": [
                    {"id": "pest-control-basic", "name": "병해충 방제 기초", "color": "from-lime-500 to-green-600", "questions": [
                        {"id": 1, "question": "작물별 주요 병해충은?", "answer": "벼: 도열병/멸구. 배추: 무사마귀병/배추좀나방. 사과: 탄저병/심식나방"},
                        {"id": 2, "question": "병해충 예찰 방법은?", "answer": "포장조사, 유인트랩(페로몬), 예찰등, 황색끈끈이트랩, 기상데이터 활용"},
                        {"id": 3, "question": "방제 적기 판단법은?", "answer": "해충밀도 조사, 경제적피해허용수준(EIL) 비교, 기상조건, 작물 생육단계 고려"},
                        {"id": 4, "question": "농약 살포 기술은?", "answer": "균일살포, 적정량/농도, 바람/기온 고려, 안전장비 착용, 살포기 점검"},
                        {"id": 5, "question": "저장해충 관리법은?", "answer": "온습도 관리(15℃/65%RH), 훈증소독, 저온저장, 밀폐포장, 정기 점검"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "organic-farming-engineer",
        "name": "유기농업기사",
        "desc": "친환경농업 전문가",
        "icon": "🥬",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "organic-main",
                "name": "필기과목",
                "topics": [
                    {"id": "organic-theory", "name": "유기농업 일반", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "유기농업의 정의와 원칙은?", "answer": "합성농약/화학비료 미사용, 순환농법, 생태계 보전, 건강한 토양 유지, 지속가능성"},
                        {"id": 2, "question": "유기인증 종류는?", "answer": "유기농산물(3년 전환), 무농약농산물, 유기가공식품, 무항생제축산물"},
                        {"id": 3, "question": "유기농업 허용자재는?", "answer": "유기물비료, 녹비작물, 미생물제제, 천연광물, 허용된 식물추출물"},
                        {"id": 4, "question": "국제유기인증 기준은?", "answer": "IFOAM 기본원칙, EU/USDA/JAS 규격, Codex 가이드라인, 상호동등성 협정"},
                        {"id": 5, "question": "유기농업 장단점은?", "answer": "장점: 환경보전, 고부가가치, 건강. 단점: 수확량감소, 노동력증가, 가격높음"}
                    ]},
                    {"id": "soil-fertility", "name": "토양비옥도 관리", "color": "from-amber-500 to-orange-600", "questions": [
                        {"id": 1, "question": "토양 유기물의 역할은?", "answer": "양분공급, 보수력/배수력 개선, 미생물 서식처, 완충능력, 입단구조 형성"},
                        {"id": 2, "question": "퇴비 제조 방법은?", "answer": "C/N비 25~30:1, 수분 60~70%, 호기성 발효, 뒤집기, 온도관리(60~70℃)"},
                        {"id": 3, "question": "녹비작물 종류와 효과는?", "answer": "두과(헤어리베치/자운영): 질소고정. 화본과(호밀/보리): 유기물 공급. 유채: 녹비+채종"},
                        {"id": 4, "question": "윤작의 효과는?", "answer": "병해충 경감, 토양양분 균형, 잡초억제, 토양구조 개선, 수량안정"},
                        {"id": 5, "question": "미생물 활용법은?", "answer": "근권미생물(PGPR), 균근균, 질소고정균(근류균), 길항미생물, 분해미생물"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "organic-farming-technician",
        "name": "유기농업산업기사",
        "desc": "친환경농업 기술인력",
        "icon": "🥗",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "organic-tech",
                "name": "필기과목",
                "topics": [
                    {"id": "organic-practice", "name": "유기재배 실무", "color": "from-green-500 to-teal-600", "questions": [
                        {"id": 1, "question": "유기농 병해충 방제법은?", "answer": "천적활용, 물리적방제(트랩), 경종적방제(윤작/혼작), 허용 식물추출물"},
                        {"id": 2, "question": "유기농 잡초 관리법은?", "answer": "멀칭(볏짚/비닐), 기계제초, 피복작물, 화염제초, 적기 경운"},
                        {"id": 3, "question": "유기축산 사료 기준은?", "answer": "유기사료 100%, 항생제/성장촉진제 금지, 방목/운동장 확보, GMO사료 금지"},
                        {"id": 4, "question": "전환기간 관리법은?", "answer": "3년 이상 유기관리, 토양개량, 기록유지, 병행생산 금지, 완충지대 설정"},
                        {"id": 5, "question": "인증심사 준비사항은?", "answer": "영농일지, 투입재 구매영수증, 포장도, 생산·판매기록, 자재보관장소"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "livestock-engineer",
        "name": "축산기사",
        "desc": "가축 사육 및 관리 전문가",
        "icon": "🐄",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "livestock-main",
                "name": "필기과목",
                "topics": [
                    {"id": "animal-breeding", "name": "가축번식학", "color": "from-orange-500 to-red-600", "questions": [
                        {"id": 1, "question": "가축의 번식생리란?", "answer": "성성숙(사춘기), 발정주기, 배란, 수정, 착상, 임신, 분만 과정"},
                        {"id": 2, "question": "인공수정 기술은?", "answer": "정액채취→희석→동결보존→융해→주입. 발정확인/적기수정이 핵심"},
                        {"id": 3, "question": "수정란이식(ET) 기술은?", "answer": "공란우 과배란처리→수정→수정란채취→수란우 이식. 우수유전자 확대"},
                        {"id": 4, "question": "번식장애 원인은?", "answer": "영양불량, 호르몬이상, 자궁질환, 난소낭종, 스트레스, 감염성질병"},
                        {"id": 5, "question": "분만 관리법은?", "answer": "분만징후 관찰, 분만실 소독, 난산 대처, 초유급여(6시간 내), 제대소독"}
                    ]},
                    {"id": "animal-nutrition", "name": "가축영양학", "color": "from-yellow-500 to-amber-600", "questions": [
                        {"id": 1, "question": "6대 영양소는?", "answer": "탄수화물, 단백질, 지방, 비타민, 무기질, 물. 에너지/구성성분/조절기능"},
                        {"id": 2, "question": "반추동물 소화 특징은?", "answer": "4위(혹위/벌집위/겹주름위/주름위), 미생물 발효, 섬유소 분해, 반추행동"},
                        {"id": 3, "question": "사료 급여 계산법은?", "answer": "TDN/CP 요구량 산출, 체중비율 급여(체중의 2~3%), 성장단계별 조정"},
                        {"id": 4, "question": "조사료와 농후사료 차이는?", "answer": "조사료: 섬유소↑, 에너지↓(건초/볏짚). 농후사료: 에너지↑, 섬유소↓(곡류/깻묵)"},
                        {"id": 5, "question": "사료첨가제 종류는?", "answer": "항생제(성장촉진), 생균제(프로바이오틱스), 효소제, 유화제, 착향료"}
                    ]},
                    {"id": "animal-husbandry", "name": "가축사양학", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "한우 사양관리 핵심은?", "answer": "송아지기(이유~6개월), 육성기(7~12개월), 비육기(13~30개월). 등급판정 고려"},
                        {"id": 2, "question": "젖소 착유관리법은?", "answer": "1일 2~3회 착유, 유두소독, 착유순서, 유량·유질 기록, 건유기 관리"},
                        {"id": 3, "question": "돼지 사양 단계는?", "answer": "포유자돈→이유자돈(7kg)→육성돈(30kg)→비육돈(110kg 출하)"},
                        {"id": 4, "question": "닭 사양관리 핵심은?", "answer": "육계: 35~40일 출하. 산란계: 점등관리/환기/온습도, 산란율 관리"},
                        {"id": 5, "question": "축사환경 관리요소는?", "answer": "온도/습도/환기(암모니아), 조명, 사육밀도, 급수/급이시설, 분뇨처리"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "livestock-technician",
        "name": "축산산업기사",
        "desc": "가축 사육 및 관리 기술인력",
        "icon": "🐖",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "livestock-tech",
                "name": "필기과목",
                "topics": [
                    {"id": "livestock-practice", "name": "축산실무", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "가축 질병예방법은?", "answer": "백신접종(법정/임의), 격리검역, 소독, 차단방역, 정기건강검진"},
                        {"id": 2, "question": "가축분뇨 처리법은?", "answer": "퇴비화(호기성발효), 액비화(혐기성발효), 정화처리, 에너지화(바이오가스)"},
                        {"id": 3, "question": "축산물 등급판정 기준은?", "answer": "쇠고기: 육질(1++~3)+육량(A~C). 돼지: 등지방/도체중. 등급별 가격차"},
                        {"id": 4, "question": "축산 HACCP이란?", "answer": "위해요소중점관리기준. 사료→사육→도축→가공 전과정 위생관리 시스템"},
                        {"id": 5, "question": "동물복지 축산농장 기준은?", "answer": "사육밀도 완화, 자연행동 보장, 고통최소화, 인도적 도축, 인증마크"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "agri-machine-engineer",
        "name": "농업기계기사",
        "desc": "농기계 정비 및 관리 전문가",
        "icon": "🚜",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "agri-machine-main",
                "name": "필기과목",
                "topics": [
                    {"id": "machine-theory", "name": "농업기계학", "color": "from-gray-500 to-slate-600", "questions": [
                        {"id": 1, "question": "농업기계 분류는?", "answer": "동력기계(트랙터), 경운기계(로터리), 파종·이식기, 수확기계(콤바인), 건조기"},
                        {"id": 2, "question": "트랙터 구조와 원리는?", "answer": "엔진(디젤), 동력전달장치(PTO), 유압장치, 3점링크, 조향/제동장치"},
                        {"id": 3, "question": "콤바인 작동원리는?", "answer": "예취부→이송부→탈곡부→선별부→저장부. 자탈형/보통형 구분"},
                        {"id": 4, "question": "농업용 엔진 특성은?", "answer": "디젤엔진 주류, 저속고토크, 내구성, 연료효율, 냉각방식(수냉/공냉)"},
                        {"id": 5, "question": "정밀농업 기술은?", "answer": "GPS 자율주행, 드론 방제, 센서기반 가변살포, 빅데이터 농업, 스마트팜"}
                    ]},
                    {"id": "machine-maintenance", "name": "농기계 정비", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "엔진 점검 항목은?", "answer": "오일량/상태, 냉각수, 에어필터, 연료필터, 팬벨트, 배터리"},
                        {"id": 2, "question": "유압장치 고장 원인은?", "answer": "오일부족, 에어혼입, 필터막힘, 호스누유, 펌프마모, 밸브고착"},
                        {"id": 3, "question": "동절기 농기계 관리법은?", "answer": "연료첨가제, 부동액, 배터리충전, 냉각수배수, 그리스주입, 격납보관"},
                        {"id": 4, "question": "안전사고 예방법은?", "answer": "작동전 점검, 경사지작업주의, 로토베이터주의, 전도방지, 안전프레임"},
                        {"id": 5, "question": "농기계 수명연장 방법은?", "answer": "정기점검, 청소, 부품교환, 적정부하작업, 규격연료/오일 사용"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "agri-machine-technician",
        "name": "농업기계산업기사",
        "desc": "농기계 정비 및 관리 기술인력",
        "icon": "🔧",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "agri-machine-tech",
                "name": "필기과목",
                "topics": [
                    {"id": "machine-practice", "name": "농기계 실무", "color": "from-gray-500 to-zinc-600", "questions": [
                        {"id": 1, "question": "트랙터 작업기 종류는?", "answer": "로터리, 쟁기, 배토기, 트레일러, 로더, 스프레이어, 예초기"},
                        {"id": 2, "question": "이앙기 조정법은?", "answer": "묘적재, 묘이송, 식부조정(깊이/주수), 플로트조정, 마커조정"},
                        {"id": 3, "question": "방제기 종류와 특성은?", "answer": "동력분무기, SS기(스피드스프레이어), 무인헬기, 드론, 미스트기"},
                        {"id": 4, "question": "건조기 운전법은?", "answer": "투입량조절, 건조온도설정, 수분측정, 송풍량조절, 화재예방"},
                        {"id": 5, "question": "농기계 임대사업이란?", "answer": "농업기술센터 운영, 농기계은행, 영농철 수요집중 대응, 소농지원"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "seed-engineer",
        "name": "종자기사",
        "desc": "종자 생산 및 관리 전문가",
        "icon": "🌾",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "seed-main",
                "name": "필기과목",
                "topics": [
                    {"id": "seed-science", "name": "종자학", "color": "from-yellow-500 to-lime-600", "questions": [
                        {"id": 1, "question": "종자의 구조는?", "answer": "종피(보호), 배(발아후 식물체), 배유(저장양분). 단자엽/쌍자엽 차이"},
                        {"id": 2, "question": "종자 발아 조건은?", "answer": "수분, 온도, 산소, (광). 발아력=발아율×발아세/발아속도"},
                        {"id": 3, "question": "종자 휴면의 종류는?", "answer": "경실휴면(종피), 배휴면, 미숙배휴면, 복합휴면. 저온처리/상처처리로 타파"},
                        {"id": 4, "question": "종자 검사 항목은?", "answer": "순도, 발아율, 함수량, 종자건전성, 품종진위성, 용적중"},
                        {"id": 5, "question": "종자 저장 조건은?", "answer": "저온(5~10℃), 저습(40~50% RH), 밀폐용기, 건조상태, 정기발아검사"}
                    ]},
                    {"id": "plant-breeding", "name": "작물육종학", "color": "from-green-500 to-teal-600", "questions": [
                        {"id": 1, "question": "육종의 목표는?", "answer": "수량증대, 품질향상, 내병성, 내재해성, 기계화적응, 소비자기호"},
                        {"id": 2, "question": "교배육종법 과정은?", "answer": "모본선정→교배→F1→세대진전→선발→계통육성→생산력검정→등록"},
                        {"id": 3, "question": "돌연변이 육종이란?", "answer": "방사선/화학물질로 변이유발. 단기간 신형질 획득. 키작은 벼/무종피 종자"},
                        {"id": 4, "question": "분자표지 활용법은?", "answer": "DNA마커 이용 선발, 조기선발, 양적형질 분석(QTL), 분자육종"},
                        {"id": 5, "question": "F1종자(일대잡종)란?", "answer": "잡종강세 이용. 균일성/수량↑. 채종복잡/종자비↑. 채소류 주류"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "seed-technician",
        "name": "종자산업기사",
        "desc": "종자 생산 및 관리 기술인력",
        "icon": "🌰",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "seed-tech",
                "name": "필기과목",
                "topics": [
                    {"id": "seed-production", "name": "종자생산", "color": "from-amber-500 to-yellow-600", "questions": [
                        {"id": 1, "question": "종자생산 체계는?", "answer": "기본식물→원원종→원종→보급종(증식단계). 품종순도 유지 중요"},
                        {"id": 2, "question": "채종포 관리법은?", "answer": "격리재배(자연교잡방지), 이형주제거, 병해충방제, 적기수확"},
                        {"id": 3, "question": "종자처리 기술은?", "answer": "정선(선별), 건조, 종자소독, 코팅(펠렛화), 포장, 저장"},
                        {"id": 4, "question": "종자산업법 핵심은?", "answer": "품종보호제도(PVP), 종자업등록, 종자검사, 품종목록등재, 유통관리"},
                        {"id": 5, "question": "종자인증제도란?", "answer": "국가보증종자, 품종순도/발아율 보증, GSP(황금종자프로젝트) 수출용"}
                    ]}
                ]
            }
        ]
    }
]

BASE_DIR = "C:/todo/today/자격시험/agriculture"

def create_category_page():
    certs_jsx = ""
    for cert in CERTIFICATIONS:
        certs_jsx += f"""
    {{
      id: '{cert["id"]}',
      name: '{cert["name"]}',
      desc: '{cert["desc"]}',
      icon: '{cert["icon"]}',
      href: '/category/{CATEGORY["id"]}/{cert["id"]}'
    }},"""

    content = f"""'use client';

import Link from 'next/link';

export default function CategoryPage() {{
  const certifications = [{certs_jsx}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY["color1"]}-600 font-medium">{CATEGORY["name"]}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY["gradient"]} text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">🌾</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY["name"]} 분야</h1>
          <p className="text-{CATEGORY["color1"]}-100">농업, 축산, 종자 분야 자격시험 학습 가이드</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{certifications.map((cert) => (
            <Link
              key={{cert.id}}
              href={{cert.href}}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-{CATEGORY["color1"]}-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{{cert.icon}}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{{cert.name}}</h3>
                  <p className="text-sm text-gray-500">{{cert.desc}}</p>
                </div>
              </div>
              <div className="text-right text-{CATEGORY["color1"]}-500 text-sm font-medium">
                학습하기 →
              </div>
            </Link>
          ))}}
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{BASE_DIR}/category-page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    with open(f"{BASE_DIR}/page.tsx", "w", encoding="utf-8") as f:
        f.write("export { default } from './category-page';\n")
    print(f"Created: {BASE_DIR}/category-page.tsx")

def create_cert_main_page(cert):
    cert_dir = f"{BASE_DIR}/{cert['id']}"
    os.makedirs(cert_dir, exist_ok=True)

    subjects_jsx = ""
    for subj in cert["subjects"]:
        topics_jsx = ""
        for topic in subj["topics"]:
            topics_jsx += f"""
            {{
              id: '{topic["id"]}',
              name: '{topic["name"]}',
              href: '/category/{CATEGORY["id"]}/{cert["id"]}/study/{topic["id"]}'
            }},"""
        subjects_jsx += f"""
    {{
      id: '{subj["id"]}',
      name: '{subj["name"]}',
      topics: [{topics_jsx}
      ]
    }},"""

    content = f"""'use client';

import Link from 'next/link';

export default function MainPage() {{
  const certification = {{
    id: '{cert["id"]}',
    name: '{cert["name"]}',
    desc: '{cert["desc"]}',
    icon: '{cert["icon"]}',
    org: '{cert["org"]}'
  }};

  const subjects = [{subjects_jsx}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY["id"]}" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">{CATEGORY["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY["color1"]}-600 font-medium">{{certification.name}}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r {CATEGORY["gradient"]} text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-5xl mb-4 block">{{certification.icon}}</span>
          <h1 className="text-3xl font-bold mb-2">{{certification.name}}</h1>
          <p className="text-{CATEGORY["color1"]}-100 mb-2">{{certification.desc}}</p>
          <p className="text-{CATEGORY["color1"]}-200 text-sm">시행기관: {{certification.org}}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link
            href={{`/category/{CATEGORY["id"]}/${{certification.id}}/exam`}}
            className="flex-1 bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition border-2 border-{CATEGORY["color1"]}-200"
          >
            <span className="text-2xl">📋</span>
            <p className="font-medium text-gray-800 mt-1">시험정보</p>
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 과목별 학습</h2>
        <div className="space-y-6">
          {{subjects.map((subject) => (
            <div key={{subject.id}} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">{{subject.name}}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {{subject.topics.map((topic) => (
                  <Link
                    key={{topic.id}}
                    href={{topic.href}}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-{CATEGORY["color1"]}-50 transition flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-700">{{topic.name}}</span>
                    <span className="text-{CATEGORY["color1"]}-500">→</span>
                  </Link>
                ))}}
              </div>
            </div>
          ))}}
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{cert_dir}/main-page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    with open(f"{cert_dir}/page.tsx", "w", encoding="utf-8") as f:
        f.write("export { default } from './main-page';\n")

def create_exam_page(cert):
    cert_dir = f"{BASE_DIR}/{cert['id']}"
    os.makedirs(f"{cert_dir}/exam", exist_ok=True)

    content = f"""'use client';

import Link from 'next/link';

export default function ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY["id"]}" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">{CATEGORY["name"]}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY["id"]}/{cert['id']}" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY["color1"]}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 {cert["name"]} 시험정보</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">시험 개요</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600 w-32">시행기관</td>
                <td className="py-2">{cert["org"]}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600">자격명</td>
                <td className="py-2">{cert["name"]}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600">시험일정</td>
                <td className="py-2">연 3회 (Q-Net 참조)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">응시자격 및 검정기준</h2>
          <p className="text-gray-600 text-sm">상세 정보는 Q-Net(한국산업인력공단)에서 확인하세요.</p>
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{cert_dir}/exam-page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    with open(f"{cert_dir}/exam/page.tsx", "w", encoding="utf-8") as f:
        f.write("export { default } from '../exam-page';\n")

def create_study_page(cert, topic):
    study_dir = f"{BASE_DIR}/{cert['id']}/study/{topic['id']}"
    os.makedirs(study_dir, exist_ok=True)

    questions_jsx = ""
    for q in topic["questions"]:
        prompt = f"{cert['name']} {topic['name']} 관련 질문입니다: {q['question']} 이에 대해 자세히 설명해주세요."
        questions_jsx += f"""
      {{
        id: {q["id"]},
        question: '{q["question"]}',
        answer: `{q["answer"]}`,
        prompt: `{prompt}`
      }},"""

    content = f"""'use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topicData = {{
  id: '{topic["id"]}',
  name: '{topic["name"]}',
  color: '{topic["color"]}',
  questions: [{questions_jsx}
  ]
}};

export default function StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{cert["id"]}-{topic["id"]}-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }}, []);

  const toggleComplete = (qId: number) => {{
    const newCompleted = {{ ...completedQuestions, [qId]: !completedQuestions[qId] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem('{cert["id"]}-{topic["id"]}-progress', JSON.stringify(newCompleted));
  }};

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const totalCount = topicData.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-100">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY["id"]}" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">{CATEGORY["name"]}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY["id"]}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY["color1"]}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY["color1"]}-600 font-medium">{{topicData.name}}</span>
          </nav>
        </div>
      </header>

      <section className={{`bg-gradient-to-r ${{topicData.color}} text-white py-8`}}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{{topicData.name}}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
              진행률: {{completedCount}}/{{totalCount}}
            </div>
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{{{ width: `${{(completedCount/totalCount)*100}}%` }}}}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {{topicData.questions.map((q) => (
            <div key={{q.id}} className={{`bg-white rounded-xl shadow p-6 ${{completedQuestions[q.id] ? 'border-l-4 border-green-500' : ''}}`}}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-800">Q{{q.id}}. {{q.question}}</h3>
                <button
                  onClick={{() => toggleComplete(q.id)}}
                  className={{`px-3 py-1 rounded-lg text-sm ${{completedQuestions[q.id] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}}`}}
                >
                  {{completedQuestions[q.id] ? '✓ 완료' : '완료'}}
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 whitespace-pre-line">{{q.answer}}</p>
              </div>
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
          ))}}
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{study_dir}/page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Created: {study_dir}/page.tsx")

def main():
    create_category_page()
    for cert in CERTIFICATIONS:
        print(f"Created: {BASE_DIR}/{cert['id']}")
        create_cert_main_page(cert)
        create_exam_page(cert)
        for subj in cert["subjects"]:
            for topic in subj["topics"]:
                create_study_page(cert, topic)
    print(f"\nTotal: {len(CERTIFICATIONS)} certifications created")

if __name__ == "__main__":
    main()
