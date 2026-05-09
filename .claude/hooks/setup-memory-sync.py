#!/usr/bin/env python3
"""
Memory Sync Setup — Cross-platform (Windows / macOS / Linux)

목적:
  Claude의 memory 폴더(~/.claude/projects/<project>/memory/)를 today repo의
  .claude/memory/로 symlink/junction 연결하여 양 PC 동기화 가능하게 함.

동작:
  1. 현재 OS 감지
  2. 사용자 메모리 폴더 위치 결정
  3. 이미 올바르게 설정되었으면 스킵 (idempotent)
  4. 기존 폴더 백업 + 파일 이동 + 링크 생성
  5. 검증

사용:
  python setup-memory-sync.py [--repo PATH]

  --repo PATH    today repo 경로 (기본: 스크립트 위치에서 자동 추정)
"""

import os
import sys
import platform
import shutil
import subprocess
from pathlib import Path
from datetime import datetime


def detect_repo_root() -> Path:
    """스크립트 위치에서 repo 루트 추정 (.claude/hooks/setup-memory-sync.py)."""
    return Path(__file__).resolve().parent.parent.parent


def get_user_memory_path(project_slug: str = "C--todo-today") -> Path:
    """사용자 홈 디렉토리의 Claude 프로젝트 memory 폴더 경로."""
    return Path.home() / ".claude" / "projects" / project_slug / "memory"


def get_repo_memory_path(repo_root: Path) -> Path:
    """Repo 안의 동기화 대상 memory 폴더 경로."""
    return repo_root / ".claude" / "memory"


def is_symlink_or_junction(path: Path) -> bool:
    """Symlink (Mac/Linux) 또는 Junction (Windows) 여부.

    Python의 path.is_symlink()는 Windows junction을 인식하지 못하므로,
    Windows에서는 st_file_attributes의 REPARSE_POINT 비트를 직접 체크.
    """
    if not path.exists():
        return False
    if path.is_symlink():
        return True
    if platform.system() == "Windows":
        try:
            # lstat() returns attributes of the link itself (not target)
            attrs = path.lstat().st_file_attributes  # type: ignore[attr-defined]
            FILE_ATTRIBUTE_REPARSE_POINT = 0x400
            return bool(attrs & FILE_ATTRIBUTE_REPARSE_POINT)
        except (OSError, AttributeError):
            return False
    return False


def get_link_target(path: Path) -> Path | None:
    """링크 타겟 반환. 일반 폴더면 None.

    Python 3.8+의 os.readlink는 Windows junction도 지원.
    """
    try:
        target = os.readlink(str(path))
        # Windows junction은 \\?\C:\... 형태로 반환되는 경우 있음 → strip
        if target.startswith("\\\\?\\"):
            target = target[4:]
        return Path(target)
    except OSError:
        return None


def create_link(source: Path, target: Path):
    """OS별 적절한 방법으로 link 생성. source = 링크 위치, target = 실제 폴더."""
    system = platform.system()
    if system == "Windows":
        # Windows: cmd /c mklink /J — 권한 필요 없는 junction
        result = subprocess.run(
            ["cmd", "/c", "mklink", "/J", str(source), str(target)],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise RuntimeError(f"mklink failed: {result.stderr}")
    else:
        # Mac/Linux: 일반 symlink
        os.symlink(str(target), str(source), target_is_directory=True)


def main(repo_root: Path | None = None) -> int:
    if repo_root is None:
        repo_root = detect_repo_root()

    src = get_user_memory_path()
    dst = get_repo_memory_path(repo_root)

    print("=== Memory Sync Setup ({}) ===".format(platform.system()))
    print(f"Source (link will be here)  : {src}")
    print(f"Target (real files here)    : {dst}")
    print()

    # ─── Idempotency check ─────────────────────────────────
    if src.exists() and is_symlink_or_junction(src):
        target = get_link_target(src)
        try:
            if target and target.resolve() == dst.resolve():
                print("STATUS: Already configured correctly")
                file_count = len(list(src.iterdir())) if src.exists() else 0
                print(f"Files visible: {file_count}")
                return 0
            else:
                print(f"WARN: Link exists but points to wrong target: {target}")
                print("Removing and recreating...")
                # Symlink는 unlink, junction은 rmdir
                if platform.system() == "Windows":
                    subprocess.run(["cmd", "/c", "rmdir", str(src)], check=True)
                else:
                    os.unlink(str(src))
        except OSError as e:
            print(f"WARN: Failed to read link target: {e}")

    # ─── Step 1: Backup if real folder exists with files ───
    if src.exists() and not is_symlink_or_junction(src):
        files = list(src.iterdir()) if src.is_dir() else []
        if files:
            backup_dir = Path.home() / ".claude" / (
                "memory-backup-" + datetime.now().strftime("%Y%m%d_%H%M%S")
            )
            print(f"Step 1: Backing up {len(files)} files to {backup_dir}")
            shutil.copytree(str(src), str(backup_dir))

    # ─── Step 2: Ensure repo target exists ──────────────────
    if not dst.exists():
        print(f"Step 2: Creating target {dst}")
        dst.mkdir(parents=True, exist_ok=True)
    else:
        print(f"Step 2: Target already exists ({len(list(dst.iterdir()))} files)")

    # ─── Step 3: Move source files into target if target is empty ───
    if src.exists() and not is_symlink_or_junction(src):
        src_files = list(src.iterdir()) if src.is_dir() else []
        dst_files = list(dst.iterdir()) if dst.exists() else []
        if src_files and not dst_files:
            print(f"Step 3: Moving {len(src_files)} files from source to target")
            for f in src_files:
                shutil.move(str(f), str(dst / f.name))
        elif src_files and dst_files:
            print(
                f"Step 3: SKIP — both source ({len(src_files)} files) and target "
                f"({len(dst_files)} files) have files. Manual review needed."
            )
            print(f"   Source files preserved at: {src}")
            print(f"   Will not overwrite target. Backup at home folder.")
            return 1

        # ─── Step 4: Remove empty source folder ─────────────
        try:
            print(f"Step 4: Removing empty source folder {src}")
            src.rmdir()
        except OSError as e:
            print(f"WARN: Could not remove source folder: {e}")
            return 1

    # ─── Step 5: Ensure parent of source exists ─────────────
    src.parent.mkdir(parents=True, exist_ok=True)

    # ─── Step 6: Create link ────────────────────────────────
    print(f"Step 6: Creating link {src} -> {dst}")
    try:
        create_link(src, dst)
    except (OSError, RuntimeError) as e:
        print(f"ERROR: Failed to create link: {e}")
        return 1

    # ─── Step 7: Verify ─────────────────────────────────────
    print()
    print("=== Verification ===")
    print(f"Path     : {src}")
    print(f"IsLink   : {is_symlink_or_junction(src)}")
    target = get_link_target(src)
    print(f"Target   : {target}")
    file_count = len(list(src.iterdir())) if src.exists() else 0
    print(f"Files    : {file_count}")

    if (
        is_symlink_or_junction(src)
        and target
        and target.resolve() == dst.resolve()
        and file_count > 0
    ):
        print()
        print("SUCCESS: Memory sync setup complete")
        return 0
    else:
        print()
        print("ERROR: Setup did not complete correctly")
        return 1


if __name__ == "__main__":
    repo_arg = None
    if "--repo" in sys.argv:
        idx = sys.argv.index("--repo")
        if idx + 1 < len(sys.argv):
            repo_arg = Path(sys.argv[idx + 1]).resolve()
    sys.exit(main(repo_arg))
