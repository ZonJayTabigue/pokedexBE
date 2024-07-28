const Pokemon = require('../../models/pokemon');

const createPokemon =  async (req,res) => {
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
      const pokemon = new Pokemon({
         name: name,
         height: height,
         weight: weight,
         base_experience: base_experience,
         image_url: image_url,
         types: types,
         abilities: abilities
       });
       await pokemon.save();
      res.status(201).json({data: pokemon, message: 'Pokemon created sucessfully'});
      
   } catch (e) {
      res.status(500).json({ message: `Error creating Pokemon: ${e}` });
   }
}

module.exports = createPokemon;