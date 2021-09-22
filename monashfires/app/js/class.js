USERS_LIST_KEY = 'aboevinoin'

class PinPoint {
  constructor () {
    this.coordinates = [];
    this.name = '';
    this.note = '';
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

  set coordinates (newCoords) {
    this.coordinates = newCoords;
  }

  set name (newName) {
    this.name = newName;
  }

  set note (newNote) {
    this.note = newNote;
  }
  // not sure if coordinares is typo
  saveCoordinates (_username, _watchList, _coordinates) {

  }

  fromData(data) {
    //Turns object into class data
    this.coordinates = data.coordinates;
    this.name = data.name;
    this.note = data.note;
  }

}

class User {
  constructor (_username, _password,_email,_authorised) {
    this._username = _username;
    this._password = _password;
    this.IPaddress = 0;
    this.authorised = _authorised;
    this.authorisedKey = '';
    this.watchList = [];
    this.email = _email
  }

  get username () {
    return _username;
  }

  get password () {
    return _password;
  }

  addNote (note) {

  }

  addPinpoints () {

  }

  removePinpoints () {

  }
  removeNote (note) {

  }

  alert () {

  }
  
  fromData(data)
	{
    //Turns object into class data
    //Values for all the individual pinpoints
    
    let dataArray = data.watchList;

    for(let i = 0; i < dataArray.length; i++)
    {
      // creates the PinPoint class instance
      let pinPoint = new PinPoint();

      // restoring the pinPoint at index i
      pinPoint.fromData(dataArray[i]);
      // then adding this route into the watchList array
      this.watchList.push(route);
    }

  //Values for all the trip-related data
  this._username = data._username;
  this._password = data._password;
  this.IPaddress = data.IPaddress;
  this.authorised = data.authorised;
  this.authorisedKey = data.authorisedKey;
}
}

class UserList {
  constructor () {
    this._users = [];
    this._authorisedUser = [];
  }

  get users () {
    return this._users;
  }

  get authorisedUser () {
    return this._authorisedUser;
  }
 
  addUser (newUser) {
    this._users.push(newUser);
  }

  addAuthorised (newUser){
    this._authorisedUser.push(newUser);
  }

 
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
    let dataArray2 = data._authorisedUser;
    for(let i = 0; i < dataArray2.length; i++)
    {
      // create the user class instance
      let newUser = new User();
      // restoring the user at index i
      newUser.fromData(dataArray2[i]);
      // then adding this user into the _trip array
      this._authorisedUser.push(newUser);
        }
        //Values for all the user-related data
        //None
	}

}

  
//
//test class
  //let newPinpoint = new PinPoint();
  //let newUser = new User('test_user', 'password');
  //let testUserList = new UserList();
  //testUserList.addUser(newUser);

  //console.log(testUserList)


  //KEY = 'aboevinoin'
  //Set item to local storage
  //let jsonData = JSON.stringify(testUserList);
  //localStorage.setItem(KEY,jsonData);

  //Retrieve data using key
  //jsonData = localStorage.getItem(KEY);
  //let retrievedData = JSON.parse(jsonData);

  //console.log(retrievedData)

  //let testUserListAfterJSON = new UserList();
  //update the global user
  //testUserListAfterJSON.fromData(retrievedData);

  //console.log(testUserListAfterJSON)

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

//On page load
// Check if user list exists
if (checkIfDataExistsLocalStorage(USERS_LIST_KEY)) {
    User_List = new UserList();

    UserListData = getDataLocalStorage(USERS_LIST_KEY);

    User_List.fromData(UserListData);
    console.log(User_List)
}
else {
    User_List = new UserList();
}