#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os

# 8개 코스의 레슨 데이터 (각 5일)
lesson_data = {
    'self-discovery': {
        'title': '나를 다시 발견하기', 'icon': '🔍', 'color': 'from-rose-500 to-pink-500',
        'lessons': {
            1: {'title': '과거 경험에서 강점 찾기', 'desc': 'AI와 함께 지금까지의 경험을 분석하고 숨겨진 강점 발굴', 'prompts': [
                {'id': 'sd-1-1', 'title': '경력 돌아보기', 'desc': '과거 경험 분석', 'prompt': '저는 진로 전환을 준비하는 사람입니다. 지금까지의 직장 경험, 프로젝트, 취미 활동에서 제가 잘했던 것들을 분석해주세요. 제가 답변하면 숨겨진 강점을 찾아주세요. 먼저 저에게 1) 가장 성취감을 느꼈던 경험, 2) 주변에서 자주 칭찬받는 점, 3) 시간 가는 줄 모르고 했던 일을 물어봐주세요.'},
                {'id': 'sd-1-2', 'title': '강점 유형 분석', 'desc': '강점 카테고리 파악', 'prompt': '사람의 강점을 분석하는 프레임워크를 알려주세요. 1) 갤럽 강점 파인더의 34가지 재능 테마, 2) 하버드의 VIA 성격 강점, 3) 기술적 역량 vs 소프트 스킬 구분에 대해 설명해주세요. 각 프레임워크에서 AI 시대에 특히 가치있는 강점은 무엇인지도 알려주세요.'},
                {'id': 'sd-1-3', 'title': '강점 활용 방향', 'desc': '강점 기반 커리어 탐색', 'prompt': '제 강점이 [여기에 강점 입력]이라면, 이 강점을 활용할 수 있는 AI 시대 직업군이나 역할을 5가지 제안해주세요. 각 역할에서 이 강점이 어떻게 경쟁력이 되는지 설명해주세요.'}
            ]},
            2: {'title': '핵심 가치관 탐색', 'desc': '일과 삶에서 가장 중요하게 여기는 가치 발견', 'prompts': [
                {'id': 'sd-2-1', 'title': '가치관 발견 질문', 'desc': '핵심 가치 탐색', 'prompt': '저의 핵심 가치관을 발견하기 위한 심층 질문을 해주세요. 1) 돈이 충분하다면 무엇을 하겠는지, 2) 어떤 불의를 보면 화가 나는지, 3) 이상적인 하루는 어떤 모습인지 등의 질문을 통해 제 가치관을 분석해주세요.'},
                {'id': 'sd-2-2', 'title': '가치관과 직업 매칭', 'desc': '가치 기반 커리어 선택', 'prompt': '직업 선택에서 고려해야 할 핵심 가치관 10가지를 알려주세요. (예: 자율성, 안정성, 창의성, 사회적 기여 등) 각 가치관이 높은 사람에게 적합한 직업 유형도 함께 설명해주세요.'},
                {'id': 'sd-2-3', 'title': '가치 우선순위 정하기', 'desc': '가치관 순위 결정', 'prompt': '직업 선택 시 중요한 가치관들 사이에서 우선순위를 정하는 방법을 알려주세요. 가치관 충돌 상황(예: 높은 연봉 vs 워라밸) 에서 의사결정하는 프레임워크도 제시해주세요.'}
            ]},
            3: {'title': '열정과 관심사 매핑', 'desc': '시간 가는 줄 모르고 몰입하는 분야 찾기', 'prompts': [
                {'id': 'sd-3-1', 'title': '몰입 경험 분석', 'desc': '플로우 상태 탐색', 'prompt': '저의 몰입 경험을 분석하여 열정 분야를 찾아주세요. 최근 1년간 시간 가는 줄 모르고 했던 활동들을 말씀드릴게요. 이 활동들의 공통점을 분석하고, 이것이 직업과 어떻게 연결될 수 있는지 알려주세요.'},
                {'id': 'sd-3-2', 'title': '열정 vs 직업', 'desc': '열정의 직업화 가능성', 'prompt': '열정을 직업으로 만들 때의 장단점을 분석해주세요. 열정을 1) 본업으로 할 때, 2) 부업/사이드 프로젝트로 할 때, 3) 취미로 유지할 때 각각의 장단점과 적합한 상황을 설명해주세요.'},
                {'id': 'sd-3-3', 'title': '관심사 수익화 방법', 'desc': '관심사 기반 수익 모델', 'prompt': '특정 관심사를 수익화할 수 있는 10가지 방법을 알려주세요. (예: 콘텐츠 제작, 강의, 컨설팅, 제품 판매 등) 각 방법의 진입 난이도와 수익 잠재력도 함께 설명해주세요.'}
            ]},
            4: {'title': '성격 유형과 일의 궁합', 'desc': 'MBTI, 에니어그램 등으로 적합한 업무 스타일 파악', 'prompts': [
                {'id': 'sd-4-1', 'title': 'MBTI와 직업', 'desc': '성격 유형별 적합 직업', 'prompt': 'MBTI 성격 유형별로 적합한 직업과 업무 환경을 설명해주세요. 특히 AI 시대에 각 유형이 강점을 발휘할 수 있는 역할은 무엇인지 분석해주세요.'},
                {'id': 'sd-4-2', 'title': '업무 스타일 진단', 'desc': '선호 업무 환경 파악', 'prompt': '저의 이상적인 업무 스타일을 진단해주세요. 1) 혼자 vs 팀, 2) 사무실 vs 재택, 3) 루틴 vs 변화, 4) 리더 vs 팔로워, 5) 대면 vs 비대면 등의 질문을 통해 저에게 맞는 업무 환경을 분석해주세요.'},
                {'id': 'sd-4-3', 'title': '약점 보완 전략', 'desc': '성격 약점 극복하기', 'prompt': '성격 유형의 약점을 AI 도구로 보완하는 방법을 알려주세요. 예를 들어 계획성이 부족하면 AI 일정 관리, 글쓰기가 약하면 AI 글쓰기 도구 등 구체적인 보완 전략을 제시해주세요.'}
            ]},
            5: {'title': '셀프 브랜딩 시작하기', 'desc': '나만의 고유한 가치 제안(Value Proposition) 만들기', 'prompts': [
                {'id': 'sd-5-1', 'title': '개인 브랜드 정의', 'desc': '나만의 브랜드 만들기', 'prompt': '저만의 개인 브랜드를 만들어주세요. 앞서 발견한 강점, 가치관, 열정을 조합하여 1) 한 문장 자기소개, 2) 엘리베이터 피치(30초), 3) 브랜드 키워드 3개를 만들어주세요.'},
                {'id': 'sd-5-2', 'title': '온라인 존재감 구축', 'desc': '디지털 브랜딩 전략', 'prompt': '개인 브랜드를 온라인에서 구축하는 방법을 알려주세요. LinkedIn 프로필 최적화, 포트폴리오 사이트 구성, SNS 전략 등 구체적인 실행 방법을 단계별로 설명해주세요.'},
                {'id': 'sd-5-3', 'title': '브랜드 스토리 작성', 'desc': '설득력 있는 스토리', 'prompt': '경력 전환자로서 설득력 있는 브랜드 스토리를 작성하는 법을 알려주세요. 과거 경험과 새로운 방향이 자연스럽게 연결되는 스토리텔링 기법과 예시를 제시해주세요.'}
            ]}
        }
    },
    'ai-era-trends': {
        'title': 'AI 시대 유망 분야', 'icon': '🌟', 'color': 'from-violet-500 to-purple-500',
        'lessons': {
            1: {'title': 'AI가 바꾸는 직업 세계', 'desc': 'AI 자동화로 변화하는 산업과 직업군 분석', 'prompts': [
                {'id': 'at-1-1', 'title': 'AI 자동화 현황', 'desc': 'AI 대체 위험 직업 분석', 'prompt': 'AI와 자동화로 인해 사라지거나 크게 변화할 직업군을 분석해주세요. 1) 고위험군, 2) 중위험군, 3) 저위험군으로 분류하고, 각 직업이 어떻게 변화할지 설명해주세요.'},
                {'id': 'at-1-2', 'title': 'AI 신규 직업', 'desc': 'AI로 생겨난 새 직업', 'prompt': 'AI로 인해 새롭게 생겨난 직업들을 소개해주세요. 프롬프트 엔지니어, AI 트레이너, AI 윤리 전문가 등 신규 직종의 역할, 필요 역량, 연봉 수준을 설명해주세요.'},
                {'id': 'at-1-3', 'title': '산업별 AI 영향', 'desc': '분야별 AI 변화', 'prompt': '주요 산업별로 AI가 미치는 영향을 분석해주세요. 제조업, 금융, 의료, 교육, 마케팅, 법률, 창작 분야에서 AI가 어떻게 활용되고 있는지 설명해주세요.'}
            ]},
            2: {'title': 'AI 대체 불가능한 영역', 'desc': '인간만이 할 수 있는 영역과 AI 협업 전략', 'prompts': [
                {'id': 'at-2-1', 'title': '인간 고유 역량', 'desc': 'AI가 대체 못하는 것', 'prompt': 'AI가 대체할 수 없는 인간 고유의 역량 10가지를 설명해주세요. 창의성, 공감능력, 윤리적 판단 등 인간만의 강점과 이를 활용하는 직업군을 분석해주세요.'},
                {'id': 'at-2-2', 'title': 'AI 협업 전략', 'desc': 'AI와 함께 일하기', 'prompt': 'AI와 효과적으로 협업하는 방법을 알려주세요. AI에게 맡길 업무, 인간이 집중할 업무를 구분하고, AI를 도구로 활용해 생산성을 높이는 구체적인 전략을 제시해주세요.'},
                {'id': 'at-2-3', 'title': 'AI 시대 핵심 역량', 'desc': '미래 필수 스킬', 'prompt': 'AI 시대에 반드시 필요한 핵심 역량 5가지를 알려주세요. 각 역량을 어떻게 개발할 수 있는지 구체적인 학습 방법과 함께 설명해주세요.'}
            ]},
            3: {'title': '2025년 유망 직종 분석', 'desc': 'AI 프롬프트 엔지니어, 데이터 분석가 등 신규 직종', 'prompts': [
                {'id': 'at-3-1', 'title': '2025 유망 직종', 'desc': '올해 주목할 직업', 'prompt': '2025년 가장 유망한 직종 TOP 10을 소개해주세요. 각 직종의 역할, 필요 역량, 연봉 범위, 성장 전망을 분석해주세요.'},
                {'id': 'at-3-2', 'title': '진입 장벽 분석', 'desc': '직종별 진입 난이도', 'prompt': '유망 직종별 진입 장벽을 분석해주세요. 필요한 학력, 자격증, 경력, 기술 스택과 함께 비전공자가 진입할 수 있는 현실적인 방법을 알려주세요.'},
                {'id': 'at-3-3', 'title': '시장 수요 분석', 'desc': '채용 시장 동향', 'prompt': '현재 채용 시장에서 수요가 높은 역할과 기술을 분석해주세요. 채용 공고 트렌드, 기업들이 원하는 인재상, 경쟁력을 갖추기 위한 조언을 해주세요.'}
            ]},
            4: {'title': '산업별 전환 기회 탐색', 'desc': 'IT, 헬스케어, 교육, 콘텐츠 등 분야별 기회', 'prompts': [
                {'id': 'at-4-1', 'title': 'IT/테크 분야', 'desc': '기술 산업 기회', 'prompt': 'IT/테크 분야로 전환하려는 비전공자를 위한 가이드를 제공해주세요. 개발자, PM, 데이터 분석가, UX 디자이너 등 역할별 전환 경로와 필요 학습을 설명해주세요.'},
                {'id': 'at-4-2', 'title': '콘텐츠/미디어 분야', 'desc': '창작 산업 기회', 'prompt': '콘텐츠/미디어 분야의 커리어 기회를 분석해주세요. 유튜버, 작가, 팟캐스터, 온라인 강사 등 1인 미디어부터 기업 소속까지 다양한 경로를 설명해주세요.'},
                {'id': 'at-4-3', 'title': '기타 유망 분야', 'desc': '헬스케어, 교육 등', 'prompt': '헬스케어, 교육, 지속가능성, 실버산업 등 성장하는 분야의 커리어 기회를 분석해주세요. 각 분야에서 AI와 결합된 새로운 역할도 소개해주세요.'}
            ]},
            5: {'title': '나만의 니치 마켓 찾기', 'desc': 'AI 시대에 차별화된 포지션 발굴하기', 'prompts': [
                {'id': 'at-5-1', 'title': '니치 마켓 개념', 'desc': '틈새시장 이해하기', 'prompt': '니치 마켓(틈새시장)의 개념과 중요성을 설명해주세요. 레드오션에서 블루오션을 찾는 방법, 마이크로 전문가 전략, 롱테일 법칙 등을 활용한 포지셔닝 전략을 알려주세요.'},
                {'id': 'at-5-2', 'title': '나만의 교차점', 'desc': '독특한 조합 찾기', 'prompt': '저만의 니치를 찾기 위해 여러 분야의 교차점을 탐색해주세요. 예를 들어 [A분야 경험] + [B관심사] + [AI 활용] = 독특한 포지션 같은 공식으로 제 경험을 조합해주세요.'},
                {'id': 'at-5-3', 'title': '니치 검증 방법', 'desc': '시장성 확인하기', 'prompt': '발견한 니치 마켓의 시장성을 검증하는 방법을 알려주세요. 검색량 분석, 경쟁사 조사, 타겟 고객 인터뷰 등 실제로 수요가 있는지 확인하는 방법을 단계별로 설명해주세요.'}
            ]}
        }
    },
    'ai-skills': {
        'title': 'AI 활용 필수 역량', 'icon': '🤖', 'color': 'from-blue-500 to-cyan-500',
        'lessons': {
            1: {'title': 'ChatGPT 완전 정복', 'desc': '대화형 AI의 기본부터 고급 프롬프트까지', 'prompts': [
                {'id': 'as-1-1', 'title': 'ChatGPT 기초', 'desc': '기본 사용법 익히기', 'prompt': 'ChatGPT를 처음 사용하는 사람을 위한 가이드를 제공해주세요. 기본 대화 방법, 질문하는 요령, 좋은 결과를 얻기 위한 팁을 알려주세요.'},
                {'id': 'as-1-2', 'title': '프롬프트 엔지니어링', 'desc': '효과적인 프롬프트 작성', 'prompt': '효과적인 프롬프트를 작성하는 방법을 알려주세요. 역할 지정, 맥락 제공, 출력 형식 지정, 단계별 지시 등 프롬프트 엔지니어링의 핵심 기법을 예시와 함께 설명해주세요.'},
                {'id': 'as-1-3', 'title': 'ChatGPT 실무 활용', 'desc': '업무에 적용하기', 'prompt': 'ChatGPT를 업무에 활용하는 10가지 실전 사례를 알려주세요. 이메일 작성, 보고서 요약, 아이디어 브레인스토밍, 코드 작성 등 구체적인 프롬프트 예시와 함께 설명해주세요.'}
            ]},
            2: {'title': 'Claude AI 활용법', 'desc': '긴 문서 분석, 코드 작성, 창의적 글쓰기', 'prompts': [
                {'id': 'as-2-1', 'title': 'Claude 특징 이해', 'desc': 'Claude만의 장점', 'prompt': 'Claude AI의 특징과 ChatGPT와의 차이점을 설명해주세요. 긴 문서 처리, 안전성, 정확성 측면에서 Claude가 유리한 상황을 알려주세요.'},
                {'id': 'as-2-2', 'title': 'Claude로 문서 분석', 'desc': '긴 문서 처리하기', 'prompt': 'Claude로 긴 문서를 분석하는 방법을 알려주세요. PDF, 논문, 계약서 등 긴 문서를 요약하고, 핵심 포인트를 추출하고, 질문에 답하게 하는 프롬프트 기법을 설명해주세요.'},
                {'id': 'as-2-3', 'title': 'Claude로 글쓰기', 'desc': '창의적 글 작성', 'prompt': 'Claude로 창의적인 글을 작성하는 방법을 알려주세요. 블로그 글, 뉴스레터, 마케팅 카피, 스토리 등 다양한 글쓰기에 Claude를 활용하는 프롬프트 예시를 제공해주세요.'}
            ]},
            3: {'title': '이미지 생성 AI 마스터', 'desc': '미드저니, DALL-E, Stable Diffusion 활용', 'prompts': [
                {'id': 'as-3-1', 'title': '이미지 AI 소개', 'desc': '주요 도구 비교', 'prompt': '주요 이미지 생성 AI (미드저니, DALL-E, Stable Diffusion)의 특징과 차이점을 설명해주세요. 각 도구가 적합한 용도와 장단점을 비교해주세요.'},
                {'id': 'as-3-2', 'title': '이미지 프롬프트 작성', 'desc': '원하는 이미지 생성', 'prompt': '이미지 생성 AI에서 원하는 결과를 얻기 위한 프롬프트 작성법을 알려주세요. 스타일, 구도, 조명, 분위기 등을 지정하는 키워드와 프롬프트 구조를 예시와 함께 설명해주세요.'},
                {'id': 'as-3-3', 'title': '이미지 AI 실무 활용', 'desc': '비즈니스에 적용', 'prompt': '이미지 생성 AI를 비즈니스에 활용하는 방법을 알려주세요. SNS 콘텐츠, 프레젠테이션, 상품 이미지, 브랜딩 등 실무에서 AI 이미지를 활용하는 사례와 주의사항을 설명해주세요.'}
            ]},
            4: {'title': '업무 자동화 AI 도구', 'desc': 'Notion AI, Zapier, 자동화 워크플로우 구축', 'prompts': [
                {'id': 'as-4-1', 'title': 'Notion AI 활용', 'desc': '문서 작업 자동화', 'prompt': 'Notion AI를 활용하여 업무 효율을 높이는 방법을 알려주세요. 회의록 요약, 문서 작성, 브레인스토밍, 번역 등 Notion AI의 주요 기능과 활용 팁을 설명해주세요.'},
                {'id': 'as-4-2', 'title': '업무 자동화 도구', 'desc': 'Zapier, Make 활용', 'prompt': 'Zapier, Make(Integromat) 등 자동화 도구의 개념과 활용법을 설명해주세요. 반복 업무를 자동화하는 워크플로우 예시 5가지를 단계별로 알려주세요.'},
                {'id': 'as-4-3', 'title': '개인 자동화 시스템', 'desc': '나만의 자동화 구축', 'prompt': '개인의 업무 생산성을 높이는 자동화 시스템을 설계해주세요. 이메일 분류, 일정 관리, 자료 수집, 보고서 생성 등을 자동화하는 방법을 알려주세요.'}
            ]},
            5: {'title': 'AI 협업 프로젝트 실습', 'desc': 'AI를 활용한 실제 프로젝트 진행해보기', 'prompts': [
                {'id': 'as-5-1', 'title': '프로젝트 기획', 'desc': 'AI로 아이디어 발전', 'prompt': 'AI와 함께 새로운 프로젝트를 기획하는 방법을 알려주세요. 아이디어 발상부터 시장조사, 기획서 작성까지 AI를 활용하는 프로젝트 기획 프로세스를 단계별로 안내해주세요.'},
                {'id': 'as-5-2', 'title': 'AI 협업 실습', 'desc': '실제 결과물 만들기', 'prompt': '지금 바로 시작할 수 있는 AI 협업 미니 프로젝트를 제안해주세요. 블로그 글 시리즈, 유튜브 스크립트, 온라인 강의 기획 등 2-3시간 내에 결과물을 만들 수 있는 프로젝트를 안내해주세요.'},
                {'id': 'as-5-3', 'title': 'AI 활용 포트폴리오', 'desc': 'AI 역량 증명하기', 'prompt': 'AI 활용 역량을 보여주는 포트폴리오를 만드는 방법을 알려주세요. 어떤 프로젝트를 포함해야 하는지, AI를 사용했음을 어떻게 보여줄지, 차별화 포인트는 무엇인지 설명해주세요.'}
            ]}
        }
    },
    'new-field-entry': {
        'title': '새 분야 진입 전략', 'icon': '🎯', 'color': 'from-amber-500 to-orange-500',
        'lessons': {
            1: {'title': '스킬 갭 분석하기', 'desc': '현재 역량과 목표 분야 요구 역량 비교 분석', 'prompts': [
                {'id': 'nf-1-1', 'title': '스킬 갭 파악', 'desc': '부족한 역량 분석', 'prompt': '저의 스킬 갭을 분석해주세요. 현재 역량과 목표 직종에서 요구하는 역량을 비교하고, 어떤 스킬을 우선적으로 개발해야 하는지 알려주세요.'},
                {'id': 'nf-1-2', 'title': '필수 vs 선택 스킬', 'desc': '핵심 역량 우선순위', 'prompt': '새 분야 진입에 필요한 스킬을 필수/권장/선택으로 분류해주세요. 최소한의 시간 투자로 진입할 수 있는 핵심 역량 조합을 제안해주세요.'},
                {'id': 'nf-1-3', 'title': '전환 가능 스킬', 'desc': '기존 역량 활용하기', 'prompt': '기존 경력에서 새 분야로 전환 가능한 스킬(transferable skills)을 분석해주세요. 이미 가진 역량을 새 분야에서 어떻게 어필할 수 있는지 알려주세요.'}
            ]},
            2: {'title': '효율적인 학습 로드맵', 'desc': '최소 시간 투자로 최대 효과를 내는 학습 전략', 'prompts': [
                {'id': 'nf-2-1', 'title': '학습 우선순위', 'desc': '무엇부터 배울지', 'prompt': '새 분야 진입을 위한 학습 우선순위를 정해주세요. 파레토 법칙(80/20)을 적용하여 20%의 핵심 내용으로 80%의 효과를 낼 수 있는 학습 순서를 제안해주세요.'},
                {'id': 'nf-2-2', 'title': '학습 리소스 추천', 'desc': '강의/책/자료 추천', 'prompt': '새 분야 학습에 도움이 되는 무료/유료 리소스를 추천해주세요. 온라인 강의, 책, 유튜브 채널, 커뮤니티 등 효율적인 학습 자료를 알려주세요.'},
                {'id': 'nf-2-3', 'title': '30일 학습 계획', 'desc': '구체적인 학습 일정', 'prompt': '새 분야 기초를 익힐 수 있는 30일 학습 계획을 세워주세요. 주당 학습 시간, 일별 학습 내용, 마일스톤을 포함한 구체적인 계획을 제시해주세요.'}
            ]},
            3: {'title': '경력 전환자 이력서 작성', 'desc': '기존 경력을 새 분야에 맞게 재구성하기', 'prompts': [
                {'id': 'nf-3-1', 'title': '경력 재구성하기', 'desc': '이력서 리프레이밍', 'prompt': '경력 전환자를 위한 이력서 작성법을 알려주세요. 기존 경험을 새 분야 관점에서 재해석하고, 관련 성과를 부각시키는 방법을 예시와 함께 설명해주세요.'},
                {'id': 'nf-3-2', 'title': '갭 이어 설명하기', 'desc': '공백기간 대처법', 'prompt': '경력 공백이나 전환 준비 기간을 이력서에서 긍정적으로 설명하는 방법을 알려주세요. 학습, 사이드 프로젝트, 봉사활동 등을 어떻게 표현할지 예시를 제공해주세요.'},
                {'id': 'nf-3-3', 'title': '커버레터 작성', 'desc': '전환 동기 설명', 'prompt': '경력 전환자를 위한 커버레터를 작성하는 방법을 알려주세요. 왜 새 분야로 전환하는지, 어떤 가치를 제공할 수 있는지 설득력 있게 전달하는 스토리텔링 기법을 설명해주세요.'}
            ]},
            4: {'title': '포트폴리오 전략', 'desc': 'AI로 빠르게 포트폴리오 만들고 어필하기', 'prompts': [
                {'id': 'nf-4-1', 'title': '포트폴리오 구성', 'desc': '무엇을 포함할지', 'prompt': '경력 전환자의 포트폴리오에 포함해야 할 요소를 알려주세요. 경력이 없어도 만들 수 있는 프로젝트 유형, 포트폴리오 구성 방식, 차별화 포인트를 설명해주세요.'},
                {'id': 'nf-4-2', 'title': 'AI로 포트폴리오 제작', 'desc': '빠른 결과물 생성', 'prompt': 'AI 도구를 활용해 포트폴리오를 빠르게 만드는 방법을 알려주세요. ChatGPT로 내용 작성, 미드저니로 비주얼 생성, 웹사이트 빌더로 배포하는 과정을 안내해주세요.'},
                {'id': 'nf-4-3', 'title': '포트폴리오 어필법', 'desc': '효과적으로 보여주기', 'prompt': '포트폴리오를 효과적으로 어필하는 방법을 알려주세요. 채용담당자가 보는 포인트, 프로젝트 설명 방식, 결과와 성과 강조하는 방법을 예시와 함께 설명해주세요.'}
            ]},
            5: {'title': '네트워킹과 기회 창출', 'desc': 'LinkedIn, 커뮤니티 활용 네트워킹 전략', 'prompts': [
                {'id': 'nf-5-1', 'title': 'LinkedIn 최적화', 'desc': '프로필 개선하기', 'prompt': '경력 전환자를 위한 LinkedIn 프로필 최적화 방법을 알려주세요. 헤드라인, 요약, 경험 섹션을 어떻게 작성해야 새 분야 채용담당자의 눈에 띄는지 설명해주세요.'},
                {'id': 'nf-5-2', 'title': '온라인 네트워킹', 'desc': '커뮤니티 활용하기', 'prompt': '새 분야 진입을 위한 온라인 네트워킹 전략을 알려주세요. 가입해야 할 커뮤니티, 적극적으로 참여하는 방법, 멘토를 찾는 방법을 설명해주세요.'},
                {'id': 'nf-5-3', 'title': '기회 창출 전략', 'desc': '숨은 기회 발견하기', 'prompt': '공개 채용 외에 기회를 찾는 방법을 알려주세요. 정보 인터뷰, 콜드 이메일, 프리랜서 시작, 사이드 프로젝트 등 숨은 기회를 발견하는 전략을 설명해주세요.'}
            ]}
        }
    },
    'digital-career': {
        'title': '디지털 커리어 설계', 'icon': '💻', 'color': 'from-teal-500 to-emerald-500',
        'lessons': {
            1: {'title': '원격근무 완전 가이드', 'desc': '효과적인 재택근무를 위한 환경과 습관 만들기', 'prompts': [
                {'id': 'dc-1-1', 'title': '원격근무 환경 구축', 'desc': '홈오피스 세팅', 'prompt': '효율적인 재택근무를 위한 환경 구축 방법을 알려주세요. 필수 장비, 작업 공간 배치, 인터넷 환경, 소음 관리 등 홈오피스 세팅 가이드를 제공해주세요.'},
                {'id': 'dc-1-2', 'title': '원격근무 습관', 'desc': '생산성 유지하기', 'prompt': '원격근무에서 생산성을 유지하는 습관과 루틴을 알려주세요. 출퇴근 의식, 집중 시간 관리, 휴식 방법, 업무/생활 경계 설정 등 실천 가능한 팁을 제공해주세요.'},
                {'id': 'dc-1-3', 'title': '원격근무 일자리 찾기', 'desc': '리모트 채용 정보', 'prompt': '원격근무가 가능한 일자리를 찾는 방법을 알려주세요. 원격근무 전문 채용 사이트, 기업 유형, 직무 카테고리별 원격 가능성을 분석해주세요.'}
            ]},
            2: {'title': '디지털 협업 도구 마스터', 'desc': 'Slack, Notion, Zoom 등 협업 도구 활용법', 'prompts': [
                {'id': 'dc-2-1', 'title': '협업 도구 개요', 'desc': '주요 도구 소개', 'prompt': '원격 협업에 필수적인 도구들을 소개해주세요. Slack, Notion, Zoom, Google Workspace, Trello 등 각 도구의 용도와 장단점을 비교해주세요.'},
                {'id': 'dc-2-2', 'title': 'Slack 활용법', 'desc': '효과적인 소통', 'prompt': 'Slack을 효과적으로 사용하는 방법을 알려주세요. 채널 구성, 알림 설정, 스레드 활용, 앱 연동, 에티켓 등 프로페셔널한 Slack 사용법을 설명해주세요.'},
                {'id': 'dc-2-3', 'title': '비동기 소통 전략', 'desc': '시차 극복하기', 'prompt': '비동기 소통을 효과적으로 하는 방법을 알려주세요. 명확한 문서화, 의사결정 프로세스, 회의 최소화 전략, 시차가 있는 팀과의 협업 방법을 설명해주세요.'}
            ]},
            3: {'title': '디지털 노마드 생활 설계', 'desc': '장소에 구애받지 않고 일하는 법', 'prompts': [
                {'id': 'dc-3-1', 'title': '디지털 노마드 준비', 'desc': '시작 가이드', 'prompt': '디지털 노마드 생활을 시작하기 위한 준비 사항을 알려주세요. 적합한 직업 유형, 필요한 기술, 법적/세금 고려사항, 보험, 필수 장비 등을 설명해주세요.'},
                {'id': 'dc-3-2', 'title': '노마드 일자리 유형', 'desc': '원격 가능 직종', 'prompt': '디지털 노마드로 일할 수 있는 직종과 일자리 유형을 소개해주세요. 프리랜서, 원격 직원, 온라인 사업 등 각 유형의 특징과 시작 방법을 설명해주세요.'},
                {'id': 'dc-3-3', 'title': '노마드 생활 팁', 'desc': '실전 경험담', 'prompt': '디지털 노마드 생활의 현실적인 조언을 해주세요. 인기 거점 도시, 코워킹 스페이스 활용, 외로움 극복, 건강 관리, 지속 가능한 노마드 생활을 위한 팁을 알려주세요.'}
            ]},
            4: {'title': '온라인 존재감 구축', 'desc': '개인 브랜드 온라인 채널 구축하기', 'prompts': [
                {'id': 'dc-4-1', 'title': '온라인 채널 선택', 'desc': '플랫폼 전략', 'prompt': '개인 브랜드를 구축할 온라인 채널을 선택하는 방법을 알려주세요. LinkedIn, 블로그, 유튜브, 인스타그램, 트위터 등 각 채널의 특징과 적합한 직군을 분석해주세요.'},
                {'id': 'dc-4-2', 'title': '콘텐츠 전략', 'desc': '무엇을 공유할지', 'prompt': '전문성을 보여주는 콘텐츠 전략을 세워주세요. 어떤 주제로, 얼마나 자주, 어떤 형식으로 콘텐츠를 만들어야 하는지 구체적인 가이드를 제공해주세요.'},
                {'id': 'dc-4-3', 'title': '개인 웹사이트 구축', 'desc': '포트폴리오 사이트', 'prompt': '개인 웹사이트/포트폴리오 사이트를 구축하는 방법을 알려주세요. 무료/유료 플랫폼 비교, 필수 포함 요소, SEO 기초, 도메인 선택 등을 설명해주세요.'}
            ]},
            5: {'title': '글로벌 일자리 찾기', 'desc': '해외 원격 일자리 플랫폼과 지원 전략', 'prompts': [
                {'id': 'dc-5-1', 'title': '글로벌 채용 플랫폼', 'desc': '해외 일자리 사이트', 'prompt': '해외 원격 일자리를 찾을 수 있는 플랫폼을 소개해주세요. Remote.co, We Work Remotely, FlexJobs 등 주요 사이트와 사용 방법을 설명해주세요.'},
                {'id': 'dc-5-2', 'title': '해외 기업 지원 전략', 'desc': '영문 이력서/면접', 'prompt': '해외 기업에 지원하기 위한 전략을 알려주세요. 영문 이력서 작성법, 화상 면접 준비, 시차 고려, 문화적 차이 극복 방법을 설명해주세요.'},
                {'id': 'dc-5-3', 'title': '글로벌 프리랜서', 'desc': '국제 프리랜서 활동', 'prompt': '글로벌 프리랜서로 활동하는 방법을 알려주세요. Upwork, Fiverr, Toptal 등 플랫폼 활용법, 달러 수입 관리, 국제 결제 방법, 세금 처리를 설명해주세요.'}
            ]}
        }
    },
    'creator-economy': {
        'title': '크리에이터 경제 입문', 'icon': '🎨', 'color': 'from-pink-500 to-rose-500',
        'lessons': {
            1: {'title': '크리에이터 경제 이해', 'desc': '콘텐츠로 수익을 만드는 다양한 비즈니스 모델', 'prompts': [
                {'id': 'ce-1-1', 'title': '크리에이터 경제란', 'desc': '시장 개요', 'prompt': '크리에이터 경제의 개념과 현황을 설명해주세요. 시장 규모, 성장 동향, 성공 크리에이터 사례, 일반인이 진입할 수 있는 기회를 분석해주세요.'},
                {'id': 'ce-1-2', 'title': '수익화 모델', 'desc': '돈 버는 방법들', 'prompt': '크리에이터의 다양한 수익화 모델을 설명해주세요. 광고 수익, 스폰서십, 멤버십, 디지털 제품 판매, 컨설팅, 강의 등 각 모델의 특징과 수익 잠재력을 분석해주세요.'},
                {'id': 'ce-1-3', 'title': '현실적인 수익 분석', 'desc': '얼마나 벌 수 있나', 'prompt': '크리에이터로 현실적으로 기대할 수 있는 수익을 분석해주세요. 구독자/팔로워 수별 예상 수익, 수익화까지 걸리는 시간, 풀타임 전환 기준을 설명해주세요.'}
            ]},
            2: {'title': '나만의 콘텐츠 주제 찾기', 'desc': '전문성과 관심사를 콘텐츠로 연결하기', 'prompts': [
                {'id': 'ce-2-1', 'title': '콘텐츠 주제 발굴', 'desc': '무엇을 만들지', 'prompt': '저에게 맞는 콘텐츠 주제를 찾아주세요. 전문 지식, 경험, 관심사를 조합하여 차별화된 콘텐츠 주제 5가지를 제안하고, 각 주제의 시장성을 분석해주세요.'},
                {'id': 'ce-2-2', 'title': '타겟 오디언스 정의', 'desc': '누구를 위한 콘텐츠', 'prompt': '콘텐츠의 타겟 오디언스를 정의하는 방법을 알려주세요. 페르소나 작성법, 오디언스 니즈 파악, 경쟁 분석을 통한 차별화 포인트 도출 방법을 설명해주세요.'},
                {'id': 'ce-2-3', 'title': '콘텐츠 기획', 'desc': '시리즈 구성하기', 'prompt': '장기적으로 운영할 수 있는 콘텐츠 시리즈를 기획해주세요. 필러 콘텐츠와 헤로 콘텐츠 전략, 콘텐츠 캘린더 작성법, 일관성 유지 방법을 설명해주세요.'}
            ]},
            3: {'title': 'AI로 콘텐츠 제작하기', 'desc': 'ChatGPT, 미드저니로 콘텐츠 효율적으로 만들기', 'prompts': [
                {'id': 'ce-3-1', 'title': 'AI 글쓰기 활용', 'desc': '텍스트 콘텐츠 제작', 'prompt': 'AI를 활용해 블로그, 뉴스레터, SNS 글을 효율적으로 작성하는 방법을 알려주세요. 아이디어 발상, 초안 작성, 편집, SEO 최적화까지 AI 활용 워크플로우를 설명해주세요.'},
                {'id': 'ce-3-2', 'title': 'AI 영상 제작', 'desc': '비디오 콘텐츠 제작', 'prompt': 'AI를 활용해 영상 콘텐츠를 제작하는 방법을 알려주세요. 스크립트 작성, 썸네일 제작, 자막 생성, AI 음성, 편집 등에 활용할 수 있는 도구와 방법을 설명해주세요.'},
                {'id': 'ce-3-3', 'title': 'AI 시각 콘텐츠', 'desc': '이미지/디자인 제작', 'prompt': '이미지 생성 AI를 활용해 콘텐츠 비주얼을 만드는 방법을 알려주세요. 미드저니로 썸네일, 인포그래픽, SNS 이미지를 만드는 프롬프트와 워크플로우를 설명해주세요.'}
            ]},
            4: {'title': '수익화 채널 구축', 'desc': '유튜브, 블로그, 뉴스레터 시작하기', 'prompts': [
                {'id': 'ce-4-1', 'title': '유튜브 시작하기', 'desc': '채널 개설부터 운영까지', 'prompt': '유튜브 채널을 시작하는 완전 가이드를 제공해주세요. 채널 개설, 장비 셋업, 첫 영상 기획, 알고리즘 이해, 구독자 확보 전략을 단계별로 설명해주세요.'},
                {'id': 'ce-4-2', 'title': '블로그/뉴스레터 시작', 'desc': '글쓰기 플랫폼 시작', 'prompt': '수익화 가능한 블로그나 뉴스레터를 시작하는 방법을 알려주세요. 플랫폼 선택, 주제 설정, 첫 글 작성, 구독자 확보, 수익화 방법을 설명해주세요.'},
                {'id': 'ce-4-3', 'title': '채널 성장 전략', 'desc': '팔로워 확보하기', 'prompt': '콘텐츠 채널을 성장시키는 전략을 알려주세요. SEO, 해시태그, 콜라보레이션, 커뮤니티 활용, 유료 광고 등 채널별 성장 전략을 설명해주세요.'}
            ]},
            5: {'title': '지속 가능한 크리에이터 전략', 'desc': '번아웃 없이 꾸준히 콘텐츠 생산하는 법', 'prompts': [
                {'id': 'ce-5-1', 'title': '콘텐츠 시스템 구축', 'desc': '효율적인 제작 프로세스', 'prompt': '번아웃 없이 지속 가능한 콘텐츠 제작 시스템을 구축하는 방법을 알려주세요. 배치 작업, 템플릿 활용, 리사이클링, 아웃소싱 전략을 설명해주세요.'},
                {'id': 'ce-5-2', 'title': '다중 수익원 구축', 'desc': '수익 다각화', 'prompt': '크리에이터로서 수익을 다각화하는 방법을 알려주세요. 광고 수익 외에 제품 판매, 강의, 멤버십, 스폰서십 등 다양한 수익원을 구축하는 전략을 설명해주세요.'},
                {'id': 'ce-5-3', 'title': '장기 성장 전략', 'desc': '1년 후 비전', 'prompt': '크리에이터로서 1년, 3년 장기 성장 전략을 세워주세요. 채널 확장, 팀 구축, 브랜드 전환, 비즈니스 모델 발전 등 성장 로드맵을 제시해주세요.'}
            ]}
        }
    },
    'freelance-startup': {
        'title': '프리랜서/창업 준비', 'icon': '🚀', 'color': 'from-indigo-500 to-violet-500',
        'lessons': {
            1: {'title': '프리랜서 vs 창업 선택', 'desc': '나에게 맞는 독립 형태 결정하기', 'prompts': [
                {'id': 'fs-1-1', 'title': '독립 형태 비교', 'desc': '프리랜서와 창업 차이', 'prompt': '프리랜서와 창업의 차이점을 상세히 비교해주세요. 수입 구조, 리스크, 자유도, 성장 가능성, 필요 역량 측면에서 각각의 장단점을 분석해주세요.'},
                {'id': 'fs-1-2', 'title': '적합성 진단', 'desc': '나에게 맞는 형태', 'prompt': '저에게 프리랜서와 창업 중 어떤 것이 적합한지 진단해주세요. 성격, 재정 상황, 리스크 감수성, 목표 등을 고려한 질문을 통해 적합한 형태를 추천해주세요.'},
                {'id': 'fs-1-3', 'title': '하이브리드 모델', 'desc': '중간 형태 탐색', 'prompt': '프리랜서와 창업의 중간 형태인 하이브리드 모델을 소개해주세요. 1인 기업, 에이전시 모델, 프로덕트화된 서비스 등 다양한 형태와 전환 경로를 설명해주세요.'}
            ]},
            2: {'title': '1인 사업 아이템 발굴', 'desc': 'AI 시대 유망한 1인 사업 아이템 탐색', 'prompts': [
                {'id': 'fs-2-1', 'title': 'AI 시대 사업 아이템', 'desc': '유망 아이템 탐색', 'prompt': 'AI 시대에 1인이 시작할 수 있는 유망한 사업 아이템 20가지를 소개해주세요. 각 아이템의 초기 투자, 수익 모델, 경쟁 상황, 진입 난이도를 분석해주세요.'},
                {'id': 'fs-2-2', 'title': '서비스 상품화', 'desc': '기술/지식의 상품화', 'prompt': '보유한 기술이나 지식을 상품화하는 방법을 알려주세요. 컨설팅, 코칭, 강의, 템플릿, SaaS 등 다양한 상품화 방식과 가격 책정 전략을 설명해주세요.'},
                {'id': 'fs-2-3', 'title': '아이디어 검증', 'desc': 'MVP 테스트하기', 'prompt': '사업 아이디어를 빠르게 검증하는 방법을 알려주세요. MVP(최소 기능 제품) 개념, 랜딩페이지 테스트, 사전 판매, 고객 인터뷰 등 검증 방법을 설명해주세요.'}
            ]},
            3: {'title': 'AI로 비용 절감하기', 'desc': 'AI로 마케팅, 고객응대, 콘텐츠 제작 자동화', 'prompts': [
                {'id': 'fs-3-1', 'title': 'AI 마케팅 자동화', 'desc': '저비용 마케팅', 'prompt': 'AI를 활용해 저비용으로 마케팅하는 방법을 알려주세요. AI로 콘텐츠 작성, 광고 카피 생성, SEO 최적화, 이메일 마케팅 자동화 방법을 설명해주세요.'},
                {'id': 'fs-3-2', 'title': 'AI 고객 응대', 'desc': '24시간 고객 서비스', 'prompt': 'AI를 활용해 고객 응대를 자동화하는 방법을 알려주세요. 챗봇 구축, FAQ 자동화, 이메일 자동 응답 등 1인 사업자도 24시간 고객 서비스를 제공하는 방법을 설명해주세요.'},
                {'id': 'fs-3-3', 'title': 'AI 운영 효율화', 'desc': '업무 프로세스 자동화', 'prompt': 'AI로 사업 운영을 효율화하는 방법을 알려주세요. 회계 자동화, 일정 관리, 문서 작성, 데이터 분석 등 AI 도구를 활용한 1인 사업 운영 시스템을 설명해주세요.'}
            ]},
            4: {'title': '첫 고객 확보 전략', 'desc': '초기 고객 발굴과 레퍼런스 만들기', 'prompts': [
                {'id': 'fs-4-1', 'title': '첫 고객 찾기', 'desc': '초기 고객 발굴', 'prompt': '사업 초기에 첫 고객을 확보하는 전략을 알려주세요. 지인 네트워크 활용, 무료/할인 제공, 콜드 아웃리치, 커뮤니티 활동 등 다양한 방법을 설명해주세요.'},
                {'id': 'fs-4-2', 'title': '레퍼런스 구축', 'desc': '신뢰 쌓기', 'prompt': '신규 사업자가 신뢰를 쌓고 레퍼런스를 구축하는 방법을 알려주세요. 사례 연구 작성, 추천사 받기, 포트폴리오 구성, 소셜 프루프 활용법을 설명해주세요.'},
                {'id': 'fs-4-3', 'title': '입소문 마케팅', 'desc': '추천 유도하기', 'prompt': '고객이 자발적으로 추천하게 만드는 전략을 알려주세요. 리퍼럴 프로그램, 고객 만족도 극대화, 입소문이 나는 서비스 경험 설계 방법을 설명해주세요.'}
            ]},
            5: {'title': '사업 확장과 시스템 구축', 'desc': '지속 가능한 수익 구조 만들기', 'prompts': [
                {'id': 'fs-5-1', 'title': '수익 구조 설계', 'desc': '안정적인 수입원', 'prompt': '1인 사업의 지속 가능한 수익 구조를 설계하는 방법을 알려주세요. 고정 수입 vs 프로젝트 수입, 패시브 인컴 구축, 가격 인상 전략 등을 설명해주세요.'},
                {'id': 'fs-5-2', 'title': '시스템화', 'desc': '자동화와 위임', 'prompt': '1인 사업을 시스템화하여 규모를 키우는 방법을 알려주세요. 프로세스 정립, 자동화, 아웃소싱, 협력 파트너 구축 등 성장 전략을 설명해주세요.'},
                {'id': 'fs-5-3', 'title': '장기 사업 전략', 'desc': '확장 로드맵', 'prompt': '1인 사업에서 시작해 성장하는 장기 전략을 세워주세요. 팀 구축 시점, 사업 형태 전환, 투자 유치, 엑싯 전략 등 성장 로드맵을 제시해주세요.'}
            ]}
        }
    },
    'transition-roadmap': {
        'title': '전환 로드맵 수립', 'icon': '🗺️', 'color': 'from-slate-600 to-gray-700',
        'lessons': {
            1: {'title': '전환 목표 구체화', 'desc': 'SMART 기법으로 명확한 목표 설정하기', 'prompts': [
                {'id': 'tr-1-1', 'title': 'SMART 목표 설정', 'desc': '구체적인 목표 만들기', 'prompt': '커리어 전환 목표를 SMART 기법으로 설정하는 방법을 알려주세요. Specific, Measurable, Achievable, Relevant, Time-bound 각 요소를 적용한 예시와 함께 설명해주세요.'},
                {'id': 'tr-1-2', 'title': '성공 지표 정의', 'desc': 'KPI 설정하기', 'prompt': '커리어 전환 성공을 측정할 수 있는 지표(KPI)를 설정하는 방법을 알려주세요. 수입, 만족도, 성장, 워라밸 등 다양한 측면의 성공 지표를 정의해주세요.'},
                {'id': 'tr-1-3', 'title': '비전 보드 작성', 'desc': '미래 모습 시각화', 'prompt': '전환 후 이상적인 삶의 모습을 시각화하는 비전 보드를 작성해주세요. 1년 후, 3년 후, 5년 후의 구체적인 모습을 상상하고 기록하는 방법을 안내해주세요.'}
            ]},
            2: {'title': '3개월 단기 계획', 'desc': '즉시 실행 가능한 액션 플랜 수립', 'prompts': [
                {'id': 'tr-2-1', 'title': '90일 액션플랜', 'desc': '단기 실행 계획', 'prompt': '커리어 전환을 위한 90일 액션 플랜을 수립해주세요. 주차별 목표, 구체적인 할 일, 마일스톤을 포함한 실행 계획을 제시해주세요.'},
                {'id': 'tr-2-2', 'title': '퀵윈 달성하기', 'desc': '빠른 성과 만들기', 'prompt': '처음 30일 내에 달성할 수 있는 퀵윈(Quick Win)을 설정해주세요. 자신감을 높이고 추진력을 얻을 수 있는 작은 성공들을 정의하고 달성 방법을 알려주세요.'},
                {'id': 'tr-2-3', 'title': '습관 설계', 'desc': '매일 실천할 것들', 'prompt': '커리어 전환을 위해 매일 실천할 습관을 설계해주세요. 학습, 네트워킹, 포트폴리오 구축 등 일일 루틴을 만들고 습관화하는 방법을 알려주세요.'}
            ]},
            3: {'title': '6개월 중기 계획', 'desc': '역량 개발과 기회 탐색 로드맵', 'prompts': [
                {'id': 'tr-3-1', 'title': '역량 개발 계획', 'desc': '스킬 습득 로드맵', 'prompt': '6개월 동안 필요한 역량을 개발하는 계획을 세워주세요. 월별 학습 목표, 자격증 취득, 프로젝트 경험 쌓기 등 구체적인 역량 개발 로드맵을 제시해주세요.'},
                {'id': 'tr-3-2', 'title': '기회 탐색 전략', 'desc': '적극적 기회 발굴', 'prompt': '6개월 동안 커리어 기회를 탐색하는 전략을 세워주세요. 채용 시장 모니터링, 네트워킹 활동, 사이드 프로젝트, 인턴십 등 다양한 기회 발굴 방법을 알려주세요.'},
                {'id': 'tr-3-3', 'title': '중간 점검 방법', 'desc': '진행 상황 체크', 'prompt': '전환 과정의 진행 상황을 점검하고 조정하는 방법을 알려주세요. 월별 리뷰 항목, 계획 수정 기준, 피드백 반영 방법을 설명해주세요.'}
            ]},
            4: {'title': '리스크 관리 전략', 'desc': '수입 공백 대비, 실패 시 플랜 B 준비', 'prompts': [
                {'id': 'tr-4-1', 'title': '재정 리스크 관리', 'desc': '수입 공백 대비', 'prompt': '커리어 전환 중 재정 리스크를 관리하는 방법을 알려주세요. 비상 자금 마련, 병행 수입 유지, 생활비 절감 전략 등을 설명해주세요.'},
                {'id': 'tr-4-2', 'title': '플랜 B 준비', 'desc': '대안 시나리오', 'prompt': '커리어 전환이 계획대로 되지 않을 때를 대비한 플랜 B를 준비해주세요. 다양한 실패 시나리오와 각각에 대한 대응 전략을 제시해주세요.'},
                {'id': 'tr-4-3', 'title': '심리적 준비', 'desc': '불확실성 대처', 'prompt': '커리어 전환 과정의 불확실성과 스트레스에 대처하는 방법을 알려주세요. 멘탈 관리, 지지 시스템 구축, 실패 대처법 등 심리적 준비 전략을 설명해주세요.'}
            ]},
            5: {'title': '1년 로드맵 완성', 'desc': '전환 완료까지의 통합 실행 계획', 'prompts': [
                {'id': 'tr-5-1', 'title': '1년 로드맵 작성', 'desc': '통합 실행 계획', 'prompt': '1년간의 커리어 전환 로드맵을 완성해주세요. 분기별 목표, 주요 마일스톤, 체크포인트를 포함한 통합 계획을 제시해주세요.'},
                {'id': 'tr-5-2', 'title': '실행 동력 유지', 'desc': '지속적인 동기부여', 'prompt': '1년간 전환 과정에서 실행력을 유지하는 방법을 알려주세요. 동기부여 유지, 번아웃 방지, 어카운터빌리티 파트너 활용 등 지속 전략을 설명해주세요.'},
                {'id': 'tr-5-3', 'title': '전환 완료 체크리스트', 'desc': '최종 점검 사항', 'prompt': '커리어 전환 완료를 확인하는 체크리스트를 작성해주세요. 목표 달성 여부, 만족도 평가, 다음 단계 계획 등 전환 성공을 정의하는 기준을 제시해주세요.'}
            ]}
        }
    }
}

