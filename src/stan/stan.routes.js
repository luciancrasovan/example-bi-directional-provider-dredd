const router = require('express').Router();
const controller = require('./stan.controller');

router.get('/v3/GI/Kutty', controller.getKutty);
router.get('/v3/GI/Kutty/:id', controller.getKuttyById);

router.get('/v3/BI/Witty', controller.getWitty);
router.get('/v3/BI/Witty/:id', controller.getWittyById);

router.get('/health', controller.health);

module.exports = router;
