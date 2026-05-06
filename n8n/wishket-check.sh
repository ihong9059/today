#!/bin/bash
# ~/n8n/wishket-check.sh v3 — 매일 09:00 cron, Notion + Email 통합
# v3 (2026-05-06): applied.txt 기반 중복 알림 방지 추가

set -euo pipefail

OUT_DIR="$HOME/n8n/data/wishket"
mkdir -p "$OUT_DIR"
LOG="$OUT_DIR/log.txt"
TS=$(date +%Y-%m-%d)
RESULT="$OUT_DIR/${TS}.json"
PROMPT_FILE="$HOME/n8n/wishket-prompt.txt"
SECRETS_FILE="$HOME/n8n/.secrets"
APPLIED_FILE="$OUT_DIR/applied.txt"

# Source secrets if present
if [ -f "$SECRETS_FILE" ]; then
  set -a
  . "$SECRETS_FILE"
  set +a
fi

if [ ! -f "$PROMPT_FILE" ]; then
  echo "[$(date -Iseconds)] ERROR: prompt file not found" | tee -a "$LOG"
  exit 1
fi

echo "[$(date -Iseconds)] START $TS" | tee -a "$LOG"

# claude 호출 (WebFetch 허용, 240s timeout)
RAW=$(cat "$PROMPT_FILE" | timeout 240 claude -p --allowedTools "WebFetch" --output-format text 2>&1) || {
  echo "[$(date -Iseconds)] ERROR: claude failed" | tee -a "$LOG"
  echo "$RAW" >> "$LOG"
  exit 1
}

# 마크다운 코드 펜스 제거 + 양 끝 공백 제거
JSON=$(echo "$RAW" | sed -e 's/^```json$//g' -e 's/^```$//g' | tr -d '\r' | sed -e '/^[[:space:]]*$/d' | awk 'BEGIN{p=0} /^\[/{p=1} p; /^\]/{exit}')

if ! echo "$JSON" | jq empty 2>/dev/null; then
  echo "[$(date -Iseconds)] ERROR: invalid JSON" | tee -a "$LOG"
  echo "--- RAW ---" >> "$LOG"
  echo "$RAW" >> "$LOG"
  exit 1
fi

# 전체 결과는 그대로 저장 (히스토리)
echo "$JSON" > "$RESULT"
COUNT=$(echo "$JSON" | jq 'length')
HIGH=$(echo "$JSON" | jq '[.[] | select(.score >= 7)] | length')

# 지원 완료 ID 로딩 (applied.txt)
touch "$APPLIED_FILE"
APPLIED_IDS=$(grep -E '^[0-9]+' "$APPLIED_FILE" 2>/dev/null | sed 's/[^0-9].*//' | jq -Rs 'split("\n") | map(select(length>0) | tonumber)' 2>/dev/null || echo '[]')
[ -z "$APPLIED_IDS" ] && APPLIED_IDS='[]'

# 새 high-fit만 추출 (지원 완료 ID 제외)
NEW_JSON=$(echo "$JSON" | jq --argjson applied "$APPLIED_IDS" '[.[] | select(.score >= 7) | select(.id as $id | $applied | index($id) | not)]')
NEW_HIGH=$(echo "$NEW_JSON" | jq 'length')
APPLIED_COUNT=$(echo "$APPLIED_IDS" | jq 'length')

echo "[$(date -Iseconds)] OK: ${COUNT} projects, ${HIGH} high-fit (>=7), ${NEW_HIGH} new (excluding ${APPLIED_COUNT} applied) saved to $RESULT" | tee -a "$LOG"

# Notion + Email은 NEW_HIGH가 있을 때만 트리거 (지원 완료 ID 자동 제외)
if [ "$NEW_HIGH" -gt 0 ]; then
  if [ -n "${NOTION_TOKEN:-}" ]; then
    echo "$NEW_JSON" | python3 "$HOME/n8n/notion_add.py" 2>&1 | tee -a "$LOG"
  fi
  if [ -n "${GMAIL_APP_PASSWORD:-}" ]; then
    echo "$NEW_JSON" | python3 "$HOME/n8n/email_send.py" 2>&1 | tee -a "$LOG"
  fi
else
  echo "[$(date -Iseconds)] no new high-fit (already-applied IDs filtered out), skip notify" | tee -a "$LOG"
fi

# n8n Webhook (옵션, 전체 결과 전송)
if [ -n "${N8N_WEBHOOK_URL:-}" ]; then
  PAYLOAD=$(jq -n --argjson r "$JSON" --arg date "$TS" --argjson count "$COUNT" --argjson high "$HIGH" --argjson new_high "$NEW_HIGH" \
    '{date: $date, total: $count, high_fit: $high, new_high_fit: $new_high, results: $r}')
  curl -s -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$N8N_WEBHOOK_URL" \
    >> "$LOG" 2>&1 && echo "[$(date -Iseconds)] webhook posted" >> "$LOG" \
    || echo "[$(date -Iseconds)] webhook FAILED" >> "$LOG"
fi
