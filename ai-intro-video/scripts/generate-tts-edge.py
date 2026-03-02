import asyncio
import edge_tts
import json
import os

# 한국어 음성 목록 중 선택 (남성: ko-KR-InJoonNeural, 여성: ko-KR-SunHiNeural)
VOICE = "ko-KR-SunHiNeural"  # 자연스럽고 친근한 여성 목소리
RATE = "-3%"  # 자연스러운 속도
PITCH = "+5Hz"  # 약간 높은 톤 (더 밝고 친근하게)

# 경로 설정
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "..", "public", "audio")

# 출력 디렉토리 생성
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 나레이션 데이터 - JSON 파일에서 로드
NARRATIONS_FILE = os.path.join(SCRIPT_DIR, "narrations.json")
with open(NARRATIONS_FILE, 'r', encoding='utf-8') as f:
    narrations = json.load(f)

async def generate_tts(scene):
    """단일 씬의 TTS 생성"""
    print(f"Generating TTS for {scene['id']}: {scene['name']}...")

    output_path = os.path.join(OUTPUT_DIR, f"{scene['id']}.mp3")

    try:
        communicate = edge_tts.Communicate(
            text=scene['narration'],
            voice=VOICE,
            rate=RATE,
            pitch=PITCH
        )
        await communicate.save(output_path)
        print(f"  Saved: {output_path}")
        return {"id": scene['id'], "path": f"/audio/{scene['id']}.mp3", "success": True}
    except Exception as e:
        print(f"  Error: {e}")
        return {"id": scene['id'], "success": False, "error": str(e)}

async def main():
    print("=== Edge TTS Generation ===")
    print(f"Voice: {VOICE}")
    print(f"Rate: {RATE}")
    print(f"Pitch: {PITCH}")
    print(f"Output: {OUTPUT_DIR}\n")

    results = []
    for scene in narrations['scenes']:
        result = await generate_tts(scene)
        results.append(result)

    print(f"\n=== Generation Complete ===")
    success_count = sum(1 for r in results if r['success'])
    print(f"Success: {success_count}/{len(results)}")

    # 메타데이터 저장
    metadata = {
        "generatedAt": asyncio.get_event_loop().time(),
        "voice": VOICE,
        "rate": RATE,
        "pitch": PITCH,
        "scenes": results
    }

    metadata_path = os.path.join(OUTPUT_DIR, "metadata.json")
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    print(f"\nMetadata saved to {metadata_path}")

if __name__ == "__main__":
    asyncio.run(main())
