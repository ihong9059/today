"""
Edge TTS를 사용하여 한국어 여성 음성 생성
Microsoft Edge TTS - 고품질 여성 음성 지원
"""
import edge_tts
import asyncio
from pathlib import Path

# 뉴스 스크립트 (30초 분량)
script = """
2026년 한국 경제 뉴스입니다.

KDI는 올해 경제 성장률을 1.8%로 전망했습니다.
1월 수출은 반도체 호조로 전년 대비 33.9% 증가하며 강한 회복세를 보이고 있습니다.

특히 삼성전자가 엔비디아 차세대 AI 칩에 탑재될 HBM4 양산에 세계 최초로 성공했습니다.
이로 인해 AI 반도체 시장이 한국 경제에 긍정적 영향을 줄 것으로 기대됩니다.

물가 상승률은 2.0% 수준을 유지할 전망이며,
한국은행은 기준금리를 동결하며 시장 안정을 도모하고 있습니다.

다만 미국 관세 인상과 글로벌 경기 둔화로 수출 증가율은 1.3%로 둔화될 것으로 예상됩니다.

이상 2026년 2월 경제 뉴스였습니다.
"""

async def generate_voice():
    # 한국어 여성 음성 (ko-KR-SunHiNeural - 자연스러운 여성 음성)
    voice = "ko-KR-SunHiNeural"  # 여성 음성
    # 다른 옵션: ko-KR-HyunsuNeural (남성), ko-KR-InJoonNeural (남성)

    # 출력 경로 설정
    output_dir = Path(__file__).parent / "public"
    output_dir.mkdir(exist_ok=True)
    output_path = output_dir / "narration.mp3"

    # TTS 생성
    communicate = edge_tts.Communicate(script, voice, rate="-5%")
    await communicate.save(str(output_path))

    print(f"여성 음성 파일 생성 완료: {output_path}")
    print(f"사용된 음성: {voice}")
    return str(output_path)

if __name__ == "__main__":
    asyncio.run(generate_voice())
