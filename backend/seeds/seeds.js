const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Game = require("../models/Game");

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
  new User({
    username: 'demo-user',
    email: 'demo-user@google.com',
    hashedPassword: bcrypt.hashSync('ilikeike', 10),
	friends: [],
	ownedGames: [],
	wishlistGames: []
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
	  friends: [],
	  ownedGames: [],
	  wishlistGames: []
    })
  )
}

// fake game seeds
const games = [];

games.push(
	new Game({
		title: 'Valorant 2.0',
		description: 'Not a copy of valorant',
		releaseYear: 2023,
		genre: 'First Person Shooter',
		genreTags: ['action', 'shooter'],
		studio: 'Rito Games',
		portrait: 'portrait.image',
		backgroundImage: 'background.image',
		additionalImages: ['image1', 'image2'],
		videoUrl: 'video.url',
		maxPlayers: 5
	})
)


// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Insert seeds
const insertSeeds = () => {
  console.log("Resetting db and seeding users...");
  User.collection.drop()
  	.then(()=> Game.collection.drop())
    .then(() => User.insertMany(users))
	.then(() => Game.insertMany(games))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    });
}
