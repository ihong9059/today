import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TASKS_FILE = join(__dirname, '..', 'tasks.json');

const DEFAULT_DATA = {
  tasks: [],
  nextId: 1
};

export function loadTasks() {
  if (!existsSync(TASKS_FILE)) {
    saveTasks(DEFAULT_DATA);
    return DEFAULT_DATA;
  }

  const content = readFileSync(TASKS_FILE, 'utf-8');
  return JSON.parse(content);
}

export function saveTasks(data) {
  writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function getNextId() {
  const data = loadTasks();
  return data.nextId;
}
