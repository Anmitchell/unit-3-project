require('dotenv').config()
require('./config/database') // connection to mongoDB database is made in database file

const app = require('./app-server')
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`I am listening on ${PORT}. We In The Building`)
})