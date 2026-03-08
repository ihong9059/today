from mutagen.mp3 import MP3
import os

FPS = 30

lessons = [
    "lesson-7-1",
    "lesson-7-2",
    "lesson-7-3",
    "lesson-7-4",
    "lesson-7-5",
    "lesson-7-6",
    "lesson-7-7",
    "lesson-7-8",
]

print("=" * 60)
print("Level 7 Audio Duration Analysis")
print("=" * 60)

all_durations = {}

for lesson in lessons:
    audio_dir = f"public/audio/{lesson}"
    if not os.path.exists(audio_dir):
        print(f"\n{lesson}: Directory not found")
        continue

    print(f"\n{lesson}:")
    total_frames = 0
    for f in sorted(os.listdir(audio_dir)):
        if f.endswith('.mp3'):
            audio = MP3(f"{audio_dir}/{f}")
            duration = audio.info.length
            frames = int(duration * FPS) + 30
            total_frames += frames
            print(f"  {f}: {duration:.2f}s = {frames} frames")

    all_durations[lesson] = total_frames
    print(f"  Total: {total_frames} frames ({total_frames/30:.2f}s)")

print("\n" + "=" * 60)
print("Summary - Duration Constants for Root.tsx:")
print("=" * 60)
for lesson, frames in all_durations.items():
    lesson_num = lesson.replace("lesson-", "").replace("-", "_")
    print(f"export const LESSON_{lesson_num}_DURATION = {frames};")
