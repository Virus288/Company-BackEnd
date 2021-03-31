// File left for debbuging and hard adding stuff


const { Router } = require('express');
const { GetData, PostData} = require('./DBController');

const router = Router();

router.get('/getdata', GetData);
router.post('/postdata', PostData);

module.exports = router;
