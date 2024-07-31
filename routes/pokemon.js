const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const getAll = require('../controllers/pokemonControllers/getAllPokemons');
const getPokemon = require('../controllers/pokemonControllers/getPokemon');
const createPokemon = require('../controllers/pokemonControllers/createPokemon');
const update = require('../controllers/pokemonControllers/updatePokemon');
const deletePokemon = require('../controllers/pokemonControllers/deletePokemon');


router.get('/', getAll);
router.get('/:_id', getPokemon);
router.post('/create', authMiddleware, createPokemon);
router.put('/update/:_id', authMiddleware, update);
router.delete('/delete/:_id', authMiddleware, deletePokemon);


module.exports = router;