"""
XERIX XPR 고도화 제안 동영상 - TTS 생성 스크립트
한국어: ko-KR-SunHiNeural (전문적이고 친근한 여성 음성)
영문: en-US-AriaNeural (전문적이고 신뢰감 있는 여성 음성)
"""
import asyncio
import edge_tts
import os

VOICE_KO = "ko-KR-SunHiNeural"
VOICE_EN = "en-US-AriaNeural"

OUTPUT_DIR = "public/xerix"

# ============================================================
# Korean Narration
# ============================================================
SCRIPTS_KO = {
    "scene01_opening_ko": """안녕하십니까.
주식회사 자릭스의 XPR 컨트롤러 고도화 프로젝트에,
저희 유티텍이 함께할 기회를 제안드립니다.

40년 RF 개발 노하우와 정밀 제어 기술로,
신뢰할 수 있는 결과물을 약속드립니다.""",

    "scene02_company_ko": """주식회사 유티텍은 2016년에 설립된,
무선 네트워크와 정밀 제어 솔루션 전문 기업입니다.

40년 이상의 RF 개발 노하우를 기반으로,
조명 제어, 스마트팜, 스마트팩토리 분야에서
혁신적인 솔루션을 공급해 왔습니다.

특히 일본 시장에 3천8백 대 이상의 제품을 수출하며,
KC, TELEC, CE 등 주요 국제 인증을 모두 보유하고 있습니다.

기술력과 품질, 두 가지를 모두 검증받은 파트너입니다.""",

    "scene03_qualification_ko": """자릭스에서 제시한 지원 자격을,
저희는 모두 충족합니다.

첫째, STM32 계열 임베디드 보드 설계와 펌웨어 개발 경험.
둘째, PID 제어 알고리즘과 모터, 밸브 제어 개발 경험.
셋째, 유사 정밀 계측 장비 개발 경험까지,

세 가지 핵심 요구 사항을 모두 갖추고 있습니다.

이제 그 근거가 되는 실제 개발 사례 세 가지를,
하나씩 보여드리겠습니다.""",

    "scene04_revita_ko": """첫 번째 사례는, 저희가 현재 양산 직전 단계인
스마트팜 단말기, 리비타 시리즈입니다.

리비타는 RS485 센서 통신, 3선식 모터 밸브 제어,
그리고 유량계 펄스 카운팅 기능을 모두 갖춘
정밀 제어 보드입니다.

XPR 컨트롤러가 요구하는 핵심 기능들과,
거의 동일한 구조로 이미 동작 중입니다.

저전력 설계, 듀얼뱅크 OTA, 원격 진단 기능까지 구현되어 있어,
XPR 고도화에 그대로 적용할 수 있습니다.""",

    "scene05_pid_ko": """두 번째 사례는, 스마트팩토리 PID 제어 시스템입니다.

저희는 산업용 파쇄기의 회전수 최적화를 위해,
룰 기반 룩업 테이블과 PID 피드백 제어를 결합한
이중 제어 구조를 직접 설계하고 검증했습니다.

비례, 적분, 미분 계수의 자동 튜닝,
적분 와인드업 방지, 안전 인터록까지 모두 구현했으며,
실제 현장 데이터로 안정성을 입증했습니다.

XPR이 요구하는 정밀 유량 제어에,
이 PID 노하우를 그대로 적용할 수 있습니다.""",

    "scene06_rftech_ko": """세 번째 사례는, 군용 등급 정밀 전원 시스템,
파워독 프로 프로젝트입니다.

복수의 전원 라인을 동시에 제어하면서도,
순간 피크 전류를 안정적으로 관리하는
고신뢰성 전원 설계 경험을 보유하고 있습니다.

DC 24볼트 입력에 다중 전압 레일을 안정적으로 공급해야 하는
XPR 컨트롤러의 전원부 설계에,
이 경험이 큰 강점이 될 것입니다.""",

    "scene07_deliverables_ko": """저희가 약속드리는 산출물은 명확합니다.

회로도와 PCB 아트워크 원본 파일,
거버 파일까지 모두 제공합니다.

부품 명세서인 BOM 리스트,
펌웨어 소스 코드 원본과 컴파일 환경 가이드,
그리고 협의된 수량의 시제품 보드까지,

요청하신 모든 산출물을 빠짐없이 납품드립니다.

소유권은 자릭스에 귀속되며, 추가 비용은 없습니다.""",

    "scene08_advantage_ko": """단순한 납품을 넘어, 저희는 세 가지 차별점을 제공합니다.

첫째, 듀얼뱅크 OTA 펌웨어 업데이트로,
출하 후에도 안전한 원격 업그레이드가 가능합니다.

둘째, 상세 로그 기반 원격 진단으로,
유지보수 비용을 획기적으로 줄일 수 있습니다.

셋째, 풍부한 저전력 설계 경험으로,
에너지 효율과 안정성을 동시에 확보합니다.

이 모든 것이, 저희가 가진 실전 검증된 자산입니다.""",

    "scene09_closing_ko": """40년의 RF 노하우.
검증된 PID 제어 기술.
양산 직전의 정밀 제어 보드 경험.

유티텍은, 자릭스 XPR 고도화의 가장 신뢰할 수 있는 파트너입니다.

진심으로 함께할 기회를 기다리겠습니다.

감사합니다.""",
}

