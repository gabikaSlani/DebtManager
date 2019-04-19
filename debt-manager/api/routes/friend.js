var express = require('express');
var router = express.Router();
const db = require('../queries');

router.get('/:id', db.getUserById);
router.get('/items/:id/:friendId', db.getItems);
module.exports = router;