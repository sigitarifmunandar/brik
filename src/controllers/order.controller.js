const order = require('../services/order.service');
const orderDetail = require('../services/orderdetail.service');
const customer = require('../services/customer.service');

async function create(req, res, next) {
    try {
        let customerId = null;
        let customerPayload = req.body.customer;

        if (typeof customerPayload.name == "undefined") {
            res.status(400).json({message: "Customer cannot be empty."});
        }

        if (req.body.products.length == 0) {
            res.status(400).json({message: "Order cannot be empty."});
        }

        if (typeof customerPayload.id == "undefined") {
            customerId = await customer.create(customerPayload);
        } else {
            customerId = customerPayload.id;
        }

        // Prepare order payload
        let orderPayload = {};
        orderPayload.customer_id = customerId;
        orderPayload.total_price = 0;

        req.body.products.forEach(product => {
            orderPayload.total_price += (product.price * product.qty);
        });

        // Save order
        let orderId = await order.create(orderPayload);

        if (orderId) {
            let orderDetailPayload = req.body.products;

            // Save order detail
            res.json(await orderDetail.create(orderId, orderDetailPayload));
        }
    } catch (err) {
        console.error(`Error while creating order.`, err.message);
        next(err);
    }
}

module.exports = {
    create
};