# ============================================================
# English Narration
# ============================================================
SCRIPTS_EN = {
    "scene01_opening_en": """Hello.
We are pleased to propose our partnership
for the XERIX XPR controller enhancement project.

With over forty years of RF development expertise
and proven precision control technology,
UTTEC promises reliable results.""",

    "scene02_company_en": """UTTEC is a wireless network and precision control solutions company,
founded in 2016.

Based on more than forty years of RF development experience,
we have delivered innovative solutions
in lighting control, smart farming, and smart factory domains.

We have exported over three thousand eight hundred units to Japan,
and we hold all major international certifications
including KC, TELEC, and CE.

UTTEC is a partner verified in both technology and quality.""",

    "scene03_qualification_en": """We fully meet every qualification XERIX has requested.

First, STM32 based embedded board design and firmware development experience.
Second, PID control algorithm and motor and valve control experience.
Third, similar precision measurement equipment development experience.

We satisfy all three core requirements.

Now, let us walk you through three real development cases
that prove our capability.""",

    "scene04_revita_en": """Our first case is the REVITA smart farm terminal series,
currently in pre-production.

REVITA features RS485 sensor communication,
three-wire motor valve control,
and flow meter pulse counting,
all integrated into a single precision control board.

This architecture is nearly identical
to what the XPR controller requires.

Low power design, dual-bank OTA, and remote diagnostics
are already implemented and ready for direct application.""",

    "scene05_pid_en": """Our second case is the Smart Factory PID control system.

For optimizing the rotation speed of industrial shredders,
we designed and validated a dual control structure,
combining a rule-based lookup table with PID feedback.

We implemented automatic tuning of proportional, integral, and derivative gains,
integral windup prevention, and safety interlocks.
Stability was proven with real field data.

This PID expertise can be directly applied
to the precision flow control required by XPR.""",

    "scene06_rftech_en": """Our third case is the PowerDock Pro project,
a military-grade precision power system.

We have proven experience controlling multiple power rails simultaneously
while reliably managing instantaneous peak currents.

For the XPR controller, which requires stable supply
of multiple voltage rails from a 24 volt DC input,
this experience will be a significant advantage.""",

    "scene07_deliverables_en": """Our deliverables are clear and complete.

Schematic and PCB artwork source files,
including all Gerber files.

The full Bill of Materials.
Firmware source code with compile environment guide.
And the agreed quantity of prototype boards.

Every deliverable you requested will be provided in full.

All ownership belongs to XERIX, with no additional cost.""",

    "scene08_advantage_en": """Beyond simple delivery, we offer three key advantages.

First, dual-bank OTA firmware updates,
enabling safe remote upgrades even after shipment.

Second, detailed log-based remote diagnostics,
dramatically reducing maintenance costs.

Third, deep low-power design experience,
ensuring both energy efficiency and reliability.

These are real, field-proven assets we bring to your project.""",

    "scene09_closing_en": """Forty years of RF expertise.
Proven PID control technology.
A precision control board ready for production.

UTTEC is the most trusted partner
for the XERIX XPR enhancement project.

We sincerely look forward to working together.

Thank you.""",
}


async def generate_tts(name: str, text: str, voice: str):
    output_file = f"{OUTPUT_DIR}/{name}.mp3"
    communicate = edge_tts.Communicate(text, voice, rate="-5%")
    await communicate.save(output_file)
    print(f"Generated: {output_file}")


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=== Generating Korean TTS ===")
    for name, text in SCRIPTS_KO.items():
        await generate_tts(name, text, VOICE_KO)

    print("\n=== Generating English TTS ===")
    for name, text in SCRIPTS_EN.items():
        await generate_tts(name, text, VOICE_EN)

    print("\n=== All TTS files generated! ===")


if __name__ == "__main__":
    asyncio.run(main())
