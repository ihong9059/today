#!/bin/bash
# ~/n8n/wishket-applied.sh — 지원 완료 ID 등록/조회/삭제 헬퍼
# 사용법:
#   wishket-applied.sh add <ID> [메모]    — ID 추가
#   wishket-applied.sh list                — 전체 조회
#   wishket-applied.sh remove <ID>         — ID 삭제 (지원 취소 등)

set -euo pipefail

APPLIED_FILE="$HOME/n8n/data/wishket/applied.txt"
mkdir -p "$(dirname "$APPLIED_FILE")"
touch "$APPLIED_FILE"

CMD="${1:-list}"

case "$CMD" in
  add)
    ID="${2:?ID required}"
    if ! [[ "$ID" =~ ^[0-9]+$ ]]; then
      echo "ERROR: ID must be numeric" >&2
      exit 1
    fi
    NOTE="${3:-}"
    if grep -qE "^${ID}([[:space:]]|$)" "$APPLIED_FILE"; then
      echo "[applied] #$ID already in list"
      exit 0
    fi
    DATE=$(date +%Y-%m-%d)
    if [ -n "$NOTE" ]; then
      echo "$ID  # $DATE $NOTE" >> "$APPLIED_FILE"
    else
      echo "$ID  # $DATE" >> "$APPLIED_FILE"
    fi
    echo "[applied] added #$ID"
    ;;
  list|ls)
    if [ ! -s "$APPLIED_FILE" ]; then
      echo "[applied] empty"
    else
      echo "=== applied wishket projects ($APPLIED_FILE) ==="
      cat -n "$APPLIED_FILE"
    fi
    ;;
  remove|rm)
    ID="${2:?ID required}"
    if ! [[ "$ID" =~ ^[0-9]+$ ]]; then
      echo "ERROR: ID must be numeric" >&2
      exit 1
    fi
    if ! grep -qE "^${ID}([[:space:]]|$)" "$APPLIED_FILE"; then
      echo "[applied] #$ID not in list"
      exit 0
    fi
    sed -i "/^${ID}\([[:space:]]\|$\)/d" "$APPLIED_FILE"
    echo "[applied] removed #$ID"
    ;;
  *)
    echo "Usage: $0 {add <ID> [memo] | list | remove <ID>}" >&2
    exit 1
    ;;
esac
