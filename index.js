require('custom-env').env('dev')
const {discordBot} = require('./controllers/')
const express = require('express');

const app = express()
app.use(express.json())
const port = 3000;


app.listen(port, () => {
    console.log('listenening to http:/localhost:'+process.env.PORT);
})

app.get('/', (req, res) => {
    res.json({
        message:'Index.js'
    })
})

app.use('/discord', discordBot)
