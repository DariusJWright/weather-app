// variable linked to search button element
var button = document.querySelector("#btn");
// variable linked to input element
var searchCity = document.querySelector("#search");
// variable linking to history container
var searchHistory = document.querySelector("#cities");
// variable linking to the current display div
var current = document.querySelector("#current");
// variable linking to the five-day div
var fiveDay = document.querySelector("#five-day");
// variable linking to the forecast div
var forecast = document.querySelector("#forecast");

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
    cityEl.textContent = search.charAt(0).toUpperCase() + search.slice(1);

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
                displayCurrentWeather(data);
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
    var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&units=imperial&appid=76efa2b5af9a25d1a7e0ece204e591e4";

    // request info
    fetch(fiveDayUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayFiveDay(data);
            })
        }
        else {
            alert("You have encountered error:" + response.statusText);
        }    
    })
}

var displayCurrentWeather = function (weather) {
    
    //var cityDate = document.querySelector("#city-date");
    current.textContent = "";
    var cityName = document.createElement("h3");
    var weatherIcon = document.createElement("img");
    var temp = document.createElement("p");
    var humid = document.createElement("p");
    var wind = document.createElement("p");
    
    
    cityName.textContent = weather.name + " (" + moment().format("MM/DD/YYYY") +")" + weatherIcon;
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png");
    temp.textContent = "Temperature: " + weather.main.temp + " °F";
    humid.textContent = "Humidity: " + weather.main.humidity + "%";
    wind.textContent = "Wind speed: " + weather.wind.speed + " MPH";
    cityName.textContent = weather.name + " (" + moment().format("MM/DD/YYYY") +")";
    

    current.appendChild(cityName);
    current.appendChild(weatherIcon);
    current.appendChild(temp);
    current.appendChild(humid);
    current.appendChild(wind);
    getUv(weather);
    
}

var getUv = function (weather) {
    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=76efa2b5af9a25d1a7e0ece204e591e4&lat=" + lat + "&" + "lon=" + lon;
    
    return fetch(uvUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayUv(data);
            })
        }
        else {
            alert("You have encountered error:" + response.statusText);
        }
    });
}

var displayUv = function (data) {
    var uv = document.createElement("p");
    var uvSpan = document.createElement("span");
    
    if (data.value < 3) {
        uvSpan.className = "uv-green"
    }
    else if (data.value < 8) {
        uvSpan.className = "uv-yellow";
    }
    else {
        uvSpan.className = "uv-red";
    }
    uvSpan.textContent = data.value;
    uv.textContent = "UV Index: ";
    uv.appendChild(uvSpan);
    
    current.appendChild(uv);
}

var displayFiveDay = function (weather) {
    forecast.textContent = "";
    var forecastHeader = document.createElement("h3");
    forecastHeader.textContent = "Five Day Forecast:";
    forecast.appendChild(forecastHeader);

    var day = Math.floor((new Date()).getTime()/1000);
    console.log(day);
    console.log(typeof(day));
    // for (var i = 0; i <)
    
}

button.addEventListener("click", buttonHandler)
searchCity.addEventListener("keyup", function (event) {
    if (event.keycode === 13) {
        event.preventDefault();
        button.click();
    }
});
searchHistory.addEventListener("click", historySearch);
console.log(moment().add(1, "day").format("YYYY-MM-DD HH:mm:ss"));