import fs from 'fs';
import { v4 as uuid } from 'uuid';

const DB_FILE_PATH = './core/db';

export type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
};

export function create(content: string): Todo {
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

  return todo;
}

export function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) return [];
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  let todoUpdated;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      todoUpdated = Object.assign(currentTodo, partialTodo);
    };
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos}, null, 2));
  if (!todoUpdated) throw new Error("Please, provider another ID!");
  return todoUpdated;
};

export function updateContentById(id: UUID, content: string): Todo {
  return update(id, {content});
};

export function updateDoneById(id: UUID, done: boolean): Todo {
  return update(id, {done});
}

export function deleteById(id: UUID) {
  const todos = read();
  const todosWithoutOne = todos.filter((currentTodo) => {
    if (currentTodo.id === id) return false;
    return true;
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({todos: todosWithoutOne}, null, 2));
};

function clearDb() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

