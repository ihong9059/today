import edge_tts
import asyncio
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-8-2"
SCRIPT_DIR = "scripts/lesson-8-2"

scenes = [
    ("scene1_intro.txt", "intro.mp3"),
    ("scene2_host_device.txt", "host_device.mp3"),
    ("scene3_kernel.txt", "kernel.mp3"),
    ("scene4_thread_block.txt", "thread_block.mp3"),
    ("scene5_example.txt", "example.mp3"),
    ("scene6_pytorch.txt", "pytorch.mp3"),
    ("scene7_outro.txt", "outro.mp3"),
]

async def generate_tts():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for script_file, audio_file in scenes:
        script_path = os.path.join(SCRIPT_DIR, script_file)
        output_path = os.path.join(OUTPUT_DIR, audio_file)

        with open(script_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        print(f"Generating {audio_file}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    asyncio.run(generate_tts())
    print("Done!")
