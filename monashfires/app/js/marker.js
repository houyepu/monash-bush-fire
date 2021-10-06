// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';




var observation_data = JSON.parse(window.localStorage.getItem('observation_data'));
var this_colours = JSON.parse(localStorage.getItem('colour'));
function alertFunc() {
  if (confirm("Press a button!")) {
    /*do sth if pressed*/
  } else {
    /*dont do anything */
  }
}

const _username = 'monash-university'
const _password = 'CvdYP1GCPxyy'

const _usernameEncoded = encodeURIComponent(_username)
const _passwordEncoded = encodeURIComponent(_password)

var token = null

const url = `https://pfa.foreca.com`;
fetch(url + `/authorize/token?user=${_usernameEncoded}&password=${_passwordEncoded}`)
  .then(response => response.json())
  .then(data => {
      token = data.access_token;
      token = encodeURIComponent(token)
      console.log(token)
      getCurrent()
  })
  
  var coordinate = [];
  var colour = [];
  //var observation_data = [];
  //var coordinate = ['137.7292133105741,-19.350339784093876','137.7292133105741,-18.350339784093876'];
  
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

  function getCurrent() {
//coordinates.id.length
//coordinates.id[i]
for (let i = 0; i < coordinate.length; i++) {
  if (i == 0){
    observation_data = [];
  }
  user_coordinates = coordinate[i];
  fetch(url + `/api/v1/observation/latest/${user_coordinates}?token=${token}`)
  .then(response => response.json())
  .then(data => {
  console.log(data)
  observation_data.push(data.observations[0])
  // Put the object into storage
  localStorage.setItem('observation_data', JSON.stringify(observation_data));

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('observation_data');

  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  //updateMap(data.observation,i)
  })
}
//getCurrent2()
}

//https://pfa.foreca.com/api/v1/observation/latest/137.7292133105741,-19.350339784093876?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzMjI3NzIyMCwiZXhwIjoxNjMyMjgwODIwLCJuYmYiOjE2MzIyNzcyMjAsImp0aSI6IjA4YzAzNDU5YjJmMDM4MTciLCJzdWIiOiJtb25hc2gtdW5pdmVyc2l0eSIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.jupHPVHT7qnKJ8_3dy0kinoHjKGl5QatK5dI2IlLrJ8
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";
let map = new mapboxgl.Map({
  container: 'map',
  center: [133, -28.5], // starting position [lng, lat]
  zoom: 3.4,
  style: 'mapbox://styles/mapbox/satellite-streets-v11'
  });
  colour = [];

  map.on('click', (e) => {
  //document.getElementById('info').innerHTML = JSON.stringify(e.point) +'<br />' + JSON.stringify(e.lngLat.wrap());
  let coords = e.lngLat;
  coordinate.push(coords)
  console.log(coordinate)
  
  localStorage.setItem('coordinates', JSON.stringify(coordinate));
  
  // Retrieve the object from storage
  var retrieved_coords = JSON.parse(localStorage.getItem('coordinates'));

  console.log('retrieved coordinates: ', retrieved_coords);
  this_colour = getRandomColor();
  colour.push(this_colour);
  localStorage.setItem('colour', JSON.stringify(colour));
  var this_colours = JSON.parse(localStorage.getItem('colour'));
  getCurrent()
  for (let i = 0; i < retrieved_coords.length; i++) {
  let new_marker = new mapboxgl.Marker({ "color": this_colours[i] });
  console.log(retrieved_coords[i])
  new_marker.setLngLat(retrieved_coords[i]);
  new_marker.addTo(map);
  //let popup = new mapboxgl.Popup({ offset: 45 });
  /*
  new_marker.bindPopup("Popup content");
  new_marker.on('mouseover', (e) => {
    this.openPopup();
  });
  new_marker.on('mouseout', (e) => {
    this.closePopup();
  });
  */
  // Set popup text to HTML
 // popup.setHTML(desc);
  
  // Attach the popup to the marker
 // new_marker.setPopup(popup)
  // Add the marker to the map
  new_marker.addTo(map);
  // Add the popup to the map
  // popup.addTo(map1);
}
  });
 var html = '<font size="2" face="Courier New" > <table>';
 html += '<tr>'+'<th>' + "Marker color" + '</th>';
 html += '<th>' + "Station" + '</th>';
 html += '<th>' + "Temperature" + '</th>';
 html += '<th>' + "Humidity" + '</th>';
 html += '<th>' + "Wind Speed" + '</th>';
 html += '<th>' + " Wind Gust" + '</th>'+'</tr>';

 for(var i = 0; i<observation_data.length;i++){
   if (observation_data[i] != null){
  html += '<tr>' + 
  '<td bgcolor='+this_colours[i] +'></td>' +
  '<td>' + observation_data[i].station + '</td>' +
  '<td>' + observation_data[i].temperature + '</td>' +
  '<td>' + observation_data[i].relHumidity + '</td>' +
  '<td>' + observation_data[i].windSpeed + '</td>' +
  '<td>' + observation_data[i].windGust + '</td>' +
  '<td bgcolor=white>' + "<button class=btn type= save"+[i] +">save</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button onclick=alertFunc() class=btn"+" type=alert"+[i] +">alert</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button class=btn  type=info"+[i] +">info</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button class=btn type=delete"+[i] +">delete</button>"+ '</td>';
  html += '</tr>';
  }
 }
 
/*
 for( var i = 0; i < observation_data.length; i++) {
  html += '<tr>';
  for( var j in observation_data[j] ) {
    html += '<td>' + observation_data[i][j] + '</td>';
  }
  html += '</tr>';
 }*/
 html += '</table></font>';
 document.getElementById('container').innerHTML = html;
 var retrieved_coords = JSON.parse(window.localStorage.getItem('coordinates'));
          for (let i = 0; i < retrieved_coords.length; i++) {

          let new_marker = new mapboxgl.Marker({ "color": this_colours[i] });
          console.log(retrieved_coords[i])
          new_marker.setLngLat(retrieved_coords[i]);
          new_marker.addTo(map);
          //let popup = new mapboxgl.Popup({ offset: 45 });
          /*
          new_marker.bindPopup("Popup content");
          new_marker.on('mouseover', (e) => {
            this.openPopup();
          });
          new_marker.on('mouseout', (e) => {
            this.closePopup();
          });
          */
          // Set popup text to HTML
         // popup.setHTML(desc);
          
          // Attach the popup to the marker
         // new_marker.setPopup(popup)
          // Add the marker to the map
          new_marker.addTo(map);
          // Add the popup to the map
          // popup.addTo(map1);
}