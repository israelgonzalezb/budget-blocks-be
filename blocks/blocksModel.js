const db = require('../data/db-config.js');

const get = async (userID) => {
  const blocks = await db('block')
    .select('*')
    .where({ user_id: userID })

  return blocks
}

const add = async (userID, block) => {
  block.user_id = userID
  await db('block').insert(block)
}

const del = async (blockID) => {
  const [deletedBlock] = await db('block')
  .delete()
  .where({id:blockID})
  .returning('id')
  console.log('**********deletedBlockModel********', deletedBlock)
  return deletedBlock
}

const update = async (id, {limit, name}) => {
  const [changedBlock] = await db('block')
    .update({limit, name})
    .where({id})
    .returning('*')
  return changedBlock
}

module.exports = {
  get,
  add,
  del,
  update
}