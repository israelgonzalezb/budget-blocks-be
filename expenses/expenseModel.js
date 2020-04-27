const db = require('../data/db-config.js');

const get = async (userID) => {
  const expenses = await db('expense')
    .select('*')
    .where({ user_id: userID })

  return expenses
}

const getByBlock = async (blockID, userID) => {
  const expenses = await db('expense')
    .select('*')
    .where({ user_id: userID, block_id: blockID })

  return expenses
}

const getUnassigned = async (userID) => {
  const expenses = await db('expense')
    .select('*')
    .where({ user_id: userID, block_id: null })

  return expenses
}

const add = async (userID, expense) => {
  expense.user_id = userID
  await db('expense').insert(expense)
}

const del = async (id) => {
  console.log('**********deletedExpModel********', id)

  const deletedExp = await db('expense')
    .delete()
    .where({ id })
    // .returning('*')
  console.log('**********deletedExpModel********', deletedExp)
  return deletedExp
}

const assignBlock = async (expenseID, blockID) => {
  const [newExpense] = await db('expense')
    .update({ block_id: blockID })
    .where({ id: expenseID })
    .returning('*')
  console.log('blocksModelAssignBLockNewExpense', newExpense)
  return newExpense
}

const unassignExpense = async (id) => {
  const [newExpense] = await db('expense')
    .update({ block_id: null })
    .where({ id })
    .returning('*')
  console.log('expenseUnAssignBLockNewExpense', newExpense)
  return newExpense
}

const update = async (id, { name, amount }) => {
  const [newExpense] = await db('expense')
    .update({ name, amount })
    .where({ id })
    .returning('*')
  return newExpense
}

module.exports = {
  update,
  get,
  add,
  del,
  assignBlock,
  getByBlock,
  getUnassigned,
  unassignExpense
}