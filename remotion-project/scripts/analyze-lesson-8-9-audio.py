from mutagen.mp3 import MP3
import os
import json

FPS = 30
BUFFER_FRAMES = 30  # 1 second buffer after each scene

def analyze_lesson(lesson_id, scenes):
    """Analyze audio durations and generate SCENE_TIMINGS for a lesson."""
    audio_dir = f"public/audio/lesson-{lesson_id}"

    timings = {}
    current_frame = 0
    total_duration = 0

    print(f"\n=== Lesson {lesson_id} ===")

    for scene in scenes:
        audio_file = f"{audio_dir}/{scene}.mp3"
        if os.path.exists(audio_file):
            audio = MP3(audio_file)
            duration_sec = audio.info.length
            duration_frames = int(duration_sec * FPS) + BUFFER_FRAMES

            timings[scene] = {
                "start": current_frame,
                "duration": duration_frames
            }

            print(f"  {scene}: {duration_sec:.2f}s -> {duration_frames} frames (start: {current_frame})")

            current_frame += duration_frames
            total_duration += duration_sec
        else:
            print(f"  WARNING: {audio_file} not found!")

    print(f"  Total: {total_duration:.2f}s, {current_frame} frames")

    return timings, current_frame

# Define scenes for each lesson
lessons = {
    "8-1": ["intro", "cpu_vs_gpu", "why_gpu", "parallel_computing", "nvidia_ecosystem", "memory_bandwidth", "practical_tips", "outro"],
    "8-2": ["intro", "cuda_basics", "thread_hierarchy", "memory_types", "pytorch_cuda", "synchronization", "error_handling", "outro"],
    "8-3": ["intro", "data_loading", "tensor_operations", "cudnn_optimization", "torch_compile", "gradient_checkpointing", "profiling", "outro"],
    "8-4": ["intro", "float_precision", "why_mixed", "amp_scaler", "implementation", "best_practices", "bf16", "outro"],
    "8-5": ["intro", "why_distributed", "data_parallel", "ddp", "model_parallel", "fsdp", "practical_tips", "outro"],
    "8-6": ["intro", "memory_analysis", "batch_size", "no_grad", "memory_cleanup", "offloading", "efficient_data", "outro"],
    "8-7": ["intro", "torch_profiler", "tensorboard", "bottleneck", "debugging", "common_issues", "best_practices", "outro"],
    "9-1": ["intro", "overview", "pipeline", "skills", "data_intro", "goals", "outro"],
    "9-2": ["intro", "data_sources", "annotation", "preprocessing", "augmentation", "split", "outro"],
    "9-3": ["intro", "yolo_intro", "setup", "training", "hyperparams", "monitoring", "inference", "outro"],
    "9-4": ["intro", "ocr_approach", "segmentation", "cnn_model", "training", "evaluation", "integration", "outro"],
    "9-5": ["intro", "detection_metrics", "ocr_metrics", "error_analysis", "optimization", "inference_speed", "mlflow", "outro"],
    "9-6": ["intro", "fastapi", "optimization", "docker", "edge", "scaling", "outro"],
    "9-7": ["intro", "versioning", "pipeline", "cicd", "monitoring", "abtest", "outro"],
    "9-8": ["intro", "journey", "advanced", "project", "skills", "next_steps", "outro"],
}

print("=" * 60)
print("Audio Duration Analysis for Lessons 8-1 to 9-8")
print("=" * 60)

all_timings = {}
for lesson_id, scenes in lessons.items():
    timings, total_frames = analyze_lesson(lesson_id, scenes)
    all_timings[lesson_id] = {"timings": timings, "total_frames": total_frames}

# Output TypeScript format for easy copy-paste
print("\n" + "=" * 60)
print("TypeScript SCENE_TIMINGS Format:")
print("=" * 60)

for lesson_id, data in all_timings.items():
    print(f"\n// Lesson {lesson_id} - Total frames: {data['total_frames']}")
    print("const SCENE_TIMINGS = {")
    for scene, timing in data['timings'].items():
        print(f"  {scene}: {{ start: {timing['start']}, duration: {timing['duration']} }},")
    print("};")
