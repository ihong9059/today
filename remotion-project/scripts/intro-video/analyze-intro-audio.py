from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/intro"

scenes = [
    "scene1_intro",
    "scene2_problem",
    "scene3_principles",
    "scene4_level0to2",
    "scene5_level3to5",
    "scene6_level6to8",
    "scene7_level9",
    "scene8_outro"
]

scene_info = []
total_frames = 0
current_start = 0

for scene in scenes:
    audio_file = f"{AUDIO_DIR}/{scene}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS) + 30  # 여유 프레임 추가
        scene_info.append({
            'scene': scene,
            'duration': frames,
            'start': current_start,
            'seconds': duration
        })
        current_start += frames
        total_frames += frames

print("// Scene timings for AIIntroVideo.tsx")
print("export const SCENE_TIMINGS = {")
for s in scene_info:
    print(f"  {s['scene']}: {{ duration: {s['duration']}, start: {s['start']} }}, // {s['seconds']:.2f}초")
print("};")
print(f"\nexport const INTRO_VIDEO_DURATION = {total_frames};")
print(f"// Total: {total_frames/FPS:.2f}초 ({total_frames/FPS/60:.1f}분)")
