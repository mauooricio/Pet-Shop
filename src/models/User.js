// src/models/User.js
import db from '../config/database.js'

// Busca um usuário pelo username
export async function findUserByUsername(username) {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE email = ?',  // note: usamos email como login
    [username]
  )
  return rows[0] ?? null
}

// Insere um novo usuário
export async function createUser(nome, email, senha_hash) {
  await db.execute(
    'INSERT INTO users (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senha_hash]
  )
}
