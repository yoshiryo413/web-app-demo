// 状態
let todos = load();
let filter = 'all';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const empty = document.getElementById('empty');
const count = document.getElementById('count');
const filters = document.getElementById('filters');
const clearDone = document.getElementById('clear-done');

// 保存・読み込み（localStorage）
function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem('todos')) || [];
  } catch {
    return [];
  }
}

// 描画
function render() {
  const visible = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  list.textContent = '';

  visible.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo' + (todo.done ? ' is-done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo__checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => toggle(todo.id));

    const text = document.createElement('span');
    text.className = 'todo__text';
    text.textContent = todo.text;
    text.addEventListener('click', () => toggle(todo.id));

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'todo__delete';
    del.textContent = '×';
    del.title = '削除';
    del.addEventListener('click', () => remove(todo.id));

    li.append(checkbox, text, del);
    list.append(li);
  });

  empty.hidden = visible.length > 0;
  const remaining = todos.filter((todo) => !todo.done).length;
  count.textContent = `${remaining} 件の未完了 / 全 ${todos.length} 件`;
}

// 操作
function add(text) {
  todos.push({ id: Date.now(), text, done: false });
  save();
  render();
}

function toggle(id) {
  const todo = todos.find((item) => item.id === id);
  if (todo) todo.done = !todo.done;
  save();
  render();
}

function remove(id) {
  todos = todos.filter((item) => item.id !== id);
  save();
  render();
}

// イベント
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  add(text);
  input.value = '';
  input.focus();
});

filters.addEventListener('click', (event) => {
  const button = event.target.closest('.filters__item');
  if (!button) return;
  filter = button.dataset.filter;
  filters.querySelectorAll('.filters__item').forEach((item) => {
    item.classList.toggle('is-active', item === button);
  });
  render();
});

clearDone.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.done);
  save();
  render();
});

render();
