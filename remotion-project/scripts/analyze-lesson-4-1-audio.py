from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-4-1"

total_frames = 0
timings = {}

print("=== Lesson 4-1 Audio Analysis ===\n")

for f in sorted(os.listdir(AUDIO_DIR)):
    if f.endswith('.mp3'):
        audio = MP3(f"{AUDIO_DIR}/{f}")
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # Buffer frames
        name = f.replace('.mp3', '')
        timings[name] = frames
        total_frames += frames
        print(f"{name}: {duration:.2f}s = {frames} frames")

print(f"\n=== Total: {total_frames} frames ({total_frames/30:.2f}s) ===")
print(f"\nconst LESSON_4_1_DURATION = {total_frames};")

print("\n// Scene timings")
print("const SCENE_TIMINGS = {")
current = 0
for name, frames in timings.items():
    scene_name = name.replace('scene', '').split('_')[0]
    print(f"  {name.split('_')[1]}: {{ start: {current}, duration: {frames} }},")
    current += frames
print("};")
