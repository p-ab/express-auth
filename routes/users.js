var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const secret = process.env.secret;
const User = require('../models/users');


/* GET users listing. */
router.get('/', async (req, res, next) => {
	const users = await User.findAll();
	res.send({count: users.length, users});
});

router.post('/', async (req, res) => {
  	const pass = bcrypt.hashSync(req.body.password, 8);
  	const name = req.body.name;
	const createdUser = await User.findOrCreate({ 
		where: { name }, 
		defaults: { pass }
	});

	if (createdUser[1]) {
	    var token = jwt.sign({ id: createdUser[0].id }, secret, {
	      expiresIn: 86400 // 24h
	    });
		res.status(200).send({user: createdUser, token});
	} else {
		res.status(500).send("There was a problem registering the user.");
	}
})

router.get('/me', async (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) 
		return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  	jwt.verify(token, secret, async (err, decoded) => {
    	if (err) 
    		return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    	const user = await User.find({ 
    		where: { id: decoded.id }, 
    		attributes: ['id', 'name', 'createdAt'] 
    	});
    	if (!user) return res.status(404).send("No user found.");
    	next(user);
    });
})
router.use( (user, req, res, next) => res.send(user));


module.exports = router;
