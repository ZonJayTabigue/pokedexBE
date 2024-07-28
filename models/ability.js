const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Ability', abilitySchema);
