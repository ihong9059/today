import edge_tts
import asyncio
import os

# Level 8-6: 메모리 최적화
SCENES = {
    "intro": """안녕하세요! 레벨 8 여섯 번째 레슨, 메모리 최적화입니다.
GPU 메모리는 제한되어 있어서 효율적인 사용이 중요합니다.
메모리를 절약하는 다양한 기법들을 알아보겠습니다.""",

    "memory_analysis": """먼저 GPU 메모리 사용량을 분석하는 방법입니다.
torch.cuda.memory_allocated()로 현재 사용 중인 메모리를 확인합니다.
torch.cuda.max_memory_allocated()로 최대 사용량을 알 수 있어요.
torch.cuda.memory_reserved()는 캐시를 포함한 예약 메모리를 보여줍니다.
nvidia-smi 명령어로도 전체 GPU 메모리 상태를 확인할 수 있습니다.
메모리 누수를 찾으려면 각 단계마다 메모리 사용량을 로깅하세요.""",

    "batch_size": """배치 사이즈 최적화에 대해 알아볼게요.
배치 사이즈가 클수록 학습이 안정적이지만, 메모리 사용량도 증가합니다.
메모리 한계 내에서 가장 큰 배치 사이즈를 찾는 것이 좋습니다.
그래디언트 누적을 사용하면 작은 배치로도 큰 배치 효과를 얻을 수 있어요.
예를 들어, 배치 사이즈 8로 4번 누적하면 32와 비슷한 효과입니다.
optimizer.step()을 누적 횟수마다 한 번씩만 호출합니다.""",

    "no_grad": """불필요한 그래디언트를 피하는 방법입니다.
추론 시에는 torch.no_grad() 컨텍스트를 사용하세요.
그래디언트 계산이 비활성화되어 메모리를 절약합니다.
모델 평가나 검증 루프에서 반드시 사용해야 합니다.
torch.inference_mode()는 더 강력한 최적화를 제공합니다.
텐서의 requires_grad를 False로 설정하는 것도 도움이 됩니다.""",

    "memory_cleanup": """메모리 정리 방법들을 알아볼게요.
더 이상 필요 없는 텐서는 del로 명시적으로 삭제합니다.
torch.cuda.empty_cache()로 캐시된 메모리를 해제합니다.
단, empty_cache는 실제 사용 중인 메모리는 해제하지 않습니다.
Python의 gc.collect()와 함께 사용하면 더 효과적입니다.
큰 텐서를 작은 텐서로 분할해서 처리하는 것도 방법입니다.""",

    "offloading": """CPU 오프로딩 기법을 소개해드릴게요.
사용하지 않는 데이터를 일시적으로 CPU로 옮깁니다.
필요할 때 다시 GPU로 가져옵니다.
CPU-GPU 데이터 전송 오버헤드가 있지만, 메모리 부족을 해결할 수 있어요.
DeepSpeed의 ZeRO-Offload가 이 기법을 자동화합니다.
optimizer state를 CPU에 저장하는 것도 효과적입니다.""",

    "efficient_data": """데이터 타입 최적화에 대해 알아볼게요.
FP16이나 BF16을 사용하면 메모리 사용량이 절반으로 줄어듭니다.
INT8 양자화는 더 적은 메모리를 사용합니다.
torch.utils.checkpoint로 중간 활성화를 재계산할 수 있습니다.
메모리와 계산 시간 사이의 트레이드오프가 있습니다.
모델 구조 자체를 효율적으로 설계하는 것도 중요합니다.""",

    "outro": """이번 레슨에서 GPU 메모리 최적화 기법들을 배웠습니다.
메모리 분석, 배치 사이즈 조절, 오프로딩 등 다양한 방법을 알아봤습니다.
다음 레슨에서는 프로파일링과 디버깅을 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-6"
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
