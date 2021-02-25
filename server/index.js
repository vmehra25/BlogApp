const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config()

const db = require('./db/blogDB')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const blogRouter = require('./routes/blogRoute')
const authRouter = require('./routes/authentication')
const likeRouter = require('./routes/likeRoute')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Hello there')
})

app.use('/blog', blogRouter)
app.use('/auth', authRouter)
app.use('/like', likeRouter)

app.listen(port, () => {
    console.log(`server started at port:${port}`)
})
