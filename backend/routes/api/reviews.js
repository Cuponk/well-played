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
			res.json({ message: `No review found for reviewId: ${reviewId}` })
		}
	} catch (err) {
		res.json({ message: `Error getting ${reviewId} review` })
	}
})

// Post a review
router.post('/', async (req, res) => {
	try {
		const newReview = new Review({
			authorId: req.body.authorId,
			gameId: req.body.gameId,
			description: req.body.description,
			gameplayRating: req.body.gameplayRating,
			storyRating: req.body.storyRating,
			visualsRating: req.body.visualsRating
		});

		let review = await newReview.save();

		return res.json(review);
	} catch (err) {
		res.json({ message: `Error posting review from authorId: ${req.body.authorId} to gameId ${req.body.gameId}` })
	}
})

// Remove a review 
router.delete('/:reviewId', async (req, res) => {
	try {
		const review = await Review.findById(req.params.reviewId)

		if(!review) {
			return res.json({ message: 'Review not found'})
		}
		await review.remove();
		return res.json({ message: 'Review deleted'});
	} catch (err) {
		console.log(err)
		res.json({ message: `Error removing review made by authorID: ${req.body.authorId}`})
	}
})

// Get all reviews
router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find();

		return res.json(reviews);
	} catch (err) {
		res.json({ message: 'Error getting all reviews' })
	}
})

module.exports = router;