import dbPromise from '../config/database.js'

export async function listar(req, res) {
  const db = await dbPromise
  const [ rows ] = await db.execute(
    'SELECT * FROM agendamentos WHERE user_id = ?', 
    [req.userId]
  )
  res.json(rows)
}

export async function criar(req, res) {
  const { nome_pet, raca, data_hora, observacoes } = req.body
  const imagem_path = req.file?.path
  if (!nome_pet || !data_hora || !imagem_path) 
    return res.status(400).json({ error: 'nome_pet, data_hora e imagem são obrigatórios' })

  const db = await dbPromise
  await db.execute(
    `INSERT INTO agendamentos 
     (user_id,nome_pet,raca,data_hora,observacoes,imagem_path) 
     VALUES (?,?,?,?,?,?)`,
    [req.userId, nome_pet, raca||null, data_hora, observacoes||null, imagem_path]
  )
  res.status(201).json({ message: 'Agendamento criado!' })
}

export async function atualizar(req, res) {
  const { id } = req.params
  const { nome_pet, raca, data_hora, observacoes } = req.body
  const imagem_path = req.file?.path
  if (!nome_pet || !data_hora) 
    return res.status(400).json({ error: 'nome_pet e data_hora são obrigatórios' })

  const db = await dbPromise
  await db.execute(
    `UPDATE agendamentos 
      SET nome_pet=?, raca=?, data_hora=?, observacoes=?, 
          imagem_path=COALESCE(?,imagem_path)
      WHERE id=? AND user_id=?`,
    [nome_pet, raca||null, data_hora, observacoes||null, imagem_path||null, id, req.userId]
  )
  res.json({ message: 'Agendamento atualizado!' })
}

export async function excluir(req, res) {
  const { id } = req.params
  const db = await dbPromise
  await db.execute(
    'DELETE FROM agendamentos WHERE id=? AND user_id=?',
    [id, req.userId]
  )
  res.json({ message: 'Agendamento removido!' })
}
