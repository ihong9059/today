"""
Lesson 3-2: 경사하강법 기본 - 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-3-2"

total_frames = 0
scene_data = []

for i in range(1, 8):
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)
        scene_data.append({"scene": i, "duration": duration, "frames": frames})
        print(f"Scene {i}: {duration:.2f}s = {frames} frames")
        total_frames += frames
    else:
        print(f"Scene {i}: File not found")

print(f"\nTotal: {total_frames} frames ({total_frames/FPS:.2f}s)")
print(f"\n// 타이밍 데이터:")
print("export const SCENE_TIMINGS = {")
start = 0
for data in scene_data:
    print(f"  scene{data['scene']}: {{ duration: {data['frames']}, start: {start} }},")
    start += data['frames']
print("};")
print(f"\nexport const LESSON_3_2_DURATION = {total_frames};")
