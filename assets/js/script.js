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
    fiveDay.textContent = "";
    var forecastHeader = document.createElement("h3");
    forecastHeader.textContent = "Five Day Forecast:";
    forecast.appendChild(forecastHeader);
    
    // display first day
    var day1 = document.createElement("div");
    day1.className = "day";
    var date1 = document.createElement("h5");
    date1.textContent = moment().add(1, "day").format("MM/DD/YYYY");
    day1.appendChild(date1);
    console.log(weather.list[2].weather[0].icon);

    var dayIcon1 = document.createElement("img");
    dayIcon1.setAttribute("src", "http://openweathermap.org/img/w/" + weather.list[2].weather[0].icon + ".png");
    day1.appendChild(dayIcon1);
    

    var temp1 = document.createElement("p");
    temp1.textContent = "Temp: " + weather.list[2].main.temp;
    day1.appendChild(temp1);

    var humidity1 = document.createElement("p");
    humidity1.textContent = "Humidity: " + weather.list[2].main.humidity + "%";
    day1.appendChild(humidity1);
    fiveDay.appendChild(day1);

    // display second day
    var day2 = document.createElement("div");
    day2.className = "day";
    var date2 = document.createElement("h5");
    date2.textContent = moment().add(2, "day").format("MM/DD/YYYY");
    day2.appendChild(date2);
    

    var dayIcon2 = document.createElement("img");
    dayIcon2.setAttribute("src", "http://openweathermap.org/img/w/" + weather.list[10].weather[0].icon + ".png");
    day2.appendChild(dayIcon2);
    

    var temp2 = document.createElement("p");
    temp2.textContent = "Temp: " + weather.list[10].main.temp;
    day2.appendChild(temp2);

    var humidity2 = document.createElement("p");
    humidity2.textContent = "Humidity: " + weather.list[10].main.humidity + "%";
    day2.appendChild(humidity2);
    fiveDay.appendChild(day2);

    // display third day
    var day3 = document.createElement("div");
    day3.className = "day";
    var date3 = document.createElement("h5");
    date3.textContent = moment().add(3, "day").format("MM/DD/YYYY");
    day3.appendChild(date3);
    

    var dayIcon3 = document.createElement("img");
    dayIcon3.setAttribute("src", "http://openweathermap.org/img/w/" + weather.list[18].weather[0].icon + ".png");
    day3.appendChild(dayIcon3);
    

    var temp3 = document.createElement("p");
    temp3.textContent = "Temp: " + weather.list[18].main.temp;
    day3.appendChild(temp3);

    var humidity3 = document.createElement("p");
    humidity3.textContent = "Humidity: " + weather.list[18].main.humidity + "%";
    day3.appendChild(humidity3);
    fiveDay.appendChild(day3);

    // display fourth day
    var day4 = document.createElement("div");
    day4.className = "day";
    var date4 = document.createElement("h5");
    date4.textContent = moment().add(4, "day").format("MM/DD/YYYY");
    day4.appendChild(date4);
    

    var dayIcon4 = document.createElement("img");
    dayIcon4.setAttribute("src", "http://openweathermap.org/img/w/" + weather.list[26].weather[0].icon + ".png");
    day4.appendChild(dayIcon4);
    

    var temp4 = document.createElement("p");
    temp4.textContent = "Temp: " + weather.list[26].main.temp;
    day4.appendChild(temp4);

    var humidity4 = document.createElement("p");
    humidity4.textContent = "Humidity: " + weather.list[26].main.humidity + "%";
    day4.appendChild(humidity4);
    fiveDay.appendChild(day4);

    // display fifth day
    var day5 = document.createElement("div");
    day5.className = "day";
    var date5 = document.createElement("h5");
    date5.textContent = moment().add(5, "day").format("MM/DD/YYYY");
    day5.appendChild(date5);
    

    var dayIcon5 = document.createElement("img");
    dayIcon5.setAttribute("src", "http://openweathermap.org/img/w/" + weather.list[34].weather[0].icon + ".png");
    day5.appendChild(dayIcon5);
    

    var temp5 = document.createElement("p");
    temp5.textContent = "Temp: " + weather.list[34].main.temp;
    day5.appendChild(temp5);

    var humidity5 = document.createElement("p");
    humidity5.textContent = "Humidity: " + weather.list[34].main.humidity + "%";
    day5.appendChild(humidity5);
    fiveDay.appendChild(day5);
}

button.addEventListener("click", buttonHandler)
searchCity.addEventListener("keyup", function (event) {
    if (event.keycode === 13) {
        event.preventDefault();
        button.click();
    }
});
searchHistory.addEventListener("click", historySearch);