
const Ability = require('../../models/ability');

const getAllAbilities = async (req, res) => {
  try {
    const abilities = await Ability.find();

    res.status(200).json(abilities);
  } catch (e) {
    res.status(500).json({ message: `Error retrieving abilities: ${e.message}` });
  }
};

module.exports = getAllAbilities;
