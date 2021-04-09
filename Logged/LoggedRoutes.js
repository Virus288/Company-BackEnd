const { Router } = require('express');
const { Database, Insert } = require('./LoggedController');

const router = Router();

router.post('/Database', Database);
router.post('/Insert', Insert);

module.exports = router;
