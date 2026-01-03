const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BagSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    color: { type: String, required: true },
    font: { type: String, required: true },
    keyFlavours: { type: [String], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});
const Bag = mongoose.model('Bag', BagSchema);
module.exports = Bag;