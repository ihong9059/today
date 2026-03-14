import edge_tts
import asyncio
import os

# Level 9-6: 모델 배포
SCENES = {
    "intro": """안녕하세요! 레벨 9 여섯 번째 레슨, 모델 배포입니다.
학습된 모델을 실제 서비스로 만드는 과정을 알아보겠습니다.
FastAPI로 REST API를 만들고, Docker로 배포하는 방법을 배웁니다.""",

    "fastapi": """FastAPI로 API 서버를 만들어볼게요.
FastAPI는 Python의 현대적인 웹 프레임워크입니다.
비동기 처리를 지원하고, 타입 힌트를 활용합니다.
자동으로 API 문서를 생성해줍니다.
POST /predict 엔드포인트를 만들어서 이미지를 받습니다.
받은 이미지를 모델에 전달하고 결과를 JSON으로 반환합니다.""",

    "optimization": """서비스 최적화 방법을 알아볼게요.
모델을 TorchScript로 변환하면 추론 속도가 빨라집니다.
ONNX Runtime을 사용하면 더 효율적인 추론이 가능합니다.
양자화, Quantization으로 모델을 경량화할 수 있습니다.
INT8 양자화는 정확도 손실이 적으면서 속도를 높입니다.
배치 처리로 여러 이미지를 동시에 처리하면 처리량이 늘어납니다.""",

    "docker": """Docker로 컨테이너화하는 방법입니다.
Dockerfile을 작성해서 환경을 정의합니다.
Python 베이스 이미지를 사용합니다.
requirements.txt로 의존성을 설치합니다.
모델 파일과 소스 코드를 복사합니다.
docker build로 이미지를 만들고, docker run으로 실행합니다.""",

    "edge": """엣지 배포 방법을 알아볼게요.
라즈베리파이, Jetson 같은 엣지 디바이스에서 실행할 수 있습니다.
PyTorch Mobile이나 TensorFlow Lite를 사용합니다.
모바일 앱에서도 온디바이스 추론이 가능합니다.
엣지 배포는 네트워크 지연 없이 실시간 처리가 가능합니다.
하지만 디바이스 성능 제약으로 모델 최적화가 필수입니다.""",

    "scaling": """서비스 확장 방법을 알아볼게요.
Kubernetes로 컨테이너를 오케스트레이션합니다.
오토스케일링으로 트래픽에 따라 인스턴스 수를 조절합니다.
로드밸런서로 요청을 분산합니다.
Prometheus와 Grafana로 모니터링합니다.
알림 설정으로 문제를 빠르게 감지합니다.""",

    "outro": """이번 레슨에서 모델 배포를 배웠습니다.
FastAPI로 API를 만들고, Docker로 컨테이너화하는 방법을 알아봤습니다.
다음 레슨에서는 MLOps 파이프라인을 구축하겠습니다."""
}

async def generate_tts():
    output_dir = "public/audio/lesson-9-6"
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
