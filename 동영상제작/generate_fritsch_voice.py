"""
FRITSCH 전시회 동영상용 TTS 음성 생성
Edge TTS를 사용하여 한국어/영어 나레이션 생성
"""
import edge_tts
import asyncio
from pathlib import Path

# 한국어 나레이션 스크립트 (씬별 분리)
NARRATION_KO = {
    "scene01_opening": """
FRITSCH. 독일이 만든 나노 분쇄 기술의 최고봉.
60년 이상의 역사와 함께, 전 세계 연구소와 산업 현장에서
신뢰받는 분쇄 및 분석 장비를 선보입니다.
태명과학이 국내에 공급하는 FRITSCH의 혁신적인 솔루션을 만나보세요.
""",

    "scene02_principles": """
분쇄의 기본 원리를 이해하면 최적의 장비를 선택할 수 있습니다.

첫째, Pressure - 압력. 두 표면 사이에 강한 압력을 가해 분쇄합니다.
Jaw Crusher가 대표적입니다.

둘째, Impact - 충격. 고속으로 표면에 충돌시켜 분쇄하는 방식입니다.
Planetary Ball Mill, Cup Mill, Rotor Mill이 이 원리를 사용합니다.

셋째, Friction - 마찰. 두 표면의 상대적 이동으로 분쇄합니다.
Mortar Grinder, Disk Mill에 적용됩니다.

넷째, Shearing - 전단. 고정면과 이동면 사이의 전단력으로 분쇄합니다.

다섯째, Cutting - 절단. 회전 칼날로 샘플을 절단하는 방식입니다.
Cutting Mill과 Knife Mill이 해당됩니다.
""",

    "scene03_ball_mill": """
FRITSCH의 대표 제품, High-Energy Ball Mill입니다.
국내 국가기관연구소, 기업연구소, 학교실험실에
천 대 이상 납품된 검증된 장비입니다.

작동 원리를 살펴보겠습니다.
Main-disk가 공전할 때, Grinding Bowl이 반대 방향으로 자전합니다.
이때 발생하는 최대 95G의 강력한 중력가속도가
샘플을 나노 수준까지 분쇄할 수 있게 합니다.

건식으로는 5 마이크로미터 이내,
습식으로는 0.1 마이크로미터, 즉 나노 수준까지 분쇄가 가능합니다.

Premium 라인은 최대 1,100 RPM의 회전속도와 95G의 중력가속도를 제공하여
Classic 라인 대비 약 3배 강력한 분쇄 성능을 자랑합니다.

Agate, Zirconium Oxide, Tungsten Carbide 등
다양한 재질의 Grinding Bowl과 Ball을 선택할 수 있어
시료 오염을 최소화할 수 있습니다.
""",

    "scene04_vibratory": """
Vibratory Ball Mill은 상하 진동을 이용한 분쇄 장비입니다.

3ml 이하의 소량 샘플 분쇄에 최적화되어 있으며,
Liquid Nitrogen을 이용한 동결분쇄가 가능합니다.

PULVERISETTE 23은 5, 10, 15ml의 Grinding Bowl을 사용하며
Hair, Bone, Teeth 등 바이오 샘플은 물론
RoHS 분석을 위한 전자부품 분쇄에도 활용됩니다.

LCD Glass Panel, Camera, Keypad 등
전자폐기물 분석에 필수적인 장비입니다.
""",

    "scene05_rotor_cutting": """
Rotor Mill과 Cutting Mill은 고속 회전을 이용한 분쇄 장비입니다.

PULVERISETTE 14 Rotor Mill은
6,000에서 20,000 RPM의 가변 속도를 제공합니다.
열에 민감한 PVC, PP, PE 등 플라스틱 샘플이나
Rubber, Polymer 분쇄에 최적화되어 있습니다.

Liquid Nitrogen을 이용한 동결분쇄로
열에 의한 샘플 변형을 방지할 수 있습니다.

PULVERISETTE 19 Cutting Mill은
300에서 3,000 RPM 범위에서 작동하며
최대 70 x 80mm 크기의 샘플을 처리할 수 있습니다.

3가지 Rotor 타입을 제공합니다.
V-cutting Rotor는 Pellet, Granual 처리에,
Straight Cutting Edge는 목재, 식물 처리에,
Disk Milling Cutter는 Board, Chip 같은 강한 샘플 분쇄에 적합합니다.
""",

    "scene06_jaw_disk": """
Jaw Crusher와 Disk Mill은 조분쇄 및 중간분쇄 장비입니다.

PULVERISETTE 1 Jaw Crusher는
주먹 크기, 최대 95mm의 샘플을
콩알 크기인 1에서 15mm 수준으로 분쇄합니다.

시간당 최대 200kg을 처리할 수 있는 강력한 성능으로
Clinker, Quartz, Granite, Slag, Coal 등
암석 및 광물 분쇄에 최적화되어 있습니다.

PULVERISETTE 13 Disk Mill은
콩알 크기를 설탕 크기인 0.1에서 12mm 수준으로 분쇄합니다.

두 장비를 연결하면 대용량 샘플의 연속 처리가 가능합니다.
""",

    "scene07_cup_beater": """
Cup Mill PULVERISETTE 9은
링과 퍽의 원형 수평진동을 이용합니다.

12mm 크기의 샘플을 20 마이크로미터 이하로 분쇄하며
XRF 분석용 시료 전처리에 이상적입니다.

Mining 분야의 Coal, Ores, Minerals 분쇄와
Metallurgy 분야의 Slag, Cast Iron 샘플 처리에 활용됩니다.

Cross Beater Mill PULVERISETTE 16은
2,850 RPM의 고속 회전으로
시간당 최대 80L를 처리합니다.

농업 분야의 Grain, Seed와
지질학 분야의 Limestone, Potash 등
다양한 샘플을 효율적으로 분쇄합니다.
""",

    "scene08_analysis": """
분쇄 후에는 정확한 입도 분석이 필수입니다.

ANALYSETTE 3 PRO 체 진동기는
20 마이크로미터부터 63mm까지 건식 체질이 가능합니다.
최대 10개의 Sieve를 동시에 장착할 수 있으며
ISO 9001 품질 관리 기준을 충족합니다.

ANALYSETTE 22 NeXT 입도분석기는
레이저 회절법을 이용하여 입도를 측정합니다.

Micro 버전은 0.5에서 1,500 마이크로미터,
Nano 버전은 0.01에서 3,800 마이크로미터 범위를 측정합니다.

Green Laser를 사용하여 정밀한 입도 분석을 제공하며
자동 분산, 측정, 분석, 린싱, 리포팅 기능으로
분석 과정을 자동화합니다.
""",

    "scene09_image_divider": """
ANALYSETTE 28 Image Sizer는
고해상도 렌즈를 이용한 입자 모양 및 입도 분석기입니다.

5 Megapixel CMOS 카메라로
초당 최대 75장의 이미지를 촬영하여
Powder, Solid, Suspension, Emulsion 모두 측정할 수 있습니다.
측정 시간은 5분 이내입니다.

LABORETTE 27 Sample Divider는
99.9%의 정확도로 샘플을 분주합니다.
8, 10, 30 채널을 선택할 수 있으며
몇 ml부터 최대 4,000ml까지 처리 가능합니다.
""",

    "scene10_closing": """
태명과학은 고객의 샘플에 맞는
최적의 분쇄장비 선정을 위한 테스트 서비스를 운영합니다.

High-energy Ball Mill, Cutting Mill, Disk Mill 등
다양한 분쇄 장비를 보유하고 있으며
분쇄완료된 샘플에 대한 입도분석까지
One-Step 서비스로 제공합니다.

FRITSCH. The Expert of Milling to Nano-scale.
Made in Germany.

태명과학 031-458-0025
www.fritsch.co.kr

감사합니다.
"""
}

