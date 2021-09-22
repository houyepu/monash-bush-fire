var observation_data = JSON.parse(window.localStorage.getItem('observation_data'));

 var html = '<table>';
 html += '<tr>';
 for( var j in observation_data[0] ) {
  html += '<th>' + j + '</th>';
 }
 html += '</tr>';
 for( var i = 0; i < observation_data.length; i++) {
  html += '<tr>';
  for( var j in observation_data[i] ) {
    html += '<td>' + observation_data[i][j] + '</td>';
  }
  html += '</tr>';
 }
 html += '</table>';
 document.getElementById('container').innerHTML = html;
