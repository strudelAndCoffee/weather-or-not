# Weather-or-Not Weather Dashboard

This application lets you search for any city in the US, and displays the current weather conditions, as well as the 5 day forecast for that city. Cities that you search for are saved on the page for quick access, and persist over multiple browser sessions.

https://strudelandcoffee.github.io/weather-or-not/

This application was developed as a weekly challenge for the University of Texas Code Boot Camp, and utilizes the OpenWeather API (https://openweathermap.org/api/one-call-api), as well as Bootstrap and Moment.js.

All code is original, except where cited. A mockup for page layout and style was provided, and functionality guidelines were given through a user story and acceptance criteria.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
    THEN I am presented with current and future conditions 
    for that city and that city is added to the search history
WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon 
    representation of weather conditions, the temperature, the 
    humidity, the wind speed, and the UV index
WHEN I view the UV index
    THEN I am presented with a color that indicates whether the 
    conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the 
    date, an icon representation of weather conditions, the 
    temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions 
    for that city
```

The following image demonstrates the application functionality:

![weather dashboard demo](https://github.com/strudelAndCoffee/weather-or-not/blob/main/assets/images/demo-image.png?raw=true)