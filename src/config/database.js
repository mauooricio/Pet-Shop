import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export default (async () => {
  const connection = await mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })
  console.log('✅ MySQL conectado em', process.env.DB_NAME)
  return connection
})()
