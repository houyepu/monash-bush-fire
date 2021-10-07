// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';


//creating new var to store pinpoints
var pinPoints = [];

//creating constants to fetch from API
const _username = 'monash-university'
const _password = 'CvdYP1GCPxyy'
const _usernameEncoded = encodeURIComponent(_username)
const _passwordEncoded = encodeURIComponent(_password)
const url = `https://pfa.foreca.com`;

//creating a variable for token
var token = null

// Get token from API
fetch(url + `/authorize/token?user=${_usernameEncoded}&password=${_passwordEncoded}`)
  .then(response => response.json())
  .then(data => {
      token = data.access_token;
      token = encodeURIComponent(token)
      console.log(token)
  })
  
  //generating random colour for markers 
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  //function to get location information from API based on coordinates
  function getCurrent(newPinpoint) {
    lng = newPinpoint.coordinates_lng; //longitude
    lat = newPinpoint.coordinates_lat; //latitude

    fetch(url + `/api/v1/location/${lng},${lat}?token=${token}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    newPinpoint.locationInfo = data;
    })
  }
//Creating a map at the left side of the page
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";
let map = new mapboxgl.Map({
  container: 'map',
  center: [133, -28.5], // starting position [lng, lat]
  zoom: 3.4,
  style: 'mapbox://styles/mapbox/satellite-streets-v11'
  });

//on click will create a marker
map.on('click', (e) => 
{
  let coords = e.lngLat; //long and lat coordinates stored in coords
  let newPinpoint = new PinPoint(coords.lng,coords.lat); //creating new class pinpoint
  newPinpoint.colour = getRandomColor(); //getting new random colour
  getCurrent(newPinpoint) //getting location information
  let new_marker = new mapboxgl.Marker({ "color": newPinpoint.colour }); //creating new markers with colour specified
  new_marker.setLngLat([newPinpoint.coordinates_lng, newPinpoint.coordinates_lat]); //marker coordinates
  new_marker.addTo(map); //add marker to map

  pinPoints.push(newPinpoint); //pushing newPinpoint into pinpoint class array
  updateTable(); //updating the table
});

function updateTable () {
  //table info
  var html = '<font size="2" face="Courier New" > <table>';
  html += '<tr>'+'<th>' + "Marker color" + '</th>';
  html += '<th>' + "Station" + '</th>' +'</tr>';

  for(var i = 0; i < pinPoints.length; i++)
  {
    html += '<tr>' + 
    '<td bgcolor='+pinPoints[i].colour +'></td>' +
    '<td>' + pinPoints[i].locationInfo.name + '</td>' +
    '<td bgcolor=white>' + "<button value=save"+[i]+" class=btn type= button onclick=savePinPoint("+i+")>Save</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=alert"+[i]+" class=btn type=button onclick=alertFunc("+i+") >Alert</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=info"+[i]+" class=btn type=button onclick=weatherInfo("+i+") >Info</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=delete"+[i]+" class=btn type=button onclick=deletePinPoint("+i+")>Delete</button>"+ '</td>';
    html += '</tr>';
  }


  html += '</table></font>';
  document.getElementById('container').innerHTML = html;
  }

function savePinPoint (pinPointIndex) {

}

function deletePinPoint (pinPointIndex) {

}

function alertFunc () {

}

function weatherInfo (pinPointIndex) {

  location.href = 'weather.html';
}
