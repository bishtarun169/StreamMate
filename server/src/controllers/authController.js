const User = require('../models/User');

const registerUser = async (req, res) => {
     console.log(req.body);
     try {
          const { name, email, password } = req.body;
          
          // Check if user already exists
          let user = await User.findOne({ email });
          if (user) {
               return res.status(400).json({ message: 'User already exists' });
          }

          // Create new user
          user = new User({ name, email, password });
          await user.save();

          res.status(201).json({ message: 'User registered successfully' });
     } catch (error) {
          console.error(error.message);
          res.status(500).json({ message: 'Server error' });
     }
};

module.exports = { registerUser };      