#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# 레슨 페이지 수정
lesson_file = "/home/ec2-user/hw-c-edu-platform/frontend/app/course/career-change/[course]/lesson/[day]/page.tsx"

with open(lesson_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Day 1 수정
content = content.replace(
    "title: 'ChatGPT 완전 정복',",
    "title: '대화형 AI 완전 정복',"
)
content = content.replace(
    "description: '대화형 AI의 기본부터 고급 프롬프트까지',",
    "description: '텍스트 기반 AI의 기본부터 고급 프롬프트까지',"
)
content = content.replace(
    "title: 'ChatGPT 기초', description: '기본 사용법 익히기', prompt: 'ChatGPT를 처음 사용하는 사람을 위한 가이드를 제공해주세요. 기본 대화 방법, 질문하는 요령, 좋은 결과를 얻기 위한 팁을 알려주세요.'",
    "title: '대화형 AI 기초', description: '기본 사용법 익히기', prompt: '대화형 AI(ChatGPT, Claude, Gemini 등)를 처음 사용하는 사람을 위한 가이드를 제공해주세요. 현재 가장 인기 있는 대화형 AI 서비스들을 비교하고, 기본 대화 방법, 질문하는 요령, 좋은 결과를 얻기 위한 팁을 알려주세요.'"
)
content = content.replace(
    "title: 'ChatGPT 실무 활용', description: '업무에 적용하기', prompt: 'ChatGPT를 업무에 활용하는 10가지 실전 사례를 알려주세요. 이메일 작성, 보고서 요약, 아이디어 브레인스토밍, 코드 작성 등 구체적인 프롬프트 예시와 함께 설명해주세요.'",
    "title: 'AI 실무 활용', description: '업무에 적용하기', prompt: '대화형 AI를 업무에 활용하는 10가지 실전 사례를 알려주세요. 이메일 작성, 보고서 요약, 아이디어 브레인스토밍, 코드 작성 등 구체적인 프롬프트 예시와 함께 설명해주세요. 현재 시점에서 가장 효과적인 AI 서비스도 추천해주세요.'"
)

# Day 2 수정
content = content.replace(
    "title: 'Claude AI 활용법',",
    "title: '문서 분석 및 글쓰기 AI',"
)
content = content.replace(
    "title: 'Claude 특징 이해', description: 'Claude만의 장점', prompt: 'Claude AI의 특징과 ChatGPT와의 차이점을 설명해주세요. 긴 문서 처리, 안전성, 정확성 측면에서 Claude가 유리한 상황을 알려주세요.'",
    "title: 'AI 서비스 비교', description: '용도별 최적 AI 선택', prompt: '현재 사용 가능한 주요 AI 서비스(ChatGPT, Claude, Gemini, Copilot 등)의 특징과 차이점을 설명해주세요. 긴 문서 처리, 코드 작성, 창의적 글쓰기 등 용도별로 어떤 AI가 가장 적합한지 최신 정보를 기준으로 분석해주세요.'"
)
content = content.replace(
    "title: 'Claude로 문서 분석', description: '긴 문서 처리하기', prompt: 'Claude로 긴 문서를 분석하는 방법을 알려주세요. PDF, 논문, 계약서 등 긴 문서를 요약하고, 핵심 포인트를 추출하고, 질문에 답하게 하는 프롬프트 기법을 설명해주세요.'",
    "title: 'AI로 문서 분석', description: '긴 문서 처리하기', prompt: 'AI로 긴 문서를 분석하는 방법을 알려주세요. PDF, 논문, 계약서 등 긴 문서를 요약하고, 핵심 포인트를 추출하고, 질문에 답하게 하는 프롬프트 기법을 설명해주세요. 현재 긴 문서 처리에 가장 효과적인 AI 서비스도 추천해주세요.'"
)
content = content.replace(
    "title: 'Claude로 글쓰기', description: '창의적 글 작성', prompt: 'Claude로 창의적인 글을 작성하는 방법을 알려주세요. 블로그 글, 뉴스레터, 마케팅 카피, 스토리 등 다양한 글쓰기에 Claude를 활용하는 프롬프트 예시를 제공해주세요.'",
    "title: 'AI로 글쓰기', description: '창의적 글 작성', prompt: 'AI로 창의적인 글을 작성하는 방법을 알려주세요. 블로그 글, 뉴스레터, 마케팅 카피, 스토리 등 다양한 글쓰기에 AI를 활용하는 프롬프트 예시를 제공해주세요. 글쓰기에 최적화된 AI 서비스도 함께 추천해주세요.'"
)

# Day 3 수정
content = content.replace(
    "description: '미드저니, DALL-E, Stable Diffusion 활용',",
    "description: '최신 이미지 생성 AI 도구 활용법',"
)
content = content.replace(
    "title: '이미지 AI 소개', description: '주요 도구 비교', prompt: '주요 이미지 생성 AI (미드저니, DALL-E, Stable Diffusion)의 특징과 차이점을 설명해주세요. 각 도구가 적합한 용도와 장단점을 비교해주세요.'",
    "title: '이미지 AI 트렌드', description: '최신 도구 비교', prompt: '현재 사용 가능한 주요 이미지 생성 AI 도구들을 소개해주세요. 무료/유료 옵션, 각 도구의 강점과 약점, 적합한 용도를 최신 정보를 기준으로 비교 분석해주세요. 초보자에게 추천하는 서비스도 알려주세요.'"
)

# Day 4 수정
content = content.replace(
    "description: 'Notion AI, Zapier, 자동화 워크플로우 구축',",
    "description: '최신 자동화 도구로 워크플로우 구축',"
)
content = content.replace(
    "title: 'Notion AI 활용', description: '문서 작업 자동화', prompt: 'Notion AI를 활용하여 업무 효율을 높이는 방법을 알려주세요. 회의록 요약, 문서 작성, 브레인스토밍, 번역 등 Notion AI의 주요 기능과 활용 팁을 설명해주세요.'",
    "title: 'AI 기반 생산성 도구', description: '문서/업무 자동화', prompt: '현재 가장 인기 있는 AI 기반 생산성 도구들을 소개해주세요. 문서 작성, 회의록 요약, 이메일 관리, 일정 정리 등에 활용할 수 있는 최신 AI 도구들과 활용 팁을 설명해주세요.'"
)
content = content.replace(
    "title: '업무 자동화 도구', description: 'Zapier, Make 활용', prompt: 'Zapier, Make(Integromat) 등 자동화 도구의 개념과 활용법을 설명해주세요. 반복 업무를 자동화하는 워크플로우 예시 5가지를 단계별로 알려주세요.'",
    "title: '업무 자동화 플랫폼', description: '노코드 자동화 구축', prompt: '노코드/로우코드 자동화 플랫폼들의 개념과 활용법을 설명해주세요. 반복 업무를 자동화하는 워크플로우 예시 5가지를 단계별로 알려주세요. 현재 가장 사용하기 쉬운 자동화 도구도 추천해주세요.'"
)

# Day 5 수정
content = content.replace(
    "description: 'AI를 활용한 실제 프로젝트 진행해보기',",
    "description: '다양한 AI를 활용한 실제 프로젝트 진행',"
)

with open(lesson_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Lesson page updated!')

# 코스 상세 페이지 수정
course_file = "/home/ec2-user/hw-c-edu-platform/frontend/app/course/career-change/[course]/page.tsx"

with open(course_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 코스 설명 수정
content = content.replace(
    "description: 'ChatGPT, Claude, 미드저니 등 AI 도구 마스터하고 생산성 10배 높이기',",
    "description: '최신 AI 도구 마스터하고 생산성 10배 높이기',"
)
content = content.replace(
    "longDescription: 'AI 시대의 핵심 역량은 AI 도구를 능숙하게 다루는 것입니다. ChatGPT, Claude, 미드저니, Notion AI 등 주요 AI 도구의 활용법을 배우고, 프롬프트 엔지니어링 기초부터 실무 적용까지 익힙니다.',",
    "longDescription: 'AI 시대의 핵심 역량은 AI 도구를 능숙하게 다루는 것입니다. 대화형 AI, 이미지 생성 AI, 자동화 도구 등 주요 AI 도구의 활용법을 배우고, 프롬프트 엔지니어링 기초부터 실무 적용까지 익힙니다. 특정 도구가 아닌 범용적인 AI 활용 역량을 키웁니다.',"
)

# 레슨 목록 수정
content = content.replace(
    "{ day: 1, title: 'ChatGPT 완전 정복', duration: '40분', description: '대화형 AI의 기본부터 고급 프롬프트까지' },",
    "{ day: 1, title: '대화형 AI 완전 정복', duration: '40분', description: '텍스트 기반 AI의 기본부터 고급 프롬프트까지' },"
)
content = content.replace(
    "{ day: 2, title: 'Claude AI 활용법', duration: '35분', description: '긴 문서 분석, 코드 작성, 창의적 글쓰기' },",
    "{ day: 2, title: '문서 분석 및 글쓰기 AI', duration: '35분', description: '긴 문서 분석, 코드 작성, 창의적 글쓰기' },"
)
content = content.replace(
    "{ day: 3, title: '이미지 생성 AI 마스터', duration: '40분', description: '미드저니, DALL-E, Stable Diffusion 활용' },",
    "{ day: 3, title: '이미지 생성 AI 마스터', duration: '40분', description: '최신 이미지 생성 AI 도구 활용법' },"
)
content = content.replace(
    "{ day: 4, title: '업무 자동화 AI 도구', duration: '35분', description: 'Notion AI, Zapier, 자동화 워크플로우 구축' },",
    "{ day: 4, title: '업무 자동화 AI 도구', duration: '35분', description: '최신 자동화 도구로 워크플로우 구축' },"
)
content = content.replace(
    "{ day: 5, title: 'AI 협업 프로젝트 실습', duration: '45분', description: 'AI를 활용한 실제 프로젝트 진행해보기' }",
    "{ day: 5, title: 'AI 협업 프로젝트 실습', duration: '45분', description: '다양한 AI를 활용한 실제 프로젝트 진행' }"
)

with open(course_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Course page updated!')
print('All updates completed!')
