const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser') 
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes/index.js')


dotenv.config()

const PORT = process.env.PORT || 4999
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(express.static('uploads'))

const start = async() => {
    try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.t2yr8af.mongodb.net/?retryWrites=true&w=majority`)

          app.listen(PORT, () => console.log(`app up on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()