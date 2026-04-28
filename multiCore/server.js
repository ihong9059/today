const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/s/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

app.post('/api/ask', (req, res) => {
  const { student, prompt } = req.body;
  if (!student || !prompt) return res.status(400).json({ error: 'missing' });
  const core = parseInt(student.replace('student', ''));
  if (core < 1 || core > 3) return res.status(400).json({ error: 'invalid' });

  const safe = prompt.replace(/\\/g, '\\\\').replace(/'/g, "'\"'\"'");
  const cmd = 'HOME=/home/' + student + " claude -p '" + safe + "' < /dev/null";
  const child = spawn('taskset', ['-c', String(core), 'su', '-s', '/bin/bash', student, '-c', cmd], {
    cwd: '/home/' + student + '/workspace',
    timeout: 120000,
  });

  let out = '', err = '';
  child.stdout.on('data', d => { out += d; });
  child.stderr.on('data', d => { err += d; });
  child.on('close', code => {
    res.json({ output: out.trim(), error: code !== 0 ? err.trim() : '', code, core, student });
  });
  child.on('error', e => { res.status(500).json({ error: e.message }); });
});

app.post('/api/reset', (req, res) => { res.json({ ok: true }); });

app.listen(3000, '0.0.0.0', () => { console.log('Server on 3000'); });
