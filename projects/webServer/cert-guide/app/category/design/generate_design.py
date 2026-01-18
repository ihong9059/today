#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
디자인·문화 분야 자격시험 가이드 생성 스크립트
"""

import os

CATEGORY = {
    "id": "design",
    "name": "디자인·문화",
    "color1": "pink",
    "color2": "rose",
    "gradient": "from-pink-500 to-rose-500"
}

CERTIFICATIONS = [
    {
        "id": "computer-graphics",
        "name": "컴퓨터그래픽스운용기능사",
        "desc": "그래픽 디자인 실무 능력",
        "icon": "🖥️",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "cg-theory",
                "name": "필기과목",
                "topics": [
                    {"id": "design-basics", "name": "디자인 기초", "color": "from-pink-500 to-rose-600", "questions": [
                        {"id": 1, "question": "디자인의 4대 조형요소는?", "answer": "점, 선, 면, 입체. 점은 위치, 선은 방향, 면은 공간, 입체는 부피 표현"},
                        {"id": 2, "question": "통일성(Unity)의 원리란?", "answer": "디자인 요소들이 조화롭게 하나로 보이는 것. 반복, 유사성, 연속으로 달성"},
                        {"id": 3, "question": "황금비율의 값은?", "answer": "1:1.618. 자연과 예술에서 아름다운 비례로 인정되는 황금분할"},
                        {"id": 4, "question": "게슈탈트 이론이란?", "answer": "전체는 부분의 합보다 크다. 근접성, 유사성, 연속성, 폐쇄성 법칙"},
                        {"id": 5, "question": "대비(Contrast)의 종류는?", "answer": "형태대비, 색채대비, 질감대비, 크기대비. 시각적 긴장감과 강조 효과"}
                    ]},
                    {"id": "color-theory", "name": "색채학", "color": "from-purple-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "색의 3속성은?", "answer": "색상(Hue), 명도(Value), 채도(Chroma). 모든 색을 표현하는 기본 요소"},
                        {"id": 2, "question": "RGB와 CMYK 차이는?", "answer": "RGB(가산혼합, 빛, 모니터), CMYK(감산혼합, 잉크, 인쇄). 색역 차이"},
                        {"id": 3, "question": "먼셀 색체계 표기법은?", "answer": "H V/C (색상 명도/채도). 10 색상환, 무채색~유채색 체계적 분류"},
                        {"id": 4, "question": "보색대비란?", "answer": "색상환에서 반대편 색의 대비. 서로 강조, 채도가 높아 보이는 효과"},
                        {"id": 5, "question": "색온도(Color Temperature)란?", "answer": "빛의 색상을 켈빈(K) 단위로 표현. 낮을수록 따뜻한 색, 높을수록 차가운 색"}
                    ]},
                    {"id": "typography", "name": "타이포그래피", "color": "from-gray-600 to-slate-700", "questions": [
                        {"id": 1, "question": "세리프와 산세리프 차이는?", "answer": "세리프(획 끝 장식 있음, 명조체), 산세리프(장식 없음, 고딕체)"},
                        {"id": 2, "question": "커닝(Kerning)이란?", "answer": "글자와 글자 사이의 간격 조정. 가독성과 시각적 균형 향상"},
                        {"id": 3, "question": "행간(Leading)이란?", "answer": "줄과 줄 사이의 수직 간격. 글자 크기의 120~150%가 적정"},
                        {"id": 4, "question": "포인트(pt)와 픽셀(px) 관계는?", "answer": "1pt = 1/72인치. 72dpi 기준 1pt = 1px. 인쇄/웹 단위 차이"},
                        {"id": 5, "question": "OTF와 TTF 폰트 차이는?", "answer": "OTF(OpenType, 기능많음), TTF(TrueType, 호환성). OTF가 고급 타이포그래피 지원"}
                    ]}
                ]
            },
            {
                "id": "cg-software",
                "name": "그래픽 소프트웨어",
                "topics": [
                    {"id": "photoshop", "name": "포토샵", "color": "from-blue-500 to-cyan-600", "questions": [
                        {"id": 1, "question": "레이어 마스크의 역할은?", "answer": "이미지 일부를 비파괴적으로 숨기거나 표시. 흰색=보임, 검정=숨김"},
                        {"id": 2, "question": "블렌딩 모드 Multiply 효과는?", "answer": "어두운 색이 더 어두워지는 곱하기 효과. 그림자, 질감 표현에 활용"},
                        {"id": 3, "question": "스마트 오브젝트 장점은?", "answer": "비파괴 편집, 원본 유지, 필터 재편집 가능, 확대해도 품질 유지"},
                        {"id": 4, "question": "해상도(Resolution)란?", "answer": "이미지 세밀도. 웹용 72dpi, 인쇄용 300dpi 이상 권장"},
                        {"id": 5, "question": "조정 레이어(Adjustment Layer) 장점은?", "answer": "비파괴 색상 보정, 언제든 수정 가능, 여러 레이어에 동시 적용"}
                    ]},
                    {"id": "illustrator", "name": "일러스트레이터", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "벡터 그래픽 장점은?", "answer": "확대해도 화질 저하 없음, 파일 크기 작음, 편집 용이, 인쇄에 적합"},
                        {"id": 2, "question": "베지어 곡선이란?", "answer": "앵커 포인트와 핸들로 곡선 제어. 펜 도구의 핵심 원리"},
                        {"id": 3, "question": "패스파인더 기능은?", "answer": "오브젝트 합치기(Unite), 빼기(Minus Front), 교차(Intersect), 나누기"},
                        {"id": 4, "question": "클리핑 마스크란?", "answer": "상위 오브젝트 모양으로 하위 오브젝트를 자르기. Ctrl+7로 생성"},
                        {"id": 5, "question": "심볼(Symbol) 활용은?", "answer": "반복 사용 요소 저장. 일괄 수정 가능, 파일 크기 감소, 작업 효율화"}
                    ]},
                    {"id": "file-formats", "name": "파일 형식", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "PSD, AI, INDD 파일 차이는?", "answer": "PSD(포토샵), AI(일러스트), INDD(인디자인). 각 프로그램 원본 작업 파일"},
                        {"id": 2, "question": "JPEG와 PNG 차이는?", "answer": "JPEG(손실압축, 사진용), PNG(무손실, 투명도 지원). 웹 이미지용"},
                        {"id": 3, "question": "PDF 장점은?", "answer": "플랫폼 독립적, 인쇄용 표준, 레이아웃 유지, 폰트 임베드 가능"},
                        {"id": 4, "question": "SVG 파일 특징은?", "answer": "XML 기반 벡터, 웹용, 확대축소 자유, CSS/JS로 제어 가능"},
                        {"id": 5, "question": "TIFF 파일 용도는?", "answer": "고품질 인쇄, 무손실 압축, 레이어 보존 가능, 전문 인쇄용"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "web-design",
        "name": "웹디자인기능사",
        "desc": "웹페이지 디자인 및 코딩",
        "icon": "🌐",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "web-code",
                "name": "웹 코딩",
                "topics": [
                    {"id": "html-basics", "name": "HTML 기초", "color": "from-orange-500 to-red-600", "questions": [
                        {"id": 1, "question": "HTML5 기본 구조는?", "answer": "<!DOCTYPE html>, <html>, <head>, <body>. 문서 타입과 구조 정의"},
                        {"id": 2, "question": "시맨틱 태그란?", "answer": "의미를 가진 태그. header, nav, main, article, section, footer"},
                        {"id": 3, "question": "인라인과 블록 요소 차이는?", "answer": "인라인(줄바꿈 없이 배치), 블록(한 줄 전체 차지). display로 변경 가능"},
                        {"id": 4, "question": "form 태그 method 속성은?", "answer": "GET(URL에 데이터), POST(본문에 데이터). 보안/크기에 따라 선택"},
                        {"id": 5, "question": "viewport meta 태그란?", "answer": "반응형 웹용 화면 크기/배율 설정. width=device-width, initial-scale=1"}
                    ]},
                    {"id": "css-basics", "name": "CSS 기초", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "CSS 선택자 우선순위는?", "answer": "!important > 인라인 > ID > 클래스 > 태그. 명시도(Specificity) 계산"},
                        {"id": 2, "question": "박스 모델 구성요소는?", "answer": "content, padding, border, margin. box-sizing으로 계산 방식 변경"},
                        {"id": 3, "question": "position 속성 종류는?", "answer": "static(기본), relative, absolute, fixed, sticky. 배치 기준 다름"},
                        {"id": 4, "question": "Flexbox 주요 속성은?", "answer": "display:flex, justify-content, align-items, flex-direction. 1차원 레이아웃"},
                        {"id": 5, "question": "미디어 쿼리란?", "answer": "@media로 화면 크기별 다른 CSS 적용. 반응형 웹 핵심 기술"}
                    ]},
                    {"id": "js-basics", "name": "JavaScript 기초", "color": "from-yellow-500 to-amber-600", "questions": [
                        {"id": 1, "question": "var, let, const 차이는?", "answer": "var(함수 스코프), let(블록, 재할당O), const(블록, 재할당X). let/const 권장"},
                        {"id": 2, "question": "DOM이란?", "answer": "Document Object Model. HTML을 객체로 표현, JS로 조작 가능"},
                        {"id": 3, "question": "이벤트 리스너 추가법은?", "answer": "element.addEventListener('event', function). 이벤트 버블링/캡처링"},
                        {"id": 4, "question": "함수 선언식과 표현식 차이는?", "answer": "선언식(호이스팅), 표현식(변수에 할당). 화살표 함수는 this 바인딩 다름"},
                        {"id": 5, "question": "배열 메서드 map, filter 용도는?", "answer": "map(변환), filter(조건필터), reduce(누적). 원본 배열 불변"}
                    ]}
                ]
            },
            {
                "id": "web-design-theory",
                "name": "웹디자인론",
                "topics": [
                    {"id": "ui-ux", "name": "UI/UX 디자인", "color": "from-purple-500 to-violet-600", "questions": [
                        {"id": 1, "question": "UI와 UX 차이는?", "answer": "UI(인터페이스 디자인), UX(사용자 경험 전체). UX가 더 넓은 개념"},
                        {"id": 2, "question": "와이어프레임이란?", "answer": "웹페이지 레이아웃 기본 골격. 저해상도 설계도, 기능 배치 중심"},
                        {"id": 3, "question": "사용성 5가지 요소는?", "answer": "학습성, 효율성, 기억성, 오류방지, 만족도. 닐슨의 사용성 원칙"},
                        {"id": 4, "question": "반응형 웹 디자인이란?", "answer": "화면 크기에 맞게 레이아웃 자동 조절. 미디어 쿼리, 유동적 그리드 활용"},
                        {"id": 5, "question": "웹 접근성이란?", "answer": "모든 사용자가 웹 이용 가능. WCAG 가이드라인, 대체 텍스트, 키보드 접근"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "product-design-engineer",
        "name": "제품디자인기사",
        "desc": "제품 디자인 전문가",
        "icon": "📦",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "product-theory",
                "name": "제품디자인론",
                "topics": [
                    {"id": "design-process", "name": "디자인 프로세스", "color": "from-blue-500 to-cyan-600", "questions": [
                        {"id": 1, "question": "디자인 씽킹 5단계는?", "answer": "공감→정의→아이디어→프로토타입→테스트. 사용자 중심 문제 해결"},
                        {"id": 2, "question": "더블 다이아몬드 모델이란?", "answer": "발산→수렴→발산→수렴. 문제 발견, 문제 정의, 해결책 개발, 구체화"},
                        {"id": 3, "question": "사용자 리서치 방법은?", "answer": "인터뷰, 설문조사, 관찰법, 페르소나, 여정맵. 사용자 니즈 파악"},
                        {"id": 4, "question": "프로토타이핑 종류는?", "answer": "페이퍼, 디지털, 물리적 프로토타입. 아이디어 검증, 반복 개선"},
                        {"id": 5, "question": "제품 라이프사이클이란?", "answer": "도입기→성장기→성숙기→쇠퇴기. 각 단계별 마케팅 전략 다름"}
                    ]},
                    {"id": "ergonomics", "name": "인간공학", "color": "from-green-500 to-teal-600", "questions": [
                        {"id": 1, "question": "인간공학이란?", "answer": "인간 특성에 맞게 제품 설계. 사용성, 안전성, 편의성 향상"},
                        {"id": 2, "question": "인체측정학이란?", "answer": "인체 치수 측정/분석. 제품 크기 결정의 기초 데이터"},
                        {"id": 3, "question": "5%, 50%, 95% 백분위 의미는?", "answer": "인구의 5%, 50%, 95%가 해당 치수 이하. 설계 범위 결정"},
                        {"id": 4, "question": "유니버설 디자인이란?", "answer": "모든 사람이 사용 가능한 디자인. 7가지 원칙, 장애 유무 불문"},
                        {"id": 5, "question": "어포던스란?", "answer": "사물이 행동을 유도하는 특성. 문 손잡이=당기기, 버튼=누르기"}
                    ]},
                    {"id": "materials", "name": "재료학", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "플라스틱 종류는?", "answer": "열가소성(PP, PE, ABS), 열경화성(에폭시). 가공성과 내열성 차이"},
                        {"id": 2, "question": "사출성형이란?", "answer": "녹인 플라스틱을 금형에 주입하여 제품 제작. 대량생산에 적합"},
                        {"id": 3, "question": "CMF란?", "answer": "Color(색상), Material(재료), Finishing(마감). 제품 감성품질 결정"},
                        {"id": 4, "question": "알루미늄 특징은?", "answer": "가볍고 내식성 우수, 열전도성 좋음. 아노다이징 표면처리 가능"},
                        {"id": 5, "question": "친환경 소재 종류는?", "answer": "생분해성 플라스틱, 재활용 소재, 바이오 소재. 지속가능 디자인"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "product-design-technician",
        "name": "제품디자인산업기사",
        "desc": "제품 디자인 기술자",
        "icon": "📦",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "product-basics",
                "name": "제품디자인 기초",
                "topics": [
                    {"id": "form-basics", "name": "조형 기초", "color": "from-pink-500 to-rose-600", "questions": [
                        {"id": 1, "question": "제품디자인 3요소는?", "answer": "기능, 심미성, 경제성. 세 요소의 균형이 좋은 디자인"},
                        {"id": 2, "question": "면(Plane)의 특성은?", "answer": "2차원 요소, 공간 분할, 경계 형성. 평면/곡면으로 형태 표현"},
                        {"id": 3, "question": "균형의 종류는?", "answer": "대칭균형, 비대칭균형, 방사균형. 안정감과 역동성 표현"},
                        {"id": 4, "question": "비례의 법칙은?", "answer": "황금비, 등비급수, 모듈러. 아름다운 형태 비율 결정"},
                        {"id": 5, "question": "조형미 결정 요소는?", "answer": "형태, 색채, 재질, 텍스처. 시각/촉각적 감성에 영향"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "visual-design-engineer",
        "name": "시각디자인기사",
        "desc": "시각매체 디자인 전문가",
        "icon": "🎨",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "visual-theory",
                "name": "시각디자인론",
                "topics": [
                    {"id": "visual-comm", "name": "시각커뮤니케이션", "color": "from-purple-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "시각커뮤니케이션 기본 요소는?", "answer": "발신자, 메시지, 채널, 수신자, 피드백. 효과적 정보 전달"},
                        {"id": 2, "question": "기호학이란?", "answer": "기호와 의미의 관계 연구. 디자인에서 의미 전달 원리"},
                        {"id": 3, "question": "아이콘, 인덱스, 심볼 차이는?", "answer": "아이콘(유사성), 인덱스(인과성), 심볼(약속). 퍼스의 기호 분류"},
                        {"id": 4, "question": "시각적 계층구조란?", "answer": "정보 중요도에 따라 시각적 강약 조절. 크기, 색상, 위치 활용"},
                        {"id": 5, "question": "그리드 시스템이란?", "answer": "일관된 레이아웃을 위한 격자 구조. 12컬럼 그리드 등"}
                    ]},
                    {"id": "brand-design", "name": "브랜드 디자인", "color": "from-red-500 to-pink-600", "questions": [
                        {"id": 1, "question": "브랜드 아이덴티티란?", "answer": "브랜드를 시각적으로 표현하는 모든 요소. 로고, 색상, 서체 등"},
                        {"id": 2, "question": "CI와 BI 차이는?", "answer": "CI(기업 아이덴티티), BI(브랜드 아이덴티티). 기업 vs 개별 브랜드"},
                        {"id": 3, "question": "로고타입과 심볼마크 차이는?", "answer": "로고타입(문자 중심), 심볼마크(그래픽 중심). 조합하여 사용"},
                        {"id": 4, "question": "브랜드 컬러 중요성은?", "answer": "브랜드 인지도, 감성 전달, 차별화. 색채심리학 적용"},
                        {"id": 5, "question": "브랜드 가이드라인이란?", "answer": "브랜드 적용 규정 매뉴얼. 로고 사용법, 색상, 서체 등 명시"}
                    ]},
                    {"id": "layout-design", "name": "레이아웃 디자인", "color": "from-blue-500 to-cyan-600", "questions": [
                        {"id": 1, "question": "CRAP 원칙이란?", "answer": "Contrast(대비), Repetition(반복), Alignment(정렬), Proximity(근접)"},
                        {"id": 2, "question": "여백(White Space) 역할은?", "answer": "가독성 향상, 시각적 휴식, 강조 효과. 디자인 품격 결정"},
                        {"id": 3, "question": "시선의 흐름이란?", "answer": "디자인에서 눈이 움직이는 경로. Z패턴, F패턴 레이아웃"},
                        {"id": 4, "question": "모듈 시스템이란?", "answer": "기본 단위 반복으로 레이아웃 구성. 일관성과 효율성"},
                        {"id": 5, "question": "단(Column) 설정 이유는?", "answer": "텍스트 가독성 향상. 한 줄 45~75자가 적정, 단으로 조절"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "visual-design-technician",
        "name": "시각디자인산업기사",
        "desc": "시각매체 디자인 기술자",
        "icon": "🎨",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "visual-basics",
                "name": "시각디자인 기초",
                "topics": [
                    {"id": "design-elements", "name": "디자인 요소와 원리", "color": "from-purple-500 to-violet-600", "questions": [
                        {"id": 1, "question": "디자인 기본 요소는?", "answer": "점, 선, 면, 색채, 질감, 공간. 모든 디자인의 구성 단위"},
                        {"id": 2, "question": "리듬(Rhythm)이란?", "answer": "요소의 규칙적 반복으로 시각적 운동감 표현. 일정/점진 리듬"},
                        {"id": 3, "question": "강조(Emphasis) 방법은?", "answer": "크기, 색상, 형태, 위치 대비. 시선 유도, 메시지 전달"},
                        {"id": 4, "question": "점진(Gradation)이란?", "answer": "점차적 변화로 운동감과 깊이감 표현. 크기, 색상, 형태"},
                        {"id": 5, "question": "조화(Harmony)란?", "answer": "디자인 요소들이 서로 잘 어울리는 상태. 유사조화, 대비조화"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "gtq",
        "name": "GTQ(그래픽기술자격)",
        "desc": "포토샵 자격증",
        "icon": "🖼️",
        "org": "한국생산성본부",
        "subjects": [
            {
                "id": "photoshop-gtq",
                "name": "포토샵 활용",
                "topics": [
                    {"id": "ps-tools", "name": "도구 활용", "color": "from-blue-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "선택 도구 종류는?", "answer": "사각형, 원형, 올가미, 다각형 올가미, 자동 선택, 빠른 선택, 마술봉"},
                        {"id": 2, "question": "레이어 스타일 종류는?", "answer": "그림자, 광선(Glow), 베벨, 오버레이, 획. 레이어에 효과 추가"},
                        {"id": 3, "question": "자유 변형 단축키는?", "answer": "Ctrl+T. Shift(비율유지), Alt(중심기준), Ctrl(왜곡) 조합"},
                        {"id": 4, "question": "브러시 도구 옵션은?", "answer": "크기, 경도, 불투명도, 흐름. 다양한 브러시 프리셋 활용"},
                        {"id": 5, "question": "복제 도장(Clone Stamp) 용도는?", "answer": "이미지 특정 영역 복제하여 그리기. 불필요 요소 제거, 패턴 연장"}
                    ]},
                    {"id": "ps-editing", "name": "이미지 편집", "color": "from-purple-500 to-pink-600", "questions": [
                        {"id": 1, "question": "Curves 보정 원리는?", "answer": "톤 곡선으로 명암/대비 조정. S자 곡선=대비 증가"},
                        {"id": 2, "question": "채널(Channel)이란?", "answer": "RGB 색상 정보를 분리한 그레이스케일. 알파 채널=선택 영역 저장"},
                        {"id": 3, "question": "히스토그램이란?", "answer": "이미지 명암 분포 그래프. 왼쪽=어두움, 오른쪽=밝음"},
                        {"id": 4, "question": "Levels 조정 방법은?", "answer": "블랙포인트, 미드톤, 화이트포인트 조절. 명암 범위 확장"},
                        {"id": 5, "question": "Camera Raw 필터 용도는?", "answer": "RAW 파일 편집, 고급 색상/노출 보정. 비파괴 편집"}
                    ]},
                    {"id": "ps-composite", "name": "이미지 합성", "color": "from-green-500 to-teal-600", "questions": [
                        {"id": 1, "question": "누끼 따기 방법은?", "answer": "펜 도구, 빠른 선택, 채널 활용, Select and Mask. 배경 제거"},
                        {"id": 2, "question": "자연스러운 합성 방법은?", "answer": "색감 통일, 광원 일치, 그림자 추가, 경계 페더링"},
                        {"id": 3, "question": "레이어 마스크 vs 클리핑 마스크는?", "answer": "레이어 마스크(개별), 클리핑 마스크(하위 레이어 기준 자르기)"},
                        {"id": 4, "question": "그룹(Group) 활용은?", "answer": "레이어 정리, 일괄 효과 적용, 마스크 적용. 작업 효율화"},
                        {"id": 5, "question": "스마트 필터 장점은?", "answer": "비파괴 필터 적용, 재조정 가능, 마스크로 부분 적용"}
                    ]}
                ]
            },
            {
                "id": "gtq-exam",
                "name": "시험 유형",
                "topics": [
                    {"id": "gtq-practical", "name": "실기 유형", "color": "from-orange-500 to-red-600", "questions": [
                        {"id": 1, "question": "GTQ 시험 시간과 문제 수는?", "answer": "90분, 4문제 (1급). 2급은 60분. 시간 배분 중요"},
                        {"id": 2, "question": "주요 출제 유형은?", "answer": "사진 보정, 합성, 포스터/배너, 필터 효과. 다양한 기능 활용"},
                        {"id": 3, "question": "자주 사용되는 필터는?", "answer": "Blur, Sharpen, Distort, Stylize 계열. 문제 요구사항 확인"},
                        {"id": 4, "question": "텍스트 효과 적용법은?", "answer": "레이어 스타일, 와프, 마스크, 필터. 다양한 타이포 효과"},
                        {"id": 5, "question": "시간 관리 전략은?", "answer": "쉬운 문제 먼저, 유형별 시간 배분, 중간 저장 필수"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "gtqi",
        "name": "GTQi(일러스트)",
        "desc": "일러스트레이터 자격증",
        "icon": "✏️",
        "org": "한국생산성본부",
        "subjects": [
            {
                "id": "illustrator-gtqi",
                "name": "일러스트레이터 활용",
                "topics": [
                    {"id": "ai-basics", "name": "기본 도구", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "앵커 포인트 종류는?", "answer": "코너 포인트(꺾임), 스무스 포인트(곡선). Alt로 전환"},
                        {"id": 2, "question": "도형 도구 종류는?", "answer": "사각형, 원, 다각형, 별, 선. Shift=정비율, Alt=중심기준"},
                        {"id": 3, "question": "정렬 패널 기능은?", "answer": "오브젝트 정렬, 분포, 기준점 설정. 아트보드/선택 기준 선택"},
                        {"id": 4, "question": "아트보드란?", "answer": "작업 영역 캔버스. 다중 아트보드로 여러 페이지 작업"},
                        {"id": 5, "question": "가이드 사용법은?", "answer": "눈금자에서 드래그, Ctrl+; 로 토글. 정확한 배치 보조"}
                    ]},
                    {"id": "ai-path", "name": "패스 편집", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "패스파인더 기능은?", "answer": "합치기, 빼기, 교차, 분할 등. 복잡한 형태 제작"},
                        {"id": 2, "question": "오프셋 패스란?", "answer": "패스를 일정 거리만큼 안/바깥으로 복제. 테두리 효과"},
                        {"id": 3, "question": "블렌드(Blend)란?", "answer": "두 오브젝트 사이 중간 단계 자동 생성. 그라데이션 효과"},
                        {"id": 4, "question": "효과 vs 변형 차이는?", "answer": "효과(비파괴, Appearance), 변형(원본 수정). 확장으로 변환"},
                        {"id": 5, "question": "클리핑 마스크 단축키는?", "answer": "Ctrl+7 (Cmd+7). 상위 오브젝트로 하위 자르기"}
                    ]},
                    {"id": "ai-advanced", "name": "고급 기능", "color": "from-purple-500 to-violet-600", "questions": [
                        {"id": 1, "question": "그라디언트 메시란?", "answer": "메시 포인트별 색상 지정. 자유로운 그라데이션 표현"},
                        {"id": 2, "question": "이미지 트레이스란?", "answer": "비트맵을 벡터로 변환. 옵션으로 디테일 조절"},
                        {"id": 3, "question": "심볼 스프레이 도구란?", "answer": "심볼을 뿌리듯 배치. 사이즈/밀도/회전 조절 가능"},
                        {"id": 4, "question": "패턴 만들기는?", "answer": "패턴 옵션으로 반복 패턴 디자인. 타일 종류 선택"},
                        {"id": 5, "question": "외곽선 변환이란?", "answer": "텍스트/획을 패스로 변환. 인쇄/공유 시 폰트 문제 방지"}
                    ]}
                ]
            },
            {
                "id": "gtqi-exam",
                "name": "시험 유형",
                "topics": [
                    {"id": "gtqi-practical", "name": "실기 유형", "color": "from-pink-500 to-red-600", "questions": [
                        {"id": 1, "question": "GTQi 시험 시간과 문제 수는?", "answer": "90분, 4문제 (1급). 펜 도구 숙련도 중요"},
                        {"id": 2, "question": "주요 출제 유형은?", "answer": "로고, 캐릭터, 아이콘, 패턴, 일러스트. 벡터 드로잉 중심"},
                        {"id": 3, "question": "펜 도구 문제 대응법은?", "answer": "앵커 포인트 최소화, 부드러운 곡선 제어, 연습 필수"},
                        {"id": 4, "question": "효과 적용 문제는?", "answer": "3D, 왜곡, 스타일화 효과. 요구사항 정확히 적용"},
                        {"id": 5, "question": "파일 저장 형식은?", "answer": "AI 원본 필수, PDF/EPS 출력용. 저장 전 확인"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "colorist-engineer",
        "name": "컬러리스트기사",
        "desc": "색채 관리 전문가",
        "icon": "🎨",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "color-science",
                "name": "색채학",
                "topics": [
                    {"id": "color-basics", "name": "색채 기초", "color": "from-red-500 to-pink-600", "questions": [
                        {"id": 1, "question": "빛의 삼원색은?", "answer": "빨강(R), 초록(G), 파랑(B). 가산혼합, 모두 합치면 흰색"},
                        {"id": 2, "question": "색료의 삼원색은?", "answer": "시안(C), 마젠타(M), 옐로(Y). 감산혼합, 모두 합치면 검정"},
                        {"id": 3, "question": "색온도란?", "answer": "빛의 색상을 켈빈(K)으로 표현. 낮을수록 따뜻한 색(촛불), 높을수록 차가운 색(청천)"},
                        {"id": 4, "question": "연색성(CRI)이란?", "answer": "광원이 물체 색을 자연스럽게 재현하는 정도. 100에 가까울수록 좋음"},
                        {"id": 5, "question": "메타머리즘이란?", "answer": "조건등색. 조명에 따라 같아 보이던 색이 달라 보이는 현상"}
                    ]},
                    {"id": "color-system", "name": "색체계", "color": "from-purple-500 to-indigo-600", "questions": [
                        {"id": 1, "question": "먼셀 색체계 구조는?", "answer": "H(색상) V(명도)/C(채도). 10 색상환, 명도 0~10, 채도 0~16"},
                        {"id": 2, "question": "NCS 색체계란?", "answer": "Natural Color System, 스웨덴 표준. 검정/흰색/순색 비율로 표현"},
                        {"id": 3, "question": "PCCS 색체계란?", "answer": "일본 색연구소. 톤(Tone) 개념 도입, 배색 실무에 활용"},
                        {"id": 4, "question": "CIE Lab 색공간이란?", "answer": "인간 시각 기반 장치 독립적 색공간. L(명도), a(빨강-초록), b(노랑-파랑)"},
                        {"id": 5, "question": "팬톤(Pantone)이란?", "answer": "국제 표준 색상 매칭 시스템. 인쇄/패션/산업 색상 소통"}
                    ]},
                    {"id": "color-harmony", "name": "색채 조화", "color": "from-green-500 to-teal-600", "questions": [
                        {"id": 1, "question": "보색 배색이란?", "answer": "색상환 반대편 색 조합. 강렬한 대비, 주의 집중"},
                        {"id": 2, "question": "유사색 배색이란?", "answer": "색상환 인접 색 조합. 조화롭고 부드러운 느낌"},
                        {"id": 3, "question": "톤온톤이란?", "answer": "같은 색상에서 톤 차이로 배색. 부드러운 변화, 통일감"},
                        {"id": 4, "question": "액센트 컬러란?", "answer": "전체 배색에서 강조점 색상. 5~10% 비율, 시선 유도"},
                        {"id": 5, "question": "색채 조화론 종류는?", "answer": "오스트발트, 먼셀, 저드, 문-스펜서. 각 이론별 조화 원리"}
                    ]}
                ]
            },
            {
                "id": "color-application",
                "name": "색채 응용",
                "topics": [
                    {"id": "color-psychology", "name": "색채 심리", "color": "from-orange-500 to-amber-600", "questions": [
                        {"id": 1, "question": "색의 온도감이란?", "answer": "빨강/주황은 따뜻함, 파랑/초록은 차가움. 공간 분위기 조절"},
                        {"id": 2, "question": "색의 팽창/수축 효과란?", "answer": "밝은 색은 크게, 어두운 색은 작게 보임. 패션, 인테리어 활용"},
                        {"id": 3, "question": "빨간색 심리 효과는?", "answer": "흥분, 열정, 위험, 식욕 촉진. 할인, 경고, 음식에 활용"},
                        {"id": 4, "question": "파란색 심리 효과는?", "answer": "신뢰, 안정, 전문성, 차분함. 기업, 금융, IT에 활용"},
                        {"id": 5, "question": "전진/후퇴 효과란?", "answer": "난색은 앞으로, 한색은 뒤로 보임. 공간감/깊이감 표현"}
                    ]},
                    {"id": "color-planning", "name": "색채 기획", "color": "from-blue-500 to-cyan-600", "questions": [
                        {"id": 1, "question": "색채 마케팅이란?", "answer": "색채로 소비자 행동에 영향. 브랜드 인지, 구매 유도"},
                        {"id": 2, "question": "환경색채란?", "answer": "건축, 도시 환경의 색채 계획. 지역 특성, 조화 고려"},
                        {"id": 3, "question": "색채 트렌드 분석법은?", "answer": "사회문화 분석, 패션쇼, 전시회, 색채 기관 예측(PANTONE 등)"},
                        {"id": 4, "question": "산업별 색채 특성은?", "answer": "패션(계절), 인테리어(공간), 제품(브랜드), 식품(식욕)"},
                        {"id": 5, "question": "문화별 색채 차이는?", "answer": "같은 색도 문화권마다 의미 다름. 글로벌 디자인 시 주의"}
                    ]}
                ]
            }
        ]
    },
    {
        "id": "colorist-technician",
        "name": "컬러리스트산업기사",
        "desc": "색채 관리 기술자",
        "icon": "🎨",
        "org": "한국산업인력공단",
        "subjects": [
            {
                "id": "color-basics-tech",
                "name": "색채 기초",
                "topics": [
                    {"id": "color-theory-tech", "name": "색채 이론", "color": "from-pink-500 to-rose-600", "questions": [
                        {"id": 1, "question": "색의 정의는?", "answer": "빛이 물체에 반사되어 눈에 인식되는 시각 현상"},
                        {"id": 2, "question": "무채색과 유채색 차이는?", "answer": "무채색(흰-회-검, 색상 없음), 유채색(색상 있음)"},
                        {"id": 3, "question": "원색, 2차색, 3차색이란?", "answer": "원색(혼합 불가), 2차색(원색 혼합), 3차색(원색+2차색)"},
                        {"id": 4, "question": "색의 항상성이란?", "answer": "조명 변해도 물체 색을 일정하게 인식. 뇌의 색 보정"},
                        {"id": 5, "question": "잔상 현상이란?", "answer": "시각 자극 사라진 후 색이 보임. 양성(같은색)/음성(보색) 잔상"}
                    ]},
                    {"id": "color-contrast", "name": "색채 대비", "color": "from-purple-500 to-violet-600", "questions": [
                        {"id": 1, "question": "동시대비란?", "answer": "인접한 색이 서로 영향을 주어 다르게 보이는 현상"},
                        {"id": 2, "question": "명도대비란?", "answer": "밝기 차이에 의해 색이 더 밝거나 어둡게 보임"},
                        {"id": 3, "question": "채도대비란?", "answer": "채도 차이에 의해 색이 더 선명하거나 탁하게 보임"},
                        {"id": 4, "question": "한난대비란?", "answer": "따뜻한 색과 차가운 색의 대비. 온도감 강조"},
                        {"id": 5, "question": "면적대비란?", "answer": "색의 면적에 따라 다르게 보임. 큰 면적일수록 밝고 선명"}
                    ]}
                ]
            },
            {
                "id": "practical-color",
                "name": "배색 실무",
                "topics": [
                    {"id": "color-scheme", "name": "배색 기법", "color": "from-green-500 to-emerald-600", "questions": [
                        {"id": 1, "question": "3색 배색 원칙은?", "answer": "주조색(70%), 보조색(25%), 강조색(5%). 황금비율"},
                        {"id": 2, "question": "그라데이션 배색이란?", "answer": "색의 점진적 변화로 연속성 표현. 부드러운 전환"},
                        {"id": 3, "question": "분리 배색이란?", "answer": "무채색/유사색을 사이에 넣어 대비 완화. 조화 유도"},
                        {"id": 4, "question": "반복 배색이란?", "answer": "동일한 색 패턴 반복. 통일감, 리듬감 부여"},
                        {"id": 5, "question": "색표집(Color Chart)이란?", "answer": "배색을 체계적으로 정리한 색상 견본. 작업 효율화"}
                    ]}
                ]
            }
        ]
    }
]

BASE_DIR = "C:/todo/today/자격시험/design"

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
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
          <span className="text-5xl mb-4 block">🎨</span>
          <h1 className="text-3xl font-bold mb-2">{CATEGORY["name"]} 분야</h1>
          <p className="text-{CATEGORY["color1"]}-100">그래픽, 웹, 제품, 색채 디자인 자격시험 학습 가이드</p>
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
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
    print(f"Created: {cert_dir}/main-page.tsx")

def create_exam_page(cert):
    cert_dir = f"{BASE_DIR}/{cert['id']}"
    exam_dir = f"{cert_dir}/exam"
    os.makedirs(exam_dir, exist_ok=True)

    content = f"""'use client';

