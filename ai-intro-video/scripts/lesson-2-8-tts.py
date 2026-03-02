"""
Lesson 2-8: 통계 기초 (Statistics Basics) TTS Script
- 평균, 중앙값, 최빈값
- 분산과 표준편차
- 상관계수
- 정규화와 표준화
- AI에서의 활용
"""

import edge_tts
import asyncio
import os

OUTPUT_DIR = "C:/todo/today/ai-intro-video/public/audio/lesson-2-8"

# Scene 1: 인트로 - 통계란 무엇인가?
scene1_intro = [
    ("intro_1", "안녕하세요! 레슨 2-8, 통계 기초입니다."),
    ("intro_2", "이번 시간에는 AI에서 필수적인 통계 개념을 배워보겠습니다."),
    ("intro_3", "통계란 무엇일까요?"),
    ("intro_4", "통계는 데이터를 수집하고, 정리하고, 분석하여 의미 있는 정보를 추출하는 학문입니다."),
    ("intro_5", "AI는 대량의 데이터를 다루기 때문에, 통계적 사고가 매우 중요합니다."),
    ("intro_6", "데이터의 특징을 파악하고, 패턴을 발견하고, 예측을 하는 모든 과정에 통계가 사용됩니다."),
]

# Scene 2: 중심 경향 측정 - 평균, 중앙값, 최빈값
scene2_central = [
    ("central_1", "먼저 데이터의 중심을 나타내는 값들을 알아봅시다."),
    ("central_2", "첫 번째는 평균입니다. 영어로 Mean이라고 합니다."),
    ("central_3", "평균은 모든 값을 더한 후 개수로 나눈 값입니다."),
    ("central_4", "예를 들어, 시험 점수가 70, 80, 90점이면, 평균은 80점입니다."),
    ("central_5", "파이썬에서는 np.mean 함수로 쉽게 계산할 수 있습니다."),
    ("central_6", "두 번째는 중앙값입니다. 영어로 Median이라고 합니다."),
    ("central_7", "중앙값은 데이터를 정렬했을 때 가운데 위치한 값입니다."),
    ("central_8", "중앙값의 장점은 극단적인 값, 즉 이상치에 영향을 받지 않는다는 것입니다."),
    ("central_9", "예를 들어, 연봉 데이터에서 억대 연봉자가 있으면 평균이 크게 올라가지만, 중앙값은 그대로입니다."),
    ("central_10", "세 번째는 최빈값입니다. 영어로 Mode라고 합니다."),
    ("central_11", "최빈값은 데이터에서 가장 자주 나타나는 값입니다."),
    ("central_12", "범주형 데이터에서 가장 흔한 카테고리를 찾을 때 유용합니다."),
]

# Scene 3: 산포 측정 - 분산과 표준편차
scene3_dispersion = [
    ("disp_1", "이제 데이터가 얼마나 퍼져 있는지를 나타내는 값들을 알아봅시다."),
    ("disp_2", "첫 번째는 분산입니다. 영어로 Variance라고 합니다."),
    ("disp_3", "분산은 각 데이터가 평균에서 얼마나 떨어져 있는지를 측정합니다."),
    ("disp_4", "계산 방법은 각 값에서 평균을 빼고, 그 차이를 제곱한 후, 평균을 구합니다."),
    ("disp_5", "차이를 제곱하는 이유는 음수와 양수가 서로 상쇄되는 것을 방지하기 위해서입니다."),
    ("disp_6", "분산이 크면 데이터가 평균에서 멀리 퍼져 있고, 작으면 평균 근처에 모여 있습니다."),
    ("disp_7", "두 번째는 표준편차입니다. 영어로 Standard Deviation이라고 합니다."),
    ("disp_8", "표준편차는 분산의 제곱근입니다."),
    ("disp_9", "왜 제곱근을 취할까요? 분산은 제곱 단위이기 때문에 원래 데이터와 단위가 맞지 않습니다."),
    ("disp_10", "표준편차는 원래 데이터와 같은 단위를 가져서 해석이 더 쉽습니다."),
    ("disp_11", "예를 들어, 키의 표준편차가 5라면, 대부분의 사람들이 평균에서 5cm 이내에 있다는 의미입니다."),
]

# Scene 4: 상관계수
scene4_correlation = [
    ("corr_1", "다음은 상관계수입니다."),
    ("corr_2", "상관계수는 두 변수 사이의 관계를 -1에서 1 사이의 값으로 나타냅니다."),
    ("corr_3", "상관계수가 1에 가까우면 양의 상관관계입니다."),
    ("corr_4", "즉, 한 변수가 증가하면 다른 변수도 함께 증가합니다."),
    ("corr_5", "예를 들어, 키와 몸무게는 양의 상관관계가 있습니다."),
    ("corr_6", "상관계수가 -1에 가까우면 음의 상관관계입니다."),
    ("corr_7", "한 변수가 증가하면 다른 변수는 감소합니다."),
    ("corr_8", "예를 들어, 운동 시간과 체지방률은 음의 상관관계가 있을 수 있습니다."),
    ("corr_9", "상관계수가 0에 가까우면 두 변수 사이에 선형 관계가 없습니다."),
    ("corr_10", "주의할 점은 상관관계가 인과관계를 의미하지는 않는다는 것입니다."),
    ("corr_11", "아이스크림 판매량과 익사 사고는 상관관계가 있지만, 아이스크림이 익사를 유발하지는 않습니다."),
    ("corr_12", "둘 다 여름이라는 공통 원인에 의해 영향을 받는 것입니다."),
]

