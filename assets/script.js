let key = 0;

function getLocationWeather() {
  event.preventDefault();
  var cityEl= document.getElementById("cityWeather");
  var cityValue= cityEl.value.trim();
  console.log(cityValue);
  var searchHistory = document.createElement("button");
  searchHistory.innerHTML = cityValue;
  //for (i=0, )
  searchHistory.id=cityValue;
  document.getElementById("searchHistory").appendChild(searchHistory);
  var ulLength=document.getElementsByTagName("button").length-1;
  console.log(ulLength)
  localStorage.setItem("button-" + key, cityValue);
  key = (key +1) % 10;
  /*if (cityValue !== "") {
    localStorage.setItem("City", cityValue);
  } else {
    return;
  }*/
  

  var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityValue + '&limit=1&appid=693570c83db4d8972c67bd010c506b90';
      fetch(geoApiUrl).then(handleGeoLocation);
}
    /*fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data, );
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Open Weather Geolocation');
      });*/


/*getLocationWeather()
    var geoLocation= http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit=1&appid=693570c83db4d8972c67bd010c506b90
        fetch(geoLocation)
            .then((response) => response.json())
            .then((data)=> console.log(data))

    var weather= https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=hourly&appid=693570c83db4d8972c67bd010c506b90;*/

function handleGeoLocation(response) {
    if (response.ok) {
        response.json().then(handleGeoLocationData)
    } else {
        alert('Error: ' + response.statusText);
    }
}

function handleGeoLocationData (data) {
    console.log(data[0].lat)
    console.log(data[0].lon)
    var weatherApiUrl='https://api.openweathermap.org/data/3.0/onecall?lat=' + (data[0].lat) + '&lon=' + (data[0].lon) + '&exclude=currently,minutely,hourly&units=imperial&appid=693570c83db4d8972c67bd010c506b90';
    fetch(weatherApiUrl).then(weather); 
}


function weather(response) {
  if (response.ok) {
    response.json().then(function displayWeather(data) {
      console.log(data.current.temp)
      console.log(data.current.wind_speed)
      console.log(data.current.humidity)
      });
  } else {
      alert('Error: ' + response.statusText);
  }
}
function init (){
  for ( let i=0; i<= 9; i++) {
    var getSearchHistory = localStorage.getItem("button-"+i);
        if (getSearchHistory !== null) {
          var searchHistory = document.createElement("button");
          searchHistory.innerHTML = getSearchHistory;
          document.getElementById("searchHistory").appendChild(searchHistory);
        } 
  }
}
init ()