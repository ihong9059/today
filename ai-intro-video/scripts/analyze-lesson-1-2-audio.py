"""
Lesson 1-2 오디오 파일 분석 스크립트
각 씬의 오디오 길이를 측정하여 프레임 타이밍 계산
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "C:/todo/today/ai-intro-video/public/audio/lesson-1-2"
FPS = 30

# 씬 순서
SCENES = [
    "scene1_intro",
    "scene2_brain",
    "scene3_neuron_structure",
    "scene4_threshold",
    "scene5_mcculloch_pitts",
    "scene6_perceptron",
    "scene7_learning",
    "scene8_history",
    "scene9_summary",
    "scene10_outro",
]

def analyze_audio():
    timings = {}
    current_frame = 0

    print("=== Lesson 1-2 Audio Analysis ===\n")

    for scene in SCENES:
        filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
        audio = MP3(filepath)
        duration_sec = audio.info.length
        duration_frames = int(duration_sec * FPS) + 30  # 1초 여유

        timings[scene] = {
            "duration": duration_frames,
            "start": current_frame,
            "seconds": round(duration_sec, 2)
        }

        print(f"{scene}:")
        print(f"  Duration: {duration_sec:.2f}s = {duration_frames} frames")
        print(f"  Start: {current_frame}")
        print()

        current_frame += duration_frames

    print("\n=== SCENE_TIMINGS for TypeScript ===\n")
    print("export const SCENE_TIMINGS = {")
    for scene, data in timings.items():
        print(f"  {scene}: {{ duration: {data['duration']}, start: {data['start']} }},")
    print("};")

    print(f"\nexport const LESSON_1_2_DURATION = {current_frame};")
    print(f"\n// Total duration: {current_frame / FPS:.1f} seconds ({current_frame / FPS / 60:.1f} minutes)")

if __name__ == "__main__":
    analyze_audio()
