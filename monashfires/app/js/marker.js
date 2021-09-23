var observation_data = JSON.parse(window.localStorage.getItem('observation_data'));

 var html = '<table>';
 html += '<tr>'+'<th>' + "Station " + '</th>';
 html += '<th>' + "Temperature " + '</th>';
 html += '<th>' + "Humidity" + '</th>';
 html += '<th>' + "Wind Speed   " + '</th>';
 html += '<th>' + " Wind Gust  " + '</th>'+'</tr>';

 for(var i = 0; i<observation_data.length;i++){
   if (observation_data[i] != null){
  html += '<tr>' + '<td>' + observation_data[i].station + '</td>' +
  '<td>' + observation_data[i].temperature + '</td>' +
  '<td>' + observation_data[i].relHumidity + '</td>' +
  '<td>' + observation_data[i].windSpeed + '</td>' +
  '<td>' + observation_data[i].windGust + '</td>';
  html += '</tr>';
   }
 }
/*
 for( var i = 0; i < observation_data.length; i++) {
  html += '<tr>';
  for( var j in observation_data[j] ) {
    html += '<td>' + observation_data[i][j] + '</td>';
  }
  html += '</tr>';
 }
 html += '</table>';*/
 document.getElementById('container').innerHTML = html;

 var retrieved_coords = JSON.parse(window.localStorage.getItem('coordinates'));
          for (let i = 0; i < retrieved_coords.length; i++) {

          let new_marker = new mapboxgl.Marker({ "color": '#FF6400' });
          console.log(retrieved_coords[i])
          new_marker.setLngLat(retrieved_coords[i]);
          new_marker.addTo(map);
          //let popup = new mapboxgl.Popup({ offset: 45 });
          /*
          new_marker.bindPopup("Popup content");
          new_marker.on('mouseover', (e) => {
            this.openPopup();
          });
          new_marker.on('mouseout', (e) => {
            this.closePopup();
          });
          */
          // Set popup text to HTML
         // popup.setHTML(desc);
          
          // Attach the popup to the marker
         // new_marker.setPopup(popup)
          // Add the marker to the map
          new_marker.addTo(map);
          // Add the popup to the map
          // popup.addTo(map1);
}