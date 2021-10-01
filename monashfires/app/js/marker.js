var observation_data = JSON.parse(window.localStorage.getItem('observation_data'));
var this_colours = JSON.parse(localStorage.getItem('colour'));
function alertFunc() {
  if (confirm("Press a button!")) {
    /*do sth if pressed*/
  } else {
    /*dont do anything */
  }
}

 var html = '<font size="2" face="Courier New" > <table>';
 html += '<tr>'+'<th>' + "Marker color" + '</th>';
 html += '<th>' + "Station" + '</th>';
 html += '<th>' + "Temperature" + '</th>';
 html += '<th>' + "Humidity" + '</th>';
 html += '<th>' + "Wind Speed" + '</th>';
 html += '<th>' + " Wind Gust" + '</th>'+'</tr>';

 for(var i = 0; i<observation_data.length;i++){
   if (observation_data[i] != null){
  html += '<tr>' + 
  '<td bgcolor='+this_colours[i] +'></td>' +
  '<td>' + observation_data[i].station + '</td>' +
  '<td>' + observation_data[i].temperature + '</td>' +
  '<td>' + observation_data[i].relHumidity + '</td>' +
  '<td>' + observation_data[i].windSpeed + '</td>' +
  '<td>' + observation_data[i].windGust + '</td>' +
  '<td bgcolor=white>' + "<button class=btn type= save"+[i] +">save</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button onclick=alertFunc() class=btn"+" type=alert"+[i] +">alert</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button class=btn  type=info"+[i] +">info</button>"+ '</td>' +
  '<td bgcolor=white>' + "<button class=btn type=delete"+[i] +">delete</button>"+ '</td>';
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
 }*/
 html += '</table></font>';
 document.getElementById('container').innerHTML = html;
 var retrieved_coords = JSON.parse(window.localStorage.getItem('coordinates'));
          for (let i = 0; i < retrieved_coords.length; i++) {

          let new_marker = new mapboxgl.Marker({ "color": this_colours[i] });
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