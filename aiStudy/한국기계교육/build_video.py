"""슬라이드 PNG + 나레이션 mp3 → 최종 mp4 합성
각 슬라이드 = (이미지 × 나레이션 길이 + 0.4s tail) + 페이드인 0.25s
최종 = 10 클립 concat
"""
import subprocess
from pathlib import Path
import imageio_ffmpeg

BASE = Path(r"C:\todo\today\aiStudy\한국기계교육")
SLIDES = BASE / "slides"
AUDIO = BASE / "audio"
CLIPS = BASE / "clips"
CLIPS.mkdir(exist_ok=True)
OUT = BASE / "한국기계_AI교육_제안.mp4"

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
print(f"ffmpeg: {FFMPEG}")

N = 10
TAIL_PAD = 0.4
FADE_IN = 0.25

def get_audio_duration(mp3_path):
    res = subprocess.run(
        [FFMPEG, "-i", str(mp3_path)],
        stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True
    )
    for line in res.stderr.split("\n"):
        if "Duration" in line:
            seg = line.split("Duration:")[1].split(",")[0].strip()
            h, m, s = seg.split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    raise RuntimeError(f"Cannot parse duration: {mp3_path}")

def build_clip(idx):
    png = SLIDES / f"slide_{idx:02d}.png"
    mp3 = AUDIO / f"narration_{idx:02d}.mp3"
    clip = CLIPS / f"clip_{idx:02d}.mp4"
    if clip.exists():
        clip.unlink()

    nar_dur = get_audio_duration(mp3)
    total_dur = nar_dur + TAIL_PAD
    print(f"  S{idx:02d}  narration={nar_dur:.2f}s  total={total_dur:.2f}s")

    cmd = [
        FFMPEG, "-y",
        "-loop", "1", "-framerate", "30", "-i", str(png),
        "-i", str(mp3),
        "-vf", f"format=yuv420p,fade=t=in:st=0:d={FADE_IN}",
        "-af", f"apad=pad_dur={TAIL_PAD},aresample=44100",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "192k", "-ac", "2",
        "-r", "30", "-pix_fmt", "yuv420p",
        "-t", f"{total_dur:.3f}",
        "-movflags", "+faststart",
        str(clip),
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if res.returncode != 0:
        print(res.stderr.decode("utf-8", errors="replace")[-2000:])
        raise RuntimeError(f"clip {idx} failed")
    return total_dur

print("Stage 1 — build per-slide clips")
durations = []
for i in range(1, N + 1):
    d = build_clip(i)
    durations.append(d)

total = sum(durations)
print(f"\nTotal duration: {total:.1f}s = {int(total//60)}m {total%60:.1f}s")

print("\nStage 2 — concat clips")
concat_txt = CLIPS / "concat.txt"
with open(concat_txt, "w", encoding="utf-8") as f:
    for i in range(1, N + 1):
        p = (CLIPS / f"clip_{i:02d}.mp4").as_posix()
        f.write(f"file '{p}'\n")

if OUT.exists():
    OUT.unlink()

cmd = [
    FFMPEG, "-y",
    "-f", "concat", "-safe", "0", "-i", str(concat_txt),
    "-c", "copy",
    "-movflags", "+faststart",
    str(OUT),
]
res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
if res.returncode != 0:
    print(res.stderr.decode("utf-8", errors="replace")[-2000:])
    raise RuntimeError("concat failed")

final_dur = get_audio_duration(OUT)
size_mb = OUT.stat().st_size / 1024 / 1024
print(f"\nFinal: {OUT}")
print(f"  duration: {final_dur:.1f}s = {int(final_dur//60)}m {final_dur%60:.1f}s")
print(f"  size: {size_mb:.1f} MB")
