var bcrypt = require('bcrypt');


const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'kynnpkiv',
  host: 'packy.db.elephantsql.com',
  database: 'kynnpkiv',
  password: 'fvSlMx1s7ysidgc4rmeBGektYHNlxxGU',
  port: 5432
});

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log(id);
    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
};

const createUser = (request, response) => {
  const {login, password} = request.body;
  pool.query('INSERT INTO users (login, password) VALUES ($1, $2) RETURNING *',
    [login, encryptPassword(password)],
    (error, results) => {
      if (error) {
        if (error.constraint === 'unique_login') {
          response.status(201).send(false);
          return;
        } else {
          throw error;
        }
      }
      response.status(201).send(true);
    });
};

const checkUser = (request, response) => {
  const {login, password} = request.body;
  pool.query('SELECT * FROM users WHERE login=$1', [login], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rowCount === 1 && bcrypt.compareSync(password, results.rows[0].password)) {
      response.status(201).send({valid: true, id: results.rows[0].id});
    } else {
      response.status(201).send({valid: false});
    }
  });
};

const getAllUsersExceptMeAndFriends = (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log(id);
    pool.query('SELECT * from users where users.id != $1 and users.id not in ' +
      '(SELECT user2_id FROM friends WHERE user1_id = $1);', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  }
};

const addFriend = (request, response) => {
  const userId = parseInt(request.params.id);
  const friendId = parseInt(request.params.friendId);
  if (isNaN(userId) || isNaN(friendId)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log(userId, friendId);
    pool.query('INSERT INTO friends (user1_id, user2_id) VALUES ($1, $2), ($2, $1) RETURNING *',
      [userId, friendId], (error, results) => {
        if (error) {
          throw error;
        } else {
          console.log(results.rows);
          response.status(200).send(true);
        }
      });

  }
};

const getTotal = (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log(id);
    pool.query('SELECT ' +
      '((SELECT coalesce(sum(amount), 0) FROM debts WHERE settled = false AND receiver_id = $1) ' +
      '- ' +
      '(SELECT coalesce(sum(amount),0) FROM debts WHERE settled = false AND payer_id = $1)) as total', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows[0].total);
    });
  }
};

const getFriends = (request, response) => {
  const id = parseInt(request.params.id);
  if (isNaN(id)) {
    console.log('id is NaN');
    throw error;
  } else {
    pool.query('SELECT a.id, a.debt, users.login FROM users JOIN ' +
      '(SELECT ' +
      'user2_id as id, ' +
      '((Select coalesce(sum(amount), 0) from debts WHERE receiver_id = $1 AND payer_id = user2_id AND settled=false) ' +
      '- ' +
      '(Select coalesce(sum(amount), 0) from debts WHERE payer_id = $1 And receiver_id = user2_id AND settled=false)) as debt ' +
      'from friends WHERE user1_id = $1) as a ON a.id = users.id ORDER BY abs(debt) DESC',
      [id], (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
      });
  }
};

const getItems = (request, response) => {
  const userId = parseInt(request.params.id);
  const friendId = parseInt(request.params.friendId);
  if (isNaN(userId) || isNaN(friendId)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log(userId, friendId);
    pool.query('SELECT items.id, items.name, items.amount, u.login as chipper, u.id as chipperId, ' +
      'u1.login as creator, u1.id as creatorId, d.amount as debt, d.settled ' +
      'FROM items ' +
      'JOIN chip_in_item as ch ON ch.item_id = items.id AND ((creator_id = $1 AND user_id = $2) OR (creator_id = $2 AND user_id = $1)) ' +
      'JOIN users as u on ch.user_id = u.id ' +
      'JOIN users as u1 on items.creator_id = u1.id ' +
      'JOIN debts as d on items.id = d.item_id AND ((d.receiver_id = $1 AND d.payer_id = $2) OR (d.receiver_id = $2 AND d.payer_id = $1)) ' +
      'ORDER BY date DESC;',
      [userId, friendId], (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows);
        response.status(200).json(results.rows);
      });
  }
};

const addItem = (request, response) => {
  const {id, itemInfo} = request.body;
  const amount = parseFloat(itemInfo.amount).toFixed(2);
  const name = itemInfo.description;
  const debt = (amount / (itemInfo.chosenFriends.length + 1)).toFixed(2);
  tx(async client => {
    const {rows} = await client.query('INSERT INTO items (name, amount, date, creator_id) VALUES ($1,$2,NOW(),$3) RETURNING *', [name, amount, id]);
    const itemId = rows[0].id;
    itemInfo.chosenFriends.forEach(async friend => {
      await client.query('INSERT INTO chip_in_item (item_id, user_id) VALUES ($1,$2)', [itemId, friend.value]);
      await client.query('INSERT INTO debts (settled, receiver_id, payer_id, item_id, amount) VALUES (false,$1,$2,$3,$4)',
        [id, friend.value, itemId, debt])
    });
    await client.query('INSERT INTO chip_in_item (item_id, user_id) VALUES ($1,$2)', [itemId, id]);
    console.log('hotovo');
  })
    .then(() => response.status(200).json('ok'))
    .catch(error => console.log(error))
};

const settleUp = (request, response) => {
  const userId = this.request.params.id;
  const friendId = this.request.params.friendId;
  if (isNaN(userId) || isNaN(friendId)) {
    console.log('id is NaN');
    throw error;
  } else {
    console.log('settling up:' + userId, friendId);
    pool.query('UPDATE debts SET settled = true WHERE settled=false AND ' +
      '((receiver_id = $1 AND payer_id = $2) OR (receiver_id = $2 AND payer_id = $1))',
      [userId, friendId], (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json('ok');
      });
  }
};

const encryptPassword = (password) => {
  let hash = bcrypt.hashSync(password, 10);
  return hash;
};

const tx = async(callback) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    try {
      await callback(client);
      client.query('COMMIT')
    } catch (e) {
      client.query('ROLLBACK')
    }
  } finally {
    client.release()
  }
};


module.exports = {
  getUserById,
  createUser,
  checkUser,
  getAllUsersExceptMeAndFriends,
  addFriend,
  getTotal,
  getFriends,
  getItems,
  addItem,
  settleUp,

};

