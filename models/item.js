const { model, Schema } = require('mongoose')
require('./category')

const itemSchema = new Schema({
    name: { type: String, required: true},
    emoji: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    price: { type: Number, require: true, default: 0}
}, {
    timestamps: true
})

module.exports = {
    itemSchema,
    Item: model('Item', itemSchema)
}