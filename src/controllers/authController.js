import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbPromise from '../config/database.js'

export async function register(req, res) {
  const { nome, email, senha } = req.body
  if (!nome || !email || !senha) return res.status(400).json({ error: 'Campos obrigatórios faltando' })

  const senha_hash = await bcrypt.hash(senha, 10)
  const db = await dbPromise
  await db.execute(
    'INSERT INTO users (nome, email, senha_hash) VALUES (?, ?, ?)',
    [nome, email, senha_hash]
  )
  res.status(201).json({ message: 'Usuário criado' })
}

export async function login(req, res) {
  const { email, senha } = req.body
  if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios' })

  const db = await dbPromise
  const [ rows ] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
  const user = rows[0]
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })

  const match = await bcrypt.compare(senha, user.senha_hash)
  if (!match) return res.status(401).json({ error: 'Credenciais inválidas' })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
}
