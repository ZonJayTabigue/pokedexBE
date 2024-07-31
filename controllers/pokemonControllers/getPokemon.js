const Pokemon = require('../../models/pokemon');

const getPokemons = async (req,res) => {
   try {
      const pokemon = await Pokemon.findOne({_id: req.params._id })
      .populate('types', 'name')
      .populate('abilities', 'name')
      .populate('stats.stat', 'name');
      if (!pokemon) {
         res.status(404).json({message: 'Unable to find Pokemon'});
      } else {
         res.status(200).json(pokemon);
      }
      
   } catch (e) {
      res.status(500).json({ message: `Error retrieving Pokemon: ${e}` });
   }
}

module.exports = getPokemons;