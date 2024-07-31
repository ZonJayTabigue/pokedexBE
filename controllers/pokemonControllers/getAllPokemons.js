const Pokemon = require('../../models/pokemon');

const getAllPokemons = async (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const searchQuery = req.query.search || '';
  const limit = 6;
  const skip = (page - 1) * limit;

  try {
    const totalPokemons = await Pokemon.countDocuments();
    const totalPages = Math.ceil(totalPokemons / limit);

    const query = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { 'types.name': { $regex: searchQuery, $options: 'i' } }
      ]
    };


    const pokemons = await Pokemon.find(query)
      .populate('types', 'name')
      .populate('abilities', 'name')
      .populate('stats.stat', 'name')
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      pokemons,
      totalPages,
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({ message: `Error retrieving Pokemon: ${e}` });
  }
};

module.exports = getAllPokemons;
