const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/register', register);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

register = (req, res) => {
    let Data = new User(req.body.email, req.body.password, req.body.name, req.body.password2);

    Data.ValRegister().then(data => {
        res.send(data)
    })
}


module.exports = router;
