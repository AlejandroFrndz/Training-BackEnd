const express = require('express');
const router = express.Router();
const immortalCharacterMiddleware = require('../../middleware/immortalCharacter');
const verifyJWT = require('../../middleware/verifyJWT');
let Character = require('../../models/characters.js');

/*
Promise chaining approach
router.get('/', (req, res) => {
  Character.find()
    .then((characters) => res.json(characters))
    .catch((err) => res.status(500).json({ Error: err }));
});
*/

//async/await approach
router.get('/', verifyJWT, async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

router.get(
  '/immortalCharacter',
  verifyJWT,
  immortalCharacterMiddleware,
  (req, res) => {
    res.json(res.locals.immortal);
  }
);

router.get('/:id', verifyJWT, async (req, res) => {
  try {
    const character = Character.findOne({ id: parseInt(req.params.id) });
    res.json(character);
  } catch (err) {
    res.status(404).json({});
  }
});

router.post('/', verifyJWT, async (req, res) => {
  try {
    const newId = await Character.findOne({}, { id: 1, _id: 0 })
      .sort({ id: -1 })
      .limit(1);
    newId.id++;
    const newChar = new Character({
      id: newId.id,
      name: req.body.name,
      status: req.body.status,
      species: req.body.species,
      type: '',
      gender: req.body.gender,
      image: req.body.image
    });
    await newChar.save();
    res.json(newChar);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Error creating the character' });
  }
});

router.put('/:id', verifyJWT, async (req, res) => {
  try {
    const newChar = await Character.findOneAndUpdate(
      { id: parseInt(req.body.id) },
      { ...req.body },
      { new: true }
    );
    res.json(newChar);
  } catch (err) {
    res.status(404).json({});
  }
});

router.delete('/:id', verifyJWT, async (req, res) => {
  try {
    await Character.findOneAndDelete({ id: parseInt(req.params.id) });
    res.json({});
  } catch (err) {
    res.status(404).json({});
  }
});
module.exports = router;
