#!/usr/bin/env node

const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');
const Ability = require('../models/ability');
const Stat = require('../models/stat');
const axios = require('axios');
require('dotenv').config();
const cliProgress = require('cli-progress');


const POKEAPI_URI = process.env.POKEAPI_URI;
const getPokemonData = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const savePokemon = async (pokemonData) => {

  try {
    const types = await Promise.all(pokemonData.types.map(async (typeInfo) => {

      let type = await Type.findOne({ name: typeInfo.type.name });
      if (!type) {
        type = new Type({ name: typeInfo.type.name });
        await type.save();
      }
      return type;
    }));

    const abilities = await Promise.all(pokemonData.abilities.map(async (abilityInfo) => {

      let ability = await Ability.findOne({ name: abilityInfo.ability.name });
      if (!ability) {
        ability = new Ability({ name: abilityInfo.ability.name });
        await ability.save();
      }
      return ability;
    }));

    const stats = await Promise.all(pokemonData.stats.map(async (statInfo) => {
      let stat = await Stat.findOne({ name: statInfo.stat.name });
      if (!stat) {
        stat = new Stat({ name: statInfo.stat.name });
        await stat.save();
      }
      return { stat: stat._id, value: statInfo.base_stat };
    }));

    const pokemon = new Pokemon({
      name: pokemonData.name,
      height: pokemonData.height,
      weight: pokemonData.weight,
      base_experience: pokemonData.base_experience,
      image_url: pokemonData.sprites.front_default,
      types: types.map(type => type._id),
      abilities: abilities.map(ability => ability._id),
      stats: stats
    });

    await pokemon.save();

  } catch (error) {
    throw new Error('Something went wrong: ', error);
  }
};

const savePokemons = async () => {
   const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
   progressBar.start(151, 0);

  try {
    for (let i = 1; i <= 151; i++) {
      const pokemonData = await getPokemonData(`${POKEAPI_URI}/pokemon/${i}`);
      await savePokemon(pokemonData);
      progressBar.update(i);
      if (i === 151) {
         progressBar.stop();
      }
    }
    console.log('Successfully saved Pokemons');
  } catch (error) {
    console.error('Error saving Pokemon:', error);
  }
};

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/pokedex`);

    console.log('DB Connected');
    await savePokemons();

  } catch (error) {
    console.error('Error connecting to DB:', error);
  } finally {
    mongoose.connection.close();
  }
};
dbConnect();
