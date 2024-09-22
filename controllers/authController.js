const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

// Register user
exports.register = async (req, res) => {
  const userSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    role: z.enum(['customer', 'manager', 'admin']),
  });

  const { username, password, role } = userSchema.parse(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, role });
  res.json({ user });
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id, role: user.role }, 'secret', { expiresIn: '1h' });
  res.json({ token });
};
