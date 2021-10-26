const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
let User = require('../models/users');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'username and password are required' });
  }

  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(403).json({ msg: 'username already exists' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'something went wrong' });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    const newUser = new User({
      username: username,
      password: hash
    });

    try {
      await newUser.save();
      return res.status(201).json({ msg: 'User registration complete' });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  });
});

module.exports = router;
