const EventEmitter = require('events');
const readline = require('readline');


const emitter = new EventEmitter();


const tasks = {};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Comando> '
});


emitter.on('taskCreated', (name) => {
  console.log(`✅ Tarefa "${name}" criada.`);
});

emitter.on('taskCompleted', (name) => {
  console.log(`✅ Tarefa "${name}" concluída automaticamente.`);
});

emitter.on('taskCancelled', (name) => {
  console.log(`❌ Tarefa "${name}" cancelada.`);
});


function createTask(name) {
  if (tasks[name]) {
    console.log(`⚠️ Tarefa "${name}" já existe.`);
    return;
  }

  const timeout = setTimeout(() => {
    tasks[name].status = 'concluída';
    emitter.emit('taskCompleted', name);
  }, 3000);

  tasks[name] = {
    nome: name,
    status: 'pendente',
    timeout
  };

  emitter.emit('taskCreated', name);
}

function cancelTask(name) {
  const task = tasks[name];
  if (!task) {
    console.log(`⚠️ Tarefa "${name}" não existe.`);
    return;
  }

  if (task.status !== 'pendente') {
    console.log(`⚠️ Tarefa "${name}" já foi ${task.status}.`);
    return;
  }

  clearTimeout(task.timeout);
  task.status = 'cancelada';
  emitter.emit('taskCancelled', name);
}

function listTasks() {
  const nomes = Object.keys(tasks);
  if (nomes.length === 0) {
    console.log("📭 Nenhuma tarefa cadastrada.");
    return;
  }

  nomes.forEach((nome) => {
    console.log(`🔹 ${nome}: ${tasks[nome].status}`);
  });
}

console.log("Comandos disponíveis: create <nome>, cancel <nome>, list, exit");
rl.prompt();

rl.on('line', (line) => {
  const [command, ...args] = line.trim().split(' ');
  const name = args.join(' ');

  switch (command) {
    case 'create':
      if (name) {
        createTask(name);
      } else {
        console.log("❗ Use: create <nome>");
      }
      break;

    case 'cancel':
      if (name) {
        cancelTask(name);
      } else {
        console.log("❗ Use: cancel <nome>");
      }
      break;

    case 'list':
      listTasks();
      break;

    case 'exit':
      console.log("👋 Encerrando programa...");
      rl.close();
      process.exit(0);
      break;

    default:
      console.log("❌ Comando inválido.");
  }

  rl.prompt();
});
