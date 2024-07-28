const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Pokemon = require('../models/pokemon');
const Type = require('../models/type');
const Ability = require('../models/pokemon');
const jwt = require('jsonwebtoken');
const { connectDB, closeDB } = require('../config/database');

describe('Pokemon API', () => {

  beforeAll(async () => {
    await connectDB(process.env.TEST_DB);
    const user = new User({ username: 'testuser', password: 'testpassword' });
    await user.save();
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
  });
  
  afterAll(async () => {
    await User.deleteMany({});
    await Pokemon.deleteMany({});
    await closeDB();
  });  
  it('should list all Pokemon (unauthenticated)', async () => {
    const res = await request(app).get('/pokemon');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new Pokemon (authenticated)', async () => {
    const type = await Type.findOne({name: 'electric'});
    const ability = await Ability.findOne({name: 'imposter'});
    const res = await request(app)
      .post('/pokemon/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pikachu',
        height: 4,
        weight: 60,
        base_experience: 112,
        image_url: 'http://example.com/pikachu.png',
        types: type,
        abilities: ability
      });

    expect(res.statusCode).toEqual(201);
  });

  it('should update a Pokemon (authenticated)', async () => {
    const pokemon = new Pokemon({
      name: 'Pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      image_url: 'http://example.com/pikachu.png',
      types: [],
      abilities: []
    });
    await pokemon.save();

    const res = await request(app)
      .put(`/pokemon/update/${pokemon._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pikachu',
        height: 4,
        weight: 60,
        base_experience: 125,
      });

    expect(res.statusCode).toEqual(200);
  });

  it('should delete a Pokemon (authenticated)', async () => {
    const pokemon = new Pokemon({
      name: 'Pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      image_url: 'http://example.com/pikachu.png',
      types: [],
      abilities: []
    });
    await pokemon.save();

    const res = await request(app)
      .delete(`/pokemon/delete/${pokemon._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Pokemon Deleted');
  });
});
