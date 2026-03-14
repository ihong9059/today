import edge_tts
import asyncio
import os

# Level 8-1: GPU와 병렬 컴퓨팅 - 상세 설명 버전
SCENES = {
    "intro": """안녕하세요! 레벨 8 첫 번째 레슨, GPU와 병렬 컴퓨팅입니다.
딥러닝이 빠르게 발전할 수 있었던 핵심에는 GPU가 있습니다.
왜 GPU가 AI 학습에 필수적인지, 그리고 병렬 컴퓨팅이 어떻게 작동하는지 알아보겠습니다.""",

    "cpu_vs_gpu": """CPU와 GPU는 근본적으로 다른 설계 철학을 가지고 있습니다.
CPU는 Central Processing Unit의 약자로, 복잡한 연산을 빠르게 처리합니다.
보통 4개에서 16개의 강력한 코어를 가지고 있어요.
반면 GPU는 Graphics Processing Unit으로, 원래 게임 그래픽 처리용이었습니다.
하지만 수천 개의 작은 코어를 가지고 있어 단순 연산을 동시에 처리할 수 있습니다.
예를 들어, 하나의 복잡한 계산은 CPU가 빠르지만, 만 개의 간단한 덧셈은 GPU가 훨씬 빠릅니다.""",

    "why_gpu": """딥러닝에 GPU가 필요한 이유를 알아볼까요?
신경망 학습의 핵심 연산은 행렬 곱셈입니다.
예를 들어, 1000x1000 크기의 행렬 두 개를 곱한다고 생각해보세요.
이건 10억 번의 곱셈과 덧셈이 필요합니다.
CPU로 이걸 순차적으로 처리하면 매우 오래 걸립니다.
하지만 GPU는 수천 개의 코어가 동시에 계산하므로, 이 작업을 극적으로 빠르게 처리합니다.
실제로 GPU를 사용하면 딥러닝 학습이 10배에서 100배까지 빨라집니다.""",

    "parallel_computing": """병렬 컴퓨팅의 핵심 개념을 설명드릴게요.
병렬 컴퓨팅은 큰 문제를 작은 조각으로 나누어 동시에 처리하는 방식입니다.
예를 들어, 이미지 처리를 생각해보세요.
1920x1080 해상도의 이미지는 약 200만 개의 픽셀로 이루어져 있습니다.
각 픽셀에 필터를 적용한다면, 200만 번의 연산이 필요하죠.
GPU는 이 200만 개의 연산을 수천 개의 코어에 나누어 동시에 처리합니다.
이것이 바로 SIMD, Single Instruction Multiple Data 방식입니다.""",

    "nvidia_ecosystem": """현재 딥러닝 분야에서는 NVIDIA GPU가 사실상 표준입니다.
NVIDIA는 CUDA라는 병렬 컴퓨팅 플랫폼을 제공합니다.
CUDA 덕분에 개발자들이 GPU의 성능을 쉽게 활용할 수 있게 되었어요.
또한 cuDNN이라는 딥러닝 전용 라이브러리도 있습니다.
PyTorch와 TensorFlow 모두 내부적으로 CUDA와 cuDNN을 사용합니다.
최근에는 RTX 3090, RTX 4090 같은 소비자용 GPU와 A100, H100 같은 데이터센터용 GPU가 있습니다.""",

    "memory_bandwidth": """GPU 성능에서 메모리 대역폭도 매우 중요합니다.
딥러닝은 대량의 데이터를 빠르게 읽고 써야 합니다.
GPU 메모리인 VRAM은 일반 RAM보다 훨씬 빠른 대역폭을 제공합니다.
예를 들어, RTX 4090의 메모리 대역폭은 초당 1테라바이트에 달합니다.
이렇게 빠른 메모리 덕분에 대용량 모델도 효율적으로 학습할 수 있습니다.
VRAM 용량도 중요한데, 큰 모델을 학습하려면 더 많은 VRAM이 필요합니다.""",

    "practical_tips": """실제로 GPU를 사용할 때 알아야 할 팁을 알려드릴게요.
첫째, torch.cuda.is_available로 GPU 사용 가능 여부를 확인하세요.
둘째, 텐서와 모델을 GPU로 옮길 때는 .to('cuda')를 사용합니다.
셋째, 배치 사이즈를 크게 하면 GPU 활용도가 높아집니다.
넷째, nvidia-smi 명령어로 GPU 사용량을 모니터링할 수 있습니다.
다섯째, 메모리 부족 오류가 발생하면 배치 사이즈를 줄이거나 그래디언트 체크포인팅을 사용하세요.""",

    "outro": """이번 레슨에서 GPU와 병렬 컴퓨팅의 기초를 배웠습니다.
CPU와 GPU의 차이, 병렬 처리의 원리, 그리고 실제 활용법을 알아봤습니다.
다음 레슨에서는 CUDA 프로그래밍의 기초를 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-1"
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
