const db = require('../data/db-config.js');

const get = async (userID) => {
  const expenses = await db('expense')
    .select('*')
    .where({ user_id: userID })

  return expenses
}

const add = async (userID, expense) => {
  expense.user_id = userID
  await db('expense').insert(expense)
}

const del = async (expenseID) => {
  const deletedExp = await db('expense').delet().where({id:expenseID})
  console.log('**********deletedExpModel********', deletedExp)
  return deletedExpense
}

module.exports = {
  get,
  add,
  del
}