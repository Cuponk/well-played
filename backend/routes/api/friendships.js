const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Friendship = mongoose.model('Friendship');

// GET Friendships that are accepted
router.get('/:userId/friends', async (req, res) => {
  const { userId } = req.params;
  try {
    // Consider doing .populate() depending on how we use this endpoint.
    const friendships = await Friendship.find({
      $or: [
        { sender: userId, accepted: true },
        { receiver: userId, accepted: true }
      ]
    });
    return res.json(friendships);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});


// GET Friendships where user is the sender (pending request)
router.get('/:userId/pendingRequests', async (req, res) => {
  const { userId } = req.params;
  try {
    // Consider doing .populate() depending on how we use this endpoint.
    const friendships = await Friendship.find({
      sender: userId,
      accepted: false
    });
    return res.json(friendships);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});

// GET Friendships where user is the receiver (friend requests)
router.get('/:userId/friendRequests', async (req, res) => {
  const { userId } = req.params;
  try {
    // Consider doing .populate() depending on how we use this endpoint.
    const friendships = await Friendship.find({
      receiver: userId,
      accepted: false
    });
    return res.json(friendships);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});
