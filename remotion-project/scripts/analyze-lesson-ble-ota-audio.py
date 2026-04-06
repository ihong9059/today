#!/usr/bin/env python3
"""Analyze audio files for BLE OTA pitch video"""

import os
from mutagen.mp3 import MP3

AUDIO_DIR = "../public/audio/lesson-ble-ota"
FPS = 30

scenes = [
    "scene1_hook",
    "scene2_problem",
    "scene3_solution",
    "scene4_demo",
    "scene5_architecture",
    "scene6_market",
    "scene7_business",
    "scene8_ask",
]

print("BLE OTA Pitch Video - Audio Analysis")
print("=" * 60)

total_duration = 0
scene_timings = {}
current_start = 0

for scene in scenes:
    filepath = os.path.join(os.path.dirname(__file__), AUDIO_DIR, f"{scene}.mp3")
    audio = MP3(filepath)
    duration = audio.info.length
    frames = int(duration * FPS) + 30  # 1 sec buffer

    scene_timings[scene] = {
        "start": current_start,
        "duration": frames,
        "audio_sec": duration,
    }

    print(f"{scene}: {duration:.2f}s -> {frames} frames (start: {current_start})")
    total_duration += frames
    current_start += frames

print("=" * 60)
print(f"Total: {total_duration} frames ({total_duration/FPS:.1f}s)")
print()
print("// TypeScript code:")
print(f"export const BLE_OTA_DURATION = {total_duration};")
print()
print("const SCENE_TIMINGS = {")
for scene, t in scene_timings.items():
    print(f'  {scene}: {{ start: {t["start"]}, duration: {t["duration"]} }},')
print("};")
