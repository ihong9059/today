import numpy as np

# 프롬프트 품질에 따른 응답 품질 시뮬레이션
prompts = [
    {
        "type": "나쁜 프롬프트",
        "prompt": "AI 알려줘",
        "quality_score": 0.3,
        "expected": "AI는... 인공지능입니다... (모호한 답변)"
    },
    {
        "type": "보통 프롬프트",
        "prompt": "AI가 뭔지 설명해줘",
        "quality_score": 0.6,
        "expected": "AI(인공지능)는 기계가 인간의 지능을 모방하는 기술입니다."
    },
    {
        "type": "좋은 프롬프트",
        "prompt": "중학생이 이해할 수 있도록 AI의 정의, 종류, 활용 사례를 각각 2줄로 설명해줘",
        "quality_score": 0.9,
        "expected": "체계적이고 맞춤화된 상세 답변"
    },
    {
        "type": "Chain-of-Thought",
        "prompt": "AI란 무엇인지 단계별로 설명해줘: 1)정의 2)작동원리 3)종류 4)실생활 예시",
        "quality_score": 0.95,
        "expected": "단계별 구조화된 완벽한 답변"
    },
]

print("=== 프롬프트 품질이 응답에 미치는 영향 ===")

for p in prompts:
    bar_len = int(p["quality_score"] * 30)
    bar = "#" * bar_len
    print(f"[{p['type']}]")
    print(f"  프롬프트: "{p['prompt']}"")
    print(f"  응답 품질: {p['quality_score']:.0%} |{bar}|")
    print(f"  예상 응답: {p['expected']}")
    print()

print("핵심: 구체적이고 구조화된 프롬프트 = 더 좋은 응답!")