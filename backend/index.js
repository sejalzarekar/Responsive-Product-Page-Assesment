const express = require('express')
const app = express();

// .env file config
require('dotenv').config()


// Middleware 

// allow cors origin
var cors = require('cors')
app.use(cors())


app.use(express.urlencoded({ extended: true }))

// json data parse
app.use(express.json())


// API created- endpoints
var userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)


app.get('/', (req, res) => {

    // return res.status(200).send("<h1>Server Is Up</h1>")

    return res.status(200).json({ message: 'Server is running ...' })
})

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
    console.log("Server is Running.....")
})


