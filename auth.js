const jwtSecret= 'your_jwt_secret'; // same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
	passport = require ('passport');
	
require('./passport'); // local passport file

let generateJWTToken = (user) => {
	return jwt.sign(user, jwtSecret, {
		subject: user.Username, // username to be encoded in JWT
		expiresIn: '7d', // when the token will expire
		algorithm: 'HS256' // algorithm to sign/encode values of JWT
	});
}

/* POST login */
module.exports = (router) => {
	router.post('/login', (req, res) => {
		passport.authenticate('local', { session: false }, (error, user, info) => {
			if (error || !user) {
				return res.status(400).json ({
					message: 'Something is not right.',
					user: user
				});
			}
			req.login(user, { session: false }, (error) => {
				if (error) {
					res.send(error);
				}
				let token = generateJWTToken(user.toJSON());
				return res.json({ user, token }); // E62 shorthand for res.json({ user: user, token: token })
			});
		})(req, res);
	});
}

/* 
1. uses LocalStrategy to check the username & password in the request exist in the database
2. uses generateJWTToken(); function to create a JWT based on the username & password
3. sends back JWT as a response to the client
3.5 returns error message from fromLocalStrategy if the username & password don’t exist
*/
