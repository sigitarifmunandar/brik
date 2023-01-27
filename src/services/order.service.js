const db = require('./db.service');

async function create(order) {
    let orderId = null;

    const insertOrder = await db.query(
        `INSERT INTO orders (customer_id, total_price) VALUES (?, ?)`, 
        [
            order.customer_id,
            order.total_price
        ]
    );

    if (insertOrder.affectedRows) {
        orderId = insertOrder.insertId;
    }
    
    return orderId;
}

module.exports = {
  create
}