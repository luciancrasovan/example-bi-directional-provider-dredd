const router = require('express').Router();
const controller = require('./stan.controller');

router.get('/v1/AL/VkL', controller.getAlVkl);
router.delete('/v1/AL/VkL/:shortName', controller.deleteAlVklByShortName);

router.get('/v1/Kutty', controller.getKutty);
router.get('/v1/Kutty/Id/:id', controller.getKuttyById);
router.get('/v1/Kutty/ShortName/:shortName', controller.getKuttyByShortName);

router.get('/health', controller.health);

module.exports = router;
