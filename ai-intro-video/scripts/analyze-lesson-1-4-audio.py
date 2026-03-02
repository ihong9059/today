"""
Lesson 1-4 오디오 파일 길이 분석
프레임 타이밍 계산 (30fps)
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-1-4"
FPS = 30

scenes = [
    "scene1_intro",
    "scene2_what_is_learning",
    "scene3_perceptron_learning",
    "scene4_error",
    "scene5_update_rule",
    "scene6_learning_rate",
    "scene7_example_setup",
    "scene8_example_training",
    "scene9_algorithm",
    "scene10_outro",
]

print("=" * 60)
print("Lesson 1-4 Audio Analysis")
print("=" * 60)

total_frames = 0
scene_timings = {}

for scene in scenes:
    filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
    audio = MP3(filepath)
    duration_sec = audio.info.length
    frames = int(duration_sec * FPS) + 30  # 0.5초 여유

    scene_timings[scene] = {
        "duration": frames,
        "start": total_frames,
        "seconds": duration_sec
    }

    print(f"{scene}:")
    print(f"  Duration: {duration_sec:.2f}s -> {frames} frames")
    print(f"  Start: {total_frames}")

    total_frames += frames

print("=" * 60)
print(f"Total Duration: {total_frames} frames ({total_frames/FPS:.2f}s)")
print("=" * 60)

# TypeScript 코드 생성
print("\n// TypeScript SCENE_TIMINGS")
print("export const SCENE_TIMINGS = {")
for scene, data in scene_timings.items():
    print(f"  {scene}: {{ duration: {data['duration']}, start: {data['start']} }},")
print("};")
print(f"export const LESSON_1_4_DURATION = {total_frames};")
