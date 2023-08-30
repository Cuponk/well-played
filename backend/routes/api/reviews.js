const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = mongoose.model("Review");

router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find();
		
		return res.json(reviews);
	} catch (err) {
		res.json({ message: 'Error getting all reviews'})
	}
})

module.exports = router;