# 영어 나레이션 스크립트
NARRATION_EN = {
    "scene01_opening": """
FRITSCH. The pinnacle of nano-scale milling technology, made in Germany.
With over 60 years of history, we deliver trusted milling and analysis equipment
to research laboratories and industrial sites worldwide.
Experience the innovative solutions from FRITSCH, distributed in Korea by Taemyung Science.
""",

    "scene02_principles": """
Understanding the basic principles of milling helps you choose the optimal equipment.

First, Pressure. Material is crushed by applying strong pressure between two surfaces.
The Jaw Crusher is a typical example.

Second, Impact. The sample is accelerated against a surface at extremely high speed.
Planetary Ball Mill, Cup Mill, and Rotor Mill use this principle.

Third, Friction. The sample is ground between two surfaces
due to vertical pressure and relative movement.
Mortar Grinder and Disk Mill apply this method.

Fourth, Shearing. Comminution occurs due to shearing effect
between fixed and moving surfaces.

Fifth, Cutting. Rotating knives cut the sample between blades.
Cutting Mill and Knife Mill fall into this category.
""",

    "scene03_ball_mill": """
Introducing FRITSCH's flagship product, the High-Energy Ball Mill.
With over one thousand units installed in national research institutes,
corporate laboratories, and university labs in Korea,
this is a proven and trusted equipment.

Let's examine the operating principle.
When the Main-disk revolves, the Grinding Bowl rotates in the opposite direction.
The powerful gravitational acceleration of up to 95G generated during this process
enables grinding samples down to the nano scale.

Dry grinding achieves particles within 5 micrometers,
while wet grinding reaches 0.1 micrometers - true nano-scale fineness.

The Premium line offers rotation speeds up to 1,100 RPM
and 95G gravitational acceleration,
delivering approximately three times the grinding power of the Classic line.

With various Grinding Bowl and Ball materials available -
including Agate, Zirconium Oxide, and Tungsten Carbide -
sample contamination can be minimized.
""",

    "scene04_vibratory": """
The Vibratory Ball Mill uses vertical vibration for milling.

It is optimized for small sample quantities of 3 milliliters or less,
and enables cryogenic grinding using Liquid Nitrogen.

PULVERISETTE 23 uses Grinding Bowls of 5, 10, and 15 milliliters
and is suitable for bio samples such as Hair, Bone, and Teeth,
as well as electronic component grinding for RoHS analysis.

It is an essential tool for analyzing electronic waste
including LCD Glass Panels, Cameras, and Keypads.
""",

    "scene05_rotor_cutting": """
Rotor Mill and Cutting Mill use high-speed rotation for milling.

PULVERISETTE 14 Rotor Mill
offers variable speeds from 6,000 to 20,000 RPM.
It is optimized for heat-sensitive plastic samples
such as PVC, PP, PE, Rubber, and Polymer.

Cryogenic grinding with Liquid Nitrogen
prevents sample deformation caused by heat.

PULVERISETTE 19 Cutting Mill operates
in the range of 300 to 3,000 RPM
and can process samples up to 70 by 80 millimeters.

Three Rotor types are available:
V-cutting Rotor for Pellets and Granules,
Straight Cutting Edge for Wood and Plant materials,
and Disk Milling Cutter for hard samples like Boards and Chips.
""",

    "scene06_jaw_disk": """
Jaw Crusher and Disk Mill are pre-crushing and intermediate milling equipment.

PULVERISETTE 1 Jaw Crusher
reduces fist-sized samples up to 95 millimeters
to pea-sized particles of 1 to 15 millimeters.

With powerful performance processing up to 200 kilograms per hour,
it is optimized for crushing rocks and minerals
such as Clinker, Quartz, Granite, Slag, and Coal.

PULVERISETTE 13 Disk Mill
grinds pea-sized samples to sugar-sized particles
of 0.1 to 12 millimeters.

Connecting both units enables continuous processing of large-volume samples.
""",

    "scene07_cup_beater": """
Cup Mill PULVERISETTE 9
utilizes circular horizontal vibration of ring and puck elements.

It grinds 12-millimeter samples down to 20 micrometers or less,
making it ideal for XRF analysis sample preparation.

It is used for grinding Coal, Ores, and Minerals in the mining sector,
and Slag and Cast Iron samples in metallurgy.

Cross Beater Mill PULVERISETTE 16
operates at high-speed rotation of 2,850 RPM,
processing up to 80 liters per hour.

It efficiently grinds various samples including
Grain and Seeds for agriculture,
and Limestone and Potash for geology.
""",

    "scene08_analysis": """
Accurate particle size analysis is essential after milling.

ANALYSETTE 3 PRO Sieve Shaker
enables dry sieving from 20 micrometers to 63 millimeters.
Up to 10 sieves can be mounted simultaneously,
meeting ISO 9001 quality management standards.

ANALYSETTE 22 NeXT Particle Size Analyzer
measures particle size using laser diffraction method.

The Micro version measures from 0.5 to 1,500 micrometers,
while the Nano version covers 0.01 to 3,800 micrometers.

Using a Green Laser for precise particle size analysis,
it automates the analysis process with automatic
dispersion, measurement, analysis, rinsing, and reporting functions.
""",

    "scene09_image_divider": """
ANALYSETTE 28 Image Sizer
is a particle shape and size analyzer using high-resolution lenses.

With a 5 Megapixel CMOS camera,
it captures up to 75 images per second,
measuring Powder, Solid, Suspension, and Emulsion samples.
Measurement time is within 5 minutes.

LABORETTE 27 Sample Divider
divides samples with 99.9 percent accuracy.
Choose from 8, 10, or 30 channels,
processing from a few milliliters up to 4,000 milliliters.
""",

    "scene10_closing": """
Taemyung Science operates a test service
for selecting the optimal milling equipment for your samples.

We have various milling equipment including
High-energy Ball Mill, Cutting Mill, and Disk Mill,
providing One-Step service
from grinding to particle size analysis of processed samples.

FRITSCH. The Expert of Milling to Nano-scale.
Made in Germany.

Taemyung Science: 031-458-0025
www.fritsch.co.kr

Thank you.
"""
}


