from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-3-8"
FPS = 30

total_frames = 0
scenes = []

for i in range(1, 8):
    path = f"{AUDIO_DIR}/scene{i}.mp3"
    audio = MP3(path)
    duration = audio.info.length
    frames = int(duration * FPS) + 30  # +30 frames buffer

    scenes.append({
        "scene": i,
        "duration_sec": round(duration, 2),
        "frames": frames,
        "start_frame": total_frames
    })
    total_frames += frames

print("Scene Timings for Lesson 3-8:")
print("=" * 50)
for s in scenes:
    print(f"Scene {s['scene']}: {s['duration_sec']}s = {s['frames']} frames (start: {s['start_frame']})")
print("=" * 50)
print(f"Total frames: {total_frames}")
print(f"Total duration: {total_frames / FPS:.1f} seconds ({total_frames / FPS / 60:.1f} minutes)")
