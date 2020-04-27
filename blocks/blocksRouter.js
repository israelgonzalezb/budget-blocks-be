const express = require('express')
const router = express.Router()
const paramCheck = require('../users/paramCheck')
const BlockModel = require('./blocksModel')
const ExpensesModel = require('../expenses/expenseModel')

router.get('/blk', paramCheck.authorize, async (req, res) => {
  try {
    const blocks = await BlockModel.get(req.userID)
    const arr = []
    const obj = {}
    blocks.forEach(block => arr.push(ExpensesModel.getByBlock(block.id, req.userID)))
    const blockExpenses = await Promise.all(arr)
    // const blocksAndOwnExpenses = blocks.map((block, index)=>{
    //   return {
    //     ...block,
    //     ownExpenses: blockExpenses[index]
    //   }
    // })
    blocks.forEach((block, index) => {
      obj[block.id] = blockExpenses[index]
    })

    const blocksAndOwnExpenses = {
      blocks,
      blockExpenses:obj
    }
    console.log('getBlocks', blocksAndOwnExpenses)

    res.json(blocksAndOwnExpenses)
  } catch (e) {
    console.log('getBLockError', e)
    res.json({ error: "Internal server error" }).status(500)
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
    if (block.id == req.body.block.id) {
      block.ownExpenses.push(req.block.expense)
    }
  })

  res.json(blocks)
})

router.get('/:id', paramCheck.authorize, async (req, res) => {
  console.log('getByBLockid', req.params.id)
  try {
    const expenses = await ExpensesModel.getByBlock(req.params.id, req.userID)
    res.json(expenses)
  } catch (error) {
    console.log('getBYBLockidError', error)
  }
})

router.delete('/:id', paramCheck.authorize, async (req, res ) => {
  console.log('delete bock', req.params.id)
  try {
    await BlockModel.del(req.params.id)
    const newBlocks = await BlockModel.get(req.userID)
    res.json(newBlocks)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router