const product = require('../services/product.service');

async function getAll(req, res, next) {
    try {
        res.json(await product.getAll(req.query.page));
    } catch (err) {
        console.error(`Error while getting all products.`, err.message);
        next(err);
    }
}

async function getOne(req, res, next) {
    try {
        res.json(await product.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while getting one product.`, err.message);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        res.json(await product.create(req.body));
    } catch (err) {
        console.error(`Error while creating product.`, err.message);
        next(err);
    }
}
  
async function update(req, res, next) {
    try {
        res.json(await product.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating product.`, err.message);
        next(err);
    }
}
  
async function remove(req, res, next) {
    try {
        res.json(await product.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting product.`, err.message);
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}