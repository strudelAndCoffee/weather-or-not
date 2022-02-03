// wetaher data one call: "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=13ddc6bf74170f310b01600989915eea"
// one call url: "https://api.openweathermap.org/data/2.5/onecall?lat={}lon={}&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
// weather icon url: "http://openweathermap.org/img/wn/10d.png"
// to fahrenheight: units=imperial

var todaysDate = moment().format("(M/D/YYYY)");
var deg = "°F";
var austin = {
    name: "Austin ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=30.2666&lon=-97.7333&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};

fetch(austin.url)
.then(function(response) {
    response.json()
    .then(function(data){
        console.log(data);

        var currentIconUrl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
        var currentTemp = data.current.temp;

        var cityDateEl = document.getElementById("city-date");
        cityDateEl.innerHTML = austin.name + todaysDate + "<img src=" + currentIconUrl + " />";
        document.querySelector("#temp").textContent = Math.round(currentTemp) + deg;
        document.querySelector("#wind").textContent = data.current.wind_speed + " MPH";
        document.querySelector("#humidity").textContent = data.current.humidity + " %";
        document.querySelector("#uv").textContent = data.current.uvi;

        var forecastEl = document.getElementById("forecast");

        for (var i = 1; i <= 5; i++) {
            var dayCard = document.createElement("div");

            var dateEl = document.createElement("h2");
            dateEl.innerHTML = moment().add(i, "d").format("(M/D/YYYY)");
            
            dayCard.appendChild(dateEl);
            forecastEl.appendChild(dayCard);
        }
    });
});