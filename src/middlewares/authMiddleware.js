import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header) return res.status(401).json({ error: 'Token ausente' })

  const [ type, token ] = header.split(' ')
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Formato de token inválido' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.id
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
