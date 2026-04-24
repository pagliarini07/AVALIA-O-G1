const Database = require('better-sqlite3');
const db = new Database('produtoras.db');
const db = new Database('jogos.db');
const db = new Database('usuarios.db');
const db = new Database('biblioteca.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS produtoras (
    nome TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    website TEXT NOT NULL    
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS jogos (
    titulo TEXT NOT NULL,
    preco REAL NOT NULL,
    id_produtora INTEGER NOT NULL FOREIGN KEY (id_produtora) REFERENCES produtoras(rowid)
    )
`);   

db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL
    )
`);



console.log('Banco de dados conectado!');
module.exports = db;