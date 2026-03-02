#!/usr/bin/env python3
"""
Lesson 0-3 오디오 길이 분석
각 scene의 오디오 길이를 분석하여 Remotion 프레임 수 계산
"""

from pathlib import Path
from mutagen.mp3 import MP3

AUDIO_DIR = Path(__file__).parent.parent / "public" / "audio" / "lesson-0-3"
FPS = 30

def analyze_audio():
    print("=" * 60)
    print("Lesson 0-3 Audio Analysis")
    print("=" * 60)

    total_duration = 0
    total_frames = 0
    results = []

    for i in range(1, 8):
        audio_path = AUDIO_DIR / f"scene{i}.mp3"
        if audio_path.exists():
            audio = MP3(audio_path)
            duration = audio.info.length
            frames = int(duration * FPS) + 30  # 1초 여유 추가
            total_duration += duration
            total_frames += frames
            results.append({
                "scene": i,
                "duration": duration,
                "frames": frames
            })
            print(f"Scene {i}: {duration:.2f}초 ({frames} frames)")
        else:
            print(f"Scene {i}: NOT FOUND")

    print("-" * 60)
    print(f"Total: {total_duration:.2f}초 ({total_frames} frames)")
    print(f"       = {total_duration/60:.2f}분")
    print()

    # Remotion용 코드 출력
    print("// Remotion SCENE_TIMINGS 코드:")
    print("const SCENE_TIMINGS = {")
    current_start = 0
    for r in results:
        print(f"  scene{r['scene']}: {{ duration: {r['frames']}, start: {current_start} }},")
        current_start += r['frames']
    print("};")
    print()
    print(f"// Total frames: {total_frames}")

if __name__ == "__main__":
    analyze_audio()
