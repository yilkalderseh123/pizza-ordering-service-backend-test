const Pizza = require('../models/Pizza');
const Topping = require('../models/Topping');

// Add pizza with toppings
exports.addPizza = async (req, res) => {
  const { name, toppings } = req.body;
  const pizza = await Pizza.create({ name });

  // Create or associate toppings
  const pizzaToppings = await Promise.all(
    toppings.map(toppingName => Topping.findOrCreate({ where: { name: toppingName } }))
  );

  await pizza.addToppings(pizzaToppings.map(([topping]) => topping));
  res.json({ pizza });
};
