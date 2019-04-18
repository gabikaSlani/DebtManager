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
  if(isNaN(id)){
    console.log('id is NaN');
    throw error;
  }
  else{
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
  if(isNaN(id)){
    console.log('id is NaN');
    throw error;
  }
  else{
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
  if(isNaN(userId) || isNaN(friendId)){
    console.log('id is NaN');
    throw error;
  }
  else{
    console.log(userId, friendId);
    pool.query('INSERT INTO friends (user1_id, user2_id) VALUES ($1, $2)', [userId, friendId], (error, results) => {
      if (error) {
        throw error;
      }
    });
    pool.query('INSERT INTO friends (user1_id, user2_id) VALUES ($1, $2)', [friendId, userId], (error, results) => {
      if (error) {
        throw error;
      }
    });
    response.status(200).send(true);
  }
};

const getTotal = (request, response) => {
  const id = parseInt(request.params.id);
  if(isNaN(id)){
    console.log('id is NaN');
    throw error;
  }
  else{
    console.log(id);
    pool.query('SELECT ' +
      '(SELECT coalesce(sum(amount), 0) FROM debts WHERE settled = false AND receiver_id = $1) ' +
      '- ' +
      '(SELECT coalesce(sum(amount),0) FROM debts WHERE settled = false AND payer_id = $1)', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(true);
    });
  }
};

const encryptPassword = (password) => {
  let hash = bcrypt.hashSync(password, 10);
  return hash;
};


module.exports = {
  getUserById,
  createUser,
  checkUser,
  getAllUsersExceptMeAndFriends,
  addFriend,
  getTotal,

};

 /*vrati vsetkych ktorym je 40 dlzna + kolko*/
/*SELECT sum(amount), debts.receiver_id FROM debts JOIN (SELECT user2_id FROM friends WHERE user1_id = 40) as friends
ON debts.receiver_id = friends.user2_id
WHERE debts.settled = false AND debts.payer_id = 40
GROUP BY debts.receiver_id*/

/*vrati vsetkych ktori dlzia 40 + kolko*/
/*SELECT sum(amount), debts.payer_id FROM debts JOIN (SELECT user2_id FROM friends WHERE user1_id = 40) as friends
ON debts.payer_id = friends.user2_id
WHERE debts.settled = false AND debts.receiver_id = 40
GROUP BY debts.payer_id*/