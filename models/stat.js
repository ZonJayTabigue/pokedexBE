const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Stat', statSchema);
