const express = require("express");
const router = express.Router();

const paramCheck = require('../users/paramCheck')
const ExpensesModel = require('./expenseModel')

let expenses = [{
  id: 1,
  name: "jjj",
  amount: 70
},
{
  id: 2,
  name: "vvv",
  amount: 11
},
{
  id: 3,
  name: "sdfsdf",
  amount: 110
}]

router.get('/exp', paramCheck.authorize, async (req, res) => {
  try {
    const expenses = await ExpensesModel.get(req.userID)
    console.log('*********ExpensesRouterGetExpenses************', expenses)
    res.json(expenses)

  } catch (e) {
    console.log(e)
  }
})

router.delete("/:id", paramCheck.userExists, (req, res) => {
  console.log('delete req.params', req.params)

  const deletedExp = ExpensesModel.del(req.params.id)

  // newExpenses = expenses.filter(exp => exp.id != req.params.id)
  // console.log(`before: ${JSON.stringify(expenses)}, after: ${JSON.stringify(newExpenses)}`)
  // expenses = newExpenses

  res.json(deletedExp)
})


router.post(
  "/exp",
  paramCheck.authorize,
  async (req, res) => {
    try {
      console.log('***************expRoutePostReqBOdy***********', req.body)

      await ExpensesModel.add(req.userID, req.body)
      const newExpenses = await ExpensesModel.get(req.userID)
      
      res.json(newExpenses)
    } catch (e) {
      console.log(e)
    }

  })
module.exports = router;
