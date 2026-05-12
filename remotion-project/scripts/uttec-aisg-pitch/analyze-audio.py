"""오디오 길이 → 30fps 프레임 수 계산"""
from pathlib import Path

from mutagen.mp3 import MP3

FPS = 30
AUDIO_DIR = Path(__file__).resolve().parent.parent.parent / "public" / "audio" / "uttec-aisg-pitch"

scenes = [
    "scene1_intro",
    "scene2_understanding",
    "scene3_phy_zero",
    "scene4_strengths",
    "scene5_phy_depth",
    "scene6_timeline",
    "scene7_payment_honesty",
    "scene8_closing",
]

total_sec = 0.0
total_frames = 0
print(f"{'Scene':<28} {'Duration':>10} {'Frames':>8}")
print("-" * 50)
for s in scenes:
    p = AUDIO_DIR / f"{s}.mp3"
    audio = MP3(str(p))
    sec = audio.info.length
    frames = int(round(sec * FPS)) + 15  # 0.5s tail buffer
    total_sec += sec
    total_frames += frames
    print(f"{s:<28} {sec:>8.2f}s {frames:>8}")
print("-" * 50)
print(f"{'TOTAL':<28} {total_sec:>8.2f}s {total_frames:>8}")
print(f"\nDuration: {total_sec/60:.1f} min, {total_frames} frames @ {FPS}fps")
