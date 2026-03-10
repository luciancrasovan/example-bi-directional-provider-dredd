const router = require('express').Router();
const controller = require('./hippie.controller');

router.post('/pitty/notty', controller.notty);

module.exports = router;
