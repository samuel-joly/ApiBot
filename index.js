require('custom-env').env('dev')
require('./bot/init_bot.js')
const {discordBot} = require('./controllers/')
const express = require('express');

const app = express()
app.use(express.json())

const port = process.env.PORT;
const host = process.env.HOST
app.listen(port,host, () => {
    console.log('listenening to http://'+host+':'+port);
})

app.get('/', (req, res) => {
    res.json({
        message:'Index.js'
    })
})

app.post('/hookers', (req, res) => {
    console.log(req.body);
    //commit
});

app.use('/discord', discordBot)
