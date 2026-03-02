from mutagen.mp3 import MP3
import os
import json

AUDIO_DIR = "public/audio/lesson-4-3"
FPS = 30

def analyze_audio():
    results = []
    total_duration = 0

    for i in range(1, 8):
        audio_path = f"{AUDIO_DIR}/scene{i}.mp3"
        if os.path.exists(audio_path):
            audio = MP3(audio_path)
            duration = audio.info.length
            frames = int(duration * FPS)
            total_duration += duration

            results.append({
                "scene": i,
                "duration_sec": round(duration, 2),
                "frames": frames
            })
            print(f"Scene {i}: {duration:.2f}s = {frames} frames")

    total_frames = int(total_duration * FPS)
    print(f"\nTotal: {total_duration:.2f}s = {total_frames} frames")

    # Generate timing config
    print("\n// Scene Timing Config for Root.tsx")
    print("const SCENE_DURATIONS = {")
    for r in results:
        print(f"  scene{r['scene']}: {r['frames']},")
    print("};")

    print(f"\n// Total duration: {total_frames} frames")

    return results

if __name__ == "__main__":
    analyze_audio()
