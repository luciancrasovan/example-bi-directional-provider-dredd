const router = require('express').Router();
const controller = require('./stan.controller');

router.get('/v2/Kutty', controller.getKutty);
router.get('/v2/Kutty/Kutty/:id', controller.getKuttyById);

router.get('/v2/Witty', controller.getWitty);
router.get('/v2/Witty/Witty/:id', controller.getWittyById);

router.get('/health', controller.health);

module.exports = router;
