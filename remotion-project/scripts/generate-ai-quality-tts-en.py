"""
AI Quality Video - English TTS Generator using Google Cloud TTS
"""

import os
from google.cloud import texttospeech

# Configuration
SCRIPT_DIR = "scripts/ai-quality-en"
OUTPUT_DIR = "public/audio/ai-quality-en"

# Google Cloud TTS Voice Settings
# Using en-US-Studio-O (male) or en-US-Studio-Q (female) for natural sound
VOICE_NAME = "en-US-Studio-O"  # Professional male voice
LANGUAGE_CODE = "en-US"


def generate_tts():
    """Generate TTS audio files from script files."""

    # Initialize the client
    client = texttospeech.TextToSpeechClient()

    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Voice configuration
    voice = texttospeech.VoiceSelectionParams(
        language_code=LANGUAGE_CODE,
        name=VOICE_NAME,
    )

    # Audio configuration
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.95,  # Slightly slower for clarity
        pitch=0.0,
    )

    # Get all script files
    script_files = sorted([f for f in os.listdir(SCRIPT_DIR) if f.endswith('.txt')])

    print(f"Found {len(script_files)} script files")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Voice: {VOICE_NAME}")
    print("-" * 50)

    for script_file in script_files:
        name = script_file.replace('.txt', '')
        input_path = os.path.join(SCRIPT_DIR, script_file)
        output_path = os.path.join(OUTPUT_DIR, f"{name}.mp3")

        # Read script text
        with open(input_path, "r", encoding="utf-8") as f:
            text = f.read().strip()

        # Create synthesis input
        synthesis_input = texttospeech.SynthesisInput(text=text)

        # Generate speech
        print(f"Generating: {name}...")
        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        # Save audio file
        with open(output_path, "wb") as out:
            out.write(response.audio_content)

        print(f"  -> Saved: {output_path}")

    print("-" * 50)
    print("All audio files generated successfully!")


if __name__ == "__main__":
    generate_tts()
