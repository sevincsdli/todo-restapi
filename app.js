const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const todoRoute = require('./src/routers/todoRouter.js')
const db=require('./src/config/dbconnect.js')
app.use(express.json())
app.use('/', todoRoute)
app.get('/', (req, res) =>{
    res.send('Home')
})
app.listen(port, () => {
    console.log(`Server is running ${port}`);
})