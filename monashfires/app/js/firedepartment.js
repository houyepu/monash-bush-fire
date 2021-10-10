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
// access coordinates from alerted data in local storage 
let pinPoint = getDataLocalStorage(ALERTED_PINPOINTS);
for (let i=0; i<pinPoint.length; i++){
// making a 2d array [[lng,lat],[lng,lat]]
    coordinates_array[i]=[pinPoint[i].coordinates_lng, pinPoint[i].coordinates_lat]
}

// how do I retrieve the wetaher data??
for (let i=0; i<pinPoint.length; i++){
    currentPinPointInfo = pinPoint[i].locationInfo;
    coordinates_lng = pinPoint[i].coordinates_lng;
    coordinates_lat = pinPoint[i].coordinates_lat;
    retrieveWeatherData(coordinates_lng,coordinates_lat);
}
// Call foreca API for live weather conditions

function getToken() {
    // Get token    
    fetch(`https://pfa.foreca.com/authorize/token?user=${_username}&password=${_password}`)
        .then(response => response.json())
        .then(data => {
            token = data.access_token;  
            token = encodeURIComponent(token)
        }
    )
}

function retrieveWeatherData(coordinates_lng,coordinates_lat) {
    // Get weather conditions
    fetch(`https://pfa.foreca.com/api/v1/current/${coordinates_lng},${coordinates_lat}?token=${token}`)
        .then(response => response.json())
        .then(data => {
            currentPinPoint = data.current;  
            console.log(currentPinPoint);
            fireDanger();
        }
    )
}

// plotting the marker correspoinding to each coordinates and the fire danger index value
for(let i=0; i< coordinates_array.length; i++){
    const el = document.createElement('div');
    if (fire_index[i] == 0)
    print("Very safe")

    else if  (fire_index[i] <5)
    el.className = 'lowmarker';

    else if  (fire_index[i] <12)
    el.className = 'highmarker';
    
    else if  (fire_index[i] <24)
    el.className = 'severe';
    
    else if  (fire_index[i] <50)
    el.className = 'extreme';
    
    else if  (fire_index[i] >50)
    el.className = 'catastrophic';
    
    // make a marker for each feature and add to the map
    let marker1 = new mapboxgl.Marker(el); 
    //Set location of markers
    marker1.setLngLat(coordinates[i]);
    //Add markers to the map
    marker1.addTo(map1);
}

// calculate fire danger 
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

//Popup function
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}
