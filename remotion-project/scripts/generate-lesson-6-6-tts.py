import subprocess
import os

SCRIPTS_DIR = "scripts/lesson-6-6"
OUTPUT_DIR = "public/audio/lesson-6-6"
VOICE = "ko-KR-SunHiNeural"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    "scene01_intro",
    "scene02_analogy",
    "scene03_structure",
    "scene04_encoder",
    "scene05_decoder",
    "scene06_teacher_forcing",
    "scene07_example",
    "scene08_problem",
    "scene09_attention",
    "scene10_applications",
    "scene11_code",
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
