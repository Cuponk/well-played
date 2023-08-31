const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Friendship = mongoose.model('Friendship');
const User = mongoose.model('User');

// Get all friendships
router.get('/', async (req, res) => {
  try {
    const friendships = await Friendship.find();
    return res.json(friendships);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});

// GET Friendships that are accepted
router.get('/:userId/friends', async (req, res) => {
  const { userId } = req.params;
  try {
    const senderFriendships = await Friendship.find({
      sender: userId,
      accepted: true
    }).populate('receiver', '_id username');
    const receiverFriendships = await Friendship.find({
      receiver: userId,
      accepted: true
    }).populate('sender', '_id username');
    return res.json(senderFriendships.concat(receiverFriendships));
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});

// GET Friendships where user is the sender (pending request)
router.get('/:userId/pendingRequests', async (req, res) => {
  const { userId } = req.params;
  try {
    const friendships = await Friendship.find({
      sender: userId,
      accepted: false
    }).populate('receiver', '_id username');
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
    }).populate('sender', '_id username');
    return res.json(friendships);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error fetching friendships' });
  }
});

// POST Request a new friendship
router.post('/:userId/requestFriendship', async (req, res) => {
  const { userId } = req.params;
  const { receiverId } = req.body;

  const exists = await Friendship.findOne({
    sender: userId,
    receiver: receiverId
  });

  if (exists) {
    return res.json({ message: 'Friendship or request already exists' });
  }

  try {
    const friendship = await Friendship.create({
      sender: userId,
      receiver: receiverId,
      accepted: false
    });
    return res.json(friendship);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error requesting friendship' });
  }
});

// PUT Accept a friendship
router.post('/:userId/acceptFriendship', async (req, res) => {
  const { userId } = req.params;
  const { senderId } = req.body;
  try {
    const friendship = await Friendship.findOneAndUpdate(
      { sender: senderId, receiver: userId },
      { accepted: true },
      { new: true } // Return the updated document.
    );
    // On a successful accept, update user's friends list in user instance.
    const userOne = await User.findById(userId);
    const userTwo = await User.findById(senderId);
    userOne.friends.push(senderId);
    userTwo.friends.push(userId);
    await userOne.save();
    await userTwo.save();
    return res.json(friendship);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error accepting friendship' });
  }
});

// DELETE Cancel a pending friendship
router.delete('/:userId/deletePendingFriendship', async (req, res) => {
  const { userId } = req.params;
  const { otherUserId } = req.body;
  console.log(userId);
  console.log(otherUserId);
  try {
	const relation = await Friendship.find({
		sender: userId,
		receiver: otherUserId,
		accepted: false
	})
	console.log('before delete: ', relation);
    const friendship = await Friendship.findOneAndDelete({
      sender: userId,
      receiver: otherUserId,
	  accepted: false
    });
	console.log('Deleted friendship: ', friendship);
	return res.json(friendship)
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error canceling pending friendship' });
  }
});

// DELETE Delete a friendship
router.delete('/:userId/deleteAcceptedFriendship', async (req, res) => {
  const { userId } = req.params;
  const { otherUserId } = req.body;
  try {
    const senderFriendships = await Friendship.findOneAndDelete({
      sender: userId,
      receiver: otherUserId
    });
    const receiverFriendships = await Friendship.findOneAndDelete({
      sender: otherUserId,
      receiver: userId
    });
    console.log(senderFriendships, receiverFriendships)
    const friendship = senderFriendships || receiverFriendships;
    const userOne = await User.findById(userId);
    const userTwo = await User.findById(otherUserId);
    // Remove each user from the other's friends list.
    const indexOne = userOne.friends.indexOf(otherUserId);
    if (indexOne > -1) {
      userOne.friends.splice(indexOne, 1);
    }
    const indexTwo = userTwo.friends.indexOf(userId);
    if (indexTwo > -1) {
      userTwo.friends.splice(indexTwo, 1);
    }
    await userOne.save();
    await userTwo.save();
    return res.json(friendship);
  } catch (error) {
    console.log(error);
    return res.json({ message: 'Error canceling accepted friendship ' });
  }
});

module.exports = router;
