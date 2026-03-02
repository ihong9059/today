import os
import json
from mutagen.mp3 import MP3

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
AUDIO_DIR = os.path.join(SCRIPT_DIR, "..", "public", "audio")

# 씬 순서
scenes = ["scene1", "scene2", "scene3", "scene4a", "scene4b", "scene4c", "scene5", "scene6", "scene7"]

print("=== Audio Duration Analysis ===\n")

FPS = 30
total_duration = 0
scene_data = []

for scene_id in scenes:
    audio_path = os.path.join(AUDIO_DIR, f"{scene_id}.mp3")
    if os.path.exists(audio_path):
        audio = MP3(audio_path)
        duration_sec = audio.info.length
        duration_frames = int(duration_sec * FPS) + FPS  # 여유 1초 추가

        scene_data.append({
            "id": scene_id,
            "duration_sec": round(duration_sec, 2),
            "duration_frames": duration_frames,
            "start_frame": int(total_duration * FPS)
        })

        print(f"{scene_id}: {duration_sec:.2f}초 ({duration_frames} frames)")
        total_duration += duration_sec + 1  # 여유 1초

print(f"\n총 길이: {total_duration:.2f}초 ({total_duration/60:.1f}분)")

# JSON으로 저장
output_path = os.path.join(SCRIPT_DIR, "scene-timings.json")
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump({
        "fps": FPS,
        "total_duration_sec": round(total_duration, 2),
        "total_frames": int(total_duration * FPS),
        "scenes": scene_data
    }, f, indent=2, ensure_ascii=False)

print(f"\n타이밍 데이터 저장: {output_path}")
