from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-5-2"

total_frames = 0
for i in range(1, 8):
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)
        total_frames += frames
        print(f"Scene {i}: {duration:.2f}s = {frames} frames")

print(f"\nTotal: {total_frames} frames ({total_frames/FPS:.2f}s)")
