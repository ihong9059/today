"""
Lesson 4-6 오디오 분석 스크립트
"""
from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-4-6"
FPS = 30

def analyze_audio():
    total_duration = 0
    total_frames = 0

    print("=" * 50)
    print("Lesson 4-6 오디오 분석 결과")
    print("=" * 50)

    for i in range(1, 8):
        audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)

        print(f"Scene {i}: {duration:.2f}초 = {frames} frames")

        total_duration += duration
        total_frames += frames

    print("=" * 50)
    print(f"총 길이: {total_duration:.2f}초 = {total_frames} frames")
    print(f"예상 영상 길이: {total_duration/60:.1f}분")

    print("\n// SCENE_TIMINGS for Lesson4_6Video.tsx:")
    print("export const SCENE_TIMINGS = {")
    for i in range(1, 8):
        audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
        audio = MP3(audio_file)
        frames = int(audio.info.length * FPS)
        comma = "," if i < 7 else ""
        print(f"  scene{i}: {frames}{comma}")
    print("};")

if __name__ == "__main__":
    analyze_audio()
