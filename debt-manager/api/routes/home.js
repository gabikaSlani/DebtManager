var express = require('express');
var router = express.Router();
const db = require('../queries');

router.get('/:id', db.getUserById);
router.get('/users/:id', db.getAllUsersExceptMeAndFriends);
router.get('/add/friend/:id/:friendId', db.addFriend);
router.get('/total/:id', db.getTotal);

module.exports = router;