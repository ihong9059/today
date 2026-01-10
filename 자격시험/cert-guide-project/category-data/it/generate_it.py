import os

# IT·정보통신 카테고리 설정
CATEGORY_ID = "it"
CATEGORY_NAME = "IT·정보통신"
CATEGORY_COLOR1 = "blue"
CATEGORY_COLOR2 = "indigo"
CATEGORY_EMOJI = "💻"

CERTS = [
    {
        "id": "information-processor",
        "name": "정보처리기사",
        "emoji": "🖥️",
        "desc": "소프트웨어 개발 및 관리",
        "subjects": [
            {"id": "software-design", "name": "소프트웨어 설계", "topics": [
                {"id": "requirement-analysis", "name": "요구사항 분석", "questions": [
                    {"q": "요구사항 분석 기법을 설명하시오.", "a": "인터뷰, 설문, 프로토타이핑, 유스케이스"},
                    {"q": "기능적 요구사항과 비기능적 요구사항을 구분하시오.", "a": "기능: 시스템이 해야 할 일, 비기능: 성능/보안/품질"},
                    {"q": "요구사항 명세서의 구성요소를 설명하시오.", "a": "시스템 개요, 기능요구, 비기능요구, 제약사항"},
                    {"q": "요구사항 검증 기법을 설명하시오.", "a": "워크스루, 인스펙션, 동료검토"},
                    {"q": "요구공학 프로세스를 설명하시오.", "a": "도출→분석→명세→확인"},
                ]},
                {"id": "uml", "name": "UML", "questions": [
                    {"q": "UML 다이어그램의 종류를 설명하시오.", "a": "클래스, 시퀀스, 유스케이스, 상태, 활동 다이어그램"},
                    {"q": "클래스 다이어그램의 관계를 설명하시오.", "a": "연관, 집합, 합성, 의존, 상속, 구현"},
                    {"q": "시퀀스 다이어그램의 구성요소를 설명하시오.", "a": "객체, 생명선, 메시지, 활성화박스"},
                    {"q": "유스케이스 다이어그램의 관계를 설명하시오.", "a": "포함(include), 확장(extend), 일반화"},
                    {"q": "상태 다이어그램의 구성요소를 설명하시오.", "a": "상태, 전이, 이벤트, 액션"},
                ]},
            ]},
            {"id": "software-development", "name": "소프트웨어 개발", "topics": [
                {"id": "data-structure", "name": "자료구조", "questions": [
                    {"q": "스택과 큐의 차이를 설명하시오.", "a": "스택: LIFO, 큐: FIFO"},
                    {"q": "이진트리의 순회 방법을 설명하시오.", "a": "전위, 중위, 후위, 레벨 순회"},
                    {"q": "해시테이블의 충돌 해결 방법을 설명하시오.", "a": "체이닝, 개방주소법(선형탐색, 이차탐색)"},
                    {"q": "그래프의 표현 방법을 설명하시오.", "a": "인접행렬, 인접리스트"},
                    {"q": "힙(Heap)의 특성을 설명하시오.", "a": "완전이진트리, 부모≥자식(최대힙) 또는 부모≤자식(최소힙)"},
                ]},
                {"id": "algorithm", "name": "알고리즘", "questions": [
                    {"q": "정렬 알고리즘의 시간복잡도를 비교하시오.", "a": "버블O(n²), 퀵O(nlogn), 병합O(nlogn)"},
                    {"q": "탐색 알고리즘을 설명하시오.", "a": "순차탐색O(n), 이진탐색O(logn)"},
                    {"q": "그래프 탐색 알고리즘을 비교하시오.", "a": "DFS(깊이우선), BFS(너비우선)"},
                    {"q": "동적 프로그래밍을 설명하시오.", "a": "부분문제의 최적해를 저장하여 전체 최적해 도출"},
                    {"q": "분할정복 알고리즘을 설명하시오.", "a": "문제를 분할→해결→결합하는 방식"},
                ]},
            ]},
            {"id": "database", "name": "데이터베이스", "topics": [
                {"id": "db-design", "name": "DB 설계", "questions": [
                    {"q": "정규화의 단계를 설명하시오.", "a": "1NF→2NF→3NF→BCNF→4NF→5NF"},
                    {"q": "ER 다이어그램의 구성요소를 설명하시오.", "a": "개체, 속성, 관계"},
                    {"q": "반정규화의 목적을 설명하시오.", "a": "조회 성능 향상, 조인 횟수 감소"},
                    {"q": "이상현상(Anomaly)의 종류를 설명하시오.", "a": "삽입이상, 삭제이상, 갱신이상"},
                    {"q": "무결성 제약조건을 설명하시오.", "a": "개체무결성, 참조무결성, 도메인무결성"},
                ]},
                {"id": "sql", "name": "SQL", "questions": [
                    {"q": "DDL, DML, DCL을 구분하시오.", "a": "DDL:정의, DML:조작, DCL:제어"},
                    {"q": "JOIN의 종류를 설명하시오.", "a": "INNER, LEFT, RIGHT, FULL, CROSS JOIN"},
                    {"q": "서브쿼리의 종류를 설명하시오.", "a": "스칼라, 인라인뷰, 중첩 서브쿼리"},
                    {"q": "인덱스의 종류를 설명하시오.", "a": "클러스터드, 넌클러스터드, 복합 인덱스"},
                    {"q": "트랜잭션의 ACID 속성을 설명하시오.", "a": "원자성, 일관성, 고립성, 지속성"},
                ]},
            ]},
            {"id": "programming", "name": "프로그래밍 언어", "topics": [
                {"id": "oop", "name": "객체지향", "questions": [
                    {"q": "객체지향의 4대 특성을 설명하시오.", "a": "캡슐화, 상속, 다형성, 추상화"},
                    {"q": "SOLID 원칙을 설명하시오.", "a": "단일책임, 개방폐쇄, 리스코프, 인터페이스분리, 의존역전"},
                    {"q": "디자인 패턴의 종류를 설명하시오.", "a": "생성(Singleton), 구조(Adapter), 행위(Observer)"},
                    {"q": "오버로딩과 오버라이딩을 비교하시오.", "a": "오버로딩: 같은이름 다른매개변수, 오버라이딩: 상속후 재정의"},
                    {"q": "추상클래스와 인터페이스를 비교하시오.", "a": "추상클래스: 단일상속/구현포함, 인터페이스: 다중상속/명세만"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "coding", "name": "코딩", "questions": [
                    {"q": "C언어 포인터 개념을 설명하시오.", "a": "메모리 주소를 저장하는 변수"},
                    {"q": "Java 예외처리 방법을 설명하시오.", "a": "try-catch-finally, throws"},
                    {"q": "Python 리스트 컴프리헨션을 설명하시오.", "a": "[표현식 for 항목 in 반복가능객체 if 조건]"},
                    {"q": "재귀함수의 종료조건을 설명하시오.", "a": "기저조건(Base Case) 설정 필수"},
                    {"q": "배열과 연결리스트를 비교하시오.", "a": "배열: 인덱스접근O(1), 연결리스트: 삽입삭제O(1)"},
                ]},
            ]},
        ]
    },
    {
        "id": "information-security",
        "name": "정보보안기사",
        "emoji": "🔐",
        "desc": "정보시스템 보안",
        "subjects": [
            {"id": "system-security", "name": "시스템 보안", "topics": [
                {"id": "os-security", "name": "운영체제 보안", "questions": [
                    {"q": "접근통제 모델을 설명하시오.", "a": "DAC, MAC, RBAC"},
                    {"q": "버퍼 오버플로우 대응책을 설명하시오.", "a": "스택가드, ASLR, DEP"},
                    {"q": "리눅스 파일 권한을 설명하시오.", "a": "r(4)w(2)x(1), chmod 755"},
                    {"q": "프로세스 격리 기법을 설명하시오.", "a": "샌드박스, 컨테이너, 가상화"},
                    {"q": "시스템 로그 분석 항목을 설명하시오.", "a": "syslog, auth.log, secure"},
                ]},
            ]},
            {"id": "network-security", "name": "네트워크 보안", "topics": [
                {"id": "attack-defense", "name": "공격과 방어", "questions": [
                    {"q": "DDoS 공격 유형을 설명하시오.", "a": "SYN Flood, UDP Flood, HTTP Flood"},
                    {"q": "방화벽의 종류를 설명하시오.", "a": "패킷필터링, 상태검사, 애플리케이션"},
                    {"q": "IDS와 IPS의 차이를 설명하시오.", "a": "IDS: 탐지/알림, IPS: 탐지/차단"},
                    {"q": "VPN의 프로토콜을 설명하시오.", "a": "IPSec, SSL/TLS, PPTP, L2TP"},
                    {"q": "스니핑과 스푸핑을 설명하시오.", "a": "스니핑: 도청, 스푸핑: 위장"},
                ]},
            ]},
            {"id": "application-security", "name": "어플리케이션 보안", "topics": [
                {"id": "web-security", "name": "웹 보안", "questions": [
                    {"q": "OWASP Top 10을 설명하시오.", "a": "인젝션, 인증, XSS, CSRF 등"},
                    {"q": "SQL Injection 대응책을 설명하시오.", "a": "PreparedStatement, 입력값 검증"},
                    {"q": "XSS 공격 유형을 설명하시오.", "a": "Stored, Reflected, DOM-based"},
                    {"q": "CSRF 방어 기법을 설명하시오.", "a": "CSRF 토큰, SameSite 쿠키, Referer 검증"},
                    {"q": "세션 하이재킹 대응책을 설명하시오.", "a": "세션 타임아웃, 세션 재생성, HTTPS"},
                ]},
            ]},
            {"id": "cryptography", "name": "암호학", "topics": [
                {"id": "encryption", "name": "암호화", "questions": [
                    {"q": "대칭키와 비대칭키 암호화를 비교하시오.", "a": "대칭키: 같은키, 비대칭키: 공개키/개인키"},
                    {"q": "해시함수의 특성을 설명하시오.", "a": "일방향성, 충돌저항성, 역상저항성"},
                    {"q": "AES와 RSA를 비교하시오.", "a": "AES: 대칭키 128/192/256비트, RSA: 비대칭키"},
                    {"q": "전자서명의 원리를 설명하시오.", "a": "개인키로 서명, 공개키로 검증"},
                    {"q": "PKI 구성요소를 설명하시오.", "a": "CA, RA, CRL, 인증서"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "security-practice", "name": "보안 실무", "questions": [
                    {"q": "취약점 진단 절차를 설명하시오.", "a": "정보수집→취약점분석→침투테스트→보고서"},
                    {"q": "포렌식 분석 절차를 설명하시오.", "a": "수집→보존→분석→보고"},
                    {"q": "보안 정책 구성요소를 설명하시오.", "a": "목표, 범위, 역할, 절차, 제재"},
                    {"q": "ISMS 인증 요건을 설명하시오.", "a": "관리체계, 보호대책, 기술적 통제"},
                    {"q": "위험분석 방법론을 설명하시오.", "a": "자산식별→위협분석→취약점분석→위험평가"},
                ]},
            ]},
        ]
    },
    {
        "id": "network-admin",
        "name": "네트워크관리사",
        "emoji": "🌐",
        "desc": "네트워크 구축 및 관리",
        "subjects": [
            {"id": "network-theory", "name": "네트워크 이론", "topics": [
                {"id": "osi-layer", "name": "OSI 7계층", "questions": [
                    {"q": "OSI 7계층을 설명하시오.", "a": "물리-데이터링크-네트워크-전송-세션-표현-응용"},
                    {"q": "TCP/IP 4계층을 설명하시오.", "a": "네트워크액세스-인터넷-전송-응용"},
                    {"q": "각 계층별 PDU를 설명하시오.", "a": "비트-프레임-패킷-세그먼트-데이터"},
                    {"q": "캡슐화와 역캡슐화를 설명하시오.", "a": "헤더추가(캡슐화), 헤더제거(역캡슐화)"},
                    {"q": "계층별 프로토콜을 설명하시오.", "a": "L2:이더넷, L3:IP, L4:TCP/UDP, L7:HTTP"},
                ]},
            ]},
            {"id": "network-equipment", "name": "네트워크 장비", "topics": [
                {"id": "device", "name": "장비 구성", "questions": [
                    {"q": "라우터와 스위치의 차이를 설명하시오.", "a": "라우터: L3 IP기반, 스위치: L2 MAC기반"},
                    {"q": "VLAN의 개념을 설명하시오.", "a": "논리적 네트워크 분할, 브로드캐스트 도메인 분리"},
                    {"q": "허브와 스위치를 비교하시오.", "a": "허브: 플러딩, 스위치: MAC학습/포워딩"},
                    {"q": "L3 스위치의 특징을 설명하시오.", "a": "라우팅+스위칭, 하드웨어 기반 빠른 처리"},
                    {"q": "로드밸런서의 역할을 설명하시오.", "a": "트래픽 분산, 고가용성, 헬스체크"},
                ]},
            ]},
            {"id": "protocol", "name": "프로토콜", "topics": [
                {"id": "tcp-ip", "name": "TCP/IP", "questions": [
                    {"q": "TCP와 UDP의 차이를 설명하시오.", "a": "TCP: 연결지향/신뢰성, UDP: 비연결/빠른속도"},
                    {"q": "IP 주소 클래스를 설명하시오.", "a": "A(0-127), B(128-191), C(192-223)"},
                    {"q": "서브넷팅을 설명하시오.", "a": "네트워크 분할, 서브넷마스크 활용"},
                    {"q": "ARP와 RARP를 설명하시오.", "a": "ARP: IP→MAC, RARP: MAC→IP"},
                    {"q": "DHCP 동작 원리를 설명하시오.", "a": "Discover→Offer→Request→Ack"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "config", "name": "장비 설정", "questions": [
                    {"q": "라우터 기본 설정 명령어를 나열하시오.", "a": "enable, configure terminal, hostname, interface"},
                    {"q": "OSPF 설정 명령어를 설명하시오.", "a": "router ospf, network, area"},
                    {"q": "ACL 설정 방법을 설명하시오.", "a": "access-list, permit/deny, ip access-group"},
                    {"q": "NAT 설정 방법을 설명하시오.", "a": "ip nat inside/outside, pool, overload"},
                    {"q": "VLAN 설정 명령어를 설명하시오.", "a": "vlan, switchport access/trunk, allowed vlan"},
                ]},
            ]},
        ]
    },
    {
        "id": "computer-organization",
        "name": "전자계산기조직응용기사",
        "emoji": "⚙️",
        "desc": "컴퓨터시스템 응용",
        "subjects": [
            {"id": "computer-architecture", "name": "전자계산기 구조", "topics": [
                {"id": "cpu", "name": "CPU 구조", "questions": [
                    {"q": "CPU의 구성요소를 설명하시오.", "a": "ALU, 제어장치, 레지스터"},
                    {"q": "파이프라이닝을 설명하시오.", "a": "명령어 중첩 실행으로 성능 향상"},
                    {"q": "명령어 사이클을 설명하시오.", "a": "인출→해독→실행→저장"},
                    {"q": "RISC와 CISC를 비교하시오.", "a": "RISC: 단순명령어/빠른실행, CISC: 복잡명령어/많은기능"},
                    {"q": "인터럽트의 종류를 설명하시오.", "a": "하드웨어, 소프트웨어, 외부, 내부 인터럽트"},
                ]},
                {"id": "memory", "name": "메모리", "questions": [
                    {"q": "캐시 메모리의 사상 방식을 설명하시오.", "a": "직접, 연관, 집합연관 사상"},
                    {"q": "가상 메모리를 설명하시오.", "a": "보조기억장치를 주기억장치처럼 사용"},
                    {"q": "메모리 계층 구조를 설명하시오.", "a": "레지스터→캐시→RAM→SSD→HDD"},
                    {"q": "페이지 교체 알고리즘을 설명하시오.", "a": "FIFO, LRU, LFU, Optimal"},
                    {"q": "TLB의 역할을 설명하시오.", "a": "가상주소→물리주소 변환 캐시"},
                ]},
            ]},
            {"id": "operating-system", "name": "운영체제", "topics": [
                {"id": "process", "name": "프로세스 관리", "questions": [
                    {"q": "프로세스 스케줄링 알고리즘을 설명하시오.", "a": "FCFS, SJF, RR, 우선순위"},
                    {"q": "교착상태 조건을 설명하시오.", "a": "상호배제, 점유대기, 비선점, 순환대기"},
                    {"q": "프로세스와 스레드를 비교하시오.", "a": "프로세스: 독립메모리, 스레드: 공유메모리"},
                    {"q": "문맥교환(Context Switch)을 설명하시오.", "a": "CPU가 다른 프로세스로 전환시 상태 저장/복원"},
                    {"q": "세마포어와 뮤텍스를 비교하시오.", "a": "세마포어: 카운팅, 뮤텍스: 이진(0/1)"},
                ]},
            ]},
            {"id": "data-communication", "name": "데이터통신", "topics": [
                {"id": "transmission", "name": "전송 기술", "questions": [
                    {"q": "데이터 전송 방식을 설명하시오.", "a": "단방향, 반이중, 전이중"},
                    {"q": "다중화 기법을 설명하시오.", "a": "FDM, TDM, CDM, WDM"},
                    {"q": "변조 방식을 설명하시오.", "a": "AM, FM, PM, PCM"},
                    {"q": "오류 검출/정정 방식을 설명하시오.", "a": "패리티, CRC, 해밍코드"},
                    {"q": "흐름제어 방식을 설명하시오.", "a": "Stop-and-Wait, 슬라이딩 윈도우"},
                ]},
            ]},
            {"id": "practical", "name": "실기", "topics": [
                {"id": "system-practice", "name": "시스템 실무", "questions": [
                    {"q": "시스템 성능 분석 지표를 설명하시오.", "a": "처리량, 응답시간, 가용성, 신뢰성"},
                    {"q": "병렬처리 기법을 설명하시오.", "a": "SISD, SIMD, MISD, MIMD"},
                    {"q": "입출력 방식을 설명하시오.", "a": "프로그램 I/O, 인터럽트, DMA"},
                    {"q": "RAID 레벨을 설명하시오.", "a": "RAID 0(스트라이핑), 1(미러링), 5(패리티)"},
                    {"q": "클러스터링을 설명하시오.", "a": "Active-Active, Active-Standby 구성"},
                ]},
            ]},
        ]
    },
    {
        "id": "computer-system-pro",
        "name": "컴퓨터시스템응용기술사",
        "emoji": "🏆",
        "desc": "최고급 전문가",
        "subjects": [
            {"id": "system-design", "name": "시스템 설계", "topics": [
                {"id": "architecture", "name": "아키텍처", "questions": [
                    {"q": "엔터프라이즈 아키텍처를 설명하시오.", "a": "비즈니스, 데이터, 기술, 어플리케이션 아키텍처"},
                    {"q": "마이크로서비스 아키텍처를 설명하시오.", "a": "독립적 서비스 단위로 분리, API 통신"},
                    {"q": "SOA와 MSA를 비교하시오.", "a": "SOA: ESB중심, MSA: API게이트웨이중심"},
                    {"q": "이벤트 드리븐 아키텍처를 설명하시오.", "a": "이벤트 발행/구독, 비동기 처리, 느슨한 결합"},
                    {"q": "CQRS 패턴을 설명하시오.", "a": "명령(Write)과 조회(Read) 분리"},
                ]},
            ]},
            {"id": "emerging-tech", "name": "신기술", "topics": [
                {"id": "cloud-ai", "name": "클라우드/AI", "questions": [
                    {"q": "클라우드 서비스 모델을 설명하시오.", "a": "IaaS, PaaS, SaaS"},
                    {"q": "AI/ML 기술 동향을 설명하시오.", "a": "딥러닝, 자연어처리, 컴퓨터비전"},
                    {"q": "컨테이너 오케스트레이션을 설명하시오.", "a": "Kubernetes, Docker Swarm, 자동스케일링"},
                    {"q": "서버리스 컴퓨팅을 설명하시오.", "a": "Lambda, Functions, 이벤트기반 실행"},
                    {"q": "블록체인 기술을 설명하시오.", "a": "분산원장, 합의알고리즘, 스마트컨트랙트"},
                ]},
            ]},
            {"id": "practical", "name": "면접", "topics": [
                {"id": "interview", "name": "면접 대비", "questions": [
                    {"q": "기술사로서의 역할을 설명하시오.", "a": "기술자문, 감리, 설계, 품질관리"},
                    {"q": "디지털 전환(DX)을 설명하시오.", "a": "디지털 기술로 비즈니스 혁신"},
                    {"q": "제로 트러스트 보안을 설명하시오.", "a": "Never Trust, Always Verify"},
                    {"q": "DevSecOps를 설명하시오.", "a": "개발+보안+운영 통합, 보안 내재화"},
                    {"q": "그린 IT를 설명하시오.", "a": "에너지 효율, 탄소배출 감소, 친환경 데이터센터"},
                ]},
            ]},
        ]
    },
    {
        "id": "information-management-pro",
        "name": "정보관리기술사",
        "emoji": "📊",
        "desc": "최고급 전문가",
        "subjects": [
            {"id": "information-strategy", "name": "정보전략계획", "topics": [
                {"id": "isp", "name": "ISP/EA", "questions": [
                    {"q": "정보전략계획(ISP)을 설명하시오.", "a": "현행분석→목표설계→실행계획"},
                    {"q": "EA 프레임워크를 설명하시오.", "a": "Zachman, TOGAF, FEAF"},
                    {"q": "BPR과 PI를 비교하시오.", "a": "BPR: 급진적 혁신, PI: 점진적 개선"},
                    {"q": "IT 투자 평가 방법을 설명하시오.", "a": "ROI, NPV, IRR, TCO"},
                    {"q": "정보화 성숙도 모델을 설명하시오.", "a": "CMMI, SPICE, ITIL"},
                ]},
            ]},
            {"id": "project-management", "name": "프로젝트관리", "topics": [
                {"id": "pm-process", "name": "PM 프로세스", "questions": [
                    {"q": "PMBOK 지식영역을 설명하시오.", "a": "범위, 일정, 원가, 품질, 자원, 통신, 리스크, 조달, 이해관계자"},
                    {"q": "애자일 방법론을 설명하시오.", "a": "스크럼, 칸반, XP, 린"},
                    {"q": "WBS를 설명하시오.", "a": "작업분류체계, 범위관리, 상향식/하향식"},
                    {"q": "리스크 관리 프로세스를 설명하시오.", "a": "식별→분석→대응→모니터링"},
                    {"q": "EVM을 설명하시오.", "a": "성과관리, PV/EV/AC, SPI/CPI"},
                ]},
            ]},
            {"id": "practical", "name": "면접", "topics": [
                {"id": "interview", "name": "면접 대비", "questions": [
                    {"q": "IT 거버넌스를 설명하시오.", "a": "IT 자원과 정보의 효율적 활용을 위한 의사결정 체계"},
                    {"q": "디지털 플랫폼 정부를 설명하시오.", "a": "데이터 기반 행정, 원스톱 서비스"},
                    {"q": "데이터 3법을 설명하시오.", "a": "개인정보보호법, 정보통신망법, 신용정보법 개정"},
                    {"q": "공공 클라우드 도입을 설명하시오.", "a": "클라우드 우선정책, 보안인증, 비용절감"},
                    {"q": "AI 윤리를 설명하시오.", "a": "투명성, 공정성, 책임성, 안전성"},
                ]},
            ]},
        ]
    },
]
def create_dir(path):
    os.makedirs(path, exist_ok=True)

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created: {path}")

# 카테고리 페이지
def gen_category_page():
    certs_list = ",\n    ".join([
        f'''{{ id: '{c["id"]}', name: '{c["name"]}', emoji: '{c["emoji"]}', desc: '{c["desc"]}', hasPage: true }}'''
        for c in CERTS
    ])

    return f'''\'use client\';

import Link from 'next/link';

const certifications = [
    {certs_list}
];

export default function ITCategoryPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{CATEGORY_NAME}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">{CATEGORY_EMOJI}</span>
          <h1 className="text-4xl font-bold mb-4">{CATEGORY_NAME}</h1>
          <p className="text-xl text-{CATEGORY_COLOR1}-100">정보처리, 보안, 네트워크 분야 자격증</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{certifications.map((cert) => (
            <Link
              key={{cert.id}}
              href={{cert.hasPage ? `/category/{CATEGORY_ID}/${{cert.id}}` : '#'}}
              className={{`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition ${{!cert.hasPage && 'opacity-50 cursor-not-allowed'}}`}}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{{cert.emoji}}</span>
                <div>
                  <h2 className="font-bold text-lg text-gray-800">{{cert.name}}</h2>
                  <p className="text-sm text-gray-500">{{cert.desc}}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-{CATEGORY_COLOR1}-600 text-sm font-medium">{{cert.hasPage ? '학습하기 →' : '준비중'}}</span>
              </div>
            </Link>
          ))}}
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

# 자격증 메인 페이지
def gen_main_page(cert):
    subjects_list = ",\n    ".join([
        f'''{{ id: '{s["id"]}', name: '{s["name"]}', emoji: '📖', desc: '{s["name"]} 학습' }}'''
        for s in cert["subjects"]
    ])

    return f'''\'use client\';

import Link from 'next/link';

const subjects = [
    {subjects_list}
];

export default function {cert["id"].replace("-", "").title()}MainPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{cert["name"]}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">{cert["emoji"]}</span>
          <h1 className="text-4xl font-bold mb-4">{cert["name"]}</h1>
          <p className="text-xl text-{CATEGORY_COLOR1}-100">{cert["desc"]}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/category/{CATEGORY_ID}/{cert["id"]}/exam" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📋</span>
              <div>
                <h2 className="font-bold text-lg text-gray-800">시험 정보</h2>
                <p className="text-sm text-gray-500">시험 일정, 응시자격, 합격기준</p>
              </div>
            </div>
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 과목별 학습</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {{subjects.map((subject) => (
            <Link
              key={{subject.id}}
              href={{`/category/{CATEGORY_ID}/{cert["id"]}/study/${{subject.id}}`}}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{{subject.emoji}}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{{subject.name}}</h3>
                  <p className="text-sm text-gray-500">{{subject.desc}}</p>
                </div>
              </div>
            </Link>
          ))}}
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

# 시험 정보 페이지
def gen_exam_page(cert):
    return f'''\'use client\';

import Link from 'next/link';

export default function {cert["id"].replace("-", "").title()}ExamPage() {{
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">시험 정보</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{cert["name"]} 시험 정보</h1>
          <p className="text-{CATEGORY_COLOR1}-100">{cert["desc"]}</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📅 시험 일정</h2>
            <p className="text-gray-600">한국산업인력공단 Q-Net에서 확인</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📝 응시 자격</h2>
            <p className="text-gray-600">관련 학과 졸업 또는 경력 요건</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✅ 합격 기준</h2>
            <p className="text-gray-600">필기: 과목당 40점, 평균 60점 이상<br/>실기: 60점 이상</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💰 응시 비용</h2>
            <p className="text-gray-600">필기: 19,400원 / 실기: 22,600원</p>
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

# Study 페이지
def gen_study_page(cert, subject):
    topics_list = []
    for topic in subject["topics"]:
        questions_list = []
        for i, q in enumerate(topic["questions"], 1):
            prompt = f'{cert["name"]} {subject["name"]} 문제입니다.\\n\\n문제: {q["q"]}\\n\\n다음 순서로 설명해주세요:\\n1. 핵심 개념 정리\\n2. 상세 설명\\n3. 적용 예시\\n4. 관련 공식\\n5. 연습문제 3개'
            questions_list.append(f'''{{
        id: {i},
        question: '{q["q"]}',
        answer: '{q["a"]}',
        prompt: `{prompt}`
      }}''')

        topics_list.append(f'''{{
    id: '{topic["id"]}',
    name: '{topic["name"]}',
    color: 'from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500',
    questions: [
      {",".join(questions_list)}
    ]
  }}''')

    func_name = subject["id"].replace("-", "").title() + "StudyPage"
    storage_key = subject["id"] + "-progress"

    return f'''\'use client\';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

const topics = [
  {",".join(topics_list)}
];

export default function {func_name}() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({{}});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({{}});

  useEffect(() => {{
    const saved = localStorage.getItem('{storage_key}');
    if (saved) setCompletedQuestions(JSON.parse(saved));
    const allExpanded: Record<string, boolean> = {{}};
    topics.forEach((t) => {{ allExpanded[t.id] = true; }});
    setExpandedTopics(allExpanded);
  }}, []);

  const toggleComplete = (topicId: string, questionId: number) => {{
    const key = topicId + "-" + questionId;
    const newCompleted = {{ ...completedQuestions, [key]: !completedQuestions[key] }};
    setCompletedQuestions(newCompleted);
    localStorage.setItem('{storage_key}', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{CATEGORY_NAME}</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/{CATEGORY_ID}/{cert["id"]}" className="text-gray-600 hover:text-{CATEGORY_COLOR1}-600">{cert["name"]}</Link>
            <span className="text-gray-300">›</span>
            <span className="text-{CATEGORY_COLOR1}-600 font-medium">{subject["name"]}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-{CATEGORY_COLOR1}-500 to-{CATEGORY_COLOR2}-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">{cert["emoji"]}</span></div>
              <div>
                <h1 className="text-2xl font-bold">{subject["name"]} 학습</h1>
                <p className="text-{CATEGORY_COLOR1}-100">{cert["name"]}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{{progress}}%</p>
              <p className="text-{CATEGORY_COLOR1}-100 text-sm">{{completedCount}}/{{totalQuestions}} 완료</p>
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

# 메인 실행
base_path = os.path.dirname(os.path.abspath(__file__))

# 카테고리 폴더
create_dir(base_path)
write_file(os.path.join(base_path, "page.tsx"), "export { default } from './category-page';")
write_file(os.path.join(base_path, "category-page.tsx"), gen_category_page())

# 각 자격증
for cert in CERTS:
    cert_path = os.path.join(base_path, cert["id"])
    create_dir(cert_path)

    # page.tsx, main-page.tsx
    write_file(os.path.join(cert_path, "page.tsx"), "export { default } from './main-page';")
    write_file(os.path.join(cert_path, "main-page.tsx"), gen_main_page(cert))

    # exam 폴더
    exam_path = os.path.join(cert_path, "exam")
    create_dir(exam_path)
    write_file(os.path.join(exam_path, "page.tsx"), "export { default } from '../exam-page';")
    write_file(os.path.join(cert_path, "exam-page.tsx"), gen_exam_page(cert))

    # study 폴더
    for subject in cert["subjects"]:
        study_path = os.path.join(cert_path, "study", subject["id"])
        create_dir(study_path)
        write_file(os.path.join(study_path, "page.tsx"), gen_study_page(cert, subject))

print("\\n✅ IT·정보통신 카테고리 생성 완료!")
