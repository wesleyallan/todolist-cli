const fs = require('fs');

console.log("[CRUD]");
const DB_FILE_PATH = './core/db';

function create(content) {
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// SIMULAÇÃO

console.log(create("Hello World!"));
