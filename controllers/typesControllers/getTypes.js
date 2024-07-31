
const Type = require('../../models/type');

const getTypes = async (req, res) => {
  try {
    const types = await Type.find();

    res.status(200).json(types);
  } catch (e) {
    res.status(500).json({ message: `Error retrieving types: ${e.message}` });
  }
};

module.exports = getTypes;
