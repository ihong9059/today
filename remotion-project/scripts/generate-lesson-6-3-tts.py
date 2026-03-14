import subprocess
import os

SCRIPTS_DIR = "scripts/lesson-6-3"
OUTPUT_DIR = "public/audio/lesson-6-3"
VOICE = "ko-KR-SunHiNeural"

os.makedirs(OUTPUT_DIR, exist_ok=True)

scripts = [
    "scene01_intro",
    "scene02_rnn_problem",
    "scene03_lstm_analogy",
    "scene04_two_states",
    "scene05_forget_gate",
    "scene06_input_gate",
    "scene07_cell_update",
    "scene08_output_gate",
    "scene09_lstm_flow",
    "scene10_comparison",
    "scene11_outro",
]

for script in scripts:
    input_file = f"{SCRIPTS_DIR}/{script}.txt"
    output_file = f"{OUTPUT_DIR}/{script}.mp3"

    cmd = f'edge-tts --voice {VOICE} --file "{input_file}" --write-media "{output_file}"'
    print(f"Generating {script}...")
    subprocess.run(cmd, shell=True, check=True)
    print(f"  -> {output_file}")

print("\nAll TTS files generated!")
