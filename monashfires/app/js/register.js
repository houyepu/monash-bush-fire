USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';

function register(){
    // Fire department code
    let Authorised_code=123
    // prevent the website to load default
    event.preventDefault();
    // grabbing username
    var username=document.getElementById('username').value;
    // grabbing email
    var email=document.getElementById('email').value;
    // grabbing password
    var password=document.getElementById('password').value;
    // grabbing confirmed password
    var Confirm_password= document.getElementById('Confirm password').value;
    // grabbing confirmed password
    var Authorised= document.getElementById('Authorised').value;
    // check passwords are match 
    check(Confirm_password,password,Authorised,Authorised_code);
    // if the authorised code matches then 
    if(Authorised == Authorised_code){
        // add authorised user
        authorised_user(username, password,email);
    }  
    else{
        // add normal user
        user(username,email,password);
    }
}

function user(username,email,password){
    // initialise a new user
    let newUser = new User(username, password,email,false);
    // call add user method
    User_List.addUser(newUser);
    // Find index that the logged in user is in User_List:
    let userIndex = User_List._users.findIndex(currentUser => currentUser == newUser)

    // update local storage (user list)
    updateLocalStorage(User_List, USERS_LIST_KEY);
    // update local storage (user index)
    updateLocalStorage(userIndex, SIGNED_IN_USER_KEY)
    // go to usermap
    location.href = 'usermap.html';
}

function authorised_user(username, password,email){
    // initialise a new user (with the boolen being true)
    let newUser = new User(username, password,email,true);
    // call add user method
    User_List.addUser(newUser);
    // Find index that the logged in user is in User_List:
    let userIndex = User_List._users.findIndex(currentUser => currentUser == newUser)

    // update local storage (user list)
    updateLocalStorage(User_List, USERS_LIST_KEY);
    // update local storage (user index)
    updateLocalStorage(userIndex, SIGNED_IN_USER_KEY)
    // go to usermap
    location.href = 'usermap.html';
}

// runs check for the password
function check(Confirm_password,password,Authorised,Authorised_code){
    if (Confirm_password != password){
        alert("Passwords do not match.");
        return false;
    }
    if (Authorised == Authorised_code){
        alert("Authorisation approved.");
        return false;
    }
}