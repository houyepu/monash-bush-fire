/** 
 * map.js 
 * This file contains code that creates a basic map
 */

//Tokens/keys
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";

//Global map so all functions can access this
let map1 = new mapboxgl.Map({
    container: 'map',
    center: [133, -28.5], // starting position [lng, lat]
    zoom: 3.5,
    style: 'mapbox://styles/mapbox/streets-v11'
});

//Function to access foreca api data [WORK IN PROGRESS]
function getApiData() {
    
    // Retrieve input from html page
    //let inputRef = document.getElementById("weather");
    //let input = inputRef.value;
    input = 'Australia'
    user = 'monash-university'
    pass = 'CvdYP1GCPxyy'
    expire = 1
    token = {
        "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzMDkyNTc5NSwiZXhwIjoxNjMwOTI5Mzk1LCJuYmYiOjE2MzA5MjU3OTUsImp0aSI6IjJmNmZiYWEzZjc1YzEzN2QiLCJzdWIiOiJtb25hc2gtdW5pdmVyc2l0eSIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.5-GYdrKT1CVV5QXoi7C2XU2nJAaCZLtjVUOIR-HFBRk",
        "expires_in":3600,
        "token_type":"bearer"
    }

    //Data for foreca API
    let url = `https://pfa.foreca.com`;
    let params = `/authorize/token?user=${user}&password=${pass}&callback=newToken`;//&callback=showAirports`;
    //Create script
    let script1 = document.createElement('script');
    script1.src = url + params;
    document.body.appendChild(script1);

    params3 = `/api/v1/location/search/:query?token=${token.access_token}&country=United Kingdom`
    let script3 = document.createElement('script');
    script3.src = url + params3;
    document.body.appendChild(script3);

}
getApiData()

function newToken(createdToken) {
    console.log(createdToken)
}