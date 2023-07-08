const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    items: [
        {
            item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model('Inventory', inventorySchema);
