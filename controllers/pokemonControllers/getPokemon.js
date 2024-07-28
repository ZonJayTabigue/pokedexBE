const Pokemon = require('../../models/pokemon');

const getPokemons =  async (req,res) => {
   try {
      const pokemon = await Pokemon.findOne({_id: req.query._id});
      res.status(200).json(pokemon);
      
   } catch (e) {
      res.status(500).json({ message: `Error retrieving Pokemon: ${e}` });
   }
}

module.exports = getPokemons;