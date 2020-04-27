const express = require("express");
const router = express.Router();

const paramCheck = require('../users/paramCheck')
const ExpensesModel = require('./expenseModel')

router.get('/exp', paramCheck.authorize, async (req, res) => {
  try {
    const expenses = await ExpensesModel.getUnassigned(req.userID)
    console.log('*********ExpensesRouterGetExpenses************', expenses)
    res.json(expenses)

  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/byBlock', paramCheck.authorize, async (req, res) => {
  try {
    const expenses = await ExpensesModel.getByBlock(req.params.id, req.userID)
    res.json(expenses)
  } catch (error) {
    console.log('byBlockError', error)
  }
})

router.delete("/:id", paramCheck.userExists, async (req, res) => {
  console.log('delete req.params', req.params)

  const deletedExp = await ExpensesModel.del(req.params.id)

  // newExpenses = expenses.filter(exp => exp.id != req.params.id)
  // console.log(`before: ${JSON.stringify(expenses)}, after: ${JSON.stringify(newExpenses)}`)
  // expenses = newExpenses

  res.json(deletedExp)
})

router.put('/:id/assignBlock', paramCheck.authorize, async (req, res) => {
  console.log('blockAssign', req.params.id, req.body.blockID)
  try {
    await ExpensesModel.assignBlock(req.params.id, req.body.blockID)
    const newExpenses = await ExpensesModel.getUnassigned(req.userID)
    res.json(newExpenses)
  } catch (error) {
    console.log('assignBlockError', error)
  }
})

router.put("/:id/unassign", paramCheck.authorize, async(req, res) => {
  console.log('unassignBlock', req.params.id)
  try {
    await ExpensesModel.unassignExpense(req.params.id)
    const newExpenses = await ExpensesModel.getUnassigned(req.userID)
    res.json(newExpenses)
  } catch (error) {
    console.log(error)
  }
})

router.post(
  "/exp",
  paramCheck.authorize,
  async (req, res) => {
    try {
      console.log('***************expRoutePostReqBOdy***********', req.body)
      await ExpensesModel.add(req.userID, req.body)
      // const newExpenses = await ExpensesModel.get(req.userID)
      const newExpenses = await ExpensesModel.getUnassigned(req.userID)

      res.json(newExpenses)
    } catch (e) {
      console.log(e)
    }
  })

module.exports = router;
