class User {
  constructor (_username, _password) {
    this.username = _username;
    this.password = _password;
    this.IPaddress = 0;
    this.authorised = false;
    this.authorised_key = '';
    this.watchList = [];
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

 // how to do fromdata??
}

class UserList {
  constructor (_users) {
    this.users = [];
    this.authorisedUser = [];
  }

  get users () {

  }

  get authorisedUser () {

  }

  addUser (username) {

  }

  getUser (username) {

  }

  //fromData (not sure)

}

class pinPoints {
  constructor (_username, _watchList, _coordinates) {
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

  set name (newName) {

  }

  set note (newNote) {

  }
  // not sure if coordinares is typo
  saveCoordinates (_username, _watchList, _coordinates) {

  }

}
