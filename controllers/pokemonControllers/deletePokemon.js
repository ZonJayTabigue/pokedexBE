const Pokemon = require('../../models/pokemon');

const detelePokemon =  async (req,res) => {
   try {
      const deletedPokemon = await Pokemon.findByIdAndDelete({_id: req.params._id});
      
      if (!deletedPokemon) {
         return res.status(404).json({ message: 'Pokemon not found' });
      }

      res.status(200).json({message: 'Pokemon Deleted'});
      
   } catch (e) {
      res.status(500).json({ message: `Error retrieving Pokemon: ${e}` });
   }
}

module.exports = detelePokemon;