COORDINATES_POINTS = 'coordinates'
SIGNIN_KEY ='signin'
KEY='aboevinoin'
function save(){
    let coordinates_data = getDataLocalStorage(COORDINATES_POINTS);
    let signinuser = getDataLocalStorage(SIGNIN_KEY);
    let user = getDataLocalStorage('aboevinoin');
    user._users[signinuser].watchList.push(coordinates_data);
    updateLocalStorage(user, KEY)
}

function delete_pinpoints(){

}
