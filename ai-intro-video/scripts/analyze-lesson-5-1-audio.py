from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-5-1"

total_frames = 0
scene_data = []

for i in range(1, 8):
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)
        total_frames += frames
        scene_data.append((i, duration, frames))
        print(f"Scene {i}: {duration:.2f}s = {frames} frames")

print(f"\nTotal: {total_frames} frames ({total_frames/FPS:.2f}s)")
print(f"\n// Scene durations for TypeScript")
print("const SCENE_DURATIONS = {")
for i, duration, frames in scene_data:
    print(f"  scene{i}: {frames},")
print("};")
