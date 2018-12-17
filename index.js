const express = require('express')
const logger = require('morgan')
const routes = require('./routes')

const app = express()

const server = app.listen(3000, function(){
    console.log('listening on 3000')
})

app.use(logger('dev'))

app.get('/', routes.index)
app.get('/api/upvotes/:id?', routes.downvotes)
app.get('/api/posts/:username?', routes.favouritesByUsername)
app.get('/api/posts_year/:year?', routes.postsByYear)
app.get('*', routes.default)
// app.get('/api/2018_posts', routes.posts2018)
