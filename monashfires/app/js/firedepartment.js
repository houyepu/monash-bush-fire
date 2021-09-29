// access the maptoken
mapboxgl.accessToken = "pk.eyJ1IjoidGRveTAwMDEiLCJhIjoiY2t0NnhvNzI4MG40dDJ1bzB4dHoyemhqMSJ9.5JRWGF3yYfWhd3SEqa1Xfg";
let map1 = new mapboxgl.Map({
    container: 'map',
    center: [133, -28.5], // starting position [lng, lat]
    zoom: 3.4,
    style: 'mapbox://styles/mapbox/satellite-streets-v11'
});

let fire_index = 5;
let coordinates = [[133,-28.5],[145,-26],[155,-30]];
for(let i=0; i< coordinates.length; i++){
    const el = document.createElement('div');
    if (fire_index == 0)
    print("Very safe")

    else if  (fire_index <5)
    el.className = 'lowmarker';

    else if  (fire_index<12)
    el.className = 'highmarker';
    
    else if  (fire_index<24)
    el.className = 'severe';
    
    else if  (fire_index<50)
    el.className = 'extreme';
    
    else if  (fire_index>50)
    el.className = 'catastrophic';
    
    // make a marker for each feature and add to the map
    let marker1 = new mapboxgl.Marker(el); 
    //Set location of markers
    marker1.setLngLat(coordinates[i]);
    //Add markers to the map
    marker1.addTo(map1);
}

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}
