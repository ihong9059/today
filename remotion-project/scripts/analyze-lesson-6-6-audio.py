from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-6-6"

total_frames = 0
timings = {}

print("=" * 60)
print("Lesson 6-6 Audio Analysis")
print("=" * 60)

files = sorted([f for f in os.listdir(AUDIO_DIR) if f.endswith('.mp3')])

for f in files:
    audio = MP3(f"{AUDIO_DIR}/{f}")
    duration = audio.info.length
    frames = int(duration * FPS) + 30  # buffer frames
    name = f.replace('.mp3', '')
    timings[name] = frames
    total_frames += frames
    print(f"{name}: {duration:.2f}s = {frames} frames")

print("-" * 60)
print(f"Total: {total_frames} frames ({total_frames/30:.2f}s)")
print()
print("// SCENE_TIMINGS for TSX:")
print("export const SCENE_TIMINGS = {")
start = 0
for name, frames in timings.items():
    print(f'  {name}: {{ start: {start}, duration: {frames} }},')
    start += frames
print("};")
print(f"\nexport const LESSON_6_6_DURATION = {total_frames};")
