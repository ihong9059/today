import asyncio
import edge_tts
import os

# Korean voice - professional female
VOICE_KO = "ko-KR-SunHiNeural"
# English voice - professional male
VOICE_EN = "en-US-GuyNeural"

OUTPUT_DIR = "public/uttec"

# Korean narration scripts
SCRIPTS_KO = {
    "scene01_opening_ko": """모든 것이 연결되는 시대,
무선 네트워크 기술이 산업의 미래를 바꾸고 있습니다.

한국의 IoT 솔루션 전문기업,
㈜유티텍을 소개합니다.""",

    "scene02_company_ko": """유티텍은 2016년 설립된 무선 네트워크 솔루션 전문기업입니다.

설립과 동시에 기업연구소를 설립하고,
복합센서를 활용한 디밍제어 시스템 특허를 등록했습니다.

한국 KC 인증은 물론,
일본 TELEC, 유럽 CE 인증을 획득하여
글로벌 시장 진출 역량을 갖추고 있습니다.

특히 일본에서도 LED 구동 제어 시스템 특허를 등록하여
기술력을 국제적으로 인정받았습니다.""",

    "scene03_ceo_ko": """유티텍의 핵심 경쟁력은 40년 이상의 개발 경험입니다.

1985년 삼성전기에서 시작하여
오디오 덱, 한국형 CATV 시스템,
이스라엘 MATAV 디지털 케이블 시스템,
캐나다 위성 수신기, 한국 스카이라이프 STB를 개발했습니다.

독일 프리미엄 TV 브랜드 뢰베의
디지털 TV 개발에도 참여한 경험이 있습니다.

1985년부터 현재까지 회로와 소프트웨어 개발을 지속하며,
현재 3명의 전문 개발 인력을 운영하고 있습니다.""",

    "scene04_blemesh_ko": """유티텍의 핵심 기술은 BLE Mesh 무선 네트워크입니다.

기존 RF 통신의 한계를 넘어
암호화 통신, 저전력, 200미터 이상의 통신 거리를 구현했습니다.

메시 네트워크 구조로
통신 사각지대를 없애고,
노드 간 자동 경로 설정으로 안정적인 연결을 보장합니다.

태양전지와 배터리를 활용한 독립형 노드로
유선 공사 없이 빠른 설치가 가능합니다.""",

    "scene05_products_ko": """유티텍의 솔루션은 다양한 분야에 적용됩니다.

조명 제어 분야에서는
지하주차장 무선 디밍 시스템,
골프장 스포츠 조명 시스템,
건물 보안등 제어 시스템을 공급하고 있습니다.

주차장 분야에서는
빈 주차공간 확인 시스템과
침수 감지 시스템을 제공합니다.

스마트 제어 분야에서는
온도, 습도, CO2, 조도 센서를 활용한
스마트팜 솔루션을 개발하고 있습니다.""",

    "scene06_japan_ko": """유티텍은 일본 시장에서 검증된 기술력을 보유하고 있습니다.

2022년 일본 하네다공항 아나모리나역에
무선 자전거 주차장 시스템 500대분을 초도 수출했고,

2023년에는 나고야 사카에역에
3,300대분을 수출하며 신뢰를 쌓았습니다.

일본 도카이기켄, 리스타와 협력하고 있으며,
국내에서는 현대힐스테이트, 롯데월드,
하나금융글로벌캠퍼스 등에 솔루션을 공급하고 있습니다.""",

    "scene07_smartfactory_ko": """유티텍은 AI 시대에 맞춰 사업 영역을 확장하고 있습니다.

스마트 팩토리 AI 모니터링 시스템과
AI 교육 시스템 개발에 역량을 집중하고 있습니다.

BLE Mesh 무선 센서 네트워크와
AI 기반 데이터 분석을 결합하여
제조 현장의 스마트화를 지원합니다.

크레토의 배터리 안전 기술과
유티텍의 무선 모니터링 기술이 만나면
새로운 가치를 창출할 수 있습니다.""",

    "scene08_closing_ko": """40년의 개발 경험,
글로벌 인증 획득,
일본 수출 실적,
그리고 스마트 팩토리로의 도전.

㈜유티텍은 신뢰할 수 있는 기술 파트너입니다.

함께 미래를 만들어 가겠습니다.

유티텍, 네트워크 솔루션.""",
}

# English narration scripts
SCRIPTS_EN = {
    "scene01_opening_en": """In an era where everything is connected,
wireless network technology is transforming the future of industry.

Introducing UTTEC,
Korea's IoT solutions specialist.""",

    "scene02_company_en": """UTTEC is a wireless network solutions company founded in 2016.

We established our R&D center from day one
and registered a patent for multi-sensor dimming control system.

We have obtained Korea KC certification,
Japan TELEC certification, and European CE certification,
demonstrating our global market capabilities.

We also registered an LED drive control system patent in Japan,
proving our technology is recognized internationally.""",

    "scene03_ceo_en": """UTTEC's core strength is over 40 years of development experience.

Starting at Samsung Electro-Mechanics in 1985,
we developed Audio Decks, Korean CATV systems,
Israel MATAV digital cable systems,
Canadian satellite receivers, and Korea Skylife set-top boxes.

We also participated in developing digital TVs
for the German premium brand Loewe.

From 1985 to present, we have continued
hardware and software development,
currently operating with 3 expert developers.""",

    "scene04_blemesh_en": """UTTEC's core technology is BLE Mesh wireless network.

Going beyond traditional RF communication limitations,
we achieved encrypted communication, low power consumption,
and over 200 meters of communication range.

With mesh network architecture,
we eliminate dead zones
and ensure reliable connections through automatic routing between nodes.

Using solar panels and batteries for standalone nodes,
installation is fast without any wiring work.""",

    "scene05_products_en": """UTTEC's solutions are applied across various fields.

In lighting control,
we supply underground parking lot wireless dimming systems,
golf course sports lighting systems,
and building security light control systems.

For parking facilities,
we provide empty space detection systems
and flood detection systems.

In smart control,
we are developing smart farm solutions
utilizing temperature, humidity, CO2, and light sensors.""",

    "scene06_japan_en": """UTTEC has proven technology capabilities in the Japanese market.

In 2022, we made our first export of 500 units
of wireless bicycle parking systems
to Anamori-inari Station near Haneda Airport.

In 2023, we exported 3,300 units
to Nagoya Sakae Station, building trust.

We partner with Japan's Tokai Giken and RESTAR,
and domestically supply solutions to Hyundai Hillstate, Lotte World,
and Hana Financial Global Campus.""",

    "scene07_smartfactory_en": """UTTEC is expanding our business for the AI era.

We are focusing on Smart Factory AI monitoring systems
and AI education system development.

By combining BLE Mesh wireless sensor networks
with AI-based data analysis,
we support manufacturing digitalization.

When KRETTO's battery safety technology
meets UTTEC's wireless monitoring technology,
new value can be created.""",

    "scene08_closing_en": """40 years of development experience,
global certifications achieved,
proven Japan export track record,
and the challenge toward Smart Factory.

UTTEC is your trusted technology partner.

Let's build the future together.

UTTEC, Network Solution.""",
}


async def generate_tts(name: str, text: str, voice: str):
    """Generate TTS for a single script"""
    output_file = f"{OUTPUT_DIR}/{name}.mp3"
    communicate = edge_tts.Communicate(text, voice)
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
