KEY_PIN_POINTS = 'observation_data'
SIGNIN_KEY ='signin'
function save(){
    let pin_point_data = getDataLocalStorage(KEY_PIN_POINTS);
    let signinuser = getDataLocalStorage(SIGNIN_KEY);
    let user = getDataLocalStorage('aboevinoin');
    user._users[signinuser].watchList.push(pin_point_data);
    console.log(user)
    
    
}

function delete_pinpoints(){

}