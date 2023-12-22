// This is the API key
var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2';

// the following is an event listener so that when the search form button is clicked we get the user input for the name of the city, starting date, then we can call the Function to fetch the weather data from OpenWeatherMap and the createCityButton to create a city button

$("#search-form").on("submit", function (event) {
    event.preventDefault();
  
    var cityName = $("#search-input").val().trim();
    
    console.log("City Name:", cityName);
  
    // Call the getWeatherData function with the cityName
    getWeatherData(cityName);
    // Append a button for the searched city
    createCityButton(cityName);
  
    // Then clear the search input
    $("#search-input").val("");
  });
  
  function getWeatherData(cityName) {
    // This is the modified query url that does not include the start date and end date

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    console.log("Query URL:", queryURL);
  
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log("City weather data for " + cityName, response)
      displayWeatherInfo(response);
    });
  }
  
  // Displays weather function 

//// Displays weather information
function displayWeatherInfo(weatherData) {
  // Clear existing content
  $("#weather-info").empty();

  // Extract current weather data
  var currentWeather = weatherData.list[0];

  // Create row for the weather content
  var $weatherRow = $("<div class='row'>");

  // Create column for current weather
  var $firstDayContainer = $("<div class='col-md-12 mx-auto text-center mb-4'>");
  $firstDayContainer.append("<h2>" + weatherData.city.name + "</h2>");
  $firstDayContainer.append("<p>Date: " + currentWeather.dt_txt.split(' ')[0] + "</p>");
  var iconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
  $firstDayContainer.append("<img src='" + iconUrl + "' alt='Weather Icon'>");
  var temperatureCelsius = (currentWeather.main.temp - 273.15).toFixed(2);
  $firstDayContainer.append("<p>Temperature: " + temperatureCelsius + " °C</p>");
  $firstDayContainer.append("<p>Humidity: " + currentWeather.main.humidity + "%</p>");
  $firstDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");
  

  // Append current weather column to row
  $weatherRow.append($firstDayContainer);

  // Loop through 5-day forecast
  for (var i = 1; i < 5; i++) {
    var forecast = weatherData.list[i * 8];
    var forecastDate = forecast.dt_txt;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";

    // Create column for each forecast day
    var $forecastColumn = $("<div class='col-md-3'>");

    // Create container for each forecast day
    var $forecastContainer = $("<div class='forecast-day text-center'>");
    $forecastContainer.append("<p>Date: " + forecastDate.split(' ')[0] + "</p>");
    $forecastContainer.append("<img src='" + forecastIconUrl + "' alt='Weather Icon'>");
    $forecastContainer.append("<p>Temperature: " + (forecast.main.temp - 273.15).toFixed(2) + " °C</p>");
    $forecastContainer.append("<p>Humidity: " + forecast.main.humidity + "%</p>");
    $forecastContainer.append("<p>Wind Speed: " + forecast.wind.speed + " m/s</p>");

    // Append forecast day container to forecast column
    $forecastColumn.append($forecastContainer);

    // Append forecast column to row
    $weatherRow.append($forecastColumn);
  }

  // Append content row to weather-info div
  $("#weather-info").append($weatherRow);
}
