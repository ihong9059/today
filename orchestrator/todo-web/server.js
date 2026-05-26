// ============================================================
// Todo Web — Express 백엔드
// 작성: backend-builder 서브에이전트 (오케스트레이터 패턴 데모)
// ============================================================

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── 인메모리 저장소 ────────────────────────────────────────
let todos = [];
let nextId = 1;

// ── API: 목록 조회 ────────────────────────────────────────
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// ── API: 추가 ────────────────────────────────────────────
app.post('/api/todos', (req, res) => {
  const { text } = req.body || {};
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'text is required (non-empty string)' });
  }
  const todo = { id: nextId++, text: text.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// ── API: 수정 (토글) ──────────────────────────────────────
app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'not found' });

  const { done, text } = req.body || {};
  if (typeof done === 'boolean') todo.done = done;
  if (typeof text === 'string' && text.trim()) todo.text = text.trim();
  res.json(todo);
});

// ── API: 삭제 ────────────────────────────────────────────
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  todos.splice(idx, 1);
  res.status(204).end();
});

// ── 서버 시작 ────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`✅ Todo Web 서버 구동 중 → http://localhost:${PORT}`);
});

// 테스트에서 서버 종료를 위해 export
module.exports = server;
