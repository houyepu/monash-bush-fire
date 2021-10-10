USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';
ALERTED_PINPOINTS = 'Alerted_pinpoints'
class PinPoint {
  constructor (coordinates_lng,coordinates_lat) {
    this.coordinates_lng = coordinates_lng;
    this.coordinates_lat = coordinates_lat;
    this.locationInfo = {};
    this.colour = '';
    this.report = {}
    //this.name = '';
    //this.note = '';
    // this.locationInfo = {};
  }

  get coordinates () {
    return this.coordinates;
  }

  get name () {
    return this.name;
  }

  get note () {
    return this.note;
  }

  // get colour () {
  //   return this.colour
  // }

  set coordinates (newCoords) {
    this.coordinates = newCoords;
  }

  set name (newName) {
    this.name = newName;
  }

  set note (newNote) {
    this.note = newNote;
  }

  // set colour (newColour) {
  //   this.colour = newColour;
  // }

  saveCoordinates (_username, _watchList, _coordinates) {


  }

  fromData(data) {
    //Turns object into class data
    this.coordinates_lng = data.coordinates_lng;
    this.coordinates_lat = data.coordinates_lat;
    this.locationInfo = data.locationInfo;
    this.colour = data.colour;
    //this.name = data.name;
    //this.note = data.note;
    //this.locationInfo = data.locationInfo;
  }

}

class User {
  constructor (_username, _password, _email, _authorised) {
    this._username = _username;
    this._password = _password;
    this.IPaddress = 0;
    this.authorised = _authorised;
    this.authorisedKey = '';
    this.watchList = [];
    this.email = _email;
  }

  get username () {

    return this._username;
  }

  get password () {

    return this._password;
  }

  addPinpoints (pin_point_data) {
    this.watchList.push(pin_point_data);
  }

  removePinpoints () {

  }

  fromData(data)
	{
    //Turns object into class data
    //Values for all the individual pinpoints

    let dataArray = data.watchList;
    if (dataArray.length > 0) {
      for(let i = 0; i < dataArray.length; i++)
      {
        // creates the PinPoint class instance
        let pinPoint = new PinPoint();

        // restoring the pinPoint at index i
        pinPoint.fromData(dataArray[i]);
        // then adding this route into the watchList array
        this.watchList.push(pinPoint);
      }
    }
    
    //Values for all the trip-related data
    this._username = data._username;
    this._password = data._password;
    this.IPaddress = data.IPaddress;
    this.authorised = data.authorised;
    this.authorisedKey = data.authorisedKey;
  }
}

// created a new class Alert
class Alert {

  constructor(current_user,  reported_time, reported_date){
    this.current_user = current_user;
    this.reported_time = reported_time;
    this.reported_date = reported_date;
    this.note = "";

  }

  addNote (note) {

    return this.note = note;

  }

  removeNote () {

    return this.note = "";

  }

  fromData(data) {
    this.current_user = data.currert_user;
    this.reported_time = data.reported_time;
    this.reported_date = data.reported_date;
    this.note = data.note;
  }


}

class UserList {
  constructor () {
    this._users = [];
    // this._authorisedUser = [];
  }

  get users () {
    return this._users;
  }

  // get authorisedUser () {
  //   return this._authorisedUser;
  // }

  addUser (newUser) {
    this._users.push(newUser);
  }

  // addAuthorised (newUser){
  //   this._authorisedUser.push(newUser);
  // }


  fromData(data)
	{
    //Turns object into class data
    //Values for all the trips under the class
    let dataArray = data._users;
		for(let i = 0; i < dataArray.length; i++)
		{
      // create the user class instance
			let newUser = new User();
      // restoring the user at index i
			newUser.fromData(dataArray[i]);
			// then adding this user into the _trip array
			this._users.push(newUser);
    }
    // let dataArray2 = data._authorisedUser;
    // for(let i = 0; i < dataArray2.length; i++)
    // {
    //   // create the user class instance
    //   let newUser = new User();
    //   // restoring the user at index i
    //   newUser.fromData(dataArray2[i]);
    //   // then adding this user into the _trip array
    //   this._authorisedUser.push(newUser);
    //     }

        //Values for all the user-related data
        //None
	}

}


