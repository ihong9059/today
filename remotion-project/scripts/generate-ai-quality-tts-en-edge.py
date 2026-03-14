"""
AI Quality Video - English TTS Generator using Edge TTS (Free alternative)
"""

import asyncio
import edge_tts
import os

# Configuration
SCRIPT_DIR = "scripts/ai-quality-en"
OUTPUT_DIR = "public/audio/ai-quality-en"

# Edge TTS Voice Settings
# Available English voices:
# - en-US-GuyNeural (male)
# - en-US-JennyNeural (female)
# - en-US-AriaNeural (female)
# - en-GB-RyanNeural (British male)
VOICE = "en-US-GuyNeural"


async def generate():
    """Generate TTS audio files from script files."""

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Get all script files
    script_files = sorted([f for f in os.listdir(SCRIPT_DIR) if f.endswith('.txt')])

    print(f"Found {len(script_files)} script files")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Voice: {VOICE}")
    print("-" * 50)

    for script_file in script_files:
        name = script_file.replace('.txt', '')
        input_path = os.path.join(SCRIPT_DIR, script_file)
        output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")

        # Read script text
        with open(input_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        # Generate speech
        print(f"Generating: {name}...")
        communicate = edge_tts.Communicate(text, VOICE)
        await communicate.save(output_path)
        print(f"  -> Saved: {output_path}")

    print("-" * 50)
    print("All audio files generated successfully!")


if __name__ == "__main__":
    asyncio.run(generate())
