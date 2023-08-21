const { model, Schema } = require('mongoose')
require('./category')

const itemSchema = new Schema({
    name: { type: String, required: true},
    description: {type: String},
    emojiURL: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    price: { type: Number, require: true, default: 0}
}, {
    timestamps: true
})

module.exports = {
    itemSchema,
    Item: model('Item', itemSchema)
}