function testClass() {
  //test class
    let newPinpoint = new PinPoint();
    let newUser = new User('test_user', 'password');
    let testUserList = new UserList();
    testUserList.addUser(newUser);

    console.log(testUserList)


    KEY = 'aboevinoin'
    // Set item to local storage
    let jsonData = JSON.stringify(testUserList);
    localStorage.setItem(KEY,jsonData);

    // Retrieve data using key
    jsonData = localStorage.getItem(KEY);
    let retrievedData = JSON.parse(jsonData);

    console.log(retrievedData)

    let testUserListAfterJSON = new UserList();
    // update the global user
    testUserListAfterJSON.fromData(retrievedData);

    console.log(testUserListAfterJSON)
}

// Update local storage class
  function updateLocalStorage(data, KEY)
{
    localStorage.setItem(KEY, JSON.stringify(data));
}

//Fuction to check if Data Exists in Local Storage
function checkIfDataExistsLocalStorage(KEY)
{
    //Access stored data
    let dataStored = localStorage.getItem(KEY);

    //Check if data is valid
    //ie if not undefined, null, NaN AND not blank string
    if (dataStored !== undefined && dataStored !== null && dataStored !== NaN && dataStored !== "")
    {
        //Valid data
        return true;
    }
    else
    {
        //Invalid data
        return false;
    }
}

// Function to get the data in local storage
function getDataLocalStorage(KEY)
{
    //Retrieve data using key
    let jsonData = localStorage.getItem(KEY);
    //Parsing it back into object
    let userData = JSON.parse(jsonData);
    //return data
    return userData;
}

// Function to log user out
function logOut()
{
  localStorage.removeItem(SIGNED_IN_USER_KEY)
  location.href = 'map.html';
}



/* On page load */

// Check if user list exists
if (checkIfDataExistsLocalStorage(USERS_LIST_KEY)) {
    User_List = new UserList();

    UserListData = getDataLocalStorage(USERS_LIST_KEY);

    User_List.fromData(UserListData);
    
    // console.log(getDataLocalStorage(SIGNIN_KEY))
}
else {
    User_List = new UserList();
}

console.log('User List: (User_List)');
    console.log(User_List);
if (checkIfDataExistsLocalStorage(ALERTED_PINPOINTS) == false){
  updateLocalStorage([],ALERTED_PINPOINTS);
}
// Check if user logged in, and if so make current user available to access
if (checkIfDataExistsLocalStorage(SIGNED_IN_USER_KEY)) {
  
  userIndex = getDataLocalStorage(SIGNED_IN_USER_KEY);
  currentUser = User_List._users[userIndex];
  
  console.log('Current logged in user: (currentUser)');
  console.log(currentUser);

  console.log('Current user index: (userIndex)');
  console.log(userIndex);
}
else {
  console.log('No user logged in currently');
}

/* Update navigation and visible buttons */
let topRightDisplay = document.getElementById("topRightDisplay");
let navigationLinks = document.getElementById("navigationLinks");

if (checkIfDataExistsLocalStorage(SIGNED_IN_USER_KEY)) {
  // User currently logged in
  // Display "Logout"
  var topRightDisplayVal = 
  `<a class="mdl-navigation__link" onclick="logOut()" href="">Log out</a>`;

  var navigationLinksVal = 
  `<a class="mdl-navigation__link" href="map.html">Home</a>
  <a class="mdl-navigation__link" onclick="logOut()" href="map.html">Log out</a>
  <a class="mdl-navigation__link" href="usermap.html">Watch Locations</a>`

  if (currentUser.authorised == true) {
    // Authorised user, so add extra pages to navigation
    navigationLinksVal += `<a class="mdl-navigation__link" href="firedepartment.html">Alerts</a>`
  }
}
else {
  // User not logged in
  var topRightDisplayVal = 
  `<a class="mdl-navigation__link" href="register.html">Sign up</a>
  <a class="mdl-navigation__link" href="signin.html">Sign in</a>`;

  var navigationLinksVal = 
  `<a class="mdl-navigation__link" href="map.html">Home</a>
  <a class="mdl-navigation__link" href="register.html">Sign Up</a>
  <a class="mdl-navigation__link" href="signin.html">Log in</a>`
}

navigationLinks.innerHTML = navigationLinksVal;
topRightDisplay.innerHTML = topRightDisplayVal;