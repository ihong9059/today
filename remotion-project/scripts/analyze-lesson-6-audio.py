from mutagen.mp3 import MP3
import os

FPS = 30

lessons = [
    ("lesson-6-1", "시퀀스 데이터란"),
    ("lesson-6-2", "RNN 구조와 동작"),
    ("lesson-6-3", "LSTM"),
    ("lesson-6-4", "GRU"),
    ("lesson-6-5", "양방향 RNN"),
    ("lesson-6-6", "Seq2Seq"),
    ("lesson-6-7", "감성 분석"),
]

all_results = {}

for lesson_dir, lesson_name in lessons:
    audio_dir = f"public/audio/{lesson_dir}"
    print(f"\n=== {lesson_name} ({lesson_dir}) ===")

    total_frames = 0
    scene_data = {}

    for f in sorted(os.listdir(audio_dir)):
        if f.endswith('.mp3'):
            audio = MP3(f"{audio_dir}/{f}")
            duration = audio.info.length
            frames = int(duration * FPS) + 30
            total_frames += frames
            scene_name = f.replace('.mp3', '')
            scene_data[scene_name] = frames
            print(f"  {f}: {duration:.2f}s = {frames} frames")

    print(f"  Total: {total_frames} frames ({total_frames/30:.2f}s)")
    all_results[lesson_dir] = {
        "name": lesson_name,
        "total": total_frames,
        "scenes": scene_data
    }

print("\n\n=== SUMMARY ===")
for lesson_dir, data in all_results.items():
    print(f"{lesson_dir}: {data['total']} frames")
    for scene, frames in data['scenes'].items():
        print(f"  {scene}: {frames}")
