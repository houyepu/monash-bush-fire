function signin(){
    event.preventDefault();
    
    KEY = 'register'
    var username=document.getElementById('Username').value;
    var password=document.getElementById('Password').value;
    
  
    //Retrieve data using key
    jsonData = localStorage.getItem(KEY);
    let retrievedData = JSON.parse(jsonData);
  
    console.log(retrievedData)
    if (document.getElementById('authorised').checked) {
        for (let i = 0; i < retrievedData._authorisedUser.length; i++) {
            if (retrievedData._authorisedUser[i]._username==username && retrievedData._authorisedUser[i]._password==password){
                location.href = 'usermap.html';
            }
            else{
                location.href = 'signin.html';
            }
    
          }
    }
    else{
        for (let i = 0; i < retrievedData._users.length; i++) {
            if (retrievedData._users[i]._username==username && retrievedData._users[i]._password==password){
                location.href = 'usermap.html';
            }
            else{
                location.href = 'signin.html';
            }
    
          }
    }
    
}