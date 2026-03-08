from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-3-7"
total_frames = 0
for f in sorted(os.listdir(AUDIO_DIR)):
    if f.endswith('.mp3'):
        audio = MP3(f"{AUDIO_DIR}/{f}")
        duration = audio.info.length
        frames = int(duration * FPS) + 30
        total_frames += frames
        print(f"{f}: {duration:.2f}s = {frames} frames")
print(f"\nTotal: {total_frames} frames ({total_frames/30:.2f}s)")
