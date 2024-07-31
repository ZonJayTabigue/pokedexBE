const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const { connectDB, closeDB } = require('../config/database');
require('dotenv').config();

describe('Auth Endpoints', () => {
    beforeAll(async () => {
      await connectDB(process.env.TEST_DB, 'auth.test.js');
    });
  
    beforeEach(async () => {
      await User.deleteMany({});
    });
  
    afterAll(async () => {
      await User.deleteMany({});
      await closeDB();
    });  

  describe('POST /auth/register', () => {

    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should not register an existing user', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });
    });

    it('should login a registered user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'testuser',
          password: 'testpassword'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Logged in successfully');
      expect(res.body).toHaveProperty('token');
    });

    it('should not login an unregistered user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          username: 'wronguser',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });
  });

  describe('POST /auth/logout', () => {
    it('should logout a user', async () => {
      const res = await request(app)
        .post('/auth/logout');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });
  });
});
