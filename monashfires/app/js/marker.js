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
  let usersData = getDataLocalStorage(USERS_LIST_KEY);
  let users = new UserList();
  users.fromData(usersData);
  let cur_user = users._users[signinuser]
  //checking if its in the user account already
  let existingPinpointIndex = -1;
  console.log(users)
  if(cur_user.watchList==null){
    existingPinpointIndex = 0;
  }
  else{
    existingPinpointIndex = cur_user.watchList.findIndex(item => item == pinPoints[i]);
  }
  // Find index in user's watchlist where the current pinpoint to be added matches
  if (existingPinpointIndex == -1){
    // assigned coordinates data into users
    users._users[signinuser].watchList.push(coordinates_data);
    // update data
    updateLocalStorage(users,USERS_LIST_KEY);
  }
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
      let today = new Date(); // create new date for today
      let reported_date = today.toLocaleDateString(); // date of report
      let reported_time = today.toLocaleTimeString(); // time of report
      let current_user_index = getDataLocalStorage(SIGNED_IN_USER_KEY)  // user index
      let user_list = getDataLocalStorage(USERS_LIST_KEY)
      let user = new UserList()
      user.fromData(user_list)
      let current_user = user._users[current_user_index]; // name of the user
      // html generating needed infor
      if (pinpoint.locationInfo.adminArea!=null){
      noteHTML = `<h2 id = "report-title">Report Detail</h2>
        <div class = "report-details">
          <p id ="details">Location: ${pinpoint.locationInfo.name}, ${pinpoint.locationInfo.adminArea}</p>
          <p id ="details">Time: ${reported_time} </p>
          <p id ="details">Date: ${reported_date} </p>
        </div>
        <div class="note-area">
          <h3 id = "note-title">Report Explanation</h3>
          <textarea id= "note-body" placeholder="type here..."></textarea>
        </div>
      </div>
      <button class=btn1 id="report-submit"">Submit</button>`}
      else{
        noteHTML = `<h2 id = "report-title">Report Detail</h2>
        <div class = "report-details">
          <p id ="details">Location: ${pinpoint.locationInfo.name}</p>
          <p id ="details">Time: ${reported_time} </p>
          <p id ="details">Date: ${reported_date} </p>
        </div>
        <div class="note-area">
          <h3 id = "note-title">Report Explanation</h3>
          <textarea id= "note-body" placeholder="type here..."></textarea>
        </div>
      </div>
      <button class=btn1 id="report-submit"">Submit</button>`
      }
      document.getElementById("store-notes").innerHTML = noteHTML // for html display
      // when submit button is clicked
      document.getElementById("report-submit").addEventListener("click", function() {
        let note = document.getElementById("note-body").value; // the text note written
        let alert = new Alert(reported_time, reported_date) // create a new 
        alert.addNote(note) // calling addNote method to store the text note
        pinPoints[index].report = alert;
        document.getElementById("submitted").innerHTML = `
        <h1>Thank you ${current_user._username}</h1>
        <h3>Your response has been submitted</h3>
        <img id="checkmark" src="img/checkmark.png">`
        if (checkIfDataExistsLocalStorage(ALERTED_PINPOINTS)){
          var old_data = getDataLocalStorage(ALERTED_PINPOINTS);
          old_data.push(pinPoints[index]);
          updateLocalStorage(old_data,ALERTED_PINPOINTS)
        } 
        


        document.getElementById("store-notes").style.display = "none";
        document.getElementById("submitted").style.display = "block";
        
        // if (checkIfDataExistsLocalStorage(ALERTED_PINPOINTS)){
        //   var old_data=getDataLocalStorage(ALERTED_PINPOINTS);
        //   old_data.push(pinpoint);
        //   updateLocalStorage(old_data,ALERTED_PINPOINTS)
        // }
      })
      
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
  PREVIOUS_PAGE_KEY = 'cien0ic10cn0imaosicn01cn';
  updateLocalStorage(pinPoints[pinPointIndex], PINPOINT_WEATHER_KEY);
  updateLocalStorage('usermap.html', PREVIOUS_PAGE_KEY);
  location.href = 'weather.html';
}

// function to popup note
function notePopup(){
  document.getElementById("popup-note").classList.toggle("active");
  document.getElementById("store-notes").style.display = "block";
  document.getElementById("submitted").style.display = "none";
}

// Get pinPoints list from local storage (if applicable)
if (currentUser.watchList != []) {
  pinPoints = currentUser.watchList
  
  for (let i=0; i < pinPoints.length; i++) {
    let new_marker = new mapboxgl.Marker({ "color": pinPoints[i].colour }); 
    //creating new markers with colour specified
    new_marker.setLngLat([pinPoints[i].coordinates_lng, pinPoints[i].coordinates_lat]); //marker coordinates
    new_marker.addTo(map); //add marker to map
  }

  updateTable(); //update the table
  
}