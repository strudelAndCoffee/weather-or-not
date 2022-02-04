// wetaher data one call: "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=13ddc6bf74170f310b01600989915eea"
// one call url: "https://api.openweathermap.org/data/2.5/onecall?lat={}lon={}&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
// weather icon url: "http://openweathermap.org/img/wn/10d.png"
// to fahrenheight: units=imperial

// Global variables
// display formats
var todaysDate = moment().format("(M/D/YYYY)");
var deg = "°F";
// city objects
var austin = {
    name: "Austin ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=30.2666&lon=-97.7333&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var chicago = {
    name: "Chicago ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=41.8818&lon=-87.6231&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var newYork = {
    name: "New York ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=40.7306&lon=-73.9352&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var orlando = {
    name: "Orlando ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=28.5383&lon=-81.3792&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var sanFran = {
    name: "San Francisco ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=37.7739&lon=-122.4312&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var seattle = {
    name: "Seattle ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=47.6080&lon=-122.3351&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var denver = {
    name: "Denver ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=39.7420&lon=-104.9915&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var atlanta = {
    name: "Atlanta ",
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=33.7537&lon=-84.3863&units=imperial&appid=13ddc6bf74170f310b01600989915eea"
};
var cityArray = [austin, chicago, newYork, orlando, sanFran, seattle, denver, atlanta];

var displayCity = function(city) {

    document.querySelector("#forecast").innerHTML = "";

    fetch(city.url)
    .then(function(response) {
        response.json()
        .then(function(data){
            console.log(data);

            var currentIconUrl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
            var currentTemp = data.current.temp;

            var cityDateEl = document.getElementById("city-date");
            cityDateEl.innerHTML = city.name + todaysDate + "<img src=" + currentIconUrl + " />";
            document.querySelector("#temp").textContent = Math.round(currentTemp) + deg;
            document.querySelector("#wind").textContent = data.current.wind_speed + " MPH";
            document.querySelector("#humidity").textContent = data.current.humidity + " %";
            document.querySelector("#uv").textContent = data.current.uvi;

            var forecastEl = document.getElementById("forecast");

            for (var i = 1; i <= 5; i++) {
                var icon = data.daily[i].weather[0].icon;
                var temp = data.daily[i].temp.day;
                var wind = data.daily[i].wind_speed;
                var humidity = data.daily[i].humidity;
                var dayCard = document.createElement("div");
                dayCard.className = "bg-dark text-light flex-grow-1 mr-3 pl-1";

                var dayEl = document.createElement("h4");
                if (i === 1) {
                    dayEl.innerHTML = "Tomorrow";
                } else {
                    dayEl.innerHTML = moment().add(i, "d").format("dddd");
                }
                dayCard.appendChild(dayEl);
                var dateEl = document.createElement("p");
                dateEl.className = "my-0";
                dateEl.innerHTML = moment().add(i, "d").format("(M/D/YYYY)");
                dayCard.appendChild(dateEl);

                var iconEl = document.createElement("img");
                iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + ".png");
                dayCard.appendChild(iconEl);
                var tempEl = document.createElement("p");
                tempEl.innerHTML = "Temp: " + Math.round(temp) + deg;
                dayCard.appendChild(tempEl);
                var windEl = document.createElement("p");
                windEl.innerHTML = "Wind: " + wind + " MPH";
                dayCard.appendChild(windEl);
                var humEl = document.createElement("p");
                humEl.innerHTML = "Humidity: " + humidity + "%";
                dayCard.appendChild(humEl);

                forecastEl.appendChild(dayCard);
            }
        });
    });
};

document.querySelector("#city-list").addEventListener("click", function(event) {
    var target = event.target;

    if (target.matches(".btn")) {
        var cityId = target.getAttribute("data-city");
        var city = cityArray[cityId];

        displayCity(city);
    }
});