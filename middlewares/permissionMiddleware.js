const { defineAbility } = require('@casl/ability');

exports.permissionMiddleware = (req, res, next) => {
  const { role } = req.user;

  req.ability = defineAbility((can, cannot) => {
    if (role === 'manager') {
      can('manage', 'Order'); // Manager can manage orders
      cannot('view', 'CustomerInfo'); // But can't view customer info
    }
    if (role === 'admin') {
      can('manage', 'all'); // Admin can manage everything
    }
  });

  next();
};
