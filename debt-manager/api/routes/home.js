var express = require('express');
var router = express.Router();
const db = require('../queries');

router.get('/:id', db.getUserById);

module.exports = router;