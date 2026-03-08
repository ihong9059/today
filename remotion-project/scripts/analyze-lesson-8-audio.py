from mutagen.mp3 import MP3
import os

FPS = 30
lessons = ["8-1", "8-2", "8-3", "8-4"]

audio_files_map = {
    "8-1": ["intro.mp3", "cpu_vs_gpu.mp3", "why_gpu.mp3", "simd.mp3", "bandwidth.mp3", "cooperation.mp3", "outro.mp3"],
    "8-2": ["intro.mp3", "host_device.mp3", "kernel.mp3", "thread_block.mp3", "example.mp3", "pytorch.mp3", "outro.mp3"],
    "8-3": ["intro.mp3", "hierarchy.mp3", "register.mp3", "shared.mp3", "global.mp3", "constant.mp3", "outro.mp3"],
    "8-4": ["intro.mp3", "naive.mp3", "problem.mp3", "tiling.mp3", "implementation.mp3", "performance.mp3", "outro.mp3"],
}

for lesson in lessons:
    print(f"\n=== Lesson {lesson} ===")
    audio_dir = f"public/audio/lesson-{lesson}"
    audio_files = audio_files_map[lesson]

    total_duration = 0
    durations = []

    for audio_file in audio_files:
        audio_path = os.path.join(audio_dir, audio_file)
        audio = MP3(audio_path)
        duration = audio.info.length
        frames = int(duration * FPS) + 30
        total_duration += duration
        durations.append((audio_file, duration, frames))
        print(f"{audio_file}: {duration:.2f}s -> {frames} frames")

    total_frames = int(total_duration * FPS) + 30 * len(audio_files)
    print(f"\nTotal: {total_duration:.2f}s -> {total_frames} frames")
    print(f"Duration per scene: {[d[2] for d in durations]}")
