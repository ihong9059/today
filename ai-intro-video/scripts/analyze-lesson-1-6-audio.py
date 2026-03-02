"""
Lesson 1-6: XOR 문제와 한계 - 오디오 길이 분석 스크립트
각 Scene의 음성 파일 길이를 분석하여 프레임 수 계산
"""

import os
from mutagen.mp3 import MP3

AUDIO_DIR = "public/audio/lesson-1-6"
FPS = 30

# Scene 순서
SCENES = [
    "scene1_intro",
    "scene2_xor_gate",
    "scene3_problem",
    "scene4_linear_separation",
    "scene5_xor_plot",
    "scene6_historical",
    "scene7_solution_hint",
    "scene8_key_insight",
    "scene9_outro",
]

def analyze_audio():
    """오디오 파일 길이 분석"""
    print("=" * 60)
    print("Lesson 1-6: XOR 문제와 한계 - 오디오 분석")
    print("=" * 60)

    total_duration = 0
    total_frames = 0
    scene_data = []
    current_start = 0

    for scene in SCENES:
        filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")

        if os.path.exists(filepath):
            audio = MP3(filepath)
            duration = audio.info.length
            frames = int(duration * FPS) + 30  # 0.5초 여유

            scene_data.append({
                "name": scene,
                "duration": duration,
                "frames": frames,
                "start": current_start
            })

            print(f"{scene}:")
            print(f"  Duration: {duration:.2f}s")
            print(f"  Frames: {frames} (start: {current_start})")

            total_duration += duration
            total_frames += frames
            current_start += frames
        else:
            print(f"{scene}: FILE NOT FOUND")

    print("\n" + "=" * 60)
    print(f"Total Duration: {total_duration:.2f}s ({total_duration/60:.1f} min)")
    print(f"Total Frames: {total_frames} @ {FPS}fps")
    print("=" * 60)

    # TypeScript 형식 출력
    print("\n// TypeScript SCENE_TIMINGS:")
    print("export const SCENE_TIMINGS = {")
    for data in scene_data:
        print(f"  {data['name']}: {{ duration: {data['frames']}, start: {data['start']} }},")
    print("};")
    print(f"\nexport const LESSON_1_6_DURATION = {total_frames};")

if __name__ == "__main__":
    analyze_audio()
