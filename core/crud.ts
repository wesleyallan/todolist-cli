import fs from 'fs';
import { v4 as uuid } from 'uuid';

console.log("[CRUD]");
const DB_FILE_PATH = './core/db';

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
};

function create(content: string) {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false
  }

  const todos = [
    ...read(),
    todo
  ]

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
    todos: todos ?? [],
    dogs: []
  }, null, 2));
  return content;
}

function read() {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) return [];
  return db.todos;
}

function clearDb() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// SIMULAÇÃO

clearDb();
create("Primeira TODO");
create("Segunda TODO!");
console.log(read());
