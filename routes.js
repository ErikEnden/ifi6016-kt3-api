const sql = require('./sql')

exports.index = function(req, res){
    res.send('<h1>Hello</h1>')
}

exports.default = function(req, res){
    res.send('Invalid route')
}

exports.downvotes = function(req, res){
    let query = 'SELECT Post.title, Post_vote.value FROM Post_vote INNER JOIN Post ON Post_vote.post_id = Post.id WHERE value = 0'

    if(typeof(req.params.id) !== 'undefined'){
        query = query.concat(' AND user_id = ' + req.params.id)
    }

    let result = sql.querySql(query, function(data){
        res.send(data.recordset)
    }, function(err){
        console.log('Error: ' + err)
    })
}

exports.favouritesByUsername = function(req, res){
    console.log(req.params.username)
    let query = "SELECT [Post].title FROM dbo.[Favourite] INNER JOIN dbo.[User] ON [Favourite].user_id = [User].id INNER JOIN dbo.[Post] ON [Post].id = [Favourite].post_id WHERE [User].username = '" + req.params.username + "'"
    let result = sql.querySql(query, function(data){
        res.send(data.recordset)
    }, function(err){
        console.log('Error: ' + err)
    })
}

exports.postsByYear = function(req, res){
    console.log(req.params.year)
    let query = "SELECT COUNT(*) as post_count FROM dbo.Post WHERE date BETWEEN '" + req.params.year + "-01-01 00:00:00.000' AND '" + req.params.year + "-12-31 00:00:00.000'"
    let result = sql.querySql(query, function(data){
        res.send(data.recordset)
    }, function(err){
        console.log('Error: ' + err)
    })
}