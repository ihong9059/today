#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# AI 활용 필수 역량 코스 - 특정 AI 도구명 제거, 일반적인 용어로 변경
ai_skills_updated = """  'ai-skills': {
    1: {
      day: 1,
      title: '대화형 AI 완전 정복',
      description: '텍스트 기반 AI의 기본부터 고급 프롬프트까지',
      prompts: [
        { id: 'as-1-1', title: '대화형 AI 기초', description: '기본 사용법 익히기', prompt: '대화형 AI(ChatGPT, Claude, Gemini 등)를 처음 사용하는 사람을 위한 가이드를 제공해주세요. 현재 가장 인기 있는 대화형 AI 서비스들을 비교하고, 기본 대화 방법, 질문하는 요령, 좋은 결과를 얻기 위한 팁을 알려주세요.' },
        { id: 'as-1-2', title: '프롬프트 엔지니어링', description: '효과적인 프롬프트 작성', prompt: '효과적인 프롬프트를 작성하는 방법을 알려주세요. 역할 지정, 맥락 제공, 출력 형식 지정, 단계별 지시 등 프롬프트 엔지니어링의 핵심 기법을 예시와 함께 설명해주세요. 이 기법들은 어떤 AI 서비스에서도 적용 가능합니다.' },
        { id: 'as-1-3', title: 'AI 실무 활용', description: '업무에 적용하기', prompt: '대화형 AI를 업무에 활용하는 10가지 실전 사례를 알려주세요. 이메일 작성, 보고서 요약, 아이디어 브레인스토밍, 코드 작성 등 구체적인 프롬프트 예시와 함께 설명해주세요. 현재 시점에서 가장 효과적인 AI 서비스도 추천해주세요.' }
      ]
    },
    2: {
      day: 2,
      title: '문서 분석 및 글쓰기 AI',
      description: '긴 문서 분석, 코드 작성, 창의적 글쓰기',
      prompts: [
        { id: 'as-2-1', title: 'AI 서비스 비교', description: '용도별 최적 AI 선택', prompt: '현재 사용 가능한 주요 AI 서비스(ChatGPT, Claude, Gemini, Copilot 등)의 특징과 차이점을 설명해주세요. 긴 문서 처리, 코드 작성, 창의적 글쓰기 등 용도별로 어떤 AI가 가장 적합한지 최신 정보를 기준으로 분석해주세요.' },
        { id: 'as-2-2', title: 'AI로 문서 분석', description: '긴 문서 처리하기', prompt: 'AI로 긴 문서를 분석하는 방법을 알려주세요. PDF, 논문, 계약서 등 긴 문서를 요약하고, 핵심 포인트를 추출하고, 질문에 답하게 하는 프롬프트 기법을 설명해주세요. 현재 긴 문서 처리에 가장 효과적인 AI 서비스도 추천해주세요.' },
        { id: 'as-2-3', title: 'AI로 글쓰기', description: '창의적 글 작성', prompt: 'AI로 창의적인 글을 작성하는 방법을 알려주세요. 블로그 글, 뉴스레터, 마케팅 카피, 스토리 등 다양한 글쓰기에 AI를 활용하는 프롬프트 예시를 제공해주세요. 글쓰기에 최적화된 AI 서비스도 함께 추천해주세요.' }
      ]
    },
    3: {
      day: 3,
      title: '이미지 생성 AI 마스터',
      description: '최신 이미지 생성 AI 도구 활용법',
      prompts: [
        { id: 'as-3-1', title: '이미지 AI 트렌드', description: '최신 도구 비교', prompt: '현재 사용 가능한 주요 이미지 생성 AI 도구들을 소개해주세요. 무료/유료 옵션, 각 도구의 강점과 약점, 적합한 용도를 최신 정보를 기준으로 비교 분석해주세요. 초보자에게 추천하는 서비스도 알려주세요.' },
        { id: 'as-3-2', title: '이미지 프롬프트 작성', description: '원하는 이미지 생성', prompt: '이미지 생성 AI에서 원하는 결과를 얻기 위한 프롬프트 작성법을 알려주세요. 스타일, 구도, 조명, 분위기 등을 지정하는 키워드와 프롬프트 구조를 예시와 함께 설명해주세요. 이 기법들은 대부분의 이미지 AI에서 적용 가능합니다.' },
        { id: 'as-3-3', title: '이미지 AI 실무 활용', description: '비즈니스에 적용', prompt: '이미지 생성 AI를 비즈니스에 활용하는 방법을 알려주세요. SNS 콘텐츠, 프레젠테이션, 상품 이미지, 브랜딩 등 실무에서 AI 이미지를 활용하는 사례와 저작권 등 주의사항을 설명해주세요. 상업적 사용에 적합한 서비스도 추천해주세요.' }
      ]
    },
    4: {
      day: 4,
      title: '업무 자동화 AI 도구',
      description: '최신 자동화 도구로 워크플로우 구축',
      prompts: [
        { id: 'as-4-1', title: 'AI 기반 생산성 도구', description: '문서/업무 자동화', prompt: '현재 가장 인기 있는 AI 기반 생산성 도구들을 소개해주세요. 문서 작성, 회의록 요약, 이메일 관리, 일정 정리 등에 활용할 수 있는 최신 AI 도구들과 활용 팁을 설명해주세요.' },
        { id: 'as-4-2', title: '업무 자동화 플랫폼', description: '노코드 자동화 구축', prompt: '노코드/로우코드 자동화 플랫폼들의 개념과 활용법을 설명해주세요. 반복 업무를 자동화하는 워크플로우 예시 5가지를 단계별로 알려주세요. 현재 가장 사용하기 쉬운 자동화 도구도 추천해주세요.' },
        { id: 'as-4-3', title: '개인 자동화 시스템', description: '나만의 자동화 구축', prompt: '개인의 업무 생산성을 높이는 자동화 시스템을 설계해주세요. 이메일 분류, 일정 관리, 자료 수집, 보고서 생성 등을 자동화하는 방법과 현재 가장 효과적인 도구 조합을 알려주세요.' }
      ]
    },
    5: {
      day: 5,
      title: 'AI 협업 프로젝트 실습',
      description: '다양한 AI를 활용한 실제 프로젝트 진행',
      prompts: [
        { id: 'as-5-1', title: '프로젝트 기획', description: 'AI로 아이디어 발전', prompt: 'AI와 함께 새로운 프로젝트를 기획하는 방법을 알려주세요. 아이디어 발상부터 시장조사, 기획서 작성까지 다양한 AI를 활용하는 프로젝트 기획 프로세스를 단계별로 안내해주세요. 각 단계에 적합한 AI 도구도 추천해주세요.' },
        { id: 'as-5-2', title: 'AI 협업 실습', description: '실제 결과물 만들기', prompt: '지금 바로 시작할 수 있는 AI 협업 미니 프로젝트를 제안해주세요. 블로그 글 시리즈, 유튜브 스크립트, 온라인 강의 기획 등 2-3시간 내에 결과물을 만들 수 있는 프로젝트와 활용할 AI 도구 조합을 안내해주세요.' },
        { id: 'as-5-3', title: 'AI 활용 포트폴리오', description: 'AI 역량 증명하기', prompt: 'AI 활용 역량을 보여주는 포트폴리오를 만드는 방법을 알려주세요. 어떤 프로젝트를 포함해야 하는지, AI를 사용했음을 어떻게 보여줄지, 차별화 포인트는 무엇인지 설명해주세요. 포트폴리오 제작에 활용할 수 있는 AI 도구도 추천해주세요.' }
      ]
    }
  },"""

