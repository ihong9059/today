#!/usr/bin/env node
// ============================================================
// scan-requirements.js — Claude Code Hook 스크립트
//
// 역할: requirements/ 폴더에서 status === "pending"인 요구사항을
//      스캔하여 발견되면 Claude에게 자동 처리 지시를 주입.
//
// 등록처: .claude/settings.json
//   - SessionStart  → 세션 시작 시 1회 (resume/clear/compact 포함)
//   - UserPromptSubmit → 매 사용자 입력 직전
//
// 출력 규약:
//   - pending이 0건이면 → exit 0, stdout 빈 출력 (조용)
//   - pending이 1건 이상이면 → exit 0, stdout JSON:
//     { "hookSpecificOutput": { "additionalContext": "..." } }
//
// JSON 파싱 실패 시 hook이 무시되므로 항상 깔끔한 JSON 또는 빈 출력만.
// ============================================================

const fs = require('fs');
const path = require('path');

// 큐 디렉토리 — CLAUDE_PROJECT_DIR이 있으면 그 기준, 없으면 스크립트 위치 기준
const projectDir = process.env.CLAUDE_PROJECT_DIR
  || path.resolve(__dirname, '..', '..');
const QUEUE_DIR = path.join(projectDir, 'requirements');

function silent() { process.exit(0); }

if (!fs.existsSync(QUEUE_DIR)) silent();

let pending = [];
try {
  const files = fs.readdirSync(QUEUE_DIR).filter(f => f.endsWith('.json'));
  for (const f of files) {
    try {
      const obj = JSON.parse(fs.readFileSync(path.join(QUEUE_DIR, f), 'utf8'));
      if (obj && obj.status === 'pending') pending.push(obj);
    } catch { /* 깨진 파일 무시 */ }
  }
} catch { silent(); }

if (pending.length === 0) silent();

// pending 발견 — Claude에게 자동 처리 지시 주입
const idList = pending.map(p => `  - ${p.id}: "${p.text}"`).join('\n');
const context = [
  '🔔 [AUTO-DETECTED] requirements-web 큐에 처리 대기 중인 요구사항이 발견되었습니다.',
  '',
  `처리 대상 ${pending.length}건:`,
  idList,
  '',
  '**즉시 CLAUDE.md의 6단계 절차대로 자동 처리를 시작하세요**:',
  '  1. Task(requirement-handler) 호출 — pending 요구사항 분류',
  '  2. 각 requirements/*.json: status "pending" → "in_progress" + category/assignedAgents 채움',
  '  3. 분류 결과에 따라 builder 에이전트들을 한 메시지에서 병렬 호출 (frontend-builder / backend-builder / test-writer / doc-writer)',
  '  4. 처리 완료 후 각 .json: status "in_progress" → "done" + result/completedAt 기록',
  '  5. Bash("cd todo-web && npm test")로 회귀 검증',
  '  6. 사용자에게 처리 결과 보고 (어느 요구사항을, 어느 에이전트가, 무엇을 수정했는지)',
  '',
  '이 지시는 hook이 자동 감지로 주입한 것입니다. 사용자가 별도로 "처리해줘"라고 말하지 않아도 즉시 처리하세요.'
].join('\n');

const out = {
  hookSpecificOutput: {
    additionalContext: context
  }
};

process.stdout.write(JSON.stringify(out));
process.exit(0);
