const express = require('express');
const User = require('../../models/user');


module.exports.logout = async(req, res) => {
   res.clearCookie('token');
   res.json({ message: 'Logged out successfully' });
}