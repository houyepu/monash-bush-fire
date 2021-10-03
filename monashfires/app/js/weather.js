
/*//Tokens/keys
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";

//Global map so all functions can access this
let map1 = new mapboxgl.Map({
    container: 'map',
    center: [133, -28.5], // starting position [lng, lat]
    zoom: 3.4,
    style: 'mapbox://styles/mapbox/satellite-streets-v11'
});*/

let coords = 
{
    "lng": 151.68973659349308,
    "lat": -31.67323920140833
}

let obs = 
{
    "station":"Taree Airport",
    "distance":"81 km E", 
    "time":"2021-09-26T16:00:00+10:00", 
    "temperature":14, 
    "feelsLikeTemp":14, 
    "symbol":"d420", 
    "windDirString":"S", 
    "windDir":160, 
    "windSpeed":4, 
    "windGust":null, 
    "pressure":1024, 
    "relHumidity":77, 
    "visibility":9999
}
let curr = 
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
 }

let currentPinPoint = curr
// let currentPinPointInfo = {};


/* Set appropriate weather conditions correctly */
var tempSlider = document.getElementById("tempRange");
var tempOutput = document.getElementById("tempOutput");
tempSlider.value = currentPinPoint.temperature;
tempOutput.innerHTML = `${tempSlider.value}&#176C`; // Display the default slider value // tempSlider.value

// Update the current slider value (each time you drag the slider handle)
tempSlider.oninput = function() {
    tempOutput.innerHTML = `${this.value}&#176C`;
    fireDanger();
}

var humdSlider = document.getElementById("humdRange");
var humdOutput = document.getElementById("humdOutput");
humdSlider.value = currentPinPoint.relHumidity;
humdOutput.innerHTML = `${humdSlider.value}%`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
humdSlider.oninput = function() {
    humdOutput.innerHTML = `${this.value}%`;
    fireDanger();
}

var windSlider = document.getElementById("windRange");
var windOutput = document.getElementById("windOutput");
windSlider.value = Math.round(currentPinPoint.windSpeed * 3.6); // get into km/h from m/s
windOutput.innerHTML = `${windSlider.value} km/h`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
windSlider.oninput = function() {
    windOutput.innerHTML = `${this.value} km/h`;
    fireDanger();
}

var uvOutput = document.getElementById("uvOutput");
uvOutput.innerHTML = currentPinPoint.uvIndex;

var visibilityOutput = document.getElementById("visibilityOutput");
visibilityOutput.innerHTML = `${Math.round(currentPinPoint.visibility/1000*100)/100}m`;

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
fireDanger()

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
rotateArrow();

/*
// API user info
const _username = 'monash-university'
const _password = 'CvdYP1GCPxyy'

const _usernameEncoded = encodeURIComponent(_username)
const _passwordEncoded = encodeURIComponent(_password)

var token = null

getToken();
function getToken() {
    // Get token    
    fetch(`https://pfa.foreca.com/authorize/token?user=${_usernameEncoded}&password=${_passwordEncoded}`)
        .then(response => response.json())
        .then(data => {
            token = data.access_token;  
            token = encodeURIComponent(token)
            locationInfo()
        }
    )
}

function locationInfo() {
    // Location info
    fetch(`https://pfa.foreca.com/api/v1/location/${coords.lng},${coords.lat}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            currentPinPointInfo = data;  
            // console.log(data);
            displayDate();
        }
    )
}*/