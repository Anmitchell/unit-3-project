const { model, Schema } = require('mongoose')
const  { itemSchema } = require('./item')

/*******************************************************************************/
/******************** Line Items and virtual functions *************************/
/*******************************************************************************/
// A model made to hold item and quantity of that item
const lineItemSchema = new Schema({
    qty: { type: Number, default: 1},
    item: itemSchema // includes an item that is defined by item schema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

/****** Used to calculate cost with multiple orders of the same item ******/
// takes quantity of item and mulitplies it by its price
lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.item.price
})


/*******************************************************************************/
/**************** Order Schema and Virtual Functions ***************************/
/*******************************************************************************/
const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'}, // user
    lineItems: [lineItemSchema], // all items in order
    isPaid: { type: Boolean, default: false} // whether or not items have been paid
}, {
    timestamps: true, // timestamp of when order was placed
    toJSON: { virtuals: true}
})

/*******************************************************************************/
/****** Used to count the total price of all items in order ******/
/*******************************************************************************/
// Calculate and return the total cost of the order based on the extended prices of its line items.
// Function accumulates the total starting from 0
orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})
/*******************************************************************************/
/****** This is used to count total number of items in order ******/
/*******************************************************************************/
// Function returns total item quantity in cart
// function accumulates total item count starting from 0
orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

// Returns the last 6 numbers of the id in the order document
// Provides a unique id for order when needing to reference later in order history
orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

// Retrieves the user's cart (order) from the database or creates a new one if it doesn't exist.
// Static method can be called on the model that uses a schema to interact with the database
orderSchema.statics.getCart = function(userId) {
    // find a specific order in the database and update it.
    return this.findOneAndUpdate(
        { user: userId, isPaid: false},
        { user: userId }, // set user property to the provided userId, locates and set user from database to order in database
        { upsert: true, new: true} // if order is not found, create new order with provided data
    )
}

// Add item by id to cart
// if item is already in the cart, increase quantity of item
// if item is not in the cart, add it to the cart
orderSchema.methods.addItemToCart = async function(itemId) {
    const cart = this // this is the orderSchema
    // Check if item is already in cart by id
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    // if item is already in cart, increase quantity of item by 1
    if (lineItem) {
        lineItem.qty += 1
    } else {
        // if item is not in cart, search database for item and add item to cart
        const item = await model('Item').findById(itemId)
        cart.lineItems.push({ item })
    }
    return cart.save() // save item to cart to database
}

orderSchema.methods.setItemQty = function(itemId, newQty) {
    const cart = this
    // locate line item in cart/order
    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    // if quantity of item is less than zero, remove item from order/cart
    if (lineItem && newQty <= 0) {
        lineItem.deleteOne()
    } else if (lineItem) {
        // Set the new qty - positive value is assured thanks to prev if statement
        lineItem.qty = newQty
    }
    // return the save() method's promise
    return cart.save()
}

module.exports = model('Order', orderSchema)