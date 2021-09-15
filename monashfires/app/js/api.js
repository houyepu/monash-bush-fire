//Function to access foreca api data [WORK IN PROGRESS]
function getApiData() {
    
    // Retrieve input from html page
    //let inputRef = document.getElementById("weather");
    //let input = inputRef.value;

    // API user info
    _username = 'monash-university'
    _password = 'CvdYP1GCPxyy'

    usernameEncoded = encodeURIComponent(_username)
    passwordEncoded = encodeURIComponent(_password)
    
    token = {
        "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYzMDk4MDYxMiwiZXhwIjoxNjMwOTg0MjEyLCJuYmYiOjE2MzA5ODA2MTIsImp0aSI6IjlmODlkZmY3ZDNmYTA4MjAiLCJzdWIiOiJtb25hc2gtdW5pdmVyc2l0eSIsImZtdCI6IlhEY09oakM0MCtBTGpsWVR0amJPaUE9PSJ9.YW-8RfjDQRCvAMmxwbUxpgOYfP40pli91SYXclG1FeM",        "expires_in":3600,
        "token_type":"bearer"
    }
    
    tokenEncoded = encodeURIComponent(token.access_token)
    
    // Accessing foreca API data
    let url = `https://pfa.foreca.com`;

    // Token
    //getToken(url, usernameEncoded, passwordEncoded)

    // Location search
    // Locations and associated identifiers matching a search query.
    // Can be used as alternatives to coordinates.
    let cityToSearch = 'Melbourne'
    let countryCode = 'AU'
    //locationSearch(url, cityToSearch, countryCode, tokenEncoded)

    // Location info
    // Location metadata
    let location = 102158177 //"Longitude,latitude" or id from the location endpoint
    // locationInfo(url, location,tokenEncoded)

    // Observations
    // Observations from a nearby representative weather stations
    location = 102158177 //"Longitude,latitude" or id from the location endpoint
    // observations(url, location,tokenEncoded)
    
    // Current
    // Current weather estimate
    location = 102158177 //"Longitude,latitude" or id from the location endpoint
    //current(url, location, tokenEncoded)

    // Nowcast
    // 3-hour forecast in 15-minute time steps. The values represent the conditions
    // at the associated time stamp unless otherwise specified.
    location = 102158177 //"Longitude,latitude" or id from the location endpoint
    //nowcast(url, location, tokenEncoded)

    // Hourly
    // Hourly forecasts. The values represent the conditions at the associated time 
    // stamp unless otherwise specified.
    location = 102158177 //"Longitude,latitude" or id from the location endpoint
    //hourly(url, location, tokenEncoded)

    // Daily
    // Daily forecasts
    location = 102158177 // "Longitude,latitude" or id from the location endpoint
    //daily(url, location, tokenEncoded)

    /*
    let request = new XMLHttpRequest();
    request.open("GET", url + `/authorize/token?user=${usernameEncoded}&password=${passwordEncoded}`);
    request.send();
    request.onload = () => {
        //console.log(request);
        if(request.status === 200){
            console.log(JSON.parse(request.response));
            temptoken = JSON.parse(request.response).access_token
        } else{
            console.log(`error ${request.res}`)
        }
    }
    
    var temptoken = 1;
    let request1 = new XMLHttpRequest();
    request1.open("GET", url + `/api/v1/location/search/${cityToSearch}?country=${countryCode}&token=${temptoken}`);
    request1.send();
    request1.onload = () => {
        //console.log(request);
        if(request1.status === 200){
            console.log(JSON.parse(request1.response));
            
            
        } else{
            console.log(`error ${request1.res}`)
        }
    }*/
    /*
    fetch(url + `/authorize/token?user=${usernameEncoded}&password=${passwordEncoded}`)
        .then(response => {
            return response.json();
        }).then(json=>{
            console.log(json);
        })*/
    temp_token = null
    fetch(url + `/authorize/token?user=${usernameEncoded}&password=${passwordEncoded}`)
        .then(response => response.json())
        .then(data => {
            temp_token = data.access_token;
            console.log(temp_token)
        })
    console.log(temp_token)
}

function getToken(url, usernameEncoded, passwordEncoded) {
    // Token
    let paramsToken = `/authorize/token?user=${usernameEncoded}&password=${passwordEncoded}`;//&callback=testCallback`;
    let scriptToken = document.createElement('script');
    scriptToken.src = url + paramsToken;
    document.body.appendChild(scriptToken);
}
    
function locationSearch(url, cityToSearch, countryCode, tokenEncoded) {
    // Location search
    // Locations and associated identifiers matching a search query.
    // Can be used as alternatives to coordinates.
    let paramsLocSearch = `/api/v1/location/search/${cityToSearch}?country=${countryCode}&token=${tokenEncoded}`;//&callback=testCallback`;
    let scriptLocSearch = document.createElement('script');
    scriptLocSearch.src = url + paramsLocSearch;
    document.body.appendChild(scriptLocSearch);
}
    
function locationInfo(url, location,tokenEncoded) {
    // Location info
    // Location metadata
    let paramsLocInfo = `/api/v1/location/${location}?token=${tokenEncoded}`;
    let scriptLocInfo = document.createElement('script');
    scriptLocInfo.src = url + paramsLocInfo;
    document.body.appendChild(scriptLocInfo);
}
    
function observations(url, location,tokenEncoded) {
    // Observations
    // Observations from a nearby representative weather stations
    let paramsObs = `/api/v1/observation/latest/${location}?token=${tokenEncoded}`;
    let scriptObs = document.createElement('script');
    scriptObs.src = url + paramsObs;
    document.body.appendChild(scriptObs);
}

function current(url, location, tokenEncoded) {
    // Current
    // Current weather estimate
    let paramsCurr = `/api/v1/current/${location}?token=${tokenEncoded}`;
    let scriptCurr = document.createElement('script');
    scriptCurr.src = url + paramsCurr;
    document.body.appendChild(scriptCurr);
}

function nowcast(url, location, tokenEncoded) {
    // Nowcast
    // 3-hour forecast in 15-minute time steps. The values represent the conditions
    // at the associated time stamp unless otherwise specified.
    let paramsNow = `/api/v1/forecast/15minutely/${location}?token=${tokenEncoded}`;
    let scriptNow = document.createElement('script');
    scriptNow.src = url + paramsNow;
    document.body.appendChild(scriptNow);
}

function hourly(url, location, tokenEncoded) {
    // Hourly
    // Hourly forecasts. The values represent the conditions at the associated time 
    // stamp unless otherwise specified.
    let paramsHourly = `/api/v1/forecast/hourly/${location}?token=${tokenEncoded}`;
    let scriptHourly = document.createElement('script');
    scriptHourly.src = url + paramsHourly;
    document.body.appendChild(scriptHourly);
}

function daily(url, location, tokenEncoded) {
    // Daily
    // Daily forecasts
    let paramsDaily = `/api/v1/forecast/daily/${location}?token=${tokenEncoded}`;
    let scriptDaily = document.createElement('script');
    scriptDaily.src = url + paramsDaily;
    document.body.appendChild(scriptDaily);
}

// Callback???
function testCallback(stuff) {
    console.log(1);
    console.log(stuff);
    //document.getElementById("weather").innerHTML = stuff;
}

function apiCall(url,params) {
    let request = new XMLHttpRequest();
    request.open("GET", url + params);
    request.send();
    request.onload = () => {
        //console.log(request);
        if(request.status === 200){
            return JSON.parse(request.response);
        } else{
            console.log(`error ${request.res}`)
        }
    }
}

function home(){
    a=0
}

// On page load
getApiData()