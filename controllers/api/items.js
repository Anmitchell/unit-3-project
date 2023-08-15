const { Item } = require('../../models/item')

module.exports = {
    index,
    show
}

// Remember when performing database queries, asyncronous functions are needed
// The try and catch block are needed for error handling
async function index(req, res) {
    try {
        // Fetch a list of items from the database using the Item model:
        // Retieve all items from the database
        // Sort the items in alphabetical order based on their 'name' property
        // Replace the category field in each item with the corresponding category details, retrieves data from category collection
        // and executes the query and returns a promise, await is used to wait for the promise to resolve before moving
        // on to the next line
        const items = await Item.find({}).sort('name').populate('category').exec()
        // re-sort based upon the sortOrder of the categories
        items.sort((a, b) => a.category.sortOrder - b.category.sortOrder)
        res.status(200).json(items) // return successful and the list of items in JSON format
    } catch (e) {
        res.status(400).json( {msg: e.message} )
    }
}

// Locate an item based on its id in the database
async function show(req, res) {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item)
    } catch (e) {
        res.status(400).json( {msg: e.message} )
    }
}