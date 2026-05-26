// ============================================================
// Todo Web — 프론트엔드 로직
// 작성: frontend-builder 서브에이전트
// ============================================================

const API = '/api/todos';
const $input = document.getElementById('todo-input');
const $addBtn = document.getElementById('add-btn');
const $list = document.getElementById('todo-list');
const $counter = document.getElementById('counter');

let todos = [];

// ── 렌더링 ─────────────────────────────────────────────
function render() {
  $list.innerHTML = '';
  for (const todo of todos) {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.done ? ' done' : '');
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.setAttribute('aria-label', `완료 토글: ${todo.text}`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', `삭제: ${todo.text}`);
    delBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, text, delBtn);
    $list.appendChild(li);
  }
  updateCounter();
}

function updateCounter() {
  const total = todos.length;
  const done = todos.filter(t => t.done).length;
  $counter.textContent = `전체 ${total}개 / 완료 ${done}개`;
}

// ── API 호출 ───────────────────────────────────────────
async function loadTodos() {
  try {
    const res = await fetch(API);
    todos = await res.json();
    render();
  } catch (e) {
    console.error('목록 로드 실패:', e);
  }
}

async function addTodo() {
  const text = $input.value.trim();
  if (!text) return;
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('추가 실패');
    const newTodo = await res.json();
    todos.push(newTodo);
    $input.value = '';
    render();
    $input.focus();
  } catch (e) {
    console.error(e);
    alert('할일 추가에 실패했습니다.');
  }
}

async function toggleTodo(id, done) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done })
    });
    if (!res.ok) throw new Error('수정 실패');
    const updated = await res.json();
    todos = todos.map(t => t.id === id ? updated : t);
    render();
  } catch (e) {
    console.error(e);
  }
}

async function deleteTodo(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok && res.status !== 204) throw new Error('삭제 실패');
    todos = todos.filter(t => t.id !== id);
    render();
  } catch (e) {
    console.error(e);
  }
}

// ── 이벤트 ─────────────────────────────────────────────
$addBtn.addEventListener('click', addTodo);
$input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

// 초기 로드
loadTodos();
