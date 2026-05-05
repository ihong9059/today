const express = require('express');
const { WebSocketServer } = require('ws');
const pty = require('node-pty');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Web Terminal</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.min.css">
  <style>
    body { margin: 0; background: #1e1e1e; }
    #terminal { width: 100vw; height: 100vh; }
  </style>
</head>
<body>
  <div id="terminal"></div>
  <script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.min.js"></script>
  <script>
    const term = new Terminal({ fontSize: 16, cursorBlink: true });
    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.open(document.getElementById('terminal'));
    fitAddon.fit();

    const ws = new WebSocket('ws://' + location.host);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }));
    };
    ws.onmessage = (e) => term.write(e.data);
    ws.onclose = () => term.write('\\r\\n[Disconnected]\\r\\n');

    term.onData(data => ws.send(JSON.stringify({ type: 'input', data })));
    term.onResize(({ cols, rows }) => ws.send(JSON.stringify({ type: 'resize', cols, rows })));
    window.addEventListener('resize', () => fitAddon.fit());
  </script>
</body>
</html>`);
});

wss.on('connection', (ws) => {
  const shell = pty.spawn('bash.exe', [], {
    name: 'xterm-256color',
    cwd: process.env.HOME || process.env.USERPROFILE,
    env: process.env,
  });

  shell.onData(data => ws.send(data));

  ws.on('message', (msg) => {
    try {
      const { type, data, cols, rows } = JSON.parse(msg);
      if (type === 'input') shell.write(data);
      if (type === 'resize') shell.resize(cols, rows);
    } catch (e) {}
  });

  ws.on('close', () => shell.kill());
  shell.onExit(() => ws.close());
});

const PORT = 8022;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web Terminal: http://100.82.193.50:${PORT}`);
});
