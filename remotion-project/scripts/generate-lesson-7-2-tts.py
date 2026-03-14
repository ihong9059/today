import edge_tts
import asyncio
import os

# Lesson 7-2: 셀프 어텐션 (Self-Attention, QKV)
scripts = [
    "scene01_intro",
    "scene02_why",
    "scene03_qkv_concept",
    "scene04_qkv_create",
    "scene05_attention_score",
    "scene06_scaling",
    "scene07_softmax",
    "scene08_weighted_sum",
    "scene09_example",
    "scene10_matrix",
    "scene11_visualization",
    "scene12_outro",
]

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-7-2"
SCRIPT_DIR = "scripts/lesson-7-2"

async def generate_tts(script_name: str):
    script_path = os.path.join(SCRIPT_DIR, f"{script_name}.txt")
    output_path = os.path.join(OUTPUT_DIR, f"{script_name}.mp3")

    with open(script_path, "r", encoding="utf-8") as f:
        text = f.read().strip()

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
