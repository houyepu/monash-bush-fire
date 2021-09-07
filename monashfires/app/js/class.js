class User {
    constructor(username,password){
        this.username = username;
        this.password = password;
        this.IPaddress = 0;
        this.authorised = false;
        this.authorised_key = " ";
        this.watch_list = [];
    }
    get username(){
        return username
    }
    get password(){
        return password
    }
    add_note(note){

    }
    add_Pinpoints(){

    }
    remove_Pinpoints(){

    } 
    remove_note(note){

    }
    alert(){

    }
    // how to do fromdata?? 
}

class User_list {
    constructor(users){
        this.users = [];
        this.Authorised_users = [];
    }
    get_users(){

    }
    get_Authorised_user(){

    }
    addUser(username){

    }
    getUser(username){

    }
}

class Pin_points {
    constructor(username, watchlist, coordinates){
        this.coordinates = [];
        this.name = "";
        this.note = "";
    }
    get_coordinates(){

    }
    get_name(){

    }
    get_note(){

    }
    set_name(newName){

    }
    set_note(newNote){

    }
    
}
