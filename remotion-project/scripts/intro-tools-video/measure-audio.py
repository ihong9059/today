import os
import sys
from mutagen.mp3 import MP3

AUDIO_DIR = "public/audio/intro-tools"
SCENES = [
    "scene1_hook",
    "scene2_solution",
    "scene3_trackA",
    "scene4_trackB",
    "scene5_trackC",
    "scene6_trackD",
    "scene7_trackE",
    "scene8_case",
    "scene9_cta",
]
FPS = 30
PADDING_SEC = 0.6

total_frames = 0
print(f"{'Scene':25s}{'Sec':>10s}{'Frames':>10s}{'Padded(F)':>12s}")
print("-" * 60)
for scene in SCENES:
    p = f"{AUDIO_DIR}/{scene}.mp3"
    if not os.path.exists(p):
        print(f"{scene:25s} MISSING")
        continue
    audio = MP3(p)
    sec = audio.info.length
    frames = int(sec * FPS)
    padded = frames + int(PADDING_SEC * FPS)
    total_frames += padded
    print(f"{scene:25s}{sec:>10.2f}{frames:>10d}{padded:>12d}")

print("-" * 60)
print(f"{'TOTAL':25s}{total_frames/FPS:>10.2f}{total_frames:>10d}")
