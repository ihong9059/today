"""
Lesson 4-1: MNIST 손글씨 분류 - 오디오 분석 (프레임 계산)
"""
from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-4-1"

print("Lesson 4-1 Audio Analysis")
print("=" * 50)

total_frames = 0
timings = []

for i in range(1, 8):
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)

        timings.append({
            'scene': i,
            'start': total_frames,
            'duration': frames,
            'seconds': duration
        })

        total_frames += frames
        print(f"Scene {i}: {duration:.2f}s = {frames} frames (start: {timings[-1]['start']})")
    else:
        print(f"Audio not found: {audio_file}")

print("=" * 50)
print(f"Total: {total_frames} frames ({total_frames/FPS:.2f}s)")
print()

# TypeScript 출력
print("// TypeScript SCENE_TIMINGS:")
print("export const SCENE_TIMINGS = {")
for t in timings:
    print(f"  scene{t['scene']}: {{ duration: {t['duration']}, start: {t['start']} }},")
print("};")
print(f"\nexport const LESSON_4_1_DURATION = {total_frames};")
