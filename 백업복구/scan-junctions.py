#!/usr/bin/env python3
"""C:\\todo 하위 junction/심링크 전수 스캔 (junction 내부로 내려가지 않음 — 무한루프 방지).

출력:
  junctions.json        — [{path, target}] 목록 (복원 단일출처)
  restore-junctions.ps1 — 새 PC에서 junction 일괄 재생성 스크립트
  tar-excludes.txt      — tar 백업 시 제외 목록 (POSIX 상대경로, 'todo/...' 형식)
"""
import ctypes
import json
import os
import stat
import sys

ROOT = r"C:\todo"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

def reparse_target(path):
    """junction/심링크의 대상 경로. 실패 시 None."""
    try:
        t = os.readlink(path)
        return t[4:] if t.startswith("\\\\?\\") else t
    except OSError:
        return None

junctions = []

def walk(d):
    try:
        entries = list(os.scandir(d))
    except OSError:
        return
    for e in entries:
        if not e.is_dir(follow_symlinks=False):
            continue
        try:
            attrs = os.lstat(e.path).st_file_attributes
        except OSError:
            continue
        if attrs & stat.FILE_ATTRIBUTE_REPARSE_POINT:
            junctions.append({"path": e.path, "target": reparse_target(e.path)})
            continue  # junction 내부로 내려가지 않음
        walk(e.path)

walk(ROOT)

with open(os.path.join(OUT_DIR, "junctions.json"), "w", encoding="utf-8") as f:
    json.dump(junctions, f, ensure_ascii=False, indent=2)

with open(os.path.join(OUT_DIR, "restore-junctions.ps1"), "w", encoding="utf-8-sig") as f:
    f.write("# 새 PC에서 junction 일괄 재생성 (C:\\todo 복원 후 실행)\n")
    f.write("# 생성 근거: junctions.json (scan-junctions.py 실측)\n")
    for j in junctions:
        tgt = j["target"] or "UNKNOWN_TARGET"
        f.write(f'if (-not (Test-Path "{j["path"]}")) {{ New-Item -ItemType Junction -Path "{j["path"]}" -Target "{tgt}" | Out-Null; Write-Host "OK  {j["path"]}" }} else {{ Write-Host "SKIP {j["path"]} (존재)" }}\n')

with open(os.path.join(OUT_DIR, "tar-excludes.txt"), "w", encoding="utf-8") as f:
    for j in junctions:
        rel = os.path.relpath(j["path"], r"C:\\").replace("\\", "/")
        f.write(rel + "\n")

print(f"junction {len(junctions)}개 발견")
for j in junctions:
    print(f"  {j['path']}  ->  {j['target']}")
