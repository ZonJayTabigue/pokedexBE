
const Stat = require('../../models/stat');

const getAllStats = async (req, res) => {
  try {
    const stats = await Stat.find();

    res.status(200).json(stats);
  } catch (e) {
    res.status(500).json({ message: `Error retrieving stats: ${e.message}` });
  }
};

module.exports = getAllStats;
