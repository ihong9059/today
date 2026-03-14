import edge_tts
import asyncio
import os

# Level 8-4: Mixed Precision Training
SCENES = {
    "intro": """안녕하세요! 레벨 8 네 번째 레슨, Mixed Precision 학습입니다.
Mixed Precision은 학습 속도를 높이고 메모리 사용량을 줄이는 강력한 기법입니다.
어떻게 작동하는지, 그리고 어떻게 사용하는지 알아보겠습니다.""",

    "float_precision": """먼저 부동소수점 정밀도에 대해 알아볼게요.
FP32는 32비트를 사용하는 일반적인 부동소수점입니다.
FP16은 16비트를 사용해서 메모리를 절반만 차지합니다.
FP16은 더 적은 메모리로 더 빠른 연산이 가능합니다.
하지만 표현할 수 있는 수의 범위가 좁아져서 오버플로우 위험이 있어요.
Mixed Precision은 FP16과 FP32를 적절히 섞어서 장점만 취합니다.""",

    "why_mixed": """왜 Mixed Precision을 사용할까요?
최신 GPU는 FP16 연산에 최적화된 텐서 코어를 가지고 있습니다.
NVIDIA의 텐서 코어는 FP16 연산을 FP32보다 훨씬 빠르게 처리합니다.
메모리 사용량이 줄어들어 더 큰 배치 사이즈를 사용할 수 있습니다.
더 큰 배치는 더 안정적인 그래디언트와 빠른 수렴을 의미합니다.
실제로 2배에서 3배까지 학습 속도가 향상될 수 있습니다.""",

    "amp_scaler": """PyTorch의 AMP, 자동 혼합 정밀도를 소개해드릴게요.
AMP는 Automatic Mixed Precision의 약자입니다.
torch.cuda.amp.autocast 컨텍스트 매니저를 사용합니다.
이 안에서 연산들은 자동으로 FP16으로 수행됩니다.
GradScaler는 작은 그래디언트가 0이 되는 것을 방지합니다.
그래디언트를 스케일 업해서 계산하고, 나중에 다시 스케일 다운합니다.""",

    "implementation": """실제 구현 방법을 알아볼게요.
먼저 GradScaler를 생성합니다.
학습 루프에서 autocast 컨텍스트 안에서 forward pass를 수행합니다.
loss를 scaler로 스케일 업하고 backward를 호출합니다.
optimizer step 대신 scaler.step(optimizer)를 사용합니다.
마지막으로 scaler.update()를 호출해서 스케일을 조정합니다.""",

    "best_practices": """Mixed Precision 사용 시 주의사항들입니다.
모든 연산이 FP16에 적합한 것은 아닙니다.
손실 함수 계산이나 배치 정규화는 FP32로 유지됩니다.
autocast가 자동으로 적절한 정밀도를 선택해줍니다.
NaN이나 Inf가 발생하면 스케일러가 자동으로 조정합니다.
처음에는 기본 설정으로 시작하고, 문제가 있으면 조정하세요.""",

    "bf16": """BFloat16, BF16에 대해서도 알아볼게요.
BF16은 FP32와 동일한 지수 범위를 가집니다.
그래서 오버플로우 위험이 FP16보다 적습니다.
하지만 정밀도는 FP16보다 낮습니다.
최신 GPU인 A100, H100, RTX 40 시리즈에서 지원합니다.
torch.bfloat16 또는 autocast(dtype=torch.bfloat16)으로 사용합니다.""",

    "outro": """이번 레슨에서 Mixed Precision 학습을 배웠습니다.
FP16과 FP32의 장점을 결합해서 더 빠른 학습이 가능합니다.
다음 레슨에서는 분산 학습 기초를 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-4"
    os.makedirs(output_dir, exist_ok=True)

    for scene_name, text in SCENES.items():
        output_file = f"{output_dir}/{scene_name}.mp3"
        print(f"Generating {scene_name}...")

        communicate = edge_tts.Communicate(text, "ko-KR-SunHiNeural")
        await communicate.save(output_file)
        print(f"Saved: {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_tts())
    print("All audio files generated!")
