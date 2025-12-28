import express from "express"
import mysql from "mysql2/promise"

const app = express()
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

app.get("/api/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1")
  res.json({ ok: true })
})

app.listen(process.env.PORT, () => {
  console.log(`Backend listening on port ${process.env.PORT}`)
})