# 레슨 페이지 템플릿
lesson_page_template = """'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, ChevronDown, Copy, Check, ExternalLink, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

// AI 서비스 목록
const aiServices = [
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', icon: '✨', color: 'from-blue-500 to-cyan-500' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', icon: '🤖', color: 'from-green-500 to-emerald-500' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', icon: '🎭', color: 'from-orange-500 to-amber-500' },
];

interface Prompt {
  id: string;
  title: string;
  prompt: string;
  description: string;
}

interface LessonData {
  day: number;
  title: string;
  description: string;
  prompts: Prompt[];
}

interface CourseInfo {
  title: string;
  icon: string;
  color: string;
}

const courseInfo: { [key: string]: CourseInfo } = {
COURSE_INFO_DATA
};

const lessonData: { [key: string]: { [key: number]: LessonData } } = {
LESSON_DATA
};

export default function CareerChangeLessonPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedPrompts, setExpandedPrompts] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [completedPrompts, setCompletedPrompts] = useState<string[]>([]);

  const course = courseInfo[courseId];
  const lesson = lessonData[courseId]?.[day];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    const savedCompleted = localStorage.getItem(`career-${courseId}-${day}-completed`);
    if (savedCompleted) {
      setCompletedPrompts(JSON.parse(savedCompleted));
    }
  }, [courseId, day]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const togglePrompt = (id: string) => {
    setExpandedPrompts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const copyPrompt = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    if (!completedPrompts.includes(id)) {
      const newCompleted = [...completedPrompts, id];
      setCompletedPrompts(newCompleted);
      localStorage.setItem(`career-${courseId}-${day}-completed`, JSON.stringify(newCompleted));

      if (lesson && newCompleted.length === lesson.prompts.length) {
        const progressKey = `career-change-${courseId}-progress`;
        const savedProgress = localStorage.getItem(progressKey);
        let progress: number[] = savedProgress ? JSON.parse(savedProgress) : [];
        if (!progress.includes(day)) {
          progress.push(day);
          localStorage.setItem(progressKey, JSON.stringify(progress));
        }
      }
    }
  };

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레슨을 찾을 수 없습니다</h1>
          <Link href="/course/career-change" className="text-purple-600 hover:underline">
            코스 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <span className="text-gray-300">안녕하세요, {userName}님!</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href={`/course/career-change/${courseId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          {course.title} 코스로 돌아가기
        </Link>

        <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-6 mb-8 text-white`}>
          <div className="flex items-center gap-2 mb-3 text-white/80 text-sm">
            <Link href="/course/career-change" className="hover:text-white">진로 전환자 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/career-change/${courseId}`} className="hover:text-white">{course.title}</Link>
            <ChevronRight className="w-4 h-4" />
            <span>DAY {day}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <span className="text-white/80 text-sm">DAY {day}</span>
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
            </div>
          </div>
          <p className="mt-3 text-white/90">{lesson.description}</p>
        </div>

        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI 서비스 바로가기
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {aiServices.map(service => (
              <a
                key={service.id}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r ${service.color} text-white font-medium hover:opacity-90 transition`}
              >
                <span className="text-xl">{service.icon}</span>
                {service.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">오늘의 프롬프트</h2>
          {lesson.prompts.map((prompt, idx) => (
            <div key={prompt.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => togglePrompt(prompt.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    completedPrompts.includes(prompt.id)
                      ? 'bg-green-100 text-green-600'
                      : `bg-gradient-to-r ${course.color} text-white`
                  }`}>
                    {completedPrompts.includes(prompt.id) ? <Check className="w-5 h-5" /> : idx + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                    <p className="text-sm text-gray-500">{prompt.description}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrompts.includes(prompt.id) ? 'rotate-180' : ''}`} />
              </button>

              {expandedPrompts.includes(prompt.id) && (
                <div className="px-5 pb-5 border-t">
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">{prompt.prompt}</pre>
                  </div>
                  <button
                    onClick={() => copyPrompt(prompt.prompt, prompt.id)}
                    className={`mt-4 w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                      copiedId === prompt.id
                        ? 'bg-green-500 text-white'
                        : `bg-gradient-to-r ${course.color} text-white hover:opacity-90`
                    }`}
                  >
                    {copiedId === prompt.id ? (
                      <>
                        <Check className="w-5 h-5" />
                        복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        프롬프트 복사하기
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link
              href={`/course/career-change/${courseId}/lesson/${day - 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              이전 레슨
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link
              href={`/course/career-change/${courseId}/lesson/${day + 1}`}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${course.color} text-white rounded-lg hover:opacity-90 transition`}
            >
              다음 레슨
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/course/career-change/${courseId}`}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${course.color} text-white rounded-lg hover:opacity-90 transition`}
            >
              코스 완료!
              <Check className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
"""

