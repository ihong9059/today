import edge_tts
import asyncio
import os

# Lesson 7-1: 트랜스포머 개요 (Transformer Overview)
scripts = [
    "scene01_intro",
    "scene02_rnn_problem",
    "scene03_attention_idea",
    "scene04_parallel",
    "scene05_architecture",
    "scene06_encoder",
    "scene07_decoder",
    "scene08_positional",
    "scene09_comparison",
    "scene10_impact",
    "scene11_preview",
    "scene12_outro",
]

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-1"
SCRIPT_DIR = "scripts/lesson-7-1"

async def generate_tts(script_name: str):
    script_path = os.path.join(SCRIPT_DIR, f"{script_name}.txt")
    output_path = os.path.join(OUTPUT_DIR, f"{script_name}.mp3")

    with open(script_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

    # 빈 줄 제거하고 텍스트 정리
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    clean_text = ' '.join(lines)

    print(f"Generating: {script_name}")
    communicate = edge_tts.Communicate(clean_text, VOICE)
    await communicate.save(output_path)
    print(f"Saved: {output_path}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for script in scripts:
        await generate_tts(script)

    print("All TTS files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
