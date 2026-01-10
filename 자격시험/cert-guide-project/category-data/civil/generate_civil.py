#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
공무원 시험 가이드 생성 스크립트
"""

import os

# 카테고리 설정
CATEGORY = {
    "id": "civil",
    "name": "공무원",
    "color1": "slate",
    "color2": "gray",
    "gradient": "from-slate-500 to-gray-700"
}

# 시험 목록
CERTIFICATIONS = [
    {
        "id": "civil-service-5",
        "name": "5급 공채(행정고시)",
        "desc": "사무관급 고위공무원 선발",
        "icon": "🏛️",
        "org": "인사혁신처",
        "subjects": [
            {
                "id": "psat",
                "name": "PSAT(공직적격성평가)",
                "topics": [
                    {"id": "verbal", "name": "언어논리", "color": "from-slate-500 to-gray-600", "questions": [
                        {"id": 1, "question": "논증 구조 파악이란?", "answer": "주장과 근거의 관계를 분석하여 논증의 타당성을 평가하는 것. 전제-결론 구조 파악이 핵심"},
                        {"id": 2, "question": "비판적 읽기의 핵심 전략은?", "answer": "저자의 주장 파악, 근거의 적절성 평가, 숨은 가정 발견, 반론 가능성 검토"},
                        {"id": 3, "question": "논리적 오류의 유형은?", "answer": "허수아비 공격, 순환논증, 성급한 일반화, 인신공격, 거짓 딜레마, 권위에 호소 등"},
                        {"id": 4, "question": "독해 속도 향상 전략은?", "answer": "핵심어 파악, 문단별 주제문 확인, 글의 구조 파악, 반복 훈련"},
                        {"id": 5, "question": "추론 문제 접근법은?", "answer": "명시적 정보와 암시적 정보 구분, 논리적 필연성 확인, 과잉추론 배제"}
                    ]},
                    {"id": "data", "name": "자료해석", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "자료해석 핵심 유형은?", "answer": "표/그래프 분석, 증가율/비율 계산, 순위 비교, 추이 분석, 복합자료 해석"},
                        {"id": 2, "question": "비율 계산 빠른 방법은?", "answer": "분수의 크기 비교(교차곱), 어림산 활용, 기준값 설정 후 비교"},
                        {"id": 3, "question": "증가율 계산 공식은?", "answer": "(현재값-이전값)/이전값×100. 연평균 증가율은 CAGR 공식 활용"},
                        {"id": 4, "question": "복합자료 분석 전략은?", "answer": "자료 간 관계 파악, 공통 변수 확인, 단계별 계산, 검증 철저히"},
                        {"id": 5, "question": "함정 선지 피하는 법은?", "answer": "단위 확인, 기준년도 주의, 전체와 부분 구분, 상관관계와 인과관계 혼동 배제"}
                    ]},
                    {"id": "situation", "name": "상황판단", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "법조문 해석 유형 접근법은?", "answer": "요건-효과 구조 파악, 예외조항 주의, 적용 사례 매칭"},
                        {"id": 2, "question": "의사결정 문제 해결법은?", "answer": "기준 설정, 대안 비교, 제약조건 확인, 최적해 도출"},
                        {"id": 3, "question": "자원배분 문제 유형은?", "answer": "예산 배분, 인력 배치, 시간 관리 등. 제약조건 하 최적화가 핵심"},
                        {"id": 4, "question": "퍼즐형 문제 접근법은?", "answer": "조건 정리, 경우의 수 줄이기, 소거법 활용, 표/도식화"},
                        {"id": 5, "question": "시간 관리 전략은?", "answer": "쉬운 문제 먼저, 시간 소모 큰 문제 표시 후 넘기기, 마지막 검토 시간 확보"}
                    ]}
                ]
            },
            {
                "id": "essay",
                "name": "논술",
                "topics": [
                    {"id": "policy-essay", "name": "정책논술", "color": "from-purple-500 to-violet-600", "questions": [
                        {"id": 1, "question": "정책논술 기본 구조는?", "answer": "서론(문제제기)-본론(현황분석/원인/대안)-결론(정책제언). 논리적 흐름이 핵심"},
                        {"id": 2, "question": "정책대안 제시 방법은?", "answer": "문제 정의→원인 분석→대안 도출→대안 비교평가→최적안 선택→실행방안"},
                        {"id": 3, "question": "정책분석 프레임워크는?", "answer": "효과성, 효율성, 형평성, 실현가능성(정치적/행정적/재정적) 기준으로 평가"},
                        {"id": 4, "question": "시사 이슈 정리 방법은?", "answer": "분야별(경제/사회/행정) 핵심 이슈 정리, 찬반 논거 파악, 정부 정책 동향 확인"},
                        {"id": 5, "question": "논술 시간 배분은?", "answer": "구상 20%, 작성 70%, 검토 10%. 개요 작성 후 본문 작성 권장"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "civil-service-7",
        "name": "7급 공채",
        "desc": "주무관급 공무원 선발",
        "icon": "📋",
        "org": "인사혁신처",
        "subjects": [
            {
                "id": "common-7",
                "name": "공통과목",
                "topics": [
                    {"id": "korean-7", "name": "국어", "color": "from-slate-500 to-gray-600", "questions": [
                        {"id": 1, "question": "국어 문법 핵심 영역은?", "answer": "음운론(음운변동), 형태론(품사/단어형성), 통사론(문장성분/문장유형), 의미론, 화용론"},
                        {"id": 2, "question": "음운 변동의 종류는?", "answer": "교체(비음화/유음화/구개음화), 탈락(자음군단순화), 첨가(사이시옷), 축약(거센소리되기)"},
                        {"id": 3, "question": "비문학 독해 전략은?", "answer": "글의 구조 파악, 중심문장 찾기, 문단 간 관계 이해, 필자 의도 파악"},
                        {"id": 4, "question": "문학 작품 분석법은?", "answer": "시: 화자/정서/이미지. 소설: 인물/갈등/서술시점. 시대적 배경 이해 필수"},
                        {"id": 5, "question": "어문규정 핵심은?", "answer": "한글맞춤법, 표준어규정, 외래어표기법, 로마자표기법. 두음법칙/사이시옷 빈출"}
                    ]},
                    {"id": "english-7", "name": "영어", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "영어 독해 접근법은?", "answer": "주제문 파악, 문맥 통한 어휘 유추, 지시어/연결사 주목, 글의 논리 구조 파악"},
                        {"id": 2, "question": "빈출 문법 사항은?", "answer": "동사(시제/수일치/태), 준동사(부정사/동명사/분사), 관계사, 가정법, 비교급"},
                        {"id": 3, "question": "어휘 학습 전략은?", "answer": "접두사/접미사 활용, 어원 학습, 유의어/반의어 그룹화, 문맥 속 암기"},
                        {"id": 4, "question": "생활영어 대비법은?", "answer": "상황별 표현 정리(전화/쇼핑/예약), 관용표현 암기, 실전 대화문 연습"},
                        {"id": 5, "question": "영작문 핵심은?", "answer": "주어-동사 일치, 시제 일관성, 관사 사용, 전치사 콜로케이션 숙지"}
                    ]},
                    {"id": "history-7", "name": "한국사", "color": "from-amber-500 to-orange-600", "questions": [
                        {"id": 1, "question": "선사시대 핵심은?", "answer": "구석기(뗀석기)-신석기(간석기/빗살무늬토기)-청동기(비파형동검/고인돌)-철기(세형동검)"},
                        {"id": 2, "question": "삼국시대 정치사 핵심은?", "answer": "고구려(태조왕/광개토대왕/장수왕), 백제(근초고왕/성왕), 신라(법흥왕/진흥왕) 전성기"},
                        {"id": 3, "question": "고려 정치제도는?", "answer": "2성6부(중서문하성/상서성), 도병마사/식목도감, 중추원, 삼사(화폐/곡식)"},
                        {"id": 4, "question": "조선 통치체제는?", "answer": "의정부-6조 체제, 언론기관(사헌부/사간원/홍문관), 비변사(전쟁 시 확대)"},
                        {"id": 5, "question": "근현대사 핵심 흐름은?", "answer": "개항→갑오개혁→대한제국→일제강점→광복→분단→6.25→민주화→경제성장"}
                    ]}
                ]
            },
            {
                "id": "admin-7",
                "name": "행정학",
                "topics": [
                    {"id": "admin-theory", "name": "행정학이론", "color": "from-indigo-500 to-purple-600", "questions": [
                        {"id": 1, "question": "행정학 발달 과정은?", "answer": "행정관리론→행태론→비교행정론→신행정론→신공공관리론(NPM)→뉴거버넌스→탈신공공관리"},
                        {"id": 2, "question": "관료제 특징(Weber)은?", "answer": "계층제, 분업/전문화, 문서주의, 비정의성, 법규에 의한 지배, 능력주의"},
                        {"id": 3, "question": "신공공관리론(NPM) 핵심은?", "answer": "시장주의, 성과관리, 민영화, 규제완화, 고객지향, 경쟁원리 도입"},
                        {"id": 4, "question": "정책과정 단계는?", "answer": "의제설정→정책형성→정책결정→정책집행→정책평가→환류"},
                        {"id": 5, "question": "조직이론 유형은?", "answer": "고전이론(과학적관리/행정관리론), 인간관계론, 체제이론, 상황이론, 거래비용이론"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "civil-service-9",
        "name": "9급 공채",
        "desc": "주사급 공무원 선발",
        "icon": "📝",
        "org": "인사혁신처",
        "subjects": [
            {
                "id": "common-9",
                "name": "공통과목",
                "topics": [
                    {"id": "korean-9", "name": "국어", "color": "from-slate-500 to-gray-600", "questions": [
                        {"id": 1, "question": "9급 국어 출제 비중은?", "answer": "문법 30%, 독해 40%, 문학 20%, 어문규정/어휘 10% 정도"},
                        {"id": 2, "question": "품사 분류 기준은?", "answer": "형태(가변어/불변어), 기능(체언/수식언/관계언/독립언), 의미에 따라 9품사 분류"},
                        {"id": 3, "question": "높임법 종류는?", "answer": "주체높임(-시-), 상대높임(해라/해요체 등), 객체높임(-께, 드리다)"},
                        {"id": 4, "question": "고전문학 필수 작품은?", "answer": "정읍사, 가시리, 청산별곡, 관동별곡, 사미인곡, 춘향전, 홍길동전 등"},
                        {"id": 5, "question": "문맥상 어휘 의미 파악법은?", "answer": "앞뒤 문맥 확인, 대비/병렬 구조 파악, 지시어 추적, 필자 의도 파악"}
                    ]},
                    {"id": "english-9", "name": "영어", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "9급 영어 출제 경향은?", "answer": "독해 60%, 문법 20%, 어휘 15%, 생활영어 5% 정도. 독해 비중 증가 추세"},
                        {"id": 2, "question": "5형식 동사 정리는?", "answer": "1형식(S+V), 2형식(S+V+C), 3형식(S+V+O), 4형식(S+V+IO+DO), 5형식(S+V+O+OC)"},
                        {"id": 3, "question": "관계대명사 vs 관계부사 구분은?", "answer": "관계대명사: 뒤에 불완전문장. 관계부사: 뒤에 완전문장. 선행사 유형도 다름"},
                        {"id": 4, "question": "빈출 숙어 예시는?", "answer": "take into account, come up with, put up with, make up for, look forward to 등"},
                        {"id": 5, "question": "주제 찾기 전략은?", "answer": "첫문장/마지막문장 주목, 반복 키워드 파악, 역접/인과 연결사 주의"}
                    ]},
                    {"id": "history-9", "name": "한국사", "color": "from-amber-500 to-orange-600", "questions": [
                        {"id": 1, "question": "9급 한국사 출제 범위는?", "answer": "전 시대 출제. 근현대사 비중 높음(40%). 정치/경제/사회/문화 골고루 출제"},
                        {"id": 2, "question": "통일신라 핵심은?", "answer": "삼국통일(676), 신문왕(9서당10정/국학), 원성왕(독서삼품과), 말기 골품제 모순/후삼국"},
                        {"id": 3, "question": "조선 붕당정치 흐름은?", "answer": "동인/서인→남인/북인(동인)→노론/소론(서인)→탕평책(영조/정조)→세도정치"},
                        {"id": 4, "question": "일제강점기 시기구분은?", "answer": "무단통치(1910s)→문화통치(1920s)→민족말살통치(1930s~). 각 시기별 정책 숙지"},
                        {"id": 5, "question": "정부 수립 과정은?", "answer": "8.15광복→미소공위→좌우합작→남북협상→5.10총선→제헌헌법→정부수립(1948.8.15)"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "local-civil-7",
        "name": "지방직 7급",
        "desc": "광역/기초자치단체 7급 공무원",
        "icon": "🏢",
        "org": "각 지방자치단체",
        "subjects": [
            {
                "id": "local-7-subject",
                "name": "지방직 시험과목",
                "topics": [
                    {"id": "local-admin", "name": "지방행정론", "color": "from-emerald-500 to-green-600", "questions": [
                        {"id": 1, "question": "지방자치 핵심 원리는?", "answer": "주민자치(정치적 자치), 단체자치(법률적 자치). 보충성 원칙, 자기결정권"},
                        {"id": 2, "question": "지방자치단체 종류는?", "answer": "광역: 특별시/광역시/도/특별자치도. 기초: 시/군/구(자치구)"},
                        {"id": 3, "question": "지방의회 권한은?", "answer": "조례제정/개폐권, 예산심의/확정권, 결산승인권, 행정사무감사/조사권"},
                        {"id": 4, "question": "지방재정 구조는?", "answer": "자주재원(지방세/세외수입) vs 의존재원(지방교부세/국고보조금). 재정자립도가 핵심 지표"},
                        {"id": 5, "question": "주민참여제도는?", "answer": "주민투표, 주민소환, 주민소송, 주민감사청구, 주민참여예산제도"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "local-civil-9",
        "name": "지방직 9급",
        "desc": "광역/기초자치단체 9급 공무원",
        "icon": "🏠",
        "org": "각 지방자치단체",
        "subjects": [
            {
                "id": "local-9-subject",
                "name": "지방직 시험특징",
                "topics": [
                    {"id": "local-9-guide", "name": "시험 가이드", "color": "from-teal-500 to-cyan-600", "questions": [
                        {"id": 1, "question": "지방직과 국가직 차이는?", "answer": "시험 주관기관, 시험일자, 합격선 차이. 과목/문항수는 동일. 지방직이 경쟁률 낮은 편"},
                        {"id": 2, "question": "지방직 선택과목 추천은?", "answer": "행정직: 행정학+행정법. 세무직: 세법+회계. 선호 지역 경쟁률 확인 필수"},
                        {"id": 3, "question": "지역 가산점 제도란?", "answer": "해당 지역 거주자/출신자에게 가산점 부여. 지자체별 규정 상이"},
                        {"id": 4, "question": "면접 준비 방법은?", "answer": "해당 지자체 현안 파악, 지역특화 정책 이해, 공직가치관/문제해결력 준비"},
                        {"id": 5, "question": "합격 커트라인 추이는?", "answer": "인기 지역(서울/경기) 높음. 비수도권 상대적 낮음. 평균 75~85점 수준"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "police-officer",
        "name": "경찰공무원(순경)",
        "desc": "순경 공채 선발",
        "icon": "👮",
        "org": "경찰청",
        "subjects": [
            {
                "id": "police-common",
                "name": "필수과목",
                "topics": [
                    {"id": "criminal-law", "name": "형법", "color": "from-red-500 to-rose-600", "questions": [
                        {"id": 1, "question": "형법 총론 핵심은?", "answer": "죄형법정주의, 범죄성립요건(구성요건해당성/위법성/책임), 미수/공범, 죄수론"},
                        {"id": 2, "question": "위법성조각사유는?", "answer": "정당행위, 정당방위, 긴급피난, 자구행위, 피해자승낙"},
                        {"id": 3, "question": "책임조각사유는?", "answer": "형사미성년(14세미만), 심신장애, 강요된 행위, 법률의 착오(일부)"},
                        {"id": 4, "question": "형법 각론 빈출 범죄는?", "answer": "살인/상해/폭행/협박(생명·신체), 절도/강도/사기(재산), 공무집행방해(국가)"},
                        {"id": 5, "question": "공범의 종류는?", "answer": "공동정범(2인 이상 공동실행), 교사범(실행 교사), 방조범(실행 도움)"}
                    ]},
                    {"id": "criminal-procedure", "name": "형사소송법", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "형사소송법 기본원칙은?", "answer": "적법절차원칙, 무죄추정원칙, 증거재판주의, 자백배제법칙, 위법수집증거배제"},
                        {"id": 2, "question": "수사의 개시 방법은?", "answer": "고소, 고발, 자수, 불심검문, 진정/탄원, 변사자검시, 현행범체포"},
                        {"id": 3, "question": "영장주의란?", "answer": "체포/구속/수색/압수 시 법관 발부 영장 필요. 예외: 긴급체포, 현행범, 긴급압수수색"},
                        {"id": 4, "question": "공판절차 순서는?", "answer": "공판기일→모두진술→증거조사→피고인심문→변론→판결선고"},
                        {"id": 5, "question": "상소제도 종류는?", "answer": "항소(1심→2심), 상고(2심→3심), 항고(결정/명령에 대한 불복)"}
                    ]},
                    {"id": "police-law", "name": "경찰학개론", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "경찰의 개념(형식적/실질적)은?", "answer": "형식적: 경찰조직 담당 업무. 실질적: 공공질서유지를 위한 권력작용"},
                        {"id": 2, "question": "경찰작용법 핵심은?", "answer": "불심검문, 보호조치, 위험발생방지, 범죄예방진압, 교통단속"},
                        {"id": 3, "question": "경찰조직법 구조는?", "answer": "경찰청(국가경찰)-시도경찰청-경찰서-지구대/파출소. 자치경찰제 도입"},
                        {"id": 4, "question": "경찰윤리강령은?", "answer": "인권존중, 청렴의무, 친절봉사, 정치적 중립, 공정한 법집행"},
                        {"id": 5, "question": "지역사회경찰활동이란?", "answer": "주민과의 협력, 범죄예방 중심, 문제해결형 경찰활동. 112신고, 순찰활동"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "firefighter",
        "name": "소방공무원(소방사)",
        "desc": "소방사 공채 선발",
        "icon": "🚒",
        "org": "소방청",
        "subjects": [
            {
                "id": "fire-common",
                "name": "필수과목",
                "topics": [
                    {"id": "fire-theory", "name": "소방학개론", "color": "from-red-500 to-orange-600", "questions": [
                        {"id": 1, "question": "연소의 3요소는?", "answer": "가연물(연료), 산소공급원(공기), 점화원(열). 4요소는 연쇄반응 추가"},
                        {"id": 2, "question": "소화 방법 4가지는?", "answer": "제거소화(연료제거), 질식소화(산소차단), 냉각소화(온도저하), 억제소화(연쇄반응차단)"},
                        {"id": 3, "question": "화재 분류(A/B/C/D/K)는?", "answer": "A(일반-물), B(유류-폼), C(전기-CO2), D(금속-특수분말), K(주방-식용유)"},
                        {"id": 4, "question": "소방시설 종류는?", "answer": "소화설비(스프링클러), 경보설비(감지기), 피난설비(유도등), 소화용수설비"},
                        {"id": 5, "question": "재난관리 단계는?", "answer": "예방→대비→대응→복구 (4단계 재난관리)"}
                    ]},
                    {"id": "fire-law", "name": "소방관계법규", "color": "from-amber-500 to-yellow-600", "questions": [
                        {"id": 1, "question": "소방기본법 핵심은?", "answer": "소방활동, 화재조사, 구조/구급, 의용소방대, 소방력기준"},
                        {"id": 2, "question": "소방시설법 핵심은?", "answer": "소방시설 설치/유지관리, 소방시설관리사, 성능위주설계"},
                        {"id": 3, "question": "위험물안전관리법 핵심은?", "answer": "위험물 6류 분류, 저장/취급 기준, 안전관리자 선임"},
                        {"id": 4, "question": "다중이용업소법 핵심은?", "answer": "다중이용업소 정의, 안전관리기본계획, 소방시설/비상구"},
                        {"id": 5, "question": "의무소방대설치법 핵심은?", "answer": "의무소방원 복무, 의무소방대 설치/운영, 대체복무제도"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "corrections-officer",
        "name": "교정직(교도관)",
        "desc": "교정시설 교도관 선발",
        "icon": "🔒",
        "org": "법무부",
        "subjects": [
            {
                "id": "corrections-subject",
                "name": "전문과목",
                "topics": [
                    {"id": "corrections-theory", "name": "교정학개론", "color": "from-gray-500 to-slate-600", "questions": [
                        {"id": 1, "question": "교정의 목적은?", "answer": "응보(형벌), 억제(범죄예방), 교화개선(재사회화), 무력화(사회격리)"},
                        {"id": 2, "question": "수용자 분류심사란?", "answer": "범죄유형/성향/재범위험성 등 평가하여 처우등급 결정, 개별처우 실시"},
                        {"id": 3, "question": "가석방 요건은?", "answer": "형기 1/3 경과, 개전의 정, 재범위험 낮음. 가석방심사위원회 심사"},
                        {"id": 4, "question": "교정처우 프로그램은?", "answer": "교육(학과/직업), 교화(종교/상담), 사회복귀(취업연계/가족지원)"},
                        {"id": 5, "question": "수용자 권리보장은?", "answer": "서신/접견권, 진정/청원권, 의료권, 종교활동권. 수용자처우법 규정"}
                    ]},
                    {"id": "criminal-law-corrections", "name": "형사법", "color": "from-indigo-500 to-purple-600", "questions": [
                        {"id": 1, "question": "형의 종류(형법)는?", "answer": "사형, 징역, 금고, 자격상실, 자격정지, 벌금, 구류, 과료, 몰수"},
                        {"id": 2, "question": "형 집행 유예란?", "answer": "3년 이하 징역/금고 시 정상 참작하여 1~5년간 집행 유예. 유예기간 경과 시 면소"},
                        {"id": 3, "question": "가석방 vs 사면 차이는?", "answer": "가석방: 형 집행 중 조건부 석방. 사면: 형 선고효력 소멸(대통령 권한)"},
                        {"id": 4, "question": "보호관찰이란?", "answer": "사회 내 처우. 지도감독/원호, 수강명령/사회봉사명령 병과 가능"},
                        {"id": 5, "question": "전자감시제도란?", "answer": "위치추적 전자장치(발찌) 부착. 성범죄/미성년자대상범죄/살인범 등"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "military-civil",
        "name": "군무원",
        "desc": "국방부 소속 공무원",
        "icon": "🎖️",
        "org": "국방부",
        "subjects": [
            {
                "id": "military-subject",
                "name": "군무원 시험과목",
                "topics": [
                    {"id": "military-guide", "name": "시험 가이드", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "군무원 직렬 종류는?", "answer": "행정, 군사정보, 기술(전기/전자/기계/건축), 시설, 수송, 보급 등 다양"},
                        {"id": 2, "question": "군무원 채용 등급은?", "answer": "5급(과장급), 7급(계장급), 9급(일반). 9급이 가장 많이 채용"},
                        {"id": 3, "question": "군무원 필수과목은?", "answer": "국어, 국사(한국사), 행정법(7급이상) 또는 행정학(9급). 선택과목 별도"},
                        {"id": 4, "question": "군무원 특징은?", "answer": "군부대 근무, 국방부 소속, 복무규정 준수, 안보업무 수행"},
                        {"id": 5, "question": "군무원 가산점은?", "answer": "군경력, 자격증(직렬관련), 취업지원대상자 가산. 직렬별 상이"}
                    ]},
                    {"id": "national-security", "name": "국방/안보 상식", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "국방조직 구조는?", "answer": "대통령(통수권자)-국방부장관-합참의장-각군참모총장. 문민통제 원칙"},
                        {"id": 2, "question": "한미동맹 핵심은?", "answer": "한미상호방위조약(1953), 연합사령부, 주한미군, 전작권 전환 논의"},
                        {"id": 3, "question": "안보위협 유형은?", "answer": "전통적(군사적)위협, 비전통적위협(테러/사이버/재난), 초국가적위협"},
                        {"id": 4, "question": "국방개혁 방향은?", "answer": "병력 감축, 첨단무기 도입, 복무기간 단축, 민군협력 강화"},
                        {"id": 5, "question": "비밀보호 규정은?", "answer": "비밀등급(1/2/3급), 비인가자 접근금지, 보안서약, 비밀누설 처벌"}
                    ]}
                ]
            }
        ]
    }
]

BASE_DIR = "C:/todo/today/자격시험/civil"

def create_page_tsx(path):
    """page.tsx 생성 (export 전용)"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    component = path.split("/")[-2]
    if "study" in path:
        return  # study 페이지는 직접 작성
    elif "exam" in path:
        content = "export { default } from '../exam-page';\n"
    else:
        content = "export { default } from './main-page';\n"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def create_category_page():
    """카테고리 메인 페이지 생성"""
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
          <span className="text-5xl mb-4 block">🏛️</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY["name"]} 분야</h1>
          <p className="text-{CATEGORY["color1"]}-100">공무원 시험 준비를 위한 학습 가이드</p>
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

    # page.tsx도 생성
    with open(f"{BASE_DIR}/page.tsx", "w", encoding="utf-8") as f:
        f.write("export { default } from './category-page';\n")

    print(f"Created: {BASE_DIR}/category-page.tsx")

def create_cert_main_page(cert):
    """자격증 메인 페이지 생성"""
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
    """시험정보 페이지 생성"""
    cert_dir = f"{BASE_DIR}/{cert['id']}"
    os.makedirs(f"{cert_dir}/exam", exist_ok=True)

    content = f"""'use client';

import Link from 'next/link';

export default function ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
                <td className="py-2 font-medium text-gray-600">시험명</td>
                <td className="py-2">{cert["name"]}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium text-gray-600">시험일정</td>
                <td className="py-2">연 1~2회 (기관별 상이)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">시험 과목</h2>
          <p className="text-gray-600 text-sm">상세 정보는 시행기관 공고를 확인하세요.</p>
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
    """학습 페이지 생성"""
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
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
    # 카테고리 페이지 생성
    create_category_page()

    # 각 자격증별 페이지 생성
    for cert in CERTIFICATIONS:
        print(f"Created: {BASE_DIR}/{cert['id']}")
        create_cert_main_page(cert)
        create_exam_page(cert)

        # 학습 페이지 생성
        for subj in cert["subjects"]:
            for topic in subj["topics"]:
                create_study_page(cert, topic)

    print(f"\nTotal: {len(CERTIFICATIONS)} certifications created")

if __name__ == "__main__":
    main()
