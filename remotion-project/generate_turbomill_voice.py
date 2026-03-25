"""
TURBO MILL 동영상용 TTS 음성 생성
Edge TTS 사용 - 한국어 남성 음성 (전문가용 톤)
"""
import edge_tts
import asyncio
from pathlib import Path

# 씬별 나레이션 스크립트
scripts = {
    "scene01_intro": """
안녕하십니까. 분체 공정 전문기업 한국기계의 TURBO MILL을 소개해 드리겠습니다.
본 장비는 수평형 고속 충격 분쇄 방식을 채택한 산업용 미분쇄기로서,
화학, 식품, 의약품, 광물 등 다양한 산업 분야의 분쇄 공정에 적용되고 있습니다.
""",
    "scene02_mechanism": """
TURBO MILL의 분쇄 메커니즘을 설명드리겠습니다.
원료는 정량 공급 장치를 통해 분쇄실로 투입되며,
고속 회전하는 터보형 블레이드에 의해 충격력, 전단력, 마찰력이 복합적으로 작용합니다.

분쇄 원리는 Impact force 기반으로, 블레이드 팁 속도는 최대 100m/s 이상에 달합니다.
수평 방향의 공기 흐름을 활용하여 분쇄와 분급이 동시에 이루어지며,
목표 입도에 도달하지 못한 입자는 분쇄실 내에서 재순환 분쇄됩니다.
이를 통해 D50 기준 10에서 500 마이크로미터 범위의 정밀한 입도 제어가 가능합니다.
""",
    "scene03_features": """
TURBO MILL의 기술적 특징을 말씀드리겠습니다.

첫째, 수평형 분쇄 구조로 설치 면적을 최소화하고 레이아웃 설계의 유연성을 확보했습니다.

둘째, 터보형 블레이드는 내마모성 특수강 또는 세라믹 코팅 처리가 가능하여
연마성 원료 분쇄 시에도 장기간 안정적인 운전이 가능합니다.

셋째, 스크린 메쉬 사이즈 교체를 통해 목표 입도를 유연하게 조절할 수 있으며,
0.5mm부터 6mm까지 다양한 스크린을 적용할 수 있습니다.

넷째, 분쇄실 냉각 시스템 적용이 가능하여 열에 민감한 원료의 품질 변성을 방지합니다.

다섯째, CIP 대응 설계로 식품, 의약품 GMP 환경에 적합합니다.
""",
    "scene04_specs": """
TURBO MILL은 생산 규모에 따라 5개 모델 라인업을 제공합니다.

TOP 250TM은 파일럿 및 소규모 생산용으로, 7.5에서 18킬로와트 전력으로
시간당 20에서 100킬로그램 처리가 가능합니다.

TOP 400TM은 중소규모 생산 라인에 적합하며, 15에서 30킬로와트로
시간당 100에서 300킬로그램을 처리합니다.

TOP 600TM은 30에서 55킬로와트로 시간당 200에서 650킬로그램,

TOP 800TM은 55에서 110킬로와트로 시간당 500에서 1,000킬로그램의
대용량 처리가 가능하여 대규모 양산 라인에 적합합니다.

원료의 경도, 수분 함량, 목표 입도에 따라 실제 처리량은 변동될 수 있으며,
사전 분쇄 테스트를 통해 최적 운전 조건을 도출해 드립니다.
""",
    "scene05_applications": """
TURBO MILL은 다양한 산업 분야에서 검증된 성능을 보여주고 있습니다.

화학 산업에서는 안료, 염료, 수지 분말, 농약 원제의 분쇄에 활용됩니다.
특히 유기 안료의 경우 D90 20 마이크로미터 이하의 정밀 분쇄가 가능합니다.

식품 산업에서는 향신료, 곡물, 설탕, 분유 등의 미분쇄에 적용되며,
식품위생법 기준에 적합한 스테인리스 스틸 재질로 제작됩니다.

의약품 산업에서는 원료 의약품의 균일한 입도 확보와 생체이용률 향상을 위해 사용됩니다.

광물 분야에서는 탄산칼슘, 탈크 등 비금속 광물의 미분쇄에 널리 활용됩니다.
""",
    "scene06_maintenance": """
TURBO MILL은 운전 편의성과 유지보수성을 고려하여 설계되었습니다.

PLC 기반 제어 시스템으로 운전 파라미터의 정밀 제어와 데이터 로깅이 가능합니다.
인버터 구동 방식으로 블레이드 회전 속도를 무단 조절할 수 있어
원료 특성에 따른 최적 분쇄 조건 설정이 용이합니다.

분쇄실 개방 구조로 내부 점검 및 청소가 간편하며,
블레이드, 스크린 등 소모품 교체 시간을 최소화하였습니다.
""",
    "scene07_closing": """
한국기계는 1985년 설립 이래 40년간 분체 기계 전문 기업으로서
분쇄, 분급, 혼합, 건조, 이송 등 분체 공정 전반에 걸친 기술력을 축적해 왔습니다.

국내외 500여 개 이상의 기업에 장비를 공급하였으며,
화학, 2차전지, 식품, 제약, 광물 산업 분야에서 신뢰받는 파트너로 인정받고 있습니다.

한국기계는 단순 장비 공급을 넘어, 고객의 공정 요구사항에 맞춘
토탈 솔루션을 제공합니다.
분쇄 테스트, 공정 설계, 설치, 시운전, 유지보수까지
원스톱 서비스를 지원합니다.

자세한 기술 상담 및 분쇄 테스트 의뢰는
전화 031-356-5550 또는 홈페이지 www.topcrusher.co.kr로 문의해 주십시오.

한국기계, 분체 기술의 믿음직한 파트너입니다.
시청해 주셔서 감사합니다.
"""
}

async def generate_scene_voice(scene_name: str, script: str, output_dir: Path):
    """개별 씬의 음성 생성"""
    # 한국어 남성 음성 (전문가 느낌)
    voice = "ko-KR-InJoonNeural"  # 남성 음성 (전문적인 톤)
    # 다른 옵션: ko-KR-HyunsuNeural (남성), ko-KR-SunHiNeural (여성)

    output_path = output_dir / f"{scene_name}.mp3"

    # TTS 생성 (속도 약간 느리게)
    communicate = edge_tts.Communicate(script.strip(), voice, rate="-5%")
    await communicate.save(str(output_path))

    print(f"✓ {scene_name}.mp3 생성 완료")
    return str(output_path)

async def generate_all_voices():
    """모든 씬의 음성 생성"""
    output_dir = Path(__file__).parent / "public" / "turbomill"
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 50)
    print("TURBO MILL TTS 음성 생성 시작")
    print("=" * 50)

    for scene_name, script in scripts.items():
        await generate_scene_voice(scene_name, script, output_dir)

    print("=" * 50)
    print(f"모든 음성 파일 생성 완료: {output_dir}")
    print("=" * 50)

if __name__ == "__main__":
    asyncio.run(generate_all_voices())
