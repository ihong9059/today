"""
Lesson 2-8 Audio Analysis Script
- Calculate frame durations from audio files
"""

import os
from mutagen.mp3 import MP3
import math

AUDIO_DIR = "C:/todo/today/ai-intro-video/public/audio/lesson-2-8"
FPS = 30
PADDING_FRAMES = 15  # 0.5초 여유

SCENES = [
    ("scene1", ["intro_1", "intro_2", "intro_3", "intro_4", "intro_5", "intro_6"]),
    ("scene2", ["central_1", "central_2", "central_3", "central_4", "central_5", "central_6", "central_7", "central_8", "central_9", "central_10", "central_11", "central_12"]),
    ("scene3", ["disp_1", "disp_2", "disp_3", "disp_4", "disp_5", "disp_6", "disp_7", "disp_8", "disp_9", "disp_10", "disp_11"]),
    ("scene4", ["corr_1", "corr_2", "corr_3", "corr_4", "corr_5", "corr_6", "corr_7", "corr_8", "corr_9", "corr_10", "corr_11", "corr_12"]),
    ("scene5", ["norm_1", "norm_2", "norm_3", "norm_4", "norm_5", "norm_6", "norm_7", "norm_8", "norm_9", "norm_10", "norm_11", "norm_12", "norm_13", "norm_14"]),
    ("scene6", ["ai_1", "ai_2", "ai_3", "ai_4", "ai_5", "ai_6"]),
    ("scene7", ["outro_1", "outro_2", "outro_3", "outro_4", "outro_5", "outro_6", "outro_7", "outro_8", "outro_9", "outro_10"]),
]

def get_audio_duration(filepath):
    """Get audio duration in seconds"""
    audio = MP3(filepath)
    return audio.info.length

def main():
    print("=" * 60)
    print("Lesson 2-8 Audio Analysis")
    print("=" * 60)

    total_frames = 0
    scene_durations = {}

    for scene_name, files in SCENES:
        scene_dir = os.path.join(AUDIO_DIR, scene_name)
        scene_duration = 0

        print(f"\n{scene_name.upper()}:")

        for filename in files:
            filepath = os.path.join(scene_dir, f"{filename}.mp3")
            if os.path.exists(filepath):
                duration = get_audio_duration(filepath)
                frames = math.ceil(duration * FPS) + PADDING_FRAMES
                scene_duration += duration
                print(f"  {filename}: {duration:.2f}s ({frames} frames)")
            else:
                print(f"  {filename}: NOT FOUND!")

        scene_frames = math.ceil(scene_duration * FPS) + (PADDING_FRAMES * len(files))
        scene_durations[scene_name] = scene_frames
        total_frames += scene_frames
        print(f"  → Scene total: {scene_duration:.2f}s ({scene_frames} frames)")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print("\nconst SCENE_DURATIONS = {")
    for scene_name, frames in scene_durations.items():
        print(f'  {scene_name}: {frames},')
    print("};")
    print(f"\nexport const LESSON_2_8_DURATION = {total_frames};")
    print(f"\n총 영상 길이: {total_frames / FPS:.1f}초 ({total_frames / FPS / 60:.1f}분)")

if __name__ == "__main__":
    main()
