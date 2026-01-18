import os

# 카테고리 정보
CATEGORY = {
    "id": "office",
    "name": "사무·경영",
    "color1": "violet",
    "color2": "purple",
    "gradient": "from-violet-500 to-purple-500"
}

# 자격증 목록
CERTS = [
    {
        "id": "word-processor",
        "name": "워드프로세서",
        "icon": "📄",
        "desc": "대한상공회의소 문서작성 전문 자격",
        "subjects": [
            {"id": "word-theory", "name": "워드 필기", "topics": [
                {"id": "word-basic", "name": "워드프로세서 용어", "questions": [
                    {"q": "워드프로세서의 정의를 설명하시오.", "a": "문서 작성/편집/저장/인쇄하는 소프트웨어"},
                    {"q": "WYSIWYG의 의미를 설명하시오.", "a": "What You See Is What You Get, 화면과 출력 일치"},
                    {"q": "클립보드의 기능을 설명하시오.", "a": "잘라내기/복사 데이터 임시 저장 메모리 영역"},
                    {"q": "매크로의 기능을 설명하시오.", "a": "반복작업 자동화, 명령어 기록/재생"},
                    {"q": "OLE의 개념을 설명하시오.", "a": "Object Linking and Embedding, 개체 연결/삽입"}
                ]},
                {"id": "word-function", "name": "문서편집 기능", "questions": [
                    {"q": "들여쓰기와 내어쓰기를 설명하시오.", "a": "들여쓰기: 첫줄 안쪽, 내어쓰기: 첫줄 바깥쪽"},
                    {"q": "머리글과 바닥글을 설명하시오.", "a": "페이지 상단/하단 반복 영역, 페이지번호 등"},
                    {"q": "스타일의 기능을 설명하시오.", "a": "서식 모음 저장, 일관된 문서 형식 적용"},
                    {"q": "찾기/바꾸기 기능을 설명하시오.", "a": "특정 문자열 검색, 다른 문자열로 치환"},
                    {"q": "단축키 Ctrl+S의 기능을 설명하시오.", "a": "저장(Save), 현재 문서 저장"}
                ]}
            ]},
            {"id": "pc-basic", "name": "PC 운영체제", "topics": [
                {"id": "windows", "name": "Windows 운영", "questions": [
                    {"q": "운영체제의 역할을 설명하시오.", "a": "하드웨어 관리, 사용자 인터페이스, 자원 할당"},
                    {"q": "파일 확장자의 역할을 설명하시오.", "a": "파일 형식 구분, 연결 프로그램 지정"},
                    {"q": "바로가기의 기능을 설명하시오.", "a": "원본 파일/폴더 빠른 접근, .lnk 확장자"},
                    {"q": "휴지통의 기능을 설명하시오.", "a": "삭제 파일 임시 보관, 복원 가능"},
                    {"q": "제어판의 역할을 설명하시오.", "a": "시스템 설정 변경, 프로그램 관리"}
                ]},
                {"id": "network-basic", "name": "네트워크 기초", "questions": [
                    {"q": "IP 주소의 역할을 설명하시오.", "a": "인터넷 장치 식별 주소, 통신 목적지"},
                    {"q": "URL의 구성을 설명하시오.", "a": "프로토콜://도메인/경로, 웹 자원 위치"},
                    {"q": "브라우저의 기능을 설명하시오.", "a": "웹페이지 요청/표시, HTML 해석"},
                    {"q": "이메일 프로토콜을 설명하시오.", "a": "SMTP(발신), POP3/IMAP(수신)"},
                    {"q": "방화벽의 역할을 설명하시오.", "a": "네트워크 보안, 불법 접근 차단"}
                ]}
            ]},
            {"id": "word-practical", "name": "실기", "topics": [
                {"id": "document-create", "name": "문서작성", "questions": [
                    {"q": "문서 여백 설정방법을 설명하시오.", "a": "페이지 설정→여백탭, 상하좌우 지정"},
                    {"q": "표 작성 방법을 설명하시오.", "a": "삽입→표, 행/열 지정, 셀 병합/분할"},
                    {"q": "그림 삽입 방법을 설명하시오.", "a": "삽입→그림, 파일선택, 크기/위치 조절"},
                    {"q": "글머리 기호 설정을 설명하시오.", "a": "단락→글머리기호, 기호선택, 들여쓰기"},
                    {"q": "인쇄 설정 방법을 설명하시오.", "a": "파일→인쇄, 용지/방향/매수 설정"}
                ]}
            ]}
        ]
    },
    {
        "id": "computer-skills-1",
        "name": "컴퓨터활용능력 1급",
        "icon": "💻",
        "desc": "대한상공회의소 컴퓨터활용 최상위 자격",
        "subjects": [
            {"id": "spreadsheet-1", "name": "스프레드시트", "topics": [
                {"id": "excel-advanced", "name": "엑셀 고급", "questions": [
                    {"q": "VLOOKUP 함수를 설명하시오.", "a": "수직검색, =VLOOKUP(검색값,범위,열번호,옵션)"},
                    {"q": "INDEX/MATCH 함수를 설명하시오.", "a": "INDEX(범위,행번호), MATCH(검색값,범위,옵션)"},
                    {"q": "피벗테이블을 설명하시오.", "a": "데이터 요약/분석, 행/열/값 필드 구성"},
                    {"q": "조건부 서식을 설명하시오.", "a": "조건에 따른 셀 서식 자동 변경"},
                    {"q": "배열 수식을 설명하시오.", "a": "Ctrl+Shift+Enter, 여러 값 동시 계산"}
                ]},
                {"id": "excel-function", "name": "함수 활용", "questions": [
                    {"q": "SUMIF/SUMIFS를 설명하시오.", "a": "조건부 합계, 단일/다중 조건"},
                    {"q": "IF 중첩을 설명하시오.", "a": "다중 조건 판단, IF(조건1,값1,IF(조건2,값2,값3))"},
                    {"q": "DATE 함수들을 설명하시오.", "a": "YEAR, MONTH, DAY, TODAY, NOW"},
                    {"q": "TEXT 함수를 설명하시오.", "a": "숫자→텍스트 변환, 서식 지정"},
                    {"q": "OFFSET 함수를 설명하시오.", "a": "기준셀에서 이동한 범위 참조"}
                ]}
            ]},
            {"id": "database-1", "name": "데이터베이스", "topics": [
                {"id": "access-advanced", "name": "Access 고급", "questions": [
                    {"q": "정규화의 목적을 설명하시오.", "a": "데이터 중복 최소화, 무결성 확보"},
                    {"q": "관계 설정을 설명하시오.", "a": "1:1, 1:N, N:M, 기본키-외래키 연결"},
                    {"q": "SQL SELECT문을 설명하시오.", "a": "SELECT 필드 FROM 테이블 WHERE 조건"},
                    {"q": "쿼리의 종류를 설명하시오.", "a": "선택, 매개변수, 실행(추가/삭제/업데이트)"},
                    {"q": "보고서 작성을 설명하시오.", "a": "데이터 출력 형식, 그룹화/정렬/요약"}
                ]},
                {"id": "db-design", "name": "DB 설계", "questions": [
                    {"q": "개체-관계 모델을 설명하시오.", "a": "E-R 다이어그램, 개체/속성/관계 표현"},
                    {"q": "기본키와 외래키를 설명하시오.", "a": "기본키: 고유식별, 외래키: 다른 테이블 참조"},
                    {"q": "인덱스의 역할을 설명하시오.", "a": "검색 속도 향상, B-트리 구조"},
                    {"q": "트랜잭션을 설명하시오.", "a": "작업 단위, ACID 특성 보장"},
                    {"q": "무결성 제약조건을 설명하시오.", "a": "개체/참조/도메인 무결성"}
                ]}
            ]}
        ]
    },
    {
        "id": "computer-skills-2",
        "name": "컴퓨터활용능력 2급",
        "icon": "🖥️",
        "desc": "대한상공회의소 컴퓨터활용 중급 자격",
        "subjects": [
            {"id": "spreadsheet-2", "name": "스프레드시트", "topics": [
                {"id": "excel-basic", "name": "엑셀 기초", "questions": [
                    {"q": "SUM 함수를 설명하시오.", "a": "합계 함수, =SUM(범위)"},
                    {"q": "AVERAGE 함수를 설명하시오.", "a": "평균 함수, =AVERAGE(범위)"},
                    {"q": "MAX/MIN 함수를 설명하시오.", "a": "최대값/최소값, =MAX(범위), =MIN(범위)"},
                    {"q": "COUNT/COUNTA를 설명하시오.", "a": "COUNT: 숫자개수, COUNTA: 비어있지 않은 셀"},
                    {"q": "IF 함수를 설명하시오.", "a": "조건판단, =IF(조건,참값,거짓값)"}
                ]},
                {"id": "excel-format", "name": "서식과 차트", "questions": [
                    {"q": "셀 서식을 설명하시오.", "a": "숫자/통화/날짜/텍스트 형식 지정"},
                    {"q": "조건부 서식을 설명하시오.", "a": "조건 충족시 자동 서식 적용"},
                    {"q": "차트의 종류를 설명하시오.", "a": "세로막대, 꺾은선, 원형, 분산형"},
                    {"q": "인쇄영역 설정을 설명하시오.", "a": "페이지레이아웃→인쇄영역→설정"},
                    {"q": "틀고정을 설명하시오.", "a": "보기→틀고정, 특정 행/열 고정"}
                ]}
            ]},
            {"id": "computer-general", "name": "컴퓨터 일반", "topics": [
                {"id": "hardware", "name": "하드웨어", "questions": [
                    {"q": "CPU의 역할을 설명하시오.", "a": "중앙처리장치, 연산/제어 수행"},
                    {"q": "RAM과 ROM을 설명하시오.", "a": "RAM: 휘발성 주기억장치, ROM: 비휘발성"},
                    {"q": "하드디스크와 SSD를 설명하시오.", "a": "HDD: 자기디스크, SSD: 플래시메모리"},
                    {"q": "입력장치의 종류를 설명하시오.", "a": "키보드, 마우스, 스캐너, 마이크"},
                    {"q": "출력장치의 종류를 설명하시오.", "a": "모니터, 프린터, 스피커"}
                ]},
                {"id": "software", "name": "소프트웨어", "questions": [
                    {"q": "시스템 소프트웨어를 설명하시오.", "a": "운영체제, 유틸리티, 장치드라이버"},
                    {"q": "응용 소프트웨어를 설명하시오.", "a": "워드, 스프레드시트, 그래픽 프로그램"},
                    {"q": "파일 압축을 설명하시오.", "a": "데이터 용량 축소, ZIP/RAR 형식"},
                    {"q": "바이러스의 종류를 설명하시오.", "a": "웜, 트로이목마, 랜섬웨어"},
                    {"q": "백업의 중요성을 설명하시오.", "a": "데이터 손실 대비, 정기적 복사본 보관"}
                ]}
            ]}
        ]
    },
    {
        "id": "office-automation",
        "name": "사무자동화산업기사",
        "icon": "⚙️",
        "desc": "한국산업인력공단 사무자동화 전문 자격",
        "subjects": [
            {"id": "oa-system", "name": "사무자동화 시스템", "topics": [
                {"id": "oa-overview", "name": "OA 개요", "questions": [
                    {"q": "사무자동화의 정의를 설명하시오.", "a": "컴퓨터 이용 사무처리 효율화"},
                    {"q": "OA 시스템 구성요소를 설명하시오.", "a": "하드웨어, 소프트웨어, 네트워크, 데이터베이스"},
                    {"q": "문서관리시스템(DMS)을 설명하시오.", "a": "전자문서 생성/저장/검색/공유"},
                    {"q": "그룹웨어를 설명하시오.", "a": "협업도구, 전자결재/일정관리/게시판"},
                    {"q": "ERP를 설명하시오.", "a": "전사적자원관리, 업무 통합 시스템"}
                ]},
                {"id": "office-network", "name": "사무 네트워크", "questions": [
                    {"q": "LAN의 구성을 설명하시오.", "a": "근거리통신망, 이더넷, 토폴로지"},
                    {"q": "클라이언트-서버 모델을 설명하시오.", "a": "서버: 자원제공, 클라이언트: 서비스 요청"},
                    {"q": "VPN의 기능을 설명하시오.", "a": "가상사설망, 암호화 터널링"},
                    {"q": "클라우드 서비스를 설명하시오.", "a": "IaaS, PaaS, SaaS 형태의 인터넷 서비스"},
                    {"q": "보안 프로토콜을 설명하시오.", "a": "SSL/TLS, HTTPS, 암호화 통신"}
                ]}
            ]},
            {"id": "programming-basic", "name": "프로그래밍 기초", "topics": [
                {"id": "vba-macro", "name": "VBA 매크로", "questions": [
                    {"q": "VBA의 정의를 설명하시오.", "a": "Visual Basic for Applications, MS Office 매크로"},
                    {"q": "변수 선언을 설명하시오.", "a": "Dim 변수명 As 데이터형"},
                    {"q": "조건문을 설명하시오.", "a": "If~Then~Else, Select Case"},
                    {"q": "반복문을 설명하시오.", "a": "For~Next, Do~Loop, While~Wend"},
                    {"q": "함수와 프로시저를 설명하시오.", "a": "Function(반환값), Sub(실행만)"}
                ]},
                {"id": "db-programming", "name": "DB 프로그래밍", "questions": [
                    {"q": "SQL DDL을 설명하시오.", "a": "CREATE, ALTER, DROP, 구조 정의"},
                    {"q": "SQL DML을 설명하시오.", "a": "SELECT, INSERT, UPDATE, DELETE"},
                    {"q": "조인의 종류를 설명하시오.", "a": "INNER, LEFT, RIGHT, FULL OUTER JOIN"},
                    {"q": "집계함수를 설명하시오.", "a": "SUM, AVG, COUNT, MAX, MIN, GROUP BY"},
                    {"q": "서브쿼리를 설명하시오.", "a": "쿼리 안의 쿼리, WHERE절/FROM절 사용"}
                ]}
            ]},
            {"id": "oa-practical", "name": "실기", "topics": [
                {"id": "practical-work", "name": "실무작업", "questions": [
                    {"q": "스프레드시트 함수 활용을 설명하시오.", "a": "VLOOKUP, SUMIF, 피벗테이블 등 고급함수"},
                    {"q": "데이터베이스 설계를 설명하시오.", "a": "테이블 생성, 관계 설정, 쿼리 작성"},
                    {"q": "프레젠테이션 작성을 설명하시오.", "a": "슬라이드 구성, 애니메이션, 전환효과"},
                    {"q": "매크로 작성을 설명하시오.", "a": "VBA 코딩, 자동화 프로그램"},
                    {"q": "보고서 작성을 설명하시오.", "a": "데이터 추출, 서식 지정, 인쇄 설정"}
                ]}
            ]}
        ]
    },
    {
        "id": "ecommerce-1",
        "name": "전자상거래관리사 1급",
        "icon": "🛒",
        "desc": "대한상공회의소 전자상거래 최상위 자격",
        "subjects": [
            {"id": "ecommerce-strategy", "name": "전자상거래 전략", "topics": [
                {"id": "ebiz-model", "name": "e-비즈니스 모델", "questions": [
                    {"q": "전자상거래의 유형을 설명하시오.", "a": "B2B, B2C, C2C, B2G, O2O"},
                    {"q": "온라인 마켓플레이스를 설명하시오.", "a": "오픈마켓, 소셜커머스, 종합몰"},
                    {"q": "옴니채널 전략을 설명하시오.", "a": "온오프라인 통합, 일관된 고객경험"},
                    {"q": "플랫폼 비즈니스를 설명하시오.", "a": "양면시장, 네트워크 효과"},
                    {"q": "구독경제 모델을 설명하시오.", "a": "정기구독, 반복매출, 고객유지"}
                ]},
                {"id": "digital-marketing", "name": "디지털 마케팅", "questions": [
                    {"q": "SEO를 설명하시오.", "a": "검색엔진최적화, 자연검색 상위노출"},
                    {"q": "SEM/PPC를 설명하시오.", "a": "검색엔진마케팅, 클릭당 과금"},
                    {"q": "소셜미디어 마케팅을 설명하시오.", "a": "SNS 채널 활용, 바이럴마케팅"},
                    {"q": "이메일 마케팅을 설명하시오.", "a": "뉴스레터, 타겟팅, 자동화"},
                    {"q": "데이터분석 마케팅을 설명하시오.", "a": "CRM, 퍼널분석, A/B테스트"}
                ]}
            ]},
            {"id": "ecommerce-tech", "name": "전자상거래 기술", "topics": [
                {"id": "web-tech", "name": "웹 기술", "questions": [
                    {"q": "HTML5의 특징을 설명하시오.", "a": "시맨틱 태그, 멀티미디어, 로컬스토리지"},
                    {"q": "반응형 웹을 설명하시오.", "a": "CSS 미디어쿼리, 다양한 기기 대응"},
                    {"q": "API의 개념을 설명하시오.", "a": "Application Programming Interface, 서비스 연동"},
                    {"q": "CDN을 설명하시오.", "a": "콘텐츠 전송 네트워크, 속도 향상"},
                    {"q": "클라우드 호스팅을 설명하시오.", "a": "AWS, Azure, 확장성/가용성"}
                ]},
                {"id": "payment-security", "name": "결제와 보안", "questions": [
                    {"q": "전자결제 방식을 설명하시오.", "a": "신용카드, 계좌이체, 간편결제, 가상화폐"},
                    {"q": "PG사의 역할을 설명하시오.", "a": "결제대행, 정산, 가맹점관리"},
                    {"q": "SSL 인증서를 설명하시오.", "a": "암호화 통신, HTTPS, 신뢰성"},
                    {"q": "개인정보보호를 설명하시오.", "a": "개인정보보호법, 동의/수집/이용/파기"},
                    {"q": "PCI-DSS를 설명하시오.", "a": "카드산업 데이터보안표준"}
                ]}
            ]},
            {"id": "ecommerce-law", "name": "전자상거래 법규", "topics": [
                {"id": "ec-regulation", "name": "관련법규", "questions": [
                    {"q": "전자상거래법을 설명하시오.", "a": "전자상거래 소비자보호, 청약철회"},
                    {"q": "전자서명법을 설명하시오.", "a": "공인인증, 전자문서 법적효력"},
                    {"q": "통신판매업 신고를 설명하시오.", "a": "사업자등록, 통신판매업 등록"},
                    {"q": "소비자 청약철회를 설명하시오.", "a": "7일 이내, 환불규정, 예외사항"},
                    {"q": "표시광고법을 설명하시오.", "a": "허위/과장광고 금지, 필수표시사항"}
                ]}
            ]}
        ]
    },
    {
        "id": "ecommerce-2",
        "name": "전자상거래관리사 2급",
        "icon": "🖱️",
        "desc": "대한상공회의소 전자상거래 중급 자격",
        "subjects": [
            {"id": "ecommerce-basic", "name": "전자상거래 기초", "topics": [
                {"id": "ec-overview", "name": "전자상거래 개론", "questions": [
                    {"q": "전자상거래의 정의를 설명하시오.", "a": "인터넷 통한 상품/서비스 거래"},
                    {"q": "전자상거래의 장점을 설명하시오.", "a": "24시간, 비용절감, 글로벌, 편의성"},
                    {"q": "B2B와 B2C 차이를 설명하시오.", "a": "B2B: 기업간, B2C: 기업-소비자"},
                    {"q": "쇼핑몰의 종류를 설명하시오.", "a": "종합몰, 전문몰, 오픈마켓, 소셜커머스"},
                    {"q": "모바일커머스를 설명하시오.", "a": "스마트폰 앱 통한 전자상거래"}
                ]},
                {"id": "ec-process", "name": "거래 프로세스", "questions": [
                    {"q": "주문처리 프로세스를 설명하시오.", "a": "주문→결제→배송→정산"},
                    {"q": "결제 방법을 설명하시오.", "a": "신용카드, 무통장, 간편결제"},
                    {"q": "배송 방법을 설명하시오.", "a": "택배, 퀵서비스, 새벽배송"},
                    {"q": "반품/교환 처리를 설명하시오.", "a": "고객요청, 상품회수, 환불/교환"},
                    {"q": "고객서비스 관리를 설명하시오.", "a": "문의응대, 클레임처리, 리뷰관리"}
                ]}
            ]},
            {"id": "web-basic", "name": "웹 기초", "topics": [
                {"id": "html-css", "name": "HTML/CSS", "questions": [
                    {"q": "HTML의 구조를 설명하시오.", "a": "<html>, <head>, <body> 기본태그"},
                    {"q": "CSS의 역할을 설명하시오.", "a": "스타일 정의, 디자인 표현"},
                    {"q": "링크 태그를 설명하시오.", "a": "<a href='URL'>텍스트</a>"},
                    {"q": "이미지 태그를 설명하시오.", "a": "<img src='경로' alt='설명'>"},
                    {"q": "테이블 태그를 설명하시오.", "a": "<table>, <tr>, <td>, <th>"}
                ]},
                {"id": "web-design", "name": "웹 디자인", "questions": [
                    {"q": "UI/UX의 개념을 설명하시오.", "a": "UI: 사용자인터페이스, UX: 사용자경험"},
                    {"q": "GNB의 역할을 설명하시오.", "a": "Global Navigation Bar, 주요메뉴"},
                    {"q": "배너 디자인을 설명하시오.", "a": "광고영역, 이벤트/상품 홍보"},
                    {"q": "상품 상세페이지를 설명하시오.", "a": "상품정보, 이미지, 구매버튼"},
                    {"q": "장바구니 기능을 설명하시오.", "a": "상품담기, 수량변경, 결제연동"}
                ]}
            ]}
        ]
    },
    {
        "id": "secretary-1",
        "name": "비서 1급",
        "icon": "👔",
        "desc": "대한상공회의소 비서 최상위 자격",
        "subjects": [
            {"id": "secretary-advanced", "name": "비서 고급실무", "topics": [
                {"id": "executive-support", "name": "임원보좌", "questions": [
                    {"q": "비서의 역할을 설명하시오.", "a": "일정관리, 문서처리, 의전, 정보관리"},
                    {"q": "일정관리 방법을 설명하시오.", "a": "캘린더 관리, 우선순위, 변경조율"},
                    {"q": "회의 준비를 설명하시오.", "a": "안건정리, 자료준비, 장소/참석자 확인"},
                    {"q": "출장 지원을 설명하시오.", "a": "항공/숙박 예약, 일정표, 현지정보"},
                    {"q": "보고서 작성을 설명하시오.", "a": "핵심요약, 논리적구성, 시각화"}
                ]},
                {"id": "protocol", "name": "의전", "questions": [
                    {"q": "국제의전 서열을 설명하시오.", "a": "직위, 연공서열, 외교관례"},
                    {"q": "좌석배치를 설명하시오.", "a": "상석 위치, 회의/만찬 배치"},
                    {"q": "명함교환 예절을 설명하시오.", "a": "두 손으로, 상대방 먼저, 확인"},
                    {"q": "인사예절을 설명하시오.", "a": "악수, 명함, 호칭, 소개순서"},
                    {"q": "접대 예절을 설명하시오.", "a": "VIP 응대, 식사예절, 선물"}
                ]}
            ]},
            {"id": "office-management", "name": "사무관리", "topics": [
                {"id": "document-management", "name": "문서관리", "questions": [
                    {"q": "문서 분류체계를 설명하시오.", "a": "주제별, 기능별, 보존연한별"},
                    {"q": "기안문 작성을 설명하시오.", "a": "제목, 본문, 붙임, 결재라인"},
                    {"q": "비밀문서 관리를 설명하시오.", "a": "등급분류, 보관, 열람기록, 폐기"},
                    {"q": "전자문서 관리를 설명하시오.", "a": "EDMS, 결재시스템, 보존"},
                    {"q": "기록물 관리를 설명하시오.", "a": "생성, 분류, 보존, 폐기주기"}
                ]},
                {"id": "info-management", "name": "정보관리", "questions": [
                    {"q": "정보수집 방법을 설명하시오.", "a": "인터넷, DB, 네트워킹, 보고서"},
                    {"q": "정보분석 방법을 설명하시오.", "a": "SWOT, 벤치마킹, 트렌드분석"},
                    {"q": "개인정보 관리를 설명하시오.", "a": "수집동의, 안전조치, 파기"},
                    {"q": "보안관리를 설명하시오.", "a": "문서보안, PC보안, 출입통제"},
                    {"q": "위기관리를 설명하시오.", "a": "위기감지, 대응계획, 커뮤니케이션"}
                ]}
            ]}
        ]
    },
    {
        "id": "secretary-2",
        "name": "비서 2급",
        "icon": "👩‍💼",
        "desc": "대한상공회의소 비서 중급 자격",
        "subjects": [
            {"id": "secretary-practice", "name": "비서 실무", "topics": [
                {"id": "daily-work", "name": "일상업무", "questions": [
                    {"q": "전화응대 요령을 설명하시오.", "a": "3콜내 수신, 인사, 메모, 전달"},
                    {"q": "방문객 응대를 설명하시오.", "a": "안내, 명함접수, 음료제공, 배웅"},
                    {"q": "우편물 처리를 설명하시오.", "a": "수신/발신 분류, 등기관리, 배포"},
                    {"q": "비품관리를 설명하시오.", "a": "재고확인, 발주, 입고, 불출"},
                    {"q": "환경관리를 설명하시오.", "a": "사무실 정리, 시설점검, 안전관리"}
                ]},
                {"id": "schedule-meeting", "name": "일정/회의", "questions": [
                    {"q": "일정표 작성을 설명하시오.", "a": "일간/주간/월간, 우선순위 표시"},
                    {"q": "약속잡기 요령을 설명하시오.", "a": "일정확인, 장소/시간 조율, 확인"},
                    {"q": "회의록 작성을 설명하시오.", "a": "일시/참석자, 안건, 결정사항, 추후일정"},
                    {"q": "자료준비를 설명하시오.", "a": "관련문서 수집, 복사, 배포"},
                    {"q": "알림 관리를 설명하시오.", "a": "리마인더, 사전 알림, 팔로업"}
                ]}
            ]},
            {"id": "communication", "name": "커뮤니케이션", "topics": [
                {"id": "business-comm", "name": "비즈니스 커뮤니케이션", "questions": [
                    {"q": "이메일 작성법을 설명하시오.", "a": "제목, 인사, 본문, 서명, CC/BCC"},
                    {"q": "보고 기법을 설명하시오.", "a": "결론우선, 간결, 시각화, 구두/서면"},
                    {"q": "경청 기법을 설명하시오.", "a": "적극적 청취, 공감, 질문, 피드백"},
                    {"q": "호칭 예절을 설명하시오.", "a": "직함+성명, 존칭, 사내/외 구분"},
                    {"q": "갈등 해결을 설명하시오.", "a": "원인파악, 조정, 합의도출"}
                ]}
            ]}
        ]
    },
    {
        "id": "secretary-3",
        "name": "비서 3급",
        "icon": "📋",
        "desc": "대한상공회의소 비서 초급 자격",
        "subjects": [
            {"id": "secretary-basic", "name": "비서 기초", "topics": [
                {"id": "secretary-intro", "name": "비서 개론", "questions": [
                    {"q": "비서의 정의를 설명하시오.", "a": "상사 업무보좌, 사무지원 전문가"},
                    {"q": "비서의 자질을 설명하시오.", "a": "성실, 책임감, 기밀유지, 융통성"},
                    {"q": "비서의 유형을 설명하시오.", "a": "개인비서, 그룹비서, 법률/의료비서"},
                    {"q": "직업윤리를 설명하시오.", "a": "기밀유지, 정직, 충성, 전문성"},
                    {"q": "업무태도를 설명하시오.", "a": "적극적, 신속정확, 협조적"}
                ]},
                {"id": "basic-skill", "name": "기초 스킬", "questions": [
                    {"q": "문서작성 기초를 설명하시오.", "a": "워드프로세서, 한글맞춤법, 서식"},
                    {"q": "엑셀 활용을 설명하시오.", "a": "표작성, 함수, 차트, 데이터정리"},
                    {"q": "프레젠테이션을 설명하시오.", "a": "PPT 작성, 발표자료 구성"},
                    {"q": "이메일 기초를 설명하시오.", "a": "작성, 첨부, 회신, 전달"},
                    {"q": "캘린더 관리를 설명하시오.", "a": "일정등록, 공유, 알림설정"}
                ]}
            ]},
            {"id": "office-manner", "name": "사무 매너", "topics": [
                {"id": "business-etiquette", "name": "비즈니스 에티켓", "questions": [
                    {"q": "복장 규정을 설명하시오.", "a": "비즈니스 정장, TPO 고려"},
                    {"q": "인사 예절을 설명하시오.", "a": "목례, 악수, 적절한 인사말"},
                    {"q": "명함 예절을 설명하시오.", "a": "양손 교환, 테이블위 정리"},
                    {"q": "좌석 예절을 설명하시오.", "a": "상석 위치, 안내 순서"},
                    {"q": "식사 예절을 설명하시오.", "a": "테이블매너, 건배예절"}
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

export default function OfficeCategoryPage() {{
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
          <span className="text-6xl mb-4 block">💼</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY['name']}</h1>
          <p className="text-{CATEGORY['color1']}-100">사무, 컴퓨터, 비서 분야 자격증 {len(CERTS)}개</p>
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
            <p className="text-gray-600">대한상공회의소, 한국산업인력공단에서 시행하는 자격시험입니다.</p>
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
            <p className="text-gray-600">필기: 과목당 40점 이상, 평균 60점 이상 / 실기: 70점 이상</p>
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
    base_dir = "C:/todo/today/자격시험/office"

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
