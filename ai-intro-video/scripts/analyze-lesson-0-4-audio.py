from mutagen.mp3 import MP3
import os

AUDIO_DIR = "C:/todo/today/ai-intro-video/public/audio/lesson-0-4"
FPS = 30

total_duration = 0
total_frames = 0

print("Lesson 0-4 Audio Analysis")
print("=" * 50)

for i in range(1, 8):
    filepath = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(filepath):
        audio = MP3(filepath)
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # Add buffer
        total_duration += duration
        total_frames += frames
        print(f"Scene {i}: {duration:.2f}s ({frames} frames)")

print("=" * 50)
print(f"Total: {total_duration:.2f}s ({total_frames} frames)")
print(f"Video length: {total_duration/60:.1f} minutes")
