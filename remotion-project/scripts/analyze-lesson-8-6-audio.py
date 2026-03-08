#!/usr/bin/env python3
"""Analyze audio files for Lesson 8-6 to get durations"""

import os
from mutagen.mp3 import MP3

AUDIO_DIR = "../public/audio/lesson-8-6"
FPS = 30

scenes = ["intro", "stream", "async", "overlap", "sync", "event", "outro"]

print("Lesson 8-6 Audio Analysis")
print("=" * 50)

total_duration = 0
scene_timings = {}
current_start = 0

for scene in scenes:
    filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
    audio = MP3(filepath)
    duration = audio.info.length
    frames = int(duration * FPS) + 30  # Add 30 frames buffer

    scene_timings[scene] = {
        "start": current_start,
        "duration": frames,
        "audio_sec": duration
    }

    print(f"{scene}: {duration:.2f}s -> {frames} frames (start: {current_start})")
    total_duration += frames
    current_start += frames

print("=" * 50)
print(f"Total: {total_duration} frames ({total_duration/FPS:.1f}s)")
print()
print("// TypeScript code:")
print(f"export const LESSON_8_6_DURATION = {total_duration};")
print()
print("const SCENE_TIMINGS = {")
for scene, timing in scene_timings.items():
    print(f"  {scene}: {{ start: {timing['start']}, duration: {timing['duration']} }},")
print("};")
