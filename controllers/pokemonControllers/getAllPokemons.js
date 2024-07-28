const Pokemon = require('../../models/pokemon');

const getAllPokemons = async (req,res) => {
   try {
      const pokemons = await Pokemon.find();
      res.status(200).json(pokemons);

   } catch (e) {
      res.status(500).json({ message: `Error retrieving Pokemon: ${e}` });
   }
}

module.exports = getAllPokemons