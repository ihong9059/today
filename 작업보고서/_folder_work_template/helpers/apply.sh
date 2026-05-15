#!/bin/bash
# Folder Work Template — apply to target folder
#
# Usage:
#   bash apply.sh <target_folder_absolute_path>
#
# Example:
#   bash apply.sh "C:/todo/my_new_project"
#
# Effect:
#   <target>/.claude/skills/work-start/SKILL.md ← copied from skills/work-start.md
#   <target>/.claude/skills/work-end/SKILL.md   ← copied from skills/work-end.md

set -e

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
    echo "ERROR: target folder required"
    echo "Usage: bash apply.sh <target_folder_absolute_path>"
    exit 1
fi

if [ ! -d "$TARGET" ]; then
    echo "ERROR: target folder does not exist: $TARGET"
    exit 1
fi

# Source paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(dirname "$SCRIPT_DIR")"
SRC_START="$TEMPLATE_DIR/skills/work-start.md"
SRC_END="$TEMPLATE_DIR/skills/work-end.md"

if [ ! -f "$SRC_START" ] || [ ! -f "$SRC_END" ]; then
    echo "ERROR: skill source files not found in $TEMPLATE_DIR/skills/"
    exit 1
fi

# Create target dirs
mkdir -p "$TARGET/.claude/skills/work-start"
mkdir -p "$TARGET/.claude/skills/work-end"

# Copy
cp "$SRC_START" "$TARGET/.claude/skills/work-start/SKILL.md"
cp "$SRC_END"   "$TARGET/.claude/skills/work-end/SKILL.md"

echo ""
echo "============================================="
echo "  Folder Work Template applied"
echo "============================================="
echo "Target: $TARGET"
echo ""
echo "Installed skills:"
echo "  $TARGET/.claude/skills/work-start/SKILL.md"
echo "  $TARGET/.claude/skills/work-end/SKILL.md"
echo ""
echo "Next steps:"
echo "  1. cd \"$TARGET\""
echo "  2. claude              # start session in target folder"
echo "  3. /work-start         # first command — sets up 작업보고서/ + git"
echo ""
echo "If git repo missing in target, /work-start will guide you to create"
echo "  ihong9059/<folder_name>  (private, recommended)"
echo "============================================="
