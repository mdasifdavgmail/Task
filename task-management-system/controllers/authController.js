const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bycript=require('bcrypt');
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } =await  req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    console.log(user)
    console.log(password)
    console.log(user.password)

    
    
    const isMatch = await bycript.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
    
  }
  
};

module.exports = { register, login };
