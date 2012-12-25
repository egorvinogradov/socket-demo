var template;
var hotels = [];
var settings = {
    HOST: 'http://localhost:8080'
};

function initialize(){
    console.log('Initialize');
    template = $('#hotel-template').html();
    $('#connect').on('click', connect);
};

function connect(){
    var socket = io.connect(settings.HOST);
    socket.on('hotels', handleHotels);
    socket.on('coordinates', handleCoordinates);
};

function handleHotels(data){
    console.log('# Handle hotels', data);
    hotels.push(data);
    renderHotels(data);
};

function handleCoordinates(data){
    console.log('Handle coordinates', data);
};

function renderHotels(data){
    var html = [];
    for ( var i = 0, l = data.length; i < l; i++ ) {
        console.log('> Render hotel', data[i]);
        html.push(
            _.template(template, data[i])
        );
    }
    $('.hotels').append(html.join('\n'));
};

$(document).ready(initialize);
