const { Router } = require('express');
const { GetData, PostData} = require('./DBController');

const router = Router();

router.post('/getdata', GetData);
router.post('/postdata', PostData);

module.exports = router;
