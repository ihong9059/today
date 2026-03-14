import edge_tts
import asyncio
import os

# Level 8-3: PyTorch CUDA 최적화
SCENES = {
    "intro": """안녕하세요! 레벨 8 세 번째 레슨, PyTorch CUDA 최적화입니다.
GPU를 효율적으로 활용하면 학습 속도를 크게 향상시킬 수 있습니다.
실제 코드에서 적용할 수 있는 최적화 기법들을 알아보겠습니다.""",

    "data_loading": """데이터 로딩 최적화부터 시작해볼게요.
GPU는 매우 빠르지만, 데이터 로딩이 느리면 GPU가 놀게 됩니다.
DataLoader의 num_workers 파라미터를 설정하면 병렬로 데이터를 불러옵니다.
보통 CPU 코어 수의 절반에서 전체를 사용합니다.
pin_memory=True를 설정하면 CPU에서 GPU로의 데이터 전송이 빨라집니다.
prefetch_factor를 조절해서 미리 데이터를 준비할 수도 있습니다.""",

    "tensor_operations": """텐서 연산 최적화 기법들을 알아볼게요.
contiguous() 함수로 메모리를 연속적으로 배치하면 연산이 빨라집니다.
in-place 연산, 예를 들어 x.add_ 같은 함수를 사용하면 메모리를 절약합니다.
텐서 생성 시 device를 미리 지정하면 불필요한 복사를 피할 수 있어요.
torch.empty()로 메모리를 미리 할당하고 재사용하는 것도 좋은 방법입니다.
작은 텐서들을 하나로 합쳐서 큰 연산으로 만드는 것도 효율적입니다.""",

    "cudnn_optimization": """cuDNN 최적화 설정을 알아볼게요.
torch.backends.cudnn.benchmark를 True로 설정하면, 최적의 알고리즘을 자동 선택합니다.
입력 크기가 고정된 경우에 특히 효과적입니다.
처음에는 알고리즘 선택에 시간이 걸리지만, 이후에는 더 빠릅니다.
torch.backends.cudnn.deterministic을 True로 하면 재현성이 보장됩니다.
다만 재현성 설정은 성능을 약간 저하시킬 수 있습니다.""",

    "torch_compile": """PyTorch 2.0의 torch.compile을 소개해드릴게요.
torch.compile은 모델을 최적화된 코드로 컴파일합니다.
사용법은 간단합니다. model = torch.compile(model)로 래핑하면 됩니다.
첫 실행 시 컴파일 시간이 필요하지만, 이후에는 더 빠르게 실행됩니다.
mode 파라미터로 최적화 수준을 조절할 수 있어요.
'reduce-overhead', 'max-autotune' 등의 옵션이 있습니다.""",

    "gradient_checkpointing": """그래디언트 체크포인팅으로 메모리를 절약하는 방법입니다.
일반적으로 역전파 시 중간 결과를 모두 저장해둡니다.
체크포인팅은 일부만 저장하고, 필요할 때 다시 계산합니다.
torch.utils.checkpoint를 사용해서 구현합니다.
메모리 사용량이 줄어들지만, 계산 시간은 조금 늘어납니다.
큰 모델을 제한된 메모리에서 학습할 때 유용합니다.""",

    "profiling": """성능 측정 도구들을 알아볼게요.
torch.cuda.Event로 정확한 GPU 시간을 측정할 수 있습니다.
torch.profiler는 상세한 성능 분석을 제공합니다.
텐서보드와 연동해서 시각적으로 확인할 수도 있어요.
어떤 연산이 시간을 많이 사용하는지 파악할 수 있습니다.
병목 구간을 찾아서 집중적으로 최적화하면 효과적입니다.""",

    "outro": """이번 레슨에서 PyTorch CUDA 최적화 기법들을 배웠습니다.
데이터 로딩, 텐서 연산, cuDNN 설정, torch.compile까지 다양한 기법을 알아봤습니다.
다음 레슨에서는 Mixed Precision 학습을 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-3"
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
