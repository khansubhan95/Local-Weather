/*NOTE Example works only not on https but on http.Replace https in address bar with http*/

var temperature_celsius = 0;
var temperature_fahrenheit = 0;

function getLocationAndWeather() {
    $.ajax({
        url: 'https://ipinfo.io',
        success: function(json) {
            setLocation(json.city + ' ' + json.country, json.loc);
        },
        dataType: 'jsonp'
    });
}

function setLocation(cityCountry, loc) {
    $('#country-city').html(cityCountry);
    $('#location').html(loc);
    var coords = loc.split(',');
    var lat = coords[0];
    var lon = coords[1];
    var weatherURL = 'https://salt-horse.glitch.me/api/weather?lat=' + lat + '&lon=' + lon;
    $.ajax({
        url: weatherURL,
        success: function(weatherData) {
            setWeather(weatherData.main.temp, weatherData.weather[0].main, weatherData.weather[0].id);
        },
        dataType: 'json'
    });
}

function setWeather(temp, status, id) {
    $("#temp").html(Math.round(temp * 100) / 100 + ' &degC');
    temperature_celsius = temp;
    temperature_fahrenheit = 1.8 * temperature_celsius + 32;
    $("#temp-change").addClass('celsius');
    $("#status").html(status);
    $('#weather-icon').addClass('wi wi-owm-' + id);
}


$(document).ready(function() {
    getLocationAndWeather();
    $('#temp-change').click(function() {
        var status = $('#temp-change').attr('class');
        if (status === 'celsius') {
            $("#temp").html(Math.round(temperature_fahrenheit * 100) / 100 + ' &degF');
            $("#temp-change").removeClass('celsius');
            $("#temp-change").addClass('fahrenheit');
        } else {
            $("#temp").html(Math.round(temperature_celsius * 100) / 100 + ' &degC');
            $("#temp-change").removeClass('fahrenheit');
            $("#temp-change").addClass('celsius');
        }
    });
});