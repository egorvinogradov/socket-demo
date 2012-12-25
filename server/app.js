var socketIo = require('socket.io');
var http = require('http');
var fs = require('fs');

var settings = {
    PORT: 8080
};

function initialize(){
    var app = http
        .createServer(serveHTTP)
        .listen(settings.PORT);
    var io = socketIo.listen(app);
    io.sockets.on('connection', serveSockets);
};

function serveHTTP(request, response){
    response.writeHead(403);
    response.end('Websockets only');
};

function serveSockets(socket){
    getHotels(function(data){
        socket.emit('hotels', data);
    });
};

function getHotels(callback){
    // TODO: get from redis instead of fs
    fs.readFile('data/hotels.json', 'utf8', function(error, data){
        if ( !error ) {
            callback(JSON.parse(data));
        }
    });
};

initialize();