async def generate_scene_voice(scene_id: str, text: str, voice: str, output_dir: Path, lang: str):
    """개별 씬의 음성 생성"""
    output_path = output_dir / f"fritsch_{lang}_{scene_id}.mp3"

    # TTS 생성 (속도를 약간 느리게 - 명확한 전달을 위해)
    rate = "-5%" if lang == "ko" else "-3%"
    communicate = edge_tts.Communicate(text.strip(), voice, rate=rate)
    await communicate.save(str(output_path))

    print(f"  [{lang.upper()}] {scene_id}: {output_path.name}")
    return output_path


async def generate_full_voice(narration: dict, voice: str, output_dir: Path, lang: str):
    """전체 나레이션 음성 생성 (하나의 파일)"""
    full_text = "\n\n".join(narration.values())
    output_path = output_dir / f"fritsch_{lang}_full.mp3"

    rate = "-5%" if lang == "ko" else "-3%"
    communicate = edge_tts.Communicate(full_text.strip(), voice, rate=rate)
    await communicate.save(str(output_path))

    print(f"  [{lang.upper()}] 전체 파일: {output_path.name}")
    return output_path


async def main():
    # 출력 디렉토리 설정
    output_dir = Path(__file__).parent / "audio"
    output_dir.mkdir(exist_ok=True)

    print("=" * 60)
    print("FRITSCH 전시회 동영상 TTS 음성 생성")
    print("=" * 60)

    # 한국어 음성 생성
    print("\n[한국어 음성 생성 중...]")
    ko_voice = "ko-KR-SunHiNeural"  # 여성 음성
    # 대안: ko-KR-HyunsuNeural (남성)

    for scene_id, text in NARRATION_KO.items():
        await generate_scene_voice(scene_id, text, ko_voice, output_dir, "ko")

    await generate_full_voice(NARRATION_KO, ko_voice, output_dir, "ko")

    # 영어 음성 생성
    print("\n[영어 음성 생성 중...]")
    en_voice = "en-US-AriaNeural"  # 여성 음성
    # 대안: en-US-GuyNeural (남성), en-US-JennyNeural (여성)

    for scene_id, text in NARRATION_EN.items():
        await generate_scene_voice(scene_id, text, en_voice, output_dir, "en")

    await generate_full_voice(NARRATION_EN, en_voice, output_dir, "en")

    print("\n" + "=" * 60)
    print(f"음성 파일 생성 완료!")
    print(f"저장 위치: {output_dir}")
    print("=" * 60)

    # 생성된 파일 목록 출력
    print("\n[생성된 파일 목록]")
    for f in sorted(output_dir.glob("*.mp3")):
        size_kb = f.stat().st_size / 1024
        print(f"  - {f.name} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    asyncio.run(main())
