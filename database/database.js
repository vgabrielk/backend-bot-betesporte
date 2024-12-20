const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db'); // Usa banco em memória, pode trocar para um arquivo, ex: './users.db'

// Inicializa a tabela de usuários
db.serialize(() => {
  // Criando a tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Criando a tabela de contas
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      cpf TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      celular TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

module.exports = db;
