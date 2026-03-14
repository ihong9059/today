import subprocess
import os

SCRIPTS_DIR = "scripts/lesson-6-7"
OUTPUT_DIR = "public/audio/lesson-6-7"
VOICE = "ko-KR-SunHiNeural"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    "scene01_intro",
    "scene02_what",
    "scene03_data",
    "scene04_preprocess",
    "scene05_embedding",
    "scene06_model",
    "scene07_code_class",
    "scene08_code_forward",
    "scene09_training",
    "scene10_eval",
    "scene11_tips",
    "scene12_outro",
]

for script in scripts:
    input_file = f"{SCRIPTS_DIR}/{script}.txt"
    output_file = f"{OUTPUT_DIR}/{script}.mp3"

    cmd = f'edge-tts --voice {VOICE} --file "{input_file}" --write-media "{output_file}"'
    print(f"Generating {script}...")
    subprocess.run(cmd, shell=True, check=True)
    print(f"  -> {output_file}")

print("\nAll TTS files generated!")
