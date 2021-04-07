const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message:'Welcome to discord app'
    })
})

const polls = require('./polls.js')
router.use('/polls', polls)

module.exports = router
