// KEYS
USERS_LIST_KEY = 'aboevinoinin81s81';
KEY_PIN_POINTS = 'cminv1bv8baps8w8812s28';
SIGNED_IN_USER_KEY ='ivno2vnvnavnxpdv92oci91s';
COORDINATES_POINTS = 'coordinates'

function save(i){
    let coordinates_data = getDataLocalStorage(COORDINATES_POINTS);
    let signinuser = getDataLocalStorage(SIGNED_IN_USER_KEY);
    let user = getDataLocalStorage(USERS_LIST_KEY);
    user._users[signinuser].watchList.push(coordinates_data);
    updateLocalStorage(user,USERS_LIST_KEY)
}

function delete_pinpoints(i){

}
