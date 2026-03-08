from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-0-2"

total_frames = 0
timings = {}

for f in sorted(os.listdir(AUDIO_DIR)):
    if f.endswith('.mp3'):
        audio = MP3(f"{AUDIO_DIR}/{f}")
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # 여유 프레임
        name = f.replace('.mp3', '')
        timings[name] = frames
        total_frames += frames
        print(f"{f}: {duration:.2f}s = {frames} frames")

print(f"\nTotal: {total_frames} frames ({total_frames/30:.2f}s)")
print(f"\nTimings dict:")
for name, frames in timings.items():
    print(f'  "{name}": {frames},')
