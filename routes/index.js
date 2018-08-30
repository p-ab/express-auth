var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const secret = process.env.secret;
const User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.post('/login', async (req, res) => {
	var currentUser = await User.findOne({ where: { name: req.body.name } });
    if (!currentUser) 
    	return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, currentUser.pass);
    if (!passwordIsValid) 
    	return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: currentUser.id }, secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
});

module.exports = router;
