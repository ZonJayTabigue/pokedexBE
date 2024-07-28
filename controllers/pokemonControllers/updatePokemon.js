const Pokemon = require('../../models/pokemon');

const updatePokemon = async (req,res) => {
   const {
      name,
      height,
      weight,
      base_experience,
      image_url,
      types,
      abilities
   } = req.body;
   try {
      const updatedPokemon = await Pokemon.findByIdAndUpdate(
         req.params._id,
         {  name, 
            height,
            weight,
            base_experience,
            image_url,
            types,
            abilities
         },
         { new: true }
       );
   
       if (!updatedPokemon) {
         return res.status(404).json({ message: 'Pokemon not found' });
       }
   
       res.status(200).json({ message: 'Pokemon updated', data: updatedPokemon });
      
   } catch (e) {
      res.status(500).json({ message: `Error creating Pokemon: ${e}` });
   }
}

module.exports =  updatePokemon;