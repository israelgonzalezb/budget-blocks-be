const express = require('express')
const router = express.Router()
const paramCheck = require('../users/paramCheck')
const BlockModel = require('./blocksModel')

const blocks = [
  {name: "food", total: 0, limit: 100, id: 1, ownExpenses: [] },
  {name: "fun", total: 0, limit: 200, id: 2, ownExpenses: [] },
  {name: "cell phone", total: 0, limit: 10, id: 3, ownExpenses: [] },

]

router.get('/blk', paramCheck.authorize, async (req, res) => {
  try{
    const blocks = await BlockModel.get(req.userID)
    res.json(blocks)
  }catch(e){
    console.log('getBLockError', e)
    res.json({error:"Internal server error"}).status(500)
  }
})

// Add Block to users blocks
router.post('/blk', paramCheck.authorize, async (req, res) => {
  try {
    console.log('***************blkRoutePostReqBOdy***********', req.body)
    await BlockModel.add(req.userID, req.body)
    const newBlocks = await BlockModel.get(req.userID)
    res.json(newBlocks)

  } catch (e) {
    console.log(e)
  }
})

router.post('/:userID', (req, res) => {
  console.log('*******blocksAddExpBody******', req.body)

  blocks.forEach(block => {
    if(block.id == req.body.block.id){
      block.ownExpenses.push(req.block.expense)
    }
  })

  res.json(blocks)
})

router.post('/')
module.exports = router