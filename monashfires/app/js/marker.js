let markersStorage = [];

let locations = [
    {
      coords: [lng, lat],
      display: `${name}<br><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2"><input type="checkbox" onchange="checkboxLocation(${lat},${lng},'${aCode}');" id="checkbox-2" class="mdl-checkbox__input"><span class="mdl-checkbox__label">Select</span></label>`
    }
  ]
  
for (let i = 0; i<savedRoutes.theRoutes[k]._route.route.length; i++)
    {
      let location = savedRoutes.theRoutes[k]._route.route[i];
      let marker = new mapboxgl.Marker({"color": `${color}`});
      marker.setLngLat(location.coordinates);
      marker.addTo(map);
    }