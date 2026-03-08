#!/usr/bin/env python3
from mutagen.mp3 import MP3
import os

AUDIO_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-6"
FPS = 30

scenes = [
    "scene1_intro",
    "scene2_five_steps",
    "scene3_train_function",
    "scene4_validation",
    "scene5_early_stopping",
    "scene6_monitoring",
    "scene7_outro",
]

print("Lesson 4-6: 학습 루프 - Audio Analysis")
print("=" * 60)

total_frames = 0
scene_data = []

for scene in scenes:
    filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
    if os.path.exists(filepath):
        audio = MP3(filepath)
        duration = audio.info.length
        frames = int(duration * FPS) + 30
        total_frames += frames
        scene_data.append((scene, duration, frames))
        print(f"{scene}: {duration:.2f}s = {frames} frames")

print("=" * 60)
print(f"Total Frames: {total_frames}")
print()
print("const SCENE_TIMINGS = {")
current_frame = 0
for scene, duration, frames in scene_data:
    scene_name = scene.split("_", 1)[1] if "_" in scene else scene
    print(f"  {scene_name}: {{ start: {current_frame}, duration: {frames} }},")
    current_frame += frames
print("};")
print(f"\nexport const LESSON_4_6_DURATION = {total_frames};")