# Scene 5: 정규화와 표준화
scene5_normalization = [
    ("norm_1", "마지막으로 정규화와 표준화를 알아봅시다."),
    ("norm_2", "이것은 AI에서 데이터 전처리의 필수 과정입니다."),
    ("norm_3", "먼저 정규화입니다. 영어로 Min-Max Normalization이라고 합니다."),
    ("norm_4", "정규화는 모든 데이터를 0에서 1 사이의 값으로 변환합니다."),
    ("norm_5", "공식은 현재값에서 최솟값을 빼고, 최댓값과 최솟값의 차이로 나눕니다."),
    ("norm_6", "예를 들어, 시험 점수 60점에서 100점을 0에서 1 사이로 변환할 수 있습니다."),
    ("norm_7", "다음은 표준화입니다. 영어로 Standardization 또는 Z-score Normalization이라고 합니다."),
    ("norm_8", "표준화는 데이터를 평균 0, 표준편차 1로 변환합니다."),
    ("norm_9", "공식은 현재값에서 평균을 빼고, 표준편차로 나눕니다."),
    ("norm_10", "표준화된 값을 Z 스코어라고 하며, 평균에서 몇 표준편차 떨어져 있는지를 나타냅니다."),
    ("norm_11", "왜 정규화와 표준화가 필요할까요?"),
    ("norm_12", "AI 모델에서 서로 다른 스케일의 데이터가 입력되면 학습이 불안정해질 수 있습니다."),
    ("norm_13", "예를 들어, 나이는 1에서 100 사이지만, 연봉은 천만 원에서 수억 원까지 다양합니다."),
    ("norm_14", "이런 차이를 없애기 위해 정규화나 표준화를 적용합니다."),
]

# Scene 6: AI에서의 통계 활용
scene6_ai_application = [
    ("ai_1", "통계는 AI의 모든 단계에서 활용됩니다."),
    ("ai_2", "첫째, 데이터 탐색 단계에서 평균, 분산, 상관계수로 데이터의 특성을 파악합니다."),
    ("ai_3", "둘째, 데이터 전처리 단계에서 정규화와 표준화로 데이터를 변환합니다."),
    ("ai_4", "셋째, 모델 평가 단계에서 정확도, 정밀도, 재현율 등의 통계적 지표를 사용합니다."),
    ("ai_5", "넷째, 배치 정규화에서 학습 중 각 레이어의 출력을 표준화합니다."),
    ("ai_6", "이렇게 통계는 AI의 성능 향상에 핵심적인 역할을 합니다."),
]

# Scene 7: 아웃트로
scene7_outro = [
    ("outro_1", "정리해 봅시다."),
    ("outro_2", "중심 경향 측정에는 평균, 중앙값, 최빈값이 있습니다."),
    ("outro_3", "산포 측정에는 분산과 표준편차가 있습니다."),
    ("outro_4", "상관계수는 두 변수 사이의 선형 관계를 나타냅니다."),
    ("outro_5", "정규화는 데이터를 0에서 1 사이로, 표준화는 평균 0 표준편차 1로 변환합니다."),
    ("outro_6", "축하합니다! Level 2 수학 기초를 모두 완료했습니다!"),
    ("outro_7", "함수, 미분, 편미분, 연쇄법칙, 벡터와 행렬, 확률, 확률분포, 그리고 통계까지!"),
    ("outro_8", "이제 딥러닝의 수학적 기초가 튼튼해졌습니다."),
    ("outro_9", "다음 Level 3에서는 이 지식을 바탕으로 경사하강법과 역전파를 배워보겠습니다."),
    ("outro_10", "수고하셨습니다!"),
]

ALL_SCENES = [
    ("scene1", scene1_intro),
    ("scene2", scene2_central),
    ("scene3", scene3_dispersion),
    ("scene4", scene4_correlation),
    ("scene5", scene5_normalization),
    ("scene6", scene6_ai_application),
    ("scene7", scene7_outro),
]

async def generate_audio(text: str, output_path: str, voice: str = "ko-KR-SunHiNeural"):
    """Generate TTS audio file"""
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    print(f"Generated: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for scene_name, lines in ALL_SCENES:
        scene_dir = os.path.join(OUTPUT_DIR, scene_name)
        os.makedirs(scene_dir, exist_ok=True)

        for filename, text in lines:
            output_path = os.path.join(scene_dir, f"{filename}.mp3")
            await generate_audio(text, output_path)

    print("\nAll audio files generated successfully!")
    print(f"Output directory: {OUTPUT_DIR}")

if __name__ == "__main__":
    asyncio.run(main())
