const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM products LIMIT ?,?`, 
        [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function getOne(id) {
    const rows = await db.query(
        `SELECT * FROM products WHERE id = ?`, 
        [id]
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function create(product) {
    const result = await db.query(
        `INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)`, 
        [
            product.name,
            product.description,
            product.price,
            product.image_url
        ]
    );

    let message = 'Error in creating product.';

    if (result.affectedRows) {
        message = 'Product created successfully.';
    }

    return {message};
}

async function update(id, product) {
    const result = await db.query(
        `UPDATE products SET name=?, description=?, price=?, image_url=? WHERE id=?`, 
        [
            product.name,
            product.description,
            product.price,
            product.image_url,
            id
        ]
    );

    let message = 'Error in updating product.';

    if (result.affectedRows) {
        message = 'Product updated successfully.';
    }

    return {message};
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM products WHERE id=?`, 
        [id]
    );

    let message = 'Error in deleting product.';

    if (result.affectedRows) {
        message = 'Product deleted successfully.';
    }

    return {message};
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}