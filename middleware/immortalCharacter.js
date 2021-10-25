let Character = require('../models/characters.js');

const immortalCharacterMiddleware = async (req, res, next) => {
  try {
    const idArr = await Character.find({}, { id: 1, _id: 0 });
    const rnd = Math.floor(Math.random() * idArr.length) + 1;
    res.locals.immortal = idArr[rnd - 1];
  } catch (err) {
    res.locals.immortal = -1;
    console.error(err);
  }
  next();
};

module.exports = immortalCharacterMiddleware;
