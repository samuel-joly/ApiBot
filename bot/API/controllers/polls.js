const express = require('express')
const {setRoleAtVote, removeRoleAtUnvote} = require('../Utils/')
const router = express.Router()
const {PollMaker} = require('../models/')

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
    PollMaker('titre','description', ["Premiere Annee", "Seconde Année", "Troixieme année"],
              {
                  channel:process.env.BOT_CHANNEL,
                  event:{
                      onCollect: {
                          function:setRoleAtVote,
                          args:["1ere", "2eme", "3eme"]
                      },
                      onRemove:{
                          function:removeRoleAtUnvote,
                          args:["1ere", "2eme", "3eme"]
                      }
                  }
              })
    res.json({
        message:'yes'
    })
})

module.exports = router
