// ============================================================
// Requirements Web — 요구사항 입력 서버 (오케스트레이터 진입점)
// 사용자가 자연어 요구사항을 입력 → ../requirements/REQ-*.json 파일로 저장
// 메인 Claude가 이 큐를 읽고 처리함
// ============================================================

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;
const QUEUE_DIR = path.resolve(__dirname, '..', 'requirements');

if (!fs.existsSync(QUEUE_DIR)) fs.mkdirSync(QUEUE_DIR, { recursive: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── 큐 헬퍼 ──────────────────────────────────────────────
function listRequirements() {
  return fs.readdirSync(QUEUE_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(QUEUE_DIR, f), 'utf8'));
      } catch { return null; }
    })
    .filter(Boolean)
    .sort((a, b) => (a.created || '').localeCompare(b.created || ''));
}

function saveRequirement(req) {
  const file = path.join(QUEUE_DIR, `${req.id}.json`);
  fs.writeFileSync(file, JSON.stringify(req, null, 2), 'utf8');
}

function findRequirement(id) {
  const file = path.join(QUEUE_DIR, `${id}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function deleteRequirement(id) {
  const file = path.join(QUEUE_DIR, `${id}.json`);
  if (fs.existsSync(file)) { fs.unlinkSync(file); return true; }
  return false;
}

function newId() {
  const d = new Date();
  const ymd = d.toISOString().slice(0, 10).replace(/-/g, '');
  const seq = String(Date.now()).slice(-4);
  return `REQ-${ymd}-${seq}`;
}

// ── API ──────────────────────────────────────────────────
app.get('/api/requirements', (req, res) => {
  res.json(listRequirements());
});

app.post('/api/requirements', (req, res) => {
  const { text } = req.body || {};
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'text is required' });
  }
  const reqObj = {
    id: newId(),
    text: text.trim(),
    status: 'pending',          // pending | in_progress | done
    created: new Date().toISOString(),
    category: null,             // requirement-handler가 분류 후 채움
    assignedAgents: [],         // 예: ["frontend-builder", "backend-builder"]
    result: null,
    completedAt: null
  };
  saveRequirement(reqObj);
  res.status(201).json(reqObj);
});

app.put('/api/requirements/:id', (req, res) => {
  const reqObj = findRequirement(req.params.id);
  if (!reqObj) return res.status(404).json({ error: 'not found' });
  const { status, category, assignedAgents, result } = req.body || {};
  if (status) reqObj.status = status;
  if (category) reqObj.category = category;
  if (Array.isArray(assignedAgents)) reqObj.assignedAgents = assignedAgents;
  if (typeof result === 'string') reqObj.result = result;
  if (status === 'done') reqObj.completedAt = new Date().toISOString();
  saveRequirement(reqObj);
  res.json(reqObj);
});

app.delete('/api/requirements/:id', (req, res) => {
  if (deleteRequirement(req.params.id)) return res.status(204).end();
  res.status(404).json({ error: 'not found' });
});

// ── 서버 시작 ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Requirements Web → http://localhost:${PORT}`);
  console.log(`   큐 저장소: ${QUEUE_DIR}`);
});
