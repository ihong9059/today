import edge_tts
import asyncio
import os

# Level 8-2: CUDA 프로그래밍 기초
SCENES = {
    "intro": """안녕하세요! 레벨 8 두 번째 레슨, CUDA 프로그래밍 기초입니다.
CUDA는 NVIDIA가 개발한 병렬 컴퓨팅 플랫폼입니다.
GPU의 강력한 성능을 직접 활용하는 방법을 알아보겠습니다.""",

    "cuda_basics": """CUDA의 기본 개념을 설명드릴게요.
CUDA는 Compute Unified Device Architecture의 약자입니다.
CPU를 호스트, GPU를 디바이스라고 부릅니다.
프로그램은 호스트에서 시작해서 필요할 때 디바이스로 작업을 보냅니다.
이때 GPU에서 실행되는 함수를 커널이라고 합니다.
커널은 수천 개의 스레드가 동시에 실행하는 병렬 코드입니다.""",

    "thread_hierarchy": """CUDA의 스레드 계층 구조를 알아볼까요?
가장 작은 단위는 스레드입니다. 하나의 연산을 수행하죠.
스레드들이 모여 블록을 형성합니다. 블록 안의 스레드들은 데이터를 공유할 수 있어요.
블록들이 모여 그리드를 이룹니다. 그리드가 전체 커널 실행 단위입니다.
예를 들어, 1000x1000 이미지를 처리한다면, 각 픽셀마다 하나의 스레드가 담당합니다.
이 스레드들을 16x16 크기의 블록으로 묶고, 필요한 만큼의 블록으로 그리드를 구성합니다.""",

    "memory_types": """CUDA에는 여러 종류의 메모리가 있습니다.
글로벌 메모리는 가장 크지만 가장 느립니다. 모든 스레드가 접근 가능해요.
공유 메모리는 같은 블록 내 스레드들이 공유합니다. 글로벌 메모리보다 훨씬 빠릅니다.
레지스터는 각 스레드 전용으로, 가장 빠른 메모리입니다.
효율적인 CUDA 프로그래밍은 이 메모리들을 적절히 활용하는 것입니다.
자주 사용하는 데이터는 공유 메모리에, 중간 결과는 레지스터에 저장합니다.""",

    "pytorch_cuda": """PyTorch에서 CUDA를 사용하는 방법을 알아볼게요.
torch.cuda.is_available()로 GPU 사용 가능 여부를 확인합니다.
텐서를 GPU로 옮기려면 tensor.to('cuda') 또는 tensor.cuda()를 사용합니다.
모델도 마찬가지로 model.to('cuda')로 GPU에 올립니다.
데이터와 모델이 같은 디바이스에 있어야 연산이 가능합니다.
연산 결과를 CPU로 가져오려면 tensor.cpu()를 사용합니다.""",

    "synchronization": """GPU 연산에서 동기화 개념을 설명드릴게요.
GPU 연산은 비동기적으로 실행됩니다.
CPU가 GPU에 작업을 요청하면, GPU가 처리하는 동안 CPU는 다른 일을 합니다.
torch.cuda.synchronize()를 호출하면 GPU 작업이 끝날 때까지 CPU가 기다립니다.
정확한 시간 측정이나 디버깅 시에 동기화가 필요합니다.
일반적인 학습에서는 자동으로 필요한 동기화가 이루어집니다.""",

    "error_handling": """CUDA 프로그래밍에서 자주 만나는 오류들을 알아볼게요.
CUDA out of memory는 GPU 메모리가 부족할 때 발생합니다.
배치 사이즈를 줄이거나 모델 크기를 줄여야 합니다.
device-side assert triggered는 GPU에서 연산 오류가 발생한 것입니다.
입력 데이터의 범위나 형태를 확인해보세요.
CUDA error: device-side assert는 CUDA_LAUNCH_BLOCKING=1 환경변수로 디버깅할 수 있습니다.""",

    "outro": """이번 레슨에서 CUDA 프로그래밍의 기초를 배웠습니다.
스레드 계층 구조, 메모리 종류, PyTorch에서의 활용법을 알아봤습니다.
다음 레슨에서는 PyTorch CUDA 최적화 기법을 살펴보겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-2"
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
