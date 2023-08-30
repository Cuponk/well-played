const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	game: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	ratings: {
		type: {
			gameplay: {
				type: Number,
				required: true
			},
			story: {
				type: Number,
				required: true
			},
			visuals: {
				type: Number,
				required: true
			}
		},
		required: true
	}
})	

module.exports = mongoose.model('Review', reviewSchema);
