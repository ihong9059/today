import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-2-1"
OUTPUT_DIR = "public/audio/lesson-2-1"

# 스크립트 파일명 매핑
SCRIPT_FILES = [
    "scene1_intro.txt",
    "scene2_what_is_function.txt",
    "scene3_linear_function.txt",
    "scene4_quadratic_function.txt",
    "scene5_exponential_function.txt",
    "scene6_sigmoid_function.txt",
    "scene7_relu_function.txt",
    "scene8_summary.txt",
    "scene9_outro.txt",
]

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for i, script_filename in enumerate(SCRIPT_FILES, 1):
        script_file = f"{SCRIPT_DIR}/{script_filename}"
        output_file = f"{OUTPUT_DIR}/scene{i}.mp3"

        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()

            print(f"Generating scene{i}.mp3 from {script_filename}...")
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(output_file)
            print(f"  ✓ Generated {output_file}")
        else:
            print(f"  ✗ Script not found: {script_file}")

if __name__ == "__main__":
    print("=== Lesson 2-1 TTS Generation ===\n")
    asyncio.run(generate_audio())
    print("\n=== Complete! ===")
