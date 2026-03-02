#!/usr/bin/env python3
"""
Lesson 1-7: 다층 퍼셉트론 (Multi-Layer Perceptron)
TTS 오디오 생성 스크립트
"""

import asyncio
import edge_tts
import os

# 출력 디렉토리
OUTPUT_DIR = "public/audio/lesson-1-7"

# 한국어 음성 (여성, 자연스러운 톤)
VOICE = "ko-KR-SunHiNeural"

# 씬별 나레이션 스크립트
NARRATIONS = {
    "scene1_intro": """
안녕하세요! AI 기초 교육 시리즈, 레슨 1-7입니다.
지난 시간에 우리는 퍼셉트론의 한계를 배웠습니다.
단일 퍼셉트론은 XOR 문제를 해결할 수 없었죠.
오늘은 그 해결책! 다층 퍼셉트론에 대해 알아보겠습니다.
""",

    "scene2_review": """
먼저 지난 시간 내용을 복습해 볼까요?
XOR 문제가 왜 어려웠을까요?
핵심은 바로 '선형 분리 불가능'이었습니다.
좌표 평면에서 하나의 직선으로는 XOR 데이터를 분류할 수 없었습니다.
빨간 점 영역 0과 녹색 점 영역 1 사이에 직선을 그을 수 없었죠.
""",

    "scene3_idea": """
그렇다면 해결책은 무엇일까요?
아이디어는 매우 단순합니다.
퍼셉트론 하나로 안 되면, 여러 개를 연결하면 됩니다!
이것이 바로 다층 퍼셉트론, MLP의 핵심 아이디어입니다.
퍼셉트론을 '층'으로 쌓아 올리는 것이죠.
""",

    "scene4_structure": """
다층 퍼셉트론의 구조를 살펴봅시다.
첫 번째는 입력층입니다. 데이터가 들어오는 곳이죠.
두 번째는 은닉층입니다. 숨겨진 층이라는 뜻인데, 중간 계산을 담당합니다.
마지막은 출력층입니다. 최종 결과가 나오는 곳입니다.
여기서 핵심은 은닉층! 이 층이 복잡한 패턴을 학습합니다.
""",

    "scene5_xor_solution": """
이제 XOR 문제를 다층 퍼셉트론으로 해결해 봅시다.
입력층에 x1과 x2가 들어갑니다.
은닉층에는 두 개의 퍼셉트론이 있습니다.
첫 번째 은닉 뉴런은 NAND 게이트 역할을 합니다.
두 번째 은닉 뉴런은 OR 게이트 역할을 합니다.
출력층의 퍼셉트론은 AND 게이트 역할을 합니다.
이 세 개의 간단한 게이트 조합으로 XOR을 만들 수 있습니다!
""",

    "scene6_calculation": """
실제 계산을 따라가 봅시다.
입력이 1, 1일 때를 예로 들어볼게요.
NAND 뉴런: 1과 1이 들어오면, 출력은 0입니다.
OR 뉴런: 1과 1이 들어오면, 출력은 1입니다.
AND 뉴런: 0과 1이 들어오면, 최종 출력은 0!
확인해 보면, XOR(1,1)은 정확히 0이어야 합니다. 성공이죠!
다른 입력값들도 모두 정확하게 XOR 결과를 계산합니다.
""",

    "scene7_why_works": """
왜 이것이 작동할까요?
비밀은 '비선형성'과 '조합'에 있습니다.
은닉층이 입력 공간을 변환합니다.
원래 선형 분리가 불가능했던 문제가,
은닉층을 거치면 선형 분리 가능한 새로운 공간으로 바뀝니다.
이것이 심층 신경망의 핵심 원리입니다!
""",

    "scene8_deep_learning": """
다층 퍼셉트론은 현대 딥러닝의 기초입니다.
은닉층을 더 많이 쌓으면? 더 복잡한 문제를 풀 수 있습니다.
이미지 인식, 음성 인식, 자연어 처리...
모든 현대 AI의 뿌리가 바로 이 다층 구조입니다.
1986년, 역전파 알고리즘이 발표되면서 다층 퍼셉트론 학습이 가능해졌습니다.
이것이 AI의 두 번째 전성기를 열었습니다.
""",

    "scene9_key_insights": """
오늘의 핵심 포인트를 정리합니다.
첫째, 다층 퍼셉트론은 퍼셉트론을 층으로 쌓은 것입니다.
둘째, 은닉층이 복잡한 패턴을 학습합니다.
셋째, XOR 문제는 2층 네트워크로 해결 가능합니다.
넷째, 층이 깊어질수록 더 복잡한 문제를 풀 수 있습니다.
이것이 딥러닝, 깊은 학습이라는 이름의 유래입니다!
""",

    "scene10_outro": """
오늘 다층 퍼셉트론의 기초를 배웠습니다.
단일 퍼셉트론의 한계를 극복하는 방법을 알게 되었죠.
다음 시간에는 이 네트워크를 어떻게 학습시키는지,
역전파 알고리즘에 대해 배워보겠습니다.
시청해 주셔서 감사합니다!
좋아요와 구독은 큰 힘이 됩니다!
"""
}

async def generate_audio(scene_name: str, text: str):
    """단일 씬의 오디오 생성"""
    output_path = os.path.join(OUTPUT_DIR, f"{scene_name}.mp3")

    # 텍스트 정리 (앞뒤 공백 제거)
    clean_text = text.strip()

    print(f"생성 중: {scene_name}...")

    communicate = edge_tts.Communicate(clean_text, VOICE)
    await communicate.save(output_path)

    print(f"완료: {output_path}")
    return output_path

async def main():
    """모든 씬의 오디오 생성"""
    # 출력 디렉토리 확인
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Lesson 1-7 TTS 생성 시작")
    print(f"음성: {VOICE}")
    print(f"출력 디렉토리: {OUTPUT_DIR}")
    print("-" * 50)

    # 모든 씬 처리
    tasks = []
    for scene_name, text in NARRATIONS.items():
        tasks.append(generate_audio(scene_name, text))

    await asyncio.gather(*tasks)

    print("-" * 50)
    print("모든 오디오 파일 생성 완료!")

if __name__ == "__main__":
    asyncio.run(main())
