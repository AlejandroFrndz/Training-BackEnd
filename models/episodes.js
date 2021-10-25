const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  air_date: { type: String, required: true },
  episode: { type: String, required: true },
  seen: { type: Boolean, required: true }
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
