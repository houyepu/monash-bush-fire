// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';




//var observation_data = JSON.parse(window.localStorage.getItem('observation_data'));
// var this_colours = JSON.parse(localStorage.getItem('colour'));

// function alertFunc() {
//   if (confirm("Press a button!")) {
//     /*do sth if pressed*/
//   } else {
//     /*dont do anything */
//   }
// }

var pinPoints = [];
  var coordinate = [];
  var colour = [];
  var observation_data = [];
  //var coordinate = ['137.7292133105741,-19.350339784093876','137.7292133105741,-18.350339784093876'];

const _username = 'monash-university'
const _password = 'CvdYP1GCPxyy'

const _usernameEncoded = encodeURIComponent(_username)
const _passwordEncoded = encodeURIComponent(_password)

var token = null

const url = `https://pfa.foreca.com`;

// Get token
fetch(url + `/authorize/token?user=${_usernameEncoded}&password=${_passwordEncoded}`)
  .then(response => response.json())
  .then(data => {
      token = data.access_token;
      token = encodeURIComponent(token)
      console.log(token)
      // getCurrent()
  })
  
  //color 
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  //trying to get brighter colours only
  function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
     (25 + 70 * Math.random()) + '%,' + 
     (85 + 10 * Math.random()) + '%)'
  }

  function getCurrent(newPinpoint) {

  //fetching coordinates
  // for (let i = 0; i < pinPoints.length; i++) {
    // if (i == 0){
    //   observation_data = [];
    // }
    lng = newPinpoint.coordinates_lng; //coordinate[i].lng;
    lat = newPinpoint.coordinates_lat; //coordinate[i].lat;

    fetch(url + `/api/v1/location/${lng},${lat}?token=${token}`)
    .then(response => response.json())
    .then(data => {
    console.log(data)
    // observation_data.push(data)
    newPinpoint.locationInfo = data;

    // Put the object into storage
    // localStorage.setItem('observation_data', JSON.stringify(observation_data));

    // Retrieve the object from storage
    // var retrievedObject = localStorage.getItem('observation_data');

    // console.log('retrievedObject: ', JSON.parse(retrievedObject));
    //updateMap(data.observation,i)
    })
  }


//https://pfa.foreca.com/api/v1/observation/latest/137.7292133105741,-19.350339784093876?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzMjI3NzIyMCwiZXhwIjoxNjMyMjgwODIwLCJuYmYiOjE2MzIyNzcyMjAsImp0aSI6IjA4YzAzNDU5YjJmMDM4MTciLCJzdWIiOiJtb25hc2gtdW5pdmVyc2l0eSIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.jupHPVHT7qnKJ8_3dy0kinoHjKGl5QatK5dI2IlLrJ8
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";
let map = new mapboxgl.Map({
  container: 'map',
  center: [133, -28.5], // starting position [lng, lat]
  zoom: 3.4,
  style: 'mapbox://styles/mapbox/satellite-streets-v11'
  });

// colour = []; 

map.on('click', (e) => 
{
  let coords = e.lngLat;
  // coordinate.push(coords)
  // console.log(coordinate)
  let newPinpoint = new PinPoint(coords.lng,coords.lat);

  // localStorage.setItem('coordinates', JSON.stringify(coordinate));

  // Retrieve the object from storage
  // var retrieved_coords = JSON.parse(localStorage.getItem('coordinates'));

  // console.log('retrieved coordinates: ', retrieved_coords);


  // Create random colour
  // this_colour = getRandomColor();
  // colour.push(this_colour);
  // newPinpoint.colour = '#000000';
  newPinpoint.colour = getRandomColor();

  // localStorage.setItem('colour', JSON.stringify(colour));
  // var this_colours = JSON.parse(localStorage.getItem('colour'));

  getCurrent(newPinpoint)
  
  /*for (let i = 0; i < pinPoints.length; i++) {
    let new_marker = new mapboxgl.Marker({ "color": pinPoints[i].colour });
    // console.log(retrieved_coords[i])
    new_marker.setLngLat((pinPoints[i].coordinates_lng, pinPoints[i].user_coordinates_lat));
    // new_marker.addTo(map);
    // Add the marker to the map
    new_marker.addTo(map);
  }*/
  let new_marker = new mapboxgl.Marker({ "color": newPinpoint.colour });
  // console.log(retrieved_coords[i])
  new_marker.setLngLat([newPinpoint.coordinates_lng, newPinpoint.coordinates_lat]);
  // new_marker.addTo(map);
  // Add the marker to the map
  new_marker.addTo(map);

  pinPoints.push(newPinpoint);
  updateTable();
});

function updateTable () {
  //table info
  var html = '<font size="2" face="Courier New" > <table>';
  html += '<tr>'+'<th>' + "Marker color" + '</th>';
  html += '<th>' + "Station" + '</th>' +'</tr>';

  for(var i = 0; i < pinPoints.length; i++)
  {
    // if (pinPoints[i] != null)
    // {
    html += '<tr>' + 
    '<td bgcolor='+pinPoints[i].colour +'></td>' +
    '<td>' + pinPoints[i].locationInfo.name + '</td>' +
    '<td bgcolor=white>' + "<button value=save"+[i]+" class=btn type= button onclick=savePinPoint("+i+")>Save</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=alert"+[i]+" class=btn type=button onclick=alertFunc("+i+") >Alert</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=info"+[i]+" class=btn type=button onclick=weatherInfo("+i+") >Info</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=delete"+[i]+" class=btn type=button onclick=deletePinPoint("+i+")>Delete</button>"+ '</td>';
    html += '</tr>';
    // } 
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
