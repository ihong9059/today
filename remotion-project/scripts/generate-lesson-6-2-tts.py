import subprocess
import os

SCRIPTS_DIR = "scripts/lesson-6-2"
OUTPUT_DIR = "public/audio/lesson-6-2"
VOICE = "ko-KR-SunHiNeural"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    "scene01_intro",
    "scene02_analogy",
    "scene03_formula",
    "scene04_dimensions",
    "scene05_numpy_code",
    "scene06_parameter_sharing",
    "scene07_unfolding",
    "scene08_visualization",
    "scene09_architectures",
    "scene10_outro",
]

for script in scripts:
    input_file = f"{SCRIPTS_DIR}/{script}.txt"
    output_file = f"{OUTPUT_DIR}/{script}.mp3"

    cmd = f'edge-tts --voice {VOICE} --file "{input_file}" --write-media "{output_file}"'
    print(f"Generating {script}...")
    subprocess.run(cmd, shell=True, check=True)
    print(f"  -> {output_file}")

print("\nAll TTS files generated!")
