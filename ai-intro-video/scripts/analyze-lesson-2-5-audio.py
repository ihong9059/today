#!/usr/bin/env python3
"""
Lesson 2-5 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-2-5"
FPS = 30

print("=" * 60)
print("Lesson 2-5 오디오 분석 결과")
print("=" * 60)

total_frames = 0
scene_durations = {}

for i in range(1, 9):
    audio_path = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_path):
        audio = MP3(audio_path)
        duration_sec = audio.info.length
        frames = int(duration_sec * FPS) + 30  # 여유 프레임 추가
        scene_durations[f"scene{i}"] = frames
        total_frames += frames
        print(f"Scene {i}: {duration_sec:.2f}초 → {frames} 프레임")

print("=" * 60)
print(f"총 프레임: {total_frames} ({total_frames / FPS / 60:.1f}분)")
print("=" * 60)

print("\n// TypeScript용 코드:")
print("const SCENE_DURATIONS = {")
for key, value in scene_durations.items():
    print(f"  {key}: {value},")
print("};")
print(f"\n// 총 duration: {total_frames} 프레임 ({total_frames / FPS:.0f}초)")
