// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';
// made a new key to store alerted pinpoints so that I have the access of this in my firedepartment.js 
ALERTED_PINPOINTS = 'Alerted_pinpoints'


//creating new var to store pinpoints
var pinPoints = [];
var alerted_pinPoints = [];

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
    updateTable(); 
    })
  }
  //trying to make it recreate map markers everytime delete is pressed
  function recreating_map_n_markers(){
    let map = new mapboxgl.Map({
      container: 'map',
      center: [133, -28.5], // starting position [lng, lat]
      zoom: 3.4,
      style: 'mapbox://styles/mapbox/satellite-streets-v11'
      });
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
      //updateTable(); //updating the table
      });
      if (currentUser.watchList != []) {
        pinPoints = currentUser.watchList
        
        for (let i=0; i < pinPoints.length; i++) {
          let new_marker = new mapboxgl.Marker({ "color": pinPoints[i].colour }); //creating new markers with colour specified
          new_marker.setLngLat([pinPoints[i].coordinates_lng, pinPoints[i].coordinates_lat]); //marker coordinates
          new_marker.addTo(map); //add marker to map
        }
      
        updateTable(); //update the table
        
      }
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
  //updateTable(); //updating the table
  console.log(pinPoints)
});

function updateTable () {
  //table info
  var html = '<font size="2" face="Courier New" > <table id="table">';
  html += '<tr>'+'<th>' + "Marker color" + '</th>';
  html += '<th>'+"Suburb"+'</th>' + '</tr>';

  for(var i = 0; i < pinPoints.length; i++)
  {
    html += '<tr>' + 
    '<td bgcolor='+pinPoints[i].colour +'></td>' +
    '<td>' + pinPoints[i].locationInfo.name + '</td>';
    html += '<td bgcolor=white>' + "<button value=save"+[i]+" class=btn type= button onclick=savePinPoint("+i+")>Save</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=alert"+[i]+" class=btn type=button onclick=alertFunc("+i+") >Alert</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=info"+[i]+" class=btn type=button onclick=weatherInfo("+i+") >Info</button>"+ '</td>' +
    '<td bgcolor=white>' + "<button value=delete"+[i]+" class=btn type=button onclick=deletePinPoint("+i+")>Delete</button>"+ '</td>';
    html += '</tr>';
  }


  html += '</table></font>';
  document.getElementById('container').innerHTML = html;
  }

function savePinPoint (i) {
  // grabbing coordinates data
  let coordinates_data =pinPoints[i];
  console.log("This is coordinate of pinpoint:")
  console.log(coordinates_data)
  // grabbing signed in user data
  let signinuser = getDataLocalStorage(SIGNED_IN_USER_KEY);
  // grabbing user list data
  let user = getDataLocalStorage(USERS_LIST_KEY);
  console.log("user account:")
  console.log(user)
  console.log("current_user.watchlist:")
  console.log(currentUser)
  //checking if its in the user account already
  let existingPinpointIndex = 0;
  if(currentUser.watchList==null){
    existingPinpointIndex = -1;
  }
  else{
    existingPinpointIndex = currentUser.watchList.findIndex(item => item == pinPoints[i]);
  }
  // Find index in user's watchlist where the current pinpoint to be added matches
  if (existingPinpointIndex == -1){
    // assigned coordinates data into users
    user._users[signinuser].watchList.push(coordinates_data);
    // update data
    updateLocalStorage(user,USERS_LIST_KEY);
  }

//   let already_in_map = true;
//   let user_array_length = user[1].watchList.length
//   if (user_array_length==null){
//     user_array_length = 0;
//   }
//   for(let k=0;user_array_length;k++){
//     if (user[1].watchList[k].coordinates_lat==coordinates_data.coordinates_lat){
//       if(user[1].watchList[k].coordinates_lng==coordinates_data.coordinates_lng){
//         already_in_map = false;
//       }
//     }
// }
// if (already_in_map){
//   // assigned coordinates data into users
//   user._users[signinuser].watchList.push(coordinates_data);
//   // update data
//   updateLocalStorage(user,USERS_LIST_KEY);
// }
}

function deletePinPoint (i) {
  // delete array at the element 
  pinPoints.splice(i,1);
  // signin user 
  let signinuser = getDataLocalStorage(SIGNED_IN_USER_KEY);
  // user list 
  let user = getDataLocalStorage(USERS_LIST_KEY);
  // delete user 
  user._users[signinuser].watchList.splice(i,1);
  // update the markers 
  updateTable();
  // update local storage
  updateLocalStorage(user,USERS_LIST_KEY);
  recreating_map_n_markers();
  //new_marker.remove();
}

function alertFunc(index) {
  // checking whether the user exist
  if (checkIfDataExistsLocalStorage(SIGNED_IN_USER_KEY)) {
    // a small popup confirmation when user presses the alert button
    if(confirm("Are you sure you want to alert the fire department?")){
      // toggles a popup allowing users to notedown or describe the fire danger 
      notePopup()
      // get index of alert 
      let pinpoint = pinPoints[index];
      document.getElementById("store-notes").innerHTML = JSON.stringify(pinpoint)

      alerted_pinPoints.push(pinpoint)
     
     
      // update the local storage
      updateLocalStorage(alerted_pinPoints,ALERTED_PINPOINTS);
    }
    

  }else{
    console.log("cannot alert, please login or sign up")
    alert("cannot alert, please login or sign up")
    location.href = "signin.html"

  }

}


function weatherInfo (pinPointIndex) {
  // Update local storage with pinPoint to display
  PINPOINT_WEATHER_KEY = 'bv2navpndlkuqoodn100d8;';
  updateLocalStorage(pinPoints[pinPointIndex], PINPOINT_WEATHER_KEY);
  location.href = 'weather.html';
}

// function to popup note
function notePopup(){
  document.getElementById("popup-note").classList.toggle("active");
}

// Get pinPoints list from local storage (if applicable)
if (currentUser.watchList != []) {
  pinPoints = currentUser.watchList
  
  for (let i=0; i < pinPoints.length; i++) {
    let new_marker = new mapboxgl.Marker({ "color": pinPoints[i].colour }); //creating new markers with colour specified
    new_marker.setLngLat([pinPoints[i].coordinates_lng, pinPoints[i].coordinates_lat]); //marker coordinates
    new_marker.addTo(map); //add marker to map
  }

  updateTable(); //update the table
  
}