let key = 0;
let today =moment().format("MMM, Do YYYY");
var reSearch= document.getElementById("searchHistory");
//Entry
function getLocationWeather() {
  event.preventDefault();
  var cityEl= document.getElementById("cityWeather");
  var cityValue= cityEl.value.trim();
  document.getElementById("city").innerHTML=cityValue;
  document.getElementById("date").innerHTML=today;
  var searchHistory = document.createElement("button");
  searchHistory.innerHTML = cityValue;
  searchHistory.id=cityValue;
  document.getElementById("searchHistory").appendChild(searchHistory);
  var ulLength=document.getElementsByTagName("button").length-1;
  console.log(ulLength)
  localStorage.setItem("button-" + key, cityValue);
  key = (key +1) % 10;
  

  var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityValue + '&limit=1&appid=693570c83db4d8972c67bd010c506b90';
      fetch(geoApiUrl).then(handleGeoLocation);
}

function handleGeoLocation(response) {
    if (response.ok) {
        response.json().then(handleGeoLocationData)
    } else {
        alert('Error: ' + response.statusText);
    }
}

function handleGeoLocationData (data) {
  var weatherApiUrl='https://api.openweathermap.org/data/3.0/onecall?lat=' + (data[0].lat) + '&lon=' + (data[0].lon) + '&exclude=currently,minutely,hourly&units=imperial&appid=693570c83db4d8972c67bd010c506b90';
  fetch(weatherApiUrl)
    .then(function (response) {
      if (!response.ok) {
        alert('Error: ' + response.statusText);
        return;
      }
      return response.json();
    })
    .then(function (data) {
        var cityEl= document.getElementById("cityWeather");
        var cityValue= cityEl.value.trim();
        city=JSON.stringify(data)
        localStorage.setItem(cityValue, city)
        displayWeather(data);
    })
    .catch(function (error) {
      console.error(error)
    })
  }
    /*if (response.ok) {
      response.json().then(
      displayWeather(data)
      ).then(function(city) {
      city=JSON.stringify(city)
      localStorage.setItem(cityValue, city)
      }
      )

      //todo: stringify data. save inside local store.  
    } /*else {
     
    }*/

function savedWeather (city) {
  var savedCity=localStorage.getItem(city)
  savedCity=JSON.parse(savedCity)
  document.getElementById("city").innerHTML=city;
  document.getElementById("date").innerHTML=today;
  displayWeather (savedCity)
  //todo: retrieve local data.

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

function displayWeather (data) {
      //document.getElementById("city").innerHTML=cityValue;
      //document.getElementById("date").innerHTML=today;
      document.getElementById("currentTemp").innerHTML="It is currently " + (data.current.temp)+ " degrees.";
      document.getElementById("currentWindSpeed").innerHTML="Wind Speed is " + (data.current.wind_speed) + " mph.";
      document.getElementById("currentHumidity").innerHTML=(data.current.humidity)+"% humidity.";
      document.getElementById("currentUvi").innerHTML="With an Ultraviolet Index of "+(data.current.uvi);
      if (data.current.uvi <= 2) {
        var warning=document.getElementById("currentUvi");
        warning.classList.add("uviEnjoy");
      } else if (data.current.uvi > 2 && data.current.uvi < 6) {
        var warning=document.getElementById("currentUvi");
        warning.classList.add("uviCaution");
      } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
        var warning=document.getElementById("currentUvi");
        warning.classList.add("uviWarning");
      } else (data.current.uvi >= 8 && data.current.uvi < 11); {
        var warning=document.getElementById("currentUvi"); 
        warning.classList.add("uviAvoid");
      }
      
      //------- above, current --------- below, forecast------
      
      for (i=1; i <= 5; i++) {
        var date=moment.unix(data.daily[i].dt).format("MMM Do, YYYY");
        var tempDay=(data.daily[i].temp.day);
        var windSpeed=(data.daily[i].wind_speed);
        var humidity=(data.daily[i].humidity);
        document.getElementById("date" + i).innerHTML=date;
        document.getElementById("tempDay"+ i).innerHTML="Temerature " +tempDay;
        document.getElementById("windSpeed"+ i).innerHTML="Wind Speed " +windSpeed;
        document.getElementById("humidity"+ i).innerHTML="Humidity " +humidity;
      }
}

reSearch.addEventListener("click", function fetchLocal (event) {
  var city=event.target.innerHTML
  savedWeather (city) 
})

init ();
