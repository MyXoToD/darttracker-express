import dotenv from 'dotenv'
import express from 'express'
import db from './config/database.js'
dotenv.config()

const app = express()

app.use(express.json())

app.get('/users', async (req, res) => {
  const result = await db.query('SELECT * FROM users')
  res.send(result[0])
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const result = await db.query('SELECT * FROM users WHERE id = ?', [id])
  if (result[0].length === 0) {
    return res.status(404).send('User not found')
  }
  res.send(result[0][0])
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(process.env.PORT, () => {
  // console.log(process.env)
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
