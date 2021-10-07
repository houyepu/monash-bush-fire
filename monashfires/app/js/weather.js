/* Pinpoint weather page */

/* KEYS */
PINPOINT_WEATHER_KEY = 'bv2navpndlkuqoodn100d8;';
const _username = encodeURIComponent('monash-university');
const _password = encodeURIComponent('CvdYP1GCPxyy');
var token = null;

/* Global variables */
var currentPinPointInfo = {};
var coordinates_lng = 0;
var coordinates_lat = 0;
var currentPinPoint = {};

var tempSlider = null;
var tempOutput = null;
var humdSlider = null;
var humdOutput = null;
var windSlider = null;
var windOutput = null;

// Test data for weather conditions page
function testWeather() {
    currentPinPointInfo = 
    {
        "id": 102144528,
        "name": "Warrnambool",
        "country": "Australia",
        "timezone": "Australia/Currie",
        "adminArea": "State of Victoria",
        "lon": 142.483337402,
        "lat": -38.383335114
    };

    coordinates_lng = currentPinPointInfo.lon;
    coordinates_lat = currentPinPointInfo.lat;

    currentPinPoint = 
    { 
        "time":"2021-10-03T17:38+11:00", 
        "symbol":"d000", 
        "symbolPhrase":"clear", 
        "temperature":20, 
        "feelsLikeTemp":20, 
        "relHumidity":50, 
        "dewPoint":10, 
        "windSpeed":3, 
        "windDirString":"NW", 
        "windGust":13, 
        "precipProb":3, 
        "precipRate":0,
        "cloudiness":14, 
        "thunderProb":0, 
        "uvIndex":1, 
        "pressure":1003.42, 
        "visibility":45697
    };
}
// testWeather();

/* Make pinpoint data available */
// Get pinpoint from local storage
var pinPoint = getDataLocalStorage(PINPOINT_WEATHER_KEY);
// pinPoint = pinPoint.fromData();

// Update global variables
currentPinPointInfo = pinPoint.locationInfo;
coordinates_lng = pinPoint.coordinates_lng;
coordinates_lat = pinPoint.coordinates_lat;

// Call foreca API for live weather conditions
getToken();

function getToken() {
    // Get token    
    fetch(`https://pfa.foreca.com/authorize/token?user=${_username}&password=${_password}`)
        .then(response => response.json())
        .then(data => {
            token = data.access_token;  
            token = encodeURIComponent(token)
            retrieveWeatherData()
        }
    )
}

function retrieveWeatherData() {
    // Get weather conditions
    fetch(`https://pfa.foreca.com/api/v1/current/${coordinates_lng},${coordinates_lat}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            currentPinPoint = data.current;  
            
            // Update page to display data correctly
            resetConditions();
            updateSliders();
            fireDanger();
            rotateArrow();
        }
    )
}

displayDate();

/* Set appropriate weather conditions correctly */


// Update weather conditions on page
function resetConditions () {
    tempSlider = document.getElementById("tempRange");
    tempOutput = document.getElementById("tempOutput");
    tempSlider.value = currentPinPoint.temperature;
    tempOutput.innerHTML = `${tempSlider.value}&#176C`; // Display the default slider value
    
    humdSlider = document.getElementById("humdRange");
    humdOutput = document.getElementById("humdOutput");
    humdSlider.value = currentPinPoint.relHumidity;
    humdOutput.innerHTML = `${humdSlider.value}%`; // Display the default slider value

    windSlider = document.getElementById("windRange");
    windOutput = document.getElementById("windOutput");
    windSlider.value = Math.round(currentPinPoint.windSpeed * 3.6); // get into km/h from m/s
    windOutput.innerHTML = `${windSlider.value} km/h`; // Display the default slider value

    var uvOutput = document.getElementById("uvOutput");
    uvOutput.innerHTML = currentPinPoint.uvIndex;

    var visibilityOutput = document.getElementById("visibilityOutput");
    visibilityOutput.innerHTML = `${Math.round(currentPinPoint.visibility/1000*100)/100} km`;
}

// Update sliders automatically
function updateSliders() {
    // Update the current slider value (each time you drag the slider handle)
    tempSlider.oninput = function() {
        tempOutput.innerHTML = `${this.value}&#176C`;
        fireDanger();
    }

    // Update the current slider value (each time you drag the slider handle)
    humdSlider.oninput = function() {
        humdOutput.innerHTML = `${this.value}%`;
        fireDanger();
    }

    // Update the current slider value (each time you drag the slider handle)
    windSlider.oninput = function() {
        windOutput.innerHTML = `${this.value} km/h`;
        fireDanger();
    }
}

//Calculate fire danger rating
function fireDanger() {
    // b = temperature; c = rel humidity; d = wind speed; h = drought factor
    let h = 10;

    var b = document.getElementById("tempRange").value;
    var c = document.getElementById("humdRange").value;
    var d = document.getElementById("windRange").value;

    var s = "";

    var k=2*(Math.exp((.987*Math.log(h+0.001))-.45-(.0345*c)+(.0338*b)+(.0234*d)));//forest mk5

    if (Math.round(k) == 0) {
        var s = (" NIL");
    }
    else if  (k<5) {
    var s = "LOW" //(Math.round(k) + " LOW");
    }
    else if  (k<12) {
    var s = "MODERATE" //(Math.round(k) + " MODERATE");
    }    
    else if  (k<24) {
    var s = "HIGH" //(Math.round(k) + " HIGH");
    }
    else if  (k<50) {
    var s = "VERY HIGH" //(Math.round(k) + " VERY HIGH");
    }    
    else if  (k>50) {
    var s = "EXTREME" //(Math.round(k) + " EXTREME");
    }
    fireDangerOutput = document.getElementById("fireDangerOutput");
    fireDangerOutput.innerHTML = s;
}
// fireDanger()

// Display correct date
function displayDate() {
    var now = new Date();
    var day = now.getDate();
    var year = now.getFullYear();

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var weekDay = days[now.getDay()];
    var month = months[now.getMonth()];

    htmlDay = document.getElementById("day");
    htmlDay.innerHTML = weekDay;
    htmlDate = document.getElementById("date");
    htmlDate.innerHTML = `${day} ${month}, ${year}`;
    htmlLocation = document.getElementById("location");
    htmlLocation.innerHTML = `${currentPinPointInfo.name}, ${currentPinPointInfo.country}`;
}
// displayDate();

// Rotate the arrow to show wind speed
function rotateArrow() {
    arrow = document.getElementById("arrow");
    directions = ['N','NE','E','SE','S','SW','W','NW'];
    degrees = ['0','45','90','135','180','225','270','315'];

    // Find index in directions list where wind direction matches the one in pinPoint
    let arrowIndex = directions.findIndex(direction => direction == currentPinPoint.windDirString); 

    arrow.style.transform = `rotate(${degrees[arrowIndex]}deg)`;
}
// rotateArrow();

function backButton() {
    localStorage.removeItem(PINPOINT_WEATHER_KEY);
    location.href='usermap.html';
}