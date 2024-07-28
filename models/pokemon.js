const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  base_experience: Number,
  image_url: String,
  types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }]
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
