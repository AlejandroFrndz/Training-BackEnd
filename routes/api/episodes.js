const express = require('express');
const router = express.Router();
let Episode = require('../../models/episodes');
let episodes = require('../../models/episodes.json');
const verifyJWT = require('../../middleware/verifyJWT');

router.get('/', verifyJWT, async (req, res) => {
  try {
    const episodes = await Episode.find();
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ err: 'Error getting the episodes' });
  }
});

router.get('/:id', verifyJWT, async (req, res) => {
  try {
    const episode = Episode.findOne({ id: parseInt(req.params.id) });
    res.json(episode);
  } catch (err) {
    res.status(404).json({});
  }
});

router.put('/:id', verifyJWT, async (req, res) => {
  try {
    const newEpisode = await Episode.findOneAndUpdate(
      { id: parseInt(req.body.id) },
      { ...req.body },
      { new: true }
    );
    res.json(newEpisode);
  } catch (err) {
    res.status(404).json({});
  }
});

module.exports = router;
