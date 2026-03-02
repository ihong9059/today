"""
Lesson 0-5 (NumPy 기초) 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

# ===== 설정 =====
LESSON_ID = "0-5"
FPS = 30

# ===== 경로 설정 =====
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "public", "audio", f"lesson-{LESSON_ID}")


def analyze_audio():
    print(f"\n=== Lesson {LESSON_ID} Audio Analysis ===")
    print(f"Audio dir: {AUDIO_DIR}")
    print(f"FPS: {FPS}\n")

    total_duration = 0
    total_frames = 0
    scene_data = []

    for i in range(1, 8):
        audio_file = os.path.join(AUDIO_DIR, f"scene{i}.mp3")

        if not os.path.exists(audio_file):
            print(f"Scene {i}: [NOT FOUND]")
            continue

        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)

        scene_data.append({
            "scene": i,
            "duration": duration,
            "frames": frames
        })

        total_duration += duration
        total_frames += frames

        print(f"Scene {i}: {duration:.2f}s = {frames} frames")

    print(f"\n{'='*40}")
    print(f"Total: {total_duration:.2f}s = {total_frames} frames")
    print(f"       = {total_duration/60:.1f} minutes")

    # SCENE_TIMINGS 코드 생성
    print(f"\n{'='*40}")
    print("// Copy to Lesson05Video.tsx:")
    print("const SCENE_TIMINGS = {")

    start = 0
    for data in scene_data:
        print(f"  scene{data['scene']}: {{ duration: {data['frames']}, start: {start} }},")
        start += data["frames"]

    print("};")
    print(f"\n// Total frames: {total_frames}")


if __name__ == "__main__":
    analyze_audio()
