const Order = require('../models/Order');
const { subject } = require('@casl/ability');

// Update order status by restaurant manager
exports.updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findByPk(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  // Authorization with CASL
  if (!req.ability.can('update', subject('Order', order))) {
    return res.status(403).json({ message: 'Not allowed to update order status' });
  }

  order.status = status;
  await order.save();
  res.json({ order });
};
