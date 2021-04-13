const polls = require('../bot/API/controllers/')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message:'Welcome to discord app'
    })
})

router.use('/polls', polls)

module.exports = router
