"""
Lesson 1-1 오디오 파일 길이 분석
"""

from mutagen.mp3 import MP3
import os

audio_dir = "C:/todo/today/ai-intro-video/public/audio/lesson-1-1"

files = [
    "scene1_intro.mp3",
    "scene2_daily_ai.mp3",
    "scene3_definition.mp3",
    "scene4_vs_program.mp3",
    "scene5_history.mp3",
    "scene6_why_now.mp3",
    "scene7_approaches.mp3",
    "scene8_current_level.mp3",
    "scene9_summary.mp3",
    "scene10_outro.mp3",
]

FPS = 30
total_frames = 0
timings = {}

print("Lesson 1-1 Audio Analysis")
print("=" * 60)

for filename in files:
    filepath = os.path.join(audio_dir, filename)
    if os.path.exists(filepath):
        audio = MP3(filepath)
        duration_sec = audio.info.length
        frames = int(duration_sec * FPS) + 30  # 0.5초 여유
        scene_name = filename.replace(".mp3", "")
        timings[scene_name] = {"duration": frames, "start": total_frames}
        total_frames += frames
        print(f"{filename}: {duration_sec:.2f}s -> {frames} frames (start: {timings[scene_name]['start']})")

print("=" * 60)
print(f"Total Duration: {total_frames / FPS:.2f}s ({total_frames} frames)")
print()
print("// TypeScript SCENE_TIMINGS:")
print("export const SCENE_TIMINGS = {")
for name, info in timings.items():
    print(f'  {name}: {{ duration: {info["duration"]}, start: {info["start"]} }},')
print("};")
print()
print(f"export const LESSON_1_1_DURATION = {total_frames};")
