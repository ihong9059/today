#!/usr/bin/env node

import { Command } from 'commander';
import { loadTasks, saveTasks } from './storage.js';

const program = new Command();

program
  .name('task')
  .description('Simple CLI task tracker')
  .version('1.0.0');

program
  .command('add <text>')
  .description('Add a new task')
  .action((text) => {
    const data = loadTasks();
    const newTask = {
      id: data.nextId,
      text: text,
      done: false,
      createdAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    data.nextId++;
    saveTasks(data);
    console.log(`Added: [${newTask.id}] ${newTask.text}`);
  });

program
  .command('list')
  .description('List all tasks')
  .action(() => {
    const data = loadTasks();
    if (data.tasks.length === 0) {
      console.log('No tasks yet. Add one with: task add "your task"');
      return;
    }
    data.tasks.forEach(task => {
      const checkbox = task.done ? '[x]' : '[ ]';
      console.log(`${checkbox} ${task.id}. ${task.text}`);
    });
  });

program
  .command('done <id>')
  .description('Mark a task as done')
  .action((id) => {
    const taskId = parseInt(id, 10);
    const data = loadTasks();
    const task = data.tasks.find(t => t.id === taskId);

    if (!task) {
      console.log(`Task #${id} not found`);
      return;
    }

    task.done = true;
    saveTasks(data);
    console.log(`Completed: [${task.id}] ${task.text}`);
  });

program.parse();
