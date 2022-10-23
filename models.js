const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
	Title: {type: String, required: true},
	Description: {type: String, required: true},
	Genre: {
		Name: String,
		Description: String
	},
	Director: {
		Name: String,
		Bio: String,
		Birth: String,
		Death: String
	},
	ImagePath: String,
	Featured: Boolean
});

let userSchema = mongoose.Schema({
	Username: {type: String, required: true},
	Password: {type: String, required: true},
	Email: {type: String, required: true},
	DOB: Date,
	FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
	return bcrypt.compateSync(password, this.Password);
};

let movie = mongoose.model('Movie', movieSchema);
let user = mongoose.model('User', userSchema);

module.exports.movie = movie;
module.exports.user = user;
