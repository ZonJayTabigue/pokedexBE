const mongoose = require('mongoose');
const Type = require('./type');
const Ability = require('./ability');
const Stat = require('./stat');

const pokemonSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  base_experience: Number,
  image_url: String,
  types: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Type' }],
  abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }],
  stats: [{
    stat: { type: mongoose.Schema.Types.ObjectId, ref: 'Stat' },
    value: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
