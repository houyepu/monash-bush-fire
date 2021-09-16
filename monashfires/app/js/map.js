/** 
 * map.js 
 * This file contains code that creates a basic map
 */

//Tokens/keys
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";

// API user info
const _username = 'monash-university'
const _password = 'CvdYP1GCPxyy'

const _usernameEncoded = encodeURIComponent(_username)
const _passwordEncoded = encodeURIComponent(_password)

var token = null

const url = `https://pfa.foreca.com`;


//Global map so all functions can access this
let map1 = new mapboxgl.Map({
    container: 'map',
    center: [133, -28.5], // starting position [lng, lat]
    zoom: 3.4,
    style: 'mapbox://styles/mapbox/satellite-streets-v11'
});

//Function to access foreca api data [WORK IN PROGRESS]
function getToken() {
    
    // Retrieve input from html page
    //let inputRef = document.getElementById("weather");
    //let input = inputRef.value;
    
    // Accessing foreca API data

    // Get token    
    fetch(url + `/authorize/token?user=${_usernameEncoded}&password=${_passwordEncoded}`)
        .then(response => response.json())
        .then(data => {
            token = data.access_token;
            token = encodeURIComponent(token)
            console.log(token)
            getCurrent()
        })
    // token = encodeURIComponent('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzMTcwMTAyNCwiZXhwIjoxNjMxNzA0NjI0LCJuYmYiOjE2MzE3MDEwMjQsImp0aSI6ImM0ZWI4NDEzMzQ2YWY2YTQiLCJzdWIiOiJtb25hc2gtdW5pdmVyc2l0eSIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.q7QdGMXAbDOKfgmY2fNhj_TvHey27PqPu--fdoXLRxU');
    // getCurrent();
}

function getCurrent() {
    // access each city's id
    for (let i = 0; i < Math.floor(capitalCity.id.length/2); i++) {
        cityId = capitalCity.id[i]
        
        fetch(url + `/api/v1/current/${cityId}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            updateMap(data.current, i)
        })
    }
    getCurrent2()
    
}

function getCurrent2() {
    // access each city's id
    for (let i = Math.floor(capitalCity.id.length/2); i < capitalCity.id.length; i++) {
        cityId = capitalCity.id[i]
        
        fetch(url + `/api/v1/current/${cityId}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            updateMap(data.current, i)
        })
    }
}

function updateMap(data, i) {
    // MARKERS
    // Create marker for capital city
    let marker1 = new mapboxgl.Marker({ "color": '#FF6400' }); //#FF8800

    //Set location of markers
    marker1.setLngLat([capitalCity.lon[i], capitalCity.lat[i]]);

    //Add markers to the map
    marker1.addTo(map1);

    
    // POPUPS
    // Create popup for capital city
    let popup = new mapboxgl.Popup({ offset: 45 });

    //Convert wind speed to km/h
    data.windSpeed = Math.round(data.windSpeed * 3.6)
    
    //let desc = `${capitalCity.name[i]}<br>Temp: ${data.temperature}\xB0C<br>Humidity: ${data.relHumidity}%<br>Wind Speed: ${data.windSpeed} km/h<br>Wind Gust: ${data.windGust} knots<br>UV Index: ${data.uvIndex}`;
    let desc = `<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="border-collapse: collapse; padding: 15px;">
                    <thead>
                    <tr>
                        <th class="mdl-data-table__cell--non-numeric"><h6>${capitalCity.name[i]}</h6></th>
                        <td><span class="material-icons">thermostat</span></td>
                    </thead>
                    <tbody id = "weatherTable-origin">
                    <tr>
                        <td class="mdl-data-table__cell--non-numeric">Temperature</td>
                        <td>${data.temperature}&#8451;</td>
                    </tr>
                    <tr>
                        <td class="mdl-data-table__cell--non-numeric">Humidity</td>
                        <td>${data.relHumidity}%</td>
                    </tr>
                    <tr>
                        <td class="mdl-data-table__cell--non-numeric">Wind Speed</td>
                        <td>${data.windSpeed} km/h</td>
                    </tr>
                    <tr>
                        <td class="mdl-data-table__cell--non-numeric">Wind Gust</td>
                        <td>${data.windGust} knots</td>
                    </tr>
                    <tr>
                        <td class="mdl-data-table__cell--non-numeric">UV Index</td>
                        <td>${data.uvIndex}</td>
                    </tr>
                    </tbody>
                </table>`
    
    // Set popup text to HTML
    popup.setHTML(desc);
    // Attach the popup to the marker
    marker1.setPopup(popup)
    // Add the marker to the map
    marker1.addTo(map1);
    // Add the popup to the map
    // popup.addTo(map1);
}

// On page load
getToken()