import Link from 'next/link';

export default function ExamPage() {{
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
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
            <span className="text-{CATEGORY["color1"]}-600 font-medium">시험정보</span>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">📋 {cert["name"]} 시험 정보</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">시행기관</h2>
              <p className="text-gray-600">{cert["org"]}</p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">시험 일정</h2>
              <p className="text-gray-600">
                정기시험: 연 4회 (3월, 5월, 8월, 11월경)<br/>
                상시시험: 일부 자격증 해당<br/>
                <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="text-{CATEGORY["color1"]}-600 hover:underline">
                  Q-Net에서 정확한 일정 확인 →
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-700 mb-2">응시 자격</h2>
              <p className="text-gray-600">해당 자격증 시행처에서 확인하세요.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/category/{CATEGORY["id"]}/{cert["id"]}"
              className="inline-block px-6 py-3 bg-{CATEGORY["color1"]}-500 text-white rounded-lg hover:bg-{CATEGORY["color1"]}-600 transition"
            >
              ← 학습하러 가기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{cert_dir}/exam-page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    with open(f"{exam_dir}/page.tsx", "w", encoding="utf-8") as f:
        f.write("export { default } from '../exam-page';\n")
    print(f"Created: {exam_dir}/page.tsx")

def create_study_page(cert, topic):
    cert_dir = f"{BASE_DIR}/{cert['id']}"
    study_dir = f"{cert_dir}/study/{topic['id']}"
    os.makedirs(study_dir, exist_ok=True)

    questions_jsx = ""
    for q in topic["questions"]:
        question_escaped = q["question"].replace("'", "\\'")
        answer_escaped = q["answer"].replace("'", "\\'")
        prompt = f"{cert['name']} 시험 관련 질문입니다: {q['question']} 자세히 설명해주세요."
        prompt_escaped = prompt.replace("'", "\\'")
        questions_jsx += f"""
      {{
        id: {q["id"]},
        question: '{question_escaped}',
        answer: '{answer_escaped}',
        prompt: '{prompt_escaped}'
      }},"""

    content = f"""'use client';

import {{ useState, useEffect }} from 'react';
import Link from 'next/link';

export default function StudyPage() {{
  const [completedQuestions, setCompletedQuestions] = useState<Record<number, boolean>>({{}});

  const topic = {{
    id: '{topic["id"]}',
    name: '{topic["name"]}',
    color: '{topic["color"]}'
  }};

  const questions = [{questions_jsx}
  ];

  useEffect(() => {{
    const saved = localStorage.getItem('{cert["id"]}-{topic["id"]}-progress');
    if (saved) {{
      setCompletedQuestions(JSON.parse(saved));
    }}
  }}, []);

  const toggleComplete = (id: number) => {{
    const updated = {{ ...completedQuestions, [id]: !completedQuestions[id] }};
    setCompletedQuestions(updated);
    localStorage.setItem('{cert["id"]}-{topic["id"]}-progress', JSON.stringify(updated));
  }};

  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
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
            <span className="text-{CATEGORY["color1"]}-600 font-medium">{{topic.name}}</span>
          </nav>
        </div>
      </header>

      <section className={{`bg-gradient-to-r ${{topic.color}} text-white py-8`}}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-2">{{topic.name}}</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white/30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all"
                style={{{{ width: `${{progressPercent}}%` }}}}
              />
            </div>
            <span className="text-white/90 text-sm">{{completedCount}}/{{questions.length}} 완료</span>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {{questions.map((q) => (
            <div
              key={{q.id}}
              className={{`bg-white rounded-xl shadow p-6 border-l-4 transition-all ${{
                completedQuestions[q.id]
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }}`}}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={{() => toggleComplete(q.id)}}
                  className={{`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${{
                    completedQuestions[q.id]
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-{CATEGORY["color1"]}-400'
                  }}`}}
                >
                  {{completedQuestions[q.id] && '✓'}}
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-2">{{q.question}}</h3>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-3 mb-3">💡 {{q.answer}}</p>
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

        <div className="mt-8 text-center">
          <Link
            href="/category/{CATEGORY["id"]}/{cert["id"]}"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}}
"""
    with open(f"{study_dir}/page.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created: {study_dir}/page.tsx")

def main():
    os.makedirs(BASE_DIR, exist_ok=True)

    # 1. 카테고리 페이지 생성
    create_category_page()

    # 2. 각 자격증별 페이지 생성
    for cert in CERTIFICATIONS:
        create_cert_main_page(cert)
        create_exam_page(cert)

        # 3. 각 토픽별 학습 페이지 생성
        for subject in cert["subjects"]:
            for topic in subject["topics"]:
                create_study_page(cert, topic)

    print(f"\n총 {len(CERTIFICATIONS)}개 자격증 페이지 생성 완료!")

if __name__ == "__main__":
    main()
