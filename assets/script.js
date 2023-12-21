// This is the API key
var apiKey = 'd40e3b8f398b80a2a9e638ead63583f2';

// the following is an event listener so that when the search form button is clicked we get the user input for the name of the city, starting date, then we can call the Function to fetch the weather data from OpenWeatherMap and the createCityButton to create a city button

$("#search-form").on("submit", function (event) {
    event.preventDefault();
  
    var cityName = $("#search-input").val().trim();
    
    console.log("City Name:", cityName);
  
    // Call the getWeatherData function with the cityName, startDate, and endDate
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
  
// This is the function to display weather information on the page. It is divided into several parts

function displayWeatherInfo(weatherData) {
  // The first thing I do is to clear the existing content in the #today and #forecast elements so that only the current search or the city button pressed shows on the screen 

  $("#forecast").empty();

  var currentWeather = weatherData.list[0];


  // Here I create the containers and append the content for the first day
  
  $firstDayContainer.append("<h2>" + weatherData.city.name + "</h2>");
  $firstDayContainer.append("<p>Date: " + currentWeather.dt_txt + "</p>");
  var iconUrl = "https://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png";
  $firstDayContainer.append("<img src='" + iconUrl + "' alt='Weather Icon'>");
  $firstDayContainer.append("<p>Temperature: " + currentWeather.main.temp + " °C</p>");
  $firstDayContainer.append("<p>Humidity: " + currentWeather.main.humidity + "%</p>");
  $firstDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

  // The I append the containers to the #today element of the html

  $("#today").append($firstDayContainer);

  // At this stage I need to create a row container for the other 5 days forecast

  var $forecastRow = $("<div class='row' id='forecast-row'>");

  // To get the data, I loop through the 5-day forecast data starting from index 0

  for (var i = 0; i < 5; i++) {
    var forecast = weatherData.list[i * 8];
    var forecastDate = forecast.dt_txt;
    var forecastIconUrl = "https://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";

    // Then I create a container for each forecast day and append the content for each forecast day to its container

    var $forecastDayContainer = $("<div class='col-md-2 col-sm-6 forecast-day'>");

    $forecastDayContainer.append("<p>Date: " + forecastDate + "</p>");
    $forecastDayContainer.append("<img src='" + forecastIconUrl + "' alt='Weather Icon'>");
    $forecastDayContainer.append("<p>Temperature: " + forecast.main.temp + " °C</p>");
    $forecastDayContainer.append("<p>Humidity: " + forecast.main.humidity + "%</p>");
    $forecastDayContainer.append("<p>Wind Speed: " + currentWeather.wind.speed + " m/s</p>");

    // Then I append the forecast day container to the forecast row
    $forecastRow.append($forecastDayContainer);
  }

  // Finally I append the forecast row to the #forecast element

  $("#forecast").html($forecastRow); 
}
