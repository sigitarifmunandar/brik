const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

/* GET all products */
router.get('/', productController.getAll);

/* GET product by id */
router.get('/:id', productController.getOne);

/* POST product */
router.post('/', productController.create);

/* PUT product */
router.put('/:id', productController.update);

/* DELETE product */
router.delete('/:id', productController.remove);

module.exports = router;