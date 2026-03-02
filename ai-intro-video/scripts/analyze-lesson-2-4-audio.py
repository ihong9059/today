"""
Lesson 2-4: 연쇄법칙 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-2-4"
FPS = 30

def analyze_audio():
    scenes = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]
    total_duration = 0
    total_frames = 0

    print("Lesson 2-4 오디오 분석 결과")
    print("=" * 50)

    for scene in scenes:
        audio_path = os.path.join(AUDIO_DIR, f"{scene}.mp3")
        audio = MP3(audio_path)
        duration = audio.info.length
        frames = int(duration * FPS)

        print(f"{scene}: {duration:.2f}초 = {frames} 프레임")
        total_duration += duration
        total_frames += frames

    print("=" * 50)
    print(f"총 길이: {total_duration:.2f}초 = {total_frames} 프레임")
    print(f"         ({total_duration/60:.1f}분)")

    print("\n// SCENE_DURATIONS 복사용:")
    print("const SCENE_DURATIONS = {")
    for scene in scenes:
        audio_path = os.path.join(AUDIO_DIR, f"{scene}.mp3")
        audio = MP3(audio_path)
        frames = int(audio.info.length * FPS)
        print(f"  {scene}: {frames},")
    print("};")

if __name__ == "__main__":
    analyze_audio()
