from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-5-3"
FPS = 30

print("=== Lesson 5-3 Audio Analysis ===\n")
total_frames = 0
for i in range(1, 8):
    path = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(path):
        audio = MP3(path)
        duration = audio.info.length
        frames = int(duration * FPS)
        total_frames += frames
        print(f"scene{i}: {duration:.2f}s ({frames} frames)")

print(f"\nTotal: {total_frames} frames ({total_frames/FPS:.2f}s)")
