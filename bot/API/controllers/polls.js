const express = require('express')
const checkProp = require('../Utils/').checkProp
const router = express.Router()
const {PollMaker} = require('../models/')

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
  PollMaker(req.body.pollName,req.body.purpose, req.body.voteArray, req.body?.options)
  res.json({
    message:'yes'
  })
})

module.exports = router

/*
const opotionnalArgs = {
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
}
*/
