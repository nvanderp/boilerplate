const db = require('./server/db/models')
const app = require('./server')
const port = process.env.PORT || 3000

db.sync()  // sync our database
    .then(() => {
        console.log('db synced')
        app.listen(port, () => {
            console.log(`Listening on port ${port}`) // then start listening with our express server once we have synced
        })
    })