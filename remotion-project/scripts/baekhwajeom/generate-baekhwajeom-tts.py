"""
백화점 점장 제안 영상 TTS 생성
- 한국어 여성 음성 (ko-KR-SunHiNeural)
- 차분한 임원 보고 톤을 위해 rate -10%
"""
import asyncio
import edge_tts
import os
from mutagen.mp3 import MP3

VOICE = "ko-KR-SunHiNeural"
RATE = "+15%"  # 약간 빠른 톤 (이전 -10% 대비 약 27% 빠름 = 80% 길이)
SCRIPT_DIR = "scripts/baekhwajeom"
OUTPUT_DIR = "public/audio/baekhwajeom"

SCENES = [
    ("scene1_opening", "오프닝"),
    ("scene2_problem", "문제 제기"),
    ("scene3_solution", "해결책 소개"),
    ("scene4_scenario1", "시나리오 1"),
    ("scene5_scenario23", "시나리오 2,3"),
    ("scene6_scenarios4to7", "시나리오 4-7"),
    ("scene7_security", "보안"),
    ("scene8_roadmap", "로드맵"),
    ("scene9_closing", "클로징"),
]

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for scene_id, _ in SCENES:
        script_file = f"{SCRIPT_DIR}/{scene_id}.txt"
        if not os.path.exists(script_file):
            print(f"  SKIP: {script_file} not found")
            continue
        with open(script_file, "r", encoding="utf-8") as f:
            text = f.read().strip()
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
        output_file = f"{OUTPUT_DIR}/{scene_id}.mp3"
        await communicate.save(output_file)
        print(f"  OK: {output_file}")

def analyze_durations():
    print("\n=== Audio Durations ===")
    fps = 30
    timings = {}
    current_start = 0

    for scene_id, label in SCENES:
        audio_file = f"{OUTPUT_DIR}/{scene_id}.mp3"
        if not os.path.exists(audio_file):
            continue
        audio = MP3(audio_file)
        duration = audio.info.length
        # 씬 사이 1초 호흡 추가
        padding = 30
        frames = int(duration * fps) + padding
        timings[scene_id] = {"duration": frames, "start": current_start, "label": label}
        current_start += frames
        print(f"  {scene_id} ({label}): {duration:.2f}s -> {frames} frames")

    total_frames = current_start
    print(f"\n  TOTAL: {total_frames / fps:.2f}s ({total_frames} frames)")

    print("\n=== Code snippet for BaekhwajeomPitchVideo.tsx ===")
    print(f"export const BAEKHWAJEOM_DURATION = {total_frames};\n")
    print("const T = {")
    for i, (scene_id, label) in enumerate(SCENES, start=1):
        if scene_id in timings:
            t = timings[scene_id]
            key = f"scene{i}"
            print(f"  {key}: {{ start: {t['start']}, dur: {t['duration']} }},  // {label}")
    print("};")

    return total_frames, timings

if __name__ == "__main__":
    asyncio.run(generate_audio())
    analyze_durations()
