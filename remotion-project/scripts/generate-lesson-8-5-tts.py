import edge_tts
import asyncio
import os

# Level 8-5: 분산 학습 기초
SCENES = {
    "intro": """안녕하세요! 레벨 8 다섯 번째 레슨, 분산 학습 기초입니다.
대규모 모델을 학습하려면 여러 GPU를 함께 사용해야 합니다.
분산 학습의 기본 개념과 PyTorch에서의 구현 방법을 알아보겠습니다.""",

    "why_distributed": """왜 분산 학습이 필요할까요?
최신 대규모 모델은 단일 GPU 메모리에 들어가지 않습니다.
GPT-3는 1750억 개의 파라미터를 가지고 있어요.
이런 모델을 학습하려면 수백 개의 GPU가 필요합니다.
또한 학습 시간도 단축할 수 있습니다.
여러 GPU가 동시에 데이터를 처리하면 훨씬 빠르게 학습이 가능합니다.""",

    "data_parallel": """데이터 병렬 처리를 먼저 알아볼게요.
데이터 병렬은 가장 간단한 분산 학습 방식입니다.
같은 모델을 여러 GPU에 복제합니다.
데이터를 나누어 각 GPU가 다른 배치를 처리합니다.
각 GPU에서 계산한 그래디언트를 모아서 평균을 냅니다.
이 평균 그래디언트로 모든 GPU의 모델을 동시에 업데이트합니다.""",

    "ddp": """PyTorch의 DDP, Distributed Data Parallel을 소개합니다.
DDP는 데이터 병렬 학습을 위한 PyTorch의 공식 방법입니다.
각 GPU에서 별도의 프로세스가 실행됩니다.
NCCL 백엔드를 사용해서 GPU 간 통신을 효율적으로 처리합니다.
기존 코드에서 몇 줄만 추가하면 분산 학습이 가능합니다.
torch.distributed.init_process_group으로 초기화하고, DDP로 모델을 래핑합니다.""",

    "model_parallel": """모델 병렬 처리도 알아볼게요.
모델이 너무 커서 하나의 GPU에 들어가지 않을 때 사용합니다.
모델의 다른 레이어를 다른 GPU에 배치합니다.
예를 들어, 앞쪽 레이어는 GPU 0에, 뒤쪽 레이어는 GPU 1에 둡니다.
데이터가 순차적으로 GPU를 거쳐 처리됩니다.
파이프라인 병렬화로 효율을 높일 수 있습니다.""",

    "fsdp": """FSDP, Fully Sharded Data Parallel을 소개해드릴게요.
FSDP는 모델 파라미터를 GPU들 사이에 분할합니다.
각 GPU가 모델의 일부분만 저장해서 메모리를 절약합니다.
필요할 때 파라미터를 모아서 연산하고, 다시 분할합니다.
PyTorch에서 torch.distributed.fsdp로 사용할 수 있습니다.
대규모 모델 학습에 매우 효과적입니다.""",

    "practical_tips": """분산 학습 실전 팁들을 알려드릴게요.
배치 사이즈는 GPU 수에 비례해서 조정하세요.
학습률도 배치 사이즈에 맞게 스케일링이 필요합니다.
체크포인트 저장은 한 프로세스에서만 수행합니다.
로깅도 rank 0에서만 하면 중복을 피할 수 있어요.
통신 병목을 줄이기 위해 그래디언트 버킷팅을 활용하세요.""",

    "outro": """이번 레슨에서 분산 학습의 기초를 배웠습니다.
데이터 병렬, 모델 병렬, DDP, FSDP 등 다양한 기법을 알아봤습니다.
다음 레슨에서는 메모리 최적화 기법을 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-5"
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
