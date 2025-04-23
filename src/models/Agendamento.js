// src/models/Agendamento.js
import db from '../config/database.js'

export async function listAgendamentosPorUsuario(userId) {
  const [rows] = await db.execute(
    'SELECT * FROM agendamentos WHERE user_id = ? ORDER BY data_hora DESC',
    [userId]
  )
  return rows
}

export async function createAgendamento({ user_id, nome_pet, raca, data_hora, observacoes, imagem_path }) {
  await db.execute(
    `INSERT INTO agendamentos
     (user_id, nome_pet, raca, data_hora, observacoes, imagem_path)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, nome_pet, raca, data_hora, observacoes, imagem_path]
  )
}
