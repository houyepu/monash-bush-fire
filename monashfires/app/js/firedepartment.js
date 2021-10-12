// made a new key to store alerted pinpoints so that I have the access of this in my firedepartment.js 
ALERTED_PINPOINTS = 'Alerted_pinpoints'
const _username = encodeURIComponent('monash-university');
const _password = encodeURIComponent('CvdYP1GCPxyy');
var token = null;

// access the maptoken
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";
let map1 = new mapboxgl.Map({
    container: 'map',
    center: [133, -28.5], // starting position [lng, lat]
    zoom: 3.4,
    style: 'mapbox://styles/mapbox/satellite-streets-v11'
});

// all coordinates are stored in here
let coordinates_array = []
// fire_index array
let fire_index = []
// access coordinates from alerted data in local storage 
let pinPoint = getDataLocalStorage(ALERTED_PINPOINTS);
for (let i=0; i<pinPoint.length; i++){
// making a 2d array [[lng,lat],[lng,lat]]
    coordinates_array[i]=[pinPoint[i].coordinates_lng, pinPoint[i].coordinates_lat]
}

getToken()

//grabbing the current pinpoint 
function current_pinpoint(){
    for (let i=0; i<pinPoint.length; i++){
        currentPinPointInfo = pinPoint[i].locationInfo;
        coordinates_lng = pinPoint[i].coordinates_lng;
        coordinates_lat = pinPoint[i].coordinates_lat;
        retrieveWeatherData(coordinates_lng,coordinates_lat);
    }
}


// Call foreca API for live weather conditions
function getToken() {
    // Get token    
    fetch(`https://pfa.foreca.com/authorize/token?user=${_username}&password=${_password}`)
        .then(response => response.json())
        .then(data => {
            token = data.access_token;  
            token = encodeURIComponent(token)
            current_pinpoint()
        }
    )
}

// Retriving the current weather data
function retrieveWeatherData(coordinates_lng,coordinates_lat) {
    // Get weather conditions
    fetch(`https://pfa.foreca.com/api/v1/current/${coordinates_lng},${coordinates_lat}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            currentPinPoint = data.current;  
            console.log(currentPinPoint);
            fire_index.push(fireDanger(currentPinPoint));
            plot_marker(currentPinPoint);
        }
    )
}

// plotting the marker correspoinding to each coordinates and the fire danger index value
function plot_marker(){
    for(let i=0; i< coordinates_array.length; i++){
        const el = document.createElement('div');
        if (fire_index[i] == 0)
        print("Very safe")
    
        else if  (fire_index[i] <11)
        el.className = 'lowmarker';
    
        else if  (fire_index[i] <31)
        el.className = 'highmarker';
        
        else if  (fire_index[i] <49)
        el.className = 'severe';
        
        else if  (fire_index[i] <74)
        el.className = 'extreme';
        
        else if  (fire_index[i] >99)
        el.className = 'catastrophic';
        
        // make a marker for each feature and add to the map
        let marker1 = new mapboxgl.Marker(el); 
        // table for pop up
        /*let desc = `<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="border-collapse: collapse; padding: 10px;">
        <thead>
        <tr>
            <th class="mdl-data-table__cell--non-numeric"><h7>${pinPoint[i].locationInfo.name}</h7></th>
            <td><span class="material-icons">thermostat</span></td>
        </thead>
        <tbody id = "weatherTable-origin">
        <tr>
            <td class="mdl-data-table__cell--non-numeric">Temperature</td>
            <td>${currentPinPoint.temperature}&#8451;</td>
        </tr>
        <tr>
            <td class="mdl-data-table__cell--non-numeric">Humidity</td>
            <td>${currentPinPoint.relHumidity}%</td>
        </tr>
        <tr>
            <td class="mdl-data-table__cell--non-numeric">Wind Speed</td>
            <td>${currentPinPoint.windSpeed} km/h</td>
        </tr>
        <tr>
            <td class="mdl-data-table__cell--non-numeric">Fire index</td>
            <td>${fire_index[i].toFixed(2)} </td>
        </tr>
        </tbody>
        </table>`*/
        let desc = '';
        if (pinPoint[i].locationInfo.adminArea!=null){
        desc = `<p><b>${pinPoint[i].locationInfo.name}, ${pinPoint[i].locationInfo.adminArea}</b></p>
        <p><b>Fire index:</b> ${fire_index[i].toFixed(2)}</p>
        <p><b>Message: </b></p>
        <p style="border:2px; border-style:solid; border-color:#000000; padding: 1em;">${pinPoint[i].report}</p>
        <td bgcolor=white><button value=infoi class=btn type=button onclick=weatherInfo(${i})>Info</button></td>
        <td bgcolor=white><button value=infoi class=btn type=button onclick=deletePinPoint(${i})>Delete</button></td>
        `}
        else{
        desc = `<p><b>${pinPoint[i].locationInfo.name}</b></p>
        <p><b>Fire index:</b> ${fire_index[i].toFixed(2)}</p>
        <p><b>Message: </b></p>
        <p style="border:2px; border-style:solid; border-color:#000000; padding: 1em;">${pinPoint[i].report}</p>
        <td bgcolor=white><button value=infoi class=btn type=button onclick=weatherInfo(${i})>Info</button></td>
        <td bgcolor=white><button value=infoi class=btn type=button onclick=deletePinPoint(${i})>Delete</button></td>
        `
        }

        //Set location of markers
        marker1.setLngLat(coordinates_array[i]);
        marker1.setPopup(new mapboxgl.Popup({ offset: 45 })
        .setHTML(desc))
        //Add markers to the map
        marker1.addTo(map1);
    }
}

// calculate fire danger 
function fireDanger(currentPinPoint) {
    // b = temperature; c = rel humidity; d = wind speed; h = drought factor
    let h = 10;
    var b = currentPinPoint.temperature;
    var c = currentPinPoint.relHumidity;
    var d = currentPinPoint.windSpeed;

    var k=2*(Math.exp((.987*Math.log(h+0.001))-.45-(.0345*c)+(.0338*b)+(.0234*d)));//forest mk5
    return k
}

function weatherInfo(pinPointIndex) {
    // Update local storage with pinPoint to display
  PINPOINT_WEATHER_KEY = 'bv2navpndlkuqoodn100d8;';
  PREVIOUS_PAGE_KEY = 'cien0ic10cn0imaosicn01cn'
  updateLocalStorage(pinPoint[pinPointIndex], PINPOINT_WEATHER_KEY);
  updateLocalStorage('firedepartment.html', PREVIOUS_PAGE_KEY);
  location.href = 'weather.html';
}

function deletePinPoint (i) {
    // Delete array at the element
    let localStoragePinPoints = getDataLocalStorage(ALERTED_PINPOINTS);
    localStoragePinPoints.splice(i,1);

    // Update local storage
    updateLocalStorage(localStoragePinPoints,ALERTED_PINPOINTS)

    // Refresh page
    location.href = ''
  }