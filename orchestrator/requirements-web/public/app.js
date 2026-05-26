// ============================================================
// Requirements Web — 프론트엔드 로직
// ============================================================

const API = '/api/requirements';
const $input = document.getElementById('req-input');
const $addBtn = document.getElementById('add-btn');
const $list = document.getElementById('req-list');
const $counter = document.getElementById('counter');

let items = [];

const STATUS_LABEL = {
  pending: '⏳ 대기',
  in_progress: '🔄 처리 중',
  done: '✅ 완료'
};

function render() {
  $list.innerHTML = '';
  for (const r of items) {
    const li = document.createElement('li');
    li.className = 'req-item';

    const header = document.createElement('div');
    header.className = 'req-header';

    const idSpan = document.createElement('span');
    idSpan.className = 'req-id';
    idSpan.textContent = r.id;
    header.appendChild(idSpan);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', `삭제: ${r.id}`);
    delBtn.addEventListener('click', () => deleteReq(r.id));
    header.appendChild(delBtn);

    li.appendChild(header);

    const text = document.createElement('div');
    text.className = 'req-text';
    text.textContent = r.text;
    li.appendChild(text);

    const meta = document.createElement('div');
    meta.className = 'req-meta';

    const badge = document.createElement('span');
    badge.className = `status-badge status-${r.status}`;
    badge.textContent = STATUS_LABEL[r.status] || r.status;
    meta.appendChild(badge);

    if (r.category) {
      const cat = document.createElement('span');
      cat.className = 'agent-tag';
      cat.textContent = `분류: ${r.category}`;
      meta.appendChild(cat);
    }

    if (Array.isArray(r.assignedAgents) && r.assignedAgents.length) {
      for (const agent of r.assignedAgents) {
        const tag = document.createElement('span');
        tag.className = 'agent-tag';
        tag.textContent = `🤖 ${agent}`;
        meta.appendChild(tag);
      }
    }

    const time = document.createElement('span');
    time.style.marginLeft = 'auto';
    time.style.fontSize = '11px';
    time.style.color = '#aaa';
    time.textContent = new Date(r.created).toLocaleString('ko-KR');
    meta.appendChild(time);

    li.appendChild(meta);

    if (r.result) {
      const result = document.createElement('div');
      result.className = 'req-result';
      result.textContent = r.result;
      li.appendChild(result);
    }

    $list.appendChild(li);
  }
  $counter.textContent = `전체 ${items.length}개 · 대기 ${items.filter(r => r.status === 'pending').length}개 · 완료 ${items.filter(r => r.status === 'done').length}개`;
}

async function loadItems() {
  try {
    const res = await fetch(API);
    items = await res.json();
    render();
  } catch (e) {
    console.error(e);
  }
}

async function addReq() {
  const text = $input.value.trim();
  if (!text) return;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('추가 실패');
    const newItem = await res.json();
    items.push(newItem);
    $input.value = '';
    render();
    $input.focus();
  } catch (e) {
    console.error(e);
    alert('요구사항 추가에 실패했습니다.');
  }
}

async function deleteReq(id) {
  if (!confirm(`정말 삭제하시겠습니까?\n${id}`)) return;
  try {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    items = items.filter(r => r.id !== id);
    render();
  } catch (e) {
    console.error(e);
  }
}

$addBtn.addEventListener('click', addReq);
$input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) addReq();
});

// 5초마다 자동 새로고침 (Claude가 상태를 갱신했을 수 있음)
loadItems();
setInterval(loadItems, 5000);
