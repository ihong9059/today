import os

# 카테고리 정보
CATEGORY = {
    "id": "welfare",
    "name": "사회복지·상담",
    "color1": "violet",
    "color2": "purple",
    "gradient": "from-violet-500 to-purple-600"
}

# 자격증 목록
CERTS = [
    {
        "id": "social-worker-1",
        "name": "사회복지사 1급",
        "icon": "🤝",
        "desc": "사회복지 서비스 제공 전문가",
        "subjects": [
            {"id": "social-welfare-policy", "name": "사회복지정책론", "topics": [
                {"id": "policy-theory", "name": "사회복지정책 이론", "questions": [
                    {"q": "사회복지정책의 개념과 특성을 설명하시오.", "a": "국민의 복지 향상을 위한 정부의 의도적 활동, 재분배 기능"},
                    {"q": "사회복지정책의 가치(평등, 자유, 효율성)를 설명하시오.", "a": "평등: 동등한 기회/결과, 자유: 선택권 보장, 효율성: 자원 최적 배분"},
                    {"q": "사회복지정책 발달이론(산업화이론, 국가중심이론)을 비교하시오.", "a": "산업화이론: 경제발전 결과, 국가중심이론: 국가 자율성 강조"},
                    {"q": "에스핑-앤더슨의 복지국가 유형론을 설명하시오.", "a": "자유주의(미국), 보수주의(독일), 사회민주주의(스웨덴)"},
                    {"q": "사회복지정책 분석틀(길버트와 스펙트)을 설명하시오.", "a": "급여대상, 급여형태, 전달체계, 재원 4가지 차원"}
                ]},
                {"id": "social-security", "name": "사회보장론", "questions": [
                    {"q": "사회보험과 공공부조의 차이점을 설명하시오.", "a": "사회보험: 기여원칙/보편성, 공공부조: 무기여/선별성/자산조사"},
                    {"q": "국민연금제도의 급여 종류를 설명하시오.", "a": "노령연금, 장애연금, 유족연금, 반환일시금"},
                    {"q": "건강보험의 특성과 원리를 설명하시오.", "a": "강제가입, 보험료 부과, 현물급여 원칙, 사회연대 원리"},
                    {"q": "고용보험의 사업 내용을 설명하시오.", "a": "실업급여, 고용안정사업, 직업능력개발사업"},
                    {"q": "산업재해보상보험의 급여 종류를 설명하시오.", "a": "요양급여, 휴업급여, 장해급여, 유족급여, 상병보상연금"}
                ]}
            ]},
            {"id": "human-behavior", "name": "인간행동과사회환경", "topics": [
                {"id": "developmental-theory", "name": "발달이론", "questions": [
                    {"q": "프로이트의 심리성적 발달단계를 설명하시오.", "a": "구강기-항문기-남근기-잠복기-생식기, 리비도 중심"},
                    {"q": "에릭슨의 심리사회적 발달 8단계를 설명하시오.", "a": "신뢰vs불신부터 자아통합vs절망까지 전생애 발달"},
                    {"q": "피아제의 인지발달 4단계를 설명하시오.", "a": "감각운동기-전조작기-구체적조작기-형식적조작기"},
                    {"q": "콜버그의 도덕발달 이론을 설명하시오.", "a": "전인습(처벌/보상)-인습(사회규범)-후인습(보편원리)"},
                    {"q": "반두라의 사회학습이론을 설명하시오.", "a": "관찰학습, 모델링, 자기효능감, 상호결정론"}
                ]},
                {"id": "system-theory", "name": "체계이론", "questions": [
                    {"q": "생태체계이론의 환경체계를 설명하시오.", "a": "미시-중간-외부-거시-시간체계 (브론펜브레너)"},
                    {"q": "일반체계이론의 주요 개념을 설명하시오.", "a": "경계, 개방체계/폐쇄체계, 항상성, 엔트로피, 피드백"},
                    {"q": "가족체계이론의 특성을 설명하시오.", "a": "전체성, 순환적 인과성, 규칙, 항상성"},
                    {"q": "사회체계의 기능(AGIL)을 설명하시오.", "a": "적응, 목표달성, 통합, 잠재적 패턴 유지 (파슨스)"},
                    {"q": "생태학적 관점의 주요 개념을 설명하시오.", "a": "적합성, 적응, 스트레스, 대처, 역량강화"}
                ]}
            ]},
            {"id": "social-work-practice", "name": "사회복지실천론", "topics": [
                {"id": "practice-theory", "name": "실천이론", "questions": [
                    {"q": "사회복지실천의 가치와 윤리원칙을 설명하시오.", "a": "인간존엄, 자기결정권, 비밀보장, 클라이언트 이익 우선"},
                    {"q": "사회복지실천의 통합적 접근을 설명하시오.", "a": "4체계모델(변화매개-클라이언트-표적-행동체계)"},
                    {"q": "관계의 7대 원칙(비에스텍)을 설명하시오.", "a": "개별화, 의도적 감정표현, 통제된 정서적 관여, 수용, 비심판적 태도, 자기결정, 비밀보장"},
                    {"q": "사회복지실천 과정을 설명하시오.", "a": "접수-자료수집-사정-계획-개입-평가-종결"},
                    {"q": "강점관점 실천의 원칙을 설명하시오.", "a": "모든 사람의 강점 존재, 문제가 아닌 가능성 초점, 클라이언트 전문가 인정"}
                ]},
                {"id": "practice-model", "name": "실천모델", "questions": [
                    {"q": "심리사회모델의 특성을 설명하시오.", "a": "상황 속의 인간, 직접적/간접적 개입, 지지-탐색-환기"},
                    {"q": "인지행동모델의 기법을 설명하시오.", "a": "인지재구조화, 합리적정서행동치료(REBT), 체계적 둔감화"},
                    {"q": "과제중심모델의 특성을 설명하시오.", "a": "단기개입, 표적문제 선정, 과제합의, 시간제한"},
                    {"q": "위기개입모델의 특성을 설명하시오.", "a": "즉각적 개입, 단기집중, 위기상태 사정, 지지체계 활용"},
                    {"q": "해결중심모델의 질문기법을 설명하시오.", "a": "기적질문, 예외질문, 척도질문, 대처질문"}
                ]}
            ]},
            {"id": "community-welfare", "name": "지역사회복지론", "topics": [
                {"id": "community-theory", "name": "지역사회복지 이론", "questions": [
                    {"q": "로스만의 지역사회복지 실천모델 3가지를 설명하시오.", "a": "지역사회개발, 사회계획, 사회행동"},
                    {"q": "지역사회복지관의 기능과 사업을 설명하시오.", "a": "사례관리, 서비스제공, 지역조직화, 자원개발"},
                    {"q": "사회복지협의회의 역할을 설명하시오.", "a": "연락조정, 조사연구, 기관간 협력, 지역복지 증진"},
                    {"q": "주민조직화의 원칙과 방법을 설명하시오.", "a": "주민참여, 역량강화, 지도력 개발, 네트워크 구축"},
                    {"q": "지역사회보장계획의 내용을 설명하시오.", "a": "4년 단위 수립, 지역복지 자원조사, 서비스 연계체계 구축"}
                ]}
            ]},
            {"id": "social-welfare-law", "name": "사회복지법제론", "topics": [
                {"id": "welfare-law", "name": "사회복지법 체계", "questions": [
                    {"q": "사회복지사업법의 주요 내용을 설명하시오.", "a": "사회복지사 자격, 시설 설치운영, 사회복지법인"},
                    {"q": "국민기초생활보장법의 급여 종류를 설명하시오.", "a": "생계급여, 의료급여, 주거급여, 교육급여, 자활급여"},
                    {"q": "아동복지법의 보호조치를 설명하시오.", "a": "보호대상아동 발견, 상담조사, 보호조치(가정위탁/시설보호)"},
                    {"q": "노인복지법의 주요 서비스를 설명하시오.", "a": "노인주거복지시설, 노인의료복지시설, 재가노인복지시설"},
                    {"q": "장애인복지법의 장애유형과 서비스를 설명하시오.", "a": "장애유형 15종, 활동지원서비스, 재활지원"}
                ]}
            ]}
        ]
    },
    {
        "id": "social-worker-2",
        "name": "사회복지사 2급",
        "icon": "🤝",
        "desc": "사회복지 현장실무 전문가",
        "subjects": [
            {"id": "social-welfare-intro", "name": "사회복지개론", "topics": [
                {"id": "welfare-basics", "name": "사회복지 기초", "questions": [
                    {"q": "사회복지의 개념과 목적을 설명하시오.", "a": "인간다운 삶 보장, 사회문제 해결, 삶의 질 향상"},
                    {"q": "사회복지의 동기(이타주의, 상호부조 등)를 설명하시오.", "a": "이타주의, 상호부조, 종교적 동기, 정치경제적 동기"},
                    {"q": "잔여적 복지와 제도적 복지의 차이를 설명하시오.", "a": "잔여적: 가족/시장 실패시 개입, 제도적: 보편적 권리"},
                    {"q": "사회복지사의 역할을 설명하시오.", "a": "조력자, 중개자, 옹호자, 교육자, 행정가"},
                    {"q": "사회복지실천 현장의 종류를 설명하시오.", "a": "1차현장(복지관), 2차현장(병원/학교), 행정기관"}
                ]}
            ]},
            {"id": "practice-skills", "name": "사회복지실천기술론", "topics": [
                {"id": "interview-skills", "name": "면접기술", "questions": [
                    {"q": "면접의 기본원리를 설명하시오.", "a": "경청, 공감, 수용, 비심판적 태도"},
                    {"q": "관계형성 기술을 설명하시오.", "a": "라포형성, 신뢰구축, 감정반영, 명료화"},
                    {"q": "사정도구(제노그램, 생태도)를 설명하시오.", "a": "제노그램: 가족관계도, 생태도: 환경체계 시각화"},
                    {"q": "기록의 유형을 설명하시오.", "a": "과정기록, 요약기록, 문제중심기록(SOAP)"},
                    {"q": "집단사회복지실천의 단계를 설명하시오.", "a": "계획-초기-중간(작업)-종결단계"}
                ]}
            ]},
            {"id": "case-management", "name": "사례관리론", "topics": [
                {"id": "case-process", "name": "사례관리 과정", "questions": [
                    {"q": "사례관리의 정의와 목적을 설명하시오.", "a": "복합욕구 대상자에게 포괄적 서비스 제공, 서비스 조정/연계"},
                    {"q": "사례관리의 과정을 설명하시오.", "a": "접수-사정-계획-개입-점검-평가-종결"},
                    {"q": "사례관리자의 역할을 설명하시오.", "a": "조정자, 옹호자, 중개자, 상담자, 교육자"},
                    {"q": "서비스 연계의 원칙을 설명하시오.", "a": "포괄성, 연속성, 적절성, 접근성, 책임성"},
                    {"q": "통합사례관리의 특성을 설명하시오.", "a": "공공-민간 협력, 지역사회 자원 연계, 대상자 중심"}
                ]}
            ]}
        ]
    },
    {
        "id": "childcare-teacher-1",
        "name": "보육교사 1급",
        "icon": "👶",
        "desc": "어린이집 보육 전문가",
        "subjects": [
            {"id": "child-development", "name": "아동발달론", "topics": [
                {"id": "dev-theory", "name": "발달이론", "questions": [
                    {"q": "영유아 발달의 원리를 설명하시오.", "a": "일정순서, 개인차, 상호작용, 연속성, 결정적 시기"},
                    {"q": "애착발달 이론(볼비)을 설명하시오.", "a": "애착형성 4단계, 내적작동모델, 안정/불안정 애착"},
                    {"q": "언어발달 단계를 설명하시오.", "a": "옹알이-한단어기-두단어기-다단어기-문법발달"},
                    {"q": "사회성 발달 과정을 설명하시오.", "a": "자아인식-자기조절-또래관계-사회적 기술 발달"},
                    {"q": "영유아기 인지발달 특성을 설명하시오.", "a": "감각운동기-전조작기, 대상영속성, 자기중심성"}
                ]}
            ]},
            {"id": "childcare-curriculum", "name": "보육과정론", "topics": [
                {"id": "nuri-curriculum", "name": "누리과정", "questions": [
                    {"q": "표준보육과정의 영역을 설명하시오.", "a": "기본생활, 신체운동, 의사소통, 사회관계, 예술경험, 자연탐구"},
                    {"q": "누리과정의 목적과 목표를 설명하시오.", "a": "심신건강, 자율성, 창의성, 바른인성, 민주시민 기초"},
                    {"q": "놀이중심 보육과정의 특성을 설명하시오.", "a": "유아 주도, 자발적 참여, 즐거움, 의미 있는 경험"},
                    {"q": "영아보육 프로그램의 특성을 설명하시오.", "a": "일과 중심, 개별화, 양육자와 신뢰관계, 안전한 환경"},
                    {"q": "보육평가제의 영역을 설명하시오.", "a": "보육과정, 보육환경, 건강안전, 교직원, 운영관리"}
                ]}
            ]},
            {"id": "childcare-admin", "name": "보육시설 운영관리", "topics": [
                {"id": "admin-basics", "name": "운영관리 기초", "questions": [
                    {"q": "어린이집 설치기준을 설명하시오.", "a": "시설규모, 설비기준, 교사대아동비율, 안전기준"},
                    {"q": "보육교직원의 자격기준을 설명하시오.", "a": "원장/교사 자격, 학력/경력 요건, 승급교육"},
                    {"q": "어린이집 운영위원회의 역할을 설명하시오.", "a": "운영전반 자문, 보육프로그램, 예산결산, 급식"},
                    {"q": "보육료 지원체계를 설명하시오.", "a": "보육료, 양육수당, 아이돌봄서비스, 아이행복카드"},
                    {"q": "어린이집 평가인증제를 설명하시오.", "a": "의무평가, 4영역 평가지표, 등급 부여"}
                ]}
            ]}
        ]
    },
    {
        "id": "childcare-teacher-2",
        "name": "보육교사 2급",
        "icon": "👶",
        "desc": "어린이집 보육 실무자",
        "subjects": [
            {"id": "child-care-basics", "name": "영유아보육 기초", "topics": [
                {"id": "care-basics", "name": "보육 기초이론", "questions": [
                    {"q": "보육의 개념과 필요성을 설명하시오.", "a": "영유아 보호와 교육, 부모 양육지원, 아동 발달 촉진"},
                    {"q": "보육의 역사적 발전을 설명하시오.", "a": "탁아소-어린이집, 영유아보육법 제정, 무상보육"},
                    {"q": "보육시설의 유형을 설명하시오.", "a": "국공립, 사회복지법인, 민간, 가정, 직장어린이집"},
                    {"q": "보육교사의 역할과 자질을 설명하시오.", "a": "양육자, 교육자, 상담자, 전문성, 인성"},
                    {"q": "영유아 권리와 보육 철학을 설명하시오.", "a": "UN아동권리협약, 생존권, 보호권, 발달권, 참여권"}
                ]}
            ]},
            {"id": "play-guidance", "name": "놀이지도", "topics": [
                {"id": "play-theory", "name": "놀이이론", "questions": [
                    {"q": "놀이의 특성을 설명하시오.", "a": "자발성, 내적동기, 즐거움, 과정중시, 자유선택"},
                    {"q": "놀이 발달단계를 설명하시오.", "a": "기능놀이-구성놀이-상징놀이-규칙있는놀이"},
                    {"q": "사회적 놀이 발달(파튼)을 설명하시오.", "a": "방관-혼자-병행-연합-협동놀이"},
                    {"q": "놀이환경 구성 원리를 설명하시오.", "a": "안전성, 다양성, 접근성, 융통성, 개방성"},
                    {"q": "교사의 놀이개입 전략을 설명하시오.", "a": "관찰자, 무대관리자, 공동놀이자, 놀이지도자"}
                ]}
            ]}
        ]
    },
    {
        "id": "career-counselor-1",
        "name": "직업상담사 1급",
        "icon": "💼",
        "desc": "취업 및 진로 상담 전문가",
        "subjects": [
            {"id": "career-counseling-advanced", "name": "직업상담학 심화", "topics": [
                {"id": "career-theory", "name": "진로발달이론", "questions": [
                    {"q": "수퍼의 진로발달 5단계를 설명하시오.", "a": "성장기-탐색기-확립기-유지기-쇠퇴기"},
                    {"q": "홀랜드의 직업성격 유형을 설명하시오.", "a": "RIASEC: 현실형-탐구형-예술형-사회형-기업형-관습형"},
                    {"q": "크럼볼츠의 사회학습이론을 설명하시오.", "a": "학습경험, 과제접근기술, 우연학습이론"},
                    {"q": "고트프레드슨의 제한타협이론을 설명하시오.", "a": "성역할-사회적지위-흥미, 인지적 타협 과정"},
                    {"q": "사비카스의 진로구성이론을 설명하시오.", "a": "진로적응성, 생애주제, 내러티브 상담"}
                ]},
                {"id": "career-assessment", "name": "직업심리검사", "questions": [
                    {"q": "직업흥미검사(Strong)를 설명하시오.", "a": "일반직업주제, 기본흥미척도, 개인특성척도"},
                    {"q": "직업가치관검사를 설명하시오.", "a": "내재적/외재적 가치, 직업선택의 기준"},
                    {"q": "직업적성검사의 종류를 설명하시오.", "a": "GATB, 적성검사, 진로성숙도검사"},
                    {"q": "심리검사 해석의 원칙을 설명하시오.", "a": "규준참조, 개인차, 발달적 관점, 통합해석"},
                    {"q": "직업정보 탐색방법을 설명하시오.", "a": "워크넷, 직업사전, 한국고용정보원, 직업체험"}
                ]}
            ]},
            {"id": "labor-market-analysis", "name": "노동시장론", "topics": [
                {"id": "labor-economics", "name": "노동경제학", "questions": [
                    {"q": "노동시장의 수요와 공급을 설명하시오.", "a": "기업의 노동수요, 개인의 노동공급, 균형임금"},
                    {"q": "실업의 유형을 설명하시오.", "a": "마찰적, 구조적, 경기적, 계절적 실업"},
                    {"q": "임금결정이론을 설명하시오.", "a": "한계생산력이론, 효율임금이론, 내부노동시장"},
                    {"q": "노동시장 이중구조론을 설명하시오.", "a": "1차(안정)/2차(불안정) 노동시장, 분절이론"},
                    {"q": "비정규직의 유형과 특성을 설명하시오.", "a": "기간제, 파견, 용역, 시간제, 처우격차"}
                ]}
            ]}
        ]
    },
    {
        "id": "career-counselor-2",
        "name": "직업상담사 2급",
        "icon": "💼",
        "desc": "취업 및 진로 상담 실무자",
        "subjects": [
            {"id": "career-counseling-basic", "name": "직업상담 기초", "topics": [
                {"id": "counseling-basics", "name": "상담 기초", "questions": [
                    {"q": "직업상담의 목표를 설명하시오.", "a": "자기이해, 직업정보 탐색, 의사결정, 취업준비"},
                    {"q": "상담관계 형성기법을 설명하시오.", "a": "경청, 공감, 수용, 질문, 반영"},
                    {"q": "진로상담 과정을 설명하시오.", "a": "관계형성-자기이해-직업탐색-의사결정-실행"},
                    {"q": "집단직업상담의 특성을 설명하시오.", "a": "효율성, 상호작용, 피드백, 사회기술 학습"},
                    {"q": "취업지원 프로그램의 종류를 설명하시오.", "a": "취업성공패키지, 청년내일채움공제, 국민취업지원제도"}
                ]}
            ]},
            {"id": "vocational-psychology", "name": "직업심리학", "topics": [
                {"id": "work-psychology", "name": "산업심리", "questions": [
                    {"q": "동기이론(매슬로우)을 설명하시오.", "a": "생리-안전-소속-존경-자아실현 욕구"},
                    {"q": "직무만족의 영향요인을 설명하시오.", "a": "직무특성, 보상, 대인관계, 성장기회"},
                    {"q": "조직몰입의 유형을 설명하시오.", "a": "정서적, 규범적, 지속적 몰입"},
                    {"q": "직무스트레스 관리방안을 설명하시오.", "a": "스트레스원 파악, 대처기술, 사회적지지, EAP"},
                    {"q": "경력개발의 단계를 설명하시오.", "a": "탐색-확립-유지-전환 또는 쇠퇴 단계"}
                ]}
            ]},
            {"id": "employment-info", "name": "고용정보론", "topics": [
                {"id": "job-info", "name": "직업정보", "questions": [
                    {"q": "한국표준직업분류를 설명하시오.", "a": "대분류 10개, 중/소/세분류, 직무 및 기능 기준"},
                    {"q": "워크넷의 기능을 설명하시오.", "a": "채용정보, 구직등록, 직업심리검사, 진로상담"},
                    {"q": "직업정보의 수집방법을 설명하시오.", "a": "문헌조사, 인터뷰, 직업체험, 온라인 검색"},
                    {"q": "취업알선 과정을 설명하시오.", "a": "구직등록-적합매칭-알선-사후관리"},
                    {"q": "고용서비스의 종류를 설명하시오.", "a": "고용센터, 민간취업알선, 대학일자리센터"}
                ]}
            ]}
        ]
    },
    {
        "id": "youth-counselor-1",
        "name": "청소년상담사 1급",
        "icon": "🧑‍🤝‍🧑",
        "desc": "청소년 심리상담 전문가",
        "subjects": [
            {"id": "youth-counseling-advanced", "name": "청소년상담 심화", "topics": [
                {"id": "advanced-counseling", "name": "상담심화이론", "questions": [
                    {"q": "상담수퍼비전의 모델을 설명하시오.", "a": "발달모델, 역할모델, 통합모델, 동료수퍼비전"},
                    {"q": "상담자 윤리강령의 내용을 설명하시오.", "a": "비밀보장, 다중관계 금지, 전문성 유지, 내담자 권리"},
                    {"q": "위기개입 상담의 원칙을 설명하시오.", "a": "즉각성, 단기집중, 안전확보, 자원연계"},
                    {"q": "다문화 청소년상담의 특성을 설명하시오.", "a": "문화적 감수성, 언어장벽, 정체성혼란, 가족갈등"},
                    {"q": "청소년 자살예방 상담전략을 설명하시오.", "a": "위험요인 사정, 안전계획, 보호요인 강화, 연계"}
                ]}
            ]},
            {"id": "crisis-intervention", "name": "위기개입론", "topics": [
                {"id": "crisis-theory", "name": "위기이론", "questions": [
                    {"q": "위기의 유형을 설명하시오.", "a": "발달적, 상황적, 실존적, 환경적 위기"},
                    {"q": "위기개입 6단계 모델을 설명하시오.", "a": "문제정의-안전확보-지지제공-대안탐색-계획수립-추수"},
                    {"q": "자살위험성 평가를 설명하시오.", "a": "자살사고, 계획, 의도, 수단, 보호요인 평가"},
                    {"q": "외상 후 스트레스 상담을 설명하시오.", "a": "안정화, 외상기억처리, 재통합, 회복"},
                    {"q": "학교폭력 피해자 상담을 설명하시오.", "a": "심리적 안정, 신고절차, 후유증 치료, 관계회복"}
                ]}
            ]}
        ]
    },
    {
        "id": "youth-counselor-2",
        "name": "청소년상담사 2급",
        "icon": "🧑‍🤝‍🧑",
        "desc": "청소년 심리상담 중급자",
        "subjects": [
            {"id": "youth-development", "name": "청소년발달", "topics": [
                {"id": "adolescent-dev", "name": "청소년기 발달특성", "questions": [
                    {"q": "청소년기 신체발달 특성을 설명하시오.", "a": "급성장, 2차 성징, 호르몬 변화, 신체상 변화"},
                    {"q": "청소년기 인지발달(형식적 조작기)을 설명하시오.", "a": "추상적 사고, 가설연역적 사고, 이상주의"},
                    {"q": "청소년기 정체감 발달(마르시아)을 설명하시오.", "a": "정체감 성취/유예/유실/혼미 4유형"},
                    {"q": "또래관계의 중요성을 설명하시오.", "a": "사회화, 정서적지지, 자아정체감, 친밀감"},
                    {"q": "청소년기 도덕성 발달을 설명하시오.", "a": "인습수준에서 후인습수준으로의 발달"}
                ]}
            ]},
            {"id": "counseling-theory", "name": "상담이론", "topics": [
                {"id": "major-theories", "name": "주요 상담이론", "questions": [
                    {"q": "정신분석상담의 기법을 설명하시오.", "a": "자유연상, 꿈분석, 전이분석, 저항분석"},
                    {"q": "인간중심상담의 핵심조건을 설명하시오.", "a": "무조건적 긍정적 존중, 공감적 이해, 일치성"},
                    {"q": "인지행동상담의 기법을 설명하시오.", "a": "인지재구조화, 행동실험, 노출치료, 이완훈련"},
                    {"q": "게슈탈트상담의 기법을 설명하시오.", "a": "빈의자 기법, 알아차림, 현재에 머물기, 실험"},
                    {"q": "해결중심 단기상담의 질문을 설명하시오.", "a": "기적질문, 예외질문, 척도질문, 대처질문"}
                ]}
            ]},
            {"id": "group-counseling", "name": "집단상담", "topics": [
                {"id": "group-process", "name": "집단상담 과정", "questions": [
                    {"q": "집단상담의 치료적 요인을 설명하시오.", "a": "보편성, 희망고취, 이타심, 카타르시스, 응집력"},
                    {"q": "집단상담 발달단계를 설명하시오.", "a": "시작-과도기-작업-종결 단계"},
                    {"q": "집단상담 리더의 역할을 설명하시오.", "a": "촉진자, 모델, 보호자, 과정관찰자"},
                    {"q": "집단역동의 개념을 설명하시오.", "a": "상호작용, 영향력, 의사소통 패턴, 하위집단"},
                    {"q": "문제집단원 유형과 대처를 설명하시오.", "a": "독점자, 침묵자, 공격자, 의존자 대처전략"}
                ]}
            ]}
        ]
    },
    {
        "id": "youth-counselor-3",
        "name": "청소년상담사 3급",
        "icon": "🧑‍🤝‍🧑",
        "desc": "청소년 심리상담 입문자",
        "subjects": [
            {"id": "youth-counseling-intro", "name": "청소년상담 입문", "topics": [
                {"id": "intro-counseling", "name": "상담 기초", "questions": [
                    {"q": "청소년상담의 목표를 설명하시오.", "a": "자기이해, 문제해결, 적응능력 향상, 성장촉진"},
                    {"q": "상담관계의 특성을 설명하시오.", "a": "전문적 관계, 비밀보장, 목적지향, 시간제한"},
                    {"q": "상담면접의 기본기술을 설명하시오.", "a": "경청, 반영, 명료화, 질문, 요약"},
                    {"q": "청소년 내담자의 특성을 설명하시오.", "a": "비자발성, 양가감정, 의존과독립, 현재중심"},
                    {"q": "부모상담의 원칙을 설명하시오.", "a": "협력관계, 정보공유, 비밀보장 한계, 변화촉진"}
                ]}
            ]},
            {"id": "youth-culture", "name": "청소년문화", "topics": [
                {"id": "youth-society", "name": "청소년과 사회", "questions": [
                    {"q": "청소년 하위문화를 설명하시오.", "a": "또래문화, 디지털문화, 소비문화, 저항문화"},
                    {"q": "청소년 미디어 이용 특성을 설명하시오.", "a": "스마트폰 과의존, SNS, 게임, 유튜브"},
                    {"q": "학교부적응의 유형을 설명하시오.", "a": "학업부적응, 교우관계, 학교폭력, 등교거부"},
                    {"q": "청소년 비행의 원인을 설명하시오.", "a": "개인요인, 가정요인, 학교요인, 사회요인"},
                    {"q": "청소년 복지서비스를 설명하시오.", "a": "청소년수련관, 쉼터, 상담복지센터, 학교밖센터"}
                ]}
            ]}
        ]
    },
    {
        "id": "clinical-psychologist-1",
        "name": "임상심리사 1급",
        "icon": "🧠",
        "desc": "심리평가 및 치료 전문가",
        "subjects": [
            {"id": "psychological-assessment", "name": "심리평가", "topics": [
                {"id": "assessment-advanced", "name": "심리검사 심화", "questions": [
                    {"q": "웩슬러 지능검사(K-WAIS)를 설명하시오.", "a": "언어이해, 지각추론, 작업기억, 처리속도 4요인"},
                    {"q": "MMPI-2 임상척도를 설명하시오.", "a": "10개 임상척도, 타당도척도, 프로파일 해석"},
                    {"q": "로샤검사의 시행과 해석을 설명하시오.", "a": "10개 잉크반점, 반응단계, 종합체계 해석"},
                    {"q": "주제통각검사(TAT)를 설명하시오.", "a": "그림자극, 투사적 검사, 욕구-압력 분석"},
                    {"q": "신경심리검사의 종류를 설명하시오.", "a": "K-WAIS, BGT, 레이복잡도형검사, 선로잇기검사"}
                ]}
            ]},
            {"id": "psychopathology", "name": "정신병리학", "topics": [
                {"id": "disorders", "name": "정신장애", "questions": [
                    {"q": "조현병의 증상을 설명하시오.", "a": "양성(망상,환각)/음성(무욕,정서둔마)증상"},
                    {"q": "우울장애의 진단기준을 설명하시오.", "a": "우울기분, 흥미상실, 수면/식욕변화, 무가치감"},
                    {"q": "불안장애의 유형을 설명하시오.", "a": "범불안, 공황, 특정공포, 사회불안, 분리불안"},
                    {"q": "성격장애의 군집을 설명하시오.", "a": "A군(기이), B군(극적), C군(불안) 성격장애"},
                    {"q": "외상 및 스트레스 장애를 설명하시오.", "a": "PTSD, 급성스트레스장애, 적응장애"}
                ]}
            ]},
            {"id": "psychotherapy", "name": "심리치료", "topics": [
                {"id": "therapy-approaches", "name": "치료적 접근", "questions": [
                    {"q": "인지치료(벡)의 기법을 설명하시오.", "a": "자동적사고 확인, 인지왜곡 수정, 행동실험"},
                    {"q": "변증법적행동치료(DBT)를 설명하시오.", "a": "마음챙김, 대인관계효율성, 정서조절, 고통감내"},
                    {"q": "EMDR의 치료과정을 설명하시오.", "a": "외상기억 처리, 안구운동, 재처리, 설치"},
                    {"q": "정신역동적 심리치료를 설명하시오.", "a": "무의식, 방어기제, 전이분석, 통찰"},
                    {"q": "가족치료의 접근을 설명하시오.", "a": "구조적, 전략적, 경험적, 해결중심 가족치료"}
                ]}
            ]}
        ]
    },
    {
        "id": "clinical-psychologist-2",
        "name": "임상심리사 2급",
        "icon": "🧠",
        "desc": "심리평가 및 치료 실무자",
        "subjects": [
            {"id": "abnormal-psychology", "name": "이상심리학", "topics": [
                {"id": "abnormal-basics", "name": "이상심리 기초", "questions": [
                    {"q": "이상행동의 정의기준을 설명하시오.", "a": "통계적, 주관적, 사회문화적, 기능적 기준"},
                    {"q": "불안장애의 원인을 설명하시오.", "a": "생물학적, 심리적(학습,인지), 사회적 요인"},
                    {"q": "기분장애의 유형을 설명하시오.", "a": "주요우울장애, 지속성우울장애, 양극성장애"},
                    {"q": "강박관련장애를 설명하시오.", "a": "강박장애, 신체변형장애, 저장장애, 발모광"},
                    {"q": "해리장애를 설명하시오.", "a": "해리성정체감장애, 해리성기억상실, 이인증"}
                ]}
            ]},
            {"id": "clinical-interview", "name": "임상면접", "topics": [
                {"id": "interview-basics", "name": "면접 기초", "questions": [
                    {"q": "초기면접의 목적을 설명하시오.", "a": "정보수집, 관계형성, 문제파악, 치료계획"},
                    {"q": "정신상태검사(MSE)의 영역을 설명하시오.", "a": "외모,행동,기분,사고,지각,인지,병식"},
                    {"q": "자살위험 평가면접을 설명하시오.", "a": "자살사고,계획,의도,수단,보호요인 평가"},
                    {"q": "사례개념화를 설명하시오.", "a": "문제목록, 가설, 발달력, 강점, 치료계획"},
                    {"q": "치료적 관계의 특성을 설명하시오.", "a": "전문성, 비밀보장, 경계, 신뢰, 협력"}
                ]}
            ]}
        ]
    },
    {
        "id": "counseling-psychologist-1",
        "name": "상담심리사 1급",
        "icon": "💬",
        "desc": "한국상담심리학회 1급",
        "subjects": [
            {"id": "advanced-counseling", "name": "상담이론 심화", "topics": [
                {"id": "integration", "name": "통합적 접근", "questions": [
                    {"q": "상담이론 통합의 유형을 설명하시오.", "a": "기술적 절충, 이론적 통합, 동화적 통합, 공통요인"},
                    {"q": "상담에서의 치료적 동맹을 설명하시오.", "a": "목표합의, 과제합의, 정서적 유대"},
                    {"q": "상담 효과 연구를 설명하시오.", "a": "효과성 연구, 효과 크기, 근거기반 실무"},
                    {"q": "다문화상담 역량을 설명하시오.", "a": "인식, 지식, 기술 3차원"},
                    {"q": "상담자 발달단계를 설명하시오.", "a": "초보-중급-숙련-전문가 단계별 특성"}
                ]}
            ]},
            {"id": "ethics-supervision", "name": "윤리 및 수퍼비전", "topics": [
                {"id": "counseling-ethics", "name": "상담윤리", "questions": [
                    {"q": "상담윤리의 원칙을 설명하시오.", "a": "자율성, 선행, 무해성, 정의, 충실성"},
                    {"q": "비밀보장의 예외를 설명하시오.", "a": "자타해 위험, 법적요구, 아동학대, 수퍼비전"},
                    {"q": "다중관계의 윤리적 문제를 설명하시오.", "a": "역할혼란, 객관성 상실, 착취위험"},
                    {"q": "윤리적 의사결정 모델을 설명하시오.", "a": "문제확인-관련규정-자문-대안탐색-결정-평가"},
                    {"q": "상담자 소진과 자기돌봄을 설명하시오.", "a": "소진 3요소, 예방전략, 자기돌봄 계획"}
                ]}
            ]}
        ]
    },
    {
        "id": "counseling-psychologist-2",
        "name": "상담심리사 2급",
        "icon": "💬",
        "desc": "한국상담심리학회 2급",
        "subjects": [
            {"id": "counseling-basics", "name": "상담심리학 기초", "topics": [
                {"id": "basic-theory", "name": "상담이론 기초", "questions": [
                    {"q": "정신분석의 발달을 설명하시오.", "a": "프로이트→자아심리학→대상관계→자기심리학"},
                    {"q": "행동주의 상담의 기법을 설명하시오.", "a": "체계적 둔감화, 혐오치료, 토큰경제, 모델링"},
                    {"q": "실존주의 상담의 주제를 설명하시오.", "a": "죽음, 자유, 고립, 무의미"},
                    {"q": "현실치료(선택이론)를 설명하시오.", "a": "5가지 욕구, 전행동, WDEP"},
                    {"q": "동기강화상담의 원리를 설명하시오.", "a": "공감표현, 불일치 유발, 저항수용, 자기효능감"}
                ]}
            ]},
            {"id": "counseling-practice", "name": "상담실습", "topics": [
                {"id": "basic-skills", "name": "기본기술", "questions": [
                    {"q": "적극적 경청의 요소를 설명하시오.", "a": "언어적/비언어적 반응, 반영, 요약, 명료화"},
                    {"q": "감정반영 기술을 설명하시오.", "a": "감정명명, 감정강도, 감정맥락 반영"},
                    {"q": "상담목표 설정 방법을 설명하시오.", "a": "구체적, 측정가능, 현실적, 내담자 합의"},
                    {"q": "상담기록 작성을 설명하시오.", "a": "SOAP형식, 축어록, 사례개념화"},
                    {"q": "상담 종결 다루기를 설명하시오.", "a": "종결시점, 성과정리, 추수상담 계획"}
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

export default function WelfareCategoryPage() {{
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
          <span className="text-6xl mb-4 block">🤝</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">사회복지사, 상담사, 보육교사 등 {len(CERTS)}개 자격증</p>
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
            <p className="text-gray-600">한국산업인력공단 또는 해당 학회/협회에서 시행하는 국가자격/민간자격 시험입니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">해당 자격증별 응시자격을 확인하세요. (학력, 경력, 실습시간 등)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {"".join([f"<li>{subj['name']}</li>" for subj in cert['subjects']])}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">각 과목 40점 이상, 전과목 평균 60점 이상 (일반적 기준)</p>
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
            prompt = f"{cert['name']} {subject['name']} 문제입니다.\\n\\n문제: {q['q']}\\n\\n다음 순서로 설명해주세요:\\n1. 핵심 개념 정리\\n2. 상세 설명\\n3. 적용 예시\\n4. 관련 이론\\n5. 연습문제 3개"
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
    base_dir = "C:/todo/today/자격시험/welfare"

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
