// wetaher data one call: "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=13ddc6bf74170f310b01600989915eea"
// weather icon url: http://openweathermap.org/img/wn/10d.png
// kelvin to fahrenheight: (285K − 273.15) × 9/5 + 32
// austin, tx = lat: 30.266666  lon: -97.733330

var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=30.266666&lon=-97.733330&appid=13ddc6bf74170f310b01600989915eea";

fetch(apiUrl)
.then(function(response) {
    response.json()
    .then(function(data){
        console.log(data);
    });
});