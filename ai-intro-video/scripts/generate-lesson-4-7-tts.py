#!/usr/bin/env python3
"""Generate TTS audio for Lesson 4-7 using edge-tts"""

import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"
OUTPUT_DIR = "public/audio/lesson-4-7"
SCRIPTS_DIR = "scripts/lesson-4-7"

async def generate_audio(text: str, output_file: str):
    """Generate audio from text using edge-tts"""
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_file)
    print(f"Generated: {output_file}")

async def main():
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Read and generate audio for each scene
    for i in range(1, 8):
        script_file = f"{SCRIPTS_DIR}/scene{i}.txt"
        output_file = f"{OUTPUT_DIR}/scene{i}.mp3"

        with open(script_file, 'r', encoding='utf-8') as f:
            text = f.read().strip()

        await generate_audio(text, output_file)

    print("\nAll audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
