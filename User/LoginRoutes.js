const { Router } = require('express');
const { register, login, logout, update } = require('./UserController');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/update', update);
router.get('/logout', logout);

module.exports = router;
