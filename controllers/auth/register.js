const express = require('express');
const User = require('../../models/user');

module.exports.register = async(req, res)  => {
   const {username, password} = req.body;

   try {
      let user = await User.findOne({ username });
      if (user) {
         return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ username, password });
      await user.save();

      res.status(200).json({ message: 'User registered successfully' });
   } catch (e)  {
      console.log(e);
      res.status(500).json({ message: `Something went wrong: ${e.message}` });
   }
}