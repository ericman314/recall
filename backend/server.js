import express from "express"
import mysql from "mysql2/promise"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const config = JSON.parse(readFileSync(resolve(__dirname, "config.json"), "utf8"))

const app = express()
app.use(express.json())

const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
})

app.get("/api/health", async (req, res) => {
  const [rows] = await pool.query("SELECT 1")
  res.json({ ok: true })
})

const frontendDist = resolve(__dirname, "../frontend/dist")
app.use(express.static(frontendDist))
app.use((req, res) => {
  res.sendFile(resolve(frontendDist, "index.html"))
})

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}`)
})
