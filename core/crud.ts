import fs from 'fs';

console.log("[CRUD]");
const DB_FILE_PATH = './core/db';

function create(content: string) {
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// SIMULAÇÃO

console.log(create("Hello World!"));
