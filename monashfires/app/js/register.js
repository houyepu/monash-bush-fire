//User_List=new UserList();

// KEY = 'register';
// USERS_LIST_KEY = 'aboevinoin'

USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';

function register(){
    let Authorised_code=123
    event.preventDefault();
    var username=document.getElementById('username').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var Confirm_password= document.getElementById('Confirm password').value;
    var Authorised= document.getElementById('Authorised').value;
    check(Confirm_password,password,Authorised,Authorised_code);
    
    if(Authorised == Authorised_code){
        authorised_user(username, password,email);
    }
    
    else{
        user(username,email,password);
    }
    
}

function user(username,email,password){
    let newUser = new User(username, password,email,false);
    //bugs 1 how to add another user without initialise a new userlist class??
    //let User_List=new UserList();
    User_List.addUser(newUser);
    //User_List.addUser(newUser)
    
    // Find index that the logged in user is in User_List:
    let userIndex = User_List._users.findIndex(currentUser => currentUser == newUser)

    updateLocalStorage(User_List, USERS_LIST_KEY);
    updateLocalStorage(userIndex, SIGNED_IN_USER_KEY)

    location.href = 'usermap.html';
}

function authorised_user(username, password,email){
    let newUser = new User(username, password,email,true);
    //bugs 1 how to add another user without initialise a new userlist class??
    //var User_List= new UserList();
    
    /*User_List.addAuthorised(newUser);
    let data = User_List;
    updateLocalStorage(data, USERS_LIST_KEY);
    location.href = 'signin.html';*/

    User_List.addUser(newUser);

    // Find index that the logged in user is in User_List:
    let userIndex = User_List._users.findIndex(currentUser => currentUser == newUser)

    updateLocalStorage(User_List, USERS_LIST_KEY);
    updateLocalStorage(userIndex, SIGNED_IN_USER_KEY)

    location.href = 'usermap.html';
}

function check(Confirm_password,password,Authorised,Authorised_code){
    if (Confirm_password != password){
        alert("Passwords do not match.");
        return false;
    }
    if (Authorised != Authorised_code){
        alert("Authorised code do not match.");
        return false;
    }
}