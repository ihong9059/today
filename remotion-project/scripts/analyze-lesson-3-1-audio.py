from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-3-1"

total_frames = 0
timings = {}

for f in sorted(os.listdir(AUDIO_DIR)):
    if f.endswith('.mp3'):
        audio = MP3(f"{AUDIO_DIR}/{f}")
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # 여유 프레임
        timings[f.replace('.mp3', '')] = frames
        total_frames += frames
        print(f"{f}: {duration:.2f}s = {frames} frames")

print(f"\nTotal: {total_frames} frames ({total_frames/30:.2f}s)")
print("\n// Scene timings for video component:")
for name, frames in timings.items():
    print(f"const {name.upper()}_FRAMES = {frames};")
