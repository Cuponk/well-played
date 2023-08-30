const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const e = require('express');

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
      err.errors = { email: "Invalid credentials" };
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
    email: req.user.email
  });
});

// OWNED GAMES LIST
// Get a user's owned games
router.get('/:userId/ownedGames', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if(user.ownedGames) {
			res.json(user.ownedGames);
		} else {
			res.json({ message: 'userId not found' })
		}	
	} catch (err){
		console.log(err) 
		res.json({ message: `Error fetching user's owned games list` })
	}
})

// Add a game to user's owned game list
router.post('/:userId/ownedGames', async (req, res) => {
	try {
		if(req.body.userId !== req.params.userId) {
			return res.json({ message: 'user ids do not match' })
		}
		const user = await User.findById(req.body.userId);
		const gameId = req.body.gameId;

		if(user.ownedGames.includes(gameId)) {
			return res.json({ message: 'User already owns this game'})
		} 
		user.ownedGames.push(gameId);
		await user.save();

		return res.json(user);
	} catch (err) {
		return res.json({ message: `Error posting to user's owned games list` });
	}
})

// Remove a game from a user's owned game list
router.delete('/:userId/ownedGames', async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		const gameId = req.body.gameId;

		const index = user.ownedGames.indexOf(gameId)
		if(index > -1) {
			user.ownedGames.splice(index, 1);
			console.log('Game has been removed');
		}
		await user.save();
		return res.json(user);
	} catch (err) {
		console.log(error);
		return res.json({ message: `Error deleting from user's owned games list`})
	}
})

// Add a game to user's wishlist
router.post('/:userId/wishlistGames', async (req, res) => {
	try {
		if(req.body.userId !== req.params.userId) {
			return res.json({ message: 'user ids do not match' })
		}
		const user = await User.findById(req.body.userId);
		const gameId = req.body.gameId;

		if(user.wishlistGames.includes(gameId)) {
			return res.json({ message: 'Game already in wishlist'})
		} 
		user.wishlistGames.push(gameId);
		await user.save();

		return res.json(user);
	} catch (err) {
		return res.json({ message: `Error posting to user's wishlist` });
	}
})

// Remove a game from a user's wishlist
router.delete('/:userId/wishlistGames', async (req, res) => {
	try {
		const user = await User.findById(req.body.userId);
		const gameId = req.body.gameId;

		const index = user.wishlistGames.indexOf(gameId)
		if(index > -1) {
			user.wishlistGames.splice(index, 1);
			console.log('Game has been removed');
		}
		await user.save();
		return res.json(user);
	} catch (err) {
		console.log(error);
		return res.json({ message: `Error deleting from user's wishlist`})
	}
})

// get user by userId
router.get('/:userId', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId)
		if (user) {
			res.json(user);
		} else {
			res.json({ message: 'userId not found' })
		}
	} catch (err) {
		console.log(err);
		res.json({ message: 'Error fetching userId'})
	}
})

/* get all users */
router.get('/', async function (req, res, next) {
	try {
		const users = await User.find()

		return res.json(users);
	} catch (err) {
		res.json([]);
	}
});
module.exports = router;
