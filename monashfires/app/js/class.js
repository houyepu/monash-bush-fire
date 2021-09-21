KEY = 'aboevinoin'
class PinPoint {
  constructor () {
    this.coordinates = [];
    this.name = '';
    this.note = '';
  }

  get coordinates () {

  }

  get name () {

  }

  get note () {

  }

  set coordinates (newCoords) {

  }

  set name (newName) {

  }

  set note (newNote) {

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
