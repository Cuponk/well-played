const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  friends: [
	{
	  type: Schema.Types.ObjectId,
	  ref: 'User',
	}
   ],
  ownedGames: [
	{
	  type: Schema.Types.ObjectId,
	  ref: 'Game',
  	}
  ],
  wishlistGames: [
	{
	  type: Schema.Types.ObjectId,
	  ref: 'Game',
	}
  ]}, {
	  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
