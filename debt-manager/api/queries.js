const url = require('url');
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
  console.log(id);
  pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
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

const encryptPassword = (password) => {
  let hash = bcrypt.hashSync(password, 10);
  console.log('zakodovane heslo: ' + hash);
  return hash;
};


module.exports = {
  getUserById,
  createUser,
  checkUser,
};