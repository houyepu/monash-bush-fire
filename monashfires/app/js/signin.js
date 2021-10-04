// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';

// Sign in
function signin(){
    event.preventDefault();
    
    //KEY = 'register'
    var username=document.getElementById('Username').value;
    var password=document.getElementById('Password').value;
    
  
    //Retrieve data using key
    //jsonData = localStorage.getItem(KEY);
    //let retrievedData = JSON.parse(jsonData);
    retrievedData = User_List;
  
    
    /*if (document.getElementById('authorised').checked) {
        for (let i = 0; i < retrievedData._authorisedUser.length; i++) {
            if (retrievedData._authorisedUser[i]._username==username && retrievedData._authorisedUser[i]._password==password){
                updateLocalStorage(i, 'signin')
                location.href = 'firedepartment.html';
            }
          }
    }
    else{
        for (let i = 0; i < retrievedData._users.length; i++) {
            if (retrievedData._users[i]._username==username && retrievedData._users[i]._password==password){
                updateLocalStorage(i, 'signin')
                location.href = 'usermap.html';
            }
          }
    }*/

    for (let i = 0; i < retrievedData._users.length; i++) {
        if (retrievedData._users[i]._username==username && retrievedData._users[i]._password==password){
            updateLocalStorage(i, SIGNED_IN_USER_KEY)
            location.href = 'usermap.html';
        }
      }

    
}
//console.log(User_List)