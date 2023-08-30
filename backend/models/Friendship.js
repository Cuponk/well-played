const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendshipSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    accepted: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Friendship', friendshipSchema);
