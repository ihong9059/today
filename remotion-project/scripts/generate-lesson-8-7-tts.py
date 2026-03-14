import edge_tts
import asyncio
import os

# Level 8-7: 프로파일링과 디버깅
SCENES = {
    "intro": """안녕하세요! 레벨 8 마지막 레슨, 프로파일링과 디버깅입니다.
성능을 개선하려면 먼저 병목 구간을 찾아야 합니다.
PyTorch의 프로파일링 도구와 디버깅 기법들을 알아보겠습니다.""",

    "torch_profiler": """PyTorch 프로파일러를 소개해드릴게요.
torch.profiler는 상세한 성능 분석을 제공합니다.
CPU와 GPU 연산 시간을 모두 측정할 수 있습니다.
with torch.profiler.profile() 컨텍스트 안에서 코드를 실행합니다.
activities 파라미터로 CPU, CUDA 활동을 선택합니다.
record_shapes=True로 텐서 크기 정보도 기록할 수 있어요.""",

    "tensorboard": """텐서보드 연동 방법을 알아볼게요.
프로파일러 결과를 텐서보드에서 시각화할 수 있습니다.
torch.profiler.tensorboard_trace_handler를 사용합니다.
크롬 트레이스 형식으로 내보내기도 가능합니다.
타임라인 뷰에서 연산별 시간을 시각적으로 확인할 수 있어요.
어떤 연산이 가장 오래 걸리는지 한눈에 파악됩니다.""",

    "bottleneck": """병목 구간을 찾는 방법입니다.
프로파일러 결과에서 가장 시간이 많이 걸리는 연산을 확인합니다.
데이터 로딩이 병목인 경우가 많습니다.
GPU 사용률이 낮다면 CPU나 I/O가 병목일 수 있어요.
메모리 복사가 자주 발생하는지도 확인하세요.
CPU-GPU 동기화가 과도하면 성능이 저하됩니다.""",

    "debugging": """CUDA 디버깅 기법들을 알아볼게요.
CUDA_LAUNCH_BLOCKING=1 환경변수로 동기 실행을 강제합니다.
이렇게 하면 오류 발생 위치를 정확히 찾을 수 있어요.
torch.autograd.set_detect_anomaly(True)로 역전파 오류를 탐지합니다.
NaN이나 Inf가 발생한 연산을 찾을 수 있습니다.
단, 디버그 모드는 성능이 느려지므로 문제 해결 후에는 끄세요.""",

    "common_issues": """자주 발생하는 문제들과 해결 방법입니다.
메모리 누수는 텐서 참조가 유지되어 발생합니다. del과 gc.collect()로 해결하세요.
학습이 느리다면 데이터 로더의 num_workers를 늘려보세요.
GPU 사용률이 낮으면 배치 사이즈를 키우거나 pin_memory를 활성화합니다.
NaN 손실은 학습률이 너무 높거나 데이터에 이상값이 있을 때 발생합니다.
그래디언트 클리핑으로 불안정한 학습을 방지할 수 있습니다.""",

    "best_practices": """프로파일링 모범 사례를 정리해드릴게요.
워밍업 스텝을 건너뛰고 프로파일링하세요. 첫 실행은 컴파일 시간이 포함됩니다.
대표적인 배치 몇 개만 프로파일링해도 충분합니다.
프로덕션 환경과 유사한 조건에서 테스트하세요.
최적화 전후 성능을 비교해서 개선 효과를 측정합니다.
정기적으로 프로파일링해서 성능 퇴행을 방지하세요.""",

    "outro": """이번 레슨에서 프로파일링과 디버깅 기법들을 배웠습니다.
PyTorch 프로파일러, 텐서보드 연동, 디버깅 방법을 알아봤습니다.
레벨 8 GPU 프로그래밍 과정을 완료했습니다! 다음은 종합 프로젝트입니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-8-7"
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
