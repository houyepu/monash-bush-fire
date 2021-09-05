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