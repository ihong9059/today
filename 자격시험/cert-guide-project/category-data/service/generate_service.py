import os

# 카테고리 정보
CATEGORY = {
    "id": "service",
    "name": "서비스",
    "color1": "rose",
    "color2": "pink",
    "gradient": "from-rose-500 to-pink-500"
}

# 자격증 목록
CERTS = [
    {
        "id": "cook-korean",
        "name": "한식조리기능사",
        "icon": "🍚",
        "desc": "한식 조리 전문 자격증",
        "subjects": [
            {"id": "korean-theory", "name": "한식 조리이론", "topics": [
                {"id": "korean-basic", "name": "한식 기초", "questions": [
                    {"q": "한식의 특징을 설명하시오.", "a": "밥 중심, 발효식품 활용, 계절음식, 약식동원"},
                    {"q": "오미(五味)를 설명하시오.", "a": "단맛, 신맛, 짠맛, 쓴맛, 매운맛의 조화"},
                    {"q": "기본 양념의 종류를 설명하시오.", "a": "간장, 된장, 고추장, 소금, 설탕, 식초, 참기름"},
                    {"q": "육수의 종류를 설명하시오.", "a": "멸치육수, 다시마육수, 사골육수, 채수"},
                    {"q": "썰기의 종류를 설명하시오.", "a": "채썰기, 깍둑썰기, 어슷썰기, 다지기, 편썰기"}
                ]},
                {"id": "korean-cooking", "name": "한식 조리법", "questions": [
                    {"q": "밥 짓는 법을 설명하시오.", "a": "불림→밥물조절→끓이기→뜸들이기, 쌀:물=1:1.2"},
                    {"q": "국과 찌개의 차이를 설명하시오.", "a": "국은 맑고 건더기 적음, 찌개는 진하고 건더기 많음"},
                    {"q": "나물 무침의 기본을 설명하시오.", "a": "데치기→물기제거→양념무침, 참기름으로 마무리"},
                    {"q": "전 부치기 요령을 설명하시오.", "a": "밀가루→달걀물 순서, 중불에서 노릇하게"},
                    {"q": "김치 담그기 순서를 설명하시오.", "a": "절이기→씻기→양념소 넣기→숙성"}
                ]}
            ]},
            {"id": "food-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-basic", "name": "위생관리", "questions": [
                    {"q": "식중독의 종류를 설명하시오.", "a": "세균성(살모넬라,대장균), 바이러스성(노로), 화학성, 자연독"},
                    {"q": "손씻기 요령을 설명하시오.", "a": "흐르는물+비누, 30초 이상, 손가락 사이까지"},
                    {"q": "식재료 보관온도를 설명하시오.", "a": "냉장 0-5°C, 냉동 -18°C 이하, 상온보관 주의"},
                    {"q": "교차오염 방지를 설명하시오.", "a": "칼/도마 구분, 생것/익힌것 분리, 손씻기 철저"},
                    {"q": "HACCP의 개념을 설명하시오.", "a": "식품안전관리인증기준, 위해요소 중점관리"}
                ]}
            ]}
        ]
    },
    {
        "id": "cook-western",
        "name": "양식조리기능사",
        "icon": "🍝",
        "desc": "양식 조리 전문 자격증",
        "subjects": [
            {"id": "western-theory", "name": "양식 조리이론", "topics": [
                {"id": "western-basic", "name": "양식 기초", "questions": [
                    {"q": "5대 모체소스를 설명하시오.", "a": "베샤멜, 벨루테, 에스파뇰, 토마토, 홀란데이즈"},
                    {"q": "스톡의 종류를 설명하시오.", "a": "화이트스톡, 브라운스톡, 피쉬스톡, 채소스톡"},
                    {"q": "향신료의 종류를 설명하시오.", "a": "후추, 로즈마리, 타임, 바질, 오레가노, 파슬리"},
                    {"q": "조리용어 미르푸아를 설명하시오.", "a": "양파:당근:셀러리=2:1:1, 향미채소 조합"},
                    {"q": "루(Roux)의 종류를 설명하시오.", "a": "화이트루, 블론드루, 브라운루, 버터+밀가루"}
                ]},
                {"id": "western-cooking", "name": "양식 조리법", "questions": [
                    {"q": "스테이크 굽기를 설명하시오.", "a": "레어(52°C), 미디엄(60°C), 웰던(68°C 이상)"},
                    {"q": "파스타 삶는 법을 설명하시오.", "a": "물100:파스타10:소금1, 알덴테로 삶기"},
                    {"q": "수프의 종류를 설명하시오.", "a": "클리어수프, 크림수프, 퓨레수프, 비스크"},
                    {"q": "샐러드 드레싱을 설명하시오.", "a": "비네그렛, 마요네즈, 사우전아일랜드"},
                    {"q": "브레이징 조리법을 설명하시오.", "a": "갈색 내기→액체 추가→저온 장시간 조리"}
                ]}
            ]},
            {"id": "western-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-western", "name": "주방위생", "questions": [
                    {"q": "개인위생 관리를 설명하시오.", "a": "청결한 복장, 손씻기, 건강관리, 장신구 제거"},
                    {"q": "식재료 보관법을 설명하시오.", "a": "FIFO 원칙, 적정온도, 교차오염 방지"},
                    {"q": "해동방법을 설명하시오.", "a": "냉장해동, 유수해동, 전자레인지 해동"},
                    {"q": "주방청소 방법을 설명하시오.", "a": "작업 전후 청소, 소독, 해충방지"},
                    {"q": "온도관리의 중요성을 설명하시오.", "a": "위험온도대(5-60°C) 피하기, 신속 냉각"}
                ]}
            ]}
        ]
    },
    {
        "id": "cook-chinese",
        "name": "중식조리기능사",
        "icon": "🥡",
        "desc": "중식 조리 전문 자격증",
        "subjects": [
            {"id": "chinese-theory", "name": "중식 조리이론", "topics": [
                {"id": "chinese-basic", "name": "중식 기초", "questions": [
                    {"q": "중식의 4대 요리를 설명하시오.", "a": "산둥, 쓰촨, 광둥, 장쑤 요리"},
                    {"q": "중식 조리도구를 설명하시오.", "a": "웍, 중화팬, 국자, 뒤집개, 대나무찜통"},
                    {"q": "기본 조미료를 설명하시오.", "a": "간장, 굴소스, 두반장, 참기름, 화자오"},
                    {"q": "웍 관리법을 설명하시오.", "a": "길들이기, 사용 후 기름칠, 녹방지"},
                    {"q": "썰기 기법을 설명하시오.", "a": "사(絲), 편(片), 정(丁), 말(末)"}
                ]},
                {"id": "chinese-cooking", "name": "중식 조리법", "questions": [
                    {"q": "볶음요리 요령을 설명하시오.", "a": "강한 불, 빠른 조리, 웍헤이(워크 향)"},
                    {"q": "탕수육 만드는 법을 설명하시오.", "a": "고기 밑간→튀김옷→2번 튀기기→소스"},
                    {"q": "딤섬의 종류를 설명하시오.", "a": "샤오롱바오, 하가우, 시우마이, 춘권"},
                    {"q": "짜장면 조리법을 설명하시오.", "a": "춘장 볶기→야채 추가→면 삶기→비비기"},
                    {"q": "증기조리 요령을 설명하시오.", "a": "물 끓인 후 넣기, 뚜껑 열지 않기, 시간 준수"}
                ]}
            ]},
            {"id": "chinese-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-chinese", "name": "위생관리", "questions": [
                    {"q": "기름 관리법을 설명하시오.", "a": "적정온도 유지, 정기 교체, 찌꺼기 제거"},
                    {"q": "식재료 전처리를 설명하시오.", "a": "세척, 소독, 물기제거, 적정크기 손질"},
                    {"q": "해산물 취급법을 설명하시오.", "a": "신선도 확인, 저온보관, 빠른 조리"},
                    {"q": "튀김 안전수칙을 설명하시오.", "a": "물기제거, 적정온도, 과다투입 금지"},
                    {"q": "주방 화재예방을 설명하시오.", "a": "가스점검, 후드청소, 소화기 비치"}
                ]}
            ]}
        ]
    },
    {
        "id": "cook-japanese",
        "name": "일식조리기능사",
        "icon": "🍣",
        "desc": "일식 조리 전문 자격증",
        "subjects": [
            {"id": "japanese-theory", "name": "일식 조리이론", "topics": [
                {"id": "japanese-basic", "name": "일식 기초", "questions": [
                    {"q": "일식의 특징을 설명하시오.", "a": "제철재료, 담백한 맛, 시각적 아름다움, 소스 절제"},
                    {"q": "다시(出汁)의 종류를 설명하시오.", "a": "가쓰오부시, 다시마, 니보시, 표고버섯"},
                    {"q": "조미료 사시스세소를 설명하시오.", "a": "사케, 시오, 스, 세우유(간장), 소(된장)"},
                    {"q": "칼의 종류를 설명하시오.", "a": "데바, 사시미, 우스바, 나카리"},
                    {"q": "썰기 기법을 설명하시오.", "a": "소기리, 우스기리, 효시기리, 센기리"}
                ]},
                {"id": "japanese-cooking", "name": "일식 조리법", "questions": [
                    {"q": "초밥 만드는 법을 설명하시오.", "a": "밥 짓기→초 섞기→네타 올리기→쥐기"},
                    {"q": "생선회 뜨는 법을 설명하시오.", "a": "히라즈쿠리, 소기즈쿠리, 우스즈쿠리"},
                    {"q": "튀김(덴푸라)을 설명하시오.", "a": "얇은 튀김옷, 170-180°C, 바삭하게"},
                    {"q": "구이(야키모노)를 설명하시오.", "a": "시오야끼, 데리야끼, 미소야끼"},
                    {"q": "조림(니모노)을 설명하시오.", "a": "간장베이스, 감칠맛 중심, 졸여서 완성"}
                ]}
            ]},
            {"id": "japanese-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-japanese", "name": "위생관리", "questions": [
                    {"q": "생선 신선도 판별을 설명하시오.", "a": "눈 맑음, 아가미 선홍색, 탄력있는 살"},
                    {"q": "회 취급시 주의사항을 설명하시오.", "a": "저온유지, 교차오염 방지, 빠른 제공"},
                    {"q": "쌀 보관법을 설명하시오.", "a": "밀폐용기, 서늘한 곳, 습기 방지"},
                    {"q": "도마와 칼 관리를 설명하시오.", "a": "생선/채소 분리, 세척소독, 건조보관"},
                    {"q": "식초의 살균효과를 설명하시오.", "a": "pH 저하, 세균억제, 초밥에 활용"}
                ]}
            ]}
        ]
    },
    {
        "id": "cook-puffer",
        "name": "복어조리기능사",
        "icon": "🐡",
        "desc": "복어 조리 전문 자격증",
        "subjects": [
            {"id": "puffer-theory", "name": "복어 조리이론", "topics": [
                {"id": "puffer-basic", "name": "복어 기초", "questions": [
                    {"q": "복어의 독소를 설명하시오.", "a": "테트로도톡신, 신경마비, 해독제 없음"},
                    {"q": "독성 부위를 설명하시오.", "a": "난소, 간, 피부, 내장(종류별 상이)"},
                    {"q": "복어의 종류를 설명하시오.", "a": "자주복, 까치복, 흰점복, 검복 등"},
                    {"q": "법적 규정을 설명하시오.", "a": "복어조리기능사 자격 필수, 독성부위 폐기"},
                    {"q": "계절별 특성을 설명하시오.", "a": "겨울철 최고, 산란기(봄) 독성 강함"}
                ]},
                {"id": "puffer-cooking", "name": "복어 조리법", "questions": [
                    {"q": "복어 손질 순서를 설명하시오.", "a": "독성부위 제거→세척→포뜨기"},
                    {"q": "회 뜨는 법을 설명하시오.", "a": "얇게 저미기, 접시에 국화꽃 모양"},
                    {"q": "복어탕 조리법을 설명하시오.", "a": "뼈→살 순서, 맑은 육수, 미나리"},
                    {"q": "복어튀김을 설명하시오.", "a": "밑간→튀김옷→170°C 튀기기"},
                    {"q": "복어 지느러미술을 설명하시오.", "a": "지느러미 구워서 청주에 넣기"}
                ]}
            ]},
            {"id": "puffer-safety", "name": "안전관리", "topics": [
                {"id": "puffer-handling", "name": "취급안전", "questions": [
                    {"q": "중독 증상을 설명하시오.", "a": "입술 마비→사지 마비→호흡곤란"},
                    {"q": "응급처치를 설명하시오.", "a": "즉시 119, 인공호흡, 병원 이송"},
                    {"q": "독성부위 처리를 설명하시오.", "a": "별도 용기, 밀봉, 소각 또는 매립"},
                    {"q": "작업장 관리를 설명하시오.", "a": "전용 도마/칼, 세척 철저, 기록유지"},
                    {"q": "구입시 확인사항을 설명하시오.", "a": "허가업소, 종류 확인, 신선도 체크"}
                ]}
            ]}
        ]
    },
    {
        "id": "pastry",
        "name": "제과기능사",
        "icon": "🍰",
        "desc": "과자류 제조 전문 자격증",
        "subjects": [
            {"id": "pastry-theory", "name": "제과 이론", "topics": [
                {"id": "pastry-basic", "name": "제과 기초", "questions": [
                    {"q": "제과의 기본재료를 설명하시오.", "a": "밀가루, 설탕, 계란, 버터, 우유"},
                    {"q": "밀가루의 종류를 설명하시오.", "a": "강력분, 중력분, 박력분(글루텐 함량)"},
                    {"q": "팽창제의 종류를 설명하시오.", "a": "베이킹파우더, 베이킹소다, 이스트"},
                    {"q": "계란의 기능을 설명하시오.", "a": "유화, 기포형성, 응고, 색상부여"},
                    {"q": "유지의 역할을 설명하시오.", "a": "풍미, 부드러움, 층 형성, 보존성"}
                ]},
                {"id": "pastry-method", "name": "제과 제조법", "questions": [
                    {"q": "스펀지케이크 제법을 설명하시오.", "a": "계란 거품→밀가루 섞기→오븐 굽기"},
                    {"q": "쿠키 제조법을 설명하시오.", "a": "크리밍→계란→밀가루→성형→굽기"},
                    {"q": "파이 제조법을 설명하시오.", "a": "버터+밀가루→냉장휴지→밀기→굽기"},
                    {"q": "머랭의 종류를 설명하시오.", "a": "프렌치, 이탈리안, 스위스 머랭"},
                    {"q": "가나슈 만들기를 설명하시오.", "a": "초콜릿+생크림, 1:1 비율, 유화"}
                ]}
            ]},
            {"id": "pastry-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-pastry", "name": "위생관리", "questions": [
                    {"q": "생크림 보관법을 설명하시오.", "a": "냉장보관(4°C), 밀폐, 빠른 사용"},
                    {"q": "완제품 보관을 설명하시오.", "a": "종류별 적정온도, 습도관리, 유통기한"},
                    {"q": "작업장 위생을 설명하시오.", "a": "청결, 환기, 해충방지, 정리정돈"},
                    {"q": "개인위생 관리를 설명하시오.", "a": "손씻기, 위생복, 위생모, 건강관리"},
                    {"q": "알레르기 표시를 설명하시오.", "a": "계란, 우유, 밀, 땅콩 등 표시 의무"}
                ]}
            ]}
        ]
    },
    {
        "id": "bakery",
        "name": "제빵기능사",
        "icon": "🍞",
        "desc": "빵류 제조 전문 자격증",
        "subjects": [
            {"id": "bakery-theory", "name": "제빵 이론", "topics": [
                {"id": "bakery-basic", "name": "제빵 기초", "questions": [
                    {"q": "빵의 기본재료를 설명하시오.", "a": "밀가루, 이스트, 소금, 물"},
                    {"q": "이스트의 역할을 설명하시오.", "a": "발효, CO2 생성, 글루텐 발달, 풍미"},
                    {"q": "글루텐의 역할을 설명하시오.", "a": "빵의 구조형성, 가스 포집, 탄력"},
                    {"q": "발효 조건을 설명하시오.", "a": "온도(27-30°C), 습도(75-80%), 시간"},
                    {"q": "소금의 역할을 설명하시오.", "a": "맛, 글루텐 강화, 발효조절, 보존"}
                ]},
                {"id": "bakery-method", "name": "제빵 제조법", "questions": [
                    {"q": "직접반죽법을 설명하시오.", "a": "재료 한번에 믹싱, 단순, 시간 절약"},
                    {"q": "스펀지도우법을 설명하시오.", "a": "중종→본반죽, 풍미 좋음, 시간 소요"},
                    {"q": "성형 방법을 설명하시오.", "a": "둥글리기→중간발효→성형→팬닝"},
                    {"q": "굽기 과정을 설명하시오.", "a": "오븐스프링→껍질형성→마이야르반응"},
                    {"q": "냉각과 보관을 설명하시오.", "a": "1시간 냉각, 밀봉, 냉동보관"}
                ]}
            ]},
            {"id": "bakery-hygiene", "name": "식품위생", "topics": [
                {"id": "hygiene-bakery", "name": "위생관리", "questions": [
                    {"q": "이스트 보관법을 설명하시오.", "a": "생이스트(냉장), 드라이이스트(밀봉)"},
                    {"q": "밀가루 보관법을 설명하시오.", "a": "서늘/건조, 밀폐, 해충방지"},
                    {"q": "믹싱기 관리를 설명하시오.", "a": "사용 후 세척, 정기점검, 안전수칙"},
                    {"q": "발효실 관리를 설명하시오.", "a": "온습도 유지, 청결, 정기 소독"},
                    {"q": "오븐 관리를 설명하시오.", "a": "예열, 청소, 온도 확인, 안전점검"}
                ]}
            ]}
        ]
    },
    {
        "id": "beauty-general",
        "name": "미용사(일반)",
        "icon": "💇",
        "desc": "헤어 미용 전문 자격증",
        "subjects": [
            {"id": "hair-theory", "name": "헤어 이론", "topics": [
                {"id": "hair-basic", "name": "헤어 기초", "questions": [
                    {"q": "모발의 구조를 설명하시오.", "a": "모표피, 모피질, 모수질의 3층 구조"},
                    {"q": "모발의 생장주기를 설명하시오.", "a": "성장기(2-6년), 퇴행기(2주), 휴지기(3개월)"},
                    {"q": "두피의 유형을 설명하시오.", "a": "건성, 지성, 민감성, 비듬성"},
                    {"q": "샴푸의 원리를 설명하시오.", "a": "계면활성제가 오염물 유화/제거"},
                    {"q": "모발손상 원인을 설명하시오.", "a": "화학처리, 열, 자외선, 물리적 손상"}
                ]},
                {"id": "hair-cutting", "name": "커트 기법", "questions": [
                    {"q": "기본 커트 도구를 설명하시오.", "a": "커트가위, 틴닝가위, 레이저, 빗"},
                    {"q": "그라데이션 커트를 설명하시오.", "a": "위로 갈수록 길게, 무게감 있는 스타일"},
                    {"q": "레이어 커트를 설명하시오.", "a": "위로 갈수록 짧게, 움직임 있는 스타일"},
                    {"q": "원랭스 커트를 설명하시오.", "a": "일직선, 같은 길이, 무게선 강조"},
                    {"q": "스퀘어 커트를 설명하시오.", "a": "각진 형태, 라인 강조"}
                ]}
            ]},
            {"id": "hair-perm", "name": "펌/염색", "topics": [
                {"id": "perm-color", "name": "펌과 염색", "questions": [
                    {"q": "펌의 원리를 설명하시오.", "a": "환원→모발연화→산화→형태고정"},
                    {"q": "콜드펌과 열펌을 설명하시오.", "a": "콜드(상온), 열펌(열로 강한 컬)"},
                    {"q": "염색의 원리를 설명하시오.", "a": "산화제→모표피 열림→색소 침투"},
                    {"q": "탈색과 염색 차이를 설명하시오.", "a": "탈색(멜라닌 분해), 염색(색소 첨가)"},
                    {"q": "패치테스트를 설명하시오.", "a": "알레르기 확인, 48시간 전 피부테스트"}
                ]}
            ]}
        ]
    },
    {
        "id": "beauty-skin",
        "name": "미용사(피부)",
        "icon": "✨",
        "desc": "피부 미용 전문 자격증",
        "subjects": [
            {"id": "skin-theory", "name": "피부 이론", "topics": [
                {"id": "skin-basic", "name": "피부 기초", "questions": [
                    {"q": "피부의 구조를 설명하시오.", "a": "표피, 진피, 피하조직의 3층 구조"},
                    {"q": "피부 유형을 설명하시오.", "a": "건성, 지성, 중성, 복합성, 민감성"},
                    {"q": "피부의 기능을 설명하시오.", "a": "보호, 체온조절, 분비, 감각, 흡수"},
                    {"q": "피부 노화 원인을 설명하시오.", "a": "자연노화, 광노화, 활성산소"},
                    {"q": "피부 트러블 원인을 설명하시오.", "a": "호르몬, 스트레스, 세균, 환경"}
                ]},
                {"id": "skin-care", "name": "피부관리", "questions": [
                    {"q": "클렌징 방법을 설명하시오.", "a": "1차(유성)→2차(수성) 더블클렌징"},
                    {"q": "딥클렌징을 설명하시오.", "a": "각질제거, 모공관리, 스크럽/필링"},
                    {"q": "마사지 효과를 설명하시오.", "a": "혈액순환, 림프순환, 이완, 영양공급"},
                    {"q": "팩의 종류를 설명하시오.", "a": "모델링팩, 시트팩, 워시오프팩"},
                    {"q": "기기관리를 설명하시오.", "a": "갈바닉, 고주파, 초음파, LED"}
                ]}
            ]},
            {"id": "skin-hygiene", "name": "위생관리", "topics": [
                {"id": "hygiene-skin", "name": "위생수칙", "questions": [
                    {"q": "소독의 종류를 설명하시오.", "a": "자비소독, 자외선소독, 화학소독"},
                    {"q": "일회용품 관리를 설명하시오.", "a": "1회 사용 폐기, 재사용 금지"},
                    {"q": "화장품 보관을 설명하시오.", "a": "직사광선 피함, 서늘한 곳, 밀폐"},
                    {"q": "감염예방을 설명하시오.", "a": "손소독, 도구소독, 청결유지"},
                    {"q": "개인위생을 설명하시오.", "a": "청결한 복장, 손톱정리, 건강관리"}
                ]}
            ]}
        ]
    },
    {
        "id": "beauty-nail",
        "name": "미용사(네일)",
        "icon": "💅",
        "desc": "네일 미용 전문 자격증",
        "subjects": [
            {"id": "nail-theory", "name": "네일 이론", "topics": [
                {"id": "nail-basic", "name": "네일 기초", "questions": [
                    {"q": "손톱의 구조를 설명하시오.", "a": "네일플레이트, 큐티클, 네일베드, 매트릭스"},
                    {"q": "손톱의 성장속도를 설명하시오.", "a": "하루 0.1mm, 완전성장 4-6개월"},
                    {"q": "손톱 건강 판단을 설명하시오.", "a": "색상, 모양, 두께, 표면상태"},
                    {"q": "네일 도구를 설명하시오.", "a": "파일, 푸셔, 니퍼, 폴리셔"},
                    {"q": "손톱 질환을 설명하시오.", "a": "무좀, 조갑박리증, 조주위염"}
                ]},
                {"id": "nail-art", "name": "네일 아트", "questions": [
                    {"q": "매니큐어 시술을 설명하시오.", "a": "모양잡기→큐티클정리→베이스→폴리시→탑"},
                    {"q": "젤네일 시술을 설명하시오.", "a": "샌딩→베이스젤→컬러→탑젤→경화"},
                    {"q": "아크릴 네일을 설명하시오.", "a": "모노머+파우더, 연장/보강용"},
                    {"q": "네일 아트 기법을 설명하시오.", "a": "마블, 프렌치, 그라데이션, 스톤"},
                    {"q": "네일 제거법을 설명하시오.", "a": "아세톤+호일랩, 소킹오프"}
                ]}
            ]},
            {"id": "nail-hygiene", "name": "위생관리", "topics": [
                {"id": "hygiene-nail", "name": "위생수칙", "questions": [
                    {"q": "도구 소독을 설명하시오.", "a": "알코올, 자외선, 고압증기 소독"},
                    {"q": "작업환경 관리를 설명하시오.", "a": "환기, 분진관리, 조명"},
                    {"q": "화학물질 안전을 설명하시오.", "a": "아세톤, 프라이머 취급주의"},
                    {"q": "피부 보호를 설명하시오.", "a": "장갑착용, 피부접촉 최소화"},
                    {"q": "고객 위생을 설명하시오.", "a": "손소독, 일회용품, 도구소독"}
                ]}
            ]}
        ]
    },
    {
        "id": "beauty-makeup",
        "name": "미용사(메이크업)",
        "icon": "💄",
        "desc": "메이크업 전문 자격증",
        "subjects": [
            {"id": "makeup-theory", "name": "메이크업 이론", "topics": [
                {"id": "makeup-basic", "name": "메이크업 기초", "questions": [
                    {"q": "메이크업 도구를 설명하시오.", "a": "브러시, 스펀지, 퍼프, 아이래시컬러"},
                    {"q": "피부톤 분석을 설명하시오.", "a": "웜톤, 쿨톤, 뉴트럴"},
                    {"q": "얼굴형 분석을 설명하시오.", "a": "타원형, 둥근형, 각진형, 긴형"},
                    {"q": "베이스 메이크업을 설명하시오.", "a": "프라이머→파운데이션→컨실러→파우더"},
                    {"q": "색조 화장품을 설명하시오.", "a": "아이섀도, 블러셔, 립스틱, 마스카라"}
                ]},
                {"id": "makeup-technique", "name": "메이크업 기법", "questions": [
                    {"q": "컨투어링을 설명하시오.", "a": "명암으로 얼굴형 보정, 쉐딩+하이라이트"},
                    {"q": "아이 메이크업을 설명하시오.", "a": "섀도→라이너→마스카라→눈썹"},
                    {"q": "립 메이크업을 설명하시오.", "a": "립라이너→립스틱→글로스"},
                    {"q": "웨딩 메이크업을 설명하시오.", "a": "화사함, 지속력, 사진발 고려"},
                    {"q": "무대 메이크업을 설명하시오.", "a": "강조, 진한 색상, 조명 고려"}
                ]}
            ]},
            {"id": "makeup-hygiene", "name": "위생관리", "topics": [
                {"id": "hygiene-makeup", "name": "위생수칙", "questions": [
                    {"q": "브러시 관리를 설명하시오.", "a": "세척, 건조, 정기 교체"},
                    {"q": "화장품 위생을 설명하시오.", "a": "스패츌라 사용, 직접접촉 피함"},
                    {"q": "일회용품 관리를 설명하시오.", "a": "마스카라봉, 립글로스팁, 스펀지"},
                    {"q": "피부트러블 대응을 설명하시오.", "a": "알레르기 확인, 청결유지"},
                    {"q": "도구 보관을 설명하시오.", "a": "건조한 곳, 파우치, 정리"}
                ]}
            ]}
        ]
    },
    {
        "id": "barber",
        "name": "이용사",
        "icon": "💈",
        "desc": "이발 및 면도 전문 자격증",
        "subjects": [
            {"id": "barber-theory", "name": "이용 이론", "topics": [
                {"id": "barber-basic", "name": "이용 기초", "questions": [
                    {"q": "이용업의 정의를 설명하시오.", "a": "손님의 두발, 수염을 깎거나 다듬는 영업"},
                    {"q": "기본 도구를 설명하시오.", "a": "가위, 빗, 클리퍼, 면도기"},
                    {"q": "두부의 구분을 설명하시오.", "a": "전두부, 두정부, 측두부, 후두부"},
                    {"q": "모발의 특성을 설명하시오.", "a": "굵기, 밀도, 형태(직모/곱슬)"},
                    {"q": "고객상담을 설명하시오.", "a": "스타일 확인, 두상/모질 파악"}
                ]},
                {"id": "barber-cutting", "name": "커트 기법", "questions": [
                    {"q": "클리퍼 사용법을 설명하시오.", "a": "가드 선택, 아래→위로, 균일하게"},
                    {"q": "가위 커트법을 설명하시오.", "a": "빗으로 들어 자르기, 각도 조절"},
                    {"q": "그라데이션을 설명하시오.", "a": "아래는 짧게, 위로 갈수록 길게"},
                    {"q": "레이저 커트를 설명하시오.", "a": "가위 대신 레이저, 질감 표현"},
                    {"q": "마무리 정리를 설명하시오.", "a": "라인정리, 잔머리제거, 스타일링"}
                ]}
            ]},
            {"id": "barber-shave", "name": "면도", "topics": [
                {"id": "shave-technique", "name": "면도 기법", "questions": [
                    {"q": "면도 준비를 설명하시오.", "a": "스팀타월, 쉐이빙폼, 피부연화"},
                    {"q": "면도 방향을 설명하시오.", "a": "결 방향으로, 피부 당기며"},
                    {"q": "면도기 관리를 설명하시오.", "a": "날 교체, 소독, 건조보관"},
                    {"q": "면도 후 관리를 설명하시오.", "a": "애프터쉐이브, 보습, 진정"},
                    {"q": "면도 트러블 대처를 설명하시오.", "a": "상처시 지혈, 염증예방"}
                ]}
            ]}
        ]
    },
    {
        "id": "tour-guide",
        "name": "관광통역안내사",
        "icon": "🗺️",
        "desc": "외국인 관광안내 전문 자격증",
        "subjects": [
            {"id": "tour-law", "name": "관광법규", "topics": [
                {"id": "tourism-law", "name": "관광기본법", "questions": [
                    {"q": "관광기본법의 목적을 설명하시오.", "a": "관광진흥, 국민경제발전, 국민복지향상"},
                    {"q": "관광사업의 종류를 설명하시오.", "a": "여행업, 관광숙박업, 관광객이용시설업"},
                    {"q": "관광통역안내사 업무를 설명하시오.", "a": "외국인 대상 관광안내, 통역"},
                    {"q": "자격 취소사유를 설명하시오.", "a": "부정행위, 자격증 대여, 법령위반"},
                    {"q": "관광진흥개발기금을 설명하시오.", "a": "관광시설 지원, 홍보, 인력양성"}
                ]},
                {"id": "guide-ethics", "name": "직업윤리", "questions": [
                    {"q": "안내사의 자세를 설명하시오.", "a": "친절, 정확, 안전, 문화존중"},
                    {"q": "고객응대 요령을 설명하시오.", "a": "경청, 명확한 설명, 불만처리"},
                    {"q": "안전관리를 설명하시오.", "a": "인원파악, 응급상황대비, 보험"},
                    {"q": "문화차이 대응을 설명하시오.", "a": "문화존중, 편견없는 태도, 배려"},
                    {"q": "비밀유지의무를 설명하시오.", "a": "개인정보보호, 업무상비밀"}
                ]}
            ]},
            {"id": "korean-history", "name": "국사", "topics": [
                {"id": "history-basic", "name": "한국사 개요", "questions": [
                    {"q": "한국의 건국신화를 설명하시오.", "a": "단군신화, 고조선 건국(BC 2333)"},
                    {"q": "삼국시대를 설명하시오.", "a": "고구려, 백제, 신라의 정립과 발전"},
                    {"q": "고려의 특징을 설명하시오.", "a": "불교국가, 과거제, 금속활자"},
                    {"q": "조선의 특징을 설명하시오.", "a": "유교국가, 한글창제, 양반제도"},
                    {"q": "근현대사를 설명하시오.", "a": "일제강점기, 광복, 분단, 발전"}
                ]}
            ]},
            {"id": "korean-culture", "name": "한국문화", "topics": [
                {"id": "culture-heritage", "name": "문화유산", "questions": [
                    {"q": "유네스코 세계유산을 설명하시오.", "a": "경복궁, 창덕궁, 불국사, 석굴암 등"},
                    {"q": "한국의 전통음식을 설명하시오.", "a": "김치, 불고기, 비빔밥, 한정식"},
                    {"q": "전통예술을 설명하시오.", "a": "판소리, 탈춤, 사물놀이, 한복"},
                    {"q": "한국의 명절을 설명하시오.", "a": "설날, 추석, 정월대보름, 단오"},
                    {"q": "현대 한류를 설명하시오.", "a": "K-POP, 드라마, 영화, 음식한류"}
                ]}
            ]}
        ]
    },
    {
        "id": "hotel-manager",
        "name": "호텔경영사",
        "icon": "🏨",
        "desc": "호텔 운영 관리 전문 자격증",
        "subjects": [
            {"id": "hotel-theory", "name": "호텔경영론", "topics": [
                {"id": "hotel-basic", "name": "호텔경영 기초", "questions": [
                    {"q": "호텔의 분류를 설명하시오.", "a": "등급별(1-5성급), 형태별(리조트,비즈니스)"},
                    {"q": "호텔 조직구조를 설명하시오.", "a": "객실부, 식음료부, 판촉부, 관리부"},
                    {"q": "객실관리를 설명하시오.", "a": "예약, 체크인/아웃, 하우스키핑"},
                    {"q": "식음료 관리를 설명하시오.", "a": "레스토랑, 바, 연회, 룸서비스"},
                    {"q": "수익관리를 설명하시오.", "a": "객실가격전략, 점유율, RevPAR"}
                ]},
                {"id": "hotel-service", "name": "호텔서비스", "questions": [
                    {"q": "고객서비스를 설명하시오.", "a": "고객만족, 불만처리, 충성도관리"},
                    {"q": "프론트 업무를 설명하시오.", "a": "리셉션, 컨시어지, 벨서비스"},
                    {"q": "하우스키핑을 설명하시오.", "a": "객실청소, 린넨관리, 미니바"},
                    {"q": "식음료 서비스를 설명하시오.", "a": "테이블서비스, 와인서비스"},
                    {"q": "연회 서비스를 설명하시오.", "a": "행사기획, 세팅, 진행, 정산"}
                ]}
            ]},
            {"id": "hotel-marketing", "name": "호텔마케팅", "topics": [
                {"id": "marketing-basic", "name": "마케팅 기초", "questions": [
                    {"q": "호텔 마케팅믹스를 설명하시오.", "a": "상품, 가격, 유통, 촉진(4P)"},
                    {"q": "온라인 마케팅을 설명하시오.", "a": "OTA, 자사홈페이지, SNS마케팅"},
                    {"q": "고객관계관리를 설명하시오.", "a": "CRM, 멤버십, 고객데이터 활용"},
                    {"q": "브랜드 관리를 설명하시오.", "a": "브랜드 이미지, 포지셔닝, 차별화"},
                    {"q": "경쟁분석을 설명하시오.", "a": "SWOT, 벤치마킹, 시장조사"}
                ]}
            ]}
        ]
    },
    {
        "id": "hotel-service",
        "name": "호텔관리사",
        "icon": "🛎️",
        "desc": "호텔 실무 관리 전문 자격증",
        "subjects": [
            {"id": "hotel-ops", "name": "호텔실무", "topics": [
                {"id": "room-ops", "name": "객실관리", "questions": [
                    {"q": "예약시스템을 설명하시오.", "a": "PMS, 채널매니저, 오버부킹 관리"},
                    {"q": "체크인 절차를 설명하시오.", "a": "신분확인→룸배정→키발급→안내"},
                    {"q": "체크아웃 절차를 설명하시오.", "a": "미니바체크→정산→영수증→배웅"},
                    {"q": "객실등급을 설명하시오.", "a": "스탠다드, 디럭스, 스위트, 펜트하우스"},
                    {"q": "컴플레인 처리를 설명하시오.", "a": "경청→사과→해결→보상→피드백"}
                ]},
                {"id": "facility-ops", "name": "시설관리", "questions": [
                    {"q": "에너지 관리를 설명하시오.", "a": "전기/가스/수도 절감, 친환경"},
                    {"q": "안전관리를 설명하시오.", "a": "소방, 보안, 비상대피, CCTV"},
                    {"q": "청결관리를 설명하시오.", "a": "청소표준, 점검체크, 해충방제"},
                    {"q": "비품관리를 설명하시오.", "a": "재고관리, 구매, 폐기, 자산관리"},
                    {"q": "유지보수를 설명하시오.", "a": "정기점검, 수리, 리모델링 계획"}
                ]}
            ]},
            {"id": "hotel-fb", "name": "식음료관리", "topics": [
                {"id": "fb-ops", "name": "식음료 운영", "questions": [
                    {"q": "레스토랑 유형을 설명하시오.", "a": "파인다이닝, 캐주얼, 뷔페, 커피숍"},
                    {"q": "메뉴 계획을 설명하시오.", "a": "원가분석, 인기도, 계절메뉴"},
                    {"q": "주장관리를 설명하시오.", "a": "와인리스트, 재고, 온도관리"},
                    {"q": "위생관리를 설명하시오.", "a": "HACCP, 식재료관리, 조리위생"},
                    {"q": "원가관리를 설명하시오.", "a": "식자재비율, 손익분기, 가격결정"}
                ]}
            ]}
        ]
    },
    {
        "id": "convention-planner-1",
        "name": "컨벤션기획사1급",
        "icon": "🎪",
        "desc": "국제회의 기획 전문 자격증",
        "subjects": [
            {"id": "convention-theory", "name": "컨벤션 이론", "topics": [
                {"id": "convention-basic", "name": "컨벤션 기초", "questions": [
                    {"q": "컨벤션의 정의를 설명하시오.", "a": "회의, 전시, 이벤트, 인센티브의 복합 산업"},
                    {"q": "MICE 산업을 설명하시오.", "a": "Meeting, Incentive, Convention, Exhibition"},
                    {"q": "컨벤션 시설을 설명하시오.", "a": "컨벤션센터, 호텔, 전시장, 유니크베뉴"},
                    {"q": "PCO의 역할을 설명하시오.", "a": "Professional Congress Organizer, 전문기획"},
                    {"q": "국제기구 회의를 설명하시오.", "a": "UN, APEC, G20 등 정부간 회의"}
                ]},
                {"id": "convention-planning", "name": "컨벤션 기획", "questions": [
                    {"q": "기획 프로세스를 설명하시오.", "a": "유치→기획→운영→평가"},
                    {"q": "예산 수립을 설명하시오.", "a": "수입(등록비,후원)→지출(장소,인력)"},
                    {"q": "프로그램 구성을 설명하시오.", "a": "기조연설, 세션, 네트워킹, 관광"},
                    {"q": "연사 관리를 설명하시오.", "a": "섭외, 계약, 발표자료, 의전"},
                    {"q": "후원 유치를 설명하시오.", "a": "스폰서십 제안, 등급별 혜택"}
                ]}
            ]},
            {"id": "convention-ops", "name": "컨벤션 운영", "topics": [
                {"id": "event-ops", "name": "행사운영", "questions": [
                    {"q": "등록 시스템을 설명하시오.", "a": "온라인등록, 현장등록, 네임택"},
                    {"q": "세션 운영을 설명하시오.", "a": "타임키핑, 동시통역, 장비관리"},
                    {"q": "의전을 설명하시오.", "a": "VIP관리, 서열, 의전차량, 수행"},
                    {"q": "전시 운영을 설명하시오.", "a": "부스배치, 참가업체관리, 철수"},
                    {"q": "평가와 보고를 설명하시오.", "a": "만족도조사, 성과분석, 최종보고"}
                ]}
            ]}
        ]
    },
    {
        "id": "convention-planner-2",
        "name": "컨벤션기획사2급",
        "icon": "📋",
        "desc": "국제회의 실무 자격증",
        "subjects": [
            {"id": "convention-basic-2", "name": "컨벤션 기초", "topics": [
                {"id": "mice-intro", "name": "MICE 개론", "questions": [
                    {"q": "MICE 산업의 효과를 설명하시오.", "a": "경제효과, 고용창출, 국가이미지 제고"},
                    {"q": "회의 유형을 설명하시오.", "a": "총회, 학술대회, 세미나, 워크숍"},
                    {"q": "인센티브 투어를 설명하시오.", "a": "포상관광, 기업보상여행"},
                    {"q": "전시회 유형을 설명하시오.", "a": "무역전시, 소비자전시, 박람회"},
                    {"q": "이벤트 유형을 설명하시오.", "a": "기업행사, 문화행사, 스포츠행사"}
                ]},
                {"id": "convention-process", "name": "기획 프로세스", "questions": [
                    {"q": "RFP 분석을 설명하시오.", "a": "Request for Proposal, 요청서 검토"},
                    {"q": "답사를 설명하시오.", "a": "장소답사, 시설확인, 동선체크"},
                    {"q": "계약체결을 설명하시오.", "a": "장소, 용역, 인력, 보험계약"},
                    {"q": "리허설을 설명하시오.", "a": "사전 진행연습, 장비테스트"},
                    {"q": "정산을 설명하시오.", "a": "수입지출 정리, 결산, 보고"}
                ]}
            ]},
            {"id": "convention-practice", "name": "실무지식", "topics": [
                {"id": "practice-basic", "name": "실무 기초", "questions": [
                    {"q": "장소 섭외를 설명하시오.", "a": "장소조건, 비용, 접근성, 편의시설"},
                    {"q": "케이터링을 설명하시오.", "a": "식음료 공급, 메뉴구성, 서비스"},
                    {"q": "인쇄물 관리를 설명하시오.", "a": "초대장, 프로그램북, 네임택"},
                    {"q": "숙박 관리를 설명하시오.", "a": "호텔블록, 룸배정, 입출금"},
                    {"q": "운송 관리를 설명하시오.", "a": "공항픽업, 셔틀버스, 의전차량"}
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

export default function ServiceCategoryPage() {{
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
          <span className="text-6xl mb-4 block">🍳</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">조리, 미용, 관광, 호텔 분야 자격증 {len(CERTS)}개</p>
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
            <p className="text-gray-600">한국산업인력공단 Q-Net에서 시행하는 국가기술자격시험입니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">제한 없음 (일부 자격증은 관련 경력/학력 필요)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {"".join([f"<li>{subj['name']}</li>" for subj in cert['subjects']])}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">필기: 과목당 40점 이상, 전체 평균 60점 이상 / 실기: 60점 이상</p>
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
    base_dir = "C:/todo/today/자격시험/service"

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
