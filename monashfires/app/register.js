User_List=new UserList();

KEY = 'register';
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
    updateLocalStorage(data);
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

function updateLocalStorage(data)
{   
    localStorage.setItem(KEY, JSON.stringify(data));
}