const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  // Id for fetching from IGDB API.
  gameId: Number,
  name: String,
  coverUrl: String,
  releaseYear: Number
})

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
  // An array of user IDs that we can populate in our routes.
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  // An array of ids for retrieving particular games from the IGDB API.
  ownedGames: [gameSchema],
  wishlistGames: [gameSchema],
});

module.exports = mongoose.model('User', userSchema);
