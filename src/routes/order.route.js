const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

/* POST order */
router.post('/', orderController.create);

module.exports = router;