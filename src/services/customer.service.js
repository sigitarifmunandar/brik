const db = require('./db.service');

async function create(customer) {
    let id = null;
    let result = await db.query(
        `INSERT INTO customers (name) VALUES (?)`, 
        [
            customer.name
        ]
    );

    if (result.affectedRows) {
        id = result.insertId;
    }

    return id;
}

module.exports = {
  create
}