const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
// const sqlite3 = require('sqlite3').verbose()
const userRouter = require('./routes/userRouter')
const productsRouter = require('./routes/productsRouter')

require('./Auth/auth')
const cookieParser = require('cookie-parser')

const dbName = 'products.db'
// const db = new sqlite3.Database(dbName)

const port = 3001

const app = express()

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	cors({
		origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
		credentials: true,
	})
)
app.use(cookieParser())
app.use('/products', productsRouter)
app.use('/user', userRouter)

//mongoose config

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://localhost/DogClubJs')
	.then(() => {
		console.log('successfully connected to mongodb')
	})
	.catch(err => console.log(err))

// db.run('INSERT INTO products(text) VALUES (?)', [req.body.text], err => {
// 	if (err) {
// 		return this.resource.status(500).json({ error: err.message })
// 	}
// 	return res.status(201).json({ id: this.lastID })
// })

app.listen(port, () => console.log(`Server running on port ${port}`))
module.exports = app
