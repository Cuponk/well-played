const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	title: {
		type: String,
		required: true,
		index: true
	},
	description: {
		type: String,
		required: true
	},
	releaseYear: {
		type: Number,
		required: true
	},
	genre: {
		type: String,
		required: true,
		index: true
	},
	genreTags: {
		type: Array,
		required: true
	},
	studio: {
		type: String,
		required: true
	},
	portrait: {
		type: String,
		required: false
	},
	backgroundImage: {
		type: String,
		required: false
	},
	additionalImages: {
		type: Array,
		required: false
	},
	videoUrl: {
		type: String,
		required: false
	},
	maxPlayers: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('Game', gameSchema);
