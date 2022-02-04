// Global Variables
var todaysDate = moment().format("(M/D/YYYY)");
var deg = "°F";
var savedCities = JSON.parse(localStorage.getItem("cities"));
var visitedCities = [];

// Global Functions
// extracts latitude and longitude from searched city and sends url and name to weather display function
var searchCity = function(url) {

    var apiUrl = "https://" + url;

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {

                if (!data[0]) {
                    alert("City name not recognized. Please try again");
                } else {
                    var city = data[0].name;
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=13ddc6bf74170f310b01600989915eea";
                    displayCityWeather(city, url);
                    saveCity(city, url);
                }
            })
        } else {
            alert("Cannot complete request at this time.");
        }
    });
};

// gets data from selected city object url and displays data on main section
var displayCityWeather = function(city, url) {

    document.querySelector("#forecast").innerHTML = "";

    fetch(url)
    .then(function(response) {
        response.json()
        .then(function(data) {

            var currentIconUrl = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
            var currentTemp = data.current.temp;
            var currentUv = data.current.uvi;

            // current weather display
            var cityDateEl = document.getElementById("city-date");
            cityDateEl.innerHTML = city + " " + todaysDate + "<img src=" + currentIconUrl + " />";
            document.querySelector("#temp").textContent = Math.round(currentTemp) + deg;
            document.querySelector("#wind").textContent = data.current.wind_speed + " MPH";
            document.querySelector("#humidity").textContent = data.current.humidity + " %";
            document.querySelector("#uv").textContent = currentUv;
            if (currentUv <= 2) {
                document.querySelector("#uv").setAttribute("class", "badge badge-success");
            }
            else if (currentUv > 2 && currentUv <= 7) {
                document.querySelector("#uv").setAttribute("class", "badge badge-warning");
            }
            else {
                document.querySelector("#uv").setAttribute("class", "badge badge-danger");
            }
            
            // 5 day forecast display
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
                iconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + ".png");
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

// saves searched city's name/url to local storage
var saveCity = function(city, apiUrl) {

    var btnIndex;
    var cityObj = {
        name: city,
        url: apiUrl
    };

    if (!savedCities) {
        var btnIndex = 0;
    } else {
        var btnIndex = savedCities.length;
    }
    
    createCityBtn(city, btnIndex);

    visitedCities.push(cityObj);
    localStorage.setItem("cities", JSON.stringify(visitedCities));
    savedCities = JSON.parse(localStorage.getItem("cities"));
}

// creates buttons for visited cities
var createCityBtn = function(city, btnIndex) {

    var visitedCityList = document.querySelector("#city-list");
    var cityBtn = document.createElement("button");
    cityBtn.className = "btn btn-secondary btn-md my-2";
    cityBtn.setAttribute("data-index", btnIndex);
    cityBtn.textContent = city;
    visitedCityList.appendChild(cityBtn);
};

// generates buttons for cities saved in local storage
var loadCityBtns = function() {

    visitedCities = [];
    
    if (!savedCities) {
        return;
    } else {
        for (var i = 0; i < savedCities.length; i++) {
            var city = savedCities[i].name;
            var btnIndex = i;

            createCityBtn(city, btnIndex);
            visitedCities.push(savedCities[i]);
        }
    }
};

// Global Event Listeners
// city search button
document.querySelector(".search-form").addEventListener("click", function(event) {
    var target = event.target;

    if (target.matches("#search-btn")) {
        var textInput = document.querySelector("#city-name");

        if (!textInput.value) {
            textInput.value = "";
            return;
        } else {
            var city = textInput.value;
            var url = "api.openweathermap.org/geo/1.0/direct?q=" + city + ",us&limit=1&appid=13ddc6bf74170f310b01600989915eea";
            searchCity(url);
        }
        textInput.value = "";
    }
});
// saved city list buttons
document.querySelector("#city-list").addEventListener("click", function(event) {
    var target = event.target;

    if (target.matches(".btn")) {
        var cityIndex = target.getAttribute("data-index");
        var cityObj = savedCities[cityIndex];

        displayCityWeather(cityObj.name, cityObj.url);
    }
});

loadCityBtns();