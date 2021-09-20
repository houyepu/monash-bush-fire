function register(){
    event.preventDefault();
    var username=document.getElementById('username').value;
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var Confirm_password= document.getElementById('Confirm password').value;
    var Authorised= document.getElementById('Authorised').value;
    
    let newUser = new User(username, password,email);
    let User_List=new UserList();
    User_List.addUser(newUser);
  
    console.log(User_List)
  
  
    KEY = 'aboevinoin'
    //Set item to local storage
    let jsonData = JSON.stringify(User_List);
    localStorage.setItem(KEY,jsonData);
  
    //Retrieve data using key
    jsonData = localStorage.getItem(KEY);
    let retrievedData = JSON.parse(jsonData);
  
    console.log(retrievedData)
  
    let UserListAfterJSON = new UserList();
    //update the global user
    UserListAfterJSON.fromData(retrievedData);
  
    console.log(UserListAfterJSON)
    location.href = 'signin.html';
}