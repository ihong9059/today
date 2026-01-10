import os

# 카테고리 정보
CATEGORY = {
    "id": "driving",
    "name": "운전·조종",
    "color1": "gray",
    "color2": "slate",
    "gradient": "from-gray-500 to-slate-600"
}

# 자격증 목록
CERTS = [
    {
        "id": "driver-license-1-normal",
        "name": "1종 보통면허",
        "icon": "🚗",
        "desc": "승용차, 승합차(15인 이하), 화물차(12톤 미만)",
        "subjects": [
            {"id": "traffic-law", "name": "도로교통법규", "topics": [
                {"id": "traffic-signal", "name": "교통신호 및 표지", "questions": [
                    {"q": "신호등의 황색등화 의미를 설명하시오.", "a": "정지선 직전 정지, 이미 진입한 차량은 신속히 통과"},
                    {"q": "안전표지의 종류를 설명하시오.", "a": "주의표지(황색), 규제표지(적색), 지시표지(청색), 보조표지"},
                    {"q": "중앙선 종류와 의미를 설명하시오.", "a": "황색실선(침범금지), 황색점선(침범가능), 복선(상황별)"},
                    {"q": "노면표시의 종류를 설명하시오.", "a": "규제표시(정지선,횡단보도), 지시표시(유도선), 경고표시"},
                    {"q": "일시정지 표지판의 의미를 설명하시오.", "a": "정지선 직전 일시정지 후 안전확인, 위반시 범칙금 부과"}
                ]},
                {"id": "driving-rules", "name": "운전규칙", "questions": [
                    {"q": "앞지르기 금지장소를 설명하시오.", "a": "교차로, 터널, 다리위, 도로모퉁이, 비탈길 고갯마루"},
                    {"q": "우선순위 규칙을 설명하시오.", "a": "긴급차>일반차, 선진입차>후진입차, 넓은도로>좁은도로"},
                    {"q": "제한속도 규정을 설명하시오.", "a": "일반도로 60km/h, 고속도로 100-120km/h, 주거지역 30km/h"},
                    {"q": "음주운전 기준을 설명하시오.", "a": "혈중알코올 0.03% 이상 처벌, 0.08% 이상 면허취소"},
                    {"q": "안전거리 확보 규정을 설명하시오.", "a": "앞차 급정차시 충돌방지 거리, 속도/노면상태 고려"}
                ]}
            ]},
            {"id": "safe-driving", "name": "안전운전", "topics": [
                {"id": "defensive-driving", "name": "방어운전", "questions": [
                    {"q": "방어운전의 개념을 설명하시오.", "a": "상대방 과실 예측, 사고 미연 방지, 양보운전"},
                    {"q": "야간운전 주의사항을 설명하시오.", "a": "전조등 사용, 속도감소, 시야제한 인지, 피로운전 금지"},
                    {"q": "악천후 운전요령을 설명하시오.", "a": "감속운전, 안전거리 확보, 급브레이크 금지, 시야확보"},
                    {"q": "고속도로 안전운전을 설명하시오.", "a": "차로준수, 졸음쉼터 활용, 고장시 갓길정차/삼각대설치"},
                    {"q": "교차로 통행방법을 설명하시오.", "a": "서행진입, 신호준수, 보행자 우선, 우회전시 일시정지"}
                ]},
                {"id": "emergency", "name": "긴급상황대처", "questions": [
                    {"q": "브레이크 고장시 대처방법을 설명하시오.", "a": "엔진브레이크, 핸드브레이크, 기어다운, 가드레일 이용"},
                    {"q": "타이어 펑크시 대처를 설명하시오.", "a": "핸들 고정, 서서히 감속, 갓길 정차, 비상등 점등"},
                    {"q": "교통사고 발생시 조치를 설명하시오.", "a": "부상자 구호, 경찰신고(112), 현장보존, 보험사 연락"},
                    {"q": "화재발생시 대처를 설명하시오.", "a": "정차, 탑승자 대피, 소화기 사용, 119 신고"},
                    {"q": "침수도로 통행요령을 설명하시오.", "a": "수심확인, 저단기어 사용, 정차금지, 통행금지시 우회"}
                ]}
            ]},
            {"id": "vehicle-structure", "name": "자동차 구조", "topics": [
                {"id": "engine-system", "name": "엔진 및 동력계통", "questions": [
                    {"q": "4행정 사이클을 설명하시오.", "a": "흡입-압축-폭발-배기, 크랭크축 2회전에 1회 폭발"},
                    {"q": "냉각장치의 구성을 설명하시오.", "a": "라디에이터, 냉각수, 워터펌프, 서모스탯, 냉각팬"},
                    {"q": "윤활장치의 역할을 설명하시오.", "a": "마찰감소, 냉각, 밀봉, 청정, 방청작용"},
                    {"q": "변속기의 종류를 설명하시오.", "a": "수동(MT), 자동(AT), 무단(CVT), 듀얼클러치(DCT)"},
                    {"q": "배기장치의 구성을 설명하시오.", "a": "배기다기관, 촉매변환기, 소음기, 배기관"}
                ]},
                {"id": "brake-steering", "name": "제동/조향장치", "questions": [
                    {"q": "유압브레이크 원리를 설명하시오.", "a": "파스칼 원리, 마스터실린더-휠실린더 연결, 배력장치"},
                    {"q": "ABS의 기능을 설명하시오.", "a": "급제동시 바퀴잠김 방지, 조향력 유지, ECU 제어"},
                    {"q": "조향장치의 구성을 설명하시오.", "a": "핸들, 조향축, 기어박스, 타이로드, 너클"},
                    {"q": "타이어 공기압 관리를 설명하시오.", "a": "적정압력 유지, 월1회 점검, 편마모 방지, 연비향상"},
                    {"q": "현가장치의 역할을 설명하시오.", "a": "충격흡수, 승차감 향상, 타이어 접지력 유지"}
                ]}
            ]}
        ]
    },
    {
        "id": "driver-license-2-normal",
        "name": "2종 보통면허",
        "icon": "🚙",
        "desc": "승용차, 승합차(10인 이하), 화물차(4톤 이하)",
        "subjects": [
            {"id": "traffic-law-2", "name": "도로교통법규", "topics": [
                {"id": "basic-rules", "name": "기본교통규칙", "questions": [
                    {"q": "도로교통법의 목적을 설명하시오.", "a": "교통안전과 원활한 소통, 사고예방, 피해경감"},
                    {"q": "운전면허 종류를 설명하시오.", "a": "1종(대형/보통/소형/특수), 2종(보통/소형/원동기)"},
                    {"q": "면허취소 사유를 설명하시오.", "a": "음주운전, 뺑소니, 무면허운전 방조, 벌점초과"},
                    {"q": "어린이보호구역 규정을 설명하시오.", "a": "30km/h 이하, 주정차금지, 사고시 가중처벌"},
                    {"q": "보행자 보호의무를 설명하시오.", "a": "횡단보도 앞 일시정지, 보행자 우선, 안전거리 확보"}
                ]}
            ]},
            {"id": "safe-driving-2", "name": "안전운전", "topics": [
                {"id": "basic-driving", "name": "기본운전", "questions": [
                    {"q": "올바른 운전자세를 설명하시오.", "a": "시트/미러 조절, 안전벨트 착용, 핸들 9시3시 위치"},
                    {"q": "차로변경 방법을 설명하시오.", "a": "3초전 방향지시등, 사이드미러 확인, 사각지대 확인"},
                    {"q": "주차방법을 설명하시오.", "a": "평행주차, 직각주차, 경사지 주차시 바퀴방향"},
                    {"q": "후진운전 요령을 설명하시오.", "a": "후방확인, 서행, 장애물 주의, 후방카메라 활용"},
                    {"q": "회전교차로 통행방법을 설명하시오.", "a": "진입시 양보, 시계방향 회전, 우측깜빡이로 진출"}
                ]}
            ]}
        ]
    },
    {
        "id": "driver-license-1-large",
        "name": "1종 대형면허",
        "icon": "🚛",
        "desc": "승합차(16인 이상), 화물차(12톤 이상), 건설기계",
        "subjects": [
            {"id": "large-vehicle-law", "name": "대형차량 법규", "topics": [
                {"id": "large-rules", "name": "대형차 운행규정", "questions": [
                    {"q": "대형차 운행제한 규정을 설명하시오.", "a": "총중량/축중량 제한, 적재중량 초과금지, 과적시 처벌"},
                    {"q": "대형차 속도제한을 설명하시오.", "a": "고속도로 90km/h, 일반도로 60km/h, 화물차 차로제한"},
                    {"q": "운행기록장치(DTG) 규정을 설명하시오.", "a": "속도/위치/운행시간 기록, 사업용 차량 의무장착"},
                    {"q": "화물적재 규정을 설명하시오.", "a": "적재함 초과금지, 위험물표시, 덮개설치, 낙하물 방지"},
                    {"q": "대형차 주정차 규정을 설명하시오.", "a": "지정장소 외 주차금지, 차고지증명제, 도심진입제한"}
                ]}
            ]},
            {"id": "large-driving", "name": "대형차 운전", "topics": [
                {"id": "large-technique", "name": "대형차 운전기술", "questions": [
                    {"q": "대형차 사각지대를 설명하시오.", "a": "전방/후방/측면 사각지대, 우회전시 내륜차 주의"},
                    {"q": "내륜차와 외륜차를 설명하시오.", "a": "회전시 안쪽바퀴가 안쪽으로, 바깥바퀴가 바깥으로"},
                    {"q": "대형차 제동거리 특성을 설명하시오.", "a": "공차/적재시 차이, 에어브레이크 특성, 페이드 현상"},
                    {"q": "언덕길 운전요령을 설명하시오.", "a": "저단기어, 배기브레이크 활용, 반클러치 금지"},
                    {"q": "대형차 후진 요령을 설명하시오.", "a": "유도자 활용, 사이드미러 확인, 서행, 경음기 사용"}
                ]}
            ]}
        ]
    },
    {
        "id": "driver-license-1-special",
        "name": "1종 특수면허",
        "icon": "🚜",
        "desc": "트레일러, 레커, 특수작업차량",
        "subjects": [
            {"id": "special-vehicle", "name": "특수차량 운전", "topics": [
                {"id": "trailer", "name": "트레일러 운전", "questions": [
                    {"q": "트레일러의 구조를 설명하시오.", "a": "트랙터+세미트레일러, 연결장치(킹핀/커플러), 에어라인"},
                    {"q": "트레일러 후진 특성을 설명하시오.", "a": "핸들 반대방향 조작, 잭나이프 현상 주의"},
                    {"q": "트레일러 연결/분리를 설명하시오.", "a": "안전받침대 설치, 커플러 잠금확인, 에어호스 연결"},
                    {"q": "잭나이프 현상을 설명하시오.", "a": "급제동시 트랙터-트레일러 꺾임, 방지법"},
                    {"q": "트레일러 회전시 주의사항을 설명하시오.", "a": "넓은 회전반경, 후방차량 확인, 내륜차 고려"}
                ]},
                {"id": "special-work", "name": "특수작업차량", "questions": [
                    {"q": "레커차 운전요령을 설명하시오.", "a": "견인장치 확인, 제한속도 준수, 후방경고등"},
                    {"q": "구난차 작업시 안전수칙을 설명하시오.", "a": "안전표지판 설치, 교통정리, 야간작업시 조명"},
                    {"q": "특수작업차의 종류를 설명하시오.", "a": "크레인차, 믹서트럭, 펌프카, 고소작업차"},
                    {"q": "과적재시 위험성을 설명하시오.", "a": "전복위험, 제동거리 증가, 도로파손, 법적처벌"},
                    {"q": "위험물 운송규정을 설명하시오.", "a": "위험물표지, 소화기비치, 운송경로제한, 자격증"}
                ]}
            ]}
        ]
    },
    {
        "id": "excavator-license",
        "name": "굴삭기운전기능사",
        "icon": "🏗️",
        "desc": "건설기계 굴삭기 조종자격",
        "subjects": [
            {"id": "excavator-theory", "name": "굴삭기 이론", "topics": [
                {"id": "excavator-structure", "name": "굴삭기 구조", "questions": [
                    {"q": "굴삭기의 주요 구성을 설명하시오.", "a": "상부선회체(운전실,엔진), 하부주행체(무한궤도), 작업장치(붐,암,버킷)"},
                    {"q": "유압시스템의 구성을 설명하시오.", "a": "유압펌프, 제어밸브, 유압실린더, 유압모터, 오일탱크"},
                    {"q": "무한궤도의 구조를 설명하시오.", "a": "트랙슈, 롤러, 아이들러, 스프로킷, 트랙링크"},
                    {"q": "선회장치의 구성을 설명하시오.", "a": "선회모터, 선회감속기, 선회베어링, 선회락"},
                    {"q": "작업장치의 종류를 설명하시오.", "a": "버킷, 브레이커, 집게, 리퍼, 진동콤팩터"}
                ]},
                {"id": "excavator-operation", "name": "굴삭기 조작", "questions": [
                    {"q": "조이스틱 조작방법을 설명하시오.", "a": "좌측(붐,선회), 우측(암,버킷), ISO/SAE 패턴"},
                    {"q": "굴착작업 순서를 설명하시오.", "a": "위치선정-굴착각도설정-붐/암 조작-버킷 굴착-선회-적재"},
                    {"q": "안전장치의 종류를 설명하시오.", "a": "과부하방지장치, 선회락, 주행락, 안전밸브"},
                    {"q": "시동 전 점검사항을 설명하시오.", "a": "오일량, 냉각수, 유압라인, 트랙장력, 안전장치"},
                    {"q": "경사지 작업시 주의사항을 설명하시오.", "a": "최대작업경사, 하부 고정, 암 축소, 전복방지"}
                ]}
            ]},
            {"id": "excavator-safety", "name": "안전관리", "topics": [
                {"id": "work-safety", "name": "작업안전", "questions": [
                    {"q": "굴삭기 작업반경 내 안전수칙을 설명하시오.", "a": "접근금지구역 설정, 신호수 배치, 경보장치 사용"},
                    {"q": "전도(전복) 방지대책을 설명하시오.", "a": "지반확인, 아웃트리거 설치, 과부하 금지, 급조작 금지"},
                    {"q": "협착재해 예방을 설명하시오.", "a": "끼임방지 덮개, 접근금지, 록아웃/태그아웃"},
                    {"q": "지하매설물 확인방법을 설명하시오.", "a": "사전탐사, 관계기관 확인, 시굴작업, 안전이격거리"},
                    {"q": "야간작업 안전수칙을 설명하시오.", "a": "조명확보, 경광등 작동, 신호수 배치, 반사조끼 착용"}
                ]}
            ]}
        ]
    },
    {
        "id": "forklift-license",
        "name": "지게차운전기능사",
        "icon": "📦",
        "desc": "물류 지게차 조종자격",
        "subjects": [
            {"id": "forklift-theory", "name": "지게차 이론", "topics": [
                {"id": "forklift-structure", "name": "지게차 구조", "questions": [
                    {"q": "지게차의 종류를 설명하시오.", "a": "카운터밸런스형, 리치형, 사이드형, 워키형"},
                    {"q": "마스트 구조를 설명하시오.", "a": "이너마스트, 아우터마스트, 리프트실린더, 체인"},
                    {"q": "포크의 규격을 설명하시오.", "a": "길이, 폭, 두께, 적재능력에 따른 선택"},
                    {"q": "동력원의 종류를 설명하시오.", "a": "디젤, LPG, 전동(배터리), 하이브리드"},
                    {"q": "조향방식을 설명하시오.", "a": "후륜조향, 4륜조향, 회전반경이 작은 특성"}
                ]},
                {"id": "forklift-operation", "name": "지게차 조작", "questions": [
                    {"q": "기본 레버 조작을 설명하시오.", "a": "리프트/틸트/사이드시프트/포크간격 조절"},
                    {"q": "화물 적재방법을 설명하시오.", "a": "팔레트 중앙삽입, 마스트 후경, 들어올린 후 후진"},
                    {"q": "하역작업 순서를 설명하시오.", "a": "접근-포크삽입-들기-후진-운반-전진-내리기-후진"},
                    {"q": "주행시 포크 위치를 설명하시오.", "a": "지상 15-20cm, 마스트 후경, 적재물 안정"},
                    {"q": "경사로 운행요령을 설명하시오.", "a": "적재시 전진상향, 공차시 후진상향, 저속운행"}
                ]}
            ]},
            {"id": "forklift-safety", "name": "안전관리", "topics": [
                {"id": "forklift-accident", "name": "사고예방", "questions": [
                    {"q": "전도사고 원인을 설명하시오.", "a": "과적재, 급회전, 경사지, 편하중, 과속"},
                    {"q": "충돌사고 예방을 설명하시오.", "a": "시야확보, 경적사용, 지정통로, 속도제한"},
                    {"q": "협착재해 예방을 설명하시오.", "a": "마스트/차체 사이 금지, 포크 위 탑승금지"},
                    {"q": "화물낙하 방지를 설명하시오.", "a": "적재기준 준수, 포크 수평, 결속상태 확인"},
                    {"q": "정기검사 항목을 설명하시오.", "a": "제동장치, 조향장치, 유압장치, 안전장치, 마스트"}
                ]}
            ]}
        ]
    },
    {
        "id": "crane-license",
        "name": "기중기운전기능사",
        "icon": "🏗️",
        "desc": "건설기계 기중기(크레인) 조종자격",
        "subjects": [
            {"id": "crane-theory", "name": "기중기 이론", "topics": [
                {"id": "crane-types", "name": "기중기 종류", "questions": [
                    {"q": "이동식 크레인의 종류를 설명하시오.", "a": "트럭크레인, 크롤러크레인, 휠크레인, 타워크레인"},
                    {"q": "양중능력을 결정하는 요소를 설명하시오.", "a": "붐길이, 작업반경, 권상하중, 선회각도"},
                    {"q": "와이어로프 구조를 설명하시오.", "a": "심강, 스트랜드, 소선, 꼬임방향(S/Z)"},
                    {"q": "훅의 안전장치를 설명하시오.", "a": "래치, 과부하방지장치, 권과방지장치, 풍속계"},
                    {"q": "아웃트리거의 역할을 설명하시오.", "a": "지지면적 확대, 전도방지, 수평유지"}
                ]},
                {"id": "crane-operation", "name": "기중기 조작", "questions": [
                    {"q": "레버 조작방법을 설명하시오.", "a": "권상/권하, 붐기복, 선회, 주행 레버"},
                    {"q": "양중작업 순서를 설명하시오.", "a": "아웃트리거설치-훅이동-슬링걸이-인양-이동-하역"},
                    {"q": "정격하중을 결정하는 방법을 설명하시오.", "a": "작업반경×정격총하중표, 붐길이 고려"},
                    {"q": "신호수 수신호를 설명하시오.", "a": "권상(주먹), 권하(손바닥), 정지(팔 수평)"},
                    {"q": "2인1조 작업원칙을 설명하시오.", "a": "운전자-신호수 호흡, 신호확인 후 작동"}
                ]}
            ]},
            {"id": "crane-safety", "name": "안전관리", "topics": [
                {"id": "crane-accident", "name": "사고예방", "questions": [
                    {"q": "전도사고 원인을 설명하시오.", "a": "과부하, 지반침하, 강풍, 급선회, 경사지"},
                    {"q": "낙하사고 예방을 설명하시오.", "a": "와이어로프 점검, 훅래치확인, 균형유지, 급조작금지"},
                    {"q": "끼임사고 예방을 설명하시오.", "a": "접근금지구역, 신호준수, 로프접촉금지"},
                    {"q": "감전사고 예방을 설명하시오.", "a": "송전선 이격거리, 접지, 절연보호구"},
                    {"q": "정기검사 기준을 설명하시오.", "a": "와이어로프, 후크, 제동장치, 권과방지장치"}
                ]}
            ]}
        ]
    },
    {
        "id": "boat-license",
        "name": "소형선박조종사",
        "icon": "⛵",
        "desc": "5톤 미만 소형선박 조종면허",
        "subjects": [
            {"id": "navigation-law", "name": "항해법규", "topics": [
                {"id": "maritime-rules", "name": "해상교통규칙", "questions": [
                    {"q": "우현 우선원칙을 설명하시오.", "a": "마주칠때 우현으로 변침, 우측에서 오는 배 우선"},
                    {"q": "항해등의 종류를 설명하시오.", "a": "마스트등(백색), 현등(녹/홍), 선미등(백색)"},
                    {"q": "음향신호의 종류를 설명하시오.", "a": "단음(우현), 장음(좌현), 경고(5회이상)"},
                    {"q": "우선피항선의 의무를 설명하시오.", "a": "조기변침, 대각도변침, 상대선 진로방해금지"},
                    {"q": "협수로 통항규칙을 설명하시오.", "a": "우측통행, 소형선 대형선 피항, 앞지르기 금지"}
                ]},
                {"id": "safety-equipment", "name": "안전장비", "questions": [
                    {"q": "구명설비의 종류를 설명하시오.", "a": "구명동의, 구명부환, 구명뗏목, 구명정"},
                    {"q": "소화설비를 설명하시오.", "a": "분말소화기, 자동소화장치, 소화펌프"},
                    {"q": "통신설비를 설명하시오.", "a": "VHF 무선전화, 휴대용 위치발신장치(EPIRB)"},
                    {"q": "항해계기를 설명하시오.", "a": "나침의, GPS, 어탐기, 레이더"},
                    {"q": "법정비품을 설명하시오.", "a": "조명, 닻, 계류색, 구급함, 공구류"}
                ]}
            ]},
            {"id": "seamanship", "name": "운용술", "topics": [
                {"id": "boat-handling", "name": "선박조종", "questions": [
                    {"q": "이안/접안 요령을 설명하시오.", "a": "바람/조류 고려, 펜더사용, 선수/선미 계류"},
                    {"q": "투묘/양묘를 설명하시오.", "a": "정지상태 투묘, 수심 3배 앵커체인, 야간 정박등"},
                    {"q": "황천항해 요령을 설명하시오.", "a": "감속, 파도정면, 해치폐쇄, 화물고정"},
                    {"q": "조류의 영향을 설명하시오.", "a": "선속변화, 침로수정, 조류도 활용"},
                    {"q": "충돌 피항동작을 설명하시오.", "a": "조기행동, 대각도변침, 감속/정지/후진"}
                ]},
                {"id": "engine-boat", "name": "기관운용", "questions": [
                    {"q": "선외기 구조를 설명하시오.", "a": "엔진, 변속기, 프로펠러, 조타장치"},
                    {"q": "출항 전 점검사항을 설명하시오.", "a": "연료, 오일, 냉각수, 프로펠러, 조타장치"},
                    {"q": "기관고장시 대처를 설명하시오.", "a": "원인파악, 닻투하, 구조요청, 표류대비"},
                    {"q": "프로펠러 캐비테이션을 설명하시오.", "a": "기포발생, 추진력저하, 프로펠러 손상원인"},
                    {"q": "연료계통 관리를 설명하시오.", "a": "수분/이물질 제거, 필터점검, 연료량 확인"}
                ]}
            ]}
        ]
    },
    {
        "id": "yacht-license",
        "name": "요트조종면허",
        "icon": "🛥️",
        "desc": "요트 및 모터보트 조종면허",
        "subjects": [
            {"id": "yacht-theory", "name": "요트 이론", "topics": [
                {"id": "yacht-structure", "name": "요트 구조", "questions": [
                    {"q": "요트의 주요 부위를 설명하시오.", "a": "선수(Bow), 선미(Stern), 좌현(Port), 우현(Starboard)"},
                    {"q": "세일의 종류를 설명하시오.", "a": "메인세일, 집(Jib), 스피네이커, 제노아"},
                    {"q": "킬(Keel)의 역할을 설명하시오.", "a": "횡류방지, 복원력 제공, 균형유지"},
                    {"q": "러더(Rudder)의 기능을 설명하시오.", "a": "방향조종, 물흐름 이용, 틸러/휠 조작"},
                    {"q": "리깅의 종류를 설명하시오.", "a": "스탠딩 리깅(고정), 러닝 리깅(조작용 로프)"}
                ]},
                {"id": "sailing-basic", "name": "세일링 기초", "questions": [
                    {"q": "포인트 오브 세일을 설명하시오.", "a": "클로즈홀드, 빔리치, 브로드리치, 러닝"},
                    {"q": "태킹(Tacking)을 설명하시오.", "a": "역풍상태 방향전환, 선수가 풍상 통과"},
                    {"q": "자이빙(Gybing)을 설명하시오.", "a": "순풍상태 방향전환, 선미가 풍상 통과"},
                    {"q": "헬름(Helm) 조작을 설명하시오.", "a": "러프(풍상전환), 베어어웨이(풍하전환)"},
                    {"q": "노고존(No Go Zone)을 설명하시오.", "a": "바람방향 좌우 45도, 전진불가 구역"}
                ]}
            ]},
            {"id": "yacht-safety", "name": "안전운항", "topics": [
                {"id": "yacht-emergency", "name": "비상대응", "questions": [
                    {"q": "낙수자 구조방법을 설명하시오.", "a": "낙수자 주시, 구명부환 투척, 접근법"},
                    {"q": "전복시 대처를 설명하시오.", "a": "선체부착, 구명동의 착용, 구조신호"},
                    {"q": "좌초시 대처를 설명하시오.", "a": "역추진, 중량이동, 만조대기, 구조요청"},
                    {"q": "폭풍우 대비를 설명하시오.", "a": "귀항, 세일축소, 해치폐쇄, 구명동의착용"},
                    {"q": "충돌예방을 설명하시오.", "a": "경계강화, 조기피항, 우현우선, 동력선회피"}
                ]}
            ]}
        ]
    },
    {
        "id": "pilot-license-private",
        "name": "자가용조종사",
        "icon": "✈️",
        "desc": "비사업용 항공기 조종자격",
        "subjects": [
            {"id": "aviation-law", "name": "항공법규", "topics": [
                {"id": "air-rules", "name": "항공규칙", "questions": [
                    {"q": "항공안전법의 목적을 설명하시오.", "a": "항공기 안전운항, 사고예방, 국제기준 준수"},
                    {"q": "비행공역의 종류를 설명하시오.", "a": "A/B/C/D/E/G 공역, 관제/비관제 구분"},
                    {"q": "VFR 기상최저치를 설명하시오.", "a": "시정 5km 이상, 구름과 거리(수직/수평)"},
                    {"q": "비행계획서 제출을 설명하시오.", "a": "비행목적, 경로, 고도, 예정시간, 비상대책"},
                    {"q": "조종사 면허의 종류를 설명하시오.", "a": "자가용/사업용/운송용, 한정사항(기종/등급)"}
                ]},
                {"id": "air-traffic", "name": "항공교통", "questions": [
                    {"q": "ATC 교신절차를 설명하시오.", "a": "호출부호, 위치보고, 허가요청, 확인응답"},
                    {"q": "비행우선순위를 설명하시오.", "a": "조난항공기>긴급항공기>군용기>민간기"},
                    {"q": "활주로 식별표지를 설명하시오.", "a": "번호(방위), 중심선, 착륙대표지"},
                    {"q": "경항공기 운항규칙을 설명하시오.", "a": "고도제한, 공역제한, 야간비행제한"},
                    {"q": "항공기 충돌방지를 설명하시오.", "a": "우측통과, 추월시 우측, 정면대향시 우회전"}
                ]}
            ]},
            {"id": "aviation-theory", "name": "비행이론", "topics": [
                {"id": "aerodynamics", "name": "공기역학", "questions": [
                    {"q": "양력 발생원리를 설명하시오.", "a": "베르누이 원리, 받음각, 익형의 곡률"},
                    {"q": "4가지 비행력을 설명하시오.", "a": "양력(상향), 중력(하향), 추력(전방), 항력(후방)"},
                    {"q": "실속(Stall)을 설명하시오.", "a": "임계받음각 초과, 양력급감, 회복조작"},
                    {"q": "안정성과 조종성을 설명하시오.", "a": "세로/가로/방향안정성, 상반되는 관계"},
                    {"q": "조종면의 종류를 설명하시오.", "a": "에일러론(롤), 엘리베이터(피치), 러더(요)"}
                ]},
                {"id": "flight-ops", "name": "비행운용", "questions": [
                    {"q": "이륙성능에 영향을 주는 요소를 설명하시오.", "a": "중량, 온도, 고도, 바람, 활주로상태"},
                    {"q": "선회비행을 설명하시오.", "a": "뱅크각, 로드팩터, 실속속도증가"},
                    {"q": "비상착륙 절차를 설명하시오.", "a": "착륙지 선정, 체크리스트, 조난신호"},
                    {"q": "연료관리를 설명하시오.", "a": "연료계산, 예비연료, 소모량 점검"},
                    {"q": "중량균형을 설명하시오.", "a": "무게중심(CG), 하중배분, 비행한계"}
                ]}
            ]},
            {"id": "meteorology", "name": "항공기상", "topics": [
                {"id": "weather-basic", "name": "기상기초", "questions": [
                    {"q": "대기권의 구조를 설명하시오.", "a": "대류권(날씨), 성층권, 중간권, 열권"},
                    {"q": "전선의 종류를 설명하시오.", "a": "한랭전선, 온난전선, 폐색전선, 정체전선"},
                    {"q": "난기류의 원인을 설명하시오.", "a": "대류, 전선, 산악, 바람시어, 제트기류"},
                    {"q": "착빙의 종류를 설명하시오.", "a": "투명빙, 무빙, 서리빙, 위험성"},
                    {"q": "시정장애 현상을 설명하시오.", "a": "안개, 박무, 연기, 먼지, 강수"}
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

export default function DrivingCategoryPage() {{
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
          <span className="text-6xl mb-4 block">🚗</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">자동차, 건설기계, 선박, 항공 조종면허 {len(CERTS)}개</p>
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
            <p className="text-gray-600">경찰청(도로운송면허), 한국교통안전공단(건설기계), 해양수산부(선박), 국토교통부(항공) 등에서 시행합니다.</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📝 응시자격</h2>
            <p className="text-gray-600">해당 면허별 응시자격을 확인하세요. (연령, 시력, 교육이수 등)</p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 시험과목</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {"".join([f"<li>{subj['name']}</li>" for subj in cert['subjects']])}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">✅ 합격기준</h2>
            <p className="text-gray-600">필기시험 60점 이상, 기능/실기시험 합격</p>
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
    base_dir = "C:/todo/today/자격시험/driving"

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
