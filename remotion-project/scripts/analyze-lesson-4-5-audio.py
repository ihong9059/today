#!/usr/bin/env python3
from mutagen.mp3 import MP3
import os

AUDIO_DIR = r"C:\todo\today\remotion-project\public\audio\lesson-4-5"
FPS = 30

scenes = [
    "scene1_intro",
    "scene2_dataset",
    "scene3_dataloader",
    "scene4_parameters",
    "scene5_transforms",
    "scene6_practical",
    "scene7_outro",
]

print("Lesson 4-5: 데이터 로딩 - Audio Analysis")
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
print(f"\nexport const LESSON_4_5_DURATION = {total_frames};")