# 코스 상세 페이지의 ai-skills 레슨 목록도 업데이트
ai_skills_course_page = """  'ai-skills': {
    id: 'ai-skills',
    title: 'AI 활용 필수 역량',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-500',
    description: '최신 AI 도구 마스터하고 생산성 10배 높이기',
    longDescription: 'AI 시대의 핵심 역량은 AI 도구를 능숙하게 다루는 것입니다. 대화형 AI, 이미지 생성 AI, 자동화 도구 등 주요 AI 도구의 활용법을 배우고, 프롬프트 엔지니어링 기초부터 실무 적용까지 익힙니다. 특정 도구가 아닌 범용적인 AI 활용 역량을 키웁니다.',
    lessons: [
      { day: 1, title: '대화형 AI 완전 정복', duration: '40분', description: '텍스트 기반 AI의 기본부터 고급 프롬프트까지' },
      { day: 2, title: '문서 분석 및 글쓰기 AI', duration: '35분', description: '긴 문서 분석, 코드 작성, 창의적 글쓰기' },
      { day: 3, title: '이미지 생성 AI 마스터', duration: '40분', description: '최신 이미지 생성 AI 도구 활용법' },
      { day: 4, title: '업무 자동화 AI 도구', duration: '35분', description: '최신 자동화 도구로 워크플로우 구축' },
      { day: 5, title: 'AI 협업 프로젝트 실습', duration: '45분', description: '다양한 AI를 활용한 실제 프로젝트 진행' }
    ],
  },"""

print("Updated ai-skills content generated!")
print("\n=== Lesson Page Data ===")
print(ai_skills_updated[:500] + "...")
print("\n=== Course Page Data ===")
print(ai_skills_course_page[:500] + "...")
