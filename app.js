var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.port || 5000


var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "lalalala Secret key"}));

//static folder
const staticfolder = express.static(__dirname + '/static')
app.use(staticfolder);

app.set('view engine', 'ejs');

app.get('/chat', (req, res) => {
    res.render("index",{})
})
app.get('/', (req, res) => {
    res.render("land",{})
})





app.get('/check', function(req, res){
    res.send("You are " + req.sessionID );
 });

 io.on('connection', function (socket) {
    socket.emit('newmsg', { msg: 'Hey' });
    socket.on('newmsg', function (data) {
        console.log(data.msg);
        socket.broadcast.emit('newmsg', { msg: data.msg, uid: data.uid});
      });
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
