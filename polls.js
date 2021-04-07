const DiscordBot = require('./DiscordBotAPI.js')
const express = require('express')
const router = express.Router()
const former = new DiscordBot()

function checkProp(req, requiredProp, maxLength = 0) {
    var missingProperty = []
    for(prop of requiredProp) {
        if(!req.body.hasOwnProperty(prop)) {
            missingProperty.push(prop)
        }
    }

    if(missingProperty.length != 0) {
        return `Missing properties: ${missingProperty.join(' - ')}`
    }else {
        return true
    }
}

router.post('/', (req,res, next) => {
    const requireValidation = checkProp(req,['pollName', 'purpose'])
    if(requireValidation != true){
        res.json({
            message:requireValidation
        })
    } else {
        next()
    }
}, (req,res)=>{
    const { pollName, purpose } = req.body
    former.makePoll(pollName, purpose)
    res.json({
        message:'yes'
    })
    former.login()
})

module.exports = router
