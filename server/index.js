const express = require('express')
const session = require('express-session')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
}))

app.use(express.json())

app.use(session({
    secret: "davidrivkaayalaraudi=)",
    name: "session",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // month
    }
}))

app.use('/users', require('./routes/users'))
app.use('/vacations', require('./routes/vacations'))
app.use('/follow', require('./routes/follow'))
// app.use('/uploadImg', require('./routes/uploadImg'))
app.use('/reports', require('./routes/reports'))

app.listen(4000) 