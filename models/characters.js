const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  species: { type: String, required: true },
  type: { type: String },
  gender: { type: String, required: true },
  image: { type: String, required: true }
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
