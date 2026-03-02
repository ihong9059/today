"""
Lesson 2-2: 미분의 기초 - 오디오 분석 스크립트
"""
from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-2-2"

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

print(f"\n총합: {total_frames} frames ({total_frames/FPS:.2f}s)")
print(f"약 {total_frames/FPS/60:.0f}분 {(total_frames/FPS)%60:.0f}초")

# 씬별 시작 프레임 계산
print("\n씬별 시작 프레임:")
start_frame = 0
for i, duration, frames in scene_data:
    print(f"  Scene {i}: start={start_frame}, duration={frames}")
    start_frame += frames
