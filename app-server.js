const express = require('express')
const path = require('path')
const logger = require('morgan')

const app = express()

app.use(express.json())

app.use( (req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(logger('dev')) // why is dev here?

// Check if token and create req.user
app.use(require('./config/checkToken'))

app.use(express.static(path.join(__dirname, 'public')))

// The base URL path segment that this route handler will respond to.
// When a request URL matches this pattern, the associated route handler will be executed
app.use('/api/users', require('./routes/api/users'))
// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn')
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'))
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'))

// This sets up a catch-all route that responds to any HTTP GET request by sending the index.html file located in the public directory. This is often used in client-side routing setups where a single-page application (SPA) handles routing on the client side. When a request is made to any path, the server responds with the index.html file, and the SPA's JavaScript code then handles the actual routing and rendering of different views on the client side.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app