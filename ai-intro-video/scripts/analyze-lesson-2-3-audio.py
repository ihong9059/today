"""
Lesson 2-3 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-2-3"
FPS = 30

scenes = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]

print("=== Lesson 2-3 오디오 분석 ===\n")

total_frames = 0
durations = {}

for scene in scenes:
    path = f"{AUDIO_DIR}/{scene}.mp3"
    audio = MP3(path)
    duration = audio.info.length
    frames = int(duration * FPS)
    durations[scene] = frames
    total_frames += frames
    print(f"{scene}: {duration:.2f}초 → {frames} frames")

print(f"\n총 duration: {total_frames} frames ({total_frames/FPS:.1f}초)")
print(f"\n// TypeScript용 SCENE_DURATIONS")
print("const SCENE_DURATIONS = {")
for scene, frames in durations.items():
    print(f"  {scene}: {frames},")
print("};")
