function signin(){
    event.preventDefault();
    
    KEY = 'aboevinoin'
    var username=document.getElementById('Username').value;
    var password=document.getElementById('Password').value;
  
    //Retrieve data using key
    jsonData = localStorage.getItem(KEY);
    let retrievedData = JSON.parse(jsonData);
  
    console.log(retrievedData)

    for (let i = 0; i < retrievedData._users.length; i++) {
        if (retrievedData._users[i]._username==username && retrievedData._users[i]._password==password){
            location.href = 'map.html';
        }
        else{
            location.href = 'signin.html';
        }

      }
    //let UserListAfterJSON = new UserList();
    //update the global user
    //UserListAfterJSON.fromData(retrievedData);
  
    //console.log(UserListAfterJSON)
    //location.href = 'signin.html';
}