from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-7-1"
FPS = 30
BUFFER_FRAMES = 30

scripts = [
    "scene01_intro",
    "scene02_rnn_problem",
    "scene03_attention_idea",
    "scene04_parallel",
    "scene05_architecture",
    "scene06_encoder",
    "scene07_decoder",
    "scene08_positional",
    "scene09_comparison",
    "scene10_impact",
    "scene11_preview",
    "scene12_outro",
]

print("=== Lesson 7-1 Audio Analysis ===\n")

total_frames = 0
timings = {}

for script in scripts:
    audio_path = os.path.join(AUDIO_DIR, f"{script}.mp3")
    audio = MP3(audio_path)
    duration_sec = audio.info.length
    duration_frames = int(duration_sec * FPS) + BUFFER_FRAMES

    timings[script] = {
        "start": total_frames,
        "duration": duration_frames
    }

    print(f"{script}: {duration_sec:.2f}s -> {duration_frames} frames (start: {total_frames})")
    total_frames += duration_frames

print(f"\n=== Total Duration ===")
print(f"Total frames: {total_frames}")
print(f"Total seconds: {total_frames / FPS:.2f}s")
print(f"Total minutes: {total_frames / FPS / 60:.2f}m")

print(f"\n=== SCENE_TIMINGS Object ===")
print("const SCENE_TIMINGS = {")
for script, timing in timings.items():
    print(f'  {script}: {{ start: {timing["start"]}, duration: {timing["duration"]} }},')
print("};")

print(f"\n=== Duration Constant ===")
print(f"export const LESSON_7_1_DURATION = {total_frames};")
