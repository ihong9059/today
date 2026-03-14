import subprocess
import os

SCRIPTS_DIR = "scripts/lesson-6-5"
OUTPUT_DIR = "public/audio/lesson-6-5"
VOICE = "ko-KR-SunHiNeural"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    "scene01_intro",
    "scene02_why",
    "scene03_unidirectional_limit",
    "scene04_solution",
    "scene05_structure",
    "scene06_hidden_states",
    "scene07_combine",
    "scene08_when_to_use",
    "scene09_when_not_to_use",
    "scene10_code",
    "scene11_bilstm",
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
