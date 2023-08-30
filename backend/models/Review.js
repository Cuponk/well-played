const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	gameId: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	gameplayRating: {
		type: Number,
		required: true
	},
	storyRating: {
		type: Number,
		required: true
	},
	visualsRating: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('Review', reviewSchema);
