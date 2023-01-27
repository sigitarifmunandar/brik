const db = require('./db.service');

async function create(orderId, orderDetail) {
    let insertOrderDetail = {};
    let message = 'Order created successfully.';
    let orderDetailData = orderDetail.map(item => [item.id, orderId, item.qty]);

    await orderDetailData.forEach(async order => {
        insertOrderDetail = await db.query(
            "INSERT INTO order_details (`product_id`, `order_id`, `qty`) VALUES (?, ?, ?)", 
            order
        );

        if (!insertOrderDetail.affectedRows) {
            message = 'Error in creating order.';
        }
    });

    return {message};
}

module.exports = {
  create
}