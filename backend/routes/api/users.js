const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Friendship = mongoose.model('Friendship');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

// POST /api/users/register
router.post('/register', validateRegisterInput, async (req, res, next) => {
	// Check to make sure no one has already registered with the proposed email or
	// username.
	const user = await User.findOne({
		$or: [{ email: req.body.email }, { username: req.body.username }]
	});

	if (user) {
		// Throw a 400 error if the email address and/or username already exists
		const err = new Error("Validation Error");
		err.statusCode = 400;
		const errors = {};
		if (user.email === req.body.email) {
			errors.email = "A user has already registered with this email";
		}
		if (user.username === req.body.username) {
			errors.username = "A user has already registered with this username";
		}
		err.errors = errors;
		return next(err);
	}

	// Otherwise create a new user
	const newUser = new User({
		username: req.body.username,
		email: req.body.email
	});

	bcrypt.genSalt(10, (err, salt) => {
		if (err) throw err;
		bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
			if (err) throw err;
			try {
				newUser.hashedPassword = hashedPassword;
				const user = await newUser.save();
				return res.json(await loginUser(user));
			}
			catch (err) {
				next(err);
			}
		})
	});
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req, res, next) => {
	passport.authenticate('local', async function (err, user) {
		if (err) return next(err);
		if (!user) {
			const err = new Error('Invalid credentials');
			err.statusCode = 400;
			err.errors = { username: "Invalid credentials" };
			return next(err);
		}
		return res.json(await loginUser(user));
	})(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
	if (!isProduction) {
		// In development, allow React server to gain access to the CSRF token
		// whenever the current user information is first loaded into the
		// React application
		const csrfToken = req.csrfToken();
		res.cookie("CSRF-TOKEN", csrfToken);
	}
	if (!req.user) return res.json(null);
	res.json({
		_id: req.user._id,
		username: req.user.username,
		email: req.user.email,
		ownedGames: req.user.ownedGames,
		wishlistGames: req.user.wishlistGames,
		friends: req.user.friends
	});
});

// get user by userId
router.get('/:userId', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		if (user) {
			return res.json(user);
		} else {
			return res.json({ message: 'userId not found' })
		}
	} catch (err) {
		console.log(err);
		return res.json({ message: 'Error fetching userId' })
	}
})

/* get all users */
router.get('/', async function (req, res, next) {
	try {
		const users = await User.find()

		return res.json(users);
	} catch (err) {
		return res.json([]);
	}
});

// Get all other users not including the current user and the current user's friends
router.get('/:userId/otherUsers', async (req, res) => {
	try {
		const { userId } = req.params;

		// Find friendships with current user as sender or receiver.
		const sentFriendships = await Friendship.find({ sender: userId });
		const receivedFriendships = await Friendship.find({ receiver: userId });

		// Get list of user ids for each list of friendships and combine them.
		const sentToUserIds = sentFriendships.map(f => f.receiver);
		const receivedFromUserIds = receivedFriendships.map(f => f.sender);
		const friendshipUserIds = [...sentToUserIds, ...receivedFromUserIds, userId];

		// Find users that don't have any sort of friendship with the current user.
		const users = await User.find({
			_id: { $nin: friendshipUserIds }
		});
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.json([]);
	}
})

// OWNED GAMES LIST
// Get a user's owned games
router.get('/:userId/ownedGames', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if (user.ownedGames) {
			return res.json(user.ownedGames);
		} else {
			return res.json({ message: 'userId not found' })
		}
	} catch (err) {
		console.log(err)
		res.json({ message: `Error fetching user's owned games list` })
		console.log(err)
		return res.json({ message: `Error fetching user's owned games list` })
	}
})

// Add a game to user's owned game list
router.post('/:userId/ownedGames', async (req, res) => {
	/*
	Here's the expected req body structure for all POST games list routes.
		Expected req.body:
		{
			gameData: {
				gameId: Number,
				name: String,
				coverUrl: String,
				releaseYear: Number
			}
		}
	*/
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const { gameData } = req.body;

		// We can't do .includes with the object because the mongoDB _id isn't just
		// a string. It looks something like " _id: new ObjectId("5f9a3b3b1c9d440000d1c9d4")"
		// Instead, find the game by the gameId.
		const index = user.ownedGames.findIndex(
			game => game.gameId === gameData.gameId
		)
		if (index > -1) {
			return res.json({ message: 'User already owns this game' })
		}
		user.ownedGames.push(gameData);
		// Remove from wishlist if it exists there.
		const wishlistIndex = user.wishlistGames.findIndex(
			game => game.gameId === gameData.gameId
		)
		if (wishlistIndex > -1) {
			user.wishlistGames.splice(wishlistIndex, 1);
		}
		await user.save();
		return res.json(user);
	} catch (err) {
		return res.json({ message: `Error posting to user's owned games list` });
	}
})

// Remove a game from a user's owned game list
router.delete('/:userId/ownedGames', async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const { gameId } = req.body;

		const index = user.ownedGames.findIndex(game => game.gameId === gameId)
		if (index > -1) {
			user.ownedGames.splice(index, 1);
			await user.save();
			console.log('Game has been removed from owned games');
		} else {
			console.log('Game not found');
		}
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.json({ message: `Error deleting from user's owned games list` })
	}
})

// WISHLIST GAMES LIST
// Get a user's wishlist games
router.get('/:userId/wishlistGames', async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (user.wishlistGames) {
			return res.json(user.wishlistGames);
		} else {
			return res.json({ message: 'userId not found' })
		}
	} catch (err) {
		console.log(err)
		return res.json({ message: `Error fetching user's wishlist games` })
	}
})

// Add a game to user's wishlist
router.post('/:userId/wishlistGames', async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const { gameData } = req.body;

		// Check presence of games by gameId instead of array membership.
		const index = user.wishlistGames.findIndex(
			game => game.gameId === gameData.gameId
		)
		if (index > -1) {
			return res.json({ message: 'Game already in wishlist' })
		}
		user.wishlistGames.push(gameData);
		await user.save();
		return res.json(user);
	} catch (err) {
		return res.json({ message: `Error posting to user's wishlist` });
	}
})

// Remove a game from a user's wishlist
router.delete('/:userId/wishlistGames', async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findById(userId);
		const { gameId } = req.body;

		const index = user.wishlistGames.findIndex(game => game.gameId === gameId)
		if (index > -1) {
			user.wishlistGames.splice(index, 1);
			await user.save();
			console.log('Game has been removed from wishlist');
		} else {
			console.log('Game not found');
		}
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.json({ message: `Error deleting from user's wishlist` })
	}
})

module.exports = router;
