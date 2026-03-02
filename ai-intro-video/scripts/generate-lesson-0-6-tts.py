"""
Lesson 0-6 (Matplotlib 기초) TTS 생성 스크립트
"""

import asyncio
import edge_tts
import os

# ===== 설정 =====
LESSON_ID = "0-6"
VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성

# ===== 경로 설정 =====
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT_DIR = os.path.join(BASE_DIR, "scripts", f"lesson-{LESSON_ID}")
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "audio", f"lesson-{LESSON_ID}")


async def generate_scene_audio(scene_num: int) -> bool:
    """단일 씬의 오디오 생성"""
    script_file = os.path.join(SCRIPT_DIR, f"scene{scene_num}.txt")
    output_file = os.path.join(OUTPUT_DIR, f"scene{scene_num}.mp3")

    if not os.path.exists(script_file):
        print(f"  [SKIP] scene{scene_num}.txt not found")
        return False

    with open(script_file, "r", encoding="utf-8") as f:
        text = f.read().strip()

    if not text:
        print(f"  [SKIP] scene{scene_num}.txt is empty")
        return False

    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(output_file)
    print(f"  [OK] scene{scene_num}.mp3 generated")
    return True


async def main():
    print(f"\n=== Lesson {LESSON_ID} TTS Generation ===")
    print(f"Voice: {VOICE}")
    print(f"Script dir: {SCRIPT_DIR}")
    print(f"Output dir: {OUTPUT_DIR}\n")

    # 출력 디렉토리 생성
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # 씬 1~7 생성
    success_count = 0
    for i in range(1, 8):
        if await generate_scene_audio(i):
            success_count += 1

    print(f"\n=== Complete: {success_count} files generated ===\n")


if __name__ == "__main__":
    asyncio.run(main())
