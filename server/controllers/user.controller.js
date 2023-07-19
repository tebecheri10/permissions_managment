const User = require('../models/user.model');
const Roles = require('../models/roles.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("reqbody", username, password);
  
  // Validation
  if (!username  || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //hashing
  const hashPassword = await bcrypt.hash(password, 12);

  // Create new user
  const newUser = new User({
    username,
    password: hashPassword
  });

  // Send New User
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const user = await User.findOne({ username });
  
  if (!user) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const roles = await Roles.findOne({ username });

  if (!roles) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id , username: user.username, role: roles.role},
    process.env.JWT_SECRET,
    { expiresIn: '5m' } 
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username
    }
  });
};

module.exports = {
  createUser,
  loginUser
};
