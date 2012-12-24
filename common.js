var hotels = [];
var template = $('.template').html();
var settings = {
    HOST: 'http://localhost:8080'
};

function initialize(){
    console.log('Initialize');
    var socket = io.connect(settings.HOST);
    socket.on('hotels', $.proxy(handleHotels, this));
    socket.on('coordinates', $.proxy(handleHotels, this));
};

function handleHotels(data){
    console.log('handle hotels', data);
    this.hotels.push(data);
    renderHotels(data)
};

function handleCoordinates(data){
    console.log('handle coordinates', data);
};

function renderHotels(data){
    var html = [];
    for ( var i = 0, l = data.length; i < l; i++ ) {
        html.push(
            _.template(template, data[i])
        );
    }
    $('.hotels').append(html.join('\n'));
};

$(document).ready(
    $.proxy(initialize, this)
);
