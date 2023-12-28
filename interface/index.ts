import readline from 'readline';
import {
  create,
  read,
  updateDoneById,
  updateContentById,
  deleteById,
  type UUID
} from '../core/crud';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log('-'.repeat(9), 'To-Do', '-'.repeat(8));
  console.log('| 0. List To-Dos       |');
  console.log('| 1. Add To-Do         |');
  console.log('| 2. Finish To-Do      |');
  console.log('| 3. Update To-Do      |');
  console.log('| 4. Delete To-Do      |');
  console.log('| 9. Quit              |');
  console.log('-'.repeat(24));
};

function listTodos() {
  const todos = read();
  console.log('-'.repeat(47), 'To-Dos', '-'.repeat(48));
  todos.forEach((todo) => {
    console.log(`| [${todo.done ? 'X' : ' '}] | ${todo.content.padEnd(50)} | ID: ${todo.id} |`);
  });
  console.log('-'.repeat(103));
};

function createTodo() {
  rl.question('What do you want to do? ', (content) => {
    const todo = create(content);
    console.log(`To-Do created: ${JSON.stringify(todo)}`);
    showMenu();
    askOption();
  });
};

function finishTodo() {
  rl.question('What is the ID of the To-Do? ', (id: UUID) => {
    const todo = updateDoneById(id, true);
    console.log(`To-Do finished: ${JSON.stringify(todo)}`);
    showMenu();
    askOption();
  });
};

function updateTodo() {
  rl.question('What is the ID of the To-Do? ', (id: UUID) => {
    rl.question('What is the new content? ', (content) => {
      const todo = updateContentById(id, content);
      console.log(`To-Do updated: ${JSON.stringify(todo)}`);
      showMenu();
      askOption();
    });
  });
};

function deleteTodo() {
  rl.question('What is the ID of the To-Do? ', (id: UUID) => {
    deleteById(id);
    console.log(`To-Do deleted: ${id}`);
    showMenu();
    askOption();
  });
}

function askOption() {
  rl.question('Choose an option: ', (option) => {
    switch (option) {
      case '0':
        listTodos();
        showMenu();
        askOption();
        break;
      case '1':
        createTodo();
        break;
      case '2':
        finishTodo();
        break;
      case '3':
        updateTodo();
        break;
      case '4':
        deleteTodo();
        break;
      case '9':
        rl.close();
        break;
      default:
        console.log('Invalid option!');
        showMenu();
        askOption();
        break;
    }
  });
}

showMenu();
askOption();
