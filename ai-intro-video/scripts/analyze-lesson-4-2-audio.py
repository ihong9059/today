from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-4-2"

scene_info = []
total_frames = 0
current_start = 0

for i in range(1, 8):
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)
        scene_info.append({
            'scene': i,
            'duration': frames,
            'start': current_start,
            'seconds': duration
        })
        current_start += frames
        total_frames += frames

print("export const SCENE_TIMINGS = {")
for s in scene_info:
    print(f"  scene{s['scene']}: {{ duration: {s['duration']}, start: {s['start']} }},")
print("};")
print(f"\nexport const LESSON_4_2_DURATION = {total_frames};")
print(f"// Total: {total_frames/FPS:.2f}초")
