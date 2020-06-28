// variable linked to search button element
var button = document.querySelector("#btn");
// variable linked to input element
var searchCity = document.querySelector("#search");
// variable linking to history container
var searchHistory = document.querySelector("#cities");

var buttonHandler = function (event) {
    event.preventDefault();
    // variable linked to user city search
    var city = searchCity.value.trim();
    
    if (city) {
        historyEl(city);
        searchCity.value = "";
    }
    else {
        alert("Please Enter a City");
    }
}

var historyEl = function (search) {
    
    var cityEl = document.createElement("li");
    cityEl.className = "list-group-item";
    cityEl.textContent = search;

    searchHistory.appendChild(cityEl);
    getCurrentWeather(search);
}

var historySearch = function (event) {
    var cityText = event.target.textContent;
    getCurrentWeather(cityText);
}

var getCurrentWeather = function (search) {
    // insert user city into url
    var currentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + search + "&units=imperial&appid=76efa2b5af9a25d1a7e0ece204e591e4";
    
    // request info
    fetch(currentUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data, search);
            });
        }
        else {
            alert("You have encountered error:" + response.statusText);
        }
    })

    getFiveDay(search);
}

var getFiveDay = function (search) {
    // insert city into url
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=76efa2b5af9a25d1a7e0ece204e591e4";

    // request info
    fetch(fiveDayUrl).then(function (response) {
        response.json().then(function (data) {
            //displayFiveDay(data, search);
        })
    })
}

var displayCurrentWeather = function (weather, search) {
    var current = document.querySelector("#current");
    var cityName = document.createElement("h3");
    var weatherIcon = document.createElement("img");
    var temp = document.createElement("p");
    var humid = document.createElement("p");
    var wind = document.createElement("p");
    var uv = document.createElement("p");

    console.log(weather.icon);
    
    cityName.textContent = weather.name + " (" + moment().format("MM/DD/YYYY") +")";
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/.png");
    temp.textContent = "Temperature: " + weather.main.temp + " °F";
    humid.textContent = "Humidity: " + weather.main.humidity + "%";
    wind.textContent = "Wind speed: " + weather.wind.speed + " MPH";
    cityName.textContent = weather.name + " (" + moment().format("MM/DD/YYYY") +")";

    current.appendChild(cityName);
    current.appendChild(weatherIcon);
    current.appendChild(temp);
    current.appendChild(humid);
    current.appendChild(wind);
    current.appendChild(uv);
}

button.addEventListener("click", buttonHandler)
searchCity.addEventListener("keyup", function (event) {
    if (event.keycode === 13) {
        event.preventDefault();
        button.click();
    }
});
searchHistory.addEventListener("click", historySearch)