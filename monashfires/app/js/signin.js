// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';

// sign in function
function signin(){
    // prevent default for loading
    event.preventDefault();
    // grabbing username
    var username=document.getElementById('Username').value;
    // grabbing password
    var password=document.getElementById('Password').value;
    // retrived user_list
    retrievedData = User_List;
    // for loop to run over every user
    for (let i = 0; i < retrievedData._users.length; i++) {
        // if the given username is equal to the input username aswell as the password
        if (retrievedData._users[i]._username==username && retrievedData._users[i]._password==password){
            // pass the signed in index in to signed in user key
            updateLocalStorage(i, SIGNED_IN_USER_KEY)
            // direct to usermap
            location.href = 'usermap.html';
        }
      }   
}
