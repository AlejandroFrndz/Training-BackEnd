const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
let User = require('../models/users');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, msg: 'username and password are required' });
  }

  try {
    const hash = await User.findOne(
      { username: username },
      { _id: 0, password: 1 }
    );

    const compare = await bcrypt.compare(password, hash.password);

    if (!compare) {
      return res
        .status(404)
        .json({ success: false, msg: 'incorrect username or password' });
    } else {
      const accessToken = jwt.sign(
        { username: username, role: 'god' },
        process.env.TOKEN_SECRET,
        { expiresIn: '10m' }
      );

      res.json({ success: true, msg: 'success', token: accessToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
});

module.exports = router;
