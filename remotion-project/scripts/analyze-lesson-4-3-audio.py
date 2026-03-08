#!/usr/bin/env python3
"""
Lesson 4-3: 텍스트 분류 - Audio Length Analysis
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-3"
FPS = 30

scenes = [
    "scene1_intro",
    "scene2_preprocessing",
    "scene3_embedding",
    "scene4_lstm",
    "scene5_model",
    "scene6_training",
    "scene7_outro",
]

print("Lesson 4-3: 텍스트 분류 - Audio Analysis")
print("=" * 60)

total_duration = 0
total_frames = 0
scene_data = []

for scene in scenes:
    filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
    if os.path.exists(filepath):
        audio = MP3(filepath)
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # +30 frames buffer
        total_duration += duration
        total_frames += frames
        scene_data.append((scene, duration, frames))
        print(f"{scene}: {duration:.2f}s = {frames} frames")
    else:
        print(f"{scene}: FILE NOT FOUND")

print("=" * 60)
print(f"Total Duration: {total_duration:.2f}s")
print(f"Total Frames: {total_frames}")
print()

print("Scene Timings for React:")
print("-" * 40)
print("const SCENE_TIMINGS = {")
current_frame = 0
for scene, duration, frames in scene_data:
    scene_name = scene.split("_", 1)[1] if "_" in scene else scene
    print(f"  {scene_name}: {{ start: {current_frame}, duration: {frames} }},")
    current_frame += frames
print("};")
print()
print(f"export const LESSON_4_3_DURATION = {total_frames};")