def generate_course_info():
    lines = []
    for course_id, data in lesson_data.items():
        lines.append(f"  '{course_id}': {{ title: '{data['title']}', icon: '{data['icon']}', color: '{data['color']}' }},")
    return '\n'.join(lines)

def generate_lesson_data():
    result = []
    for course_id, course in lesson_data.items():
        lessons = []
        for day, lesson in course['lessons'].items():
            prompts = []
            for p in lesson['prompts']:
                prompt_escaped = p['prompt'].replace("'", "\\'").replace('\n', '\\n')
                prompts.append(f"        {{ id: '{p['id']}', title: '{p['title']}', description: '{p['desc']}', prompt: '{prompt_escaped}' }}")
            prompts_str = ',\n'.join(prompts)
            lessons.append(f"""    {day}: {{
      day: {day},
      title: '{lesson['title']}',
      description: '{lesson['desc']}',
      prompts: [
{prompts_str}
      ]
    }}""")
        lessons_str = ',\n'.join(lessons)
        result.append(f"  '{course_id}': {{\n{lessons_str}\n  }}")
    return ',\n'.join(result)

# 생성
course_info_data = generate_course_info()
full_lesson_data = generate_lesson_data()

page_content = lesson_page_template.replace('COURSE_INFO_DATA', course_info_data).replace('LESSON_DATA', full_lesson_data)

# 디렉토리 생성 및 파일 저장
os.makedirs('C:/todo/today/aws/career-change/[course]/lesson/[day]', exist_ok=True)

with open('C:/todo/today/aws/career-change/[course]/lesson/[day]/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Lesson page with all 40 lessons created successfully!")
