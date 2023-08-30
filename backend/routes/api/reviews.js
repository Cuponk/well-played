const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = mongoose.model("Review");

// Get specific review with reviewId
router.get('/:reviewId', async (req, res) => {
	const reviewId = req.params.reviewId;
	try {
		const review = await Review.findById(reviewId);
		if (review) {
			res.json(review);
		} else {
			res.json({ message: `No review found for reviewId: ${reviewId}`})
		}
	} catch (err) {
		res.json({ message: `Error getting ${reviewId} review`})
	}
})

router.post('/', async (req, res) => {
	try {
		const newReview = new Review({
			author: req.body.authorId,
			game: req.body.igdbId,
			description: req.body.description,
			ratings: {
				gameplay: req.body.ratings.gameplay,
				story: req.body.ratings.story,
				visuals: req.body.ratings.visuals
			}
		});

		let review = await newReview.save();

		return res.json(review);
	} catch (err) {
		res.json({ message: `Error posting review from userId: ${req.body.userId} to gameId ${req.body.gameId}` })
	}
})

// Get all reviews
router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find();
		
		return res.json(reviews);
	} catch (err) {
		res.json({ message: 'Error getting all reviews'})
	}
})

module.exports = router;