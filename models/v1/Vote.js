const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bag: { type: Schema.Types.ObjectId, ref: 'Bag', required: true },
    createdAt: { type: Date, default: Date.now }
});
VoteSchema.index({ user: 1, bag: 1 }, { unique: true });
const Vote = mongoose.model('Vote', VoteSchema);
module.exports = Vote;