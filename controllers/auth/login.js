const express = require('express');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');


module.exports.login = async(req, res) => {
   const jwtKey = process.env.JWT_SECRET || 'jwt_secret_key';
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Logged in successfully', token });

   } catch (e) {
      res.status(500).json({ message: `Something went wrong: ${e.message}` });
   }
}