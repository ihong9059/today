#!/usr/bin/env bash
# PC 전체 백업 → mac USB SSD. Git Bash에서 실행 (PowerShell 금지: 바이너리 파이프 깨짐).
# 사용: bash run-backup-to-mac.sh   (날짜별 폴더, 재실행 시 완료된 폴더는 자동 SKIP = 재개 가능)
#
# 방식: C:\todo 최상위 폴더별 tar.gz 스트리밍 (느린 회선 대비 압축 + 폴더 단위 resume)
#   - 각 아카이브는 .part로 받다가 gzip -t(무결성) 통과 후에만 정식 이름으로 mv (원자적)
#   - junction은 tar-excludes.txt로 제외 → 복원 시 restore-junctions.ps1로 재생성
# 사전조건: ① mac 전원 ON + Tailscale ② scan-junctions.py가 junction 목록 최신화(아래서 자동)
set -u
# LAN 유선 직결(uttec0 허브, 10.8MB/s) 우선, 불통이면 Tailscale(100.90.158.36, ~0.7MB/s)로 폴백
MAC=uttec@192.168.0.12
ssh -o ConnectTimeout=5 "$MAC" true 2>/dev/null || MAC=uttec@100.90.158.36
# 인자로 날짜(YYYYMMDD)를 주면 해당 스냅샷에 이어서 재개, 없으면 오늘 날짜로 새 스냅샷
DEST=/mnt/backup-ssd/pc-backup/myhome-lenovo-${1:-$(date +%Y%m%d)}
HERE="$(cd "$(dirname "$0")" && pwd)"

python "$HERE/scan-junctions.py" > /dev/null   # junction 목록 최신화
sed 's|^todo/||' "$HERE/tar-excludes.txt" > /tmp/tar-ex-rel.txt
ssh "$MAC" "mkdir -p '$DEST/todo-parts'"

upload() {  # upload <원격파일명> ← stdin
  ssh "$MAC" "cat > '$DEST/todo-parts/$1.part' && gzip -t '$DEST/todo-parts/$1.part' && mv '$DEST/todo-parts/$1.part' '$DEST/todo-parts/$1'"
}

cd /c/todo

# ① 루트 낱개 파일 (Windows 예약어 'nul' 제외)
if ! ssh "$MAC" "test -s '$DEST/todo-parts/_rootfiles.tar.gz'"; then
  echo "[$(date +%H:%M:%S)] _rootfiles"
  find . -maxdepth 1 -type f ! -name nul -print0 | tar --null -T - -czf - --warning=no-file-changed | upload _rootfiles.tar.gz
fi

# ② 숨김 폴더 (.claude/.vscode — 'for d in */'는 dotdir 제외라 별도 처리)
if ! ssh "$MAC" "test -s '$DEST/todo-parts/_dotdirs.tar.gz'"; then
  echo "[$(date +%H:%M:%S)] _dotdirs"
  tar -czf - --warning=no-file-changed .claude .vscode | upload _dotdirs.tar.gz
fi

# ③ 최상위 폴더별
for d in */ ; do
  d=${d%/}
  out="${d}.tar.gz"
  if ssh "$MAC" "test -s '$DEST/todo-parts/$out'"; then echo "SKIP $d (완료분 존재)"; continue; fi
  echo "[$(date +%H:%M:%S)] $d"
  tar -czf - --warning=no-file-changed --exclude-from=/tmp/tar-ex-rel.txt "$d" | upload "$out"
done

# ④ 사용자 홈 (.claude / .claude.json / .ssh)
if ! ssh "$MAC" "test -s '$DEST/home-claude.tar.gz'"; then
  echo "[$(date +%H:%M:%S)] home-claude"
  cd ~
  tar -czf - --warning=no-file-changed \
    --exclude='.claude/cache' --exclude='.claude/tmp' --exclude='.claude/debug' \
    --exclude='.claude/telemetry' --exclude='.claude/paste-cache' \
    --exclude='.claude/shell-snapshots' --exclude='.claude/downloads' \
    .claude .claude.json .ssh | \
  ssh "$MAC" "cat > '$DEST/home-claude.tar.gz.part' && gzip -t '$DEST/home-claude.tar.gz.part' && mv '$DEST/home-claude.tar.gz.part' '$DEST/home-claude.tar.gz'"
fi

# ⑤ 복구 메타 standalone 사본 (tar 없이 바로 열람용)
scp -q -r "$HERE" "$MAC:$DEST/"

echo "=== 완료 요약 ==="
ssh "$MAC" "ls '$DEST/todo-parts' | wc -l; du -sh '$DEST'"
echo "DEST=$DEST"
