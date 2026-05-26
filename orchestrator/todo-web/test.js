// ============================================================
// Todo Web — API 통합 테스트
// 작성: test-writer 서브에이전트
// 외부 의존성 0 (Node.js 내장 http + assert만 사용)
// ============================================================

const http = require('http');
const assert = require('assert');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3100; // 테스트 전용 포트 (개발 서버와 충돌 방지)
const HOST = 'localhost';

// ── HTTP 헬퍼 ──────────────────────────────────────────
function request(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: HOST,
      port: PORT,
      path: urlPath,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let chunks = '';
      res.on('data', c => chunks += c);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: chunks ? (() => { try { return JSON.parse(chunks); } catch { return chunks; } })() : null
        });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ── 서버 부팅 대기 ─────────────────────────────────────
async function waitForServer(retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await request('GET', '/api/todos');
      if (r.status === 200) return;
    } catch (e) { /* 아직 안 뜸 */ }
    await sleep(200);
  }
  throw new Error('서버가 시간 내에 응답하지 않음');
}

// ── 테스트 시나리오 ────────────────────────────────────
async function runTests() {
  console.log('\n🧪 Todo Web API 통합 테스트 시작\n');

  // 1. 초기 목록
  console.log('  [1/6] GET /api/todos (초기)');
  const r1 = await request('GET', '/api/todos');
  assert.strictEqual(r1.status, 200, 'GET 200 기대');
  assert.ok(Array.isArray(r1.body), '배열 반환 기대');
  console.log(`       → ${r1.body.length}개 (OK)`);

  // 2. 추가
  console.log('  [2/6] POST /api/todos {text: "테스트 항목"}');
  const r2 = await request('POST', '/api/todos', { text: '테스트 항목' });
  assert.strictEqual(r2.status, 201, 'POST 201 기대');
  assert.ok(r2.body.id, 'id 부여 기대');
  assert.strictEqual(r2.body.text, '테스트 항목');
  assert.strictEqual(r2.body.done, false);
  const newId = r2.body.id;
  console.log(`       → id=${newId} (OK)`);

  // 3. 목록 확인
  console.log('  [3/6] GET /api/todos (추가 후)');
  const r3 = await request('GET', '/api/todos');
  assert.ok(r3.body.some(t => t.id === newId), '새 항목 포함 기대');
  console.log(`       → ${r3.body.length}개 (OK)`);

  // 4. 토글
  console.log(`  [4/6] PUT /api/todos/${newId} {done: true}`);
  const r4 = await request('PUT', `/api/todos/${newId}`, { done: true });
  assert.strictEqual(r4.status, 200);
  assert.strictEqual(r4.body.done, true);
  console.log(`       → done=true (OK)`);

  // 5. 삭제
  console.log(`  [5/6] DELETE /api/todos/${newId}`);
  const r5 = await request('DELETE', `/api/todos/${newId}`);
  assert.strictEqual(r5.status, 204);
  console.log(`       → 204 (OK)`);

  // 6. 삭제 확인
  console.log('  [6/6] GET /api/todos (삭제 후)');
  const r6 = await request('GET', '/api/todos');
  assert.ok(!r6.body.some(t => t.id === newId), '삭제된 항목 없음 기대');
  console.log(`       → ${r6.body.length}개 (OK)`);

  // 보너스: 잘못된 입력
  console.log('  [+] POST /api/todos {} (잘못된 입력)');
  const rErr = await request('POST', '/api/todos', {});
  assert.strictEqual(rErr.status, 400, '빈 입력은 400 기대');
  console.log('       → 400 (OK)');

  console.log('\n✅ 모든 테스트 통과 (7/7)\n');
}

// ── 메인 ───────────────────────────────────────────────
(async () => {
  // 서버를 child process로 기동
  const serverPath = path.join(__dirname, 'server.js');
  const child = spawn(process.execPath, [serverPath], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  child.stdout.on('data', d => process.stdout.write(`[server] ${d}`));
  child.stderr.on('data', d => process.stderr.write(`[server-err] ${d}`));

  let exitCode = 0;
  try {
    await waitForServer();
    await runTests();
  } catch (e) {
    console.error('\n❌ 테스트 실패:', e.message);
    exitCode = 1;
  } finally {
    child.kill();
    // child가 죽을 시간 잠시
    await sleep(100);
    process.exit(exitCode);
  }
})();
