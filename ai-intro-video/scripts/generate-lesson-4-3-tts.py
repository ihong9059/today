import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-4-3"
SCRIPTS_DIR = "scripts/lesson-4-3"

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = []
    for i in range(1, 8):
        script_path = f"{SCRIPTS_DIR}/scene{i}.txt"
        if os.path.exists(script_path):
            with open(script_path, 'r', encoding='utf-8') as f:
                text = f.read().strip()
                # Remove line numbers if present
                lines = []
                for line in text.split('\n'):
                    # Skip empty lines
                    if not line.strip():
                        continue
                    # Remove line number prefix (e.g., "     1→")
                    if '→' in line:
                        line = line.split('→', 1)[1]
                    lines.append(line.strip())
                scenes.append(' '.join(lines))

    for i, text in enumerate(scenes, 1):
        output_file = f"{OUTPUT_DIR}/scene{i}.mp3"
        print(f"Generating scene{i}.mp3...")
        print(f"  Text: {text[:50]}...")

        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_file)
        print(f"  Done: {output_file}")

    print(f"\nAll {len(scenes)} audio files generated in {OUTPUT_DIR}/")

if __name__ == "__main__":
    asyncio.run(generate_tts())
