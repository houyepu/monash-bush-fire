//User_List=new UserList();

KEY = 'register';
USERS_LIST_KEY = 'aboevinoin'

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
    let newUser = new User(username, password,email);
    //bugs 1 how to add another user without initialise a new userlist class??
    //let User_List=new UserList();
    User_List.addUser(newUser);
    //User_List.addUser(newUser)
    let data = User_List;
    updateLocalStorage(data);
    location.href = 'signin.html';
}

function authorised_user(username, password,email){
    let newUser = new User(username, password,email,true);
    //bugs 1 how to add another user without initialise a new userlist class??
    //var User_List= new UserList();
    User_List.addAuthorised(newUser);
    let data = User_List;
    updateLocalStorage(data, );
    location.href = 'signin.html';
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
}
else {
    User_List = new UserList();
}